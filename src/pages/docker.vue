<template>
  <q-page class="dk">
    <div class="dk-wrap">
      <!-- ================= HERO ================= -->
      <section class="hero">
        <div class="hero-copy">
          <p class="hero-tag"><q-icon name="fa-brands fa-docker" /> Docker learning module</p>
          <h1>Ship software<br />like freight.</h1>
          <p class="hero-lede">
            A shipping container fits any ship, train, or truck because its shape never changes.
            Docker gives your code the same promise: package it once, and it runs the same on a
            laptop, a test server, or the cloud.
          </p>
          <div class="hero-actions">
            <q-btn
              unelevated
              no-caps
              class="btn-main"
              label="Open the Docker lab"
              icon="terminal"
              @click="go('lab')"
            />
            <q-btn
              flat
              no-caps
              class="btn-ghost"
              label="Browse topics"
              icon-right="south"
              @click="go('topics')"
            />
          </div>
          <dl class="manifest">
            <div>
              <dt>Topics</dt>
              <dd>{{ lessons.length }}</dd>
            </div>
            <div>
              <dt>Slides</dt>
              <dd>{{ totalSlides }}</dd>
            </div>
            <div>
              <dt>Lab commands</dt>
              <dd>15</dd>
            </div>
            <div>
              <dt>Cheat sheet</dt>
              <dd>{{ cheatCount }}</dd>
            </div>
          </dl>
        </div>

        <!-- container stack built from the real lessons -->
        <div class="stack-scene" aria-label="Lesson topics stacked like shipping containers">
          <div class="crane-line"></div>
          <button
            v-for="(lesson, i) in lessons.slice(0, 6)"
            :key="lesson.id"
            class="box"
            :class="'c' + (i % 5)"
            :style="{ '--i': i }"
            @click="openLesson(lesson.id)"
          >
            <span class="box-id">DKR-{{ String(lesson.id).padStart(3, '0') }}</span>
            <span class="box-title">{{ lesson.title }}</span>
            <span class="box-door"></span>
          </button>
          <div class="water"></div>
        </div>
      </section>

      <!-- ================= TICKER ================= -->
      <section class="ticker reveal" aria-hidden="true">
        <div class="ticker-track">
          <span v-for="(t, i) in [...ecosystem, ...ecosystem]" :key="i" class="ticker-item">
            <q-icon :name="t.icon" /> {{ t.name }}
          </span>
        </div>
      </section>

      <!-- ================= VM VS CONTAINER ================= -->
      <section class="block">
        <div class="head reveal">
          <h2>Why containers beat full virtual machines</h2>
          <p>
            A virtual machine carries an entire guest operating system. A container shares the host
            kernel and carries only your app and its libraries.
          </p>
        </div>

        <div class="reveal">
          <div class="versus" :class="{ racing }">
            <div class="vs-col">
              <h3>Virtual machine</h3>
              <ul class="layers">
                <li v-for="l in vmLayers" :key="l.t" :class="{ heavy: l.heavy }">{{ l.t }}</li>
              </ul>
              <div class="bar vm"><i></i></div>
              <p class="vs-note">Boots in about 45 s and weighs gigabytes.</p>
            </div>
            <div class="vs-mid">
              <q-btn
                round
                unelevated
                icon="play_arrow"
                class="race-btn"
                aria-label="Start both"
                @click="race"
              />
              <span>Start both</span>
            </div>
            <div class="vs-col">
              <h3>Container</h3>
              <ul class="layers">
                <li v-for="l in ctLayers" :key="l.t" :class="{ light: l.light }">{{ l.t }}</li>
              </ul>
              <div class="bar ct"><i></i></div>
              <p class="vs-note">Starts in about 1 s and weighs megabytes.</p>
            </div>
          </div>
        </div>
        <p class="fine reveal">Startup times are typical values shown for illustration.</p>
      </section>

      <!-- ================= FEATURES ================= -->
      <section class="block">
        <div class="head reveal">
          <h2>What you get when you containerize</h2>
          <p>Six practical benefits teams notice in the first week.</p>
        </div>
        <div class="feat-grid">
          <article
            v-for="(f, i) in features"
            :key="f.title"
            class="feat reveal"
            :style="{ '--d': i * 0.06 + 's' }"
          >
            <q-icon :name="f.icon" size="28px" />
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </article>
        </div>
      </section>

      <!-- ================= LAB ================= -->
      <section id="lab" class="block">
        <div class="head reveal">
          <h2>Docker lab: a terminal that actually answers</h2>
          <p>
            Type real Docker commands and watch the container yard update. It is a safe simulation,
            so nothing touches your machine. Press the up arrow to reuse earlier commands.
          </p>
        </div>

        <div class="lab-grid reveal">
          <div class="term" @click="focusInput">
            <div class="term-bar">
              <span class="d r"></span><span class="d y"></span><span class="d g"></span>
              <span class="term-title">docker-lab : zsh</span>
              <button class="reset" @click.stop="resetLab">Reset lab</button>
            </div>
            <div ref="termBody" class="term-body" role="log" aria-live="polite">
              <div v-for="(l, i) in lines" :key="i" class="ln" :class="l.cls">
                <span v-if="l.cls === 'cmd'" class="pr">$</span>{{ l.text }}
              </div>
              <label class="ln inp">
                <span class="pr">$</span>
                <input
                  ref="inputEl"
                  v-model="input"
                  :disabled="busy"
                  spellcheck="false"
                  autocomplete="off"
                  aria-label="Terminal input"
                  placeholder="type a command, or press a chip below"
                  @keydown.enter="submit"
                  @keydown.up.prevent="histNav(1)"
                  @keydown.down.prevent="histNav(-1)"
                />
              </label>
            </div>
            <div class="chips">
              <button v-for="c in chips" :key="c" :disabled="busy" @click.stop="runChip(c)">
                {{ c }}
              </button>
            </div>
          </div>

          <aside class="side">
            <div class="panel">
              <h3>Mission: deploy a web server</h3>
              <ul class="missions">
                <li
                  v-for="m in missions"
                  :key="m.id"
                  :class="{ done: doneMissions.includes(m.id) }"
                >
                  <q-icon
                    :name="doneMissions.includes(m.id) ? 'check_circle' : 'radio_button_unchecked'"
                  />
                  <span
                    >{{ m.label }}<code>{{ m.hint }}</code></span
                  >
                </li>
              </ul>
              <p v-if="doneMissions.length === missions.length" class="win">
                Mission complete. You just ran the full container lifecycle.
              </p>
            </div>

            <div class="panel">
              <h3>
                Container yard <small>{{ running }} running</small>
              </h3>
              <transition-group name="drop" tag="div" class="yard">
                <div
                  v-for="c in containers"
                  :key="c.id"
                  class="crate"
                  :class="[c.status, 'c' + c.color]"
                >
                  <span class="led"></span>
                  <strong>{{ c.name }}</strong>
                  <em>{{ c.image }}</em>
                  <small>{{ c.status === 'running' ? c.ports || 'no ports' : 'stopped' }}</small>
                </div>
              </transition-group>
              <p v-if="!containers.length" class="empty">
                The yard is empty. Run your first container.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <!-- ================= TOPICS ================= -->
      <section id="topics" class="block">
        <div class="head reveal">
          <h2>Docker fundamentals</h2>
          <p>Pick a topic to open its slide presentation.</p>
        </div>
        <div class="topic-grid">
          <article
            v-for="(lesson, index) in lessons"
            :key="lesson.id"
            class="topic reveal"
            :class="'c' + (index % 5)"
            :style="{ '--d': (index % 3) * 0.08 + 's' }"
            tabindex="0"
            @click="openLesson(lesson.id)"
            @keydown.enter="openLesson(lesson.id)"
          >
            <header class="topic-top">
              <span class="topic-code">DKR-{{ String(lesson.id).padStart(3, '0') }}</span>
              <q-icon :name="lesson.icon || 'fa-brands fa-docker'" size="26px" />
            </header>
            <div class="topic-body">
              <span class="topic-cat">{{ lesson.category }}</span>
              <h3>{{ lesson.title }}</h3>
              <p>{{ lesson.subtitle }}</p>
            </div>
            <footer class="topic-foot">
              <span><q-icon name="slideshow" /> {{ lesson.slides?.length || 0 }} slides</span>
              <q-btn
                flat
                round
                icon="arrow_forward"
                class="go"
                aria-label="Open topic"
                @click.stop="openLesson(lesson.id)"
              />
            </footer>
          </article>
        </div>
      </section>

      <!-- ================= ARCHITECTURE ================= -->
      <section class="block">
        <div class="head reveal">
          <h2>What happens when you run a container</h2>
          <p>Follow one <code>docker run</code> from your keyboard to a running process.</p>
        </div>

        <div class="arch reveal">
          <div class="arch-cmd"><span class="pr">$</span> docker run -d -p 8080:80 nginx</div>
          <div class="arch-flow">
            <div v-for="(n, i) in archNodes" :key="n.name" class="node-wrap">
              <div class="node" :class="{ on: lifeSteps[lifeIdx].node === i }">
                <q-icon :name="n.icon" size="30px" />
                <h4>{{ n.name }}</h4>
                <span>{{ n.sub }}</span>
              </div>
              <div v-if="i < 2" class="link" :class="{ live: linkLive[i] }"><i></i></div>
            </div>
          </div>
          <ol class="life">
            <li
              v-for="(s, i) in lifeSteps"
              :key="s.title"
              :class="{ on: i === lifeIdx, past: i < lifeIdx }"
            >
              <button @click="pickStep(i)">
                <b>{{ i + 1 }}</b>
                <span>{{ s.title }}</span>
              </button>
            </li>
          </ol>
          <div class="life-text">
            <p>{{ lifeSteps[lifeIdx].text }}</p>
            <q-btn
              flat
              no-caps
              dense
              :icon="playing ? 'pause' : 'play_arrow'"
              :label="playing ? 'Pause tour' : 'Play tour'"
              class="btn-ghost"
              @click="togglePlay"
            />
          </div>
        </div>
      </section>

      <!-- ================= DOCKERFILE LAYERS ================= -->
      <section class="block">
        <div class="head reveal">
          <h2>Read a Dockerfile as a stack of layers</h2>
          <p>
            Each instruction adds one read-only layer. Click a line to see what it does, or build
            the image and watch the stack grow.
          </p>
        </div>

        <div class="df-grid reveal">
          <div class="code-card">
            <div class="term-bar">
              <span class="d r"></span><span class="d y"></span><span class="d g"></span>
              <span class="term-title">Dockerfile</span>
            </div>
            <div class="code-lines">
              <button
                v-for="(l, i) in dfLines"
                :key="i"
                :class="{ on: dfActive === i }"
                @click="dfActive = i"
              >
                <em>{{ i + 1 }}</em>
                <span
                  ><b class="kw">{{ l.kw }}</b> {{ l.arg }}</span
                >
              </button>
            </div>
            <div class="code-foot">
              <q-btn
                unelevated
                no-caps
                class="btn-main sm"
                icon="construction"
                label="docker build"
                @click="buildImage"
              />
            </div>
          </div>

          <div class="df-side">
            <transition-group name="layer" tag="div" class="img-stack">
              <button
                v-for="(l, i) in dfLines.slice(0, built)"
                :key="i"
                class="layer"
                :class="[{ on: dfActive === i }, 'c' + (i % 5)]"
                :style="{ '--h': l.h + 'px' }"
                @click="dfActive = i"
              >
                <span>{{ l.kw }}</span>
                <small>{{ l.size }}</small>
              </button>
            </transition-group>
            <div class="panel info">
              <h3>
                {{ dfLines[dfActive].kw }} <code>{{ dfLines[dfActive].arg }}</code>
              </h3>
              <p>{{ dfLines[dfActive].text }}</p>
              <p class="tip"><q-icon name="lightbulb" /> {{ dfLines[dfActive].tip }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= CHEAT SHEET ================= -->
      <section class="block">
        <div class="head reveal">
          <h2>Command reference</h2>
          <p>Choose a category, then click any command to copy it.</p>
        </div>
        <div class="tabs reveal" role="tablist">
          <button
            v-for="(_, name) in cheat"
            :key="name"
            role="tab"
            :aria-selected="tab === name"
            :class="{ on: tab === name }"
            @click="tab = name"
          >
            {{ name }}
          </button>
        </div>
        <div class="cheat-grid">
          <button
            v-for="c in cheat[tab]"
            :key="tab + c.cmd"
            class="cheat reveal is-visible"
            @click="copy(c.cmd)"
          >
            <code>{{ c.cmd }}</code>
            <span>{{ c.desc }}</span>
            <small>{{ copied === c.cmd ? 'Copied' : 'Click to copy' }}</small>
          </button>
        </div>
      </section>

      <!-- ================= PRACTICES ================= -->
      <section class="block">
        <div class="head reveal">
          <h2>Habits of teams that ship containers well</h2>
          <p>Small choices that make images smaller, safer, and faster to build.</p>
        </div>
        <div class="prac-grid">
          <article
            v-for="(p, i) in practices"
            :key="p.topic"
            class="prac reveal"
            :style="{ '--d': (i % 3) * 0.07 + 's' }"
          >
            <h3>{{ p.topic }}</h3>
            <p class="do"><q-icon name="check_circle" /> {{ p.good }}</p>
            <p class="dont"><q-icon name="cancel" /> {{ p.bad }}</p>
          </article>
        </div>
      </section>

      <!-- ================= FAQ ================= -->
      <section class="block">
        <div class="head reveal">
          <h2>Concepts that trip up beginners</h2>
          <p>Short answers to the questions that come up in every first Docker course.</p>
        </div>
        <div class="faq reveal">
          <div v-for="(f, i) in faq" :key="f.q" class="faq-item" :class="{ open: faqOpen === i }">
            <button :aria-expanded="faqOpen === i" @click="faqOpen = faqOpen === i ? -1 : i">
              {{ f.q }}
              <q-icon name="expand_more" />
            </button>
            <div class="faq-a">
              <p>{{ f.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= CTA ================= -->
      <section class="cta reveal">
        <div>
          <h2>Ready to load your first container?</h2>
          <p>
            Start with the fundamentals, then come back to the lab to practice what you learned.
          </p>
        </div>
        <q-btn
          unelevated
          no-caps
          class="btn-main"
          icon="south"
          label="Choose a topic"
          @click="go('topics')"
        />
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { dockerLessons as lessons } from '../data/docker.js'

const router = useRouter()
const totalSlides = computed(() => lessons.reduce((t, l) => t + (l.slides?.length || 0), 0))

function openLesson(id) {
  router.push({ path: '/docker-learning', query: { lesson: String(id) } })
}
function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ================= STATIC CONTENT ================= */

const ecosystem = [
  { name: 'Docker Engine', icon: 'fa-brands fa-docker' },
  { name: 'Docker Compose', icon: 'account_tree' },
  { name: 'Docker Hub', icon: 'cloud' },
  { name: 'Dockerfile', icon: 'description' },
  { name: 'Volumes', icon: 'storage' },
  { name: 'Networks', icon: 'lan' },
  { name: 'Kubernetes', icon: 'hub' },
  { name: 'BuildKit', icon: 'construction' },
  { name: 'CI/CD', icon: 'sync' },
  { name: 'Registries', icon: 'inventory' },
]

const vmLayers = [
  { t: 'Application' },
  { t: 'Binaries and libraries' },
  { t: 'Guest OS (a full copy per VM)', heavy: true },
  { t: 'Hypervisor', heavy: true },
  { t: 'Host OS' },
  { t: 'Infrastructure' },
]
const ctLayers = [
  { t: 'Application' },
  { t: 'Binaries and libraries' },
  { t: 'Docker Engine', light: true },
  { t: 'Host OS (shared kernel)' },
  { t: 'Infrastructure' },
]
const racing = ref(false)
function race() {
  racing.value = false
  nextTick(() => requestAnimationFrame(() => (racing.value = true)))
}

const features = [
  {
    icon: 'inventory_2',
    title: 'Portable packaging',
    text: 'Your app, runtime, and libraries travel together as one image that runs on any Docker host.',
  },
  {
    icon: 'bolt',
    title: 'Fast startup',
    text: 'Containers share the host kernel, so they start in about a second and use far less memory than VMs.',
  },
  {
    icon: 'devices',
    title: 'Identical environments',
    text: 'Development, staging, and production run the same image, which ends "it works on my machine".',
  },
  {
    icon: 'trending_up',
    title: 'Easy scaling',
    text: 'Start ten copies of a service with one command, or let an orchestrator add replicas under load.',
  },
  {
    icon: 'security',
    title: 'Process isolation',
    text: 'Namespaces and cgroups keep each container in its own view of processes, network, and resources.',
  },
  {
    icon: 'rocket_launch',
    title: 'Pipeline friendly',
    text: 'Build once in CI, scan the image, and promote the exact same artifact through every stage.',
  },
]

/* ---------- lifecycle tour ---------- */
const archNodes = [
  { name: 'Docker client', sub: 'the docker CLI', icon: 'terminal' },
  { name: 'Docker daemon', sub: 'dockerd does the work', icon: 'memory' },
  { name: 'Registry', sub: 'Docker Hub or private', icon: 'cloud_download' },
]
const lifeSteps = [
  {
    title: 'Send request',
    node: 0,
    text: 'The CLI turns your command into an API call and sends it to the Docker daemon over a local socket or a network connection.',
  },
  {
    title: 'Check local images',
    node: 1,
    text: 'The daemon looks in its local image store for nginx:latest. If every layer is already cached, it skips the download entirely.',
  },
  {
    title: 'Pull missing layers',
    node: 2,
    text: 'Missing layers are downloaded from the registry. Layers shared with other images are fetched only once.',
  },
  {
    title: 'Create the container',
    node: 1,
    text: 'The daemon adds a thin writable layer on top of the image, sets up namespaces, a virtual network, and the port mapping 8080 to 80.',
  },
  {
    title: 'Start the process',
    node: 1,
    text: 'The image’s start command runs as an isolated process. Docker streams its output to logs and reports the container ID back to your terminal.',
  },
]
const lifeIdx = ref(0)
const playing = ref(false)
let lifeTimer = null
const linkLive = computed(() => [lifeIdx.value === 0, lifeIdx.value === 2])
function pickStep(i) {
  lifeIdx.value = i
}
function togglePlay() {
  playing.value = !playing.value
  clearInterval(lifeTimer)
  if (playing.value) {
    lifeTimer = setInterval(() => {
      lifeIdx.value = (lifeIdx.value + 1) % lifeSteps.length
    }, 2800)
  }
}

/* ---------- dockerfile layers ---------- */
const dfLines = [
  {
    kw: 'FROM',
    arg: 'node:20-alpine',
    h: 92,
    size: '135 MB',
    text: 'Chooses the base image. Alpine variants are small because they use a minimal Linux userland.',
    tip: 'Always pin a version tag instead of using latest.',
  },
  {
    kw: 'WORKDIR',
    arg: '/app',
    h: 34,
    size: '0 B',
    text: 'Sets the directory where the following instructions run and where your code will live.',
    tip: 'It creates the folder for you if it does not exist.',
  },
  {
    kw: 'COPY',
    arg: 'package*.json ./',
    h: 40,
    size: '4 KB',
    text: 'Copies only the dependency manifests first, before the rest of the source code.',
    tip: 'This ordering is what makes the next layer cacheable.',
  },
  {
    kw: 'RUN',
    arg: 'npm install',
    h: 82,
    size: '85 MB',
    text: 'Installs dependencies into the image. It is the slowest step in most builds.',
    tip: 'Cached until package.json changes, so rebuilds take seconds.',
  },
  {
    kw: 'COPY',
    arg: '. .',
    h: 46,
    size: '2 MB',
    text: 'Copies the rest of your source code. This layer changes on almost every commit.',
    tip: 'Add a .dockerignore to keep node_modules and .git out.',
  },
  {
    kw: 'EXPOSE',
    arg: '3000',
    h: 34,
    size: '0 B',
    text: 'Documents the port the app listens on. It is metadata only and does not publish the port.',
    tip: 'Publish with -p 3000:3000 when you run the container.',
  },
  {
    kw: 'CMD',
    arg: '["npm", "start"]',
    h: 34,
    size: '0 B',
    text: 'Defines the default command that runs when a container starts from this image.',
    tip: 'Use the array (exec) form so signals reach your process.',
  },
]
const dfActive = ref(3)
const built = ref(dfLines.length)
let buildTimer = null
function buildImage() {
  clearInterval(buildTimer)
  built.value = 0
  buildTimer = setInterval(() => {
    if (built.value >= dfLines.length) return clearInterval(buildTimer)
    built.value++
    dfActive.value = built.value - 1
  }, 520)
}

/* ---------- cheat sheet ---------- */
const cheat = {
  Images: [
    { cmd: 'docker pull nginx:1.27', desc: 'Download an image' },
    { cmd: 'docker build -t my-app .', desc: 'Build from a Dockerfile' },
    { cmd: 'docker images', desc: 'List local images' },
    { cmd: 'docker tag my-app user/my-app:1.0', desc: 'Name an image for a registry' },
    { cmd: 'docker push user/my-app:1.0', desc: 'Upload to a registry' },
    { cmd: 'docker rmi my-app', desc: 'Delete an image' },
  ],
  Containers: [
    { cmd: 'docker run -d -p 80:80 nginx', desc: 'Start in the background' },
    { cmd: 'docker ps -a', desc: 'List all containers' },
    { cmd: 'docker stop <name>', desc: 'Stop gracefully' },
    { cmd: 'docker logs -f <name>', desc: 'Follow live output' },
    { cmd: 'docker exec -it <name> sh', desc: 'Open a shell inside' },
    { cmd: 'docker rm <name>', desc: 'Remove a stopped container' },
  ],
  'Network and storage': [
    { cmd: 'docker network ls', desc: 'List networks' },
    { cmd: 'docker network create app-net', desc: 'Create a private network' },
    { cmd: 'docker volume create pgdata', desc: 'Create persistent storage' },
    { cmd: 'docker run -v pgdata:/var/lib/postgresql/data postgres', desc: 'Mount a volume' },
    { cmd: 'docker volume ls', desc: 'List volumes' },
    { cmd: 'docker inspect <name>', desc: 'Show full JSON details' },
  ],
  'Compose and cleanup': [
    { cmd: 'docker compose up -d', desc: 'Start all services' },
    { cmd: 'docker compose down', desc: 'Stop and remove services' },
    { cmd: 'docker compose logs -f', desc: 'Follow every service log' },
    { cmd: 'docker stats', desc: 'Live CPU and memory use' },
    { cmd: 'docker system df', desc: 'See disk usage' },
    { cmd: 'docker system prune', desc: 'Remove unused data' },
  ],
}
const tab = ref('Images')
const cheatCount = Object.values(cheat).reduce((n, a) => n + a.length, 0)
const copied = ref('')
async function copy(cmd) {
  try {
    await navigator.clipboard.writeText(cmd)
    copied.value = cmd
    setTimeout(() => (copied.value = ''), 1400)
  } catch {
    copied.value = ''
  }
}

const practices = [
  {
    topic: 'Base images',
    good: 'Start from slim or alpine images with a pinned version.',
    bad: 'Use the latest tag, or a full OS image for a small app.',
  },
  {
    topic: 'Layer order',
    good: 'Copy dependency files first, then source code, to reuse the cache.',
    bad: 'Copy everything at once so every code change reinstalls packages.',
  },
  {
    topic: 'Secrets',
    good: 'Pass secrets at runtime with env files or Docker secrets.',
    bad: 'Bake passwords or API keys into an image layer.',
  },
  {
    topic: 'Users',
    good: 'Run the process as a non-root user with USER.',
    bad: 'Leave the app running as root inside the container.',
  },
  {
    topic: 'Responsibility',
    good: 'Run one main process per container and connect them with networks.',
    bad: 'Pack a database, API, and web server into one container.',
  },
  {
    topic: 'Data',
    good: 'Keep state in named volumes so it survives container removal.',
    bad: 'Store important data in the container’s writable layer.',
  },
]

const faq = [
  {
    q: 'What is the difference between an image and a container?',
    a: 'An image is a read-only template made of layers. A container is a running (or stopped) instance of that image with a thin writable layer on top. One image can start many containers.',
  },
  {
    q: 'Does data survive when I remove a container?',
    a: 'Not by default. The writable layer is deleted with the container. Use volumes or bind mounts for anything you need to keep, such as database files.',
  },
  {
    q: 'What does -p 8080:80 mean?',
    a: 'It publishes a port. The first number is the port on your host, and the second is the port inside the container. Visiting localhost:8080 reaches port 80 in the container.',
  },
  {
    q: 'What is the difference between CMD and ENTRYPOINT?',
    a: 'ENTRYPOINT sets the executable that always runs. CMD supplies default arguments that are easy to override at docker run. Together they let an image behave like a command-line tool.',
  },
  {
    q: 'Is Docker the same as Kubernetes?',
    a: 'No. Docker builds and runs containers on one machine. Kubernetes orchestrates many containers across many machines, handling scheduling, scaling, and self-healing.',
  },
  {
    q: 'Why is my image so large?',
    a: 'Common causes are heavy base images, leftover build tools, and a missing .dockerignore. Use slim bases, multi-stage builds, and clean package caches in the same RUN step.',
  },
]
const faqOpen = ref(0)

/* ================= LAB: SIMULATED TERMINAL ================= */

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const hex = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 16).toString(16)).join('')
const KNOWN = [
  'nginx',
  'redis',
  'postgres',
  'node',
  'python',
  'ubuntu',
  'alpine',
  'mysql',
  'httpd',
  'mongo',
]
const NAMES = [
  'brave_otter',
  'quiet_heron',
  'eager_lynx',
  'witty_koala',
  'lucid_gecko',
  'swift_panda',
]
const LOGS = {
  nginx: [
    '/docker-entrypoint.sh: Configuration complete; ready for start up',
    'nginx: worker process started',
    '172.17.0.1 "GET / HTTP/1.1" 200 615',
  ],
  redis: ['Ready to accept connections tcp', 'DB loaded from disk: 0.000 seconds'],
  postgres: ['database system is ready to accept connections'],
  node: ['Server listening on port 3000'],
}

const lines = ref([])
const input = ref('')
const busy = ref(false)
const termBody = ref(null)
const inputEl = ref(null)
const images = ref([])
const containers = ref([])
const doneMissions = ref([])
const history = []
let hIdx = -1
let failed = false

const running = computed(() => containers.value.filter((c) => c.status === 'running').length)

const chips = [
  'help',
  'docker --version',
  'docker pull nginx',
  'docker run -d -p 8080:80 --name web nginx',
  'docker ps',
  'docker logs web',
  'docker stop web',
  'docker images',
]
const missions = [
  {
    id: 'pull',
    label: 'Pull the nginx image',
    hint: 'docker pull nginx',
    test: (c) => /^docker pull nginx/.test(c),
  },
  {
    id: 'run',
    label: 'Run it in the background on port 8080',
    hint: 'docker run -d -p 8080:80 --name web nginx',
    test: (c) => /^docker run\b.*-p 8080:80.*nginx/.test(c),
  },
  {
    id: 'ps',
    label: 'Confirm it is running',
    hint: 'docker ps',
    test: (c) => /^docker ps/.test(c),
  },
  {
    id: 'logs',
    label: 'Read its logs',
    hint: 'docker logs web',
    test: (c) => /^docker logs\s+web/.test(c),
  },
  {
    id: 'stop',
    label: 'Stop the container',
    hint: 'docker stop web',
    test: (c) => /^docker stop\s+web/.test(c),
  },
]

function out(text, cls = '') {
  lines.value.push({ text, cls })
}
function err(text) {
  failed = true
  out(text, 'bad')
}
function scrollDown() {
  nextTick(() => {
    if (termBody.value) termBody.value.scrollTop = termBody.value.scrollHeight
  })
}
function focusInput() {
  inputEl.value?.focus()
}
function resetLab() {
  lines.value = []
  images.value = [{ repo: 'node', tag: '20-alpine', id: hex(12), size: '135MB' }]
  containers.value = []
  doneMissions.value = []
  out('Docker lab ready (simulated Docker 27.3.1). Type help for commands.', 'muted')
  out('Tip: follow the mission on the right, starting with docker pull nginx.', 'muted')
}

function histNav(dir) {
  if (!history.length) return
  hIdx = Math.min(Math.max(hIdx + dir, -1), history.length - 1)
  input.value = hIdx === -1 ? '' : history[hIdx]
}
function runChip(c) {
  if (busy.value) return
  input.value = c
  submit()
}
async function submit() {
  const cmd = input.value.trim()
  input.value = ''
  if (!cmd || busy.value) return
  out(cmd, 'cmd')
  history.unshift(cmd)
  hIdx = -1
  busy.value = true
  failed = false
  try {
    await dispatch(cmd)
  } finally {
    busy.value = false
  }
  if (!failed) {
    missions.forEach((m) => {
      if (m.test(cmd) && !doneMissions.value.includes(m.id)) doneMissions.value.push(m.id)
    })
  }
  scrollDown()
  nextTick(focusInput)
}

const row = (cols, widths) => cols.map((c, i) => String(c).padEnd(widths[i])).join('')
const findC = (ref_) => containers.value.find((c) => c.name === ref_ || c.id.startsWith(ref_))

async function pull(name) {
  if (!name) return err('"docker pull" requires 1 argument. Example: docker pull nginx')
  const [repo, tag = 'latest'] = name.split(':')
  if (!KNOWN.includes(repo)) {
    return err(
      `Error response from daemon: pull access denied for ${repo}, repository does not exist or may require authorization`,
    )
  }
  if (!name.includes(':')) out('Using default tag: latest', 'muted')
  out(`${tag}: Pulling from library/${repo}`)
  for (let i = 0; i < 3; i++) {
    await sleep(380)
    out(`${hex(12)}: Pull complete`, 'muted')
    scrollDown()
  }
  await sleep(250)
  out(`Digest: sha256:${hex(32)}`, 'muted')
  out(`Status: Downloaded newer image for ${repo}:${tag}`, 'ok')
  if (!images.value.some((i) => i.repo === repo && i.tag === tag)) {
    images.value.push({ repo, tag, id: hex(12), size: `${40 + Math.floor(Math.random() * 120)}MB` })
  }
}

async function runC(args) {
  let detached = false,
    ports = '',
    name = '',
    image = ''
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === '-d') detached = true
    else if (a === '-p') ports = args[++i] || ''
    else if (a === '--name') name = args[++i] || ''
    else if (a.startsWith('-')) continue
    else if (!image) image = a
  }
  if (!image) return err('"docker run" requires at least 1 argument. Example: docker run -d nginx')
  const [repo, tag = 'latest'] = image.split(':')
  if (!images.value.some((i) => i.repo === repo && i.tag === tag)) {
    out(`Unable to find image '${repo}:${tag}' locally`, 'muted')
    await pull(image)
    if (failed) return
  }
  if (name && containers.value.some((c) => c.name === name)) {
    return err(
      `docker: Error response from daemon: Conflict. The container name "/${name}" is already in use.`,
    )
  }
  const host = ports.split(':')[0]
  if (
    host &&
    containers.value.some((c) => c.status === 'running' && c.ports.startsWith(`0.0.0.0:${host}->`))
  ) {
    return err(
      `docker: Error response from daemon: Bind for 0.0.0.0:${host} failed: port is already allocated.`,
    )
  }
  const id = hex(64)
  containers.value.push({
    id,
    name: name || NAMES[Math.floor(Math.random() * NAMES.length)],
    image: `${repo}:${tag}`,
    repo,
    ports: ports ? `0.0.0.0:${host}->${ports.split(':')[1] || host}/tcp` : '',
    status: 'running',
    color: containers.value.length % 5,
  })
  if (detached) out(id, 'ok')
  else out('Started in the foreground (simulated). Add -d to run in the background.', 'muted')
}

