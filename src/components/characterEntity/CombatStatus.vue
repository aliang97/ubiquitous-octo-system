<script setup lang="ts">
import type { CharacterEntity } from '@/types/CharacterEntity';
import HitpointGauge from '@/components/characterEntity/HitpointGauge.vue';
import AttackGauge from '@/components/characterEntity/AttackGauge.vue';

defineProps<{
  character: CharacterEntity,
  tick?: number,
}>()
</script>

<template>
  <div class="statusWindow">
    <div class="info">
      <div class="name">{{ character.name }}</div>
      <div class="class">{{ character.class }}</div>
    </div>
    <HitpointGauge :character="character" />
    <AttackGauge v-if="tick" :character="character" :tick="tick" />
  </div>
</template>

<style scoped>
.statusWindow {
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
