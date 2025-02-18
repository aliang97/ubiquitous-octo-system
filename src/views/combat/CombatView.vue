<script setup lang="ts">
import CombatRenderer from '@/components/combat/CombatRenderer.vue';
import TargetSelector from '@/components/combat/TargetSelector.vue';
import type { Location } from '@/types';

defineProps<{
  location: Location;
}>();
</script>

<template>
  <main>
    <CombatRenderer :location="location" />
    <h1>{{ location.name }}</h1>
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
