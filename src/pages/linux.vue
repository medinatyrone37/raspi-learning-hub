<template>
  <q-page ref="pageRoot" class="lx">
    <div class="shell">
      <!-- HERO: the working terminal is the centerpiece -->
      <section class="hero">
        <div class="hero-copy">
          <p class="crumb">
            <span class="pulse"></span>Linux Cybersecurity Learning Hub · Fundamentals
          </p>
          <h1>
            Learn Linux by <span class="type-line">{{ headline }}<i class="caret"></i></span>
          </h1>
          <p class="sub">
            Linux runs the servers, networks, and security tools you will defend. Read the
            presentation, practise real commands in the live terminal, and harden a server step by
            step.
          </p>
          <div class="stats">
            <div v-for="s in stats" :key="s.label">
              <b>{{ s.shown }}</b
              ><span>{{ s.label }}</span>
            </div>
          </div>
          <div class="cta">
            <a class="btn-main" href="#study" @click.prevent="go('study')">Open the presentation</a>
            <button class="btn-ghost" type="button" @click="runDemo" :disabled="demoing">
              <q-icon name="play_arrow" size="18px" />{{
                demoing ? 'Demo running…' : 'Watch a demo'
              }}
            </button>
          </div>
        </div>

        <div class="term" id="terminal" @click="focusInput">
          <div class="term-top">
            <span></span><span></span><span></span>
            <small>tj@raspi — interactive shell</small>
          </div>
          <div ref="termBody" class="term-body" aria-live="polite">
            <div v-for="(l, i) in lines" :key="i" :class="['ln', l.k]">
              <template v-if="l.k === 'cmd'"
                ><span class="ps">{{ l.p }}</span> {{ l.t }}</template
              >
              <template v-else>{{ l.t }}</template>
            </div>
            <label class="ln input-row">
              <span class="ps">{{ prompt }}</span>
              <input
                ref="inp"
                v-model="cmdText"
                spellcheck="false"
                autocomplete="off"
                autocapitalize="off"
                aria-label="Terminal command input"
                :disabled="demoing"
                @keydown.enter.prevent="submit"
                @keydown.up.prevent="hist(-1)"
                @keydown.down.prevent="hist(1)"
                @keydown.tab.prevent="complete"
              />
            </label>
          </div>
          <div class="chips">
            <button v-for="c in chips" :key="c" type="button" :disabled="demoing" @click="run(c)">
              {{ c }}
            </button>
          </div>
        </div>
      </section>

      <!-- LEARNING MODULES -->
      <section class="block">
        <header class="head">
          <h2>Server learning modules</h2>
          <p>
            Choose a module, read why it matters, then press “Run it” to try the command in the
            terminal above.
          </p>
        </header>
        <div class="mod-tabs" role="tablist">
          <button
            v-for="m in modules"
            :key="m.id"
            role="tab"
            type="button"
            :class="{ on: m.id === activeMod }"
            :aria-selected="m.id === activeMod"
            :style="{ '--c': m.color }"
            @click="activeMod = m.id"
          >
            <q-icon :name="m.icon" size="20px" />{{ m.title }}
          </button>
        </div>
        <div :key="mod.id" class="mod" :style="{ '--c': mod.color }">
          <div class="mod-intro">
            <h3>{{ mod.title }}</h3>
            <p>{{ mod.intro }}</p>
            <p class="why"><b>Why it matters.</b> {{ mod.why }}</p>
          </div>
          <div class="mod-topics">
            <article v-for="t in mod.topics" :key="t.name">
              <h4>{{ t.name }}</h4>
              <p>{{ t.text }}</p>
              <button v-if="t.cmd" class="run" type="button" @click="runIn(t.cmd)">
                <q-icon name="terminal" size="16px" /><code>{{ t.cmd }}</code
                ><em>Run it</em>
              </button>
              <span v-else class="tag">{{ t.tag }}</span>
            </article>
          </div>
        </div>
      </section>

      <!-- PDF -->
      <section id="study" class="block">
        <header class="head row">
          <div>
            <h2>Linux Operating System presentation</h2>
            <p>
              Read the supplied material here. Use the PDF’s own controls for page navigation and
              search.
            </p>
          </div>
          <span class="pill"><i class="dot"></i>PDF material</span>
        </header>
        <q-card flat class="pdf">
          <div class="pdf-bar">
            <div class="file">
              <div class="file-ic"><q-icon name="picture_as_pdf" size="22px" /></div>
              <div><strong>Linux Operating System</strong><span>PDF learning resource</span></div>
            </div>
            <div class="acts">
              <div class="zoom">
                <q-btn
                  flat
                  dense
                  no-caps
                  icon="remove"
                  label="Zoom out"
                  :disable="zoom <= 50"
                  @click="changeZoom(-10)"
                />
                <b>{{ zoom }}%</b>
                <q-btn
                  flat
                  dense
                  no-caps
                  icon="add"
                  label="Zoom in"
                  :disable="zoom >= 150"
                  @click="changeZoom(10)"
                />
              </div>
              <q-btn flat no-caps icon="open_in_new" label="Open PDF" @click="openPdf" />
              <q-btn
                unelevated
                no-caps
                icon="download"
                label="Download"
                class="dl"
                @click="downloadPdf"
              />
              <q-btn
                flat
                round
                dense
                icon="fullscreen"
                aria-label="Open PDF viewer in fullscreen"
                @click="isFullscreen = true"
              />
            </div>
          </div>
          <div class="pdf-wrap">
            <iframe
              :key="`linux-pdf-${zoom}`"
              :src="viewerUrl"
              title="Linux Operating System PDF"
              loading="lazy"
            ></iframe>
          </div>
        </q-card>
        <p class="tip">
          <q-icon name="edit_note" size="20px" />Study tip: write down every unfamiliar term or
          command, then look it up in the terminal with <code>help</code> or <code>cat</code>.
        </p>
      </section>

      <!-- CONCEPTS -->
      <section class="block">
        <header class="head">
          <h2>Core concepts</h2>
          <p>Short explainers that connect directly to the presentation.</p>
        </header>
        <div class="grid2">
          <div class="panel">
            <h3>Key vocabulary</h3>
            <dl>
              <div v-for="g in glossary" :key="g.name">
                <dt>{{ g.name }}</dt>
                <dd>{{ g.text }}</dd>
              </div>
            </dl>
          </div>
          <div class="panel">
            <h3>What happens when you press Enter</h3>
            <p class="lead">Click a layer to follow your command down to the hardware.</p>
            <ul class="layers">
              <li v-for="(l, i) in layers" :key="l.name">
                <button
                  type="button"
                  :class="{ lit: i <= litLayer, core: l.core }"
                  @click="lightUp(i)"
                >
                  <q-icon :name="l.icon" size="22px" />
                  <span
                    ><strong>{{ l.name }}</strong
                    >{{ l.text }}</span
                  >
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="grid2">
          <div class="panel">
            <h3>Permission calculator</h3>
            <p class="lead">
              Tick the boxes and watch the <code>chmod</code> number and the
              <code>ls -l</code> string update.
            </p>
            <table class="perm">
              <thead>
                <tr>
                  <th></th>
                  <th>Read (4)</th>
                  <th>Write (2)</th>
                  <th>Execute (1)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(who, r) in ['Owner', 'Group', 'Others']" :key="who">
                  <th>{{ who }}</th>
                  <td v-for="c in 3" :key="c">
                    <input
                      type="checkbox"
                      v-model="perm[r][c - 1]"
                      :aria-label="`${who} ${['read', 'write', 'execute'][c - 1]}`"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="perm-out">
              <code>chmod {{ permNum }} file.sh</code>
              <code class="sym">-{{ permSym }}</code>
            </div>
            <p class="note">{{ permNote }}</p>
          </div>

          <div class="panel">
            <h3>Hardening checklist</h3>
            <div class="prog">
              <div class="ring" :style="{ '--p': pct }">
                <b>{{ pct }}%</b>
              </div>
              <p>
                {{ doneCount }} of {{ checks.length }} steps done. Tick each one as you learn it.
              </p>
            </div>
            <ul class="checks">
              <li v-for="c in checks" :key="c.text">
                <label>
                  <input type="checkbox" v-model="c.done" /><span class="box"></span>
                  <span
                    ><strong>{{ c.text }}</strong
                    ><small>{{ c.hint }}</small></span
                  >
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="grid2">
          <div class="panel">
            <h3>A short history</h3>
            <ol class="timeline">
              <li v-for="e in timeline" :key="e.year">
                <b>{{ e.year }}</b>
                <p>{{ e.text }}</p>
              </li>
            </ol>
          </div>
          <div class="panel">
            <h3>Where Linux runs</h3>
            <ul class="runs">
              <li v-for="p in places" :key="p.title">
                <div class="ic"><q-icon :name="p.icon" size="20px" /></div>
                <div>
                  <strong>{{ p.title }}</strong
                  ><span>{{ p.text }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="panel wide">
          <h3>Popular distributions</h3>
          <p class="lead">
            A distribution bundles the Linux kernel with tools and software into a complete system.
          </p>
          <div class="scroll">
            <table class="distro">
              <thead>
                <tr>
                  <th>Distribution</th>
                  <th>Best for</th>
                  <th>Package tool</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="d in distros" :key="d.name">
                  <th>{{ d.name }}</th>
                  <td>{{ d.known }}</td>
                  <td>
                    <code>{{ d.tool }}</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel wide">
          <h3>The file system tree</h3>
          <p class="lead">
            Everything starts at <code>/</code>. Select a folder to read what lives there and jump
            into it.
          </p>
          <div class="fs">
            <ul>
              <li v-for="f in folders" :key="f.path">
                <button
                  type="button"
                  :class="{ on: f.path === activeDir }"
                  @click="activeDir = f.path"
                >
                  <code>{{ f.path }}</code>
                </button>
              </li>
            </ul>
            <div :key="activeDir" class="fs-detail">
              <h4>{{ curDir.path }}</h4>
              <p>{{ curDir.text }}</p>
              <button class="run" type="button" @click="runIn(`ls ${curDir.path}`)">
                <q-icon name="terminal" size="16px" /><code>ls {{ curDir.path }}</code
                ><em>Run it</em>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    <q-dialog v-model="isFullscreen" maximized transition-show="fade" transition-hide="fade">
      <q-card class="fs-card">
        <div class="fs-bar">
          <div class="file">
            <div class="file-ic"><q-icon name="picture_as_pdf" size="22px" /></div>
            <div><strong>Linux Operating System</strong><span>Focused reading mode</span></div>
          </div>
          <div>
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
          class="fs-frame"
          :src="viewerUrl"
          title="Linux Operating System PDF fullscreen viewer"
        ></iframe>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

/* ---------------- PDF viewer (unchanged behaviour) ---------------- */
const PDF_URL = '/learning/linux-operating-system.pdf'
const zoom = ref(100)
const isFullscreen = ref(false)
const viewerUrl = computed(() => `${PDF_URL}#toolbar=1&navpanes=1&view=FitH&zoom=${zoom.value}`)
const changeZoom = (n) => (zoom.value = Math.min(150, Math.max(50, zoom.value + n)))
const openPdf = () => window.open(PDF_URL, '_blank', 'noopener,noreferrer')
function downloadPdf() {
  const a = document.createElement('a')
  a.href = PDF_URL
  a.download = 'linux-operating-system.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
const go = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/* ---------------- Virtual file system ---------------- */
const F = (f) => ({ f })
const D = (c) => ({ c })
const root = D({
  home: D({
    tj: D({
      'notes.txt': F(
        'Kernel = the core of the system\nShell = where I type commands\nSSH keys beat passwords',
      ),
      'script.sh': F('#!/bin/bash\necho "Hello, Linux"'),
      lessons: D({
        'week1.md': F('# Week 1\nFiles, users, permissions'),
        'week2.md': F('# Week 2\nServices and logs'),
      }),
    }),
  }),
  etc: D({
    hostname: F('raspi'),
    'os-release': F('PRETTY_NAME="Raspberry Pi OS"\nID=debian'),
    ssh: D({ sshd_config: F('PermitRootLogin no\nPasswordAuthentication no') }),
  }),
  var: D({
    log: D({
      'auth.log': F(
        'sshd: Accepted publickey for tj\nsshd: Failed password for root\nsudo: tj : COMMAND=apt update',
      ),
    }),
  }),
  tmp: D({}),
})
const HOME = ['home', 'tj']
const cwd = ref([...HOME])
const lines = ref([
  { k: 'out', t: 'Welcome to the Linux Cybersecurity Learning Hub. Type "help" to begin.' },
])
const cmdText = ref('')
const history = []
let hIdx = 0
const termBody = ref(null)
const inp = ref(null)
const demoing = ref(false)
const chips = [
  'help',
  'ls -l',
  'cat notes.txt',
  'systemctl status nginx',
  'sudo ufw status',
  'tour',
]

const walk = (arr) => arr.reduce((n, p) => (n && n.c && n.c[p] ? n.c[p] : null), root)
function resolve(p = '') {
  let parts = p.startsWith('/') ? [] : [...cwd.value]
  if (p.startsWith('~')) {
    parts = [...HOME]
    p = p.slice(1)
  }
  for (const s of p.split('/').filter(Boolean)) {
    if (s === '..') parts.pop()
    else if (s !== '.') parts.push(s)
  }
  return parts
}
const pathStr = (a) => '/' + a.join('/')
const prompt = computed(() => {
  const s = pathStr(cwd.value)
  const sh = s === '/home/tj' ? '~' : s.startsWith('/home/tj/') ? '~' + s.slice(8) : s
  return `tj@raspi:${sh}$`
})

const out = (...t) => t.forEach((x) => lines.value.push({ k: 'out', t: x }))
const err = (t) => lines.value.push({ k: 'err', t })
const SERVICES = {
  nginx: [
    '● nginx.service - A high performance web server',
    '   Active: active (running) since Sun 09:12',
    '   Main PID: 612 (nginx)',
  ],
  mysql: [
    '● mysql.service - MySQL Community Server',
    '   Active: active (running) since Sun 09:12',
    '   Main PID: 744 (mysqld)',
  ],
  squid: [
    '● squid.service - Squid Web Proxy Server',
    '   Active: inactive (dead)',
    '   Tip: start it with "sudo systemctl start squid"',
  ],
  ssh: [
    '● ssh.service - OpenBSD Secure Shell server',
    '   Active: active (running) since Sun 09:11',
    '   Listening on 0.0.0.0:22',
  ],
}
const COMMANDS = {
  help: () =>
    out(
      'Try: ls [-l] [-a], cd, pwd, cat, mkdir, touch, echo, grep, chmod, whoami, uname, date,',
      'ps, free, df, ping, systemctl status <svc>, ufw status, journalctl, sftp, apt, history, tour, clear',
    ),
  pwd: () => out(pathStr(cwd.value)),
  whoami: () => out('tj'),
  date: () => out(new Date().toString()),
  uname: (a) =>
    out(a[0] === '-a' ? 'Linux raspi 6.6.31+rpt-rpi-v8 #1 SMP PREEMPT aarch64 GNU/Linux' : 'Linux'),
  echo: (a) => out(a.join(' ').replace(/^["']|["']$/g, '')),
  clear: () => (lines.value = []),
  history: () => history.forEach((h, i) => out(`${String(i + 1).padStart(3)}  ${h}`)),
  ls(a) {
    const flags = a.filter((x) => x.startsWith('-')).join('')
    const target = a.find((x) => !x.startsWith('-'))
    const n = walk(resolve(target))
    if (!n) return err(`ls: cannot access '${target}': No such file or directory`)
    if (!n.c) return out(target)
    const names = Object.keys(n.c)
      .sort()
      .filter((x) => flags.includes('a') || !x.startsWith('.'))
    if (flags.includes('a')) names.unshift('.', '..')
    if (!flags.includes('l'))
      return out(names.map((x) => (n.c[x]?.c ? x + '/' : x)).join('  ') || '(empty folder)')
    names.forEach((x) => {
      const d = n.c[x]?.c || x.startsWith('.')
      out(
        `${d ? 'drwxr-xr-x' : x.endsWith('.sh') ? '-rwxr-xr-x' : '-rw-r--r--'} 1 tj tj ${String(d ? 4096 : (n.c[x].f || '').length).padStart(5)} ${x}`,
      )
    })
  },
  cd(a) {
    const p = resolve(a[0] ?? '~')
    const n = walk(p)
    if (!n) return err(`cd: ${a[0]}: No such file or directory`)
    if (!n.c) return err(`cd: ${a[0]}: Not a directory`)
    cwd.value = p
  },
  cat(a) {
    const n = walk(resolve(a[0]))
    if (!a[0]) return err('cat: missing file name')
    if (!n) return err(`cat: ${a[0]}: No such file or directory`)
    if (n.c) return err(`cat: ${a[0]}: Is a directory`)
    out(...n.f.split('\n'))
  },
  mkdir(a) {
    const p = resolve(a[0] || ''),
      name = p.pop(),
      par = walk(p)
    if (!name || !par?.c) return err('mkdir: cannot create directory')
    if (par.c[name]) return err(`mkdir: cannot create directory '${a[0]}': File exists`)
    par.c[name] = D({})
  },
  touch(a) {
    const p = resolve(a[0] || ''),
      name = p.pop(),
      par = walk(p)
    if (!name || !par?.c) return err('touch: cannot touch file')
    if (!par.c[name]) par.c[name] = F('')
  },
  grep(a) {
    const n = walk(resolve(a[1]))
    if (!a[1]) return err('usage: grep PATTERN FILE')
    if (!n?.f && n?.f !== '') return err(`grep: ${a[1]}: No such file`)
    const hit = n.f.split('\n').filter((l) => l.toLowerCase().includes(a[0].toLowerCase()))
    hit.length ? out(...hit) : out('(no matches)')
  },
  chmod(a) {
    const n = walk(resolve(a[1]))
    if (!a[1]) return err('usage: chmod MODE FILE')
    if (!n) return err(`chmod: cannot access '${a[1]}': No such file or directory`)
  },
  ps: () =>
    out(
      '  PID TTY      TIME CMD',
      '    1 ?    00:00:02 systemd',
      '  612 ?    00:00:00 nginx',
      '  744 ?    00:00:11 mysqld',
      ' 1203 pts/0 00:00:00 bash',
    ),
  free: () =>
    out(
      '               total   used   free',
      'Mem:           3.8Gi  612Mi  2.9Gi',
      'Swap:          1.0Gi     0B  1.0Gi',
    ),
  df: () =>
    out('Filesystem  Size  Used Avail Use% Mounted on', '/dev/root    29G  6.1G   22G  22% /'),
  ping: (a) =>
    out(
      `PING ${a[0] || 'localhost'}: 56 data bytes`,
      '64 bytes: icmp_seq=1 ttl=64 time=0.41 ms',
      '64 bytes: icmp_seq=2 ttl=64 time=0.38 ms',
      '2 packets transmitted, 2 received, 0% packet loss',
    ),
  systemctl(a) {
    const s = SERVICES[a[1]]
    if (a[0] !== 'status') return out('Only "systemctl status <service>" is simulated here.')
    s ? out(...s) : err(`Unit ${a[1] || ''}.service could not be found.`)
  },
  ufw: () =>
    out(
      'Status: active',
      'To           Action  From',
      '22/tcp       ALLOW   Anywhere',
      '80/tcp       ALLOW   Anywhere',
      '443/tcp      ALLOW   Anywhere',
    ),
  sshd: (a) => (a[0] === '-t' ? null : out('usage: sshd -t')),
  sftp: (a) =>
    out(
      `Connecting to ${a[0] || 'server-ip'}…`,
      'Encrypted session established.',
      'sftp> (type "bye" to leave)',
    ),
  journalctl: () =>
    out(
      'Oct 25 09:14 raspi sshd[1198]: Failed password for root from 10.0.0.9',
      'Oct 25 09:15 raspi sshd[1201]: Accepted publickey for tj',
      'Oct 25 09:20 raspi nginx[612]: worker process warning: open file limit',
    ),
  apt: (a) =>
    out(
      a[0] === 'update'
        ? 'Reading package lists... Done'
        : a[0] === 'upgrade'
          ? '0 upgraded, 0 newly installed. System is up to date.'
          : 'apt: try "apt update" or "apt upgrade"',
    ),
  tour: () =>
    out(
      '1) ls -l          see files and permissions',
      '2) cat notes.txt   read a file',
      '3) grep SSH notes.txt   search inside it',
      '4) cd /var/log && cat auth.log   find failed logins',
      '5) systemctl status ssh   check a service',
    ),
}

function exec(raw) {
  for (const seg of raw.split('&&')) {
    const parts = seg.trim().split(/\s+/).filter(Boolean)
    if (parts[0] === 'sudo') parts.shift()
    if (!parts.length) continue
    const fn = COMMANDS[parts[0]]
    fn ? fn(parts.slice(1)) : err(`${parts[0]}: command not found. Type "help" for a list.`)
  }
}
async function scrollEnd() {
  await nextTick()
  if (termBody.value) termBody.value.scrollTop = termBody.value.scrollHeight
}
function run(raw) {
  const t = raw.trim()
  if (!t) return
  lines.value.push({ k: 'cmd', p: prompt.value, t })
  history.push(t)
  hIdx = history.length
  exec(t)
  cmdText.value = ''
  scrollEnd()
}
const submit = () => run(cmdText.value)
function hist(d) {
  hIdx = Math.min(history.length, Math.max(0, hIdx + d))
  cmdText.value = history[hIdx] || ''
}
function complete() {
  const w = cmdText.value.split(/\s+/)
  const last = w[w.length - 1]
  const pool = w.length === 1 ? Object.keys(COMMANDS) : Object.keys(walk(cwd.value)?.c || {})
  const m = pool.filter((x) => x.startsWith(last))
  if (m.length === 1) {
    w[w.length - 1] = m[0]
    cmdText.value = w.join(' ')
  }
}
const focusInput = () => inp.value?.focus()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
async function typeRun(cmd) {
  cmdText.value = ''
  for (const ch of cmd) {
    if (!alive) return
    cmdText.value += ch
    await sleep(55)
  }
  await sleep(250)
  run(cmd)
  await sleep(700)
}
async function runDemo() {
  demoing.value = true
  go('terminal')
  for (const c of [
    'whoami',
    'ls -l',
    'cat notes.txt',
    'grep ssh notes.txt',
    'systemctl status nginx',
  ])
    await typeRun(c)
  demoing.value = false
}
async function runIn(cmd) {
  go('terminal')
  await sleep(450)
  if (!demoing.value) {
    demoing.value = true
    await typeRun(cmd)
    demoing.value = false
  }
}

/* ---------------- Page content ---------------- */
const modules = [
  {
    id: 'services',
    title: 'Server services',
    icon: 'dns',
    color: '#5ad1ff',
    intro:
      'A server is a Linux machine that offers services to other computers. Each service listens on a network port and is managed by systemd.',
    why: 'Every running service is also a possible entry point. Knowing what runs, and why, is the first step of defending a server.',
    topics: [
      {
        name: 'Web server: Nginx',
        text: 'Serves website files and forwards application requests to a backend service.',
        cmd: 'systemctl status nginx',
      },
      {
        name: 'Secure file transfer',
        text: 'SFTP moves files over an encrypted channel. Prefer it to plain FTP, which sends passwords in clear text.',
        cmd: 'sftp username@server-ip',
      },
      {
        name: 'Database server: MySQL',
        text: 'Stores structured application data and controls who may read or change it.',
        cmd: 'systemctl status mysql',
      },
      {
        name: 'Proxy server: Squid',
        text: 'Sits between clients and the web to apply access policies and cache content.',
        cmd: 'systemctl status squid',
      },
    ],
  },
  {
    id: 'hardening',
    title: 'Server hardening',
    icon: 'shield',
    color: '#ff6b81',
    intro:
      'Hardening means removing everything an attacker could use: old software, extra accounts, open ports, and weak permissions.',
    why: 'Most real breaches use known weaknesses that were never fixed. Small habits close most of them.',
    topics: [
      {
        name: 'Updates and least privilege',
        text: 'Install security patches and give each user only the access their job needs.',
        cmd: 'sudo apt update && sudo apt upgrade',
      },
      {
        name: 'Users, groups and permissions',
        text: 'Ownership and permission bits decide who can read, write, or run each file.',
        cmd: 'ls -l /etc',
      },
      {
        name: 'SSH access security',
        text: 'Use keys instead of passwords, restrict who can log in, and block direct root login.',
        cmd: 'sudo sshd -t',
      },
      {
        name: 'Firewall and AppArmor',
        text: 'Allow only the traffic you need, and confine each application with mandatory access control.',
        cmd: 'sudo ufw status verbose',
      },
    ],
  },
  {
    id: 'monitoring',
    title: 'Monitoring tools',
    icon: 'monitor_heart',
    color: '#ffb347',
    intro:
      'Monitoring turns logs and network traffic into alerts, so you notice trouble before users do.',
    why: 'You cannot respond to what you cannot see. Good visibility shortens the time between an attack and your reaction.',
    topics: [
      {
        name: 'Wazuh',
        text: 'Collects logs from endpoints, checks configurations, and raises alerts on suspicious events.',
        tag: 'Security monitoring platform',
      },
      {
        name: 'Security Onion',
        text: 'Bundles network visibility, threat hunting, and investigation tools for defenders.',
        tag: 'Network security monitoring',
      },
      {
        name: 'Suricata',
        text: 'Inspects network traffic against detection rules and can alert or block matches.',
        tag: 'IDS / IPS engine',
      },
      {
        name: 'Built-in logs',
        text: 'journalctl shows warnings and errors from every service on the machine.',
        cmd: 'journalctl -p warning -b',
      },
    ],
  },
]
const activeMod = ref('services')
const mod = computed(() => modules.find((m) => m.id === activeMod.value))

const glossary = [
  {
    name: 'Kernel',
    text: 'The core of the system. It controls the processor, memory, and devices.',
  },
  { name: 'Shell', text: 'The program that reads the commands you type. Bash is the most common.' },
  {
    name: 'Distribution',
    text: 'A complete Linux system: the kernel plus tools, software, and an installer.',
  },
  { name: 'Package manager', text: 'Installs, updates, and removes software for you.' },
  {
    name: 'Open source',
    text: 'The code is public, so anyone can read it, change it, and share it.',
  },
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
const litLayer = ref(-1)
async function lightUp(i) {
  litLayer.value = -1
  for (let k = 0; k <= i; k++) {
    litLayer.value = k
    await sleep(300)
  }
}
const timeline = [
  { year: '1991', text: 'Linus Torvalds, a student in Finland, announces a free kernel.' },
  { year: '1993', text: 'The Debian project begins and becomes the base for many distributions.' },
  { year: '2004', text: 'Ubuntu releases its first version, aimed at everyday users.' },
  { year: '2008', text: 'The first Android phone ships, built on the Linux kernel.' },
  { year: '2012', text: 'Raspberry Pi launches, and Linux becomes its main system.' },
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
    title: 'Security labs',
    text: 'Defenders and testers rely on Linux tools every day.',
    icon: 'security',
  },
]
const distros = [
  { name: 'Debian', known: 'Very stable. The base for many other distributions.', tool: 'apt' },
  { name: 'Ubuntu', known: 'Beginner friendly with a large community.', tool: 'apt' },
  { name: 'Raspberry Pi OS', known: 'Made for Raspberry Pi boards, based on Debian.', tool: 'apt' },
  { name: 'Fedora', known: 'Newer software and strong developer tools.', tool: 'dnf' },
  {
    name: 'Arch Linux',
    known: 'Minimal and fully customizable. For experienced users.',
    tool: 'pacman',
  },
]
const folders = [
  { path: '/home', text: 'Personal folders for each user, such as /home/tj.' },
  { path: '/etc', text: 'System-wide configuration files, including SSH settings.' },
  { path: '/var', text: 'Data that keeps changing, such as logs in /var/log.' },
  { path: '/tmp', text: 'Temporary files that are cleared on restart.' },
]
const activeDir = ref('/etc')
const curDir = computed(() => folders.find((f) => f.path === activeDir.value))

/* Permission calculator */
const perm = reactive([
  [true, true, false],
  [true, false, false],
  [true, false, false],
])
const permNum = computed(() =>
  perm.map((r) => r.reduce((s, v, i) => s + (v ? [4, 2, 1][i] : 0), 0)).join(''),
)
const permSym = computed(() =>
  perm.map((r) => r.map((v, i) => (v ? 'rwx'[i] : '-')).join('')).join(''),
)
const permNote = computed(() => {
  if (perm[2][1])
    return 'Warning: anyone on the system can change this file. Avoid world-writable files.'
  if (permNum.value === '777') return 'Warning: everyone can do everything.'
  if (permNum.value === '600') return 'Private to the owner. A good choice for SSH private keys.'
  return 'Good practice: grant only the access each person truly needs.'
})

/* Checklist */
const checks = reactive([
  { text: 'Install security updates', hint: 'sudo apt update && sudo apt upgrade', done: false },
  { text: 'Review users and groups', hint: 'Remove accounts nobody uses', done: false },
  { text: 'Lock down file permissions', hint: 'Private keys should be chmod 600', done: false },
  { text: 'Use SSH keys, disable root login', hint: 'PermitRootLogin no', done: false },
  { text: 'Enable the firewall', hint: 'sudo ufw enable', done: false },
  { text: 'Watch the logs', hint: 'journalctl -p warning -b', done: false },
])
const doneCount = computed(() => checks.filter((c) => c.done).length)
const pct = computed(() => Math.round((doneCount.value / checks.length) * 100))

/* Hero: rotating headline + counters */
const WORDS = ['typing commands', 'securing servers', 'reading logs', 'breaking things safely']
const headline = ref('')
const stats = reactive([
  { label: 'Study modules', to: modules.length, shown: 0 },
  { label: 'Live commands', to: Object.keys(COMMANDS).length, shown: 0 },
  { label: 'Hardening steps', to: checks.length, shown: 0 },
  { label: 'Distros compared', to: distros.length, shown: 0 },
])
let alive = true
async function loopHeadline() {
  let w = 0
  while (alive) {
    const word = WORDS[w++ % WORDS.length]
    for (let i = 1; i <= word.length && alive; i++) {
      headline.value = word.slice(0, i)
      await sleep(70)
    }
    await sleep(1700)
    for (let i = word.length; i >= 0 && alive; i--) {
      headline.value = word.slice(0, i)
      await sleep(35)
    }
    await sleep(250)
  }
}
async function countUp() {
  for (let step = 1; step <= 20; step++) {
    stats.forEach((s) => (s.shown = Math.round((s.to * step) / 20)))
    await sleep(40)
  }
}

const pageRoot = ref(null)
onMounted(() => {
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    headline.value = WORDS[0]
    stats.forEach((s) => (s.shown = s.to))
    return
  }
  loopHeadline()
  countUp()
  setTimeout(() => !history.length && alive && !demoing.value && COMMANDS.tour && run('tour'), 1400)
})
onBeforeUnmount(() => {
  alive = false
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

.lx {
  --ink: #0a0f1f;
  --panel: #111936;
  --panel2: #0d1430;
  --line: #222d57;
  --text: #e8ecf8;
  --mute: #94a0c4;
  --amber: #ffb347;
  --cyan: #5ad1ff;
  --coral: #ff6b81;
  --head: 'Chakra Petch', 'Segoe UI', sans-serif;
  --body: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
  --mono: 'JetBrains Mono', Consolas, 'Courier New', monospace;
  min-height: 100%;
  padding: 32px 24px 80px;
  color: var(--text);
  font-family: var(--body);
  background:
    radial-gradient(900px 500px at 85% -5%, rgba(90, 209, 255, 0.14), transparent 60%),
    radial-gradient(700px 400px at 0% 20%, rgba(255, 179, 71, 0.08), transparent 60%),
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px) 0 0 / 100% 36px,
    var(--ink);
}
.shell {
  width: min(1180px, 100%);
  margin: 0 auto;
}
h1,
h2,
h3,
h4 {
  font-family: var(--head);
  margin: 0;
}
code {
  font-family: var(--mono);
}
button {
  font-family: inherit;
}
:focus-visible {
  outline: 3px solid rgba(255, 179, 71, 0.6);
  outline-offset: 2px;
}

/* Hero */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
  gap: 44px;
  align-items: center;
  padding: 28px 0 24px;
}
.crumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: var(--mute);
  font-size: 13px;
}
.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--amber);
  animation: pulse 2.2s ease-out infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 179, 71, 0.55);
  }
  80%,
  100% {
    box-shadow: 0 0 0 10px rgba(255, 179, 71, 0);
  }
}
h1 {
  margin-top: 20px;
  font-size: clamp(34px, 4.4vw, 56px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.5px;
}
.type-line {
  display: block;
  min-height: 1.15em;
  color: var(--amber);
}
.caret {
  display: inline-block;
  width: 4px;
  height: 0.9em;
  margin-left: 4px;
  vertical-align: -0.1em;
  background: var(--amber);
  animation: blink 1s steps(2, start) infinite;
}
@keyframes blink {
  to {
    visibility: hidden;
  }
}
.sub {
  max-width: 520px;
  margin: 18px 0 0;
  color: #c3cbe4;
  font-size: 16px;
  line-height: 1.7;
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 26px;
  margin-top: 28px;
}
.stats b {
  display: block;
  font: 700 30px var(--head);
  color: var(--cyan);
}
.stats span {
  color: var(--mute);
  font-size: 13px;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}
.btn-main,
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 0.15s,
    background 0.15s,
    border-color 0.15s;
}
.btn-main {
  color: #1a1205;
  background: var(--amber);
  border: 1px solid var(--amber);
}
.btn-main:hover {
  transform: translateY(-2px);
  background: #ffc16b;
}
.btn-ghost {
  color: var(--text);
  background: transparent;
  border: 1px solid var(--line);
}
.btn-ghost:hover:not(:disabled) {
  border-color: var(--cyan);
}
.btn-ghost:disabled {
  opacity: 0.6;
  cursor: progress;
}

