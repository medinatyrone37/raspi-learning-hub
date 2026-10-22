<template>
  <q-page class="redblue-page">
    <!-- animated background -->
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="bg-orb orb-red" aria-hidden="true"></div>
    <div class="bg-orb orb-blue" aria-hidden="true"></div>

    <div class="redblue-shell">
      <!-- HERO -->
      <section class="hero-section">
        <div class="hero-copy">
          <div class="eyebrow fade-up" style="--d: 0s">
            <span class="dot red"></span>
            CYBERSECURITY MODULE
            <span class="divider"></span>
            <span class="dot blue"></span>
          </div>

          <h1 class="fade-up" style="--d: 0.1s">
            <em class="t-red">Red Team</em>
            <span>vs</span>
            <em class="t-blue">Blue Team</em>
          </h1>

          <p class="fade-up" style="--d: 0.2s">
            Learn how offensive and defensive security teams work together to identify weaknesses,
            detect threats, and strengthen cybersecurity defenses.
          </p>

          <div class="hero-actions fade-up" style="--d: 0.3s">
            <q-btn
              unelevated
              no-caps
              class="start-btn"
              label="Start Learning"
              icon="play_arrow"
              @click="startLearning"
            />

            <div class="lesson-count">
              <q-icon name="menu_book" />
              {{ lessons.length }} Lessons
            </div>
          </div>

          <div class="hero-chips fade-up" style="--d: 0.4s">
            <span class="chip chip-red"><q-icon name="flash_on" /> Attack simulation</span>
            <span class="chip chip-purple"><q-icon name="sync" /> Purple collaboration</span>
            <span class="chip chip-blue"><q-icon name="shield" /> Threat defense</span>
          </div>
        </div>

        <!-- BATTLEFIELD -->
        <div class="battle-visual fade-up" style="--d: 0.25s" aria-hidden="true">
          <div class="rb-bg-grid"></div>
          <div class="rb-scanline"></div>

          <!-- HUD -->
          <div class="rb-hud">
            <div class="rb-hud-left">
              <span class="rb-online-dot"></span>
              <div>
                <strong>CYBER BATTLEFIELD</strong>
                <small>RED TEAM / BLUE TEAM OPERATIONS</small>
              </div>
            </div>

            <div class="rb-hud-center">
              <span>NETWORK</span>
              <strong>10.24.0.0/16</strong>
            </div>

            <div class="rb-hud-right">
              <span class="rb-live-dot"></span>
              LIVE
            </div>
          </div>

          <!-- ARENA -->
          <div class="rb-arena">
            <!-- RED CONSOLE -->
            <div class="rb-console rb-red-console">
              <div class="rb-console-header">
                <span><i class="rb-red-dot"></i> RED TEAM</span>
                <small>ATTACK OPS</small>
              </div>

              <div class="rb-console-main">
                <div class="rb-console-icon"><q-icon name="swords" /></div>
                <div class="rb-console-title">
                  OFFENSIVE
                  <span>OPERATIONS</span>
                </div>
              </div>

              <div class="rb-console-status">
                <span class="status-dot"></span>
                SIMULATION ACTIVE
              </div>

              <div class="rb-terminal">
                <div class="log" style="--i: 0">
                  <span class="terminal-time">13:04:21</span>
                  <b class="terminal-red">SCAN</b>
                  <span>target discovery</span>
                </div>
                <div class="log" style="--i: 1">
                  <span class="terminal-time">13:04:24</span>
                  <b class="terminal-red">ENUM</b>
                  <span>service mapping</span>
                </div>
                <div class="log" style="--i: 2">
                  <span class="terminal-time">13:04:27</span>
                  <b class="terminal-red">TEST</b>
                  <span>security control</span>
                </div>
              </div>

              <div class="rb-console-metrics">
                <div><strong>04</strong><span>HOSTS</span></div>
                <div><strong>12</strong><span>EVENTS</span></div>
                <div><strong>03</strong><span>PATHS</span></div>
              </div>
            </div>

            <!-- RED LINK -->
            <div class="rb-link rb-link-red"><span class="packet"></span></div>

            <!-- CORE -->
            <div class="rb-core">
              <div class="core-label">
                <span class="core-ping"></span>
                PROTECTED INFRASTRUCTURE
              </div>

              <div class="core-shield">
                <div class="shield-ring shield-ring-1"></div>
                <div class="shield-ring shield-ring-2"></div>
                <div class="shield-ring shield-ring-3"></div>
                <div class="core-lock"><q-icon name="security" /></div>
              </div>

              <strong>CORE SYSTEM</strong>
              <small>DEFENSE PERIMETER ACTIVE</small>

              <div class="core-health">
                <span></span><span></span><span></span><span></span><span></span>
                <b>SECURE</b>
              </div>

              <div class="rb-assets">
                <div class="rb-asset"><q-icon name="dns" /> WEB</div>
                <div class="rb-asset"><q-icon name="storage" /> DB</div>
                <div class="rb-asset"><q-icon name="api" /> API</div>
                <div class="rb-asset"><q-icon name="devices" /> HOST</div>
              </div>
            </div>

            <!-- BLUE LINK -->
            <div class="rb-link rb-link-blue"><span class="packet"></span></div>

            <!-- BLUE CONSOLE -->
            <div class="rb-console rb-blue-console">
              <div class="rb-console-header">
                <span><i class="rb-blue-dot"></i> BLUE TEAM</span>
                <small>SOC MONITOR</small>
              </div>

              <div class="rb-console-main">
                <div class="rb-console-icon"><q-icon name="shield" /></div>
                <div class="rb-console-title">
                  DEFENSIVE
                  <span>OPERATIONS</span>
                </div>
              </div>

              <div class="rb-console-status">
                <span class="status-dot blue-active"></span>
                MONITORING ACTIVE
              </div>

              <div class="rb-terminal">
                <div class="log" style="--i: 0">
                  <span class="terminal-time">13:04:22</span>
                  <b class="terminal-blue">SIEM</b>
                  <span>event received</span>
                </div>
                <div class="log" style="--i: 1">
                  <span class="terminal-time">13:04:25</span>
                  <b class="terminal-blue">IDS</b>
                  <span>anomaly detected</span>
                </div>
                <div class="log" style="--i: 2">
                  <span class="terminal-time">13:04:28</span>
                  <b class="terminal-blue">SOC</b>
                  <span>response initiated</span>
                </div>
              </div>

              <div class="rb-console-metrics">
                <div><strong>08</strong><span>ALERTS</span></div>
                <div><strong>24</strong><span>LOGS/S</span></div>
                <div><strong>99%</strong><span>UPTIME</span></div>
              </div>
            </div>
          </div>

          <!-- FLOW + PURPLE -->
          <div class="rb-flowbar">
            <div class="flow-item flow-red"><q-icon name="flash_on" /> ATTACK</div>
            <span class="flow-arrow">→</span>
            <div class="flow-item flow-purple"><q-icon name="radar" /> DETECT</div>
            <span class="flow-arrow">→</span>
            <div class="flow-item flow-blue"><q-icon name="shield" /> RESPOND</div>
          </div>

          <div class="rb-alert">
            <div class="alert-icon"><q-icon name="warning" /></div>
            <div class="alert-copy">
              <strong>THREAT ACTIVITY DETECTED</strong>
              <span>Authorized Red Team simulation</span>
            </div>
            <div class="alert-level">
              <small>LEVEL</small>
              <strong>MED</strong>
            </div>
          </div>

          <!-- TELEMETRY -->
          <div class="rb-telemetry">
            <div class="telemetry-card">
              <div class="telemetry-card-icon telemetry-red"><q-icon name="bolt" /></div>
              <div>
                <small>RED ACTIVITY</small>
                <strong>03 ACTIVE PATHS</strong>
              </div>
              <span class="telemetry-bar red-bar"><i></i></span>
            </div>

            <div class="telemetry-card">
              <div class="telemetry-card-icon telemetry-purple"><q-icon name="radar" /></div>
              <div>
                <small>THREAT DETECTION</small>
                <strong>08 EVENTS</strong>
              </div>
              <span class="telemetry-bar purple-bar"><i></i></span>
            </div>

            <div class="telemetry-card">
              <div class="telemetry-card-icon telemetry-blue"><q-icon name="shield" /></div>
              <div>
                <small>BLUE RESPONSE</small>
                <strong>DEFENSE ACTIVE</strong>
              </div>
              <span class="telemetry-bar blue-bar"><i></i></span>
            </div>
          </div>

          <div class="rb-footer-status">
            <span><i></i> SYSTEM ONLINE</span>
            <span><q-icon name="lock" /> PROTECTED PERIMETER</span>
            <span><q-icon name="sync" /> CONTINUOUS DEFENSE</span>
            <span>13:04:29 UTC</span>
          </div>
        </div>
      </section>

      <!-- MARQUEE -->
      <section class="marquee reveal">
        <div class="marquee-track">
          <div
            v-for="(tool, i) in [...toolTicker, ...toolTicker]"
            :key="i"
            class="marquee-item"
            :class="tool.team"
          >
            <q-icon :name="tool.icon" />
            {{ tool.name }}
          </div>
        </div>
      </section>

      <!-- LEARNING PATH -->
      <section class="module-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-kicker">LEARNING PATH</div>
            <h2>What you'll learn</h2>
          </div>

          <span>{{ lessons.length }} lessons</span>
        </div>

        <div class="lesson-grid">
          <button
            v-for="(lesson, index) in lessons"
            :key="lesson.id"
            class="lesson-card reveal"
            :style="{ '--d': (index % 2) * 0.08 + 's' }"
            type="button"
            @click="openLesson(lesson.id)"
          >
            <div class="card-glow"></div>

            <div class="lesson-number">
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <div class="lesson-icon">
              <q-icon :name="getIcon(lesson.category)" />
            </div>

            <div class="lesson-info">
              <span>{{ lesson.category }}</span>
              <h3>{{ lesson.title }}</h3>
              <p>{{ lesson.subtitle }}</p>
            </div>

            <q-icon name="arrow_forward" class="arrow" />
          </button>
        </div>
      </section>

      <!-- ROLES -->
      <section class="roles-section">
        <div class="role-card red-role reveal">
          <div class="role-top">
            <span class="role-badge">01</span>
            <q-icon name="swords" />
          </div>

          <h2>Red Team</h2>

          <p>
            Simulates attacker behavior to identify weaknesses and test whether security controls
            can withstand realistic threats.
          </p>

          <div class="role-tags">
            <span>OFFENSIVE</span>
            <span>SIMULATION</span>
            <span>ASSESSMENT</span>
          </div>
        </div>

        <div class="role-card blue-role reveal" style="--d: 0.1s">
          <div class="role-top">
            <span class="role-badge">02</span>
            <q-icon name="security" />
          </div>

          <h2>Blue Team</h2>

          <p>
            Monitors, detects, investigates, and responds to security events while continuously
            improving defensive controls.
          </p>

          <div class="role-tags">
            <span>DEFENSIVE</span>
            <span>DETECTION</span>
            <span>RESPONSE</span>
          </div>
        </div>
      </section>

      <!-- PURPLE TEAM LOOP -->
      <section class="module-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-kicker purple">PURPLE TEAM</div>
            <h2>Better together: the feedback loop</h2>
            <p class="section-sub">
              Purple teaming connects offense and defense so every simulated attack makes the
              organization stronger.
            </p>
          </div>
        </div>

        <div class="loop reveal">
          <div class="loop-line"><span class="loop-pulse"></span></div>
          <div v-for="(step, i) in purpleLoop" :key="step.title" class="loop-step">
            <div class="loop-node" :class="step.team">
              <q-icon :name="step.icon" size="24px" />
            </div>
            <div class="loop-num">{{ String(i + 1).padStart(2, '0') }}</div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.text }}</p>
          </div>
        </div>
      </section>

      <!-- COMPARISON -->
      <section class="module-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-kicker">SIDE BY SIDE</div>
            <h2>Red Team vs Blue Team</h2>
          </div>
        </div>

        <div class="compare reveal">
          <div class="compare-head">
            <div></div>
            <div class="ch-red"><q-icon name="swords" /> Red Team</div>
            <div class="ch-blue"><q-icon name="security" /> Blue Team</div>
          </div>

          <div v-for="row in comparison" :key="row.label" class="compare-row">
            <div class="compare-label">{{ row.label }}</div>
            <div class="compare-red">{{ row.red }}</div>
            <div class="compare-blue">{{ row.blue }}</div>
          </div>
        </div>
      </section>

      <!-- ATT&CK TACTICS -->
      <section class="module-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-kicker">ATTACK &amp; DEFENSE</div>
            <h2>Every attack stage has a defense</h2>
            <p class="section-sub">
              How offensive techniques map to the detection and prevention that stops them.
            </p>
          </div>
        </div>

        <div class="tactic-list">
          <div
            v-for="(t, i) in tactics"
            :key="t.stage"
            class="tactic reveal"
            :style="{ '--d': (i % 3) * 0.07 + 's' }"
          >
            <div class="tactic-stage">
              <span class="tactic-num">{{ String(i + 1).padStart(2, '0') }}</span>
              {{ t.stage }}
            </div>

            <div class="tactic-side tactic-red">
              <small>RED TEAM</small>
              {{ t.red }}
            </div>

            <q-icon name="sync_alt" class="tactic-swap" />

            <div class="tactic-side tactic-blue">
              <small>BLUE TEAM</small>
              {{ t.blue }}
            </div>
          </div>
        </div>
      </section>

      <!-- TOOLS -->
      <section class="module-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-kicker">TOOLKIT</div>
            <h2>Tools of the trade</h2>
          </div>
        </div>

        <div class="tool-grid">
          <div class="tool-col red-col reveal">
            <h3><q-icon name="swords" /> Offensive tools</h3>
            <ul>
              <li v-for="tool in redTools" :key="tool.name">
                <q-icon :name="tool.icon" />
                <div>
                  <strong>{{ tool.name }}</strong>
                  <span>{{ tool.text }}</span>
                </div>
              </li>
            </ul>
          </div>

          <div class="tool-col blue-col reveal" style="--d: 0.1s">
            <h3><q-icon name="security" /> Defensive tools</h3>
            <ul>
              <li v-for="tool in blueTools" :key="tool.name">
                <q-icon :name="tool.icon" />
                <div>
                  <strong>{{ tool.name }}</strong>
                  <span>{{ tool.text }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CAREERS -->
      <section class="module-section">
        <div class="section-heading reveal">
          <div>
            <div class="section-kicker">CAREER PATHS</div>
            <h2>Where this knowledge leads</h2>
          </div>
        </div>

        <div class="career-grid">
          <div
            v-for="(c, i) in careers"
            :key="c.title"
            class="career-card reveal"
            :class="c.team"
            :style="{ '--d': (i % 4) * 0.07 + 's' }"
          >
            <div class="career-icon"><q-icon :name="c.icon" size="22px" /></div>
            <h4>{{ c.title }}</h4>
            <p>{{ c.text }}</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta reveal">
        <div>
          <h2>Ready to see both sides of security?</h2>
          <p>
            Start the module and learn how attackers think and how defenders respond, step by step.
          </p>
        </div>

        <q-btn
          unelevated
          no-caps
          class="start-btn"
          label="Start Learning"
          icon="play_arrow"
          @click="startLearning"
        />
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { redBlueLessons as lessons } from '../data/redblue.js'

const router = useRouter()

function startLearning() {
  router.push({
    path: '/redblue-learning',
    query: {
      lesson: '1',
    },
  })
}

function openLesson(id) {
  router.push({
    path: '/redblue-learning',
    query: {
      lesson: String(id),
    },
  })
}

function getIcon(category) {
  if (category === 'Red Team') {
    return 'swords'
  }

  if (category === 'Blue Team') {
    return 'security'
  }

  if (category === 'Purple Team') {
    return 'join_full'
  }

  return 'hub'
}

/* ---------- Extra content (design only) ---------- */

const toolTicker = [
  { name: 'Nmap', icon: 'radar', team: 'red' },
  { name: 'Wazuh SIEM', icon: 'visibility', team: 'blue' },
  { name: 'Metasploit', icon: 'terminal', team: 'red' },
  { name: 'Snort IDS', icon: 'policy', team: 'blue' },
  { name: 'Burp Suite', icon: 'bug_report', team: 'red' },
  { name: 'Wireshark', icon: 'network_check', team: 'blue' },
  { name: 'MITRE ATT&CK', icon: 'grid_view', team: 'purple' },
  { name: 'Fail2ban', icon: 'block', team: 'blue' },
  { name: 'Phishing Simulation', icon: 'phishing', team: 'red' },
  { name: 'Incident Response', icon: 'emergency', team: 'blue' },
  { name: 'Threat Hunting', icon: 'manage_search', team: 'purple' },
  { name: 'Log Analysis', icon: 'receipt_long', team: 'blue' },
]

const purpleLoop = [
  {
    icon: 'flash_on',
    team: 'red',
    title: 'Simulate',
    text: 'Red team runs an authorized attack scenario.',
  },
  {
    icon: 'radar',
    team: 'purple',
    title: 'Detect',
    text: 'Blue team monitors and looks for the activity.',
  },
  {
    icon: 'forum',
    team: 'purple',
    title: 'Share',
    text: 'Both teams review what was seen and missed.',
  },
  {
    icon: 'build',
    team: 'blue',
    title: 'Improve',
    text: 'Detections and controls are tuned and fixed.',
  },
  {
    icon: 'replay',
    team: 'purple',
    title: 'Repeat',
    text: 'The exercise is run again to verify progress.',
  },
]

const comparison = [
  {
    label: 'Mindset',
    red: 'Think like an attacker',
    blue: 'Think like a defender',
  },
  {
    label: 'Main goal',
    red: 'Find and prove weaknesses',
    blue: 'Prevent, detect, and respond',
  },
  {
    label: 'Typical work',
    red: 'Penetration tests, adversary simulation',
    blue: 'Monitoring, triage, incident response',
  },
  {
    label: 'Success looks like',
    red: 'Weaknesses found before real attackers do',
    blue: 'Attacks detected and contained quickly',
  },
  {
    label: 'Output',
    red: 'Findings and remediation advice',
    blue: 'Detections, playbooks, hardened systems',
  },
]

const tactics = [
  {
    stage: 'Reconnaissance',
    red: 'Map exposed hosts and services',
    blue: 'Reduce exposure, monitor scan activity',
  },
  {
    stage: 'Initial Access',
    red: 'Test phishing and weak entry points',
    blue: 'Email filtering, MFA, user awareness',
  },
  {
    stage: 'Execution',
    red: 'Run payloads in a controlled test',
    blue: 'Endpoint protection and allow-listing',
  },
  {
    stage: 'Privilege Escalation',
    red: 'Check for excess permissions',
    blue: 'Least privilege and patching',
  },
  {
    stage: 'Lateral Movement',
    red: 'Move between systems in scope',
    blue: 'Network segmentation and anomaly alerts',
  },
  {
    stage: 'Exfiltration',
    red: 'Simulate data leaving the network',
    blue: 'Traffic monitoring and DLP controls',
  },
]

const redTools = [
  { icon: 'radar', name: 'Nmap', text: 'Network and service discovery' },
  { icon: 'terminal', name: 'Metasploit', text: 'Exploitation framework for testing' },
  { icon: 'bug_report', name: 'Burp Suite', text: 'Web application security testing' },
  { icon: 'phishing', name: 'Phishing simulations', text: 'Measure user awareness' },
]

const blueTools = [
  { icon: 'visibility', name: 'SIEM (Wazuh)', text: 'Collect and correlate security logs' },
  { icon: 'policy', name: 'IDS / IPS (Snort)', text: 'Detect and block suspicious traffic' },
  { icon: 'network_check', name: 'Wireshark', text: 'Inspect and analyze network packets' },
  { icon: 'block', name: 'Fail2ban / Firewall', text: 'Automatically block hostile sources' },
]

const careers = [
  {
    icon: 'swords',
    team: 'red',
    title: 'Penetration Tester',
    text: 'Ethically test systems and applications for weaknesses.',
  },
  {
    icon: 'psychology',
    team: 'red',
    title: 'Red Team Operator',
    text: 'Run realistic adversary simulations against organizations.',
  },
  {
    icon: 'monitor_heart',
    team: 'blue',
    title: 'SOC Analyst',
    text: 'Monitor alerts and investigate suspicious activity.',
  },
  {
    icon: 'emergency',
    team: 'blue',
    title: 'Incident Responder',
    text: 'Contain and recover from active security incidents.',
  },
  {
    icon: 'manage_search',
    team: 'purple',
    title: 'Threat Hunter',
    text: 'Proactively search for hidden threats in the environment.',
  },
  {
    icon: 'engineering',
    team: 'blue',
    title: 'Security Engineer',
    text: 'Design and build secure systems and detections.',
  },
  {
    icon: 'join_full',
    team: 'purple',
    title: 'Purple Team Lead',
    text: 'Coordinate offense and defense to improve security.',
  },
  {
    icon: 'verified',
    team: 'purple',
    title: 'Security Consultant',
    text: 'Advise organizations on risk and improvement.',
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

  document.querySelectorAll('.redblue-page .reveal').forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.redblue-page {
  --red: #ef4444;
  --red-soft: #f87171;
  --blue: #3b82f6;
  --blue-soft: #60a5fa;
  --purple: #a855f7;
  --purple-soft: #c084fc;
  --green: #10b981;
  --ink: #f1f5f9;
  --muted: #8d9db0;
  --line: rgba(148, 163, 184, 0.14);
  --panel: rgba(255, 255, 255, 0.03);
  --mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #060d12;
  color: var(--ink);
}

/* ---------- BACKGROUND ---------- */

.bg-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse at 50% 0%, #000 20%, transparent 75%);
}

.bg-orb {
  position: absolute;
  width: 440px;
  height: 440px;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}
.orb-red {
  top: -80px;
  left: -140px;
  background: rgba(239, 68, 68, 0.2);
  animation: drift 15s ease-in-out infinite;
}
.orb-blue {
  top: 120px;
  right: -140px;
  background: rgba(59, 130, 246, 0.22);
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

.redblue-shell {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 64px 6% 90px;
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

@keyframes pulseDot {
  70% {
    box-shadow: 0 0 0 8px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

/* ---------- HERO ---------- */

.hero-section {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 56px;
  align-items: center;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.2em;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}
.dot.red {
  background: var(--red);
  box-shadow: 0 0 14px rgba(239, 68, 68, 0.8);
}
.dot.blue {
  background: var(--blue);
  box-shadow: 0 0 14px rgba(59, 130, 246, 0.8);
}
.divider {
  width: 35px;
  height: 1px;
  background: #334155;
}

.hero-copy h1 {
  margin: 22px 0;
  font-size: clamp(46px, 5.6vw, 84px);
  line-height: 0.98;
  letter-spacing: -0.05em;
  font-weight: 900;
}
.hero-copy h1 em {
  display: block;
  font-style: normal;
}
.t-red {
  background: linear-gradient(90deg, #f87171, #ef4444, #fb923c);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.t-blue {
  background: linear-gradient(90deg, #60a5fa, #3b82f6, #22d3ee);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.hero-copy h1 span {
  display: block;
  margin: 10px 0;
  color: #64748b;
  font-size: 0.34em;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-weight: 800;
}

.hero-copy p {
  max-width: 560px;
  color: #9fb0c3;
  font-size: 18px;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 32px;
}

.start-btn {
  min-height: 52px;
  padding: 0 26px;
  border-radius: 12px;
  background: var(--green);
  color: #03120d;
  font-weight: 900;
  box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.start-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 38px rgba(16, 185, 129, 0.45);
}

.lesson-count {
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.hero-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 28px;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--line);
  font-size: 12px;
  font-weight: 700;
  transition: transform 0.2s;
}
.chip:hover {
  transform: translateY(-2px);
}
.chip-red {
  color: var(--red-soft);
  background: rgba(239, 68, 68, 0.08);
  border-color: rgba(239, 68, 68, 0.25);
}
.chip-purple {
  color: var(--purple-soft);
  background: rgba(168, 85, 247, 0.08);
  border-color: rgba(168, 85, 247, 0.25);
}
.chip-blue {
  color: var(--blue-soft);
  background: rgba(59, 130, 246, 0.08);
  border-color: rgba(59, 130, 246, 0.25);
}

/* ---------- BATTLE VISUAL ---------- */

.battle-visual {
  position: relative;
  padding: 20px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 26px;
  background:
    radial-gradient(circle at 12% 45%, rgba(239, 68, 68, 0.14), transparent 28%),
    radial-gradient(circle at 88% 45%, rgba(59, 130, 246, 0.16), transparent 28%),
    radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1), transparent 30%), #050a0f;
  box-shadow:
    inset 0 0 90px rgba(0, 0, 0, 0.5),
    0 30px 90px rgba(0, 0, 0, 0.35);
}

.rb-bg-grid {
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.045) 1px, transparent 1px);
  background-size: 28px 28px;
}

.rb-scanline {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: -25%;
  height: 25%;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.08), transparent);
  animation: rb-scan 7s linear infinite;
}
@keyframes rb-scan {
  to {
    transform: translateY(520%);
  }
}

/* HUD */
.rb-hud {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--line);
}
.rb-hud-left,
.rb-hud-right,
.rb-hud-center {
  display: flex;
  align-items: center;
}
.rb-hud-left {
  gap: 10px;
}
.rb-hud-left div {
  display: flex;
  flex-direction: column;
}
.rb-hud-left strong {
  color: #cbd5e1;
  font-size: 12px;
  letter-spacing: 0.16em;
}
.rb-hud-left small {
  margin-top: 3px;
  color: #56677a;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.1em;
}
.rb-online-dot,
.rb-live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.9);
  animation: rb-blink 1.5s ease-in-out infinite;
}
@keyframes rb-blink {
  50% {
    opacity: 0.3;
  }
}
.rb-hud-center {
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.5);
  color: #56677a;
  font-size: 10px;
  letter-spacing: 0.12em;
  font-family: var(--mono);
}
.rb-hud-center strong {
  color: #94a3b8;
}
.rb-hud-right {
  justify-content: flex-end;
  gap: 8px;
  color: #22c55e;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.15em;
}

