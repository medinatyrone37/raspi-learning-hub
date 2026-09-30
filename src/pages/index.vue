<template>
  <q-page class="dashboard-page">
    <div class="dashboard-container">

      <!-- Hero -->
      <section class="hero-section">
        <div>
          <div class="eyebrow">
            RASPI LEARNING HUB
          </div>

          <h1>
            Welcome to the
            <span>IT Learning Platform</span>
          </h1>

          <p>
            Explore cybersecurity concepts, Docker commands, and
            Raspberry Pi server technologies through interactive learning modules.
          </p>

          <div class="hero-actions">
            <q-btn
              unelevated
              rounded
              color="primary"
              label="Explore Cybersecurity"
              icon="security"
              to="/cybersecurity"
              no-caps
            />

            <q-btn
              outline
              rounded
              color="primary"
              label="Learn Docker"
              icon="terminal"
              to="/docker"
              no-caps
            />
          </div>
        </div>

        <div class="server-card">
          <div class="server-icon">
            <q-icon name="dns" size="42px" />
          </div>

          <div class="server-title">
            Raspberry Pi Server
          </div>

          <div class="server-status">
            <span class="status-dot"></span>
            {{ apiStatus }}
          </div>

          <div class="server-description">
            Django REST API
          </div>
        </div>
      </section>


      <!-- Learning Modules -->
      <section class="section">
        <div class="section-heading">
          <div>
            <div class="section-label">LEARNING MODULES</div>
            <h2>Explore IT Topics</h2>
          </div>

          <div class="section-description">
            Build your knowledge through structured technical modules.
          </div>
        </div>

        <div class="module-grid">

          <!-- Cybersecurity -->
          <q-card
            flat
            bordered
            class="module-card cybersecurity-card"
            clickable
            @click="$router.push('/cybersecurity')"
          >
            <q-card-section>
              <div class="module-icon cybersecurity-icon">
                <q-icon name="security" size="30px" />
              </div>

              <div class="module-title">
                Cybersecurity
              </div>

              <div class="module-description">
                Learn how systems, networks, applications, and data
                are protected against cyber threats.
              </div>

              <div class="module-footer">
                <span>Security Fundamentals</span>
                <q-icon name="arrow_forward" />
              </div>
            </q-card-section>
          </q-card>


          <!-- Docker -->
          <q-card
            flat
            bordered
            class="module-card docker-card"
            clickable
            @click="$router.push('/docker')"
          >
            <q-card-section>
              <div class="module-icon docker-icon">
                <q-icon name="terminal" size="30px" />
              </div>

              <div class="module-title">
                Docker Commands
              </div>

              <div class="module-description">
                Learn container management, images, Docker Compose,
                networking, volumes, and essential commands.
              </div>

              <div class="module-footer">
                <span>Containerization</span>
                <q-icon name="arrow_forward" />
              </div>
            </q-card-section>
          </q-card>


          <!-- Raspberry Pi -->
          <q-card
            flat
            bordered
            class="module-card raspberry-card"
          >
            <q-card-section>
              <div class="module-icon raspberry-icon">
                <q-icon name="memory" size="30px" />
              </div>

              <div class="module-title">
                Raspberry Pi Server
              </div>

              <div class="module-description">
                Understand server deployment, networking, services,
                and hosting applications on Raspberry Pi.
              </div>

              <div class="module-footer">
                <span>Server Technology</span>
                <q-icon name="arrow_forward" />
              </div>
            </q-card-section>
          </q-card>

        </div>
      </section>


      <!-- System Status -->
      <section class="section">
        <div class="section-heading">
          <div>
            <div class="section-label">SYSTEM</div>
            <h2>Server Status</h2>
          </div>
        </div>

        <div class="status-grid">

          <div class="status-card">
            <div class="status-card-icon">
              <q-icon name="api" size="26px" />
            </div>

            <div>
              <div class="status-name">Django API</div>
              <div class="status-value">
                <span class="online-dot"></span>
                {{ apiStatus }}
              </div>
            </div>
          </div>


          <div class="status-card">
            <div class="status-card-icon">
              <q-icon name="storage" size="26px" />
            </div>

            <div>
              <div class="status-name">MySQL Database</div>
              <div class="status-value">
                <span class="online-dot"></span>
                Connected
              </div>
            </div>
          </div>


          <div class="status-card">
            <div class="status-card-icon">
              <q-icon name="layers" size="26px" />
            </div>

            <div>
              <div class="status-name">Docker</div>
              <div class="status-value">
                <span class="online-dot"></span>
                Running
              </div>
            </div>
          </div>

        </div>
      </section>


      <!-- Architecture -->
      <section class="architecture-card">
        <div>
          <div class="section-label">PROJECT ARCHITECTURE</div>

          <h2>
            Learning Platform Powered by Raspberry Pi
          </h2>

          <p>
            This platform combines a Quasar frontend, Django REST API,
            MySQL database, and Docker containers into a single
            Raspberry Pi-hosted learning environment.
          </p>
        </div>

        <div class="architecture-flow">

          <div class="architecture-node">
            <q-icon name="web" />
            <span>Quasar</span>
          </div>

          <q-icon name="arrow_forward" class="flow-arrow" />

          <div class="architecture-node">
            <q-icon name="api" />
            <span>Django API</span>
          </div>

          <q-icon name="arrow_forward" class="flow-arrow" />

          <div class="architecture-node">
            <q-icon name="storage" />
            <span>MySQL</span>
          </div>

          <q-icon name="arrow_forward" class="flow-arrow" />

          <div class="architecture-node">
            <q-icon name="memory" />
            <span>Raspberry Pi</span>
          </div>

        </div>
      </section>

    </div>
  </q-page>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const apiStatus = ref('Checking...')

