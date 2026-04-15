<script setup lang="ts">

const items = [
  {
    id: 1,
    title: 'Скидка 5% на мебель',
    description: 'При комплексном заказе кухни и встроенных систем хранения.',
  },
  {
    id: 2,
    title: 'Приемка новостройки',
    description: 'Проводим профессиональный осмотр новостроек с актом замечаний.',
  },
  {
    id: 3,
    title: 'Экскурсия на объект',
    description: 'По предварительной записи можно посмотреть уровень работ вживую.',
  },
]

</script>

<template>
  <section class="bonus container">
    <div class="header">
      <h2 class="header__title">
        <span class="header__title-highlight">Дополнительные возможности</span> 
        для наших клиентов
      </h2>
      <p class="header__description">Для вас — расширенные привилегии, эксклюзивные акции и выгодные предложения, чтобы ваш опыт взаимодействия с нами был максимально комфортным.</p>
    </div>
    <ul class="list">
      <li class="list__item" v-for="item in items" :key="item.id">
        <h3 class="list__item-title">{{ item.title }}</h3>
        <p class="list__item-description">{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">


.bonus {
}

.header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1vi;
  margin-block-end: min(75px, 3.9vi);

  &__title {
    font-size: min(62px, 3.3vi);
    font-weight: 600;
    line-height: 1.4;
    text-transform: uppercase;

    &-highlight {
      color: var(--color-accent-primary);
    }
  }

  &__description {
    font-size: min(20px, 1vi);
    font-weight: 400;
    line-height: calc(35/20);
    font-style: italic;
    color: var(--color-text-secondary);
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;
    gap: 8.5vi;
    margin-block-end: 12vi;

    &__title {
      font-size: 8.5vi;
      letter-spacing: -0.035em;

    }

    &__description {
      font-size: 4.28vi;
    }
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: min(2.3vi, 45px);

  &__item {
    list-style: none; 
    &-title {
      font-size: min(28px, 1.46vi);
      display: inline-flex;
      vertical-align: middle;
      font-weight: 700;
      line-height: 1;
      color: var(--color-accent-primary);
      text-transform: uppercase;
      margin-block-end: min(10px, 0.5vi);


      &::before {
        content: '';
        display: inline-block;
        inline-size: min(20px, 1.05vi);
        block-size: auto;
        aspect-ratio: 1 / 1;
        background-image: url('@/assets/icons/list-marker.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        margin-inline-end: min(13px, 0.68vi);
      }
    }

    &-description {
      font-size: min(20px, 1.05vi);
      font-weight: 400;
      line-height: calc(35/20);
      color: var(--color-text-primary);
    }
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;
    gap: 8.5vi;

    &__item {
      &-title {
        font-size: 4.8vi;
        margin-block-end: 4.8vi;

        &::before {
          inline-size: 3.75vi;
        }
      }

      &-description {
        font-size: 4.28vi;
      }
    }
  }
}

</style>