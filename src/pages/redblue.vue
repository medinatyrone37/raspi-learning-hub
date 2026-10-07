<template>
  <q-page class="redblue-page">
    <div class="redblue-shell">
      <section class="hero-section">
        <div class="hero-copy">
          <div class="eyebrow">
            <span class="dot red"></span>
            CYBERSECURITY MODULE
            <span class="divider"></span>
            <span class="dot blue"></span>
          </div>

          <h1>
            Red Team
            <span>vs</span>
            Blue Team
          </h1>

          <p>
            Learn how offensive and defensive security teams work together to identify weaknesses,
            detect threats, and strengthen cybersecurity defenses.
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

            <div class="lesson-count">
              <q-icon name="menu_book" />
              {{ lessons.length }} Lessons
            </div>
          </div>
        </div>

        <div class="battle-visual">
          <div class="rb-bg-grid"></div>
          <div class="rb-bg-glow rb-glow-red"></div>
          <div class="rb-bg-glow rb-glow-blue"></div>
          <div class="rb-scanline"></div>

          <!-- TOP HUD -->
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

          <!-- MAIN BATTLEFIELD -->
          <div class="rb-battlefield">
            <!-- LEFT RED CONSOLE -->
            <div class="rb-console rb-red-console">
              <div class="rb-console-header">
                <span>
                  <i class="rb-red-dot"></i>
                  RED TEAM
                </span>

                <small>ATTACK OPS</small>
              </div>

              <div class="rb-console-icon">
                <q-icon name="swords" />
              </div>

              <div class="rb-console-title">
                OFFENSIVE
                <span>OPERATIONS</span>
              </div>

              <div class="rb-console-status">
                <span class="active"></span>
                SIMULATION ACTIVE
              </div>

              <div class="rb-terminal">
                <div>
                  <span class="terminal-time">13:04:21</span>
                  <b class="terminal-red">SCAN</b>
                  <span>target discovery</span>
                </div>

                <div>
                  <span class="terminal-time">13:04:24</span>
                  <b class="terminal-red">ENUM</b>
                  <span>service mapping</span>
                </div>

                <div>
                  <span class="terminal-time">13:04:27</span>
                  <b class="terminal-red">TEST</b>
                  <span>security control</span>
                </div>
              </div>

              <div class="rb-console-metrics">
                <div>
                  <strong>04</strong>
                  <span>HOSTS</span>
                </div>

                <div>
                  <strong>12</strong>
                  <span>EVENTS</span>
                </div>

                <div>
                  <strong>03</strong>
                  <span>PATHS</span>
                </div>
              </div>
            </div>

            <!-- RED RADAR -->
            <div class="rb-radar rb-radar-left">
              <div class="radar-circle radar-c1"></div>
              <div class="radar-circle radar-c2"></div>
              <div class="radar-circle radar-c3"></div>

              <div class="radar-cross horizontal"></div>
              <div class="radar-cross vertical"></div>

              <div class="radar-sweep"></div>

              <span class="radar-target rt-1"></span>
              <span class="radar-target rt-2"></span>
              <span class="radar-target rt-3"></span>
            </div>

            <!-- RIGHT BLUE SOC -->
            <div class="rb-console rb-blue-console">
              <div class="rb-console-header">
                <span>
                  <i class="rb-blue-dot"></i>
                  BLUE TEAM
                </span>

                <small>SOC MONITOR</small>
              </div>

              <div class="rb-console-icon">
                <q-icon name="shield" />
              </div>

              <div class="rb-console-title">
                DEFENSIVE
                <span>OPERATIONS</span>
              </div>

              <div class="rb-console-status">
                <span class="active blue-active"></span>
                MONITORING ACTIVE
              </div>

              <div class="rb-terminal">
                <div>
                  <span class="terminal-time">13:04:22</span>
                  <b class="terminal-blue">SIEM</b>
                  <span>event received</span>
                </div>

                <div>
                  <span class="terminal-time">13:04:25</span>
                  <b class="terminal-blue">IDS</b>
                  <span>anomaly detected</span>
                </div>

                <div>
                  <span class="terminal-time">13:04:28</span>
                  <b class="terminal-blue">SOC</b>
                  <span>response initiated</span>
                </div>
              </div>

              <div class="rb-console-metrics">
                <div>
                  <strong>08</strong>
                  <span>ALERTS</span>
                </div>

                <div>
                  <strong>24</strong>
                  <span>LOGS/S</span>
                </div>

                <div>
                  <strong>99%</strong>
                  <span>UPTIME</span>
                </div>
              </div>
            </div>

            <!-- BLUE RADAR -->
            <div class="rb-radar rb-radar-right">
              <div class="radar-circle radar-c1"></div>
              <div class="radar-circle radar-c2"></div>
              <div class="radar-circle radar-c3"></div>

              <div class="radar-cross horizontal"></div>
              <div class="radar-cross vertical"></div>

              <div class="radar-sweep blue-sweep"></div>

              <span class="radar-target rt-1 blue-target"></span>
              <span class="radar-target rt-2 blue-target"></span>
              <span class="radar-target rt-3 blue-target"></span>
            </div>

            <!-- CENTRAL INFRASTRUCTURE -->
            <div class="rb-core">
              <div class="core-label">
                <span class="core-ping"></span>
                PROTECTED INFRASTRUCTURE
              </div>

              <div class="core-shield">
                <div class="shield-ring shield-ring-1"></div>
                <div class="shield-ring shield-ring-2"></div>
                <div class="shield-ring shield-ring-3"></div>

                <div class="core-lock">
                  <q-icon name="security" />
                </div>
              </div>

              <strong>CORE SYSTEM</strong>
              <small>DEFENSE PERIMETER ACTIVE</small>

              <div class="core-health">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <b>SECURE</b>
              </div>
            </div>

            <!-- INFRASTRUCTURE NODES -->
            <div class="rb-asset rb-server">
              <q-icon name="dns" />
              <div>
                <strong>WEB SERVER</strong>
                <small>10.24.12.20</small>
              </div>
              <span class="asset-online"></span>
            </div>

            <div class="rb-asset rb-db">
              <q-icon name="storage" />
              <div>
                <strong>DATABASE</strong>
                <small>MYSQL / PRIMARY</small>
              </div>
              <span class="asset-online"></span>
            </div>

            <div class="rb-asset rb-api">
              <q-icon name="api" />
              <div>
                <strong>API GATEWAY</strong>
                <small>PORT 8000</small>
              </div>
              <span class="asset-online"></span>
            </div>

            <div class="rb-asset rb-endpoint">
              <q-icon name="devices" />
              <div>
                <strong>ENDPOINT</strong>
                <small>CLIENT NODE</small>
              </div>
              <span class="asset-online"></span>
            </div>

            <!-- CONNECTION LINES -->
            <svg
              class="rb-network-svg"
              viewBox="0 0 1000 570"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path class="rb-line rb-line-red" d="M100 160 C210 130 250 175 350 255" />

              <path class="rb-line rb-line-red" d="M100 400 C210 430 270 350 360 300" />

              <path class="rb-line rb-line-blue" d="M900 160 C790 130 750 175 650 255" />

              <path class="rb-line rb-line-blue" d="M900 400 C790 430 730 350 640 300" />

              <path class="rb-line rb-line-purple" d="M380 270 C440 235 560 235 620 270" />

              <path class="rb-line rb-line-purple" d="M390 300 C450 335 550 335 610 300" />

              <path class="rb-asset-line" d="M500 285 L500 105" />

              <path class="rb-asset-line" d="M500 285 L350 445" />

              <path class="rb-asset-line" d="M500 285 L650 445" />

              <circle class="rb-packet rb-packet-red" r="5">
                <animateMotion
                  dur="2.5s"
                  repeatCount="indefinite"
                  path="M100 160 C210 130 250 175 350 255"
                />
              </circle>

              <circle class="rb-packet rb-packet-red" r="4">
                <animateMotion
                  dur="3.2s"
                  repeatCount="indefinite"
                  path="M100 400 C210 430 270 350 360 300"
                />
              </circle>

              <circle class="rb-packet rb-packet-blue" r="5">
                <animateMotion
                  dur="2.8s"
                  repeatCount="indefinite"
                  path="M900 160 C790 130 750 175 650 255"
                />
              </circle>

              <circle class="rb-packet rb-packet-blue" r="4">
                <animateMotion
                  dur="3.5s"
                  repeatCount="indefinite"
                  path="M900 400 C790 430 730 350 640 300"
                />
              </circle>
            </svg>

            <!-- ATTACK / DETECTION FLOW -->
            <div class="rb-flow">
              <div class="flow-item flow-red">
                <q-icon name="flash_on" />
                <span>ATTACK</span>
              </div>

              <div class="flow-arrow">→</div>

              <div class="flow-item flow-purple">
                <q-icon name="radar" />
                <span>DETECT</span>
              </div>

              <div class="flow-arrow">→</div>

              <div class="flow-item flow-blue">
                <q-icon name="shield" />
                <span>RESPOND</span>
              </div>
            </div>

            <!-- THREAT ALERT -->
            <div class="rb-alert">
              <div class="alert-icon">
                <q-icon name="warning" />
              </div>

              <div class="alert-copy">
                <strong>THREAT ACTIVITY DETECTED</strong>
                <span>Authorized Red Team simulation</span>
              </div>

              <div class="alert-level">
                <small>LEVEL</small>
                <strong>MED</strong>
              </div>
            </div>

            <!-- PURPLE TEAM -->
            <div class="rb-purple">
              <span class="purple-red"></span>

              <q-icon name="sync" />

              <strong>PURPLE TEAM</strong>

              <span class="purple-blue"></span>
            </div>
          </div>

          <!-- BOTTOM TELEMETRY -->
          <div class="rb-telemetry">
            <div class="telemetry-card">
              <div class="telemetry-card-icon telemetry-red">
                <q-icon name="bolt" />
              </div>

              <div>
                <small>RED ACTIVITY</small>
                <strong>03 ACTIVE PATHS</strong>
              </div>

              <span class="telemetry-bar">
                <i></i>
              </span>
            </div>

            <div class="telemetry-card">
              <div class="telemetry-card-icon telemetry-purple">
                <q-icon name="radar" />
              </div>

              <div>
                <small>THREAT DETECTION</small>
                <strong>08 EVENTS</strong>
              </div>

              <span class="telemetry-bar">
                <i></i>
              </span>
            </div>

            <div class="telemetry-card">
              <div class="telemetry-card-icon telemetry-blue">
                <q-icon name="shield" />
              </div>

              <div>
                <small>BLUE RESPONSE</small>
                <strong>DEFENSE ACTIVE</strong>
              </div>

              <span class="telemetry-bar">
                <i></i>
              </span>
            </div>
          </div>

          <div class="rb-footer-status">
            <span>
              <i></i>
              SYSTEM ONLINE
            </span>

            <span>
              <q-icon name="lock" />
              PROTECTED PERIMETER
            </span>

            <span>
              <q-icon name="sync" />
              CONTINUOUS DEFENSE
            </span>

            <span> 13:04:29 UTC </span>
          </div>
        </div>
      </section>

      <section class="module-section">
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
            type="button"
            @click="openLesson(lesson.id)"
          >
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

      <section class="roles-section">
        <div class="role-card red-role">
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

        <div class="role-card blue-role">
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
    </div>
  </q-page>