async function dispatch(cmd) {
  if (cmd === 'clear') return void (lines.value = [])
  if (cmd === 'help') {
    ;[
      'Available commands:',
      '  docker --version                 show the Docker version',
      '  docker pull <image>              download an image (try nginx, redis, postgres)',
      '  docker images                    list local images',
      '  docker run [-d] [-p H:C] [--name N] <image>',
      '  docker ps [-a]                   list containers',
      '  docker stop|start|rm <name>      control a container',
      '  docker logs <name>               show container output',
      '  docker exec -it <name> sh        open a shell (simulated)',
      '  docker build -t <name> .         build an image (simulated)',
      '  docker network ls | volume ls    list networks or volumes',
      '  docker system prune              remove stopped containers',
      '  clear                            clear the screen',
    ].forEach((t, i) => out(t, i ? '' : 'muted'))
    return
  }
  const a = cmd.split(/\s+/)
  if (a[0] !== 'docker')
    return err(`zsh: command not found: ${a[0]}. Type help to see what this lab supports.`)
  const rest = a.slice(2)
  switch (a[1]) {
    case '--version':
      return out('Docker version 27.3.1, build ce12230')
    case 'images': {
      out(row(['REPOSITORY', 'TAG', 'IMAGE ID', 'SIZE'], [16, 14, 16, 8]), 'muted')
      images.value.forEach((i) => out(row([i.repo, i.tag, i.id, i.size], [16, 14, 16, 8])))
      return
    }
    case 'pull':
      return pull(rest[0])
    case 'run':
      return runC(rest)
    case 'ps': {
      const all = rest.includes('-a')
      out(row(['CONTAINER ID', 'IMAGE', 'STATUS', 'PORTS', 'NAMES'], [15, 15, 12, 26, 14]), 'muted')
      containers.value
        .filter((c) => all || c.status === 'running')
        .forEach((c) =>
          out(
            row(
              [
                c.id.slice(0, 12),
                c.image,
                c.status === 'running' ? 'Up 5 seconds' : 'Exited (0)',
                c.ports,
                c.name,
              ],
              [15, 15, 12, 26, 14],
            ),
          ),
        )
      return
    }
    case 'stop':
    case 'start':
    case 'rm': {
      const c = findC(rest[0])
      if (!rest[0]) return err(`"docker ${a[1]}" requires at least 1 argument.`)
      if (!c) return err(`Error response from daemon: No such container: ${rest[0]}`)
      if (a[1] === 'rm') {
        if (c.status === 'running' && !rest.includes('-f'))
          return err(
            `Error response from daemon: cannot remove a running container. Stop it first, or use -f.`,
          )
        containers.value = containers.value.filter((x) => x.id !== c.id)
      } else {
        await sleep(300)
        c.status = a[1] === 'stop' ? 'exited' : 'running'
      }
      return out(c.name, 'ok')
    }
    case 'logs': {
      const c = findC(rest[0])
      if (!c) return err(`Error response from daemon: No such container: ${rest[0] || ''}`)
      ;(LOGS[c.repo] || ['Application started', 'Listening for requests']).forEach((t) =>
        out(t, 'muted'),
      )
      return
    }
    case 'exec': {
      const c = findC(rest.find((r) => !r.startsWith('-')))
      if (!c) return err('Error response from daemon: No such container.')
      if (c.status !== 'running')
        return err(`Error response from daemon: container ${c.name} is not running`)
      return out(
        'Shell opened and closed (simulated). On a real machine you would now be inside the container.',
        'muted',
      )
    }
    case 'build': {
      const t = rest[rest.indexOf('-t') + 1]
      if (!t || rest.indexOf('-t') === -1)
        return err('Add a name with -t. Example: docker build -t my-app .')
      const steps = [
        '[1/5] FROM node:20-alpine',
        '[2/5] WORKDIR /app',
        '[3/5] COPY package*.json ./',
        '[4/5] RUN npm install',
        '[5/5] COPY . .',
      ]
      out('[+] Building (simulated)', 'muted')
      for (const s of steps) {
        await sleep(420)
        out(s)
        scrollDown()
      }
      out(`naming to docker.io/library/${t}:latest`, 'ok')
      images.value.push({ repo: t, tag: 'latest', id: hex(12), size: '224MB' })
      return
    }
    case 'network':
      out(row(['NETWORK ID', 'NAME', 'DRIVER'], [14, 12, 10]), 'muted')
      return ['bridge', 'host', 'none'].forEach((n, i) =>
        out(row([hex(12), n, i === 0 ? 'bridge' : n === 'host' ? 'host' : 'null'], [14, 12, 10])),
      )
    case 'volume':
      return out(row(['DRIVER', 'VOLUME NAME'], [10, 20]), 'muted')
    case 'system': {
      const gone = containers.value.filter((c) => c.status === 'exited')
      containers.value = containers.value.filter((c) => c.status === 'running')
      out('Deleted Containers:', 'muted')
      gone.forEach((c) => out(c.id))
      return out('Total reclaimed space: 12.4MB', 'ok')
    }
    default:
      return err(`docker: '${a[1] || ''}' is not a supported command in this lab. Type help.`)
  }
}

