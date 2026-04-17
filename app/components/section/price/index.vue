<script setup lang="ts">
import {
  priceSectionHeaderTitleSegments,
  priceSectionItems,
} from './price-content';

const {
  viewportRef,
  trackRef,
  trackStyle,
  canGoPrev,
  canGoNext,
  goPrev,
  goNext,
  onPointerDown,
  onPointerUp,
} = usePriceSlider(() => priceSectionItems.length);
</script>

<template>
  <section class="price">
    <div class="price__top container">
      <h2 class="section-header__title">
        <template v-for="(segment, index) in priceSectionHeaderTitleSegments" :key="index">
          <span
            v-if="segment.highlight"
            class="section-header__title_highlight"
          >{{ segment.text }}</span>
          <span v-else>{{ segment.text }}</span>
        </template>
      </h2>
      <p class="section-header__description">
        Все пакеты включают работу и материалы. Цена фиксированная и не меняется в процессе.
      </p>
    </div>

    <div class="price__body">
      <div class="price__slider">
        <button
          class="price__arrow price__arrow_prev"
          type="button"
          aria-label="Предыдущий тариф"
          :disabled="!canGoPrev"
          @click="goPrev"
        >
          <Icon
            class="price__arrow-graphic price__arrow-graphic_desktop-prev"
            name="icons:slider-arrow"
          />
          <Icon
            class="price__arrow-graphic price__arrow-graphic_mobile-prev"
            name="icons:arrow-button"
          />
        </button>

        <div
          ref="viewportRef"
          class="price__viewport"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @selectstart.prevent
        >
          <ul
            ref="trackRef"
            class="price__list"
            :style="trackStyle"
          >
            <SectionPriceItem
              v-for="item in priceSectionItems"
              :key="item.title"
              is-slider-card
              :title="item.title"
              :subtitle="item.subtitle"
              :rows="item.rows"
              :price-label="item.priceLabel"
            />
          </ul>
        </div>

        <button
          class="price__arrow price__arrow_next"
          type="button"
          aria-label="Следующий тариф"
          :disabled="!canGoNext"
          @click="goNext"
        >
          <Icon
            class="price__arrow-graphic price__arrow-graphic_desktop-next"
            name="icons:slider-arrow"
          />
          <Icon
            class="price__arrow-graphic price__arrow-graphic_mobile-next"
            name="icons:arrow-button"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.price {
  margin-block-end: var(--section-margin-block-end);

  &__top {
    display: flex;
    column-gap: 1.042vi;
    row-gap: 32px;
    margin-block-end: 4.2vi;

    @media (width < 768px) {
      flex-direction: column;
    }
  }

  &__body {
    position: relative;
  }

  &__slider {
    position: relative;
    inline-size: 100vi;
    margin-inline-start: calc(50% - 50vi);

    @media (width < 768px) {
      margin-block-end: 25px;
    }
  }

  &__viewport {
    overflow: hidden;
    inline-size: 100%;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &__list {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: clamp(30px, 4.2vi, 80px);
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-block-start: 0;
    padding-block-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    list-style: none;
    inline-size: max-content;
    transition: transform 0.35s ease;
    will-change: transform;
    user-select: none;
    -webkit-user-select: none;
  }

  &__arrow {
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-block-start: 0;
    padding-block-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    @media (width >= 768px) {
      inset-block-start: 0;
      inset-block-end: 0;
      inline-size: clamp(343px, 55.6vmin, 600px);
      transform: none;
    }

    @media (width < 768px) {
      inset-block-start: auto;
      inset-block-end: -25px;
      transform: none;
    }

    &_prev {
      inset-inline-start: 0;
      inset-inline-end: auto;
      justify-content: flex-end;
      background-color: transparent;
      background-image: linear-gradient(to right, #252525, rgba(37, 37, 37, 0));
      background-repeat: no-repeat;
      background-size: 100% 100%;

      @media (width < 768px) {
        inset-inline-start: auto;
        inset-inline-end: calc(16px + 50px + 12px);
      }
    }

    &_next {
      @media (width >= 768px) {
        inset-inline-start: auto;
        inset-inline-end: 0;
        justify-content: flex-start;
        background-color: transparent;
        background-image: linear-gradient(to left, #252525, rgba(37, 37, 37, 0));
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      @media (width < 768px) {
        inset-inline-start: auto;
        inset-inline-end: 16px;
      }
    }
  }

  &__arrow-graphic {
    display: block;
  }

  &__arrow-graphic_desktop-prev {
    @media (width >= 768px) {
      display: block;
      block-size: 253px;
      inline-size: 57px;
      transform: scaleX(-1);
      margin-inline: 9vw auto;
    }

    @media (width < 768px) {
      display: none;
    }
  }

  &__arrow-graphic_desktop-next {
    @media (width >= 768px) {
      display: block;
      block-size: 253px;
      inline-size: 57px;
      margin-inline: auto 9vw;
    }

    @media (width < 768px) {
      display: none;
    }
  }

  &__arrow-graphic_mobile-prev {
    @media (width >= 768px) {
      display: none;
    }

    @media (width < 768px) {
      display: block;
      inline-size: 50px;
      block-size: 50px;
    }
  }

  &__arrow-graphic_mobile-next {
    @media (width >= 768px) {
      display: none;
    }

    @media (width < 768px) {
      display: block;
      inline-size: 50px;
      block-size: 50px;
      transform: scaleX(-1);
    }
  }
}

.section-header {
  &__title {
    font-size: clamp(32px, calc(6px + 2.92vi), 62px);
    font-weight: 400;
    line-height: 1.45;
    text-transform: uppercase;
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;

    &_highlight {
      font-weight: 500;
      color: var(--color-accent-primary);
    }
  }

  &__description {
    font-size: clamp(14px, calc(-4px + 1.25vi), 20px);
    color: var(--color-text-secondary);
    line-height: 1.75em;
    font-weight: 400;
    font-style: italic;
    align-self: center;
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;
  }
}
</style>
