<template>
  <q-page class="networking-page">
    <main class="network-shell">
      <!-- HERO -->
      <section class="network-hero">
        <div class="hero-grid-bg" aria-hidden="true"></div>
        <div class="hero-glow glow-one" aria-hidden="true"></div>
        <div class="hero-glow glow-two" aria-hidden="true"></div>

        <div class="hero-copy">
          <div class="breadcrumb">
            <span class="crumb-dot"></span>
            <span>Raspi Learning Hub</span>
            <span class="crumb-sep">/</span>
            <span>Networking</span>
          </div>

          <div class="eyebrow">
            <q-icon name="lan" />
            NETWORKING FUNDAMENTALS
          </div>

          <h1>Understand how <span>networks work.</span></h1>
          <p class="hero-subtitle">
            Learn how computers communicate, how IP addresses work, how traffic is secured, and how
            servers deliver services across a network.
          </p>

          <ul class="hero-tags">
            <li><q-icon name="menu_book" /> {{ lessons.length }} learning modules</li>
            <li><q-icon name="schedule" /> Self-paced</li>
            <li><q-icon name="terminal" /> Practical commands</li>
          </ul>

          <button class="hero-jump" @click="startLearning">
            <span>Start learning</span>
            <q-icon name="arrow_downward" size="18px" />
          </button>
        </div>

        <div class="network-art" aria-label="Illustration of connected network devices">
          <div class="network-orbit orbit-one"></div>
          <div class="network-orbit orbit-two"></div>
          <div class="network-node node-router">
            <q-icon name="router" size="32px" />
            <span>ROUTER</span>
          </div>
          <div class="network-node node-server">
            <q-icon name="dns" size="28px" />
            <span>SERVER</span>
          </div>
          <div class="network-node node-client">
            <q-icon name="laptop" size="28px" />
            <span>CLIENT</span>
          </div>
          <div class="network-node node-cloud">
            <q-icon name="cloud" size="28px" />
            <span>INTERNET</span>
          </div>
          <div class="network-core">
            <q-icon name="lan" size="36px" />
          </div>
          <div class="float-chip chip-ip">192.168.1.10</div>
          <div class="float-chip chip-port">TCP : 443</div>
          <div class="float-chip chip-ping"><span class="chip-dot"></span> ping 12 ms</div>
          <span class="art-caption">CONNECTED. COMMUNICATING. ONLINE.</span>
        </div>
      </section>

      <!-- QUICK FACTS -->
      <section class="stats-strip" aria-label="Networking quick facts">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <q-icon :name="stat.icon" size="22px" />
          <div>
            <strong>{{ stat.value }}</strong>
            <span>{{ stat.label }}</span>
          </div>
        </div>
      </section>

      <!-- OVERVIEW -->
      <section class="overview-grid" aria-label="Networking learning goals">
        <article class="overview-item">
          <div class="overview-icon"><q-icon name="device_hub" size="23px" /></div>
          <div>
            <h2>Understand networks</h2>
            <p>Learn how devices connect and exchange information.</p>
          </div>
        </article>
        <article class="overview-item">
          <div class="overview-icon"><q-icon name="settings_ethernet" size="23px" /></div>
          <div>
            <h2>Learn core concepts</h2>
            <p>Explore IP addressing, protocols, and network devices.</p>
          </div>
        </article>
        <article class="overview-item">
          <div class="overview-icon"><q-icon name="terminal" size="23px" /></div>
          <div>
            <h2>Practice troubleshooting</h2>
            <p>Discover commands used to inspect network connectivity.</p>
          </div>
        </article>
      </section>

      <!-- LESSON INDEX -->
      <section id="network-study-material" class="study-section">
        <div class="section-heading">
          <div>
            <div class="eyebrow">YOUR LEARNING PATH</div>
            <h2>Networking lessons</h2>
            <p>Choose a module to explore its concepts and examples.</p>
          </div>
          <div class="module-count">{{ String(lessons.length).padStart(2, '0') }} MODULES</div>
        </div>

        <div class="lesson-grid">
          <a
            v-for="(lesson, index) in lessons"
            :key="lesson.id"
            :href="`#${lesson.id}`"
            class="lesson-card"
            :style="{ animationDelay: `${index * 70}ms` }"
          >
            <div class="lesson-card-top">
              <span class="lesson-number">{{ lesson.number }}</span>
              <q-icon name="arrow_outward" size="20px" />
            </div>
            <q-icon :name="lesson.icon" class="lesson-icon" size="30px" />
            <h3>{{ lesson.title }}</h3>
            <p>{{ lesson.description }}</p>
            <span class="lesson-link">Explore lesson <q-icon name="east" /></span>
          </a>
        </div>
      </section>

      <!-- LESSON DETAILS -->
      <section v-for="lesson in lessons" :key="lesson.id" :id="lesson.id" class="lesson-detail reveal">
        <div class="detail-heading">
          <span class="detail-number">{{ lesson.number }}</span>
          <div>
            <span class="eyebrow">NETWORKING FUNDAMENTALS</span>
            <h2>{{ lesson.title }}</h2>
            <p>{{ lesson.description }}</p>
          </div>
        </div>

        <div class="detail-content">
          <p class="lesson-intro">{{ lesson.intro }}</p>
          <div class="concept-grid">
            <article v-for="concept in lesson.concepts" :key="concept.title" class="concept-card">
              <q-icon :name="concept.icon" size="24px" />
              <h3>{{ concept.title }}</h3>
              <p>{{ concept.text }}</p>
            </article>
          </div>

          <div v-if="lesson.example" class="example-panel">
            <div class="example-label">
              <q-icon name="terminal" />
              PRACTICAL EXAMPLE
            </div>
            <p>{{ lesson.exampleText }}</p>
            <pre v-if="lesson.command"><code>{{ lesson.command }}</code></pre>
            <p v-if="lesson.note" class="example-note">{{ lesson.note }}</p>
          </div>

          <a class="back-to-lessons" href="#network-study-material">
            <q-icon name="arrow_upward" /> Back to all lessons
          </a>
        </div>
      </section>

      <!-- PDF PRESENTATION -->
      <section id="network-presentation" class="network-pdf-section reveal">
        <div class="network-pdf-heading">
          <div>
            <div class="network-pdf-eyebrow">COURSE PRESENTATION</div>
            <h2>Networking Presentation</h2>
            <p>Read the presentation below to review networking concepts and fundamentals.</p>
          </div>
          <div class="network-pdf-status">
            <span></span>
            PDF material
          </div>
        </div>

        <q-card flat bordered class="network-pdf-card">
          <div class="network-pdf-toolbar">
            <div class="network-pdf-file">
              <div class="network-pdf-file-icon">
                <q-icon name="picture_as_pdf" size="22px" />
              </div>
              <div class="network-pdf-file-copy">
                <strong>Networking Presentation</strong>
                <span>PDF learning resource</span>
              </div>
            </div>

            <div class="network-pdf-actions">
              <div class="network-pdf-zoom-group">
                <q-btn
                  flat
                  no-caps
                  icon="remove"
                  label="Zoom out"
                  class="network-pdf-toolbar-btn"
                  :disable="zoom <= 50"
                  @click="changeZoom(-10)"
                />
                <span class="network-pdf-zoom-value">{{ zoom }}%</span>
                <q-btn
                  flat
                  no-caps
                  icon="add"
                  label="Zoom in"
                  class="network-pdf-toolbar-btn"
                  :disable="zoom >= 150"
                  @click="changeZoom(10)"
                />
              </div>

              <q-btn
                flat
                no-caps
                icon="open_in_new"
                label="Open PDF"
                class="network-pdf-toolbar-btn"
                @click="openPdf"
              />
              <q-btn
                unelevated
                no-caps
                icon="download"
                label="Download"
                class="network-pdf-download-btn"
                @click="downloadPdf"
              />
              <q-btn
                flat
                round
                dense
                icon="fullscreen"
                aria-label="Open PDF viewer in fullscreen"
                class="network-pdf-fullscreen-btn"
                @click="isFullscreen = true"
              />
            </div>
          </div>

          <div class="network-pdf-viewer">
            <iframe
              :key="`network-pdf-${zoom}`"
              class="network-pdf-frame"
              :src="viewerUrl"
              title="Networking Presentation PDF"
              loading="lazy"
            ></iframe>
          </div>

          <div class="network-pdf-footer">
            <span
              ><q-icon name="lightbulb" size="18px" /> Use the PDF controls to navigate pages and
              search.</span
            >
            <span>Raspi Learning Hub</span>
          </div>
        </q-card>
      </section>

      <q-dialog v-model="isFullscreen" maximized transition-show="fade" transition-hide="fade">
        <q-card class="network-pdf-fullscreen-card">
          <div class="network-pdf-fullscreen-toolbar">
            <div class="network-pdf-file">
              <div class="network-pdf-file-icon">
                <q-icon name="picture_as_pdf" size="22px" />
              </div>
              <div class="network-pdf-file-copy">
                <strong>Networking Presentation</strong>
                <span>Focused reading mode</span>
              </div>
            </div>
            <div class="network-pdf-actions">
              <q-btn flat round icon="open_in_new" aria-label="Open PDF in new tab" @click="openPdf" />
              <q-btn flat round icon="download" aria-label="Download PDF" @click="downloadPdf" />
              <q-btn flat round icon="close" aria-label="Close fullscreen" v-close-popup />
            </div>
          </div>
          <iframe
            class="network-pdf-fullscreen-frame"
            :src="viewerUrl"
            title="Networking Presentation fullscreen viewer"
          ></iframe>
        </q-card>
      </q-dialog>

      <!-- NEXT STEP -->
      <section class="next-step reveal">
        <q-icon name="school" size="30px" />
        <div>
          <h2>Keep building your IT foundation.</h2>
          <p>
            Understand the network first, then apply these concepts when configuring servers and
            services.
          </p>
        </div>
        <button @click="startLearning">Review lessons <q-icon name="east" /></button>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const stats = [
  { icon: 'layers', value: '7 layers', label: 'in the OSI model' },
  { icon: 'pin', value: '65,535', label: 'TCP/UDP ports per host' },
  { icon: 'public', value: '128-bit', label: 'IPv6 address length' },
  { icon: 'speed', value: '1 Gbps+', label: 'common Ethernet speeds' },
]

