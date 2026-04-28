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
  honeypot: z.string().optional(),
  timeElapsed: z.number().min(3000, 'Слишком быстрая отправка'),
})

// 🛡️ Rate Limiter (хранится в памяти сервера)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const MAX_REQUESTS = 5          // Макс. запросов
const WINDOW_MS = 10 * 60 * 1000 // За 10 минут

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  let record = rateLimitMap.get(ip)

  // Если записи нет или окно истекло → создаём новую
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
    return true
  }

  // Если лимит превышен → блокируем
  if (record.count >= MAX_REQUESTS) return false

  // Иначе увеличиваем счётчик
  record.count++
  return true
}

// 3. Создаем обработчик запроса (то, что сработает при отправке формы)
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const ip = getRequestIP(event) || 'unknown'

  // 🛡️ 1. Проверяем Rate Limit ДО валидации
  if (!checkRateLimit(ip)) {
    throw createError({ statusCode: 429, message: 'Слишком много попыток. Подождите 10 минут.' })
  }

  // 🔍 2. Валидация данных
  const validationResult = FormSchema.safeParse(body)
  if (!validationResult.success) {
    // Если ошибка в honeypot или времени → говорим боту "ошибка валидации"
    throw createError({ statusCode: 400, message: 'Ошибка валидации данных' })
  }

  const { name, phone, honeypot, timeElapsed } = validationResult.data

  // 🕳️ 3. Проверка Honeypot (если поле заполнено → это бот)
  if (honeypot && honeypot.trim().length > 0) {
    throw createError({ statusCode: 403, message: 'Подозрительная активность' })
  }

  // ⏱️ 4. Проверка времени (дублируем на случай, если Zod пропустил)
  if (timeElapsed < 3000) {
    throw createError({ statusCode: 403, message: 'Подтвердите, что вы человек' })
  }

  // 📧 5. Отправка письма
  try {
    await transporter.sendMail({
      from: `"Заявка с сайта" <${process.env.SMTP_USER}>`,
      to: 'nigilen@yandex.ru', // 👈 Почта клиента/менеджера
      subject: `Новая заявка от ${name}`,
      html: `<h3>Новая заявка!</h3><p><b>Имя:</b> ${name}</p><p><b>Телефон:</b> ${phone}</p>`
    })
    return { status: 'success' }
  } catch (error) {
    console.error('Ошибка отправки:', error)
    throw createError({ statusCode: 500, message: 'Не удалось отправить заявку' })
  }
})