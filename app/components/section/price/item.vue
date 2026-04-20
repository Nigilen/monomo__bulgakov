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
  padding-block-start: min(30px, 1.6vi);
  padding-block-end: min(40px, 2.1vi);
  padding-inline: min(40px, 2.1vi);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-primary);
  inline-size: min(600px, 31.3vi);
  container-type: inline-size;
  flex-shrink: 0;
  flex-grow: 1;
  background-color: var(--color-background-secondary);

  &--slider {
    flex-grow: 0;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  
  &__price-icon {
    display: block;
    inline-size: 22cqi;
    block-size: auto;
    aspect-ratio: 1 / 1;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 2cqi;
    margin-block-end: 5.8cqi;

    &-title {
      font-size: 5cqi;
      font-weight: 600;
      color: var(--color-accent-primary);
      text-transform: uppercase;
    }

    &-subtitle {
      font-size: 3.5cqi;
      color: var(--color-text-secondary);
    }
  }

  &__specs {
    display: flex;
    flex-direction: column;
    row-gap: 7cqi;
    margin-block-end: 9cqi;

  }

  &__row {
    display: flex;
    flex-direction: column;
    row-gap: 2cqi;

    &-term {
      position: relative;
      font-size: 3.85cqi;
      line-height: 1;
      color: var(--color-text-secondary);

      &::after {
        content: '';
        position: relative;
        display: block;
        inline-size: 100%;
        inset-block-start: 0.25em;
        block-size: 1px;
        background-color: var(--color-border-primary);
      }
    }

    &-definition {
      font-size: 3.5cqi;
      line-height: 1;
      color: var(--color-text-primary);
    }
  }

  &__footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 4.825cqi;
    margin-block-start: auto;

    &-price {
      font-size: 5.4cqi;
      font-weight: 600;
      color: var(--color-text-primary);
      text-transform: uppercase;
    }
  }

  @media (width < 768px) {
    inline-size: 343px;
    padding-block-start: 10px;
    padding-inline: 16px;
    padding-block-end: 40px;

    &__price-icon {
      inline-size: 64px;
    }

    &__header {
      row-gap: 8px;
      margin-block-end: 40px;

      &-title {
        font-size: 24px;
      }
      &-subtitle {
        font-size: 16px;
      }
    }

    &__specs {
      margin-block-end: 44px;
      row-gap: 26px;
    }

    &__row {
      row-gap: 10px;
      
      &-term {
        font-size: 18px;
      }
      &-definition {
        font-size: 16px;
      }
    }

    &__footer {
      row-gap: 16px;

      &-price {
        font-size: 26px;
      }

      
    }
  }
}

.button {
  font-weight: 500;
  inline-size: 74.6cqi;
  line-height: 1;
  block-size: auto;
  aspect-ratio: 386 / 91;
  border-radius: 3cqi;
  text-transform: uppercase;
  cursor: pointer;

  &__label {
    font-size: 4cqi;
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
      border: 0.4cqi solid var(--color-border-secondary);
      border-radius: 3cqi;
      z-index: 0;
    }

    &::before {
      content: '';
      position: absolute;
      inset: -0.4cqi;
      box-sizing: content-box;
      inline-size: 100%;
      block-size: calc(100% + 1.5cqi);
      border: 0.4cqi solid #7C5E49;
      border-radius: 3cqi;
      z-index: 0;
    }
  }

  @media (width < 768px) {
    inline-size: 100%;
    border-radius: 16px;

    &--secondary {
      border-radius: 16px;

      border-width: 2px;
      inset: -2px;
    }

    &__label {
      font-size: 16px;
    }

    &::after {
      border-radius: 16px;

    }

    &::before {
      border-radius: 16px;
    }
  }
}

</style>
