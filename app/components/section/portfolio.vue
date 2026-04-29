<script setup lang="ts">

const PORTFOLIO_IMAGES = {
  kaliningrad35: {  
    img01: '/images/portfolio/project-kaliningrad-35-01.avif',
    img02: '/images/portfolio/project-kaliningrad-35-02.avif',
    img03: '/images/portfolio/project-kaliningrad-35-03.avif',
    img04: '/images/portfolio/project-kaliningrad-35-04.avif',
    img05: '/images/portfolio/project-kaliningrad-35-05.avif',
    img06: '/images/portfolio/project-kaliningrad-35-06.avif',
    img07: '/images/portfolio/project-kaliningrad-35-07.avif',
  },
  kaliningrad120: {
    img01: '/images/portfolio/project-kaliningrad-120-01.avif',
    img02: '/images/portfolio/project-kaliningrad-120-02.avif',
    img03: '/images/portfolio/project-kaliningrad-120-03.avif',
    img04: '/images/portfolio/project-kaliningrad-120-04.avif',
    img05: '/images/portfolio/project-kaliningrad-120-05.avif',
    img06: '/images/portfolio/project-kaliningrad-120-06.avif',
    img07: '/images/portfolio/project-kaliningrad-120-07.avif',
    img08: '/images/portfolio/project-kaliningrad-120-08.avif',
    img09: '/images/portfolio/project-kaliningrad-120-09.avif',
    img10: '/images/portfolio/project-kaliningrad-120-10.avif',
  },
  pionersk45: {
    img01: '/images/portfolio/project-pionersk-45-01.avif',
    img02: '/images/portfolio/project-pionersk-45-02.avif',
    img03: '/images/portfolio/project-pionersk-45-03.avif',
    img04: '/images/portfolio/project-pionersk-45-04.avif',
    img05: '/images/portfolio/project-pionersk-45-05.avif',
    img06: '/images/portfolio/project-pionersk-45-06.avif',
    img07: '/images/portfolio/project-pionersk-45-07.avif',
  },
  pionersk75: {
    img01: '/images/portfolio/project-pionersk-75-01.avif',
    img02: '/images/portfolio/project-pionersk-75-02.avif',
    img03: '/images/portfolio/project-pionersk-75-03.avif',
    img04: '/images/portfolio/project-pionersk-75-04.avif',
    img05: '/images/portfolio/project-pionersk-75-05.avif',
  },
} as const

const PROJECT_GALLERY_BY_ID = {
  1: Object.values(PORTFOLIO_IMAGES.pionersk45),
  2: Object.values(PORTFOLIO_IMAGES.kaliningrad120),
  3: Object.values(PORTFOLIO_IMAGES.pionersk75),
  4: Object.values(PORTFOLIO_IMAGES.kaliningrad35),
} as const

type PortfolioItem = {
  id: number
  image: string
  title: string
  description: string
  gallery: readonly string[]
};

const items: PortfolioItem[] = [
  {
    id: 1,
    image: PORTFOLIO_IMAGES.pionersk45.img01,
    gallery: PROJECT_GALLERY_BY_ID[1],
    title: 'г. Пионерск',
    description: 'Ремонт квартиры в городе Пионерск. Дизайн-проект от Анны Шатик. Ремонт по просьбе заказчиков сделать за 45 дней был готов на 101%.',
  },
  {
    id: 2,
    image: PORTFOLIO_IMAGES.kaliningrad120.img01,
    gallery: PROJECT_GALLERY_BY_ID[2],
    title: 'г. Калининград',
    description: 'Удаленный ремонт двухкомнатной квартиры в  Калининграде. Заказчики из Якутии. Все работы провели онлайн. Дизайн-проект от Александра и Оксаны. Срок исполнения – 120 дней.',
  },
  {
    id: 3,
    image: PORTFOLIO_IMAGES.pionersk75.img01,
    gallery: PROJECT_GALLERY_BY_ID[3],
    title: 'г. Пионерск',
    description: 'Однокомнатная квартира в городе Пионерск. Квартира по дизайн-проекту от Анны Шатик. Срок исполнения – 75 дней.',
  },
  {
    id: 4,
    image: PORTFOLIO_IMAGES.kaliningrad35.img01,
    gallery: PROJECT_GALLERY_BY_ID[4],
    title: 'г. Калининград',
    description: 'Косметический ремонт двухкомнатной квартиры в Калининграде. Срок исполнения – 35 дней.',
  },
];

const galleryProject = ref<PortfolioItem | null>(null)

const openProjectGallery = (item: PortfolioItem) => {
  galleryProject.value = item
}

const closeProjectGallery = () => {
  galleryProject.value = null
}

/** Как в стилях: (width < 768px). До mounted — десктоп (SSR). */
const isMobileLayout = ref(false);

