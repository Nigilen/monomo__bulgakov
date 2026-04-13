<script setup lang="ts">

withDefaults(defineProps<{
  variant?: 'primary' | 'secondary'
}>(), {
  variant: 'primary',
});

</script>

<template>
  <button class="button" :class="`button--${variant}`" type="button">
    <span class="button__label">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">

.button {
  font-size: clamp(16px, 1.7vmin, 18px);
  font-weight: 500;
  line-height: 1.3;
  inline-size: clamp(300px, 32.5vmin, 350px);
  block-size: auto;
  aspect-ratio: 350 / 100;
  border-radius: var(--border-radius-primary);
  text-transform: uppercase;
  letter-spacing: 0.17em;
  cursor: pointer;

  &__label {
    position: relative;
    z-index: 1;
  }

  &--primary {
    color: var(--color-button-text-primary);
    background-image: var(--color-button-background-primary);
    box-shadow: 0 7px 0px #7C5E49;
  }

  &--secondary {
    position: relative;
    color: var(--color-button-text-secondary);
    background-color: var(--color-button-background-secondary);

    &::after {
      content: '';
      position: absolute;
      inset: -2px;
      box-sizing: content-box;
      inline-size: 100%;
      block-size: 100%;
      border: 2px solid var(--color-border-secondary);
      border-radius: var(--border-radius-primary);
      z-index: 0;
    }

    &::before {
      content: '';
      position: absolute;
      inset: -2px;
      box-sizing: content-box;
      inline-size: 100%;
      block-size: calc(100% + 7px);
      border: 2px solid #7C5E49;
      border-radius: var(--border-radius-primary);
      z-index: 0;
    }
  }
}

</style>
