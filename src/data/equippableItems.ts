import {
  EquippableItemEntity,
  type EquippableItemEntityArgs,
  EquippableItemType,
  RarityType,
  type EquipmentEffects,
} from '@/scripts/entities';

export type GenerateEquippableItemParams = {
  name?: string;
  rarity?: RarityType;
  type?: EquippableItemType;
  effects?: EquipmentEffects;
};
export const generateRandomEquippableItem = (fixedParams: GenerateEquippableItemParams) => {
  const params: GenerateEquippableItemParams = {};

  // Determine rarity;
  if (fixedParams.rarity) {
    params.rarity = fixedParams.rarity;
  } else {
    params.rarity = RarityType.Common;
  }

  // Determine item type
  if (fixedParams.type) {
    params.type = fixedParams.type;
  } else {
    params.type = EquippableItemType.Helmet;
  }

  // Determine name
  if (fixedParams.name) {
    params.name = fixedParams.name;
  } else {
    params.name = 'albert';
  }

  return new EquippableItemEntity(params as EquippableItemEntityArgs);
};

export const basicHelmet = new EquippableItemEntity({
  name: 'Bucket',
  rarity: RarityType.Common,
  type: EquippableItemType.Helmet,
  effects: {
    baseHitPoints: 7,
  },
});

export const basicSword = new EquippableItemEntity({
  name: 'Shortsword',
  rarity: RarityType.Common,
  type: EquippableItemType.Sword,
  effects: {
    attacksPerSecond: 0.9,
    hitDamageMaximum: 2,
    hitDamageMinimum: 4,
  },
});
