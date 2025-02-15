<script setup lang="ts">
import { computed } from 'vue';
import type { CharacterEntity } from '@/scripts/entities';

const props = defineProps<{
  character: CharacterEntity;
}>();

const healthPercentage = computed(() =>
  Math.max(
    Math.round((100 * props.character.currentHitPoints) / props.character.maximumHitPoints),
    0,
  ),
);
</script>

<template>
  <div class="hitpointGauge">
    <div class="label">{{ character.currentHitPoints }} / {{ character.maximumHitPoints }}</div>
    <div class="gauge">
      <div class="gauge-background"></div>
      <div class="gauge-internal" :style="{ width: healthPercentage + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.hitpointGauge {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
}

.gauge {
  border-radius: 999px;
  width: 100%;
  height: 6px;
  overflow: hidden;
  position: relative;
}

.gauge-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f00000;
}

.gauge-internal {
  border-radius: 999px;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #00c410;
}

.label {
  position: absolute;
  top: -12px;
  right: 0;
  font-size: 8px;
  line-height: 1;
  align-self: flex-end;
  color: white;
}
</style>