const slideCountForSlider = computed(() => (isMobileLayout.value ? items.length : 0));

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
} = usePriceSlider(slideCountForSlider, {
  initialActiveIndex: 0,
  itemSelector: '.portfolio-item',
  loop: false,
  loopTripleMode: false,
  navigationCooldownMs: 360,
});

const onPortfolioPrevClick = () => {
  goPrev();
};

const onPortfolioNextClick = () => {
  goNext();
};

let mobileLayoutMediaQuery: MediaQueryList | null = null;

const syncMobileLayout = () => {
  if (mobileLayoutMediaQuery) {
    isMobileLayout.value = mobileLayoutMediaQuery.matches;
  }
};

onMounted(() => {
  mobileLayoutMediaQuery = window.matchMedia('(max-width: 767px)');
  syncMobileLayout();
  mobileLayoutMediaQuery.addEventListener('change', syncMobileLayout);
});

onUnmounted(() => {
  mobileLayoutMediaQuery?.removeEventListener('change', syncMobileLayout);
  mobileLayoutMediaQuery = null;
});

</script>

<template>
  <section id="portfolio" class="portfolio container">
    <div class="header">
      <h2 class="header__title">
        <span class="header__title-highlight">Наше портфолио</span>
        — это наша гордость
      </h2>
      <p class="header__description">
        Квартиры, дома и реконструкции в Калининграде и Калининградской области.
      </p>
    </div>

    <ul v-if="!isMobileLayout" class="portfolio__list">
      <li v-for="item in items" :key="item.id" class="portfolio-item">
        <img
          class="portfolio-item__image" 
          :src="item.image" 
          :alt="item.title" 
          width="760" 
          height="760" 
          decoding="async"
        />
        <div class="portfolio-item__content">
          <h3 class="portfolio-item__title">{{ item.title }}</h3>
          <p class="portfolio-item__description">{{ item.description }}</p>
          <button class="portfolio-item__link" type="button" @click="openProjectGallery(item)">
            Узнать подробнее
          </button>
        </div>
      </li>
    </ul>

    <div v-else class="portfolio__bleed">
      <div class="portfolio__slider-inner">
        <div ref="viewportRef" class="portfolio__viewport" @pointerdown="onPointerDown" @pointerup="onPointerUp"
          @pointercancel="onPointerUp" @selectstart.prevent>
          <ul ref="trackRef" class="portfolio__list portfolio__list--slider" :style="trackStyle">
            <li v-for="item in items" :key="item.id" class="portfolio-item">
              <img 
                class="portfolio-item__image" 
                :src="item.image" 
                :alt="item.title" 
                width="760" 
                height="760" 
                decoding="async"
              />
              <div class="portfolio-item__content">
                <h3 class="portfolio-item__title">{{ item.title }}</h3>
                <p class="portfolio-item__description">{{ item.description }}</p>
                <button class="portfolio-item__link" type="button" @click="openProjectGallery(item)">
                  Узнать подробнее
                </button>
              </div>
            </li>
          </ul>
        </div>
        <div class="portfolio-controls">
          <button class="portfolio-controls__button portfolio-controls__button--prev" type="button"
            aria-label="Предыдущий проект" :disabled="!canGoPrev" @click="onPortfolioPrevClick">
            <Icon name="icons:arrow-button" class="portfolio-controls__icon" />
          </button>
          <button class="portfolio-controls__button portfolio-controls__button--next" type="button"
            aria-label="Следующий проект" :disabled="!canGoNext" @click="onPortfolioNextClick">
            <Icon name="icons:arrow-button" class="portfolio-controls__icon portfolio-controls__icon--flip" />
          </button>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="modal-shell">
        <ModalsPortfolioGallery
          v-if="galleryProject"
          :key="galleryProject.id"
          :slides="[...galleryProject.gallery]"
          :title="galleryProject.title"
          @close="closeProjectGallery"
        />
      </Transition>
    </Teleport>
  </section>
</template>


<style scoped lang="scss">
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

