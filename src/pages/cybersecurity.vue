<template>
  <q-page class="cyber">
    <!-- animated background -->
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="bg-orb orb-1" aria-hidden="true"></div>
    <div class="bg-orb orb-2" aria-hidden="true"></div>

    <div class="wrap">
      <!-- HERO -->
      <section class="hero">
        <div class="hero-grid" aria-hidden="true"></div>

        <div class="hero-copy">
          <nav class="crumbs fade-up" style="--d: 0s" aria-label="Breadcrumb">
            <router-link to="/">Raspi Learning Hub</router-link>
            <span>/</span>
            <b>Cybersecurity</b>
          </nav>

          <h1 class="fade-up" style="--d: 0.1s">
            Cybersecurity <span class="gradient-text">Fundamentals</span>
          </h1>

          <p class="fade-up" style="--d: 0.2s">
            Build a strong foundation in cybersecurity through structured lessons covering security
            concepts, threats, vulnerabilities, protection strategies, and practical security
            thinking.
          </p>

          <ul class="meta fade-up" style="--d: 0.3s">
            <li v-for="item in heroMeta" :key="item.label">
              <q-icon :name="item.icon" size="18px" />
              {{ item.label }}
            </li>
          </ul>

          <div class="hero-actions fade-up" style="--d: 0.4s">
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

        <div class="shield-visual fade-up" style="--d: 0.3s" aria-hidden="true">
          <span class="ring ring-a"></span>
          <span class="ring ring-b"></span>
          <span class="ring ring-c"></span>
          <span class="radar"></span>

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
            v-for="(node, i) in orbitNodes"
            :key="node.icon"
            class="orbit-node"
            :style="{ left: `${node.x}%`, top: `${node.y}%`, '--i': i }"
          >
            <q-icon :name="node.icon" size="20px" />
          </div>

          <div class="visual-chip"><span class="dot"></span> ufw · active</div>
        </div>
      </section>

      <!-- STATS -->
      <section class="stats reveal">
        <div v-for="stat in stats" :key="stat.label" class="stat">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </section>

      <!-- MARQUEE: tools -->
      <section class="marquee reveal">
        <div class="marquee-track">
          <div v-for="(tool, i) in [...securityTools, ...securityTools]" :key="i" class="marquee-item">
            <q-icon :name="tool.icon" />
            {{ tool.name }}
          </div>
        </div>
      </section>

      <!-- OVERVIEW -->
      <section class="section">
        <div class="section-head reveal">
          <div class="label">Course overview</div>
          <h2>Build Your Cybersecurity Foundation</h2>
          <p>
            Understand how modern systems are protected, how attacks happen, and how security teams
            identify, prevent, and respond to threats.
          </p>
        </div>

        <div class="feature-grid">
          <div
            v-for="(card, i) in overviewCards"
            :key="card.title"
            class="feature reveal"
            :style="{ '--d': i * 0.08 + 's' }"
          >
            <div class="feature-icon"><q-icon :name="card.icon" size="22px" /></div>
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </div>
        </div>
      </section>

      <!-- ROADMAP -->
      <section id="roadmap" class="section">
        <div class="section-head reveal">
          <div class="label">Lessons</div>
          <h2>Cybersecurity Learning Roadmap</h2>
          <p>Follow the lessons from foundational concepts to practical cybersecurity knowledge.</p>
        </div>

        <ol class="timeline">
          <li v-for="(lesson, index) in lessons" :key="lesson.id || index" class="t-item reveal">
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
              <div class="card-glow"></div>

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
        <div class="section-head reveal">
          <div class="label">Topics covered</div>
          <h2>Featured Security Topics</h2>
          <p>Jump straight to the lesson behind each concept.</p>
        </div>

        <div class="group-grid">
          <article
            v-for="(group, gi) in topicGroups"
            :key="group.title"
            class="group reveal"
            :style="{ '--d': (gi % 3) * 0.1 + 's' }"
          >
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

      <!-- DEFENSE IN DEPTH -->
      <section class="section">
        <div class="section-head reveal">
          <div class="label">Defense in depth</div>
          <h2>Security works in layers</h2>
          <p>No single control is enough. Strong security stacks multiple defenses together.</p>
        </div>

        <div class="layers">
          <div
            v-for="(layer, i) in defenseLayers"
            :key="layer.title"
            class="layer reveal"
            :style="{ '--d': i * 0.08 + 's', '--w': layer.width }"
          >
            <div class="layer-bar">
              <div class="layer-icon"><q-icon :name="layer.icon" size="22px" /></div>
              <div class="layer-text">
                <h4>{{ layer.title }}</h4>
                <span>{{ layer.text }}</span>
              </div>
              <div class="layer-tag">{{ layer.examples }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ATTACK CHAIN -->
      <section class="section">
        <div class="section-head reveal">
          <div class="label">Know the attacker</div>
          <h2>Anatomy of a cyber attack</h2>
          <p>Understanding each stage helps defenders detect and stop attacks earlier.</p>
        </div>

        <div class="chain reveal">
          <div class="chain-line"><span class="chain-pulse"></span></div>
          <div v-for="(stage, i) in attackStages" :key="stage.title" class="chain-step">
            <div class="chain-node">
              <q-icon :name="stage.icon" size="22px" />
            </div>
            <div class="chain-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h4>{{ stage.title }}</h4>
            <p>{{ stage.text }}</p>
          </div>
        </div>
      </section>

      <!-- OWASP -->
      <section class="section">
        <div class="section-head reveal">
          <div class="label">Web application security</div>
          <h2>OWASP Top 10 risks</h2>
          <p>The most critical web application security risks every developer should know.</p>
        </div>

        <div class="owasp-grid">
          <div
            v-for="(risk, i) in owasp"
            :key="risk.code"
            class="owasp-card reveal"
            :style="{ '--d': (i % 5) * 0.06 + 's' }"
          >
            <span class="owasp-code">{{ risk.code }}</span>
            <h4>{{ risk.title }}</h4>
            <p>{{ risk.text }}</p>
          </div>
        </div>
      </section>

      <!-- PRACTICAL FLOW -->
      <section class="flow">
        <div class="section-head center reveal">
          <div class="label">Method</div>
          <h2>Learn Cybersecurity Through Practical Concepts</h2>
        </div>

        <div class="flow-grid">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="flow-step reveal"
            :style="{ '--d': i * 0.1 + 's' }"
          >
            <div class="flow-icon"><q-icon :name="step.icon" size="26px" /></div>
            <div class="flow-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </section>

      <!-- SYSTEM SECURITY -->
      <section class="system reveal">
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
            <div class="t-line" style="--i: 0"><b>$</b> whoami</div>
            <div class="t-line out" style="--i: 1">secure-user</div>
            <div class="t-line" style="--i: 2"><b>$</b> sudo systemctl status ssh</div>
            <div class="t-line out" style="--i: 3">● ssh.service <i>active</i></div>
            <div class="t-line" style="--i: 4"><b>$</b> sudo ufw status</div>
            <div class="t-line out" style="--i: 5">Status: active</div>
            <div class="t-line" style="--i: 6"><b>$</b><span class="cursor"></span></div>
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

      <!-- BEST PRACTICES -->
      <section class="section">
        <div class="section-head reveal">
          <div class="label">Good habits</div>
          <h2>Everyday security checklist</h2>
          <p>Simple practices that dramatically reduce your risk.</p>
        </div>

        <div class="check-grid">
          <div
            v-for="(item, i) in bestPractices"
            :key="item.title"
            class="check-card reveal"
            :style="{ '--d': (i % 4) * 0.07 + 's' }"
          >
            <div class="check-icon"><q-icon :name="item.icon" size="22px" /></div>
            <div>
              <h4>{{ item.title }}</h4>
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta reveal">
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
import { onMounted, onBeforeUnmount } from 'vue'
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

/* ---------- Extra content (design only) ---------- */

const securityTools = [
  { name: 'Nmap', icon: 'radar' },
  { name: 'Wireshark', icon: 'network_check' },
  { name: 'Burp Suite', icon: 'bug_report' },
  { name: 'Metasploit', icon: 'terminal' },
  { name: 'Wazuh', icon: 'visibility' },
  { name: 'Fail2ban', icon: 'block' },
  { name: 'Snort IDS', icon: 'policy' },
  { name: 'OpenVAS', icon: 'manage_search' },
  { name: 'UFW Firewall', icon: 'local_fire_department' },
  { name: 'Lynis', icon: 'fact_check' },
  { name: 'OpenSSH', icon: 'vpn_key' },
  { name: 'WireGuard VPN', icon: 'vpn_lock' },
]

const defenseLayers = [
  {
    icon: 'groups',
    title: 'People & Awareness',
    text: 'Users are the first and last line of defense.',
    examples: 'Training · Phishing drills',
    width: '100%',
  },
  {
    icon: 'apartment',
    title: 'Physical Security',
    text: 'Control physical access to devices and servers.',
    examples: 'Locks · Badges · CCTV',
    width: '94%',
  },
  {
    icon: 'lan',
    title: 'Network Security',
    text: 'Filter, segment, and monitor network traffic.',
    examples: 'Firewall · VPN · IDS/IPS',
    width: '88%',
  },
  {
    icon: 'computer',
    title: 'Host / System Security',
    text: 'Harden operating systems and running services.',
    examples: 'Patching · SSH · Permissions',
    width: '82%',
  },
  {
    icon: 'web',
    title: 'Application Security',
    text: 'Write and deploy code that resists attacks.',
    examples: 'Input validation · HTTPS · Auth',
    width: '76%',
  },
  {
    icon: 'storage',
    title: 'Data Security',
    text: 'Protect information at rest and in transit.',
    examples: 'Encryption · Backups · Hashing',
    width: '70%',
  },
]

const attackStages = [
  {
    icon: 'travel_explore',
    title: 'Reconnaissance',
    text: 'Gathering information about the target.',
  },
  {
    icon: 'key',
    title: 'Initial Access',
    text: 'Finding a way in through a weakness or a user.',
  },
  {
    icon: 'trending_up',
    title: 'Privilege Escalation',
    text: 'Gaining higher permissions on the system.',
  },
  {
    icon: 'swap_horiz',
    title: 'Lateral Movement',
    text: 'Spreading to other systems in the network.',
  },
  {
    icon: 'cloud_upload',
    title: 'Impact',
    text: 'Data theft, encryption, or service disruption.',
  },
]

const owasp = [
  { code: 'A01', title: 'Broken Access Control', text: 'Users act outside their intended permissions.' },
  { code: 'A02', title: 'Cryptographic Failures', text: 'Sensitive data is poorly protected.' },
  { code: 'A03', title: 'Injection', text: 'Untrusted input is run as commands or queries.' },
  { code: 'A04', title: 'Insecure Design', text: 'Missing security thinking in the design phase.' },
  { code: 'A05', title: 'Security Misconfiguration', text: 'Unsafe defaults and exposed settings.' },
  { code: 'A06', title: 'Vulnerable Components', text: 'Using outdated or unpatched libraries.' },
  { code: 'A07', title: 'Authentication Failures', text: 'Weak login, session, or identity handling.' },
  { code: 'A08', title: 'Integrity Failures', text: 'Untrusted updates, plugins, or pipelines.' },
  { code: 'A09', title: 'Logging & Monitoring', text: 'Attacks go unnoticed without proper logs.' },
  { code: 'A10', title: 'SSRF', text: 'The server is tricked into making unsafe requests.' },
]

const bestPractices = [
  {
    icon: 'password',
    title: 'Strong, unique passwords',
    text: 'Use a password manager and never reuse passwords.',
  },
  {
    icon: 'phonelink_lock',
    title: 'Enable MFA',
    text: 'A second factor blocks most account takeovers.',
  },
  {
    icon: 'system_update',
    title: 'Keep software updated',
    text: 'Patches close vulnerabilities attackers rely on.',
  },
  {
    icon: 'backup',
    title: 'Back up your data',
    text: 'Follow 3-2-1: three copies, two media, one offsite.',
  },
  {
    icon: 'admin_panel_settings',
    title: 'Apply least privilege',
    text: 'Grant only the access that is truly needed.',
  },
  {
    icon: 'enhanced_encryption',
    title: 'Encrypt sensitive data',
    text: 'Protect data in storage and while it travels.',
  },
  {
    icon: 'mark_email_unread',
    title: 'Think before you click',
    text: 'Verify links, senders, and attachments first.',
  },
  {
    icon: 'monitoring',
    title: 'Monitor and review logs',
    text: 'Detect suspicious activity early.',
  },
]

/* ---------- Scroll reveal animation ---------- */

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

  document.querySelectorAll('.cyber .reveal').forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.cyber {
  --primary: #10b981;
  --secondary: #34d399;
  --bg: #060f0d;
  --panel: rgba(255, 255, 255, 0.035);
  --panel-hover: rgba(16, 185, 129, 0.06);
  --ink: #f1f7f5;
  --muted: #8fa39d;
  --line: rgba(255, 255, 255, 0.08);
  --mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  position: relative;
  overflow-x: hidden;
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
  top: 260px;
  right: -140px;
  width: 400px;
  height: 400px;
  background: rgba(14, 165, 233, 0.14);
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

.wrap {
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 0 auto;
  padding: 32px 32px 0;
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

/* ---------- SHARED ---------- */

.section {
  margin-top: 96px;
}
.label {
  color: var(--secondary);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
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
  color: #04120e;
  border-radius: 12px;
  padding: 12px 22px;
  font-weight: 700;
  box-shadow: 0 8px 26px rgba(16, 185, 129, 0.3);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 34px rgba(16, 185, 129, 0.45);
}
.btn-ghost {
  color: #fff;
  border-radius: 12px;
  padding: 12px 22px;
  font-weight: 700;
  border-color: rgba(255, 255, 255, 0.3);
}
.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.08);
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

/* ---------- HERO ---------- */

.hero {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 32px;
  align-items: center;
  padding: 64px 56px 92px;
  border-radius: 28px;
  border: 1px solid var(--line);
  color: #fff;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(10, 24, 21, 0.92));
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
}
.hero-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
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
.hero h1 .gradient-text {
  display: block;
}
.hero-copy > p {
  max-width: 580px;
  margin: 0;
  color: #b5cdc4;
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
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  font-size: 13px;
  font-weight: 600;
  color: #e1f3ec;
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.meta li:hover {
  transform: translateY(-2px);
  border-color: rgba(52, 211, 153, 0.5);
}
.meta .q-icon {
  color: var(--secondary);
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

/* shield visual */
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
  animation: ringPulse 4s ease-in-out infinite;
}
.ring-b {
  inset: 15%;
  border-color: rgba(52, 211, 153, 0.22);
  animation: ringPulse 4s ease-in-out infinite 1s;
}
.ring-c {
  inset: 30%;
  background: rgba(52, 211, 153, 0.07);
}
@keyframes ringPulse {
  50% {
    transform: scale(1.04);
    border-color: rgba(52, 211, 153, 0.55);
  }
}

.radar {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(52, 211, 153, 0.35), transparent 28%);
  mask-image: radial-gradient(circle, transparent 28%, #000 29%);
  -webkit-mask-image: radial-gradient(circle, transparent 28%, #000 29%);
  animation: spin 5s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.links {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.links line {
  stroke: rgba(52, 211, 153, 0.4);
  stroke-width: 0.5;
  stroke-dasharray: 2 2;
  vector-effect: non-scaling-stroke;
  animation: dash 1.6s linear infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: -8;
  }
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
  color: #04120e;
  background: linear-gradient(145deg, #34d399, #10b981);
  box-shadow: 0 0 60px rgba(16, 185, 129, 0.45);
  animation: corePulse 3s ease-in-out infinite;
}
@keyframes corePulse {
  50% {
    box-shadow: 0 0 90px rgba(16, 185, 129, 0.7);
  }
}

.orbit-node {
  position: absolute;
  width: 44px;
  height: 44px;
  margin: -22px 0 0 -22px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: var(--secondary);
  background: #0b2a23;
  border: 1px solid rgba(52, 211, 153, 0.4);
  animation: bob 5s ease-in-out infinite;
  animation-delay: calc(var(--i) * -1.2s);
}
@keyframes bob {
  50% {
    transform: translateY(-8px);
  }
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
  color: #0b2b26;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.35);
  white-space: nowrap;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.5);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  70% {
    box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

/* ---------- STATS ---------- */

.stats {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: -46px 28px 0;
  padding: 8px;
  border-radius: 20px;
  background: rgba(10, 24, 21, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid var(--line);
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.45);
}
.stat {
  padding: 20px 24px;
  border-left: 1px solid var(--line);
}
.stat:first-child {
  border-left: 0;
}
.stat-value {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--secondary);
}
.stat-label {
  margin-top: 4px;
  font-size: 14px;
  color: var(--muted);
}

/* ---------- MARQUEE ---------- */

.marquee {
  margin-top: 48px;
  overflow: hidden;
  border-block: 1px solid var(--line);
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.marquee-track {
  display: flex;
  gap: 14px;
  width: max-content;
  padding: 16px 0;
  animation: scroll 36s linear infinite;
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
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--panel);
  color: #a9bbb5;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}
.marquee-item .q-icon {
  color: var(--secondary);
}

/* ---------- OVERVIEW ---------- */

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.feature {
  padding: 28px;
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--line);
  transition:
    transform 0.3s,
    border-color 0.3s,
    background 0.3s,
    opacity 0.7s ease;
}
.feature.is-visible:hover {
  transform: translateY(-6px);
  border-color: rgba(52, 211, 153, 0.4);
  background: var(--panel-hover);
}
.feature-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  background: rgba(16, 185, 129, 0.12);
  color: var(--secondary);
  transition: transform 0.3s;
}
.feature:hover .feature-icon {
  transform: rotate(-8deg) scale(1.1);
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

/* ---------- ROADMAP TIMELINE ---------- */

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
  background: linear-gradient(rgba(52, 211, 153, 0.5), rgba(52, 211, 153, 0.5) 80%, transparent);
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
  background: var(--bg);
  border: 4px solid var(--primary);
  box-shadow:
    0 0 0 5px var(--bg),
    0 0 16px rgba(16, 185, 129, 0.6);
  animation: pulse 2.4s infinite;
}
.t-item:nth-child(odd) .t-dot {
  right: -53px;
}
.t-item:nth-child(even) .t-dot {
  left: -53px;
}

.lesson-card {
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 26px;
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018));
  border: 1px solid var(--line);
  cursor: pointer;
  outline: none;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    border-color 0.3s;
}
.lesson-card:hover,
.lesson-card:focus-visible {
  transform: translateY(-6px);
  border-color: rgba(52, 211, 153, 0.5);
  box-shadow: 0 20px 44px rgba(0, 0, 0, 0.35);
}
.lesson-card:focus-visible {
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.45);
}
.card-glow {
  position: absolute;
  top: -60px;
  right: -60px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.28);
  filter: blur(60px);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.lesson-card:hover .card-glow {
  opacity: 1;
}
.lesson-head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.lesson-num {
  font-family: var(--mono);
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: rgba(255, 255, 255, 0.18);
  line-height: 1;
  transition: color 0.3s;
}
.lesson-card:hover .lesson-num {
  color: var(--secondary);
}
.lesson-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(16, 185, 129, 0.12);
  color: var(--secondary);
  transition: transform 0.3s;
}
.lesson-card:hover .lesson-icon {
  transform: translateY(-2px) rotate(-6deg) scale(1.08);
}
.lesson-cat {
  position: relative;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--secondary);
}
.lesson-card h3 {
  position: relative;
  margin: 6px 0 4px;
  font-size: 20px;
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.01em;
}
.lesson-sub {
  position: relative;
  font-size: 14px;
  font-weight: 600;
  color: #b4c9c1;
}
.lesson-card p {
  position: relative;
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.65;
}
.lesson-open {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 18px;
  color: var(--secondary);
  font-size: 14px;
  font-weight: 800;
}
.lesson-open .q-icon {
  transition: transform 0.2s;
}
.lesson-card:hover .lesson-open .q-icon {
  transform: translateX(5px);
}

