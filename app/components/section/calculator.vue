<script setup lang="ts">

</script>

<template>
  <section class="calculator">
    <div class="calculator__content">
      <h2 class="calculator__title">
        Рассчитать 
        <span class="calculator__title-highlight">стоимость</span>
      </h2>
      <p class="calculator__description">
        Рассчитайте примерную стоимость ремонта с учетом материалов в калькуляторе или отправьте заявку на точный расчет с учетом всех ваших пожеланий.
      </p>
      <button class="calculator__button" type="button">
        Рассчитать стоимость
      </button>
    </div>
    <div class="calculator__form">
      <form class="calculator__form-content">
        <div class="calculator__form-item">
          <label class="calculator__form-label" for="area">Выберите тариф</label>
          <input type="radio" name="" id="">
        </div>
        <div class="calculator__form-item">
          <label class="calculator__form-label" for="area">Площадь помещения</label>
          <input class="calculator__form-input" type="range" name="" id="">
        </div>
        <div>
          <label class="calculator__form-label" for="area">Тип жилья</label>
          <input class="calculator__form-input" type="radio" name="" id="">
        </div>
        <p class="calculator__form-price">
          <span class="calculator__form-price-title">Примерная стоимость</span>
          <span class="calculator__form-price-value">100 000 руб</span>
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">

</style>