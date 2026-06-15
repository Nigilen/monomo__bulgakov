<script setup lang="ts">

const { open: openSimpleModal } = useSimpleModal()

const badges: Array<{
  id: number;
  title: string;
  description: string;
}> = [
    {
      id: 1,
      title: 'Все берем на себя',
      description: 'Без стресса, без сюрпризов, без участия в рутине.',
    },
    {
      id: 2,
      title: 'Полный цикл',
      description: 'Ремонт, мебель, авторский надзор, комплектация',
    },
    {
      id: 3,
      title: 'Дизайн-проект в подарок',
      description: 'При заказе ремонта под ключ — дизайн-проект бесплатно',
    },
];

</script>

<template>
  <section class="hero">
    <picture class="hero__bg">
      <source 
        media="(max-width: 768px)" 
        srcset="/images/hero-background-m.avif" 
        type="image/avif"
      >
      <img 
        src="/images/hero-background.avif" 
        alt="" 
        width="1920" 
        height="1080" 
        fetchpriority="high" 
        loading="eager" 
        decoding="async"
        class="hero__bg-img"
      >
    </picture>
    <div class="hero__container container">
      <div class="hero__top">
        <div class="hero__top-content">
          <h1 class="hero__title">
            <span class="hero__title-part hero__title-highlight">Ремонт под ключ </span> 
            <span class="hero__title-part">доступный каждому </span>
            <span class="hero__title-part">от 4000 руб/м²</span>
          </h1>
          <div class="hero__description">
            <Icon name="icons:diamonds3" class="hero__description-icon" />
            <p class="hero__description-text">
              Мы делаем ремонты от простого до премиального класса, воплощая мечты в реальность для любого бюджета
            </p>
          </div>
          <div class="hero__buttons">
            <button class="button button--primary" type="button" @click="openSimpleModal">
              <span class="button__label">
                Обсудить проект
              </span>
            </button>
            <a href="#calculator" class="button button--secondary">
              <span class="button__label">
                Рассчитать
              </span>
            </a>
          </div>
        </div>
        <SectionHeroPromo class="hero__promo" />
      </div>
      <SectionHeroBadges :badges="badges" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  inline-size: 100%;
  margin-block-end: 12vi;
  position: relative;

  &__bg {
    position: absolute;
    overflow: hidden;
    display: block;
    inset: 0;
    line-height: 0;
    z-index: -1;
  }

  &__top {
    display: flex;
    justify-content: space-between;
    align-items: start;
  }

  &__promo {
    flex-shrink: 0;
  }

  &__container {
    display: flex;
    flex-direction: column;
    padding-block-start: min(266px,13.855vi);
  }

  &__title {
    font-size: min(68px, 3.54vi);
    font-weight: 400;
    line-height: calc(100 / 68);
    text-transform: uppercase;
    color: var(--color-text-primary);
    margin-block-end: min(46px, 2.4vi);

    &-part {
      display: block;
    }

    &-part:last-child {
      text-transform: lowercase;
    }

    &-highlight {
      color: var(--color-accent-primary);
      font-weight: 600;
    }
  }

  &__description {
    display: flex;
    align-items: flex-start;
    gap: min(5px, 0.3vi);
    margin-block-end: min(40px, 2.1vi);
    inline-size: min(760px, 40vi);

    &-text {
      font-size: min(18px, 0.94vi);
      font-weight: 500;
      line-height: calc(30 / 18);
      color: var(--color-text-secondary);
    }

    &-icon {
      flex-shrink: 0;
      display: block;
      margin-block-start: min(5px, 0.3vi);
      inline-size: min(48px, 2.5vi);
      block-size: auto;
      aspect-ratio: 48 / 22;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    column-gap: min(40px, 2.1vi);
    margin-block-end: min(103px, 5.4vi);
  }

  @media (width < 768px) {
    background-image: linear-gradient(to bottom, transparent 0%, #252525 100%);
    background-size: cover;

    margin-block-end: 100px;

    &__top {
      flex-direction: column;
    }

    &__top-content {
      display: contents;
    }

    &__title {
      order: 1;
      margin-block-end: 30px;
      font-size: 28px;
      line-height: calc(40 / 28);
    }

    &__description {
      order: 2;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      margin-block-end: 50px;
      inline-size: 100%;

      &-text {
        font-size: 16px;
        line-height: calc(22 / 16);
      }

      &-icon {
        inline-size: 34px;
      }
    }

    &__promo {
      order: 3;
    }

    &__buttons {
      order: 4;
      flex-direction: column;
      margin-block-end: 80px;
      gap: 20px;
      align-items: flex-start;
      inline-size: 100%;
    }

    &__container {
      padding-block-start: 152px;
    }
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  inline-size: min(350px, 18.23vi);
  block-size: auto;
  aspect-ratio: 350 / 100;
  border-radius: 0.83vi;
  text-transform: uppercase;
  cursor: pointer;
  container-type: inline-size;
  transition-property: transform, box-shadow, filter;
  transition-duration: 460ms;
  transition-timing-function: ease;

  &__label {
    font-size: 5.8cqi;
    position: relative;
  }

  &--primary {
    color: var(--color-button-text-primary);
    background-image: var(--color-button-background-primary);
  }

  &--secondary {
    position: relative;
    color: var(--color-button-text-secondary);
    background-color: var(--color-button-background-secondary);
    border: 2px solid var(--color-border-secondary);
    border-radius: 0.83vi;
  }

  @media (hover: hover) and (width >= 768px) {
    &--primary:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
      filter: brightness(1.08);
    }

    &--secondary:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
      border-color: var(--color-accent-primary);
    }
  }

  @media (width < 768px) {
    inline-size: min(100%, 300px);
    aspect-ratio: 300 / 78;
    border-radius: 16px;

    &__label {
      font-size: 16px;
    }

  }
}
</style>