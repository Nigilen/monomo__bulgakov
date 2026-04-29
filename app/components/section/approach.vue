<script setup lang="ts">


const items = [
  {
    id: 1,
    title: 'Личная вовлеченность и экспертиза',
    description: 'Проект ведет основатель компании и ведущий инженер, знающий объект до мельчайших деталей. Команда закреплена только за вами — без распыления между объектами.',
  },
  {
    id: 2,
    title: 'Перфекционизм в деталях',
    description: 'Без распыления внимания качество становится осязаемым. Мы делаем то, на что у потоковых компаний не хватает ресурса.',
  },
  {
    id: 3,
    title: 'Бутиковый подход и прозрачность',
    description: 'Ограниченное число объектов — гарантия глубокой вовлеченности и высокого стандарта. Только проверенные профессионалы, которые ценят чистоту и уважение к вашему пространству. Еженедельные отчеты и честный диалог без лишнего стресса.',
  },
];

</script>

<template>
  <section id="approach" class="approach">
    <div class="approach__container container">
      <div class="approach__top header">
        <h2 class="header__title">
          <span class="header__title-highlight">Качество важнее</span> 
          количества
        </h2>
        <p class="header__description">Мы сознательно отказались от конвейерного подхода в пользу бутикового сервиса. Для нас важно не количество сданных квадратных метров, а безупречность каждого из них.</p>
      </div>
      <div class="approach__bottom">
        <ul class="approach__list list">
          <li class="list__item" v-for="item in items" :key="item.id">
            <h3 class="list__item_title">
              {{ item.title }}
            </h3>
            <p class="list__item_description">
              {{ item.description }}
            </p>
          </li>
        </ul>
        <img
          class="approach__image"
          src="/images/approach-img.avif"
          alt=""
          aria-labelledby="approach"
          width="770"
          height="715"
          decoding="async"
          loading='lazy'
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.approach {
  margin-block-end: 12vi;
  
  &__container {
    display: flex;
    flex-direction: column;
  }

  &__top,
  &__bottom {
    display: flex;
    column-gap: 3.5vi;
  }

  &__list,
  &__image {
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;
  }

  &__list {
    align-self: flex-end;
  }

  &__image {
    object-fit: cover;
  }

  @media (width < 768px) {

    margin-block-end: 124px;

    &__container {
      
    }

    &__top,
    &__bottom {
      flex-direction: column;
      row-gap: 32px;
    }

    &__list-host {
      order: 2;
    }

    &__image {
      inline-size: 100%;
      order: 1;
    }
  }
}

.header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  &__title {
    font-size: min(62px, 3.3vi);
    font-weight: 600;
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


.list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  block-size: 100%;
  row-gap: clamp(32px, 3.6vi, 70px);
  list-style: none;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  inline-size: 100%;
  flex-basis: 0;
  flex-grow: 1;
  min-inline-size: 0;

  &__item {
    position: relative;
    inline-size: 100%;


    &_title {
      position: relative;
      font-size: min(28px, 1.46vi);
      display: inline-flex;
      vertical-align: middle;
      font-weight: 700;
      line-height: 1;
      color: var(--color-accent-primary);
      text-transform: uppercase;
      margin-block-end: min(10px, 0.5vi);
      margin-inline-start: 1.5vi;

      &::before {
        content: '';
        inset-block: 0;
        position: absolute;
        inset-inline-start: -1.5vi;
        inline-size: min(20px, 1.05vi);
        block-size: auto;
        aspect-ratio: 1 / 1;
        background-image: url('@/assets/icons/list-marker.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &_description {
      font-size: min(20px, 1.05vi);
      font-weight: 400;
      line-height: calc(35/20);
      color: var(--color-text-primary);
      
    }
  }
  @media (width < 768px) {
    order: 2;
  
    margin-block-start: 0;
  
    &__item {

  
      &_title {
        font-size: 18px;
        line-height: calc(30 / 18);
        margin-block-end: 16px;
        gap: 10px;
        margin-inline-start: 42px;
        
        &::before {
          inline-size: 20px;
          inset-inline-start: -34px;
          inset-block-start: 5px;
          background-position: top;
        }
      }
      
      &_description {
        font-size: 16px;
        line-height: calc(26 / 16);
        margin-inline-start: 42px;
      }
    }
  
  }
}

</style>