</template>

<script setup>
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
</script>

<style scoped>
.redblue-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 15% 10%, rgba(239, 68, 68, 0.08), transparent 30%),
    radial-gradient(circle at 85% 15%, rgba(59, 130, 246, 0.1), transparent 30%), #071014;
  color: #f8fafc;
}

.redblue-shell {
  max-width: 1400px;
  margin: 0 auto;
  padding: 70px 6%;
}

.hero-section {
  min-height: 560px;
  display: grid;
  grid-template-columns: 1fr 0.95fr;
  gap: 70px;
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
  background: #ef4444;
  box-shadow: 0 0 14px rgba(239, 68, 68, 0.7);
}

.dot.blue {
  background: #3b82f6;
  box-shadow: 0 0 14px rgba(59, 130, 246, 0.7);
}

.divider {
  width: 35px;
  height: 1px;
  background: #334155;
}

.hero-copy h1 {
  margin: 22px 0;
  font-size: clamp(48px, 6vw, 86px);
  line-height: 0.95;
  letter-spacing: -0.055em;
  font-weight: 900;
}

.hero-copy h1 span {
  display: block;
  color: #64748b;
  font-size: 0.42em;
  letter-spacing: 0;
  margin: 12px 0;
}

.hero-copy p {
  max-width: 650px;
  color: #94a3b8;
  font-size: 18px;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 35px;
}

