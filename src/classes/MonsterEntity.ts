import type { CharacterEntity } from './CharacterEntity';
import { RenderableEntity } from './RenderableEntity';

import type { ItemEntity } from '@/types/ItemEntity';
import type { RenderableEntityArgs } from './RenderableEntity';

export type LootTableEntry = {
  itemEntity: ItemEntity;
  quantity: number;
  chance: number;
};

export type LootTable = LootTableEntry[];

export type MonsterEntityArgs = RenderableEntityArgs & {
  name: string;
  maximumHitPoints: number;
  attacksPerSecond: number;
  hitDamageMaximum: number;
  hitDamageMinimum: number;
  lootTable?: LootTable;
  onDeath?: () => void;
};

export class MonsterEntity extends RenderableEntity implements CharacterEntity {
  lootTable?: LootTable;
  onDeath?: () => void;
  maximumHitPoints: number;
  currentHitPoints: number;
  attacksPerSecond: number;
  hitDamageMaximum: number;
  hitDamageMinimum: number;

  constructor(args: MonsterEntityArgs) {
    super(args);
    this.lootTable = args.lootTable;
    const defaultOnDeath = () => console.log('you killed ' + this.name);
    this.onDeath = args.onDeath || defaultOnDeath;
    this.maximumHitPoints = args.maximumHitPoints;
    this.currentHitPoints = args.maximumHitPoints;
    this.attacksPerSecond = args.attacksPerSecond;
    this.hitDamageMaximum = args.hitDamageMaximum;
    this.hitDamageMinimum = args.hitDamageMinimum;
  }
}
