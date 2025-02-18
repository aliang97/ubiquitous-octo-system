import type { Location } from '@/types';
import { EnemyType, LocationId } from '@/utils/enums';
import ForestImage from '@/assets/locations/forest.jpg';

const data: Location = {
  id: LocationId.Forest,
  name: 'Friendly Forest',
  backgroundImageSrc: ForestImage,
  enemyList: [EnemyType.Slime, EnemyType.Crook, EnemyType.Boss],
};

export default data;
