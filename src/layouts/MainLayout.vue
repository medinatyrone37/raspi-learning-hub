<template>
  <q-layout view="LHh LpR lFf" class="app-layout">
    <!-- TOP HEADER -->
    <q-header class="app-header">
      <q-toolbar class="header-bar">
        <q-btn
          flat
          round
          dense
          class="header-toggle"
          :icon="showMini || isMobile ? 'menu' : 'menu_open'"
          :aria-label="isMobile ? 'Open navigation menu' : showMini ? 'Expand sidebar' : 'Collapse sidebar'"
          @click="toggleNav"
        />

        <div class="page-info">
          <div class="page-title">{{ pageTitle }}</div>
          <nav class="crumbs" aria-label="Breadcrumb">{{ crumbs.join(' / ') }}</nav>
        </div>
      </q-toolbar>
    </q-header>

    <!-- SIDEBAR -->
    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
      side="left"
      :breakpoint="1024"
      :width="272"
      :mini="showMini"
      :mini-width="76"
    >
      <div class="side" :class="{ 'is-mini': showMini }" @keydown.esc="closeIfMobile">
        <!-- Brand -->
        <router-link class="brand" to="/" aria-label="Raspi Learning Hub home" @click="closeIfMobile">
          <span class="brand-mark"><q-icon name="memory" size="22px" /></span>
          <span class="brand-text">
            <span class="brand-name">Raspi Learning Hub</span>
            <span class="brand-sub">IT Learning Platform</span>
          </span>
        </router-link>

        <!-- Navigation -->
        <q-list tag="nav" class="nav-list" aria-label="Main navigation">
          <template v-for="section in sections" :key="section.label">
            <div class="section-label">{{ section.label }}</div>

            <template v-for="item in section.items" :key="item.label">
              <q-item
                v-if="item.to"
                :to="item.to"
                clickable
                class="nav-item"
                :class="{ 'is-active': isActive(item) }"
                :aria-current="isActive(item) ? 'page' : undefined"
                @click="closeIfMobile"
              >
                <span class="nav-icon"><q-icon :name="item.icon" size="20px" /></span>
                <span class="nav-label">{{ item.label }}</span>

                <q-tooltip v-if="showMini" anchor="center right" self="center left" :offset="[12, 0]" class="nav-tip">
                  <b>{{ item.label }}</b>
                  <span>{{ item.hint }}</span>
                </q-tooltip>
              </q-item>

              <div v-else class="nav-item soon" aria-disabled="true">
                <span class="nav-icon"><q-icon :name="item.icon" size="20px" /></span>
                <span class="nav-label">{{ item.label }}</span>
                <span class="soon-badge">Soon</span>

                <q-tooltip v-if="showMini" anchor="center right" self="center left" :offset="[12, 0]" class="nav-tip">
                  <b>{{ item.label }}</b>
                  <span>Coming soon</span>
                </q-tooltip>
              </div>
            </template>
          </template>
        </q-list>

        <!-- Footer -->
        <div class="side-footer">
          <div class="status">
            <span class="status-dot"></span>
            <span class="status-text">
              <b>Local Learning Server</b>
              <span>Self-hosted on Raspberry Pi</span>
            </span>
            <q-tooltip v-if="showMini" anchor="center right" self="center left" :offset="[12, 0]" class="nav-tip">
              <b>Local Learning Server</b>
              <span>Self-hosted on Raspberry Pi</span>
            </q-tooltip>
          </div>

          <q-btn
            v-if="!isMobile"
            flat
            no-caps
            class="collapse-btn"
            :icon="showMini ? 'chevron_right' : 'chevron_left'"
            :label="showMini ? undefined : 'Collapse'"
            :aria-label="showMini ? 'Expand sidebar' : 'Collapse sidebar'"
            @click="mini = !mini"
          >
            <q-tooltip v-if="showMini" anchor="center right" self="center left" :offset="[12, 0]" class="nav-tip">
              <b>Expand sidebar</b>
            </q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="app-body">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const route = useRoute()

