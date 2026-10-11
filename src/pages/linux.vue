<template>
  <q-page ref="pageRoot" class="linux-page" :class="{ 'anim-ready': animReady }">
    <div class="linux-shell">
      <!-- Intro / hero -->
      <section class="linux-hero">
        <div class="hero-copy">
          <div class="breadcrumb">
            <span class="crumb-dot"></span>
            <span>Raspi Learning Hub</span>
            <span class="crumb-sep">/</span>
            <span>Linux fundamentals</span>
          </div>

          <h1>Linux Operating System</h1>
          <p class="hero-subtitle">
            Build your foundation in Linux, from understanding the operating system to exploring the
            concepts in your learning material.
          </p>

          <ul class="hero-tags">
            <li><q-icon name="menu_book" /> Learning material</li>
            <li><q-icon name="schedule" /> Self-paced</li>
            <li><q-icon name="picture_as_pdf" /> PDF presentation</li>
          </ul>

          <a class="hero-jump" href="#linux-study-material" @click.prevent="startLearning">
            <span>Start learning</span>
            <q-icon name="arrow_downward" size="18px" />
          </a>
        </div>

        <div class="hero-art" aria-hidden="true">
          <div class="terminal-window">
            <div class="terminal-top">
              <span></span><span></span><span></span>
              <small>linux-terminal</small>
            </div>
            <div class="terminal-content">
              <template v-for="(line, i) in termLines" :key="i">
                <div>
                  <span class="terminal-prompt">tj@raspi</span><span class="terminal-path">:~$</span
                  ><span class="terminal-command">{{ line.cmd }}</span>
                </div>
                <div v-for="(out, j) in line.out" :key="j" class="terminal-output">{{ out }}</div>
              </template>
              <div>
                <span class="terminal-prompt">tj@raspi</span><span class="terminal-path">:~$</span
                ><span class="terminal-command">{{ typed }}</span
                ><span class="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick orientation -->
      <section class="overview-grid" aria-label="Linux learning overview">
        <article class="overview-item reveal">
          <div class="overview-icon"><q-icon name="computer" size="22px" /></div>
          <div>
            <h2>Understand the system</h2>
            <p>Learn the role Linux plays in computers and servers.</p>
          </div>
        </article>

        <article class="overview-item reveal" style="--d: 100ms">
          <div class="overview-icon"><q-icon name="terminal" size="22px" /></div>
          <div>
            <h2>Explore the material</h2>
            <p>Read the supplied presentation directly on this page.</p>
          </div>
        </article>

        <article class="overview-item reveal" style="--d: 200ms">
          <div class="overview-icon"><q-icon name="school" size="22px" /></div>
          <div>
            <h2>Study at your pace</h2>
            <p>Zoom in, open the PDF separately, or download it.</p>
          </div>
        </article>
      </section>

      <!-- PDF viewer -->
      <section id="linux-study-material" class="study-section">
        <div class="section-heading reveal">
          <div>
            <h2>Linux Operating System</h2>
            <p>
              Use the viewer below to read the presentation. Your browser's PDF controls are also
              available inside the document.
            </p>
          </div>
          <div class="material-status">
            <span class="status-dot"></span>
            PDF material
          </div>
        </div>

        <q-card flat bordered class="pdf-card reveal">
          <div class="pdf-toolbar">
            <div class="pdf-file">
              <div class="pdf-file-icon"><q-icon name="picture_as_pdf" size="22px" /></div>
              <div class="pdf-file-copy">
                <strong>Linux Operating System</strong>
                <span>PDF learning resource</span>
              </div>
            </div>

            <div class="pdf-actions">
              <div class="zoom-group">
                <q-btn
                  flat
                  no-caps
                  icon="remove"
                  label="Zoom out"
                  class="toolbar-btn zoom-btn"
                  :disable="zoom <= 50"
                  @click="changeZoom(-10)"
                />
                <span class="zoom-value">{{ zoom }}%</span>
                <q-btn
                  flat
                  no-caps
                  icon="add"
                  label="Zoom in"
                  class="toolbar-btn zoom-btn"
                  :disable="zoom >= 150"
                  @click="changeZoom(10)"
                />
              </div>
              <span class="toolbar-separator"></span>
              <q-btn
                flat
                no-caps
                icon="open_in_new"
                label="Open PDF"
                class="toolbar-btn"
                @click="openPdf"
              />
              <q-btn
                unelevated
                no-caps
                icon="download"
                label="Download"
                class="download-btn"
                @click="downloadPdf"
              />
              <q-btn
                flat
                round
                dense
                icon="fullscreen"
                aria-label="Open PDF viewer in fullscreen"
                class="fullscreen-btn"
                @click="isFullscreen = true"
              />
            </div>
          </div>

          <div class="pdf-viewer-wrap" :style="{ '--viewer-zoom': `${zoom / 100}` }">
            <iframe
              :key="`linux-pdf-${zoom}`"
              class="pdf-frame"
              :src="viewerUrl"
              title="Linux Operating System PDF"
              loading="lazy"
            ></iframe>
          </div>

          <div class="pdf-footer">
            <div class="footer-hint">
              <q-icon name="lightbulb" size="18px" />
              <span>Tip: Use the PDF's built-in controls for page navigation and search.</span>
            </div>
            <span class="footer-label">Raspi Learning Hub</span>
          </div>
        </q-card>
      </section>

      <section class="study-note reveal">
        <div class="note-icon"><q-icon name="edit_note" size="24px" /></div>
        <div>
          <h2>Study tip</h2>
          <p>
            As you read, note down unfamiliar Linux terms and commands. You can revisit the
            presentation whenever you need a refresher.
          </p>
        </div>
      </section>

      <!-- ============================================================
           Linux at a glance (supporting content)
      ============================================================= -->
      <section class="glance">
        <div class="glance-heading reveal">
          <h2>Linux at a glance</h2>
          <p>
            Short explainers that connect to your presentation. Read them before or after the PDF.
          </p>
        </div>

        <!-- What it is + history -->
        <div class="two-col">
          <div class="panel reveal">
            <h3>What is Linux?</h3>
            <p class="panel-lead">
              Linux is a free, open-source operating system. It manages your computer's hardware and
              lets programs run on top of it. You will meet a few key terms again and again.
            </p>
            <dl class="glossary">
              <div v-for="term in glossary" :key="term.name">
                <dt>{{ term.name }}</dt>
                <dd>{{ term.text }}</dd>
              </div>
            </dl>
          </div>

          <div class="panel reveal" style="--d: 120ms">
            <h3>A short history</h3>
            <ol class="timeline">
              <li
                v-for="(event, i) in timeline"
                :key="event.year"
                class="reveal"
                :style="{ '--d': `${i * 110}ms` }"
              >
                <span class="timeline-year">{{ event.year }}</span>
                <p>{{ event.text }}</p>
              </li>
            </ol>
          </div>
        </div>

        <!-- Layers + where it runs -->
        <div class="two-col">
          <div class="panel reveal">
            <h3>How the pieces fit together</h3>
            <p class="panel-lead">When you type a command, it travels down through these layers.</p>
            <ul class="stack">
              <li
                v-for="(layer, i) in layers"
                :key="layer.name"
                class="layer reveal"
                :class="{ 'layer-core': layer.core }"
                :style="{ '--d': `${i * 140}ms` }"
              >
                <q-icon :name="layer.icon" size="22px" />
                <div>
                  <strong>{{ layer.name }}</strong>
                  <span>{{ layer.text }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div class="panel reveal" style="--d: 120ms">
            <h3>Where Linux runs</h3>
            <p class="panel-lead">You probably use Linux every day without knowing it.</p>
            <ul class="runs">
              <li
                v-for="(place, i) in places"
                :key="place.title"
                class="reveal"
                :style="{ '--d': `${i * 90}ms` }"
              >
                <div class="runs-icon"><q-icon :name="place.icon" size="20px" /></div>
                <div>
                  <strong>{{ place.title }}</strong>
                  <span>{{ place.text }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Distributions -->
        <div class="panel panel-wide reveal">
          <h3>Popular distributions</h3>
          <p class="panel-lead">
            A distribution (distro) bundles the Linux kernel with tools and software into a complete
            system.
          </p>
          <div class="table-scroll">
            <table class="distro-table">
              <thead>
                <tr>
                  <th scope="col">Distribution</th>
                  <th scope="col">Known for</th>
                  <th scope="col">Installs software with</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="distro in distros" :key="distro.name">
                  <th scope="row">{{ distro.name }}</th>
                  <td>{{ distro.known }}</td>
                  <td>
                    <code>{{ distro.tool }}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Command explorer -->
        <div class="panel panel-wide reveal">
          <h3>Try the basic commands</h3>
          <p class="panel-lead">
            Pick a command to see what it does and what you would see in the terminal.
          </p>

          <div class="cmd-explorer">
            <div class="cmd-tabs" role="tablist" aria-label="Linux commands">
              <button
                v-for="cmd in commands"
                :key="cmd.name"
                type="button"
                role="tab"
                class="cmd-tab"
                :class="{ 'is-active': cmd.name === activeCmd }"
                :aria-selected="cmd.name === activeCmd"
                @click="activeCmd = cmd.name"
              >
                {{ cmd.name }}
              </button>
            </div>

            <div :key="currentCmd.name" class="cmd-detail" role="tabpanel">
              <h4>{{ currentCmd.title }}</h4>
              <p>{{ currentCmd.text }}</p>
              <div class="cmd-terminal">
                <div class="cmd-line">
                  <span class="terminal-prompt">tj@raspi</span><span class="terminal-path">:~$</span
                  ><span class="terminal-command">{{ currentCmd.syntax }}</span>
                </div>
                <div
                  v-for="(out, i) in currentCmd.out"
                  :key="i"
                  class="cmd-out"
                  :style="{ '--i': i }"
                >
                  {{ out }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- File system -->
        <div class="panel panel-wide reveal">
          <h3>The Linux file system</h3>
          <p class="panel-lead">
            Linux has one tree of folders that starts at <code>/</code>, called the root. Nothing
            sits outside it.
          </p>
          <ul class="fs-tree">
            <li class="fs-row fs-root reveal">
              <code>/</code>
              <span>The root. Everything in Linux starts here.</span>
            </li>
            <li
              v-for="(dir, i) in folders"
              :key="dir.path"
              class="fs-row reveal"
              :style="{ '--d': `${(i + 1) * 70}ms` }"
            >
              <span class="fs-branch" aria-hidden="true">{{
                i === folders.length - 1 ? '└──' : '├──'
              }}</span>
              <code>{{ dir.path }}</code>
              <span>{{ dir.text }}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <!-- Fullscreen PDF dialog -->
    <q-dialog v-model="isFullscreen" maximized transition-show="fade" transition-hide="fade">
      <q-card class="fullscreen-pdf-card">
        <div class="fullscreen-toolbar">
          <div class="pdf-file">
            <div class="pdf-file-icon"><q-icon name="picture_as_pdf" size="22px" /></div>
            <div class="pdf-file-copy">
              <strong>Linux Operating System</strong>
              <span>Focused reading mode</span>
            </div>
          </div>
          <div class="fullscreen-actions">
            <q-btn
              flat
              round
              icon="open_in_new"
              aria-label="Open PDF in new tab"
              @click="openPdf"
            />
            <q-btn flat round icon="download" aria-label="Download PDF" @click="downloadPdf" />
            <q-btn
              flat
              round
              icon="close"
              aria-label="Close fullscreen viewer"
              @click="isFullscreen = false"
            />
          </div>
        </div>
        <iframe
          class="fullscreen-pdf-frame"
          :src="viewerUrl"
          title="Linux Operating System PDF fullscreen viewer"
        ></iframe>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

/* ------------------------------------------------------------------
   Existing PDF viewer logic (unchanged)
------------------------------------------------------------------- */
const PDF_URL = '/learning/linux-operating-system.pdf'
function startLearning() {
  document.getElementById('linux-study-material')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

const zoom = ref(100)
const isFullscreen = ref(false)

const viewerUrl = computed(() => `${PDF_URL}#toolbar=1&navpanes=1&view=FitH&zoom=${zoom.value}`)

function changeZoom(amount) {
  zoom.value = Math.min(150, Math.max(50, zoom.value + amount))
}

function openPdf() {
  window.open(PDF_URL, '_blank', 'noopener,noreferrer')
}

function downloadPdf() {
  const link = document.createElement('a')
  link.href = PDF_URL
  link.download = 'linux-operating-system.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

/* ------------------------------------------------------------------
   Supporting Linux content (edit these arrays to change the text)
------------------------------------------------------------------- */
const glossary = [
  {
    name: 'Kernel',
    text: 'The core of the system. It controls the processor, memory, and devices.',
  },
  {
    name: 'Shell',
    text: 'The program that reads the commands you type. Bash is the most common one.',
  },
  {
    name: 'Distribution',
    text: 'A complete Linux system: the kernel plus tools, software, and an installer.',
  },
  { name: 'Package manager', text: 'A tool that installs, updates, and removes software for you.' },
  {
    name: 'Open source',
    text: 'The code is public, so anyone can read it, change it, and share it.',
  },
]

const timeline = [
  { year: '1991', text: 'Linus Torvalds, a student in Finland, announces a free kernel.' },
  {
    year: '1993',
    text: 'The Debian project begins and becomes the base for many other distributions.',
  },
  { year: '2004', text: 'Ubuntu releases its first version, aimed at everyday users.' },
  { year: '2008', text: 'The first Android phone ships, built on the Linux kernel.' },
  { year: '2012', text: 'Raspberry Pi launches, and Linux becomes its main system.' },
]

const layers = [
  { name: 'Applications', text: 'Browsers, editors, and the programs you write.', icon: 'apps' },
  { name: 'Shell', text: 'Reads your command and passes it on.', icon: 'terminal' },
  {
    name: 'Kernel',
    text: 'Linux itself. Decides how the hardware is used.',
    icon: 'hub',
    core: true,
  },
  {
    name: 'Hardware',
    text: 'Processor, memory, storage, and the Raspberry Pi board.',
    icon: 'memory',
  },
]

const places = [
  {
    title: 'Servers and the cloud',
    text: 'Most websites and online services run on Linux servers.',
    icon: 'dns',
  },
  {
    title: 'Android phones',
    text: 'Android is built on top of the Linux kernel.',
    icon: 'smartphone',
  },
  {
    title: 'Raspberry Pi and devices',
    text: 'Small boards, routers, and smart devices.',
    icon: 'developer_board',
  },
  { title: 'Supercomputers', text: 'The world’s fastest supercomputers run Linux.', icon: 'bolt' },
  {
    title: 'Desktops and laptops',
    text: 'Used by developers, students, and anyone who wants control.',
    icon: 'desktop_windows',
  },
]

const distros = [
  { name: 'Debian', known: 'Very stable. The base for many other distributions.', tool: 'apt' },
  { name: 'Ubuntu', known: 'Beginner friendly with a large community.', tool: 'apt' },
  {
    name: 'Raspberry Pi OS',
    known: 'Made for Raspberry Pi boards and based on Debian.',
    tool: 'apt',
  },
  { name: 'Fedora', known: 'Newer software and strong developer tools.', tool: 'dnf' },
  {
    name: 'Arch Linux',
    known: 'Minimal and fully customizable. Best for experienced users.',
    tool: 'pacman',
  },
]

const commands = [
  {
    name: 'pwd',
    title: 'Print working directory',
    text: 'Shows the full path of the folder you are in right now.',
    syntax: 'pwd',
    out: ['/home/tj'],
  },
  {
    name: 'ls',
    title: 'List files',
    text: 'Lists what is inside a folder. Add -l for details or -a to include hidden files.',
    syntax: 'ls -l',
    out: ['drwxr-xr-x 2 tj tj 4096 lessons', '-rw-r--r-- 1 tj tj  120 notes.txt'],
  },
  {
    name: 'cd',
    title: 'Change directory',
    text: 'Moves you into another folder. Use cd .. to go up one level and cd ~ to return home.',
    syntax: 'cd lessons',
    out: ['tj@raspi:~/lessons$'],
  },
  {
    name: 'mkdir',
    title: 'Make directory',
    text: 'Creates a new folder. Linux stays quiet when a command works.',
    syntax: 'mkdir projects',
    out: ['(no output means it worked)'],
  },
  {
    name: 'cat',
    title: 'Show file contents',
    text: 'Prints a text file in the terminal.',
    syntax: 'cat notes.txt',
    out: ['Kernel = the core of the system', 'Shell = where I type commands'],
  },
  {
    name: 'grep',
    title: 'Search text',
    text: 'Finds the lines in a file that match a word or pattern.',
    syntax: 'grep Kernel notes.txt',
    out: ['Kernel = the core of the system'],
  },
  {
    name: 'chmod',
    title: 'Change permissions',
    text: 'Controls who can read, write, or run a file. +x makes a file runnable.',
    syntax: 'chmod +x script.sh',
    out: ['(no output means it worked)'],
  },
  {
    name: 'sudo',
    title: 'Run as administrator',
    text: 'Runs one command with admin rights. On Debian-based systems, apt installs and updates software.',
    syntax: 'sudo apt update',
    out: ['[sudo] password for tj:', 'Reading package lists... Done'],
  },
]

const folders = [
  { path: '/home', text: 'Personal folders for each user, like /home/tj.' },
  { path: '/etc', text: 'System-wide configuration files.' },
  { path: '/var', text: 'Data that keeps changing, such as logs.' },
  { path: '/usr', text: 'Installed programs and their libraries.' },
  { path: '/bin', text: 'Essential commands like ls and cp.' },
  { path: '/dev', text: 'Devices shown as files, like disks.' },
  { path: '/tmp', text: 'Temporary files that are cleared on restart.' },
]

const activeCmd = ref('pwd')
const currentCmd = computed(() => commands.find((c) => c.name === activeCmd.value) || commands[0])

/* ------------------------------------------------------------------
   Animations: hero terminal typing + reveal on scroll
------------------------------------------------------------------- */
const TERMINAL_SCRIPT = [
  { cmd: 'uname -s', out: ['Linux'] },
  { cmd: 'whoami', out: ['tj'] },
  { cmd: 'pwd', out: ['/home/tj'] },
]

const termLines = ref([])
const typed = ref('')
const animReady = ref(false)
const pageRoot = ref(null)

let alive = true
let observer = null

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function runTerminal() {
  while (alive) {
    termLines.value = []
    for (const step of TERMINAL_SCRIPT) {
      typed.value = ''
      for (const ch of step.cmd) {
        if (!alive) return
        typed.value += ch
        await sleep(75)
      }
      await sleep(260)
      if (!alive) return
      termLines.value.push(step)
      typed.value = ''
      await sleep(650)
    }
    await sleep(2600)
  }
}

onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const root = pageRoot.value?.$el ?? pageRoot.value
  const targets = root ? root.querySelectorAll('.reveal') : []

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'))
    termLines.value = [...TERMINAL_SCRIPT]
    return
  }

  animReady.value = true
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )
  targets.forEach((el) => observer.observe(el))

  runTerminal()
})

onBeforeUnmount(() => {
  alive = false
  observer?.disconnect()
})
</script>

<style scoped>
/* ------------------------------------------------------------------
   Design tokens
   Palette: Pi raspberry + leaf green on a cool paper background.
   Type: IBM Plex Sans for reading, JetBrains Mono for the terminal.
   Both fall back to Segoe UI / Consolas if they are not installed.
------------------------------------------------------------------- */
.linux-page {
  --paper: #f3f5f2;
  --surface: #ffffff;
  --ink: #17211c;
  --ink-soft: #3d4a43;
  --muted: #66746b;
  --line: #d8dfd9;
  --line-soft: #e7ece8;
  --berry: #b01545;
  --berry-dark: #8f0f37;
  --berry-tint: #fbe9ee;
  --leaf: #3f6b1f;
  --leaf-tint: #e9f1e1;
  --term: #0f1a15;
  --term-line: #22332a;

  --font-sans: 'IBM Plex Sans', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', Consolas, 'Courier New', monospace;

  min-height: 100%;
  padding: 36px 28px 72px;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-sans);
}

