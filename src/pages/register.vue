<template>
  <q-page class="register-page">
    <div class="register-shell">
      <!-- ================= LEFT: brand + live terminal ================= -->
      <section class="brand-panel">
        <canvas ref="rainCanvas" class="rain" aria-hidden="true"></canvas>

        <div class="brand boot" style="--i: 0">
          <div class="brand-icon"><q-icon name="school" size="24px" /></div>
          <div class="brand-name">Linux Cybersecurity Learning Hub</div>
        </div>

        <div class="hero boot" style="--i: 1">
          <h1>Learn security by running the real thing.</h1>
          <p>
            Every lesson ends with a command you actually run. Scan a host, lock it down, ship it in
            a container and serve it from a Raspberry Pi, all on a live server you can log in to.
          </p>
        </div>

        <!-- Live terminal: the one memorable element -->
        <div
          class="terminal boot"
          style="--i: 2"
          :style="{ '--scene': current.color }"
          role="img"
          :aria-label="`Animated terminal showing ${current.label} commands`"
        >
          <div class="terminal-bar">
            <i></i><i></i><i></i>
            <span>pi@learning-hub: ~/labs/{{ current.id }}</span>
          </div>
          <div class="terminal-body" aria-hidden="true">
            <div v-for="(l, i) in termLines" :key="i" class="tline" :class="l.cls">
              <template v-if="l.prompt"><b>$</b> {{ l.text }}</template>
              <template v-else>{{ l.text }}</template>
            </div>
            <div class="tline"><b>$</b> {{ typing }}<span class="cursor"></span></div>
          </div>
          <div class="scan" aria-hidden="true"></div>
        </div>

        <!-- Track selector, synced with the terminal -->
        <div class="paths boot" style="--i: 3">
          <p class="paths-hint">Select a track to replay its commands.</p>
          <button
            v-for="(s, i) in scenes"
            :key="s.id"
            type="button"
            class="path-item"
            :class="{ active: activeScene === i }"
            :style="{ '--c': s.color }"
            :aria-pressed="activeScene === i"
            @click="selectScene(i)"
          >
            <span class="path-icon"><q-icon :name="s.icon" size="20px" /></span>
            <span class="path-text">
              <strong>{{ s.label }}</strong>
              <span>{{ s.blurb }}</span>
              <em>{{ s.topics }}</em>
            </span>
          </button>
        </div>

        <!-- A real sequence, so numbering is meaningful -->
        <ol class="steps boot" style="--i: 4">
          <li v-for="(st, i) in howItWorks" :key="st.title">
            <span class="step-num">{{ i + 1 }}</span>
            <div>
              <strong>{{ st.title }}</strong>
              <span>{{ st.text }}</span>
            </div>
          </li>
        </ol>

        <div class="panel-footer boot" style="--i: 5">
          <span class="status-dot"></span>
          <span>Learning Hub server is online</span>
          <span class="sep">up {{ uptime }}</span>
          <span class="sep">{{ ping }} ms</span>
        </div>
      </section>

      <!-- ================= RIGHT: form ================= -->
      <section class="form-panel">
        <div class="form-container">
          <div class="mobile-brand">
            <div class="brand-icon"><q-icon name="school" size="22px" /></div>
            <div class="brand-name">Linux Cybersecurity Learning Hub</div>
          </div>

          <div class="mobile-tracks">
            <span v-for="s in scenes" :key="s.id" :style="{ '--c': s.color }">
              <q-icon :name="s.icon" size="16px" /> {{ s.label }}
            </span>
          </div>

          <header class="form-header">
            <h2>Create your account</h2>
            <p>Free access to every lesson in the Learning Hub.</p>
          </header>

          <q-form class="register-form" greedy @submit.prevent="handleRegister">
            <q-input
              v-model.trim="username"
              outlined
              label="Username"
              autocomplete="username"
              :disable="loading"
              lazy-rules
              :rules="usernameRules"
            >
              <template #prepend><q-icon name="person_outline" /></template>
            </q-input>

            <q-input
              v-model.trim="email"
              outlined
              type="email"
              label="Email address"
              autocomplete="email"
              :disable="loading"
              lazy-rules
              :rules="emailRules"
            >
              <template #prepend><q-icon name="mail_outline" /></template>
            </q-input>

            <div>
              <q-input
                v-model="password"
                outlined
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                autocomplete="new-password"
                :disable="loading"
                lazy-rules
                :rules="passwordRules"
              >
                <template #prepend><q-icon name="lock_outline" /></template>
                <template #append>
                  <q-btn
                    flat
                    round
                    dense
                    :icon="showPassword ? 'visibility_off' : 'visibility'"
                    :aria-label="showPassword ? 'Hide password' : 'Show password'"
                    :disable="loading"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>

              <div v-if="password" class="strength" :data-level="strength.score">
                <div class="strength-bars">
                  <span v-for="n in 4" :key="n" :class="{ on: n <= strength.score }"></span>
                </div>
                <small>{{ strength.label }}</small>
              </div>

              <ul v-if="password" class="checks">
                <li v-for="c in checks" :key="c.label" :class="{ ok: c.ok }">
                  <q-icon :name="c.ok ? 'check_circle' : 'radio_button_unchecked'" size="16px" />
                  {{ c.label }}
                </li>
              </ul>
            </div>

            <q-input
              v-model="passwordConfirm"
              outlined
              :type="showPasswordConfirm ? 'text' : 'password'"
              label="Confirm password"
              autocomplete="new-password"
              :disable="loading"
              lazy-rules
              :rules="confirmRules"
            >
              <template #prepend><q-icon name="lock_reset" /></template>
              <template #append>
                <q-btn
                  flat
                  round
                  dense
                  :icon="showPasswordConfirm ? 'visibility_off' : 'visibility'"
                  :aria-label="showPasswordConfirm ? 'Hide password' : 'Show password'"
                  :disable="loading"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                />
              </template>
            </q-input>

            <!-- Live command preview -->
            <div class="cmd-preview" aria-live="polite">
              <span class="cmd-label">On a Linux machine, this account would be:</span>
              <code><b>$</b> sudo useradd -m -s /bin/bash {{ previewName }}</code>
            </div>

            <!-- Ethical hacking pledge -->
            <div class="pledge" :class="{ invalid: agreeError }">
              <q-checkbox
                v-model="agree"
                dense
                color="primary"
                :disable="loading"
                @update:model-value="agreeError = false"
              >
                <span class="pledge-text">
                  I will only test systems I own or have written permission to test.
                </span>
              </q-checkbox>
              <small v-if="agreeError" role="alert"
                >Accept the pledge to create your account.</small
              >
            </div>

            <div v-if="errorMessage" class="error-box" role="alert">
              <q-icon name="error_outline" size="20px" />
              <span>{{ errorMessage }}</span>
            </div>

            <q-btn
              class="register-button"
              type="submit"
              unelevated
              no-caps
              :loading="loading"
              label="Create account"
            />

            <div class="login-link">
              <span>Already have an account?</span>
              <button type="button" :disabled="loading" @click="goToLogin">Sign in</button>
            </div>
          </q-form>

          <div class="form-footer">
            <q-icon name="verified_user" size="16px" />
            Accounts are securely managed by Django.
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/auth'

