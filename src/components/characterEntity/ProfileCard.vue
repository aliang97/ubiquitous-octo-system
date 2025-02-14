<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import type { CharacterEntity } from '@/types/CharacterEntity.ts'
defineProps<{
  profile: CharacterEntity
  buttonText?: string
}>()
const hasOnClick = computed(
  () => !!getCurrentInstance()?.vnode.props?.onClick
);
</script>

<template>
  <div class="card" :class="{'is-hoverable': hasOnClick}">
    <div class="top">
      <div class="icon"></div>
      <div class="topSummary">
        <div class="class">{{ profile.class }}</div>
        <div class="name">{{ profile.name }}</div>
      </div>

      <button v-if="buttonText">{{ buttonText }}</button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-soft)
}

.card.is-hoverable {
  border: 2px solid var(--color-background-soft);
}

.card.is-hoverable:hover {
  cursor: pointer;
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
  background-color: goldenrod;
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

button {
  padding: 6px 16px;
  border-radius: 4px;
  border: 1px solid white;
  color: white;
}

button:hover {
  background-color: var(--color-background-mute);
}
</style>