/* ---------- FEATURED TOPICS ---------- */

.group-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: start;
}
.group {
  padding: 8px;
  border-radius: 20px;
  background: var(--panel);
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
  background: rgba(16, 185, 129, 0.12);
  color: var(--secondary);
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
  transition: background 0.2s;
}
.topic-row:hover {
  background: rgba(16, 185, 129, 0.08);
}
.topic-row .q-icon {
  color: #5f766f;
  flex-shrink: 0;
  transition:
    transform 0.2s,
    color 0.2s;
}
.topic-row:hover .q-icon {
  color: var(--secondary);
  transform: translateX(4px);
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
  background: rgba(248, 113, 113, 0.14);
  color: #f87171;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
}
.topic-title em.critical {
  background: #ef4444;
  color: #fff;
  animation: blinkCrit 2s ease-in-out infinite;
}
@keyframes blinkCrit {
  50% {
    box-shadow: 0 0 14px rgba(239, 68, 68, 0.7);
  }
}
.topic-desc {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

/* ---------- DEFENSE IN DEPTH ---------- */

.layers {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.layer {
  width: var(--w, 100%);
}
.layer-bar {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 22px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: linear-gradient(90deg, rgba(16, 185, 129, 0.13), rgba(255, 255, 255, 0.02));
  transition:
    transform 0.3s,
    border-color 0.3s;
}
.layer-bar::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -40%;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.12), transparent);
  transform: skewX(-20deg);
  animation: sweep 6s ease-in-out infinite;
}
@keyframes sweep {
  0%,
  60% {
    left: -40%;
  }
  100% {
    left: 130%;
  }
}
.layer-bar:hover {
  transform: scale(1.015);
  border-color: rgba(52, 211, 153, 0.5);
}
.layer-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(16, 185, 129, 0.16);
  color: var(--secondary);
}
.layer-text {
  flex: 1;
  min-width: 0;
}
.layer-text h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 800;
}
.layer-text span {
  color: var(--muted);
  font-size: 13.5px;
}
.layer-tag {
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(52, 211, 153, 0.25);
  background: rgba(16, 185, 129, 0.08);
  color: var(--secondary);
  font-family: var(--mono);
  font-size: 11.5px;
  white-space: nowrap;
}