.linux-shell {
  width: min(1180px, 100%);
  margin: 0 auto;
}

/* ------------------------------------------------------------------
   Scroll reveal (only active once the script marks the page ready)
------------------------------------------------------------------- */
.anim-ready .reveal {
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.65s ease,
    transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--d, 0ms);
}

.anim-ready .reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* ------------------------------------------------------------------
   Hero
------------------------------------------------------------------- */
.linux-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.9fr);
  align-items: center;
  gap: 40px;
  padding: 48px 52px;
  border: 1px solid var(--line);
  border-left: 4px solid var(--berry);
  border-radius: 14px;
  background: var(--surface);
}

.hero-copy > * {
  animation: rise-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

.hero-copy > :nth-child(2) {
  animation-delay: 0.08s;
}
.hero-copy > :nth-child(3) {
  animation-delay: 0.16s;
}
.hero-copy > :nth-child(4) {
  animation-delay: 0.24s;
}
.hero-copy > :nth-child(5) {
  animation-delay: 0.32s;
}

@keyframes rise-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 9px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 500;
}

.crumb-dot,
.status-dot {
  width: 8px;
  height: 8px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: var(--berry);
}

.crumb-dot {
  animation: dot-pulse 2.4s ease-out infinite;
}

@keyframes dot-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(176, 21, 69, 0.4);
  }
  70%,
  100% {
    box-shadow: 0 0 0 9px rgba(176, 21, 69, 0);
  }
}

