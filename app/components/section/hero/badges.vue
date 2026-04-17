<script setup lang="ts">

defineProps<{
  badges: Array<{
    id: number
    title: string
    description: string
  }>
}>();

</script>

<template>
  <dl class="badges">
    <div class="badges__item" v-for="badge in badges" :key="badge.id">
      c
      <div class="badges__content">
        <dt class="badges__title">
          {{ badge.title }}
        </dt>
        <dd class="badges__description">
          {{ badge.description }}
        </dd>
      </div>
    </div>
  </dl>
</template>

<style scoped lang="scss">

.badges {
  display: flex;
  column-gap: 2.1vi;
  row-gap: 20px;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;

  &__item {
    display: grid;
    grid-template-columns: auto 1fr;
    flex-basis: 0;
    flex-grow: 1;
    padding-block: 2.2cqi;
    padding-inline-start: 2.5cqi;
    padding-inline-end: 2.3cqi;
    column-gap: 2.5cqi;
    container-type: inline-size;
    border-radius: var(--border-radius-primary);
    background-color: #303030d0;
  }

  &__icon {
    display: block;
    align-self: self-start;
    inline-size: 12cqi;
    block-size: auto;
    aspect-ratio: 1 / 1;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 3cqi;
    inline-size: 100%;
  }

  &__title {
    font-size: 5.2cqi;
    font-weight: 500;
    line-height: 1.3em;
    color: var(--color-text-primary);
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  &__description {
    font-size: 4.8cqi;
    font-weight: 400;
    line-height: 1.3em;
    color: var(--color-text-secondary);
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  @media (width < 768px) {
    flex-direction: column;
  }
}

</style>
