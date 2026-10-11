<template>
  <q-page ref="root" class="home">
    <!-- HERO -->
    <section id="top" class="hero">
      <div class="hero-bg" aria-hidden="true"></div>
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <div class="pill reveal">
            <span class="pill-dot"></span> Hands-on IT learning, self-hosted
          </div>

          <h1 class="reveal" style="--d: 60ms">Learn. Build. <span>Deploy.</span></h1>

          <p class="hero-sub reveal" style="--d: 120ms">
            Your hands-on learning hub for modern IT technologies.
          </p>

          <p class="hero-desc reveal" style="--d: 180ms">
            Explore practical lessons in cybersecurity, Docker, Linux, networking, and modern web
            technologies through structured, easy-to-follow learning experiences built for IT
            students and aspiring developers.
          </p>

          <div class="hero-actions reveal" style="--d: 240ms">
            <q-btn
              unelevated
              no-caps
              class="btn-primary"
              label="Explore Learning Hub"
              icon-right="arrow_downward"
              @click="goTo('areas')"
            />
            <q-btn outline no-caps class="btn-ghost" label="View Courses" @click="goTo('areas')" />
          </div>
        </div>

        <div class="visual reveal" style="--d: 200ms" aria-hidden="true">
          <div class="terminal">
            <div class="terminal-bar">
              <span></span><span></span><span></span>
              <em>raspberrypi ~ docker</em>
            </div>
            <div class="terminal-body">
              <div v-for="(line, i) in terminalLines" :key="i" :class="line.type">
                <template v-if="line.type === 'cmd'"><b>$</b> {{ line.text }}</template>
                <template v-else>{{ line.text }}</template>
              </div>
              <div class="cursor"></div>
            </div>
          </div>

          <div class="chip chip-status">
            <span class="status-dot" :class="{ off: apiStatus !== 'Online' }"></span>
            Django API Â· {{ apiStatus }}
          </div>

          <div class="chip chip-nodes">
            <div v-for="node in nodes" :key="node.icon" class="node">
              <q-icon :name="node.icon" size="18px" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="wrap stats reveal">
      <div v-for="stat in stats" :key="stat.label" class="stat">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </section>

    <!-- LEARNING AREAS -->
    <section id="areas" class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="label">Courses</div>
          <h2>Explore Learning Areas</h2>
          <p>Build practical knowledge across essential IT technologies.</p>
        </div>

        <div class="area-grid">
          <article
            v-for="(area, i) in areas"
            :key="area.key"
            class="area-card reveal"
            :class="[`accent-${area.key}`, { soon: !area.to }]"
            :style="{ '--d': `${i * 70}ms` }"
          >
            <div class="area-top">
              <div class="area-icon"><q-icon :name="area.icon" size="26px" /></div>
              <span v-if="!area.to" class="badge">Coming soon</span>
              <span v-else class="area-category">{{ area.category }}</span>
            </div>

            <h3>{{ area.title }}</h3>
            <p>{{ area.desc }}</p>

            <ul class="topics">
              <li v-for="topic in area.topics" :key="topic">{{ topic }}</li>
            </ul>

            <q-btn
              v-if="area.to"
              unelevated
              no-caps
              class="area-cta"
              :label="area.cta"
              icon-right="arrow_forward"
              :to="area.to"
            />
          </article>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="section section-alt">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="label">About</div>
          <h2>Built for Practical Learning</h2>
          <p>A focused platform that keeps the learning clear, structured, and hands-on.</p>
        </div>

        <div class="feature-grid">
          <div
            v-for="(f, i) in features"
            :key="f.title"
            class="feature reveal"
            :style="{ '--d': `${i * 70}ms` }"
          >
            <div class="feature-icon"><q-icon :name="f.icon" size="22px" /></div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEARNING FLOW -->
    <section id="how" class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <div class="label">Learning</div>
          <h2>How You'll Learn</h2>
          <p>A simple path from picking a topic to building something real.</p>
        </div>

        <ol class="steps">
          <li
            v-for="(s, i) in steps"
            :key="s.title"
            class="step reveal"
            :style="{ '--d': `${i * 80}ms` }"
          >
            <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- CTA -->
    <section class="wrap cta-wrap">
      <div class="cta reveal">
        <div class="cta-ring cta-ring-a" aria-hidden="true"></div>
        <div class="cta-ring cta-ring-b" aria-hidden="true"></div>
        <h2>Start Learning Today</h2>
        <p>
          Explore practical IT lessons designed to help you understand the technologies behind
          modern applications and infrastructure.
        </p>
        <q-btn
          unelevated
          no-caps
          class="btn-light"
          label="Explore Learning Hub"
          icon-right="arrow_upward"
          @click="goTo('areas')"
        />
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <div class="brand">
            <span class="brand-mark"><q-icon name="memory" size="20px" /></span>
            <span class="brand-name">Raspi Learning Hub</span>
          </div>
          <p>Practical IT learning, one topic at a time.</p>
        </div>

        <div>
          <div class="footer-title">Navigation</div>
          <router-link to="/">Home</router-link>
          <router-link to="/cybersecurity">Cybersecurity</router-link>
          <router-link to="/docker">Docker</router-link>
          <router-link to="/linux">Linux</router-link>
          <router-link to="/redblue">Red &amp; Blue Team</router-link>
          <router-link to="/networking">Networking</router-link>
        </div>

        <div>
          <div class="footer-title">Technology</div>
          <span v-for="tech in techStack" :key="tech">{{ tech }}</span>
        </div>
      </div>

      <div class="wrap footer-base">
        <span>© 2026 Raspi Learning Hub </span>
        <span class="footer-credit">Developed by <strong>Tyrone Justine A. Medina</strong></span>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const root = ref(null)
