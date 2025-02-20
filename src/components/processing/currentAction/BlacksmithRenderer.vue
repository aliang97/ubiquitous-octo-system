<script setup lang="ts">
import { CharacterStatus, CharacterType, ProcessingLocation } from '@/utils/enums';
import bored2 from '@/assets/characters/blacksmith/bored_02_larger.png';
import work1 from '@/assets/characters/blacksmith/work_01_larger.png';
import { computed } from 'vue';
import { useProcessingManagerStore } from '@/stores/processingManager';
import CharacterRenderer from '@/components/rendering/CharacterRenderer.vue';

const store = useProcessingManagerStore();
const instance = computed(() => store.getInstance(ProcessingLocation.Blacksmith));
const c = computed(() => ({
  id: 'char-blacksmith',
  name: 'Blacksmith',
  animations: {
    idle: {
      spriteSrc: bored2,
      size: { x: 180, y: 180 },
      frames: 10,
      durationMS: 1000,
    },
    work: {
      spriteSrc: work1,
      size: { x: 180, y: 180 },
      frames: 5,
      durationMS: 1000,
    },
  },
  defaultAnimation: 'idle',
  currentAnimation: instance.value ? 'work' : 'idle',
  actionLockoutDurationMS: 0,
  characterStatus: CharacterStatus.Alive,
  characterType: CharacterType.Hero,
  currentHitPoints: 1,
  particleEffects: [],
}));
</script>

<template>
  <CharacterRenderer :character="c" />
</template>

<style scoped></style>
