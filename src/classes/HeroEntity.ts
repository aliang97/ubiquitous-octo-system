import type { CharacterEntity } from './CharacterEntity';
import { EquippableItemEntity } from './EquippableItemEntity';
import { RenderableEntity, type RenderableEntityArgs } from './RenderableEntity';

export type HeroEntityArgs = RenderableEntityArgs & {
  heroClass?: HeroClass;
  equipment?: EquippedItemLoadout;
};

export type EquippedItemLoadout = {
  helmet?: EquippableItemEntity;
  body?: EquippableItemEntity;
  gloves?: EquippableItemEntity;
  boots?: EquippableItemEntity;
  weapon1?: EquippableItemEntity;
  weapon2?: EquippableItemEntity;
  ring1?: EquippableItemEntity;
  ring2?: EquippableItemEntity;
  amulet?: EquippableItemEntity;
  belt?: EquippableItemEntity;
};

export type HeroClass = {
  name: string;
  baseHitpoints: number;
};

export function arraySum(a: (number | undefined)[]): number {
  return a.reduce((sum, a) => (sum || 0) + (a || 0), 0) || -1;
}

export class HeroEntity extends RenderableEntity implements CharacterEntity {
  heroClass?: HeroClass;
  equipment: EquippedItemLoadout;
  currentHitPoints: number;

  get maximumHitPoints() {
    const sources = [
      this.heroClass?.baseHitpoints,
      this.equipment['helmet']?.effects?.['baseHitPoints'],
    ];
    return arraySum(sources);
  }

  get attacksPerSecond() {
    return this.equipment['weapon1']?.effects?.['attacksPerSecond'] || 0;
  }

  get hitDamageMaximum() {
    return this.equipment['weapon1']?.effects?.['hitDamageMaximum'] || 0;
  }

  get hitDamageMinimum() {
    return this.equipment['weapon1']?.effects?.['hitDamageMinimum'] || 0;
  }

  constructor(args: HeroEntityArgs = {}) {
    super(args);
    this.heroClass = args.heroClass;
    this.equipment = args.equipment || {};
    this.currentHitPoints = this.maximumHitPoints;
  }
}