const router = useRouter()

/* ------------------------------------------------------------------ *
 * Form state (unchanged behaviour)
 * ------------------------------------------------------------------ */
const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const agree = ref(false)
const agreeError = ref(false)

const loading = ref(false)
const errorMessage = ref('')

const usernameRules = [
  (v) => !!v || 'Enter a username',
  (v) => v.length >= 3 || 'Username must be at least 3 characters',
  (v) => /^[\w.@+-]+$/.test(v) || 'Use letters, numbers and @ . + - _ only',
]
const emailRules = [
  (v) => !!v || 'Enter your email address',
  (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address',
]
const passwordRules = [
  (v) => !!v || 'Enter a password',
  (v) => v.length >= 8 || 'Password must be at least 8 characters',
]
const confirmRules = [
  (v) => !!v || 'Confirm your password',
  (v) => v === password.value || 'Passwords do not match',
]

const strength = computed(() => {
  const p = password.value
  let score = 0
  if (p.length >= 8) score++
  if (p.length >= 12) score++
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) score++
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
  return { score, label: labels[score] }
})

const checks = computed(() => {
  const p = password.value
  return [
    { label: '8+ characters', ok: p.length >= 8 },
    { label: 'Upper and lower case', ok: /[a-z]/.test(p) && /[A-Z]/.test(p) },
    { label: 'A number', ok: /\d/.test(p) },
    { label: 'A symbol', ok: /[^A-Za-z0-9]/.test(p) },
  ]
})