.crumb-sep {
  color: var(--line);
}

.hero-copy h1 {
  max-width: 560px;
  margin: 22px 0 0;
  color: var(--ink);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -1.4px;
}

.hero-subtitle {
  max-width: 540px;
  margin: 18px 0 0;
  color: var(--ink-soft);
  font-size: 16px;
  line-height: 1.7;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
}

.hero-tags li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  color: var(--ink-soft);
  background: var(--paper);
  font-size: 13px;
  font-weight: 500;
}

.hero-tags :deep(.q-icon) {
  color: var(--leaf);
  font-size: 17px;
}

.hero-jump {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 13px 20px;
  border-radius: 8px;
  color: #fff;
  background: var(--berry);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.18s ease;
}

.hero-jump:hover {
  background: var(--berry-dark);
}

.hero-jump :deep(.q-icon) {
  animation: nudge-down 1.8s ease-in-out infinite;
}

@keyframes nudge-down {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(3px);
  }
}

.hero-jump:focus-visible,
.cmd-tab:focus-visible,
.linux-page :deep(.q-btn:focus-visible) {
  outline: 3px solid rgba(176, 21, 69, 0.35);
  outline-offset: 2px;
}

/* Terminal: the one memorable element on the page */
.hero-art {
  display: grid;
  place-items: center;
}

