<script setup lang="ts">

</script>

<template>
  <section class="request">
    <div class="content">
      <div class="header">
        <h2 class="header__title">
          <span class="header__title-highlight">Готовы создать </span>
          свой идеальный дом ?
        </h2>
        <p class="header__description">
          Свяжитесь с нами любым удобным для вас способом или оставьте заявку на сайте для 
          <span class="header__title-highlight">БЕСПЛАТНОЙ КОНСУЛЬТАЦИИ</span>
        </p>
      </div>
      <div class="form">
        <h3 class="form__title">Заполните форму</h3>
        <form class="form__content">
          <div class="form__content-item">
            <label class="form__content-item-label" for="name">Имя</label>
            <input class="form__content-item-input" type="text" id="name" name="name" placeholder="Имя" />
          </div>
          <div class="form__content-item">
            <label class="form__content-item-label" for="phone">Телефон</label>
            <input class="form__content-item-input" type="tel" id="phone" name="phone" placeholder="Телефон" />
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
                <NuxtIcon name="icons:whatsapp" />
              </a>
            </li>
            <li class="socials__item">
              <a class="socials__item-link" href="#">
                <NuxtIcon name="icons:telegram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  </section>
</template>

<style scoped lang="scss"></style>