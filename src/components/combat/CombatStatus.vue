<script setup lang="ts">
import type { CharacterEntity } from '@/types/CharacterEntity';
import HitpointGauge from '@/components/combat/HitpointGauge.vue';
import AttackGauge from '@/components/combat/AttackGauge.vue';

defineProps<{
  character: CharacterEntity,
  gameTick?: number,
}>()
</script>

<template>
  <div class="CombatStatus">
    <div class="info">
      <div class="name">{{ character.name }}</div>
      <div class="class">{{ character.class }}</div>
    </div>
    <HitpointGauge :character="character" />
    <AttackGauge v-if="gameTick" :character="character" :gameTick="gameTick" />
  </div>
</template>

<style scoped>
.CombatStatus {
  padding: 8px;
  border: 1px solid white;
  background-color: var(--color-background-soft);
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
}
</style>