.terminal-window {
  width: min(100%, 400px);
  overflow: hidden;
  border: 1px solid var(--term-line);
  border-radius: 10px;
  background: var(--term);
  box-shadow:
    14px 14px 0 var(--leaf-tint),
    0 18px 40px rgba(15, 26, 21, 0.2);
  animation: terminal-in 0.9s 0.25s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@keyframes terminal-in {
  from {
    opacity: 0;
    transform: translateY(22px) rotate(-1.5deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.terminal-top {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 40px;
  padding: 0 14px;
  border-bottom: 1px solid var(--term-line);
  background: #14231c;
}

.terminal-top > span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #4a5c52;
}

.terminal-top > span:first-child {
  background: #d9456f;
}
.terminal-top > span:nth-child(2) {
  background: #d7b24a;
}
.terminal-top > span:nth-child(3) {
  background: #7fb24a;
}

.terminal-top small {
  margin-left: auto;
  color: #8ea196;
  font-family: var(--font-mono);
  font-size: 11px;
}

.terminal-content {
  min-height: 262px;
  padding: 24px 24px 28px;
  color: #e4ece6;
  font-family: var(--font-mono);
  font-size: 14px;
  line-height: 1.85;
}

.terminal-prompt {
  color: #8fcf5a;
}
.terminal-path {
  color: #7aa7ff;
}

.terminal-command {
  margin-left: 9px;
}

.terminal-output {
  color: #f0a1b8;
}

.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  margin-left: 2px;
  vertical-align: -3px;
  background: #8fcf5a;
  animation: cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes cursor-blink {
  to {
    visibility: hidden;
  }
}

/* ------------------------------------------------------------------
   Overview strip
------------------------------------------------------------------- */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin-top: 24px;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.overview-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  min-width: 0;
  padding: 24px 24px 24px 0;
}

.overview-item + .overview-item {
  padding-left: 24px;
  border-left: 1px solid var(--line);
}

.overview-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 10px;
  color: var(--berry);
  background: var(--berry-tint);
  transition: transform 0.25s ease;
}

.overview-item:hover .overview-icon {
  transform: rotate(-6deg) scale(1.08);
}

.overview-item:nth-child(2) .overview-icon {
  color: var(--leaf);
  background: var(--leaf-tint);
}

.overview-item:nth-child(3) .overview-icon {
  color: var(--ink-soft);
  background: var(--line-soft);
}

.overview-item h2 {
  margin: 1px 0 5px;
  color: var(--ink);
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
}

.overview-item p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

/* ------------------------------------------------------------------
   Study / PDF section
------------------------------------------------------------------- */
.study-section {
  margin-top: 52px;
  scroll-margin-top: 24px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.section-heading h2 {
  margin: 0 0 8px;
  color: var(--ink);
  font-size: clamp(24px, 2.6vw, 32px);
  font-weight: 700;
  letter-spacing: -0.6px;
}

.section-heading p {
  max-width: 620px;
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.material-status {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex: 0 0 auto;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--ink-soft);
  background: var(--surface);
  font-size: 13px;
  font-weight: 600;
}

.material-status .status-dot {
  background: var(--leaf);
}

.pdf-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
}

.pdf-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 20px;
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}

