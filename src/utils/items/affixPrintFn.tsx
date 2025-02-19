import type { AffixStat, AffixStatRange, EquipmentAffix, EquipmentAffixRange } from '@/types';
import type { FunctionalComponent } from 'vue';
import { StatType } from '@/utils/enums';

type FnProps = {
  affix: EquipmentAffix | EquipmentAffixRange;
};
type PrintFn = FunctionalComponent<FnProps>;

function isStat(s: AffixStat | AffixStatRange): s is AffixStat {
  return (s as AffixStat).magnitude !== undefined;
}

function getStatMagnitudeString(affix: EquipmentAffix | EquipmentAffixRange, statType: StatType) {
  const { stats } = affix;
  // const i = stats.findIndex((el) => el.type === statType);
  // const stat = stats[i];
  const stat = stats.find((el) => el.type === statType);
  if (stat && isStat(stat)) {
    return `${stat.magnitude}`;
  } else if (stat) {
    return `(${stat.range.min}-${stat.range.max})`;
  } else {
    return '?';
  }
}

export const armorBase: PrintFn = (props) => {
  const m = getStatMagnitudeString(props.affix, StatType.ArmorBase);
  return (
    <div>
      <span class="">+{m}</span>
      <span class="color-text-muted"> to Armor</span>
    </div>
  );
};

export const attackSpeedBase: PrintFn = (props) => {
  const m = getStatMagnitudeString(props.affix, StatType.AttacksPerSecondBase);
  return (
    <div>
      <span class="">{m}</span>
      <span class="color-text-muted"> Attacks per second</span>
    </div>
  );
};

export const hitDamageBase: PrintFn = (props) => {
  const m_max = getStatMagnitudeString(props.affix, StatType.HitDamageMaxBase);
  const m_min = getStatMagnitudeString(props.affix, StatType.HitDamageMinBase);
  return (
    <div>
      <span class="color-text-muted">Adds </span>
      <span>{m_min}</span>
      <span class="color-text-muted"> to </span>
      <span>{m_max}</span>
      <span class="color-text-muted"> damage per hit</span>
    </div>
  );
};
