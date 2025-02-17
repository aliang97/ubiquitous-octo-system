import type { DerivedCharacterStats, RenderableEntity } from '@/types';
import type { CharacterType, CharacterStatus } from '@/utils';

export interface CharacterEntity extends RenderableEntity {
  characterStatus: CharacterStatus;
  characterType: CharacterType;
  currentHitPoints: number;
  derivedStats?: DerivedCharacterStats;
  actionLockoutDurationMS: number;
}