const previewName = computed(() => {
  const clean = username.value.replace(/[^\w.@+-]/g, '').toLowerCase()
  return clean || 'your-username'
})

async function handleRegister() {
  errorMessage.value = ''

  if (!agree.value) {
    agreeError.value = true
    return
  }

  loading.value = true

  try {
    await register(username.value, email.value, password.value, passwordConfirm.value)
    await router.push('/')
  } catch (error) {
    errorMessage.value =
      error.message || 'We couldn’t create your account. Check your details and try again.'
  } finally {
    loading.value = false
  }
}

function goToLogin() {
  router.push('/login')
}

/* ------------------------------------------------------------------ *
 * Page content (edit freely)
 * ------------------------------------------------------------------ */
const scenes = [
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    icon: 'security',
    color: '#ffb454',
    blurb: 'Scan, harden and defend a Linux host.',
    topics: 'SSH hardening, firewalls, nmap, fail2ban, log analysis',
    steps: [
      {
        cmd: 'sudo nmap -sV -p 22,80,443 192.168.1.20',
        out: [
          { t: 'PORT     STATE  SERVICE  VERSION', c: 'dim' },
          { t: '22/tcp   open   ssh      OpenSSH 9.2', c: 'ok' },
          { t: '80/tcp   open   http     nginx 1.24   <- unencrypted', c: 'warn' },
          { t: '443/tcp  open   https    nginx 1.24', c: 'ok' },
        ],
      },
      {
        cmd: 'sudo ufw limit 22/tcp',
        out: [
          { t: 'Rule added', c: 'ok' },
          { t: 'SSH logins are now rate limited.', c: 'dim' },
        ],
      },
    ],
  },
  {
    id: 'docker',
    label: 'Docker',
    icon: 'deployed_code',
    color: '#4cb3ff',
    blurb: 'Package apps and ship them safely.',
    topics: 'images, volumes, compose, container isolation',
    steps: [
      {
        cmd: 'docker run -d --name web -p 8080:80 nginx:alpine',
        out: [
          { t: 'Status: Downloaded newer image for nginx:alpine', c: 'dim' },
          { t: 'a41f9c0d7e32', c: 'info' },
        ],
      },
      {
        cmd: 'docker ps',
        out: [
          { t: 'CONTAINER ID  IMAGE         STATUS        PORTS', c: 'dim' },
          { t: 'a41f9c0d7e32  nginx:alpine  Up 2 seconds  0.0.0.0:8080->80/tcp', c: 'ok' },
        ],
      },
    ],
  },
  {
    id: 'raspberry-pi',
    label: 'Raspberry Pi',
    icon: 'memory',
    color: '#ff6b93',
    blurb: 'Run your own web server at home.',
    topics: 'flashing the OS, nginx, systemd, remote access over SSH',
    steps: [
      {
        cmd: 'vcgencmd measure_temp',
        out: [{ t: "temp=42.8'C", c: 'ok' }],
      },
      {
        cmd: 'systemctl is-active nginx',
        out: [{ t: 'active', c: 'ok' }],
      },
      {
        cmd: 'curl -I http://raspberrypi.local',
        out: [
          { t: 'HTTP/1.1 200 OK', c: 'ok' },
          { t: 'Server: nginx', c: 'dim' },
        ],
      },
    ],
  },
]