/* ---------- ATTACK CHAIN ---------- */

.chain {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 44px 24px 36px;
  border-radius: 24px;
  border: 1px solid var(--line);
  background: var(--panel);
}
.chain-line {
  position: absolute;
  top: 66px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    rgba(52, 211, 153, 0.35) 0 8px,
    transparent 8px 16px
  );
}
.chain-pulse {
  position: absolute;
  top: -4px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #f87171;
  box-shadow: 0 0 14px #f87171;
  animation: travel 4s ease-in-out infinite;
}
@keyframes travel {
  0% {
    left: 0;
    opacity: 0;
  }
  10%,
  90% {
    opacity: 1;
  }
  100% {
    left: calc(100% - 10px);
    opacity: 0;
  }
}
.chain-step {
  position: relative;
  text-align: center;
  padding: 0 6px;
}
.chain-node {
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #0b2a23;
  color: var(--secondary);
  border: 2px solid rgba(52, 211, 153, 0.45);
  transition:
    transform 0.3s,
    background 0.3s;
}
.chain-step:hover .chain-node {
  transform: scale(1.12);
  background: var(--primary);
  color: #04120e;
}
.chain-step:last-child .chain-node {
  border-color: rgba(248, 113, 113, 0.6);
  color: #f87171;
}
.chain-num {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--secondary);
  letter-spacing: 0.1em;
}
.chain-step h4 {
  margin: 4px 0 6px;
  font-size: 16px;
  font-weight: 800;
}
.chain-step p {
  margin: 0;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.55;
}

