import type { DerivedCharacterStats, RenderableEntity } from '@/types';

export interface CharacterEntity extends RenderableEntity {
  currentHitPoints: number;
  derivedStats?: DerivedCharacterStats;
}
