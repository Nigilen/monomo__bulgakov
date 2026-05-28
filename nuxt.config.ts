import { dirname, resolve } from 'pathe'
import { fileURLToPath } from 'node:url'

const projectDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      meta: [
        { name: 'yandex-verification', content: '7550817aa40196db' },
        { name: 'google-site-verification', content: 'tYT_MtkFF4ES7FZ7EiNpU-I_BC-VJK3YbkKbJ9hLtLw' },
      ],
      script: [
        {
          type: 'text/javascript',
          innerHTML: `(function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108989079', 'ym');

    ym(108989079, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`
        }
      ],
      noscript: [
        {
          innerHTML: '<div><img src="https://mc.yandex.ru/watch/108989079" style="position:absolute; left:-9999px;" alt="" /></div>'
        }
      ]
    },
  },
  devtools: { enabled: false },
  routeRules: {
    '/': { swr: 300 },          // Главная: кэш 5 мин, фоновое обновление
  },
  nitro: {
    compressPublicAssets: true, // Gzip/Brotli сжатие статики
    publicAssets: [{ maxAge: 0 }],
    minify: true
  },

  compatibilityDate: '2025-07-15',
  modules: ['@nuxt/icon', '@nuxt/image'],
  css: ['@/assets/scss/style.scss'],
  // app: {
  //   head: {
  //     viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  //   },
  // },
  icon: {
    customCollections: [
      { 
        prefix: 'icons',
        dir: './app/assets/icons',
      }
    ],
    clientBundle: {
      includeCustomCollections: true,
    },
  },
})