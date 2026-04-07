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
          <Icon :name="`icons:${social.name}`" />
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

  &__socials {
    display: flex;
    align-items: center;
    gap: min(35px, 2cqi);
    margin-inline: 0 min(50px, 2.9cqi);

    &-link {
      font-size: min(30px, 1.8cqi);
      font-weight: 500;
      transition: color 0.3s ease;

      &:hover {
        color: var(--color-accent-primary);
      }
    }
  }

  &__phone-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  
  &__phone {
    font-size: min(24px, 1.4cqi);
    white-space: nowrap;
  }
  
  &__label {
    font-size: min(16px, 0.9cqi);
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
  
  &__button {
    display: block;
    white-space: nowrap;
    font-size: min(20px, 1.1cqi);
    color: var(--color-button-text-secondary);
    background-color: var(--color-button-background-primary);
    padding: min(28px, 1.7cqi) min(46px, 2.7cqi);
    margin-inline: min(72px, 4.1cqi) 0;
    border-radius: var(--border-radius-primary);
    border: 2px solid var(--color-button-text-primary);
    text-transform: uppercase;
    line-height: 1.24;
  }
}


</style>