<script setup lang="ts">
import type { CharacterEntity } from '@/types';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { getAttackIntervalMS, getDerivedCharacterStats } from '@/utils/combat';

const props = defineProps<{
  character: CharacterEntity;
  gameTick: number;
}>();

const attackIntervalMS = computed(() => {
  const d = getDerivedCharacterStats(props.character);
  return getAttackIntervalMS(d.attacksPerSecond);
});
const attackPercentage: ComputedRef<number> = computed(() => {
  if (attackIntervalMS.value) {
    return Math.round((100 * (props.gameTick % attackIntervalMS.value)) / attackIntervalMS.value);
  }

  return 0;
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