/* ARENA */
.rb-arena {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr 44px 170px 44px 1fr;
  align-items: center;
  gap: 0;
  margin: 22px 0 18px;
}

.rb-console {
  padding: 14px;
  border-radius: 14px;
  background: rgba(5, 12, 18, 0.92);
  backdrop-filter: blur(10px);
  transition: transform 0.3s;
}
.rb-console:hover {
  transform: translateY(-4px);
}
.rb-red-console {
  border: 1px solid rgba(239, 68, 68, 0.3);
  box-shadow: 0 0 40px rgba(239, 68, 68, 0.08);
}
.rb-blue-console {
  border: 1px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.08);
}

.rb-console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #a5b4c6;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
}
.rb-console-header span {
  display: flex;
  align-items: center;
  gap: 6px;
}
.rb-console-header small {
  color: #475569;
  font-size: 8px;
}
.rb-red-dot,
.rb-blue-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  animation: rb-blink 2s ease-in-out infinite;
}
.rb-red-dot {
  background: var(--red);
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.9);
}
.rb-blue-dot {
  background: var(--blue);
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.9);
}

.rb-console-main {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
}
.rb-console-icon {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 11px;
  font-size: 22px;
}
.rb-red-console .rb-console-icon {
  color: var(--red-soft);
  background: rgba(239, 68, 68, 0.1);
}
.rb-blue-console .rb-console-icon {
  color: var(--blue-soft);
  background: rgba(59, 130, 246, 0.1);
}
.rb-console-title {
  color: #e2e8f0;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.1em;
  line-height: 1.3;
}
.rb-console-title span {
  display: block;
  color: #56677a;
  font-size: 9px;
}

