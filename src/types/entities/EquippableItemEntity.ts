import type { ItemEntity } from '@/types';
import { EquippableItemType } from '@/utils';

export type EquipmentEffects = Record<string, number>;

export interface EquippableItemEntity extends ItemEntity {
  type: EquippableItemType;
  effects?: EquipmentEffects;
}
