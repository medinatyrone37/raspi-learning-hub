<template>
  <q-page class="nx">
    <div class="nx-progress" :style="{ transform: `scaleX(${progress})` }"></div>

    <main class="nx-shell">
      <!-- HERO: live terminal -->
      <section class="nx-hero">
        <div class="nx-hero-copy">
          <p class="nx-crumb">
            <span class="nx-led"></span> Linux Cybersecurity Learning Hub / Networking
          </p>
          <h1>Follow the packet, and the network makes sense.</h1>
          <p class="nx-lead">
            From a keystroke on your laptop to a web page on a server across the world, every
            message is cut into packets, addressed, routed, and reassembled. Learn each step, then
            run the same commands real administrators use.
          </p>
          <div class="nx-hero-actions">
            <button class="nx-btn" @click="scrollTo('nx-journey')">Watch a packet travel</button>
            <button class="nx-btn nx-btn-ghost" @click="scrollTo('nx-lessons')">
              Open the {{ lessons.length }} lessons
            </button>
          </div>
        </div>

        <div class="nx-term" aria-label="Interactive simulated terminal">
          <div class="nx-term-bar">
            <i></i><i></i><i></i>
            <span>student@lab: ~ (simulated)</span>
          </div>
          <div ref="termBody" class="nx-term-body">
            <div v-for="(l, i) in termLines" :key="i" :class="l.k">
              <template v-if="l.k === 'cmd'"><b>student@lab:~$</b> {{ l.t }}</template>
              <template v-else>{{ l.t }}</template>
            </div>
            <form class="nx-term-form" @submit.prevent="runHero(termInput)">
              <b>student@lab:~$</b>
              <input
                v-model="termInput"
                :disabled="busy"
                spellcheck="false"
                autocomplete="off"
                aria-label="Type a command"
                placeholder="type help"
              />
              <span v-if="busy" class="nx-spin"></span>
            </form>
          </div>
          <div class="nx-term-chips">
            <button v-for="c in quick" :key="c" :disabled="busy" @click="runHero(c)">
              {{ c }}
            </button>
          </div>
        </div>
      </section>

      <!-- PORT TICKER -->
      <div class="nx-ticker" aria-hidden="true">
        <div class="nx-ticker-track">
          <span v-for="(p, i) in [...ports, ...ports]" :key="i"
            ><b>{{ p[0] }}</b> {{ p[1] }}</span
          >
        </div>
      </div>

      <!-- PACKET JOURNEY -->
      <section id="nx-journey" class="nx-sec">
        <header class="nx-head">
          <h2>The journey of one web request</h2>
          <p>Press play, or click any device. The packet changes its headers at every hop.</p>
        </header>
        <div class="nx-journey">
          <div class="nx-track">
            <div class="nx-wire">
              <div
                class="nx-wire-fill"
                :style="{ width: (step / (hops.length - 1)) * 100 + '%' }"
              ></div>
            </div>
            <div class="nx-packet" :style="{ left: (step / (hops.length - 1)) * 100 + '%' }">
              <q-icon name="mail" size="18px" />
            </div>
            <button
              v-for="(h, i) in hops"
              :key="h.label"
              class="nx-hop"
              :class="{ on: i === step, past: i < step }"
              @click="goStep(i)"
            >
              <q-icon :name="h.icon" size="26px" />
              <span>{{ h.label }}</span>
            </button>
          </div>
          <div class="nx-hop-info" :key="step">
            <div>
              <h3>{{ hops[step].title }}</h3>
              <p>{{ hops[step].text }}</p>
            </div>
            <code>{{ hops[step].hdr }}</code>
          </div>
          <div class="nx-ctrl">
            <button @click="goStep(step - 1)" aria-label="Previous hop">
              <q-icon name="skip_previous" />
            </button>
            <button @click="playing = !playing" :aria-label="playing ? 'Pause' : 'Play'">
              <q-icon :name="playing ? 'pause' : 'play_arrow'" />
            </button>
            <button @click="goStep(step + 1)" aria-label="Next hop">
              <q-icon name="skip_next" />
            </button>
          </div>
        </div>
      </section>

      <!-- OSI EXPLORER -->
      <section class="nx-sec">
        <header class="nx-head">
          <h2>The seven layers, top to bottom</h2>
          <p>
            Each layer wraps the data from the layer above with its own header. This is called
            encapsulation.
          </p>
        </header>
        <div class="nx-osi">
          <ul class="nx-osi-list">
            <li v-for="l in osi" :key="l.n">
              <button :class="{ on: osiSel === l.n }" @click="osiSel = l.n">
                <em>L{{ l.n }}</em> {{ l.name }}
              </button>
            </li>
          </ul>
          <div class="nx-osi-view" :key="osiSel">
            <div class="nx-stack">
              <span
                v-for="k in osi.filter((x) => x.n <= osiSel).reverse()"
                :key="k.n"
                :style="{ '--d': osiSel - k.n }"
                >{{ k.hdr }}</span
              >
              <strong>Your data</strong>
            </div>
            <h3>Layer {{ cur.n }}: {{ cur.name }}</h3>
            <p>{{ cur.text }}</p>
            <dl>
              <div>
                <dt>Data unit</dt>
                <dd>{{ cur.pdu }}</dd>
              </div>
              <div>
                <dt>Examples</dt>
                <dd>{{ cur.ex }}</dd>
              </div>
              <div>
                <dt>Security angle</dt>
                <dd>{{ cur.sec }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <!-- LESSON INDEX -->
      <section id="nx-lessons" class="nx-sec">
        <header class="nx-head nx-head-row">
          <div>
            <h2>Networking lessons</h2>
            <p>Work through the modules in order, or jump to what you need.</p>
          </div>
          <div class="nx-done">{{ done.size }} of {{ lessons.length }} completed</div>
        </header>
        <ol class="nx-index">
          <li v-for="l in lessons" :key="l.id">
            <a :href="`#${l.id}`">
              <span class="nx-idx-led" :class="{ lit: done.has(l.id) }"></span>
              <span class="nx-idx-no">{{ l.number }}</span>
              <q-icon :name="l.icon" size="22px" />
              <span class="nx-idx-t"
                ><strong>{{ l.title }}</strong
                ><small>{{ l.description }}</small></span
              >
              <q-icon name="east" class="nx-idx-go" />
            </a>
          </li>
        </ol>
      </section>

      <!-- LESSON DETAILS -->
      <section v-for="l in lessons" :id="l.id" :key="l.id" class="nx-lesson">
        <div class="nx-lesson-side">
          <span class="nx-lesson-no">{{ l.number }}</span>
          <h2>{{ l.title }}</h2>
          <p>{{ l.description }}</p>
          <div class="nx-sec-note">
            <q-icon name="shield" size="18px" />
            <span><b>Security angle.</b> {{ l.sec }}</span>
          </div>
        </div>
        <div class="nx-lesson-main">
          <p class="nx-intro">{{ l.intro }}</p>
          <div class="nx-concepts">
            <article v-for="c in l.concepts" :key="c[1]">
              <q-icon :name="c[0]" size="22px" />
              <h3>{{ c[1] }}</h3>
              <p>{{ c[2] }}</p>
            </article>
          </div>
          <p class="nx-take"><b>Remember:</b> {{ l.take }}</p>

          <div v-if="l.cmds" class="nx-cmds">
            <h3><q-icon name="terminal" size="18px" /> Try it. Press Run to see sample output.</h3>
            <div v-for="(cm, i) in l.cmds" :key="i" class="nx-cmd">
              <div class="nx-cmd-bar">
                <code><b>$</b> {{ cm.c }}</code>
                <button :disabled="running[l.id + i]" @click="runLesson(l.id + i, cm.c)">
                  <q-icon :name="running[l.id + i] ? 'hourglass_top' : 'play_arrow'" size="16px" />
                  {{ running[l.id + i] ? 'Running' : 'Run' }}
                </button>
              </div>
              <pre v-if="outs[l.id + i] && outs[l.id + i].length">{{
                outs[l.id + i].join('\n')
              }}</pre>
              <p>{{ cm.n }}</p>
            </div>
          </div>

          <div class="nx-lesson-foot">
            <button class="nx-check" :class="{ on: done.has(l.id) }" @click="toggleDone(l.id)">
              <q-icon
                :name="done.has(l.id) ? 'check_circle' : 'radio_button_unchecked'"
                size="18px"
              />
              {{ done.has(l.id) ? 'Completed' : 'Mark as completed' }}
            </button>
            <a href="#nx-lessons">Back to lessons</a>
          </div>
        </div>
      </section>

      <!-- SUBNET CALCULATOR -->
      <section class="nx-sec">
        <header class="nx-head">
          <h2>Subnet calculator</h2>
          <p>Change the address or the prefix length and watch the network boundaries move.</p>
        </header>
        <div class="nx-calc">
          <div class="nx-calc-in">
            <label>IPv4 address<input v-model="ip" spellcheck="false" inputmode="decimal" /></label>
            <label
              >Prefix length: /{{ cidr }}
              <input v-model.number="cidr" type="range" min="8" max="32" />
            </label>
            <div class="nx-bits" v-if="sub" aria-hidden="true">
              <span
                v-for="b in 32"
                :key="b"
                :class="{ net: b <= cidr, gap: b % 8 === 1 && b > 1 }"
                >{{ sub.bits[b - 1] }}</span
              >
            </div>
            <small>Teal bits belong to the network. Amber bits identify hosts.</small>
          </div>
          <dl class="nx-calc-out" v-if="sub">
            <div v-for="r in sub.rows" :key="r[0]">
              <dt>{{ r[0] }}</dt>
              <dd>{{ r[1] }}</dd>
            </div>
          </dl>
          <p v-else class="nx-err">Enter a valid IPv4 address, for example 192.168.1.10.</p>
        </div>
      </section>

      <!-- PDF PRESENTATION -->
      <section id="network-presentation" class="nx-sec">
        <header class="nx-head nx-head-row">
          <div>
            <h2>Networking presentation</h2>
            <p>Review the full course slides below.</p>
          </div>
          <div class="nx-done"><span class="nx-led"></span> PDF material</div>
        </header>
        <q-card flat bordered class="nx-pdf">
          <div class="nx-pdf-bar">
            <div class="nx-pdf-file">
              <q-icon name="picture_as_pdf" size="22px" />
              <div><strong>Networking Presentation</strong><span>PDF learning resource</span></div>
            </div>
            <div class="nx-pdf-act">
              <q-btn
                flat
                no-caps
                dense
                icon="remove"
                label="Zoom out"
                :disable="zoom <= 50"
                @click="changeZoom(-10)"
              />
              <span class="nx-zoom">{{ zoom }}%</span>
              <q-btn
                flat
                no-caps
                dense
                icon="add"
                label="Zoom in"
                :disable="zoom >= 150"
                @click="changeZoom(10)"
              />
              <q-btn flat no-caps dense icon="open_in_new" label="Open PDF" @click="openPdf" />
              <q-btn
                unelevated
                no-caps
                dense
                icon="download"
                label="Download"
                class="nx-dl"
                @click="downloadPdf"
              />
              <q-btn
                flat
                round
                dense
                icon="fullscreen"
                aria-label="Fullscreen"
                @click="isFullscreen = true"
              />
            </div>
          </div>
          <div class="nx-pdf-view">
            <iframe
              :key="`pdf-${zoom}`"
              :src="viewerUrl"
              title="Networking Presentation PDF"
              loading="lazy"
            ></iframe>
          </div>
        </q-card>
      </section>

      <q-dialog v-model="isFullscreen" maximized transition-show="fade" transition-hide="fade">
        <q-card class="nx-full">
          <div class="nx-pdf-bar">
            <div class="nx-pdf-file">
              <q-icon name="picture_as_pdf" size="22px" />
              <div><strong>Networking Presentation</strong><span>Focused reading mode</span></div>
            </div>
            <div class="nx-pdf-act">
              <q-btn flat round icon="open_in_new" aria-label="Open PDF" @click="openPdf" />
              <q-btn flat round icon="download" aria-label="Download PDF" @click="downloadPdf" />
              <q-btn flat round icon="close" aria-label="Close" v-close-popup />
            </div>
          </div>
          <iframe
            class="nx-full-frame"
            :src="viewerUrl"
            title="Networking Presentation fullscreen"
          ></iframe>
        </q-card>
      </q-dialog>

      <!-- NEXT STEP -->
      <section class="nx-next">
        <div>
          <h2>Keep building your IT foundation.</h2>
          <p>
            Understand the network first. Then apply these concepts when you configure servers,
            firewalls, and services.
          </p>
        </div>
        <button class="nx-btn" @click="scrollTo('nx-lessons')">Review lessons</button>
      </section>
    </main>
  </q-page>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

/* ---------- Static data ---------- */
const ports = [
  [20, 'FTP data'],
  [22, 'SSH'],
  [25, 'SMTP'],
  [53, 'DNS'],
  [67, 'DHCP'],
  [80, 'HTTP'],
  [110, 'POP3'],
  [123, 'NTP'],
  [143, 'IMAP'],
  [161, 'SNMP'],
  [443, 'HTTPS'],
  [3306, 'MySQL'],
]

const hops = [
  {
    icon: 'laptop',
    label: 'Client',
    title: '1. Your computer builds the request',
    text: 'The browser asks DNS for the server address, then creates an HTTP request. TCP splits it into segments and adds source and destination ports.',
    hdr: 'src 192.168.1.10:51514 > dst 203.0.113.10:443  [TCP SYN]',
  },
  {
    icon: 'lan',
    label: 'Switch',
    title: '2. The switch forwards the frame',
    text: 'The switch reads the destination MAC address and sends the Ethernet frame out of one port only. Inside a LAN, the IP address is not needed for this step.',
    hdr: 'dst MAC 08:00:27:aa:10:01 (gateway) | src MAC 08:00:27:4e:66:a1',
  },
  {
    icon: 'router',
    label: 'Router',
    title: '3. The router picks the next hop',
    text: 'The router strips the old frame, reads the destination IP, checks its routing table, lowers the TTL by one, and wraps the packet in a new frame.',
    hdr: 'dst IP 203.0.113.10 | TTL 64 > 63 | NAT 192.168.1.10 > 198.51.100.7',
  },
  {
    icon: 'cloud',
    label: 'Internet',
    title: '4. Many routers carry it across',
    text: 'Dozens of routers owned by different providers forward the packet using BGP routes. Each hop only needs to know the next hop, not the whole path.',
    hdr: 'hop 4 > hop 5 > ... > hop 11 | TTL 52',
  },
  {
    icon: 'dns',
    label: 'Server',
    title: '5. The server answers',
    text: 'The web server receives the segments, reassembles the request, and returns an HTTP response. The reply travels back along a similar path.',
    hdr: 'HTTP/1.1 200 OK | Content-Type: text/html | TLS 1.3',
  },
]

const osi = [
  {
    n: 7,
    name: 'Application',
    hdr: 'HTTP',
    pdu: 'Data',
    ex: 'HTTP, DNS, SSH, SMTP',
    text: 'The services users and programs talk to directly. This layer defines the language between client and server.',
    sec: 'Most attacks you hear about, such as SQL injection and phishing, happen here.',
  },
  {
    n: 6,
    name: 'Presentation',
    hdr: 'TLS',
    pdu: 'Data',
    ex: 'TLS, JPEG, JSON, UTF-8',
    text: 'Formats, compresses, and encrypts data so both sides understand it.',
    sec: 'TLS protects data in transit. Weak ciphers and expired certificates break that protection.',
  },
  {
    n: 5,
    name: 'Session',
    hdr: 'Session',
    pdu: 'Data',
    ex: 'Sessions, RPC, NetBIOS',
    text: 'Opens, maintains, and closes conversations between two applications.',
    sec: 'Stolen session tokens let an attacker hijack a logged-in user.',
  },
  {
    n: 4,
    name: 'Transport',
    hdr: 'TCP',
    pdu: 'Segment / Datagram',
    ex: 'TCP, UDP, port numbers',
    text: 'Delivers data between processes using ports. TCP adds reliability; UDP favors speed.',
    sec: 'Port scans and SYN floods target this layer.',
  },
  {
    n: 3,
    name: 'Network',
    hdr: 'IP',
    pdu: 'Packet',
    ex: 'IPv4, IPv6, ICMP, routers',
    text: 'Adds logical addresses and chooses a path across networks.',
    sec: 'IP spoofing and routing attacks abuse trust in addresses.',
  },
  {
    n: 2,
    name: 'Data link',
    hdr: 'Eth',
    pdu: 'Frame',
    ex: 'Ethernet, Wi-Fi, MAC, switches',
    text: 'Moves frames between devices on the same local network using MAC addresses.',
    sec: 'ARP spoofing and MAC flooding work inside the LAN.',
  },
  {
    n: 1,
    name: 'Physical',
    hdr: 'Bits',
    pdu: 'Bits',
    ex: 'Copper, fiber, radio',
    text: 'Turns bits into electrical, light, or radio signals on the medium.',
    sec: 'Cable taps and rogue access points are physical-layer risks.',
  },
]

const OUT = {
  'ip link show': [
    '1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 state UNKNOWN',
    '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 state UP',
    '    link/ether 08:00:27:4e:66:a1 brd ff:ff:ff:ff:ff:ff',
  ],
  'ethtool eth0': [
    'Settings for eth0:',
    '        Speed: 1000Mb/s',
    '        Duplex: Full',
    '        Auto-negotiation: on',
    '        Link detected: yes',
  ],
  'ip addr': [
    '2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500',
    '    inet 192.168.1.10/24 brd 192.168.1.255 scope global eth0',
    '    inet6 fe80::a00:27ff:fe4e:66a1/64 scope link',
  ],
  'ip route': [
    'default via 192.168.1.1 dev eth0 proto dhcp metric 100',
    '192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.10',
  ],
  'arp -n': [
    'Address         HWtype  HWaddress           Iface',
    '192.168.1.1     ether   08:00:27:aa:10:01   eth0',
    '192.168.1.20    ether   08:00:27:5c:91:7e   eth0',
  ],
  'traceroute example.com': [
    'traceroute to example.com (203.0.113.10), 30 hops max',
    ' 1  gateway (192.168.1.1)  1.2 ms',
    ' 2  isp-edge (10.20.0.1)  8.4 ms',
    ' 3  core-rtr (172.16.4.9)  10.9 ms',
    ' 4  ix-peer (198.51.100.2)  12.7 ms',
    ' 5  example.com (203.0.113.10)  13.1 ms',
  ],
  'ss -tulpn': [
    'Netid State  Local Address:Port  Process',
    'udp   UNCONN 127.0.0.53:53       systemd-resolved',
    'tcp   LISTEN 0.0.0.0:22          sshd',
    'tcp   LISTEN 0.0.0.0:80          nginx',
  ],
  'ssh student@192.168.1.20': [
    "student@192.168.1.20's password: ********",
    'Welcome to Ubuntu 24.04 LTS',
    'student@server:~$',
  ],
  'scp notes.txt student@192.168.1.20:~/': ['notes.txt      100%  2048   1.9MB/s   00:00'],
  'curl -I http://127.0.0.1': [
    'HTTP/1.1 200 OK',
    'Server: nginx',
    'Content-Type: text/html',
    'Content-Length: 615',
    'Connection: keep-alive',
  ],
  'systemctl status nginx': [
    '● nginx.service - A high performance web server',
    '     Loaded: loaded (/lib/systemd/system/nginx.service; enabled)',
    '     Active: active (running) since Sun 2026-10-25 08:14:02',
  ],
  'nmcli device wifi list': [
    'IN-USE  SSID        CHAN  RATE       SIGNAL  SECURITY',
    '*       LabNet      36    270 Mbit/s  88     WPA3',
    '        GuestWiFi   6     130 Mbit/s  61     WPA2',
  ],
  'ufw status verbose': [
    'Status: active',
    'Default: deny (incoming), allow (outgoing)',
    '22/tcp    ALLOW IN   Anywhere',
    '443/tcp   ALLOW IN   Anywhere',
  ],
  'dig example.com +short': ['203.0.113.10'],
  'nslookup example.com': [
    'Server:   127.0.0.53',
    'Address:  127.0.0.53#53',
    '',
    'Name:    example.com',
    'Address: 203.0.113.10',
  ],
}
const isIp = (s) => /^\d{1,3}(\.\d{1,3}){3}$/.test(s)
function lookup(raw) {
  const c = raw.trim().replace(/^sudo\s+/, '')
  if (OUT[c]) return OUT[c]
  const [bin, ...a] = c.split(/\s+/)
  const host = a[a.length - 1]
  if (bin === 'ping' && host && !host.startsWith('-')) {
    const addr = isIp(host) ? host : '203.0.113.10'
    const r = [1, 2, 3, 4].map(
      (i) =>
        `64 bytes from ${addr}: icmp_seq=${i} ttl=57 time=${(11 + Math.random() * 3).toFixed(1)} ms`,
    )
    return [
      `PING ${host} (${addr}) 56(84) bytes of data.`,
      ...r,
      `--- ${host} ping statistics ---`,
      '4 packets transmitted, 4 received, 0% packet loss',
    ]
  }
  return null
}

const lessons = [
  {
    id: 'network-intro',
    number: '01',
    icon: 'lan',
    title: 'Introduction to Networking',
    description: 'What a network is and why devices need to communicate.',
    intro:
      'A computer network is a group of connected devices that exchange data and share resources such as files, applications, printers, and internet access. Almost every service you use, from email to video calls, depends on one.',
    concepts: [
      [
        'devices',
        'Hosts and nodes',
        'Computers, phones, servers, printers, and IoT devices can all take part in a network.',
      ],
      [
        'share',
        'Protocols',
        'Devices follow agreed rules, called protocols, so that different vendors can understand each other.',
      ],
      [
        'hub',
        'Shared resources',
        'Networks let many users share storage, services, and one internet connection.',
      ],
    ],
    take: 'A network is only useful because of shared rules. Without protocols, devices could connect but never understand each other.',
    sec: 'Every connected device is a possible entry point, so you cannot protect what you have not listed.',
    cmds: [{ c: 'ip link show', n: 'Lists every network interface and shows whether it is up.' }],
  },
  {
    id: 'network-models',
    number: '02',
    icon: 'account_tree',
    title: 'Network Types and Models',
    description: 'LAN, WAN, client-server design, and layered models.',
    intro:
      'Networks are classified by size and purpose. Layered models such as OSI and TCP/IP break the huge job of communication into smaller steps that can be designed, tested, and fixed one at a time.',
    concepts: [
      [
        'home',
        'LAN',
        'A Local Area Network covers a limited area such as a home, lab, or office. It is fast and privately managed.',
      ],
      [
        'public',
        'WAN',
        'A Wide Area Network links networks across cities or countries. The internet is the largest WAN.',
      ],
      [
        'layers',
        'OSI and TCP/IP',
        'OSI has seven layers for teaching. TCP/IP has four layers and is what the internet uses.',
      ],
    ],
    take: 'When something breaks, ask "which layer?" first. It turns a vague problem into a short checklist.',
    sec: 'Defenses are layered too: firewalls at layers 3 and 4, web filters and WAFs at layer 7.',
  },
  {
    id: 'network-topology',
    number: '03',
    icon: 'hub',
    title: 'Topologies and Cabling',
    description: 'How networks are arranged and which media carry the signals.',
    intro:
      'A topology describes how devices are arranged and connected. The physical medium, whether copper, fiber, or radio, decides speed, distance, and reliability.',
    concepts: [
      [
        'scatter_plot',
        'Star and mesh',
        'Star topologies connect everything to one switch and dominate LANs. Mesh adds redundant links so a failure does not isolate a device.',
      ],
      [
        'cable',
        'Copper cabling',
        'Twisted-pair cables such as Cat5e and Cat6 use RJ-45 connectors and work up to about 100 m.',
      ],
      [
        'flash_on',
        'Fiber optic',
        'Fiber carries light over many kilometers with very high bandwidth, so ISPs and data centers rely on it.',
      ],
    ],
    take: 'A star network is easy to manage, but the central switch is a single point of failure.',
    sec: 'Unused wall ports and unlabeled cables are an easy way for an intruder to plug in.',
    cmds: [
      { c: 'ip link show', n: 'Check the interface state.' },
      {
        c: 'sudo ethtool eth0',
        n: 'Shows negotiated speed and duplex. You may need to install ethtool, and your interface may be called enp3s0.',
      },
    ],
  },
  {
    id: 'network-ip',
    number: '04',
    icon: 'pin',
    title: 'IP Addressing, DNS, and DHCP',
    description: 'How devices are addressed and how names become addresses.',
    intro:
      'Devices use IP addresses to communicate across networks. A subnet defines the network boundary, a gateway forwards traffic outward, DNS turns names into addresses, and DHCP hands out settings automatically.',
    concepts: [
      [
        'tag',
        'IP address',
        'IPv4 uses 32 bits (192.168.1.10). IPv6 uses 128 bits and solves address exhaustion.',
      ],
      [
        'route',
        'Subnet and gateway',
        'A mask such as /24 splits an address into network and host parts. The default gateway is the exit to other networks.',
      ],
      [
        'dns',
        'DNS and DHCP',
        'DNS resolves names to records. DHCP leases an address, gateway, and DNS server to each client.',
      ],
    ],
    take: 'Private ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16) are not routed on the internet. NAT lets them share one public address.',
    sec: 'DNS spoofing redirects victims to fake sites, and rogue DHCP servers can hand out malicious gateways.',
    cmds: [
      { c: 'ip addr', n: 'Shows the address and prefix of each interface.' },
      { c: 'ip route', n: 'Shows the default gateway and local network.' },
      {
        c: 'nslookup example.com',
        n: 'Asks your DNS server to resolve a name. Results vary by network.',
      },
    ],
  },
  {
    id: 'network-devices',
    number: '05',
    icon: 'router',
    title: 'Devices and Protocols',
    description: 'Routers, switches, access points, TCP, UDP, and common ports.',
    intro:
      'Different devices forward traffic at different layers, while protocols define how systems exchange data. Ports tell the receiving computer which service should get each packet.',
    concepts: [
      ['lan', 'Switch', 'Forwards Ethernet frames inside a LAN using a table of MAC addresses.'],
      ['router', 'Router', 'Forwards IP packets between networks using a routing table.'],
      [
        'swap_horiz',
        'TCP and UDP',
        'TCP gives reliable, ordered delivery through a three-way handshake. UDP skips that for speed, as in DNS queries and video calls.',
      ],
    ],
    take: 'HTTP 80, HTTPS 443, SSH 22, DNS 53. These are defaults and administrators can change them.',
    sec: 'Attackers scan ports to learn which services run. Every open port is attack surface.',
    cmds: [
      { c: 'arp -n', n: 'Shows the MAC addresses your host has learned on the LAN.' },
      { c: 'traceroute example.com', n: 'Lists the routers between you and a destination.' },
    ],
  },
  {
    id: 'network-wireless-security',
    number: '06',
    icon: 'wifi',
    title: 'Wireless and Network Security',
    description: 'How Wi-Fi works and how networks are protected.',
    intro:
      'Wireless networks use radio instead of cables, which is convenient but easier to intercept. Encryption, firewalls, and VPNs control who can listen and who can connect.',
    concepts: [
      [
        'wifi',
        'Wi-Fi basics',
        '2.4 GHz reaches farther through walls. 5 GHz and 6 GHz are faster over shorter distances.',
      ],
      [
        'enhanced_encryption',
        'Encryption',
        'WPA3 is the current standard and WPA2 is still common. Avoid open networks and WEP.',
      ],
      [
        'local_fire_department',
        'Firewall and VPN',
        'A firewall allows or blocks traffic by rule. A VPN wraps traffic in an encrypted tunnel across an untrusted network.',
      ],
    ],
    take: 'Default deny is the safest firewall policy. Allow only what is needed.',
    sec: 'Evil-twin access points copy a real network name to capture credentials. Only scan networks you are permitted to test.',
    cmds: [
      {
        c: 'nmcli device wifi list',
        n: 'Needs NetworkManager. Shows nearby networks and their security type.',
      },
      {
        c: 'sudo ufw status verbose',
        n: 'Shows the firewall policy. ufw may need to be installed.',
      },
    ],
  },
  {
    id: 'network-troubleshooting',
    number: '07',
    icon: 'troubleshoot',
    title: 'Network Troubleshooting',
    description: 'Check connectivity and name resolution from the inside out.',
    intro:
      'Troubleshooting works best one layer at a time: local configuration, gateway reachability, remote connectivity, then DNS resolution. Stop at the first step that fails.',
    concepts: [
      [
        'settings',
        'Check configuration',
        'Confirm the interface is up, has an address, and has a default route.',
      ],
      [
        'wifi_tethering',
        'Test connectivity',
        'Ping the gateway first, then an outside IP. Where it stops tells you where to look.',
      ],
      [
        'manage_search',
        'Check DNS',
        'If an IP address works but a name does not, the problem is name resolution.',
      ],
    ],
    take: 'Gateway fails: local problem. IP works but name fails: DNS problem. Both work: look at the application.',
    sec: 'Some firewalls drop ping on purpose, so no reply does not always mean the host is down.',
    cmds: [
      { c: 'ip addr', n: 'Step 1: do you have an address?' },
      {
        c: 'ping -c 4 192.168.1.1',
        n: 'Step 2: can you reach the gateway? Use your own gateway address.',
      },
      { c: 'ping -c 4 203.0.113.10', n: 'Step 3: can you reach an outside IP?' },
      { c: 'nslookup example.com', n: 'Step 4: does DNS work?' },
    ],
  },
  {
    id: 'network-remote',
    number: '08',
    icon: 'vpn_key',
    title: 'Network Services and Remote Access',
    description: 'Find listening services and connect to machines securely.',
    intro:
      'Servers expose services on specific ports. Knowing what is listening, and how to reach it securely, is a core administration skill.',
    concepts: [
      [
        'sensors',
        'Listening ports',
        'A service waits on a port for connections. Reviewing them reveals unexpected services.',
      ],
      [
        'terminal',
        'SSH',
        'Secure Shell gives an encrypted remote command line. Key-based login is safer than passwords.',
      ],
      [
        'upload_file',
        'Secure file transfer',
        'SCP and SFTP copy files through SSH, so data stays encrypted in transit.',
      ],
    ],
    take: 'Disable password login and root login over SSH once keys are working.',
    sec: 'Exposed SSH ports are hit by brute-force bots within minutes. Use keys and fail2ban.',
    cmds: [
      { c: 'ss -tulpn', n: 'Lists listening TCP and UDP sockets with their processes.' },
      {
        c: 'ssh student@192.168.1.20',
        n: 'Replace the user and IP. The remote host needs an SSH server.',
      },
      {
        c: 'scp notes.txt student@192.168.1.20:~/',
        n: 'Copies a file to the remote home directory.',
      },
    ],
  },
  {
    id: 'network-servers',
    number: '09',
    icon: 'dns',
    title: 'Servers and Web Server Fundamentals',
    description: 'Client-server communication and the role of a web server.',
    intro:
      'A server provides a service to clients. For a website, the browser sends an HTTP request and the web server returns an HTTP response containing a page or other resource.',
    concepts: [
      ['computer', 'Client', 'A browser or app that requests a resource.'],
      [
        'dns',
        'Web server',
        'Software such as Nginx or Apache accepts requests and serves files or passes them to an application.',
      ],
      [
        'sync_alt',
        'Request and response',
        'Methods (GET, POST), status codes (200, 404, 500), and headers describe each exchange.',
      ],
    ],
    take: '2xx means success, 3xx redirect, 4xx client error, 5xx server error.',
    sec: 'Keep server software patched and hide version banners. Both reduce what attackers can learn.',
    cmds: [
      { c: 'curl -I http://127.0.0.1', n: 'Requests only the headers from the local web server.' },
      { c: 'systemctl status nginx', n: 'Checks that the Nginx service is running.' },
      { c: 'dig example.com +short', n: 'Quick DNS lookup that prints only the answer.' },
    ],
  },
]

/* ---------- Hero terminal ---------- */
const quick = [
  'ip addr',
  'ping -c 4 example.com',
  'traceroute example.com',
  'ss -tulpn',
  'curl -I http://127.0.0.1',
]
const termLines = ref([{ k: 'out', t: 'Simulated lab shell. Type help to see the commands.' }])
const termInput = ref('')
const busy = ref(false)
const termBody = ref(null)
const timers = []
const sleep = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)))
async function stream(lines, push) {
  for (const l of lines) {
    await sleep(l.startsWith('64 bytes') ? 420 : 90)
    push(l)
  }
}
async function runHero(raw) {
  const c = (raw || '').trim()
  termInput.value = ''
  if (!c || busy.value) return
  if (c === 'clear') {
    termLines.value = []
    return
  }
  busy.value = true
  termLines.value.push({ k: 'cmd', t: c })
  const res =
    c === 'help'
      ? ['Available: ' + Object.keys(OUT).join(', '), 'Also: ping <host>, clear']
      : lookup(c) || [`${c.split(/\s+/)[0]}: command not found in this simulation. Type help.`]
  await stream(res, (t) => {
    termLines.value.push({ k: 'out', t })
    scrollTerm()
  })
  busy.value = false
  await nextTick()
  scrollTerm()
}
async function scrollTerm() {
  await nextTick()
  if (termBody.value) termBody.value.scrollTop = termBody.value.scrollHeight
}

