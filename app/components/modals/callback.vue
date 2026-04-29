<script setup lang="ts">

const emit = defineEmits<{
  (e: 'close'): void
}>()

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
  errors.name = !isValidName(name.value)
  errors.phone = !isCompleteRuPhone(phoneDigits())
}

function onPhoneInputWrapped(e: Event) {
  onPhoneInput(e)
  if (submitAttempt.value) {
    errors.phone = !isCompleteRuPhone(phoneDigits())
  }
}

function onDirtySync() {
  if (submitAttempt.value) {
    syncErrors()
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
        formSource: 'modal_callback',
        honeypot: honeypot.value,
        timeElapsed,
      },
    })

    success.value = true
    openThankModal()
    emit('close')
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
  <UiModal @close="emit('close')">
    <div class="content">
      <header class="header">
        <h2 class="header__title">
          Заказать
          <span class="header__title-highlight">звонок</span>
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
            @keydown="onPhoneKeydown"
            @input="onPhoneInputWrapped"
          />
          <p v-if="errors.phone" class="field-error">Заполните данные</p>
        </div>
        <button class="form__button" type="submit" :disabled="loading || success">
          <span v-if="loading">Отправка...</span>
          <span v-else-if="success">✅ Заявка отправлена!</span>
          <span v-else>Позвоните мне</span>
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
      </form>

      <footer class="footer">
        <p class="footer__text">Нажимая кнопку “Позвоните мне”, вы соглашаетесь
          с <button class="footer__link" type="button" @click="openPolicyModal">политикой конфиденциальности</button>
        </p>
      </footer>
    </div>
  </UiModal>
</template>

<style scoped lang="scss">
.hidden-field {
  position: absolute;
  inset-inline-start: -9999px;
  opacity: 0;
  block-size: 0;
  inline-size: 0;
}

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

  &--server {
    position: static;
    margin-block-start: 4px;
  }
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
