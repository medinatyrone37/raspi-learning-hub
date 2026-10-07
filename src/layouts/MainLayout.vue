<template>
  <q-layout view="hHh lpR fFf" class="app-layout">
    <!-- TOP NAVIGATION -->
    <q-header class="app-header">
      <q-toolbar class="header-bar">
        <!-- BRAND -->
        <router-link class="header-brand" to="/" aria-label="Raspi Learning Hub home">
          <span class="brand-mark">
            <q-icon name="memory" size="24px" />
          </span>

          <span class="brand-text">
            <span class="brand-name">Raspi Learning Hub</span>
            <span class="brand-sub">IT Learning Platform</span>
          </span>
        </router-link>

        <!-- NAVIGATION -->
        <nav class="top-nav" aria-label="Main navigation">
          <router-link to="/" class="top-nav-item" :class="{ 'is-active': route.path === '/' }">
            <q-icon name="home" size="20px" />
            <span>Home</span>
          </router-link>

          <router-link
            to="/cybersecurity"
            class="top-nav-item"
            :class="{ 'is-active': route.path.startsWith('/cybersecurity') }"
          >
            <q-icon name="security" size="21px" />
            <span>Cybersecurity</span>
          </router-link>

          <router-link
            to="/docker"
            class="top-nav-item"
            :class="{ 'is-active': route.path.startsWith('/docker') }"
          >
            <!-- Docker logo -->
            <svg class="docker-logo" viewBox="0 0 64 48" aria-hidden="true">
              <path
                d="M61.3 20.3c-1.8-1.2-4.1-1.7-6.4-1.4
                   -.8-3.1-2.8-5.7-5.5-7.4l-1.2-.7-1.1 1
                   c-1.8 1.7-2.7 4-2.7 6.3 0 .8.1 1.5.3 2.2
                   -2.1 1.1-4.7 1.6-7.5 1.6H1.5
                   c-.8 0-1.4.6-1.4 1.4 0 7.5 2.4 13.2
                   7.1 17 4.4 3.5 10.7 5.2 18.7 5.2
                   16.1 0 28.1-7.6 32.6-20.5
                   1.7.1 3.4-.2 4.8-.9l1.3-.7-.4-1.5
                   c-.4-1.8-1.4-3.3-2.9-4.6Z"
                fill="currentColor"
              />

              <path
                d="M11 19.2h7v-6h-7v6Zm8.5 0h7v-6h-7v6ZM11 11.8h7V6h-7v5.8Zm8.5 0h7V6h-7v5.8ZM28 19.2h7v-6h-7v6Zm-1.5-7.4h7V6h-7v5.8Zm10 7.4h7v-6h-7v6Z"
                fill="currentColor"
              />
            </svg>

            <span>Docker</span>
          </router-link>

          <router-link
            to="/redblue"
            class="top-nav-item"
            :class="{ 'is-active': route.path.startsWith('/redblue') }"
          >
            <span class="redblue-logo" aria-hidden="true">
              <span class="redblue-side redblue-side-red"></span>
              <span class="redblue-side redblue-side-blue"></span>

              <span class="redblue-shield">
                <q-icon name="security" size="14px" />
              </span>
            </span>

            <span>Red &amp; Blue</span>
          </router-link>
        </nav>

        <!-- USER ACTIONS -->
        <div class="header-actions">
          <q-btn-dropdown
            v-if="user"
            flat
            no-caps
            no-wrap
            class="header-user"
            dropdown-icon="expand_more"
          >
            <template #label>
              <span class="user-icon">
                <q-icon name="person" size="18px" />
              </span>

              <span class="user-name">
                {{ user.username }}
              </span>
            </template>

            <q-list class="user-menu">
              <q-item clickable v-close-popup>
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>{{ user.username }}</q-item-label>
                  <q-item-label caption>Learning account</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup class="logout-menu-item" @click="handleLogout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <q-btn
            v-if="user"
            flat
            dense
            no-caps
            icon="logout"
            label="Logout"
            class="header-logout"
            aria-label="Logout"
            @click="handleLogout"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- PAGE CONTENT -->
    <q-page-container class="app-body">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getUser, logout } from '../services/auth'