.rb-console-status {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  color: #6b7d92;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.08em;
}
.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.9);
  animation: rb-blink 1.4s infinite;
}
.status-dot.blue-active {
  background: var(--blue);
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.9);
}

.rb-terminal {
  margin-top: 12px;
  padding: 10px;
  border: 1px solid rgba(100, 116, 139, 0.14);
  border-radius: 8px;
  background: rgba(2, 6, 23, 0.75);
  font-family: var(--mono);
}
.rb-terminal .log {
  display: grid;
  grid-template-columns: auto auto 1fr;
  gap: 6px;
  margin: 5px 0;
  color: #6b7d92;
  font-size: 10px;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
  animation: logCycle 8s ease-in-out infinite;
  animation-delay: calc(var(--i) * 1.2s);
}
@keyframes logCycle {
  0% {
    opacity: 0;
    transform: translateX(-8px);
  }
  8%,
  80% {
    opacity: 1;
    transform: translateX(0);
  }
  92%,
  100% {
    opacity: 0;
  }
}
.terminal-time {
  color: #3f5166;
}
.terminal-red {
  color: var(--red-soft);
}
.terminal-blue {
  color: var(--blue-soft);
}

.rb-console-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  margin-top: 12px;
}
.rb-console-metrics div {
  padding: 7px 2px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.65);
  text-align: center;
}
.rb-console-metrics strong {
  display: block;
  color: #e2e8f0;
  font-size: 15px;
  font-family: var(--mono);
}
.rb-console-metrics span {
  color: #475569;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

/* LINKS */
.rb-link {
  position: relative;
  height: 2px;
}
.rb-link-red {
  background: repeating-linear-gradient(90deg, rgba(239, 68, 68, 0.55) 0 6px, transparent 6px 12px);
}
.rb-link-blue {
  background: repeating-linear-gradient(
    90deg,
    rgba(59, 130, 246, 0.55) 0 6px,
    transparent 6px 12px
  );
}
.packet {
  position: absolute;
  top: -4px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.rb-link-red .packet {
  background: var(--red);
  box-shadow: 0 0 14px var(--red);
  animation: travel 2.2s ease-in-out infinite;
}
.rb-link-blue .packet {
  background: var(--blue);
  box-shadow: 0 0 14px var(--blue);
  animation: travelBack 2.2s ease-in-out infinite;
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
@keyframes travelBack {
  0% {
    left: calc(100% - 10px);
    opacity: 0;
  }
  15%,
  85% {
    opacity: 1;
  }
  100% {
    left: 0;
    opacity: 0;
  }
}

/* CORE */
.rb-core {
  text-align: center;
}
.core-label {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
  color: var(--purple-soft);
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.1em;
  line-height: 1.3;
}
.core-ping {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--purple-soft);
  box-shadow: 0 0 10px rgba(192, 132, 252, 0.9);
  animation: rb-blink 1.6s infinite;
}
.core-shield {
  position: relative;
  width: 118px;
  height: 118px;
  margin: auto;
  display: grid;
  place-items: center;
}
.shield-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(168, 85, 247, 0.3);
}
.shield-ring-1 {
  inset: 0;
  animation: rb-rotate 15s linear infinite;
}
.shield-ring-2 {
  inset: 13px;
  border-color: rgba(168, 85, 247, 0.45);
  animation: rb-rotate-rev 11s linear infinite;
}
.shield-ring-3 {
  inset: 27px;
  border-color: rgba(168, 85, 247, 0.22);
}
@keyframes rb-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes rb-rotate-rev {
  to {
    transform: rotate(-360deg);
  }
}
.core-lock {
  position: relative;
  z-index: 4;
  width: 66px;
  height: 66px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(168, 85, 247, 0.7);
  border-radius: 20px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.28), rgba(5, 10, 15, 0.95));
  color: var(--purple-soft);
  font-size: 28px;
  box-shadow:
    0 0 45px rgba(168, 85, 247, 0.3),
    inset 0 0 20px rgba(168, 85, 247, 0.12);
  animation: corePulse 3s ease-in-out infinite;
}
@keyframes corePulse {
  50% {
    box-shadow:
      0 0 70px rgba(168, 85, 247, 0.55),
      inset 0 0 20px rgba(168, 85, 247, 0.2);
  }
}
.rb-core > strong {
  display: block;
  margin-top: 8px;
  color: #f8fafc;
  font-size: 11px;
  letter-spacing: 0.14em;
}
.rb-core > small {
  display: block;
  margin-top: 3px;
  color: #56677a;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.1em;
}
.core-health {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 10px;
}
.core-health span {
  width: 14px;
  height: 4px;
  border-radius: 2px;
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34, 197, 94, 0.5);
  animation: healthBlink 3s ease-in-out infinite;
}
.core-health span:nth-child(2) {
  animation-delay: 0.2s;
}
.core-health span:nth-child(3) {
  animation-delay: 0.4s;
}
.core-health span:nth-child(4) {
  animation-delay: 0.6s;
}
.core-health span:nth-child(5) {
  animation-delay: 0.8s;
}
@keyframes healthBlink {
  50% {
    opacity: 0.45;
  }
}
.core-health b {
  margin-left: 6px;
  color: #22c55e;
  font-size: 9px;
  letter-spacing: 0.08em;
}
.rb-assets {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  margin-top: 12px;
}
.rb-asset {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 5px;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: rgba(5, 12, 18, 0.9);
  color: #8d9db0;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.06em;
}
.rb-asset .q-icon {
  font-size: 13px;
}

