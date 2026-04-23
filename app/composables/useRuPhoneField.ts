import { formatPhoneDisplay, isCompleteRuPhone, normalizePhoneDigits } from '~/utils/phoneRu'

export function useRuPhoneField() {
  const display = ref('+7 ')

  function onPhoneInput(e: Event) {
    const el = e.target as HTMLInputElement
    const norm = normalizePhoneDigits(el.value)
    display.value = formatPhoneDisplay(norm)
    nextTick(() => {
      el.value = display.value
    })
  }

  function digits() {
    return normalizePhoneDigits(display.value)
  }

  function reset() {
    display.value = '+7 '
  }

  function isComplete() {
    return isCompleteRuPhone(digits())
  }

  return { display, onPhoneInput, digits, reset, isComplete }
}