/* ================= REVEAL ================= */

let observer = null
onMounted(() => {
  resetLab()
  observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible')
          observer.unobserve(e.target)
        }
      }),
    { threshold: 0.1 },
  )
  document.querySelectorAll('.dk .reveal').forEach((el) => observer.observe(el))
})
onBeforeUnmount(() => {
  observer?.disconnect()
  clearInterval(lifeTimer)
  clearInterval(buildTimer)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800;900&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

.dk {
  --bg: #0a1626;
  --panel: #10243b;
  --panel2: #0d1d31;
  --line: #1f3b5d;
  --ink: #e9f1f8;
  --mute: #8aa3bc;
  --blue: #2496ed;
  --orange: #f26b2d;
  --yellow: #ffc94a;
  --teal: #3fb6a8;
  --red: #ff6b6b;
  --display: 'Big Shoulders Display', 'Arial Narrow', sans-serif;
  --body: 'IBM Plex Sans', system-ui, sans-serif;
  --mono: 'IBM Plex Mono', Consolas, monospace;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background:
    radial-gradient(900px 500px at 85% -5%, rgba(36, 150, 237, 0.18), transparent 70%),
    radial-gradient(700px 400px at 0% 20%, rgba(242, 107, 45, 0.08), transparent 70%), var(--bg);
  color: var(--ink);
  font-family: var(--body);
}
.dk h1,
.dk h2,
.dk h3,
.dk h4 {
  font-family: var(--display);
  margin: 0;
  letter-spacing: 0.01em;
}
.dk p {
  line-height: 1.65;
}
.dk code {
  font-family: var(--mono);
  font-size: 0.88em;
  color: var(--yellow);
}
.dk button {
  font-family: inherit;
  color: inherit;
  cursor: pointer;
}
.dk :focus-visible {
  outline: 2px solid var(--yellow);
  outline-offset: 3px;
}
.dk-wrap {
  max-width: 1280px;
  margin: 0 auto;
  padding: 36px 28px 90px;
}
.pr {
  color: var(--orange);
  margin-right: 8px;
  user-select: none;
}

/* container colors */
.c0 {
  --cc: #e2552b;
}
.c1 {
  --cc: #2d7fd0;
}
.c2 {
  --cc: #e8a823;
}
.c3 {
  --cc: #2f9d8f;
}
.c4 {
  --cc: #8a5cc7;
}

/* buttons */
.btn-main {
  background: var(--orange);
  color: #1a0a02;
  font-weight: 600;
  border-radius: 10px;
  padding: 10px 22px;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.btn-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(242, 107, 45, 0.35);
}
.btn-main.sm {
  padding: 6px 14px;
}
.btn-ghost {
  color: var(--ink);
  border: 1px solid var(--line);
  border-radius: 10px;
  padding: 10px 18px;
}
.btn-ghost:hover {
  border-color: var(--blue);
}

/* ---------- reveal ---------- */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  transition-delay: var(--d, 0s);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* ---------- hero ---------- */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  min-height: 560px;
  padding: 30px 0 20px;
}
.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  padding: 6px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--blue);
  font-size: 13px;
  font-weight: 500;
}
.hero h1 {
  font-size: clamp(60px, 8vw, 118px);
  font-weight: 900;
  line-height: 0.9;
  text-transform: uppercase;
}
.hero-lede {
  max-width: 520px;
  margin: 22px 0 0;
  color: var(--mute);
  font-size: 17px;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}
