<script setup lang="ts">

const emit = defineEmits<{
  (e: 'close'): void
}>()

const areaMin = 20
const areaMax = 250
const area = ref(areaMin)
const areaProgress = computed(() => (area.value - areaMin) / (areaMax - areaMin))
const housingType = ref<string | null>(null)

const { open: openPolicyModal } = usePolicyModal()
const { open: openThankModal } = useThankModal()
const { display: phoneDisplay, onPhoneInput, onPhoneKeydown, digits: phoneDigits, reset: resetPhone } = useRuPhoneField()

const name = ref('')
const message = ref('')
const errors = reactive({ housing: false, name: false, phone: false, message: false })
const submitAttempt = ref(false)
const loading = ref(false)
const success = ref(false)
const serverError = ref('')
const honeypot = ref('')
const formLoadTime = ref(Date.now())

function syncErrors() {
  errors.housing = housingType.value === null
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

function onDirtySync() {
  if (submitAttempt.value) {
    syncErrors()
  }
}

function onHousingInput() {
  if (submitAttempt.value) {
    errors.housing = housingType.value === null
  }
}

async function onSubmit(e: Event) {
  e.preventDefault()
  submitAttempt.value = true
  syncErrors()
  if (errors.housing || errors.name || errors.phone || errors.message) {
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
        message: message.value,
        formSource: 'modal_calculator',
        housingType: housingType.value ?? undefined,
        area: area.value,
        honeypot: honeypot.value,
        timeElapsed,
      },
    })

    success.value = true
    openThankModal()
    emit('close')
    housingType.value = null
    area.value = areaMin
    name.value = ''
    resetPhone()
    message.value = ''
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
          <span class="header__title-highlight">расчет</span>
        </h2>
        <p class="header__description">Оставьте свои контактные данные ниже. Мы свяжемся с вами в ближайшее время</p>
      </header>

      <form class="form" @submit="onSubmit">

        <fieldset class="radio-group" :class="{ 'radio-group--error': errors.housing }">
          <legend class="radio-group__title">Тип жилья</legend>
          <div class="radio-group__list">
            <label class="radio-group__item">
              <span class="radio-group__icon"></span>
              <input
                v-model="housingType"
                class="radio-group__input"
                type="radio"
                name="housing-calculator-modal"
                value="1"
                @change="onHousingInput"
              />
              <span class="radio-group__label">Новостройка</span>
            </label>
            <label class="radio-group__item">
              <span class="radio-group__icon"></span>
              <input
                v-model="housingType"
                class="radio-group__input"
                type="radio"
                name="housing-calculator-modal"
                value="2"
                @change="onHousingInput"
              />
              <span class="radio-group__label">Вторичка</span>
            </label>
          </div>
        </fieldset>
        <p v-if="errors.housing" class="field-error field-error--radio">Заполните данные</p>

        <div class="form__item form__item--area">
          <label class="form__legend form__legend--area" for="modal-calculator-area">Площадь помещения</label>
          <div class="form__input-wrapper">
            <div class="form__value form__value--area" :style="{ '--area-progress': areaProgress }">{{ area }} м²</div>
            <input
              id="modal-calculator-area"
              class="form__input form__input--area"
              type="range"
              name="modal-calculator-area"
              v-model.number="area"
              :min="areaMin"
              :max="areaMax"
            />
          </div>
        </div>

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
        <div class="field-wrap" :class="{ 'field-wrap--error': errors.message }">
          <textarea
            v-model="message"
            class="form__textarea"
            name="message"
            placeholder="Сообщение"
            rows="3"
            maxlength="1000"
            @input="onDirtySync"
          />
          <p v-if="errors.message" class="field-error">Заполните данные</p>
        </div>
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
        <p class="footer__text">Нажимая кнопку “Отправить”, вы соглашаетесь
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

  &--error {
    .form__input:not(.form__input--area) {
      border-bottom-color: #FF3434;
    }

    .form__textarea {
      border-color: #FF3434;
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

  &--radio {
    position: static;
    inline-size: auto;
    margin-block-start: -4px;
    margin-block-end: 4px;
  }

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
  gap: clamp(20px, 7.5cqi, 30px);
  inline-size: 100%;

  &__item {
    &--area {
      display: flex;
      flex-direction: column;
      gap: 2.42cqi;
      border: none;
      inline-size: 100%;
    }
    


  }

  &__legend {
    &--area {
      font-size: clamp(16px, 4.2cqi, 20px);
      font-weight: 500;
      line-height: 1;
      color: var(--color-text-secondary);
      margin-block-end: 6cqi;
    }
  }

  &__input-wrapper {
    position: relative;
  }

  &__value {
    &--area {
      white-space: nowrap;
      position: absolute;
      inset-block-start: -4cqi;
      inset-inline-start: 0;
      text-align: center;
      inset-inline-start: calc((var(--area-progress) * (100% - 3.5cqi)) + 1.75cqi);
      transform: translateX(-50%);
      font-size: 3.65cqi;
      font-weight: 400;
      line-height: 1;
      color: var(--color-text-primary);
    }
  }

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

    &--area {
      appearance: none;
      padding: 0;
      background-color: var(--color-text-secondary);
      border-bottom: none;
      box-shadow: none;
      line-height: 1;
      text-align: start;
      inline-size: 100%;
      block-size: 4px;
    }

    &--area::-webkit-slider-thumb {
      appearance: none;
      background-color: var(--color-background-secondary);
      border: 0.6cqi solid var(--color-border-secondary);
      border-radius: 50%;
      inline-size: 5.5cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;
      cursor: pointer;
    }

    &--area::-moz-range-thumb {
      appearance: none;
      background-color: var(--color-background-secondary);
      border: 0.6cqi solid var(--color-border-secondary);
      border-radius: 50%;
      inline-size: 5.5cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;
      cursor: pointer;
    }

    &--area::-ms-thumb {
      appearance: none;
      background-color: var(--color-background-secondary);
      border: 0.6cqi solid var(--color-border-secondary);
      border-radius: 50%;
      inline-size: 5.5cqi;
      block-size: auto;
      aspect-ratio: 1 / 1;
      cursor: pointer;
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
    resize: none;

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

      &--area {
        inline-size: 100%;
      }

      &--area::-webkit-slider-thumb {
        inline-size: 20px;
        border-width: 2px;
      }

      &--area::-moz-range-thumb {
        inline-size: 20px;
        border-width: 2px;
      }

      &--area::-ms-thumb {
        inline-size: 20px;
        border-width: 2px;
      }
    }

    &__legend {
      &--area {
        margin-block-end: 56px;
        font-size: 16px;
      }
    }

    &__value {
      &--area {
        font-size: 16px;
        inset-block-start: -20px;
        inset-inline-start: calc((var(--area-progress) * (100% - 20px)) + 10px);
        transform: translateX(-50%);
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

.radio-group {
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  inline-size: 100%;

  &--error .radio-group__list {
    outline: 2px solid #FF3434;
    outline-offset: 8px;
    border-radius: 12px;
  }

  &__title {
    margin-block-end: 10px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1.6em;
    color: var(--color-text-secondary);
    font-size: clamp(16px, 4.2cqi, 20px);
  }

  &__list {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    font-size: clamp(16px, 4.2cqi, 20px);

    &:has(.radio-group__input:checked) {
      .radio-group__icon::before {
        background-color: var(--color-accent-primary);
      }
    }
  }

  &__icon {
    position: relative;
    display: flex;
    inline-size: 3.24cqi;
    block-size: auto;
    aspect-ratio: 1 / 1;
    background-color: transparent;
    border: 1px solid var(--color-text-secondary);
    border-radius: var(--border-radius-primary);

    &::before {
      display: flex;
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      inline-size: 70%;
      block-size: auto;
      aspect-ratio: 1 / 1;
      background-color: transparent;
      border-radius: var(--border-radius-primary);
    }
  }

  &__input {
    display: none;
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