<script setup lang="ts">
import { useProcessingManagerStore } from '@/stores/processingManager';
import { ProcessingLocation } from '@/utils/enums';
import { computed } from 'vue';
import CraftingQueueItem from './CraftingQueueItem.vue';
import { msToTicks } from '@/utils';

const props = defineProps<{
  location: ProcessingLocation;
}>();

const store = useProcessingManagerStore();
const instance = computed(() => store.instancesByLocation[props.location]);
const queue = computed(() => store.instancesByLocation[props.location]?.processingQueue);
const queueLength = computed(() => {
  if (queue.value === undefined) {
    return 0;
  }
  return queue.value.reduce((sum, item) => sum + item.quantity, 0);
});

const cancelQueuedItem = (itemId: string) => {
  if (queue.value === undefined) {
    return;
  }

  const index = queue.value.findIndex((el) => el.item.id === itemId);
  queue.value.splice(index, 1);
  if (queue.value.length <= 0) {
    store.removeInstanceByLocation(props.location);
  } else {
    if (instance.value === undefined) {
      return;
    }
    instance.value.ticksUntilNextAction = msToTicks(queue.value[0].item.craftingTimeMS);
  }
};
</script>

<template>
  <div class="CraftingQueue">
    <div class="label">{{ queueLength === -1 ? 'infinite' : queueLength }} items in queue</div>
    <ul class="queue">
      <li v-for="command in queue" :key="command.item.id">
        <CraftingQueueItem v-on:click="() => cancelQueuedItem(command.item.id)" :item="command" />
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
