import {
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  ref,
  toValue,
  watch,
  type MaybeRefOrGetter,
} from 'vue';

const SWIPE_THRESHOLD_PX = 60;
const AXIS_LOCK_PX = 12;

export type UsePriceSliderOptions = {
  initialActiveIndex?: number
  itemSelector?: string
};

export const usePriceSlider = (
  slideCount: MaybeRefOrGetter<number>,
  options?: UsePriceSliderOptions,
) => {
  const itemSelector = options?.itemSelector ?? '.item';

  const count = computed(() => Math.max(0, toValue(slideCount)));
  const lastIndex = computed(() => Math.max(0, count.value - 1));

  const activeIndex = ref(options?.initialActiveIndex ?? 1);
  const translateX = ref(0);
  const dragOffset = ref(0);
  const viewportRef = ref<HTMLElement | null>(null);
  const trackRef = ref<HTMLElement | null>(null);

  const pointerStartX = ref(0);
  const pointerStartY = ref(0);
  const activePointerId = ref<number | null>(null);
  const isDragActive = ref(false);
  const swipeAxisLocked = ref<'none' | 'horizontal' | 'vertical'>('none');

  watch(lastIndex, (maxIdx) => {
    if (activeIndex.value > maxIdx) {
      activeIndex.value = maxIdx;
    }
  }, { immediate: true });

  const canGoPrev = computed(() => activeIndex.value > 0);

  const canGoNext = computed(() => activeIndex.value < lastIndex.value);

  const isDragPanning = computed(
    () => swipeAxisLocked.value === 'horizontal' && isDragActive.value,
  );

  const trackStyle = computed(() => {
    const x = translateX.value + dragOffset.value;
    const style: Record<string, string> = {
      transform: `translate3d(${x}px, 0, 0)`,
    };
    if (isDragPanning.value) {
      style.transition = 'none';
    }
    return style;
  });

  const updatePosition = () => {
    const viewport = viewportRef.value;
    const track = trackRef.value;
    if (!viewport || !track) {
      return;
    }
    const items = track.querySelectorAll(itemSelector);
    const active = items[activeIndex.value] as HTMLElement | undefined;
    if (!active) {
      return;
    }
    const viewportWidth = viewport.clientWidth;
    const slideCenterInTrack = active.offsetLeft + active.offsetWidth / 2;
    translateX.value = viewportWidth / 2 - slideCenterInTrack;
  };

  const scheduleUpdatePosition = () => {
    requestAnimationFrame(() => {
      updatePosition();
    });
  };

  const goPrev = () => {
    if (!canGoPrev.value) {
      return;
    }
    activeIndex.value -= 1;
  };

  const goNext = () => {
    if (!canGoNext.value) {
      return;
    }
    activeIndex.value += 1;
  };

  const clearTextSelection = () => {
    const selection = window.getSelection?.();
    if (selection && selection.rangeCount > 0) {
      selection.removeAllRanges();
    }
  };

  const applyEdgeResistance = (delta: number) => {
    if (activeIndex.value === 0 && delta > 0) {
      return delta * 0.35;
    }
    if (activeIndex.value === lastIndex.value && delta < 0) {
      return delta * 0.35;
    }
    return delta;
  };

  const isPrimaryPointerButton = (event: PointerEvent) => event.button === 0;

  const releaseActivePointer = (event: PointerEvent) => {
    if (activePointerId.value === null) {
      return;
    }
    if (viewportRef.value?.hasPointerCapture?.(event.pointerId)) {
      viewportRef.value.releasePointerCapture(event.pointerId);
    }
    activePointerId.value = null;
  };

  const resetDragGesture = () => {
    dragOffset.value = 0;
    isDragActive.value = false;
    swipeAxisLocked.value = 'none';
  };

  const onPointerDown = (event: PointerEvent) => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }
    const rawTarget = event.target;
    const targetEl = rawTarget instanceof Element ? rawTarget : null;
    if (targetEl?.closest('button, a, [role="button"]')) {
      return;
    }

    activePointerId.value = event.pointerId;
    pointerStartX.value = event.clientX;
    pointerStartY.value = event.clientY;
    isDragActive.value = true;
    swipeAxisLocked.value = 'none';
    dragOffset.value = 0;
    clearTextSelection();

    viewportRef.value?.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (activePointerId.value !== event.pointerId || !isDragActive.value) {
      return;
    }

    const clientX = event.clientX;
    const clientY = event.clientY;
    const dx = clientX - pointerStartX.value;
    const dy = clientY - pointerStartY.value;

    if (swipeAxisLocked.value === 'none') {
      if (Math.abs(dx) < AXIS_LOCK_PX && Math.abs(dy) < AXIS_LOCK_PX) {
        return;
      }
      if (Math.abs(dy) >= Math.abs(dx)) {
        releaseActivePointer(event);
        resetDragGesture();
        return;
      }
      swipeAxisLocked.value = 'horizontal';
      clearTextSelection();
    }

    if (swipeAxisLocked.value !== 'horizontal') {
      return;
    }

    event.preventDefault();
    dragOffset.value = applyEdgeResistance(dx);
  };

  const onPointerUp = (event: PointerEvent) => {
    if (activePointerId.value !== event.pointerId) {
      return;
    }

    if (swipeAxisLocked.value === 'horizontal' && isDragActive.value) {
      const delta = dragOffset.value;
      if (delta < -SWIPE_THRESHOLD_PX && canGoNext.value) {
        activeIndex.value += 1;
      } else if (delta > SWIPE_THRESHOLD_PX && canGoPrev.value) {
        activeIndex.value -= 1;
      }
    }

    releaseActivePointer(event);
    resetDragGesture();
  };

  let resizeObserver: ResizeObserver | null = null;
  let pointerMoveCleanup: (() => void) | null = null;

  watch(activeIndex, () => {
    nextTick(scheduleUpdatePosition);
  });

  watch(viewportRef, (element) => {
    pointerMoveCleanup?.();
    pointerMoveCleanup = null;
    if (!element) {
      return;
    }
    const handler = (event: PointerEvent) => {
      onPointerMove(event);
    };
    element.addEventListener('pointermove', handler, { passive: false });
    pointerMoveCleanup = () => {
      element.removeEventListener('pointermove', handler);
    };
  }, { immediate: true });

  onMounted(() => {
    nextTick(() => {
      scheduleUpdatePosition();
      requestAnimationFrame(() => {
        scheduleUpdatePosition();
      });
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdatePosition();
      });
      if (viewportRef.value) {
        resizeObserver.observe(viewportRef.value);
      }
    });
  });

  onUnmounted(() => {
    resizeObserver?.disconnect();
    resizeObserver = null;
    pointerMoveCleanup?.();
    pointerMoveCleanup = null;
  });

  return {
    activeIndex,
    viewportRef,
    trackRef,
    trackStyle,
    canGoPrev,
    canGoNext,
    goPrev,
    goNext,
    onPointerDown,
    onPointerUp,
  };
};
