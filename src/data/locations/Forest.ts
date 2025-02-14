import type { LocationEntity } from '@/types/LocationEntity';
import { shallowRef } from "vue";
import Slime from '@/data/enemies/Slime';
import Crook from '@/data/enemies/Crook';
import MafiaBoss from '@/data/enemies/MafiaBoss';
import ForestRenderer from '@/components/combat/locationEntity/ForestRenderer.vue';

const data: LocationEntity = {
  id: 'loc-forest',
  name: 'Generic RPG Forest Zone',
  backgroundComponent: shallowRef(ForestRenderer),
  enemyList: [
    Slime,
    Crook,
    MafiaBoss
  ],
}

export default data;
