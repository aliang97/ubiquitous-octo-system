import { useInventoryStore } from '@/stores/inventory';
import type { ProcessingQueueItem } from '@/types/instances/ProcessingInstance';

export const canCraftEquipment = (order: ProcessingQueueItem) => {
  const inventory = useInventoryStore();
  const recipe = order.item.craftingRecipe;

  const hasIngredientsForCraft = inventory.hasMaterials(recipe);
  if (!hasIngredientsForCraft) {
    return false;
  }

  const hasInventorySpace = inventory.canAddEquipment();
  // - Check if we have inventory space for a new equipment
  if (!hasInventorySpace) {
    return false;
  }

  return true;
};
