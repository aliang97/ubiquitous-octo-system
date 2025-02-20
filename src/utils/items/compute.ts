import type { EquippableItemEntity, AffixStat, ComputedStat } from '@/types';
import { StatScope, StatType } from '@/utils/enums';
import { sumStat } from './computeStats';

export type ComputeFunction = (stats: AffixStat[], item: EquippableItemEntity) => ComputedStat[];

export const armor: ComputeFunction = (stats, item) => {
  const baseArmor = sumStat(stats, StatType.ArmorBase);
  const incrArmor = sumStat(stats, StatType.ArmorIncr);
  const incrMult = 1 + incrArmor / 100;
  const qualMult = 1 + item.quality / 100;

  return [
    {
      type: StatType.ArmorBase,
      scope: StatScope.Global,
      magnitude: Math.floor(baseArmor * incrMult * qualMult),
    },
  ];
};

export const attackSpeed: ComputeFunction = (stats, item) => {
  const baseAS = sumStat(stats, StatType.AttacksPerSecondBase);
  const qualMult = 1 + item.quality / 100;

  return [
    {
      type: StatType.AttacksPerSecondBase,
      scope: StatScope.Global,
      magnitude: baseAS * qualMult,
    },
  ];
};

export const hitDamage: ComputeFunction = (stats, item) => {
  const baseDamageMax = sumStat(stats, StatType.HitDamageMaxBase);
  const baseDamageMin = sumStat(stats, StatType.HitDamageMinBase);
  const qualMult = 1 + item.quality / 100;

  return [
    {
      type: StatType.HitDamageMaxBase,
      scope: StatScope.Global,
      magnitude: Math.floor(baseDamageMax * qualMult),
    },
    {
      type: StatType.HitDamageMinBase,
      scope: StatScope.Global,
      magnitude: Math.floor(baseDamageMin * qualMult),
    },
  ];
};

export const health: ComputeFunction = (stats, item) => {
  console.warn('health compute function not implemented');
  return;
};
