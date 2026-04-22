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

/**
 * Слайдер с центрированием активного слайда по ширине viewport.
 *
 * Режимы:
 * - без loop: крайние слайды, resistance при перетаскивании;
 * - loop: кольцо по индексу;
 * - loopTripleMode: три копии набора в DOM, «бесшовный» переход через мгновенный сдвиг
 *   индекса после анимации (снап по transitionend + запасной таймер).
 */

const isTransformTransitionProperty = (name: string) =>
  name === 'transform' || name === '-webkit-transform';

const SWIPE_THRESHOLD_PX = 60;
const AXIS_LOCK_PX = 12;

/** Длительность анимации transform трека (согласовать с navigationCooldownMs в секции-обёртке). */
const TRACK_TRANSFORM_DURATION_S = 0.35;
const TRACK_TRANSFORM_EASING = 'ease';

/**
 * Если transitionend не пришёл (редко), всё равно применить снап тройного цикла.
 * Берём запас относительно длительности transition + небольшой буфер.
 */
const TRIPLE_SNAP_FALLBACK_MS = Math.round(TRACK_TRANSFORM_DURATION_S * 1000) + 70;

/** Два кадра подряд — снять instant transition после применения transform без анимации. */
const runAfterNextPaint = (fn: () => void) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn);
  });
};

export type UsePriceSliderOptions = {
  initialActiveIndex?: number
  itemSelector?: string
  loop?: boolean
  loopTripleMode?: boolean
  autoPlayIntervalMs?: number
  navigationCooldownMs?: number
};

