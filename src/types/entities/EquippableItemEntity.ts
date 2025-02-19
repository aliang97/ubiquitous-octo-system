import type { ItemEntity, Range } from '@/types';
import { EquippableItemType, AffixType, StatType, StatScope } from '@/utils/enums';

export interface AffixStatRange {
  type: StatType;
  scope: StatScope;
  range: Range;
}

export interface AffixStat extends AffixStatRange {
  magnitude: number;
}

interface _EquipmentAffix {
  type: AffixType;
  tier: number;
  name: string;
  hidden?: boolean;
}

export interface EquipmentAffix extends _EquipmentAffix {
  stats: AffixStat[];
}

export interface EquipmentAffixRange extends _EquipmentAffix {
  stats: AffixStatRange[];
}

export interface EquippableItemEntity extends ItemEntity {
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
  computedStats?: Omit<AffixStat, 'range'>[];
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

  implicitAffixes?: EquipmentAffixRange[];
}
