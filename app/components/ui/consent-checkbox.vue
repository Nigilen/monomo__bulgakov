<script setup lang="ts">
const model = defineModel<boolean>({ default: false })

defineProps<{
  error?: boolean
}>()

const emit = defineEmits<{
  (e: 'change'): void
}>()

const { open: openPolicyModal } = usePolicyModal()
const inputId = useId()

function onPolicyClick(event: MouseEvent) {
  event.preventDefault()
  event.stopPropagation()
  openPolicyModal()
}

function onChange() {
  emit('change')
}
</script>

<template>
  <div class="consent" :class="{ 'consent--error': error }">
    <label class="consent__label" :for="inputId">
      <input
        :id="inputId"
        v-model="model"
        class="consent__input"
        type="checkbox"
        name="consent"
        @change="onChange"
      />
      <span class="consent__box" aria-hidden="true" />
      <span class="consent__text">
        Согласен(на) на обработку персональных данных и ознакомлен(а) с
        <button class="consent__link" type="button" @click="onPolicyClick">
          Политикой обработки персональных данных
        </button>
      </span>
    </label>
    <p v-if="error" class="consent__error">Подтвердите согласие</p>
  </div>
</template>

<style scoped lang="scss">
.consent {
  inline-size: 100%;
  text-align: start;

  &--error {
    .consent__box {
      border-color: #FF3434;
    }
  }

  &__label {
    display: flex;
    align-items: flex-start;
    gap: 0.65em;
    cursor: pointer;
  }

  &__input {
    position: absolute;
    opacity: 0;
    inline-size: 1px;
    block-size: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;

    &:focus-visible + .consent__box {
      outline: 2px solid var(--color-accent-primary);
      outline-offset: 2px;
    }

    &:checked + .consent__box {
      background-color: var(--color-accent-primary);
      border-color: var(--color-accent-primary);

      &::after {
        opacity: 1;
      }
    }
  }

  &__box {
    position: relative;
    flex-shrink: 0;
    inline-size: 1.15em;
    block-size: 1.15em;
    margin-block-start: 0.15em;
    border: 1.5px solid var(--color-border-secondary);
    border-radius: 0.25em;
    background-color: transparent;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    &::after {
      content: '';
      position: absolute;
      inset-block-start: 45%;
      inset-inline-start: 50%;
      inline-size: 0.28em;
      block-size: 0.55em;
      border: solid var(--color-background-primary);
      border-width: 0 1.5px 1.5px 0;
      transform: translate(-50%, -55%) rotate(45deg);
      opacity: 0;
      transition: opacity 0.15s ease;
    }
  }

  &__text {
    font-size: clamp(12px, 2.85cqi, 14px);
    font-weight: 400;
    line-height: 1.45;
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

  &__error {
    margin-block-start: 0.45em;
    margin-inline-start: calc(1.15em + 0.65em);
    font-size: 14px;
    color: #FF3434;
  }
}
</style>
