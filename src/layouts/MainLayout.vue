<template>
  <q-layout view="hHh lpR fFf" class="app-layout">
    <!-- TOP NAVIGATION -->
    <q-header class="app-header">
      <!-- LIVE STATUS BAR -->
      <div class="status-bar" aria-hidden="true">
        <div class="status-left">
          <span class="status-dot"></span>
          <span class="status-item">SYSTEM ONLINE</span>
          <span class="status-sep">|</span>
          <span class="status-item">KERNEL 6.8.0-hub</span>
          <span class="status-sep">|</span>
          <span class="status-item">UPTIME {{ uptimeText }}</span>
        </div>
        <div class="status-ticker">
          <div class="ticker-track">
            <span v-for="(t, i) in tickerItems.concat(tickerItems)" :key="i" class="ticker-item">
              <span class="ticker-prompt">$</span> {{ t }}
            </span>
          </div>
        </div>
        <div class="status-right">
          <span class="status-item">{{ clockText }}</span>
        </div>
      </div>

      <q-toolbar class="header-bar">
        <!-- BRAND -->
        <router-link class="header-brand" to="/" aria-label="Linux Cybersecurity Learning Hub home">
          <span class="brand-mark">
            <span class="brand-ring"></span>
            <q-icon name="terminal" size="24px" />
          </span>

          <span class="brand-text">
            <span class="brand-name">
              Linux Cybersecurity Learning Hub<span class="brand-cursor">_</span>
            </span>
            <span class="brand-sub">root@learning-hub:~#</span>
          </span>
        </router-link>

        <!-- NAVIGATION -->
        <nav class="top-nav" aria-label="Main navigation">
          <!-- HOME -->
          <router-link to="/" class="top-nav-item" :class="{ 'is-active': route.path === '/' }">
            <q-icon name="home" size="20px" />
            <span>Home</span>
          </router-link>

          <!-- CYBERSECURITY DROPDOWN -->
          <div
            class="nav-dropdown"
            @mouseenter="showCybersecurityMenu = true"
            @mouseleave="showCybersecurityMenu = false"
          >
            <button
              type="button"
              class="top-nav-item nav-trigger"
              :class="{
                'is-active':
                  route.path.startsWith('/cybersecurity') ||
                  route.path.startsWith('/redblue') ||
                  route.path.startsWith('/networking') ||
                  route.path.startsWith('/docker'),
                'menu-open': showCybersecurityMenu,
              }"
              :aria-expanded="showCybersecurityMenu"
              aria-haspopup="true"
              @click="showCybersecurityMenu = !showCybersecurityMenu"
              @focus="showCybersecurityMenu = true"
            >
              <q-icon name="security" size="21px" />
              <span>Cybersecurity</span>
              <q-icon name="keyboard_arrow_down" size="18px" class="dropdown-chevron" />
            </button>

            <div class="nav-menu" :class="{ 'menu-open': showCybersecurityMenu }">
              <div class="menu-head">
                <span class="menu-head-cmd">$ ls ~/cybersecurity</span>
              </div>

              <router-link
                v-for="item in cyberItems"
                :key="item.to"
                :to="item.to"
                class="nav-menu-item"
                :class="{ 'menu-item-active': route.path.startsWith(item.to) }"
                @click="showCybersecurityMenu = false"
              >
                <span class="submenu-icon" :class="item.cls">
                  <q-icon :name="item.icon" size="19px" />
                </span>
                <span class="submenu-text">
                  <span class="submenu-title">{{ item.title }}</span>
                  <span class="submenu-description">{{ item.desc }}</span>
                </span>
                <q-icon name="chevron_right" size="18px" class="submenu-arrow" />
              </router-link>
            </div>
          </div>

          <!-- LINUX DROPDOWN -->
          <div
            class="nav-dropdown"
            @mouseenter="showLinuxMenu = true"
            @mouseleave="showLinuxMenu = false"
          >
            <button
              type="button"
              class="top-nav-item nav-trigger"
              :class="{
                'is-active': route.path.startsWith('/linux'),
                'menu-open': showLinuxMenu,
              }"
              :aria-expanded="showLinuxMenu"
              aria-haspopup="true"
              @click="showLinuxMenu = !showLinuxMenu"
              @focus="showLinuxMenu = true"
            >
              <q-icon name="terminal" size="21px" />
              <span>Linux</span>
              <q-icon name="keyboard_arrow_down" size="18px" class="dropdown-chevron" />
            </button>

            <div class="nav-menu" :class="{ 'menu-open': showLinuxMenu }">
              <div class="menu-head">
                <span class="menu-head-cmd">$ ls ~/linux</span>
              </div>

              <router-link
                v-for="item in linuxItems"
                :key="item.to"
                :to="item.to"
                class="nav-menu-item"
                :class="{
                  'menu-item-active': item.exact
                    ? route.path === item.to
                    : route.path.startsWith(item.to),
                }"
                @click="showLinuxMenu = false"
              >
                <span class="submenu-icon" :class="item.cls">
                  <q-icon :name="item.icon" size="19px" />
                </span>
                <span class="submenu-text">
                  <span class="submenu-title">{{ item.title }}</span>
                  <span class="submenu-description">{{ item.desc }}</span>
                </span>
                <q-icon name="chevron_right" size="18px" class="submenu-arrow" />
              </router-link>
            </div>
          </div>
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
      <div class="header-scan" aria-hidden="true"></div>
    </q-header>

    <!-- PAGE CONTENT -->
    <q-page-container class="app-body">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getUser, logout } from '../services/auth'

