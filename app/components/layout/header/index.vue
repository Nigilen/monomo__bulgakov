<script setup lang="ts">

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isMenuOpen.value = false;
  }
};

const handleResize = () => {
  if (window.innerWidth < 1440) {
    isMenuOpen.value = false;
  }
};


onMounted(() => {
  window.addEventListener('resize', handleResize);
  window.addEventListener('keydown', handleKeyDown);
});

watch(isMenuOpen, (open) => {
  if (!import.meta.client) return;
  const overflow = open ? 'hidden' : '';
  document.documentElement.style.overflow = overflow;
  document.body.style.overflow = overflow;
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('keydown', handleKeyDown);
  if (!import.meta.client) return;
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
});


</script>


<template>
  <header class="container container--wide header">
    <NuxtLink class="header__logo" to="/">
      <!-- <img 
        class="header__logo-image" 
        src="/logo.svg" 
        alt="Логотип Bulgakov Prime" 
        width="213" 
        height="117" 
        @click="closeMenu"
      /> -->
      <UiLogo class="header__logo-image" />
    </NuxtLink>
    <div class="header__menu" :class="{ 'header__menu--open': isMenuOpen }" id="header-menu">
      <LayoutHeaderMenu @navigate="closeMenu" />
      <LayoutHeaderContacts />
    </div>

    <NuxtLink class="header__phone" to="tel:+79682810092">+7 (968) 281-00-92</NuxtLink>
    <button class="header__burger" type="button" @click="toggleMenu" :aria-expanded="isMenuOpen"
      :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
      aria-controls="header-menu">
      <Icon class="header__burger-icon" :name="isMenuOpen ? 'icons:cross' : 'icons:menu'" />
    </button>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: min(30px, 1.54vi);
  position: absolute;
  inset-inline: 0;
  inset-block-start: 0;
  z-index: 1;

  &__logo {
    display: block;
    inline-size: min(213px, 11.1vi);
    block-size: auto;
    aspect-ratio: 213 / 117;
    margin-inline: 0 5.25cqi;
  }

  &__menu {
    display: flex;
    align-items: center;
    inline-size: 100%;
    justify-content: space-between;
  }

  &__phone {
    display: none;
    font-size: 4.27vi;
    white-space: nowrap;
    margin-inline: auto 9.85vi;

  }


  &__burger {
    display: none;
    z-index: 1;
    align-items: center;

    &-icon {
      inline-size: 7vi;
      block-size: auto;
      aspect-ratio: 1 / 1;
    }

  }
}


@media (width < 768px) {
  .header {
    padding-block: 16px;

    &__logo {
      inline-size: 94px;
      margin-inline: 0;
    }

    &__phone {
      display: block;
      font-size: 16px;
    }

    &__menu {
      display: flex;
      position: fixed;
      inset: 0;
      z-index: 100;
      box-sizing: border-box;
      background-color: var(--color-background-primary);
      flex-direction: column;
      align-items: flex-start;
      padding-block: 40px;
      padding-inline: 9.85vi;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transform: translateX(100%);
      transition:
        opacity 0.3s ease,
        transform 0.3s ease,
        visibility 0s linear 0.3s;

      &--open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateX(0);
        transition:
          opacity 0.3s ease,
          transform 0.3s ease,
          visibility 0s linear 0s;

        @media (prefers-reduced-motion: reduce) {
          transition: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }

    &__burger {
      display: flex;
      position: relative;
      z-index: 101;

      &-icon {
        inline-size: 28px;
      }
    }
  }
}
</style>