const drawerOpen = ref(false)
const mini = ref(false)

/* Matches the drawer breakpoint below: under 1024px the sidebar is an off-canvas drawer. */
const isMobile = computed(() => $q.screen.width < 1024)
const showMini = computed(() => mini.value && !isMobile.value)

/* Items without `to` have no route yet and render as "Coming soon". */
const sections = [
  {
    label: 'Main',
    items: [{ label: 'Home', icon: 'home', to: '/', match: ['/'], hint: 'Platform overview' }],
  },
  {
    label: 'Learning',
    items: [
      { label: 'Cybersecurity', icon: 'security', to: '/cybersecurity', match: ['/cybersecurity'], hint: 'Security fundamentals' },
      { label: 'Docker', icon: 'deployed_code', to: '/docker', match: ['/docker', '/docker-learning'], hint: 'Containers and Compose' },
      { label: 'Linux', icon: 'terminal' },
      { label: 'Networking', icon: 'lan' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Raspberry Pi', icon: 'memory' },
      { label: 'Web Server', icon: 'dns' },
    ],
  },
]

/* Active when the path equals a matched path or is nested under it (e.g. /cybersecurity/learn). */
const isActive = (item) =>
  (item.match || []).some((path) =>
    path === '/' ? route.path === '/' : route.path === path || route.path.startsWith(`${path}/`),
  )

const activeItem = computed(() => sections.flatMap((s) => s.items).find(isActive))

const pageTitle = computed(() => activeItem.value?.label || 'Raspi Learning Hub')

const crumbs = computed(() => {
  const list = ['Learning Hub']
  if (activeItem.value && activeItem.value.to !== '/') list.push(activeItem.value.label)
  if (route.path.includes('learn')) list.push('Lessons')
  return list
})

const toggleNav = () => {
  if (isMobile.value) drawerOpen.value = !drawerOpen.value
  else mini.value = !mini.value
}

const closeIfMobile = () => {
  if (isMobile.value) drawerOpen.value = false
}
</script>

<style scoped>
.app-layout {
  --primary: #10b981; --secondary: #34d399; --bg: #f8fafc; --ink: #0b2b26; --text: #17302b;
  --muted: #5d726c; --line: #e2e8e5; --deep: #064e3b;
  font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  color: var(--text);
}
.app-body { background: var(--bg); }

/* HEADER */
.app-header { background: rgba(255, 255, 255, 0.92); color: var(--ink); border-bottom: 1px solid var(--line); backdrop-filter: blur(10px); }
.header-bar { min-height: 64px; padding: 0 20px; gap: 14px; }
.header-toggle { color: var(--muted); transition: color 0.15s, background 0.15s; }
.header-toggle:hover { color: var(--ink); background: #eef5f2; }
.page-info { min-width: 0; line-height: 1.25; }
.page-title { font-size: 17px; font-weight: 800; letter-spacing: -0.01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.crumbs { font-size: 12px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* SIDEBAR SHELL */
.side { min-height: 100%; display: flex; flex-direction: column; padding: 0 12px 12px; background: linear-gradient(180deg, #f1fbf6 0, #fff 150px); }

/* BRAND */
.brand { display: flex; align-items: center; gap: 12px; height: 72px; margin: 0 -2px; padding: 0 4px; color: var(--ink); text-decoration: none; border-radius: 12px; }
.brand:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
.brand-mark { width: 42px; height: 42px; flex-shrink: 0; border-radius: 13px; display: grid; place-items: center; color: #fff; background: linear-gradient(145deg, var(--primary), var(--deep)); box-shadow: 0 6px 16px rgba(16, 185, 129, 0.28); }
.brand-text, .nav-label, .status-text { display: flex; flex-direction: column; min-width: 0; max-width: 200px; overflow: hidden; white-space: nowrap; transition: opacity 0.15s ease, max-width 0.2s ease; }
.brand-name { font-size: 15px; font-weight: 800; letter-spacing: -0.01em; }
.brand-sub { font-size: 12px; color: var(--muted); }

/* NAV */
.nav-list { padding: 0; }
.section-label { padding: 20px 12px 8px; font-size: 11px; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #8aa098; overflow: hidden; white-space: nowrap; transition: all 0.2s ease; }

.nav-item { position: relative; display: flex; align-items: center; gap: 12px; min-height: 44px; margin-bottom: 3px; padding: 0 8px; border-radius: 12px; color: var(--muted); font-size: 14.5px; font-weight: 600; transition: background 0.15s, color 0.15s; }
.nav-item :deep(.q-focus-helper) { display: none; }
.nav-item:not(.soon):hover { background: #f1f7f4; color: var(--ink); }
.nav-item:focus-visible { outline: 2px solid var(--primary); outline-offset: -2px; }
.nav-icon { width: 34px; height: 34px; flex-shrink: 0; border-radius: 10px; display: grid; place-items: center; transition: background 0.15s, color 0.15s, transform 0.15s; }
.side:not(.is-mini) .nav-item:not(.soon):hover .nav-icon { transform: translateX(2px); }

.nav-item.is-active { color: #047857; font-weight: 700; background: linear-gradient(90deg, #e3f8ee, #f0fdf8); }
.nav-item.is-active .nav-icon { color: #fff; background: var(--primary); box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3); }
.nav-item.is-active::before { content: ''; position: absolute; left: -12px; top: 9px; bottom: 9px; width: 4px; border-radius: 0 4px 4px 0; background: var(--primary); }

.nav-item.soon { color: #9bb0a9; cursor: default; }
.soon-badge { margin-left: auto; padding: 2px 8px; border-radius: 999px; background: #eef2f1; color: #7b8d88; font-size: 10px; font-weight: 800; letter-spacing: 0.03em; transition: opacity 0.15s; }

/* FOOTER */
.side-footer { margin-top: auto; padding-top: 16px; display: flex; flex-direction: column; gap: 10px; }
.status { display: flex; align-items: center; gap: 11px; padding: 11px 12px; border-radius: 12px; background: #f4f9f7; border: 1px solid var(--line); }
.status-dot { width: 9px; height: 9px; flex-shrink: 0; border-radius: 50%; background: var(--primary); box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.18); }
.status-text b { font-size: 13px; font-weight: 700; color: var(--ink); }
.status-text span { font-size: 11.5px; color: var(--muted); }
.collapse-btn { justify-content: flex-start; padding: 6px 12px; border-radius: 10px; color: var(--muted); font-weight: 600; font-size: 13.5px; }
.collapse-btn:hover { background: #f1f7f4; color: var(--ink); }

/* COLLAPSED */
.is-mini .brand-text, .is-mini .nav-label, .is-mini .status-text, .is-mini .soon-badge { max-width: 0; opacity: 0; }
.is-mini .brand { justify-content: center; padding: 0; }
.is-mini .section-label { height: 1px; padding: 0; margin: 14px 10px; font-size: 0; background: var(--line); }
.is-mini .section-label:first-of-type { display: none; }
.is-mini .nav-item { justify-content: center; gap: 0; padding: 0; }
.is-mini .status { justify-content: center; gap: 0; padding: 12px 0; }
.is-mini .collapse-btn { justify-content: center; padding: 6px 0; }

@media (prefers-reduced-motion: reduce) {
  .nav-item, .nav-icon, .brand-text, .nav-label, .status-text, .section-label { transition: none; }
}
</style>

<!-- Tooltips are teleported outside the component, so they are styled unscoped. -->
<style>
.nav-tip { padding: 8px 12px; border-radius: 10px; background: #0b2b26; color: #fff; font-size: 12px; }
.nav-tip b { display: block; font-size: 13px; }
.nav-tip span { display: block; margin-top: 2px; color: #a9cfc1; }
</style>