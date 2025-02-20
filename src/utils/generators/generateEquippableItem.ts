import { generateItemFromTemplate } from '@/data/items/baseEquippableItems';
import type { EquippableItemEntity } from '@/types';
import { EquippableItemType, AffixType, StatType, StatScope } from '@/utils/enums';

type generateEquippableItemArgs = {
  type?: EquippableItemType;
};

// TODO: implement
export const generateEquippableItem = (args: generateEquippableItemArgs): EquippableItemEntity => {
  if (args.type === EquippableItemType.Helmet) {
    return basicHelmet;
  }

  if (args.type === EquippableItemType.Sword) {
    return basicSword;
  }

  return basicHelmet;
};

export const basicHelmet = generateItemFromTemplate({
  type: EquippableItemType.Helmet,
  explicitAffixes: [
    {
      type: AffixType.HealthBase,
      tier: 1,
      name: 'Health',
      stats: [
        {
          type: StatType.HealthBase,
          scope: StatScope.Global,
          range: { max: 10, min: 8 },
          magnitude: 8,
        },
      ],
    },
  ],
});

export const basicSword = generateItemFromTemplate({
  type: EquippableItemType.Sword,
  explicitAffixes: [
    {
      type: AffixType.HitDamageBase,
      tier: 1,
      name: 'Flat Hit Damage',
      stats: [
        {
          type: StatType.HitDamageMaxBase,
          scope: StatScope.Global,
          range: { max: 4, min: 3 },
          magnitude: 4,
        },
        {
          type: StatType.HitDamageMinBase,
          scope: StatScope.Global,
          range: { max: 2, min: 1 },
          magnitude: 1,
        },
      ],
    },
  ],
});
