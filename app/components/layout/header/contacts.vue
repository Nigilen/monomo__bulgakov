<script setup lang="ts">

const socials = [
  {
    name: 'telegram',
    to: '#',
  },
  {
    name: 'whatsapp',
    to: '#',
  },
];

</script>

<template>
  <div class="contacts">
    <ul class="contacts__socials">
      <li class="contacts__socials-item" v-for="social in socials" :key="social.name">
        <NuxtLink class="contacts__socials-link" :to="social.to">
          <Icon class="contacts__socials-icon" :name="`icons:${social.name}`" />
        </NuxtLink>
      </li>
    </ul>
    <div class="contacts__phone-container">
      <NuxtLink class="contacts__phone" to="tel:+79682810092">+7 (968) 281-00-92</NuxtLink>
      <p class="contacts__label">Ежедневно с 8:00 до 20:00</p>
    </div>
    <button class="contacts__button" to="#" type="button">
      Заказать звонок
    </button>
  </div>
</template>

<style scoped lang="scss">

.contacts {
  display: flex;
  align-items: center;
  margin-inline-start: auto;

  &__socials {
    display: flex;
    align-items: center;
    gap: 1.95cqi;
    margin-inline-start: 0;
    margin-inline-end: 3cqi;

    &-item {
      margin: 0;
    }

    &-link {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      transition: color 0.3s ease;
      inline-size: 2cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;

      &:hover {
        color: var(--color-accent-primary);
      }
    }

    &-icon {
      width: 100%;
      height: 100%;
    }
  }

  &__phone-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  &__phone {
    font-size: 1.35cqi;
    white-space: nowrap;
  }
  
  &__label {
    font-size: 0.9cqi;
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
  
  &__button {
    display: block;
    background-color: var(--color-button-background-primary);
    inline-size: 16.9cqi;
    block-size: auto;
    aspect-ratio: 300 / 80;
    margin-inline-start: 4.1cqi;
    margin-inline-end: 0;
    border-radius: 0.9vi;
    border: 2px solid var(--color-border-secondary);
    font-size: 1.2cqi;
    color: var(--color-button-text-secondary);
    text-transform: uppercase;
    white-space: nowrap;
  }

  @media (width < 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
    gap: 35px;
    inline-size: 100%;

    &__socials {
      margin-inline: 0;
      
      &-link {
        inline-size: 25px;
      }
    }

    &__phone-container {
      margin-inline: 0;
    }

    &__phone {
      font-size: 20px;
    }

    &__label {
      font-size: 16px;
    }


    &__button {
      margin-inline: 0;
      font-size: 20px;
      inline-size: 100%;
    }
  }
}

</style>