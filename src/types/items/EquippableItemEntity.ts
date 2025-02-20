import type { CraftableItemEntity, Range } from '@/types';
import { EquippableItemType } from '@/utils/enums';
import type { EquipmentAffix, EquipmentAffixRange, ComputedStat } from './misc';

export interface EquippableItemEntity extends CraftableItemEntity {
  itemLevel: number;
  quality: number;
  requirements: {
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
  type: EquippableItemType;

  // Affixes which are a fixed part of the base item
  implicitAffixes?: EquipmentAffix[];

  // Affixes which can be modified by regular crafting
  explicitAffixes?: EquipmentAffix[];

  // Resolve all of the local affixes into global stats
  //  and copy over any global stats from global affixes
  // All final stats that effect the character should be in here
  computedStats?: ComputedStat[];
}

export interface EquippableItemTemplate extends CraftableItemEntity {
  itemLevel: Range;
  quality: Range;
  requirements: {
    strength?: number;
    dexterity?: number;
    intelligence?: number;
  };
  type: EquippableItemType;

  implicitAffixes?: EquipmentAffixRange[];
}
