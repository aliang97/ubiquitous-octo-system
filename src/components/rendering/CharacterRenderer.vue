<script setup lang="ts">
import AnimatedSprite from '@/components/rendering/AnimatedSprite.vue';
import type { RenderableEntity } from '@/types';
import { computed } from 'vue';
import ParticleRenderer from '../rendering/ParticleRenderer.vue';

const props = defineProps<{
  character: RenderableEntity;
}>();

const defaultAnimation = computed(() => props.character.defaultAnimation || 'idle');
const currentAnimation = computed(() => props.character.currentAnimation || defaultAnimation.value);
const animationIsPaused = computed(() => props.character.pauseAnimations);
</script>

<template>
  <div class="CharacterRenderer">
    <ParticleRenderer :c="character" />
    <template v-if="character.animations">
      <div class="debug">
        <div>{{ currentAnimation }}</div>
        <div>{{ animationIsPaused }}</div>
      </div>
      <template v-for="(spriteProps, name) in props.character.animations">
        <AnimatedSprite
          v-if="name === currentAnimation"
          v-bind="spriteProps"
          :key="name"
          :paused="animationIsPaused"
        />
      </template>
    </template>
    <template v-else>
      <div class="spritePlaceholder">{{ character.name }}</div>
    </template>
  </div>
</template>

<style scoped>
.CharacterRenderer {
  position: absolute;
}

.debug {
  color: black;
  position: absolute;
  top: -80px;
  left: 0;
}

.spritePlaceholder {
  height: 80px;
  width: 80px;
  background-color: navy;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.takeHit {
  color: black;
  font-weight: 700;
}

.target-self {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
