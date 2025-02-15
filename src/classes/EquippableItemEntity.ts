import { ItemEntity } from './ItemEntity';

export type EquipmentEffects = Record<string, number>;

export type EquippableItemEntityArgs = {
  name?: string;
  rarity?: string;
  effects?: EquipmentEffects;
};

export class EquippableItemEntity extends ItemEntity {
  effects?: EquipmentEffects;

  constructor(args: EquippableItemEntityArgs = {}) {
    super(args);
    this.effects = args.effects;
  }
}