/* ---------- OWASP ---------- */

.owasp-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
}
.owasp-card {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: var(--panel);
  transition:
    transform 0.3s,
    border-color 0.3s,
    opacity 0.7s ease;
}
.owasp-card.is-visible:hover {
  transform: translateY(-5px);
  border-color: rgba(52, 211, 153, 0.45);
}
.owasp-code {
  display: inline-block;
  padding: 3px 9px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: rgba(16, 185, 129, 0.14);
  color: var(--secondary);
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 700;
}
.owasp-card h4 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.3;
}
.owasp-card p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

/* ---------- PRACTICAL FLOW ---------- */

.flow {
  margin: 96px -32px 0;
  padding: 72px 32px;
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.07), rgba(16, 185, 129, 0.02));
  border-block: 1px solid var(--line);
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
  background: var(--secondary);
  box-shadow:
    -14px 0 rgba(52, 211, 153, 0.4),
    -28px 0 rgba(52, 211, 153, 0.4),
    14px 0 rgba(52, 211, 153, 0.4),
    28px 0 rgba(52, 211, 153, 0.4);
}
.flow-icon {
  width: 68px;
  height: 68px;
  margin: 0 auto 14px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #0b2a23;
  color: var(--secondary);
  border: 2px solid rgba(52, 211, 153, 0.4);
  box-shadow: 0 10px 28px rgba(16, 185, 129, 0.18);
  transition: transform 0.3s;
}
.flow-step:hover .flow-icon {
  transform: translateY(-4px) scale(1.06);
}
.flow-num {
  font-family: var(--mono);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--secondary);
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

