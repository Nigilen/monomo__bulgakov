<script setup lang="ts">

const { isOpen: isPolicyModalOpen, close: closePolicyModal } = usePolicyModal()
const { isOpen: isSimpleModalOpen, close: closeSimpleModal } = useSimpleModal()
const { isOpen: isCallbackModalOpen, close: closeCallbackModal } = useCallbackModal()
const { isOpen: isCalculatorModalOpen, close: closeCalculatorModal } = useCalculatorModal()
const { isOpen: isPriceModalOpen, tariffTitle: priceModalTariff, close: closePriceModal } = usePriceModal()
const { isOpen: isThankModalOpen, close: closeThankModal } = useThankModal()

useSeoMeta({
  title: 'Bulgakov',
  description: '...',
  ogTitle: 'Bulgakov',
  ogDescription: '...',
  ogImage: 'https://bulgakov.ru/logo.svg',
})

useHead({
  htmlAttrs: { lang: 'ru' },
  meta: [
    { name: 'keywords', content: '...' },
    { name: 'author', content: '...' },
    { name: 'robots', content: 'index, follow' },
  ],
  link: [
    // { rel: 'canonical', href: 'https://bulgakov.ru' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  ],
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
</style>
