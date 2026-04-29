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

const PHONE_MASK_TEMPLATE = '+7 ( ___ ) ___ - __ - __'

export function formatPhoneMasked(normalized: string): string {
  const body = normalized.slice(1, 11)
  let index = 0

  return PHONE_MASK_TEMPLATE.replace(/_/g, () => {
    const nextChar = body[index]
    index += 1
    return nextChar ?? '_'
  })
}

export function isCompleteRuPhone(normalizedDigits: string): boolean {
  return normalizedDigits.length === 11 && normalizedDigits.startsWith('7')
}
