<script setup lang="ts">
import { computed } from 'vue';
import type { Location } from '@/types';
import { CombatInstanceStatus } from '@/utils';
import { useCombatManagerStore } from '@/stores/combatManager';
import { pauseCombat, unpauseCombat } from '@/utils/combat';
import CharacterStatus from './CharacterStatus/CharacterStatus.vue';

const props = defineProps<{
  location: Location;
}>();

const DEBUG = true;
const combatManager = useCombatManagerStore();
const combat = computed(() => combatManager.combatsByLocationId[props.location.id]);
const gameTick = computed(() => combat.value?.gameTick);
const trueTick = computed(() => combat.value?.trueTick);
const combatStatus = computed(() => combat.value?.status);
const showCombatStatus = computed(() => {
  return combat.value?.status === CombatInstanceStatus.Ongoing;
});
function exitCombat() {
  combatManager.removeCombatByLocation(props.location.id);
}
</script>

<template>
  <div v-if="combat" class="CombatHUD">
    <div v-if="DEBUG" class="timer">
      <div>Game Tick {{ gameTick }}</div>
      <div>True Tick {{ trueTick }}</div>
      <div>Status {{ combatStatus }}</div>
    </div>
    <CharacterStatus
      :character="combat.h1"
      :gameTick="gameTick"
      class="statusWindow-position1"
      :class="showCombatStatus ? 'onscreen-left' : ''"
    />
    <CharacterStatus
      :character="combat.m1"
      :gameTick="gameTick"
      class="statusWindow-position2"
      :class="showCombatStatus ? 'onscreen-right' : ''"
    />
    <div class="buttonBox">
      <div class="button" v-on:click="exitCombat">Leave Combat</div>
      <div class="button" v-on:click="pauseCombat(combat)">Pause</div>
      <div class="button" v-on:click="unpauseCombat(combat)">Play</div>
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
