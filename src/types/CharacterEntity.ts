import type { Entity } from '@/types/Entity.ts';
import type { CombatInstance } from './CombatInstance';
import type { LootTable }from '@/types/LootTable';

export type CharacterEntity = Entity & {
  class?: string,
  maximumHitpoints: number,
  currentHitpoints: number,
  hitDamageMaximum?: number,
  hitDamageMinimum?: number,
  attacksPerSecond?: number,
  lootTable?: LootTable,
  onDeath?: (combat: CombatInstance) => void,
}
