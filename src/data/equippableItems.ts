import type { EquippableItemEntity } from '@/types';
import { Rarity, EquippableItemType, generateId } from '@/utils';

export const basicHelmet: EquippableItemEntity = {
  id: generateId(),
  name: 'Bucket',
  rarity: Rarity.Common,
  type: EquippableItemType.Helmet,
  effects: {
    baseHitPoints: 7,
  },
};

export const basicSword: EquippableItemEntity = {
  id: generateId(),
  name: 'Shortsword',
  rarity: Rarity.Common,
  type: EquippableItemType.Sword,
  effects: {
    attacksPerSecond: 0.9,
    hitDamageMaximum: 2,
    hitDamageMinimum: 4,
  },
};
