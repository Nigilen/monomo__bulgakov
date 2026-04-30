import { z } from 'zod'
import nodemailer from 'nodemailer'


// Мы создали защищенную зону (сервер).
// Мы настроили правила входа (Zod).
// Мы проверили пропуск (Cloudflare).
// Мы отправили письмо.
// Все это работает на сервере.



// 1. Настраиваем "почтальона" (подключение к SMTP)
// Этот блок выполняется один раз при запуске сервера
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true, // true для 465 порта (безопасное соединение)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

// 2. Настраиваем "полицейского" (Zod)
// Мы описываем правила: какие поля ждем и какие они должны быть
const FormSchema = z.object({
  name: z.string().min(2, 'Имя слишком короткое').max(50),
  phone: z.string().regex(/^\+?[0-9\s\-()]{10,18}$/, 'Неверный формат телефона'),
  formSource: z.string().min(2).max(120),
  message: z.string().max(1000).optional(),
  tariff: z.string().max(120).optional(),
  housingType: z.string().max(120).optional(),
  area: z.number().min(0).max(10000).optional(),
  honeypot: z.string().optional(),
  timeElapsed: z.number().min(3000, 'Слишком быстрая отправка'),
})

// 🛡️ Rate Limiter (хранится в памяти сервера)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const MAX_REQUESTS = 30          // Макс. запросов
const WINDOW_MS = 10 * 60 * 1000 // За 10 минут
const MESSAGE_ENABLED_SOURCES = new Set(['modal_simple', 'modal_calculator', 'modal_price'])

const formatPhoneForEmail = (rawPhone: string): string => {
  const digits = rawPhone.replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('7')) {
    const p = digits.slice(1)
    return `+7 (${p.slice(0, 3)}) ${p.slice(3, 6)}-${p.slice(6, 8)}-${p.slice(8, 10)}`
  }
  return rawPhone
}

const getMailMeta = (formSource: string, tariff?: string) => {
  if (formSource === 'modal_callback') {
    return { subject: 'Заявка – Заказать звонок', requestType: 'Заказать звонок' }
  }
  if (formSource === 'modal_calculator') {
    return { subject: 'Заявка – Рассчитать стоимость', requestType: 'Рассчитать стоимость' }
  }
  if (formSource === 'modal_price') {
    const safeTariff = tariff?.trim() || 'Без названия'
    return {
      subject: `Заявка – Обсудить проект "${safeTariff}"`,
      requestType: `Обсудить проект (${safeTariff})`
    }
  }
  return { subject: 'Заявка – Консультация', requestType: 'Консультация' }
}

const getHousingTypeLabel = (housingType?: string) => {
  if (housingType === '1') return 'Новостройка'
  if (housingType === '2') return 'Вторичка'
  return housingType || '—'
}

const sendTelegramFormMessage = async ({
  requestType,
  formSource,
  name,
  phoneMasked,
  message,
  includeMessage,
  housingType,
  area,
}: {
  requestType: string
  formSource: string
  name: string
  phoneMasked: string
  message?: string
  includeMessage: boolean
  housingType?: string
  area?: number
}) => {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return
  }

  const lines = [
    'Новая заявка!',
    `Тип заявки: ${requestType}`,
    `Форма: ${formSource}`,
    `Имя: ${name}`,
    `Телефон: ${phoneMasked}`,
  ]

  if (includeMessage) {
    lines.push(`Сообщение: ${message?.trim() ? message : '—'}`)
  }

  if (formSource === 'modal_calculator') {
    lines.push(`Тип жилья: ${getHousingTypeLabel(housingType)}`)
    lines.push(`Площадь: ${typeof area === 'number' ? `${area} м²` : '—'}`)
  }

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      disable_web_page_preview: true,
    }),
  })
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now()
  let record = rateLimitMap.get(ip)

  // Если записи нет или окно истекло → создаём новую
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
    return { allowed: true, retryAfterMs: 0 }
  }

  // Если лимит превышен → блокируем
  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: Math.max(0, record.resetTime - now) }
  }

  // Иначе увеличиваем счётчик
  record.count++
  return { allowed: true, retryAfterMs: 0 }
}

// 3. Создаем обработчик запроса (то, что сработает при отправке формы)
export default defineEventHandler(async (event) => {
  const ua = getHeader(event, 'user-agent')
  if (!ua || ua.includes('bot') || ua.includes('curl')) {
    throw createError({ statusCode: 403, message: 'Blocked' })
  }

  const ip = getRequestIP(event) || 'unknown'

  const rateLimitResult = checkRateLimit(ip)
  if (!rateLimitResult.allowed) {
    const retryAfterMinutes = Math.max(1, Math.ceil(rateLimitResult.retryAfterMs / 60000))
    throw createError({
      statusCode: 429,
      message: `Лимит отправок исчерпан. Повторить можно через ${retryAfterMinutes} мин.`
    })
  }

  const body = await readBody(event)

  // 🔍 Валидация данных
  const validationResult = FormSchema.safeParse(body)
  if (!validationResult.success) {
    // Если ошибка в honeypot или времени → говорим боту "ошибка валидации"
    throw createError({ statusCode: 400, message: 'Ошибка валидации данных' })
  }

  const { name, phone, formSource, message, tariff, housingType, area, honeypot, timeElapsed } = validationResult.data

  // 🕳️ Проверка Honeypot (если поле заполнено → это бот)
  if (honeypot && honeypot.trim().length > 0) {
    throw createError({ statusCode: 403, message: 'Подозрительная активность' })
  }

  // ⏱️ Проверка времени (дублируем на случай, если Zod пропустил)
  if (timeElapsed < 3000) {
    throw createError({ statusCode: 403, message: 'Подтвердите, что вы человек' })
  }

  // 📧 Отправка письма
  try {
    const { subject, requestType } = getMailMeta(formSource, tariff)
    const phoneMasked = formatPhoneForEmail(phone)
    const messageLine = MESSAGE_ENABLED_SOURCES.has(formSource)
      ? `<p><b>Сообщение:</b> ${message?.trim() ? message : '—'}</p>`
      : ''
    const calculatorDetails = formSource === 'modal_calculator'
      ? `<p><b>Тип жилья:</b> ${getHousingTypeLabel(housingType)}</p><p><b>Площадь:</b> ${typeof area === 'number' ? `${area} м²` : '—'}</p>`
      : ''

    await transporter.sendMail({
      from: `"Заявка с сайта" <${process.env.SMTP_FROM}>`,
      to: ['skgarant39@yandex.ru', 'nigilen@yandex.ru'], // 👈 Почта клиента/менеджера
      subject,
      html: `<h3>Новая заявка!</h3><p><b>Тип заявки:</b> ${requestType}</p><p><b>Форма:</b> ${formSource}</p><p><b>Имя:</b> ${name}</p><p><b>Телефон:</b> ${phoneMasked}</p>${messageLine}${calculatorDetails}`
    })

    try {
      await sendTelegramFormMessage({
        requestType,
        formSource,
        name,
        phoneMasked,
        message,
        includeMessage: MESSAGE_ENABLED_SOURCES.has(formSource),
        housingType,
        area,
      })
    } catch (telegramError) {
      console.error('Ошибка отправки в Telegram:', telegramError)
    }

    return { status: 'success' }
  } catch (error) {
    console.error('Ошибка отправки:', error)
    throw createError({ statusCode: 500, message: 'Не удалось отправить заявку' })
  }
})