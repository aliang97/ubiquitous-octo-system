import type { CharacterEntity, LootTable } from '@/types';

export interface MonsterEntity extends CharacterEntity {
  lootTable?: LootTable;
  onDeath?: () => void;
  maximumHitPoints: number;
  currentHitPoints: number;
  attacksPerSecond: number;
  hitDamageMaximum: number;
  hitDamageMinimum: number;
}
