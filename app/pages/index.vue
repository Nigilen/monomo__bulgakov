<script setup lang="ts">

const { isOpen: isPolicyModalOpen, close: closePolicyModal } = usePolicyModal()
const { isOpen: isSimpleModalOpen, close: closeSimpleModal } = useSimpleModal()
const { isOpen: isCallbackModalOpen, close: closeCallbackModal } = useCallbackModal()
const { isOpen: isCalculatorModalOpen, close: closeCalculatorModal } = useCalculatorModal()
const { isOpen: isPriceModalOpen, tariffTitle: priceModalTariff, close: closePriceModal } = usePriceModal()
const { isOpen: isThankModalOpen, close: closeThankModal } = useThankModal()
const isBackToTopVisible = ref(false)
const approachStartY = ref(0)

const updateApproachStartY = () => {
  if (!import.meta.client) {
    return
  }
  const section = document.getElementById('approach')
  if (!section) {
    approachStartY.value = Number.POSITIVE_INFINITY
    return
  }
  approachStartY.value = section.getBoundingClientRect().top + window.scrollY
}

const updateBackToTopVisibility = () => {
  if (!import.meta.client) {
    return
  }
  isBackToTopVisible.value = window.scrollY >= approachStartY.value
}

const onBackToTopClick = () => {
  if (!import.meta.client) {
    return
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

useSeoMeta({
  title: 'Ремонт под ключ в Калининграде | Bulgakov Prime – Архитектура Комфорта',
  description: 'Bulgakov Prime – элитный ремонт под ключ в Калининграде. Создаем готовые пространства для жизни с дизайн-проектом в подарок. Бутиковый сервис, личная вовлеченность и безупречное качество.',
  ogTitle: 'Ремонт под ключ в Калининграде | Bulgakov Prime – Архитектура Комфорта',
  ogDescription: 'Bulgakov Prime – элитный ремонт под ключ в Калининграде. Создаем готовые пространства для жизни с дизайн-проектом в подарок. Бутиковый сервис, личная вовлеченность и безупречное качество.',
  ogImage: 'https://bulgakov-prime.ru/logo.webp',
})

useHead({
  htmlAttrs: { lang: 'ru' },
  meta: [
    { name: 'keywords', content: '...' },
    { name: 'author', content: '...' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [
    { rel: 'canonical', href: 'https://bulgakov-prime.ru' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
})

onMounted(() => {
  updateApproachStartY()
  updateBackToTopVisibility()
  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true })
  window.addEventListener('resize', updateApproachStartY, { passive: true })
  window.addEventListener('resize', updateBackToTopVisibility, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateBackToTopVisibility)
  window.removeEventListener('resize', updateApproachStartY)
  window.removeEventListener('resize', updateBackToTopVisibility)
})

</script>

<template>
  <SectionHero />
  <UiReveal>
    <SectionApproach />
  </UiReveal>
  <UiReveal>
    <SectionPrice />
  </UiReveal>
  <UiReveal>
    <SectionCta />
  </UiReveal>
  <UiReveal>
    <SectionBonus />
  </UiReveal>
  <UiReveal>
    <SectionCalculator />
  </UiReveal>
  <UiReveal>
    <SectionAbout />
  </UiReveal>
  <UiReveal>
    <SectionAdvantages />
  </UiReveal>
  <UiReveal>
    <SectionStats />
  </UiReveal>
  <UiReveal>
    <SectionPortfolio />
  </UiReveal>
  <UiReveal>
    <SectionReviews />
  </UiReveal>
  <UiReveal>
    <SectionRoadmap />
  </UiReveal>
  <UiReveal>
    <SectionFaq />
  </UiReveal>
  <UiReveal>
    <SectionRequest />
  </UiReveal>
  <button
    v-if="isBackToTopVisible"
    class="back-to-top"
    type="button"
    aria-label="Наверх"
    @click="onBackToTopClick"
  >
    <span class="back-to-top__icon">⌃</span>
  </button>
  <Teleport to="body">
    <Transition name="modal-shell">
      <ModalsThank v-if="isThankModalOpen" @close="closeThankModal" />
    </Transition>
  </Teleport>

  <Teleport to="body">
    <Transition name="modal-shell">
      <ModalsPolicy v-if="isPolicyModalOpen" @close="closePolicyModal" />
    </Transition>
  </Teleport>

  <Teleport to="body">
    <Transition name="modal-shell">
      <ModalsSimple v-if="isSimpleModalOpen" @close="closeSimpleModal" />
    </Transition>
  </Teleport>

  <Teleport to="body">
    <Transition name="modal-shell">
      <ModalsCallback v-if="isCallbackModalOpen" @close="closeCallbackModal" />
    </Transition>
  </Teleport>

  <Teleport to="body">
    <Transition name="modal-shell">
      <ModalsCalculator v-if="isCalculatorModalOpen" @close="closeCalculatorModal" />
    </Transition>
  </Teleport>

  <Teleport to="body">
    <Transition name="modal-shell">
      <ModalsPrice
        v-if="isPriceModalOpen"
        :tariff-title="priceModalTariff"
        @close="closePriceModal"
      />
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.back-to-top {
  position: fixed;
  z-index: 30;
  inset-inline-end: clamp(21px, calc(44 / 1920 * 100vw), 44px);
  inset-block-end: clamp(21px, calc(44 / 1080 * 100vmin), 44px);
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 56px;
  block-size: 56px;
  border-radius: 16px;
  border: 1px solid var(--color-border-secondary);
  background-color: var(--color-background-secondary);
  color: var(--color-accent-primary);
  opacity: 0.58;
  transition-property: transform, box-shadow, filter, border-color;
  transition-duration: 360ms;
  transition-timing-function: ease;

  &__icon {
    font-size: 32px;
    line-height: 1.2;
    font-weight: 400;
    transform: translateY(5px);
  }

  @media (hover: hover) and (width >= 768px) {
    &:hover {
      opacity: 1;
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.28);
      filter: brightness(1.12);
      border-color: var(--color-accent-primary);
    }
  }
}
</style>
