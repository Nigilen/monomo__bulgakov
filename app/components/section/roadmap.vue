<script setup lang="ts">

const items = [
  {
    number: '01',
    title: 'Встреча',
    description: 'Мы с главным дизайнером лично обсуждаем с вами задачи, планировку, мебель и будущую эргономику.',
  },
  {
    number: '02',
    title: 'Смета',
    description: 'Определяем покрытия, материалы, инженерные решения и формируем точный расчет.',
  },
  {
    number: '03',
    title: 'Подготовка',
    description: 'Покупка, доставка, занос, вывоз мусора и организация работ — на нашей стороне.',
  },
  {
    number: '04',
    title: 'Контроль',
    description: 'Многоступенчатая система контроля и регулярные фотоотчеты в мессенджере.',
  },
  {
    number: '05',
    title: 'Сдача',
    description: 'Профессиональный клининг, проверка всех систем и передача готовой чистой квартиры.',
  },
];

</script>

<template>
  <section class="roadmap container">
    <div class="header">
      <h2 class="header__title">
        Как будет проходить 
        <span class="header__title-highlight"> наша работа:</span>
      </h2>
      <p class="header__description">
        Мы также проводим удаленные ремонты для клиентов из других регионов. Расстояние не помеха, если есть профессионализм, система и доверие.
      </p>
    </div>
    <div class="roadmap__content">
      <NuxtImg 
        class="roadmap__image" 
        src="/roadmap.png" 
        alt="Roadmap Image" 
        width="620"
        height="1090"
      />
      <ol class="roadmap__list">
        <li class="roadmap__item" v-for="item in items" :key="item.number">
          <NuxtImg 
            class="roadmap__item-number" 
            :src="`/step-${item.number}.png`" 
            alt="Roadmap Number" 
            width="275"
            height="210"
          />
          <h3 class="roadmap__item-title">{{ item.title }}</h3>
          <p class="roadmap__item-description">{{ item.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped lang="scss">

.roadmap {
  margin-block-end: 12vi;
  
  @media (width < 768px) {
    margin-block-end: 27vi;
  }
}

.header {
  display: grid;
  grid-template-columns: 6fr 4fr;
  gap: 2vi;
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
    margin-block-start: 0.83vi;
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

.roadmap {

  &__content {
    display: grid;
    grid-template-columns: min(875px, 45.6vi) 1fr;
    gap: 3.2vi;
  }

  &__image {
    inline-size: 100%;
    block-size: auto;
    aspect-ratio: 620 / 1090;
    order: 2;
  }
  
  &__list {
    display: grid;
    grid-template-columns: 1fr;
    order: 1;
    grid-template-rows: repeat(5, 1fr);

  }

  &__item {
    position: relative;
    display: grid;
    grid-template-columns: 1fr min(578px, 30vi);
    border-block-end: 1px solid var(--color-accent-primary);
    padding-inline-end: min(20px, 1vi);
    padding-block-start: min(45px, 2.35vi);
    padding-block-end: min(60px, 3.15vi) ;
    column-gap: min(32px, 1.7vi);
    container-type: inline-size;

    &-number {
      position: absolute;
      inset-inline-start: 0;
      inset-block-start: 0;
      inline-size: auto;
      block-size: 100%;
      aspect-ratio: 275 / 210;
      z-index: -1;
    }
    
    &-title {
      font-size: 4.45cqi;
      font-weight: 600;
      line-height: calc(32 / 38);
      text-align: end;
      margin-block-start: 0.6cqi;
    }
    
    &-description {
      font-size: 2.55cqi;
      font-weight: 400;
      line-height: calc(35 / 22);
    }
  } 

  @media (width < 768px) {
    &__content {
      grid-template-columns: 1fr;
    }

    &__image {
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 343 / 383;
      order: 1;
      object-fit: cover;
      border-radius: 16px;
    }

    &__list {
      order: 2;
      grid-template-columns: 1fr;
    }

    &__item {
      grid-template-columns: 1fr;
      padding-inline: 0;
      padding-block-start: 16vi;
      padding-block-end: 8.55vi;
      row-gap: 6.4vi;

      &:first-child {

        & .roadmap__item-number {
          inset-inline-end: -10cqi;
        }
      }

      &-number {
        inset-inline-start: unset;
        inset-inline-end: 0;
      }
      
      &-title {
        text-align: start;
        font-size: 7.6cqi;
      }
      
      &-description {
        font-size: 4.7cqi;
      }
    }
  }
}
</style>