<template>
  <q-page class="cyber-page">
    <div class="cyber-container">
      <!-- HERO -->
      <section class="cyber-hero">
        <div class="hero-content">
          <div class="eyebrow">CYBERSECURITY LEARNING MODULE</div>

          <h1>
            Understand.
            <span>Protect.</span>
            Secure.
          </h1>

          <p>
            Learn the fundamental concepts, threats, defensive techniques, and security practices
            used to protect modern systems, networks, applications, and data.
          </p>

          <div class="hero-tags">
            <q-chip
              icon="security"
              label="Security Fundamentals"
              color="green-1"
              text-color="green-9"
            />

            <q-chip icon="language" label="Network Security" color="blue-1" text-color="blue-9" />

            <q-chip
              icon="computer"
              label="System Security"
              color="purple-1"
              text-color="purple-9"
            />
          </div>

          <!-- START LEARNING -->
          <div class="hero-actions">
            <q-btn
              unelevated
              no-caps
              class="start-learning-btn"
              icon="play_arrow"
              label="Start Learning"
              @click="openLearning(1)"
            />

            <div class="keyboard-hint">
              <q-icon name="keyboard" />
              19 lessons · Presentation-based learning
            </div>
          </div>
        </div>

        <div class="hero-shield">
          <div class="shield-circle">
            <q-icon name="shield" size="80px" />
          </div>

          <div class="shield-status">
            <span></span>
            Security Learning
          </div>
        </div>
      </section>

      <!-- OVERVIEW -->
      <section class="overview-section">
        <div class="section-label">LEARNING OVERVIEW</div>

        <h2>Your Cybersecurity Roadmap</h2>

        <p class="section-intro">
          Build your understanding from security fundamentals to practical Raspberry Pi server
          protection.
        </p>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon green">
              <q-icon name="menu_book" />
            </div>

            <div>
              <div class="stat-number">19</div>

              <div class="stat-label">Learning Lessons</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon orange">
              <q-icon name="warning" />
            </div>

            <div>
              <div class="stat-number">6+</div>

              <div class="stat-label">Common Threats</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon blue">
              <q-icon name="lan" />
            </div>

            <div>
              <div class="stat-number">4+</div>

              <div class="stat-label">Security Areas</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon purple">
              <q-icon name="memory" />
            </div>

            <div>
              <div class="stat-number">1</div>

              <div class="stat-label">Raspberry Pi Focus</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FUNDAMENTALS -->
      <section class="topic-section">
        <div class="section-heading">
          <div>
            <div class="section-label">01 · FUNDAMENTALS</div>

            <h2>Security Fundamentals</h2>
          </div>

          <div class="section-description">The foundation of cybersecurity.</div>
        </div>

        <div class="topic-grid">
          <q-card
            v-for="topic in fundamentals"
            :key="topic.title"
            flat
            bordered
            class="topic-card"
            clickable
            @click="openTopic(topic)"
          >
            <q-card-section>
              <div class="topic-icon" :class="topic.color">
                <q-icon :name="topic.icon" size="30px" />
              </div>

              <div class="topic-title">
                {{ topic.title }}
              </div>

              <div class="topic-description">
                {{ topic.description }}
              </div>

              <q-btn
                flat
                no-caps
                class="topic-link"
                label="Open Lesson"
                icon-right="arrow_forward"
                @click.stop="openLearning(topic.lesson)"
              />
            </q-card-section>
          </q-card>
        </div>
      </section>

      <!-- THREATS -->
      <section class="topic-section">
        <div class="section-heading">
          <div>
            <div class="section-label threat-label">02 · THREATS</div>

            <h2>Common Cyber Threats</h2>
          </div>

          <div class="section-description">Understand how attacks target systems and users.</div>
        </div>

        <div class="threat-grid">
          <q-card
            v-for="threat in threats"
            :key="threat.title"
            flat
            bordered
            class="threat-card"
            clickable
            @click="openTopic(threat)"
          >
            <q-card-section>
              <div class="threat-top">
                <div class="threat-icon">
                  <q-icon :name="threat.icon" size="28px" />
                </div>

                <q-badge :label="threat.level" color="red-1" text-color="red-8" />
              </div>

              <div class="topic-title">
                {{ threat.title }}
              </div>

              <div class="topic-description">
                {{ threat.description }}
              </div>

              <q-btn
                flat
                no-caps
                class="topic-link threat-link"
                label="Open Lesson"
                icon-right="arrow_forward"
                @click.stop="openLearning(threat.lesson)"
              />
            </q-card-section>
          </q-card>
        </div>
      </section>

      <!-- NETWORK / WEB -->
      <section class="topic-section">
        <div class="section-heading">
          <div>
            <div class="section-label">03 · NETWORK & WEB</div>

            <h2>Network & Web Security</h2>
          </div>

          <div class="section-description">Protect communication and web applications.</div>
        </div>

        <div class="security-list">
          <div
            v-for="item in networkSecurity"
            :key="item.title"
            class="security-item"
            @click="openTopic(item)"
          >
            <div class="security-item-icon">
              <q-icon :name="item.icon" />
            </div>

            <div class="security-item-content">
              <div class="security-item-title">
                {{ item.title }}
              </div>

              <div class="security-item-description">
                {{ item.description }}
              </div>
            </div>

            <q-icon name="arrow_forward" class="security-arrow" />
          </div>
        </div>
      </section>

      <!-- SYSTEM SECURITY -->
      <section class="system-section">
        <div class="system-content">
          <div class="section-label system-label">04 · SYSTEM SECURITY</div>

          <h2>Secure the Operating System</h2>

          <p>
            System security focuses on protecting operating systems, accounts, services, files, and
            system resources from unauthorized access and attacks.
          </p>

          <div class="system-points">
            <div v-for="item in systemSecurity" :key="item" class="system-point">
              <q-icon name="check_circle" color="positive" />

              <span>{{ item }}</span>
            </div>
          </div>

          <q-btn
            unelevated
            no-caps
            class="system-learning-btn"
            icon="school"
            label="Study System Security"
            @click="openLearning(11)"
          />
        </div>

        <div class="terminal-card">
          <div class="terminal-header">
            <span></span>
            <span></span>
            <span></span>

            <div>SECURITY CHECK</div>
          </div>

          <div class="terminal-body">
            <div>
              <span class="terminal-green">$</span>
              whoami
            </div>

            <div class="terminal-output">secure-user</div>

            <div>
              <span class="terminal-green">$</span>
              sudo systemctl status ssh
            </div>

            <div class="terminal-output">
              ● ssh.service
              <span class="terminal-online"> active </span>
            </div>

            <div>
              <span class="terminal-green">$</span>
              sudo ufw status
            </div>

            <div class="terminal-output">Status: active</div>
          </div>
        </div>
      </section>

      <!-- RASPBERRY PI -->
      <section class="raspi-security" @click="openLearning(18)">
        <div class="raspi-icon">
          <q-icon name="memory" size="42px" />
        </div>

        <div class="raspi-content">
          <div class="section-label">05 · RASPBERRY PI SECURITY</div>

          <h2>Securing the Raspberry Pi Server</h2>

          <p>
            Apply cybersecurity concepts directly to the Raspberry Pi that hosts this learning
            platform.
          </p>

          <div class="raspi-tags">
            <q-chip
              v-for="item in raspiSecurity"
              :key="item"
              :label="item"
              icon="verified_user"
              outline
            />
          </div>
        </div>

        <q-icon name="arrow_forward" size="32px" class="raspi-arrow" />
      </section>

      <!-- TOPIC DIALOG -->
      <q-dialog v-model="dialogOpen">
        <q-card class="topic-dialog">
          <q-card-section class="dialog-header">
            <div>
              <div class="section-label">CYBERSECURITY TOPIC</div>

              <div class="dialog-title">
                {{ selectedTopic?.title }}
              </div>
            </div>

            <q-btn flat round icon="close" v-close-popup />
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="dialog-icon">
              <q-icon :name="selectedTopic?.icon" size="36px" />
            </div>

            <p class="dialog-description">
              {{ selectedTopic?.description }}
            </p>

            <div class="dialog-info">
              <div class="info-title">Why it matters</div>

              <p>
                Understanding {{ selectedTopic?.title }}
                helps IT professionals recognize risks, protect systems, and make better security
                decisions.
              </p>

              <q-btn
                unelevated
                no-caps
                class="dialog-learning-btn"
                icon="school"
                label="Open Full Lesson"
                @click="openLearning(selectedTopic?.lesson)"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const dialogOpen = ref(false)
