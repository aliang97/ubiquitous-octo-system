<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
  params: Record<string, string | number>;
  durationMS: number;
}>();

const animationDuration = `${(props.durationMS * 1.1) / 1000}s`;
const randomizedX = computed(() => `-${20 + Math.round(Math.random() * 60)}%`);
const randomizedY = computed(() => `-${20 + Math.round(Math.random() * 60)}%`);
</script>

<template>
  <div class="FloatingText">
    <div class="float-up">
      {{ params.textContent }}
    </div>
  </div>
</template>

<style scoped>
.FloatingText {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(v-bind(randomizedY), v-bind(randomizedX));
  width: 16px;
  height: 16px;
  color: red;
  font-weight: 700;
  font-size: 18px;
}

.float-up {
  animation-name: float-up;
  animation-duration: v-bind(animationDuration);
}

@keyframes float-up {
  from {
    translate: 0 0;
  }
  to {
    translate: 0 -100%;
  }
}
</style>
