import type { DerivedCharacterStats, RenderableEntity } from '@/types';
import { CharacterType, CharacterStatus } from '@/utils/enums';

export interface CharacterEntity extends RenderableEntity {
  characterStatus: CharacterStatus;
  characterType: CharacterType;
  currentHitPoints: number;
  derivedStats?: DerivedCharacterStats;
  actionLockoutDurationMS: number;
}
