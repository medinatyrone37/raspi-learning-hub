import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'

import IndexPage from '../pages/index.vue'
import CybersecurityPage from '../pages/cybersecurity.vue'
import CybersecurityLearnPage from '../pages/cybersecurity/learn.vue'
import DockerPage from '../pages/docker.vue'
import DockerLearningPage from '../pages/docker-learning.vue'

export default defineRouter(() => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const routes = [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          component: IndexPage,
        },
        {
          path: 'cybersecurity',
          component: CybersecurityPage,
        },
        {
          path: 'cybersecurity/learn',
          component: CybersecurityLearnPage,
        },
        {
          path: 'docker',
          component: DockerPage,
        },
        {
          path: 'docker-learning',
          component: DockerLearningPage,
        },
      ],
    },

    {
      path: '/:catchAll(.*)*',
      component: () => import('../pages/[...path].vue'),
    },
  ]

  const Router = createRouter({
    scrollBehavior: () => ({
      left: 0,
      top: 0,
    }),

    routes,

    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  return Router
})
