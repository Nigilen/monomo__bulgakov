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
      <Icon name="icons:diamonds4" class="badges__icon" />
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
  margin: 0;

  &__item {
    display: grid;
    grid-template-columns: auto 1fr;
    flex-basis: 0;
    flex-grow: 1;
    padding-block: 1.8vi;
    padding-inline-start: 2.1vi;
    padding-inline-end: 1.05vi;
    column-gap: 1.55vi;
    container-type: inline-size;
    border-radius: 0.8vi;
    background-color: #303030d0;
  }

  &__icon {
    display: block;
    align-self: self-start;
    inline-size: 11.6cqi;
    block-size: auto;
    aspect-ratio: 1 / 1;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2.75cqi;
    inline-size: 100%;
  }

  &__title {
    font-size: 5.1cqi;
    font-weight: 500;
    line-height: 1;
    color: var(--color-text-primary);

  }

  &__description {
    font-size: 4.63cqi;
    font-weight: 400;
    line-height: calc(30 / 20);
    color: var(--color-text-secondary);
  }

  @media (width < 768px) {
    flex-direction: column;
    row-gap: 22px;
    inline-size: 100%;
    margin-inline: auto;
    

    &__item {
      padding: 16px;
      column-gap: 16px;
      border-radius: 16px;
    }

    &__icon {
      inline-size: 40px;
    }

    &__content {
      gap: 16px;
    }

    &__title {
      font-size: 18px;
    }
    
    &__description {
      font-size: 16px;
      line-height: calc(22 / 16);
    }
  }
}

</style>
