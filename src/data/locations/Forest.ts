import { shallowRef } from 'vue';
import ForestRenderer from '@/components/combat/locationEntity/ForestRenderer.vue';
import { CombatLocation } from '@/scripts/combat';
import { LocationEntity } from '@/scripts/entities';
import { slime, level1Crook, level100Boss } from '../enemies';

const data: LocationEntity = {
  id: CombatLocation.Forest,
  name: 'Generic RPG Forest Zone',
  backgroundComponent: shallowRef(ForestRenderer),
  enemyList: [slime, level1Crook, level100Boss],
};

export default data;
