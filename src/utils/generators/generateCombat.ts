import type { CombatInstance, HeroEntity, MonsterEntity } from '@/types';
import { CombatInstanceStatus, LocationId } from '@/utils/enums';

export type generateCombatArgs = {
  h1: HeroEntity;
  m1: MonsterEntity;
  locationId: LocationId;
  loop?: boolean;
};

export function generateCombat(args: generateCombatArgs): CombatInstance {
  return {
    gameTick: 0,
    trueTick: 0,
    isPaused: false,
    status: CombatInstanceStatus.Uninitialized,
    delayedActions: [],
    ...args,
  };
}
