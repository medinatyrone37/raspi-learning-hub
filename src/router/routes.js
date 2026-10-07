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
        path: 'cybersecurity/learn',
        component: () => import('pages/cybersecurity/learn.vue'),
      },

      {
        path: 'docker',
        component: () => import('pages/docker.vue'),
      },

      {
        path: 'docker-learning',
        component: () => import('pages/docker-learning.vue'),
      },

      {
        path: 'redblue',
        component: () => import('pages/redblue.vue'),
      },

      {
        path: 'redblue-learning',
        component: () => import('pages/redblue-learning.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/[...path].vue'),
  },
]

export default routes