/* ---------- Lesson commands ---------- */
const outs = reactive({})
const running = reactive({})
async function runLesson(key, c) {
  if (running[key]) return
  running[key] = true
  outs[key] = []
  await stream(lookup(c) || ['(no sample output available)'], (l) => outs[key].push(l))
  running[key] = false
}

/* ---------- Journey ---------- */
const step = ref(0)
const playing = ref(true)
let tick = null
function goStep(i) {
  step.value = (i + hops.length) % hops.length
}

/* ---------- OSI ---------- */
const osiSel = ref(7)
const cur = computed(() => osi.find((x) => x.n === osiSel.value))

/* ---------- Progress ---------- */
const done = ref(new Set())
function toggleDone(id) {
  const s = new Set(done.value)
  s.has(id) ? s.delete(id) : s.add(id)
  done.value = s
}

/* ---------- Subnet calculator ---------- */
const ip = ref('192.168.1.10')
const cidr = ref(24)
const sub = computed(() => {
  const p = ip.value.trim().split('.')
  if (p.length !== 4 || p.some((x) => !/^\d{1,3}$/.test(x) || +x > 255)) return null
  const n = p.reduce((a, x) => a * 256 + +x, 0) >>> 0
  const c = Number(cidr.value)
  const mask = c === 0 ? 0 : (0xffffffff << (32 - c)) >>> 0
  const net = (n & mask) >>> 0
  const bc = (net | (~mask >>> 0)) >>> 0
  const str = (v) => [24, 16, 8, 0].map((s) => (v >>> s) & 255).join('.')
  const hosts = c === 32 ? 1 : c === 31 ? 2 : 2 ** (32 - c) - 2
  const first = c >= 31 ? net : net + 1
  const last = c >= 31 ? bc : bc - 1
  const bits = n.toString(2).padStart(32, '0')
  const priv = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(ip.value)
  return {
    bits,
    rows: [
      ['Network address', `${str(net)}/${c}`],
      ['Subnet mask', str(mask)],
      ['Broadcast', str(bc)],
      ['Usable range', `${str(first)} - ${str(last)}`],
      ['Usable hosts', hosts.toLocaleString()],
      ['Address type', priv ? 'Private (RFC 1918)' : 'Public or special-use'],
    ],
  }
})

