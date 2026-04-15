<script setup lang="ts">

const items = [
  {
    id: 1,
    title: 'Практичность',
    description: 'Мы предлагаем решения и материалы, которые долго служат и за которыми легко ухаживать. Красота должна быть удобной.',
  },
  {
    id: 2,
    title: 'Честная цена',
    description: 'Фиксированная смета. Вы знаете реальную стоимость ещё до начала демонтажа.',
  },
  {
    id: 3,
    title: 'Скорость и порядок',
    description: 'Отработанные технологии позволяют нам сдавать объекты точно в срок.',
  },
  {
    id: 4,
    title: 'Слушать и слышать',
    description: 'Мы понимаем реальные потребности семьи и помогаем расставлять приоритеты правильно.',
  },
  {
    id: 5,
    title: 'Спокойствие клиента',
    description: 'Мы — ваше доверенное лицо на стройке. Фото- и видеофиксация каждого этапа — для уверенности и спокойствия.',
  },
  {
    id: 6,
    title: 'Комфорт на каждый рубль',
    description: 'Мы помогаем экономить там, где это не вредит качеству и не снижает уровень результата.',
  },
];

</script>

<template>
  <section class="advantages">
    <ul class="advantages__list">
      <li class="advantages__item" v-for="item in items" :key="item.id">
        <NuxtIcon class="advantages__item-icon" name="icons:practicality" />
        <h3 class="advantages__item-title">{{ item.title }}</h3>
        <p class="advantages__item-description">{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
</style>