import { createRouter, createWebHistory } from 'vue-router';
import GenericView from '@/views/GenericView.vue';
import HomeInventoryView from '@/views/home/InventoryView.vue';
import RecruitmentView from '@/views/home/RecruitmentView.vue';
import RosterView from '@/views/loadout/RosterView.vue';
import TransmutationView from '@/views/crafting/TransmutationView.vue';
import RitualView from '@/views/crafting/RitualView.vue';
import CombatView from '@/views/combat/CombatView.vue';
import ForestData from '@/data/locations/Forest';
import CaveData from '@/data/locations/Cave';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GenericView,
      props: {
        sidebarOptions: [
          { name: 'home', label: 'Inventory' },
          { name: 'recruitment', label: 'Recruitment' },
        ],
      },
      children: [
        {
          path: '',
          name: 'home',
          component: HomeInventoryView,
        },
        {
          path: 'recruitment',
          name: 'recruitment',
          component: RecruitmentView,
        },
      ],
    },
    {
      path: '/loadout',
      component: GenericView,
      props: {
        sidebarOptions: [{ name: 'loadout', label: 'Roster' }],
      },
      children: [
        {
          path: '',
          name: 'loadout',
          component: RosterView,
        },
      ],
    },
    {
      path: '/crafting',
      component: GenericView,
      props: {
        sidebarOptions: [
          { name: 'crafting', label: 'Transmutation' },
          { name: 'ritual', label: 'Ritual' },
        ],
      },
      children: [
        {
          path: '',
          name: 'crafting',
          component: TransmutationView,
        },
        {
          path: 'ritual',
          name: 'ritual',
          component: RitualView,
        },
      ],
    },
    {
      path: '/combat',
      component: GenericView,
      props: {
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
    },
  ],
});

export default router;
