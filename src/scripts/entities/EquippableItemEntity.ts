import { RarityType, ItemEntity } from '@/scripts/entities';

export enum EquippableItemType {
  Helmet = 'ITEM_HELMET',
  Sword = 'ITEM_SWORD',
}

export type EquippableItemEntityArgs = {
  name: string;
  rarity: RarityType;
  type: EquippableItemType;
  effects?: EquipmentEffects;
};

export class EquippableItemEntity extends ItemEntity {
  effects?: EquipmentEffects;
  rarity: RarityType;
  type: EquippableItemType;

  constructor(args: EquippableItemEntityArgs) {
    super(args);
    this.effects = args.effects;
    this.rarity = args.rarity;
    this.type = args.type;
  }
}

export type EquipmentEffects = Record<string, number>;
