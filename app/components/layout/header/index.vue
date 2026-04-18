<script setup lang="ts">

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
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

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('keydown', handleKeyDown);
});


</script>


<template>
  <header class="container container--wide header">
    <NuxtLink class="header__logo" to="/">
      <NuxtImg class="header__logo-image" src="/logo.svg" alt="Логотип Bulgakov Prime" width="213" height="117" />
    </NuxtLink>
    <div class="header__menu" :class="{ 'header__menu--open': isMenuOpen }" id="header-menu">
      <LayoutHeaderMenu />
      <LayoutHeaderContacts />
    </div>

    <NuxtLink class="header__phone" to="tel:+79682810092">+7 (968) 281-00-92</NuxtLink>
    <button class="header__burger" type="button" @click="toggleMenu" aria-expanded="false"
      :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
      :aria-controls="isMenuOpen ? 'header-menu' : 'header-menu'">
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
    padding-block: 4.27vi;

    &__logo {
      inline-size: 25vi;
      margin-inline: 0;
    }

    &__phone {
      display: block;
    }

    &__menu {
      display: none;
      position: absolute;
      inset-inline-end: 0;
      inset-block-start: 0;
      inline-size: 100vi;
      block-size: 100vb;
      background-color: var(--color-background-primary);
      flex-direction: column;
      align-items: flex-start;
      padding-block: 12vi;
      padding-inline: 9.85vi;

      &--open {
        display: flex;
      }

    }

    &__burger {
      display: flex;

    }
  }
}
</style>