const lessons = [
  {
    id: 'network-intro',
    number: '01',
    icon: 'lan',
    title: 'Introduction to Networking',
    description: 'Understand what a network is and why devices need to communicate.',
    intro:
      'A computer network is a group of connected devices that exchange data and share resources such as files, applications, printers, and internet access.',
    concepts: [
      {
        icon: 'devices',
        title: 'Network devices',
        text: 'Computers, phones, servers, printers, and other devices can participate in a network.',
      },
      {
        icon: 'share',
        title: 'Data communication',
        text: 'Devices exchange information using agreed rules called protocols.',
      },
      {
        icon: 'hub',
        title: 'Shared resources',
        text: 'Networks make it possible to share services, storage, and internet connectivity.',
      },
    ],
  },
  {
    id: 'network-models',
    number: '02',
    icon: 'account_tree',
    title: 'Network Types and Models',
    description: 'Explore LAN, WAN, client-server architecture, and networking models.',
    intro:
      'Networks can be classified by their size and purpose. Networking models help explain how information moves between applications and devices.',
    concepts: [
      {
        icon: 'home',
        title: 'LAN',
        text: 'A Local Area Network connects devices in a limited area, such as a home, lab, or office.',
      },
      {
        icon: 'public',
        title: 'WAN',
        text: 'A Wide Area Network connects networks across larger geographical areas. The internet is a major example.',
      },
      {
        icon: 'layers',
        title: 'OSI and TCP/IP',
        text: 'Layered models organize networking functions to help explain communication and troubleshoot problems.',
      },
    ],
  },
  {
    id: 'network-topology',
    number: '03',
    icon: 'hub',
    title: 'Topologies and Cabling',
    description: 'See how networks are arranged and which media carry the signals.',
    intro:
      'A topology describes how devices are arranged and connected. The physical medium, such as copper cable, fiber, or radio, determines speed, distance, and reliability.',
    concepts: [
      {
        icon: 'scatter_plot',
        title: 'Star and mesh',
        text: 'Star topologies connect devices to a central switch and are the most common in LANs. Mesh topologies add redundant links for resilience.',
      },
      {
        icon: 'cable',
        title: 'Copper cabling',
        text: 'Twisted-pair Ethernet cables such as Cat5e and Cat6 use RJ-45 connectors and work well for typical LAN distances.',
      },
      {
        icon: 'flash_on',
        title: 'Fiber optic',
        text: 'Fiber carries light over long distances with high bandwidth and is common in backbones and ISP links.',
      },
    ],
    example: true,
    exampleText: 'Check the status and speed of a wired network interface on Linux.',
    command: 'ip link show\nsudo ethtool eth0',
    note: 'Your interface name may differ, such as enp3s0. ethtool may need to be installed first.',
  },
  {
    id: 'network-ip',
    number: '04',
    icon: 'pin',
    title: 'IP Addressing, DNS, and DHCP',
    description: 'Learn how devices are addressed and how names become IP addresses.',
    intro:
      'Devices use IP addresses to communicate across IP networks. Subnets define network boundaries, gateways forward traffic, DNS resolves names, and DHCP can assign network settings automatically.',
    concepts: [
      {
        icon: 'tag',
        title: 'IP address',
        text: 'An IPv4 address, such as 192.168.1.10, identifies an interface on an IP network.',
      },
      {
        icon: 'route',
        title: 'Subnet and gateway',
        text: 'A subnet mask defines the network portion of an IPv4 address. A default gateway provides a route to other networks.',
      },
      {
        icon: 'dns',
        title: 'DNS and DHCP',
        text: 'DNS resolves domain names to records, while DHCP leases IP configuration to clients.',
      },
    ],
    example: true,
    exampleText: 'Inspect your local addresses, routes, and DNS resolution.',
    command: 'ip addr\nip route\nnslookup example.com',
    note: 'These commands inspect local addresses, routes, and DNS resolution on Linux. Your network and DNS results will vary.',
  },
  {
    id: 'network-devices',
    number: '05',
    icon: 'router',
    title: 'Devices and Protocols',
    description: 'Discover routers, switches, access points, TCP, UDP, and common ports.',
    intro:
      'Networking hardware forwards traffic in different ways, while protocols define how data is exchanged between systems and services.',
    concepts: [
      {
        icon: 'lan',
        title: 'Switch',
        text: 'A network switch forwards Ethernet frames within a local network, commonly using MAC addresses.',
      },
      {
        icon: 'router',
        title: 'Router',
        text: 'A router forwards IP packets between different networks.',
      },
      {
        icon: 'swap_horiz',
        title: 'TCP and UDP',
        text: 'TCP provides reliable, ordered delivery. UDP sends datagrams without the same built-in delivery guarantees.',
      },
    ],
    example: true,
    exampleText: 'Common default ports for well-known services.',
    command:
      'HTTP  : TCP port 80\nHTTPS : TCP port 443\nDNS   : commonly port 53\nSSH   : TCP port 22',
    note: 'These are common default ports. Actual services can be configured to use different ports, and DNS may use both UDP and TCP.',
  },
  {
    id: 'network-wireless-security',
    number: '06',
    icon: 'wifi',
    title: 'Wireless and Network Security',
    description: 'Learn how Wi-Fi works and how networks are protected.',
    intro:
      'Wireless networks use radio signals instead of cables, which makes them convenient but easier to intercept. Encryption, firewalls, and VPNs help protect traffic and control access.',
    concepts: [
      {
        icon: 'wifi',
        title: 'Wi-Fi basics',
        text: 'Wi-Fi operates mainly on 2.4 GHz and 5 GHz bands. Lower bands reach farther, while higher bands are usually faster.',
      },
      {
        icon: 'enhanced_encryption',
        title: 'Encryption',
        text: 'WPA2 and WPA3 encrypt wireless traffic. Avoid open networks and outdated options such as WEP.',
      },
      {
        icon: 'local_fire_department',
        title: 'Firewall and VPN',
        text: 'A firewall allows or blocks traffic by rule, while a VPN creates an encrypted tunnel across an untrusted network.',
      },
    ],
    example: true,
    exampleText: 'List nearby Wi-Fi networks and review your firewall status.',
    command: 'nmcli device wifi list\nsudo ufw status verbose',
    note: 'nmcli requires NetworkManager and ufw requires installation on some systems. Only scan networks you are permitted to use.',
  },
  {
    id: 'network-troubleshooting',
    number: '07',
    icon: 'troubleshoot',
    title: 'Network Troubleshooting',
    description: 'Use basic commands to investigate connectivity and name-resolution issues.',
    intro:
      'Troubleshooting works best when you check one layer at a time: local configuration, gateway reachability, remote connectivity, and DNS resolution.',
    concepts: [
      {
        icon: 'settings',
        title: 'Check configuration',
        text: 'Inspect the assigned IP address, network interface status, and routing table.',
      },
      {
        icon: 'wifi_tethering',
        title: 'Test connectivity',
        text: 'Use ping where permitted to check whether a destination responds.',
      },
      {
        icon: 'manage_search',
        title: 'Check DNS',
        text: 'Compare access by IP address and hostname to help identify name-resolution problems.',
      },
    ],
    example: true,
    exampleText: 'Work from the local interface outward to find where the connection fails.',
    command: 'ip addr\nip route\nping -c 4 192.168.1.1\nnslookup example.com',
    note: 'Replace 192.168.1.1 with your actual gateway. Some systems block ping, so no response does not always mean the host is offline.',
  },
  {
    id: 'network-remote',
    number: '08',
    icon: 'vpn_key',
    title: 'Network Services and Remote Access',
    description: 'Find listening services and connect to other machines securely.',
    intro:
      'Servers expose services on specific ports. Knowing which ports are listening, and how to connect to them securely, is a core administration skill.',
    concepts: [
      {
        icon: 'sensors',
        title: 'Listening ports',
        text: 'A service listens on a port for incoming connections. Reviewing open ports helps you spot unexpected services.',
      },
      {
        icon: 'terminal',
        title: 'SSH',
        text: 'Secure Shell provides an encrypted remote command line. Key-based login is safer than passwords.',
      },
      {
        icon: 'upload_file',
        title: 'Secure file transfer',
        text: 'SCP and SFTP copy files over SSH so data is encrypted in transit.',
      },
    ],
    example: true,
    exampleText: 'List listening services, connect to a remote host, and copy a file.',
    command: 'ss -tulpn\nssh student@192.168.1.20\nscp notes.txt student@192.168.1.20:~/',
    note: 'Replace student and the IP address with real values. The remote machine must have an SSH server running.',
  },
  {
    id: 'network-servers',
    number: '09',
    icon: 'dns',
    title: 'Servers and Web Server Fundamentals',
    description: 'Understand client-server communication and the role of a web server.',
    intro:
      'A server provides a service to clients. For a website, the browser sends an HTTP request and a web server returns an HTTP response containing a page or other resource.',
    concepts: [
      {
        icon: 'computer',
        title: 'Client',
        text: 'A browser or application that requests a resource or service.',
      },
      {
        icon: 'dns',
        title: 'Web server',
        text: 'Software such as Nginx or Apache receives HTTP requests and serves content or forwards requests to an application.',
      },
      {
        icon: 'sync_alt',
        title: 'Request and response',
        text: 'HTTP methods, status codes, headers, and response bodies describe web communication.',
      },
    ],
    example: true,
    exampleText: 'Check an HTTP response locally and confirm the web server is running.',
    command: 'curl -I http://127.0.0.1\nsudo systemctl status nginx',
    note: 'Run these on a Linux machine where you have permission. The first command checks an HTTP response from the local machine; the second checks the Nginx service.',
  },
]

