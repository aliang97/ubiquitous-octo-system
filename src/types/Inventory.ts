import type { ItemEntity } from '@/types/ItemEntity';

export type Inventory = {
  [key: string]: {
    itemEntity: ItemEntity,
    quantity: number,
  }
}