/* ---------- SYSTEM ---------- */

.system {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  margin-top: 96px;
  padding: 56px;
  border-radius: 26px;
  border: 1px solid rgba(52, 211, 153, 0.2);
  color: #fff;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(8, 20, 17, 0.95));
}
.system-grid-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.06;
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
  color: #b0cfc3;
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
  background: #040c0a;
  border: 1px solid rgba(52, 211, 153, 0.25);
  box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45);
}
.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 15px;
  background: #0a1f19;
}
.terminal-bar span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #2f5247;
}
.terminal-bar span:nth-child(1) {
  background: #ff5f57;
}
.terminal-bar span:nth-child(2) {
  background: #febc2e;
}
.terminal-bar span:nth-child(3) {
  background: #28c840;
}
.terminal-bar em {
  margin-left: 8px;
  font-style: normal;
  font-size: 11px;
  color: #7fa396;
}
.terminal-body {
  padding: 22px;
  font-family: var(--mono);
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
.t-line {
  opacity: 0;
  animation: lineIn 0.5s ease forwards;
  animation-delay: calc(0.4s + var(--i) * 0.55s);
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
  margin-left: 2px;
  vertical-align: middle;
  background: var(--secondary);
  animation: blink 1s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
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
    background 0.2s,
    border-color 0.2s,
    transform 0.2s;
}
.raspi-tags button:hover {
  background: rgba(52, 211, 153, 0.16);
  border-color: var(--secondary);
  transform: translateY(-2px);
}
.raspi-tags .q-icon {
  color: var(--secondary);
}

/* ---------- BEST PRACTICES ---------- */

.check-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.check-card {
  display: flex;
  gap: 14px;
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--line);
  background: var(--panel);
  transition:
    transform 0.3s,
    border-color 0.3s,
    opacity 0.7s ease;
}
.check-card.is-visible:hover {
  transform: translateY(-5px);
  border-color: rgba(52, 211, 153, 0.45);
}
.check-icon {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: rgba(16, 185, 129, 0.12);
  color: var(--secondary);
}
.check-card h4 {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 800;
}
.check-card p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.55;
}

/* ---------- CTA ---------- */

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin-top: 96px;
  padding: 44px 48px;
  border-radius: 22px;
  background: linear-gradient(120deg, rgba(16, 185, 129, 0.2), rgba(14, 165, 233, 0.08));
  border: 1px solid rgba(52, 211, 153, 0.28);
}
.cta h2 {
  margin-top: 0;
}
.cta p {
  max-width: 580px;
  margin: 0;
  color: #a9c3ba;
  line-height: 1.7;
}
.cta .btn-primary {
  flex-shrink: 0;
}

/* ---------- FOOTER ---------- */

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
  color: var(--secondary);
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
  transition: color 0.2s;
}
.footer-nav a:hover {
  color: var(--secondary);
}

/* ---------- RESPONSIVE ---------- */

@media (max-width: 1100px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 48px 36px 84px;
  }
  .shield-visual {
    max-width: 300px;
  }
  .feature-grid,
  .check-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .owasp-grid {
    grid-template-columns: repeat(3, 1fr);
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
  .chain {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 32px;
  }
  .chain-line {
    display: none;
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
  .layer {
    width: 100%;
  }
  .layer-tag {
    display: none;
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
  .flow-grid,
  .check-grid,
  .owasp-grid,
  .chain {
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