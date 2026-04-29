<script setup lang="ts">

const { open: openCallbackModal } = useCallbackModal()

const socials = [
  {
    name: 'telegram',
    to: '#',
  },
  {
    name: 'max',
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
    <button class="contacts__button" type="button" @click="openCallbackModal">
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
    gap: 1.82vi;
    margin-inline-start: 0;
    margin-inline-end: 2.87vi;

    &-item {
      margin: 0;
    }

    &-link {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      transition: color 0.3s ease;
      inline-size: 1.7vi;
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
    gap: 0.2vi;
  }
  
  &__phone {
    font-size: 1.25vi;
    white-space: nowrap;
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-accent-primary);
    }
  }
  
  &__label {
    font-size: 0.835vi;
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
  
  &__button {
    display: block;
    background-color: var(--color-button-background-primary);
    inline-size: 15.65vi;
    block-size: auto;
    aspect-ratio: 300 / 80;
    margin-inline-start: 3.75vi;
    margin-inline-end: 0;
    border-radius: 0.8vi;
    border: 2px solid var(--color-border-secondary);
    font-size: 1.045vi;
    color: var(--color-button-text-secondary);
    text-transform: uppercase;
    white-space: nowrap;
    font-weight: 600;
    transition-property: transform, box-shadow, border-color;
    transition-duration: 460ms;
    transition-timing-function: ease;
  }

  @media (hover: hover) and (width >= 768px) {
    &__button:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
      border-color: var(--color-accent-primary);
    }
  }

  @media (width < 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
    gap: 32px;
    inline-size: 100%;

    &__socials {
      margin-inline: 0;
      gap: 20px;
      
      &-link {
        inline-size: 20px;
      }
    }

    &__phone-container {
      margin-inline: 0;
    }

    &__phone {
      font-size: 18px;
    }

    &__label {
      font-size: 16px;
    }


    &__button {
      margin-inline: 0;
      font-size: 16px;
      aspect-ratio: none;
      block-size: 80px;
      inline-size: 100%;
      border-radius: 16px;
    }
  }
}

</style>