.manifest {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  gap: 0;
  margin: 34px 0 0;
  border: 1px dashed var(--line);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.02);
}
.manifest div {
  padding: 12px 22px;
  border-right: 1px dashed var(--line);
}
.manifest div:last-child {
  border: 0;
}
.manifest dt {
  color: var(--mute);
  font-size: 12px;
}
.manifest dd {
  margin: 2px 0 0;
  font-family: var(--display);
  font-size: 32px;
  font-weight: 800;
}

/* stack scene (the one orchestrated moment) */
.stack-scene {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  align-content: end;
  min-height: 440px;
  padding: 0 8px 26px;
}
.crane-line {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 40px;
  background: var(--line);
}
.box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 118px;
  padding: 12px 14px;
  overflow: hidden;
  border: 0;
  border-radius: 4px;
  background: var(--cc);
  color: #fff;
  text-align: left;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.18);
  background-image: repeating-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.16) 0 2px,
    transparent 2px 9px
  );
  opacity: 0;
  transform: translateY(-380px);
  animation: lower 0.9s cubic-bezier(0.3, 1.25, 0.5, 1) forwards;
  animation-delay: calc(0.15s + var(--i) * 0.16s);
  transition: filter 0.2s;
}
.box:hover {
  filter: brightness(1.12);
}
.box-id {
  font-family: var(--mono);
  font-size: 11px;
  opacity: 0.85;
}
.box-title {
  font-family: var(--display);
  font-size: 21px;
  font-weight: 800;
  line-height: 1;
  text-transform: uppercase;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.box-door {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 7px;
  background: rgba(0, 0, 0, 0.28);
}
.water {
  position: absolute;
  left: -10px;
  right: -10px;
  bottom: 0;
  height: 14px;
  border-radius: 8px;
  background: repeating-linear-gradient(90deg, var(--blue) 0 24px, #1c78bf 24px 48px);
  opacity: 0.55;
  animation: slide 6s linear infinite;
}
@keyframes lower {
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes slide {
  to {
    background-position: 48px 0;
  }
}

/* ticker */
.ticker {
  margin-top: 24px;
  overflow: hidden;
  border-block: 1px solid var(--line);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.ticker-track {
  display: flex;
  gap: 12px;
  width: max-content;
  padding: 14px 0;
  animation: tick 34s linear infinite;
}
.ticker:hover .ticker-track {
  animation-play-state: paused;
}
.ticker-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 16px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--mute);
  font-size: 13px;
  white-space: nowrap;
}
.ticker-item .q-icon {
  color: var(--blue);
}
@keyframes tick {
  to {
    transform: translateX(-50%);
  }
}

/* ---------- sections ---------- */
.block {
  padding-top: 96px;
}
.head {
  max-width: 720px;
  margin-bottom: 32px;
}
.head h2 {
  font-size: clamp(34px, 4vw, 52px);
  font-weight: 800;
  line-height: 1;
}
.head p {
  margin: 12px 0 0;
  color: var(--mute);
  font-size: 16px;
}
.fine {
  margin: 14px 0 0;
  color: var(--mute);
  font-size: 12px;
}

/* versus */
.versus {
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  align-items: center;
  gap: 16px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--panel2);
}
.vs-col h3 {
  margin-bottom: 12px;
  font-size: 26px;
  font-weight: 800;
}
.layers {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.layers li {
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--panel);
  font-size: 13px;
}
.layers li.heavy {
  border-color: var(--orange);
  background: rgba(242, 107, 45, 0.14);
}
.layers li.light {
  border-color: var(--teal);
  background: rgba(63, 182, 168, 0.14);
}
.bar {
  height: 8px;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 6px;
  background: var(--line);
}
.bar i {
  display: block;
  width: 0;
  height: 100%;
}
.bar.vm i {
  background: var(--orange);
}
.bar.ct i {
  background: var(--teal);
}
.racing .bar.vm i {
  width: 100%;
  transition: width 4.5s linear;
}
.racing .bar.ct i {
  width: 100%;
  transition: width 0.3s linear;
}
.vs-note {
  margin: 8px 0 0;
  color: var(--mute);
  font-size: 13px;
}
.vs-mid {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--mute);
  font-size: 12px;
}
.race-btn {
  width: 54px;
  height: 54px;
  background: var(--blue);
  color: #fff;
}

