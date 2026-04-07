<script setup lang="ts">


</script>

<template>
  <header class="container container--wide header">
    <NuxtLink class="logo-link" to="/">
      <img class="logo-image" src="@/assets/images/logo.svg" alt="Logo" width="213" height="117" />
    </NuxtLink>
    <UiMenu />
    <UiContacts />
  </header>
</template>

<style scoped lang="scss">

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 30px;
  container-type: inline-size;
}

.logo-link {
  display: block;
  inline-size: clamp(94px, 12.5cqi, 213px);
  block-size: auto;
  aspect-ratio: 213 / 117;
  margin-inline: 0 min(100px, 5.8cqi);
}

</style>