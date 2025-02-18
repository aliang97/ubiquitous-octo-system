import GenericView from '@/views/GenericView.vue';
import CombatView from '@/views/combat/CombatView.vue';
import ForestData from '@/data/locations/Forest';
import CaveData from '@/data/locations/Cave';

export const combatRoutes = {
  path: '/combat',
  component: GenericView,
  props: {
    tabLabel: 'Combat',
    sidebarOptions: [
      { name: 'combat', label: 'Forest' },
      { name: 'cave', label: 'Cave' },
    ],
  },
  children: [
    {
      path: '',
      name: 'combat',
      component: CombatView,
      props: { location: ForestData },
    },
    {
      path: 'cave',
      name: 'cave',
      component: CombatView,
      props: { location: CaveData },
    },
  ],
};