/* Terminal */
.term {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #070b17;
  box-shadow:
    0 0 0 6px rgba(255, 179, 71, 0.06),
    0 30px 60px rgba(0, 0, 0, 0.45);
  cursor: text;
}
.term-top {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 40px;
  padding: 0 14px;
  background: #0f1630;
  border-bottom: 1px solid var(--line);
}
.term-top span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--coral);
}
.term-top span:nth-child(2) {
  background: var(--amber);
}
.term-top span:nth-child(3) {
  background: #62d68c;
}
.term-top small {
  margin-left: auto;
  color: var(--mute);
  font: 12px var(--mono);
}
.term-body {
  height: 340px;
  overflow-y: auto;
  padding: 16px 18px;
  font: 13px/1.7 var(--mono);
  color: var(--amber);
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}
.ln {
  white-space: pre-wrap;
  word-break: break-word;
  animation: ln-in 0.18s ease both;
}
@keyframes ln-in {
  from {
    opacity: 0;
    transform: translateX(-4px);
  }
}
.ln.cmd {
  color: #fff;
}
.ln.err {
  color: var(--coral);
}
.ln.out {
  color: #ffd9a0;
}
.ps {
  color: var(--cyan);
}
.input-row {
  display: flex;
  gap: 8px;
  color: #fff;
}
.input-row input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: 0;
  color: #fff;
  background: transparent;
  caret-color: var(--amber);
  font: inherit;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 14px 12px;
  border-top: 1px solid var(--line);
  background: #0b1126;
}
.chips button {
  padding: 5px 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  color: var(--mute);
  background: transparent;
  font: 12px var(--mono);
  cursor: pointer;
  transition: all 0.15s;
}
.chips button:hover:not(:disabled) {
  color: var(--amber);
  border-color: var(--amber);
  transform: translateY(-1px);
}

