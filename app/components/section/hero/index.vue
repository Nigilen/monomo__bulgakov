<script setup lang="ts">

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
    <div class="hero__container container">
      <h1 class="hero__title">
        <span class="hero__title-part hero__title-highlight">Ремонт под ключ </span> 
        <span class="hero__title-part">когда вы можете</span>
        <span class="hero__title-part">забыть о стройке</span>
      </h1>
      <div class="hero__description">
        <Icon name="icons:diamonds3" class="hero__description-icon" />
        <p class="hero__description-text">
          Создаем готовые пространства для жизни — от планировочных решений и ремонта до мебели, комплектации и декора
        </p>
      </div>
      <div class="hero__buttons">
        <button class="button button--primary" type="button">
          <span class="button__label">
            Обсудить проект
          </span>
        </button>
        <button class="button button--secondary" type="button">
          <span class="button__label">
            Рассчитать
          </span>
        </button>
      </div>
      <SectionHeroBadges :badges="badges" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  inline-size: 100%;
  background-image: url('/hero-background.png');
  background-size: 100% 100%;
  background-position: top;
  background-repeat: no-repeat;

  margin-block-end: 12vi;


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

    &-highlight {
      color: var(--color-accent-primary);
      font-weight: 500;
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
    background-image: url('/hero-background-m.png');
    background-size: cover;

    margin-block-end: 27vi;

    &__container {
      padding-block-start: 40.53vi;
    }

    &__title {
      margin-block-end: 30px;
      font-size: 7.5vi;
      line-height: calc(40 / 28);
    }

    &__description {
      flex-direction: column;
      align-items: center;
      gap: 2.7vi;
      margin-block-end: 13.5vi;
      inline-size: 100%;

      &-text {
        font-size: 4.27vi;
        line-height: calc(22 / 16);
      }

      &-icon {
        inline-size: 9vi;
      }
    }

    &__buttons {
      flex-direction: column;
      margin-block-end: 20.8vi;
      gap: 5.35vi;
    }
  }
}

.button {
  font-weight: 500;
  inline-size: min(350px, 18.23vi);
  block-size: auto;
  aspect-ratio: 350 / 100;
  border-radius: 0.83vi;
  text-transform: uppercase;
  cursor: pointer;
  container-type: inline-size;

  &__label {
    font-size: 5.8cqi;
    position: relative;
  }

  &--primary {
    color: var(--color-button-text-primary);
    background-image: var(--color-button-background-primary);
    box-shadow: 0 0.4cqi 0px #7C5E49;
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
      border-radius: 0.83vi;
      z-index: 0;
    }

    &::before {
      content: '';
      position: absolute;
      inset: -0.4cqi;
      box-sizing: content-box;
      inline-size: 100%;
      block-size: calc(100% + 2cqi);
      border: 0.4cqi solid #7C5E49;
      border-radius: 0.83vi;
      z-index: 0;
    }
  }

  @media (width < 768px) {
    inline-size: 80vi;
    aspect-ratio: 300 / 78;
    border-radius: 4.25vi;

    &__label {
      font-size: 5.35cqi;
    }

    &--primary {
      box-shadow: 0 1.9cqi 0px #7C5E49;
    }

    &--secondary {
      &::after {
        border-radius: 4.25vi;
        inset: -0.8cqi;
      }
      &::before {
        border-radius: 4.25vi;
        inset: -0.8cqi;
      }
    }
  }
}
</style>