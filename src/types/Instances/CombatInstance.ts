import type { HeroEntity, Instance, MonsterEntity } from '@/types';
import type { CombatInstanceStatus, CombatLocationId } from '@/utils/enums';
import type { DelayedAction } from '../combat/DelayedAction';

export interface CombatInstance extends Instance {
  h1: HeroEntity;
  m1: MonsterEntity;
  locationId: CombatLocationId;
  status: CombatInstanceStatus;
  delayedActions: DelayedAction[];
  loop?: boolean;
}
