<script setup lang="ts">

import reviewVideoUrl from '~/assets/video/video.mp4';

type ReviewItem = {
  id: number
  image: string
  author: string
  description: string
};

/** Исходные отзывы; при переносе в API/CMS заменить на данные из источника. */
const items: ReviewItem[] = [
  {
    id: 1,
    image: '/images/review-01.avif',
    author: 'Александр',
    description: 'Хотим сказать огромное спасибо. Без вас мы бы не справились. Спасибо, что всегда были на связи, помогали советом, делом, временем - всем, чем можно. Огромное спасибо! В следующий раз только к вам',
  },
  {
    id: 2,
    image: '/images/review-02.avif',
    author: 'Мария',
    description: 'Я обратилась к ребятам в феврале 2024 года с запросом на ремонт загородного дома в Зеленоградске. Никакого дизайн-проекта у меня не было и вообще я не знала что хочу, просто чтоб было красиво)). Их подход меня поразил! Продумали все до мелочей – каждую розетку, цветовую гамму, как расположить мебель, какие материалы использовать. Получается, обратилась за ремонтом, а получила еще и дизайнерское решение! В мае я уже праздновала новоселье! Благодарна Владимиру и Марие за такое душевное отношение!',
  },
  {
    id: 3,
    image: '/images/review-03.avif',
    author: 'Валентина',
    description: 'У нас с ребятами долгая история)) Сначала мы с ними построили дом, а потом они же нам его отремонтировали "под ключ". Стройка и ремонт заняли в общем 10 месяцев. Их команда работала так слаженно и быстро, и при этом очень качественно! Мария и Владимир очень помогли нам с дизайном дома, понравился их подход к делу- делали как для себя, с душой! Сами решали все вопросы с закупом и доставкой материалов. Вообщем, мы не испытали никакого дискомфорта, только удовольствие от ремонта! Спасибо огромное ребятам за наш прекрасный дом!',
  },
  {
    id: 4,
    image: '/images/review-04.avif',
    author: 'Галина и Виталий',
    description: 'Мы были очень довольны работой компании. Все работы были выполнены в срок и качеством. Мы рекомендуем эту компанию всем друзьям и знакомым.',
  }
];

const REVIEWS_SLIDER_OPTIONS = {
  itemSelector: '.review-item',
  navigationCooldownMs: 360,
} as const;

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
} = usePriceSlider(() => items.length, {
  initialActiveIndex: 0,
  itemSelector: REVIEWS_SLIDER_OPTIONS.itemSelector,
  loop: false,
  loopTripleMode: false,
  navigationCooldownMs:
    items.length >= 2 ? REVIEWS_SLIDER_OPTIONS.navigationCooldownMs : undefined,
});

/** Обёртки для клика: без аргумента события (иначе кулдаун в goNext обходился бы). */
const onReviewsPrevClick = () => {
  goPrev();
};

const onReviewsNextClick = () => {
  goNext();
};

const isReviewVideoOpen = ref(false);
const reviewVideoRef = ref<HTMLVideoElement | null>(null);

const openReviewVideo = () => {
  isReviewVideoOpen.value = true;
};

const closeReviewVideo = () => {
  isReviewVideoOpen.value = false;
};

const onReviewVideoEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeReviewVideo();
  }
};

const playReviewVideo = () => {
  const el = reviewVideoRef.value;
  if (el) {
    el.play().catch(() => {});
  }
};

watch(isReviewVideoOpen, (open) => {
  if (open) {
    document.addEventListener('keydown', onReviewVideoEscape);
  } else {
    document.removeEventListener('keydown', onReviewVideoEscape);
    if (reviewVideoRef.value) {
      reviewVideoRef.value.pause();
      reviewVideoRef.value.currentTime = 0;
    }
  }
});

/**
 * Тап по превью (не по кнопке play — у неё свой обработчик со stop).
 * После горизонтального свайпа слайдера браузер обычно не шлёт click — видео не откроется.
 */
const onReviewVideoWrapperClick = (event: MouseEvent) => {
  const el = event.target;
  if (!(el instanceof Element)) {
    return;
  }
  if (el.closest('.review-item__video-button')) {
    return;
  }
  openReviewVideo();
};

const expandedReviewId = ref<number | null>(null);

const expandReviewDescription = (id: number) => {
  expandedReviewId.value = id;
};

/** Мобильный режим: текст > 7 строк — показываем «Читать ещё» на 8-й строке. */
const overflowById = reactive<Record<number, boolean>>({});

const descEls = new Map<number, HTMLElement>();

let measureRaf = 0;

