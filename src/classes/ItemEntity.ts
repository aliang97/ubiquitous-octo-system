import { Entity } from './Entity';

export type ItemEntityArgs = {
  name?: string;
  rarity?: string;
};

export class ItemEntity extends Entity {
  rarity?: string;

  constructor(args: ItemEntityArgs = {}) {
    super(args);
    this.rarity = args.rarity;
  }
}