.pdf-file {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.pdf-file-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 10px;
  color: var(--berry);
  background: var(--berry-tint);
}

.pdf-file-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}

.pdf-file-copy strong {
  overflow: hidden;
  color: var(--ink);
  font-size: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pdf-file-copy span {
  color: var(--muted);
  font-size: 13px;
}

.pdf-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  flex-wrap: wrap;
}

.zoom-group {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--paper);
}

.toolbar-btn {
  min-height: 36px;
  border-radius: 8px;
  color: var(--ink-soft);
  font-size: 13px;
  font-weight: 600;
}

.toolbar-btn:hover {
  background: var(--line-soft);
  color: var(--ink);
}

.zoom-value {
  min-width: 48px;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  text-align: center;
}

.toolbar-separator {
  width: 1px;
  height: 26px;
  margin: 0 6px;
  background: var(--line);
}

.download-btn {
  min-height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  color: #fff;
  background: var(--berry);
  font-size: 13px;
  font-weight: 600;
}

.download-btn:hover {
  background: var(--berry-dark);
}

.fullscreen-btn {
  color: var(--ink-soft);
}

.pdf-viewer-wrap {
  height: min(80vh, 920px);
  min-height: 520px;
  background: #dfe5e0;
}

.pdf-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #dfe5e0;
}

