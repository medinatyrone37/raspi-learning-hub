<template>
  <q-page class="docker-page">
    <!-- animated background -->
    <div class="bg-grid"></div>
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>

    <div class="docker-container">
      <!-- HERO -->
      <section class="docker-hero">
        <div class="hero-content">
          <div class="hero-badge fade-up" style="--d: 0s">
            <span class="pulse-dot"></span>
            <q-icon name="fa-brands fa-docker" />
            DOCKER LEARNING MODULE
          </div>

          <h1 class="fade-up" style="--d: 0.1s">
            Build.
            <span class="gradient-text">Deploy.</span>
            Manage.
          </h1>

          <p class="fade-up" style="--d: 0.2s">
            Explore Docker through interactive lessons covering containers, images, networking,
            storage, commands, and deployment.
          </p>

          <div class="hero-stats fade-up" style="--d: 0.3s">
            <div class="stat-card">
              <strong>{{ lessons.length }}</strong>
              <span>Topics</span>
            </div>

            <div class="stat-card">
              <strong>{{ totalSlides }}</strong>
              <span>Slides</span>
            </div>

            <div class="stat-card">
              <strong>Docker</strong>
              <span>Technology</span>
            </div>
          </div>
        </div>

        <!-- terminal preview -->
        <div class="hero-visual fade-up" style="--d: 0.35s">
          <div class="terminal">
            <div class="terminal-bar">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="terminal-title">bash — docker</span>
            </div>
            <div class="terminal-body">
              <div class="t-line" style="--i: 0">
                <span class="prompt">$</span> docker build -t my-app .
              </div>
              <div class="t-line muted" style="--i: 1">[+] Building 12.4s (9/9) FINISHED</div>
              <div class="t-line" style="--i: 2">
                <span class="prompt">$</span> docker run -d -p 3000:3000 my-app
              </div>
              <div class="t-line muted" style="--i: 3">a3f9c1e7b2d4...</div>
              <div class="t-line" style="--i: 4"><span class="prompt">$</span> docker ps</div>
              <div class="t-line ok" style="--i: 5">
                my-app &nbsp; Up 2 seconds &nbsp; 0.0.0.0:3000-&gt;3000/tcp
              </div>
              <div class="t-line" style="--i: 6">
                <span class="prompt">$</span><span class="cursor"></span>
              </div>
            </div>
          </div>

          <div class="float-chip chip-1">
            <q-icon name="inventory_2" /> Containers
          </div>
          <div class="float-chip chip-2">
            <q-icon name="layers" /> Images
          </div>
          <div class="float-chip chip-3">
            <q-icon name="lan" /> Networking
          </div>
        </div>
      </section>

      <!-- MARQUEE -->
      <section class="marquee reveal">
        <div class="marquee-track">
          <div v-for="(tag, i) in [...ecosystem, ...ecosystem]" :key="i" class="marquee-item">
            <q-icon :name="tag.icon" />
            {{ tag.name }}
          </div>
        </div>
      </section>

      <!-- WHY DOCKER -->
      <section class="why-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-label">WHY DOCKER</div>
            <h2>Why developers choose Docker</h2>
            <p>Package once, run anywhere — consistent from laptop to production.</p>
          </div>
        </div>

        <div class="feature-grid">
          <div
            v-for="(f, i) in features"
            :key="f.title"
            class="feature-card reveal"
            :style="{ '--d': i * 0.08 + 's' }"
          >
            <div class="feature-icon">
              <q-icon :name="f.icon" size="26px" />
            </div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </div>
        </div>
      </section>

      <!-- TOPICS -->
      <section class="topics-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-label">LEARNING TOPICS</div>

            <h2>Docker Fundamentals</h2>

            <p>Select a topic to open its presentation.</p>
          </div>
        </div>

        <div class="topic-grid">
          <q-card
            v-for="(lesson, index) in lessons"
            :key="lesson.id"
            class="topic-card reveal"
            :style="{ '--d': (index % 3) * 0.1 + 's' }"
            flat
            @click="openLesson(lesson.id)"
          >
            <div class="card-glow"></div>

            <q-card-section class="topic-card-top">
              <div class="topic-number">
                {{ String(lesson.id).padStart(2, '0') }}
              </div>

              <div class="topic-icon">
                <q-icon :name="lesson.icon || 'fa-brands fa-docker'" size="28px" />
              </div>
            </q-card-section>

            <q-card-section>
              <div class="topic-category">
                {{ lesson.category }}
              </div>

              <div class="topic-title">
                {{ lesson.title }}
              </div>

              <div class="topic-description">
                {{ lesson.subtitle }}
              </div>
            </q-card-section>

            <q-card-section class="topic-footer">
              <div class="slide-count">
                <q-icon name="slideshow" />
                {{ lesson.slides?.length || 0 }} slides
              </div>

              <q-btn
                flat
                round
                icon="arrow_forward"
                class="open-btn"
                @click.stop="openLesson(lesson.id)"
              />
            </q-card-section>
          </q-card>
        </div>
      </section>

      <!-- ARCHITECTURE -->
      <section class="arch-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-label">ARCHITECTURE</div>
            <h2>How Docker works</h2>
            <p>The client talks to the daemon, which pulls images and runs containers.</p>
          </div>
        </div>

        <div class="arch-flow reveal">
          <div class="arch-node">
            <div class="arch-icon"><q-icon name="terminal" size="30px" /></div>
            <h4>Docker Client</h4>
            <span>docker build / run / pull</span>
          </div>

          <div class="arch-link"><span class="packet"></span></div>

          <div class="arch-node highlight">
            <div class="arch-icon"><q-icon name="memory" size="30px" /></div>
            <h4>Docker Daemon</h4>
            <span>dockerd manages everything</span>
          </div>

          <div class="arch-link"><span class="packet delay"></span></div>

          <div class="arch-node">
            <div class="arch-icon"><q-icon name="cloud_download" size="30px" /></div>
            <h4>Registry</h4>
            <span>Docker Hub · private repos</span>
          </div>
        </div>

        <div class="arch-sub reveal">
          <div class="arch-pill"><q-icon name="layers" /> Images</div>
          <div class="arch-pill"><q-icon name="inventory_2" /> Containers</div>
          <div class="arch-pill"><q-icon name="lan" /> Networks</div>
          <div class="arch-pill"><q-icon name="storage" /> Volumes</div>
        </div>
      </section>

      <!-- WORKFLOW + DOCKERFILE -->
      <section class="workflow-section">
        <div class="workflow-grid">
          <div class="workflow-steps reveal">
            <div class="section-label">WORKFLOW</div>
            <h2>From code to container</h2>

            <div v-for="(s, i) in steps" :key="s.title" class="step">
              <div class="step-num">{{ i + 1 }}</div>
              <div>
                <h4>{{ s.title }}</h4>
                <p>{{ s.text }}</p>
              </div>
            </div>
          </div>

          <div class="code-card reveal" style="--d: 0.15s">
            <div class="terminal-bar">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="terminal-title">Dockerfile</span>
            </div>
            <pre class="code-body"><code><span class="c-kw">FROM</span> node:20-alpine
