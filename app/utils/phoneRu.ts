/** Российский номер: всегда с +7, всего 11 цифр (7 и 10 знаков номера). */

export function normalizePhoneDigits(input: string): string {
  let d = input.replace(/\D/g, '')
  if (d.startsWith('8')) {
    d = '7' + d.slice(1)
  }
  if (d.length === 0) {
    return ''
  }
  if (!d.startsWith('7')) {
    if (d.startsWith('9')) {
      d = '7' + d
    }
    else {
      d = '7' + d.replace(/^7+/, '')
    }
  }
  return d.slice(0, 11)
}

/** Формат как в плейсхолдере: +7 ( XXX ) XXX - XX - XX */
export function formatPhoneDisplay(normalized: string): string {
  const d = normalized.slice(0, 11)
  const body = d.slice(1)
  if (body.length === 0) {
    return '+7 '
  }
  let out = '+7 ('
  out += body.slice(0, Math.min(3, body.length))
  if (body.length <= 3) {
    return out + (body.length === 3 ? ') ' : '')
  }
  out += ') ' + body.slice(3, Math.min(6, body.length))
  if (body.length <= 6) {
    return out
  }
  out += ' - ' + body.slice(6, Math.min(8, body.length))
  if (body.length <= 8) {
    return out
  }
  return `${out} - ${body.slice(8, 10)}`
}

export function isCompleteRuPhone(normalizedDigits: string): boolean {
  return normalizedDigits.length === 11 && normalizedDigits.startsWith('7')
}
