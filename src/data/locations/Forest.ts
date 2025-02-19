import type { Location } from '@/types';
import { EnemyType, CombatLocationId } from '@/utils/enums';
import ForestImage from '@/assets/locations/forest.jpg';

const data: Location = {
  id: CombatLocationId.Forest,
  name: 'Friendly Forest',
  backgroundImageSrc: ForestImage,
  enemyList: [EnemyType.Slime, EnemyType.Crook, EnemyType.Boss],
};

export default data;
