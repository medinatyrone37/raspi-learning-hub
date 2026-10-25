<template>
  <q-page class="rb-page">
    <!-- Ambient background -->
    <canvas ref="rainCanvas" class="rain-canvas"></canvas>
    <div class="ambient ambient-red"></div>
    <div class="ambient ambient-blue"></div>
    <div class="ambient ambient-purple"></div>

    <div class="rb-shell">
      <!-- ================= HERO ================= -->
      <section class="hero">
        <div class="hero-copy reveal">
          <div class="eyebrow">
            <span class="dot red"></span>
            <span>CYBERSECURITY MODULE</span>
            <span class="eyebrow-line"></span>
            <span class="dot blue"></span>
          </div>

          <h1 class="glitch-title">
            <span class="t-red" data-text="RED TEAM">RED TEAM</span>
            <span class="t-vs">VERSUS</span>
            <span class="t-blue" data-text="BLUE TEAM">BLUE TEAM</span>
          </h1>

          <p class="hero-text">
            Every strong defense is built by understanding the attack. Explore how offensive
            specialists simulate real adversaries, how defenders detect and stop them, and how both
            sides combine as a Purple Team to make an organization measurably safer.
          </p>

          <div class="hero-actions">
            <q-btn
              unelevated
              no-caps
              class="start-btn"
              label="Start Learning"
              icon="play_arrow"
              @click="startLearning"
            />
            <q-btn
              flat
              no-caps
              class="ghost-btn"
              label="Try the Terminal"
              icon="terminal"
              @click="scrollTo('lab')"
            />
            <div class="lesson-count">
              <q-icon name="menu_book" />
              {{ lessons.length }} Lessons
            </div>
          </div>

          <div class="stat-row">
            <div v-for="s in stats" :key="s.label" class="stat">
              <strong>{{ s.display }}{{ s.suffix }}</strong>
              <span>{{ s.label }}</span>
            </div>
          </div>
        </div>

        <!-- Hero visual: animated operations map -->
        <div class="battle-visual reveal">
          <div class="battle-grid"></div>
          <div class="battle-scan"></div>

          <div class="battle-header">
            <div class="battle-title">
              <span class="status-light"></span>
              SECURITY OPERATIONS MAP
            </div>
            <div class="battle-live"><span>LIVE</span><i></i></div>
          </div>

          <div class="battle-scene">
            <div class="battle-team battle-red">
              <div class="team-node"><q-icon name="bug_report" /></div>
              <div class="team-name">RED TEAM</div>
              <div class="team-type">OFFENSIVE OPERATIONS</div>
              <div class="team-mini-stats">
                <span><q-icon name="radar" />RECON</span>
                <span><q-icon name="track_changes" />ATTACK</span>
                <span><q-icon name="fact_check" />REPORT</span>
              </div>
            </div>

            <div class="network-node node-red-1">
              <span class="node-pulse"></span>
              <q-icon name="radar" /><small>RECON</small>
            </div>
            <div class="network-node node-red-2">
              <q-icon name="travel_explore" /><small>DISCOVERY</small>
            </div>

            <div class="target-system">
              <div class="target-ring ring-outer"></div>
              <div class="target-ring ring-middle"></div>
              <div class="target-ring ring-inner"></div>
              <div class="target-pulse"></div>
              <div class="target-core"><q-icon name="dns" /></div>
              <div class="target-label"><strong>PROTECTED</strong><span>CORE SYSTEM</span></div>
              <div class="target-status"><i></i>SYSTEM SECURE</div>
            </div>

            <div class="asset-node asset-server"><q-icon name="dns" /><span>SERVER</span></div>
            <div class="asset-node asset-database">
              <q-icon name="storage" /><span>DATABASE</span>
            </div>
            <div class="asset-node asset-network"><q-icon name="lan" /><span>NETWORK</span></div>

            <div class="battle-team battle-blue">
              <div class="team-node"><q-icon name="shield" /></div>
              <div class="team-name">BLUE TEAM</div>
              <div class="team-type">DEFENSIVE OPERATIONS</div>
              <div class="team-mini-stats">
                <span><q-icon name="monitor" />MONITOR</span>
                <span><q-icon name="visibility" />DETECT</span>
                <span><q-icon name="shield" />RESPOND</span>
              </div>
            </div>

            <div class="network-node node-blue-1">
              <span class="node-pulse blue-pulse"></span>
              <q-icon name="monitor_heart" /><small>MONITOR</small>
            </div>
            <div class="network-node node-blue-2">
              <q-icon name="security" /><small>DEFENSE</small>
            </div>

            <svg
              class="network-lines"
              viewBox="0 0 1000 520"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path class="map-line map-red" d="M110 190 C230 160, 280 180, 390 245" />
              <path class="map-line map-red" d="M145 340 C260 355, 300 300, 410 270" />
              <path class="map-line map-purple" d="M390 245 C455 210, 545 210, 610 245" />
              <path class="map-line map-purple" d="M410 275 C475 310, 530 310, 590 275" />
              <path class="map-line map-blue" d="M890 190 C770 160, 720 180, 610 245" />
              <path class="map-line map-blue" d="M855 340 C740 355, 700 300, 590 270" />
              <path class="asset-line" d="M500 260 L500 130" />
              <path class="asset-line" d="M500 260 L390 390" />
              <path class="asset-line" d="M500 260 L610 390" />

              <circle class="packet packet-red" r="5">
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  path="M110 190 C230 160, 280 180, 390 245"
                />
              </circle>
              <circle class="packet packet-red" r="4">
                <animateMotion
                  dur="3.4s"
                  repeatCount="indefinite"
                  path="M145 340 C260 355, 300 300, 410 270"
                />
              </circle>
              <circle class="packet packet-blue" r="5">
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path="M890 190 C770 160, 720 180, 610 245"
                />
              </circle>
              <circle class="packet packet-blue" r="4">
                <animateMotion
                  dur="3.7s"
                  repeatCount="indefinite"
                  path="M855 340 C740 355, 700 300, 590 270"
                />
              </circle>
            </svg>

            <div class="threat-alert">
              <span class="threat-icon"><q-icon name="warning" /></span>
              <div>
                <strong>THREAT ACTIVITY</strong>
                <small>AUTHORIZED SIMULATION</small>
              </div>
              <span class="threat-signal"></span>
            </div>

            <div class="collaboration">
              <span class="collab-red"></span>
              <q-icon name="sync" />
              <span class="collab-blue"></span>
              <strong>PURPLE TEAM</strong>
            </div>
          </div>

          <div class="battle-telemetry">
            <div class="telemetry-item">
              <span class="telemetry-icon red-icon"><q-icon name="flash_on" /></span>
              <div><small>RED ACTIVITY</small><strong>SIMULATION ACTIVE</strong></div>
            </div>
            <div class="telemetry-divider"></div>
            <div class="telemetry-item">
              <span class="telemetry-icon blue-icon"><q-icon name="visibility" /></span>
              <div><small>BLUE MONITORING</small><strong>DETECTION ACTIVE</strong></div>
            </div>
            <div class="telemetry-divider"></div>
            <div class="telemetry-item">
              <span class="telemetry-icon purple-icon"><q-icon name="security" /></span>
              <div><small>CORE STATUS</small><strong>PROTECTED</strong></div>
            </div>
          </div>

          <div class="battle-footer">
            <span><i></i>SYSTEM ONLINE</span>
            <span>NETWORK SECURE</span>
            <span>CONTINUOUS DEFENSE</span>
          </div>
        </div>
      </section>

      <!-- ================= TICKER ================= -->
      <div class="ticker reveal">
        <div class="ticker-track">
          <span v-for="(t, i) in tickerItems.concat(tickerItems)" :key="i">
            <i :class="t.team"></i>{{ t.text }}
          </span>
        </div>
      </div>

      <!-- ================= INTRO / WHY ================= -->
      <section class="block reveal">
        <div class="section-heading">
          <div>
            <div class="section-kicker">THE BIG PICTURE</div>
            <h2>Why security teams are split in two</h2>
          </div>
        </div>
        <div class="why-grid">
          <div class="why-card">
            <q-icon name="psychology" />
            <h3>Think like an attacker</h3>
            <p>
              Real adversaries do not follow checklists. Red Teams reproduce their creativity and
              persistence, chaining small weaknesses together to show what a genuine breach would
              look like before it actually happens.
            </p>
          </div>
          <div class="why-card">
            <q-icon name="shield" />
            <h3>Defend with evidence</h3>
            <p>
              Blue Teams turn logs, alerts and network traffic into decisions. Good defense is not
              guesswork; it is visibility, tuned detections, and rehearsed response procedures.
            </p>
          </div>
          <div class="why-card">
            <q-icon name="sync_alt" />
            <h3>Learn from each other</h3>
            <p>
              The real value appears when both sides share findings. Every successful attack becomes
              a new detection rule, and every detection gap becomes a new test case.
            </p>
          </div>
        </div>
      </section>

      <!-- ================= LIVE TERMINAL LAB ================= -->
      <section id="lab" class="block reveal">
        <div class="section-heading">
          <div>
            <div class="section-kicker">COMMAND LAB</div>
            <h2>Watch it run, then try it yourself</h2>
          </div>
          <span>Safe, simulated environment</span>
        </div>

        <div class="lab-grid">
          <!-- Auto-playing demo -->
          <div class="term-card">
            <div class="term-top">
              <div class="term-dots"><i></i><i></i><i></i></div>
              <div class="term-tabs">
                <button
                  :class="['term-tab', 'tab-red', { active: demoTeam === 'red' }]"
                  @click="playDemo('red')"
                >
                  <q-icon name="bug_report" /> red-team
                </button>
                <button
                  :class="['term-tab', 'tab-blue', { active: demoTeam === 'blue' }]"
                  @click="playDemo('blue')"
                >
                  <q-icon name="shield" /> blue-team
                </button>
              </div>
              <button class="term-replay" @click="playDemo(demoTeam)" title="Replay">
                <q-icon name="replay" />
              </button>
            </div>
            <div ref="demoBody" class="term-body">
              <div v-for="(line, i) in demoLines" :key="i" :class="['tl', 'tl-' + line.t]">
                <span v-if="line.t === 'cmd'" class="prompt" :class="demoTeam"
                  >{{ demoTeam === 'red' ? 'operator@kali' : 'analyst@soc' }}:~$</span
                >
                <span>{{ line.s }}</span>
              </div>
              <div v-if="demoTyping" class="tl tl-cmd">
                <span class="prompt" :class="demoTeam"
                  >{{ demoTeam === 'red' ? 'operator@kali' : 'analyst@soc' }}:~$</span
                >
                <span>{{ demoTyping }}</span
                ><span class="caret"></span>
              </div>
            </div>
            <div class="term-note">
              <q-icon name="info" />
              {{
                demoTeam === 'red'
                  ? 'Red Team: authorized reconnaissance and validation against a lab target.'
                  : 'Blue Team: detecting, investigating and containing suspicious activity.'
              }}
            </div>
          </div>

          <!-- Interactive terminal -->
          <div class="term-card">
            <div class="term-top">
              <div class="term-dots"><i></i><i></i><i></i></div>
              <div class="term-title">interactive-shell — sandbox</div>
              <button class="term-replay" @click="clearTerm" title="Clear">
                <q-icon name="delete_sweep" />
              </button>
            </div>
            <div ref="shellBody" class="term-body" @click="focusInput">
              <div v-for="(line, i) in shellLines" :key="i" :class="['tl', 'tl-' + line.t]">
                <span v-if="line.t === 'cmd'" class="prompt purple">learner@lab:~$</span>
                <span>{{ line.s }}</span>
              </div>
              <div class="tl tl-cmd input-line">
                <span class="prompt purple">learner@lab:~$</span>
                <input
                  ref="shellInput"
                  v-model="shellInputValue"
                  class="shell-input"
                  spellcheck="false"
                  autocomplete="off"
                  @keydown.enter.prevent="runShell"
                  @keydown.up.prevent="historyUp"
                  @keydown.down.prevent="historyDown"
                />
              </div>
            </div>
            <div class="chip-row">
              <button v-for="c in quickCmds" :key="c" class="chip" @click="quickRun(c)">
                {{ c }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= KILL CHAIN ================= -->
      <section class="block reveal">
        <div class="section-heading">
          <div>
            <div class="section-kicker">ATTACK LIFECYCLE</div>
            <h2>The Cyber Kill Chain: attack vs. defense</h2>
          </div>
          <span>Select a phase</span>
        </div>

        <div class="chain">
          <div class="chain-steps">
            <button
              v-for="(p, i) in phases"
              :key="p.name"
              :class="['chain-step', { active: activePhase === i, done: i < activePhase }]"
              @click="activePhase = i"
            >
              <span class="step-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="step-name">{{ p.name }}</span>
            </button>
          </div>
          <div class="chain-progress">
            <div
              class="chain-progress-bar"
              :style="{ width: ((activePhase + 1) / phases.length) * 100 + '%' }"
            ></div>
          </div>

          <transition name="fade" mode="out-in">
            <div :key="activePhase" class="chain-detail">
              <div class="chain-col chain-red">
                <div class="chain-label"><q-icon name="bug_report" /> RED TEAM ACTION</div>
                <h3>{{ phases[activePhase].redTitle }}</h3>
                <p>{{ phases[activePhase].red }}</p>
                <div class="chain-tools">
                  <span v-for="t in phases[activePhase].redTools" :key="t">{{ t }}</span>
                </div>
              </div>
              <div class="chain-mid"><q-icon name="swap_horiz" /></div>
              <div class="chain-col chain-blue">
                <div class="chain-label"><q-icon name="shield" /> BLUE TEAM COUNTER</div>
                <h3>{{ phases[activePhase].blueTitle }}</h3>
                <p>{{ phases[activePhase].blue }}</p>
                <div class="chain-tools">
                  <span v-for="t in phases[activePhase].blueTools" :key="t">{{ t }}</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </section>

      <!-- ================= LESSONS ================= -->
      <section class="block reveal">
        <div class="section-heading">
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
            class="lesson-card"
            :class="categoryClass(lesson.category)"
            type="button"
            @click="openLesson(lesson.id)"
          >
            <div class="lesson-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="lesson-icon"><q-icon :name="getIcon(lesson.category)" /></div>
            <div class="lesson-info">
              <span>{{ lesson.category }}</span>
              <h3>{{ lesson.title }}</h3>
              <p>{{ lesson.subtitle }}</p>
            </div>
            <q-icon name="arrow_forward" class="arrow" />
          </button>
        </div>
      </section>

      <!-- ================= ROLES ================= -->
      <section class="roles-section reveal">
        <div class="role-card red-role">
          <div class="role-top">
            <span class="role-badge">01</span>
            <q-icon name="bug_report" />
          </div>
          <h2>Red Team</h2>
          <p>
            Simulates attacker behavior to identify weaknesses and test whether security controls
            can withstand realistic threats. Engagements are authorized, scoped, and always end in a
            detailed report with remediation guidance.
          </p>
          <ul class="role-list">
            <li>Penetration testing and adversary emulation</li>
            <li>Social engineering and phishing simulations</li>
            <li>Physical and application security assessments</li>
          </ul>
          <div class="role-tags">
            <span>OFFENSIVE</span><span>SIMULATION</span><span>ASSESSMENT</span>
          </div>
        </div>

        <div class="role-card blue-role">
          <div class="role-top">
            <span class="role-badge">02</span>
            <q-icon name="security" />
          </div>
          <h2>Blue Team</h2>
          <p>
            Monitors, detects, investigates, and responds to security events while continuously
            improving defensive controls. They own the day-to-day protection of systems, data, and
            users.
          </p>
          <ul class="role-list">
            <li>Security monitoring and threat hunting in a SOC</li>
            <li>Incident response and digital forensics</li>
            <li>Hardening, patching, and detection engineering</li>
          </ul>
          <div class="role-tags">
            <span>DEFENSIVE</span><span>DETECTION</span><span>RESPONSE</span>
          </div>
        </div>
      </section>

      <!-- ================= PURPLE ================= -->
      <section class="purple-section reveal">
        <div class="purple-orb"></div>
        <div class="purple-content">
          <div class="section-kicker purple-kicker">PURPLE TEAMING</div>
          <h2>Where offense and defense meet</h2>
          <p>
            Purple Teaming is not a separate group. It is a way of working in which Red and Blue
            share techniques, results and detections in near real time. Instead of a surprise attack
            followed by a long report, both teams run an attack technique together and ask: did we
            see it, did we alert, and how fast did we respond?
          </p>
          <div class="purple-cycle">
            <div v-for="(c, i) in cycle" :key="c.title" class="cycle-node">
              <div class="cycle-icon"><q-icon :name="c.icon" /></div>
              <strong>{{ c.title }}</strong>
              <span>{{ c.text }}</span>
              <q-icon v-if="i < cycle.length - 1" name="arrow_forward" class="cycle-arrow" />
            </div>
          </div>
        </div>
      </section>

      <!-- ================= TOOLKIT ================= -->
      <section class="block reveal">
        <div class="section-heading">
          <div>
            <div class="section-kicker">TOOLKIT</div>
            <h2>Common tools of each team</h2>
          </div>
        </div>
        <div class="tool-columns">
          <div class="tool-col">
            <h3 class="tc-red"><q-icon name="bug_report" /> Offensive tooling</h3>
            <div class="tool-item" v-for="t in redTools" :key="t.name">
              <strong>{{ t.name }}</strong>
              <span>{{ t.desc }}</span>
            </div>
          </div>
          <div class="tool-col">
            <h3 class="tc-blue"><q-icon name="shield" /> Defensive tooling</h3>
            <div class="tool-item" v-for="t in blueTools" :key="t.name">
              <strong>{{ t.name }}</strong>
              <span>{{ t.desc }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= TIMELINE ================= -->
      <section class="block reveal">
        <div class="section-heading">
          <div>
            <div class="section-kicker">SCENARIO</div>
            <h2>A simulated engagement, step by step</h2>
          </div>
        </div>
        <div class="timeline">
          <div
            v-for="(e, i) in timeline"
            :key="e.time"
            :class="['tl-item', e.team, i % 2 ? 'right' : 'left']"
          >
            <div class="tl-dot"></div>
            <div class="tl-card">
              <span class="tl-time">{{ e.time }}</span>
              <h4>{{ e.title }}</h4>
              <p>{{ e.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= PRINCIPLES + FAQ ================= -->
      <section class="block reveal">
        <div class="section-heading">
          <div>
            <div class="section-kicker">KEY CONCEPTS</div>
            <h2>Frequently asked questions</h2>
          </div>
        </div>
        <div class="faq">
          <div v-for="(f, i) in faqs" :key="f.q" :class="['faq-item', { open: openFaq === i }]">
            <button class="faq-q" @click="openFaq = openFaq === i ? -1 : i">
              <span>{{ f.q }}</span>
              <q-icon :name="openFaq === i ? 'remove' : 'add'" />
            </button>
            <div class="faq-a">
              <p>{{ f.a }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= CTA ================= -->
      <section class="cta reveal">
        <q-icon name="verified_user" class="cta-icon" />
        <h2>Ready to defend by understanding the attack?</h2>
        <p>Begin with the fundamentals and work your way through every lesson at your own pace.</p>
        <q-btn
          unelevated
          no-caps
          class="start-btn"
          label="Begin Lesson 1"
          icon="arrow_forward"
          @click="startLearning"
        />
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { redBlueLessons as lessons } from '../data/redblue.js'

const router = useRouter()

/* ---------------- Navigation ---------------- */
function startLearning() {
  router.push({ path: '/redblue-learning', query: { lesson: '1' } })
}
function openLesson(id) {
  router.push({ path: '/redblue-learning', query: { lesson: String(id) } })
}
function getIcon(category) {
  if (category === 'Red Team') return 'bug_report'
  if (category === 'Blue Team') return 'shield'
  if (category === 'Purple Team') return 'sync_alt'
  return 'hub'
}
function categoryClass(category) {
  if (category === 'Red Team') return 'cat-red'
  if (category === 'Blue Team') return 'cat-blue'
  if (category === 'Purple Team') return 'cat-purple'
  return ''
}
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/* ---------------- Static content ---------------- */
const stats = reactive([
  { label: 'Kill chain phases', target: 7, suffix: '', display: 0 },
  { label: 'Core teams', target: 3, suffix: '', display: 0 },
  { label: 'Hands-on lessons', target: lessons.length, suffix: '', display: 0 },
  { label: 'Monitoring', target: 24, suffix: '/7', display: 0 },
])

const tickerItems = [
  { team: 'red', text: 'Reconnaissance: map the attack surface' },
  { team: 'blue', text: 'Detection: correlate logs into alerts' },
  { team: 'red', text: 'Exploitation: validate real weaknesses' },
  { team: 'blue', text: 'Containment: isolate affected hosts' },
  { team: 'purple', text: 'Purple Team: share results in real time' },
  { team: 'red', text: 'Persistence: test long-term access controls' },
  { team: 'blue', text: 'Threat hunting: search before alerts fire' },
  { team: 'purple', text: 'Lessons learned: improve every cycle' },
]

const phases = [
  {
    name: 'Reconnaissance',
    redTitle: 'Gather information about the target',
    red: 'Red Teams collect public information such as domains, employee roles, exposed services and technology stacks. This stage is quiet and often uses only open sources.',
    redTools: ['OSINT', 'DNS lookups', 'Nmap', 'Shodan'],
    blueTitle: 'Reduce and monitor exposure',
    blue: 'Blue Teams limit what is publicly visible, monitor for scanning activity, and track external mentions of company assets so surprises are minimized.',
    blueTools: ['Attack surface mgmt', 'Firewall logs', 'Threat intel'],
  },
  {
    name: 'Weaponization',
    redTitle: 'Prepare the means of access',
    red: 'In an authorized exercise, testers prepare payloads or pretexts that mimic real adversaries so that controls can be tested under realistic conditions.',
    redTools: ['Payload frameworks', 'Pretext design'],
    blueTitle: 'Track emerging techniques',
    blue: 'Defenders study current adversary techniques and update detections, email filters and endpoint policies before those techniques reach their users.',
    blueTools: ['MITRE ATT&CK', 'Threat feeds', 'Sandboxing'],
  },
  {
    name: 'Delivery',
    redTitle: 'Reach the target environment',
    red: 'The simulated attacker delivers a lure through email, a web page or removable media to see whether technical controls and people recognize the risk.',
    redTools: ['Phishing simulation', 'Web delivery'],
    blueTitle: 'Filter and educate',
    blue: 'Secure email gateways, web proxies and user awareness training work together to block or report suspicious messages before they cause harm.',
    blueTools: ['Email security', 'Proxy', 'Awareness training'],
  },
  {
    name: 'Exploitation',
    redTitle: 'Trigger a weakness',
    red: 'Testers demonstrate that a vulnerability, misconfiguration or weak credential can actually be abused, proving real risk rather than theoretical risk.',
    redTools: ['Metasploit', 'Burp Suite', 'Custom scripts'],
    blueTitle: 'Patch and detect',
    blue: 'Vulnerability management, prompt patching and endpoint detection reduce the window of opportunity and raise an alert when exploitation is attempted.',
    blueTools: ['EDR', 'Patch management', 'WAF'],
  },
  {
    name: 'Installation',
    redTitle: 'Establish persistence',
    red: 'The team checks whether an attacker could maintain access after a reboot or password change, using scheduled tasks, services or similar mechanisms.',
    redTools: ['Persistence tests', 'Privilege checks'],
    blueTitle: 'Hunt for anomalies',
    blue: 'Defenders baseline normal behavior and hunt for unexpected services, startup entries, new accounts and unusual scheduled jobs.',
    blueTools: ['Sysmon', 'Wazuh', 'Threat hunting'],
  },
  {
    name: 'Command & Control',
    redTitle: 'Maintain a communication channel',
    red: 'Testers emulate how an intruder would communicate with a compromised host while trying to blend into ordinary network traffic.',
    redTools: ['C2 frameworks', 'Traffic shaping'],
    blueTitle: 'Inspect network behavior',
    blue: 'Network monitoring looks for beaconing patterns, rare destinations and suspicious DNS activity, then blocks the channel and isolates the host.',
    blueTools: ['Zeek', 'Suricata', 'DNS filtering'],
  },
  {
    name: 'Actions on Objectives',
    redTitle: 'Demonstrate business impact',
    red: 'The final step shows what an attacker could reach, such as sensitive data or critical systems, so leadership understands the true impact.',
    redTools: ['Data access proof', 'Impact report'],
    blueTitle: 'Contain, recover, learn',
    blue: 'Incident responders contain the incident, eradicate the cause, restore services from clean backups, and document lessons to prevent recurrence.',
    blueTools: ['IR playbooks', 'Forensics', 'Backups'],
  },
]
const activePhase = ref(0)

const redTools = [
  { name: 'Nmap', desc: 'Network discovery and service enumeration.' },
  { name: 'Burp Suite', desc: 'Web application testing and traffic inspection.' },
  { name: 'Metasploit', desc: 'Framework for validating known vulnerabilities.' },
  { name: 'BloodHound', desc: 'Maps attack paths inside directory environments.' },
  { name: 'Cobalt Strike / Sliver', desc: 'Adversary emulation and C2 simulation.' },
]
const blueTools = [
  {
    name: 'SIEM (Splunk, Elastic)',
    desc: 'Centralizes and correlates logs from across the network.',
  },
  { name: 'EDR', desc: 'Endpoint visibility, detection and response actions.' },
  { name: 'Suricata / Zeek', desc: 'Network intrusion detection and traffic analysis.' },
  { name: 'Wazuh', desc: 'Open-source host monitoring and compliance checks.' },
  { name: 'SOAR', desc: 'Automates repetitive response workflows.' },
]

const cycle = [
  { icon: 'flag', title: 'Plan', text: 'Choose a technique to test' },
  { icon: 'bug_report', title: 'Emulate', text: 'Red runs the technique' },
  { icon: 'visibility', title: 'Observe', text: 'Blue checks what was seen' },
  { icon: 'tune', title: 'Tune', text: 'Improve rules and controls' },
  { icon: 'restart_alt', title: 'Repeat', text: 'Retest to confirm the fix' },
]

const timeline = [
  {
    time: '09:00',
    team: 'purple',
    title: 'Rules of engagement',
    text: 'Scope, targets, timing and emergency contacts are agreed in writing before any activity starts.',
  },
  {
    time: '10:30',
    team: 'red',
    title: 'Reconnaissance begins',
    text: 'The Red Team maps exposed services and identifies an outdated web component on a test server.',
  },
  {
    time: '11:15',
    team: 'blue',
    title: 'Unusual scan detected',
    text: 'The SIEM flags a burst of requests from a single address. An analyst opens an investigation.',
  },
  {
    time: '13:40',
    team: 'red',
    title: 'Weakness validated',
    text: 'The team confirms the outdated component is exploitable on the lab target and documents the evidence.',
  },
  {
    time: '13:55',
    team: 'blue',
    title: 'Host isolated',
    text: 'Responders isolate the affected server, preserve logs, and block the source address at the firewall.',
  },
  {
    time: '16:00',
    team: 'purple',
    title: 'Joint debrief',
    text: 'Both teams review the timeline, patch the component, and add a new detection rule for next time.',
  },
]

const faqs = [
  {
    q: 'Is Red Teaming legal?',
    a: 'Yes, when it is authorized. Every engagement has written permission, a defined scope, and rules of engagement. Testing systems without permission is illegal and unethical.',
  },
  {
    q: 'What is the difference between a penetration test and a Red Team exercise?',
    a: 'A penetration test usually looks for as many vulnerabilities as possible within a scope. A Red Team exercise emulates a specific adversary with a goal, and also tests how well the defenders detect and respond.',
  },
  {
    q: 'Which team should a beginner start with?',
    a: 'Many professionals begin on the Blue side, because understanding logs, networks and operating systems makes offensive work far more meaningful. Both paths reward curiosity and consistent practice.',
  },
  {
    q: 'What is MITRE ATT&CK?',
    a: 'A public knowledge base of real-world adversary tactics and techniques. Red Teams use it to plan emulations, and Blue Teams use it to measure detection coverage.',
  },
  {
    q: 'Do small organizations need these teams?',
    a: 'The roles matter more than the headcount. Small organizations can rely on managed security services, periodic penetration tests, and good basics such as patching, backups and multi-factor authentication.',
  },
]
const openFaq = ref(0)

/* ---------------- Demo terminal (auto-typed) ---------------- */
const scenarios = {
  red: [
    {
      cmd: 'whoami && hostname',
      out: [
        ['info', 'operator'],
        ['info', 'kali-lab-01'],
      ],
    },
    {
      cmd: 'nmap -sV -p 22,80,443 10.10.10.5',
      out: [
        ['dim', 'Starting Nmap scan against lab target 10.10.10.5'],
        ['ok', '22/tcp   open  ssh     OpenSSH 8.2'],
        ['ok', '80/tcp   open  http    Apache httpd 2.4.29'],
        ['ok', '443/tcp  open  https   Apache httpd 2.4.29'],
        ['warn', 'Note: Apache 2.4.29 is outdated, flag for validation'],
      ],
    },
    {
      cmd: 'whatweb http://10.10.10.5',
      out: [
        ['info', 'http://10.10.10.5 [200 OK] Apache[2.4.29], PHP[7.2]'],
        ['warn', 'Legacy PHP version detected'],
      ],
    },
    {
      cmd: 'echo "Finding #1: outdated web stack" >> report.md',
      out: [['ok', 'Finding recorded in report.md']],
    },
    {
      cmd: 'cat report.md | head -n 3',
      out: [
        ['info', '# Engagement Report: Lab Target'],
        ['info', 'Finding #1: outdated web stack'],
        ['ok', 'Recommendation: upgrade and apply security patches'],
      ],
    },
  ],
  blue: [
    {
      cmd: 'whoami && hostname',
      out: [
        ['info', 'analyst'],
        ['info', 'soc-workstation-02'],
      ],
    },
    {
      cmd: 'tail -n 4 /var/log/auth.log',
      out: [
        ['dim', 'Oct 25 11:14:02 srv sshd[2210]: Failed password for admin'],
        ['dim', 'Oct 25 11:14:03 srv sshd[2210]: Failed password for admin'],
        ['dim', 'Oct 25 11:14:04 srv sshd[2210]: Failed password for root'],
        ['warn', 'Repeated failures from one source: possible brute force'],
      ],
    },
    {
      cmd: "grep 'Failed password' auth.log | awk '{print $11}' | sort | uniq -c",
      out: [
        ['err', '  47 203.0.113.77'],
        ['info', '   2 10.10.10.20'],
        ['warn', 'Top source 203.0.113.77 is external and unknown'],
      ],
    },
    {
      cmd: 'sudo iptables -A INPUT -s 203.0.113.77 -j DROP',
      out: [['ok', 'Rule added: traffic from 203.0.113.77 is now dropped']],
    },
    {
      cmd: 'ss -tnp | grep 203.0.113.77',
      out: [['ok', 'No active connections. Containment confirmed.']],
    },
  ],
}

const demoTeam = ref('red')
const demoLines = ref([])
const demoTyping = ref('')
const demoBody = ref(null)
let demoRun = 0

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function scrollBottom(elRef) {
  await nextTick()
  if (elRef.value) elRef.value.scrollTop = elRef.value.scrollHeight
}

async function playDemo(team) {
  const myRun = ++demoRun
  demoTeam.value = team
  demoLines.value = []
  demoTyping.value = ''
  await sleep(300)
  for (const step of scenarios[team]) {
    if (myRun !== demoRun) return
    demoTyping.value = ''
    for (const ch of step.cmd) {
      if (myRun !== demoRun) return
      demoTyping.value += ch
      await sleep(22 + Math.random() * 30)
    }
    await sleep(260)
    demoLines.value.push({ t: 'cmd', s: step.cmd })
    demoTyping.value = ''
    for (const [t, s] of step.out) {
      if (myRun !== demoRun) return
      demoLines.value.push({ t, s })
      scrollBottom(demoBody)
      await sleep(180)
    }
    await sleep(650)
  }
  if (myRun === demoRun) {
    await sleep(3500)
    if (myRun === demoRun) playDemo(team === 'red' ? 'blue' : 'red')
  }
}

/* ---------------- Interactive terminal ---------------- */
const shellLines = ref([
  { t: 'ok', s: 'Welcome to the Red/Blue sandbox. Everything here is simulated and safe.' },
  { t: 'dim', s: "Type 'help' to see the available commands." },
])
const shellInputValue = ref('')
const shellInput = ref(null)
const shellBody = ref(null)
const history = []
let histIdx = -1

const quickCmds = ['help', 'scan', 'logs', 'detect', 'mitre', 'about red', 'about blue', 'clear']

const commands = {
  help: () => [
    ['info', 'Available commands:'],
    ['dim', '  help        show this list'],
    ['dim', '  whoami      show the current user'],
    ['dim', '  scan        simulate a port scan on the lab target'],
    ['dim', '  logs        show recent authentication events'],
    ['dim', '  detect      run a simulated detection rule'],
    ['dim', '  block       simulate blocking a malicious address'],
    ['dim', '  mitre       list ATT&CK tactics'],
    ['dim', '  about red   explain the Red Team'],
    ['dim', '  about blue  explain the Blue Team'],
    ['dim', '  purple      explain Purple Teaming'],
    ['dim', '  date        show current date'],
    ['dim', '  clear       clear the screen'],
  ],
  whoami: () => [['info', 'learner (sandbox user, no real privileges)']],
  date: () => [['info', new Date().toString()]],
  scan: () => [
    ['dim', 'Scanning lab target 10.10.10.5 ...'],
    ['ok', 'PORT     STATE  SERVICE'],
    ['ok', '22/tcp   open   ssh'],
    ['ok', '80/tcp   open   http'],
    ['warn', '3306/tcp open   mysql   (should not be exposed!)'],
    ['info', 'Red insight: exposed database port is a priority finding.'],
  ],
  logs: () => [
    ['dim', '11:14:02 sshd  Failed password for admin from 203.0.113.77'],
    ['dim', '11:14:03 sshd  Failed password for admin from 203.0.113.77'],
    ['dim', '11:14:05 sshd  Failed password for root  from 203.0.113.77'],
    ['dim', '11:20:41 sshd  Accepted publickey for analyst from 10.10.10.20'],
    ['warn', 'Blue insight: repeated failures from one external IP.'],
  ],
  detect: () => [
    ['dim', 'Running rule: >=5 failed logins within 60 seconds'],
    ['err', 'ALERT  Possible brute-force attempt'],
    ['info', 'Source: 203.0.113.77   Severity: HIGH'],
    ['ok', "Suggested next step: run 'block'"],
  ],
  block: () => [
    ['ok', 'Firewall rule added: DROP 203.0.113.77'],
    ['ok', 'Incident ticket created: IR-2026-0142'],
    ['info', 'Containment complete. Document and review.'],
  ],
  mitre: () => [
    ['info', 'ATT&CK tactics (enterprise):'],
    ['dim', '  Reconnaissance      Resource Development   Initial Access'],
    ['dim', '  Execution           Persistence            Privilege Escalation'],
    ['dim', '  Defense Evasion     Credential Access      Discovery'],
    ['dim', '  Lateral Movement    Collection             Command and Control'],
    ['dim', '  Exfiltration        Impact'],
  ],
  'about red': () => [
    ['err', 'RED TEAM: the offensive side.'],
    ['dim', 'Emulates real adversaries, with permission, to test people,'],
    ['dim', 'processes and technology, then reports how to fix what it finds.'],
  ],
  'about blue': () => [
    ['info', 'BLUE TEAM: the defensive side.'],
    ['dim', 'Monitors, detects and responds to threats, and keeps hardening'],
    ['dim', 'systems so the next attack is harder than the last.'],
  ],
  purple: () => [
    ['info', 'PURPLE TEAM: collaboration between both sides.'],
    ['dim', 'Run a technique, check detection, tune the defense, repeat.'],
  ],
}

function pushShell(t, s) {
  shellLines.value.push({ t, s })
}
async function runShell() {
  const raw = shellInputValue.value.trim()
  shellInputValue.value = ''
  if (!raw) return
  history.unshift(raw)
  histIdx = -1
  pushShell('cmd', raw)
  const key = raw.toLowerCase().replace(/\s+/g, ' ')
  if (key === 'clear') {
    shellLines.value = []
    return
  }
  const fn = commands[key]
  if (fn) {
    for (const [t, s] of fn()) {
      pushShell(t, s)
      scrollBottom(shellBody)
      await sleep(70)
    }
  } else {
    pushShell('err', `command not found: ${raw}. Type 'help' for options.`)
  }
  scrollBottom(shellBody)
}
function quickRun(c) {
  shellInputValue.value = c
  runShell()
}
function historyUp() {
  if (histIdx < history.length - 1) shellInputValue.value = history[++histIdx]
}
function historyDown() {
  if (histIdx > 0) shellInputValue.value = history[--histIdx]
  else {
    histIdx = -1
    shellInputValue.value = ''
  }
}
function clearTerm() {
  shellLines.value = []
}
function focusInput() {
  shellInput.value?.focus()
}

/* ---------------- Digital rain canvas ---------------- */
const rainCanvas = ref(null)
let rainTimer = null
let resizeHandler = null

function startRain() {
  const canvas = rainCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const chars = '01<>/{}[]#$%&*+=;:'
  const size = 14
  let cols = 0
  let drops = []

  const setup = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    cols = Math.floor(canvas.width / size)
    drops = Array.from({ length: cols }, () => Math.random() * -50)
  }
  setup()
  resizeHandler = setup
  window.addEventListener('resize', resizeHandler)

  rainTimer = setInterval(() => {
    ctx.fillStyle = 'rgba(5, 9, 13, 0.12)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = `${size}px "JetBrains Mono", monospace`
    for (let i = 0; i < cols; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)]
      const x = i * size
      const y = drops[i] * size
      ctx.fillStyle =
        i % 3 === 0
          ? 'rgba(239,68,68,0.55)'
          : i % 3 === 1
            ? 'rgba(59,130,246,0.55)'
            : 'rgba(168,85,247,0.4)'
      ctx.fillText(ch, x, y)
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
      drops[i] += 0.6
    }
  }, 60)
}

/* ---------------- Reveal + counters ---------------- */
let observer = null
let statsAnimated = false

function animateStats() {
  if (statsAnimated) return
  statsAnimated = true
  stats.forEach((s) => {
    const start = performance.now()
    const dur = 1200
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1)
      s.display = Math.round(s.target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}

/* ---------------- Fonts + lifecycle ---------------- */
function loadFonts() {
  const id = 'rb-fonts'
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id = id
  link.rel = 'stylesheet'
  link.href =
    'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap'
  document.head.appendChild(link)
}

onMounted(() => {
  loadFonts()
  startRain()
  playDemo('red')

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          if (e.target.classList.contains('hero-copy')) animateStats()
        }
      })
    },
    { threshold: 0.12 },
  )
  document.querySelectorAll('.rb-page .reveal').forEach((el) => observer.observe(el))
  setTimeout(animateStats, 600)
})