const route = useRoute()
const router = useRouter()

const user = ref(getUser())
const showCybersecurityMenu = ref(false)
const showLinuxMenu = ref(false)

const handleLogout = async () => {
  logout()
  user.value = null
  await router.push('/')
}

/* NAV DATA */
const cyberItems = [
  {
    to: '/cybersecurity',
    title: 'Cybersecurity Overview',
    desc: 'Introduction and fundamentals',
    icon: 'security',
    cls: 'submenu-security',
  },
  {
    to: '/redblue',
    title: 'Red & Blue Team',
    desc: 'Offensive and defensive security',
    icon: 'shield',
    cls: 'submenu-redblue',
  },
  {
    to: '/networking',
    title: 'Networking',
    desc: 'Servers and network services',
    icon: 'lan',
    cls: 'submenu-networking',
  },
  {
    to: '/docker',
    title: 'Docker',
    desc: 'Containers and deployment',
    icon: 'view_in_ar',
    cls: 'submenu-docker',
  },
]

const linuxItems = [
  {
    to: '/linux',
    exact: true,
    title: 'Linux Overview',
    desc: 'Linux learning hub and study materials',
    icon: 'terminal',
    cls: 'submenu-linux',
  },
  {
    to: '/linux/services',
    title: 'Linux Server Services',
    desc: 'Web, FTP, database, and proxy servers',
    icon: 'dns',
    cls: 'submenu-linux-services',
  },
  {
    to: '/linux/hardening',
    title: 'Linux Server Hardening',
    desc: 'Secure access, permissions, and firewall',
    icon: 'admin_panel_settings',
    cls: 'submenu-linux-hardening',
  },
  {
    to: '/linux/monitoring',
    title: 'Linux Monitoring Tools',
    desc: 'Security and system monitoring tools',
    icon: 'monitor_heart',
    cls: 'submenu-linux-monitoring',
  },
]

/* STATUS BAR (clock, uptime, ticker) */
const tickerItems = [
  'sudo ufw default deny incoming',
  'ssh-keygen -t ed25519 -C "student@hub"',
  'chmod 600 ~/.ssh/id_ed25519',
  'sudo fail2ban-client status sshd',
  'ss -tulpn | grep LISTEN',
  'journalctl -u ssh --since "1 hour ago"',
  'sudo apt update && sudo apt upgrade -y',
  'docker run --rm --read-only alpine:3 id',
]

const now = ref(new Date())
const startedAt = Date.now()
const uptimeSeconds = ref(43210)
let clockTimer = null

const clockText = computed(
  () =>
    now.value.toLocaleTimeString('en-GB', { hour12: false }) +
    '  ' +
    now.value.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
)

const uptimeText = computed(() => {
  const s = uptimeSeconds.value
  const h = String(Math.floor(s / 3600)).padStart(2, '0')
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const sec = String(s % 60).padStart(2, '0')
  return `${h}:${m}:${sec}`
})

