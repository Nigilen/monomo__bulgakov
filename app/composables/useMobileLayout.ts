/** Как в стилях: (width < 768px). До mounted — десктоп (SSR). */
export function useMobileLayout(breakpoint = '(max-width: 767px)') {
  const isMobile = ref(false)

  let mediaQuery: MediaQueryList | null = null

  const sync = () => {
    if (mediaQuery) {
      isMobile.value = mediaQuery.matches
    }
  }

  onMounted(() => {
    mediaQuery = window.matchMedia(breakpoint)
    sync()
    mediaQuery.addEventListener('change', sync)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', sync)
    mediaQuery = null
  })

  return isMobile
}
