<script setup lang="ts">
import CombatStatus from '@/components/characterEntity/CombatStatus.vue';
import { computed } from 'vue';
import { useOngoingCombatStore } from "@/stores/ongoingCombat";

const ongoingCombat = useOngoingCombatStore();
const currentCombat = computed(() => ongoingCombat.getCombatByLocationId('forest'));
const timer = computed(() => currentCombat.value?.tick);
const profile1 = computed(() => currentCombat.value?.character1);
const profile2 = computed(() => currentCombat.value?.character2);

function exitCombat() {
  ongoingCombat.removeCombatByLocationId('forest');
}
</script>

<template>
  <div class="window">
    <template v-if="profile1 && profile2">
      <div class="timer">Timer: {{ timer }}</div>
      <CombatStatus
        :character="profile1"
        class="statusWindow-position1"
      />
      <div class="platform platform-position1"></div>
      <div class="sprite sprite-position1"></div>
      <CombatStatus
        :character="profile2"
        class="statusWindow-position2"
      />
      <div class="platform platform-position2"></div>
      <div class="sprite sprite-position2"></div>
      <button class="exit" v-on:click="exitCombat">Leave Combat</button>
    </template>
    <template v-else>
      No combat
    </template>
  </div>
</template>

<style scoped>
.window {
  background-color: palegreen;
  width: 100%;
  height: 100%;
  position: relative;
}

.timer {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  color: black
}

.statusWindow {
  width: 200px;
  height: 60px;
  z-index: 10
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

.platform {
  border: 2px solid black;
  height: 180px;
  width: 180px;
  background-color: rgba(180, 180, 180, 1);
  border-radius: 50%;
  transform: rotateX(70deg)
}

.platform-position1 {
  position: absolute;
  bottom: -20px;
  left: 80px;
}

.platform-position2 {
  position: absolute;
  top: 80px;
  right: 80px;
}

.sprite {
  width: 40px;
  height: 80px;
}

.sprite-position1 {
  background-color: blue;
  position: absolute;
  bottom: 70px;
  left: 150px;
}

.sprite-position2 {
  background-color: red;
  position: absolute;
  top: 90px;
  right: 150px;
}

.exit {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