onBeforeUnmount(() => {
  demoRun++
  if (rainTimer) clearInterval(rainTimer)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.rb-page {
  --red: #ef4444;
  --blue: #3b82f6;
  --purple: #a855f7;
  --green: #22c55e;
  --ink: #05090d;
  --panel: rgba(10, 18, 26, 0.78);
  --line: rgba(100, 116, 139, 0.2);
  --muted: #8a9bb0;
  position: relative;
  min-height: 100vh;
  background: var(--ink);
  color: #eef2f7;
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
}
.rb-page h1,
.rb-page h2,
.rb-page h3,
.rb-page h4,
.section-kicker,
.stat strong,
.step-name,
.start-btn,
.ghost-btn {
  font-family: 'Chakra Petch', 'Inter', sans-serif;
}

.rain-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
}
.ambient {
  position: fixed;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.22;
  pointer-events: none;
  z-index: 0;
  animation: drift 16s ease-in-out infinite alternate;
}
.ambient-red {
  background: var(--red);
  top: -120px;
  left: -140px;
}
.ambient-blue {
  background: var(--blue);
  top: 10%;
  right: -160px;
  animation-delay: -5s;
}
.ambient-purple {
  background: var(--purple);
  bottom: -200px;
  left: 35%;
  opacity: 0.14;
  animation-delay: -9s;
}
@keyframes drift {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(60px, 50px);
  }
}