const apiStatus = ref('Checking...')

/* ---------- Static content ---------- */

const terminalLines = [
  { type: 'cmd', text: 'docker compose up -d' },
  { type: 'ok', text: 'âœ” network  learning-hub_default' },
  { type: 'ok', text: 'âœ” api      started' },
  { type: 'ok', text: 'âœ” db       healthy' },
  { type: 'cmd', text: 'docker ps' },
]

const nodes = [{ icon: 'memory' }, { icon: 'inventory_2' }, { icon: 'api' }]

/* `to` is the existing route. Areas without `to` render as "Coming soon". */
const areas = [
  {
    key: 'cyber',
    category: 'Security',
    title: 'Cybersecurity',
    icon: 'security',
    desc: 'Learn how systems, networks, applications, and data are protected against cyber threats.',
    topics: [
      'Security fundamentals',
      'Threats and defensive concepts',
      'Practical security knowledge',
    ],
    to: '/cybersecurity',
    cta: 'Explore Cybersecurity',
  },
  {
    key: 'redblue',
    category: 'Cyber Defense',
    title: 'Red Team / Blue Team',
    icon: 'security',
    desc: 'Explore offensive and defensive security operations, from attack simulation and detection to incident response and collaboration.',
    topics: [
      'Red Team operations',
      'Blue Team defense',
      'Purple Team collaboration',
      'Attack, detection, and response',
    ],
    to: '/redblue',
    cta: 'Explore Red & Blue',
  },
  {
    key: 'docker',
    category: 'Containers',
    title: 'Docker',
    icon: 'inventory_2',
    desc: 'Work with containers the way modern teams ship software, from first image to running stack.',
    topics: [
      'Containers and images',
      'Docker Compose',
      'Networks and volumes',
      'Container security',
    ],
    to: '/docker',
    cta: 'Explore Docker',
  },
  {
    key: 'linux',
    category: 'Systems',
    title: 'Linux',
    icon: 'terminal',
    desc: 'Command-line skills and system administration fundamentals.',
    topics: ['Shell basics', 'Users and permissions'],
    to: '/linux',
    cta: 'Explore Linux',
  },
  {
    key: 'networking',
    category: 'Infrastructure',
    title: 'Networking',
    icon: 'lan',
    desc: 'How data moves between devices, servers, and services.',
    topics: ['IP and DNS', 'Ports and protocols'],
    to: '/networking',
    cta: 'Explore Networking',
  },
]

const features = [
  {
    icon: 'account_tree',
    title: 'Structured Lessons',
    text: 'Learn through organized topics that progress from fundamentals to practical concepts.',
  },
  {
    icon: 'science',
    title: 'Hands-On Concepts',
    text: 'Understand how technologies work through commands, examples, architectures, and real-world scenarios.',
  },
  {
    icon: 'dns',
    title: 'IT-Focused Content',
    text: 'Explore technologies commonly used in modern development, infrastructure, and IT environments.',
  },
  {
    icon: 'memory',
    title: 'Raspberry Pi Ready',
    text: 'Designed with lightweight technologies and deployment on Raspberry Pi in mind.',
  },
]

