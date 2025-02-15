<script setup lang="ts">
import type { CombatInstance } from '@/types/CombatInstance';
import CharacterRenderer from '@/components/combat/CharacterRenderer.vue';
import { computed } from 'vue';
const props = defineProps<{
  combat: CombatInstance,
}>()

const showCombat = computed(() => {
  return props.combat.status === 'ongoing';
})
</script>

<template>
  <div class="CombatRenderer">
    <div class="platform-position1" :class="showCombat ? 'onscreen-position1' : ''">
      <div class="platform"></div>
      <CharacterRenderer class="on-platform" :character="combat.character1" />
    </div>
    <div class="platform-position2" :class="showCombat ? 'onscreen-position2' : ''">
      <div class="platform"></div>
      <CharacterRenderer class="on-platform" :character="combat.character2" />
    </div>
  </div>
</template>

<style scoped>
.CombatRenderer {
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
  transform: rotateX(70deg)
}

.platform-position1 {
  transition: left 1s ease;
  position: absolute;
  bottom: -20px;
  left: -100%;
}

.onscreen-position1 {
  left: 80px;
}

.platform-position2 {
  transition: right 1s ease;
  position: absolute;
  top: 80px;
  right: -100%
}

.onscreen-position2 {
  right: 80px;
}

.on-platform,
.sprite {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
