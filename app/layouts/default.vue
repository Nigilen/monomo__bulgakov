<script setup lang="ts">

definePageMeta({
  layout: 'default',
  title: 'Bulgakov',
  description: 'Bulgakov',
  keywords: 'Bulgakov',
  author: 'Bulgakov',
  robots: 'index, follow',
  canonical: 'https://bulgakov.ru',
  ogTitle: 'Bulgakov',
  ogDescription: 'Bulgakov',
  ogImage: 'https://bulgakov.ru/og-image.png',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  charset: 'utf-8',
  lang: 'ru',
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ],
});

</script>

<template>
  <LayoutHeader />
  <main>
    <slot />
  </main>
  <LayoutFooter />
</template>