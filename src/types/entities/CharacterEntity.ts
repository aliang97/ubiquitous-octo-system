import type { DerivedCharacterStats, RenderableEntity } from '@/types';
import type { CharacterType } from '@/utils';

export interface CharacterEntity extends RenderableEntity {
  characterType: CharacterType;
  currentHitPoints: number;
  derivedStats?: DerivedCharacterStats;
  actionLockoutDurationMS: number;
}
