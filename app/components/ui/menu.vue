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
      <li class="menu__item" v-for="item in items" :key="item.label">
        <NuxtLink class="menu__link" :to="item.to">{{ item.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">

.menu {
  margin-inline: 0 auto;

  &__list {
    display: flex;
    align-items: center;
    gap: min(60px, 3.5cqi);
  }

  &__link {
    font-size: min(22px, 1.3cqi);
    font-weight: 500;
    transition: color 0.3s ease;
    white-space: nowrap;

    &:hover {
      color: var(--color-accent-primary);
    }
  }
}

</style>