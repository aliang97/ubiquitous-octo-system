<script setup lang="ts">
// import type { LocationEntity } from '@/types/LocationEntity';
import type { CombatInstance } from '@/types/CombatInstance';
defineProps<{
  // locationProfile: LocationEntity,
  combat: CombatInstance,
}>()
</script>

<template>
  <div class="CombatRenderer">
    <div class="platform-position1">
      <div class="platform"></div>
      <combat.character1.rendererComponent class="on-platform" :renderQueue="combat.c1RenderQueue"/>
    </div>
    <div class="platform-position2">
      <div class="platform"></div>
      <combat.character2.sprite class="sprite" />
    </div>
  </div>
</template>

<style scoped>
.CombatRenderer {
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
  position: absolute;
  bottom: -20px;
  left: 80px;
}

.platform-position2 {
  position: absolute;
  top: 80px;
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
