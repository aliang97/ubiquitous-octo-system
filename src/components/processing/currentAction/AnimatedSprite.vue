<script setup lang="ts">
import AnimatedSprite from '@/components/combat/AnimatedSprite.vue';
import bored2 from '@/assets/characters/blacksmith/bored_02_larger.png';
import work1 from '@/assets/characters/blacksmith/work_01_larger.png';
import { useProcessingManagerStore } from '@/stores/processingManager';
import { computed } from 'vue';
import { ProcessingLocation } from '@/utils/enums';
const spriteDataWork = {
  spriteSrc: work1,
  size: { x: 180, y: 180 },
  frames: 5,
  durationMS: 1000,
};
const spriteDataIdle = {
  spriteSrc: bored2,
  size: { x: 180, y: 180 },
  frames: 10,
  durationMS: 1000,
};

const processingManager = useProcessingManagerStore();
const instance = computed(
  () => processingManager.instancesByLocation[ProcessingLocation.Blacksmith],
);
</script>

<template>
  <div class="SpriteContainer">
    <AnimatedSprite v-show="!instance" v-bind="spriteDataIdle" />
    <AnimatedSprite v-show="instance" v-bind="spriteDataWork" />
  </div>
</template>

<style scoped>
.SpriteContainer {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
