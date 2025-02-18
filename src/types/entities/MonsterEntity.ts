import type { CharacterEntity, LootTable, CombatInstance } from '@/types';
import { EnemyType } from '@/utils/enums';

export interface MonsterEntity extends CharacterEntity {
  attacksPerSecond: number;
  currentHitPoints: number;
  enemyType: EnemyType;
  hitDamageMaximum: number;
  hitDamageMinimum: number;
  maximumHitPoints: number;

  lootTable?: LootTable;
  onDeath?: (c: CombatInstance) => void;
}
