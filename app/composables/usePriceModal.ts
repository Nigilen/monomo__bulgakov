export function usePriceModal() {
  const isOpen = useState('price-modal-open', () => false)
  const tariffTitle = useState('price-modal-tariff', () => '')

  function open(title: string) {
    tariffTitle.value = title
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
    tariffTitle.value = ''
  }

  return {
    isOpen,
    tariffTitle,
    open,
    close,
  }
}
