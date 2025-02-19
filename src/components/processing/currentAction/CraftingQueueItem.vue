<script setup lang="ts">
import type { ProcessingQueueItem } from '@/types/instances/ProcessingInstance';
defineProps<{
  item: ProcessingQueueItem;
}>();
</script>

<template>
  <button class="CraftingQueueItem">
    <div class="removePrompt">
      <div class="removePromptBackground"></div>
      <div class="highlight">
        <div class="xIcon"></div>
      </div>
      <div class="removePromptLabel">Cancel Order</div>
    </div>
    <div class="highlight">
      <img :src="item.item.spriteSrc" />
    </div>
    <div class="label">
      {{ item.item.name }}
      <span class="color-text-soft"> x</span>
      <span class="">{{ item.quantity }}</span>
    </div>
  </button>
</template>

<style scoped>
.CraftingQueueItem {
  position: relative;
  background-color: var(--t-c-black-3);
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding-right: 16px;
  border-radius: 999px;
  overflow: hidden;
}

.CraftingQueueItem:hover {
  cursor: pointer;
}

.CraftingQueueItem:hover .removePrompt {
  opacity: 1;
}

.removePrompt {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.removePromptBackground {
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--t-c-white-4);
}

.xIcon {
  color: red;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.xIcon::before,
.xIcon::after {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  width: 16px;
  height: 2px;
  background-color: red;
}

.xIcon::after {
  transform: translate(-50%, -50%) rotate(45deg);
}

.xIcon::before {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.removePromptLabel {
  font-size: 16px;
  color: black;
}

.highlight {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background-color: var(--color-rarity-common);
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  height: 22px;
  width: 22px;
  border-radius: 50%;
}

.label {
  font-size: 16px;
  color: var(--color-text-2);
}
</style>