const selectedTopic = ref(null)

/* OPEN TOPIC DIALOG */

const openTopic = (topic) => {
  selectedTopic.value = topic
  dialogOpen.value = true
}

/* OPEN PRESENTATION VIEWER */

const openLearning = async (lesson = 1) => {
  const lessonNumber = Number(lesson) || 1

  dialogOpen.value = false

  try {
    await router.push({
      path: '/cybersecurity/learn',
      query: {
        lesson: String(lessonNumber),
      },
    })
  } catch (error) {
    console.error('Navigation error:', error)
  }
}

/* FUNDAMENTALS */

const fundamentals = [
  {
    title: 'CIA Triad',
    icon: 'security',
    color: 'green',
    lesson: 3,
    description:
      'Confidentiality, Integrity, and Availability form the foundation of information security.',
  },

  {
    title: 'Authentication',
    icon: 'lock',
    color: 'blue',
    lesson: 7,
    description: 'Verify the identity of users before allowing access to systems and resources.',
  },

  {
    title: 'Authorization',
    icon: 'admin_panel_settings',
    color: 'purple',
    lesson: 7,
    description: 'Determine what authenticated users are allowed to access or perform.',
  },

  {
    title: 'Least Privilege',
    icon: 'key',
    color: 'orange',
    lesson: 7,
    description:
      'Users and services should receive only the permissions required to perform their tasks.',
  },
]

