<script setup lang="ts">

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { open: openPolicyModal } = usePolicyModal()
const { open: openThankModal } = useThankModal()
const { display: phoneDisplay, onPhoneInput, digits: phoneDigits, reset: resetPhone } = useRuPhoneField()

const name = ref('')
const message = ref('')
const errors = reactive({ name: false, phone: false, message: false })
const submitAttempt = ref(false)

function syncErrors() {
  errors.name = !isValidName(name.value)
  errors.phone = !isCompleteRuPhone(phoneDigits())
  errors.message = !isValidLeadMessage(message.value)
}

function onPhoneInputWrapped(e: Event) {
  onPhoneInput(e)
  if (submitAttempt.value) {
    errors.phone = !isCompleteRuPhone(phoneDigits())
  }
}

function onSubmit(e: Event) {
  e.preventDefault()
  submitAttempt.value = true
  syncErrors()
  if (errors.name || errors.phone || errors.message) {
    return
  }
  openThankModal()
  emit('close')
  name.value = ''
  resetPhone()
  message.value = ''
  submitAttempt.value = false
}

function onDirtySync() {
  if (submitAttempt.value) {
    syncErrors()
  }
}

</script>

<template>
  <UiModal @close="emit('close')">
    <div class="content">
      <header class="header">
        <h2 class="header__title">
          Отправить
          <span class="header__title-highlight">заявку</span>
        </h2>
        <p class="header__description">Оставьте свои контактные данные ниже. Мы свяжемся с вами в ближайшее время</p>
      </header>

      <form class="form" @submit="onSubmit">
        <div class="field-wrap" :class="{ 'field-wrap--error': errors.name }">
          <input
            v-model="name"
            class="form__input"
            name="name"
            placeholder="Имя"
            type="text"
            autocomplete="name"
            maxlength="50"
            @input="onDirtySync"
          />
          <p v-if="errors.name" class="field-error">Заполните данные</p>
        </div>
        <div class="field-wrap" :class="{ 'field-wrap--error': errors.phone }">
          <input
            :value="phoneDisplay"
            class="form__input"
            name="phone"
            placeholder="+7 ( ___ ) ___ - __ - __"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            @input="onPhoneInputWrapped"
          />
          <p v-if="errors.phone" class="field-error">Заполните данные</p>
        </div>
        <div class="field-wrap" :class="{ 'field-wrap--error': errors.message }">
          <textarea
            v-model="message"
            class="form__textarea"
            name="message"
            placeholder="Сообщение"
            rows="5"
            maxlength="1000"
            @input="onDirtySync"
          />
          <p v-if="errors.message" class="field-error">Заполните данные</p>
        </div>
        <button class="form__button" type="submit">Отправить заявку</button>
      </form>

      <footer class="footer">
        <p class="footer__text">Нажимая кнопку “Отправить”, вы соглашаетесь
          с <button class="footer__link" type="button" @click="openPolicyModal">политикой конфиденциальности</button>
        </p>
      </footer>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  container-type: inline-size;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5.1cqi;
  margin-block-end: 6.8cqi;

  &__title {
    font-size: 6.8cqi;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;

    &-highlight {
      font-weight: 600;
      color: var(--color-accent-primary);
    }
  }

  &__description {
    font-size: 3.9cqi;
    text-align: center;
  }
}

.field-wrap {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  inline-size: 100%;

  &--error {
    .form__input {
      border-bottom-color: #FF3434;
    }

    .form__textarea {
      border-color: #FF3434;
    }
  }
}

.field-error {
  margin: 0;
  margin-block-start: 6px;
  font-size: 14px;
  color: #FF3434;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(20px, 8.5cqi, 40px);
  inline-size: 100%;

  &__input {
    inline-size: 100%;
    font-family: var(--font-primary);
    padding: clamp(4px, 2cqi, 10px);
    background-color: transparent;
    box-shadow: none;
    border: none;
    border-bottom: 0.33cqi solid var(--color-accent-primary);
    color: var(--color-text-primary);
    font-size: clamp(16px, 4.2cqi, 20px);
    font-weight: 400;
    line-height: 1.6em;
    text-align: center;

    &::placeholder {
      color: var(--color-text-secondary);
      font-size: clamp(16px, 4.2cqi, 20px);
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

  &__textarea {
    font-family: var(--font-primary);
    inline-size: 100%;
    padding: clamp(4px, 2cqi, 10px);
    background-color: transparent;
    border: 0.33cqi solid var(--color-accent-primary);
    border-radius: 16px;
    color: var(--color-text-primary);
    font-size: clamp(16px, 4.2cqi, 20px);
    font-weight: 400;
    line-height: 1.6em;
    resize: vertical;
    min-block-size: 120px;

    &::placeholder {
      color: var(--color-text-secondary);
      font-size: clamp(16px, 4.2cqi, 20px);
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
    border-radius: 16px;
    background-image: var(--color-button-background-primary);
    color: var(--color-button-text-primary);
    text-transform: uppercase;
    inline-size: 100%;
    block-size: 22cqi;
    font-size: clamp(16px, 4.2cqi, 20px);
    margin-block-end: clamp(16px, 4.2cqi, 20px);
    font-weight: 600;
  }

  &__text {
    font-size: 2.6cqi;
    font-weight: 400;
    line-height: 1.6em;
    text-align: center;
    color: var(--color-text-secondary);
  }

  &__link {
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

.footer {
  text-align: center;
  font-size: 3cqi;
  color: var(--color-text-secondary);

  &__link {
    display: inline;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    cursor: pointer;
    text-decoration: underline;
    color: var(--color-accent-primary);
    transition: color 0.3s ease-in-out;

    &:hover {
      color: var(--color-text-primary);
    }
  }
}
</style>
