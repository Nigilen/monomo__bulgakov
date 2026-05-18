<script setup lang="ts">

type TariffOption = {
  id: string
  label: string
  value: number
}

const areaMin = 20;
const areaMax = 250;
const area = ref(areaMin);
const areaProgress = computed(() => (area.value - areaMin) / (areaMax - areaMin));
const tariffs: TariffOption[] = [
  { id: 'tariff-1', label: 'Инвест', value: 27500 },
  { id: 'tariff-2', label: 'Мой дом', value: 33000 },
  { id: 'tariff-3', label: 'Комфорт', value: 52000 },
  { id: 'tariff-4', label: 'Прайм', value: 60000 }
];
const defaultTariffValue = tariffs.find((tariff) => tariff.id === 'tariff-2')?.value ?? 33000;
const selectedTariff = ref(defaultTariffValue);
const totalPrice = computed(() => selectedTariff.value * area.value);
const formattedTotalPrice = computed(() => `${new Intl.NumberFormat('ru-RU').format(totalPrice.value)} руб`);


</script>

<template>
  <form class="form">
    <fieldset class="form__item form__item--tariff">
      <legend class="form__legend form__legend--tariff">Выберите тариф</legend>
      <div
        v-for="tariff in tariffs"
        :key="tariff.id"
        class="form__options form__options--tariff"
      >
        <input
          :id="tariff.id"
          v-model.number="selectedTariff"
          class="form__input form__input--tariff"
          type="radio"
          name="tariff"
          :value="tariff.value"
        >
        <label class="form__label form__label--tariff" :for="tariff.id">{{ tariff.label }}</label>
      </div>
    </fieldset>
    <div class="form__item form__item--area">
      <label class="form__legend form__legend--area" for="area">Площадь помещения</label>
      <div class="form__input-wrapper">
        <div
          class="form__value form__value--area"
          :style="{ '--area-progress': areaProgress }"
        >
          {{ area }} м²
        </div>
        <input
          class="form__input form__input--area"
          type="range"
          name="area"
          id="area"
          v-model.number="area"
          :min="areaMin"
          :max="areaMax"
        >
      </div>
    </div>

    <p class="form__item form__item--price">
      <span class="form__legend form__legend--price">Примерная стоимость</span>
      <span class="form__value form__value--price">
        {{ formattedTotalPrice }}
        <span class="form__value-caption">с учетом материалов</span>
      </span>
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

    &--price {
      grid-column: 1 / -1;
      grid-row: 3 / 4;
      gap: 3.13cqi;
      justify-content: space-between;
      align-items: center;
      margin-block: auto 0;
      flex-direction: row;
    }



  }


  &__input {
    position: relative;


    &--tariff {
      display: none;

      &:checked+.form__label--tariff {
        background-color: var(--color-accent-primary);
        color: var(--color-text-primary);
      }
    }


    &--area {
      appearance: none;
      background-color: var(--color-text-secondary);
      inline-size: 100%;
      block-size: 4px;
      cursor: pointer;
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

  }


  &__input-wrapper {
    position: relative;
  }


  &__value {
    font-size: 5.1cqi;
    font-weight: 400;
    line-height: 1;
    color: var(--color-text-primary);
    display: flex;
    flex-direction: column;
    row-gap: 1cqi;
    text-align: right;

    &--area {
      white-space: nowrap;
      position: absolute;
      inset-block-start: -4cqi;
      inset-inline-start: calc((var(--area-progress) * (100% - 3.5cqi)) + 1.75cqi);
      text-align: center;
      transform: translateX(-50%);
      font-size: 2.65cqi;
      font-weight: 400;
      line-height: 1;
      color: var(--color-text-primary);
    }

    &-caption {
      font-size: 2.65cqi;
      font-weight: 400;
      line-height: 1;

      @media (width < 768px) {
        font-size: 16px;
      }
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

      &--price {
        grid-column: 1 / -1;
        grid-row: 4 / 5;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 16px;
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

      &--area {
        margin-block-end: 56px;
      }

      &--price {
        margin-block-end: 0;
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
      text-align: center;

      &--area {
        font-size: 16px;
        inset-block-start: -20px;
        inset-inline-start: calc((var(--area-progress) * (100% - 20px)) + 10px);
        transform: translateX(-50%);
      }

      
    }
  }
}
</style>