/* Blocks */
.block {
  margin-top: 64px;
  scroll-margin-top: 20px;
}
.head {
  margin-bottom: 22px;
}
.head.row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}
.head h2 {
  font-size: clamp(24px, 2.8vw, 34px);
  font-weight: 700;
  letter-spacing: -0.3px;
}
.head p {
  max-width: 620px;
  margin: 8px 0 0;
  color: var(--mute);
  font-size: 14px;
  line-height: 1.7;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--mute);
  font-size: 13px;
  white-space: nowrap;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #62d68c;
}

/* Modules */
.mod-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.mod-tabs button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--mute);
  background: var(--panel2);
  font: 600 14px var(--head);
  cursor: pointer;
  transition: all 0.2s;
}
.mod-tabs button:hover {
  color: var(--text);
}
.mod-tabs button.on {
  color: var(--c);
  border-color: var(--c);
  background: color-mix(in srgb, var(--c) 12%, var(--panel2));
}
.mod {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr);
  gap: 28px;
  padding: 28px;
  border: 1px solid var(--line);
  border-top: 3px solid var(--c);
  border-radius: 12px;
  background: var(--panel);
  animation: swap 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
@keyframes swap {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}
.mod-intro h3 {
  margin-bottom: 10px;
  color: var(--c);
  font-size: 22px;
}
.mod-intro p {
  margin: 0 0 14px;
  color: #c3cbe4;
  font-size: 14px;
  line-height: 1.75;
}
.why {
  padding-left: 14px;
  border-left: 2px solid var(--c);
  color: var(--text) !important;
}
.mod-topics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}
.mod-topics article {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel2);
  transition:
    border-color 0.2s,
    transform 0.2s;
}
.mod-topics article:hover {
  border-color: var(--c);
  transform: translateY(-3px);
}
.mod-topics h4 {
  margin-bottom: 6px;
  font-size: 15px;
}
.mod-topics p {
  margin: 0 0 12px;
  color: var(--mute);
  font-size: 13px;
  line-height: 1.65;
}
.run {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border: 1px dashed var(--line);
  border-radius: 8px;
  color: var(--amber);
  background: #070b17;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}
.run code {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 11.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.run em {
  color: var(--mute);
  font-size: 11px;
  font-style: normal;
}
.run:hover {
  border-style: solid;
  border-color: var(--amber);
}
.run:hover em {
  color: var(--amber);
}
.tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  color: #ffd9a0;
  background: rgba(255, 179, 71, 0.12);
  font-size: 12px;
  font-weight: 600;
}

/* PDF */
.pdf {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel);
  color: var(--text);
}
.pdf-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
}
.file {
  display: flex;
  align-items: center;
  gap: 12px;
}
.file strong {
  display: block;
  font-size: 15px;
}
.file span {
  color: var(--mute);
  font-size: 13px;
}
.file-ic {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border-radius: 10px;
  color: var(--coral);
  background: rgba(255, 107, 129, 0.12);
}
.acts {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  color: var(--text);
}
.zoom {
  display: inline-flex;
  align-items: center;
  padding: 2px;
  border: 1px solid var(--line);
  border-radius: 10px;
}
.zoom b {
  min-width: 46px;
  text-align: center;
  font: 600 13px var(--mono);
}
.dl {
  color: #1a1205;
  background: var(--amber);
  font-weight: 600;
}
.pdf-wrap {
  height: min(80vh, 900px);
  min-height: 480px;
  background: #1a2140;
}
.pdf-wrap iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.tip {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 16px 0 0;
  padding: 14px 18px;
  border: 1px solid var(--line);
  border-left: 3px solid var(--cyan);
  border-radius: 8px;
  color: #c3cbe4;
  background: var(--panel2);
  font-size: 14px;
}
.tip .q-icon {
  color: var(--cyan);
}
.tip code,
.lead code,
.panel code {
  padding: 1px 6px;
  border-radius: 4px;
  color: var(--amber);
  background: rgba(255, 179, 71, 0.1);
  font-size: 12.5px;
}