/* THREATS */

const threats = [
  {
    title: 'Malware',
    icon: 'bug_report',
    level: 'HIGH',
    lesson: 4,
    description:
      'Malicious software designed to damage systems, steal information, or gain unauthorized access.',
  },

  {
    title: 'Phishing',
    icon: 'phishing',
    level: 'HIGH',
    lesson: 4,
    description:
      'Social engineering attacks that attempt to trick users into revealing sensitive information.',
  },

  {
    title: 'Ransomware',
    icon: 'lock',
    level: 'CRITICAL',
    lesson: 4,
    description: 'Malware that encrypts data and demands payment in exchange for restoring access.',
  },

  {
    title: 'Brute Force',
    icon: 'password',
    level: 'HIGH',
    lesson: 4,
    description:
      'An attack that repeatedly attempts different credentials until a valid combination is discovered.',
  },

  {
    title: 'Social Engineering',
    icon: 'people',
    level: 'HIGH',
    lesson: 4,
    description:
      'Manipulating people into revealing information or performing actions that compromise security.',
  },

  {
    title: 'DoS / DDoS',
    icon: 'cloud_off',
    level: 'HIGH',
    lesson: 4,
    description:
      'Attempts to overwhelm services or networks so legitimate users cannot access them.',
  },
]

/* NETWORK SECURITY */

const networkSecurity = [
  {
    title: 'Firewalls',
    icon: 'security',
    lesson: 6,
    description: 'Control network traffic based on predefined security rules.',
  },

  {
    title: 'Network Ports',
    icon: 'lan',
    lesson: 6,
    description: 'Understand how services communicate through TCP and UDP ports.',
  },

  {
    title: 'HTTPS & TLS',
    icon: 'https',
    lesson: 10,
    description: 'Protect web communication through encryption and secure transport protocols.',
  },

  {
    title: 'VPN',
    icon: 'vpn_lock',
    lesson: 5,
    description: 'Create encrypted communication channels across untrusted networks.',
  },

  {
    title: 'Web Security',
    icon: 'language',
    lesson: 10,
    description: 'Protect applications from vulnerabilities such as XSS, CSRF, and SQL injection.',
  },
]

/* SYSTEM SECURITY */

const systemSecurity = [
  'Linux permissions and ownership',
  'SSH access control',
  'System updates and patching',
  'User and group management',
  'Logging and monitoring',
  'Firewall configuration',
]

/* RASPBERRY PI SECURITY */

const raspiSecurity = [
  'SSH Hardening',
  'Firewall',
  'User Permissions',
  'Docker Security',
  'System Updates',
  'Monitoring',
]
</script>

<style scoped>
.cyber-page {
  min-height: 100vh;
  background: #f5f7fb;
}

.cyber-container {
  max-width: 1400px;
  margin: auto;
  padding: 40px;
}

/* HERO */

.cyber-hero {
  display: grid;
  grid-template-columns: 1fr 320px;
  align-items: center;
  gap: 40px;

  padding: 50px;

  border-radius: 26px;

  background: linear-gradient(135deg, #07111f, #0f172a 50%, #064e3b);

  color: white;

  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
}

.eyebrow {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 2px;
  color: #34d399;
}

.cyber-hero h1 {
  margin: 12px 0;

  font-size: 52px;
  line-height: 1.05;
  font-weight: 900;
}

.cyber-hero h1 span {
  color: #34d399;
}

.hero-content p {
  max-width: 700px;

  color: #cbd5e1;

  font-size: 17px;
  line-height: 1.7;
}

.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-top: 25px;
}

