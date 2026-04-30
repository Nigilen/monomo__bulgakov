let lockCount = 0
let savedScrollY = 0

const NUXT_ROOT_ID = '__nuxt'

const applyBodyScrollLock = () => {
  savedScrollY = window.scrollY
  document.documentElement.style.overflow = 'hidden'
  document.documentElement.style.overscrollBehaviorY = 'none'

  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${savedScrollY}px`
  document.body.style.setProperty('inline-size', '100%')
  document.body.style.setProperty('inset-inline-start', '0')
  document.body.style.setProperty('inset-inline-end', '0')

  const root = document.getElementById(NUXT_ROOT_ID)
  if (root) {
    root.style.overflowX = 'hidden'
    root.style.overflowY = 'hidden'
    root.style.setProperty('overscroll-behavior-y', 'none')
  }
}

const clearBodyScrollLock = () => {
  document.documentElement.style.overflow = ''
  document.documentElement.style.overscrollBehaviorY = ''

  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.removeProperty('inline-size')
  document.body.style.removeProperty('inset-inline-start')
  document.body.style.removeProperty('inset-inline-end')

  const html = document.documentElement
  html.style.setProperty('scroll-behavior', 'auto')
  window.scrollTo(0, savedScrollY)
  html.style.removeProperty('scroll-behavior')

  const root = document.getElementById(NUXT_ROOT_ID)
  if (root) {
    root.style.overflowX = ''
    root.style.overflowY = ''
    root.style.removeProperty('overscroll-behavior-y')
  }
}

export const acquireBodyScrollLock = () => {
  if (!import.meta.client) {
    return
  }
  lockCount += 1
  if (lockCount === 1) {
    applyBodyScrollLock()
  }
}

export const releaseBodyScrollLock = () => {
  if (!import.meta.client) {
    return
  }
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    clearBodyScrollLock()
  }
}
