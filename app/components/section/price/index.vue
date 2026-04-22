<script setup lang="ts">
import {
  priceSectionHeaderTitleSegments,
  priceSectionItems,
} from './price-content';

const {
  activeIndex,
  viewportRef,
  trackRef,
  trackStyle,
  canGoPrev,
  canGoNext,
  goPrev,
  goNext,
  onPointerDown,
  onPointerUp,
} = usePriceSlider(() => priceSectionItems.length, {
  initialActiveIndex: 0,
  loop: false,
  loopTripleMode: false,
});
</script>

<template>
  <section id="prices" class="price">
    <div class="price__top header container">
        <h2 class="header__title">
          Наши 
          <span class="header__title-highlight">тарифы и цены</span> 
          на услуги
        </h2>
        <p class="header__description">Все пакеты включают работу и материалы. Цена фиксированная и не меняется в процессе.</p>
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
              v-for="(item, index) in priceSectionItems"
              :key="item.title"
              is-slider-card
              :is-slider-active="activeIndex === index"
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
          @click="() => goNext()"
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
  margin-block-end: 12vi;

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
    padding-block: min(50px, 5vi);
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
      inline-size: 343px;
      transform: none;
    }

    @media (width < 768px) {
      inset-block-start: auto;
      inset-block-end: -32px;
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
        background-image: none;
        inset-inline-start: auto;
        inset-inline-end: 70px;
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
    transition: filter 0.3s ease;

    &:hover {
      filter: grayscale(1) brightness(1.2);
    }
  }

  &__arrow-graphic_desktop-prev {
    @media (width >= 768px) {
      display: block;
      inline-size: min(56px, 2.9vi);
      block-size: auto;
      aspect-ratio: 57 / 253;
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
      inline-size: min(56px, 2.9vi);
      block-size: auto;
      aspect-ratio: 57 / 253;
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
      inline-size: 48px;
      aspect-ratio: 1 / 1;
      block-size: auto;
    }
  }

  &__arrow-graphic_mobile-next {
    @media (width >= 768px) {
      display: none;
    }

    @media (width < 768px) {
      display: block;
      inline-size: 48px;
      aspect-ratio: 1 / 1;
      block-size: auto;
      transform: scaleX(-1);
    }
  }

  @media (width < 768px) {
    margin-block-end: 124px;
  }
}

.header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1vi;
  margin-block-end: min(75px, 3.9vi);

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
    font-size: min(20px, 1vi);
    font-weight: 400;
    line-height: calc(35/20);
    font-style: italic;
    color: var(--color-text-secondary);
    margin-block-start: 0.83vi;
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-block-end: 40px;

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
