import { EquippableItemType } from '@/utils/enums';
import { generateId } from '@/utils/generators';
import type { AffixStat, EquipmentAffix, EquipmentAffixRange, EquippableItemEntity } from '@/types';
import * as Templates from './itemTemplates';
import type { Range } from '@/types';
import { computeStats } from '@/utils/items';

export type generateItemFromTemplateArgs = {
  type: EquippableItemType;
  name?: string;
  explicitAffixes?: EquipmentAffix[];
};

export function generateItemFromTemplate(args: generateItemFromTemplateArgs) {
  const template = Templates.templatesByType[args.type];
  const resolvedImplicitAffixes: EquipmentAffix[] = [];
  if (template.implicitAffixes) {
    template.implicitAffixes.forEach((affix) => {
      resolvedImplicitAffixes.push(resolveAffixRange(affix));
    });
  }

  const newItem: EquippableItemEntity = {
    ...template,
    id: generateId('i'),
    name: args.name ? args.name : template.name,
    itemLevel: randomPickInRange(template.itemLevel),
    quality: randomPickInRange(template.quality),
    implicitAffixes: resolvedImplicitAffixes,
    explicitAffixes: args.explicitAffixes,
  };

  newItem.computedStats = computeStats(newItem);

  return newItem;
}

function resolveAffixRange(a: EquipmentAffixRange): EquipmentAffix {
  const resolvedAffixStats: AffixStat[] = [];
  a.stats.forEach((stat) => {
    resolvedAffixStats.push({
      ...stat,
      magnitude: randomPickInRange(stat.range),
    });
  });
  return {
    ...a,
    stats: resolvedAffixStats,
  };
}

function randomPickInRange(r: Range) {
  return r.min + Math.round(Math.random() * (r.max - r.min));
}
