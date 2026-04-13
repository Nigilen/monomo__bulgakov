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
      <UiPriceIcon 
        v-bind="priceIconColors" 
        width="clamp(64px, 22.3cqmin, 115px)" 
        height="clamp(64px, 22.3cqmin, 115px)" 
      />
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
      <UiButton variant="secondary">
        {{ buttonLabel }}
      </UiButton>
    </div>
  </li>
</template>

<style scoped lang="scss">

.item {
  display: flex;
  flex-direction: column;
  padding-block: clamp(10px, 2.8cqmin, 30px) 40px;
  padding-inline: clamp(16px, 3.7cqmin, 40px);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--border-radius-primary);
  inline-size: clamp(343px, 55.6vmin, 600px);
  container-type: inline-size;
  row-gap: clamp(30px, 4.2cqmin, 45px);
  flex-shrink: 0;
  flex-grow: 1;
  min-block-size: 700px;

  &--slider {
    flex-grow: 0;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }
  



  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: clamp(8px, 2.1cqmin, 11px);

    &-title {
      font-size: clamp(24px, 5.5cqmin, 28px);
      font-weight: 600;
      color: var(--color-accent-primary);
      text-transform: uppercase;
    }

    &-subtitle {
      font-size: clamp(16px, 3.5cqmin, 18px);
      color: var(--color-text-secondary);
    }
  }



  &__specs {
    display: flex;
    flex-direction: column;
    row-gap: clamp(26px, 7cqmin, 36px);
  }

  &__row {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    &-term {
      position: relative;
      font-size: clamp(18px, 4.5cqmin, 20px);
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
      font-size: clamp(16px, 3.5cqmin, 18px);
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

</style>