/* Panels */
.grid2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 18px;
}
.panel {
  min-width: 0;
  padding: 26px 28px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel);
}
.panel.wide {
  margin-bottom: 18px;
}
.panel h3 {
  margin-bottom: 8px;
  font-size: 20px;
}
.lead {
  margin: 0 0 18px;
  color: var(--mute);
  font-size: 14px;
  line-height: 1.7;
}
dl {
  margin: 14px 0 0;
}
dl > div {
  padding: 12px 0;
  border-top: 1px solid var(--line);
}
dt {
  font-weight: 600;
  color: var(--cyan);
  font-size: 14px;
}
dd {
  margin: 3px 0 0;
  color: var(--mute);
  font-size: 14px;
  line-height: 1.6;
}

.layers {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.layers li {
  position: relative;
}
.layers li:not(:last-child)::after {
  content: '↓';
  position: absolute;
  left: 50%;
  bottom: -16px;
  color: var(--mute);
  transform: translateX(-50%);
}
.layers button {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--mute);
  background: var(--panel2);
  text-align: left;
  cursor: pointer;
  transition: all 0.25s;
}
.layers button span {
  font-size: 13px;
}
.layers strong {
  display: block;
  color: var(--text);
  font-size: 14px;
}
.layers button.lit {
  color: #ffd9a0;
  border-color: var(--amber);
  background: rgba(255, 179, 71, 0.1);
  box-shadow: 0 0 18px rgba(255, 179, 71, 0.2);
  transform: translateX(6px);
}
.layers button.core:not(.lit) {
  border-color: #3a4780;
}

