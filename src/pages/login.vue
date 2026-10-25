<template>
  <q-page class="login-page">
    <div class="login-shell">
      <!-- ================= LEFT: brand, live terminal, learning content ================= -->
      <section class="brand-panel" aria-hidden="true">
        <canvas ref="rainCanvas" class="rain"></canvas>
        <div class="scanline"></div>

        <div class="brand">
          <div class="brand-icon">
            <q-icon name="terminal" size="24px" />
          </div>
          <div class="brand-text">
            <div class="brand-name">Linux Cybersecurity Learning Hub</div>
            <div class="brand-sub">root@learning-hub:~# secure · learn · build</div>
          </div>
        </div>

        <div class="brand-content">
          <div class="eyebrow"><span class="pulse"></span> SYSTEM ONLINE · SESSION READY</div>
          <h1>
            <span class="glitch" data-text="Hack to learn.">Hack to learn.</span><br />
            <span class="accent">Learn to defend.</span>
          </h1>
          <p>
            Hands-on lessons in Linux administration, ethical hacking and network defense, container
            security with Docker, and home-lab projects on the Raspberry Pi. Every lesson runs on
            your own server, so you practice in a safe environment you control.
          </p>

          <!-- Live terminal -->
          <div class="terminal">
            <div class="terminal-bar">
              <i class="r"></i><i class="y"></i><i class="g"></i>
              <span>pi@learning-hub: ~/labs</span>
              <em>{{ sceneTitle }}</em>
            </div>
            <div class="terminal-body">
              <div v-for="(l, i) in termLines" :key="i" class="line" :class="l.cls">
                <template v-if="l.type === 'cmd'">
                  <b>pi@hub:~$</b>
                  <span>{{ l.text }}</span>
                  <span v-if="i === termLines.length - 1 && typing" class="cursor"></span>
                </template>
                <template v-else>{{ l.text }}</template>
              </div>
              <div v-if="!typing" class="line"><b>pi@hub:~$</b><span class="cursor"></span></div>
            </div>
          </div>

          <!-- Learning tracks -->
          <div class="tracks">
            <div v-for="t in tracks" :key="t.title" class="track" :style="{ '--c': t.color }">
              <q-icon :name="t.icon" size="22px" />
              <div>
                <strong>{{ t.title }}</strong>
                <small>{{ t.desc }}</small>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="stats">
            <div v-for="s in stats" :key="s.label" class="stat">
              <div class="num">
                {{ s.shown }}<span>{{ s.suffix }}</span>
              </div>
              <div class="lbl">{{ s.label }}</div>
            </div>
          </div>

          <!-- Command of the day -->
          <div class="tip">
            <div class="tip-head">
              <q-icon name="tips_and_updates" size="16px" />
              COMMAND OF THE MOMENT
            </div>
            <transition name="fade" mode="out-in">
              <div :key="tipIndex" class="tip-body">
                <code>{{ tips[tipIndex].cmd }}</code>
                <p>{{ tips[tipIndex].desc }}</p>
              </div>
            </transition>
            <div class="tip-progress"><i :key="tipIndex"></i></div>
          </div>
        </div>

        <div class="panel-footer">
          <div class="footer-left">
            <span class="status-dot"></span> Learning Hub server is online
          </div>
          <div class="ticker">
            <div class="ticker-track">
              <span v-for="(m, i) in tickerItems" :key="i">
                <q-icon name="chevron_right" size="14px" /> {{ m }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= RIGHT: form ================= -->
      <section class="form-panel">
        <div class="form-glow"></div>
        <div class="form-container">
          <div class="mobile-brand">
            <div class="brand-icon"><q-icon name="terminal" size="22px" /></div>
            <div class="brand-name">Linux Cybersecurity Learning Hub</div>
          </div>

          <header class="form-header">
            <div class="badge"><q-icon name="lock" size="14px" /> SECURE LOGIN</div>
            <h2>Sign in<span class="blink">_</span></h2>
            <p>Welcome back, operator. Authenticate to continue your lessons and labs.</p>
          </header>

          <q-form class="login-form" greedy @submit.prevent="handleLogin">
            <q-input
              v-model.trim="username"
              dark
              outlined
              label="Username"
              autocomplete="username"
              :disable="loading"
              lazy-rules
              :rules="[(v) => !!v || 'Enter your username']"
            >
              <template #prepend><q-icon name="person_outline" /></template>
            </q-input>

            <q-input
              v-model="password"
              dark
              outlined
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              :disable="loading"
              lazy-rules
              :rules="[(v) => !!v || 'Enter your password']"
              @keyup="checkCaps"
              @keydown="checkCaps"
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

            <div v-if="capsOn" class="caps-warning" role="status">
              <q-icon name="keyboard_capslock" size="18px" />
              Caps Lock is on. Passwords are case-sensitive.
            </div>

            <div v-if="errorMessage" class="error-box" role="alert">
              <q-icon name="error_outline" size="20px" />
              <span>{{ errorMessage }}</span>
            </div>

            <q-btn
              class="login-button"
              type="submit"
              unelevated
              no-caps
              :loading="loading"
              label="Sign in"
              icon-right="arrow_forward"
            />

            <div class="register-link">
              <span>New to the Learning Hub?</span>
              <button type="button" :disabled="loading" @click="goToRegister">
                Create an account
              </button>
            </div>
          </q-form>

          <!-- Security best-practice cards -->
          <div class="hygiene">
            <div class="hygiene-title">
              <q-icon name="shield" size="16px" /> Security hygiene reminders
            </div>
            <ul>
              <li>
                <q-icon name="check_circle" size="16px" /> Use a long, unique passphrase for every
                service.
              </li>
              <li>
                <q-icon name="check_circle" size="16px" /> Never share credentials, and always log
                out on shared devices.
              </li>
              <li>
                <q-icon name="check_circle" size="16px" /> Practice only on systems you own or have
                written permission to test.
              </li>
            </ul>
          </div>

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
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../services/auth'

const router = useRouter()
const route = useRoute()

/* ---------- Form state ---------- */
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const capsOn = ref(false)

function checkCaps(e) {
  if (e && typeof e.getModifierState === 'function') {
    capsOn.value = e.getModifierState('CapsLock')
  }
}

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true

  try {
    await login(username.value, password.value)

    const redirect = route.query.redirect

    if (redirect && typeof redirect === 'string') {
      await router.push(redirect)
    } else {
      await router.push('/')
    }
  } catch (error) {
    errorMessage.value = error.message || 'Unable to sign in.'
  } finally {
    loading.value = false
  }
}