/* ---------- PDF ---------- */
const NETWORK_PDF_URL = '/learning/Networking_Presentation.pdf'
const zoom = ref(100)
const isFullscreen = ref(false)
const viewerUrl = computed(
  () => `${NETWORK_PDF_URL}#toolbar=1&navpanes=1&view=FitH&zoom=${zoom.value}`,
)
const changeZoom = (a) => {
  zoom.value = Math.min(150, Math.max(50, zoom.value + a))
}
const openPdf = () => window.open(NETWORK_PDF_URL, '_blank', 'noopener,noreferrer')
function downloadPdf() {
  const a = document.createElement('a')
  a.href = NETWORK_PDF_URL
  a.download = 'Networking_Presentation.pdf'
  document.body.appendChild(a)
  a.click()
  a.remove()
}
const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

/* ---------- Scroll progress and autoplay ---------- */
const progress = ref(0)
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  progress.value = h > 0 ? Math.min(1, window.scrollY / h) : 0
}
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) playing.value = false
  tick = setInterval(() => {
    if (playing.value) goStep(step.value + 1)
  }, 3000)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  clearInterval(tick)
  timers.forEach(clearTimeout)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+Condensed:wght@600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

.nx {
  --paper: #eaf0ee;
  --card: #f8fbfa;
  --ink: #12222c;
  --mute: #51646c;
  --line: #cbd9d5;
  --teal: #0b7a75;
  --teal-2: #14b8a6;
  --amber: #ffb454;
  --deep: #0f1d26;
  background: var(--paper);
  background-image:
    linear-gradient(#0b7a7512 1px, transparent 1px),
    linear-gradient(90deg, #0b7a7512 1px, transparent 1px);
  background-size: 32px 32px;
  color: var(--ink);
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  min-height: 100vh;
}
.nx h1,
.nx h2,
.nx h3 {
  font-family: 'IBM Plex Sans Condensed', 'IBM Plex Sans', sans-serif;
  letter-spacing: -0.01em;
  margin: 0;
}
.nx code,
.nx pre,
.nx-term,
.nx-bits,
.nx-ticker {
  font-family: 'IBM Plex Mono', ui-monospace, Menlo, monospace;
}
.nx-shell {
  max-width: 1200px;
  width: calc(100% - 40px);
  margin: 0 auto;
  padding: 28px 0 72px;
}
.nx-progress {
  position: fixed;
  inset: 0 0 auto 0;
  height: 3px;
  background: var(--teal-2);
  transform-origin: left;
  z-index: 2000;
}
.nx button {
  font-family: inherit;
  cursor: pointer;
}
.nx :focus-visible {
  outline: 3px solid var(--amber);
  outline-offset: 2px;
}

/* LED */
.nx-led {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--amber);
  box-shadow: 0 0 0 0 #ffb45499;
  animation: led 2s infinite;
}
@keyframes led {
  70% {
    box-shadow: 0 0 0 8px #ffb45400;
  }
  100% {
    box-shadow: 0 0 0 0 #ffb45400;
  }
}

/* Hero */
.nx-hero {
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 40px;
  align-items: center;
  padding: 28px 0 40px;
}
.nx-crumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 22px;
  color: var(--mute);
  font-size: 13px;
}
.nx-hero h1 {
  font-size: clamp(38px, 5.2vw, 64px);
  line-height: 1.04;
  font-weight: 700;
  max-width: 560px;
}
.nx-lead {
  max-width: 520px;
  margin: 20px 0 26px;
  color: var(--mute);
  font-size: 16px;
  line-height: 1.7;
}
.nx-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.nx-btn {
  border: 2px solid var(--deep);
  border-radius: 6px;
  background: var(--deep);
  color: #fff;
  padding: 12px 18px;
  font-weight: 600;
  font-size: 14px;
  transition:
    transform 0.15s,
    background 0.15s;
}
.nx-btn:hover {
  background: var(--teal);
  border-color: var(--teal);
  transform: translateY(-2px);
}
.nx-btn-ghost {
  background: transparent;
  color: var(--deep);
}
.nx-btn-ghost:hover {
  color: #fff;
}

