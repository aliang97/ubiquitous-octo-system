<script setup lang="ts">
import { useProcessingManagerStore } from '@/stores/processingManager';
import { ProcessingLocation } from '@/utils/enums';
import { computed } from 'vue';

const props = defineProps<{
  location: ProcessingLocation;
}>();

const store = useProcessingManagerStore();
const queue = computed(() => store.instancesByLocation[props.location]?.processingQueue);
const queueLength = computed(() => {
  if (queue.value === undefined) {
    return 0;
  }
  return queue.value.reduce((sum, item) => sum + item.quantity, 0);
});
</script>

<template>
  <div class="CraftingQueue">
    <div class="label">{{ queueLength === -1 ? 'infinite' : queueLength }} items in queue</div>
    <ul class="queue">
      <li v-for="item in queue" :key="item.item.id">{{ item.item.name }} - {{ item.quantity }}</li>
    </ul>
  </div>
</template>

<style scoped>
.label {
  padding: 4px 0;
  color: var(--t-c-black-2);
}
</style>
