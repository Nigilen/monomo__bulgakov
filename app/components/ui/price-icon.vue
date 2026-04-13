<script setup lang="ts">

withDefaults(defineProps<{
  bottomFill?: string
  bottomStroke?: string
  leftFill?: string
  leftStroke?: string
  topFill?: string
  topStroke?: string
  rightFill?: string
  rightStroke?: string
  width?: number | string
  height?: number | string
}>(), {
  bottomFill: 'var(--color-accent-primary)',
  bottomStroke: 'var(--color-accent-primary)',
  leftFill: 'var(--color-accent-primary)',
  leftStroke: 'var(--color-accent-primary)',
  topFill: 'none',
  topStroke: 'var(--color-accent-secondary)',
  rightFill: 'none',
  rightStroke: 'var(--color-accent-secondary)',
  width: 115,
  height: 115,
});

</script>

<template>
  <svg
    class="price-icon"
    :width="width"
    :height="height"
    viewBox="0 0 115 115"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M81.7395 87.8019L57.1055 112.437L32.4715 87.8019L57.1055 63.1663L81.7395 87.8019Z"
      :fill="bottomFill"
      :stroke="bottomStroke"
      stroke-width="2.5"
    />
    <rect
      x="-1.49012e-07"
      y="1.76783"
      width="34.8391"
      height="34.8391"
      transform="matrix(0.70708 0.707133 -0.70708 0.707133 27.6523 31.2131)"
      :fill="leftFill"
      :stroke="leftStroke"
      stroke-width="2.5"
    />
    <rect
      x="-1.49012e-07"
      y="1.76783"
      width="34.8391"
      height="34.8391"
      transform="matrix(0.70708 0.707133 -0.70708 0.707133 58.3555 0.517745)"
      :fill="topFill"
      :stroke="topStroke"
      stroke-width="2.5"
    />
    <rect
      x="-1.49012e-07"
      y="1.76783"
      width="34.8391"
      height="34.8391"
      transform="matrix(0.70708 0.707133 -0.70708 0.707133 89.0547 31.2131)"
      :fill="rightFill"
      :stroke="rightStroke"
      stroke-width="2.5"
    />
  </svg>
</template>

<style scoped lang="scss">

.price-icon {
  display: block;
}

</style>
