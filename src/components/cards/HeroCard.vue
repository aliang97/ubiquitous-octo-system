<script setup lang="ts">
import type { HeroEntity } from '@/types';
import AnimatedSprite from '../combat/AnimatedSprite.vue';
import QuestionMarkIcon from '@/assets/icons/question-mark.png';

defineProps<{
  heroEntity: HeroEntity;
  isHighlighted?: boolean;
}>();
</script>

<template>
  <div class="HeroCard" :class="{ 'is-highlighted': isHighlighted }">
    <div class="top">
      <div class="icon">
        <template v-if="heroEntity.animations?.['idle']">
          <AnimatedSprite v-bind="heroEntity.animations['idle']" :size="{ x: 24, y: 24 }" />
        </template>
        <template v-else>
          <div
            class="placeholderIcon"
            :style="{ 'background-image': `url(${QuestionMarkIcon})` }"
          ></div>
        </template>
      </div>

      <div class="topSummary">
        <div class="class">{{ heroEntity.heroClass?.name }}</div>
        <div class="name">{{ heroEntity.name }}</div>
      </div>

      <div class="buttonBox">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.HeroCard {
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg-2);
  border: 1px solid var(--color-bg-2);
}

.HeroCard.is-highlighted {
  border-color: white;
}

.top {
  display: flex;
  gap: 16px;
  align-items: center;
}

.icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(220, 220, 220, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholderIcon {
  width: 18px;
  height: 18px;
  background-size: cover;
}

.topSummary {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-grow: 1;
}

.class {
  font-size: 12px;
  line-height: 1;
}

.name {
  color: white;
  font-size: 18px;
  line-height: 1;
}

.buttonBox {
  display: flex;
  gap: 4px;
}

:slotted(button) {
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid white;
  color: white;
}

:slotted(button:hover) {
  background-color: white;
  color: black;
  cursor: pointer;
}
</style>
