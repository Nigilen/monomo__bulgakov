import { formatPhoneMasked, isCompleteRuPhone, normalizePhoneDigits } from '~/utils/phoneRu'

export function useRuPhoneField() {
  const PHONE_MASK_PLACEHOLDER = '+7 ( ___ ) ___ - __ - __'
  const PHONE_MASK_DIGIT_POSITIONS = [...PHONE_MASK_PLACEHOLDER]
    .map((char, index) => (char === '_' ? index : -1))
    .filter((index) => index !== -1)
  const display = ref(PHONE_MASK_PLACEHOLDER)

  const getPhoneBodyDigits = (value: string) => normalizePhoneDigits(value).slice(1, 11)
  const getDigitSlotIndex = (caretPosition: number) => PHONE_MASK_DIGIT_POSITIONS.filter((position) => position < caretPosition).length
  const getCaretPositionBySlotIndex = (slotIndex: number) => {
    const lastMaskDigitPosition = PHONE_MASK_DIGIT_POSITIONS[PHONE_MASK_DIGIT_POSITIONS.length - 1] ?? (PHONE_MASK_PLACEHOLDER.length - 1)

    if (slotIndex <= 0) {
      return PHONE_MASK_DIGIT_POSITIONS[0] ?? 0
    }

    if (slotIndex >= PHONE_MASK_DIGIT_POSITIONS.length) {
      return lastMaskDigitPosition + 1
    }

    return PHONE_MASK_DIGIT_POSITIONS[slotIndex] ?? (lastMaskDigitPosition + 1)
  }

  const applyMaskedValue = (el: HTMLInputElement, bodyDigits: string, slotIndex: number) => {
    const maskedPhone = formatPhoneMasked(`7${bodyDigits}`)
    display.value = maskedPhone
    el.value = maskedPhone

    const nextCaretPosition = getCaretPositionBySlotIndex(slotIndex)
    requestAnimationFrame(() => {
      el.setSelectionRange(nextCaretPosition, nextCaretPosition)
    })
  }

  function onPhoneInput(e: Event) {
    const el = e.target as HTMLInputElement
    const rawValue = el.value
    const caretPosition = el.selectionStart ?? rawValue.length
    const safeCaretPosition = typeof caretPosition === 'number' ? caretPosition : rawValue.length
    const digitsBeforeCaret = (rawValue.slice(0, safeCaretPosition).match(/\d/g)?.length ?? 0) - 1
    const bodyDigitsBeforeCaret = Math.max(0, digitsBeforeCaret)
    const normalizedPhone = normalizePhoneDigits(rawValue)
    const maskedPhone = formatPhoneMasked(normalizedPhone)
    display.value = maskedPhone

    if (el.value !== maskedPhone) {
      el.value = maskedPhone
    }

    const nextCaretPosition = getCaretPositionBySlotIndex(bodyDigitsBeforeCaret)
    requestAnimationFrame(() => {
      el.setSelectionRange(nextCaretPosition, nextCaretPosition)
    })
  }

  function onPhoneKeydown(e: KeyboardEvent) {
    if (e.key !== 'Backspace' && e.key !== 'Delete') {
      return
    }

    const el = e.target as HTMLInputElement
    const selectionStart = el.selectionStart ?? 0
    const selectionEnd = el.selectionEnd ?? selectionStart
    const bodyDigits = getPhoneBodyDigits(display.value)
    const digits = bodyDigits.split('')
    const enteredDigitsCount = digits.length

    if (enteredDigitsCount === 0) {
      e.preventDefault()
      applyMaskedValue(el, '', 0)
      return
    }

    const startSlotIndex = getDigitSlotIndex(selectionStart)
    const endSlotIndex = getDigitSlotIndex(selectionEnd)

    if (selectionStart !== selectionEnd) {
      const removeFrom = Math.min(startSlotIndex, enteredDigitsCount)
      const removeTo = Math.min(endSlotIndex, enteredDigitsCount)

      if (removeFrom < removeTo) {
        e.preventDefault()
        digits.splice(removeFrom, removeTo - removeFrom)
        applyMaskedValue(el, digits.join(''), removeFrom)
      }
      return
    }

    if (e.key === 'Backspace') {
      const removeIndex = Math.min(startSlotIndex - 1, enteredDigitsCount - 1)
      if (removeIndex >= 0) {
        e.preventDefault()
        digits.splice(removeIndex, 1)
        applyMaskedValue(el, digits.join(''), removeIndex)
      }
      return
    }

    const removeIndex = Math.min(startSlotIndex, enteredDigitsCount - 1)
    if (removeIndex >= 0) {
      e.preventDefault()
      digits.splice(removeIndex, 1)
      applyMaskedValue(el, digits.join(''), removeIndex)
    }
  }

  function digits() {
    return normalizePhoneDigits(display.value)
  }

  function reset() {
    display.value = PHONE_MASK_PLACEHOLDER
  }

  function isComplete() {
    return isCompleteRuPhone(digits())
  }

  return { display, onPhoneInput, onPhoneKeydown, digits, reset, isComplete }
}
