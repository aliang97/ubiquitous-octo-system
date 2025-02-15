<script setup lang="ts">
import type { CharacterEntity } from '@/types/CharacterEntity.ts';

import AnimatedSprite from '../combat/AnimatedSprite.vue';
import QuestionMarkIcon from '@/assets/icons/question-mark.png';

defineProps<{
  profile: CharacterEntity,
  isHighlighted?: boolean,
}>()
</script>

<template>
  <div class="card" :class="{'is-highlighted': isHighlighted}">
    <div class="top">
      <div class="icon">
        <template v-if="profile.spriteProps">
          <AnimatedSprite v-bind="profile.spriteProps" :size="{x: 24, y: 24}" />
        </template>
        <template v-else>
          <div
            class="placeholderIcon"
            :style="{'background-image': `url(${QuestionMarkIcon})`}"
          ></div>
        </template>
      </div>

      <div class="topSummary">
        <div class="class">{{ profile.class }}</div>
        <div class="name">{{ profile.name }}</div>
      </div>

      <div class="buttonBox">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-background-soft);
}

.card.is-highlighted {
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
