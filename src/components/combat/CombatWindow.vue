<script setup lang="ts">
import { LocationEntity } from '@/scripts/entities';
import CombatHUD from '@/components/combat/CombatHUD.vue';
import CombatRenderer from '@/components/combat/CombatRenderer.vue';

import { computed } from 'vue';
import { useCombatManagerStore } from '@/stores/combatManager';

const props = defineProps<{
  locationProfile: LocationEntity;
}>();

const combatManager = useCombatManagerStore();
const currentCombat = computed(() => combatManager.combatsByLocationId[props.locationProfile.id]);
</script>

<template>
  <div class="CombatWindow">
    <props.locationProfile.backgroundComponent class="background" />
    <template v-if="currentCombat">
      <CombatHUD :locationProfile="locationProfile" :combat="currentCombat" />
      <CombatRenderer :combat="currentCombat" />
    </template>
    <template v-else>
      <div class="prompt">Pick an enemy to fight!</div>
    </template>
  </div>
</template>

<style scoped>
.CombatWindow {
  width: 100%;
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
