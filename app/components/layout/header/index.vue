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
      <NuxtImg
        src="/logo.svg"
        alt="Логотип Bulgakov Prime"
        width="213"
        height="117"
      />
    </NuxtLink>
    <div class="header__menu" :class="{ 'header__menu--open': isMenuOpen }" id="header-menu">
      <LayoutHeaderMenu />
      <LayoutHeaderContacts />
    </div>
    <NuxtLink class="header__phone" to="tel:+79682810092">+7 (968) 281-00-92</NuxtLink>
    <button 
      class="header__menu-button" 
      type="button" 
      @click="toggleMenu" 
      aria-expanded="false" 
      :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
      :aria-controls="isMenuOpen ? 'header-menu' : 'header-menu'"
    >
      <Icon :name="isMenuOpen ? 'icons:cross' : 'icons:menu'" />
    </button>
  </header>
</template>

<style scoped lang="scss">

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: min(30px, 1.54vi);
  container-type: inline-size;
  position: absolute;
  inset-inline: 0;
  inset-block-start: 0;
  z-index: 1;

  &__logo {
    display: block;
    inline-size: clamp(94px, 12cqi, 213px);
    block-size: auto;
    aspect-ratio: 213 / 117;
    margin-inline-start: 0;
    margin-inline-end: 5.6cqi;
  }

  &__phone {
    display: none;
  }

  &__menu {
    display: flex;
    align-items: center;
    inline-size: 100%;
    justify-content: space-between;
  }

  &__menu-button {
    display: none;
    inline-size: 28px;
    block-size: auto;
    aspect-ratio: 1 / 1;
  }
}


@media (width < 768px) {
  .header {
    padding-block: 16px;

    &__phone {
      display: block;
      font-size: 16px;
      white-space: nowrap;
    }

    &__menu {
      display: none;
      position: absolute;
      inset-inline-end: 0;
      inset-block-start: 0;
      inline-size: min(375px, 100vi);
      block-size: min(700px, 100vb);
      background-color: var(--color-background-primary);
      flex-direction: column;
      align-items: flex-start;
      padding-block: 50px;
      padding-inline: 40px;

      &--open {
        display: flex;
      }

      &-button {
        display: block;
        z-index: 1;
        margin-inline-start: auto;
      }
    }
  }
}

</style>