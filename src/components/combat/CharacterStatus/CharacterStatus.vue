<script setup lang="ts">
import HitpointGauge from '@/components/combat/CharacterStatus/HitpointGauge.vue';
import AttackGauge from '@/components/combat/CharacterStatus/AttackGauge.vue';
import type { CharacterEntity } from '@/types';
defineProps<{
  character: CharacterEntity;
  gameTick?: number;
}>();
</script>

<template>
  <div class="CharacterStatus">
    <div class="info">
      <div class="name">{{ character.name }}</div>
    </div>
    <HitpointGauge :character="character" />
    <AttackGauge v-if="gameTick" :character="character" :gameTick="gameTick" />
  </div>
</template>

<style scoped>
.CharacterStatus {
  padding: 8px;
  border: 1px solid white;
  background-color: var(--color-bg-2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 200px;
  height: 60px;
}

.info {
  display: flex;
  gap: 8px;
  align-items: baseline;
  line-height: 1;
}

.class {
  font-size: 8px;
  line-height: 1;
}

.name {
  color: white;
  font-size: 12px;
  line-height: 1;
  max-width: 50%;
  overflow: hidden;
}
</style>
