import type { EquippableItemEntity } from './EquippableItemEntity';
import type { ItemWithQuantity } from './misc';

export interface Inventory {
  materials: Record<string, ItemWithQuantity>; // ID is not randomly generated for these fungible items

  equipment: EquippableItemEntity[];
  maxEquipmentCount: number;
}
