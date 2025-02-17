<script setup lang="ts">
import type { Location } from '@/types';

defineProps<{
  location: Location;
}>();
</script>

<template>
  <div class="BackgroundRenderer">
    <div
      class="background"
      :style="{ 'background-image': `url(${location.backgroundImageSrc})` }"
    ></div>
    <div class="shader"></div>
  </div>
</template>

<style scoped>
.BackgroundRenderer {
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: palegreen;
}

.background {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: bottom center;
}

.shader {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
}
</style>
