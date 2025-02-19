<script setup lang="ts">
import type { EquippableItemTemplate } from '@/types';
import { PrintAffixLabel } from '@/utils/items';

defineProps<{
  template: EquippableItemTemplate;
}>();
</script>

<template>
  <div class="ImplicitAffixes">
    <div v-for="affix in template.implicitAffixes" :key="affix.name">
      <PrintAffixLabel :affix="affix" />
    </div>
  </div>
</template>

<style scoped>
.ImplicitAffixes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
</style>
