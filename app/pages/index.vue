<script setup lang="ts">


useSeoMeta({
  title: 'Bulgakov',
  description: '...',
  ogTitle: 'Bulgakov',
  ogDescription: '...',
  ogImage: 'https://bulgakov.ru/og-image.png',
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
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
})

</script>

<template>
  <SectionHero />
  <SectionApproach />
  <SectionPrice />
  <SectionCta />
  <SectionBonus />
  <SectionCalculator />
  <SectionAbout />
  <SectionAdvantages />
  <SectionStats />
  <SectionPortfolio />
  <SectionReviews />
  <SectionRoadmap />
  <SectionFaq />
  <SectionRequest />
  <!-- UiModal -->
  <!-- <ModalsThank /> -->
</template>

<style scoped lang="scss">
</style>