export const usePriceSlider = (
  slideCount: MaybeRefOrGetter<number>,
  options?: UsePriceSliderOptions,
) => {
  const itemSelector = options?.itemSelector ?? '.item';
  const loop = options?.loop ?? false;
  const loopTripleMode = options?.loopTripleMode ?? false;
  const autoPlayIntervalMs = options?.autoPlayIntervalMs;
  const navigationCooldownMs = options?.navigationCooldownMs;

  // --- Состояние навигации (ручной кулдаун) ---
  const lastManualNavigationAtMs = ref(0);

  const markManualNavigationTime = () => {
    if (navigationCooldownMs && navigationCooldownMs > 0) {
      lastManualNavigationAtMs.value = performance.now();
    }
  };

  const isManualNavigationAllowed = () => {
    if (!navigationCooldownMs || navigationCooldownMs <= 0) {
      return true;
    }
    return performance.now() - lastManualNavigationAtMs.value >= navigationCooldownMs;
  };

  const count = computed(() => Math.max(0, toValue(slideCount)));
  const lastIndex = computed(() => Math.max(0, count.value - 1));

  // --- Индекс и визуальное состояние трека ---
  const activeIndex = ref(options?.initialActiveIndex ?? 1);
  const instantTransition = ref(false);
  const pendingTripleSnap = ref<'none' | 'thirdToMiddle' | 'firstToMiddle'>('none');
  const skipInitialTransformAnimation = ref(loopTripleMode);
  const translateX = ref(0);
  const dragOffset = ref(0);
  const viewportRef = ref<HTMLElement | null>(null);
  const trackRef = ref<HTMLElement | null>(null);

  const pointerStartX = ref(0);
  const pointerStartY = ref(0);
  const activePointerId = ref<number | null>(null);
  const isDragActive = ref(false);
  const swipeAxisLocked = ref<'none' | 'horizontal' | 'vertical'>('none');

  if (!loopTripleMode) {
    watch(lastIndex, (maxIdx) => {
      if (activeIndex.value > maxIdx) {
        activeIndex.value = maxIdx;
      }
    }, { immediate: true });
  }

  const canGoPrev = computed(() => {
    if (count.value < 2) {
      return false;
    }
    if (loopTripleMode) {
      return true;
    }
    return loop ? true : activeIndex.value > 0;
  });

  const canGoNext = computed(() => {
    if (count.value < 2) {
      return false;
    }
    if (loopTripleMode) {
      return true;
    }
    return loop ? true : activeIndex.value < lastIndex.value;
  });

  const isDragPanning = computed(
    () => swipeAxisLocked.value === 'horizontal' && isDragActive.value,
  );

  const trackStyle = computed(() => {
    const x = translateX.value + dragOffset.value;
    const style: Record<string, string> = {
      transform: `translate3d(${x}px, 0, 0)`,
    };
    if (
      isDragPanning.value
      || instantTransition.value
      || skipInitialTransformAnimation.value
    ) {
      style.transition = 'none';
    } else {
      style.transition = `transform ${TRACK_TRANSFORM_DURATION_S}s ${TRACK_TRANSFORM_EASING}`;
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

  const endInstantTransition = () => {
    instantTransition.value = false;
  };

  const applyPendingTripleSnap = () => {
    if (!loopTripleMode) {
      return;
    }
    if (instantTransition.value) {
      return;
    }
    const n = count.value;
    if (n < 2) {
      return;
    }
    const shouldSnapThird
      = pendingTripleSnap.value === 'thirdToMiddle' && activeIndex.value === 2 * n;
    const shouldSnapFirst
      = pendingTripleSnap.value === 'firstToMiddle' && activeIndex.value === n - 1;

    const snapToIndex = (nextIndex: number) => {
      pendingTripleSnap.value = 'none';
      instantTransition.value = true;
      activeIndex.value = nextIndex;
      updatePosition();
      runAfterNextPaint(endInstantTransition);
    };

    if (shouldSnapThird) {
      snapToIndex(n);
    } else if (shouldSnapFirst) {
      snapToIndex(2 * n - 1);
    }
  };

  const scheduleTripleSnapFallback = () => {
    if (!loopTripleMode) {
      return;
    }
    const startMs = performance.now();
    const tick = (now: number) => {
      if (pendingTripleSnap.value === 'none') {
        return;
      }
      if (now - startMs >= TRIPLE_SNAP_FALLBACK_MS) {
        applyPendingTripleSnap();
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const autoPlayPaused = ref(false);
  const autoPlayAnchorMs = ref(0);

  const goPrev = () => {
    if (count.value < 2) {
      return;
    }
    if (!isManualNavigationAllowed()) {
      return;
    }
    if (loopTripleMode) {
      const n = count.value;
      if (activeIndex.value <= 0) {
        return;
      }
      pendingTripleSnap.value = activeIndex.value === n ? 'firstToMiddle' : 'none';
      activeIndex.value -= 1;
      updatePosition();
      if (pendingTripleSnap.value === 'firstToMiddle' && activeIndex.value === n - 1) {
        scheduleTripleSnapFallback();
      }
    } else if (loop) {
      activeIndex.value = (activeIndex.value - 1 + count.value) % count.value;
    } else if (!canGoPrev.value) {
      return;
    } else {
      activeIndex.value -= 1;
    }
    markManualNavigationTime();
    if (autoPlayIntervalMs && autoPlayIntervalMs > 0) {
      autoPlayAnchorMs.value = 0;
    }
  };

  const goNext = (fromAutoplay?: boolean) => {
    if (count.value < 2) {
      return;
    }
    const isFromAutoplay = fromAutoplay === true;
    if (!isFromAutoplay && !isManualNavigationAllowed()) {
      return;
    }
    if (loopTripleMode) {
      const n = count.value;
      // Уход из третьей копии в среднюю без визуального скачка
      if (activeIndex.value >= 2 * n) {
        instantTransition.value = true;
        activeIndex.value -= n;
        updatePosition();
        runAfterNextPaint(endInstantTransition);
      }
      if (activeIndex.value >= 3 * n - 1) {
        return;
      }
      pendingTripleSnap.value = activeIndex.value === 2 * n - 1 ? 'thirdToMiddle' : 'none';
      activeIndex.value += 1;
      updatePosition();
      if (pendingTripleSnap.value === 'thirdToMiddle' && activeIndex.value === 2 * n) {
        scheduleTripleSnapFallback();
      }
    } else if (loop) {
      activeIndex.value = (activeIndex.value + 1) % count.value;
    } else if (!canGoNext.value) {
      return;
    } else {
      activeIndex.value += 1;
    }
    if (!isFromAutoplay) {
      markManualNavigationTime();
    }
    if (autoPlayIntervalMs && autoPlayIntervalMs > 0) {
      autoPlayAnchorMs.value = 0;
    }
  };

  const clearTextSelection = () => {
    const selection = window.getSelection?.();
    if (selection && selection.rangeCount > 0) {
      selection.removeAllRanges();
    }
  };

  const applyEdgeResistance = (delta: number) => {
    if (loop || loopTripleMode) {
      return delta;
    }
    if (activeIndex.value === 0 && delta > 0) {
      return delta * 0.35;
    }
    if (activeIndex.value === lastIndex.value && delta < 0) {
      return delta * 0.35;
    }
    return delta;
  };

  let autoPlayRafId: number | null = null;

  const stopAutoPlayLoop = () => {
    if (autoPlayRafId !== null) {
      cancelAnimationFrame(autoPlayRafId);
      autoPlayRafId = null;
    }
  };

  const runAutoPlayFrame = (now: number) => {
    autoPlayRafId = requestAnimationFrame(runAutoPlayFrame);
    if (!autoPlayIntervalMs || count.value < 2) {
      return;
    }
    if (loopTripleMode && instantTransition.value) {
      return;
    }
    if (autoPlayPaused.value) {
      autoPlayAnchorMs.value = 0;
      return;
    }
    if (autoPlayAnchorMs.value === 0) {
      autoPlayAnchorMs.value = now;
      return;
    }
    if (now - autoPlayAnchorMs.value >= autoPlayIntervalMs) {
      goNext(true);
      autoPlayAnchorMs.value = now;
    }
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

    autoPlayPaused.value = true;

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
        autoPlayPaused.value = false;
        autoPlayAnchorMs.value = 0;
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
        goNext();
      } else if (delta > SWIPE_THRESHOLD_PX && canGoPrev.value) {
        goPrev();
      }
    }

    releaseActivePointer(event);
    resetDragGesture();
    autoPlayPaused.value = false;
    autoPlayAnchorMs.value = 0;
  };

  const onTrackTransitionEnd = (event: TransitionEvent) => {
    if (!loopTripleMode) {
      return;
    }
    if (event.target !== event.currentTarget) {
      return;
    }
    if (!isTransformTransitionProperty(event.propertyName)) {
      return;
    }
    applyPendingTripleSnap();
  };

  let resizeObserver: ResizeObserver | null = null;
  let pointerMoveCleanup: (() => void) | null = null;
  let transitionEndCleanup: (() => void) | null = null;

  watch(activeIndex, () => {
    nextTick(scheduleUpdatePosition);
  });

  watch(trackRef, (element) => {
    transitionEndCleanup?.();
    transitionEndCleanup = null;
    if (!element || !loopTripleMode) {
      return;
    }
    const handler = (event: TransitionEvent) => {
      onTrackTransitionEnd(event);
    };
    element.addEventListener('transitionend', handler);
    transitionEndCleanup = () => {
      element.removeEventListener('transitionend', handler);
    };
  }, { immediate: true });

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
      updatePosition();
      requestAnimationFrame(() => {
        updatePosition();
        if (loopTripleMode) {
          requestAnimationFrame(() => {
            skipInitialTransformAnimation.value = false;
          });
        }
      });
      resizeObserver = new ResizeObserver(() => {
        scheduleUpdatePosition();
      });
      if (viewportRef.value) {
        resizeObserver.observe(viewportRef.value);
      }
      if (autoPlayIntervalMs && autoPlayIntervalMs > 0) {
        autoPlayAnchorMs.value = 0;
        stopAutoPlayLoop();
        autoPlayRafId = requestAnimationFrame(runAutoPlayFrame);
      }
    });
  });

  onUnmounted(() => {
    stopAutoPlayLoop();
    transitionEndCleanup?.();
    transitionEndCleanup = null;
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