/* FLOW + ALERT */
.rb-flowbar {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.8);
}
.flow-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 0.1em;
  animation: flowGlow 3s ease-in-out infinite;
}
.flow-item:nth-of-type(2) {
  animation-delay: 1s;
}
.flow-item:nth-of-type(3) {
  animation-delay: 2s;
}
@keyframes flowGlow {
  0%,
  100% {
    opacity: 0.55;
  }
  30% {
    opacity: 1;
  }
}
.flow-item .q-icon {
  font-size: 15px;
}
.flow-red {
  color: var(--red-soft);
}
.flow-purple {
  color: var(--purple-soft);
}
.flow-blue {
  color: var(--blue-soft);
}
.flow-arrow {
  color: #334155;
  font-size: 14px;
}

.rb-alert {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  padding: 10px 12px;
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 10px;
  background: rgba(20, 8, 12, 0.85);
  animation: alertGlow 2.5s ease-in-out infinite;
}
@keyframes alertGlow {
  50% {
    box-shadow: 0 0 24px rgba(239, 68, 68, 0.22);
  }
}
.alert-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.12);
  color: var(--red-soft);
}
.alert-copy {
  display: flex;
  flex-direction: column;
}
.alert-copy strong {
  color: #fca5a5;
  font-size: 10px;
  letter-spacing: 0.09em;
}
.alert-copy span {
  margin-top: 2px;
  color: #56677a;
  font-size: 10px;
}
.alert-level {
  margin-left: auto;
  text-align: right;
}
.alert-level small {
  display: block;
  color: #475569;
  font-size: 8px;
  letter-spacing: 0.1em;
}
.alert-level strong {
  color: var(--red-soft);
  font-size: 13px;
  font-family: var(--mono);
}

