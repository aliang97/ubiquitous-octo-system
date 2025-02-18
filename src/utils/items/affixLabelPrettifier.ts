import type { Range } from '@/types';
import { AffixType } from '../enums';

export const affixLabelPrettifier = (affixType: AffixType, magnitude: number | Range) => {
  const typeToPrettyLabelFn: Partial<Record<AffixType, (m: number | Range) => string>> = {
    [AffixType.ArmorBase]: armorBase,
    [AffixType.ArmorIncr]: armorIncr,
    [AffixType.AttacksPerSecondBase]: attacksPerSecondBase,
    [AffixType.AttacksPerSecondIncr]: attacksPerSecondIncr,
    [AffixType.HitDamageIncr]: hitDamageIncr,
    [AffixType.HitPointsBase]: hitPointsBase,
    [AffixType.HitPointsIncr]: hitPointsIncr,
  };
  if (typeToPrettyLabelFn[affixType]) {
    return typeToPrettyLabelFn[affixType](magnitude);
  }

  return '';
};

export const affixLabelPrettifierForDamageRanges = (
  affixType: AffixType,
  magnitude1: number | Range,
  magnitude2?: number | Range,
) => {
  const typeToPrettyLabelFn: Partial<
    Record<AffixType, (m1: number | Range, m2?: number | Range) => string>
  > = {
    [AffixType.HitDamageMaxBase]: hitDamageMaxBase,
    [AffixType.HitDamageMinBase]: hitDamageMinBase,
  };
  if (typeToPrettyLabelFn[affixType]) {
    return typeToPrettyLabelFn[affixType](magnitude1, magnitude2);
  }

  return '';
};

function isRange(m: number | Range): m is Range {
  return (m as Range).min !== undefined;
}

const mString = (m?: number | Range) => {
  if (m === undefined) {
    return '???';
  }
  return isRange(m) ? `(${m.min}-${m.max})` : `${m}`;
};

const armorBase = (m: number | Range) => {
  return `+${mString(m)} to Armor`;
};

const armorIncr = (m: number | Range) => {
  return `${mString(m)}% increased Armor`;
};

const attacksPerSecondBase = (m: number | Range) => {
  return `${mString(m)} Attacks per second`;
};

const attacksPerSecondIncr = (m: number | Range) => {
  return `${mString(m)}% increased Attack Speed`;
};

const hitDamageIncr = (m: number | Range) => {
  return `${mString(m)}% increased Hit Damage`;
};

const hitDamageMaxBase = (m1: number | Range, m2?: number | Range) => {
  return `${mString(m1)} to ${mString(m2)} Hit Damage`;
};

const hitDamageMinBase = (m1: number | Range, m2?: number | Range) => {
  return `+${mString(m1)} to ${mString(m2)} Hit Damage`;
};

const hitPointsBase = (m: number | Range) => {
  return `+${mString(m)} to Maximum Health`;
};

const hitPointsIncr = (m: number | Range) => {
  return `${mString(m)}% increased Maximum Health`;
};
