import { EquippableItemType, AffixType } from '@/utils/enums';
import { generateId } from '@/utils/generators';
import type { EquipmentAffixes } from '@/types/entities/EquippableItemEntity';
import * as Templates from './itemTemplates';
import type { Range } from '@/types';

export type generateBasicEquippableItemArgs = {
  type: EquippableItemType;
  name?: string;
};

export function generateBasicEquippableItem(args: generateBasicEquippableItemArgs) {
  const template = Templates.templatesByType[args.type];
  const resolvedImplicitAffixes: EquipmentAffixes = {};
  if (template.implicitAffixes) {
    Object.entries(template.implicitAffixes).forEach(([affixType, affixEffect]) => {
      resolvedImplicitAffixes[affixType as AffixType] = randomPickInRange(affixEffect);
    });
  }

  return {
    ...template,
    id: generateId('i'),
    name: args.name ? args.name : template.name,
    itemLevel: randomPickInRange(template.itemLevel),
    quality: randomPickInRange(template.quality),
    implicitAffixes: resolvedImplicitAffixes,
  };
}

function randomPickInRange(r: Range) {
  return r.min + Math.round(Math.random() * (r.max - r.min));
}
