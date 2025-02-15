<script setup lang="ts">
import type { CharacterEntity } from '@/scripts/entities';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { SERVER_TICK_RATE_MS } from '@/scripts/util';

const props = defineProps<{
  character: CharacterEntity;
  gameTick: number;
}>();

// TODO: put somewhere better
function getAttackIntervalMS(c: CharacterEntity): number | undefined {
  if (c.attacksPerSecond === undefined) {
    return undefined;
  }
  const ticksPerSecond = 1000 / SERVER_TICK_RATE_MS;
  return Math.round(ticksPerSecond / c.attacksPerSecond);
}

const attackIntervalMS = getAttackIntervalMS(props.character);
const attackPercentage: ComputedRef<number | undefined> = computed(() => {
  if (attackIntervalMS) {
    return Math.round((100 * (props.gameTick % attackIntervalMS)) / attackIntervalMS);
  }
  return undefined;
});
</script>

<template>
  <div v-if="attackPercentage" class="attackGauge">
    <div class="gauge">
      <div class="gauge-background"></div>
      <div class="gauge-internal" :style="{ width: attackPercentage + '%' }"></div>
    </div>
  </div>
</template>

<style scoped>
.attackGauge {
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
}

.gauge {
  border-radius: 999px;
  width: 100%;
  height: 2px;
  overflow: hidden;
  position: relative;
}

.gauge-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.gauge-internal {
  border-radius: 999px;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: white;
}
</style>