/* features */
.feat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.feat {
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--panel2);
  transition:
    border-color 0.25s,
    transform 0.25s;
}
.feat.is-visible:hover {
  border-color: var(--blue);
  transform: translateY(-4px);
}
.feat .q-icon {
  color: var(--yellow);
}
.feat h3 {
  margin: 14px 0 6px;
  font-size: 24px;
  font-weight: 800;
}
.feat p {
  margin: 0;
  color: var(--mute);
  font-size: 14px;
}

/* ---------- lab ---------- */
.lab-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 20px;
  align-items: start;
}
.term,
.code-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #060f1b;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--line);
  background: var(--panel2);
}
.d {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.d.r {
  background: #ff5f57;
}
.d.y {
  background: #febc2e;
}
.d.g {
  background: #28c840;
}
.term-title {
  margin-left: 10px;
  color: var(--mute);
  font-family: var(--mono);
  font-size: 12px;
}
.reset {
  margin-left: auto;
  padding: 3px 10px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: none;
  color: var(--mute);
  font-size: 12px;
}
.reset:hover {
  color: var(--ink);
  border-color: var(--blue);
}
.term-body {
  height: 400px;
  padding: 16px 18px;
  overflow-y: auto;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.7;
}
.ln {
  color: #cfdce8;
  white-space: pre-wrap;
  word-break: break-word;
}
.ln.cmd {
  color: #fff;
}
.ln.muted {
  color: #6e8aa5;
}
.ln.ok {
  color: var(--teal);
}
.ln.bad {
  color: var(--red);
}
.ln.inp {
  display: flex;
  align-items: center;
}
.ln.inp input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #fff;
  font: inherit;
  caret-color: var(--orange);
}
.ln.inp input::placeholder {
  color: #3d566f;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid var(--line);
  background: var(--panel2);
}
.chips button {
  padding: 5px 11px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: transparent;
  color: var(--mute);
  font-family: var(--mono);
  font-size: 11.5px;
  transition: all 0.2s;
}
.chips button:hover:not(:disabled) {
  border-color: var(--orange);
  color: var(--ink);
}
.chips button:disabled {
  opacity: 0.4;
  cursor: wait;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.panel {
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--panel2);
}
.panel h3 {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 22px;
  font-weight: 800;
}
.panel h3 small {
  color: var(--teal);
  font-family: var(--body);
  font-size: 12px;
  font-weight: 500;
}
.missions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.missions li {
  display: flex;
  gap: 10px;
  color: var(--mute);
  font-size: 14px;
  transition: color 0.3s;
}
.missions li code {
  display: block;
  margin-top: 2px;
  font-size: 11.5px;
  color: #5d7a96;
}
.missions li .q-icon {
  margin-top: 2px;
  font-size: 20px;
}
.missions li.done {
  color: var(--ink);
}
.missions li.done .q-icon {
  color: var(--teal);
}
.win {
  margin: 14px 0 0;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(63, 182, 168, 0.14);
  color: var(--teal);
  font-size: 13px;
}