const NETWORK_PDF_URL = '/learning/Networking_Presentation.pdf'

const zoom = ref(100)
const isFullscreen = ref(false)

const viewerUrl = computed(
  () => `${NETWORK_PDF_URL}#toolbar=1&navpanes=1&view=FitH&zoom=${zoom.value}`,
)

function changeZoom(amount) {
  zoom.value = Math.min(150, Math.max(50, zoom.value + amount))
}

function openPdf() {
  window.open(NETWORK_PDF_URL, '_blank', 'noopener,noreferrer')
}

function downloadPdf() {
  const link = document.createElement('a')
  link.href = NETWORK_PDF_URL
  link.download = 'Networking_Presentation.pdf'
  document.body.appendChild(link)
  link.click()
  link.remove()
}

function startLearning() {
  document.getElementById('network-study-material')?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

// Scroll-reveal animation (visual only)
let observer = null

onMounted(() => {
  const targets = document.querySelectorAll('.networking-page .reveal')
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'))
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  targets.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.networking-page {
  --network-blue: #2563eb;
  --network-cyan: #06b6d4;
  --network-ink: #172554;
  --network-muted: #64748b;
  --network-line: #dbeafe;
  background: #f6f9ff;
  color: var(--network-ink);
  min-height: 100vh;
}
.network-shell {
  max-width: 1240px;
  width: calc(100% - 48px);
  margin: 0 auto;
  padding: 34px 0 64px;
}

/* ---------- Keyframes ---------- */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes spinReverse {
  to {
    transform: rotate(-360deg);
  }
}
@keyframes floatY {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-9px);
  }
}
@keyframes drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(24px, -18px) scale(1.08);
  }
}
@keyframes gridMove {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 48px 48px;
  }
}
@keyframes pulseDot {
  0% {
    box-shadow: 0 0 0 0 #22d3ee99;
  }
  70% {
    box-shadow: 0 0 0 9px #22d3ee00;
  }
  100% {
    box-shadow: 0 0 0 0 #22d3ee00;
  }
}
@keyframes ripple {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  100% {
    transform: scale(2.1);
    opacity: 0;
  }
}

