<script setup lang="ts">
import CharacterRenderer from '@/components/rendering/CharacterRenderer.vue';
import type { CombatInstance } from '@/types';
import { CombatInstanceStatus } from '@/utils/enums';
import { computed } from 'vue';
const props = defineProps<{
  combat: CombatInstance;
}>();

const showCombat = computed(() => {
  return props.combat.status === CombatInstanceStatus.Ongoing;
});
</script>

<template>
  <div class="CombatScene">
    <div class="platform-position1" :class="showCombat ? 'onscreen-position1' : ''">
      <div class="platform"></div>
      <CharacterRenderer class="on-platform" :character="combat.h1" :combat="combat" />
    </div>
    <div class="platform-position2" :class="showCombat ? 'onscreen-position2' : ''">
      <div class="platform"></div>
      <CharacterRenderer class="on-platform" :character="combat.m1" :combat="combat" />
    </div>
  </div>
</template>

<style scoped>
.CombatScene {
  z-index: 5;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.platform {
  border: 2px solid black;
  height: 180px;
  width: 180px;
  background-color: rgba(180, 180, 180, 1);
  border-radius: 50%;
  transform: rotateX(70deg);
}

.platform-position1 {
  transition: transform 1s ease;
  position: absolute;
  bottom: -20px;
  left: 40px;
  transform: translateX(-150%);
}

.onscreen-position1 {
  transform: translateX(0);
}

.platform-position2 {
  transition: transform 1s ease;
  position: absolute;
  top: 80px;
  right: 40px;
  transform: translateX(150%);
}

.onscreen-position2 {
  transform: translateX(0);
}

.on-platform,
.sprite {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