const howItWorks = [
  { title: 'Create your account', text: 'Pick a username and a strong password.' },
  { title: 'Choose a track', text: 'Start with security, containers or the Pi.' },
  { title: 'Run real commands', text: 'Practice on the live server, then check your result.' },
]

/* ------------------------------------------------------------------ *
 * Live terminal engine
 * ------------------------------------------------------------------ */
const activeScene = ref(0)
const termLines = ref([])
const typing = ref('')
const current = computed(() => scenes[activeScene.value])

let runId = 0
let reducedMotion = false

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function play(start = 0) {
  const my = ++runId
  let i = start

  while (my === runId) {
    activeScene.value = i
    termLines.value = []
    typing.value = ''
    await sleep(350)
    if (my !== runId) return

    for (const step of scenes[i].steps) {
      for (const ch of step.cmd) {
        if (my !== runId) return
        typing.value += ch
        await sleep(26 + Math.random() * 38)
      }
      await sleep(260)
      if (my !== runId) return

      termLines.value.push({ prompt: true, text: step.cmd, cls: 'cmd' })
      typing.value = ''

      for (const o of step.out) {
        await sleep(140)
        if (my !== runId) return
        termLines.value.push({ text: o.t, cls: o.c })
      }
      await sleep(900)
    }

    await sleep(2200)
    i = (i + 1) % scenes.length
  }
}

function showStatic(i) {
  runId++
  activeScene.value = i
  typing.value = ''
  termLines.value = scenes[i].steps.flatMap((step) => [
    { prompt: true, text: step.cmd, cls: 'cmd' },
    ...step.out.map((o) => ({ text: o.t, cls: o.c })),
  ])
}

function selectScene(i) {
  if (reducedMotion) showStatic(i)
  else play(i)
}

/* ------------------------------------------------------------------ *
 * Server status ticker (decorative; connect to a real endpoint later)
 * ------------------------------------------------------------------ */
const uptimeSec = ref(37 * 86400 + 4 * 3600 + 12 * 60)
const ping = ref(12)
const pad = (n) => String(n).padStart(2, '0')

const uptime = computed(() => {
  const s = uptimeSec.value
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  return `${d}d ${pad(h)}:${pad(m)}:${pad(s % 60)}`
})

let uptimeTimer = 0
let pingTimer = 0

/* ------------------------------------------------------------------ *
 * Background code rain
 * ------------------------------------------------------------------ */
const rainCanvas = ref(null)
let rainRaf = 0
let onResize = null

function startRain() {
  const canvas = rainCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const size = 18
  const glyphs = '01abcdef0123456789$#/<>{}[]=|~'
  let w = 0
  let h = 0
  let drops = []

  onResize = () => {
    const rect = canvas.parentElement.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    w = rect.width
    h = rect.height
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    drops = Array.from({ length: Math.ceil(w / size) }, () => Math.random() * -40)
  }
  onResize()
  window.addEventListener('resize', onResize)

  let last = 0
  const frame = (t) => {
    rainRaf = requestAnimationFrame(frame)
    if (t - last < 60) return
    last = t

    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0, 0, 0, 0.16)'
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'source-over'
    ctx.font = `${size - 4}px "Fira Code", monospace`

    for (let i = 0; i < drops.length; i++) {
      if (i % 2 === 0) {
        if (drops[i] >= 0) {
          const ch = glyphs[Math.floor(Math.random() * glyphs.length)]
          ctx.fillStyle =
            Math.random() > 0.96 ? 'rgba(200, 255, 225, 0.95)' : 'rgba(126, 224, 181, 0.55)'
          ctx.fillText(ch, i * size, drops[i] * size)
        }
        drops[i]++
        if (drops[i] * size > h && Math.random() > 0.97) drops[i] = Math.random() * -24
      }
    }
  }
  rainRaf = requestAnimationFrame(frame)
}

