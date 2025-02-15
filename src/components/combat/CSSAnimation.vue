<script setup lang="ts">
const props = defineProps<{
  animationId: string,
  animationDurationMS: number
}>()
const animationIdToCSSClass: Record<string, string> = {
  'float-up': 'float-up',
}
const cssClass: string = animationIdToCSSClass[props.animationId] || '';
const animationDuration = `${props.animationDurationMS / 1000}s`;
</script>

<template>
<div class="CSSAnimation">
  <div :class="cssClass">
    <slot></slot>
  </div>
</div>
</template>

<style scoped>
.float-up {
  animation-name: float-up;
  animation-duration: v-bind(animationDuration);
}

@keyframes float-up {
  from { translate: 0 0; }
  to { translate: 0 -100%; }
}
</style>