function goToRegister() {
  router.push('/register')
}

/* ---------- Static content ---------- */
const tracks = [
  {
    icon: 'terminal',
    title: 'Linux Essentials',
    desc: 'Shell, permissions, services',
    color: '#39ff88',
  },
  { icon: 'security', title: 'Cybersecurity', desc: 'Recon, hardening, defense', color: '#ff4d6d' },
  { icon: 'view_in_ar', title: 'Docker', desc: 'Containers and isolation', color: '#38bdf8' },
  { icon: 'memory', title: 'Raspberry Pi', desc: 'Home labs and GPIO', color: '#fbbf24' },
]

const stats = reactive([
  { target: 120, shown: 0, suffix: '+', label: 'Lessons' },
  { target: 48, shown: 0, suffix: '', label: 'Hands-on labs' },
  { target: 4, shown: 0, suffix: '', label: 'Learning tracks' },
  { target: 24, shown: 0, suffix: '/7', label: 'Lab server' },
])

const tips = [
  {
    cmd: 'sudo ufw default deny incoming',
    desc: 'Block all inbound traffic by default, then open only the ports you need.',
  },
  {
    cmd: 'sudo ss -tulpn',
    desc: 'List every listening port and the process behind it. Great for spotting surprises.',
  },
  {
    cmd: 'chmod 600 ~/.ssh/id_ed25519',
    desc: 'Private SSH keys must be readable only by you, or SSH will refuse to use them.',
  },
  {
    cmd: 'docker run --read-only --cap-drop=ALL nginx',
    desc: 'Harden a container by making its filesystem read-only and dropping Linux capabilities.',
  },
  {
    cmd: 'sudo journalctl -u ssh -f',
    desc: 'Follow SSH logs in real time to watch login attempts as they happen.',
  },
  {
    cmd: 'sudo fail2ban-client status sshd',
    desc: 'See which IP addresses fail2ban has banned for repeated failed logins.',
  },
  {
    cmd: 'sudo apt update && sudo apt full-upgrade -y',
    desc: 'Patching is the cheapest defense. Keep your Raspberry Pi up to date.',
  },
]
const tipIndex = ref(0)

const tickerItems = [
  'Principle of least privilege',
  'Defense in depth',
  'Patch early, patch often',
  'Key-based SSH beats passwords',
  'Log everything, review often',
  'Segment your network',
  'Back up, then test your restore',
  'Trust, but verify',
]

