const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),

    children: [
      {
        path: '',
        component: () => import('pages/index.vue'),
      },

      {
        path: 'cybersecurity',
        component: () => import('pages/cybersecurity.vue'),
      },

      {
        path: 'docker',
        component: () => import('pages/docker.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/[...path].vue'),
  },
]

export default routes