/* ---------- Hero ---------- */
.network-hero {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 30px;
  align-items: center;
  min-height: 470px;
  padding: clamp(28px, 5vw, 60px);
  border-radius: 30px;
  background: linear-gradient(125deg, #0b1635 0%, #153c78 58%, #087eaa 100%);
  color: white;
  box-shadow: 0 24px 60px #173d7633;
  animation: fadeUp 0.7s ease both;
}
.hero-grid-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image:
    linear-gradient(#7dd3fc14 1px, transparent 1px),
    linear-gradient(90deg, #7dd3fc14 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 70% 45%, #000 20%, transparent 75%);
  animation: gridMove 8s linear infinite;
}
.hero-glow {
  position: absolute;
  z-index: 0;
  border-radius: 50%;
  filter: blur(70px);
  animation: drift 10s ease-in-out infinite;
}
.glow-one {
  width: 280px;
  height: 280px;
  top: -80px;
  right: 8%;
  background: #22d3ee40;
}
.glow-two {
  width: 220px;
  height: 220px;
  bottom: -70px;
  left: 30%;
  background: #6366f133;
  animation-delay: -4s;
}
.hero-copy {
  position: relative;
  z-index: 2;
}
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  color: #c5dcff;
  font-size: 12px;
  margin-bottom: 32px;
}
.crumb-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22d3ee;
  animation: pulseDot 2s infinite;
}
.crumb-sep {
  opacity: 0.55;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #0284c7;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.13em;
}
.network-hero .eyebrow {
  color: #7ee7ff;
}
.network-hero h1 {
  max-width: 650px;
  margin: 18px 0;
  font-size: clamp(36px, 4.4vw, 58px);
  line-height: 1.08;
  letter-spacing: -0.045em;
  font-weight: 850;
}
.network-hero h1 span {
  background: linear-gradient(90deg, #67e8f9, #a5b4fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-subtitle {
  max-width: 570px;
  color: #d7e8ff;
  font-size: 15px;
  line-height: 1.85;
}
.hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  padding: 0;
  margin: 24px 0;
  list-style: none;
}
.hero-tags li {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #dbeafe;
  font-size: 12px;
}
.hero-jump,
.next-step button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 0;
  border-radius: 12px;
  background: #67e8f9;
  color: #082f49;
  padding: 13px 18px;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.2s,
    background 0.2s,
    box-shadow 0.2s;
}
.hero-jump:hover,
.next-step button:hover {
  transform: translateY(-2px);
  background: #a5f3fc;
  box-shadow: 0 10px 24px #22d3ee40;
}
.hero-jump .q-icon {
  animation: floatY 1.6s ease-in-out infinite;
}

