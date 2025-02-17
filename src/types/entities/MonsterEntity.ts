import type { CharacterEntity, LootTable, CombatInstance } from '@/types';
import { EnemyType } from '@/utils/enums';

export interface MonsterEntity extends CharacterEntity {
  enemyType: EnemyType;
  lootTable?: LootTable;
  onDeath?: (c: CombatInstance) => void;
  maximumHitPoints: number;
  currentHitPoints: number;
  attacksPerSecond: number;
  hitDamageMaximum: number;
  hitDamageMinimum: number;
}
