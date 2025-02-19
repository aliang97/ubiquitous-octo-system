import type { HeroEntity, MonsterEntity } from '@/types';
import type { CombatInstanceStatus, CombatLocationId } from '@/utils/enums';
import type { DelayedAction } from './DelayedAction';

export interface CombatInstance {
  h1: HeroEntity;
  m1: MonsterEntity;
  locationId: CombatLocationId;
  loop?: boolean;
  gameTick: number;
  trueTick: number;
  isPaused: boolean;
  status: CombatInstanceStatus;
  clockId?: number;
  delayedActions: DelayedAction[];
}