.start-btn {
  min-height: 52px;
  padding: 0 25px;
  border-radius: 12px;
  background: #10b981;
  color: #03120d;
  font-weight: 900;
}

.lesson-count {
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.battle-visual {
  position: relative;
  min-height: 440px;
  border: 1px solid #1e293b;
  border-radius: 28px;
  overflow: hidden;
  background: #0a1318;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.grid-bg {
  position: absolute;
  inset: 0;
  opacity: 0.5;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
}

.team,
.versus {
  position: relative;
  z-index: 2;
  text-align: center;
}

.team-icon {
  width: 110px;
  height: 110px;
  margin: 0 auto 20px;
  display: grid;
  place-items: center;
  border-radius: 24px;
  font-size: 48px;
}

.red-team .team-icon {
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.35);
  background: rgba(239, 68, 68, 0.08);
  box-shadow: 0 0 60px rgba(239, 68, 68, 0.12);
}

.blue-team .team-icon {
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.35);
  background: rgba(59, 130, 246, 0.08);
  box-shadow: 0 0 60px rgba(59, 130, 246, 0.12);
}

.team-label {
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 0.18em;
}

.team-status {
  margin-top: 8px;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #64748b;
}

.versus {
  width: 60px;
  height: 60px;
  border: 1px solid #334155;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #071014;
  color: #e2e8f0;
  font-size: 13px;
  font-weight: 900;
}

.connection {
  position: absolute;
  left: 22%;
  right: 22%;
  height: 1px;
  background: linear-gradient(90deg, #ef4444, #475569, #3b82f6);
  opacity: 0.55;
}

.connection-top {
  top: 37%;
}

.connection-bottom {
  top: 63%;
}

/* =========================================================
   RED / BLUE COMMAND CENTER VISUAL
   ========================================================= */

.battle-visual {
  position: relative;
  min-height: 440px;
  border: 1px solid rgba(100, 116, 139, 0.22);
  border-radius: 28px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 50%, rgba(239, 68, 68, 0.13), transparent 28%),
    radial-gradient(circle at 82% 50%, rgba(59, 130, 246, 0.14), transparent 28%),
    radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.08), transparent 25%), #071014;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 22px;
  box-shadow:
    inset 0 0 80px rgba(0, 0, 0, 0.28),
    0 25px 80px rgba(0, 0, 0, 0.18);
}

.battle-visual::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(90deg, transparent 49.8%, rgba(148, 163, 184, 0.07) 50%, transparent 50.2%),
    linear-gradient(0deg, transparent 49.8%, rgba(148, 163, 184, 0.05) 50%, transparent 50.2%);
  background-size:
    100% 100%,
    100% 100%;
}

.visual-scanline {
  position: absolute;
  left: 0;
  right: 0;
  top: -20%;
  height: 30%;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.035), transparent);
  animation: rb-scan 5s linear infinite;
}

.visual-header {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #64748b;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.2em;
}

.visual-live {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #94a3b8;
}

.visual-live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.9);
  animation: rb-live 1.5s ease-in-out infinite;
}

.operation-map {
  position: relative;
  z-index: 3;
  flex: 1;
  min-height: 285px;
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
  align-items: center;
  gap: 18px;
}

.operation-side {
  position: relative;
  z-index: 4;
  text-align: center;
}

.operation-node {
  width: 76px;
  height: 76px;
  margin: 0 auto 13px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  font-size: 32px;
  transition: 0.3s ease;
}

.operation-red .operation-node {
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.45);
  background: rgba(239, 68, 68, 0.09);
  box-shadow:
    0 0 35px rgba(239, 68, 68, 0.14),
    inset 0 0 20px rgba(239, 68, 68, 0.08);
}

.operation-blue .operation-node {
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.45);
  background: rgba(59, 130, 246, 0.09);
  box-shadow:
    0 0 35px rgba(59, 130, 246, 0.14),
    inset 0 0 20px rgba(59, 130, 246, 0.08);
}

.operation-team {
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.16em;
}

.operation-red .operation-team {
  color: #f87171;
}

.operation-blue .operation-team {
  color: #60a5fa;
}

.operation-role {
  margin-top: 5px;
  color: #64748b;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.2em;
}

.operation-steps {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 18px;
}

.operation-steps span {
  padding: 5px 7px;
  border-radius: 5px;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.12em;
  background: rgba(15, 23, 42, 0.8);
}

.operation-red .operation-steps span {
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
}

.operation-blue .operation-steps span {
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #93c5fd;
}

.operation-center {
  position: relative;
  z-index: 6;
  width: 140px;
  height: 140px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.security-core {
  position: relative;
  z-index: 5;
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(168, 85, 247, 0.55);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.22), rgba(15, 23, 42, 0.9) 70%);
  color: #c084fc;
  font-size: 31px;
  box-shadow:
    0 0 35px rgba(168, 85, 247, 0.24),
    inset 0 0 20px rgba(168, 85, 247, 0.1);
}

