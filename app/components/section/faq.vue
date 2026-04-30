<script setup lang="ts">

const items = [
  {
    id: 1,
    question: 'Какая гарантия на работы?',
    answer: 'До 5 лет на капитальные конструкции и инженерные коммуникации, до 2 лет на финишную отделку. Выезд по гарантии — в течение 24 часов.',
  },
  {
    id: 2,
    question: 'Как фиксируется цена?',
    answer: 'Цена в договоре — твердая сумма. Изменение возможно только если клиент сам меняет проект или добавляет работы.',
  },
  {
    id: 3,
    question: 'Сколько проектов вы ведете одновременно?',
    answer: 'Типовые ремонты — до 5 объектов. Сложные проекты — 2–3 объекта. Это сохраняет глубину контроля.',
  },
  {
    id: 4,
    question: 'Работаете ли вы за пределами Калининграда?',
    answer: 'Да, по всей области и в формате удаленного ремонта для клиентов из других регионов.',
  },
  {
    id: 5,
    question: 'Какие материалы вы используете?',
    answer: 'Материалы зависят от выбранного пакета и заранее утверждаются в смете.',
  },
  {
    id: 6,
    question: 'Как долго длится ремонт?',
    answer: 'Косметический — 30–45 дней, капитальный — 90–120 дней. График прилагается к договору.',
  },
  {
    id: 7,
    question: 'Что входит в ремонт под ключ?',
    answer: 'Все работы от демонтажа до чистовой отделки, материалы по пакету, мебель при заказе и финальный клининг.',
  },
  {
    id: 8,
    question: 'Есть ли скрытые платежи?',
    answer: 'Нет. Прозрачность — одна из ключевых ценностей компании. Все фиксируется в смете и договоре.',
  },
];

const openId = ref<number | null>(null);

const toggleAnswer = (id: number) => {
  openId.value = openId.value === id ? null : id;
};

const getQuestionIconName = (id: number) =>
  openId.value === id ? 'icons:minus' : 'icons:plus';

</script>

<template>
  <section class="faq container">
    <div class="header">
      <h2 class="header__title">
        Вопросы, на которые 
        <span class="header__title-highlight">есть быстрый ответ</span>
      </h2>
    </div>
    <ul class="faq-list">
      <li class="faq-item" v-for="item in items" :key="item.id">
        <div class="faq-item__question" @click="toggleAnswer(item.id)">
          <h3 class="faq-item__question-title">{{ item.question }}</h3>
          <Icon
            :name="getQuestionIconName(item.id)"
            class="faq-item__question-icon"
            size="30"
          />
        </div>
        <div
          class="faq-item__answer"
          :class="{ 'faq-item__answer--open': openId === item.id }"
        >
          <div class="faq-item__answer-inner">
            <p class="faq-item__answer-text">{{ item.answer }}</p>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">

.faq {
  margin-block-end: 12vi;
  
  @media (width < 768px) {
    margin-block-end: 100px;
  }
}

.header {
  inline-size: min(800px, 100%);
  margin-block-end: min(75px, 3.9vi);

  &__title {
    font-size: min(62px, 3.3vi);
    font-weight: 400;
    line-height: 1.4;
    text-transform: uppercase;

    &-highlight {
      color: var(--color-accent-primary);
      font-weight: 600;
    }
  }

  @media (width < 768px) {
    margin-block-end: 32px;

    &__title {
      font-size: 32px;
      letter-spacing: -0.035em;
    }
  }
}

.faq {
  &-list {
    display: flex;
    flex-direction: column;
  }
  
  &-item {
    display: flex;
    flex-direction: column;
    border-block: 1px solid #C58F4555;
    container-type: inline-size;

    &__question {
      display: grid;
      grid-template-columns: 1fr 4cqi;
      justify-content: space-between;
      align-items: center;
      padding-block: 2.55cqi;
      cursor: pointer;

      padding-inline-end: 1.9cqi;

      &-title {
        font-size: 1.8cqi;
        font-weight: 400;
        line-height: calc(40 / 28);
      }

      &-icon {
        cursor: pointer;
        inline-size: 2.6cqi;
        block-size: auto;
        aspect-ratio: 1 / 1;
      }
    }

    &__answer {
      display: grid;
      grid-template-rows: 0fr;
      transition: grid-template-rows 0.3s ease-in-out;

      &--open {
        grid-template-rows: 1fr;
      }
    }

    &__answer-inner {
      min-block-size: 0;
      overflow: hidden;
    }

    &__answer-text {
      padding-block-end: 2.55cqi;
      font-size: 1.3cqi;
      font-weight: 400;
      line-height: calc(35 / 20);
      color: var(--color-text-secondary);
    }

  }

  @media (width < 768px) {
    &-item {


      &__question {
        padding-block: 16px;
        padding-inline-end: 16px;

        &-title {
          font-size: 18px;
        }

        &-icon {
          inline-size: 30px;
        }
      }

      &__answer-text {
        font-size: 16px;
      }
    }
  }
}


</style>