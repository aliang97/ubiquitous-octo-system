import type { DerivedCharacterStats, HeroEntity, MonsterEntity } from '@/types';
import { arraySum } from '../utils';

export function deriveHeroStats(h: HeroEntity): DerivedCharacterStats {
  return {
    maximumHitPoints: getMaximumHitPoints(h),
    attacksPerSecond: getAttacksPerSecond(h),
    hitDamageMaximum: getHitDamageMaximum(h),
    hitDamageMinimum: getHitDamageMinimum(h),
  };
}

function getMaximumHitPoints(h: HeroEntity) {
  const sources = [h.heroClass?.baseHitPoints, h.equipment['helmet']?.effects?.['baseHitPoints']];
  return arraySum(sources);
}

function getAttacksPerSecond(h: HeroEntity) {
  return h.equipment['weapon1']?.effects?.['attacksPerSecond'] || 0;
}

function getHitDamageMaximum(h: HeroEntity) {
  return h.equipment['weapon1']?.effects?.['hitDamageMaximum'] || 0;
}

function getHitDamageMinimum(h: HeroEntity) {
  return h.equipment['weapon1']?.effects?.['hitDamageMinimum'] || 0;
}

// TODO: implement?
export function deriveMonsterStats(m: MonsterEntity): DerivedCharacterStats {
  return {
    maximumHitPoints: m.maximumHitPoints,
    attacksPerSecond: m.attacksPerSecond,
    hitDamageMaximum: m.hitDamageMaximum,
    hitDamageMinimum: m.hitDamageMinimum,
  };
}
