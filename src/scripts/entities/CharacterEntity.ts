import { RenderableEntity, type HeroClass } from '@/scripts/entities';

export interface CharacterEntity extends RenderableEntity {
  heroClass?: HeroClass;
  maximumHitPoints: number;
  currentHitPoints: number;
  attacksPerSecond: number;
  attackIntervalMS: number;
  hitDamageMaximum: number;
  hitDamageMinimum: number;
  getMaximumHitPoints?: () => number;
}
