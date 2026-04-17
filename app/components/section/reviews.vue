<script setup lang="ts">

const items = [
  {
    id: 1,
    image: '/review-01.png',
    author: 'Александр',
    description: 'Хотим сказать огромное спасибо. Без вас мы бы не справились. Спасибо, что всегда были на связи, помогали советом, делом, временем - всем, чем можно. Огромное спасибо! В следующий раз только к вам',
  },
  {
    id: 2,
    image: '/review-02.png',
    author: 'Мария',
    description: 'Я обратилась к ребятам в феврале 2024 года с запросом на ремонт загородного дома в Зеленоградске. Никакого дизайн-проекта у меня не было и вообще я не знала что хочу, просто чтоб было красиво)). Их подход меня поразил! Продумали все до мелочей – каждую розетку, цветовую гамму, как расположить мебель, какие материалы использовать. Получается, обратилась за ремонтом, а получила еще и дизайнерское решение! В мае я уже праздновала новоселье! Благодарна Владимиру и Марие за такое душевное отношение!',
  },
  {
    id: 3,
    image: '/review-03.png',
    author: 'Валентина',
    description: 'У нас с ребятами долгая история)) Сначала мы с ними построили дом, а потом они же нам его отремонтировали "под ключ". Стройка и ремонт заняли в общем 10 месяцев. Их команда работала так слаженно и быстро, и при этом очень качественно! Мария и Владимир очень помогли нам с дизайном дома, понравился их подход к делу- делали как для себя, с душой! Сами решали все вопросы с закупом и доставкой материалов. Вообщем, мы не испытали никакого дискомфорта, только удовольствие от ремонта! Спасибо огромное ребятам за наш прекрасный дом!',
  },
  {
    id: 4,
    image: '/review-04.png',
    author: 'Галина и Виталий',
    description: 'Мы были очень довольны работой компании. Все работы были выполнены в срок и качеством. Мы рекомендуем эту компанию всем друзьям и знакомым.',
  }
];

</script>

<template>
  <section class="reviews container">
    <div class="header">
      <h2 class="header__title">
        <span class="header__title-highlight">100% положительных отзывов </span>
        клиентов
      </h2>
      <p class="header__description">
        Реальный опыт и искренние слова тех, кто уже оценил преимущества работы с нами.
      </p>
    </div>
    <div class="reviews-wrapper">

      <ul class="reviews-list">
        <li class="review-item" v-for="item in items" :key="item.id">
          <div class="review-item__video-wrapper">
            <button class="review-item__video-button" type="button">
              <Icon class="review-item__video-button-icon" name="icons:play-btn" size="90" />
            </button>
            <NuxtImg 
              class="review-item__video" 
              :src="item.image" 
              alt="Review Image" 
              width="458"
              height="458"
            />
          </div>
          <div class="review-item__content">
            <span class="review-item__author">{{ item.author }}</span>
            <Icon 
              class="review-item__stars" 
              name="icons:stars" 
              size="17"
            />
            <p class="review-item__description">{{ item.description }}</p>
          </div>
        </li>
      </ul>
      <div class="reviews-controls">
        <button class="reviews-controls__button reviews-controls__button--prev" type="button">
          <Icon name="icons:arrow-button" class="reviews-controls__icon" />
        </button>
        <button class="reviews-controls__button reviews-controls__button--next" type="button">
          <Icon name="icons:arrow-button" class="reviews-controls__icon" />
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.header {
  display: grid;
  grid-template-columns: 2fr 1fr;
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

.reviews {
  &-list {
    margin-inline: auto;
    display: flex;
    overflow: scroll;

    scroll-snap-type: x mandatory;
    scroll-snap-align: center;
    scroll-snap-stop: always;
    scroll-behavior: smooth;

    gap: 1.65vi;
  }

  &-wrapper {
    position: relative;
  }

  &-controls {

    &__button {
      position: absolute;
      inline-size: 4.8cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;

      &--prev {
        inset-block-start: 50%;
        inset-inline-start: 0;
        transform: translateY(-50%);
      }

      &--next {
        inset-block-start: 50%;
        inset-inline-end: 0;
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &__icon {
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }
  }

  @media (width < 768px) {
    &-controls {
      display: flex;
      position: absolute;
      inset-block-end: -10vi;
      inset-inline-end: 0;
      z-index: 1;
      gap: 10px;

      &__button {
        position: static;
        inline-size: 13.5cqi;
        transform: none;
        inset-block-start: 0;
        inset-inline-end: 0;

        &--next {

          & .reviews-controls__icon {
            transform: rotate(180deg);
          }
        }
      }
    }

    &__icon {
      inline-size: 100%;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }
  }
}

.review {


  &-item {
    padding: 1.65vi;
    background-color: var(--color-background-secondary);
    border-radius: 0.8vi;
    border: 1px solid var(--color-border-primary);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.65vi;
    inline-size: min(1225px, 63.8vi);
    block-size: auto;
    margin-inline: auto;
    container-type: inline-size;

    flex-shrink: 0;
    flex-grow: 1;



    &__video-wrapper {
      position: relative;
    }
    
    &__video-button {
      position: absolute;
      inset: 0;
      inline-size: 100%;
      block-size: 100%;
      
      &-icon {
        inline-size: 10cqi;
        block-size: auto;
        aspect-ratio: 1 / 1;
        margin: auto;
      }
    }

    &__video {
      border-radius: 1.4cqi;
      inline-size: 39.6cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }

    &__content {
      display: flex;
      flex-direction: column;
    }
    
    &__author {
      font-size: 1.9cqi;
      font-weight: 600;
      margin-block-end: 1cqi;
    }
    
    &__stars {
      display: block;
      inline-size: 8.1cqi;
      block-size: auto;
      aspect-ratio: 95 / 17;
      margin-block-end: 1.8cqi;
    }

    &__description {
      font-size: 1.8cqi;
      font-weight: 400;
      line-height: calc(30 / 20);
    }

  }

  @media (width < 768px) {

    &-item {
      display: flex;
      flex-direction: column;
      gap: 4.27vi;
      padding: 4.27vi;
      padding-block-end: 8.54vi;
      inline-size: 100%;
      border-radius: 4.3vi;

      &__video {
        inline-size: 100%;
        block-size: auto;
        aspect-ratio: 1 / 1; 
        border-radius: 4.3vi;
      }

      &__video-button-icon {
        inline-size: 30cqi;
      }
      
      &__content {
        display: flex;
        flex-direction: column;
      }
      
      &__author {
        font-size: 5.85cqi;
        font-weight: 600;
        margin-block-end: 2.6cqi;
      }

      &__stars {
        inline-size: 30cqi;
        block-size: auto;
        aspect-ratio: 95 / 17;
        margin-block-end: 4.05cqi;
      }

      &__description {
        font-size: 5.2cqi;
        line-height: calc(24 / 16);
      }
    }

  }

}
</style>