<span class="c-kw">WORKDIR</span> /app

<span class="c-kw">COPY</span> package*.json ./
<span class="c-kw">RUN</span> npm install

<span class="c-kw">COPY</span> . .
<span class="c-kw">EXPOSE</span> 3000

<span class="c-kw">CMD</span> [<span class="c-str">"npm"</span>, <span class="c-str">"start"</span>]</code></pre>
          </div>
        </div>
      </section>

      <!-- CHEAT SHEET -->
      <section class="cheat-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-label">QUICK REFERENCE</div>
            <h2>Essential Docker commands</h2>
            <p>The commands you will use every day.</p>
          </div>
        </div>

        <div class="cheat-grid">
          <div
            v-for="(c, i) in commands"
            :key="c.cmd"
            class="cheat-card reveal"
            :style="{ '--d': (i % 4) * 0.07 + 's' }"
          >
            <code>{{ c.cmd }}</code>
            <span>{{ c.desc }}</span>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta reveal">
        <div class="cta-text">
          <h2>Ready to start learning?</h2>
          <p>Pick any topic above and go through the slides at your own pace.</p>
        </div>
        <q-btn
          unelevated
          no-caps
          class="cta-btn"
          icon-right="arrow_upward"
          label="Back to topics"
          @click="scrollToTopics"
        />
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { dockerLessons as lessons } from '../data/docker.js'

