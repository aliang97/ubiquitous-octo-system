import type { EquippableItemTemplate } from '@/types';
import { AffixType, EquippableItemType } from '@/utils/enums';
import BodySprite from '@/assets/items/Body.png';
import BootsSprite from '@/assets/items/Boots.png';
import BowSprite from '@/assets/items/Bow2.png';
import DaggerSprite from '@/assets/items/Dagger.png';
import GlovesSprite from '@/assets/items/Gloves.png';
import HelmetSprite from '@/assets/items/Helmet.png';
import SwordSprite from '@/assets/items/Sword.png';

export const bodyTemplate: EquippableItemTemplate = {
  name: 'Basic Body',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Body,
  spriteSrc: BodySprite,
  requirements: { strength: 28 },
  implicitAffixes: {
    [AffixType.ArmorBase]: { min: 48, max: 58 },
  },
};

export const bootsTemplate: EquippableItemTemplate = {
  name: 'Basic Boots',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Boots,
  spriteSrc: BootsSprite,
  requirements: { strength: 28 },
  implicitAffixes: {
    [AffixType.ArmorBase]: { min: 24, max: 33 },
  },
};

export const bowTemplate: EquippableItemTemplate = {
  name: 'Basic Bow',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Bow,
  spriteSrc: BowSprite,
  requirements: { dexterity: 28 },
  implicitAffixes: {
    [AffixType.AttacksPerSecondBase]: { min: 1, max: 1.2 },
    [AffixType.HitDamageMinBase]: { min: 2, max: 3 },
    [AffixType.HitDamageMaxBase]: { min: 4, max: 6 },
  },
};

export const daggersTemplate: EquippableItemTemplate = {
  name: 'Basic Daggers',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Daggers,
  spriteSrc: DaggerSprite,
  requirements: { dexterity: 28 },
  implicitAffixes: {
    [AffixType.AttacksPerSecondBase]: { min: 1.4, max: 1.8 },
    [AffixType.HitDamageMinBase]: { min: 1, max: 2 },
    [AffixType.HitDamageMaxBase]: { min: 3, max: 4 },
  },
};

export const glovesTemplate: EquippableItemTemplate = {
  name: 'Basic Gloves',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Gloves,
  spriteSrc: GlovesSprite,
  requirements: { strength: 28 },
  implicitAffixes: {
    [AffixType.ArmorBase]: { min: 13, max: 18 },
  },
};

export const helmetTemplate: EquippableItemTemplate = {
  name: 'Basic Helmet',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Helmet,
  spriteSrc: HelmetSprite,
  requirements: { strength: 28 },
  implicitAffixes: {
    [AffixType.ArmorBase]: { min: 36, max: 42 },
  },
};

export const swordTemplate: EquippableItemTemplate = {
  name: 'Basic Sword',
  itemLevel: { min: 1, max: 10 },
  quality: { min: 1, max: 10 },
  type: EquippableItemType.Sword,
  spriteSrc: SwordSprite,
  requirements: { strength: 28 },
  implicitAffixes: {
    [AffixType.AttacksPerSecondBase]: { min: 0.6, max: 0.8 },
    [AffixType.HitDamageMinBase]: { min: 4, max: 7 },
    [AffixType.HitDamageMaxBase]: { min: 8, max: 11 },
  },
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