.yard {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  min-height: 40px;
}
.crate {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 12px 10px 16px;
  overflow: hidden;
  border-radius: 4px;
  background: var(--cc);
  background-image: repeating-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.16) 0 2px,
    transparent 2px 9px
  );
  color: #fff;
  transition:
    filter 0.4s,
    opacity 0.4s;
}
.crate.exited {
  filter: grayscale(1) brightness(0.55);
}
.crate strong {
  font-family: var(--display);
  font-size: 20px;
  font-weight: 800;
}
.crate em {
  font-style: normal;
  font-family: var(--mono);
  font-size: 11px;
  opacity: 0.9;
}
.crate small {
  font-size: 11px;
  opacity: 0.85;
}
.led {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #55f08a;
  box-shadow: 0 0 10px #55f08a;
  animation: blip 1.6s infinite;
}
.crate.exited .led {
  background: #777;
  box-shadow: none;
  animation: none;
}
@keyframes blip {
  50% {
    opacity: 0.35;
  }
}
.empty {
  margin: 0;
  color: var(--mute);
  font-size: 13px;
}
.drop-enter-active {
  transition: all 0.55s cubic-bezier(0.3, 1.3, 0.5, 1);
}
.drop-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}
.drop-enter-from {
  opacity: 0;
  transform: translateY(-40px);
}
.drop-leave-to {
  opacity: 0;
  transform: scale(0.85);
}

