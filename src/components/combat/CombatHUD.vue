<script setup lang="ts">
import { computed } from 'vue';
import { LocationEntity } from '@/scripts/entities';
import { CombatInstance, CombatStatus as CombatStatusType } from '@/scripts/combat';
import CombatStatus from '@/components/combat/CombatStatus.vue';
import { useCombatManagerStore } from '@/stores/combatManager';

const props = defineProps<{
  locationProfile: LocationEntity;
  combat: CombatInstance;
}>();

const DEBUG = true;
const combatManager = useCombatManagerStore();
const cc = computed(() => {
  console.log('huh');
  const c = combatManager.getCombatByLocation(props.locationProfile.id)?.status;
  console.log(combatManager.getCombatByLocation(props.locationProfile.id));
  return c;
});
const currentCombat = computed(() => combatManager.combatDictionary[props.locationProfile.id]);
// const gameTick = computed(() => currentCombat.value.gameTick);
// const trueTick = computed(() => currentCombat.value.trueTick);
// const combatStatus = computed(() => currentCombat.value.status);
const showCombatStatus = computed(() => {
  return true;
  // return currentCombat.value.status === CombatStatusType.Ongoing;
});
function exitCombat() {
  combatManager.removeCombatByLocation(props.locationProfile.id);
}
</script>

<template>
  <div class="CombatHUD">
    {{ cc }}
    <!-- <div v-if="DEBUG" class="timer">
      <div>Game Tick {{ gameTick }}</div>
      <div>True Tick {{ trueTick }}</div>
      <div>Status {{ combatStatus }}</div>
    </div>
    <CombatStatus
      :character="currentCombat.c1"
      :gameTick="gameTick"
      class="statusWindow-position1"
      :class="showCombatStatus ? 'onscreen-left' : ''"
    />
    <CombatStatus
      :character="currentCombat.c2"
      :gameTick="gameTick"
      class="statusWindow-position2"
      :class="showCombatStatus ? 'onscreen-right' : ''"
    /> -->
    <div class="buttonBox">
      <div class="button" v-on:click="exitCombat">Leave Combat</div>
      <div class="button" v-on:click="currentCombat?.pause()">Pause</div>
      <div class="button" v-on:click="currentCombat?.unpause()">Play</div>
    </div>
  </div>
</template>

<style scoped>
.CombatHUD {
  overflow: hidden;
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
  color: black;
}

.statusWindow-position1 {
  transition: left 1s ease;
  position: absolute;
  top: 0;
  left: -100%;
}

.statusWindow-position2 {
  transition: right 1s ease;
  position: absolute;
  bottom: 0;
  right: -100%;
}

.onscreen-left {
  left: 0;
}

.onscreen-right {
  right: 0;
}

.buttonBox {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  gap: 8px;
}

.button {
  padding: 8px;
  background-color: black;
  color: white;
}

.button:hover {
  cursor: pointer;
  background-color: #222222;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
