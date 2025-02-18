import type { ItemEntity } from '@/types';

export interface InventoryItem {
  itemEntity: ItemEntity;
  quantity: number;
}

export type Inventory = Record<string, InventoryItem>;
