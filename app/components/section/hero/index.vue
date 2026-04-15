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
        <Icon name="icons:diamonds3" />
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
  min-block-size: 56.5vi;
  inline-size: 100%;
  background-image: url('/hero-background.png');
  background-size: 100% 100%;
  background-position: top;
  background-repeat: no-repeat;
  margin-block-end: var(--section-margin-block-end);

  &__container {
    display: flex;
    flex-direction: column;
    padding-block-start: 13.9vi;
    container-type: inline-size;
  }

  &__title {
    font-size: 4.3cqi;
    font-weight: 400;
    line-height: 1.5em;
    text-transform: uppercase;
    color: var(--color-text-primary);
    margin-block-end: 2.9cqi;

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
    align-items: baseline;
    gap: 0.9cqi;
    margin-block-end: 2.6cqi;

    &-text {
      font-size: min(1.4cqi, 18px);
      font-weight: 500;
      line-height: 1.5em;
      inline-size: min(50cqi, 100%);
      color: var(--color-text-secondary);
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    column-gap: 2.5cqi;
    row-gap: 20px;
    margin-block-end: 6.6cqi;
  }

  @media (width < 576px) {
    background-image: url('/hero-background-m.png');
    min-height: 100dvh;
    background-size: cover;

    &__title {
      margin-block-end: 30px;
    }

    &__description {
      flex-direction: column;
      align-items: center;
      gap: 16px;
      margin-block-end: 50px;
    }

    &__buttons {
      flex-direction: column;
      margin-block-end: 80px;
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

  &--primary {
    color: var(--color-button-text-primary);
    background-image: var(--color-button-background-primary);
    box-shadow: 0 0.45cqi 0px #7C5E49;
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