.pdf-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 20px;
  border-top: 1px solid var(--line);
  background: var(--surface);
}

.footer-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--muted);
  font-size: 13px;
}

.footer-hint :deep(.q-icon) {
  color: var(--leaf);
}

.footer-label {
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

/* ------------------------------------------------------------------
   Study tip
------------------------------------------------------------------- */
.study-note {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 24px;
  padding: 20px 24px;
  border: 1px solid #cfdcc3;
  border-left: 4px solid var(--leaf);
  border-radius: 10px;
  background: var(--leaf-tint);
}

.note-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 10px;
  color: var(--leaf);
  background: #fff;
}

.study-note h2 {
  margin: 1px 0 4px;
  color: var(--ink);
  font-size: 16px;
  font-weight: 600;
}

.study-note p {
  max-width: 760px;
  margin: 0;
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.7;
}

/* ------------------------------------------------------------------
   Linux at a glance
------------------------------------------------------------------- */
.glance {
  margin-top: 72px;
}

.glance-heading {
  margin-bottom: 24px;
}

.glance-heading h2 {
  margin: 0 0 8px;
  color: var(--ink);
  font-size: clamp(24px, 2.6vw, 32px);
  font-weight: 700;
  letter-spacing: -0.6px;
}

.glance-heading p {
  max-width: 620px;
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
}

