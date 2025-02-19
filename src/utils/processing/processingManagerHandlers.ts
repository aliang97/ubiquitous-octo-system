import { useProcessingManagerStore } from '@/stores/processingManager';
import type { ProcessingLocation } from '../enums';
import { computed } from 'vue';
import { SERVER_TICK_RATE_MS, msToTicks } from '@/utils';
import { generateBasicEquippableItem } from '@/data/items/baseEquippableItems';
import type { EquippableItemTemplate } from '@/types';

export function startProcessing(location: ProcessingLocation) {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.instancesByLocation[location]).value;
  if (instance === undefined) {
    return;
  }

  // start the clock
  instance.clockId = setInterval(() => instanceStep(location), SERVER_TICK_RATE_MS);

  // queue up the first item
  instance.ticksUntilNextAction = msToTicks(instance.processingQueue[0]?.item.craftingTimeMS || 0);
}

export function instanceStep(location: ProcessingLocation) {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.instancesByLocation[location]).value;
  if (instance === undefined) {
    return;
  }

  instance.trueTick++;

  if (instance.isPaused) {
    return;
  }

  instance.gameTick++;

  // Still crafting the last item
  if (instance.ticksUntilNextAction > 0) {
    instance.ticksUntilNextAction--;
    return;
  }

  // generate a new output item
  // TODO: handle not EquippableItemEntity
  const outputItem = instance.processingQueue[0].item as EquippableItemTemplate;
  const newItem = generateBasicEquippableItem({ type: outputItem.type });
  console.log('crafted: ');
  console.log(newItem);

  // TODO: add to inventory

  // Decrement the ProcessingQueue if not infinite mode (quantity !== -1)
  if (instance.processingQueue[0].quantity > 0) {
    instance.processingQueue[0].quantity--;
    if (instance.processingQueue[0].quantity <= 0) {
      // Move on to the next item if we produce quota for the current item
      instance.processingQueue.shift();
    }
  }

  // Remove the instance if the queue is finished
  if (instance.processingQueue.length <= 0 || instance.processingQueue[0].quantity === 0) {
    store.removeInstanceByLocation(instance.location);
    return;
  }

  // Set up the next craft

  // TODO: before next craft checks
  //  -inventory space
  //  -ingredients

  instance.ticksUntilNextAction = msToTicks(instance.processingQueue[0].item.craftingTimeMS || 0);
}

export async function endProcessing(location: ProcessingLocation) {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.instancesByLocation[location]).value;
  if (instance === undefined) {
    return;
  }

  clearInterval(instance.clockId);
}
