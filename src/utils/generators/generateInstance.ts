import type {
  Instance,
  ProcessingInstance,
  HeroEntity,
  MonsterEntity,
  CombatInstance2,
} from '@/types';
import { CombatInstanceStatus, CombatLocationId, ProcessingLocation } from '@/utils/enums';

export function generateInstance(): Instance {
  return {
    gameTick: 0,
    trueTick: 0,
    isPaused: false,
  };
}

interface generatePArgs {
  location: ProcessingLocation;
}

export function generateProcessingInstance(args: generatePArgs): ProcessingInstance {
  return {
    location: args.location,
    processingQueue: [],
    ticksUntilNextAction: 0,
    ...generateInstance(),
  };
}

interface generateCArgs {
  h1: HeroEntity;
  m1: MonsterEntity;
  locationId: CombatLocationId;
  loop?: boolean;
}
export function generateCombatInstance(args: generateCArgs): CombatInstance2 {
  return {
    locationId: args.locationId,
    h1: args.h1,
    m1: args.m1,
    status: CombatInstanceStatus.Uninitialized,
    delayedActions: [],
    loop: args.loop,
    ...generateInstance(),
  };
}
