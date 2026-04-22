<script setup lang="ts">

</script>

<template>
  <section class="request container">
    <div class="header">
      <h2 class="header__title">
        <span class="header__title-highlight">Готовы создать </span>
        свой идеальный дом?
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
          <input class="form__content-item-input" type="text" id="name" name="name" placeholder="Имя" />
        </div>
        <div class="form__content-item">
          <label class="form__content-item-label" for="phone"></label>
          <input class="form__content-item-input" type="tel" id="phone" name="phone" placeholder="+7 ( ___ ) ___ - __ - __" />
        </div>
        <button class="form__content-button" type="submit">Отправить заявку</button>
        <p class="form__content-description">
          Нажимая кнопку “Отправить заявку”, вы соглашаетесь с 
          <a class="form__content-description-link" href="#">политикой конфиденциальности</a>
        </p>
      </form>
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
  grid-template-columns: 13fr 15fr;
  grid-template-rows: auto auto;
  column-gap: 34px;
  margin-block-end: 6.7vi;

  @media (width < 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 42px;
    margin-block-end: 0;
  }
}

.header {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  margin-block-end: min(45px, 2.34vi);

  &__title {
    font-size: min(62px, 3.23vi);
    line-height: calc(80 / 62);
    font-weight: 400;
    text-transform: uppercase;
    margin-block-end: min(35px, 1.67vi);
    inline-size: 90%;
    text-wrap-style: pretty;

    
    &-highlight {
      font-weight: 600;
      color: var(--color-accent-primary);
    }
  }

  &__description {
    font-size: min(20px, 1.04vi);
    font-weight: 400;
    line-height: calc(35 / 20);
    color: var(--color-text-primary);
    margin-block-start: 0.83vi;

    &-container {
      display: flex;
      align-items: baseline;
      gap: min(10px, 0.5vi);
    }

    &-icon {
      position: relative;
      inset-block-start: min(4px, 0.2vi);
      flex-shrink: 0;
      inline-size: min(47px, 2.45vi);
      block-size: auto;
      aspect-ratio: 47 / 22;
    }
  }

  @media (width < 768px) {
    grid-column: 1 / -1;
    grid-row: 2 / 3;

    margin-block-end: 0;

    &__title {
      font-size: 32px;
      margin-block-end: 16px;
      inline-size: 100%;
    }
    
    
    &__description {
      font-size: 16px;
      gap: 16px;
      inline-size: 100%;

      &-container {
        flex-direction: column;
        align-items: center;
        gap: 16px;
      }

      &-icon {
        inline-size: 50px;
        block-size: auto;
        aspect-ratio: 30 / 16;
      }
    }
  }
}

.image {
  grid-column: 2 / 3;
  grid-row: 1 / -1;

  &__img {
    border-radius: 16px;
    block-size: 100%;
    inline-size: 100%;
    aspect-ratio: 87 / 101;
    object-fit: cover;
  }

  @media (width < 768px) {
    grid-column: 1 / -1;
    grid-row: 1 / 2;

    &__img {
      aspect-ratio: 1 / 1;
    }
  }
}

.form {
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  background-color: var(--color-background-secondary);
  padding: min(40px, 2.1vi);
  border-radius: min(16px, 0.8vi);
  border: 1px solid var(--color-border-primary);
  container-type: inline-size;

  &__title {
    text-align: center;
    text-transform: uppercase;
    font-size: 4.8cqi;
    font-weight: 600;
    margin-block-end: 4.85cqi;
    color: var(--color-accent-primary);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 6cqi;

    
    &-item {
      display: flex;
      flex-direction: column;

      &-label {
        font-size: 3.5cqi;
      }
    
      &-input {
        font-size: 3.5cqi;
        padding: 1.6cqi;
        border: none;
        border-bottom: 0.26cqi solid var(--color-border-secondary);
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
    }
  
  
    &-button {
      inline-size: 100%;
      padding-block: 6.4cqi;
      background-image: var(--color-button-background-primary);
      font-size: 3.2cqi;
      border-radius: 2.62cqi;
      color: var(--color-button-text-primary);
      font-weight: 600;
      text-transform: uppercase;
      margin-block-end: -2.7cqi;
      line-height: 1;
    }
    
    &-description {
      font-size: 2.58cqi;
      line-height: calc(20 / 16);
      text-align: center;
      color: var(--color-text-secondary);

      &-link {
        color: var(--color-accent-primary);
        transition: color 0.3s ease;

        &:hover {
          color: var(--color-text-primary);
        }
      }
    }
  }

  @media (width < 768px) {
    grid-column: 1 / -1;
    grid-row: 3 / 4;
    padding: 16px;
    border-radius: 16px;

    &__title {
      font-size: 24px;
      margin-block-end: 40px;
    }

    &__content {
      gap: 32px;
      margin-block-end: 32px;

      &-item {
        &-label {
          font-size: 16px;
        }
        &-input {
          font-size: 16px;
          padding: 0 0 8px 0;
          border-bottom: 1px solid var(--color-border-secondary);
        }
      }
      &-button {
        padding-block: 32px;
        font-size: 16px;
        border-radius: 16px;
      }
      &-description {
        font-size: 14px;
      }
    }
  }
}

</style>