.portfolio {
  margin-block-end: 12vi;

  @media (width < 768px) {
    margin-block-end: 200px;
  }

  &__list {
    display: flex;
    flex-direction: column;
  }

  &__bleed {
    inline-size: 100%;
    margin-inline-start: 0;
    margin-inline-end: 0;
    box-sizing: border-box;
  }

  &__slider-inner {
    position: relative;
    container-type: inline-size;
    container-name: portfolio-slider;
  }

  &__viewport {
    overflow: hidden;
    inline-size: 100%;
    container-type: inline-size;
    container-name: portfolio-viewport;
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

  &__list--slider {
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
    column-gap: 11vi;
    will-change: transform;
    user-select: none;
    -webkit-user-select: none;
  }

  &-item {
    display: flex;
    align-items: flex-start;

    &__image {
      inline-size: 48.75%;
      block-size: auto;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 0.8vi;
    }

    &__content {
      position: relative;
      inline-size: 55%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-block: min(55px, 2.9vi);
      padding-inline-start: min(70px, 3.65vi);
      padding-inline-end: min(60px, 3.15vi);
      background-color: var(--color-background-primary);
      border-radius: 0.8vi;

      container-type: inline-size;

      inset-inline-start: -3.1vi;
      inset-block-start: 5.7vi;
    }

    &__title {
      position: relative;
      font-size: 4cqi;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--color-accent-primary);
      padding-block-end: 3.5cqi;
      margin-block-end: 4.3cqi;

      &::after {
        content: '';
        position: absolute;
        inset-block-end: 0;
        inset-inline-start: 0;
        display: block;
        inline-size: 70%;
        block-size: 1px;
        background-color: var(--color-border-secondary);
      }
    }

    &__description {
      font-size: 2.85cqi;
      font-weight: 400;
      line-height: calc(40/20);
      color: var(--color-text-primary);
      margin-block-end: 8.5cqi;
    }

    &__link {
      display: flex;
      font-size: 2.85cqi;
      font-weight: 400;
      color: var(--color-accent-primary);
      inline-size: max-content;
      white-space: nowrap;
      transition: color 0.3s ease;
      padding: 0;
      border: none;
      background: none;
      font: inherit;
      cursor: pointer;
      text-align: inherit;

      &:hover {
        color: var(--color-text-primary);
      }

      &::before {
        position: absolute;
        content: '';
        inset-block-end: 10cqi;
        inset-inline-start: 0;
        display: block;
        inline-size: 8cqi;
        block-size: 1px;
        background-color: var(--color-border-secondary);
        margin-block-start: min(10px, 0.5vi);
      }
    }

    &:not(:first-child) {
      margin-block-start: -3.91vi;
    }

    &:nth-child(even) {
      flex-direction: row-reverse;

      & .portfolio-item__content {
        inset-inline-start: 3.1vi;
        inset-block-start: 5.7vi;
        padding-inline-end: min(70px, 3.65vi);
        padding-inline-start: min(60px, 3.15vi);
      }

      & .portfolio-item__title {
        align-self: flex-end;

        &::after {
          inset-inline-start: auto;
          inset-inline-end: 0;
        }
      }

      & .portfolio-item__description {
        text-align: right;
      }

      & .portfolio-item__link {
        align-self: flex-end;

        &::before {
          inset-inline-start: auto;
          inset-inline-end: 0;
        }
      }
    }
  }

  @media (width < 768px) {

    &-item {
      flex-direction: column;
      row-gap: 32px;
      inline-size: 100%;
      flex-shrink: 0;
      flex-grow: 0;
      flex-basis: 100%;
      min-inline-size: 100%;
      max-inline-size: 100%;
      box-sizing: border-box;

      &:not(:first-child) {
        margin-block-start: 0;
      }

      &:nth-child(even) {
        flex-direction: column;
        align-items: flex-start;

        & .portfolio-item__content {
          inset-inline-start: 0;
          inset-block-start: 0;
        }

        & .portfolio-item__title {
          align-self: flex-start;

          &::after {
            inset-inline-start: 0;
          }
        }

        & .portfolio-item__description {
          text-align: left;
        }

        & .portfolio-item__link {
          align-self: flex-start;

          &::before {
            inset-inline-start: auto;
            inset-inline-end: 0;
          }
        }
      }

      &__image {
        inline-size: 100%;
        pointer-events: none;
      }

      &__content {
        padding: 16px;
        inline-size: 100%;
        block-size: 100%;
        inset-inline-start: 0;
        inset-block-start: 0;
      }

      &__title {
        font-size: 18px;
        padding-block-end: 16px;
        margin-block-end: 16px;
      }

      &__description {
        font-size: 16px;
        line-height: calc(24/16);
        margin-block-end: 16px;
      }

      &__link {
        font-size: 16px;
        display: flex;
        align-items: center;
        margin-inline: auto 0;
        inline-size: 100%;
        gap: 8px;
        justify-content: space-between;
        margin-block-start: auto;

        &::before {
          position: static;
          inline-size: 100%;
        }
      }
    }
  }
}

.portfolio-controls {
  z-index: 2;
  display: flex;
  position: absolute;
  inset-block-end: -20vi;
  inset-inline-end: 0;
  gap: 10px;

  &__button {
    inline-size: 13.5cqi;
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
  }

  &__icon {
    inline-size: 100%;
    block-size: auto;
    aspect-ratio: 1 / 1;

    &--flip {
      transform: rotate(180deg);
    }
  }

  @media (width < 768px) {
    inset-block-end: -100px;

    &__button {
      inline-size: 48px;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }

    &__icon {
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }
  }
}
</style>
