<template>
  <div class="ellipsis-loader" aria-hidden="true">
    <span class="ellipsis-loader__dot ellipsis-loader__dot--a"></span>
    <span class="ellipsis-loader__dot ellipsis-loader__dot--b"></span>
    <span class="ellipsis-loader__dot ellipsis-loader__dot--c"></span>
    <span class="ellipsis-loader__dot ellipsis-loader__dot--d"></span>
  </div>
</template>

<style scoped lang="scss">
.ellipsis-loader {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  inline-size: 48px;
  block-size: 48px;
}

.ellipsis-loader__dot {
  box-sizing: border-box;
  position: absolute;
  inset-block-start: 20px;
  inline-size: 8px;
  block-size: 8px;
  border-radius: 50%;
  background-color: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  animation-duration: 600ms;
  animation-iteration-count: infinite;
}

.ellipsis-loader__dot--a {
  inset-inline-start: 5px;
  animation-name: ellipsis-loader-a;
}

.ellipsis-loader__dot--b {
  inset-inline-start: 5px;
  animation-name: ellipsis-loader-b;
}

.ellipsis-loader__dot--c {
  inset-inline-start: 19px;
  animation-name: ellipsis-loader-b;
}

.ellipsis-loader__dot--d {
  inset-inline-start: 34px;
  animation-name: ellipsis-loader-c;
}

@keyframes ellipsis-loader-a {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes ellipsis-loader-c {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes ellipsis-loader-b {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(14px, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ellipsis-loader__dot {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
  }
}
</style>
