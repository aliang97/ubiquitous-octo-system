import type { ItemEntity } from './ItemEntity';

interface CraftingIngredient {
  item: ItemEntity;
  quantity: number;
}

export interface CraftableItemEntity extends ItemEntity {
  craftingTimeMS: number;
  craftingRecipe: CraftingIngredient[];
}