.core-pulse {
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 50%;
  animation: rb-core-pulse 2.5s ease-out infinite;
}

.operation-center strong {
  margin-top: 10px;
  color: #f8fafc;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.16em;
}

.operation-center small {
  margin-top: 4px;
  color: #64748b;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.orbit {
  position: absolute;
  border: 1px dashed rgba(168, 85, 247, 0.18);
  border-radius: 50%;
  pointer-events: none;
}

.orbit-one {
  inset: 7px;
  animation: rb-orbit 12s linear infinite;
}

.orbit-two {
  inset: -12px;
  border-color: rgba(148, 163, 184, 0.08);
  animation: rb-orbit-reverse 18s linear infinite;
}

.attack-line {
  position: absolute;
  z-index: 2;
  top: 50%;
  height: 1px;
  pointer-events: none;
}

.line-one {
  left: 4%;
  width: 30%;
  background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.7));
}

.line-two {
  left: 30%;
  width: 20%;
  background: linear-gradient(90deg, rgba(239, 68, 68, 0.7), rgba(168, 85, 247, 0.7));
}

.line-three {
  right: 30%;
  width: 20%;
  background: linear-gradient(90deg, rgba(168, 85, 247, 0.7), rgba(59, 130, 246, 0.7));
}

.line-four {
  right: 4%;
  width: 30%;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.7), transparent);
}

.line-one::after,
.line-two::after,
.line-three::after,
.line-four::after {
  content: '';
  position: absolute;
  top: -2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  animation: rb-particle 3s linear infinite;
}

.line-one::after,
.line-two::after {
  background: #ef4444;
  box-shadow: 0 0 10px #ef4444;
}

.line-three::after,
.line-four::after {
  background: #3b82f6;
  box-shadow: 0 0 10px #3b82f6;
}

.line-one::after,
.line-two::after {
  left: 0;
}

.line-three::after,
.line-four::after {
  right: 0;
}

.event-bar {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid rgba(100, 116, 139, 0.16);
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.55);
  color: #64748b;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.event-bar > div {
  display: flex;
  align-items: center;
  gap: 6px;
}

.event-bar > div:last-child {
  justify-content: flex-end;
}

.event-message {
  color: #94a3b8;
}

.event-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.event-dot.red {
  background: #ef4444;
  box-shadow: 0 0 9px rgba(239, 68, 68, 0.8);
}

.event-dot.blue {
  background: #3b82f6;
  box-shadow: 0 0 9px rgba(59, 130, 246, 0.8);
}

.visual-status {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 12px;
  color: #475569;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.visual-status span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.visual-status i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.8);
}

.visual-status .q-icon {
  color: #94a3b8;
  font-size: 11px;
}

@keyframes rb-scan {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(500%);
  }
}

@keyframes rb-live {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.35;
  }
}

@keyframes rb-core-pulse {
  0% {
    transform: scale(0.7);
    opacity: 0.7;
  }

  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

@keyframes rb-orbit {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes rb-orbit-reverse {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

@keyframes rb-particle {
  0% {
    opacity: 0;
    transform: translateX(0);
  }

  15% {
    opacity: 1;
  }

  85% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(100px);
  }
}
/* =========================================================
   CYBER BATTLEFIELD NETWORK VISUAL
   ========================================================= */

.battle-visual {
  position: relative;
  min-height: 520px;
  padding: 20px;
  border: 1px solid rgba(100, 116, 139, 0.2);
  border-radius: 28px;
  overflow: hidden;
  background:
    radial-gradient(circle at 15% 45%, rgba(239, 68, 68, 0.13), transparent 27%),
    radial-gradient(circle at 85% 45%, rgba(59, 130, 246, 0.14), transparent 27%),
    radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.11), transparent 25%), #050b10;
  box-shadow:
    inset 0 0 100px rgba(0, 0, 0, 0.45),
    0 30px 90px rgba(0, 0, 0, 0.25);
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

.battle-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(
      90deg,
      rgba(239, 68, 68, 0.04),
      transparent 35%,
      transparent 65%,
      rgba(59, 130, 246, 0.04)
    ),
    radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.3));
}

.battle-scan {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: -30%;
  height: 35%;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.06), transparent);
  animation: battlefield-scan 6s linear infinite;
}

.battle-header {
  position: relative;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #64748b;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.18em;
}

.battle-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-light {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.9);
  animation: status-blink 1.5s ease-in-out infinite;
}

.battle-live {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #94a3b8;
}

.battle-live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 10px rgba(34, 197, 94, 0.8);
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
  opacity: 0.6;
  animation: line-flow 2.5s linear infinite;
}

