import type { EquippableItemTemplate } from '@/types';
import { StatType, AffixType, EquippableItemType, StatScope } from '@/utils/enums';
import BodySprite from '@/assets/items/Body.png';
import BootsSprite from '@/assets/items/Boots.png';
import BowSprite from '@/assets/items/Bow2.png';
import DaggerSprite from '@/assets/items/Dagger.png';
import GlovesSprite from '@/assets/items/Gloves.png';
import HelmetSprite from '@/assets/items/Helmet.png';
import SwordSprite from '@/assets/items/Sword.png';
import { ScrapMetal } from './items';

export const bodyTemplate: EquippableItemTemplate = {
  id: 'it-basic-body',
  name: 'Basic Body',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Body,
  spriteSrc: BodySprite,
  requirements: { strength: 28 },
  implicitAffixes: [
    {
      tier: 1,
      name: 'Local Base Armor',
      type: AffixType.ArmorBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.ArmorBase,
          range: { min: 48, max: 58 },
        },
      ],
    },
  ],
  craftingTimeMS: 6000,
  craftingRecipe: [{ item: ScrapMetal, quantity: 1 }],
};

export const bootsTemplate: EquippableItemTemplate = {
  id: 'it-basic-boots',
  name: 'Basic Boots',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Boots,
  spriteSrc: BootsSprite,
  requirements: { strength: 28 },
  implicitAffixes: [
    {
      tier: 1,
      name: 'Base Armor',
      type: AffixType.ArmorBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.ArmorBase,
          range: { min: 24, max: 33 },
        },
      ],
    },
  ],
  craftingTimeMS: 6000,
  craftingRecipe: [{ item: ScrapMetal, quantity: 1 }],
};

export const glovesTemplate: EquippableItemTemplate = {
  id: 'it-basic-gloves',
  name: 'Basic Gloves',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Gloves,
  spriteSrc: GlovesSprite,
  requirements: { strength: 28 },
  implicitAffixes: [
    {
      tier: 1,
      name: 'Base Armor',
      type: AffixType.ArmorBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.ArmorBase,
          range: { min: 13, max: 18 },
        },
      ],
    },
  ],
  craftingTimeMS: 6000,
  craftingRecipe: [{ item: ScrapMetal, quantity: 1 }],
};

export const helmetTemplate: EquippableItemTemplate = {
  id: 'it-basic-helmet',
  name: 'Basic Helmet',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Helmet,
  spriteSrc: HelmetSprite,
  requirements: { strength: 28 },
  implicitAffixes: [
    {
      tier: 1,
      name: 'Base Armor',
      type: AffixType.ArmorBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.ArmorBase,
          range: { min: 36, max: 42 },
        },
      ],
    },
  ],
  craftingTimeMS: 6000,
  craftingRecipe: [{ item: ScrapMetal, quantity: 1 }],
};

export const bowTemplate: EquippableItemTemplate = {
  id: 'it-basic-bow',
  name: 'Basic Bow',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Bow,
  spriteSrc: BowSprite,
  requirements: { dexterity: 28 },
  implicitAffixes: [
    {
      tier: 1,
      name: 'Base Attack Speed',
      type: AffixType.AttacksPerSecondBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.AttacksPerSecondBase,
          range: { min: 1, max: 1.2 },
        },
      ],
    },
    {
      tier: 1,
      name: 'Base Hit Damage',
      type: AffixType.HitDamageBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.HitDamageMaxBase,
          range: { min: 4, max: 6 },
        },
        {
          scope: StatScope.Local,
          type: StatType.HitDamageMinBase,
          range: { min: 2, max: 3 },
        },
      ],
    },
  ],
  craftingTimeMS: 6000,
  craftingRecipe: [{ item: ScrapMetal, quantity: 1 }],
};

export const daggersTemplate: EquippableItemTemplate = {
  id: 'it-basic-daggers',
  name: 'Basic Daggers',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Daggers,
  spriteSrc: DaggerSprite,
  requirements: { dexterity: 28 },
  implicitAffixes: [
    {
      tier: 1,
      name: 'Base Attack Speed',
      type: AffixType.AttacksPerSecondBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.AttacksPerSecondBase,
          range: { min: 1.4, max: 1.8 },
        },
      ],
    },
    {
      tier: 1,
      name: 'Base Hit Damage',
      type: AffixType.HitDamageBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.HitDamageMaxBase,
          range: { min: 3, max: 4 },
        },
        {
          scope: StatScope.Local,
          type: StatType.HitDamageMinBase,
          range: { min: 1, max: 2 },
        },
      ],
    },
  ],
  craftingTimeMS: 6000,
  craftingRecipe: [{ item: ScrapMetal, quantity: 1 }],
};

export const swordTemplate: EquippableItemTemplate = {
  id: 'it-basic-sword',
  name: 'Basic Sword',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Sword,
  spriteSrc: SwordSprite,
  requirements: { strength: 28 },
  implicitAffixes: [
    {
      tier: 1,
      name: 'Base Attack Speed',
      type: AffixType.AttacksPerSecondBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.AttacksPerSecondBase,
          range: { min: 0.6, max: 0.8 },
        },
      ],
    },
    {
      tier: 1,
      name: 'Base Hit Damage',
      type: AffixType.HitDamageBase,
      hidden: true,
      stats: [
        {
          scope: StatScope.Local,
          type: StatType.HitDamageMaxBase,
          range: { min: 8, max: 11 },
        },
        {
          scope: StatScope.Local,
          type: StatType.HitDamageMinBase,
          range: { min: 4, max: 7 },
        },
      ],
    },
  ],
  craftingTimeMS: 6000,
  craftingRecipe: [{ item: ScrapMetal, quantity: 1 }],
};

export const templatesByType: Record<EquippableItemType, EquippableItemTemplate> = {
  [EquippableItemType.Body]: bodyTemplate,
  [EquippableItemType.Boots]: bootsTemplate,
  [EquippableItemType.Bow]: bowTemplate,
  [EquippableItemType.Daggers]: daggersTemplate,
  [EquippableItemType.Gloves]: glovesTemplate,
  [EquippableItemType.Helmet]: helmetTemplate,
  [EquippableItemType.Sword]: swordTemplate,
};
