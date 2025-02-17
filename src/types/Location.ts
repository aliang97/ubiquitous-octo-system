import { EnemyType, LocationId } from '@/utils/enums';

export interface Location {
  id: LocationId;
  name: string;
  backgroundImageSrc: string;
  enemyList?: EnemyType[];
}
