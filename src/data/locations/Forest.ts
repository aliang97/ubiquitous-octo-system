// import { slime, level1Crook, level100Boss } from '@/utils/generators/generateEnemy';
import type { Location } from '@/types';
import { EnemyType, LocationId } from '@/utils';
import ForestImage from '@/assets/locations/forest.jpg';

const data: Location = {
  id: LocationId.Forest,
  name: 'Generic RPG Forest Zone',
  backgroundImageSrc: ForestImage,
  // enemyList: [slime, level1Crook, level100Boss],
  enemyList: [EnemyType.Slime, EnemyType.Crook, EnemyType.Boss],
};

export default data;
