import { createRouter, createWebHistory } from 'vue-router';
import GenericView from '@/views/GenericView.vue';
import HomeInventoryView from '@/views/home/InventoryView.vue';
import RecruitmentView from '@/views/home/RecruitmentView.vue';
import RosterView from '@/views/loadout/RosterView.vue';
import { craftingRoutes } from './crafting';
import { combatRoutes } from './combat';
import { processingRoutes } from './processing';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: GenericView,
      props: {
        tabLabel: 'Town Hall',
        sidebarOptions: [
          { name: 'home', label: 'Inventory' },
          { name: 'recruitment', label: 'Recruitment' },
        ],
      },
      children: [
        {
          path: '',
          name: 'home',
          alias: 'home',
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
        tabLabel: 'Dormitory',
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
    { ...craftingRoutes },
    { ...combatRoutes },
    { ...processingRoutes },
  ],
});

export default router;
