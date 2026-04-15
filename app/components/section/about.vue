<script setup lang="ts">

</script>

<template>
  <section class="about">
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
      <div class="content__image">
        <NuxtImg 
          class="content__image-img" 
          src="/images/about/about-image.jpg" 
          alt="About Image" 
          width="100"
          height="170"
        />
      </div>
      <div class="content__text">
        <div class="content__item">
          <h3 class="content__item-title">
            Булгаков Владимир Игоревич, 
            <span class="content__item-title-highlight">основатель компании «Булгаков прайм. Архитектура комфорта»</span>
          </h3>
          <p class="content__item-description">
            <span class="content__item-description-column">Когда я открывал это дело, я решил: мы никогда не станем «ремонтным заводом». В премиальном сегменте не бывает мелочей, а качество невозможно делегировать на 100%. Именно поэтому я лично участвую в каждом проекте во взаимодействии своего доверительного лица компании, моего заместителя по строительно – ремонтным работам, а также контролю качества и в приемки сдачи объекта.</span>
            <span class="content__item-description-column">Я знаю каждого своего мастера, я помню особенности планировки вашего дома и я всегда на связи с вами. Моя задача — чтобы процесс ремонта приносил вам не стресс, а удовольствие от наблюдения за тем, как рождается ваш идеальный интерьер.</span>
          </p>
          <blockquote class="content__item-blockquote">
            <span class="content__item-blockquote-text">
              Мы берем в работу ограниченное число проектов, чтобы я мог гарантировать: ваш дом будет построен так, как я построил бы его для своей семьи.
            </span>
            <span class="content__item-blockquote-author">
              Булгаков  В. И.
            </span>
          </blockquote>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped lang="scss">
</style>