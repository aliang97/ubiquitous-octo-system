<script setup lang="ts">
import type { EquippableItemTemplate } from '@/types';

const props = defineProps<{
  template: EquippableItemTemplate;
}>();

const requirements: string[] = [];
Object.entries(props.template.requirements).forEach(([stat, amount]) => {
  if (amount > 0) {
    requirements.push(`${amount} ${stat.slice(0, 3)}`);
  }
});
</script>

<template>
  <div class="ItemRequirements">
    <span class="color-text-muted">Requires: </span>
    <span class="">{{ requirements.join(', ') }}</span>
  </div>
</template>

<style scoped></style>
