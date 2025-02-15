import { EquippableItemEntity, ItemEntity } from '@/scripts/entities';

export type EquippedItemLoadout = {
  helmet?: EquippableItemEntity;
  body?: EquippableItemEntity;
  gloves?: EquippableItemEntity;
  boots?: EquippableItemEntity;
  weapon1?: EquippableItemEntity;
  weapon2?: EquippableItemEntity;
  ring1?: EquippableItemEntity;
  ring2?: EquippableItemEntity;
  amulet?: EquippableItemEntity;
  belt?: EquippableItemEntity;
};

export type HeroClass = {
  name: string;
  baseHitPoints: number;
};

export type LootTableEntry = {
  itemEntity: ItemEntity;
  quantity: number;
  chance: number;
};

export type LootTable = LootTableEntry[];

export type SpriteSheetData = {
  spriteSrc: string;
  size: { x: number; y: number };
  frames: number;
  durationMS: number;
};

export type RenderInstruction = {
  command: string;
  params?: object;
  duration: number | 'infinite'; // in MS
  id: string;
};

export type RenderList = RenderInstruction[];
