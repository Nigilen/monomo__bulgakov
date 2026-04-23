<script setup lang="ts">

const emit = defineEmits<{
  (e: 'close'): void
}>()

</script>

<template>
  <UiModal @close="emit('close')">
    <div class="content">
      <header class="header">
        <h2 class="header__title">
          СПАСИБО!
        </h2>
        <p class="header__description">Ваша заявка принята. Мы свяжемся с вами в ближайшее время.</p>
      </header>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  container-type: inline-size;  
  min-block-size: 300px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5.1cqi;
  margin-block-end: 6.8cqi;
  
  &__title {
    font-size: clamp(24px, 7cqi, 32px);
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    color: #4F934E;
  }
  &__description {
    font-size: clamp(16px, 4cqi, 18px);
    text-align: center;
  }
}

  
</style>