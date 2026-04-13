<script setup lang="ts">

defineProps<{
  items: Array<{
    id: number
    title: string
    description: string
  }>
}>();

</script>

<template>
  <ul class="list">
    <li class="list__item" v-for="item in items" :key="item.id">
      <h3 class="list__item_title">
        {{ item.title }}
      </h3>
      <p class="list__item_description">
        {{ item.description }}
      </p>
    </li>
  </ul>
</template>

<style scoped lang="scss">

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-block-start: clamp(32px, 8.3vmin, 90px);
  row-gap: clamp(32px, 6.3vmin, 70px);
  list-style: none;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  inline-size: 100%;
  flex-basis: 0;
  flex-grow: 1;
  min-inline-size: 0;

  &__item {
    position: relative;
    container-type: inline-size;
    inline-size: 100%;

    &::before {
      content: '';
      position: absolute;
      inset-block-start: 1.3cqmin;
      inset-inline-start: 0;
      display: block;
      inline-size: 2.6cqmin;
      block-size: auto;
      aspect-ratio: 1 / 1;
      background-image: url('@/assets/icons/list-marker.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    &_title {
      font-size: clamp(18px, 3.6cqmin, 28px);
      font-weight: 600;
      margin-block-end: 1.3cqmin;
      color: var(--color-accent-primary);
      text-transform: uppercase;
      margin-inline-start: 3.5cqmin;
    }
  
    &_description {
      font-size: clamp(16px, 2.5cqmin, 20px);
      line-height: 1.75;
      font-weight: 400;
    }
  }
}

@media (width < 768px) {
  .list {
    margin-block-start: 0;

    &__item {

      &::before {
        inset-block-start: 1.3cqmin;
        inline-size: 20px;
      }

      &_title {
        margin-inline-start: 32px;
      }

      &_description {
        margin-inline-start: 32px;
      }
    }
  }
}

</style>
