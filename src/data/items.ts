import type { ItemEntity } from '@/types';
import { Rarity } from '@/utils/enums';
import { generateId } from '@/utils/generators';

export const SlimeCore: ItemEntity = {
  id: generateId(),
  name: 'Slime Core',
  rarity: Rarity.Common,
};

export const CrookCorpse: ItemEntity = {
  id: generateId(),
  name: 'Crook Corpse',
  rarity: Rarity.Common,
};

export const BossCorpse: ItemEntity = {
  id: generateId(),
  name: 'Boss Corpse',
  rarity: Rarity.Common,
};
