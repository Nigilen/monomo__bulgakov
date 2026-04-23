export const FORM_FILL_MESSAGE = 'Заполните данные'

export function isValidName(value: string): boolean {
  const s = value.trim()
  return s.length >= 3 && s.length <= 50
}

export function isValidLeadMessage(value: string): boolean {
  const s = value.trim()
  return s.length >= 50 && s.length <= 1000
}
