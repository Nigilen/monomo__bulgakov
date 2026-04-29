<script setup lang="ts">

const { open: openPolicyModal } = usePolicyModal()
const { open: openThankModal } = useThankModal()
const { display: phoneDisplay, onPhoneInput, onPhoneKeydown, digits: phoneDigits, reset: resetPhone } = useRuPhoneField()

const name = ref('')
const errors = reactive({ name: false, phone: false })
const submitAttempt = ref(false)
const loading = ref(false)
const success = ref(false)
const serverError = ref('')
const honeypot = ref('')
const formLoadTime = ref(Date.now())

function syncErrors() {
  const phoneNorm = phoneDigits()
  errors.name = !isValidName(name.value)
  errors.phone = !isCompleteRuPhone(phoneNorm)
}

function onNameInput() {
  if (submitAttempt.value) {
    errors.name = !isValidName(name.value)
  }
}

function onPhoneInputWrapped(e: Event) {
  onPhoneInput(e)
  if (submitAttempt.value) {
    errors.phone = !isCompleteRuPhone(phoneDigits())
  }
}

async function onSubmit(e: Event) {
  e.preventDefault()
  submitAttempt.value = true
  syncErrors()
  if (errors.name || errors.phone) {
    return
  }
  loading.value = true
  serverError.value = ''
  const timeElapsed = Date.now() - formLoadTime.value

  try {
    await $fetch('/api/submit', {
      method: 'POST',
      body: {
        name: name.value,
        phone: phoneDigits(),
        formSource: 'section_request',
        honeypot: honeypot.value,
        timeElapsed,
      },
    })

    success.value = true
    openThankModal()
    name.value = ''
    resetPhone()
    honeypot.value = ''
    submitAttempt.value = false
    formLoadTime.value = Date.now()
  } catch (e: any) {
    serverError.value = e.data?.message || 'Произошла ошибка при отправке'
  } finally {
    loading.value = false
  }
}

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
      <form class="form__content" @submit="onSubmit">
        <div class="form__content-item" :class="{ 'form__content-item--error': errors.name }">
          <input
            v-model="name"
            class="form__content-item-input"
            name="name"
            placeholder="Имя"
            type="text"
            autocomplete="name"
            maxlength="50"
            @input="onNameInput"
          />
          <p v-if="errors.name" class="field-error">Заполните данные</p>
        </div>
        <div class="form__content-item" :class="{ 'form__content-item--error': errors.phone }">
          <input
            :value="phoneDisplay"
            class="form__content-item-input"
            name="phone"
            placeholder="+7 ( ___ ) ___ - __ - __"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            @keydown="onPhoneKeydown"
            @input="onPhoneInputWrapped"
          />
          <p v-if="errors.phone" class="field-error">Заполните данные</p>
        </div>
        <button
          class="form__content-button"
          type="submit"
          :class="{ 'form-submit-state-pending': loading || success }"
          :disabled="loading || success"
          :aria-busy="loading"
        >
          <UiEllipsisLoader v-if="loading" />
          <span v-else-if="success">Готово</span>
          <span v-else>Отправить заявку</span>
        </button>
        <input
          v-model="honeypot"
          type="text"
          name="website"
          class="hidden-field"
          tabindex="-1"
          autocomplete="off"
        >
        <p v-if="serverError" class="field-error field-error--server">{{ serverError }}</p>
        <p class="form__content-description">
          Нажимая кнопку “Отправить заявку”, вы соглашаетесь с
          <button class="form__content-description-link" type="button" @click="openPolicyModal">
            политикой конфиденциальности
          </button>
        </p>
      </form>
    </div>
    <div class="image">
      <img 
        src="/images/request.avif" 
        alt="Request" 
        width="688" 
        height="992" 
        class="image__img" 
        decoding="async"
      />
    </div>

  </section>
</template>

<style scoped lang="scss">
.hidden-field {
  position: absolute;
  inset-inline-start: -9999px;
  opacity: 0;
  block-size: 0;
  inline-size: 0;
}

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
      position: relative;

      &--error &-input {
        border-bottom-color: #FF3434;
      }

      &-input {
        font-family: var(--font-primary);
        font-size: 3.5cqi;
        padding: 1.6cqi;
        border: none;
        border-bottom: 0.26cqi solid var(--color-border-secondary);
        background-color: transparent;
        text-align: center;
        color: var(--color-text-primary);
        font-family: var(--font-primary);

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
      transition-property: transform, box-shadow, filter;
      transition-duration: 460ms;
      transition-timing-function: ease;
    }

    @media (hover: hover) and (width >= 768px) {
      &-button:not(:disabled):hover {
        transform: translateY(-4px);
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.28);
        filter: brightness(1.08);
      }
    }

    &-description {
      font-size: 2.58cqi;
      line-height: calc(20 / 16);
      text-align: center;
      color: var(--color-text-secondary);

      &-link {
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

      &--server {
        position: static;
        margin-block-start: 4px;
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