const router = useRouter()

const totalSlides = computed(() =>
  lessons.reduce((total, lesson) => {
    return total + (lesson.slides?.length || 0)
  }, 0),
)

function openLesson(lessonId) {
  router.push({
    path: '/docker-learning',
    query: {
      lesson: String(lessonId),
    },
  })
}

/* ---------- static content (design only) ---------- */

const ecosystem = [
  { name: 'Docker Engine', icon: 'fa-brands fa-docker' },
  { name: 'Docker Compose', icon: 'account_tree' },
  { name: 'Docker Hub', icon: 'cloud' },
  { name: 'Dockerfile', icon: 'description' },
  { name: 'Volumes', icon: 'storage' },
  { name: 'Networks', icon: 'lan' },
  { name: 'Kubernetes', icon: 'hub' },
  { name: 'Docker Swarm', icon: 'dynamic_feed' },
  { name: 'BuildKit', icon: 'construction' },
  { name: 'CI/CD', icon: 'sync' },
]

const features = [
  {
    icon: 'inventory_2',
    title: 'Containerization',
    text: 'Bundle your app with its dependencies into one lightweight, portable unit.',
  },
  {
    icon: 'bolt',
    title: 'Fast & Lightweight',
    text: 'Containers share the host kernel, so they start in seconds and use fewer resources than VMs.',
  },
  {
    icon: 'devices',
    title: 'Consistent Environments',
    text: 'Eliminate "works on my machine" — dev, staging, and production behave the same.',
  },
  {
    icon: 'trending_up',
    title: 'Easy Scaling',
    text: 'Spin up or tear down containers on demand and scale with Compose or orchestrators.',
  },
  {
    icon: 'security',
    title: 'Isolation & Security',
    text: 'Each container runs in its own isolated space, limiting the impact of failures.',
  },
  {
    icon: 'rocket_launch',
    title: 'CI/CD Ready',
    text: 'Integrates seamlessly with pipelines to build, test, and ship automatically.',
  },
]

const steps = [
  { title: 'Write a Dockerfile', text: 'Describe the base image, dependencies, and start command.' },
  { title: 'Build the image', text: 'Run docker build to create a reusable, layered image.' },
  { title: 'Run a container', text: 'Start an isolated instance of the image with docker run.' },
  { title: 'Push to a registry', text: 'Share your image through Docker Hub or a private registry.' },
  { title: 'Deploy anywhere', text: 'Pull and run the same image on any server or cloud.' },
]

const commands = [
  { cmd: 'docker pull <image>', desc: 'Download an image' },
  { cmd: 'docker build -t name .', desc: 'Build an image' },
  { cmd: 'docker run -d -p 80:80 img', desc: 'Run a container' },
  { cmd: 'docker ps -a', desc: 'List containers' },
  { cmd: 'docker images', desc: 'List images' },
  { cmd: 'docker stop <id>', desc: 'Stop a container' },
  { cmd: 'docker logs -f <id>', desc: 'Follow container logs' },
  { cmd: 'docker exec -it <id> sh', desc: 'Open a shell inside' },
  { cmd: 'docker volume ls', desc: 'List volumes' },
  { cmd: 'docker network ls', desc: 'List networks' },
  { cmd: 'docker compose up -d', desc: 'Start all services' },
  { cmd: 'docker system prune', desc: 'Clean unused data' },
]

function scrollToTopics() {
  document.querySelector('.topics-section')?.scrollIntoView({ behavior: 'smooth' })
}

/* ---------- scroll reveal animation ---------- */

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )

  document.querySelectorAll('.docker-page .reveal').forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.docker-page {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #060f0d;
  color: #f8fafc;
}

/* ---------- BACKGROUND ---------- */

