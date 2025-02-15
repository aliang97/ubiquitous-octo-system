<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps<{
  spriteSrc: string, // Filepath of the sprite sheet
  size: {x: number, y: number}, // Size of one frame
  frames: number, // number of images in the spritemap
  durationMS: number, // how many ms the animation should last
}>()
const cssBackgroundImage = ref(`url(${props.spriteSrc})`);
const cssHeight = ref(`${props.size.y}px`);
const cssWidth = ref(`${props.size.x}px`);
const cssAnimationDuration = ref(`${props.durationMS / 1000}s`);
const cssAnimationTFunc = ref(`steps(${props.frames})`);
const keyframeStart = ref(`0 0`);
const keyframeEnd = ref(`${props.size.x * props.frames}px 0`);
</script>

<template>
<div class="AnimatedSprite">
  <div class="animate"></div>
</div>
</template>

<style scoped>
.animate {
  background-size: cover;
  background-image: v-bind(cssBackgroundImage);
  height: v-bind(cssHeight);
  width: v-bind(cssWidth);
  animation-name: animationKeyframes;
  animation-timing-function: v-bind(cssAnimationTFunc);
  animation-duration: v-bind(cssAnimationDuration);
  animation-iteration-count: infinite;
}

@keyframes animationKeyframes {
  from { background-position: v-bind(keyframeStart); }
  to { background-position: v-bind(keyframeEnd); }
}
</style>
