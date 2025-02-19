<script setup lang="ts">
import { useProcessingManagerStore } from '@/stores/processingManager';
import ItemTemplateCard from '../ItemTemplateCard/ItemTemplateCard.vue';
import { computed } from 'vue';
import { ProcessingLocation } from '@/utils/enums';
import type { EquippableItemTemplate } from '@/types';

const props = defineProps<{
  location: ProcessingLocation;
}>();

const processingManager = useProcessingManagerStore();
const outputItem = computed(
  () => processingManager.instancesByLocation[props.location]?.outputItem as EquippableItemTemplate,
);
</script>

<template>
  <div v-if="outputItem" class="CraftingOutput">
    <ItemTemplateCard :template="outputItem" />
  </div>
</template>

<style scoped>
.CraftingOutput {
  width: 100%;
  height: 100%;
}
</style>