/* ---------- Network art ---------- */
.network-art {
  min-height: 320px;
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  isolation: isolate;
}
.network-orbit {
  position: absolute;
  border: 1px solid #a5f3fc35;
  border-radius: 50%;
}
.network-orbit::after {
  content: '';
  position: absolute;
  top: -4px;
  left: calc(50% - 4px);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #67e8f9;
  box-shadow: 0 0 14px 3px #22d3eecc;
}
.orbit-one {
  width: 290px;
  height: 290px;
  animation: spin 16s linear infinite;
}
.orbit-two {
  width: 215px;
  height: 215px;
  border-style: dashed;
  animation: spinReverse 11s linear infinite;
}
.orbit-two::after {
  background: #a5b4fc;
  box-shadow: 0 0 14px 3px #818cf8cc;
}
.network-core {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 88px;
  height: 88px;
  border: 1px solid #a5f3fc70;
  border-radius: 25px;
  background: #0b274d;
  color: #67e8f9;
  box-shadow: 0 0 45px #22d3ee38;
}
.network-core::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid #67e8f9;
  border-radius: 25px;
  animation: ripple 2.6s ease-out infinite;
}
.network-node {
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  width: 94px;
  padding: 12px 6px;
  border: 1px solid #bfe9ff50;
  border-radius: 15px;
  background: #ffffff14;
  backdrop-filter: blur(8px);
  color: white;
  animation: floatY 5s ease-in-out infinite;
}
.network-node span {
  font-size: 9px;
  letter-spacing: 0.08em;
  font-weight: 800;
}
.node-router {
  top: 0;
  left: calc(50% - 47px);
}
.node-server {
  right: 0;
  top: calc(50% - 43px);
  animation-delay: -1.2s;
}
.node-client {
  bottom: 14px;
  left: calc(50% - 47px);
  animation-delay: -2.4s;
}
.node-cloud {
  left: 0;
  top: calc(50% - 43px);
  animation-delay: -3.6s;
}
.float-chip {
  position: absolute;
  z-index: 4;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 11px;
  border: 1px solid #a5f3fc40;
  border-radius: 999px;
  background: #0b1f40cc;
  backdrop-filter: blur(8px);
  color: #a5f3fc;
  font-size: 10px;
  font-weight: 700;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  animation: floatY 6s ease-in-out infinite;
}
.chip-ip {
  top: 18%;
  left: 10%;
  animation-delay: -1s;
}
.chip-port {
  top: 22%;
  right: 8%;
  color: #c7d2fe;
  border-color: #a5b4fc40;
  animation-delay: -3s;
}
.chip-ping {
  bottom: 22%;
  right: 4%;
  animation-delay: -2s;
}
.chip-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  animation: pulseDot 1.8s infinite;
}
.art-caption {
  position: absolute;
  bottom: -4px;
  color: #a5d9f8;
  font-size: 9px;
  letter-spacing: 0.14em;
}

