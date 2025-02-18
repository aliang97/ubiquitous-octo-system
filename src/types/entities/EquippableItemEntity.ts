import type { ItemEntity, Range } from '@/types';
import { EquippableItemType, AffixType } from '@/utils/enums';

export type EquipmentAffixes = Partial<Record<AffixType, number>>;
export type EquipmentAffixRanges = Partial<Record<AffixType, Range>>;

export interface EquippableItemEntity extends ItemEntity {
  itemLevel: number;
  quality: number;
  requirements: {
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
  type: EquippableItemType;

  implicitAffixes?: EquipmentAffixes;
  explicitAffixes?: EquipmentAffixes;
}

export interface EquippableItemTemplate {
  name: string;
  spriteSrc?: string;
  itemLevel: Range;
  quality: Range;
  requirements: {
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
  type: EquippableItemType;

  implicitAffixes?: EquipmentAffixRanges;
}