.rb-shell {
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 70px 6% 90px;
}

/* reveal */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.8s ease,
    transform 0.8s ease;
}
.reveal.in {
  opacity: 1;
  transform: none;
}

/* ---------- Hero ---------- */
.hero {
  min-height: 600px;
  display: grid;
  grid-template-columns: 1fr 0.95fr;
  gap: 60px;
  align-items: center;
}
.eyebrow {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.eyebrow-line {
  width: 35px;
  height: 1px;
  background: #334155;
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

.glitch-title {
  margin: 22px 0;
  display: flex;
  flex-direction: column;
  font-size: clamp(44px, 6vw, 82px);
  line-height: 0.98;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.t-red {
  color: var(--red);
  text-shadow: 0 0 30px rgba(239, 68, 68, 0.45);
}
.t-blue {
  color: var(--blue);
  text-shadow: 0 0 30px rgba(59, 130, 246, 0.45);
}
.t-vs {
  color: #64748b;
  font-size: 0.3em;
  letter-spacing: 0.5em;
  margin: 8px 0;
  font-family: 'JetBrains Mono', monospace;
}
.t-red,
.t-blue {
  position: relative;
  display: inline-block;
  width: fit-content;
}
.t-red::before,
.t-red::after,
.t-blue::before,
.t-blue::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  opacity: 0.7;
  overflow: hidden;
}
.t-red::before {
  color: #fff;
  animation: glitch-a 5s infinite steps(1);
}
.t-red::after {
  color: var(--blue);
  animation: glitch-b 5s infinite steps(1);
}
.t-blue::before {
  color: #fff;
  animation: glitch-a 6s infinite steps(1);
  animation-delay: 1.2s;
}
.t-blue::after {
  color: var(--red);
  animation: glitch-b 6s infinite steps(1);
  animation-delay: 1.2s;
}
@keyframes glitch-a {
  0%,
  92%,
  100% {
    clip-path: inset(0 0 100% 0);
    transform: none;
  }
  93% {
    clip-path: inset(10% 0 60% 0);
    transform: translate(-3px, 0);
  }
  96% {
    clip-path: inset(55% 0 20% 0);
    transform: translate(3px, 0);
  }
}
@keyframes glitch-b {
  0%,
  92%,
  100% {
    clip-path: inset(0 0 100% 0);
    transform: none;
  }
  94% {
    clip-path: inset(40% 0 35% 0);
    transform: translate(3px, 1px);
  }
  97% {
    clip-path: inset(5% 0 80% 0);
    transform: translate(-3px, -1px);
  }
}

.hero-text {
  max-width: 640px;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.75;
}
.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
}
.start-btn {
  min-height: 52px;
  padding: 0 26px;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  color: #03120d;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 10px 35px rgba(16, 185, 129, 0.28);
  transition:
    transform 0.25s,
    box-shadow 0.25s;
}
.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 45px rgba(16, 185, 129, 0.4);
}
.ghost-btn {
  min-height: 52px;
  padding: 0 22px;
  border: 1px solid var(--line);
  border-radius: 12px;
  color: #cbd5e1;
  font-weight: 600;
}
.ghost-btn:hover {
  border-color: var(--purple);
  color: #fff;
}
.lesson-count {
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.stat-row {
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  gap: 34px;
  margin-top: 42px;
  padding-top: 26px;
  border-top: 1px solid var(--line);
}
.stat strong {
  display: block;
  font-size: 30px;
  font-weight: 700;
  background: linear-gradient(90deg, var(--red), var(--purple), var(--blue));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.stat span {
  font-size: 11px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ---------- Battle visual ---------- */
.battle-visual {
  position: relative;
  min-height: 520px;
  padding: 20px;
  border: 1px solid rgba(100, 116, 139, 0.22);
  border-radius: 28px;
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 45%, rgba(239, 68, 68, 0.13), transparent 27%),
    radial-gradient(circle at 85% 45%, rgba(59, 130, 246, 0.14), transparent 27%),
    radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.11), transparent 25%), #050b10;
  box-shadow:
    inset 0 0 100px rgba(0, 0, 0, 0.45),
    0 30px 90px rgba(0, 0, 0, 0.35);
}
.battle-grid {
  position: absolute;
  inset: 0;
  opacity: 0.55;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.045) 1px, transparent 1px);
  background-size: 30px 30px;
}
.battle-scan {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: -30%;
  height: 35%;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.07), transparent);
  animation: battlefield-scan 6s linear infinite;
}
.battle-header {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.18em;
}
.battle-title,
.battle-live {
  display: flex;
  align-items: center;
  gap: 8px;
}
.battle-live {
  color: #94a3b8;
}
.status-light,
.battle-live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.9);
  animation: status-blink 1.5s ease-in-out infinite;
}
.battle-scene {
  position: relative;
  z-index: 4;
  height: 390px;
  margin-top: 5px;
}
.network-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.map-line {
  fill: none;
  stroke-width: 1.2;
  stroke-dasharray: 5 7;
  opacity: 0.65;
  animation: line-flow 2.5s linear infinite;
}
.map-red {
  stroke: var(--red);
  filter: url(#softGlow);
}
.map-blue {
  stroke: var(--blue);
  filter: url(#softGlow);
}
.map-purple {
  stroke: var(--purple);
  opacity: 0.5;
}
.asset-line {
  fill: none;
  stroke: rgba(148, 163, 184, 0.18);
  stroke-dasharray: 3 8;
}
.packet {
  filter: url(#softGlow);
}
.packet-red {
  fill: var(--red);
}
.packet-blue {
  fill: var(--blue);
}
.battle-team {
  position: absolute;
  z-index: 12;
  top: 106px;
  width: 150px;
  text-align: center;
}
.battle-red {
  left: 10px;
}
.battle-blue {
  right: 10px;
}
.team-node {
  width: 70px;
  height: 70px;
  margin: 0 auto 12px;
  display: grid;
  place-items: center;
  border-radius: 19px;
  font-size: 30px;
  animation: float 4s ease-in-out infinite;
}
.battle-red .team-node {
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.5);
  background: rgba(239, 68, 68, 0.08);
  box-shadow:
    0 0 35px rgba(239, 68, 68, 0.2),
    inset 0 0 25px rgba(239, 68, 68, 0.08);
}
.battle-blue .team-node {
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.08);
  box-shadow:
    0 0 35px rgba(59, 130, 246, 0.2),
    inset 0 0 25px rgba(59, 130, 246, 0.08);
  animation-delay: -2s;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.team-name {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.16em;
}
.battle-red .team-name {
  color: #f87171;
}
.battle-blue .team-name {
  color: #60a5fa;
}
.team-type {
  margin-top: 5px;
  color: #556377;
  font-family: 'JetBrains Mono', monospace;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.14em;
}
.team-mini-stats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 14px;
}
.team-mini-stats span {
  display: flex;
  align-items: center;
  gap: 3px;
  padding: 4px 5px;
  border-radius: 4px;
  background: rgba(15, 23, 42, 0.8);
  font-family: 'JetBrains Mono', monospace;
  font-size: 6px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.battle-red .team-mini-stats span {
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}
.battle-blue .team-mini-stats span {
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}
.team-mini-stats .q-icon {
  font-size: 10px;
}
.network-node {
  position: absolute;
  z-index: 10;
  width: 60px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border-radius: 10px;
  background: rgba(8, 15, 22, 0.92);
  font-size: 16px;
}
.network-node small {
  font-family: 'JetBrains Mono', monospace;
  font-size: 5px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.node-red-1 {
  left: 30%;
  top: 40px;
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
.node-red-2 {
  left: 27%;
  bottom: 50px;
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
.node-blue-1 {
  right: 30%;
  top: 40px;
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
.node-blue-2 {
  right: 27%;
  bottom: 50px;
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.3);
}
.node-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: inherit;
  animation: node-pulse 2.4s ease-out infinite;
}
.blue-pulse {
  border-color: rgba(59, 130, 246, 0.3);
}
.target-system {
  position: absolute;
  z-index: 15;
  left: 50%;
  top: 48%;
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.target-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(168, 85, 247, 0.24);
  pointer-events: none;
}
.ring-outer {
  inset: -25px;
  animation: target-rotate 16s linear infinite;
}
.ring-middle {
  inset: -10px;
  border-color: rgba(168, 85, 247, 0.35);
  animation: target-rotate-reverse 11s linear infinite;
}
.ring-inner {
  inset: 6px;
  border-color: rgba(168, 85, 247, 0.18);
}
.target-pulse {
  position: absolute;
  width: 85px;
  height: 85px;
  border-radius: 50%;
  border: 1px solid rgba(168, 85, 247, 0.4);
  animation: target-pulse 2.5s ease-out infinite;
}
.target-core {
  position: relative;
  z-index: 5;
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid rgba(168, 85, 247, 0.65);
  background: radial-gradient(circle, rgba(168, 85, 247, 0.25), rgba(8, 15, 22, 0.95) 70%);
  color: #c084fc;
  font-size: 29px;
  box-shadow:
    0 0 40px rgba(168, 85, 247, 0.3),
    inset 0 0 25px rgba(168, 85, 247, 0.12);
}
.target-label {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
}
.target-label strong {
  color: #f8fafc;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 9px;
  letter-spacing: 0.13em;
}
.target-label span {
  margin-top: 3px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 6px;
  letter-spacing: 0.15em;
}
.target-status {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  color: var(--green);
  font-family: 'JetBrains Mono', monospace;
  font-size: 6px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.target-status i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.9);
}
.asset-node {
  position: absolute;
  z-index: 8;
  width: 65px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid rgba(100, 116, 139, 0.22);
  border-radius: 8px;
  background: rgba(8, 15, 22, 0.88);
  color: #94a3b8;
}
.asset-node .q-icon {
  font-size: 14px;
}
.asset-node span {
  font-family: 'JetBrains Mono', monospace;
  font-size: 5px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.asset-server {
  left: calc(50% - 32px);
  top: 10px;
}
.asset-database {
  left: calc(50% - 135px);
  bottom: 7px;
}
.asset-network {
  right: calc(50% - 135px);
  bottom: 7px;
}
.threat-alert {
  position: absolute;
  z-index: 18;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 205px;
  padding: 7px 10px;
  border: 1px solid rgba(239, 68, 68, 0.26);
  border-radius: 8px;
  background: rgba(15, 10, 15, 0.9);
}
.threat-icon {
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
}
.threat-icon .q-icon {
  font-size: 14px;
}
.threat-alert div {
  display: flex;
  flex-direction: column;
}
.threat-alert strong {
  color: #fca5a5;
  font-family: 'JetBrains Mono', monospace;
  font-size: 7px;
  letter-spacing: 0.1em;
}
.threat-alert small {
  margin-top: 2px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 5px;
  letter-spacing: 0.08em;
}
.threat-signal {
  width: 5px;
  height: 5px;
  margin-left: auto;
  border-radius: 50%;
  background: var(--red);
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.9);
  animation: status-blink 1s ease-in-out infinite;
}
.collaboration {
  position: absolute;
  z-index: 20;
  top: 7px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 9px;
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 20px;
  background: rgba(15, 10, 25, 0.75);
  color: #c084fc;
  font-family: 'JetBrains Mono', monospace;
  font-size: 6px;
  letter-spacing: 0.1em;
}
.collaboration .q-icon {
  font-size: 11px;
  animation: target-rotate 4s linear infinite;
}
.collab-red,
.collab-blue {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
.collab-red {
  background: var(--red);
  box-shadow: 0 0 7px rgba(239, 68, 68, 0.8);
}
.collab-blue {
  background: var(--blue);
  box-shadow: 0 0 7px rgba(59, 130, 246, 0.8);
}
.battle-telemetry {
  position: relative;
  z-index: 25;
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 9px 12px;
  border: 1px solid rgba(100, 116, 139, 0.18);
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.7);
}
.telemetry-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.telemetry-icon {
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  border-radius: 6px;
}
.red-icon {
  color: #f87171;
  background: rgba(239, 68, 68, 0.08);
}
.blue-icon {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.08);
}
.purple-icon {
  color: #c084fc;
  background: rgba(168, 85, 247, 0.08);
}
.telemetry-icon .q-icon {
  font-size: 13px;
}
.telemetry-item div {
  display: flex;
  flex-direction: column;
}
.telemetry-item small {
  color: #556377;
  font-family: 'JetBrains Mono', monospace;
  font-size: 5px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.telemetry-item strong {
  margin-top: 2px;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace;
  font-size: 6px;
  font-weight: 700;
  letter-spacing: 0.06em;
}
.telemetry-divider {
  width: 1px;
  height: 25px;
  background: rgba(100, 116, 139, 0.18);
}
.battle-footer {
  position: relative;
  z-index: 25;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: #3d4b5f;
  font-family: 'JetBrains Mono', monospace;
  font-size: 6px;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.battle-footer span {
  display: flex;
  align-items: center;
  gap: 5px;
}
.battle-footer i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 7px rgba(34, 197, 94, 0.8);
}
@keyframes battlefield-scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(500%);
  }
}
@keyframes status-blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.35;
  }
}
@keyframes line-flow {
  from {
    stroke-dashoffset: 24;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes node-pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.35);
    opacity: 0;
  }
}
@keyframes target-pulse {
  0% {
    transform: scale(0.7);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
@keyframes target-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes target-rotate-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

/* ---------- Ticker ---------- */
.ticker {
  margin-top: 50px;
  overflow: hidden;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: rgba(8, 14, 20, 0.6);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.ticker-track {
  display: flex;
  width: max-content;
  gap: 48px;
  padding: 14px 0;
  animation: ticker 40s linear infinite;
}
.ticker-track span {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  color: var(--muted);
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}
.ticker-track i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.ticker-track i.red {
  background: var(--red);
  box-shadow: 0 0 10px var(--red);
}
.ticker-track i.blue {
  background: var(--blue);
  box-shadow: 0 0 10px var(--blue);
}
.ticker-track i.purple {
  background: var(--purple);
  box-shadow: 0 0 10px var(--purple);
}
@keyframes ticker {
  to {
    transform: translateX(-50%);
  }
}

/* ---------- Sections ---------- */
.block {
  margin-top: 100px;
}
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 28px;
  gap: 16px;
}
.section-kicker {
  color: #10b981;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
}
.section-heading h2 {
  margin: 8px 0 0;
  font-size: clamp(26px, 3.4vw, 38px);
  font-weight: 700;
}
.section-heading > span {
  color: #64748b;
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
}

/* why */
.why-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.why-card {
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--panel);
  transition:
    transform 0.3s,
    border-color 0.3s;
}
.why-card:hover {
  transform: translateY(-5px);
  border-color: var(--purple);
}
.why-card .q-icon {
  font-size: 30px;
  color: #c084fc;
}
.why-card:nth-child(1) .q-icon {
  color: #f87171;
}
.why-card:nth-child(2) .q-icon {
  color: #60a5fa;
}
.why-card h3 {
  margin: 18px 0 10px;
  font-size: 20px;
}
.why-card p {
  margin: 0;
  color: var(--muted);
  line-height: 1.75;
  font-size: 14px;
}

/* ---------- Terminals ---------- */
.lab-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.term-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 18px;
  overflow: hidden;
  background: #060c11;
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.4);
}
.term-top {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 14px;
  background: #0c141c;
  border-bottom: 1px solid var(--line);
}
.term-dots {
  display: flex;
  gap: 6px;
}
.term-dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ef4444;
}
.term-dots i:nth-child(2) {
  background: #eab308;
}
.term-dots i:nth-child(3) {
  background: #22c55e;
}
.term-title {
  flex: 1;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
}
.term-tabs {
  display: flex;
  gap: 6px;
  flex: 1;
}
.term-tab {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 11px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
}
.term-tab.active.tab-red {
  color: #f87171;
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.08);
}
.term-tab.active.tab-blue {
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.08);
}
.term-replay {
  background: none;
  border: 0;
  color: #64748b;
  cursor: pointer;
  font-size: 18px;
  display: grid;
  place-items: center;
}
.term-replay:hover {
  color: #fff;
}
.term-body {
  height: 340px;
  overflow-y: auto;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12.5px;
  line-height: 1.7;
  cursor: text;
}
.term-body::-webkit-scrollbar {
  width: 6px;
}
.term-body::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 3px;
}
.tl {
  white-space: pre-wrap;
  word-break: break-word;
}
.tl-cmd {
  color: #e2e8f0;
  margin-top: 6px;
}
.tl-ok {
  color: #34d399;
}
.tl-warn {
  color: #fbbf24;
}
.tl-err {
  color: #f87171;
}
.tl-info {
  color: #93c5fd;
}
.tl-dim {
  color: #7a8aa0;
}
.prompt {
  margin-right: 8px;
  font-weight: 700;
}
.prompt.red {
  color: #f87171;
}
.prompt.blue {
  color: #60a5fa;
}
.prompt.purple {
  color: #c084fc;
}
.caret {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: #e2e8f0;
  animation: caret 1s steps(1) infinite;
}
@keyframes caret {
  50% {
    opacity: 0;
  }
}
.input-line {
  display: flex;
  align-items: center;
}
.shell-input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: #e2e8f0;
  font-family: inherit;
  font-size: inherit;
  caret-color: #c084fc;
}
.term-note {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-top: 1px solid var(--line);
  color: #64748b;
  font-size: 12px;
}
.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid var(--line);
}
.chip {
  padding: 5px 11px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: rgba(15, 23, 42, 0.7);
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  cursor: pointer;
  transition: 0.2s;
}
.chip:hover {
  border-color: var(--purple);
  color: #fff;
  background: rgba(168, 85, 247, 0.12);
}

