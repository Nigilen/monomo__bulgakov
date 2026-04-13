<script setup lang="ts">

export type SectionHeaderTitleSegment = {
  text: string
  highlight?: boolean
};

defineProps<{
  titleSegments: SectionHeaderTitleSegment[]
  description: string
}>();

</script>

<template>
  <h2 class="section-header__title">
    <template v-for="(segment, index) in titleSegments" :key="index">
      <span
        v-if="segment.highlight"
        class="section-header__title_highlight"
      >{{ segment.text }}</span>
      <span v-else>{{ segment.text }}</span>
    </template>
  </h2>
  <p class="section-header__description">
    {{ description }}
  </p>
</template>

<style scoped lang="scss">

.section-header {
  &__title {
    font-size: clamp(32px, 5.7vmin, 62px);
    font-weight: 400;
    line-height: 1.45;
    text-transform: uppercase;
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;

    &_highlight {
      font-weight: 500;
      color: var(--color-accent-primary);
    }
  }

  &__description {
    font-size: clamp(16px, 1.9vmin, 20px);
    color: var(--color-text-secondary);
    line-height: 1.75;
    font-weight: 400;
    font-style: italic;
    align-self: center;
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;
  }
}

</style>