.map-red {
  stroke: #ef4444;
  filter: url(#softGlow);
}

.map-blue {
  stroke: #3b82f6;
  filter: url(#softGlow);
}

.map-purple {
  stroke: #a855f7;
  opacity: 0.5;
}

.asset-line {
  fill: none;
  stroke: rgba(148, 163, 184, 0.18);
  stroke-width: 1;
  stroke-dasharray: 3 8;
}

.packet {
  filter: url(#softGlow);
}

.packet-red {
  fill: #ef4444;
}

.packet-blue {
  fill: #3b82f6;
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
  transition: 0.3s ease;
}

.battle-red .team-node {
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.5);
  background: rgba(239, 68, 68, 0.08);
  box-shadow:
    0 0 35px rgba(239, 68, 68, 0.18),
    inset 0 0 25px rgba(239, 68, 68, 0.08);
}

.battle-blue .team-node {
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.5);
  background: rgba(59, 130, 246, 0.08);
  box-shadow:
    0 0 35px rgba(59, 130, 246, 0.18),
    inset 0 0 25px rgba(59, 130, 246, 0.08);
}

.team-name {
  font-size: 11px;
  font-weight: 900;
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
  color: #475569;
  font-size: 7px;
  font-weight: 900;
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
  font-size: 6px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.battle-red .team-mini-stats span {
  border: 1px solid rgba(239, 68, 68, 0.18);
  color: #fca5a5;
}

.battle-blue .team-mini-stats span {
  border: 1px solid rgba(59, 130, 246, 0.18);
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
  font-size: 5px;
  font-weight: 900;
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
    0 0 40px rgba(168, 85, 247, 0.25),
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
  font-size: 8px;
  letter-spacing: 0.13em;
}

.target-label span {
  margin-top: 3px;
  color: #64748b;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: 0.15em;
}

.target-status {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 6px;
  color: #22c55e;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.target-status i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #22c55e;
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
  border: 1px solid rgba(100, 116, 139, 0.2);
  border-radius: 8px;
  background: rgba(8, 15, 22, 0.88);
  color: #94a3b8;
}

.asset-node .q-icon {
  font-size: 14px;
}

.asset-node span {
  font-size: 5px;
  font-weight: 900;
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
  border: 1px solid rgba(239, 68, 68, 0.24);
  border-radius: 8px;
  background: rgba(15, 10, 15, 0.88);
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
  font-size: 7px;
  letter-spacing: 0.1em;
}

.threat-alert small {
  margin-top: 2px;
  color: #64748b;
  font-size: 5px;
  letter-spacing: 0.08em;
}

.threat-signal {
  width: 5px;
  height: 5px;
  margin-left: auto;
  border-radius: 50%;
  background: #ef4444;
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
  border: 1px solid rgba(168, 85, 247, 0.22);
  border-radius: 20px;
  background: rgba(15, 10, 25, 0.72);
  color: #c084fc;
  font-size: 6px;
  letter-spacing: 0.1em;
}

.collaboration .q-icon {
  font-size: 11px;
}

.collab-red,
.collab-blue {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.collab-red {
  background: #ef4444;
  box-shadow: 0 0 7px rgba(239, 68, 68, 0.8);
}

.collab-blue {
  background: #3b82f6;
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
  border: 1px solid rgba(100, 116, 139, 0.16);
  border-radius: 10px;
  background: rgba(2, 6, 23, 0.68);
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
  color: #475569;
  font-size: 5px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

.telemetry-item strong {
  margin-top: 2px;
  color: #94a3b8;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: 0.06em;
}

.telemetry-divider {
  width: 1px;
  height: 25px;
  background: rgba(100, 116, 139, 0.16);
}

.battle-footer {
  position: relative;
  z-index: 25;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: #334155;
  font-size: 6px;
  font-weight: 900;
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
  background: #22c55e;
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

@media (max-width: 600px) {
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
    font-size: 8px;
  }

  .team-type {
    font-size: 5px;
  }

  .team-mini-stats span {
    font-size: 5px;
    padding: 3px;
  }

  .network-node {
    transform: scale(0.8);
  }

  .target-system {
    transform: translate(-50%, -50%) scale(0.82);
  }

  .asset-node {
    transform: scale(0.8);
  }

  .threat-alert {
    min-width: 175px;
    transform: translateX(-50%) scale(0.82);
  }

  .battle-telemetry {
    gap: 5px;
    padding: 7px;
  }

  .telemetry-item {
    gap: 4px;
  }

  .telemetry-item strong {
    font-size: 5px;
  }

  .telemetry-divider {
    height: 20px;
  }

  .battle-footer {
    font-size: 5px;
  }
}
/* =========================================================
   RED TEAM / BLUE TEAM CYBER BATTLEFIELD
   ========================================================= */

.battle-visual {
  position: relative;
  min-height: 600px;
  padding: 18px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 28px;
  background:
    radial-gradient(circle at 15% 45%, rgba(239, 68, 68, 0.12), transparent 25%),
    radial-gradient(circle at 85% 45%, rgba(59, 130, 246, 0.13), transparent 25%),
    radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.08), transparent 30%), #050a0f;
  box-shadow:
    inset 0 0 100px rgba(0, 0, 0, 0.5),
    0 30px 90px rgba(0, 0, 0, 0.25);
}

.rb-bg-grid {
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.04) 1px, transparent 1px);
  background-size: 28px 28px;
}

.rb-bg-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.08;
}

.rb-glow-red {
  left: -120px;
  top: 150px;
  background: #ef4444;
}

.rb-glow-blue {
  right: -120px;
  top: 150px;
  background: #3b82f6;
}

.rb-scanline {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: -20%;
  height: 25%;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(168, 85, 247, 0.07), transparent);
  animation: rb-scan 7s linear infinite;
}

.rb-hud {
  position: relative;
  z-index: 30;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 20px;
  min-height: 42px;
  padding: 0 5px;
  border-bottom: 1px solid rgba(100, 116, 139, 0.13);
}

.rb-hud-left,
.rb-hud-right,
.rb-hud-center {
  display: flex;
  align-items: center;
}

.rb-hud-left {
  gap: 9px;
}

.rb-hud-left div {
  display: flex;
  flex-direction: column;
}

.rb-hud-left strong {
  color: #cbd5e1;
  font-size: 8px;
  letter-spacing: 0.17em;
}

.rb-hud-left small {
  margin-top: 3px;
  color: #475569;
  font-size: 5px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.rb-online-dot,
.rb-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 12px rgba(34, 197, 94, 0.9);
  animation: rb-blink 1.5s ease-in-out infinite;
}

.rb-hud-center {
  gap: 7px;
  padding: 5px 10px;
  border: 1px solid rgba(100, 116, 139, 0.14);
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.45);
  color: #475569;
  font-size: 6px;
  letter-spacing: 0.12em;
}

.rb-hud-center strong {
  color: #94a3b8;
  font-size: 6px;
}

.rb-hud-right {
  justify-content: flex-end;
  gap: 7px;
  color: #22c55e;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.15em;
}

.rb-battlefield {
  position: relative;
  z-index: 5;
  height: 455px;
}

