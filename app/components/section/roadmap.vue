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
  <section class="roadmap">
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
        class="roadmap__content-image" 
        src="images/roadmap-01.png" 
        alt="Roadmap Image" 
        width="100"
        height="100"
      />
      <ul class="roadmap__list">
        <li class="roadmap__item" v-for="item in items" :key="item.number">
          <span class="roadmap__item-number">{{ item.number }}</span>
          <h3 class="roadmap__item-title">{{ item.title }}</h3>
          <p class="roadmap__item-description">{{ item.description }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>