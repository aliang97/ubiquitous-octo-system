<script setup lang="ts">
import CombatWindow from '@/components/combat/CombatWindow.vue';
import TargetSelector from '@/components/combat/TargetSelector.vue';
import ForestData from '@/data/locations/Forest';
import { ref } from 'vue';

const locationProfile = ref(ForestData);
const locationName = ForestData.name;
</script>

<template>
  <main>
    <CombatWindow :locationProfile="locationProfile"/>
    <h1>{{ locationName }}</h1>
    <TargetSelector :locationProfile="ForestData"/>
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