/* ------------------------------------------------------------------ *
 * Lifecycle
 * ------------------------------------------------------------------ */
onMounted(() => {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion) {
    showStatic(0)
  } else {
    play(0)
    startRain()
  }

  uptimeTimer = window.setInterval(() => {
    uptimeSec.value++
  }, 1000)
  pingTimer = window.setInterval(() => {
    ping.value = 8 + Math.floor(Math.random() * 12)
  }, 2500)
})

onBeforeUnmount(() => {
  runId++
  cancelAnimationFrame(rainRaf)
  clearInterval(uptimeTimer)
  clearInterval(pingTimer)
  if (onResize) window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Fira+Code:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

.register-page {
  --night: #07130f;
  --board: #0d2a21;
  --phosphor: #8cf2c0;
  --mint: #7ee0b5;
  --accent: #0e8a5f;
  --accent-dark: #0a6f4c;
  --paper: #f4f6f3;
  --ink: #0e1a16;
  --muted: #55645f;
  --line: #d5ddd9;

  --q-primary: var(--accent);
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family:
    'IBM Plex Sans',
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
}

.register-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
}

/* ---------- Page-load boot sequence (runs once) ---------- */

.boot {
  animation: boot 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  animation-delay: calc(var(--i, 0) * 120ms);
}

@keyframes boot {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* ---------- Left panel ---------- */

.brand-panel {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 40px clamp(28px, 5vw, 80px);
  color: #eaf4ef;
  background:
    radial-gradient(900px 500px at 15% -10%, rgba(126, 224, 181, 0.12), transparent 60%),
    linear-gradient(rgba(126, 224, 181, 0.045) 1px, transparent 1px) 0 0 / 100% 32px,
    linear-gradient(90deg, rgba(126, 224, 181, 0.045) 1px, transparent 1px) 0 0 / 32px 100%,
    var(--night);
}

.brand-panel > *:not(.rain) {
  position: relative;
  z-index: 1;
}

.rain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.32;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent);
  mask-image: linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: var(--night);
  background: var(--mint);
}

.brand-name {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.hero {
  max-width: 600px;
}

.hero h1 {
  margin: 0 0 16px;
  font-family: 'Chakra Petch', sans-serif;
  font-size: clamp(34px, 3.9vw, 54px);
  line-height: 1.06;
  letter-spacing: -0.015em;
  font-weight: 700;
}

.hero p {
  margin: 0;
  max-width: 54ch;
  color: rgba(234, 244, 239, 0.74);
  font-size: 16px;
  line-height: 1.65;
}

/* ---------- Terminal ---------- */

.terminal {
  --scene: #ffb454;
  position: relative;
  max-width: 640px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--scene) 40%, transparent);
  border-radius: 14px;
  background: rgba(4, 16, 12, 0.88);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.4),
    0 0 40px color-mix(in srgb, var(--scene) 14%, transparent);
  font-family: 'Fira Code', ui-monospace, 'Cascadia Code', Consolas, monospace;
  transition:
    border-color 0.5s ease,
    box-shadow 0.5s ease;
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
  border-bottom: 1px solid rgba(126, 224, 181, 0.12);
  background: rgba(255, 255, 255, 0.03);
}

.terminal-bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(234, 244, 239, 0.2);
}

.terminal-bar i:first-child {
  background: var(--scene);
  transition: background 0.5s ease;
}

.terminal-bar span {
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: rgba(234, 244, 239, 0.55);
  font-size: 12px;
}

.terminal-body {
  min-height: 262px;
  padding: 18px 20px 20px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.7;
}

.tline {
  white-space: pre;
  color: rgba(234, 244, 239, 0.88);
  animation: lineIn 0.18s ease-out both;
}

