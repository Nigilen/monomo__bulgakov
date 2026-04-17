<script setup lang="ts">

</script>

<template>
  <section class="request container">
    <div class="header">
      <h2 class="header__title">
        <span class="header__title-highlight">Готовы создать </span>
        свой идеальный дом ?
      </h2>
      <div class="header__description-container">
        <Icon name="icons:diamonds3" class="header__description-icon" />
        <p class="header__description">
          Свяжитесь с нами любым удобным для вас способом или оставьте заявку на сайте для 
          <span class="header__title-highlight">БЕСПЛАТНОЙ КОНСУЛЬТАЦИИ</span>
        </p>
      </div>
    </div>
    <div class="form">
      <h3 class="form__title">Заполните форму</h3>
      <form class="form__content">
        <div class="form__content-item">
          <label class="form__content-item-label" for="name"></label>
          <input class="form__content-item-input" type="text" id="name" name="name" placeholder="ИВАНОВ ИВАН" />
        </div>
        <div class="form__content-item">
          <label class="form__content-item-label" for="phone"></label>
          <input class="form__content-item-input" type="tel" id="phone" name="phone" placeholder="+7( ___ ) ___ - __ - __" />
        </div>
        <button class="form__content-button" type="submit">Отправить заявку</button>
        <p class="form__content-description">
          Нажимая кнопку “Отправить заявку”, вы соглашаетесь 
          с 
          <a class="form__content-description-link" href="#">условиями</a> 
          использования персональных даныхи и 
          <a class="form__content-description-link" href="#">политикой конфиденциальности</a>
        </p>
      </form>
      <div class="socials">
        <h3 class="socials__title">
          <span class="socials__title-first">Быстро ответим в мессенджерах</span>
          <span class="socials__title-second">Ежедневно с 9:00 до 22:00</span>
        </h3>
        <ul class="socials__list">
          <li class="socials__item">
            <a class="socials__item-link" href="#">
              <Icon name="icons:whatsapp" class="socials__item-link-icon" />
            </a>
          </li>
          <li class="socials__item">
            <a class="socials__item-link" href="#">
              <Icon name="icons:telegram" class="socials__item-link-icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="image">
      <NuxtImg 
        src="/request.png" 
        alt="Request" 
        width="688"
        height="992"
        class="image__img"
      />
    </div>
    
  </section>
</template>

<style scoped lang="scss">

.request {
  display: grid;
  grid-template-columns: 1fr min(688px, 35.85vi);
  grid-template-rows: auto auto;
  column-gap: 34px;
}

.header {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-block-end: 45px;

  &__title {
    font-size: min(62px, 3.3vi);
    font-weight: 600;
    line-height: 1.4;
    text-transform: uppercase;
    margin-block-end: 35px;

    &-highlight {
      color: var(--color-accent-primary);
    }
  }

  &__description {
    font-size: min(24px, 1.3vi);
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-text-primary);
    &-container {
      display: flex;
      align-items: baseline;
      gap: 10px;
    }
    &-icon {
      position: relative;
      inset-block-start: 4px;
      flex-shrink: 0;
      inline-size: 47px;
      block-size: auto;
      aspect-ratio: 47 / 22;
    }
  }

  @media (width < 768px) {
    margin-block-end: 12vi;

    &__title {
      font-size: 8.5vi;
      letter-spacing: -0.035em;
    }
    &__description {
      font-size: 4.5vi;
    }
  }
}

.image {
  grid-column: 2 / 3;
  grid-row: 1 / -1;

  &__img {
    border-radius: 16px;
  }
}

.form {
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  background-color: var(--color-background-secondary);
  padding: 40px;
  border-radius: 16px;
  border: 1px solid var(--color-border-primary);

  &__title {
    text-align: center;
    text-transform: uppercase;
    font-size: 30px;
    font-weight: 600;
    margin-block-end: 33px;
    color: var(--color-accent-primary);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin-block-end: 26px;

    
      &-item {
        display: flex;
        flex-direction: column;
      }
    
      &-item-label {
        font-size: 16px;
      }
    
      &-item-input {
        font-size: 22px;
        padding: 10px;
        border: none;
        border-bottom: 2px solid var(--color-border-secondary);
        background-color: transparent;
        text-align: center;
        color: var(--color-text-primary);
        font-family: var(--font-primary);
        text-transform: uppercase;
        
        &::placeholder {
          color: var(--color-text-secondary);
          font-family: var(--font-primary);
        }

        &:focus {
          outline: none;
        }

        &:focus-visible {
          outline: none;
        }
      }
    
      &-button {
        inline-size: 100%;
        padding-block: 40px;
        background-image: var(--color-button-background-primary);
        font-size: 20px;
        border-radius: 16px;
        color: var(--color-button-text-primary);
        font-weight: 600;
        text-transform: uppercase;
        margin-block-end: -20px;
      }
      &-description {
        font-size: 16px;
        text-align: center;
        color: var(--color-text-secondary);
      }
      &-description-link {
        color: var(--color-accent-primary);
      }
  }
}

.socials {

  &__title {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    margin-block-end: 10px;

    &-first {
      color: var(--color-text-primary);
    }
    &-second {
      color: var(--color-text-secondary);
    }
  }

  &__list {
    display: flex;
    justify-content: center;
    gap: 20px;
  }

  &__item {
    display: flex;
  }

  &__item-link {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__item-link-icon {
    inline-size: 30px;
    block-size: 30px;
  }
}
</style>