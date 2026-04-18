<script setup lang="ts">

</script>

<template>
  <UiModal>
    <div class="modal">
      <button class="modal__close">
        <Icon name="icons:cross" class="modal__close-icon" width="24" height="24" />
      </button>
      <h2 class="modal__title">Спасибо за ваше сообщение!</h2>
      <p class="modal__description">Мы свяжемся с вами в ближайшее время.</p>
      <button class="modal__button">Закрыть</button>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
  container-type: inline-size;

  &__close {
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    padding: 10px;
    
    &-icon {
      inline-size: 24px;
      block-size: 24px;
      color: var(--color-text-primary);
    }
  }
  &__title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
  }
  &__description {
    font-size: 20px;
    font-weight: 400;
    text-align: center;
  }
  &__button {
    padding: 10px 20px;
    inline-size: 100%;
    padding-block: 30px;
    border-radius: 16px;
    background-image: var(--color-button-background-primary);
    color: var(--color-button-text-primary);
    font-size: 20px;
    text-transform: uppercase;
    text-align: center;
  }
}
</style>