import { useProcessingManagerStore } from '@/stores/processingManager';
import type { CraftableItemEntity } from '@/types';
import { computed } from 'vue';
import { ProcessingLocation } from '../enums';
import { generateProcessingInstance } from '../generators/generateInstance';
import { msToTicks } from '..';
import type { ProcessingQueueItem } from '@/types/instances/ProcessingInstance';
import type { Ref } from 'vue';

type QueueRef = Ref<ProcessingQueueItem[] | undefined>;

export const addItemToProcessingQueue = (
  location: ProcessingLocation,
  item: CraftableItemEntity,
  quantity: number,
) => {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.getInstance(location));

  // If there is no existing ProcessingInstance
  if (instance.value === undefined) {
    // Then we must make a new ProcessingInstance
    const p = generateProcessingInstance({ location });
    p.processingQueue.push({ item, quantity });
    store.addInstance(p);
    return;
  }

  // If adding 'infinite' quantity item, delete existing queue
  if (quantity === -1) {
    instance.value.processingQueue = [];
    instance.value.ticksUntilNextAction = msToTicks(item.craftingTimeMS);
    instance.value.processingQueue.push({ item, quantity });
    return;
  }

  // If adding and existing queue contains 'infinite' quantity item,
  //  delete existing queue
  const [lastItem] = instance.value.processingQueue.slice(-1);
  if (lastItem.quantity === -1) {
    instance.value.processingQueue = [];
    instance.value.ticksUntilNextAction = msToTicks(item.craftingTimeMS);
    instance.value.processingQueue.push({ item, quantity });
    return;
  }

  // Add on to the last item quantity if it is the same id
  if (lastItem.item.id === item.id) {
    lastItem.quantity += quantity;
    return;
  }

  // Otherwise just append to queue
  instance.value.processingQueue.push({ item, quantity });
};

export const getQueueLength = (queue: QueueRef) => {
  if (queue.value === undefined) {
    return 0;
  }
  return queue.value.reduce((sum, item) => sum + item.quantity, 0);
};

export const cancelQueuedItem = (location: ProcessingLocation, queue: QueueRef, itemId: string) => {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.getInstance(location));
  if (queue.value === undefined) {
    return;
  }

  const index = queue.value.findIndex((el) => el.item.id === itemId);
  queue.value.splice(index, 1);
  if (queue.value.length <= 0) {
    store.removeInstanceByLocation(location);
  } else {
    if (instance.value === undefined) {
      return;
    }
    instance.value.ticksUntilNextAction = msToTicks(queue.value[0].item.craftingTimeMS);
  }
};