/* ---------- topics ---------- */
.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.topic {
  display: flex;
  flex-direction: column;
  min-height: 290px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel2);
  cursor: pointer;
  transition:
    border-color 0.25s,
    transform 0.25s,
    box-shadow 0.25s;
}
.topic.is-visible:hover {
  border-color: var(--cc);
  transform: translateY(-6px);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.35);
}
.topic-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: var(--cc);
  color: #fff;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.16) 0 2px,
    transparent 2px 9px
  );
}
.topic-code {
  font-family: var(--mono);
  font-size: 12px;
}
.topic-body {
  flex: 1;
  padding: 20px 20px 8px;
}
.topic-cat {
  color: var(--mute);
  font-size: 13px;
}
.topic-body h3 {
  margin: 6px 0 8px;
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
}
.topic-body p {
  margin: 0;
  color: var(--mute);
  font-size: 14px;
}
.topic-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px 14px 20px;
  color: var(--mute);
  font-size: 13px;
}
.topic-foot .q-icon {
  margin-right: 4px;
}
.go {
  color: var(--ink);
  background: rgba(255, 255, 255, 0.06);
  transition: all 0.25s;
}
.topic:hover .go {
  background: var(--cc);
  transform: translateX(4px);
}

/* ---------- architecture ---------- */
.arch {
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--panel2);
}
.arch-cmd {
  display: inline-block;
  margin-bottom: 24px;
  padding: 8px 14px;
  border-radius: 8px;
  background: #060f1b;
  font-family: var(--mono);
  font-size: 13px;
}
.arch-flow {
  display: flex;
  align-items: center;
}
.node-wrap {
  display: flex;
  align-items: center;
  flex: 1;
}
.node-wrap:last-child {
  flex: 0 0 auto;
}
.node {
  flex: 0 0 210px;
  padding: 20px 16px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel);
  text-align: center;
  transition: all 0.4s;
}
.node .q-icon {
  color: var(--mute);
  transition: color 0.4s;
}
.node h4 {
  margin: 8px 0 2px;
  font-size: 22px;
  font-weight: 800;
}
.node span {
  color: var(--mute);
  font-size: 12px;
}
.node.on {
  border-color: var(--orange);
  background: rgba(242, 107, 45, 0.12);
  box-shadow: 0 0 40px rgba(242, 107, 45, 0.2);
  transform: translateY(-4px);
}
.node.on .q-icon {
  color: var(--orange);
}
.link {
  position: relative;
  flex: 1;
  min-width: 50px;
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--line) 0 8px, transparent 8px 16px);
}
.link i {
  position: absolute;
  top: -4px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--yellow);
  box-shadow: 0 0 12px var(--yellow);
  opacity: 0;
}
.link.live i {
  animation: travel 1.4s ease-in-out infinite;
}
@keyframes travel {
  0% {
    left: 0;
    opacity: 0;
  }
  20%,
  80% {
    opacity: 1;
  }
  100% {
    left: calc(100% - 10px);
    opacity: 0;
  }
}
.life {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
}
.life button {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  height: 100%;
  padding: 12px;
  border: 0;
  border-top: 3px solid var(--line);
  background: transparent;
  text-align: left;
  font-size: 13px;
  color: var(--mute);
  transition: all 0.3s;
}
.life b {
  font-family: var(--display);
  font-size: 22px;
}
.life li.past button {
  border-top-color: var(--blue);
}
.life li.on button {
  border-top-color: var(--orange);
  color: var(--ink);
}
.life-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 14px;
  padding: 16px 18px;
  border-radius: 10px;
  background: var(--panel);
}
.life-text p {
  margin: 0;
  min-height: 52px;
  font-size: 14.5px;
}

