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
        <UiSectionHeader
          :title-segments="headerTitleSegments"
          description="Мы сознательно отказались от конвейерного подхода в пользу бутикового сервиса. Для нас важно не количество сданных квадратных метров, а безупречность каждого из них."
        />
      </div>
      <div class="approach__bottom">
        <div class="approach__list-host">
          <UiSectionList :items="items" />
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
  }

  &__top,
  &__bottom {
    display: flex;
    column-gap: 1.042vi;
  }

  &__list-host,
  &__image {
    flex-basis: 0;
    flex-grow: 1;
    min-inline-size: 0;
  }

  &__image {
    display: block;
    inline-size: 770px;
    block-size: auto;
    aspect-ratio: 770 / 715;
    border-radius: 16px;
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
</style>
