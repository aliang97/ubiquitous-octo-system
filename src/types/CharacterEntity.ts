import type { Entity } from '@/types/Entity.ts';
import type { CombatInstance } from '@/types/CombatInstance';
import type { LootTable }from '@/types/LootTable';
import type { RenderList } from './RenderList';

export type SpriteSheetData = {
  spriteSrc: string,
  size: {x: number, y: number},
  frames: number,
  durationMS: number,
}

export type CharacterEntity = Entity & {
  class?: string,
  maximumHitpoints: number,
  currentHitpoints: number,
  hitDamageMaximum?: number,
  hitDamageMinimum?: number,
  attacksPerSecond?: number,
  lootTable?: LootTable,
  onDeath?: (combat: CombatInstance) => void,
  renderList?: RenderList,
  spriteProps?: SpriteSheetData,
}
