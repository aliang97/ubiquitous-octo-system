import type { EquippableItemEntity, EquipmentAffix, AffixStat, ComputedStat } from '@/types';
import { StatScope, StatType } from '@/utils/enums';
import * as compute from './compute';

export function sumStat(stats: AffixStat[] | ComputedStat[], statType: StatType) {
  return stats.filter((el) => el.type === statType).reduce((sum, i) => sum + i.magnitude, 0);
}

const statToComputeFn: Partial<Record<StatType, compute.ComputeFunction | undefined>> = {
  [StatType.ArmorBase]: compute.armor,
  [StatType.ArmorIncr]: undefined,
  [StatType.AttacksPerSecondBase]: compute.attackSpeed,
  [StatType.HealthBase]: compute.health,
  [StatType.HitDamageMaxBase]: compute.hitDamage,
  [StatType.HitDamageMinBase]: undefined,
};

function splitAffixes(affixes: EquipmentAffix[]) {
  const localStats: AffixStat[] = [];
  const globalStats: AffixStat[] = [];
  affixes.forEach((el) => {
    const _local = el.stats.filter((el) => el.scope === StatScope.Local);
    const _global = el.stats.filter((el) => el.scope === StatScope.Global);
    localStats.push(..._local);
    globalStats.push(..._global);
  });

  return [localStats, globalStats];
}

// returns all global stats on an item
//  DOES NOT UPDATE item.computed automatically!!!!
export const computeStats = (item: EquippableItemEntity) => {
  const computedStats: ComputedStat[] = [];
  const allAffixes = [...(item.implicitAffixes || []), ...(item.explicitAffixes || [])];
  const [localStats, globalStats] = splitAffixes(allAffixes);

  localStats.forEach((stat) => {
    const computeFn = statToComputeFn[stat.type];
    if (computeFn) {
      computedStats.push(...computeFn(localStats, item));
    }
  });

  computedStats.push(...globalStats);

  return computedStats;
};