const route = useRoute()
const router = useRouter()

const user = ref(getUser())

const handleLogout = async () => {
  logout()
  user.value = null
  await router.push('/')
}
</script>

<style scoped>
.app-layout {
  --primary: #10b981;
  --secondary: #34d399;
  --deep: #064e3b;
  --bg: #f6f9f8;
  --surface: #ffffff;
  --ink: #173a32;
  --muted: #70837e;
  --line: #e4ece9;

  background: var(--bg);
  color: var(--ink);
}

/* =========================================================
   HEADER
   ========================================================= */

.app-header {
  background: rgba(255, 255, 255, 0.96);
  color: var(--ink);
  border-bottom: 1px solid rgba(228, 236, 233, 0.95);
  box-shadow: 0 4px 24px rgba(9, 44, 36, 0.06);
  backdrop-filter: blur(18px);
}

.header-bar {
  width: 100%;
  max-width: 1600px;
  min-height: 78px;
  margin: 0 auto;
  padding: 0 40px;

  display: flex;
  align-items: center;
  gap: 34px;
}

/* =========================================================
   BRAND
   ========================================================= */

.header-brand {
  flex: 0 0 auto;

  display: inline-flex;
  align-items: center;
  gap: 13px;

  color: var(--ink);
  text-decoration: none;
}