const checkApi = async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/status/'
    )

    if (!response.ok) {
      throw new Error('API unavailable')
    }

    const data = await response.json()

    apiStatus.value =
      data.status === 'online'
        ? 'Online'
        : 'Offline'

  } catch {
    apiStatus.value = 'Offline'
  }
}

onMounted(() => {
  checkApi()
})
</script>


<style scoped>

.dashboard-page {
  background: #f5f7fb;
  min-height: 100vh;
}

.dashboard-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px;
}


/* HERO */

.hero-section {
  display: grid;
  grid-template-columns: 1fr 330px;
  gap: 30px;
  align-items: center;

  padding: 45px;
  border-radius: 24px;

  background:
    linear-gradient(
      135deg,
      #0f172a 0%,
      #172554 55%,
      #064e3b 100%
    );

  color: white;

  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.16);
}

.eyebrow,
.section-label {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #10b981;
}

.hero-section h1 {
  margin: 10px 0 15px;
  font-size: 42px;
  line-height: 1.15;
  font-weight: 800;
}

.hero-section h1 span {
  display: block;
  color: #34d399;
}

.hero-section p {
  max-width: 680px;
  color: #cbd5e1;
  font-size: 16px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 28px;
}


/* SERVER CARD */

.server-card {
  padding: 28px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);

  backdrop-filter: blur(10px);
}

.server-icon {
  width: 65px;
  height: 65px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 16px;

  background: rgba(52, 211, 153, 0.15);
  color: #34d399;
}

.server-title {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
}

.server-status {
  display: flex;
  align-items: center;
  gap: 8px;

  margin-top: 12px;

  color: #34d399;
  font-weight: 700;
}

.status-dot,
.online-dot {
  width: 9px;
  height: 9px;

  display: inline-block;

  border-radius: 50%;
  background: #10b981;
}

.server-description {
  margin-top: 6px;
  color: #94a3b8;
  font-size: 13px;
}


/* SECTIONS */

.section {
  margin-top: 45px;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;

  margin-bottom: 20px;
}

.section-heading h2,
.architecture-card h2 {
  margin: 5px 0 0;

  font-size: 27px;
  font-weight: 800;
  color: #0f172a;
}

.section-description {
  color: #64748b;
}


/* MODULE CARDS */

.module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.module-card {
  border-radius: 20px;

  background: white;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.module-card:hover {
  transform: translateY(-5px);

  box-shadow:
    0 15px 35px rgba(15, 23, 42, 0.10);
}

.module-card .q-card__section {
  padding: 28px;
}

.module-icon {
  width: 58px;
  height: 58px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;
}

.cybersecurity-icon {
  background: #ecfdf5;
  color: #059669;
}

.docker-icon {
  background: #eff6ff;
  color: #2563eb;
}

.raspberry-icon {
  background: #f5f3ff;
  color: #7c3aed;
}

.module-title {
  margin-top: 22px;

  font-size: 21px;
  font-weight: 800;

  color: #0f172a;
}

.module-description {
  margin-top: 10px;

  color: #64748b;
  line-height: 1.6;
}

.module-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 25px;

  color: #64748b;
  font-size: 13px;
  font-weight: 700;
}


/* STATUS */

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.status-card {
  display: flex;
  align-items: center;
  gap: 16px;

  padding: 22px;

  border-radius: 16px;

  background: white;
  border: 1px solid #e2e8f0;
}

.status-card-icon {
  width: 50px;
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 13px;

  background: #f1f5f9;
  color: #475569;
}

.status-name {
  font-size: 14px;
  color: #64748b;
}

.status-value {
  display: flex;
  align-items: center;
  gap: 7px;

  margin-top: 5px;

  font-size: 15px;
  font-weight: 800;
  color: #059669;
}


/* ARCHITECTURE */

.architecture-card {
  margin-top: 45px;
  padding: 35px;

  border-radius: 20px;

  background: white;
  border: 1px solid #e2e8f0;
}

.architecture-card p {
  max-width: 800px;

  color: #64748b;
  line-height: 1.7;
}

.architecture-flow {
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 18px;

  margin-top: 30px;
}

.architecture-node {
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 14px 20px;

  border-radius: 12px;

  background: #f8fafc;
  border: 1px solid #e2e8f0;

  color: #334155;
  font-weight: 700;
}

.architecture-node .q-icon {
  color: #10b981;
}

.flow-arrow {
  color: #94a3b8;
}


/* RESPONSIVE */

@media (max-width: 1000px) {

  .hero-section {
    grid-template-columns: 1fr;
  }

  .module-grid,
  .status-grid {
    grid-template-columns: 1fr;
  }

  .architecture-flow {
    flex-wrap: wrap;
  }

}


@media (max-width: 600px) {

  .dashboard-container {
    padding: 20px;
  }

  .hero-section {
    padding: 30px 24px;
  }

  .hero-section h1 {
    font-size: 32px;
  }

  .hero-actions {
    flex-direction: column;
  }

  .section-heading {
    display: block;
  }

}

</style>