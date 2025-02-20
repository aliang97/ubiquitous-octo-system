import type { ItemEntity } from './ItemEntity';
import type { ItemWithQuantity } from './misc';

export interface CraftableItemEntity extends ItemEntity {
  craftingTimeMS: number;
  craftingRecipe: ItemWithQuantity[];
}
