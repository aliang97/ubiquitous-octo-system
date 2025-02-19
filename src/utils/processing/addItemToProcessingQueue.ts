import { useProcessingManagerStore } from '@/stores/processingManager';
import type { CraftableItemEntity } from '@/types';
import { computed } from 'vue';
import { ProcessingLocation } from '../enums';
import { generateProcessingInstance } from '../generators/generateInstance';
import { msToTicks } from '..';

export const addItemToProcessingQueue = async (
  location: ProcessingLocation,
  item: CraftableItemEntity,
  quantity: number,
) => {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.instancesByLocation[location]);

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
