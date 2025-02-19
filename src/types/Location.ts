import { EnemyType, CombatLocationId } from '@/utils/enums';

export interface Location {
  id: CombatLocationId;
  name: string;
  backgroundImageSrc: string;
  enemyList?: EnemyType[];
}
