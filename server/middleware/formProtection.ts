export default defineEventHandler(async (event) => {
  if (event.path === '/api/submit' && event.method === 'POST') {
    const ip = getRequestIP(event)
    const ua = getHeader(event, 'user-agent')

    if (!ua || ua.includes('bot') || ua.includes('curl')) {
      throw createError({ statusCode: 403, message: 'Blocked' })
    }

    const key = `rate:${ip}`
    const rawCount = await useStorage().getItem<number>(key)
    const count = rawCount ?? 0

    if (count >= 5) {
      throw createError({ statusCode: 429, message: 'Too many requests' })
    }

    await useStorage().setItem(key, count + 1)
    setTimeout(() => {
      void useStorage().setItem(key, 0)
    }, 60_000)
  }
})