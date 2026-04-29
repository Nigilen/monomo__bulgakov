<script setup lang="ts">
import { isCompleteRuPhone } from '~/utils/phoneRu'

declare global {
  interface Window {
    turnstile: any
  }
}

const { open: openPolicyModal } = usePolicyModal()
const { open: openThankModal } = useThankModal()
const {
  display: phoneDisplay,
  onPhoneInput,
  onPhoneKeydown,
  digits: phoneDigits,
  reset: resetPhone
} = useRuPhoneField()

const form = reactive({
  name: '',
});

const errors = reactive({
  name: '',
  phone: '',
  turnstile: '',
});


const loading = ref(false);
const success = ref(false);
const serverError = ref('');


function validateLocal(): boolean {
  let isValid = true
  errors.name = ''
  errors.phone = ''

  if (form.name.trim().length < 2) {
    errors.name = 'Введите корректное имя'
    isValid = false
  }
  
  if (!isCompleteRuPhone(phoneDigits())) {
    errors.phone = 'Введите корректный телефон'
    isValid = false
  }

  return isValid
}

const onPhoneInputWrapped = (event: Event) => {
  errors.phone = ''
  onPhoneInput(event)
}

// 🕳️ Honeypot и ⏱️ Таймер
const honeypot = ref('')
const formLoadTime = ref(Date.now())

async function submitForm() {
  // Сначала проверяем локально
  if (!validateLocal()) return
  
  loading.value = true
  serverError.value = ''

  // ⏱️ Считаем, сколько времени прошло с загрузки формы
  const timeElapsed = Date.now() - formLoadTime.value

  try {
    // Отправляем данные на НАШ серверный маршрут (который мы создали в Шаге 3)
    await $fetch('/api/submit', {
      method: 'POST',
      body: {
        name: form.name,
        phone: phoneDigits(),
        formSource: 'section_cta',
        honeypot: honeypot.value,
        timeElapsed: timeElapsed
      }
    })

    // Если сервер ответил "ОК"
    success.value = true
    form.name = ''
    resetPhone()
    honeypot.value = ''
    formLoadTime.value = Date.now()
    openThankModal();
    

  } catch (e: any) {
    // Если сервер вернул ошибку
    serverError.value = e.data?.message || 'Произошла ошибка при отправке'
  } finally {
    loading.value = false
  }
}

onMounted(() => {

  formLoadTime.value = Date.now() // Фиксируем момент появления формы

})


</script>

<template>
  <section class="cta container">
    <div class="cta__images-group images-group">
      <img 
        class="images-group__image images-group__image--first" 
        src="/images/cta-img-01.avif" 
        alt="CTA Image" 
        width="355"
        height="380"
        decoding="async"
      />
      <img 
        class="images-group__image images-group__image--second" 
        src="/images/cta-img-02.avif" 
        alt="CTA Image" 
        width="355"
        height="380"
        decoding="async"
      />
      <img 
        class="images-group__image images-group__image--third" 
        src="/images/cta-img-03.avif" 
        alt="CTA Image" 
        width="455"
        height="777"
        decoding="async"
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

      <form class="form" @submit.prevent="submitForm">
        <div class="form__inputs">

          <div class="form__field" :class="{ 'form__field--error': errors.name }">
            <input
              v-model="form.name"
              class="form__input"
              name="name"
              placeholder="Имя"
              type="text"
              maxlength="50"
              @input="errors.name = ''"
            />
            <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
          </div>
          <div class="form__field" :class="{ 'form__field--error': errors.phone }">
            <input
              :value="phoneDisplay"
              class="form__input"
              name="phone"
              placeholder="+7 ( ___ ) ___ - __ - __"
              type="tel"
              inputmode="tel"
              autocomplete="tel"
              @keydown="onPhoneKeydown"
              @input="onPhoneInputWrapped"
            />
            <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
          </div>
        </div>

            <!-- Место для виджета Cloudflare -->
        
        <button
          class="form__button"
          type="submit"
          :class="{ 'form-submit-state-pending': loading || success }"
          :disabled="loading || success"
          :aria-busy="loading"
        >
          <UiEllipsisLoader v-if="loading" />
          <span v-else-if="success">Готово</span>
          <span v-else>Отправить заявку</span>
        </button>
        
        <p class="form__text">
          Нажимая кнопку “Отправить заявку”, вы соглашаетесь с
          <button class="form__link" type="button" @click="openPolicyModal">
            политикой конфиденциальности
          </button>
        </p>
        <!-- Общая ошибка от сервера -->
        <input 
          type="text" 
          name="website" 
          v-model="honeypot" 
          class="hidden-field" 
          tabindex="-1" 
          autocomplete="off" 
        />
        <p v-if="serverError" class="field-error server-error">{{ serverError }}</p>
      </form>

    </div>
  </section>