/* TELEMETRY */
.rb-telemetry {
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}
.telemetry-card {
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 10px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.7);
}
.telemetry-card-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 8px;
}
.telemetry-red {
  color: var(--red-soft);
  background: rgba(239, 68, 68, 0.1);
}
.telemetry-purple {
  color: var(--purple-soft);
  background: rgba(168, 85, 247, 0.1);
}
.telemetry-blue {
  color: var(--blue-soft);
  background: rgba(59, 130, 246, 0.1);
}
.telemetry-card div:nth-child(2) {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.telemetry-card small {
  color: #56677a;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.08em;
}
.telemetry-card strong {
  margin-top: 2px;
  color: #a5b4c6;
  font-size: 10px;
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.telemetry-bar {
  width: 100%;
  max-width: 34px;
  height: 4px;
  margin-left: auto;
  overflow: hidden;
  border-radius: 4px;
  background: rgba(100, 116, 139, 0.15);
}
.telemetry-bar i {
  display: block;
  height: 100%;
  border-radius: inherit;
  animation: rb-meter 2.2s ease-in-out infinite alternate;
}
.red-bar i {
  background: var(--red);
}
.purple-bar i {
  background: var(--purple);
}
.blue-bar i {
  background: var(--blue);
}
@keyframes rb-meter {
  from {
    width: 30%;
  }
  to {
    width: 95%;
  }
}

.rb-footer-status {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px 12px;
  margin-top: 12px;
  color: #475569;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.08em;
}
.rb-footer-status span {
  display: flex;
  align-items: center;
  gap: 5px;
}
.rb-footer-status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.9);
}

