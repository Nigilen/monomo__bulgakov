<script setup lang="ts">

withDefaults(defineProps<{
  wide?: boolean
}>(), {
  wide: false,
})

const emit = defineEmits<{
  (e: 'close'): void
}>();

</script>

<template>
  <div
    class="modal"
    role="dialog"
    aria-modal="true"
    @click.self="emit('close')"
  >
    <div
      class="modal__content"
      :class="{ 'modal__content--wide': wide }"
      @click.stop
    >
      <button class="modal__close" type="button" aria-label="Закрыть" @click="emit('close')">
        <Icon name="icons:cross" class="modal__close-icon" width="24" height="24" />
      </button>
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  &__content {
    position: relative;
    box-sizing: border-box;
    padding: clamp(16px, 5vi, 40px);
    background-color: var(--color-background-primary);
    border-radius: var(--border-radius-primary);
    border: 1px solid var(--color-border-primary);
    inline-size: min(30vi, 550px);
    max-block-size: 98vh;
    container-type: inline-size;
    overflow-y: auto;

    &--wide {
      inline-size: min(92vi, 900px);
      padding: clamp(16px, 3vi, 32px);
    }
  }

  &__close {
    position: absolute;
    inset-block-start: 4.3cqi;
    inset-inline-end: 4.3cqi;
    inline-size: 4.3cqi;
    block-size: auto;
    aspect-ratio: 1 / 1;
  }
  
  @media (width < 1440px) {
    &__content {
      inline-size: 40vi;
    }
  }
  @media (width < 768px) {
    &__content {
      inline-size: 90vi;

      &--wide {
        inline-size: 94vi;
      }
    }
  }

}

</style>