/* ---------- Live terminal ---------- */
const scenes = [
  {
    title: 'firewall',
    cmd: 'sudo ufw allow 22/tcp && sudo ufw enable',
    out: [
      { text: 'Rule added', cls: 'ok' },
      { text: 'Firewall is active and enabled on system startup', cls: 'ok' },
    ],
  },
  {
    title: 'recon',
    cmd: 'nmap -sV -p 22,80,443 192.168.1.10',
    out: [
      { text: 'PORT    STATE  SERVICE  VERSION', cls: 'dim' },
      { text: '22/tcp  open   ssh      OpenSSH 9.2', cls: '' },
      { text: '80/tcp  open   http     nginx 1.24', cls: '' },
      { text: '443/tcp closed https', cls: 'warn' },
    ],
  },
  {
    title: 'docker',
    cmd: 'docker run -d --name hub -p 8080:80 nginx',
    out: [
      { text: 'Status: Downloaded newer image for nginx:latest', cls: 'dim' },
      { text: '3f9c2a71e0b4  container "hub" is running', cls: 'ok' },
    ],
  },
  {
    title: 'raspberry pi',
    cmd: 'vcgencmd measure_temp && uptime -p',
    out: [
      { text: "temp=47.2'C", cls: 'ok' },
      { text: 'up 12 days, 4 hours, 31 minutes', cls: 'dim' },
    ],
  },
  {
    title: 'intrusion defense',
    cmd: 'sudo fail2ban-client status sshd',
    out: [
      { text: 'Status for the jail: sshd', cls: 'dim' },
      { text: '|- Currently failed: 2', cls: '' },
      { text: '`- Currently banned: 7', cls: 'err' },
    ],
  },
  {
    title: 'access',
    cmd: 'ssh pi@learning-hub.local',
    out: [
      { text: "pi@learning-hub's password: ********", cls: 'dim' },
      { text: 'Welcome back to the Learning Hub.', cls: 'ok' },
    ],
  },
]

const termLines = ref([])
const typing = ref(false)
const sceneTitle = ref('')
let alive = true
const timers = new Set()

function sleep(ms) {
  return new Promise((resolve) => {
    const id = setTimeout(() => {
      timers.delete(id)
      resolve()
    }, ms)
    timers.add(id)
  })
}

async function runTerminal() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  while (alive) {
    for (const scene of scenes) {
      if (!alive) return
      termLines.value = []
      sceneTitle.value = scene.title
      termLines.value.push({ type: 'cmd', text: '', cls: '' })
      const row = termLines.value[0]
      typing.value = true

      if (reduce) {
        row.text = scene.cmd
      } else {
        for (const ch of scene.cmd) {
          if (!alive) return
          row.text += ch
          await sleep(28 + Math.random() * 45)
        }
      }
      typing.value = false
      await sleep(350)

      for (const o of scene.out) {
        if (!alive) return
        termLines.value.push({ type: 'out', text: o.text, cls: o.cls })
        await sleep(reduce ? 50 : 320)
      }
      await sleep(2600)
    }
  }
}