/* ---------- MARQUEE ---------- */

.marquee {
  margin-top: 72px;
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
  animation: scroll 38s linear infinite;
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
  color: #a5b4c6;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}
.marquee-item.red .q-icon {
  color: var(--red-soft);
}
.marquee-item.blue .q-icon {
  color: var(--blue-soft);
}
.marquee-item.purple .q-icon {
  color: var(--purple-soft);
}

/* ---------- SECTIONS ---------- */

.module-section {
  margin-top: 96px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 30px;
}
.section-kicker {
  color: var(--green);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.2em;
}
.section-kicker.purple {
  color: var(--purple-soft);
}
.section-heading h2 {
  margin: 7px 0 0;
  font-size: clamp(26px, 3vw, 34px);
  letter-spacing: -0.02em;
}
.section-sub {
  max-width: 620px;
  margin: 10px 0 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.65;
}
.section-heading > span {
  color: #64748b;
  font-size: 13px;
}

/* ---------- LESSON GRID ---------- */

.lesson-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.lesson-card {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 40px 52px 1fr 30px;
  gap: 18px;
  align-items: center;
  width: 100%;
  padding: 22px;
  border: 1px solid #1e293b;
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015));
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.7s ease;
}
.lesson-card.is-visible:hover {
  transform: translateY(-5px);
  border-color: var(--green);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3);
}
.card-glow {
  position: absolute;
  top: -50px;
  right: -50px;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.28);
  filter: blur(55px);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}