/* ---------- Stats ---------- */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 22px;
  border: 1px solid #e2eaf7;
  border-radius: 18px;
  background: white;
  overflow: hidden;
  animation: fadeUp 0.7s ease 0.15s both;
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 20px 22px;
  border-right: 1px solid #e2eaf7;
}
.stat-item:last-child {
  border-right: 0;
}
.stat-item .q-icon {
  color: var(--network-blue);
}
.stat-item strong {
  display: block;
  font-size: 15px;
  font-weight: 800;
}
.stat-item span {
  color: var(--network-muted);
  font-size: 11px;
}

/* ---------- Overview ---------- */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 16px 0 76px;
}
.overview-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 23px;
  border: 1px solid #e2eaf7;
  border-radius: 18px;
  background: white;
  transition:
    transform 0.25s,
    box-shadow 0.25s,
    border-color 0.25s;
  animation: fadeUp 0.7s ease 0.25s both;
}
.overview-item:hover {
  transform: translateY(-4px);
  border-color: #93c5fd;
  box-shadow: 0 16px 32px #1d4ed814;
}
.overview-icon {
  display: grid;
  place-items: center;
  flex: 0 0 46px;
  height: 46px;
  border-radius: 14px;
  background: #eff6ff;
  color: var(--network-blue);
}
.overview-item h2 {
  margin: 1px 0 7px;
  font-size: 15px;
  font-weight: 800;
}
.overview-item p,
.section-heading p {
  margin: 0;
  color: var(--network-muted);
  font-size: 13px;
  line-height: 1.7;
}

