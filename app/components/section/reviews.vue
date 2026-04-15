<script setup lang="ts">

const items = [
  {
    id: 1,
    image: '/images/reviews/reviews-01.png',
    author: 'Александр',
    description: 'Хотим сказать огромное спасибо. Без вас мы бы не справились. Спасибо, что всегда были на связи, помогали советом, делом, временем - всем, чем можно. Огромное спасибо! В следующий раз только к вам',
  },
  {
    id: 2,
    image: '/images/reviews/reviews-02.png',
    author: 'Мария',
    description: 'Мы были очень довольны работой компании. Все работы были выполнены в срок и качеством. Мы рекомендуем эту компанию всем друзьям и знакомым.',
  },
  {
    id: 3,
    image: '/images/reviews/reviews-03.png',
    author: 'Игорь',
    description: 'Мы были очень довольны работой компании. Все работы были выполнены в срок и качеством. Мы рекомендуем эту компанию всем друзьям и знакомым.',
  }
];

</script>

<template>
  <section class="reviews">
    <div class="header">
      <h2 class="header__title">
        <span class="header__title-highlight">100% положительных отзывов </span>
        клиентов
      </h2>
      <p class="header__description">
        Реальный опыт и искренние слова тех, кто уже оценил преимущества работы с нами.
      </p>
    </div>
    <div class="reviews__content">

    </div>
    <div class="reviews__content">
      <ul class="reviews__list">
        <li class="reviews__item" v-for="item in items" :key="item.id">
          <NuxtImg 
            class="reviews__item-video" 
            :src="item.image" 
            alt="Review Image" 
            width="100"
            height="100"
          />
          <div class="reviews__item-content">
            <span class="reviews__item-author">{{ item.author }}</span>
            <NuxtImg 
              class="reviews__item-stars" 
              src="images/star-01.png" 
              alt="Stars" 
              width="100"
              height="100"
            />
            <p class="reviews__item-description">{{ item.description }}</p>
            <button class="reviews__item-button" type="button">Подробнее</button>
          </div>
        </li>
      </ul>
      <div class="buttons">
        <button class="buttons__prev" type="button">
          <NuxtIcon name="icons:arrow-left" />
        </button>
        <button class="buttons__next" type="button">
          <NuxtIcon name="icons:arrow-right" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>