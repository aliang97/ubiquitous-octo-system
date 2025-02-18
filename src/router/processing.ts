import GenericView from '@/views/GenericView.vue';
import ProcessingView from '@/views/processing/ProcessingView.vue';
import BlacksmithView from '@/views/processing/BlacksmithView.vue';

export const processingRoutes = {
  path: '/processing',
  component: GenericView,
  props: {
    tabLabel: 'Workshop',
    sidebarOptions: [
      { name: 'processing', label: 'Landing Page' },
      { name: 'blacksmith', label: 'Blacksmith' },
    ],
  },
  children: [
    {
      path: '',
      name: 'processing',
      component: ProcessingView,
    },
    {
      path: 'Blacksmith',
      name: 'blacksmith',
      component: BlacksmithView,
    },
  ],
};
