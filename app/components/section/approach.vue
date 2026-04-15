<script setup lang="ts">

const headerTitleSegments = [
  { text: 'Качество важнее ', highlight: true },
  { text: 'количества' },
];

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
      <div class="approach__top">
        <h2 class="section-header__title">
          <template v-for="(segment, index) in headerTitleSegments" :key="index">
            <span
              v-if="segment.highlight"
              class="section-header__title_highlight"
            >{{ segment.text }}</span>
            <span v-else>{{ segment.text }}</span>
          </template>
        </h2>
        <p class="section-header__description">
          Мы сознательно отказались от конвейерного подхода в пользу бутикового сервиса. Для нас важно не количество сданных квадратных метров, а безупречность каждого из них.
        </p>
      </div>
      <div class="approach__bottom">
        <div class="approach__list-host">
          <ul class="list">
            <li class="list__item" v-for="item in items" :key="item.id">
              <h3 class="list__item_title">
                {{ item.title }}
              </h3>
              <p class="list__item_description">
                {{ item.description }}
              </p>
            </li>
          </ul>
        </div>
        <NuxtImg
          class="approach__image"
          src="/approach-img.png"
          alt=""
          aria-labelledby="approach"
          width="770"
          height="715"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.approach {
  margin-block-end: var(--section-margin-block-end);
  
  &__container {
    display: flex;
    flex-direction: column;
    row-gap: 2vi;
  }

  &__top,
  &__bottom {
    display: flex;
    column-gap: 2.042vi;
  }

  &__list-host,
  &__image {
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;
  }

  &__image {
    // display: block;
    // inline-size: 770px;
    // block-size: auto;
    // aspect-ratio: 770 / 715;
    // border-radius: 16px;
    object-fit: cover;
  }

  @media (width < 768px) {
    &__container {
      row-gap: 32px;
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

.section-header {
  &__title {
    font-size: clamp(32px, calc(6px + 2.92vi), 62px);
    font-weight: 400;
    line-height: 1.45;
    text-transform: uppercase;
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;

    &_highlight {
      font-weight: 500;
      color: var(--color-accent-primary);
    }
  }

  &__description {
    font-size: clamp(14px, calc(-4px + 1.25vi), 20px);
    color: var(--color-text-secondary);
    line-height: 1.75em;
    font-weight: 400;
    font-style: italic;
    align-self: center;
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;
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
  container-type: inline-size;

  &__item {
    position: relative;
    inline-size: 100%;

    &::before {
      content: '';
      position: absolute;
      inset-block-start: 0.8cqb;
      inset-inline-start: 0;
      display: block;
      inline-size: 2.6cqmin;
      block-size: auto;
      aspect-ratio: 1 / 1;
      background-image: url('@/assets/icons/list-marker.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    &_title {
      font-size: clamp(18px, 3.637cqi, 28px);
      font-weight: 600;
      margin-block-end: 1.3cqmin;
      color: var(--color-accent-primary);
      text-transform: uppercase;
      margin-inline-start: 3.5cqmin;
    }

    &_description {
      font-size: clamp(16px, 2.78cqi, 20px);
      line-height: 1.75;
      font-weight: 400;
    }
  }
}

@media (width < 768px) {
  .list {
    margin-block-start: 0;

    &__item {
      &::before {
        inset-block-start: 1.3cqmin;
        inline-size: 20px;
      }

      &_title {
        margin-inline-start: 32px;
      }

      &_description {
        margin-inline-start: 32px;
      }
    }
  }
}
</style>
