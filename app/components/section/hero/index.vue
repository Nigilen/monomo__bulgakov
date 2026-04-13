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
        <span class="hero__title-highlight">Ремонт под ключ</span> когда вы можете <br>забыть о стройке
      </h1>
      <div class="hero__description">
        <Icon name="icons:diamonds3" />
        <p class="hero__description-text">
          Создаем готовые пространства для жизни — от планировочных решений и ремонта до мебели, комплектации и декора
        </p>
      </div>
      <div class="hero__buttons">
        <UiButton variant="primary">
          Обсудить проект
        </UiButton>
        <UiButton variant="secondary">
          Рассчитать
        </UiButton>
      </div>
      <SectionHeroBadges :badges="badges" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  min-block-size: 1085px;
  inline-size: 100%;
  background-image: url('/hero-background.png');
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  margin-block-end: var(--section-margin-block-end);

  &__container {
    display: flex;
    flex-direction: column;
    padding-block-start: min(266px, 25vb);
  }

  &__title {
    font-size: clamp(28px, 3.4vi, 68px);
    font-weight: 400;
    line-height: 1.47;
    text-transform: uppercase;
    color: var(--color-text-primary);
    margin-block-end: min(46px, 2.4vi);
    inline-size: min(750px, 90%);

    &-highlight {
      color: var(--color-accent-primary);
      font-weight: 500;
    }
  }

  &__description {
    display: flex;
    align-items: baseline;
    gap: min(16px, 0.8vi);
    margin-block-end: min(40px, 4.2vi);

    &-text {
      font-size: clamp(16px, 0.9vi, 18px);
      font-weight: 500;
      line-height: 1.66;
      inline-size: min(700px, 100%);
      color: var(--color-text-secondary);
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    column-gap: min(16px, 0.9vi);
    row-gap: 20px;
    margin-block-end: min(100px, 9.4vi);
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
</style>