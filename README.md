# Bulgakov Prime

Лендинг студии **Bulgakov Prime** — элитный ремонт под ключ в Калининграде. Одностраничный сайт с тарифами, калькулятором стоимости, портфолио, отзывами и формами заявок.

Продакшен: [bulgakov-prime.ru](https://bulgakov-prime.ru)

## Стек

- [Nuxt 4](https://nuxt.com/) (SSR, Nitro)
- Vue 3, Composition API, `<script setup>`
- TypeScript
- SCSS (BEM, логические свойства CSS)
- [Zod](https://zod.dev/) — валидация на сервере
- [Nodemailer](https://nodemailer.com/) — отправка заявок на почту
- Модули: `@nuxt/icon`, `@nuxt/image`, `@nuxt/fonts`

## Возможности

- Главная страница с секциями: hero, подход, тарифы, CTA, бонусы, калькулятор, о компании, преимущества, статистика, портфолио, отзывы, этапы работ, FAQ, форма заявки
- Модальные окна: обратный звонок, калькулятор, обсуждение тарифа, консультация, политика, благодарность
- Галерея портфолио
- API `POST /api/submit` — приём заявок с валидацией, honeypot, проверкой времени заполнения и rate limit
- Яндекс.Метрика, SEO-мета, SWR-кэш главной (5 мин)

## Требования

- Node.js 20+
- npm

## Установка и запуск

```bash
npm install
cp env.exemple .env
# заполните переменные в .env
npm run dev
```

Приложение: `http://localhost:3000`

## Переменные окружения

Скопируйте `env.exemple` в `.env` и задайте значения:

| Переменная | Описание |
|------------|----------|
| `SMTP_HOST` | SMTP-хост |
| `SMTP_PORT` | Порт (обычно `465` для SSL) |
| `SMTP_USER` | Логин SMTP |
| `SMTP_PASS` | Пароль SMTP |
| `SMTP_FROM` | Адрес отправителя |
| `TELEGRAM_BOT_TOKEN` | Токен бота (опционально, уведомления в Telegram) |
| `TELEGRAM_CHAT_ID` | ID чата (опционально) |

Без корректных SMTP-настроек формы на сервере не смогут отправить письмо.

## Скрипты

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Режим разработки |
| `npm run build` | Сборка для продакшена |
| `npm run preview` | Просмотр production-сборки локально |
| `npm run generate` | Статическая генерация |
| `npm start` | Запуск Node-сервера из `.output` |

## Структура проекта

```
app/
  assets/          # SCSS, иконки, видео
  components/    # UI, секции, модалки, layout
  composables/   # Модалки, блокировка скролла, телефон
  layouts/       # Общий layout
  pages/         # index.vue — главная
  utils/         # Валидация форм, форматирование телефона
server/
  api/
    submit.post.ts   # Обработчик заявок
public/            # Статика (изображения, шрифты)
```

## Формы и API

Заявки отправляются на `POST /api/submit`. Тело запроса (JSON):

- `name`, `phone` — обязательные
- `formSource` — источник (`modal_callback`, `modal_calculator`, `modal_price`, `modal_simple` и др.)
- `message`, `tariff`, `housingType`, `area` — по типу формы
- `honeypot` — должно оставаться пустым
- `timeElapsed` — время с открытия формы (мс), не менее 3000

Защита: Zod, honeypot, лимит 3 запроса с IP за 10 минут, фильтр подозрительных User-Agent.

## Стили и вёрстка

- BEM: блок `__` элемент, `--` модификатор
- Глобальные стили: `app/assets/scss/style.scss`
- Стили компонентов — только в `<style scoped lang="scss">`
- Подробные правила — в `.cursor/rules/`

## Сборка

```bash
npm run build
npm start
```

После сборки артефакты лежат в `.output/`.

