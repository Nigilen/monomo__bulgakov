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
  <section class="stats container">
    <ul class="stats__list">
      <li class="stats__item" v-for="item in items" :key="item.id">
        <span class="stats__item-value">{{ item.value }}</span>
        <span class="stats__item-label">{{ item.label }}</span>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">

.stats {
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    gap: min(37px, 1.9vi);
  }
  
  &__item {
    display: flex;
    align-items: center;
    gap: min(48px, 2.5vi);

    &-value {
      font-size: min(80px, 4.18vi);
      font-weight: 600;
      color: var(--color-accent-primary);
    }
    
    &-label {
      font-size: min(24px, 1.25vi);
      font-weight: 400;
      color: var(--color-text-primary);
    }
  }

  @media (width < 768px) {
    &__list {
      grid-template-columns: auto;
    }

    &__item {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 10px;

      &-value {
        font-size: 16vi;
      }

      &-label {
        font-size: 4.82vi;
        text-align: end;
      }
    }

  }
}


</style>