.perm {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: center;
}
.perm th,
.perm td {
  padding: 9px 6px;
  border-bottom: 1px solid var(--line);
}
.perm thead th {
  color: var(--mute);
  font-weight: 500;
}
.perm tbody th {
  text-align: left;
  font-weight: 600;
}
.perm input,
.checks input {
  width: 18px;
  height: 18px;
  accent-color: var(--amber);
  cursor: pointer;
}
.perm-out {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
}
.perm-out code {
  padding: 8px 12px !important;
  border-radius: 8px !important;
  font-size: 15px !important;
  transition: color 0.2s;
}
.perm-out .sym {
  color: var(--cyan) !important;
  background: rgba(90, 209, 255, 0.1) !important;
  letter-spacing: 1px;
}
.note {
  margin: 12px 0 0;
  color: var(--mute);
  font-size: 13px;
}

.prog {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 6px 0 12px;
}
.prog p {
  margin: 0;
  color: var(--mute);
  font-size: 13px;
}
.ring {
  display: grid;
  width: 70px;
  height: 70px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: conic-gradient(var(--amber) calc(var(--p) * 1%), var(--line) 0);
  transition: background 0.4s;
  position: relative;
}
.ring::before {
  content: '';
  position: absolute;
  inset: 7px;
  border-radius: 50%;
  background: var(--panel);
}
.ring b {
  position: relative;
  font: 700 15px var(--head);
}
.checks {
  margin: 0;
  padding: 0;
  list-style: none;
}
.checks li {
  border-top: 1px solid var(--line);
}
.checks label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 11px 0;
  cursor: pointer;
}
.checks input {
  margin-top: 2px;
  flex: 0 0 auto;
}
.box {
  display: none;
}
.checks strong {
  display: block;
  font-size: 14px;
}
.checks small {
  color: var(--mute);
  font: 12px var(--mono);
}
.checks input:checked + .box + span strong {
  color: var(--mute);
  text-decoration: line-through;
}

