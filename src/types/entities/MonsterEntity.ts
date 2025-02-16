import type { CharacterEntity, LootTable } from '@/types';
import type { EnemyType } from '@/utils';

export interface MonsterEntity extends CharacterEntity {
  enemyType: EnemyType;
  lootTable?: LootTable;
  onDeath?: () => void;
  maximumHitPoints: number;
  currentHitPoints: number;
  attacksPerSecond: number;
  hitDamageMaximum: number;
  hitDamageMinimum: number;
}