/* ---------- dockerfile ---------- */
.df-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}
.code-lines {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  font-family: var(--mono);
  font-size: 14px;
}
.code-lines button {
  display: flex;
  gap: 16px;
  padding: 7px 18px;
  border: 0;
  border-left: 3px solid transparent;
  background: transparent;
  text-align: left;
  font: inherit;
  color: #cfdce8;
  transition: background 0.2s;
}
.code-lines button:hover {
  background: rgba(255, 255, 255, 0.04);
}
.code-lines button.on {
  border-left-color: var(--orange);
  background: rgba(242, 107, 45, 0.1);
}
.code-lines em {
  width: 16px;
  color: #3d566f;
  font-style: normal;
  text-align: right;
}
.kw {
  color: var(--blue);
}
.code-foot {
  padding: 12px 18px;
  border-top: 1px solid var(--line);
  background: var(--panel2);
}
.df-side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.img-stack {
  display: flex;
  flex-direction: column-reverse;
  gap: 3px;
  min-height: 120px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--panel2);
}
.layer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--h);
  padding: 0 16px;
  border: 2px solid transparent;
  border-radius: 4px;
  background: var(--cc);
  color: #fff;
  font-family: var(--mono);
  font-size: 13px;
  opacity: 0.8;
  transition: all 0.3s;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.14) 0 2px,
    transparent 2px 9px
  );
}
.layer.on {
  opacity: 1;
  border-color: #fff;
}
.layer small {
  font-size: 12px;
}
.layer-enter-active {
  transition: all 0.45s cubic-bezier(0.3, 1.3, 0.5, 1);
}
.layer-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}
.info h3 {
  justify-content: flex-start;
  gap: 10px;
}
.info p {
  margin: 0 0 8px;
  color: var(--mute);
  font-size: 14px;
}
.tip {
  color: var(--yellow) !important;
}
.tip .q-icon {
  margin-right: 4px;
}

/* ---------- cheat sheet ---------- */
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}
.tabs button {
  padding: 8px 18px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--mute);
  font-size: 14px;
  transition: all 0.2s;
}
.tabs button.on {
  border-color: var(--orange);
  background: rgba(242, 107, 45, 0.14);
  color: var(--ink);
}
.cheat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.cheat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel2);
  text-align: left;
  transition:
    border-color 0.2s,
    transform 0.2s;
}
.cheat:hover {
  border-color: var(--yellow);
  transform: translateY(-3px);
}
.cheat code {
  font-size: 13px;
  word-break: break-word;
}
.cheat span {
  color: var(--ink);
  font-size: 14px;
}
.cheat small {
  color: var(--mute);
  font-size: 11px;
}

/* ---------- practices ---------- */
.prac-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.prac {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel2);
}
.prac h3 {
  margin-bottom: 12px;
  font-size: 24px;
  font-weight: 800;
}
.prac p {
  display: flex;
  gap: 8px;
  margin: 0 0 8px;
  font-size: 13.5px;
}
.prac .q-icon {
  flex: 0 0 auto;
  margin-top: 3px;
}
.prac .do .q-icon {
  color: var(--teal);
}
.prac .dont {
  color: var(--mute);
}
.prac .dont .q-icon {
  color: var(--red);
}

/* ---------- faq ---------- */
.faq {
  max-width: 860px;
  border-top: 1px solid var(--line);
}
.faq-item {
  border-bottom: 1px solid var(--line);
}
.faq-item > button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  padding: 20px 4px;
  border: 0;
  background: none;
  text-align: left;
  font-size: 17px;
  font-weight: 500;
}
.faq-item .q-icon {
  transition: transform 0.3s;
  color: var(--blue);
}
.faq-item.open .q-icon {
  transform: rotate(180deg);
}
.faq-a {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s ease;
}
.faq-a p {
  min-height: 0;
  margin: 0;
  overflow: hidden;
  color: var(--mute);
  font-size: 15px;
}
.faq-item.open .faq-a {
  grid-template-rows: 1fr;
}
.faq-item.open .faq-a p {
  padding-bottom: 20px;
}

/* ---------- cta ---------- */
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 96px;
  padding: 40px 44px;
  border-radius: 6px;
  background: var(--orange);
  color: #1a0a02;
  background-image: repeating-linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.1) 0 2px,
    transparent 2px 10px
  );
}
.cta h2 {
  font-size: clamp(30px, 4vw, 46px);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 1;
}
.cta p {
  margin: 8px 0 0;
}
.cta .btn-main {
  background: #1a0a02;
  color: #fff;
}

/* ---------- responsive ---------- */
@media (max-width: 1100px) {
  .hero,
  .lab-grid,
  .df-grid {
    grid-template-columns: 1fr;
  }
  .stack-scene {
    max-width: 560px;
  }
  .topic-grid,
  .feat-grid,
  .prac-grid,
  .cheat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 800px) {
  .versus {
    grid-template-columns: 1fr;
  }
  .vs-mid {
    flex-direction: row;
    justify-content: center;
  }
  .arch-flow {
    flex-direction: column;
  }
  .node-wrap {
    flex-direction: column;
    width: 100%;
  }
  .node {
    flex: none;
    width: 100%;
  }
  .link {
    width: 2px;
    height: 40px;
    flex: none;
    background: repeating-linear-gradient(180deg, var(--line) 0 8px, transparent 8px 16px);
  }
  .link i {
    top: 0;
    left: -4px;
  }
  .life {
    grid-template-columns: 1fr;
  }
  .life-text {
    flex-direction: column;
    align-items: flex-start;
  }
  .cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 24px;
  }
}
@media (max-width: 640px) {
  .dk-wrap {
    padding: 20px 16px 60px;
  }
  .block {
    padding-top: 64px;
  }
  .topic-grid,
  .feat-grid,
  .prac-grid,
  .cheat-grid {
    grid-template-columns: 1fr;
  }
  .manifest {
    grid-template-columns: repeat(2, auto);
  }
  .manifest div {
    border-bottom: 1px dashed var(--line);
  }
  .stack-scene {
    grid-template-columns: repeat(2, 1fr);
  }
  .term-body {
    height: 340px;
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
  .reveal,
  .box {
    opacity: 1;
    transform: none;
  }
}
</style>