.timeline {
  position: relative;
  margin: 14px 0 0;
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
  padding-bottom: 18px;
}
.timeline li::before {
  content: '';
  position: absolute;
  top: 5px;
  left: -26px;
  width: 12px;
  height: 12px;
  border: 2px solid var(--amber);
  border-radius: 50%;
  background: var(--panel);
}
.timeline b {
  color: var(--amber);
  font: 600 14px var(--mono);
}
.timeline p {
  margin: 3px 0 0;
  color: #c3cbe4;
  font-size: 14px;
  line-height: 1.6;
}

.runs {
  margin: 10px 0 0;
  padding: 0;
  list-style: none;
}
.runs li {
  display: flex;
  gap: 14px;
  padding: 12px 0;
  border-top: 1px solid var(--line);
}
.ic {
  display: grid;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 9px;
  color: var(--cyan);
  background: rgba(90, 209, 255, 0.1);
}
.runs strong {
  display: block;
  font-size: 14px;
}
.runs span {
  color: var(--mute);
  font-size: 13px;
  line-height: 1.55;
}

.scroll {
  overflow-x: auto;
}
.distro {
  width: 100%;
  min-width: 540px;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}
.distro th,
.distro td {
  padding: 13px 14px;
  border-bottom: 1px solid var(--line);
}
.distro thead th {
  color: var(--mute);
  font-weight: 500;
  font-size: 13px;
}
.distro tbody th {
  font-family: var(--head);
}
.distro td {
  color: #c3cbe4;
}
.distro tbody tr {
  transition: background 0.15s;
}
.distro tbody tr:hover {
  background: var(--panel2);
}

