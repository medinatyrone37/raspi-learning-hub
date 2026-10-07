<template>
  <q-page class="cyber">
    <div class="wrap">
      <!-- HERO -->
      <section class="hero">
        <div class="hero-grid" aria-hidden="true"></div>

        <div class="hero-copy">
          <nav class="crumbs" aria-label="Breadcrumb">
            <router-link to="/">Raspi Learning Hub</router-link>
            <span>/</span>
            <b>Cybersecurity</b>
          </nav>

          <h1>Cybersecurity <span>Fundamentals</span></h1>

          <p>
            Build a strong foundation in cybersecurity through structured lessons covering security
            concepts, threats, vulnerabilities, protection strategies, and practical security
            thinking.
          </p>

          <ul class="meta">
            <li v-for="item in heroMeta" :key="item.label">
              <q-icon :name="item.icon" size="18px" />
              {{ item.label }}
            </li>
          </ul>

          <div class="hero-actions">
            <q-btn
              unelevated
              no-caps
              class="btn-primary"
              icon="play_arrow"
              label="Start Learning"
              @click="openLearning(1)"
            />
            <q-btn
              outline
              no-caps
              class="btn-ghost"
              label="View Lessons"
              icon-right="arrow_downward"
              @click="scrollToRoadmap"
            />
          </div>
        </div>

        <div class="shield-visual" aria-hidden="true">
          <span class="ring ring-a"></span>
          <span class="ring ring-b"></span>
          <span class="ring ring-c"></span>

          <svg class="links" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line
              v-for="node in orbitNodes"
              :key="node.icon"
              x1="50"
              y1="50"
              :x2="node.x"
              :y2="node.y"
            />
          </svg>

          <div class="shield-core"><q-icon name="shield" size="60px" /></div>

          <div
            v-for="node in orbitNodes"
            :key="node.icon"
            class="orbit-node"
            :style="{ left: `${node.x}%`, top: `${node.y}%` }"
          >
            <q-icon :name="node.icon" size="20px" />
          </div>

          <div class="visual-chip"><span class="dot"></span> ufw · active</div>
        </div>
      </section>

      <!-- STATS -->
      <section class="stats">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </section>

      <!-- OVERVIEW -->
      <section class="section">
        <div class="section-head">
          <div class="label">Course overview</div>
          <h2>Build Your Cybersecurity Foundation</h2>
          <p>
            Understand how modern systems are protected, how attacks happen, and how security teams
            identify, prevent, and respond to threats.
          </p>
        </div>

        <div class="feature-grid">
          <div v-for="card in overviewCards" :key="card.title" class="feature">
            <div class="feature-icon"><q-icon :name="card.icon" size="22px" /></div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </div>
        </div>
      </section>

      <!-- ROADMAP -->
      <section id="roadmap" class="section">
        <div class="section-head">
          <div class="label">Lessons</div>
          <h2>Cybersecurity Learning Roadmap</h2>
          <p>Follow the lessons from foundational concepts to practical cybersecurity knowledge.</p>
        </div>

        <ol class="timeline">
          <li v-for="(lesson, index) in lessons" :key="lesson.id || index" class="t-item">
            <span class="t-dot"></span>

            <div
              class="lesson-card"
              role="button"
              tabindex="0"
              :aria-label="`Open lesson ${index + 1}: ${lesson.title}`"
              @click="openLearning(index + 1)"
              @keydown.enter="openLearning(index + 1)"
              @keydown.space.prevent="openLearning(index + 1)"
            >
              <div class="lesson-head">
                <span class="lesson-num">{{ String(index + 1).padStart(2, '0') }}</span>
                <div class="lesson-icon"><q-icon :name="lessonIcon(lesson)" size="22px" /></div>
              </div>

              <div class="lesson-cat">{{ lesson.category }}</div>
              <h3>{{ lesson.title }}</h3>
              <div v-if="lesson.subtitle" class="lesson-sub">{{ lesson.subtitle }}</div>
              <p v-if="lesson.overview">{{ excerpt(lesson.overview, 120) }}</p>

              <div class="lesson-open">
                Open Lesson
                <q-icon name="arrow_forward" size="18px" />
              </div>
            </div>
          </li>
        </ol>
      </section>

      <!-- FEATURED TOPICS -->
      <section class="section">
        <div class="section-head">
          <div class="label">Topics covered</div>
          <h2>Featured Security Topics</h2>
          <p>Jump straight to the lesson behind each concept.</p>
        </div>

        <div class="group-grid">
          <article v-for="group in topicGroups" :key="group.title" class="group">
            <div class="group-head">
              <div class="group-icon"><q-icon :name="group.icon" size="22px" /></div>
              <h3>{{ group.title }}</h3>
            </div>

            <button
              v-for="item in group.items"
              :key="item.title"
              class="topic-row"
              type="button"
              @click="openLearning(item.to || item.lesson)"
            >
              <span class="topic-text">
                <span class="topic-title">
                  {{ item.title }}
                  <em v-if="item.level" :class="{ critical: item.level === 'CRITICAL' }">{{
                    item.level
                  }}</em>
                </span>
                <span class="topic-desc">{{ item.description }}</span>
              </span>
              <q-icon name="arrow_forward" size="18px" />
            </button>
          </article>
        </div>
      </section>

      <!-- PRACTICAL FLOW -->
      <section class="flow">
        <div class="section-head center">
          <div class="label">Method</div>
          <h2>Learn Cybersecurity Through Practical Concepts</h2>
        </div>

        <div class="flow-grid">
          <div v-for="(step, i) in steps" :key="step.title" class="flow-step">
            <div class="flow-icon"><q-icon :name="step.icon" size="26px" /></div>
            <div class="flow-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </section>

      <!-- SYSTEM SECURITY (dark) -->
      <section class="system">
        <div class="system-grid-bg" aria-hidden="true"></div>

        <div class="system-copy">
          <div class="label light">System security</div>
          <h2>Secure the Operating System</h2>
          <p>
            System security focuses on protecting operating systems, accounts, services, files, and
            system resources from unauthorized access and attacks.
          </p>

          <ul class="points">
            <li v-for="item in systemSecurity" :key="item">
              <q-icon name="check_circle" size="18px" />
              {{ item }}
            </li>
          </ul>

          <q-btn
            unelevated
            no-caps
            class="btn-primary"
            icon="school"
            label="Study System Security"
            @click="openLearning(11)"
          />
        </div>

        <div class="terminal" aria-hidden="true">
          <div class="terminal-bar">
            <span></span><span></span><span></span><em>security check</em>
          </div>
          <div class="terminal-body">
            <div><b>$</b> whoami</div>
            <div class="out">secure-user</div>
            <div><b>$</b> sudo systemctl status ssh</div>
            <div class="out">● ssh.service <i>active</i></div>
            <div><b>$</b> sudo ufw status</div>
            <div class="out">Status: active</div>
          </div>
        </div>

        <div class="raspi">
          <div class="raspi-label">
            <q-icon name="memory" size="20px" /> Securing the Raspberry Pi server
          </div>
          <div class="raspi-tags">
            <button
              v-for="item in raspiSecurity"
              :key="item"
              type="button"
              @click="openLearning(18)"
            >
              <q-icon name="verified_user" size="16px" />
              {{ item }}
            </button>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta">
        <div>
          <h2>Ready to Explore Cybersecurity?</h2>
          <p>
            Start with the fundamentals and build your understanding of the technologies and
            practices used to secure modern systems.
          </p>
        </div>
        <q-btn
          unelevated
          no-caps
          class="btn-primary"
          icon="play_arrow"
          label="Start Learning"
          @click="openLearning(1)"
        />
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="footer-brand">
          <div class="footer-name"><q-icon name="memory" size="20px" /> Raspi Learning Hub</div>
          <p>Practical IT learning, one topic at a time.</p>
        </div>

        <nav class="footer-nav" aria-label="Footer">
          <router-link to="/">Home</router-link>
          <router-link to="/cybersecurity">Cybersecurity</router-link>
          <router-link to="/docker">Docker</router-link>
        </nav>
      </footer>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'