/* ---------- Lesson index ---------- */
.study-section {
  scroll-margin-top: 24px;
}
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 24px;
}
.section-heading h2 {
  margin: 8px 0;
  font-size: clamp(26px, 3vw, 36px);
  letter-spacing: -0.035em;
}
.module-count {
  padding: 9px 12px;
  border: 1px solid #bfdbfe;
  border-radius: 10px;
  background: #eff6ff;
  color: #1d4ed8;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.08em;
  white-space: nowrap;
}
.lesson-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.lesson-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 235px;
  padding: 22px;
  border: 1px solid #e2eaf7;
  border-radius: 19px;
  background: white;
  color: var(--network-ink);
  text-decoration: none;
  transition:
    transform 0.25s,
    border-color 0.25s,
    box-shadow 0.25s;
  animation: fadeUp 0.6s ease both;
}
.lesson-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #2563eb, #06b6d4);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s ease;
}
.lesson-card:hover {
  transform: translateY(-5px);
  border-color: #93c5fd;
  box-shadow: 0 18px 36px #1d4ed817;
}
.lesson-card:hover::before {
  transform: scaleX(1);
}
.lesson-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: #94a3b8;
}
.lesson-card-top .q-icon {
  transition:
    transform 0.25s,
    color 0.25s;
}
.lesson-card:hover .lesson-card-top .q-icon {
  color: var(--network-blue);
  transform: translate(3px, -3px);
}
.lesson-number,
.detail-number {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 850;
  font-size: 12px;
}
.lesson-icon {
  margin-top: 19px;
  color: #0284c7;
  transition: transform 0.3s;
}
.lesson-card:hover .lesson-icon {
  transform: scale(1.12) rotate(-4deg);
}
.lesson-card h3 {
  margin: 12px 0 7px;
  font-size: 17px;
  font-weight: 800;
}
.lesson-card p {
  margin: 0 0 18px;
  color: var(--network-muted);
  font-size: 12px;
  line-height: 1.75;
}
.lesson-link {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: auto;
  color: #2563eb;
  font-size: 12px;
  font-weight: 800;
}
.lesson-link .q-icon {
  transition: transform 0.25s;
}
.lesson-card:hover .lesson-link .q-icon {
  transform: translateX(5px);
}

/* ---------- Lesson details ---------- */
.lesson-detail {
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 34px;
  margin-top: 30px;
  padding: clamp(22px, 4vw, 38px);
  border: 1px solid #e2eaf7;
  border-radius: 23px;
  background: white;
  scroll-margin-top: 22px;
}
.detail-heading {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}
.detail-number {
  flex: 0 0 42px;
  height: 42px;
}
.detail-heading .eyebrow {
  font-size: 9px;
}
.detail-heading h2 {
  margin: 10px 0;
  font-size: clamp(22px, 2.3vw, 29px);
  line-height: 1.2;
  letter-spacing: -0.03em;
}
.detail-heading p {
  margin: 0;
  color: var(--network-muted);
  font-size: 13px;
  line-height: 1.7;
}
.lesson-intro {
  margin: 0 0 20px;
  color: #475569;
  font-size: 14px;
  line-height: 1.9;
}
.concept-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.concept-card {
  padding: 16px;
  border: 1px solid #e5edf8;
  border-radius: 14px;
  background: #f8fbff;
  transition:
    transform 0.25s,
    border-color 0.25s,
    background 0.25s;
}
.concept-card:hover {
  transform: translateY(-3px);
  border-color: #93c5fd;
  background: #f0f7ff;
}
.concept-card > .q-icon {
  color: #0284c7;
}
.concept-card h3 {
  margin: 9px 0 6px;
  font-size: 13px;
  font-weight: 800;
}
.concept-card p {
  margin: 0;
  color: var(--network-muted);
  font-size: 12px;
  line-height: 1.75;
}
.example-panel {
  margin-top: 16px;
  padding: 18px;
  border: 1px solid #dbeafe;
  border-radius: 14px;
  background: #f0f7ff;
}
.example-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #1d4ed8;
  font-size: 10px;
  font-weight: 850;
  letter-spacing: 0.1em;
}
.example-panel > p {
  color: #475569;
  font-size: 12px;
  line-height: 1.75;
}
.example-panel pre {
  overflow-x: auto;
  margin: 12px 0;
  padding: 16px;
  border: 1px solid #1e3a8a;
  border-radius: 10px;
  background: #0b1630;
  color: #a5f3fc;
  font-size: 12px;
  line-height: 1.8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}
.example-panel .example-note {
  margin-bottom: 0;
  font-size: 11px;
}
.back-to-lessons {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 18px;
  color: #2563eb;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
}
.back-to-lessons:hover {
  text-decoration: underline;
}

/* ---------- Scroll reveal ---------- */
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 0.7s ease,
    transform 0.7s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ---------- Next step ---------- */