const updateOverflowForId = (id: number) => {
  if (!import.meta.client) return;
  const el = descEls.get(id);
  if (!el) return;
  if (!window.matchMedia('(max-width: 767px)').matches) {
    overflowById[id] = false;
    return;
  }
  const width = el.getBoundingClientRect().width;
  if (width < 8) {
    overflowById[id] = false;
    return;
  }
  const cs = getComputedStyle(el);
  const clone = el.cloneNode(true) as HTMLElement;
  clone.style.cssText = [
    'position:fixed',
    'left:-10000px',
    'top:0',
    `width:${width}px`,
    'box-sizing:border-box',
    'visibility:hidden',
    'pointer-events:none',
    'margin:0',
    'padding:0',
    'border:none',
    'display:block',
    'overflow:visible',
    'max-block-size:none',
    'max-height:none',
    '-webkit-line-clamp:unset',
    'line-clamp:unset',
    '-webkit-box-orient:unset',
    `font-size:${cs.fontSize}`,
    `font-family:${cs.fontFamily}`,
    `font-weight:${cs.fontWeight}`,
    `font-style:${cs.fontStyle}`,
    `line-height:${cs.lineHeight}`,
    `letter-spacing:${cs.letterSpacing}`,
  ].join(';');
  document.body.appendChild(clone);
  const fullHeight = clone.scrollHeight;
  clone.remove();
  const lh = parseFloat(cs.lineHeight);
  const fs = parseFloat(cs.fontSize);
  const lineHeightPx = Number.isFinite(lh) && lh > 0 ? lh : fs * 1.5;
  const sevenLines = lineHeightPx * 7;
  overflowById[id] = fullHeight > sevenLines + 1;
};

const scheduleOverflowMeasure = () => {
  cancelAnimationFrame(measureRaf);
  measureRaf = requestAnimationFrame(() => {
    measureRaf = 0;
    for (const item of items) {
      updateOverflowForId(item.id);
    }
  });
};

const setDescriptionEl = (id: number, el: unknown) => {
  if (!(el instanceof HTMLElement)) {
    descEls.delete(id);
    scheduleOverflowMeasure();
    return;
  }
  descEls.set(id, el);
  scheduleOverflowMeasure();
};

let resizeObserver: ResizeObserver | null = null;
let stopViewportWatch: (() => void) | undefined;

watch(activeIndex, () => {
  expandedReviewId.value = null;
  nextTick(() => {
    scheduleOverflowMeasure();
  });
});

watch(expandedReviewId, () => {
  nextTick(() => {
    window.dispatchEvent(new Event('resize'));
  });
});

const onWindowResize = () => {
  scheduleOverflowMeasure();
};

onMounted(() => {
  window.addEventListener('resize', onWindowResize);
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      scheduleOverflowMeasure();
    });
    stopViewportWatch = watch(
      viewportRef,
      (el, prev) => {
        if (prev && resizeObserver) {
          resizeObserver.unobserve(prev);
        }
        if (el && resizeObserver) {
          resizeObserver.observe(el);
        }
      },
      { flush: 'post', immediate: true },
    );
  }
  nextTick(() => {
    scheduleOverflowMeasure();
  });
  document.fonts?.ready?.then(() => {
    scheduleOverflowMeasure();
  });
});

onUnmounted(() => {
  document.removeEventListener('keydown', onReviewVideoEscape);
  window.removeEventListener('resize', onWindowResize);
  stopViewportWatch?.();
  stopViewportWatch = undefined;
  resizeObserver?.disconnect();
  resizeObserver = null;
  cancelAnimationFrame(measureRaf);
});

</script>

