<script setup lang="ts">

const props = defineProps<{
  slides: string[]
  title: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const currentIndex = ref(0)

const currentSlideSrc = computed(() => props.slides[currentIndex.value] ?? '')

const canGoPrev = computed(() => currentIndex.value > 0)

const canGoNext = computed(() => currentIndex.value < props.slides.length - 1)

const goPrev = () => {
  if (!canGoPrev.value) {
    return
  }
  currentIndex.value -= 1
}

const goNext = () => {
  if (!canGoNext.value) {
    return
  }
  currentIndex.value += 1
}

let swipeStartX = 0
let swipeTracking = false

const SWIPE_THRESHOLD_PX = 48

const onSwipePointerDown = (event: PointerEvent) => {
  if (event.pointerType === 'mouse' && event.button !== 0) {
    return
  }
  swipeTracking = true
  swipeStartX = event.clientX
  const target = event.currentTarget
  if (target instanceof HTMLElement && 'setPointerCapture' in target) {
    try {
      target.setPointerCapture(event.pointerId)
    }
    catch {
      // ignore
    }
  }
}

const onSwipePointerUp = (event: PointerEvent) => {
  if (!swipeTracking) {
    return
  }
  swipeTracking = false
  const target = event.currentTarget
  if (target instanceof HTMLElement && 'releasePointerCapture' in target) {
    try {
      target.releasePointerCapture(event.pointerId)
    }
    catch {
      // ignore
    }
  }
  const dx = event.clientX - swipeStartX
  if (dx > SWIPE_THRESHOLD_PX) {
    goPrev()
    return
  }
  if (dx < -SWIPE_THRESHOLD_PX) {
    goNext()
  }
}

const onSwipePointerCancel = () => {
  swipeTracking = false
}

const onEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', onEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onEscape)
})

</script>

<template>
  <UiModal wide @close="emit('close')">
    <div class="portfolio-gallery">
        <div
          class="portfolio-gallery__viewport"
          @pointerdown="onSwipePointerDown"
          @pointerup="onSwipePointerUp"
          @pointercancel="onSwipePointerCancel"
          @selectstart.prevent
        >
          <Transition mode="out-in" name="portfolio-gallery-fade">
            <div
              :key="currentIndex"
              class="portfolio-gallery__slide"
            >
              <img
                class="portfolio-gallery__image"
                :src="currentSlideSrc"
                :alt="props.title"
                width="900"
                height="900"
                decoding="async"
              />
            </div>
          </Transition>
        </div>
        <div class="portfolio-gallery__controls">
          <button
            class="portfolio-gallery__button portfolio-gallery__button--prev"
            type="button"
            aria-label="Предыдущее фото"
            :disabled="!canGoPrev"
            @click="goPrev"
          >
            <Icon name="icons:arrow-button" class="portfolio-gallery__icon" />
          </button>
          <button
            class="portfolio-gallery__button portfolio-gallery__button--next"
            type="button"
            aria-label="Следующее фото"
            :disabled="!canGoNext"
            @click="goNext"
          >
            <Icon name="icons:arrow-button" class="portfolio-gallery__icon portfolio-gallery__icon--flip" />
          </button>
        </div>
      </div>
  </UiModal>
</template>

<style scoped lang="scss">
.portfolio-gallery {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  inline-size: min(100%, 980px);
  container-type: inline-size;
}

.portfolio-gallery__viewport {
  position: relative;
  overflow: hidden;
  inline-size: min(100%, 980px);
  block-size: 600px;
  border-radius: var(--border-radius-primary);
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}

.portfolio-gallery__slide {
  display: flex;
  align-items: center;
  justify-content: center;
  inline-size: 100%;
  block-size: 100%;
}

.portfolio-gallery__image {
  display: block;
  inline-size: 100%;
  block-size: 100%;
  object-fit: contain;
  border-radius: var(--border-radius-primary);
  pointer-events: none;
}

.portfolio-gallery-fade-enter-active {
  transition: opacity 0.4s ease;
}

.portfolio-gallery-fade-leave-active {
  transition: opacity 0.32s ease;
}

.portfolio-gallery-fade-enter-from {
  opacity: 0;
}

.portfolio-gallery-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .portfolio-gallery-fade-enter-active {
    transition-duration: 0.01ms;
  }

  .portfolio-gallery-fade-leave-active {
    transition-duration: 0.01ms;
  }
}

.portfolio-gallery__controls {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-block-start: clamp(16px, 4cqi, 24px);
}

.portfolio-gallery__button {
  inline-size: clamp(44px, 13.5cqi, 52px);
  block-size: auto;
  aspect-ratio: 1 / 1;
  transition: filter 0.3s ease;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    filter: grayscale(1) brightness(1.2);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
}

.portfolio-gallery__icon {
  display: block;
  inline-size: 100%;
  block-size: auto;
  aspect-ratio: 1 / 1;

  &--flip {
    transform: rotate(180deg);
  }
}

@media (width < 768px) {
  .portfolio-gallery {
    inline-size: 100%;
  }

  .portfolio-gallery__viewport {
    inline-size: 100%;
    block-size: 360px;
  }

  .portfolio-gallery__slide {
    block-size: 100%;
  }

  .portfolio-gallery__controls {
    justify-content: center;
  }

  .portfolio-gallery__button {
    inline-size: 48px;
  }
}

</style>
