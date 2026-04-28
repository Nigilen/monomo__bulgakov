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
      <SectionHeroBadges :badges="badges" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  inline-size: 100%;
  background-image: url('/images/hero-background.png');
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
    background-image: 
      linear-gradient(to bottom, transparent 0%, #252525 100%), 
      url('/images/hero-background-m.png');
    background-size: cover, cover;

    margin-block-end: 100px;

    &__container {
      padding-block-start: 152px;
    }

    &__title {
      margin-block-end: 30px;
      font-size: 28px;
      line-height: calc(40 / 28);
    }

    &__description {
      flex-direction: column;
      align-items: center;
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

    &__buttons {
      flex-direction: column;
      margin-block-end: 80px;
      gap: 20px;
      align-items: flex-start;
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