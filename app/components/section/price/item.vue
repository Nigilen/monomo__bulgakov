<script setup lang="ts">

export type PriceItemRow = {
  term: string
  definition: string
};

const props = withDefaults(defineProps<{
  title: string
  subtitle: string
  rows: PriceItemRow[]
  priceLabel: string
  buttonLabel?: string
  isSliderCard?: boolean
}>(), {
  buttonLabel: 'Заказать',
  isSliderCard: false,
});

const FILLED_SHAPES_BY_TITLE: Record<string, 1 | 2 | 3 | 4> = {
  'Инвест': 1,
  'Мой дом': 2,
  'Комфорт': 3,
  'Прайм': 4,
};

const ACCENT_FILL = 'var(--color-accent-primary)';
const ACCENT_STROKE = 'var(--color-accent-primary)';
const OUTLINE_FILL = 'none';
const OUTLINE_STROKE = 'var(--color-accent-secondary)';

const priceIconColors = computed(() => {
  const filledCount = FILLED_SHAPES_BY_TITLE[props.title] ?? 1;
  const shape = (index: number) => {
    const isFilled = index < filledCount;
    return {
      fill: isFilled ? ACCENT_FILL : OUTLINE_FILL,
      stroke: isFilled ? ACCENT_STROKE : OUTLINE_STROKE,
    };
  };
  const bottom = shape(0);
  const left = shape(1);
  const top = shape(2);
  const right = shape(3);
  return {
    bottomFill: bottom.fill,
    bottomStroke: bottom.stroke,
    leftFill: left.fill,
    leftStroke: left.stroke,
    topFill: top.fill,
    topStroke: top.stroke,
    rightFill: right.fill,
    rightStroke: right.stroke,
  };
});

</script>

<template>
  <li class="item" :class="{ 'item--slider': isSliderCard }">
    <div class="item__header">
      <svg
        class="item__price-icon"
        viewBox="0 0 115 115"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M81.7395 87.8019L57.1055 112.437L32.4715 87.8019L57.1055 63.1663L81.7395 87.8019Z"
          :fill="priceIconColors.bottomFill"
          :stroke="priceIconColors.bottomStroke"
          stroke-width="2.5"
        />
        <rect
          x="-1.49012e-07"
          y="1.76783"
          width="34.8391"
          height="34.8391"
          transform="matrix(0.70708 0.707133 -0.70708 0.707133 27.6523 31.2131)"
          :fill="priceIconColors.leftFill"
          :stroke="priceIconColors.leftStroke"
          stroke-width="2.5"
        />
        <rect
          x="-1.49012e-07"
          y="1.76783"
          width="34.8391"
          height="34.8391"
          transform="matrix(0.70708 0.707133 -0.70708 0.707133 58.3555 0.517745)"
          :fill="priceIconColors.topFill"
          :stroke="priceIconColors.topStroke"
          stroke-width="2.5"
        />
        <rect
          x="-1.49012e-07"
          y="1.76783"
          width="34.8391"
          height="34.8391"
          transform="matrix(0.70708 0.707133 -0.70708 0.707133 89.0547 31.2131)"
          :fill="priceIconColors.rightFill"
          :stroke="priceIconColors.rightStroke"
          stroke-width="2.5"
        />
      </svg>
      <h3 class="item__header-title">
        {{ title }}
      </h3>
      <p class="item__header-subtitle">
        {{ subtitle }}
      </p>
    </div>
    <dl class="item__specs">
      <div
        v-for="(row, index) in rows"
        :key="index"
        class="item__row"
      >
        <dt class="item__row-term">
          {{ row.term }}
        </dt>
        <dd class="item__row-definition">
          {{ row.definition }}
        </dd>
      </div>
    </dl>
    <div class="item__footer">
      <p class="item__footer-price">
        {{ priceLabel }}
      </p>
      <button class="button button--secondary" type="button">
        <span class="button__label">
          {{ buttonLabel }}
        </span>
      </button>
    </div>
  </li>
</template>

<style scoped lang="scss">

.item {
  display: flex;
  flex-direction: column;
  padding-block-start: clamp(10px, 1.75vi, 30px);
  padding-block-end: 40px;
  padding-inline: clamp(16px, 2.1vi, 40px);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-primary);
  inline-size: clamp(343px, 31.3vi, 600px);
  container-type: inline-size;
  row-gap: min(45px, 1.4vi);
  flex-shrink: 0;
  flex-grow: 1;

  &--slider {
    flex-grow: 0;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  



  &__price-icon {
    display: block;
    inline-size: clamp(64px, 22.3cqi, 115px);
    block-size: clamp(64px, 22.3cqi, 115px);
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: clamp(8px, 2.1cqmin, 11px);

    &-title {
      font-size: min(28px, 5.15cqi);
      font-weight: 600;
      color: var(--color-accent-primary);
      text-transform: uppercase;
    }

    &-subtitle {
      font-size: min(18px, 3.65cqi);
      color: var(--color-text-secondary);
    }
  }



  &__specs {
    display: flex;
    flex-direction: column;
    row-gap: min(36px, 1.67vi);
  }

  &__row {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &-term {
      position: relative;
      font-size: min(20px, 4.13cqi);
      color: var(--color-text-secondary);

      &::after {
        content: '';
        position: relative;
        display: block;
        inline-size: 100%;
        inset-block-start: 0.2em;
        block-size: 1px;
        background-color: var(--color-border-primary);
      }
    }

    &-definition {
      font-size: min(18px, 3.65cqi);
      color: var(--color-text-primary);
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: clamp(16px, 5cqmin, 25px);
    margin-block-start: auto;

    &-price {
      font-size: clamp(26px, 6.5cqmin, 28px);
      font-weight: 600;
      color: var(--color-text-primary);
      text-transform: uppercase;
    }
  }

}

.button {
  font-weight: 500;
  line-height: 1.3;
  inline-size: clamp(225px, 18vi, 350px);
  block-size: auto;
  aspect-ratio: 350 / 100;
  border-radius: 0.9vi;
  text-transform: uppercase;
  cursor: pointer;
  container-type: inline-size;

  &__label {
    font-size: 6.1cqi;
    position: relative;
    z-index: 1;
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
      border-radius: 0.9vi;
      z-index: 0;
    }

    &::before {
      content: '';
      position: absolute;
      inset: -0.6cqi;
      box-sizing: content-box;
      inline-size: 100%;
      block-size: calc(100% + 2cqi);
      border: 0.6cqi solid #7C5E49;
      border-radius: 0.9vi;
      z-index: 0;
    }
  }
}

</style>