.bg-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%);
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  opacity: 0.5;
}

.orb-1 {
  top: -120px;
  left: -100px;
  width: 460px;
  height: 460px;
  background: rgba(16, 185, 129, 0.25);
  animation: drift 14s ease-in-out infinite;
}

.orb-2 {
  top: 220px;
  right: -140px;
  width: 400px;
  height: 400px;
  background: rgba(14, 165, 233, 0.16);
  animation: drift 18s ease-in-out infinite reverse;
}

@keyframes drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(40px, 50px);
  }
}

.docker-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 28px 80px;
}

/* ---------- ANIMATION HELPERS ---------- */

.fade-up {
  opacity: 0;
  transform: translateY(24px);
  animation: fadeUp 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
  animation-delay: var(--d, 0s);
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition:
    opacity 0.7s ease,
    transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--d, 0s);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ---------- HERO ---------- */

.docker-hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  overflow: hidden;
  padding: 64px 56px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(15, 23, 42, 0.88));
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
}

.docker-hero::after {
  content: '🐳';
  position: absolute;
  right: 40px;
  bottom: -30px;
  font-size: 200px;
  opacity: 0.05;
  animation: float 7s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 14px;
  border: 1px solid rgba(52, 211, 153, 0.25);
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 9px rgba(52, 211, 153, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0);
  }
}

.docker-hero h1 {
  position: relative;
  z-index: 1;
  margin: 22px 0 14px;
  font-size: clamp(48px, 6.5vw, 82px);
  line-height: 0.98;
  font-weight: 900;
  letter-spacing: -3px;
}

.gradient-text {
  background: linear-gradient(90deg, #34d399, #38bdf8, #34d399);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 5s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}

.docker-hero p {
  position: relative;
  z-index: 1;
  max-width: 560px;
  margin: 0;
  color: #a7b8b3;
  font-size: 18px;
  line-height: 1.7;
}

/* STATS */

.hero-stats {
  display: flex;
  gap: 14px;
  margin-top: 36px;
}

.stat-card {
  min-width: 120px;
  padding: 15px 18px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(6px);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(52, 211, 153, 0.4);
}

.stat-card strong {
  display: block;
  color: #f8fafc;
  font-size: 22px;
}

.stat-card span {
  display: block;
  margin-top: 3px;
  color: #84938f;
  font-size: 12px;
}

/* TERMINAL */

.hero-visual {
  position: relative;
  z-index: 1;
}

.terminal,
.code-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 16px;
  background: rgba(3, 10, 9, 0.85);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45);
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.03);
}

.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.red {
  background: #ff5f57;
}
.dot.yellow {
  background: #febc2e;
}
.dot.green {
  background: #28c840;
}

.terminal-title {
  margin-left: 10px;
  color: #6b7c78;
  font-size: 12px;
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}

.terminal-body {
  padding: 20px;
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  font-size: 13px;
  line-height: 1.9;
}

.t-line {
  opacity: 0;
  color: #d1ddd9;
  white-space: nowrap;
  overflow: hidden;
  animation: lineIn 0.5s ease forwards;
  animation-delay: calc(0.8s + var(--i) * 0.55s);
}

.t-line.muted {
  color: #6b7c78;
}
.t-line.ok {
  color: #34d399;
}
.prompt {
  color: #34d399;
  margin-right: 6px;
}

@keyframes lineIn {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 4px;
  vertical-align: middle;
  background: #34d399;
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

/* floating chips */

.float-chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border: 1px solid rgba(52, 211, 153, 0.3);
  border-radius: 999px;
  background: rgba(7, 17, 15, 0.9);
  color: #34d399;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  animation: float 6s ease-in-out infinite;
}

.chip-1 {
  top: -18px;
  right: -10px;
}
.chip-2 {
  bottom: 40px;
  left: -28px;
  animation-delay: -2s;
}
.chip-3 {
  bottom: -18px;
  right: 30px;
  animation-delay: -4s;
}

/* ---------- MARQUEE ---------- */

