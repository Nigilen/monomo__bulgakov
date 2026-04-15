<script setup lang="ts">

const items = [
  {
    id: 1,
    question: 'Какая гарантия на работы?',
    answer: 'Мы работаем 24/7 и готовы помочь вам в любое время.',
  },
  {
    id: 2,
    question: 'Как фиксируется цена?',
    answer: 'Мы работаем 24/7 и готовы помочь вам в любое время.',
  },
  {
    id: 3,
    question: 'Работаете ли вы за пределами Калининграда?',
    answer: 'Мы работаем 24/7 и готовы помочь вам в любое время.',
  },
  {
    id: 4,
    question: 'Сколько проектов вы ведете одновременно?',
    answer: 'Мы работаем 24/7 и готовы помочь вам в любое время.',
  },
  {
    id: 5,
    question: 'Какие материалы вы используете?',
    answer: 'Мы работаем 24/7 и готовы помочь вам в любое время.',
  },
  {
    id: 6,
    question: 'Как долго длится ремонт?',
    answer: 'Мы работаем 24/7 и готовы помочь вам в любое время.',
  },
  {
    id: 7,
    question: 'Что входит в ремонт под ключ?',
    answer: 'Мы работаем 24/7 и готовы помочь вам в любое время.',
  },
  {
    id: 8,
    question: 'Есть ли скрытые платежи?',
    answer: 'Мы работаем 24/7 и готовы помочь вам в любое время.',
  },
];

</script>

<template>
  <section class="faq">
    <div class="header">
      <h2 class="header__title">
        Вопросы, на которые 
        <span class="header__title-highlight">есть быстрый ответ</span>
      </h2>
    </div>
    <ul class="faq__list">
      <li class="faq__item" v-for="item in items" :key="item.id">
        <div class="faq__item-content">
          <h3 class="faq__item-question">{{ item.question }}</h3>
          <NuxtIcon name="icons:arrow-down" />
        </div>
        <div class="faq__item-answer">
          <p class="faq__item-answer-text">{{ item.answer }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss"></style>