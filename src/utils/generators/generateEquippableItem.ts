import type { EquippableItemEntity } from '@/types';
import { Rarity, EquippableItemType } from '@/utils/enums';
import { generateId } from '@/utils/generators';

type generateEquippableItemArgs = {
  type?: EquippableItemType;
};

// TODO: implement
export const generateEquippableItem = (args: generateEquippableItemArgs): EquippableItemEntity => {
  if (args.type === EquippableItemType.Helmet) {
    return basicHelmet;
  }

  if (args.type === EquippableItemType.Sword) {
    return basicSword;
  }

  return basicHelmet;
};

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
