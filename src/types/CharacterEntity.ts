import type { Entity } from '@/types/Entity.ts';
import type { CombatInstance } from '@/types/CombatInstance';
import type { LootTable }from '@/types/LootTable';
import type { Component } from 'vue';

export type CharacterEntity = Entity & {
  class?: string,
  maximumHitpoints: number,
  currentHitpoints: number,
  hitDamageMaximum?: number,
  hitDamageMinimum?: number,
  attacksPerSecond?: number,
  lootTable?: LootTable,
  onDeath?: (combat: CombatInstance) => void,
  sprite?: Component,
  rendererComponent?: Component,
}