<template>
  <section id="reviews" class="reviews container">
    <div class="header">
      <h2 class="header__title">
        <span class="header__title-highlight">100% положительных отзывов </span>
        клиентов
      </h2>
      <p class="header__description">
        Реальный опыт и искренние слова тех, кто уже оценил преимущества работы с нами.
      </p>
    </div>
    <div class="reviews__bleed">
      <div class="reviews-wrapper">

        <div
          ref="viewportRef"
          class="reviews__viewport"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
          @pointercancel="onPointerUp"
          @selectstart.prevent
        >
          <ul
            ref="trackRef"
            class="reviews-list"
            :style="trackStyle"
          >
            <li
              v-for="item in items"
              :key="item.id"
              class="review-item"
            >
              <div class="review-item__card">
                <div
                  class="review-item__video-wrapper"
                  @click="onReviewVideoWrapperClick"
                >
                  <button
                    class="review-item__video-button"
                    type="button"
                    aria-label="Открыть видео отзыва"
                    @click.stop="openReviewVideo"
                  >
                    <Icon class="review-item__video-button-icon" name="icons:play-btn" size="90" />
                  </button>
                  <NuxtImg
                    class="review-item__video"
                    :src="item.image"
                    alt="Review"
                    width="458"
                    height="458"
                    loading="lazy"
                  />
                </div>
                <div class="review-item__content">
                  <span class="review-item__author">{{ item.author }}</span>
                  <Icon
                    class="review-item__stars"
                    name="icons:stars"
                    size="17"
                  />
                  <div
                    class="review-item__description-box"
                    :class="{
                      'review-item__description-box--clampable': overflowById[item.id],
                      'review-item__description-box--expanded': expandedReviewId === item.id,
                    }"
                  >
                    <p
                      class="review-item__description"
                      :class="{
                        'review-item__description--clamped':
                          overflowById[item.id] && expandedReviewId !== item.id,
                      }"
                      :ref="(el) => setDescriptionEl(item.id, el)"
                    >
                      {{ item.description }}
                    </p>
                    <div
                      v-if="overflowById[item.id] && expandedReviewId !== item.id"
                      class="review-item__read-more-wrap"
                    >
                      <button
                        type="button"
                        class="review-item__read-more"
                        aria-expanded="false"
                        @click.stop="expandReviewDescription(item.id)"
                      >
                        Читать ещё
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="reviews-controls">
          <button
            class="reviews-controls__button reviews-controls__button--prev"
            type="button"
            aria-label="Предыдущий отзыв"
            :disabled="!canGoPrev"
            @click="onReviewsPrevClick"
          >
            <Icon name="icons:arrow-button" class="reviews-controls__icon" />
          </button>
          <button
            class="reviews-controls__button reviews-controls__button--next"
            type="button"
            aria-label="Следующий отзыв"
            :disabled="!canGoNext"
            @click="onReviewsNextClick"
          >
            <Icon name="icons:arrow-button" class="reviews-controls__icon" />
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition
        name="review-video"
        @after-enter="playReviewVideo"
      >
        <div
          v-if="isReviewVideoOpen"
          class="review-video-overlay"
          @click.self="closeReviewVideo"
        >
          <div
            class="review-video-frame"
            @click.stop
          >
            <button
              class="review-video-overlay__close"
              type="button"
              aria-label="Закрыть видео"
              @click="closeReviewVideo"
            >
              ×
            </button>
            <video
              ref="reviewVideoRef"
              class="review-video"
              controls
              playsinline
              preload="metadata"
              :src="reviewVideoUrl"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped lang="scss">

.reviews__bleed {
  inline-size: 100vi;
  margin-inline-start: calc(50% - 50vi);
}

.header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1vi;
  margin-block-end: min(75px, 3.9vi);

  &__title {
    font-size: min(62px, 3.3vi);
    font-weight: 400;
    line-height: 1.4;
    text-transform: uppercase;

    &-highlight {
      color: var(--color-accent-primary);
      font-weight: 600;
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
    margin-block-end: 45px;

    &__title {
      font-size: 32px;
      letter-spacing: -0.035em;

    }

    &__description {
      font-size: 16px;
    }
  }
}

