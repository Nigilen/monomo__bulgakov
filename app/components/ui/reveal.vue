<script setup lang="ts">

const props = withDefaults(defineProps<{
  rootMargin?: string
  threshold?: number
}>(), {
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.12,
})

const rootEl = ref<HTMLElement | null>(null)
const isVisible = ref(false)

let observer: IntersectionObserver | null = null

function onIntersect(entries: IntersectionObserverEntry[]) {
  const entry = entries[0]
  if (!entry?.isIntersecting) {
    return
  }
  isVisible.value = true
  observer?.disconnect()
  observer = null
}

onMounted(() => {
  if (!rootEl.value) {
    return
  }
  observer = new IntersectionObserver(onIntersect, {
    root: null,
    rootMargin: props.rootMargin,
    threshold: props.threshold,
  })
  observer.observe(rootEl.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})

</script>

<template>
  <div
    ref="rootEl"
    class="reveal"
    :class="{ 'reveal--visible': isVisible }"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition-property: opacity, transform;
  transition-duration: 4500ms;
  transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}

.reveal--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: translateY(0);
    transition-property: none;
  }
}

</style>
