import type {
  Instance,
  ProcessingInstance,
  CraftableItemEntity,
  HeroEntity,
  MonsterEntity,
  CombatInstance2,
} from '@/types';
import { CombatInstanceStatus, CombatLocationId, ProcessingLocation } from '@/utils/enums';

interface generateArgs {
  amountLoops?: number;
}

export function generateInstance(args: generateArgs): Instance {
  return {
    gameTick: 0,
    trueTick: 0,
    isPaused: false,
    amountLoops: args.amountLoops || 1,
    currentLoop: 0,
  };
}

interface generatePArgs extends generateArgs {
  location: ProcessingLocation;
  outputItem: Omit<CraftableItemEntity, 'id'>;
}

export function generateProcessingInstance(args: generatePArgs): ProcessingInstance {
  return {
    location: args.location,
    outputItem: args.outputItem,
    ticksUntilNextAction: 0,
    ...generateInstance(args),
  };
}

interface generateCArgs extends generateArgs {
  h1: HeroEntity;
  m1: MonsterEntity;
  locationId: CombatLocationId;
}
export function generateCombatInstance(args: generateCArgs): CombatInstance2 {
  return {
    locationId: args.locationId,
    h1: args.h1,
    m1: args.m1,
    status: CombatInstanceStatus.Uninitialized,
    delayedActions: [],
    ...generateInstance(args),
  };
}