/* ---------- Kill chain ---------- */
.chain {
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: var(--panel);
}
.chain-steps {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
}
.chain-step {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 10px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(8, 14, 20, 0.7);
  color: #7a8aa0;
  text-align: left;
  cursor: pointer;
  transition: 0.25s;
}
.chain-step:hover {
  border-color: #475569;
  color: #cbd5e1;
}
.chain-step.done {
  color: #94a3b8;
}
.chain-step.active {
  color: #fff;
  border-color: var(--purple);
  background: rgba(168, 85, 247, 0.12);
  box-shadow: 0 0 28px rgba(168, 85, 247, 0.2);
}
.step-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: #c084fc;
}
.step-name {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.25;
}
.chain-progress {
  height: 3px;
  margin: 18px 0 24px;
  border-radius: 2px;
  background: #121c26;
  overflow: hidden;
}
.chain-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--red), var(--purple), var(--blue));
  transition: width 0.5s ease;
}
.chain-detail {
  display: grid;
  grid-template-columns: 1fr 50px 1fr;
  gap: 14px;
  align-items: stretch;
}
.chain-col {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid var(--line);
}
.chain-red {
  background: linear-gradient(160deg, rgba(239, 68, 68, 0.1), rgba(8, 14, 20, 0.6));
  border-color: rgba(239, 68, 68, 0.25);
}
.chain-blue {
  background: linear-gradient(200deg, rgba(59, 130, 246, 0.1), rgba(8, 14, 20, 0.6));
  border-color: rgba(59, 130, 246, 0.25);
}
.chain-label {
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
}
.chain-red .chain-label {
  color: #f87171;
}
.chain-blue .chain-label {
  color: #60a5fa;
}
.chain-col h3 {
  margin: 14px 0 8px;
  font-size: 19px;
}
.chain-col p {
  margin: 0;
  color: #9fb0c4;
  line-height: 1.75;
  font-size: 14px;
}
.chain-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}
.chain-tools span {
  padding: 4px 9px;
  border: 1px solid var(--line);
  border-radius: 6px;
  color: #94a3b8;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
}
.chain-mid {
  display: grid;
  place-items: center;
  color: #c084fc;
  font-size: 26px;
}
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.25s,
    transform 0.25s;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* ---------- Lessons ---------- */
