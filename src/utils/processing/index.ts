import { useProcessingManagerStore } from '@/stores/processingManager';
import type { ProcessingLocation } from '../enums';
import { computed } from 'vue';
import { SERVER_TICK_RATE_MS, msToTicks } from '@/utils';
import { generateBasicEquippableItem } from '@/data/items/baseEquippableItems';
import type { EquippableItemEntity } from '@/types';

export function startProcessing(location: ProcessingLocation) {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.instancesByLocation[location]).value;
  if (instance === undefined) {
    return;
  }

  // start the clock
  instance.clockId = setInterval(() => instanceStep(location), SERVER_TICK_RATE_MS);

  // queue up the first item
  instance.ticksUntilNextAction = msToTicks(instance.outputItem.craftingTimeMS);
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
  const outputItem = instance.outputItem as EquippableItemEntity;
  const newItem = generateBasicEquippableItem({ type: outputItem.type });
  console.log('crafted: ');
  console.log(newItem);

  // TODO: add to inventory

  // TODO: before next craft checks
  //  -inventory space
  //  -ingredients

  instance.ticksUntilNextAction = msToTicks(outputItem.craftingTimeMS);

  if (instance.amountLoops > 0) {
    instance.currentLoop++;
    if (instance.currentLoop === instance.amountLoops) {
      store.removeInstanceByLocation(instance.location);
    }
  }
}

export async function endProcessing(location: ProcessingLocation) {
  const store = useProcessingManagerStore();
  const instance = computed(() => store.instancesByLocation[location]).value;
  if (instance === undefined) {
    return;
  }

  clearInterval(instance.clockId);
}
