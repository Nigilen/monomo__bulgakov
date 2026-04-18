<script setup lang="ts">

type ModalVariant = 'default' | 'video'

withDefaults(defineProps<{
  variant?: ModalVariant
}>(), {
  variant: 'default',
});

const emit = defineEmits<{
  (e: 'close'): void
}>();

</script>

<template>
  <div
    class="modal"
    :class="{ 'modal--video': variant === 'video' }"
    role="dialog"
    aria-modal="true"
    @click.self="emit('close')"
  >
    <div
      class="modal__content"
      @click.stop
    >
      <button
        class="modal__close"
        type="button"
        aria-label="Закрыть"
        @click="emit('close')"
      >
        ×
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
  padding: clamp(16px, 4vi, 40px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  &__content {
    position: relative;
    box-sizing: border-box;
    padding: clamp(16px, 5vi, 40px);
    padding-block-start: clamp(40px, 8vi, 56px);
    background-color: var(--color-background-primary);
    border-radius: var(--border-radius-primary);
    border: 1px solid var(--color-border-primary);
    inline-size: clamp(300px, calc(100% - 32px), 600px);
    max-block-size: 90vh;
    overflow: auto;
  }

  &--video {
    @media (width >= 768px) {
      padding: clamp(16px, 2vi, 24px);

      .modal__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        inline-size: 90vw;
        max-inline-size: 90vw;
        max-block-size: 90vh;
        overflow: hidden;
      }
    }
  }

  &__close {
    position: absolute;
    inset-block-start: clamp(8px, 2vi, 16px);
    inset-inline-end: clamp(8px, 2vi, 16px);
    display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 40px;
    block-size: 40px;
    padding: 0;
    font-size: 28px;
    line-height: 1;
    color: var(--color-text-primary);
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

}

</style>
