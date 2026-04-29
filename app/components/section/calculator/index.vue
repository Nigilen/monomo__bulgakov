<script setup lang="ts">

const { open: openCalculatorModal } = useCalculatorModal()

</script>

<template>
  <section id="calculator" class="calculator container">
    <div class="calculator__content content">
      <h2 class="content__title">
        Рассчитать 
        <span class="content__title-highlight">стоимость</span>
      </h2>
      <p class="content__description">
        Рассчитайте примерную стоимость ремонта с учетом материалов в калькуляторе или отправьте заявку на точный расчет с учетом всех ваших пожеланий.
      </p>
    </div>
    <button class="calculator__button" type="button" @click="openCalculatorModal">
      Рассчитать стоимость
    </button>
    <SectionCalculatorForm class="calculator__form" />
  </section>
</template>

<style scoped lang="scss">

.calculator {
  display: grid;
  grid-template-columns: auto min(948px, 49.38vi);
  column-gap: 80px;

  margin-block-end: 12vi;

  &__content {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-block-end: 20px;
  }

  &__button {
    grid-column: 1 / 2;
    grid-row: 2 / 3;

    align-self: flex-end;
    inline-size: min(350px, 18.25vi);
    block-size: auto;
    aspect-ratio: 350 / 100;
    font-size: min(20px, 1.05vi);
    font-weight: 600;
    line-height: 1;
    text-transform: uppercase;
    color: var(--color-button-text-primary);
    background-image: var(--color-button-background-primary);
    border-radius: var(--border-radius-primary);
    cursor: pointer;
    transition-property: transform, box-shadow, filter;
    transition-duration: 460ms;
    transition-timing-function: ease;
  }

  @media (hover: hover) and (width >= 768px) {
    &__button:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
      filter: brightness(1.08);
    }
  }

  &__form {
    grid-column: 2 / -1;
    grid-row: 1 / 3;
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    column-gap: 0;
    row-gap: 42px;

    margin-block-end: 100px;

    &__content {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      gap: 32px;
      margin-block-end: 0;
    }

    &__button {
      grid-column: 1 / -1;
      grid-row: 3 / 4;

      inline-size: 100%;
      aspect-ratio: 343 / 76;
      margin-inline: auto;
      font-size: 16px;

      border-radius: 16px;
      inline-size: 343px;

    }

    &__form {
      grid-column: 1 / -1;
      grid-row: 2 / 3;
      margin-block-start: 0;
      inline-size: 100%;
      margin-inline: auto;
    }
  }

}

.content {

  &__title {
    font-size: min(62px, 3.3vi);
    font-weight: 400;
    line-height: 1.4;
    text-transform: uppercase;
    
    &-highlight {
      font-weight: 600;
      color: var(--color-accent-primary);
    }
  }

  &__description {
    font-size: min(20px, 1.05vi);
    font-weight: 400;
    line-height: calc(35/20);
    color: var(--color-text-primary);
  }

  @media (width < 768px) {

    
    &__title {
      font-size: 32px;
      letter-spacing: -0.035em;
    }

    &__description {
      font-size: 16px;
    }
  }
}

</style>