.lesson-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.lesson-card {
  position: relative;
  display: grid;
  grid-template-columns: 40px 52px 1fr 30px;
  gap: 18px;
  align-items: center;
  width: 100%;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--panel);
  color: inherit;
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s ease;
}
.lesson-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 30%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.7s;
}
.lesson-card:hover::before {
  transform: translateX(100%);
}
.lesson-card:hover {
  transform: translateY(-4px);
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.06);
}
.lesson-card.cat-red:hover {
  border-color: var(--red);
  background: rgba(239, 68, 68, 0.06);
}
.lesson-card.cat-blue:hover {
  border-color: var(--blue);
  background: rgba(59, 130, 246, 0.06);
}
.lesson-card.cat-purple:hover {
  border-color: var(--purple);
  background: rgba(168, 85, 247, 0.07);
}
.lesson-number {
  color: #475569;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
}
.lesson-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: #111c23;
  color: #34d399;
  font-size: 22px;
}
.cat-red .lesson-icon {
  color: #f87171;
  background: rgba(239, 68, 68, 0.1);
}
.cat-blue .lesson-icon {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.1);
}
.cat-purple .lesson-icon {
  color: #c084fc;
  background: rgba(168, 85, 247, 0.1);
}
.lesson-info span {
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.lesson-info h3 {
  margin: 5px 0;
  font-size: 17px;
}
.lesson-info p {
  margin: 0;
  color: #7a8aa0;
  font-size: 13px;
}
.arrow {
  color: #475569;
  transition: 0.3s;
}
.lesson-card:hover .arrow {
  color: #fff;
  transform: translateX(5px);
}

/* ---------- Roles ---------- */
.roles-section {
  margin-top: 90px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.role-card {
  padding: 36px;
  border-radius: 22px;
  border: 1px solid var(--line);
  background: var(--panel);
  transition: transform 0.3s;
}
.role-card:hover {
  transform: translateY(-5px);
}
.red-role {
  box-shadow: inset 3px 0 var(--red);
}
.blue-role {
  box-shadow: inset 3px 0 var(--blue);
}
.role-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
}
.red-role .role-top .q-icon {
  color: #f87171;
}
.blue-role .role-top .q-icon {
  color: #60a5fa;
}
.role-badge {
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
}
.role-card h2 {
  margin: 26px 0 10px;
  font-size: 32px;
}
.role-card p {
  color: var(--muted);
  line-height: 1.75;
}
.role-list {
  margin: 16px 0 0;
  padding-left: 18px;
  color: #aab8c9;
  font-size: 14px;
  line-height: 2;
}
.role-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 24px;
}
.role-tags span {
  padding: 6px 10px;
  border: 1px solid #263442;
  border-radius: 6px;
  color: #64748b;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

/* ---------- Purple ---------- */
.purple-section {
  position: relative;
  margin-top: 100px;
  padding: 56px;
  border: 1px solid rgba(168, 85, 247, 0.3);
  border-radius: 28px;
  overflow: hidden;
  background:
    radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.18), transparent 45%),
    linear-gradient(
      120deg,
      rgba(239, 68, 68, 0.06),
      rgba(10, 14, 24, 0.9) 40%,
      rgba(59, 130, 246, 0.06)
    );
}
.purple-orb {
  position: absolute;
  right: -90px;
  top: -90px;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 1px dashed rgba(168, 85, 247, 0.4);
  animation: target-rotate 30s linear infinite;
}
.purple-content {
  position: relative;
}
.purple-kicker {
  color: #c084fc;
}
.purple-content h2 {
  margin: 8px 0 14px;
  font-size: clamp(26px, 3.4vw, 38px);
}
.purple-content > p {
  max-width: 760px;
  color: #a9b6c8;
  line-height: 1.8;
}
.purple-cycle {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  margin-top: 34px;
}
.cycle-node {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px 16px;
  border: 1px solid rgba(168, 85, 247, 0.25);
  border-radius: 14px;
  background: rgba(10, 8, 20, 0.6);
}
.cycle-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: rgba(168, 85, 247, 0.14);
  color: #c084fc;
  font-size: 20px;
  margin-bottom: 6px;
}
.cycle-node strong {
  font-family: 'Chakra Petch', sans-serif;
  font-size: 16px;
}
.cycle-node span {
  color: #8a9bb0;
  font-size: 12.5px;
  line-height: 1.5;
}
.cycle-arrow {
  position: absolute;
  right: -17px;
  top: 50%;
  z-index: 3;
  color: #c084fc;
  font-size: 18px;
  transform: translateY(-50%);
  animation: nudge 1.6s ease-in-out infinite;
}
@keyframes nudge {
  50% {
    transform: translate(4px, -50%);
  }
}