.lesson-card:hover .card-glow {
  opacity: 1;
}
.lesson-number {
  position: relative;
  color: #475569;
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 900;
  transition: color 0.3s;
}
.lesson-card:hover .lesson-number {
  color: #34d399;
}
.lesson-icon {
  position: relative;
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: #111c23;
  color: #34d399;
  font-size: 22px;
  transition: transform 0.3s;
}
.lesson-card:hover .lesson-icon {
  transform: rotate(-6deg) scale(1.1);
}
.lesson-info {
  position: relative;
}
.lesson-info span {
  color: #64748b;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.lesson-info h3 {
  margin: 5px 0;
  font-size: 16px;
}
.lesson-info p {
  margin: 0;
  color: #7a8ba0;
  font-size: 12.5px;
  line-height: 1.5;
}
.arrow {
  position: relative;
  color: #475569;
  transition:
    transform 0.25s,
    color 0.25s;
}
.lesson-card:hover .arrow {
  color: #34d399;
  transform: translateX(5px);
}

/* ---------- ROLES ---------- */

.roles-section {
  margin-top: 72px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.role-card {
  padding: 35px;
  border-radius: 22px;
  border: 1px solid #1e293b;
  background: #0b151a;
  transition:
    transform 0.3s,
    box-shadow 0.3s,
    opacity 0.7s ease;
}
.role-card.is-visible:hover {
  transform: translateY(-6px);
}
.red-role {
  box-shadow: inset 3px 0 var(--red);
}
.red-role.is-visible:hover {
  box-shadow:
    inset 3px 0 var(--red),
    0 20px 50px rgba(239, 68, 68, 0.12);
}
.blue-role {
  box-shadow: inset 3px 0 var(--blue);
}
.blue-role.is-visible:hover {
  box-shadow:
    inset 3px 0 var(--blue),
    0 20px 50px rgba(59, 130, 246, 0.14);
}
.role-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
}
.red-role .role-top .q-icon {
  color: var(--red-soft);
}
.blue-role .role-top .q-icon {
  color: var(--blue-soft);
}
.role-badge {
  color: #64748b;
  font-size: 11px;
  font-weight: 900;
}
.role-card h2 {
  margin: 28px 0 10px;
  font-size: 30px;
}
.role-card p {
  color: #94a3b8;
  line-height: 1.7;
}
.role-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 25px;
}
.role-tags span {
  padding: 6px 10px;
  border: 1px solid #263442;
  border-radius: 6px;
  color: #64748b;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

/* ---------- PURPLE LOOP ---------- */

.loop {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  padding: 44px 24px 34px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--panel);
}
.loop-line {
  position: absolute;
  top: 68px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: repeating-linear-gradient(90deg, rgba(168, 85, 247, 0.4) 0 8px, transparent 8px 16px);
}
.loop-pulse {
  position: absolute;
  top: -4px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--purple-soft);
  box-shadow: 0 0 14px var(--purple);
  animation: travel 4s ease-in-out infinite;
}
.loop-step {
  position: relative;
  text-align: center;
  padding: 0 6px;
}
.loop-node {
  width: 56px;
  height: 56px;
  margin: 0 auto 12px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #0a141a;
  border: 2px solid;
  transition: transform 0.3s;
}
.loop-step:hover .loop-node {
  transform: scale(1.12);
}
.loop-node.red {
  color: var(--red-soft);
  border-color: rgba(239, 68, 68, 0.5);
}
.loop-node.blue {
  color: var(--blue-soft);
  border-color: rgba(59, 130, 246, 0.5);
}
.loop-node.purple {
  color: var(--purple-soft);
  border-color: rgba(168, 85, 247, 0.5);
}
.loop-num {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--purple-soft);
}
.loop-step h4 {
  margin: 4px 0 6px;
  font-size: 17px;
  font-weight: 800;
}
.loop-step p {
  margin: 0;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.55;
}

/* ---------- COMPARISON ---------- */

.compare {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--panel);
}
.compare-head,
.compare-row {
  display: grid;
  grid-template-columns: 0.7fr 1fr 1fr;
}
.compare-head {
  background: rgba(255, 255, 255, 0.03);
  font-weight: 900;
  font-size: 15px;
}
.compare-head > div {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 18px 22px;
}
.ch-red {
  color: var(--red-soft);
  background: rgba(239, 68, 68, 0.07);
}
.ch-blue {
  color: var(--blue-soft);
  background: rgba(59, 130, 246, 0.07);
}
.compare-row {
  border-top: 1px solid var(--line);
  transition: background 0.2s;
}
.compare-row:hover {
  background: rgba(255, 255, 255, 0.025);
}
.compare-row > div {
  padding: 18px 22px;
  font-size: 14.5px;
  line-height: 1.5;
}
.compare-label {
  color: #64748b;
  font-size: 11px !important;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.compare-red {
  color: #f1c4c4;
}
.compare-blue {
  color: #c4d8f5;
}

/* ---------- TACTICS ---------- */

.tactic-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.tactic {
  display: grid;
  grid-template-columns: 200px 1fr 36px 1fr;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--panel);
  transition:
    transform 0.3s,
    border-color 0.3s,
    opacity 0.7s ease;
}
.tactic.is-visible:hover {
  transform: translateX(6px);
  border-color: rgba(168, 85, 247, 0.4);
}
.tactic-stage {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  font-size: 15px;
}
.tactic-num {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--purple-soft);
}
.tactic-side {
  padding: 12px 14px;
  border-radius: 11px;
  font-size: 13.5px;
  line-height: 1.45;
}
.tactic-side small {
  display: block;
  margin-bottom: 3px;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.14em;
}
.tactic-red {
  background: rgba(239, 68, 68, 0.07);
  border: 1px solid rgba(239, 68, 68, 0.18);
  color: #f1c4c4;
}
.tactic-red small {
  color: var(--red-soft);
}
.tactic-blue {
  background: rgba(59, 130, 246, 0.07);
  border: 1px solid rgba(59, 130, 246, 0.18);
  color: #c4d8f5;
}
.tactic-blue small {
  color: var(--blue-soft);
}
.tactic-swap {
  color: var(--purple-soft);
  font-size: 22px;
  justify-self: center;
}