.two-col {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}

.panel {
  min-width: 0;
  padding: 28px 30px 30px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
}

.panel-wide {
  margin-bottom: 20px;
}

.panel h3 {
  margin: 0 0 8px;
  color: var(--ink);
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.3px;
}

.panel-lead {
  max-width: 640px;
  margin: 0 0 22px;
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.7;
}

.panel code,
.distro-table code {
  padding: 2px 7px;
  border-radius: 5px;
  color: var(--berry-dark);
  background: var(--berry-tint);
  font-family: var(--font-mono);
  font-size: 13px;
}

/* Glossary */
.glossary {
  margin: 0;
}

.glossary > div {
  padding: 13px 0;
  border-top: 1px solid var(--line-soft);
}

.glossary dt {
  color: var(--ink);
  font-size: 14px;
  font-weight: 700;
}

.glossary dd {
  margin: 3px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

/* Timeline */
.timeline {
  position: relative;
  margin: 22px 0 0;
  padding: 0 0 0 26px;
  list-style: none;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 5px;
  width: 2px;
  background: var(--line);
}

.timeline li {
  position: relative;
  padding-bottom: 20px;
}

.timeline li:last-child {
  padding-bottom: 0;
}

.timeline li::before {
  content: '';
  position: absolute;
  top: 5px;
  left: -26px;
  width: 12px;
  height: 12px;
  border: 2px solid var(--berry);
  border-radius: 50%;
  background: var(--surface);
}

.timeline-year {
  color: var(--berry);
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 700;
}

.timeline p {
  margin: 3px 0 0;
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.6;
}

/* Layer stack */
.stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.layer {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--ink-soft);
  background: var(--paper);
}

.layer:not(:last-child)::after {
  content: '↓';
  position: absolute;
  bottom: -20px;
  left: 50%;
  color: var(--muted);
  font-size: 15px;
  line-height: 20px;
  transform: translateX(-50%);
}

.layer :deep(.q-icon) {
  color: var(--leaf);
}

.layer strong {
  display: block;
  color: var(--ink);
  font-size: 14px;
  font-weight: 700;
}

.layer span {
  display: block;
  margin-top: 1px;
  font-size: 13px;
  line-height: 1.5;
}

.layer-core {
  border-color: var(--berry);
  background: var(--berry-tint);
}

.layer-core :deep(.q-icon) {
  color: var(--berry);
}

/* Where it runs */
.runs {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.runs li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 11px 0;
  border-top: 1px solid var(--line-soft);
}

.runs li:first-child {
  border-top: 0;
}

.runs-icon {
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 9px;
  color: var(--leaf);
  background: var(--leaf-tint);
}

.runs strong {
  display: block;
  color: var(--ink);
  font-size: 14px;
  font-weight: 700;
}

