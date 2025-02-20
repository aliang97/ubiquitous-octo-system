import { useProcessingManagerStore } from '@/stores/processingManager';
import type { ProcessingLocation } from '../enums';
import { computed } from 'vue';
import { SERVER_TICK_RATE_MS, msToTicks } from '@/utils';
import { generateItemFromTemplate } from '@/data/items/baseEquippableItems';
import type { EquippableItemTemplate } from '@/types';
import { canCraftEquipment } from './craftPrechecks';
import { useInventoryStore } from '@/stores/inventory';

export function startProcessing(location: ProcessingLocation) {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.getInstance(location)).value;
  if (instance === undefined) {
    console.error('this should literally never happen');
    return;
  }

  const firstItem = computed(() => instance.processingQueue[0]);
  if (firstItem.value === undefined) {
    store.removeInstanceByLocation(location);
    console.error('Error: first item in processingQueue is undefined');
    return;
  }

  if (!canCraftEquipment(firstItem.value)) {
    store.removeInstanceByLocation(location);
    console.error('Error: unable to craft first item in processingQueue');
    return;
  }

  // queue up the first item
  instance.ticksUntilNextAction = msToTicks(instance.processingQueue[0]?.item.craftingTimeMS || 0);

  // start the clock
  instance.clockId = setInterval(() => instanceStep(location), SERVER_TICK_RATE_MS);
}

export function instanceStep(location: ProcessingLocation) {
  const inventoryStore = useInventoryStore();
  const processingStore = useProcessingManagerStore();
  const instance = computed(() => processingStore.getInstance(location)).value;
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
  const outputTemplate = instance.processingQueue[0].item as EquippableItemTemplate;
  const newItem = generateItemFromTemplate({ type: outputTemplate.type });
  console.log('crafted item: ' + newItem.name);
  inventoryStore.addEquipment(newItem);
  inventoryStore.removeMaterials(outputTemplate.craftingRecipe);

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
    processingStore.removeInstanceByLocation(instance.location);
    return;
  }

  // Set up the next craft
  const nextCraft = instance.processingQueue[0];
  if (canCraftEquipment(nextCraft)) {
    instance.ticksUntilNextAction = msToTicks(instance.processingQueue[0].item.craftingTimeMS || 0);
  } else {
    // Remove instance if we can't execute the next craft
    processingStore.removeInstanceByLocation(instance.location);
    return;
  }
}

export function endProcessing(location: ProcessingLocation) {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.getInstance(location)).value;
  if (instance === undefined) {
    return;
  }

  clearInterval(instance.clockId);
}
