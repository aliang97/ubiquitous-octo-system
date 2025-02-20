<script setup lang="ts">
import type { RenderableEntity } from '@/types';
import { computed } from 'vue';

const props = defineProps<{
  c: RenderableEntity;
}>();
const particles = computed(() => props.c.particleEffects);
</script>

<template>
  <div class="ParticleRenderer">
    <template v-for="(p, i) in particles" :key="p.id">
      <props.c.particleEffects[i].vueComponent v-bind="p" />
    </template>
  </div>
</template>

<style scoped>
.ParticleRenderer {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateY(-50%);
  z-index: 10;
}
</style>