/* Terminal */
.nx-term {
  background: var(--deep);
  border-radius: 10px;
  box-shadow:
    0 24px 50px #0f1d2633,
    0 0 0 1px #1d3340;
  overflow: hidden;
  color: #d6e4e0;
}
.nx-term-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
  background: #162833;
  font-size: 12px;
  color: #8ba3a8;
}
.nx-term-bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #35505c;
}
.nx-term-bar span {
  margin-left: 8px;
}
.nx-term-body {
  height: 330px;
  overflow-y: auto;
  padding: 16px;
  font-size: 13px;
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: break-word;
}
.nx-term-body b {
  color: var(--amber);
  font-weight: 500;
}
.nx-term-body .out {
  color: #b8cdc8;
  animation: line 0.18s ease both;
}
@keyframes line {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
}
.nx-term-form {
  display: flex;
  align-items: center;
  gap: 8px;
}
.nx-term-form input {
  flex: 1;
  min-width: 0;
  border: 0;
  background: transparent;
  color: #fff;
  font: inherit;
  caret-color: var(--amber);
}
.nx-term-form input:focus {
  outline: none;
}
.nx-spin {
  width: 12px;
  height: 12px;
  border: 2px solid #35505c;
  border-top-color: var(--amber);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.nx-term-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 14px;
  border-top: 1px solid #1d3340;
  background: #12232d;
}
.nx-term-chips button {
  border: 1px solid #2a4452;
  border-radius: 4px;
  background: transparent;
  color: #9fe3d9;
  padding: 5px 9px;
  font:
    12px 'IBM Plex Mono',
    monospace;
}
.nx-term-chips button:hover:not(:disabled) {
  background: #1c3846;
}
.nx-term-chips button:disabled {
  opacity: 0.4;
  cursor: wait;
}