.reviews {
  margin-block-end: 12vi;

  @media (width < 768px) {
    margin-block-end: 100px;
  }

  &__viewport {
    overflow: hidden;
    inline-size: 100%;
    container-type: inline-size;
    container-name: reviews-slider;
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

  &-list {
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-block-start: 0;
    padding-block-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    column-gap: 1.65vi;
    will-change: transform;
    user-select: none;
    -webkit-user-select: none;
  }

  &-wrapper {
    position: relative;
    container-type: inline-size;
    container-name: reviews-wrap;
  }

  &-controls {
    z-index: 2;

    &__button {
      position: absolute;
      inline-size: 4.8cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;

      transition: filter 0.3s ease;

      &:hover {
        filter: grayscale(1) brightness(1.2);
      }

      &:disabled {
        opacity: 0.35;
        cursor: not-allowed;
      }

      &--prev {
        inset-block-start: 50%;
        inset-inline-start: 10vi;
        transform: translateY(-50%);
      }

      &--next {
        inset-block-start: 50%;
        inset-inline-end: 10vi;
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &__icon {
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }
  }

  @media (width < 768px) {
    &-controls {
      display: flex;
      position: absolute;
      inset-block-end: -35px;
      inset-inline-end: 16px;
      z-index: 1;
      gap: 10px;

      &__button {
        position: static;
        inline-size: 48px;
        transform: none;
        inset-block-start: 0;
        inset-inline-end: 0;



        &--next {

          & .reviews-controls__icon {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}

.review {
  &-item {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 100cqi;
    min-inline-size: 100cqi;
    max-inline-size: 100cqi;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-block-start: 0;
    padding-block-end: 0;
    padding-inline-start: clamp(16px, 4vi, 48px);
    padding-inline-end: clamp(16px, 4vi, 48px);
  }

  &-item__card {
    inline-size: min(1225px, 63.8vi);
    max-inline-size: 100%;
    box-sizing: border-box;
    padding: 1.65vi;
    background-color: var(--color-background-secondary);
    border-radius: 0.8vi;
    border: 1px solid var(--color-border-primary);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.65vi;
    container-type: inline-size;
    container-name: review-card;
  }

  &-item__video-wrapper {
    position: relative;
  }

  &-item__video-button {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;

    &-icon {
      inline-size: 10cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;
      margin: auto;
    }
  }

  &-item__video {
    border-radius: 1.4cqi;
    inline-size: 39.6cqi;
    block-size: auto;
    aspect-ratio: 1 / 1;
  }

  &-item__content {
    display: flex;
    flex-direction: column;
  }

  &-item__author {
    font-size: 1.9cqi;
    font-weight: 600;
    margin-block-end: 1cqi;
  }

  &-item__stars {
    display: block;
    inline-size: 8.1cqi;
    block-size: auto;
    aspect-ratio: 95 / 17;
    margin-block-end: 1.8cqi;
  }

  &-item__description {
    font-size: 1.8cqi;
    font-weight: 400;
    line-height: calc(30 / 20);
  }

  &-item__description-box {
    position: relative;
  }

  &-item__read-more-wrap {
    display: none;
  }

  @media (width < 768px) {

    &-item {
      padding-inline-start: 16px;
      padding-inline-end: 16px;
    }

    &-item__card {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px;
      padding-block-end: 32px;
      inline-size: 100%;
      border-radius: 16px;
    }

    &-item__video {
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 1 / 1;
      border-radius: 16px;
    }

    &-item__video-button-icon {
      inline-size: 100px;
    }

    &-item__content {
      display: flex;
      flex-direction: column;
    }

    &-item__author {
      font-size: 18px;
      font-weight: 600;
      margin-block-end: 16px;
    }

    &-item__stars {
      inline-size: 100px;
      block-size: auto;
      aspect-ratio: 95 / 17;
      margin-block-end: 16px;
    }

    &-item__description {
      font-size: 16px;
      line-height: calc(24 / 16);
      margin: 0;
    }

    &-item__description-box--clampable {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 16px;
      overflow: hidden;
      max-height: calc(12em + 16px);
      user-select: text;
      -webkit-user-select: text;
      transition: max-height 0.45s ease;

      @media (prefers-reduced-motion: reduce) {
        transition-duration: 0.01ms;
      }

      &.review-item__description-box--expanded {
        max-height: min(4800px, 220vh);
        overflow: visible;
      }
    }

    &-item__description--clamped {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 7;
      line-clamp: 7;
      overflow: hidden;
    }

    &-item__read-more-wrap {
      display: flex;
      flex-shrink: 0;
      justify-content: flex-start;
      align-items: center;
      min-block-size: calc((24 / 16) * 1em);
    }

    &-item__read-more {
      padding: 0;
      border: none;
      background: none;
      font: inherit;
      font-size: 16px;
      line-height: calc(24 / 16);
      font-weight: 500;
      color: var(--color-accent-primary);
      text-decoration: none;
      cursor: pointer;
      -webkit-tap-highlight-color: transparent;
    }
  }

}

.review-video-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: clamp(16px, 4vi, 24px);
  background-color: rgba(0, 0, 0, 0.45);
}

.review-video-enter-active {
  transition: opacity 0.4s ease;
}

.review-video-leave-active {
  transition: opacity 0.32s ease;
}

.review-video-enter-from,
.review-video-leave-to {
  opacity: 0;
}

.review-video-frame {
  position: relative;
  display: inline-block;
  max-inline-size: 100%;
  vertical-align: top;
}

.review-video-overlay__close {
  position: absolute;
  inset-inline-end: -13px;
  inset-block-start: -40px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 44px;
  block-size: 44px;
  padding: 0;
  font-size: 52px;
  line-height: 1;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: background-color 0.3s ease;

}

.review-video {
  display: block;
  position: relative;
  z-index: 1;
  inline-size: 100%;
  max-inline-size: 100%;
  max-block-size: min(70vh, 600px);
  object-fit: contain;
}

@media (width >= 768px) {
  .review-video {
    inline-size: 72vw;
    max-inline-size: 72vw;
    max-block-size: 72vh;
  }
}

</style>