.hero-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;

  margin-top: 28px;
}

.start-learning-btn {
  min-height: 46px;

  padding: 0 22px;

  border-radius: 12px;

  background: #10b981;
  color: white;

  font-weight: 800;

  box-shadow: 0 10px 25px rgba(16, 185, 129, 0.2);

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.start-learning-btn:hover {
  background: #059669;
  transform: translateY(-2px);
}

.keyboard-hint {
  display: flex;
  align-items: center;
  gap: 7px;

  color: #94a3b8;

  font-size: 12px;
}

.hero-shield {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.shield-circle {
  width: 180px;
  height: 180px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(52, 211, 153, 0.12);

  border: 1px solid rgba(52, 211, 153, 0.3);

  color: #34d399;

  box-shadow: 0 0 60px rgba(52, 211, 153, 0.12);
}

.shield-status {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 18px;

  color: #34d399;

  font-size: 13px;
  font-weight: 700;
}

.shield-status span {
  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: #10b981;
}

/* SECTIONS */

.overview-section,
.topic-section {
  margin-top: 50px;
}

.section-label {
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 1.5px;
  color: #059669;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;

  margin-bottom: 22px;
}

h2 {
  margin: 5px 0;

  color: #0f172a;

  font-size: 28px;
  font-weight: 900;
}

.section-intro,
.section-description {
  color: #64748b;
}

/* STATS */

.stats-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 18px;

  margin-top: 25px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;

  padding: 22px;

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 18px;
}

.stat-icon {
  width: 52px;
  height: 52px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;

  font-size: 25px;
}

.stat-icon.green {
  background: #ecfdf5;
  color: #059669;
}

.stat-icon.orange {
  background: #fff7ed;
  color: #ea580c;
}

.stat-icon.blue {
  background: #eff6ff;
  color: #2563eb;
}

.stat-icon.purple {
  background: #f5f3ff;
  color: #7c3aed;
}

.stat-number {
  font-size: 24px;
  font-weight: 900;

  color: #0f172a;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
}

/* TOPICS */

.topic-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 18px;
}

.topic-card {
  border-radius: 18px;

  background: white;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.topic-card:hover {
  transform: translateY(-5px);

  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.1);
}

.topic-icon {
  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;
}

.topic-icon.green {
  background: #ecfdf5;
  color: #059669;
}

.topic-icon.blue {
  background: #eff6ff;
  color: #2563eb;
}

.topic-icon.purple {
  background: #f5f3ff;
  color: #7c3aed;
}

.topic-icon.orange {
  background: #fff7ed;
  color: #ea580c;
}

.topic-title {
  margin-top: 20px;

  color: #0f172a;

  font-size: 19px;
  font-weight: 850;
}

.topic-description {
  margin-top: 8px;

  color: #64748b;

  line-height: 1.6;
}

.topic-link {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-top: 20px;

  padding: 0;

  color: #059669;

  font-size: 13px;
  font-weight: 800;

  cursor: pointer;

  transition:
    color 0.2s ease,
    transform 0.2s ease;
}

.topic-link:hover {
  color: #047857;
  transform: translateX(3px);
}

/* THREATS */

.threat-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 18px;
}

.threat-card {
  border-radius: 18px;

  background: white;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.threat-card:hover {
  transform: translateY(-4px);

  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
}

.threat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.threat-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 13px;

  background: #fef2f2;
  color: #dc2626;
}

.threat-link {
  margin-top: 18px;
}

/* NETWORK */

.security-list {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 12px;
}

.security-item {
  display: flex;
  align-items: center;

  gap: 16px;

  padding: 20px;

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 16px;

  cursor: pointer;

  transition: all 0.2s ease;
}

.security-item:hover {
  border-color: #10b981;

  transform: translateX(4px);

  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.06);
}

.security-item-icon {
  width: 48px;
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: #ecfdf5;
  color: #059669;
}

.security-item-content {
  flex: 1;
}

.security-item-title {
  font-weight: 800;
  color: #0f172a;
}

.security-item-description {
  margin-top: 4px;

  font-size: 13px;

  color: #64748b;
}

