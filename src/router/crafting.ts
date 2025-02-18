import GenericView from '@/views/GenericView.vue';
import CraftingView from '@/views/crafting/CraftingView.vue';
import RunecraftingView from '@/views/crafting/RunecraftingView.vue';

export const craftingRoutes = {
  path: '/crafting',
  component: GenericView,
  props: {
    tabLabel: 'Magic Room',
    sidebarOptions: [
      { name: 'crafting', label: 'Landing Page' },
      { name: 'runecrafting', label: 'Runecrafting' },
    ],
  },
  children: [
    {
      path: '',
      name: 'crafting',
      component: CraftingView,
    },
    {
      path: 'runecrafting',
      name: 'runecrafting',
      component: RunecraftingView,
    },
  ],
};