/* ---------- Toolkit ---------- */
.tool-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}
.tool-col {
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: var(--panel);
}
.tool-col h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 14px;
  font-size: 19px;
}
.tc-red {
  color: #f87171;
}
.tc-blue {
  color: #60a5fa;
}
.tool-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 14px 0;
  border-top: 1px solid var(--line);
}
.tool-item strong {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13.5px;
}
.tool-item span {
  color: var(--muted);
  font-size: 13.5px;
}

/* ---------- Timeline ---------- */
.timeline {
  position: relative;
  padding: 10px 0;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--red), var(--purple), var(--blue));
  opacity: 0.5;
  transform: translateX(-50%);
}
.tl-item {
  position: relative;
  width: 50%;
  padding: 0 44px 34px;
}
.tl-item.left {
  text-align: right;
}
.tl-item.right {
  margin-left: 50%;
}
.tl-dot {
  position: absolute;
  top: 18px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--ink);
  border: 3px solid var(--purple);
}
.tl-item.left .tl-dot {
  right: -7px;
}
.tl-item.right .tl-dot {
  left: -7px;
}
.tl-item.red .tl-dot {
  border-color: var(--red);
  box-shadow: 0 0 14px var(--red);
}
.tl-item.blue .tl-dot {
  border-color: var(--blue);
  box-shadow: 0 0 14px var(--blue);
}
.tl-item.purple .tl-dot {
  box-shadow: 0 0 14px var(--purple);
}
.tl-card {
  padding: 20px 22px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--panel);
  transition: 0.3s;
}
.tl-card:hover {
  transform: translateY(-3px);
  border-color: #475569;
}
.tl-time {
  color: #c084fc;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
}
.tl-item.red .tl-time {
  color: #f87171;
}
.tl-item.blue .tl-time {
  color: #60a5fa;
}
.tl-card h4 {
  margin: 6px 0;
  font-size: 17px;
}
.tl-card p {
  margin: 0;
  color: var(--muted);
  font-size: 13.5px;
  line-height: 1.7;
}