onMounted(() => {
  clockTimer = setInterval(() => {
    now.value = new Date()
    uptimeSeconds.value = Math.floor((Date.now() - startedAt) / 1000) + 43210
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(clockTimer)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');
</style>

<style scoped>
.app-layout {
  --primary: #10b981;
  --secondary: #34d399;
  --cyan: #22d3ee;
  --deep: #064e3b;
  --bg: #f6f9f8;
  --surface: #ffffff;
  --ink: #173a32;
  --muted: #70837e;
  --line: #e4ece9;

  /* navbar-only tokens */
  --nav-ink: #d7efe7;
  --nav-muted: #7f9e96;
  --nav-line: rgba(52, 211, 153, 0.18);
  --mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
  --sans: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;

  background: var(--bg);
  color: var(--ink);
}

/* =========================================================
   STATUS BAR
   ========================================================= */
.status-bar {
  height: 30px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  background: #030709;
  border-bottom: 1px solid var(--nav-line);
  font-family: var(--mono);
  font-size: 11px;
  color: var(--nav-muted);
  letter-spacing: 0.04em;
}

.status-left,
.status-right {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
  animation: pulse 1.8s infinite;
}

.status-sep {
  opacity: 0.35;
}

.status-ticker {
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.ticker-track {
  display: inline-flex;
  gap: 42px;
  white-space: nowrap;
  animation: ticker 60s linear infinite;
}

.ticker-item {
  color: #6bbf9f;
}

.ticker-prompt {
  color: var(--primary);
  font-weight: 700;
}

@keyframes ticker {
  to {
    transform: translateX(-50%);
  }
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

/* =========================================================
   HEADER
   ========================================================= */
.app-header {
  background: rgba(6, 14, 18, 0.94);
  color: var(--nav-ink);
  border-bottom: 1px solid var(--nav-line);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(18px);
  font-family: var(--sans);
}

.header-scan {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  width: 100%;
  overflow: hidden;
}

.header-scan::after {
  content: '';
  position: absolute;
  top: 0;
  left: -30%;
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--cyan), var(--primary), transparent);
  animation: scan 4.5s ease-in-out infinite;
}

@keyframes scan {
  to {
    left: 100%;
  }
}

.header-bar {
  width: 100%;
  max-width: 1600px;
  min-height: 74px;
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
  color: var(--nav-ink);
  text-decoration: none;
}

.brand-mark {
  position: relative;
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #04120d;
  background: linear-gradient(145deg, #6ee7b7 0%, #10b981 55%, #0891b2 100%);
  box-shadow:
    0 0 22px rgba(16, 185, 129, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.brand-ring {
  position: absolute;
  inset: -5px;
  border-radius: 16px;
  border: 1px solid rgba(52, 211, 153, 0.55);
  animation: ring 2.6s ease-out infinite;
}

@keyframes ring {
  0% {
    transform: scale(0.92);
    opacity: 0.9;
  }
  100% {
    transform: scale(1.25);
    opacity: 0;
  }
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-name {
  font-family: var(--mono);
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #e8fff6;
  text-shadow: 0 0 14px rgba(16, 185, 129, 0.35);
}

.brand-cursor {
  color: var(--primary);
  animation: blink 1s steps(1) infinite;
}

.brand-sub {
  margin-top: 5px;
  font-family: var(--mono);
  color: var(--primary);
  font-size: 10.5px;
  font-weight: 500;
  letter-spacing: 0.06em;
  opacity: 0.85;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
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
  min-height: 44px;
  padding: 0 17px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  border-radius: 10px;
  border: 1px solid transparent;

  color: #9cc4b8;
  text-decoration: none;

  font-family: var(--mono);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;

  transition:
    color 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.top-nav-item:hover {
  color: #e8fff6;
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(52, 211, 153, 0.25);
  transform: translateY(-1px);
}

.top-nav-item.is-active {
  color: var(--secondary);
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(52, 211, 153, 0.35);
  box-shadow: 0 0 18px rgba(16, 185, 129, 0.15) inset;
}

.top-nav-item.is-active::after {
  content: '';
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: -15px;
  height: 3px;
  border-radius: 999px;
  background: var(--secondary);
  box-shadow: 0 0 12px var(--primary);
}

/* =========================================================
   DROPDOWNS
   ========================================================= */
.nav-dropdown {
  position: relative;
  display: flex;
  align-items: center;
  align-self: stretch;
}

.nav-trigger {
  appearance: none;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
}

.nav-trigger.menu-open {
  color: var(--secondary);
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(52, 211, 153, 0.35);
}

.dropdown-chevron {
  transition: transform 0.2s ease;
}

.nav-trigger.menu-open .dropdown-chevron {
  transform: rotate(180deg);
}

.nav-menu {
  position: absolute;
  top: calc(100% - 8px);
  left: 0;
  width: 330px;
  padding: 9px;

  display: flex;
  flex-direction: column;
  gap: 3px;

  background: rgba(8, 20, 25, 0.98);
  border: 1px solid rgba(52, 211, 153, 0.28);
  border-radius: 14px;
  box-shadow:
    0 22px 50px rgba(0, 0, 0, 0.55),
    0 0 30px rgba(16, 185, 129, 0.1);
  z-index: 3000;

  opacity: 0;
  visibility: hidden;
  transform: translateY(10px) scale(0.98);
  transform-origin: top left;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease,
    visibility 0.2s;
}

.nav-dropdown:hover .nav-menu,
.nav-dropdown:focus-within .nav-menu,
.nav-menu.menu-open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.menu-head {
  padding: 8px 11px 10px;
  border-bottom: 1px dashed rgba(52, 211, 153, 0.25);
  margin-bottom: 4px;
}

.menu-head-cmd {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--primary);
}

.nav-menu-item {
  min-height: 62px;
  padding: 10px 11px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 10px;
  color: #bfe0d5;
  text-decoration: none;
  border: 1px solid transparent;
  transition:
    background 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease;
}

.nav-menu-item:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(52, 211, 153, 0.25);
  transform: translateX(3px);
}

.nav-menu-item.menu-item-active {
  background: rgba(16, 185, 129, 0.14);
  border-color: rgba(52, 211, 153, 0.35);
}

.submenu-arrow {
  margin-left: auto;
  color: var(--primary);
  opacity: 0;
  transform: translateX(-6px);
  transition: all 0.2s ease;
}

.nav-menu-item:hover .submenu-arrow {
  opacity: 1;
  transform: translateX(0);
}

.submenu-icon {
  width: 39px;
  height: 39px;
  flex: 0 0 39px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  border: 1px solid currentColor;
}

.submenu-security {
  color: #34d399;
  background: rgba(52, 211, 153, 0.12);
}
.submenu-redblue {
  color: #fb7185;
  background: linear-gradient(
    135deg,
    rgba(239, 68, 68, 0.2) 0 50%,
    rgba(59, 130, 246, 0.22) 50% 100%
  );
}
.submenu-linux {
  color: #fbbf24;
  background: rgba(251, 191, 36, 0.12);
}
.submenu-linux-services {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
}
.submenu-linux-hardening {
  color: #a78bfa;
  background: rgba(167, 139, 250, 0.12);
}
.submenu-linux-monitoring {
  color: #2dd4bf;
  background: rgba(45, 212, 191, 0.12);
}
.submenu-networking {
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.12);
}
.submenu-docker {
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.12);
}

.submenu-text {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.submenu-title {
  color: #e8fff6;
  font-size: 13.5px;
  font-weight: 700;
  line-height: 1.3;
}

.submenu-description {
  color: var(--nav-muted);
  font-size: 11.5px;
  font-weight: 400;
  line-height: 1.4;
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
  min-height: 42px;
  padding: 0 13px;
  border: 1px solid rgba(52, 211, 153, 0.3);
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.08);
  color: #c9f3e3;
  font-family: var(--mono);
  font-size: 12.5px;
  font-weight: 700;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.header-user:hover {
  background: rgba(16, 185, 129, 0.16);
  border-color: rgba(52, 211, 153, 0.55);
}

.user-icon {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  margin-right: 7px;
  border-radius: 50%;
  color: #04120d;
  background: var(--secondary);
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
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid rgba(251, 113, 133, 0.4);
  border-radius: 999px;
  color: #fda4af;
  background: rgba(244, 63, 94, 0.08);
  font-family: var(--mono);
  font-size: 12.5px;
  font-weight: 700;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;
}

.header-logout:hover {
  background: rgba(244, 63, 94, 0.18);
  border-color: rgba(251, 113, 133, 0.7);
  transform: translateY(-1px);
}

/* =========================================================
   PAGE BODY (unchanged from original)
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
  .status-bar {
    padding: 0 26px;
  }
  .top-nav-item {
    padding: 0 11px;
  }
  .brand-name {
    font-size: 13px;
  }
}

@media (max-width: 1000px) {
  .status-ticker {
    display: none;
  }
  .status-right {
    margin-left: auto;
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
    font-size: 12px;
  }
  .header-user {
    display: none;
  }
}

@media (max-width: 800px) {
  .header-bar {
    min-height: 66px;
    padding: 0 16px;
  }
  .status-bar {
    padding: 0 16px;
  }
  .status-left .status-item:nth-of-type(n + 2),
  .status-left .status-sep {
    display: none;
  }
  .brand-sub {
    display: none;
  }
  .brand-mark {
    width: 40px;
    height: 40px;
  }
  .brand-name {
    font-size: 12px;
  }
  .top-nav {
    justify-content: flex-end;
  }
  .top-nav-item {
    min-height: 40px;
    padding: 0 8px;
  }
  .top-nav-item > span {
    display: none;
  }
  .top-nav-item.is-active::after {
    left: 8px;
    right: 8px;
    bottom: -13px;
  }

  .nav-menu {
    left: auto;
    right: -45px;
    width: min(320px, calc(100vw - 24px));
    max-height: 70vh;
    overflow-y: auto;
    transform-origin: top right;
  }

  .nav-trigger .dropdown-chevron {
    display: none;
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
    min-height: 62px;
    padding: 0 11px;
    gap: 7px;
  }
  .brand-mark {
    width: 36px;
    height: 36px;
  }
  .brand-name {
    font-size: 11px;
  }
  .top-nav {
    gap: 0;
  }
  .top-nav-item {
    min-height: 37px;
    padding: 0 6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
