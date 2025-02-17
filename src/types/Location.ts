import type { MonsterEntity } from '@/types';
import { LocationId } from '@/utils';

export interface Location {
  id: LocationId;
  name: string;
  backgroundImageSrc: string;
  enemyList?: MonsterEntity[];
}