const steps = [
  {
    title: 'Choose a topic',
    text: 'Pick a learning area that matches what you want to understand next.',
  },
  {
    title: 'Explore the lesson',
    text: 'Work through clear slides covering concepts, commands, and architecture.',
  },
  {
    title: 'Practice the concepts',
    text: 'Apply ideas with technical examples and real-world scenarios.',
  },
  {
    title: 'Build and deploy',
    text: 'Use what you learned to build, run, and host your own projects.',
  },
]

const techStack = ['Vue', 'Quasar', 'Django', 'MySQL', 'Raspberry Pi']

/* Derived from the areas above, so the numbers stay accurate as topics are added. */
const stats = computed(() => {
  const available = areas.filter((a) => a.to).length
  return [
    { value: String(available), label: 'Learning topics available' },
    { value: String(areas.length - available), label: 'More topics coming soon' },
    { value: 'Hands-on', label: 'Learning style' },
    { value: 'Self-paced', label: 'Access anytime' },
  ]
})

/* ---------- API status (unchanged behavior) ---------- */

async function checkApi() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/status/')
    if (!response.ok) throw new Error('API unavailable')
    const data = await response.json()
    apiStatus.value = data.status === 'online' ? 'Online' : 'Offline'
  } catch {
    apiStatus.value = 'Offline'
  }
}

/* ---------- Navigation helpers ---------- */

function goTo(id) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ---------- Reveal on scroll ---------- */

let observer = null

onMounted(() => {
  checkApi()

  const items = root.value?.$el?.querySelectorAll('.reveal') || []

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )

  items.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.home {
  --primary: #10b981;
  --secondary: #34d399;
  --bg: #f8fafc;
  --ink: #0b2b26;
  --muted: #5d726c;
  --line: #e2e8e5;
  --deep: #064e3b;
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  font-family:
    'Inter',
    'Segoe UI',
    system-ui,
    -apple-system,
    sans-serif;
}
.wrap {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}
.section {
  padding: 96px 0;
  scroll-margin-top: 72px;
}
.section-alt {
  background: #fff;
  border-block: 1px solid var(--line);
}
#top {
  scroll-margin-top: 0;
}

/* reveal: opacity toggles, animation only plays the entrance */
.reveal {
  opacity: 0;
}
.reveal.in {
  opacity: 1;
  animation: rise 0.55s ease backwards;
  animation-delay: var(--d, 0ms);
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

/* NAV */
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
  transition: box-shadow 0.2s;
}
.nav.scrolled {
  box-shadow: 0 6px 24px rgba(11, 43, 38, 0.06);
}
.nav-inner {
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  color: var(--ink);
  text-decoration: none;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.brand-mark {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--deep));
}
.nav-links {
  display: flex;
  gap: 6px;
}
.nav-links a,
.nav-sheet a {
  padding: 8px 14px;
  border-radius: 10px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition:
    color 0.15s,
    background 0.15s;
}
.nav-links a:hover,
.nav-sheet a:hover {
  color: var(--ink);
  background: #eef5f2;
}
.nav-toggle {
  display: none;
}
.nav-sheet {
  display: none;
  padding: 8px 20px 14px;
  border-top: 1px solid var(--line);
  flex-direction: column;
  background: #fff;
}

/* HERO */
.hero {
  position: relative;
  overflow: hidden;
  padding: 88px 0 72px;
}
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(600px 360px at 85% 10%, rgba(52, 211, 153, 0.22), transparent 70%),
    radial-gradient(500px 300px at 0% 100%, rgba(16, 185, 129, 0.1), transparent 70%),
    radial-gradient(rgba(11, 43, 38, 0.09) 1px, transparent 1px) 0 0 / 26px 26px;
  mask-image: linear-gradient(180deg, #000 55%, transparent);
}
.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 56px;
  align-items: center;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
}
.pill-dot,
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.18);
}
.status-dot.off {
  background: #f59e0b;
  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.18);
}
.hero h1 {
  margin: 22px 0 14px;
  font-size: clamp(44px, 6.4vw, 78px);
  line-height: 1.02;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.hero h1 span {
  color: var(--primary);
}
.hero-sub {
  margin: 0 0 14px;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 600;
  color: var(--ink);
}
.hero-desc {
  max-width: 560px;
  margin: 0;
  color: var(--muted);
  font-size: 16.5px;
  line-height: 1.75;
}
.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  border-radius: 12px;
  padding: 12px 22px;
  font-weight: 700;
  box-shadow: 0 8px 22px rgba(16, 185, 129, 0.3);
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.38);
}
.btn-ghost {
  color: var(--ink);
  border-radius: 12px;
  padding: 12px 22px;
  font-weight: 700;
  border-color: #cfdcd7;
}
.btn-ghost:hover {
  background: #fff;
}

