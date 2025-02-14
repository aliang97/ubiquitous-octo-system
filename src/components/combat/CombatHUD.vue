<script setup lang="ts">
import type { CombatInstance } from '@/types/CombatInstance';
import type { LocationEntity } from '@/types/LocationEntity';
import { computed } from 'vue';
import CombatStatus from '@/components/characterEntity/CombatStatus.vue';
import { useOngoingCombatStore } from '@/stores/ongoingCombat';

const props = defineProps<{
  locationProfile: LocationEntity,
  combat: CombatInstance,
}>()

const ongoingCombat = useOngoingCombatStore();
const timeMS = computed(() => props.combat.tick);
function exitCombat() {
  ongoingCombat.removeCombatByLocationId(props.locationProfile.id);
}

</script>

<template>
  <div class="CombatHUD">
    <div class="timer">Timer: {{ timeMS }}</div>
    <CombatStatus
      :character="combat.character1"
      :tick="timeMS"
      class="statusWindow-position1"
    />
    <CombatStatus
      :character="combat.character2"
      :tick="timeMS"
      class="statusWindow-position2"
    />
    <div class="exit" v-on:click="exitCombat">Leave Combat</div>
  </div>
</template>

<style scoped>
.CombatHUD {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}

.timer {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: black
}

.statusWindow-position1 {
  position: absolute;
  top: 0;
  left: 0;
}

.statusWindow-position2 {
  position: absolute;
  bottom: 0;
  right: 0;
}

.exit {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px;
  background-color: black;
  color: white;
}

.exit:hover {
  cursor: pointer;
  background-color: #222222;
}
</style>
