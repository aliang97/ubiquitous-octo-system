import type {
  DerivedCharacterStats,
  HeroEntity,
  MonsterEntity,
  CharacterEntity,
  CombatInstance,
} from '@/types';
import { isHero, isMonster } from '@/utils';
import { getAttackIntervalMS, getDerivedCharacterStats } from '@/utils/combat';
import { doAnimation } from './doAnimation';
import { CharacterStatus } from '@/utils/enums';

export function takeAction(character: HeroEntity | MonsterEntity, combat: CombatInstance) {
  if (combat === undefined) {
    return;
  }
  if (isHero(character)) {
    takeActionHero(character, combat);
  }

  if (isMonster(character)) {
    takeActionMonster(character, combat);
  }
}

function takeActionHero(h: HeroEntity, combat: CombatInstance) {
  // TODO maybe handle multiple skills?
  // Only attack if the enemy isn't already dead
  const enemyStatus = combat.m1.characterStatus;
  if (enemyStatus === CharacterStatus.Dead) {
    return;
  }

  doAttack(h, combat.m1);
  const derivedStats = getDerivedCharacterStats(h);
  h.actionLockoutDurationMS = getAttackIntervalMS(derivedStats.attacksPerSecond);
  doAnimation({ r: h, animationName: 'attack', combat });
}

function takeActionMonster(m: MonsterEntity, combat: CombatInstance) {
  // Only attack if the enemy isn't already dead
  const enemyStatus = combat.h1.characterStatus;
  if (enemyStatus === CharacterStatus.Dead) {
    return;
  }

  doAttack(m, combat.h1);
  const derivedStats = getDerivedCharacterStats(m);
  m.actionLockoutDurationMS = getAttackIntervalMS(derivedStats.attacksPerSecond);
}

function rollDamage(d: DerivedCharacterStats) {
  const max = d.hitDamageMaximum;
  const min = d.hitDamageMinimum;
  const range = max - min;
  return min + Math.round(Math.random() * range);
}

function doAttack(source: CharacterEntity, target: CharacterEntity) {
  const sourceDerivedStats = getDerivedCharacterStats(source);
  const damage = rollDamage(sourceDerivedStats);
  target.currentHitPoints = Math.max(0, target.currentHitPoints - damage);
}
