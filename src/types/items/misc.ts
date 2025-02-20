import type { ItemEntity } from './ItemEntity';
import { StatType, StatScope, AffixType } from '@/utils/enums';
import type { Range } from '@/types';

export interface ItemWithQuantity {
  item: ItemEntity;
  quantity: number;
}

export interface AffixStatRange {
  type: StatType;
  scope: StatScope;
  range: Range;
}

export interface AffixStat extends AffixStatRange {
  magnitude: number;
}

export type ComputedStat = Omit<AffixStat, 'range'>;

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