.runs span {
  display: block;
  margin-top: 2px;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

/* Distribution table */
.table-scroll {
  overflow-x: auto;
}

.distro-table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

.distro-table th,
.distro-table td {
  padding: 13px 14px;
  border-bottom: 1px solid var(--line-soft);
  vertical-align: top;
}

.distro-table thead th {
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font-size: 13px;
  font-weight: 600;
}

.distro-table tbody th {
  color: var(--ink);
  font-weight: 700;
  white-space: nowrap;
}

.distro-table td {
  color: var(--ink-soft);
  line-height: 1.55;
}

.distro-table tbody tr {
  transition: background 0.18s ease;
}

.distro-table tbody tr:hover {
  background: var(--paper);
}

/* Command explorer */
.cmd-explorer {
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 28px;
}

.cmd-tabs {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cmd-tab {
  padding: 10px 14px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--ink-soft);
  background: transparent;
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease;
}

.cmd-tab:hover {
  background: var(--paper);
  color: var(--ink);
}

.cmd-tab.is-active {
  border-color: var(--berry);
  color: var(--berry-dark);
  background: var(--berry-tint);
}

.cmd-detail {
  min-width: 0;
  animation: cmd-in 0.35s ease both;
}

@keyframes cmd-in {
  from {
    opacity: 0;
    transform: translateX(10px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.cmd-detail h4 {
  margin: 2px 0 6px;
  color: var(--ink);
  font-size: 18px;
  font-weight: 700;
}

.cmd-detail p {
  max-width: 560px;
  margin: 0 0 18px;
  color: var(--ink-soft);
  font-size: 14px;
  line-height: 1.7;
}

.cmd-terminal {
  padding: 18px 20px 20px;
  overflow-x: auto;
  border: 1px solid var(--term-line);
  border-radius: 10px;
  color: #e4ece6;
  background: var(--term);
  font-family: var(--font-mono);
  font-size: 13.5px;
  line-height: 1.85;
}

.cmd-line {
  white-space: nowrap;
}

.cmd-out {
  color: #f0a1b8;
  white-space: pre;
  animation: out-in 0.4s ease both;
  animation-delay: calc(0.25s + var(--i) * 0.18s);
}

@keyframes out-in {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* File system tree */
.fs-tree {
  margin: 0;
  padding: 0;
  list-style: none;
}

.fs-row {
  display: grid;
  grid-template-columns: 34px 90px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  color: var(--ink-soft);
  font-size: 14px;
  transition: background 0.18s ease;
}

.fs-row:hover {
  background: var(--paper);
}

.fs-root {
  grid-template-columns: 124px minmax(0, 1fr);
  margin-bottom: 2px;
}

.fs-branch {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 13px;
}

.fs-row code {
  justify-self: start;
}

/* ------------------------------------------------------------------
   Fullscreen dialog
------------------------------------------------------------------- */
.fullscreen-pdf-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #dfe5e0;
}

.fullscreen-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 20px;
  border-bottom: 1px solid #d8dfd9;
  background: #fff;
}

.fullscreen-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #3d4a43;
}

.fullscreen-pdf-frame {
  width: 100%;
  flex: 1;
  border: 0;
  background: #dfe5e0;
}

/* ------------------------------------------------------------------
   Responsive
------------------------------------------------------------------- */
@media (max-width: 960px) {
  .linux-page {
    padding: 24px 18px 48px;
  }

  .linux-hero {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 36px 32px;
  }

  .terminal-window {
    width: min(100%, 440px);
    margin-right: 14px;
  }

  .overview-grid {
    grid-template-columns: 1fr;
  }

  .overview-item,
  .overview-item + .overview-item {
    padding: 18px 0;
    border-left: 0;
  }

  .overview-item + .overview-item {
    border-top: 1px solid var(--line);
  }

  .pdf-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .pdf-actions {
    width: 100%;
    justify-content: flex-start;
  }

  .two-col {
    grid-template-columns: 1fr;
  }

  .cmd-explorer {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .cmd-tabs {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (max-width: 620px) {
  .linux-page {
    padding: 14px 10px 36px;
  }

  .linux-hero {
    padding: 26px 20px;
    border-left-width: 3px;
  }

  .hero-copy h1 {
    margin-top: 18px;
    font-size: 32px;
    letter-spacing: -0.9px;
  }

  .hero-subtitle {
    font-size: 15px;
  }

  .terminal-content {
    min-height: 240px;
    padding: 18px 18px 22px;
    font-size: 13px;
  }

  .terminal-window {
    box-shadow:
      8px 8px 0 var(--leaf-tint),
      0 14px 30px rgba(15, 26, 21, 0.18);
  }

  .study-section {
    margin-top: 40px;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .pdf-toolbar {
    padding: 12px;
  }

  .pdf-actions {
    gap: 4px;
  }

  .toolbar-btn {
    padding: 0 8px;
  }

  .zoom-btn :deep(.q-btn__content) {
    gap: 3px;
  }

  .toolbar-separator {
    display: none;
  }

  .download-btn {
    padding: 0 12px;
  }

  .pdf-viewer-wrap {
    height: 68vh;
    min-height: 400px;
  }

  .pdf-footer {
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
    padding: 12px;
  }

  .study-note {
    padding: 16px;
  }

  .glance {
    margin-top: 52px;
  }

  .panel {
    padding: 22px 18px 24px;
  }

  .fs-row {
    grid-template-columns: 30px minmax(0, 1fr);
  }

  .fs-row code {
    grid-column: 2;
  }

  .fs-row > span:last-child {
    grid-column: 2;
  }

  .fs-root {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
