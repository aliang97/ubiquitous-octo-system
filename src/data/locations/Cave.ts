import type { Location } from '@/types';
import { EnemyType, CombatLocationId } from '@/utils/enums';
import CaveImage from '@/assets/locations/cave.jpg';

const data: Location = {
  id: CombatLocationId.Cave,
  name: 'Creepy Cave',
  backgroundImageSrc: CaveImage,
  enemyList: [EnemyType.Slime, EnemyType.Rock, EnemyType.Rock2, EnemyType.Frogzard],
};

export default data;