/* ---------- TOOLS ---------- */

.tool-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.tool-col {
  padding: 28px;
  border-radius: 22px;
  border: 1px solid var(--line);
  background: #0b151a;
  transition: opacity 0.7s ease;
}
.red-col {
  box-shadow: inset 0 3px var(--red);
}
.blue-col {
  box-shadow: inset 0 3px var(--blue);
}
.tool-col h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 18px;
  font-size: 20px;
}
.red-col h3 .q-icon {
  color: var(--red-soft);
}
.blue-col h3 .q-icon {
  color: var(--blue-soft);
}
.tool-col ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.tool-col li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 13px 10px;
  border-radius: 12px;
  transition: background 0.2s;
}
.tool-col li:hover {
  background: rgba(255, 255, 255, 0.04);
}
.tool-col li > .q-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 11px;
  font-size: 20px;
}
.red-col li > .q-icon {
  color: var(--red-soft);
  background: rgba(239, 68, 68, 0.1);
}
.blue-col li > .q-icon {
  color: var(--blue-soft);
  background: rgba(59, 130, 246, 0.1);
}
.tool-col li div {
  display: flex;
  flex-direction: column;
}
.tool-col li strong {
  font-size: 15px;
}
.tool-col li span {
  margin-top: 2px;
  color: var(--muted);
  font-size: 13px;
}

/* ---------- CAREERS ---------- */

.career-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.career-card {
  padding: 24px;
  border-radius: 18px;
  border: 1px solid var(--line);
  background: var(--panel);
  transition:
    transform 0.3s,
    border-color 0.3s,
    opacity 0.7s ease;
}
.career-card.is-visible:hover {
  transform: translateY(-6px);
}
.career-card.red.is-visible:hover {
  border-color: rgba(239, 68, 68, 0.5);
}
.career-card.blue.is-visible:hover {
  border-color: rgba(59, 130, 246, 0.5);
}
.career-card.purple.is-visible:hover {
  border-color: rgba(168, 85, 247, 0.5);
}
.career-icon {
  width: 44px;
  height: 44px;
  margin-bottom: 16px;
  display: grid;
  place-items: center;
  border-radius: 12px;
}
.career-card.red .career-icon {
  color: var(--red-soft);
  background: rgba(239, 68, 68, 0.1);
}
.career-card.blue .career-icon {
  color: var(--blue-soft);
  background: rgba(59, 130, 246, 0.1);
}
.career-card.purple .career-icon {
  color: var(--purple-soft);
  background: rgba(168, 85, 247, 0.1);
}
.career-card h4 {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 800;
}
.career-card p {
  margin: 0;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.55;
}

/* ---------- CTA ---------- */

.cta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  margin-top: 96px;
  padding: 44px 48px;
  border-radius: 24px;
  border: 1px solid rgba(168, 85, 247, 0.28);
  background: linear-gradient(
    120deg,
    rgba(239, 68, 68, 0.12),
    rgba(168, 85, 247, 0.1),
    rgba(59, 130, 246, 0.14)
  );
}
.cta h2 {
  margin: 0 0 8px;
  font-size: clamp(24px, 3vw, 32px);
  letter-spacing: -0.02em;
}
.cta p {
  max-width: 560px;
  margin: 0;
  color: #a5b4c6;
  line-height: 1.7;
}
.cta .start-btn {
  flex-shrink: 0;
}

/* ---------- RESPONSIVE ---------- */

@media (max-width: 1200px) {
  .hero-section {
    grid-template-columns: 1fr;
  }
  .career-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .loop {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 32px;
  }
  .loop-line {
    display: none;
  }
}

@media (max-width: 900px) {
  .lesson-grid,
  .roles-section,
  .tool-grid {
    grid-template-columns: 1fr;
  }

  .tactic {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .tactic-swap {
    transform: rotate(90deg);
  }

  /* stack battlefield */
  .rb-arena {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .rb-link {
    width: 2px;
    height: 44px;
    margin: 0 auto;
  }
  .rb-link-red {
    background: repeating-linear-gradient(
      180deg,
      rgba(239, 68, 68, 0.55) 0 6px,
      transparent 6px 12px
    );
  }
  .rb-link-blue {
    background: repeating-linear-gradient(
      180deg,
      rgba(59, 130, 246, 0.55) 0 6px,
      transparent 6px 12px
    );
  }
  .rb-link-red .packet {
    top: 0;
    left: -4px;
    animation-name: travelY;
  }
  .rb-link-blue .packet {
    top: 0;
    left: -4px;
    animation-name: travelYBack;
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
  @keyframes travelYBack {
    0% {
      top: calc(100% - 10px);
      opacity: 0;
    }
    15%,
    85% {
      opacity: 1;
    }
    100% {
      top: 0;
      opacity: 0;
    }
  }
}

@media (max-width: 600px) {
  .redblue-shell {
    padding: 40px 18px 70px;
  }

  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .battle-visual {
    padding: 14px;
    border-radius: 20px;
  }

  .rb-hud {
    grid-template-columns: 1fr auto;
  }
  .rb-hud-center {
    display: none;
  }

  .rb-telemetry {
    grid-template-columns: 1fr;
  }

  .rb-footer-status span:last-child {
    display: none;
  }

  .loop,
  .career-grid {
    grid-template-columns: 1fr;
  }

  .lesson-card {
    grid-template-columns: 35px 45px 1fr;
    gap: 14px;
  }
  .lesson-card .arrow {
    display: none;
  }

  .compare-head,
  .compare-row {
    grid-template-columns: 1fr 1fr;
  }
  .compare-head > div:first-child {
    display: none;
  }
  .compare-label {
    grid-column: 1 / -1;
    padding-bottom: 0 !important;
  }

  .cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 32px 24px;
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
  .rb-terminal .log {
    opacity: 1;
    transform: none;
  }
}
</style>