/* ---------- Counters ---------- */
let counterRaf = 0
function animateCounters() {
  const start = performance.now()
  const dur = 1600
  const step = (now) => {
    const p = Math.min((now - start) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    stats.forEach((s) => (s.shown = Math.round(s.target * eased)))
    if (p < 1) counterRaf = requestAnimationFrame(step)
  }
  counterRaf = requestAnimationFrame(step)
}

/* ---------- Matrix rain ---------- */
const rainCanvas = ref(null)
let rainRaf = 0
let rainResize = null
let tipTimer = null

function startRain() {
  const canvas = rainCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const glyphs = '01ABCDEF{}[]<>/\\$#%&*=+;:'.split('')
  const size = 16
  let cols = 0
  let drops = []
  let last = 0

  const resize = () => {
    const rect = canvas.parentElement.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    cols = Math.ceil(canvas.width / size)
    drops = Array.from({ length: cols }, () => Math.random() * -50)
  }
  resize()
  rainResize = resize
  window.addEventListener('resize', resize)

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return

  const draw = (t) => {
    rainRaf = requestAnimationFrame(draw)
    if (t - last < 55) return
    last = t
    ctx.fillStyle = 'rgba(6, 12, 10, 0.12)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = `${size}px "JetBrains Mono", monospace`
    for (let i = 0; i < cols; i++) {
      const ch = glyphs[Math.floor(Math.random() * glyphs.length)]
      const y = drops[i] * size
      ctx.fillStyle = Math.random() > 0.97 ? '#d6ffe9' : 'rgba(57, 255, 136, 0.65)'
      ctx.fillText(ch, i * size, y)
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
      drops[i] += 1
    }
  }
  rainRaf = requestAnimationFrame(draw)
}

onMounted(() => {
  startRain()
  animateCounters()
  runTerminal()
  tipTimer = setInterval(() => {
    tipIndex.value = (tipIndex.value + 1) % tips.length
  }, 6000)
})

onBeforeUnmount(() => {
  alive = false
  timers.forEach((id) => clearTimeout(id))
  timers.clear()
  cancelAnimationFrame(rainRaf)
  cancelAnimationFrame(counterRaf)
  clearInterval(tipTimer)
  if (rainResize) window.removeEventListener('resize', rainResize)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

.login-page {
  --bg: #060c0a;
  --bg-2: #0a1512;
  --panel: rgba(12, 24, 20, 0.78);
  --neon: #39ff88;
  --neon-dim: #1fbf63;
  --cyan: #38bdf8;
  --red: #ff4d6d;
  --amber: #fbbf24;
  --text: #e6f5ec;
  --muted: #8aa397;
  --line: rgba(57, 255, 136, 0.18);

  --q-primary: var(--neon);
  min-height: 100vh;
  background: var(--bg);
  font-family:
    'IBM Plex Sans',
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
  color: var(--text);
}

.login-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
}

/* ============ LEFT PANEL ============ */

.brand-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px clamp(28px, 4.5vw, 72px) 20px;
  overflow: hidden;
  background:
    radial-gradient(900px 500px at 15% 0%, rgba(57, 255, 136, 0.1), transparent 60%),
    radial-gradient(700px 500px at 100% 100%, rgba(56, 189, 248, 0.08), transparent 60%), var(--bg);
  border-right: 1px solid var(--line);
}

.rain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.28;
  pointer-events: none;
  mask-image: linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.35) 70%, transparent 100%);
}

.scanline {
  position: absolute;
  left: 0;
  right: 0;
  height: 120px;
  top: -120px;
  pointer-events: none;
  background: linear-gradient(180deg, transparent, rgba(57, 255, 136, 0.07), transparent);
  animation: scan 7s linear infinite;
}

@keyframes scan {
  to {
    transform: translateY(calc(100vh + 240px));
  }
}

.brand,
.brand-content,
.panel-footer {
  position: relative;
  z-index: 1;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-icon {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: var(--bg);
  background: var(--neon);
  box-shadow: 0 0 24px rgba(57, 255, 136, 0.45);
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  50% {
    box-shadow: 0 0 38px rgba(57, 255, 136, 0.75);
  }
}

.brand-name {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand-sub {
  margin-top: 2px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  color: var(--neon-dim);
}

.brand-content {
  margin: auto 0;
  padding: 28px 0;
  max-width: 680px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(57, 255, 136, 0.06);
  color: var(--neon);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11.5px;
  letter-spacing: 0.08em;
}

.pulse {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--neon);
}

.pulse::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--neon);
  animation: ping 1.8s ease-out infinite;
}

@keyframes ping {
  to {
    transform: scale(3.2);
    opacity: 0;
  }
}

.brand-content h1 {
  margin: 0 0 16px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: clamp(32px, 3.8vw, 52px);
  line-height: 1.1;
  letter-spacing: -0.04em;
  font-weight: 700;
}