.rb-console {
  position: absolute;
  z-index: 20;
  top: 78px;
  width: 165px;
  min-height: 190px;
  padding: 11px;
  border-radius: 12px;
  background: rgba(5, 12, 18, 0.92);
  backdrop-filter: blur(10px);
}

.rb-red-console {
  left: 0;
  border: 1px solid rgba(239, 68, 68, 0.24);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

.rb-blue-console {
  right: 0;
  border: 1px solid rgba(59, 130, 246, 0.24);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
}

.rb-console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #94a3b8;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.11em;
}

.rb-console-header span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.rb-console-header small {
  color: #334155;
  font-size: 5px;
}

.rb-red-dot,
.rb-blue-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
}

.rb-red-dot {
  background: #ef4444;
  box-shadow: 0 0 9px rgba(239, 68, 68, 0.8);
}

.rb-blue-dot {
  background: #3b82f6;
  box-shadow: 0 0 9px rgba(59, 130, 246, 0.8);
}

.rb-console-icon {
  width: 40px;
  height: 40px;
  margin-top: 13px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  font-size: 19px;
}

.rb-red-console .rb-console-icon {
  color: #f87171;
  background: rgba(239, 68, 68, 0.08);
}

.rb-blue-console .rb-console-icon {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.08);
}

.rb-console-title {
  margin-top: 8px;
  color: #e2e8f0;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.rb-console-title span {
  display: block;
  margin-top: 2px;
  color: #475569;
  font-size: 6px;
}

.rb-console-status {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 9px;
  color: #64748b;
  font-size: 5px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.rb-console-status span {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.8);
}

.rb-console-status .blue-active {
  background: #3b82f6;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
}

.rb-terminal {
  margin-top: 10px;
  padding: 7px;
  border: 1px solid rgba(100, 116, 139, 0.1);
  border-radius: 6px;
  background: rgba(2, 6, 23, 0.7);
}

.rb-terminal div {
  display: grid;
  grid-template-columns: 42px 29px 1fr;
  gap: 4px;
  margin: 4px 0;
  color: #475569;
  font-family: monospace;
  font-size: 5px;
  line-height: 1.2;
}

.terminal-time {
  color: #334155;
}

.terminal-red {
  color: #f87171;
}

.terminal-blue {
  color: #60a5fa;
}

.rb-console-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  margin-top: 8px;
}

.rb-console-metrics div {
  padding: 5px 2px;
  border-radius: 5px;
  background: rgba(15, 23, 42, 0.6);
  text-align: center;
}

.rb-console-metrics strong {
  display: block;
  color: #cbd5e1;
  font-size: 9px;
}

.rb-console-metrics span {
  color: #334155;
  font-size: 4px;
  font-weight: 900;
  letter-spacing: 0.07em;
}

.rb-radar {
  position: absolute;
  z-index: 8;
  top: 66px;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  opacity: 0.7;
}

.rb-radar-left {
  left: 150px;
}

.rb-radar-right {
  right: 150px;
}

.radar-circle {
  position: absolute;
  border: 1px solid rgba(239, 68, 68, 0.15);
  border-radius: 50%;
}

.radar-c1 {
  inset: 15%;
}

.radar-c2 {
  inset: 30%;
}

.radar-c3 {
  inset: 45%;
}

.rb-radar-right .radar-circle {
  border-color: rgba(59, 130, 246, 0.15);
}

.radar-cross {
  position: absolute;
  background: rgba(148, 163, 184, 0.1);
}

.radar-cross.horizontal {
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
}

.radar-cross.vertical {
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
}

.radar-sweep {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90px;
  height: 1px;
  transform-origin: left center;
  background: linear-gradient(90deg, rgba(239, 68, 68, 0.8), transparent);
  animation: rb-radar 3s linear infinite;
}

.blue-sweep {
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.8), transparent);
}

.radar-target {
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ef4444;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.9);
  animation: rb-target 2s ease-in-out infinite;
}

.rt-1 {
  left: 32%;
  top: 27%;
}

.rt-2 {
  left: 68%;
  top: 59%;
  animation-delay: 0.5s;
}

.rt-3 {
  left: 48%;
  top: 73%;
  animation-delay: 1s;
}

.blue-target {
  background: #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.9);
}

.rb-core {
  position: absolute;
  z-index: 25;
  left: 50%;
  top: 48%;
  width: 185px;
  transform: translate(-50%, -50%);
  text-align: center;
}

.core-label {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-bottom: 12px;
  color: #a78bfa;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.core-ping {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #a78bfa;
  box-shadow: 0 0 8px rgba(167, 139, 250, 0.9);
}

.core-shield {
  position: relative;
  width: 115px;
  height: 115px;
  margin: auto;
  display: grid;
  place-items: center;
}

.shield-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px dashed rgba(168, 85, 247, 0.25);
}

.shield-ring-1 {
  inset: 0;
  animation: rb-rotate 15s linear infinite;
}

.shield-ring-2 {
  inset: 13px;
  border-color: rgba(168, 85, 247, 0.4);
  animation: rb-rotate-reverse 11s linear infinite;
}

.shield-ring-3 {
  inset: 27px;
  border-color: rgba(168, 85, 247, 0.2);
}

.core-lock {
  position: relative;
  z-index: 4;
  width: 65px;
  height: 65px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(168, 85, 247, 0.65);
  border-radius: 20px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.25), rgba(5, 10, 15, 0.95));
  color: #c084fc;
  font-size: 27px;
  box-shadow:
    0 0 45px rgba(168, 85, 247, 0.25),
    inset 0 0 20px rgba(168, 85, 247, 0.1);
}

.rb-core > strong {
  display: block;
  margin-top: 4px;
  color: #f8fafc;
  font-size: 8px;
  letter-spacing: 0.14em;
}

