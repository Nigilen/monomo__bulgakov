<script setup lang="ts">

const area = ref(0);


</script>

<template>
  <form class="form">
    <fieldset class="form__item form__item--tariff">
      <legend class="form__legend form__legend--tariff">Выберите тариф</legend>
      <div class="form__options form__options--tariff">
        <input class="form__input form__input--tariff" type="radio" name="tariff" id="tariff-1">
        <label class="form__label form__label--tariff" for="tariff-1">Инвест</label>
      </div>
      <div class="form__options form__options--tariff">
        <input class="form__input form__input--tariff" type="radio" name="tariff" id="tariff-2" checked>
        <label class="form__label form__label--tariff" for="tariff-2">Мой дом</label>
      </div>
      <div class="form__options form__options--tariff">
        <input class="form__input form__input--tariff" type="radio" name="tariff" id="tariff-3">
        <label class="form__label form__label--tariff" for="tariff-3">Комфорт</label>
      </div>
      <div class="form__options form__options--tariff">
        <input class="form__input form__input--tariff" type="radio" name="tariff" id="tariff-4">
        <label class="form__label form__label--tariff" for="tariff-4">Прайм</label>
      </div>
    </fieldset>
    <div class="form__item form__item--area">
      <label class="form__legend form__legend--area" for="area">Площадь помещения</label>
      <div class="form__input-wrapper">
        <div class="form__value form__value--area" :style="{ '--area-value': area }">{{ area }} м²</div>
        <input class="form__input form__input--area" type="range" name="area" id="area" v-model="area">
      </div>
    </div>
    <fieldset class="form__item form__item--type">
      <legend class="form__legend form__legend--type">Тип жилья</legend>
      <div class="form__options">
        <input class="form__input form__input--type" type="radio" name="type" id="type-1">
        <label class="form__label form__label--type" for="type-1">Новостройка</label>
      </div>
      <div class="form__options">
        <input class="form__input form__input--type" type="radio" name="type" id="type-2">
        <label class="form__label form__label--type" for="type-2">Вторичка</label>
      </div>
    </fieldset>
    <p class="form__item form__item--price">
      <span class="form__legend form__legend--price">Примерная стоимость</span>
      <span class="form__value form__value--price">250 000 руб</span>
    </p>
  </form>
</template>

<style scoped lang="scss">
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto auto;
  row-gap: min(40px, 2.1vi);
  padding-block: min(48px, 2.5vi);
  padding-inline: min(60px, 3.13vi);
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-primary);
  container-type: inline-size;


  &__legend {
    font-size: 2.65cqi;
    font-weight: 500;
    line-height: 1;
    color: var(--color-text-primary);
    margin-block-end: 3.13cqi;


    &--price {
      margin-block-end: 0;
    }

    &--area {
      margin-block-end: 6cqi;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 2.42cqi;
    border: none;
    inline-size: 100%;

    &--tariff {
      grid-column: 1 / -1;
      grid-row: 1 / 2;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &--area {
      grid-column: 1 / -1;
      grid-row: 2 / 3;
    }

    &--type {
      grid-column: 1 / 2;
      grid-row: 3 / 4;
    }

    &--price {
      grid-column: 2 / -1;
      grid-row: 3 / 4;
      gap: 3.13cqi;
      align-items: flex-end;
      margin-block: auto 0;
    }

  }


  &__input {

    &--tariff {
      display: none;

      &:checked+.form__label--tariff {
        background-color: var(--color-accent-primary);
        color: var(--color-text-primary);
      }
    }

    &--type {
      display: none;

      &:checked+.form__label--type {
        &::before {
          background-color: var(--color-accent-primary);
        }
      }
    }

    &--area {
      appearance: none;
      background-color: var(--color-text-secondary);
      inline-size: 100%;
      block-size: 4px;
    }

    &--area::-webkit-slider-thumb {
      appearance: none;
      background-color: var(--color-background-secondary);
      border: 0.6cqi solid var(--color-border-secondary);
      border-radius: 50%;
      inline-size: 3.5cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }

    &--area::-moz-range-thumb {
      appearance: none;
      background-color: var(--color-background-secondary);
      border: 0.6cqi solid var(--color-border-secondary);
      border-radius: 50%;
      inline-size: 3.5cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }

    &--area::-ms-thumb {
      appearance: none;
      background-color: var(--color-background-secondary);
      border: 0.6cqi solid var(--color-border-secondary);
      border-radius: 50%;
      inline-size: 3.5cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }
  }

  &__label {

    &--tariff {
      display: flex;
      align-items: center;
      justify-content: center;
      inline-size: 21.8cqi;
      block-size: auto;
      aspect-ratio: 180 /67;
      background-color: transparent;
      border: 1px solid var(--color-border-secondary);
      border-radius: 1.9cqi;
      cursor: pointer;
      text-transform: uppercase;
      font-size: 2.18cqi;
      font-weight: 500;
      line-height: 1;
      color: var(--color-accent-primary);
    }

    &--type {
      display: flex;
      align-items: center;
      gap: 1.21cqi;
      font-size: 2.65cqi;
      font-weight: 500;
      line-height: 1;
      color: var(--color-text-primary);
      cursor: pointer;

      &::before {
        content: '';
        display: block;
        inline-size: 3.24cqi;
        block-size: auto;
        aspect-ratio: 1 / 1;
        background-color: transparent;
        border: 1px solid var(--color-text-secondary);
        border-radius: var(--border-radius-primary);
      }
    }
  }


  &__input-wrapper {
    position: relative;
  }


  &__value {
    font-size: 5.1cqi;
    font-weight: 400;
    line-height: 1;
    color: var(--color-text-primary);


    &--area {
      position: absolute;
      inset-block-start: -4cqi;
      inset-inline-start: 0;
      text-align: center;
      transform: translateX(calc(var(--area-value) * 0.94cqi));
      font-size: 2.65cqi;
      font-weight: 400;
      line-height: 1;
      color: var(--color-text-primary);
    }
  }

  @media (width < 768px) {
    row-gap: 40px;
    padding-block: 26px;
    padding-inline: 16px;
    border-radius: 16px;

    &__input {
      &--area {
        inline-size: 100%;
      }

      &--area::-webkit-slider-thumb {
        inline-size: 20px;
        border-width: 2px;
      }

      &--area::-moz-range-thumb {
        inline-size: 20px;
        border-width: 2px;
      }

      &--area::-ms-thumb {
        inline-size: 20px;
        border-width: 2px;
      }
    }

    &__item {
      flex-wrap: wrap;

      &--tariff {
        gap: 16px;
      }

      &--type {}

      &--price {
        grid-column: 1 / -1;
        grid-row: 4 / 5;
        align-items: center;
      }

    }

    &__options {

      &--tariff {
        flex-grow: 0;
        flex-shrink: 1;
        flex-basis: calc((100% - 16px) / 2);
      }
    }

    &__legend {
      font-size: 16px;
      margin-block-end: 20px;

      &--tariff {
        margin-block-end: 20px;
      }

      &--type {
        margin-block-end: 16px;
      }

      &--area {
        margin-block-end: 56px;
      }

      &--price {
        margin-block-end: 16px;
      }

    }

    &__label {
      font-size: 16px;

      &--tariff {
        inline-size: 100%;
      }


    }

    &__value {
      font-size: 24px;

      &--area {
        font-size: 16px;
        inset-block-start: -20px;
        transform: translateX(calc(var(--area-value) * 2.7px));
      }
    }
  }
}
</style>