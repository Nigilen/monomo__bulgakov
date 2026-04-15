<script setup lang="ts">

const items = [
  {
    id: 1,
    value: 20,
    label: 'лет опыта в ремонте',
  },
  {
    id: 2,
    value: '350+',
    label: 'сданных обьектов',
  },
  {
    id: 3,
    value: '20+',
    label: 'штатных мастеров',
  },
  {
    id: 4,
    value: '45',
    label: 'дней средний срок ремонта',
  },
];
</script>

<template>
  <section class="stats">
    <ul class="stats__list">
      <li class="stats__item" v-for="item in items" :key="item.id">
        <span class="stats__item-value">{{ item.value }}</span>
        <span class="stats__item-label">{{ item.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
</style>