.marquee {
  margin-top: 28px;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.marquee-track {
  display: flex;
  gap: 14px;
  width: max-content;
  padding: 16px 0;
  animation: scroll 32s linear infinite;
}

.marquee:hover .marquee-track {
  animation-play-state: paused;
}

@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}

.marquee-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 18px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #9fb0ab;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.marquee-item .q-icon {
  color: #34d399;
}

/* ---------- SECTION HEADINGS ---------- */

.why-section,
.topics-section,
.arch-section,
.workflow-section,
.cheat-section {
  padding-top: 90px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 30px;
}

.section-label {
  margin-bottom: 8px;
  color: #34d399;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.section-heading h2,
.workflow-steps h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.section-heading p {
  margin: 8px 0 0;
  color: #84938f;
}

/* ---------- FEATURES ---------- */

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.feature-card {
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    background 0.3s ease,
    opacity 0.7s ease;
}

.feature-card.is-visible:hover {
  transform: translateY(-6px);
  border-color: rgba(52, 211, 153, 0.35);
  background: rgba(16, 185, 129, 0.05);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  margin-bottom: 18px;
  border-radius: 14px;
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: rotate(-8deg) scale(1.1);
}

.feature-card h3 {
  margin: 0 0 8px;
  font-size: 19px;
  font-weight: 700;
}

.feature-card p {
  margin: 0;
  color: #8fa09b;
  font-size: 14px;
  line-height: 1.65;
}

/* ---------- TOPIC GRID ---------- */

.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.topic-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 285px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018));
  color: #f8fafc;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.7s ease;
}

.topic-card.is-visible:hover {
  transform: translateY(-8px);
  border-color: rgba(52, 211, 153, 0.45);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.3);
}

.card-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.25);
  filter: blur(60px);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.topic-card:hover .card-glow {
  opacity: 1;
}

.topic-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0;
}

.topic-number {
  color: rgba(255, 255, 255, 0.25);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
}

.topic-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.topic-card:hover .topic-icon {
  transform: scale(1.1) rotate(-6deg);
  background: rgba(16, 185, 129, 0.2);
}

.topic-category {
  margin-bottom: 9px;
  color: #34d399;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.topic-title {
  margin-bottom: 10px;
  font-size: 23px;
  font-weight: 800;
  line-height: 1.15;
}

.topic-description {
  min-height: 54px;
  color: #94a3a0;
  font-size: 14px;
  line-height: 1.6;
}

.topic-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.slide-count {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #7d8b87;
  font-size: 12px;
}

.open-btn {
  color: #34d399;
  background: rgba(16, 185, 129, 0.08);
  transition:
    transform 0.3s ease,
    background 0.3s ease;
}

.topic-card:hover .open-btn {
  background: #10b981;
  color: #04120e;
  transform: translateX(4px);
}

/* ---------- ARCHITECTURE ---------- */

.arch-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 44px 24px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.025);
}

.arch-node {
  flex: 0 0 230px;
  padding: 26px 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.04);
}

.arch-node.highlight {
  border-color: rgba(52, 211, 153, 0.45);
  background: rgba(16, 185, 129, 0.09);
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.15);
  animation: glow 3s ease-in-out infinite;
}

@keyframes glow {
  50% {
    box-shadow: 0 0 60px rgba(16, 185, 129, 0.3);
  }
}

.arch-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin-bottom: 14px;
  border-radius: 16px;
  background: rgba(16, 185, 129, 0.14);
  color: #34d399;
}

.arch-node h4 {
  margin: 0 0 6px;
  font-size: 17px;
  font-weight: 700;
}

.arch-node span {
  color: #84938f;
  font-size: 12px;
}

.arch-link {
  position: relative;
  flex: 1;
  min-width: 60px;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    rgba(52, 211, 153, 0.4) 0 8px,
    transparent 8px 16px
  );
}

.packet {
  position: absolute;
  top: -4px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #34d399;
  box-shadow: 0 0 12px #34d399;
  animation: travel 2.4s ease-in-out infinite;
}

.packet.delay {
  animation-delay: 1.2s;
}

@keyframes travel {
  0% {
    left: 0;
    opacity: 0;
  }
  15%,
  85% {
    opacity: 1;
  }
  100% {
    left: calc(100% - 10px);
    opacity: 0;
  }
}

