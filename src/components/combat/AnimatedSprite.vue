<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  spriteSrc: string; // Filepath of the sprite sheet
  offset?: { x: number; y: number }; // if your spritemap has multiple animations in one file
  size: { x: number; y: number }; // Size the final image should be rendered
  frames: number; // number of images in the spritemap
  durationMS: number; // how many ms the animation should last
  paused?: boolean;
}>();

const _offset = {
  x: props.offset?.x ? props.offset.x : 0,
  y: props.offset?.y ? props.offset.y : 0,
};
const cssBackgroundSize = computed(() => `${100 * props.frames}% auto`);
const cssBackgroundImage = computed(() => `url(${props.spriteSrc})`);
const cssHeight = computed(() => `${props.size.y}px`);
const cssWidth = computed(() => `${props.size.x}px`);
const cssAnimationDuration = computed(() => `${props.durationMS / 1000}s`);
const cssAnimationTFunc = computed(() => `steps(${props.frames})`);
const keyframeStart = computed(() => `-${_offset.x}px -${_offset.y}px`);
const keyframeEnd = computed(() => `-${_offset.x + props.size.x * props.frames}px -${_offset.y}px`);
const cssAnimationPlayState = computed(() => (props.paused ? 'paused' : 'running'));
</script>

<template>
  <div class="AnimatedSprite"></div>
</template>

<style scoped>
.AnimatedSprite {
  background-size: v-bind(cssBackgroundSize);
  background-image: v-bind(cssBackgroundImage);
  height: v-bind(cssHeight);
  width: v-bind(cssWidth);
  animation-name: animationKeyframes;
  animation-timing-function: v-bind(cssAnimationTFunc);
  animation-duration: v-bind(cssAnimationDuration);
  animation-iteration-count: infinite;
  animation-play-state: v-bind(cssAnimationPlayState);
}

@keyframes animationKeyframes {
  from {
    background-position: v-bind(keyframeStart);
  }
  to {
    background-position: v-bind(keyframeEnd);
  }
}
</style>