.next-step {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 36px;
  padding: 26px;
  border-radius: 20px;
  background: linear-gradient(120deg, #e5f5ff, #e0e7ff);
  color: #12345a;
}
.next-step > .q-icon {
  flex: 0 0 auto;
  color: #0284c7;
}
.next-step h2 {
  margin: 0 0 6px;
  font-size: 17px;
}
.next-step p {
  margin: 0;
  color: #47647f;
  font-size: 12px;
  line-height: 1.7;
}
.next-step button {
  margin-left: auto;
  flex: 0 0 auto;
  background: #1d4ed8;
  color: white;
}
.next-step button:hover {
  background: #1e40af;
}

/* ---------- PDF presentation ---------- */
.network-pdf-section {
  margin-top: 72px;
  scroll-margin-top: 30px;
}
.network-pdf-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}
.network-pdf-eyebrow {
  color: #2563eb;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.network-pdf-heading h2 {
  margin: 8px 0;
  color: #172554;
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 800;
  letter-spacing: -0.03em;
}
.network-pdf-heading p {
  margin: 0;
  color: #64748b;
  line-height: 1.7;
}
.network-pdf-status {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  color: #475569;
  font-size: 13px;
}
.network-pdf-status span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #06b6d4;
  animation: pulseDot 2s infinite;
}
.network-pdf-card {
  overflow: hidden;
  border: 1px solid #dbeafe;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 14px 40px #1e3a8a0d;
}
.network-pdf-toolbar,
.network-pdf-fullscreen-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 20px;
  border-bottom: 1px solid #dbeafe;
  background: #fff;
}
.network-pdf-file {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 12px;
}
.network-pdf-file-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 12px;
  background: #eff6ff;
  color: #2563eb;
}
.network-pdf-file-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 4px;
}
.network-pdf-file-copy strong {
  overflow: hidden;
  color: #172554;
  font-size: 14px;
  text-overflow: ellipsis;
}
.network-pdf-file-copy span {
  color: #64748b;
  font-size: 12px;
}
.network-pdf-actions,
.network-pdf-zoom-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 6px;
}
.network-pdf-zoom-group {
  padding-right: 10px;
  border-right: 1px solid #dbeafe;
}
.network-pdf-zoom-value {
  min-width: 42px;
  color: #334155;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
}
.network-pdf-toolbar-btn {
  color: #334155;
}
.network-pdf-download-btn {
  border-radius: 9px;
  background: #2563eb;
  color: #fff;
  transition: background 0.2s;
}
.network-pdf-download-btn:hover {
  background: #1d4ed8;
}
.network-pdf-fullscreen-btn {
  color: #2563eb;
}
.network-pdf-viewer {
  height: min(80vh, 920px);
  min-height: 520px;
  background: #eaf1fb;
}
.network-pdf-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.network-pdf-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 20px;
  color: #64748b;
  font-size: 12px;
}
.network-pdf-footer span:first-child {
  display: flex;
  align-items: center;
  gap: 7px;
}
.network-pdf-fullscreen-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f8fafc;
}
.network-pdf-fullscreen-frame {
  width: 100%;
  flex: 1;
  border: 0;
  background: #eaf1fb;
}

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .network-hero {
    grid-template-columns: 1fr;
  }
  .network-art {
    min-height: 320px;
  }
  .stats-strip {
    grid-template-columns: repeat(2, 1fr);
  }
  .stat-item:nth-child(2) {
    border-right: 0;
  }
  .stat-item:nth-child(-n + 2) {
    border-bottom: 1px solid #e2eaf7;
  }
  .overview-grid {
    grid-template-columns: 1fr;
  }
  .lesson-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .lesson-detail {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}
@media (max-width: 760px) {
  .network-pdf-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .network-pdf-toolbar {
    align-items: flex-start;
    flex-direction: column;
    padding: 14px;
  }
  .network-pdf-actions {
    justify-content: flex-start;
    width: 100%;
  }
  .network-pdf-zoom-group {
    flex-wrap: wrap;
    padding-right: 0;
    border-right: 0;
  }
  .network-pdf-viewer {
    height: 68vh;
    min-height: 400px;
  }
  .network-pdf-footer {
    align-items: flex-start;
    flex-direction: column;
    padding: 12px 14px;
  }
}
@media (max-width: 560px) {
  .network-shell {
    width: calc(100% - 28px);
    padding-top: 16px;
  }
  .network-hero {
    padding: 25px 21px;
    border-radius: 22px;
  }
  .network-hero h1 {
    font-size: 37px;
  }
  .breadcrumb {
    margin-bottom: 25px;
  }
  .network-art {
    min-height: 280px;
    transform: scale(0.9);
  }
  .float-chip {
    display: none;
  }
  .stats-strip {
    grid-template-columns: 1fr;
  }
  .stat-item {
    border-right: 0;
    border-bottom: 1px solid #e2eaf7;
  }
  .stat-item:last-child {
    border-bottom: 0;
  }
  .lesson-grid,
  .concept-grid {
    grid-template-columns: 1fr;
  }
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .next-step {
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .next-step button {
    margin-left: 0;
  }
  .overview-item {
    padding: 18px;
  }
}

/* ---------- Accessibility ---------- */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>