/* Ticker */
.nx-ticker {
  overflow: hidden;
  border-block: 1px solid var(--line);
  background: var(--card);
  padding: 11px 0;
  font-size: 13px;
  color: var(--mute);
}
.nx-ticker-track {
  display: flex;
  gap: 34px;
  width: max-content;
  animation: scroll 40s linear infinite;
}
.nx-ticker:hover .nx-ticker-track {
  animation-play-state: paused;
}
.nx-ticker b {
  color: var(--teal);
  margin-right: 6px;
  font-weight: 500;
}
@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}

/* Sections */
.nx-sec {
  margin-top: 84px;
  scroll-margin-top: 24px;
}
.nx-head {
  margin-bottom: 26px;
}
.nx-head h2 {
  font-size: clamp(28px, 3.4vw, 40px);
  font-weight: 700;
}
.nx-head p {
  margin: 8px 0 0;
  color: var(--mute);
  max-width: 620px;
  line-height: 1.65;
}
.nx-head-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
}
.nx-done {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: var(--card);
  padding: 8px 12px;
  font-size: 13px;
  color: var(--mute);
}

/* Journey */
.nx-journey {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  padding: 34px clamp(16px, 4vw, 44px) 22px;
}
.nx-track {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
}
.nx-wire {
  position: absolute;
  left: 6%;
  right: 6%;
  top: 34px;
  height: 4px;
  background: var(--line);
  border-radius: 2px;
}
.nx-wire-fill {
  height: 100%;
  background: var(--teal-2);
  border-radius: 2px;
  transition: width 0.9s cubic-bezier(0.6, 0, 0.2, 1);
}
.nx-packet {
  position: absolute;
  top: 22px;
  width: 28px;
  height: 28px;
  margin-left: -14px;
  display: grid;
  place-items: center;
  background: var(--amber);
  color: var(--deep);
  border-radius: 6px;
  box-shadow: 0 6px 16px #ffb45466;
  transition: left 0.9s cubic-bezier(0.6, 0, 0.2, 1);
  z-index: 3;
  left: 6%;
}
.nx-packet {
  margin-left: calc(-14px);
}
.nx-hop {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 88px;
  border: 0;
  background: transparent;
  color: var(--mute);
  font-size: 13px;
  font-weight: 500;
}
.nx-hop .q-icon {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border: 2px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  transition: all 0.3s;
}
.nx-hop.past .q-icon {
  border-color: var(--teal-2);
  color: var(--teal);
}
.nx-hop.on {
  color: var(--ink);
}
.nx-hop.on .q-icon {
  border-color: var(--deep);
  background: var(--deep);
  color: var(--amber);
  transform: translateY(-4px);
}
.nx-hop-info {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  align-items: center;
  margin-top: 26px;
  padding-top: 22px;
  border-top: 1px dashed var(--line);
  animation: swap 0.4s ease both;
}
@keyframes swap {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
.nx-hop-info h3 {
  font-size: 21px;
  margin-bottom: 6px;
}
.nx-hop-info p {
  margin: 0;
  color: var(--mute);
  line-height: 1.7;
  font-size: 14px;
}
.nx-hop-info code {
  display: block;
  padding: 14px;
  border-radius: 8px;
  background: var(--deep);
  color: #9fe3d9;
  font-size: 12px;
  line-height: 1.7;
}
.nx-ctrl {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
}
.nx-ctrl button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  color: var(--ink);
}
.nx-ctrl button:hover {
  background: var(--deep);
  color: #fff;
}

