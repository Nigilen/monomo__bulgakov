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
      <Icon class="badges__icon" name="icons:diamonds4" />
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
  column-gap: min(16px, 1.5vmin);
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
    padding-block: clamp(16px, 3.2vb, 35px);
    padding-inline: clamp(16px, 2.1vi, 40px) clamp(16px, 1.8vi, 36px);
    column-gap: clamp(16px, 2.1vi, 40px);
    container-type: inline-size;
    border-radius: var(--border-radius-primary);
    background-color: #303030d0;
  }

  &__icon {
    display: block;
    align-self: self-start;
    inline-size: clamp(40px, 11.5cqmin, 50px);
    block-size: auto;
    aspect-ratio: 1 / 1;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.5cqb;
    inline-size: 100%;
  }

  &__title {
    font-size: clamp(18px, 5.1cqmin, 22px);
    font-weight: 500;
    line-height: 1.3;
    color: var(--color-text-primary);
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  &__description {
    font-size: clamp(16px, 4.6cqmin, 20px);
    font-weight: 400;
    line-height: 1.3;
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
