<script setup lang="ts">
const props = defineProps<{
  label: string;
  placeholder: string;
  type: string;
}>()

</script>

<template>
  <label class="field" :for="props.label">
    <input 
      class="field__input" 
      :id="props.label" 
      :name="props.label" 
      :placeholder="props.placeholder" 
      :type="props.type" 
    />
    <span v-if="props.label" class="field__label">{{ props.label }}</span>
  </label>
</template>

<style scoped lang="scss">

.field {

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

  // @media (width < 768px) {

  //   &__input {
  //     font-size: 16px;

  //     &::placeholder {
  //       font-size: 16px;
  //     }
  //   }

  // }
}
</style>