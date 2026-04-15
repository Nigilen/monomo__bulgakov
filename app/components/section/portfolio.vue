<script setup lang="ts">

const items = [
  {
    id: 1,
    image: '/images/portfolio/portfolio-01.png',
    title: 'г. Пионерск',
    description: 'Ремонт квартиры в городе Пионерск. Дизайн-проект от Анны Шатик. Ремонт по просьбе заказчиков сделать за 45 дней был готов на 101%.',
  },
  {
    id: 2,
    image: '/images/portfolio/portfolio-02.png',
    title: 'г. Калининград',
    description: 'Удаленный ремонт двухкомнатной квартиры в  Калининграде. Заказчики из Якутии. Все работы провели онлайн. Дизайн-проект от Александра и Оксаны. Срок исполнения – 120 дней.',
  },
  {
    id: 3,
    image: '/images/portfolio/portfolio-03.png',
    title: 'г. Пионерск',
    description: 'Однокомнатная квартира в городе Пионерск. Квартира по дизайн-проекту от Анны Шатик. Срок исполнения – 75 дней.',
  },
  {
    id: 4,
    image: '/images/portfolio/portfolio-04.png',
    title: 'г. Калининград',
    description: 'Косметический ремонт двухкомнатной квартиры в Калининграде. Срок исполнения – 35 дней.',
  },
];
</script>

<template>
  <section class="portfolio">
    <div class="header">
      <h2 class="header__title">
        <span class="header__title-highlight">Наше портфолио</span> 
        — это наша гордость
      </h2>
      <p class="header__description">
        Квартиры, дома и реконструкции в Калининграде и Калининградской области.
      </p>
    </div>
    <ul class="portfolio__list">
      <li class="portfolio__item" v-for="item in items" :key="item.id">
        <NuxtImg 
          class="portfolio__item-image" 
          :src="item.image" 
          alt="Portfolio Image" 
          width="100"
          height="100"
        />
        <div class="portfolio__item-content">
          <h3 class="portfolio__item-title">{{ item.title }}</h3>
          <p class="portfolio__item-description">{{ item.description }}</p>
          <button class="portfolio__item-button" type="button">
            Узнать подробнее
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>