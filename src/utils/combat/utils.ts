import type {
  CombatInstance,
  DelayedAction,
  CharacterEntity,
  DerivedCharacterStats,
} from '@/types';
import { msToTicks, isHero, isMonster, SERVER_TICK_RATE_MS } from '@/utils';
import { generateId } from '@/utils/generators';
import { deriveHeroStats, deriveMonsterStats } from '@/utils/combat/deriveCharacterStats';

export function pauseCombat(c?: CombatInstance, durationMS?: number) {
  if (c === undefined) {
    return;
  }
  c.isPaused = true;

  if (durationMS) {
    const delayedUnpause: DelayedAction = {
      id: generateId('da'),
      doAction: () => {
        unpauseCombat(c);
      },
      waitUntilTrueTick: c.trueTick + msToTicks(durationMS),
    };
    c.delayedActions.push(delayedUnpause);
  }
}

export function unpauseCombat(c?: CombatInstance) {
  if (c === undefined) {
    return;
  }
  c.isPaused = false;
}

export function getDerivedCharacterStats(c: CharacterEntity): DerivedCharacterStats {
  // If the derived stats have already been calculated and cached
  if (c.derivedStats) {
    return c.derivedStats;
  }

  // If the derived stats haven't been calculated yet

  if (isHero(c)) {
    const d = deriveHeroStats(c);
    // cache them
    c.derivedStats = d;
    return c.derivedStats;
  }

  if (isMonster(c)) {
    const d = deriveMonsterStats(c);
    // cache them
    c.derivedStats = d;
    return c.derivedStats;
  }

  console.log('Error in getDerivedCharacterStats: CharacterEntity is not a Hero or Monster');
  return {
    maximumHitPoints: -1,
    attacksPerSecond: -1,
    hitDamageMaximum: -1,
    hitDamageMinimum: -1,
  };
}

export function getAttackIntervalMS(attacksPerSecond: number): number {
  const ticksPerSecond = 1000 / SERVER_TICK_RATE_MS;
  return Math.round(ticksPerSecond / attacksPerSecond);
}
