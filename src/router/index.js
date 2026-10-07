import { defineRouter } from '#q-app'
import { isAuthenticated } from '../services/auth'

import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import MainLayout from '../layouts/MainLayout.vue'

import IndexPage from '../pages/index.vue'
import LoginPage from '../pages/login.vue'
import RegisterPage from '../pages/register.vue'
import CybersecurityPage from '../pages/cybersecurity.vue'
import CybersecurityLearnPage from '../pages/cybersecurity/learn.vue'
import DockerPage from '../pages/docker.vue'
import DockerLearningPage from '../pages/docker-learning.vue'
import RedBluePage from '../pages/redblue.vue'
import RedBlueLearningPage from '../pages/redblue-learning.vue'

const routes = [
  // PUBLIC
  {
    path: '/login',
    component: LoginPage,
  },

  // PUBLIC
  {
    path: '/register',
    component: RegisterPage,
  },

  // MAIN APP
  {
    path: '/',
    component: MainLayout,

    children: [
      // PUBLIC LANDING PAGE
      {
        path: '',
        component: IndexPage,
      },

      // PROTECTED — CYBERSECURITY
      {
        path: 'cybersecurity',
        component: CybersecurityPage,
        meta: {
          requiresAuth: true,
        },
      },

      // PROTECTED — CYBERSECURITY LEARNING
      {
        path: 'cybersecurity/learn',
        component: CybersecurityLearnPage,
        meta: {
          requiresAuth: true,
        },
      },

      // PROTECTED — DOCKER
      {
        path: 'docker',
        component: DockerPage,
        meta: {
          requiresAuth: true,
        },
      },

      // PROTECTED — DOCKER LEARNING
      {
        path: 'docker-learning',
        component: DockerLearningPage,
        meta: {
          requiresAuth: true,
        },
      },

      // PROTECTED — RED TEAM & BLUE TEAM
      {
        path: 'redblue',
        component: RedBluePage,
        meta: {
          requiresAuth: true,
        },
      },

      // PROTECTED — RED TEAM & BLUE TEAM LEARNING
      {
        path: 'redblue-learning',
        component: RedBlueLearningPage,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/[...path].vue'),
  },
]

export default defineRouter(() => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({
      left: 0,
      top: 0,
    }),

    routes,

    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  Router.beforeEach((to) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth === true)

    if (requiresAuth && !isAuthenticated()) {
      return {
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      }
    }

    return true
  })

  return Router
})
