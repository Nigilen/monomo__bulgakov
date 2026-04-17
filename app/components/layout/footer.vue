<script setup lang="ts">

</script>

<template>
  <footer class="container container--wide">
    <div class="logo">
      <NuxtImg class="logo__image" src="/images/footer/logo.png" alt="Logo" width="100" height="100" />
      <p class="logo__caption">Ремонт квартир и домов в Калининграде и области</p>
    </div>
    <address class="address">г. Москва, ул. Строителей 3, д. 25, офис 12</address>
    <ul class="socials">
      <li class="socials__item">
        <a class="socials__link" href="#">
          <NuxtIcon name="icons:whatsapp" />
        </a>
      </li>
      <li class="socials__item">
        <a class="socials__link" href="#">
          <NuxtIcon name="icons:telegram" />
        </a>
      </li>
    </ul>
    <div class="phone">
      <a class="phone__link" href="tel:+79999999999">+7 (999) 999-99-99</a>
      <p class="phone__description">Ежедневно с 8:00 до 20:00</p>
    </div>
  </footer>
</template>

<style scoped>
</style>