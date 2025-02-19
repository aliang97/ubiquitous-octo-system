import type { EquippableItemEntity, EquipmentAffix, AffixStat } from '@/types';
import { StatScope, StatType } from '@/utils/enums';
import * as compute from './compute';

const statToComputeFn: Partial<Record<StatType, compute.ComputeFunction | undefined>> = {
  [StatType.ArmorBase]: compute.armor,
  [StatType.ArmorIncr]: undefined,
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

export const computeStats = (item: EquippableItemEntity) => {
  const computedStats: Omit<AffixStat, 'range'>[] = [];
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
