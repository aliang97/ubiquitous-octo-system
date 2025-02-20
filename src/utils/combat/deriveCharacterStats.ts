import type { DerivedCharacterStats, HeroEntity, MonsterEntity, ComputedStat } from '@/types';
import { arraySum } from '@/utils';
import { computeStats, sumStat } from '@/utils/items';
import { StatType } from '@/utils/enums';

export function deriveHeroStats(h: HeroEntity): DerivedCharacterStats {
  const equipmentStats: ComputedStat[] = [];
  Object.values(h.equipment).forEach((item) => {
    if (!item.computedStats) {
      item.computedStats = computeStats(item);
    }
    equipmentStats.push(...item.computedStats);
  });
  return {
    maximumHitPoints: getMaximumHitPoints(h, equipmentStats),
    attacksPerSecond: getAttacksPerSecond(h, equipmentStats),
    hitDamageMaximum: getHitDamageMaximum(h, equipmentStats),
    hitDamageMinimum: getHitDamageMinimum(h, equipmentStats),
  };
}

function getMaximumHitPoints(h: HeroEntity, equipmentStats: ComputedStat[]) {
  const sources = [h.heroClass?.baseHitPoints, sumStat(equipmentStats, StatType.HealthBase)];
  return arraySum(sources);
}

function getAttacksPerSecond(h: HeroEntity, equipmentStats: ComputedStat[]) {
  return sumStat(equipmentStats, StatType.AttacksPerSecondBase);
}

function getHitDamageMaximum(h: HeroEntity, equipmentStats: ComputedStat[]) {
  return sumStat(equipmentStats, StatType.HitDamageMaxBase);
}

function getHitDamageMinimum(h: HeroEntity, equipmentStats: ComputedStat[]) {
  return sumStat(equipmentStats, StatType.HitDamageMinBase);
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
