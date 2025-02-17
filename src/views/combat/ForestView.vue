<script setup lang="ts">
import CombatRenderer from '@/components/combat/CombatRenderer.vue';
import TargetSelector from '@/components/combat/TargetSelector.vue';
import ForestData from '@/data/locations/Forest';
import type { Location } from '@/types';

const location: Location = ForestData;
const locationName = ForestData.name;
</script>

<template>
  <main>
    <CombatRenderer :location="location" />
    <h1>{{ locationName }}</h1>
    <TargetSelector :location="location" />
  </main>
</template>

<style scoped>
main {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.visualization {
  height: 300px;
}

h1 {
  font-size: 32px;
  font-weight: 600;
  margin: 16px 0;
}
</style>