.brand-mark {
  width: 48px;
  height: 48px;

  display: grid;
  place-items: center;

  border-radius: 15px;

  color: #fff;
  background: linear-gradient(145deg, #34d399 0%, #10b981 48%, #087f68 100%);

  box-shadow:
    0 9px 22px rgba(16, 185, 129, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.brand-name {
  font-size: 17px;
  font-weight: 850;
  letter-spacing: -0.035em;
  color: #17483e;
}

.brand-sub {
  margin-top: 5px;

  color: #8a9b96;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* =========================================================
   NAVIGATION
   ========================================================= */

.top-nav {
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 6px;
}

.top-nav-item {
  position: relative;

  min-height: 46px;
  padding: 0 17px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  border-radius: 12px;

  color: #526d65;
  text-decoration: none;

  font-size: 14px;
  font-weight: 750;

  transition:
    color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.top-nav-item:hover {
  color: #17483e;
  background: #f0f8f5;
  transform: translateY(-1px);
}

.top-nav-item.is-active {
  color: #14966f;
  background: #ecfbf5;
}

.top-nav-item.is-active::after {
  content: '';

  position: absolute;
  left: 16px;
  right: 16px;
  bottom: -1px;

  height: 3px;
  border-radius: 999px;

  background: #2ac58e;
}

/* =========================================================
   DOCKER LOGO
   ========================================================= */

.docker-logo {
  width: 25px;
  height: 20px;

  flex: 0 0 auto;

  color: #2496ed;

  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.top-nav-item:hover .docker-logo {
  transform: translateY(-1px) scale(1.04);
}

.top-nav-item.is-active .docker-logo {
  color: #2496ed;
}

/* =========================================================
   RED / BLUE LOGO
   ========================================================= */

.redblue-logo {
  position: relative;

  width: 27px;
  height: 27px;

  display: flex;
  align-items: stretch;

  overflow: hidden;

  border-radius: 8px;

  box-shadow: 0 4px 10px rgba(9, 44, 36, 0.14);

  flex: 0 0 auto;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.redblue-side {
  flex: 1;
}

.redblue-side-red {
  background: linear-gradient(180deg, #ef4444 0%, #b91c1c 100%);
}

.redblue-side-blue {
  background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
}

.redblue-shield {
  position: absolute;

  left: 50%;
  top: 50%;

  width: 18px;
  height: 21px;

  display: grid;
  place-items: center;

  transform: translate(-50%, -50%);

  color: #17483e;

  background: rgba(255, 255, 255, 0.96);

  clip-path: polygon(50% 0%, 92% 13%, 86% 64%, 50% 100%, 14% 64%, 8% 13%);

  filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.16));
}

.top-nav-item:hover .redblue-logo {
  transform: translateY(-1px) scale(1.04);

  box-shadow: 0 6px 13px rgba(9, 44, 36, 0.17);
}

.top-nav-item.is-active .redblue-logo {
  box-shadow: 0 5px 13px rgba(9, 44, 36, 0.18);
}

/* =========================================================
   USER
   ========================================================= */

.header-actions {
  flex: 0 0 auto;

  display: flex;
  align-items: center;
  gap: 10px;
}

.header-user {
  min-height: 44px;
  padding: 0 13px;

  border: 1px solid #dcebe6;
  border-radius: 999px;

  background: #f5fbf8;
  color: #205247;

  font-size: 13px;
  font-weight: 750;

  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.header-user:hover {
  background: #ecf8f4;
  border-color: #cde4dc;
}

.user-icon {
  width: 30px;
  height: 30px;

  display: grid;
  place-items: center;

  margin-right: 7px;

  border-radius: 50%;

  color: #176b58;
  background: #dff6ed;
}

.user-name {
  max-width: 120px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-menu {
  min-width: 220px;
  padding: 8px;

  border-radius: 14px;
}

.logout-menu-item {
  color: #b42318;
  border-radius: 9px;
}

.logout-menu-item:hover {
  background: #fff2f1;
}

.header-logout {
  min-height: 44px;
  padding: 0 16px;

  border: 1px solid #ffd9d5;
  border-radius: 999px;

  color: #c43125;
  background: #fff8f7;

  font-weight: 750;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.header-logout:hover {
  background: #fff0ee;
  border-color: #ffc9c4;
  transform: translateY(-1px);
}

/* =========================================================
   PAGE BODY
   ========================================================= */

.app-body {
  background:
    radial-gradient(700px 350px at 85% 0%, rgba(52, 211, 153, 0.08), transparent 70%),
    radial-gradient(600px 320px at 0% 100%, rgba(16, 185, 129, 0.05), transparent 70%), var(--bg);
}

/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1200px) {
  .header-bar {
    padding: 0 26px;
    gap: 18px;
  }

  .top-nav-item {
    padding: 0 11px;
  }

  .brand-name {
    font-size: 15px;
  }

  .brand-sub {
    font-size: 9px;
  }
}

@media (max-width: 980px) {
  .header-bar {
    padding: 0 20px;
    gap: 12px;
  }

  .top-nav {
    gap: 2px;
  }

  .top-nav-item {
    padding: 0 9px;
    gap: 6px;
    font-size: 13px;
  }

  .header-user {
    display: none;
  }
}

@media (max-width: 800px) {
  .header-bar {
    min-height: 70px;
    padding: 0 16px;
  }

  .brand-sub {
    display: none;
  }

  .brand-mark {
    width: 42px;
    height: 42px;
    border-radius: 13px;
  }

  .brand-name {
    font-size: 14px;
  }

  .top-nav {
    justify-content: flex-end;
  }

  .top-nav-item {
    min-height: 40px;
    padding: 0 8px;
  }

  .top-nav-item > span:not(.redblue-logo) {
    display: none;
  }

  .top-nav-item.is-active::after {
    left: 8px;
    right: 8px;
  }

  .docker-logo {
    width: 25px;
    height: 20px;
  }

  .header-logout {
    width: 42px;
    min-height: 40px;
    padding: 0;
  }

  .header-logout .q-icon {
    margin: 0;
  }

  .header-logout :deep(.q-btn__content) {
    justify-content: center;
  }

  .header-logout :deep(.q-btn__content > span:last-child) {
    display: none;
  }
}

@media (max-width: 520px) {
  .header-bar {
    min-height: 64px;
    padding: 0 11px;
    gap: 7px;
  }

  .brand-mark {
    width: 38px;
    height: 38px;
    border-radius: 11px;
  }

  .brand-name {
    font-size: 12px;
  }

  .top-nav {
    gap: 0;
  }

  .top-nav-item {
    min-height: 37px;
    padding: 0 6px;
  }

  .top-nav-item.is-active::after {
    left: 6px;
    right: 6px;
  }

  .docker-logo {
    width: 23px;
    height: 18px;
  }

  .redblue-logo {
    width: 21px;
    height: 23px;
  }
}
</style>
