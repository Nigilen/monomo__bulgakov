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
  <section class="advantages container">

    <ul class="list">
      <li class="list__item" v-for="item in items" :key="item.id">
        <h3 class="list__item-title">{{ item.title }}</h3>
        <p class="list__item-description">{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">

.advantages {
  margin-block-end: 5.2vi;
  
  @media (width < 768px) {
    margin-block-end: 60px;
  }
}

.list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: min(35px, 1.7vi);
  justify-content: space-between;

  &__item {
    list-style: none; 
    
    &-title {
      font-size: min(28px, 1.46vi);
      display: inline-flex;
      vertical-align: middle;
      font-weight: 700;
      line-height: 1;
      color: var(--color-accent-primary);
      text-transform: uppercase;
      margin-block-end: min(10px, 0.5vi);


      &::before {
        content: '';
        display: inline-block;
        inline-size: min(20px, 1.05vi);
        block-size: auto;
        aspect-ratio: 1 / 1;
        background-image: url('@/assets/icons/list-marker.svg');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        margin-inline-end: min(13px, 0.68vi);
      }
    }

    &-description {
      font-size: min(20px, 1.05vi);
      font-weight: 400;
      line-height: calc(35/20);
      color: var(--color-text-primary);
    }
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;
    gap: 32px;

    &__item {
      &-title {
        font-size: 18px;
        margin-block-end: 16px;

        &::before {
          inline-size: 20px;
          margin-inline-end: 10px;

        }
      }

      &-description {
        font-size: 16px;
      }
    }
  }
}
</style>