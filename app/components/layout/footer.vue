<script setup lang="ts">

</script>

<template>
  <footer class="footer container container--wide">
    <div class="footer__logo logo">
      <NuxtImg 
        class="logo__image" 
        src="/logo.svg" 
        alt="Logo" 
        width="213" 
        height="117" 
        loading="lazy"
      />
      <p class="logo__caption">
        Ремонт квартир и домов в Калининграде и области
      </p>
    </div>
    <address class="footer__address address">
      г. Москва, ул. Строителей 3, д. 25, офис 12
    </address>
    <ul class="footer__socials socials">
      <li class="socials__item">
        <a class="socials__link" href="#">
          <Icon class="socials__icon" name="icons:whatsapp" />
        </a>
      </li>
      <li class="socials__item">
        <a class="socials__link" href="#">
          <Icon class="socials__icon" name="icons:telegram" />
        </a>
      </li>
    </ul>
    <div class="footer__phone phone">
      <a class="phone__link" href="tel:+79999999999">+7 (999) 999-99-99</a>
      <p class="phone__description">Ежедневно с 8:00 до 20:00</p>
    </div>
  </footer>
</template>

<style scoped lang="scss">

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: min(32px, 1.66vi);
  padding-block: min(96px, 5vi) min(30px, 1.67vi);
  background-image: linear-gradient(to bottom, #252525, #000000);
  container-type: inline-size;

  @media (width < 768px) {
    flex-direction: column;
    row-gap: 42px;
    padding-block: 102px 26px;
  }
}

.logo {
  display: flex;
  column-gap: 3.1cqi;
  align-items: center;

  &__image {
    inline-size: 12cqi;
    block-size: auto;
    aspect-ratio: 213 / 117;
  }
  &__caption {
    inline-size: 18.1cqi;
    padding-inline-start: 1.9cqi;
    padding-block: 1cqi;
    font-size: 1cqi;
    line-height: calc(30 / 18);
    border-inline-start: 1px solid var(--color-border-primary);
    color: var(--color-text-secondary);
  }

  @media (width < 768px) {
    flex-direction: column;
    row-gap: 42px;

    &__image {
      inline-size: 150px;
    }

    &__caption {
      padding: 0;
      border: none;
      text-align: center;
      font-size: 16px;
      inline-size: 240px;
      line-height: calc(24 / 16);
    }
  }
}
.address {
  font-size: 1.13cqi;
  line-height: calc(30 / 20);
  font-style: normal;
  font-weight: 600;
  color: var(--color-text-primary);
  inline-size: 18.5cqi;
  text-align: center;

  @media (width < 768px) {
    font-size: 16px;
    inline-size: 268px;
  }
}
.socials {
  display: flex;
  gap: 1.5cqi;

  &__item {
  }
  &__icon {
    inline-size: 1.5cqi;
    block-size: auto;
    aspect-ratio: 1 / 1;
  }

  @media (width < 768px) {
    gap: 20px;

    &__icon {
      inline-size: 24px;
    }
  }
}
.phone {
  display: flex;
  flex-direction: column;
  text-align: center;

  &__link {
    font-size: 1.33cqi;
    line-height: calc(30 / 20);
    font-style: normal;
    font-weight: 600;
    color: var(--color-text-primary);
  }
  &__description {
    font-size: 0.89cqi;
    line-height: calc(30 / 16);
    color: var(--color-text-secondary);
  }

  @media (width < 768px) {

    &__link {
      font-size: 18px;
    }
    &__description {
      font-size: 16px;
    }
  }
}


</style>