@keyframes lineIn {
  from {
    opacity: 0;
    transform: translateX(-4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.tline b {
  margin-right: 8px;
  color: var(--scene);
  font-weight: 500;
  transition: color 0.5s ease;
}

.tline.ok {
  color: var(--phosphor);
}
.tline.warn {
  color: #ffb454;
}
.tline.info {
  color: #7cc7ff;
}
.tline.dim {
  color: rgba(234, 244, 239, 0.5);
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 1px;
  vertical-align: text-bottom;
  background: var(--scene);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.scan {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    transparent,
    color-mix(in srgb, var(--scene) 9%, transparent),
    transparent
  );
  animation: sweep 7s linear infinite;
}

@keyframes sweep {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(420px);
  }
}

/* ---------- Track selector ---------- */

.paths {
  display: grid;
  gap: 10px;
  max-width: 640px;
}

.paths-hint {
  margin: 0 0 2px;
  color: rgba(234, 244, 239, 0.55);
  font-size: 13px;
}

.path-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
  padding: 14px 16px;
  border: 0;
  border-left: 3px solid color-mix(in srgb, var(--c) 45%, transparent);
  border-radius: 4px 12px 12px 4px;
  color: inherit;
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  font: inherit;
  text-align: left;
  transition:
    background 0.25s ease,
    border-color 0.25s ease;
}

.path-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.path-item.active {
  border-left-color: var(--c);
  background: color-mix(in srgb, var(--c) 11%, transparent);
}

.path-item:focus-visible {
  outline: 2px solid var(--c);
  outline-offset: 2px;
}

.path-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  border-radius: 10px;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 14%, transparent);
}

.path-text {
  display: grid;
  gap: 2px;
  min-width: 0;
}

.path-text strong {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 16px;
  font-weight: 600;
}

.path-text span {
  color: rgba(234, 244, 239, 0.8);
  font-size: 14px;
  line-height: 1.45;
}

.path-text em {
  color: rgba(234, 244, 239, 0.5);
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 12px;
  font-style: normal;
  line-height: 1.5;
}

/* ---------- How it works ---------- */

.steps {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  max-width: 640px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.steps li {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.step-num {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: 0 0 28px;
  border: 1px solid rgba(126, 224, 181, 0.45);
  border-radius: 50%;
  color: var(--mint);
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 13px;
}

.steps strong {
  display: block;
  margin-bottom: 2px;
  font-size: 14px;
  font-weight: 600;
}

.steps li > div span {
  color: rgba(234, 244, 239, 0.6);
  font-size: 13px;
  line-height: 1.5;
}

/* ---------- Status footer ---------- */

.panel-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-top: auto;
  color: rgba(234, 244, 239, 0.62);
  font-size: 13px;
}

.panel-footer .sep {
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 12px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mint);
  animation: pulse 2.2s ease-out infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(126, 224, 181, 0.5);
  }
  100% {
    box-shadow: 0 0 0 10px rgba(126, 224, 181, 0);
  }
}

/* ---------- Right panel ---------- */

.form-panel {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: max(40px, 7vh) clamp(24px, 6vw, 88px) 48px;
}

.form-container {
  position: sticky;
  top: 32px;
  width: min(100%, 430px);
}

.form-header {
  margin-bottom: 28px;
}

.form-header h2 {
  margin: 0 0 8px;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 34px;
  line-height: 1.1;
  letter-spacing: -0.01em;
  font-weight: 700;
}

.form-header p {
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.5;
}

.register-form {
  display: grid;
  gap: 18px;
}

.register-form :deep(.q-field__native),
.register-form :deep(.q-field__label),
.register-form :deep(.q-field__bottom) {
  font-family: inherit;
}

.register-form :deep(.q-field__control) {
  min-height: 54px;
  border-radius: 10px;
  background: #fff;
}

.register-form :deep(.q-field--outlined .q-field__control:before) {
  border-color: var(--line);
}

.register-form :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: #9fb3ab;
}

.register-form :deep(.q-field--focused .q-field__control:after) {
  border-width: 2px;
  border-color: var(--accent);
}

.register-form :deep(.q-field__label),
.register-form :deep(.q-field__prepend),
.register-form :deep(.q-field__append),
.register-form :deep(.q-field__bottom) {
  color: var(--muted);
}

