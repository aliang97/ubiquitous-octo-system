<script setup lang="ts">
import CombatVisualization from "@/components/combat/CombatVisualization.vue"
import TargetSelector from '@/components/combat/TargetSelector.vue'

const locationName = "Forest Location Name";
</script>

<template>
  <main>
    <div class="visualization">
      <CombatVisualization locationId="forest"/>
    </div>
    <h1>{{ locationName }}</h1>
    <TargetSelector locationId="forest"/>
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
