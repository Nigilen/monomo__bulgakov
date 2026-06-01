<script setup lang="ts">

const items = [
  {
    id: 1,
    title: 'Кухонная мебель с техникой (варочная панель, вытяжка, холодильник).',
  },
  {
    id: 2,
    title: 'Стены: декоративное покрытие  с лаковым покрытием.',
  },
  {
    id: 3,
    title: 'Ванная комната: керамогранит с элементами декора на стенах, теплый пол, ванна, унитаз, умывальник, тумба, зеркало, аксессуары.',
  },
  {
    id: 4,
    title: 'Напольное покрытие: влагостойкий, антивандальный ламинат.',
  },
  {
    id: 5,
    title: 'Натяжные потолки со световыми приборами.',
  },
  {
    id: 6,
    title: 'Межкомнатные двери.',
  },
]
const emit = defineEmits<{
  (e: 'close'): void
}>();

onMounted(() => {
  acquireBodyScrollLock()
})

onUnmounted(() => {
  releaseBodyScrollLock()
})

</script>

<template>
  <div class="modal" role="dialog" aria-modal="true">
    <div class="modal__backdrop" aria-hidden="true" @click="emit('close')" />
    <div class="modal__content" @click.stop>
      <button class="modal__close" type="button" aria-label="Закрыть" @click="emit('close')">
        <Icon name="icons:cross" class="modal__close-icon" width="24" height="24" />
      </button>
      
      <h2 class="modal__title">Что входит в стоимость</h2>
      <Icon name="icons:diamonds3" class="modal__diamonds" />
      <ul class="modal__list">
        <li class="modal__item" v-for="item in items" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  inset-block-start: 0;
  inset-block-end: 0;
  inset-inline-start: 0;
  inset-inline-end: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1010;

  &__backdrop {
    position: absolute;
    inset-block-start: 0;
    inset-block-end: 0;
    inset-inline-start: 0;
    inset-inline-end: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: default;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  &__content {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    min-block-size: 0;
    padding: clamp(16px, 5vi, 40px);
    padding-inline-end: clamp(36px, 10cqi, 52px);
    background-color: var(--color-background-primary);
    border-radius: var(--border-radius-primary);
    border: 1px solid var(--color-border-primary);
    inline-size: min(549px, 90vi);
    max-block-size: 90vh;
    gap: 24px;
    container-type: inline-size;
  }

  &__title {
    flex-shrink: 0;
    margin-block: 0 clamp(12px, 2cqi, 20px);
    font-size: clamp(16px, 6cqi, 28px);
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
  }

  &__diamonds {
    display: flex;
    margin-inline: auto;
    inline-size: clamp(40px, 11.6cqi, 64px);
    block-size: auto;
    aspect-ratio: 1 / 1;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: clamp(16px, 4cqi, 24px);
  }

  &__item {
    list-style: none; 
    font-size: clamp(14px, 4cqi, 18px);
    display: grid;
    grid-template-columns: auto 1fr;
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-text-primary);

    &::before {
      content: '';
      inline-size: clamp(16px, 5cqi, 32px);
      block-size: auto;
      display: block;
      aspect-ratio: 1 / 1;
      background-image: url('@/assets/icons/list-marker.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      border-radius: 50%;
      margin-inline-end: clamp(10px, 2cqi, 16px);
      padding-block-start: clamp(20px, 6cqi, 32px);
    }
  }

  


  &__close {
    position: absolute;
    inset-block-start: clamp(15px, 1.69cqi, 20px);
    inset-inline-end: clamp(15px, 1.69cqi, 20px);
    inline-size: clamp(15px, 1.69cqi, 20px);
    block-size: auto;
    aspect-ratio: 1 / 1;

    &-icon {
      inline-size: 100%;
      block-size: 100%;
      color: var(--color-text-primary);
    }
  }

  @media (width < 768px) {

    &__list {
      gap: clamp(16px, 4cqi, 24px);
    }

    &__item {
      font-size: clamp(14px, 4cqi, 18px);
      gap: clamp(10px, 2cqi, 16px);
      align-items: center;

      &::before {
        inline-size: clamp(16px, 5cqi, 32px);
      }
    }
  }
}

</style>
