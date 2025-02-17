<script setup lang="ts">
import AnimatedSprite from '../combat/AnimatedSprite.vue';
import QuestionMarkIcon from '@/assets/icons/question-mark.png';
import { EnemyType } from '@/utils/enums';
import { generateEnemy } from '@/utils/generators';

const props = defineProps<{
  enemyType: EnemyType;
  isHighlighted?: boolean;
}>();

const monsterEntity = generateEnemy({ type: props.enemyType });
</script>

<template>
  <div class="MonsterCard" :class="{ 'is-highlighted': isHighlighted }">
    <div class="top">
      <div class="icon">
        <template v-if="monsterEntity.animations?.['idle']">
          <AnimatedSprite v-bind="monsterEntity.animations['idle']" :size="{ x: 24, y: 24 }" />
        </template>
        <template v-else>
          <div
            class="placeholderIcon"
            :style="{ 'background-image': `url(${QuestionMarkIcon})` }"
          ></div>
        </template>
      </div>

      <div class="topSummary">
        <div class="name">{{ monsterEntity.name }}</div>
      </div>

      <div class="buttonBox">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.MonsterCard {
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-background-soft);
}

.MonsterCard.is-highlighted {
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
