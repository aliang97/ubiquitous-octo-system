import type { HeroEntity, MonsterEntity } from '@/types';
import type { CombatInstanceStatus, LocationId } from '@/utils';
import type { DelayedAction } from './DelayedAction';

export interface CombatInstance {
  h1: HeroEntity;
  m1: MonsterEntity;
  locationId: LocationId;
  loop?: boolean;
  gameTick: number;
  trueTick: number;
  isPaused: boolean;
  status: CombatInstanceStatus;
  clockId?: number;
  actionQueue: DelayedAction[];
}