/* hero visual */
.visual {
  position: relative;
  padding: 18px 0 38px;
}
.terminal {
  border-radius: 18px;
  overflow: hidden;
  background: #0b1f1a;
  border: 1px solid rgba(16, 185, 129, 0.25);
  box-shadow: 0 30px 60px rgba(11, 43, 38, 0.22);
}
.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 13px 16px;
  background: #0f2a23;
}
.terminal-bar span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2c4a41;
}
.terminal-bar em {
  margin-left: 10px;
  font-style: normal;
  font-size: 12px;
  color: #7fa396;
}
.terminal-body {
  padding: 22px 22px 26px;
  font-family: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  font-size: 13.5px;
  line-height: 2;
  color: #9fb9af;
}
.terminal-body .cmd {
  color: #e6fff4;
}
.terminal-body b {
  color: var(--secondary);
  margin-right: 6px;
}
.terminal-body .ok {
  color: #6fd8ad;
}
.cursor {
  width: 8px;
  height: 16px;
  margin-top: 4px;
  background: var(--secondary);
  animation: blink 1.1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: 0 14px 30px rgba(11, 43, 38, 0.12);
  font-size: 13px;
  font-weight: 700;
}
.chip-status {
  right: -14px;
  top: -4px;
}
.chip-nodes {
  left: -18px;
  bottom: 6px;
  gap: 0;
  padding: 10px 14px;
}
.node {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: #ecfdf5;
  color: #059669;
}
.node + .node {
  margin-left: 22px;
  position: relative;
}
.node + .node::before {
  content: '';
  position: absolute;
  left: -22px;
  top: 50%;
  width: 22px;
  border-top: 2px dashed #86e0bd;
}

/* STATS */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-block: 8px;
}
.stat {
  padding: 26px 24px;
  border-left: 1px solid var(--line);
}
.stat:first-child {
  border-left: 0;
}
.stat-value {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.stat-label {
  margin-top: 4px;
  font-size: 14px;
  color: var(--muted);
}

/* SECTION HEAD */
.section-head {
  max-width: 640px;
  margin-bottom: 44px;
}
.label {
  color: var(--primary);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.section-head h2,
.cta h2 {
  margin: 8px 0 10px;
  font-size: clamp(30px, 3.6vw, 42px);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.section-head p {
  margin: 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.65;
}

/* AREA CARDS */
.area-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}
.area-card {
  --accent: var(--primary);
  --accent-soft: #ecfdf5;
  --accent-ink: #059669;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid var(--line);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}
.accent-docker {
  --accent: #2496ed;
  --accent-soft: #eaf4fe;
  --accent-ink: #1769b8;
}
.area-card::before {
  content: '';
  position: absolute;
  left: 32px;
  right: 32px;
  top: 0;
  height: 3px;
  border-radius: 0 0 3px 3px;
  background: var(--accent);
}
.area-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent);
  box-shadow: 0 20px 44px rgba(11, 43, 38, 0.09);
}
.area-card.soon {
  background: #fbfcfc;
}
.area-card.soon::before {
  background: #cfdcd7;
}
.area-card.soon:hover {
  transform: none;
  border-color: var(--line);
  box-shadow: none;
}
.area-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
}
.area-icon {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: var(--accent-soft);
  color: var(--accent-ink);
  transition: transform 0.2s;
}
.area-card:hover .area-icon {
  transform: translateY(-2px) scale(1.05);
}
.soon .area-icon {
  background: #eef2f1;
  color: #7b8d88;
}
.area-category {
  font-size: 13px;
  font-weight: 700;
  color: var(--accent-ink);
}
.badge {
  padding: 4px 11px;
  border-radius: 999px;
  background: #eef2f1;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
}
.area-card h3 {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.area-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}
.topics {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
}
.topics li {
  padding: 5px 12px;
  border-radius: 999px;
  background: #f3f7f5;
  border: 1px solid var(--line);
  font-size: 13px;
  font-weight: 600;
  color: #3d5650;
}
.area-cta {
  margin-top: 28px;
  align-self: flex-start;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 700;
  background: var(--accent);
  color: #fff;
}
.area-cta :deep(.q-icon) {
  transition: transform 0.15s;
}
.area-cta:hover :deep(.q-icon) {
  transform: translateX(3px);
}