/* OSI */
.nx-osi {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
}
.nx-osi-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.nx-osi-list button {
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  text-align: left;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--card);
  padding: 11px 13px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ink);
  transition: all 0.2s;
}
.nx-osi-list em {
  font:
    500 12px 'IBM Plex Mono',
    monospace;
  color: var(--teal);
  font-style: normal;
}
.nx-osi-list button:hover {
  transform: translateX(4px);
}
.nx-osi-list button.on {
  background: var(--deep);
  color: #fff;
  border-color: var(--deep);
}
.nx-osi-list button.on em {
  color: var(--amber);
}
.nx-osi-view {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  padding: 26px;
  animation: swap 0.35s ease both;
}
.nx-stack {
  display: flex;
  align-items: stretch;
  margin-bottom: 20px;
  font-size: 12px;
  font-weight: 500;
}
.nx-stack span {
  display: grid;
  place-items: center;
  padding: 14px 10px;
  background: color-mix(in srgb, var(--teal-2) calc(100% - var(--d) * 12%), #fff);
  color: var(--deep);
  border-right: 2px solid var(--card);
  font-family: 'IBM Plex Mono', monospace;
  animation: pop 0.35s ease both;
}
.nx-stack strong {
  flex: 1;
  display: grid;
  place-items: center;
  min-width: 90px;
  background: var(--amber);
  color: var(--deep);
  font-weight: 600;
  padding: 14px;
}
@keyframes pop {
  from {
    opacity: 0;
    transform: scaleX(0.4);
  }
}
.nx-osi-view h3 {
  font-size: 24px;
}
.nx-osi-view > p {
  margin: 8px 0 18px;
  color: var(--mute);
  line-height: 1.7;
}
.nx-osi-view dl,
.nx-calc-out {
  display: grid;
  gap: 0;
  margin: 0;
}
.nx-osi-view dl > div,
.nx-calc-out > div {
  display: flex;
  gap: 16px;
  padding: 11px 0;
  border-top: 1px solid var(--line);
  font-size: 14px;
}
.nx-osi-view dt,
.nx-calc-out dt {
  flex: 0 0 130px;
  color: var(--mute);
}
.nx-osi-view dd,
.nx-calc-out dd {
  margin: 0;
  font-weight: 500;
}

/* Index */
.nx-index {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  overflow: hidden;
}
.nx-index li + li {
  border-top: 1px solid var(--line);
}
.nx-index a {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  color: var(--ink);
  text-decoration: none;
  transition:
    background 0.2s,
    padding 0.2s;
}
.nx-index a:hover {
  background: #fff;
  padding-left: 30px;
}
.nx-idx-led {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--line);
  flex: 0 0 auto;
  transition: all 0.3s;
}
.nx-idx-led.lit {
  background: #22c55e;
  box-shadow: 0 0 10px #22c55e;
}
.nx-idx-no {
  font:
    500 13px 'IBM Plex Mono',
    monospace;
  color: var(--mute);
}
.nx-index .q-icon {
  color: var(--teal);
}
.nx-idx-t {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.nx-idx-t small {
  color: var(--mute);
  font-size: 13px;
}
.nx-idx-go {
  transition: transform 0.2s;
}
.nx-index a:hover .nx-idx-go {
  transform: translateX(6px);
}

/* Lessons */
.nx-lesson {
  display: grid;
  grid-template-columns: 0.8fr 1.5fr;
  gap: 40px;
  margin-top: 28px;
  padding: clamp(22px, 4vw, 40px);
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
  scroll-margin-top: 20px;
}
.nx-lesson-side {
  align-self: start;
  position: sticky;
  top: 20px;
}
.nx-lesson-no {
  display: inline-block;
  margin-bottom: 14px;
  padding: 4px 9px;
  border-radius: 4px;
  background: var(--deep);
  color: var(--amber);
  font:
    500 12px 'IBM Plex Mono',
    monospace;
}
.nx-lesson-side h2 {
  font-size: clamp(26px, 2.6vw, 34px);
  line-height: 1.12;
  font-weight: 700;
}
.nx-lesson-side > p {
  margin: 10px 0 18px;
  color: var(--mute);
  line-height: 1.65;
  font-size: 14px;
}
.nx-sec-note {
  display: flex;
  gap: 10px;
  padding: 13px;
  border-left: 3px solid var(--amber);
  background: #fff7e8;
  font-size: 13px;
  line-height: 1.6;
  color: #5b4313;
}
.nx-intro {
  margin: 0 0 20px;
  font-size: 16px;
  line-height: 1.85;
  max-width: 68ch;
}
.nx-concepts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.nx-concepts article {
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
  transition:
    border-color 0.2s,
    transform 0.2s;
}
.nx-concepts article:hover {
  border-color: var(--teal-2);
  transform: translateY(-3px);
}
.nx-concepts .q-icon {
  color: var(--teal);
}
.nx-concepts h3 {
  margin: 10px 0 6px;
  font-size: 17px;
}
.nx-concepts p {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
  color: var(--mute);
}
.nx-take {
  margin: 18px 0 0;
  padding: 14px 16px;
  border-radius: 8px;
  background: #e3f3f0;
  color: #0a4f4b;
  font-size: 14px;
  line-height: 1.65;
}
.nx-cmds {
  margin-top: 24px;
}
.nx-cmds > h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 16px;
}
.nx-cmd {
  margin-bottom: 12px;
  border-radius: 8px;
  background: var(--deep);
  overflow: hidden;
}
.nx-cmd-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px 10px 16px;
}
.nx-cmd-bar code {
  color: #fff;
  font-size: 13px;
  overflow-x: auto;
  white-space: nowrap;
}
.nx-cmd-bar b {
  color: var(--amber);
  font-weight: 500;
  margin-right: 6px;
}
.nx-cmd-bar button {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
  border: 0;
  border-radius: 5px;
  background: var(--amber);
  color: var(--deep);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
}
.nx-cmd-bar button:disabled {
  opacity: 0.6;
  cursor: wait;
}
.nx-cmd pre {
  margin: 0;
  padding: 4px 16px 14px;
  color: #9fe3d9;
  font-size: 12.5px;
  line-height: 1.7;
  overflow-x: auto;
  animation: line 0.25s ease both;
}
.nx-cmd > p {
  margin: 0;
  padding: 9px 16px;
  background: #162833;
  color: #9db4b8;
  font-size: 12px;
  line-height: 1.6;
}
.nx-lesson-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 22px;
  font-size: 13px;
}
.nx-lesson-foot a {
  color: var(--teal);
  font-weight: 600;
  text-decoration: none;
}
.nx-lesson-foot a:hover {
  text-decoration: underline;
}
.nx-check {
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #fff;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 500;
  color: var(--ink);
}
.nx-check.on {
  border-color: #22c55e;
  background: #e9f9ee;
  color: #14532d;
}

