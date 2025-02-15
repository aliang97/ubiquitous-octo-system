import {
  type CharacterEntity,
  type EquippedItemLoadout,
  type HeroClass,
  type RenderableEntityArgs,
  RenderableEntity,
} from '@/scripts/entities';
import { arraySum } from '@/scripts/util';

export type HeroEntityArgs = RenderableEntityArgs & {
  heroClass?: HeroClass;
  equipment?: EquippedItemLoadout;
};

export class HeroEntity extends RenderableEntity implements CharacterEntity {
  heroClass?: HeroClass;
  equipment: EquippedItemLoadout;
  currentHitPoints: number;

  get maximumHitPoints() {
    const sources = [
      this.heroClass?.baseHitPoints,
      this.equipment['helmet']?.effects?.['baseHitPoints'],
    ];
    return arraySum(sources);
  }

  set maximumHitPoints(n) {
    this.maximumHitPoints = n;
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

  getMaximumHitPoints() {
    const sources = [
      this.heroClass?.baseHitPoints,
      this.equipment['helmet']?.effects?.['baseHitPoints'],
    ];
    return arraySum(sources);
  }
}