</template>

<style scoped lang="scss">
.hidden-field {
  position: absolute;
  left: -9999px;
  opacity: 0;
  height: 0;
  width: 0;
}
.cta {
  margin-block-end: 12vi;

  display: grid;
  grid-template-columns: 6fr 5fr;
  justify-content: space-between;
  column-gap: min(30px, 1.6vi);

  @media (width < 768px) {
    margin-block-end: 100px;

    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    row-gap: 100px;

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
  grid-template-columns: 12fr 15fr;
  grid-template-rows: repeat(2, 1fr);
  gap: min(20px, 1.1vi);

  &__image {
    border-radius: 16px;
    block-size: auto;
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
      block-size: 100%;
    }
  }

  @media (width < 768px) {
    &__image {

      &--first,
      &--second {
        block-size: auto;
      }
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
    font-weight: 400;
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
    gap: 28px;
    margin-block-end: 30px;

    &__title {
      font-size: 32px;
    }

    &__text {
      font-size: 16px;
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  margin-block: auto 0;

  &__inputs {
    display: flex;
    flex-direction: column;
    gap: 6.5cqi;
    margin-block-end: 9.8cqi;
  }

  &__field {
    display: flex;
    flex-direction: column;
    position: relative;

    &--error .form__input {
      border-bottom-color: #FF3434;
    }
  }

  .field-error {
    position: absolute;
    inset-block-start: calc(100% + 5px);
    inset-inline-start: 0;
    inline-size: 100%;
    margin: 0;
    font-size: 14px;
    color: #FF3434;
    text-align: center;
  }

  &__input {
    font-family: var(--font-primary);
    padding: 1.6cqi;
    background-color: transparent;
    box-shadow: none;
    border: none;
    border-bottom: 0.33cqi solid var(--color-accent-primary);
    color: var(--color-text-primary);
    font-size: 3.2cqi;
    font-weight: 400;
    line-height: 1.6em;
    text-align: center;

    &::placeholder {
      color: var(--color-text-secondary);
      font-size: 3.2cqi;
      font-weight: 400;
      line-height: 1.6em;
    }

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: none;
    }
  }

  &__button {
    border-radius: 0.8vi;
    background-image: var(--color-button-background-primary);
    color: var(--color-button-text-primary);
    text-transform: uppercase;
    inline-size: 100%;
    block-size: 16.3cqi;
    font-size: 3.2cqi;
    margin-block-end: 3.2cqi;
    font-weight: 600;
    transition-property: transform, box-shadow, filter;
    transition-duration: 460ms;
    transition-timing-function: ease;
  }

  @media (hover: hover) and (width >= 768px) {
    &__button:not(:disabled):hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
      filter: brightness(1.08);
    }
  }

  &__text {
    font-size: 2.6cqi;
    font-weight: 400;
    line-height: 1.6em;
    text-align: center;
    color: var(--color-text-secondary);
  }

  &__link {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
    text-decoration: underline;
    color: var(--color-accent-primary);
    transition: color 0.3s ease;

    &:hover {
      color: var(--color-text-primary);
    }
  }

  @media (width < 768px) {

    &__input {
      font-size: 16px;

      &::placeholder {
        font-size: 16px;
      }
    }

    &__text {
      font-size: 16px;
    }

    &__button {
      font-size: 16px;
      margin-block-end: 32px;
      block-size: 75px;
      border-radius: 16px;
    }

  }
}
</style>