/* ---------- FAQ ---------- */
.faq {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.faq-item {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--panel);
  overflow: hidden;
  transition: border-color 0.3s;
}
.faq-item.open {
  border-color: rgba(168, 85, 247, 0.5);
}
.faq-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 24px;
  background: none;
  border: 0;
  color: #eef2f7;
  font-family: 'Chakra Petch', sans-serif;
  font-size: 17px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}
.faq-q .q-icon {
  color: #c084fc;
}
.faq-a {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}
.faq-item.open .faq-a {
  max-height: 200px;
}
.faq-a p {
  margin: 0;
  padding: 0 24px 22px;
  color: var(--muted);
  line-height: 1.8;
  font-size: 14.5px;
}

/* ---------- CTA ---------- */
.cta {
  margin-top: 100px;
  padding: 64px 30px;
  text-align: center;
  border: 1px solid var(--line);
  border-radius: 28px;
  background:
    radial-gradient(circle at 50% 0%, rgba(16, 185, 129, 0.15), transparent 60%), var(--panel);
}
.cta-icon {
  font-size: 46px;
  color: #34d399;
  animation: float 3.5s ease-in-out infinite;
}
.cta h2 {
  margin: 16px 0 10px;
  font-size: clamp(24px, 3.4vw, 36px);
}
.cta p {
  max-width: 560px;
  margin: 0 auto 28px;
  color: var(--muted);
  line-height: 1.7;
}

