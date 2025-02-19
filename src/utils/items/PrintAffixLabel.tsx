import type { EquipmentAffix, EquipmentAffixRange } from '@/types';
import type { FunctionalComponent } from 'vue';
import { AffixType } from '@/utils/enums';
import * as PrintFn from './affixPrintFn';

type FnProps = {
  affix: EquipmentAffix | EquipmentAffixRange;
};

const typeToPrintFn: Partial<Record<AffixType, FunctionalComponent<FnProps>>> = {
  [AffixType.ArmorBase]: PrintFn.armorBase,
  [AffixType.AttacksPerSecondBase]: PrintFn.attackSpeedBase,
  [AffixType.HitDamageBase]: PrintFn.hitDamageBase,
};

export const PrintAffixLabel: FunctionalComponent<FnProps> = (props) => {
  const { affix } = props;

  const printFn = typeToPrintFn[affix.type];

  if (!printFn) {
    return;
  }

  return printFn({ affix }, { attrs: {}, slots: {}, emit: () => {} });
};
