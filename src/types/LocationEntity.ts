import type { Entity } from '@/types/Entity.ts';
import type { CharacterEntity } from '@/types/CharacterEntity';
import type { Component } from 'vue';
import type { CombatLocationId } from './CombatInstance';

export type LocationEntity = Entity & {
  id: CombatLocationId,
  backgroundComponent?: Component,
  enemyList?: CharacterEntity[],
}