.fs {
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 24px;
}
.fs ul {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.fs ul button {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid transparent;
  border-radius: 8px;
  color: var(--mute);
  background: transparent;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s;
}
.fs ul button.on,
.fs ul button:hover {
  border-color: var(--amber);
  background: rgba(255, 179, 71, 0.08);
}
.fs-detail {
  min-width: 0;
  animation: swap 0.35s ease both;
}
.fs-detail h4 {
  margin-bottom: 6px;
  font: 600 20px var(--mono);
  color: var(--amber);
}
.fs-detail p {
  max-width: 520px;
  margin: 0 0 16px;
  color: #c3cbe4;
  font-size: 14px;
  line-height: 1.7;
}
.fs-detail .run {
  max-width: 320px;
}

/* Fullscreen */
.fs-card {
  display: flex;
  flex-direction: column;
  background: #1a2140;
}
.fs-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  color: var(--text);
  background: var(--panel);
  border-bottom: 1px solid var(--line);
}
.fs-frame {
  flex: 1;
  width: 100%;
  border: 0;
}

@media (max-width: 980px) {
  .hero,
  .mod,
  .grid2 {
    grid-template-columns: 1fr;
  }
  .hero {
    gap: 32px;
  }
  .fs {
    grid-template-columns: 1fr;
  }
  .fs ul {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .fs ul button {
    width: auto;
  }
}
@media (max-width: 620px) {
  .lx {
    padding: 18px 12px 50px;
  }
  .mod {
    padding: 18px;
  }
  .mod-topics {
    grid-template-columns: 1fr;
  }
  .panel {
    padding: 20px 16px;
  }
  .head.row {
    flex-direction: column;
    align-items: flex-start;
  }
  .term-body {
    height: 300px;
    font-size: 12px;
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