/* Calculator */
.nx-calc {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 30px;
  padding: 26px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--card);
}
.nx-calc-in {
  display: grid;
  gap: 16px;
  align-content: start;
}
.nx-calc label {
  display: grid;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--mute);
}
.nx-calc input[type='text'],
.nx-calc input:not([type]) {
  border: 1px solid var(--line);
  border-radius: 6px;
  padding: 11px 12px;
  background: #fff;
  color: var(--ink);
  font:
    500 16px 'IBM Plex Mono',
    monospace;
}
.nx-calc input[type='range'] {
  accent-color: var(--teal);
}
.nx-bits {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  font-size: 13px;
}
.nx-bits span {
  width: 20px;
  padding: 6px 0;
  text-align: center;
  border-radius: 3px;
  background: #ffe9c7;
  color: #6b4a0f;
  transition: background 0.25s;
}
.nx-bits span.net {
  background: #bfece6;
  color: #0a4f4b;
}
.nx-bits span.gap {
  margin-left: 8px;
}
.nx-calc small {
  color: var(--mute);
}
.nx-err {
  align-self: center;
  color: #b42318;
  margin: 0;
}
.nx-calc-out dd {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
}

/* PDF */
.nx-pdf {
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--card);
}
.nx-pdf-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--line);
  background: var(--card);
}
.nx-pdf-file {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--teal);
}
.nx-pdf-file div {
  display: flex;
  flex-direction: column;
  color: var(--ink);
}
.nx-pdf-file strong {
  font-size: 14px;
}
.nx-pdf-file span {
  font-size: 12px;
  color: var(--mute);
}
.nx-pdf-act {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
}
.nx-zoom {
  min-width: 42px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
}
.nx-dl {
  background: var(--deep);
  color: #fff;
  border-radius: 6px;
}
.nx-pdf-view {
  height: min(80vh, 920px);
  min-height: 480px;
  background: #dde8e5;
}
.nx-pdf-view iframe,
.nx-full-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.nx-full {
  display: flex;
  flex-direction: column;
  background: var(--card);
}
.nx-full-frame {
  flex: 1;
  background: #dde8e5;
}