.security-arrow {
  color: #94a3b8;
}

/* SYSTEM */

.system-section {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 30px;

  margin-top: 50px;

  padding: 40px;

  border-radius: 22px;

  background: #0f172a;

  color: white;
}

.system-section h2 {
  color: white;
}

.system-label {
  color: #34d399;
}

.system-content > p {
  max-width: 650px;

  color: #94a3b8;

  line-height: 1.7;
}

.system-points {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 12px;

  margin-top: 25px;
}

.system-point {
  display: flex;
  align-items: center;

  gap: 8px;

  color: #cbd5e1;

  font-size: 14px;
}

.system-learning-btn {
  margin-top: 28px;

  min-height: 44px;

  padding: 0 18px;

  border-radius: 10px;

  background: #10b981;
  color: white;

  font-weight: 800;
}

.system-learning-btn:hover {
  background: #059669;
}

/* TERMINAL */

.terminal-card {
  overflow: hidden;

  border-radius: 15px;

  background: #020617;

  border: 1px solid #334155;

  font-family: monospace;
}

.terminal-header {
  display: flex;
  align-items: center;

  gap: 7px;

  padding: 12px 15px;

  border-bottom: 1px solid #1e293b;

  color: #64748b;

  font-size: 10px;
}

.terminal-header > span {
  width: 8px;
  height: 8px;

  border-radius: 50%;

  background: #475569;
}

.terminal-header div {
  margin-left: 8px;
}

.terminal-body {
  padding: 22px;

  color: #cbd5e1;

  line-height: 2;
}

.terminal-green {
  color: #34d399;
}

.terminal-output {
  padding-left: 18px;

  color: #64748b;
}

.terminal-online {
  color: #34d399;
}

/* RASPI */

.raspi-security {
  display: flex;
  align-items: center;

  gap: 25px;

  margin-top: 50px;

  padding: 32px;

  border-radius: 20px;

  background: linear-gradient(135deg, #ecfdf5, #f0fdf4);

  border: 1px solid #bbf7d0;

  cursor: pointer;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.raspi-security:hover {
  transform: translateY(-3px);

  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
}

.raspi-icon {
  width: 70px;
  height: 70px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 18px;

  background: #059669;

  color: white;
}

.raspi-content {
  flex: 1;
}

.raspi-content h2 {
  margin-top: 5px;
}

.raspi-content p {
  color: #64748b;
}

.raspi-tags {
  display: flex;
  flex-wrap: wrap;

  gap: 5px;
}

.raspi-arrow {
  color: #059669;
}

/* DIALOG */

.topic-dialog {
  width: 600px;
  max-width: 90vw;

  border-radius: 20px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-title {
  margin-top: 5px;

  font-size: 25px;
  font-weight: 900;

  color: #0f172a;
}

.dialog-icon {
  width: 65px;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;

  background: #ecfdf5;

  color: #059669;
}

.dialog-description {
  margin-top: 20px;

  color: #475569;

  font-size: 16px;

  line-height: 1.7;
}

.dialog-info {
  margin-top: 25px;

  padding: 18px;

  border-radius: 14px;

  background: #f8fafc;
}

.info-title {
  font-weight: 800;

  color: #0f172a;
}

.dialog-info p {
  margin-bottom: 15px;

  color: #64748b;

  line-height: 1.6;
}

.dialog-learning-btn {
  min-height: 42px;

  padding: 0 16px;

  border-radius: 10px;

  background: #10b981;
  color: white;

  font-weight: 800;
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .topic-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .threat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 800px) {
  .cyber-container {
    padding: 20px;
  }

  .cyber-hero {
    grid-template-columns: 1fr;

    padding: 35px 25px;
  }

  .hero-shield {
    display: none;
  }

  .cyber-hero h1 {
    font-size: 40px;
  }

  .hero-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-heading {
    display: block;
  }

  .section-description {
    margin-top: 5px;
  }

  .system-section {
    grid-template-columns: 1fr;

    padding: 28px;
  }

  .raspi-security {
    align-items: flex-start;
  }
}

@media (max-width: 600px) {
  .stats-grid,
  .topic-grid,
  .threat-grid,
  .security-list {
    grid-template-columns: 1fr;
  }

  .system-points {
    grid-template-columns: 1fr;
  }

  .raspi-security {
    flex-direction: column;
  }

  .raspi-arrow {
    display: none;
  }
}
</style>
