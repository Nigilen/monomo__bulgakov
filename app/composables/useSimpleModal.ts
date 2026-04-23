export function useSimpleModal() {
  const isOpen = useState('simple-modal-open', () => false)

  function open() {
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return {
    isOpen,
    open,
    close,
  }
}