.accent {
  background: linear-gradient(90deg, var(--neon), var(--cyan));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Glitch effect */
.glitch {
  position: relative;
  display: inline-block;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.glitch::before {
  color: var(--red);
  clip-path: inset(0 0 55% 0);
  animation: glitch-a 4.5s infinite steps(1);
}

.glitch::after {
  color: var(--cyan);
  clip-path: inset(55% 0 0 0);
  animation: glitch-b 4.5s infinite steps(1);
}

@keyframes glitch-a {
  0%,
  92%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  93% {
    transform: translate(-3px, 1px);
    opacity: 0.9;
  }
  96% {
    transform: translate(3px, -1px);
    opacity: 0.9;
  }
}

@keyframes glitch-b {
  0%,
  92%,
  100% {
    transform: translate(0);
    opacity: 0;
  }
  94% {
    transform: translate(3px, 1px);
    opacity: 0.9;
  }
  97% {
    transform: translate(-3px, -1px);
    opacity: 0.9;
  }
}

.brand-content > p {
  margin: 0 0 24px;
  max-width: 60ch;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}

/* Terminal */
.terminal {
  border: 1px solid var(--line);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(3, 9, 7, 0.88);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(57, 255, 136, 0.07);
  font-family: 'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace;
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.03);
}

.terminal-bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.terminal-bar .r {
  background: #ff5f57;
}
.terminal-bar .y {
  background: #febc2e;
}
.terminal-bar .g {
  background: #28c840;
}

.terminal-bar span {
  margin-left: 8px;
  color: var(--muted);
  font-size: 12px;
}

.terminal-bar em {
  margin-left: auto;
  padding: 2px 8px;
  border-radius: 6px;
  background: rgba(57, 255, 136, 0.1);
  color: var(--neon);
  font-size: 11px;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.terminal-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-height: 168px;
  padding: 16px 20px 18px;
  font-size: 13px;
  line-height: 1.5;
}

.line b {
  margin-right: 10px;
  color: var(--neon);
  font-weight: 500;
}

.line.dim {
  color: var(--muted);
}
.line.ok {
  color: var(--neon);
}
.line.warn {
  color: var(--amber);
}
.line.err {
  color: var(--red);
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--neon);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* Tracks */
.tracks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.track {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.track .q-icon {
  flex: 0 0 auto;
  padding: 8px;
  box-sizing: content-box;
  border-radius: 10px;
  color: var(--c);
  background: color-mix(in srgb, var(--c) 14%, transparent);
}

.track strong {
  display: block;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
}

.track small {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 12px;
}

.track:hover {
  transform: translateY(-3px);
  border-color: var(--c);
  box-shadow: 0 8px 28px color-mix(in srgb, var(--c) 22%, transparent);
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 14px;
}

.stat {
  padding: 12px;
  border: 1px solid var(--line);
  border-radius: 12px;
  text-align: center;
  background: rgba(57, 255, 136, 0.04);
}

.stat .num {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 22px;
  font-weight: 700;
  color: var(--neon);
}

.stat .num span {
  font-size: 14px;
  color: var(--neon-dim);
}

.stat .lbl {
  margin-top: 2px;
  color: var(--muted);
  font-size: 11.5px;
}

/* Tip */
.tip {
  position: relative;
  margin-top: 14px;
  padding: 14px 16px 18px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-left: 3px solid var(--neon);
  border-radius: 12px;
  background: var(--panel);
}

.tip-head {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  color: var(--amber);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
}

.tip-body code {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.45);
  color: var(--neon);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  word-break: break-all;
}

.tip-body p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

.tip-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.05);
}

.tip-progress i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--neon), var(--cyan));
  transform-origin: left;
  animation: fill 6s linear forwards;
}

@keyframes fill {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Footer + ticker */
.panel-footer {
  display: flex;
  align-items: center;
  gap: 18px;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 12.5px;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--neon);
  box-shadow: 0 0 0 4px rgba(57, 255, 136, 0.15);
  animation: ping-soft 2s ease-in-out infinite;
}

@keyframes ping-soft {
  50% {
    box-shadow: 0 0 0 7px rgba(57, 255, 136, 0.04);
  }
}

.ticker {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.ticker-track {
  display: inline-flex;
  gap: 28px;
  white-space: nowrap;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  animation: marquee 32s linear infinite;
}

.ticker-track span {
  display: inline-flex;
  align-items: center;
  color: var(--neon-dim);
}

@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

/* ============ RIGHT PANEL ============ */

.form-panel {
  position: relative;
  display: grid;
  place-items: center;
  padding: 40px clamp(24px, 5vw, 72px);
  overflow: hidden;
  background:
    linear-gradient(rgba(57, 255, 136, 0.035) 1px, transparent 1px) 0 0 / 100% 36px,
    linear-gradient(90deg, rgba(57, 255, 136, 0.035) 1px, transparent 1px) 0 0 / 36px 100%,
    var(--bg-2);
}

.form-glow {
  position: absolute;
  width: 480px;
  height: 480px;
  top: -140px;
  right: -140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(57, 255, 136, 0.18), transparent 70%);
  filter: blur(20px);
  animation: drift 12s ease-in-out infinite alternate;
  pointer-events: none;
}

@keyframes drift {
  to {
    transform: translate(-80px, 120px);
  }
}

.form-container {
  position: relative;
  width: min(100%, 430px);
  padding: 32px 30px 24px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--panel);
  backdrop-filter: blur(10px);
  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  animation: rise 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-header {
  margin-bottom: 24px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 14px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(57, 255, 136, 0.1);
  color: var(--neon);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
}

