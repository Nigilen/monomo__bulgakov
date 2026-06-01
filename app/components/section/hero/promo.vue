<script setup lang="ts">

const { open: openPromoModal } = usePromoModal()

</script>

<template>
  <div class="promo">
    <div class="promo__container">

      <h2 class="promo__title">
        <span class="promo__title-accent">Акция</span>
        <span>до 30 июня</span>
      </h2>

      <div class="promo__content">
        <p class="promo__description">
          Ремонт под ключ с материалами<br>+<br>Мебель<br>+<br>Бытовая техника
        </p>
      </div>

      <div class="promo__footer">
        <p class="promo__price">Всего за 985 000 рублей</p>
        <p class="promo__limit">Количество заявок ограничено</p>
      </div>
      <button class="promo__button" type="button" @click="openPromoModal">Подробнее</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.promo {
  position: relative;
  isolation: isolate;
  inline-size: min(570px, 29.76vi);
  aspect-ratio: 570 / 547;
  block-size: auto;
  border-radius: 0.83vi;
  border: 1px solid var(--color-border-secondary);
  animation: promo-glow 3.2s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    inset: -6px;
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    background: radial-gradient(ellipse at center,
        rgba(177, 140, 104, 0.35) 0%,
        rgba(177, 140, 104, 0.08) 45%,
        transparent 72%);
    animation: promo-halo 3.2s ease-in-out infinite;
  }

  &__container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    container-type: inline-size;
    padding: 1.65cqi;
    block-size: 100%;
    border-radius: inherit;
    background-color: #252525A0;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    font-size: 4.6cqi;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--color-accent-primary);
    padding-block-end: 3.2cqi;
    border-block-end: 1px solid var(--color-border-secondary);
  }

  &__title-accent {
    display: inline-block;
    letter-spacing: 0.05em;
    background-image: linear-gradient(110deg,
        #8f6848 0%,
        #c4a57a 14%,
        #fff6ea 28%,
        #b18c68 42%,
        #f0dcc0 56%,
        #9a714d 70%,
        #e8d4b8 84%,
        #8f6848 100%);
    background-size: 320% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    filter:
      drop-shadow(0 1px 0 rgba(255, 236, 210, 0.22)) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.28));
    animation: promo-shimmer 7.5s linear infinite;
  }

  &__content {
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 8cqi;
  }

  &__description {
    font-size: 4.4cqi;
  }

  
  &__footer {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  &__price {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: var(--color-text-primary);
    font-size: 6cqi;
    font-weight: 700;
  }

  &__limit {
    font-size: 3.6cqi;
    color: var(--color-text-secondary);
  }

  &__button {
    display: flex;
    margin-inline: auto;
    font-size: 4.4cqi;
    color: var(--color-accent-primary);
  }

  @media (width < 768px) {
    margin-inline: auto;
    inline-size: clamp(300px, 100%, 500px);
    aspect-ratio: auto;
    border-radius: 16px;

    &__container {
      gap: 28px;
      padding: 16px;
    }

    &__title {
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 22px;
    }

    &__description {
      font-size: 5.5cqi;
    }

    &__content {
      font-size: 16px;
    }

    &__price {
      font-size: 6cqi;
    }

    &__limit {
      font-size: 16px;
    }


    &__button {
      font-size: 18px;
    }

    margin-block-end: 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    box-shadow: 0 4px 34px 0 #B18C68;

    &::after {
      animation: none;
    }

    &__title-accent {
      animation: none;
      background-image: linear-gradient(168deg,
          #dcc9ad 0%,
          #b18c68 46%,
          #8f6848 100%);
      background-size: 100% 100%;
      filter: none;
    }
  }
}

@keyframes promo-glow {

  0%,
  100% {
    box-shadow:
      0 4px 24px rgba(177, 140, 104, 0.35),
      0 0 0 1px rgba(177, 140, 104, 0.45);
  }

  50% {
    box-shadow:
      0 10px 42px rgba(177, 140, 104, 0.62),
      0 0 32px rgba(177, 140, 104, 0.28),
      0 0 0 1px rgba(209, 175, 140, 0.9);
  }
}

@keyframes promo-halo {

  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.98);
  }

  50% {
    opacity: 1;
    transform: scale(1.04);
  }
}

@keyframes promo-shimmer {
  0% {
    background-position: 0% 50%;
  }

  100% {
    background-position: 320% 50%;
  }
}
</style>