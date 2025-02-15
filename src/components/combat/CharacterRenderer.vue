<script setup lang="ts">
import AnimatedSprite from '@/components/combat/AnimatedSprite.vue';
import CSSAnimation from '@/components/combat/CSSAnimation.vue';
import type { CharacterEntity } from '@/types/CharacterEntity';
import { computed } from 'vue';
const props = defineProps<{
  character: CharacterEntity,
}>()
const renderList = computed(() => props.character.renderList);
const spriteProps = computed(() => props.character.spriteProps);
</script>

<template>
<div class="CharacterRenderer">
  <template v-if="spriteProps">
    <AnimatedSprite v-bind="spriteProps"/>
  </template>
  <template v-else>
    <div class="PLACEHOLDER_SPRITE">{{ character.name }}</div>
  </template>
  <template v-for="instruction in renderList" :key="instruction.id">
    <CSSAnimation v-if="instruction.command === 'takeHit'" class="target-self" animationId="float-up" :animationDurationMS="800">
      <div class="takeHit">-{{ (instruction.params as any).damage }}</div>
    </CSSAnimation>
  </template>
</div>
</template>

<style scoped>
.CharacterRenderer {
  position: absolute;
}

.PLACEHOLDER_SPRITE {
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
