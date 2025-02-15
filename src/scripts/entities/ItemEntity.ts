import { Entity } from '@/scripts/entities';

export enum RarityType {
  Common = 'RARITY_COMMON',
  Magic = 'RARITY_MAGIC',
  Rare = 'RARITY_RARE',
  Unique = 'RARITY_UNIQUE',
}

export type ItemEntityArgs = {
  name?: string;
  rarity?: RarityType;
};

export class ItemEntity extends Entity {
  rarity?: RarityType;

  constructor(args: ItemEntityArgs = {}) {
    super(args);
    this.rarity = args.rarity;
  }
}