/* Next */
.nx-next {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-top: 60px;
  padding: 34px;
  border-radius: 12px;
  background: var(--deep);
  color: #fff;
}
.nx-next h2 {
  font-size: 26px;
}
.nx-next p {
  margin: 8px 0 0;
  color: #9db4b8;
  max-width: 520px;
  line-height: 1.65;
}
.nx-next .nx-btn {
  background: var(--amber);
  border-color: var(--amber);
  color: var(--deep);
}

/* Responsive */
@media (max-width: 960px) {
  .nx-hero,
  .nx-osi,
  .nx-lesson,
  .nx-calc,
  .nx-hop-info {
    grid-template-columns: 1fr;
  }
  .nx-lesson-side {
    position: static;
  }
  .nx-concepts {
    grid-template-columns: 1fr;
  }
  .nx-osi-list {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .nx-osi-list li {
    flex: 1 1 130px;
  }
}
@media (max-width: 560px) {
  .nx-hop {
    width: 56px;
    font-size: 11px;
  }
  .nx-hop .q-icon {
    width: 44px;
    height: 44px;
  }
  .nx-wire {
    top: 28px;
  }
  .nx-packet {
    top: 16px;
  }
  .nx-bits span {
    width: 14px;
    font-size: 11px;
  }
  .nx-stack span {
    padding: 12px 6px;
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
}
</style>
