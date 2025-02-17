import { EnemyType, LocationId } from '@/utils';

export interface Location {
  id: LocationId;
  name: string;
  backgroundImageSrc: string;
  enemyList?: EnemyType[];
}
