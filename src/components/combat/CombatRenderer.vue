<script setup lang="ts">
import type { Location } from '@/types';
import CombatHUD from '@/components/combat/CombatHUD.vue';
import BackgroundRenderer from './BackgroundRenderer.vue';
import CombatScene from './CombatScene.vue';

import { computed } from 'vue';
import { useCombatManagerStore } from '@/stores/combatManager';

const props = defineProps<{
  location: Location;
}>();

const combatManager = useCombatManagerStore();
const currentCombat = computed(() => combatManager.combatsByLocationId[props.location.id]);
</script>

<template>
  <div class="CombatRenderer">
    <BackgroundRenderer :location="location" />
    <template v-if="currentCombat">
      <CombatHUD :location="location" />
      <CombatScene :combat="currentCombat" />
    </template>
    <template v-else>
      <div class="prompt">Pick an enemy to fight!</div>
    </template>
  </div>
</template>

<style scoped>
.CombatRenderer {
  width: 100%;
  max-width: 600px;
  height: 300px;
  position: relative;
}

.background {
  width: 100%;
  height: 100%;
}

.prompt {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 16px 32px;
  background-color: black;
  color: white;
}
</style>