import { cybersecurityLessons as lessons } from '../data/cybersecurity.js'

const router = useRouter()

/* ---------- Navigation (unchanged behavior) ---------- */

const openLearning = async (lesson = 1) => {
  if (typeof lesson === 'string' && lesson.startsWith('/')) {
    try {
      await router.push(lesson)
    } catch (error) {
      console.error('Navigation error:', error)
    }
    return
  }

  const lessonNumber = Number(lesson) || 1

  try {
    await router.push({
      path: '/cybersecurity/learn',
      query: { lesson: String(lessonNumber) },
    })
  } catch (error) {
    console.error('Navigation error:', error)
  }
}

const scrollToRoadmap = () => {
  document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ---------- Helpers ---------- */

const lessonIcon = (lesson) => {
  const icon = lesson.icon
  return typeof icon === 'string' && icon && !icon.includes('fa-') ? icon : 'security'
}

const excerpt = (text, max) => {
  const value = String(text)
  return value.length > max ? `${value.slice(0, max).replace(/\s+\S*$/, '')}…` : value
}

/* ---------- Existing topic data ---------- */

const fundamentals = [
  {
    title: 'CIA Triad',
    lesson: 3,
    description:
      'Confidentiality, Integrity, and Availability form the foundation of information security.',
  },
  {
    title: 'Authentication',
    lesson: 7,
    description: 'Verify the identity of users before allowing access to systems and resources.',
  },
  {
    title: 'Authorization',
    lesson: 7,
    description: 'Determine what authenticated users are allowed to access or perform.',
  },
  {
    title: 'Least Privilege',
    lesson: 7,
    description:
      'Users and services should receive only the permissions required to perform their tasks.',
  },
]

const threats = [
  {
    title: 'Malware',
    level: 'HIGH',
    lesson: 4,
    description:
      'Malicious software designed to damage systems, steal information, or gain unauthorized access.',
  },
  {
    title: 'Phishing',
    level: 'HIGH',
    lesson: 4,
    description:
      'Social engineering attacks that attempt to trick users into revealing sensitive information.',
  },
  {
    title: 'Ransomware',
    level: 'CRITICAL',
    lesson: 4,
    description: 'Malware that encrypts data and demands payment in exchange for restoring access.',
  },
  {
    title: 'Brute Force',
    level: 'HIGH',
    lesson: 4,
    description:
      'An attack that repeatedly attempts different credentials until a valid combination is discovered.',
  },
  {
    title: 'Social Engineering',
    level: 'HIGH',
    lesson: 4,
    description:
      'Manipulating people into revealing information or performing actions that compromise security.',
  },
  {
    title: 'DoS / DDoS',
    level: 'HIGH',
    lesson: 4,
    description:
      'Attempts to overwhelm services or networks so legitimate users cannot access them.',
  },
]

const networkSecurity = [
  {
    title: 'Firewalls',
    lesson: 6,
    description: 'Control network traffic based on predefined security rules.',
  },
  {
    title: 'Network Ports',
    lesson: 6,
    description: 'Understand how services communicate through TCP and UDP ports.',
  },
  {
    title: 'HTTPS & TLS',
    lesson: 10,
    description: 'Protect web communication through encryption and secure transport protocols.',
  },
  {
    title: 'VPN',
    lesson: 5,
    description: 'Create encrypted communication channels across untrusted networks.',
  },
  {
    title: 'Web Security',
    lesson: 10,
    description: 'Protect applications from vulnerabilities such as XSS, CSRF, and SQL injection.',
  },
]

const systemSecurity = [
  'Linux permissions and ownership',
  'SSH access control',
  'System updates and patching',
  'User and group management',
  'Logging and monitoring',
  'Firewall configuration',
]

const raspiSecurity = [
  'SSH Hardening',
  'Firewall',
  'User Permissions',
  'Docker Security',
  'System Updates',
  'Monitoring',
]

const topicGroups = [
  { title: 'Security Fundamentals', icon: 'security', items: fundamentals },
  { title: 'Threats & Attacks', icon: 'bug_report', items: threats },
  { title: 'Network & Web Security', icon: 'lan', items: networkSecurity },
  {
    title: 'Red Team / Blue Team',
    icon: 'security_update_good',
    items: [
      {
        title: 'Red Team / Blue Team Operations',
        description:
          'Explore offensive and defensive security roles, workflows, and collaboration.',
        to: '/redblue',
      },
    ],
  },
]

/* ---------- Page content ---------- */

const heroMeta = [
  { icon: 'school', label: 'Fundamentals' },
  { icon: 'menu_book', label: `${lessons.length} Lessons` },
  { icon: 'science', label: 'Practical Learning' },
  { icon: 'schedule', label: 'Self-Paced' },
]

const orbitNodes = [
  { icon: 'lock', x: 14, y: 28 },
  { icon: 'dns', x: 86, y: 24 },
  { icon: 'lan', x: 84, y: 78 },
  { icon: 'key', x: 16, y: 76 },
]

/* Counts come from the real data, so they stay correct as lessons are added. */
const stats = [
  { value: String(lessons.length), label: 'Lessons' },
  { value: String(topicGroups.length), label: 'Security topic areas' },
  { value: 'Beginner Friendly', label: 'Difficulty' },
  { value: 'Practical', label: 'Learning approach' },
]

const overviewCards = [
  {
    icon: 'security',
    title: 'Security Fundamentals',
    text: 'Understand core security principles, terminology, and defensive concepts.',
  },
  {
    icon: 'bug_report',
    title: 'Threat Awareness',
    text: 'Explore common threats, attack methods, vulnerabilities, and security risks.',
  },
  {
    icon: 'shield',
    title: 'Defensive Practices',
    text: 'Learn how systems, networks, and applications can be protected.',
  },
  {
    icon: 'psychology',
    title: 'Practical Security Thinking',
    text: 'Apply cybersecurity concepts to realistic technical scenarios.',
  },
]

const steps = [
  { icon: 'lightbulb', title: 'Understand', text: 'Learn the core cybersecurity concept.' },
  {
    icon: 'troubleshoot',
    title: 'Analyze',
    text: 'Understand threats, vulnerabilities, and risks.',
  },
  { icon: 'build', title: 'Apply', text: 'Connect the concept to realistic technical scenarios.' },
  {
    icon: 'rocket_launch',
    title: 'Build',
    text: 'Use the knowledge in real-world IT environments.',
  },
]
</script>

<style scoped>
.cyber {
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
  max-width: 1240px;
  margin: 0 auto;
  padding: 32px 32px 0;
}
.section {
  margin-top: 88px;
}
.label {
  color: #059669;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.label.light {
  color: var(--secondary);
}
.section-head {
  max-width: 660px;
  margin-bottom: 40px;
}
.section-head.center {
  text-align: center;
  margin-inline: auto;
}
.section-head h2,
.system h2,
.cta h2 {
  margin: 8px 0 10px;
  font-size: clamp(28px, 3.4vw, 40px);
  line-height: 1.12;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.section-head p {
  margin: 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.65;
}

.btn-primary {
  background: var(--primary);
  color: #fff;
  border-radius: 12px;
  padding: 12px 22px;
  font-weight: 700;
  box-shadow: 0 8px 22px rgba(16, 185, 129, 0.28);
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(16, 185, 129, 0.36);
}
.btn-ghost {
  color: #fff;
  border-radius: 12px;
  padding: 12px 22px;
  font-weight: 700;
  border-color: rgba(255, 255, 255, 0.35);
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.08);
}

/* HERO */
.hero {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: center;
  padding: 64px 56px 88px;
  border-radius: 28px;
  color: #fff;
  background: linear-gradient(135deg, #0b2b26 0%, #0f4a3b 62%, #0d6b53 100%);
  animation: rise 0.6s ease backwards;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}
.hero-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.1;
  background:
    linear-gradient(#fff 1px, transparent 1px) 0 0 / 44px 44px,
    linear-gradient(90deg, #fff 1px, transparent 1px) 0 0 / 44px 44px;
  mask-image: radial-gradient(ellipse at 80% 40%, #000, transparent 70%);
}
.hero-copy {
  position: relative;
}
.crumbs {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--secondary);
}
.crumbs a {
  color: inherit;
  text-decoration: none;
  opacity: 0.85;
}
.crumbs a:hover {
  opacity: 1;
}
.crumbs span {
  opacity: 0.5;
}
.hero h1 {
  margin: 20px 0 16px;
  font-size: clamp(38px, 5.2vw, 64px);
  line-height: 1.04;
  font-weight: 800;
  letter-spacing: -0.04em;
}
.hero h1 span {
  display: block;
  color: var(--secondary);
}
.hero-copy > p {
  max-width: 580px;
  margin: 0;
  color: #c4ddd3;
  font-size: 17px;
  line-height: 1.75;
}
.meta {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 26px 0 0;
  padding: 0;
}
.meta li {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 13px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.06);
  font-size: 13px;
  font-weight: 600;
  color: #e1f3ec;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

/* hero visual: shield + connected nodes */
.shield-visual {
  position: relative;
  width: 100%;
  max-width: 380px;
  aspect-ratio: 1;
  margin: 0 auto;
}
.ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(52, 211, 153, 0.3);
}
.ring-a {
  inset: 0;
}
.ring-b {
  inset: 15%;
  border-color: rgba(52, 211, 153, 0.22);
}
.ring-c {
  inset: 30%;
  background: rgba(52, 211, 153, 0.07);
}
.links {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.links line {
  stroke: rgba(52, 211, 153, 0.35);
  stroke-width: 0.5;
  stroke-dasharray: 2 2;
  vector-effect: non-scaling-stroke;
}
.shield-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 118px;
  height: 118px;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  display: grid;
  place-items: center;
  color: #fff;
  background: linear-gradient(145deg, var(--primary), #059669);
  box-shadow: 0 0 60px rgba(16, 185, 129, 0.4);
}
.orbit-node {
  position: absolute;
  width: 44px;
  height: 44px;
  transform: translate(-50%, -50%);
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: var(--secondary);
  background: #0f3a31;
  border: 1px solid rgba(52, 211, 153, 0.35);
}
.visual-chip {
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff;
  color: var(--ink);
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  white-space: nowrap;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.2);
}

/* STATS */
.stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: -44px 28px 0;
  padding: 8px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid var(--line);
  box-shadow: 0 18px 44px rgba(11, 43, 38, 0.08);
}
.stat {
  padding: 20px 24px;
  border-left: 1px solid var(--line);
}
.stat:first-child {
  border-left: 0;
}
.stat-value {
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.stat-label {
  margin-top: 4px;
  font-size: 14px;
  color: var(--muted);
}

/* OVERVIEW */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.feature {
  padding: 28px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid var(--line);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}
.feature:hover {
  transform: translateY(-4px);
  border-color: #a7e3cb;
  box-shadow: 0 16px 34px rgba(11, 43, 38, 0.07);
}
.feature-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
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

/* ROADMAP TIMELINE */
.timeline {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 88px;
  row-gap: 24px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 8px;
  bottom: 8px;
  width: 2px;
  transform: translateX(-1px);
  background: linear-gradient(#bfe6d6, #bfe6d6 80%, transparent);
}
.t-item {
  position: relative;
}
.t-item:nth-child(even) {
  margin-top: 56px;
}
.t-dot {
  position: absolute;
  top: 30px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 4px solid var(--primary);
  box-shadow: 0 0 0 5px var(--bg);
}
.t-item:nth-child(odd) .t-dot {
  right: -53px;
}
.t-item:nth-child(even) .t-dot {
  left: -53px;
}

.lesson-card {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 26px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid var(--line);
  cursor: pointer;
  outline: none;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
}
.lesson-card:hover,
.lesson-card:focus-visible {
  transform: translateY(-4px);
  border-color: var(--primary);
  box-shadow: 0 18px 38px rgba(11, 43, 38, 0.09);
}
.lesson-card:focus-visible {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.35);
}
.lesson-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.lesson-num {
  font-size: 34px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: #bfe6d6;
  line-height: 1;
  transition: color 0.2s;
}
.lesson-card:hover .lesson-num {
  color: var(--primary);
}
.lesson-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: #ecfdf5;
  color: #059669;
  transition: transform 0.2s;
}
.lesson-card:hover .lesson-icon {
  transform: translateY(-2px) rotate(-4deg);
}
.lesson-cat {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #059669;
}
.lesson-card h3 {
  margin: 6px 0 4px;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.lesson-sub {
  font-size: 14px;
  font-weight: 600;
  color: #3d5650;
}
.lesson-card p {
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.65;
}
.lesson-open {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 18px;
  color: #059669;
  font-size: 14px;
  font-weight: 800;
}
.lesson-open .q-icon {
  transition: transform 0.15s;
}
.lesson-card:hover .lesson-open .q-icon {
  transform: translateX(4px);
}

/* FEATURED TOPICS */
.group-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
}
.group {
  padding: 8px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid var(--line);
}
.group-head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 16px 12px;
}
.group-head h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 800;
}
.group-icon {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: #ecfdf5;
  color: #059669;
}
.topic-row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--ink);
  text-align: left;
  cursor: pointer;
  font: inherit;
  transition: background 0.15s;
}
.topic-row:hover {
  background: #f1faf6;
}
.topic-row .q-icon {
  color: #9db3ac;
  flex-shrink: 0;
  transition:
    transform 0.15s,
    color 0.15s;
}
.topic-row:hover .q-icon {
  color: var(--primary);
  transform: translateX(3px);
}
.topic-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}
.topic-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  font-weight: 700;
}
.topic-title em {
  font-style: normal;
  padding: 2px 8px;
  border-radius: 999px;
  background: #fef2f2;
  color: #dc2626;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.topic-title em.critical {
  background: #dc2626;
  color: #fff;
}
.topic-desc {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

/* PRACTICAL FLOW */
.flow {
  margin: 88px -32px 0;
  padding: 72px 32px;
  background: linear-gradient(180deg, #ecfdf5, #f4fbf8);
  border-block: 1px solid #d3efe3;
}
.flow .section-head,
.flow-grid {
  max-width: 1176px;
  margin-inline: auto;
}
.flow .section-head {
  max-width: 640px;
  margin-bottom: 44px;
}
.flow-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.flow-step {
  position: relative;
  padding: 0 28px;
  text-align: center;
}
.flow-step + .flow-step::before {
  content: '';
  position: absolute;
  left: -2px;
  top: 34px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #86e0bd;
  box-shadow:
    -14px 0 #bfe6d6,
    -28px 0 #bfe6d6,
    14px 0 #bfe6d6,
    28px 0 #bfe6d6;
}
.flow-icon {
  width: 68px;
  height: 68px;
  margin: 0 auto 14px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #fff;
  color: #059669;
  border: 2px solid #a7e3cb;
  box-shadow: 0 10px 24px rgba(16, 185, 129, 0.14);
}
.flow-num {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #059669;
}
.flow-step h3 {
  margin: 4px 0 6px;
  font-size: 20px;
  font-weight: 800;
}
.flow-step p {
  margin: 0;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.6;
}

/* SYSTEM (dark) */
.system {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  margin-top: 88px;
  padding: 56px;
  border-radius: 26px;
  color: #fff;
  background: linear-gradient(135deg, #0b2b26, #0e4a3b);
}
.system-grid-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.07;
  background:
    linear-gradient(#fff 1px, transparent 1px) 0 0 / 40px 40px,
    linear-gradient(90deg, #fff 1px, transparent 1px) 0 0 / 40px 40px;
}
.system-copy,
.terminal,
.raspi {
  position: relative;
}
.system-copy > p {
  max-width: 560px;
  margin: 0;
  color: #b9d8cc;
  line-height: 1.7;
}
.points {
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 20px;
  margin: 26px 0 30px;
  padding: 0;
}
.points li {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #dff3ea;
  font-size: 14.5px;
}
.points .q-icon {
  color: var(--secondary);
  flex-shrink: 0;
}
.terminal {
  border-radius: 16px;
  overflow: hidden;
  background: #06130f;
  border: 1px solid rgba(52, 211, 153, 0.25);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.3);
}
.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 15px;
  background: #0b231c;
}
.terminal-bar span {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #2f5247;
}
.terminal-bar em {
  margin-left: 8px;
  font-style: normal;
  font-size: 11px;
  color: #7fa396;
}
.terminal-body {
  padding: 22px;
  font-family: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  font-size: 13.5px;
  line-height: 2;
  color: #cfe6dc;
}
.terminal-body b {
  color: var(--secondary);
  margin-right: 8px;
}
.terminal-body .out {
  padding-left: 20px;
  color: #7fa396;
}
.terminal-body i {
  font-style: normal;
  color: var(--secondary);
}
.raspi {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px 24px;
  padding-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.raspi-label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}
.raspi-label .q-icon {
  color: var(--secondary);
}
.raspi-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.raspi-tags button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: #e1f3ec;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s;
}
.raspi-tags button:hover {
  background: rgba(52, 211, 153, 0.15);
  border-color: var(--secondary);
}
.raspi-tags .q-icon {
  color: var(--secondary);
}

/* CTA */
.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-top: 56px;
  padding: 44px 48px;
  border-radius: 22px;
  background: linear-gradient(135deg, #ecfdf5, #fff);
  border: 1px solid #b7e8d3;
}
.cta h2 {
  margin-top: 0;
}
.cta p {
  max-width: 580px;
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
}
.cta .btn-primary {
  flex-shrink: 0;
}

/* FOOTER */
.footer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 64px;
  padding: 36px 0 44px;
  border-top: 1px solid var(--line);
}
.footer-name {
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 800;
}
.footer-name .q-icon {
  color: var(--primary);
}
.footer-brand p {
  margin: 8px 0 0;
  color: var(--muted);
}
.footer-nav {
  display: flex;
  gap: 22px;
}
.footer-nav a {
  color: var(--muted);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.15s;
}
.footer-nav a:hover {
  color: var(--primary);
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 48px 36px 80px;
  }
  .shield-visual {
    max-width: 300px;
  }
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .group-grid {
    grid-template-columns: 1fr;
  }
  .flow-grid {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 40px;
  }
  .flow-step + .flow-step::before {
    display: none;
  }
  .system {
    grid-template-columns: 1fr;
    padding: 40px 32px;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
    margin-inline: 16px;
  }
  .stat:nth-child(3) {
    border-left: 0;
  }
}
@media (max-width: 900px) {
  .timeline {
    grid-template-columns: 1fr;
    row-gap: 18px;
  }
  .timeline::before {
    left: 11px;
    transform: none;
  }
  .t-item,
  .t-item:nth-child(even) {
    margin-top: 0;
    padding-left: 44px;
  }
  .t-item .t-dot,
  .t-item:nth-child(odd) .t-dot,
  .t-item:nth-child(even) .t-dot {
    left: 2px;
    right: auto;
    top: 26px;
  }
}
@media (max-width: 640px) {
  .wrap {
    padding: 16px 16px 0;
  }
  .section {
    margin-top: 64px;
  }
  .hero {
    padding: 36px 22px 72px;
    border-radius: 22px;
  }
  .hero-actions .q-btn,
  .cta .q-btn {
    width: 100%;
  }
  .shield-visual {
    max-width: 250px;
  }
  .stats {
    margin: -40px 8px 0;
  }
  .stat {
    padding: 16px;
  }
  .feature-grid,
  .flow-grid {
    grid-template-columns: 1fr;
  }
  .flow {
    margin-inline: -16px;
    padding: 56px 16px;
  }
  .points {
    grid-template-columns: 1fr;
  }
  .system {
    padding: 32px 22px;
  }
  .cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 32px 24px;
  }
  .footer {
    flex-direction: column;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero {
    animation: none;
  }
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
