<script setup lang="ts">
import type { EquippableItemTemplate } from '@/types';

const props = defineProps<{
  template: EquippableItemTemplate;
}>();

const qualityRange = `(${props.template.quality.min}-${props.template.quality.max})`;
</script>

<template>
  <div class="QualityRange">
    <span class="color-text-muted">Quality: </span>
    <span class="">{{ qualityRange }}%</span>
  </div>
</template>

<style scoped></style>