.form-header h2 {
  margin: 0 0 8px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 32px;
  line-height: 1.1;
  letter-spacing: -0.04em;
  font-weight: 700;
}

.blink {
  color: var(--neon);
  animation: blink 1.1s steps(1) infinite;
}

.form-header p {
  margin: 0;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.55;
}

.login-form {
  display: grid;
  gap: 16px;
}

.login-form :deep(.q-field__control) {
  min-height: 54px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.35);
}

.login-form :deep(.q-field--outlined .q-field__control:before) {
  border-color: var(--line);
}

.login-form :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: rgba(57, 255, 136, 0.5);
}

.login-form :deep(.q-field--focused .q-field__control:after) {
  border-width: 2px;
  border-color: var(--neon);
  box-shadow: 0 0 18px rgba(57, 255, 136, 0.25);
}

.login-form :deep(.q-field__native),
.login-form :deep(.q-field__input) {
  color: var(--text);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 14px;
}

.login-form :deep(.q-field__label),
.login-form :deep(.q-field__prepend),
.login-form :deep(.q-field__append),
.login-form :deep(.q-field__bottom) {
  color: var(--muted);
}

.login-form :deep(.q-field--focused .q-field__label),
.login-form :deep(.q-field--focused .q-field__prepend) {
  color: var(--neon);
}

.login-form :deep(.q-field--error .q-field__bottom) {
  color: #ff8aa0;
}

.login-button {
  position: relative;
  width: 100%;
  min-height: 52px;
  margin-top: 2px;
  overflow: hidden;
  border-radius: 10px;
  color: #04110a;
  background: linear-gradient(90deg, var(--neon), #7dffb8);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 15px;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 0 22px rgba(57, 255, 136, 0.3);
}

.login-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: -60%;
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
  transform: skewX(-20deg);
  animation: shine 3.8s ease-in-out infinite;
}

@keyframes shine {
  0%,
  60% {
    left: -60%;
  }
  100% {
    left: 130%;
  }
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 36px rgba(57, 255, 136, 0.55);
}

.caps-warning,
.error-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 11px 14px;
  border-radius: 10px;
  font-size: 13.5px;
  line-height: 1.45;
}

.caps-warning {
  border: 1px solid rgba(251, 191, 36, 0.4);
  color: var(--amber);
  background: rgba(251, 191, 36, 0.08);
}

.error-box {
  border: 1px solid rgba(255, 77, 109, 0.45);
  color: #ffb3c0;
  background: rgba(255, 77, 109, 0.1);
  animation: shake 0.4s ease;
}

@keyframes shake {
  20%,
  60% {
    transform: translateX(-5px);
  }
  40%,
  80% {
    transform: translateX(5px);
  }
}

.register-link {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  color: var(--muted);
  font-size: 14px;
}

.register-link button {
  padding: 0;
  border: 0;
  border-radius: 4px;
  color: var(--neon);
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.register-link button:hover {
  text-decoration: underline;
}

.register-link button:focus-visible,
.login-button:focus-visible {
  outline: 2px solid var(--neon);
  outline-offset: 3px;
}

.register-link button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Hygiene */
.hygiene {
  margin-top: 22px;
  padding: 14px 16px;
  border: 1px dashed var(--line);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
}

.hygiene-title {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  color: var(--cyan);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  letter-spacing: 0.04em;
}

.hygiene ul {
  display: grid;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.hygiene li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.5;
}

.hygiene li .q-icon {
  flex: 0 0 auto;
  margin-top: 2px;
  color: var(--neon-dim);
}

.form-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 18px;
  color: var(--muted);
  font-size: 12.5px;
}

.mobile-brand {
  display: none;
}

/* ============ RESPONSIVE ============ */

@media (max-width: 1100px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 950px) {
  .login-shell {
    grid-template-columns: 1fr;
  }

  .brand-panel {
    display: none;
  }

  .form-panel {
    place-items: start center;
    padding: 24px 16px 40px;
  }

  .mobile-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
}

@media (max-width: 480px) {
  .form-container {
    padding: 24px 20px 20px;
  }

  .form-header h2 {
    font-size: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scanline,
  .glitch::before,
  .glitch::after,
  .pulse::after,
  .cursor,
  .blink,
  .brand-icon,
  .status-dot,
  .ticker-track,
  .form-glow,
  .login-button::after,
  .form-container,
  .tip-progress i {
    animation: none;
  }

  .login-button,
  .track {
    transition: none;
  }
}
</style>
