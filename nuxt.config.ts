import { dirname, resolve } from 'pathe'
import { fileURLToPath } from 'node:url'

const projectDir = dirname(fileURLToPath(import.meta.url))

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/fonts'],
  css: ['@/assets/scss/style.scss'],
  // app: {
  //   head: {
  //     viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  //   },
  // },
  fonts: {
    families: [
      {
        name: 'Montserrat',
        global: true,
        src: [
          { url: '/fonts/Montserrat-Regular.woff2', format: 'woff2' },
          { url: '/fonts/Montserrat-Regular.woff', format: 'woff' }
        ],
        weight: 400,
        style: 'normal',
        display: 'swap',
      },
      {
        name: 'Montserrat',
        global: true,
        src: [
          { url: '/fonts/Montserrat-Medium.woff2', format: 'woff2' },
          { url: '/fonts/Montserrat-Medium.woff', format: 'woff' }
        ],
        weight: 500,
        style: 'normal',
        display: 'swap',
      },
      {
        name: 'Montserrat',
        global: true,
        src: [
          { url: '/fonts/Montserrat-SemiBold.woff2', format: 'woff2' },
          { url: '/fonts/Montserrat-SemiBold.woff', format: 'woff' }
        ],
        weight: 600,
        style: 'normal',
        display: 'swap',
      },
      {
        name: 'Montserrat',
        global: true,
        src: [
          { url: '/fonts/Montserrat-Italic.woff2', format: 'woff2' },
          { url: '/fonts/Montserrat-Italic.woff', format: 'woff' }
        ],
        weight: 400,
        style: 'italic',
        display: 'swap',
      },
      {
        name: 'Montserrat',
        global: true,
        src: [
          { url: '/fonts/Montserrat-Bold.woff2', format: 'woff2' },
          { url: '/fonts/Montserrat-Bold.woff', format: 'woff' }
        ],
        weight: 700,
        style: 'normal',
        display: 'swap',
      },
      {
        name: 'Montserrat',
        global: true,
        src: [
          { url: '/fonts/Montserrat-ExtraBold.woff2', format: 'woff2' },
          { url: '/fonts/Montserrat-ExtraBold.woff', format: 'woff' }
        ],
        weight: 800,
        style: 'normal',
        display: 'swap',
      },
      {
        name: 'Inter',
        global: true,
        src: [
          { url: '/fonts/Inter-Black.woff2', format: 'woff2' },
          { url: '/fonts/Inter-Black.woff', format: 'woff' }
        ],
        weight: 900,
        style: 'normal',
        display: 'swap',
      },
    ],
  },
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
  image: {
    quality: 100,
    format: ['webp', 'avif', 'png'],
    dir: 'assets/images',
    /** Иначе IPX ищет только в `assets/images`; пути вида `/images/foo.png` из `public/images/` не находятся. */
    dirs: [resolve(projectDir, 'public')],
  },

})