/* FEATURES */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.feature {
  padding: 28px;
  border-radius: 16px;
  background: var(--bg);
  border: 1px solid var(--line);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.feature:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 30px rgba(11, 43, 38, 0.07);
}
.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  background: #ecfdf5;
  color: #059669;
}
.feature h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 800;
}
.feature p {
  margin: 0;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.65;
}

/* STEPS */
.steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin: 0;
  padding: 0;
  position: relative;
}
.steps::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 6%;
  right: 6%;
  border-top: 2px dashed #bfe6d6;
}
.step {
  position: relative;
  padding-right: 8px;
}
.step-num {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  margin-bottom: 20px;
  background: #fff;
  border: 2px solid var(--primary);
  color: #059669;
  font-weight: 800;
  font-size: 15px;
  box-shadow: 0 0 0 6px var(--bg);
}
.step h3 {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 800;
}
.step p {
  margin: 0;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.65;
}

/* CTA */
.cta-wrap {
  padding-bottom: 96px;
}
.cta {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 64px 32px;
  border-radius: 24px;
  color: #fff;
  background: linear-gradient(135deg, #0b2b26 0%, var(--deep) 100%);
}
.cta h2 {
  color: #fff;
  margin-top: 0;
}
.cta p {
  max-width: 560px;
  margin: 0 auto 28px;
  color: #b9d8cc;
  line-height: 1.7;
}
.cta > :not(.cta-ring) {
  position: relative;
  z-index: 1;
}
.cta-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(52, 211, 153, 0.25);
  pointer-events: none;
}
.cta-ring-a {
  width: 420px;
  height: 420px;
  right: -120px;
  top: -180px;
}
.cta-ring-b {
  width: 260px;
  height: 260px;
  left: -90px;
  bottom: -130px;
  background: rgba(52, 211, 153, 0.07);
}
.btn-light {
  background: #fff;
  color: var(--deep);
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 800;
  transition: transform 0.15s;
}
.btn-light:hover {
  transform: translateY(-2px);
}

/* FOOTER */
.footer {
  background: #fff;
  border-top: 1px solid var(--line);
  padding: 56px 0 24px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 40px;
}
.footer-brand p {
  max-width: 300px;
  margin: 14px 0 0;
  color: var(--muted);
  line-height: 1.6;
}
.footer-title {
  margin-bottom: 14px;
  font-size: 13px;
  font-weight: 800;
  color: var(--ink);
}
.footer-grid a,
.footer-grid span:not(.brand-mark):not(.brand-name) {
  display: block;
  margin-bottom: 9px;
  color: var(--muted);
  font-size: 14.5px;
  text-decoration: none;
}
.footer-grid a:hover {
  color: var(--primary);
}
.footer-base {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  color: #8a9c96;
  font-size: 13px;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .visual {
    max-width: 560px;
  }
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .steps {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 36px;
  }
  .steps::before {
    display: none;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .stat:nth-child(3) {
    border-left: 0;
  }
}
@media (max-width: 760px) {
  .wrap {
    padding: 0 20px;
  }
  .section {
    padding: 64px 0;
  }
  .nav-links {
    display: none;
  }
  .nav-toggle {
    display: inline-flex;
  }
  .nav-sheet {
    display: flex;
  }
  .hero {
    padding: 48px 0 40px;
  }
  .hero-actions .q-btn {
    width: 100%;
  }
  .chip-status {
    right: 0;
  }
  .chip-nodes {
    display: none;
  }
  .area-grid,
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .area-card {
    padding: 26px;
  }
  .steps {
    grid-template-columns: 1fr;
  }
  .step {
    display: grid;
    grid-template-columns: 48px 1fr;
    column-gap: 16px;
  }
  .step-num {
    grid-row: span 2;
    margin: 0;
  }
  .stats {
    grid-template-columns: 1fr 1fr;
  }
  .cta {
    padding: 48px 22px;
  }
  .cta .q-btn {
    width: 100%;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal.in {
    opacity: 1;
    animation: none;
  }
  .cursor {
    animation: none;
  }
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
