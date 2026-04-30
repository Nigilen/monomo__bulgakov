<script setup lang="ts">

</script>

<template>
  <section id="about" class="about container">
    <div class="header">
      <h2 class="header__title">
        Рассказываем 
        <span class="header__title-highlight">о себе и своих ценностях</span>
      </h2>
      <p class="header__description">
        «Я строю не объекты, а репутацию.»
      </p>
    </div>
    <div class="content">
      <img 
        class="content__image" 
        src="/images/about-img.avif" 
        alt="About Image" 
        width="568"
        height="865"
        decoding="async"
      />
      <div class="content__text">
        <h3 class="content__title">
          Булгаков Владимир Игоревич, 
          <span class="content__title-highlight">основатель компании «Булгаков прайм. Архитектура комфорта»</span>
        </h3>
        <p class="content__description">
          <span class="content__description-column">Когда я открывал это дело, я решил: мы никогда не станем «ремонтным заводом». В премиальном сегменте не бывает мелочей, а качество невозможно делегировать на 100%. Именно поэтому я лично участвую в каждом проекте во взаимодействии своего доверительного лица компании, моего заместителя по строительно – ремонтным работам, а также контролю качества и в приемки сдачи объекта.</span>
          <span class="content__description-column">Я знаю каждого своего мастера, я помню особенности планировки вашего дома и я всегда на связи с вами. Моя задача — чтобы процесс ремонта приносил вам не стресс, а удовольствие от наблюдения за тем, как рождается ваш идеальный интерьер.</span>
        </p>
      </div>
      <blockquote class="content__blockquote">
        <p class="content__blockquote-text">
          Мы берем в работу ограниченное число проектов, чтобы я мог гарантировать: ваш дом будет построен так, как я построил бы его для своей семьи.
        </p>
        <footer class="content__blockquote-author">
          Булгаков  В. И.
        </footer>
      </blockquote>
    </div>
  </section>
</template>

<style scoped lang="scss">


.about {
  margin-block-end: 5.2vi;

  @media (width < 768px) {
    margin-block-end: 100px;
  }
}

.header {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1vi;
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

  &__description {
    font-size: min(20px, 1vi);
    font-weight: 400;
    line-height: calc(35/20);
    font-style: italic;
    color: var(--color-text-secondary);
    justify-self: flex-end;
    margin-block-start: 0.83vi;
  }

  @media (width < 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-block-end: 45px;

    &__title {
      font-size: 32px;
      letter-spacing: -0.035em;

    }

    &__description {
      font-size: 16px;
      justify-self: flex-start;

    }
  }
}

.content {
  display: grid;
  grid-template-columns: min(568px, 29.6vi) 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.7vi;

  &__image {
    border-radius: 0.85cqi;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
  }

  &__text {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: flex;
    flex-direction: column;
    gap: 1.6vi;
  }

  &__title {
    font-size: min(42px, 2.2vi);
    font-weight: 700;
    line-height: 1.4;
    text-transform: uppercase;

    &-highlight {
      color: var(--color-accent-primary);
      font-weight: 600;
    }
  }

  &__description {
    display: flex;
    gap: min(27px, 1.4vi);

    font-size: min(20px, 1vi);
    font-weight: 400;
    line-height: calc(35/20);
    color: var(--color-text-primary);

    &-column {
      flex-grow: 1;
      flex-basis: 0;
      flex-shrink: 0;
    }
  }

  &__blockquote {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    position: relative;

    &-text {
      position: relative;
      font-size: min(28px, 1.5vi);
      font-weight: 400;
      line-height: calc(50/28);
      color: var(--color-text-secondary);
      font-style: italic;
      padding-block: min(38px, 2vi);

      &::before {
        content: '';
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        inline-size: 48%;
        block-size: 1px;
        background-color: var(--color-accent-primary);
      }
      &::after {
        content: '';
        position: absolute;
        inset-block-end: 0;
        inset-inline-start: 0;
        inline-size: 48%;
        block-size: 1px;
        background-color: var(--color-accent-primary);
      }
    }

    &-author {
      font-family: 'Savoye', serif;
      font-size: min(76px, 4vi);
      font-weight: 400;
      line-height: 1;
      color: var(--color-accent-primary);
      font-style: italic;
      
      position: absolute;
      inset-block-end: 0.5vi;
      inset-inline-end: 2vi;
    }
  }


  @media (width < 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    column-gap: 0;
    row-gap: 42px;

    &__image {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      border-radius: 16px;
      aspect-ratio: 1 / 1;
      object-fit: cover;
    }

    &__text {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      gap: 32px;
    }

    &__title {
      font-size: 18px;
    }

    &__description {
      font-size: 16px;
      flex-direction: column;
      gap: 16px;
      font-size: 16px;

    }

    &__blockquote {
      grid-column: 1 / 2;
      grid-row: 3 / 4;

      &-text {
        font-size: 16px;
        padding-block: 26px;

      }
  
      &-author {
        font-size: 40px;    
        inset-block-end: -26px;
        inset-inline-end: 16px;
      }
    }

  } 
}

</style>