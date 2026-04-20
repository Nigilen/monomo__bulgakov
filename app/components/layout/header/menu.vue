<script setup lang="ts">

const items = [
  {
    label: 'Цены',
    to: '#prices',
  },
  {
    label: 'О нас',
    to: '#about',
  },
  {
    label: 'Портфолио',
    to: '#portfolio',
  },
  {
    label: 'Отзывы',
    to: '#reviews',
  },
];

</script>

<template>
  <nav class="menu">
    <ul class="menu__list">
      <li v-for="item in items" :key="item.label">
        <NuxtLink class="menu__link" :to="item.to">{{ item.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">

.menu {

  &__list {
    display: flex;
    align-items: center;
    gap: 3.13vi;
  }

  &__link {
    font-size: 1.15vi;
    font-weight: 500;
    white-space: nowrap;

    &:hover {
      color: var(--color-accent-primary);
    }
  }


  @media (width < 768px) {
    &__list {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }

    &__link {
      font-size: 18px;
    }
  }
}

</style>