.arch-sub {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.arch-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #b4c3be;
  font-size: 13px;
  font-weight: 600;
}

.arch-pill .q-icon {
  color: #34d399;
}

/* ---------- WORKFLOW ---------- */

.workflow-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.step {
  position: relative;
  display: flex;
  gap: 18px;
  padding-top: 26px;
}

.step:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 60px;
  bottom: -26px;
  left: 17px;
  width: 2px;
  background: linear-gradient(rgba(52, 211, 153, 0.5), rgba(52, 211, 153, 0.05));
}

.step-num {
  flex: 0 0 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(52, 211, 153, 0.4);
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
  font-size: 14px;
  font-weight: 800;
}

.step h4 {
  margin: 0 0 4px;
  font-size: 17px;
  font-weight: 700;
}

.step p {
  margin: 0;
  color: #84938f;
  font-size: 14px;
  line-height: 1.6;
}

.code-body {
  margin: 0;
  padding: 24px;
  color: #d1ddd9;
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  font-size: 14px;
  line-height: 1.9;
  overflow-x: auto;
}

.c-kw {
  color: #34d399;
  font-weight: 700;
}
.c-str {
  color: #fbbf77;
}

/* ---------- CHEAT SHEET ---------- */

.cheat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.cheat-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    opacity 0.7s ease;
}

.cheat-card.is-visible:hover {
  transform: translateY(-4px);
  border-color: rgba(52, 211, 153, 0.4);
}

.cheat-card code {
  color: #34d399;
  font-family: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  font-size: 12.5px;
  word-break: break-word;
}

.cheat-card span {
  color: #84938f;
  font-size: 13px;
}

/* ---------- CTA ---------- */

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 90px;
  padding: 40px 48px;
  border: 1px solid rgba(52, 211, 153, 0.25);
  border-radius: 24px;
  background: linear-gradient(120deg, rgba(16, 185, 129, 0.18), rgba(14, 165, 233, 0.08));
}

.cta h2 {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 800;
}

.cta p {
  margin: 0;
  color: #9fb0ab;
}

.cta-btn {
  padding: 12px 26px;
  border-radius: 12px;
  background: #10b981;
  color: #04120e;
  font-weight: 700;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(16, 185, 129, 0.4);
}

/* ---------- RESPONSIVE ---------- */

@media (max-width: 1100px) {
  .docker-hero {
    grid-template-columns: 1fr;
  }

  .hero-visual {
    max-width: 560px;
  }

  .topic-grid,
  .feature-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cheat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .workflow-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 800px) {
  .arch-flow {
    flex-direction: column;
    gap: 0;
  }

  .arch-node {
    flex: none;
    width: 100%;
  }

  .arch-link {
    width: 2px;
    height: 50px;
    flex: none;
    background: repeating-linear-gradient(
      180deg,
      rgba(52, 211, 153, 0.4) 0 8px,
      transparent 8px 16px
    );
  }

  .packet {
    top: 0;
    left: -4px;
    animation-name: travelY;
  }

  @keyframes travelY {
    0% {
      top: 0;
      opacity: 0;
    }
    15%,
    85% {
      opacity: 1;
    }
    100% {
      top: calc(100% - 10px);
      opacity: 0;
    }
  }

  .cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 30px 26px;
  }
}

@media (max-width: 700px) {
  .docker-container {
    padding: 20px 16px 50px;
  }

  .docker-hero {
    padding: 32px 22px;
  }

  .docker-hero h1 {
    font-size: 52px;
    letter-spacing: -2px;
  }

  .hero-stats {
    flex-wrap: wrap;
  }

  .float-chip {
    display: none;
  }

  .topic-grid,
  .feature-grid,
  .cheat-grid {
    grid-template-columns: 1fr;
  }

  .why-section,
  .topics-section,
  .arch-section,
  .workflow-section,
  .cheat-section {
    padding-top: 60px;
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
  .fade-up,
  .t-line {
    opacity: 1;
    transform: none;
  }
}
</style>