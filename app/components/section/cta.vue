<script setup lang="ts">
</script>

<template>
  <section class="cta container">
    <div class="cta__images-group images-group">
      <NuxtImg 
        class="images-group__image images-group__image--first" 
        src="/cta-img-01.png" 
        alt="CTA Image" 
        width="355" 
        height="380" 
      />
      <NuxtImg 
        class="images-group__image images-group__image--second" 
        src="/cta-img-02.png" 
        alt="CTA Image" 
        width="355" 
        height="380" 
      />
      <NuxtImg 
        class="images-group__image images-group__image--third" 
        src="/cta-img-03.png" 
        alt="CTA Image" 
        width="455" 
        height="777" 
      />
    </div>
    <div class="cta__content content">
      <div class="header">
        <h2 class="header__title">
          Не знаете, 
          <span class="header__title-highlight">с чего начать</span>
          ремонт?
        </h2>
        <p class="header__text">
          <span>
            Предлагаем начать с 
            <span class="header__text-highlight">бесплатной консультации. </span>
          </span>
          <span>Оставьте заявку, мы ответим на все вопросы</span>
        </p>
      </div>
      <form action="" class="form">
        <div class="form__inputs">

          <label class="form__label" for="name">
            <input 
              class="form__input"
              type="text" 
              id="name" 
              placeholder="ИВАНОВ ИВАН" 
              name="name" 
              required
            />
          </label>
          <label class="form__label" for="phone">
            <input 
              class="form__input"
              type="tel" 
              id="phone" 
              placeholder="+7( ___ ) ___ - __ - __" 
              name="phone" 
              required
            />
          </label>
        </div>
        <button class="form__button" type="submit">Отправить заявку</button>
        <p class="form__text">
          Нажимая кнопку “Отправить заявку”, вы соглашаетесь с 
          <a href="#" class="form__link">условиями</a> 
          использования персональных даных и 
          <a href="#" class="form__link">политикой конфиденциальности</a>
        </p>
      </form>
      <div class="socials">
        <NuxtLink class="socials__link" to="#">
          <Icon name="icons:whatsapp" class="socials__icon" />
        </NuxtLink>
        <NuxtLink class="socials__link" to="#">
          <Icon name="icons:telegram" class="socials__icon" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">

.cta {
  display: grid;
  grid-template-columns: 6fr 5fr;
  justify-content: space-between;
  column-gap: min(30px, 1.6vi);

  @media (width < 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    row-gap: 8vi;

    .images-group {
      order: 2;
    }

    .content {
      order: 1;
    }
  }
}

.images-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: min(20px, 1.1vi);

  &__image {
    border-radius: 16px;
    block-size: 100%;
    object-fit: cover;

    &--first {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }

    &--second {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    &--third {
      grid-column: 2 / 3;
      grid-row: span 2;
    }
  }
}


.content {
  display: flex;
  flex-direction: column;
  padding: min(40px, 2.1vi);
  border-radius: 16px;
  border: 1px solid var(--color-border-primary);
  background-color: var(--color-background-secondary);
  container-type: inline-size;

  @media (width < 768px) {
    padding-block: 32px;
    padding-inline: 16px;
  }
}

.header {
  display: flex;
  flex-direction: column;
  gap: 5cqi;
  margin-block-end: 9cqi;

  &__title {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 8.5cqi;
    font-weight: 600;
    line-height: 1.34em;
    color: var(--color-text-primary);
    text-transform: uppercase;

    &-highlight {
      color: var(--color-accent-primary);
      font-weight: 600;
      text-transform: uppercase;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    font-size: 3.2cqi;  
    font-weight: 400;
    line-height: 1.6em;
    color: var(--color-text-primary);
    text-align: center;

    &-highlight {
      color: var(--color-accent-primary);
      font-weight: 600;
      text-transform: uppercase;
    }
  }

  @media (width < 768px) {
    gap: 7cqi;
    margin-block-end: 9.85cqi;

    &__title {
      font-size: 10cqi;
    }

    &__text {
      font-size: 4.92cqi;
    }
  }
}

.form {
  display: flex;
  flex-direction: column;

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 6.5cqi;
    margin-block-end: 9.8cqi;
  }

  &__label {
    display: flex;
    flex-direction: column;
  }

  &__input {
    padding: 1.6cqi;
    background-color: transparent;
    box-shadow: none;
    border: none;
    border-bottom: 0.33cqi solid var(--color-accent-primary);
    color: var(--color-text-primary);
    text-transform: uppercase;
    font-size: 3.2cqi;
    font-weight: 400;
    line-height: 1.6em;
    text-align: center;

    &::placeholder {
      color: var(--color-text-secondary);
      font-size: 3.2cqi;
      font-weight: 400;
      line-height: 1.6em;
      text-transform: uppercase;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: none;
    }
  }

  &__button {
    border-radius: 16px;
    background-image: var(--color-button-background-primary);
    color: var(--color-button-text-primary);
    text-transform: uppercase;
    inline-size: 100%;
    block-size: 16.3cqi;
    font-size: 3.2cqi;
    margin-block-end: 3.2cqi;
  }

  &__text {
    font-size: 2.6cqi;
    font-weight: 400;
    line-height: 1.6em;
    text-align: center;
    color: var(--color-text-secondary);
    margin-block-end: 6.2cqi;
  }

  &__link {
    color: var(--color-accent-primary);
  }

  @media (width < 768px) {

    &__input {
      font-size: 5.18cqi;

      &::placeholder {
        font-size: 5.18cqi;
      }
    }

    &__text {
      font-size: 4.5cqi;
      margin-block-end: 10cqi;
    }

    &__button {
      font-size: 4.92cqi;
      margin-block-end: 10cqi;
      block-size: 23.3cqi;
      border-radius: 16px;
    }

  }
}

.socials {
  display: flex;
  gap: 3.2cqi;
  justify-content: center;
  align-items: center;
  margin-block: auto 0;

  &__link {
    display: flex;
    justify-content: center;
    align-items: center;
    inline-size: 4.8cqi;
    block-size: 4.8cqi;
  }

  &__icon {
    inline-size: 100%;
    block-size: 100%;
  }
}

</style>