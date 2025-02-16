import { shallowRef } from 'vue';
import ForestRenderer from '@/components/combat/locationEntity/ForestRenderer.vue';
import { slime, level1Crook, level100Boss } from '@/utils/generators/generateEnemy';
import type { Location } from '@/types';
import { LocationId } from '@/utils';

const data: Location = {
  id: LocationId.Forest,
  name: 'Generic RPG Forest Zone',
  backgroundComponent: shallowRef(ForestRenderer),
  enemyList: [slime, level1Crook, level100Boss],
};

export default data;