.register-form :deep(.q-field--error .q-field__bottom) {
  color: #b42318;
}

/* Password strength */
.strength {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 6px;
}

.strength-bars {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.strength-bars span {
  height: 4px;
  border-radius: 99px;
  background: var(--line);
  transition: background 0.25s ease;
}

.strength[data-level='1'] .strength-bars .on {
  background: #d92d20;
}
.strength[data-level='2'] .strength-bars .on {
  background: #e08a00;
}
.strength[data-level='3'] .strength-bars .on {
  background: #3d9b6e;
}
.strength[data-level='4'] .strength-bars .on {
  background: #12805c;
}

.strength small {
  min-width: 56px;
  text-align: right;
  color: var(--muted);
  font-size: 12px;
}

.checks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px 12px;
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}

.checks li {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 12.5px;
  transition: color 0.2s ease;
}

.checks li.ok {
  color: #12805c;
}

/* Live command preview */
.cmd-preview {
  display: grid;
  gap: 6px;
  padding: 12px 14px;
  border-radius: 10px;
  background: #0a1a15;
}

.cmd-label {
  color: rgba(234, 244, 239, 0.6);
  font-size: 12px;
}

.cmd-preview code {
  overflow-x: auto;
  white-space: nowrap;
  color: var(--phosphor);
  font-family: 'Fira Code', ui-monospace, monospace;
  font-size: 12.5px;
}

.cmd-preview code b {
  margin-right: 6px;
  color: #ffb454;
  font-weight: 500;
}

/* Pledge */
.pledge {
  display: grid;
  gap: 4px;
}

.pledge-text {
  color: var(--ink);
  font-size: 13.5px;
  line-height: 1.45;
}

.pledge.invalid .pledge-text {
  color: #b42318;
}

.pledge small {
  padding-left: 30px;
  color: #b42318;
  font-size: 12px;
}

.register-button {
  width: 100%;
  min-height: 52px;
  margin-top: 2px;
  border-radius: 10px;
  color: #fff;
  background: var(--accent);
  font-family: 'Chakra Petch', sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition:
    background 0.2s ease,
    transform 0.15s ease;
}

.register-button:hover {
  background: var(--accent-dark);
}

.register-button:active {
  transform: translateY(1px);
}

.error-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid #f4b8b0;
  border-radius: 10px;
  color: #912018;
  background: #fff4f2;
  font-size: 14px;
  line-height: 1.45;
}

.login-link {
  display: flex;
  justify-content: center;
  gap: 6px;
  color: var(--muted);
  font-size: 14px;
}

.login-link button {
  padding: 0;
  border: 0;
  border-radius: 4px;
  color: var(--accent);
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.login-link button:hover {
  text-decoration: underline;
}

.login-link button:focus-visible,
.register-button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.login-link button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.form-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 28px;
  color: var(--muted);
  font-size: 12.5px;
}

.mobile-brand,
.mobile-tracks {
  display: none;
}

/* ---------- Responsive ---------- */

@media (max-width: 1150px) {
  .steps {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 950px) {
  .register-shell {
    grid-template-columns: 1fr;
  }

  .brand-panel {
    display: none;
  }

  .form-panel {
    padding: 28px 22px 40px;
  }

  .form-container {
    position: static;
  }

  .mobile-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .mobile-brand .brand-icon {
    color: #fff;
    background: var(--board);
  }

  .mobile-tracks {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 28px;
  }

  .mobile-tracks span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 10px;
    border-left: 3px solid var(--c);
    border-radius: 3px 8px 8px 3px;
    background: #fff;
    color: var(--ink);
    font-size: 12.5px;
  }
}

@media (max-width: 480px) {
  .form-panel {
    padding: 22px 18px 32px;
  }

  .form-header h2 {
    font-size: 29px;
  }

  .checks {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .boot,
  .tline,
  .cursor,
  .scan,
  .status-dot {
    animation: none;
  }

  .strength-bars span,
  .register-button,
  .terminal,
  .path-item {
    transition: none;
  }
}
</style>
