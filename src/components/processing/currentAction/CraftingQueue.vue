<script setup lang="ts">
import { useProcessingManagerStore } from '@/stores/processingManager';
import { ProcessingLocation } from '@/utils/enums';
import { computed } from 'vue';
import CraftingQueueItem from './CraftingQueueItem.vue';
import { getQueueLength, cancelQueuedItem } from '@/utils/processing';

const props = defineProps<{
  location: ProcessingLocation;
}>();

const store = useProcessingManagerStore();
const queue = computed(() => store.getInstance(props.location)?.processingQueue);
const queueLength = computed(() => getQueueLength(queue));

const cancel = (itemId: string) => {
  cancelQueuedItem(props.location, queue, itemId);
};
</script>

<template>
  <div class="CraftingQueue">
    <div class="label">{{ queueLength === -1 ? 'infinite' : queueLength }} items in queue</div>
    <ul class="queue">
      <li v-for="command in queue" :key="command.item.id">
        <CraftingQueueItem v-on:click="() => cancel(command.item.id)" :item="command" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.label {
  padding: 4px 0;
  color: var(--t-c-black-2);
}

.queue {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