/* ---------- Responsive ---------- */
@media (max-width: 1000px) {
  .hero,
  .lab-grid,
  .roles-section,
  .tool-columns {
    grid-template-columns: 1fr;
  }
  .lesson-grid,
  .why-grid {
    grid-template-columns: 1fr;
  }
  .chain-steps {
    grid-template-columns: repeat(4, 1fr);
  }
  .chain-detail {
    grid-template-columns: 1fr;
  }
  .chain-mid {
    transform: rotate(90deg);
  }
  .purple-cycle {
    grid-template-columns: 1fr 1fr;
  }
  .cycle-arrow {
    display: none;
  }
}
@media (max-width: 700px) {
  .timeline::before {
    left: 10px;
  }
  .tl-item,
  .tl-item.right {
    width: 100%;
    margin-left: 0;
    padding: 0 0 28px 38px;
    text-align: left;
  }
  .tl-item.left .tl-dot,
  .tl-item.right .tl-dot {
    left: 3px;
    right: auto;
  }
}
@media (max-width: 600px) {
  .rb-shell {
    padding: 45px 18px 70px;
  }
  .stat-row {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .battle-visual {
    min-height: 500px;
    padding: 15px;
  }
  .battle-scene {
    height: 365px;
  }
  .battle-team {
    width: 105px;
    top: 115px;
  }
  .battle-red {
    left: -2px;
  }
  .battle-blue {
    right: -2px;
  }
  .team-node {
    width: 55px;
    height: 55px;
    font-size: 23px;
  }
  .team-name {
    font-size: 9px;
  }
  .team-type {
    font-size: 5px;
  }
  .team-mini-stats span {
    font-size: 5px;
    padding: 3px;
  }
  .network-node,
  .asset-node {
    transform: scale(0.8);
  }
  .target-system {
    transform: translate(-50%, -50%) scale(0.82);
  }
  .threat-alert {
    min-width: 175px;
    transform: translateX(-50%) scale(0.82);
  }
  .battle-telemetry {
    gap: 5px;
    padding: 7px;
  }
  .lesson-card {
    grid-template-columns: 35px 45px 1fr;
  }
  .lesson-card .arrow {
    display: none;
  }
  .chain-steps {
    grid-template-columns: 1fr 1fr;
  }
  .purple-section {
    padding: 34px 22px;
  }
  .purple-cycle {
    grid-template-columns: 1fr;
  }
  .term-body {
    height: 300px;
    font-size: 11.5px;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
