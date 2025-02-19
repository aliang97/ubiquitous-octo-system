<script setup lang="ts">
import type { EquippableItemTemplate } from '@/types';

const props = defineProps<{
  template: EquippableItemTemplate;
}>();

const itemLevelRange = `(${props.template.itemLevel.min}-${props.template.itemLevel.max})`;
</script>

<template>
  <div class="ItemLevelRange">
    <span class="color-text-muted">Item Level: </span>
    <span class="">{{ itemLevelRange }}</span>
  </div>
</template>

<style scoped></style>