.rb-core > small {
  display: block;
  margin-top: 3px;
  color: #475569;
  font-size: 5px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.core-health {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: 8px;
}

.core-health span {
  width: 13px;
  height: 3px;
  border-radius: 2px;
  background: #22c55e;
  box-shadow: 0 0 5px rgba(34, 197, 94, 0.4);
}

.core-health b {
  margin-left: 5px;
  color: #22c55e;
  font-size: 5px;
  letter-spacing: 0.08em;
}

.rb-asset {
  position: absolute;
  z-index: 18;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 110px;
  padding: 7px;
  border: 1px solid rgba(100, 116, 139, 0.18);
  border-radius: 7px;
  background: rgba(5, 12, 18, 0.9);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
}

.rb-asset .q-icon {
  color: #94a3b8;
  font-size: 14px;
}

.rb-asset div {
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.rb-asset strong {
  color: #94a3b8;
  font-size: 5px;
  letter-spacing: 0.08em;
}

.rb-asset small {
  margin-top: 2px;
  color: #334155;
  font-size: 4px;
  letter-spacing: 0.04em;
}

.asset-online {
  width: 4px;
  height: 4px;
  margin-left: auto;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 7px rgba(34, 197, 94, 0.8);
}

.rb-server {
  left: 50%;
  top: 4px;
  transform: translateX(-50%);
}

.rb-db {
  left: calc(50% - 165px);
  bottom: 24px;
}

.rb-api {
  right: calc(50% - 165px);
  bottom: 24px;
}

.rb-endpoint {
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
}

.rb-network-svg {
  position: absolute;
  inset: 0;
  z-index: 7;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

.rb-line {
  fill: none;
  stroke-width: 1.3;
  stroke-dasharray: 5 8;
  opacity: 0.65;
  animation: rb-flow 2.5s linear infinite;
}

.rb-line-red {
  stroke: #ef4444;
}

.rb-line-blue {
  stroke: #3b82f6;
}

.rb-line-purple {
  stroke: #a855f7;
  opacity: 0.45;
}

.rb-asset-line {
  fill: none;
  stroke: rgba(148, 163, 184, 0.14);
  stroke-width: 1;
  stroke-dasharray: 3 7;
}

.rb-packet {
  filter: drop-shadow(0 0 5px currentColor);
}

.rb-packet-red {
  fill: #ef4444;
}

.rb-packet-blue {
  fill: #3b82f6;
}

.rb-flow {
  position: absolute;
  z-index: 30;
  left: 50%;
  bottom: 75px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 9px;
  border: 1px solid rgba(100, 116, 139, 0.15);
  border-radius: 8px;
  background: rgba(2, 6, 23, 0.82);
  backdrop-filter: blur(8px);
}

.flow-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 5px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

.flow-item .q-icon {
  font-size: 10px;
}

.flow-red {
  color: #f87171;
}

.flow-purple {
  color: #c084fc;
}

.flow-blue {
  color: #60a5fa;
}

.flow-arrow {
  color: #334155;
  font-size: 10px;
}

.rb-alert {
  position: absolute;
  z-index: 31;
  left: 50%;
  bottom: 7px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  width: 245px;
  padding: 7px 9px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  background: rgba(15, 8, 13, 0.9);
}

.alert-icon {
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: rgba(239, 68, 68, 0.1);
  color: #f87171;
}

.alert-icon .q-icon {
  font-size: 14px;
}

.alert-copy {
  display: flex;
  flex-direction: column;
}

.alert-copy strong {
  color: #fca5a5;
  font-size: 6px;
  letter-spacing: 0.09em;
}

.alert-copy span {
  margin-top: 2px;
  color: #475569;
  font-size: 5px;
}

.alert-level {
  margin-left: auto;
  text-align: right;
}

.alert-level small {
  display: block;
  color: #334155;
  font-size: 4px;
}

.alert-level strong {
  color: #f87171;
  font-size: 7px;
}

.rb-purple {
  position: absolute;
  z-index: 35;
  top: 2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 9px;
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 20px;
  background: rgba(15, 8, 25, 0.8);
  color: #c084fc;
  font-size: 5px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

.rb-purple .q-icon {
  font-size: 10px;
}

.purple-red,
.purple-blue {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.purple-red {
  background: #ef4444;
  box-shadow: 0 0 7px rgba(239, 68, 68, 0.8);
}

.purple-blue {
  background: #3b82f6;
  box-shadow: 0 0 7px rgba(59, 130, 246, 0.8);
}

.rb-telemetry {
  position: relative;
  z-index: 40;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
}

.telemetry-card {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 7px 8px;
  border: 1px solid rgba(100, 116, 139, 0.13);
  border-radius: 8px;
  background: rgba(2, 6, 23, 0.65);
}

.telemetry-card-icon {
  width: 24px;
  height: 24px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 6px;
}

.telemetry-red {
  color: #f87171;
  background: rgba(239, 68, 68, 0.08);
}

.telemetry-purple {
  color: #c084fc;
  background: rgba(168, 85, 247, 0.08);
}

.telemetry-blue {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.08);
}

.telemetry-card-icon .q-icon {
  font-size: 12px;
}

.telemetry-card div {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.telemetry-card small {
  color: #475569;
  font-size: 4px;
  font-weight: 900;
  letter-spacing: 0.09em;
}

.telemetry-card strong {
  margin-top: 2px;
  color: #94a3b8;
  font-size: 6px;
  letter-spacing: 0.05em;
}

.telemetry-bar {
  width: 35px;
  height: 3px;
  margin-left: auto;
  overflow: hidden;
  border-radius: 4px;
  background: rgba(100, 116, 139, 0.12);
}

.telemetry-bar i {
  display: block;
  width: 75%;
  height: 100%;
  border-radius: inherit;
  background: #64748b;
  animation: rb-meter 2s ease-in-out infinite alternate;
}

.rb-footer-status {
  position: relative;
  z-index: 40;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 7px;
  color: #334155;
  font-size: 5px;
  font-weight: 900;
  letter-spacing: 0.09em;
}

.rb-footer-status span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rb-footer-status i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 7px rgba(34, 197, 94, 0.8);
}

@keyframes rb-scan {
  0% {
    transform: translateY(-120%);
  }

  100% {
    transform: translateY(600%);
  }
}

@keyframes rb-blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.3;
  }
}

@keyframes rb-flow {
  from {
    stroke-dashoffset: 26;
  }

  to {
    stroke-dashoffset: 0;
  }
}

@keyframes rb-radar {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes rb-target {
  0%,
  100% {
    transform: scale(0.8);
    opacity: 0.55;
  }

  50% {
    transform: scale(1.5);
    opacity: 1;
  }
}

@keyframes rb-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes rb-rotate-reverse {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

@keyframes rb-meter {
  from {
    width: 35%;
  }

  to {
    width: 90%;
  }
}

@media (max-width: 1100px) {
  .battle-visual {
    min-height: 620px;
  }

  .rb-console {
    width: 145px;
  }

  .rb-radar-left {
    left: 125px;
  }

  .rb-radar-right {
    right: 125px;
  }

  .rb-asset {
    width: 95px;
  }
}

@media (max-width: 900px) {
  .battle-visual {
    min-height: 700px;
  }

  .rb-battlefield {
    height: 530px;
  }

  .rb-console {
    top: 85px;
    width: 130px;
  }

  .rb-radar {
    width: 135px;
    height: 135px;
    top: 105px;
  }

  .rb-radar-left {
    left: 110px;
  }

  .rb-radar-right {
    right: 110px;
  }

  .rb-console-metrics {
    display: none;
  }

  .rb-terminal div {
    grid-template-columns: 1fr;
    gap: 2px;
  }

  .terminal-time {
    display: none;
  }

  .rb-asset {
    transform: scale(0.85);
  }

  .rb-server {
    top: 25px;
  }

  .rb-db {
    left: calc(50% - 130px);
  }

  .rb-api {
    right: calc(50% - 130px);
  }

  .rb-endpoint {
    bottom: 24px;
  }

  .rb-flow {
    bottom: 92px;
  }

  .rb-alert {
    bottom: 25px;
  }
}

@media (max-width: 600px) {
  .battle-visual {
    min-height: 760px;
    padding: 12px;
    border-radius: 20px;
  }

  .rb-hud {
    grid-template-columns: 1fr auto;
  }

  .rb-hud-center {
    display: none;
  }

  .rb-battlefield {
    height: 585px;
  }

  .rb-console {
    top: 72px;
    width: 112px;
    min-height: 150px;
    padding: 8px;
  }

  .rb-console-icon {
    width: 32px;
    height: 32px;
    margin-top: 9px;
    font-size: 15px;
  }

  .rb-console-title {
    font-size: 7px;
  }

  .rb-terminal {
    display: none;
  }

  .rb-radar {
    width: 105px;
    height: 105px;
    top: 120px;
  }

  .rb-radar-left {
    left: 80px;
  }

  .rb-radar-right {
    right: 80px;
  }

  .rb-core {
    top: 49%;
    transform: translate(-50%, -50%) scale(0.85);
  }

  .rb-asset {
    width: 82px;
    transform: scale(0.72);
  }

  .rb-server {
    top: 14px;
  }

  .rb-db {
    left: calc(50% - 105px);
    bottom: 32px;
  }

  .rb-api {
    right: calc(50% - 105px);
    bottom: 32px;
  }

  .rb-endpoint {
    bottom: 32px;
  }

  .rb-flow {
    bottom: 110px;
    transform: translateX(-50%) scale(0.85);
    white-space: nowrap;
  }

  .rb-alert {
    bottom: 35px;
    width: 205px;
    transform: translateX(-50%) scale(0.82);
  }

  .rb-telemetry {
    grid-template-columns: 1fr;
  }

  .telemetry-card {
    padding: 6px;
  }

  .rb-footer-status {
    gap: 7px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .rb-footer-status span:last-child {
    display: none;
  }
}
.module-section {
  margin-top: 90px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 25px;
}

.section-kicker {
  color: #10b981;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.2em;
}

.section-heading h2 {
  margin: 7px 0 0;
  font-size: 32px;
}

.section-heading > span {
  color: #64748b;
  font-size: 13px;
}

.lesson-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.lesson-card {
  position: relative;
  display: grid;
  grid-template-columns: 40px 52px 1fr 30px;
  gap: 18px;
  align-items: center;
  width: 100%;
  padding: 22px;
  border: 1px solid #1e293b;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.62);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: 0.25s ease;
}

.lesson-card:hover {
  transform: translateY(-3px);
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.06);
}

.lesson-number {
  color: #475569;
  font-size: 12px;
  font-weight: 900;
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
  color: #64748b;
  font-size: 12px;
}

.arrow {
  color: #475569;
}

.roles-section {
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.role-card {
  padding: 35px;
  border-radius: 22px;
  border: 1px solid #1e293b;
  background: #0b151a;
}

.role-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 28px;
}

.role-badge {
  color: #64748b;
  font-size: 11px;
  font-weight: 900;
}

.red-role {
  box-shadow: inset 3px 0 #ef4444;
}

.blue-role {
  box-shadow: inset 3px 0 #3b82f6;
}

.role-card h2 {
  margin: 30px 0 10px;
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
  padding: 6px 9px;
  border: 1px solid #263442;
  border-radius: 6px;
  color: #64748b;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

@media (max-width: 900px) {
  .hero-section {
    grid-template-columns: 1fr;
  }

  .lesson-grid,
  .roles-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .redblue-shell {
    padding: 45px 20px;
  }

  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .battle-visual {
    min-height: 330px;
  }

  .team-icon {
    width: 80px;
    height: 80px;
    font-size: 35px;
  }

  .lesson-card {
    grid-template-columns: 35px 45px 1fr;
  }

  .lesson-card .arrow {
    display: none;
  }
}
</style>
