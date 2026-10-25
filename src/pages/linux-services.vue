<template>
  <q-page class="lx">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-copy">
        <div class="live"><span class="pulse"></span> Server console online</div>
        <h1>Linux server services,<br />run from the command line.</h1>
        <p class="lead">
          Nine services keep almost every Linux server alive. Learn what each one does, which port
          it listens on, how to control it with systemd, and how to lock it down. Then practice it
          all in a working terminal below.
        </p>
        <div class="stats">
          <div>
            <strong>{{ counts.services }}</strong
            ><span>core services</span>
          </div>
          <div>
            <strong>{{ counts.ports.toLocaleString() }}</strong
            ><span>ports on every host</span>
          </div>
          <div>
            <strong>{{ counts.cmds }}</strong
            ><span>commands in the lab</span>
          </div>
        </div>
        <div class="actions">
          <q-btn
            unelevated
            no-caps
            icon="terminal"
            label="Open the live lab"
            class="btn-main"
            @click="goLab"
          />
          <q-btn
            flat
            no-caps
            icon="arrow_back"
            label="Back to Linux"
            to="/linux"
            class="btn-ghost"
          />
        </div>
      </div>

      <div class="term hero-term" aria-hidden="true">
        <div class="term-bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="term-title">root@linux-lab: ~</span>
        </div>
        <div class="term-body">
          <div v-for="(l, i) in heroLines" :key="i" :class="['ln', l.c]">{{ l.t }}</div>
          <div class="ln">
            <span class="ps">#</span> {{ heroTyping }}<span class="caret"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- PORT TICKER -->
    <div class="ticker" aria-label="Common service ports">
      <div class="ticker-track">
        <span v-for="(p, i) in tickerItems" :key="i" class="tick">
          <q-icon :name="p.icon" /> {{ p.name }} <code>{{ p.port }}</code>
        </span>
      </div>
    </div>

    <!-- WHY -->
    <section class="block">
      <h2>Why server services matter</h2>
      <p class="sub">
        A service is simply a program that waits for requests on a port. Every port you open is a
        door; knowing which doors exist, and who may walk through them, is the core of server
        administration.
      </p>
      <div class="why">
        <div v-for="w in why" :key="w.title" class="why-card">
          <q-icon :name="w.icon" class="why-ic" />
          <h3>{{ w.title }}</h3>
          <p>{{ w.text }}</p>
        </div>
      </div>
    </section>

    <!-- REQUEST JOURNEY -->
    <section class="block">
      <h2>What happens when someone visits your site</h2>
      <p class="sub">
        One browser request touches several services in order. If any link in the chain is down, the
        whole request fails, which is why you troubleshoot from the outside in.
      </p>
      <div class="journey">
        <template v-for="(n, i) in journey" :key="n.title">
          <div class="node">
            <q-icon :name="n.icon" />
            <strong>{{ n.title }}</strong>
            <span>{{ n.text }}</span>
            <code>{{ n.port }}</code>
          </div>
          <div v-if="i < journey.length - 1" class="wire"><i></i></div>
        </template>
      </div>
    </section>

    <!-- SERVICES -->
    <section class="block">
      <div class="head-row">
        <div>
          <h2>The nine services</h2>
          <p class="sub">
            Filter by purpose, then open a card for its unit name, config file, log command and a
            test you can run.
          </p>
        </div>
      </div>
      <div class="chips" role="tablist">
        <button v-for="c in cats" :key="c" :class="{ on: cat === c }" @click="setCat(c)">
          {{ c }}
        </button>
      </div>

      <div class="grid" :key="cat">
        <article v-for="s in shown" :key="s.id" :class="['card', { open: openId === s.id }]">
          <div class="card-top">
            <span :class="['ic', s.tone]"><q-icon :name="s.icon" /></span>
            <span :class="['state', state[s.unit] ? 'up' : 'down']">
              <i></i>{{ state[s.unit] ? 'running in lab' : 'stopped in lab' }}
            </span>
          </div>
          <h3>{{ s.title }}</h3>
          <p class="desc">{{ s.desc }}</p>
          <ul class="pts">
            <li v-for="p in s.points" :key="p">
              <q-icon name="check_circle" size="14px" /> {{ p }}
            </li>
          </ul>
          <div class="port">
            <q-icon name="lan" /> Port <code>{{ s.port }}</code>
          </div>

          <div class="more" v-show="openId === s.id">
            <dl>
              <dt>systemd unit</dt>
              <dd>
                <code>{{ s.unit }}.service</code>
              </dd>
              <dt>Config file</dt>
              <dd>
                <code>{{ s.cfg }}</code>
              </dd>
              <dt>Check config</dt>
              <dd>
                <code>{{ s.check }}</code>
              </dd>
              <dt>Follow logs</dt>
              <dd>
                <code>journalctl -u {{ s.unit }} -f</code>
              </dd>
            </dl>
            <q-btn
              dense
              unelevated
              no-caps
              icon="play_arrow"
              label="Try it in the lab"
              class="btn-try"
              @click="typeAndRun(`systemctl status ${s.unit}`)"
            />
          </div>
          <button class="toggle" @click="openId = openId === s.id ? null : s.id">
            {{ openId === s.id ? 'Hide details' : 'Show details' }}
            <q-icon :name="openId === s.id ? 'expand_less' : 'expand_more'" />
          </button>
        </article>
      </div>
    </section>

    <!-- LIVE LAB -->
    <section id="lab" class="block lab">
      <h2>Live terminal lab</h2>
      <p class="sub">
        This is a simulated server. Type real commands or click a suggestion. Start and stop
        services, read listeners, open firewall ports, and even trigger a port conflict. Press the
        up arrow to recall history.
      </p>

      <div class="lab-grid">
        <div class="term lab-term" @click="focusInput">
          <div class="term-bar">
            <span class="dots"><i></i><i></i><i></i></span>
            <span class="term-title">root@linux-lab: ~ (interactive)</span>
            <button class="clear" @click.stop="lines.splice(0)">clear</button>
          </div>
          <div class="term-body big" ref="body">
            <div v-for="(l, i) in lines" :key="i" :class="['ln', l.c]">{{ l.t }}</div>
            <div class="ln input-row">
              <span class="ps">{{ PROMPT }}</span>
              <input
                ref="inp"
                v-model="cmdText"
                spellcheck="false"
                autocomplete="off"
                autocapitalize="off"
                aria-label="Terminal input"
                :disabled="busy"
                @keydown.enter="submit"
                @keydown.up.prevent="histNav(1)"
                @keydown.down.prevent="histNav(-1)"
              />
            </div>
          </div>
        </div>

        <aside class="side">
          <div class="panel">
            <h4>Service board</h4>
            <div v-for="s in unitList" :key="s.unit" class="svc-row">
              <span :class="['lamp', state[s.unit] ? 'up' : 'down']"></span>
              <span class="nm">{{ s.unit }}</span>
              <code>{{ s.port.split(' ')[0] }}</code>
              <q-toggle
                dense
                color="amber"
                :model-value="state[s.unit]"
                @update:model-value="(v) => exec(`systemctl ${v ? 'start' : 'stop'} ${s.unit}`)"
              />
            </div>
          </div>
          <div class="panel">
            <h4>Try these</h4>
            <div class="sugg">
              <button v-for="c in suggestions" :key="c" @click="typeAndRun(c)">{{ c }}</button>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- CHEAT SHEET -->
    <section class="block">
      <h2>Commands you will use every day</h2>
      <p class="sub">
        Click a command to copy it. Replace <code>nginx</code> with whichever service you are
        working on.
      </p>
      <div class="cmds">
        <div v-for="g in cheat" :key="g.title" class="cmd-card">
          <div class="cmd-head"><q-icon :name="g.icon" /> {{ g.title }}</div>
          <button v-for="c in g.cmds" :key="c" class="cmd-line" @click="copy(c)">
            <span class="ps">$</span> {{ c }}
            <em>{{ copied === c ? 'copied' : 'copy' }}</em>
          </button>
        </div>
      </div>
    </section>

    <!-- LIFECYCLE + TABLE -->
    <section class="block two">
      <div>
        <h2>The systemd service lifecycle</h2>
        <p class="sub">
          systemd tracks each service through a small set of states. Knowing the difference between
          “enabled” and “active” explains most “it works now but not after reboot” problems.
        </p>
        <div class="states">
          <div v-for="st in lifecycle" :key="st.name" class="st">
            <b :class="st.tone">{{ st.name }}</b>
            <span>{{ st.text }}</span>
          </div>
        </div>
      </div>
      <div>
        <h2>Where things live</h2>
        <p class="sub">Config file and syntax check for each service.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Main config</th>
                <th>Validate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in services" :key="s.id">
                <td>{{ s.title }}</td>
                <td>
                  <code>{{ s.cfg }}</code>
                </td>
                <td>
                  <code>{{ s.check }}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- TROUBLESHOOTING -->
    <section class="block">
      <h2>A four-step troubleshooting routine</h2>
      <p class="sub">
        When a service “doesn’t work”, ask these questions in order. Each one rules out a whole
        class of problems.
      </p>
      <ol class="steps">
        <li v-for="t in trouble" :key="t.title">
          <div>
            <h3>{{ t.title }}</h3>
            <p>{{ t.text }}</p>
          </div>
          <button class="run" @click="typeAndRun(t.cmd)">
            <q-icon name="play_arrow" /> {{ t.cmd }}
          </button>
        </li>
      </ol>
    </section>

    <!-- SECURITY -->
    <section class="block security">
      <div>
        <h2>Hardening principles for every service</h2>
        <ul class="sec-list">
          <li v-for="h in hardening" :key="h.t">
            <strong>{{ h.t }}</strong> {{ h.d }}
          </li>
        </ul>
      </div>
      <div class="term mini">
        <div class="term-bar">
          <span class="dots"><i></i><i></i><i></i></span
          ><span class="term-title">hardening-check</span>
        </div>
        <div class="term-body">
          <div class="ln">
            <span class="ps">#</span> grep -E 'PasswordAuth|PermitRoot' /etc/ssh/sshd_config
          </div>
          <div class="ln ok">PasswordAuthentication no</div>
          <div class="ln ok">PermitRootLogin prohibit-password</div>
          <div class="ln"><span class="ps">#</span> ss -tuln | grep -v 127.0.0.1</div>
          <div class="ln warn">review every public listener above</div>
          <div class="ln"><span class="ps">#</span> <span class="caret"></span></div>
        </div>
      </div>
    </section>

    <!-- PDF -->
    <section id="linux-services-pdf" class="block">
      <div class="head-row">
        <div>
          <h2>Linux Server Services lesson</h2>
          <p class="sub">Read the lesson below, open it in a separate tab, or download a copy.</p>
        </div>
        <div class="actions">
          <q-btn
            outline
            no-caps
            icon="open_in_new"
            label="Open PDF"
            href="/learning/1_Linux_Server_Services.pdf"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost"
          />
          <q-btn
            unelevated
            no-caps
            icon="download"
            label="Download PDF"
            href="/learning/1_Linux_Server_Services.pdf"
            download="1_Linux_Server_Services.pdf"
            class="btn-main"
          />
        </div>
      </div>
      <div class="pdf-card">
        <iframe
          class="pdf"
          src="/learning/1_Linux_Server_Services.pdf#toolbar=1&navpanes=1&view=FitH"
          title="Linux Server Services PDF lesson"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

/* ---------- DATA ---------- */
const portHighlights = [
  { name: 'SSH', port: '22/tcp', icon: 'terminal' },
  { name: 'HTTP', port: '80/tcp', icon: 'language' },
  { name: 'HTTPS', port: '443/tcp', icon: 'https' },
  { name: 'DNS', port: '53/tcp+udp', icon: 'travel_explore' },
  { name: 'SMB', port: '445/tcp', icon: 'folder_shared' },
  { name: 'MySQL', port: '3306/tcp', icon: 'database' },
  { name: 'FTP', port: '21/tcp', icon: 'swap_horiz' },
  { name: 'Proxy', port: '3128/tcp', icon: 'hub' },
  { name: 'SMTP', port: '25/tcp', icon: 'mail' },
]
const tickerItems = computed(() => [...portHighlights, ...portHighlights])

const services = [
  {
    id: 'ssh',
    title: 'SSH',
    cat: 'Access',
    unit: 'sshd',
    d: 'OpenBSD Secure Shell server',
    port: '22/TCP',
    icon: 'terminal',
    tone: 't-ice',
    desc: 'Encrypted remote login and command execution. It is the main way administrators manage Linux servers.',
    points: [
      'Encrypted sessions',
      'Key-based login preferred',
      'Supports tunnels and port forwarding',
    ],
    cfg: '/etc/ssh/sshd_config',
    check: 'sshd -t',
    listen: [['tcp', 22, '0.0.0.0']],
  },
  {
    id: 'http',
    title: 'HTTP',
    cat: 'Web',
    unit: 'apache2',
    d: 'The Apache HTTP Server',
    port: '80/TCP',
    icon: 'language',
    tone: 't-ok',
    desc: 'The protocol that delivers pages, APIs and static files. In production it usually just redirects to HTTPS.',
    points: [
      'Stateless request and response',
      'Commonly redirected to 443',
      'Apache is used as the example here',
    ],
    cfg: '/etc/apache2/apache2.conf',
    check: 'apachectl configtest',
    listen: [['tcp', 80, '0.0.0.0']],
  },
  {
    id: 'dns',
    title: 'DNS',
    cat: 'Network',
    unit: 'named',
    d: 'BIND Domain Name Server',
    port: '53/TCP/UDP',
    icon: 'travel_explore',
    tone: 't-vio',
    desc: 'Turns domain names into IP addresses and other records so clients can find your services.',
    points: [
      'Critical to connectivity',
      'Caching speeds up lookups',
      'Zone files and resource records',
    ],
    cfg: '/etc/bind/named.conf',
    check: 'named-checkconf',
    listen: [
      ['tcp', 53, '0.0.0.0'],
      ['udp', 53, '0.0.0.0'],
    ],
  },
  {
    id: 'smb',
    title: 'SMB',
    cat: 'Files',
    unit: 'smbd',
    d: 'Samba SMB Daemon',
    port: '445/TCP',
    icon: 'folder_shared',
    tone: 't-amb',
    desc: 'File and printer sharing for mixed Windows and Linux networks, implemented on Linux by Samba.',
    points: [
      'Samba is the Linux implementation',
      'Share-level access control',
      'Frequent target for lateral movement',
    ],
    cfg: '/etc/samba/smb.conf',
    check: 'testparm',
    listen: [['tcp', 445, '0.0.0.0']],
  },
  {
    id: 'sql',
    title: 'SQL / MySQL',
    cat: 'Data',
    unit: 'mariadb',
    d: 'MariaDB database server',
    port: '3306/TCP',
    icon: 'database',
    tone: 't-pink',
    desc: 'A relational database that stores structured application data and is queried with SQL.',
    points: [
      'Default MySQL and MariaDB port',
      'Never expose it to the internet',
      'Use strong credentials and TLS',
    ],
    cfg: '/etc/mysql/mariadb.conf.d/50-server.cnf',
    check: 'mariadbd --help --verbose',
    listen: [['tcp', 3306, '127.0.0.1']],
  },
  {
    id: 'web',
    title: 'Web Server',
    cat: 'Web',
    unit: 'nginx',
    d: 'A high performance web server',
    port: '80 / 443',
    icon: 'dns',
    tone: 't-ice',
    desc: 'Hosts websites and serves content. Nginx is the main example for configuration and tuning.',
    points: [
      'Excellent reverse proxy',
      'Static and dynamic content',
      'Where TLS is usually terminated',
    ],
    cfg: '/etc/nginx/nginx.conf',
    check: 'nginx -t',
    listen: [
      ['tcp', 80, '0.0.0.0'],
      ['tcp', 443, '0.0.0.0'],
    ],
  },
  {
    id: 'ftp',
    title: 'FTP',
    cat: 'Files',
    unit: 'vsftpd',
    d: 'Very Secure FTP daemon',
    port: '21/TCP',
    icon: 'swap_horiz',
    tone: 't-ok',
    desc: 'The classic file transfer protocol. Secure alternatives, SFTP and SCP, run over SSH instead.',
    points: ['Clear text by default', 'Prefer SFTP over SSH', 'Active versus passive modes'],
    cfg: '/etc/vsftpd.conf',
    check: 'vsftpd -olisten=NO /etc/vsftpd.conf',
    listen: [['tcp', 21, '0.0.0.0']],
  },
  {
    id: 'db',
    title: 'Database Server',
    cat: 'Data',
    unit: 'postgresql',
    d: 'PostgreSQL RDBMS',
    port: '5432/TCP',
    icon: 'storage',
    tone: 't-vio',
    desc: 'The wider view of database services: persistence, backups and tuning. PostgreSQL appears beside MySQL on 3306.',
    points: [
      'Data persistence layer',
      'Backup and restore strategy',
      'Connection pooling and tuning',
    ],
    cfg: '/etc/postgresql/16/main/postgresql.conf',
    check: 'pg_lsclusters',
    listen: [['tcp', 5432, '127.0.0.1']],
  },
  {
    id: 'proxy',
    title: 'Proxy Server',
    cat: 'Network',
    unit: 'squid',
    d: 'Squid Web Proxy Cache',
    port: '3128/TCP',
    icon: 'hub',
    tone: 't-amb',
    desc: 'An intermediary that forwards client requests. Squid demonstrates caching and access control.',
    points: ['Caching improves speed', 'Access filtering and logging', 'Can hide client addresses'],
    cfg: '/etc/squid/squid.conf',
    check: 'squid -k parse',
    listen: [['tcp', 3128, '0.0.0.0']],
  },
]

const why = [
  {
    icon: 'security',
    title: 'Security boundary',
    text: 'Services define your attack surface. Knowing exact ports and protocols lets you write precise firewall rules.',
  },
  {
    icon: 'speed',
    title: 'Performance and uptime',
    text: 'How web, database and proxy services are configured directly shapes latency, throughput and availability.',
  },
  {
    icon: 'troubleshoot',
    title: 'Faster diagnosis',
    text: 'Knowing a unit name, log command and default port turns hours of guessing into minutes of diagnosis.',
  },
]

const journey = [
  { icon: 'laptop_mac', title: 'Client', text: 'Resolves the name with DNS', port: '53' },
  {
    icon: 'local_fire_department',
    title: 'Firewall',
    text: 'Allows only listed ports',
    port: 'ufw',
  },
  { icon: 'dns', title: 'Nginx', text: 'Terminates TLS, proxies', port: '443' },
  { icon: 'memory', title: 'App server', text: 'Runs the application code', port: '8080' },
  { icon: 'database', title: 'Database', text: 'Stores and returns data', port: '3306' },
]

const cheat = [
  {
    title: 'Inspect listening ports',
    icon: 'search',
    cmds: ['ss -tuln', 'ss -tuln | grep :22', 'lsof -i :80'],
  },
  {
    title: 'Control services',
    icon: 'settings',
    cmds: [
      'systemctl status nginx',
      'systemctl enable --now mariadb',
      'systemctl restart squid',
      'systemctl is-active sshd',
    ],
  },
  {
    title: 'Read the logs',
    icon: 'description',
    cmds: [
      'journalctl -u nginx -f',
      'journalctl -u sshd --since "1 hour ago"',
      'tail -f /var/log/mysql/error.log',
    ],
  },
  {
    title: 'Firewall',
    icon: 'shield',
    cmds: [
      'ufw allow 22/tcp',
      'ufw status verbose',
      'firewall-cmd --list-all',
      'firewall-cmd --add-service=http --permanent',
    ],
  },
]

const lifecycle = [
  {
    name: 'active (running)',
    tone: 'ok',
    text: 'The process is alive and handling requests right now.',
  },
  {
    name: 'inactive (dead)',
    tone: 'mut',
    text: 'Stopped cleanly. Nothing is listening on its port.',
  },
  {
    name: 'failed',
    tone: 'err',
    text: 'It crashed or could not start. Read the journal for the reason.',
  },
  {
    name: 'enabled',
    tone: 'amb',
    text: 'Will start automatically at boot. This is separate from running now.',
  },
]

const trouble = [
  {
    title: 'Is the service running?',
    text: 'Check the unit state first. A failed or stopped unit explains most outages.',
    cmd: 'systemctl status nginx',
  },
  {
    title: 'Is it listening on the port?',
    text: 'A running process may still bind to the wrong address or port.',
    cmd: 'ss -tuln',
  },
  {
    title: 'Is the firewall allowing it?',
    text: 'If it listens locally but clients time out, a firewall rule is often missing.',
    cmd: 'ufw status',
  },
  {
    title: 'What do the logs say?',
    text: 'The journal records the exact error, such as a syntax mistake or a port conflict.',
    cmd: 'journalctl -u nginx',
  },
]

const hardening = [
  {
    t: 'Never expose databases publicly.',
    d: 'Bind MySQL and MariaDB to 127.0.0.1 or a private network.',
  },
  { t: 'Prefer key-based SSH.', d: 'Disable password login and direct root login where possible.' },
  { t: 'Use TLS everywhere.', d: 'Terminate HTTPS on the web server or reverse proxy.' },
  { t: 'Apply least privilege.', d: 'Open only the exact ports each service needs.' },
  { t: 'Keep services updated.', d: 'Many CVEs target outdated web servers, databases and Samba.' },
]

const cats = ['All', 'Access', 'Web', 'Network', 'Files', 'Data']
const cat = ref('All')
const openId = ref(null)
const shown = computed(() =>
  cat.value === 'All' ? services : services.filter((s) => s.cat === cat.value),
)
function setCat(c) {
  cat.value = c
  openId.value = null
}
const unitList = services

/* ---------- COUNT-UP ---------- */
const counts = reactive({ services: 0, ports: 0, cmds: 0 })
let raf = 0
function countUp() {
  const goal = { services: 9, ports: 65535, cmds: 16 }
  const t0 = performance.now()
  const tick = (now) => {
    const k = Math.min(1, (now - t0) / 1400)
    const e = 1 - Math.pow(1 - k, 3)
    Object.keys(goal).forEach((key) => (counts[key] = Math.round(goal[key] * e)))
    if (k < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

/* ---------- HERO AUTO-TYPING TERMINAL ---------- */
const heroLines = ref([])
const heroTyping = ref('')
let alive = true
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const heroDemo = [
  {
    cmd: 'systemctl is-active sshd nginx',
    out: [
      ['active', 'ok'],
      ['active', 'ok'],
    ],
  },
  {
    cmd: 'ss -tuln | grep -E ":(22|443|3306) "',
    out: [
      ['tcp  LISTEN  0.0.0.0:22', ''],
      ['tcp  LISTEN  0.0.0.0:443', ''],
      ['tcp  LISTEN  127.0.0.1:3306', ''],
    ],
  },
  { cmd: 'ufw allow 443/tcp', out: [['Rule added', 'ok']] },
  { cmd: 'journalctl -u nginx -n 1', out: [['nginx[912]: start worker processes', 'mut']] },
]
async function heroLoop() {
  while (alive) {
    for (const step of heroDemo) {
      for (const ch of step.cmd) {
        if (!alive) return
        heroTyping.value += ch
        await sleep(38)
      }
      await sleep(350)
      heroLines.value.push({ t: '# ' + step.cmd, c: '' })
      heroTyping.value = ''
      step.out.forEach(([t, c]) => heroLines.value.push({ t, c }))
      if (heroLines.value.length > 9) heroLines.value.splice(0, heroLines.value.length - 9)
      await sleep(1500)
    }
    heroLines.value = []
  }
}

/* ---------- INTERACTIVE LAB ---------- */
const PROMPT = 'root@linux-lab:~#'
const state = reactive({
  sshd: true,
  apache2: false,
  named: true,
  smbd: false,
  mariadb: true,
  nginx: true,
  vsftpd: false,
  postgresql: false,
  squid: true,
})
const enabled = reactive({
  sshd: true,
  apache2: false,
  named: true,
  smbd: false,
  mariadb: true,
  nginx: true,
  vsftpd: false,
  postgresql: false,
  squid: true,
})
const logs = reactive({})
services.forEach((s) => {
  logs[s.unit] = [`Starting ${s.d}...`, `Started ${s.unit}.service - ${s.d}.`]
})
const fw = ref(['22/tcp', '80/tcp', '443/tcp'])
const fwOn = ref(true)
const alias = {
  ssh: 'sshd',
  mysql: 'mariadb',
  httpd: 'apache2',
  bind9: 'named',
  samba: 'smbd',
  postgres: 'postgresql',
}
const byUnit = Object.fromEntries(services.map((s) => [s.unit, s]))
const pidOf = (u) => 1000 + services.findIndex((s) => s.unit === u) * 137

const lines = ref([
  { t: 'Welcome to linux-lab (Ubuntu 24.04 LTS). Type "help" to see every command.', c: 'mut' },
])
const cmdText = ref('')
const busy = ref(false)
const hist = []
let hi = -1
const body = ref(null)
const inp = ref(null)
const suggestions = [
  'help',
  'ss -tuln',
  'systemctl status nginx',
  'systemctl start apache2',
  'systemctl stop nginx',
  'systemctl enable --now smbd',
  'journalctl -u nginx',
  'ufw status',
  'ufw allow 445/tcp',
  'curl localhost',
  'ping -c 3 8.8.8.8',
]
const L = (t, c = '') => ({ t, c })

function listeners() {
  const rows = []
  services.forEach((s) => {
    if (state[s.unit])
      s.listen.forEach(([p, port, addr]) => rows.push({ p, port, addr, unit: s.unit }))
  })
  return rows
}

function systemctl(a) {
  const args = a.filter((x) => !x.startsWith('-'))
  const now = a.includes('--now')
  const act = args[0]
  if (!act)
    return [L('Usage: systemctl [status|start|stop|restart|enable|disable|is-active] UNIT', 'warn')]
  const names = args.slice(1).map((n) => {
    const b = n.replace('.service', '')
    return alias[b] || b
  })
  if (!names.length) return [L('Too few arguments.', 'err')]
  const out = []
  for (const u of names) {
    const s = byUnit[u]
    if (!s) {
      out.push(L(`Unit ${u}.service could not be found.`, 'err'))
      continue
    }
    if (act === 'status') {
      const up = state[u]
      out.push(L(`${up ? '●' : '○'} ${u}.service - ${s.d}`, up ? 'ok' : 'mut'))
      out.push(
        L(
          `     Loaded: loaded (/lib/systemd/system/${u}.service; ${enabled[u] ? 'enabled' : 'disabled'})`,
        ),
      )
      out.push(
        L(
          up
            ? `     Active: active (running) since ${new Date().toLocaleTimeString()}`
            : '     Active: inactive (dead)',
          up ? 'ok' : 'warn',
        ),
      )
      if (up) out.push(L(`   Main PID: ${pidOf(u)} (${u})`))
    } else if (act === 'is-active')
      out.push(L(state[u] ? 'active' : 'inactive', state[u] ? 'ok' : 'warn'))
    else if (act === 'is-enabled') out.push(L(enabled[u] ? 'enabled' : 'disabled'))
    else if (['start', 'restart', 'enable', 'disable', 'stop'].includes(act)) {
      if (act === 'enable') enabled[u] = true
      if (act === 'disable') enabled[u] = false
      if (act === 'stop') {
        state[u] = false
        logs[u].push(`Stopping ${s.d}...`, `Stopped ${u}.service.`)
      }
      if (act === 'start' || act === 'restart' || (act === 'enable' && now)) {
        const rival = u === 'nginx' ? 'apache2' : u === 'apache2' ? 'nginx' : null
        if (rival && state[rival]) {
          state[u] = false
          logs[u].push(
            `bind() to 0.0.0.0:80 failed (98: Address already in use)`,
            `${u}.service: Failed with result 'exit-code'.`,
          )
          out.push(
            L(
              `Job for ${u}.service failed because the control process exited with error code.`,
              'err',
            ),
          )
          out.push(L(`Port 80 is held by ${rival}. Stop it first: systemctl stop ${rival}`, 'warn'))
          continue
        }
        state[u] = true
        logs[u].push(`Started ${u}.service - ${s.d}.`)
      }
      if (act === 'enable')
        out.push(
          L(`Created symlink /etc/systemd/system/multi-user.target.wants/${u}.service.`, 'mut'),
        )
    } else out.push(L(`Unknown command verb '${act}'.`, 'err'))
  }
  return out
}

function ufw(a) {
  const [act, rule] = a
  if (act === 'status') {
    const o = [
      L(`Status: ${fwOn.value ? 'active' : 'inactive'}`, fwOn.value ? 'ok' : 'warn'),
      L('To                         Action      From'),
      L('--                         ------      ----'),
    ]
    fw.value.forEach((r) => o.push(L(`${r.padEnd(27)}ALLOW       Anywhere`)))
    return o
  }
  if (act === 'enable') {
    fwOn.value = true
    return [L('Firewall is active and enabled on system startup', 'ok')]
  }
  if (act === 'disable') {
    fwOn.value = false
    return [L('Firewall stopped and disabled on system startup', 'warn')]
  }
  if (act === 'allow' || act === 'deny') {
    if (!rule) return [L(`Usage: ufw ${act} PORT[/tcp|udp]`, 'warn')]
    const r = rule.includes('/') ? rule : rule + '/tcp'
    if (act === 'allow') {
      if (!fw.value.includes(r)) fw.value.push(r)
      return [L('Rule added', 'ok')]
    }
    fw.value = fw.value.filter((x) => x !== r)
    return [L('Rule updated: port is now blocked', 'ok')]
  }
  return [L('Usage: ufw [status|enable|disable|allow|deny] ...', 'warn')]
}

function helpText() {
  return [
    L('Available commands:', 'ok'),
    L('  systemctl status|start|stop|restart|enable|disable|is-active UNIT'),
    L('  ss -tuln                list listening ports'),
    L('  lsof -i :PORT           which process owns a port'),
    L('  journalctl -u UNIT      show service logs'),
    L('  ufw status|allow|deny   manage the firewall'),
    L('  curl localhost          test the web server'),
    L('  ping -c 3 HOST          test connectivity'),
    L('  cat /etc/ssh/sshd_config, whoami, hostname, uname -a, date, clear'),
    L('Pipes work too: ss -tuln | grep 443  (add -v to invert)', 'mut'),
  ]
}

function run(cmd) {
  const [mainPart, ...pipes] = cmd.split('|')
  const [bin, ...a] = mainPart.trim().split(/\s+/)
  let res = []
  switch (bin) {
    case 'help':
      res = helpText()
      break
    case 'systemctl':
      res = systemctl(a)
      break
    case 'ufw':
      res = ufw(a)
      break
    case 'whoami':
      res = [L('root')]
      break
    case 'hostname':
      res = [L('linux-lab')]
      break
    case 'date':
      res = [L(new Date().toString())]
      break
    case 'uname':
      res = [L('Linux linux-lab 6.8.0-45-generic #45-Ubuntu SMP x86_64 GNU/Linux')]
      break
    case 'ss': {
      res = [L('Netid State    Recv-Q Send-Q Local Address:Port      Peer Address:Port')]
      listeners().forEach((r) =>
        res.push(
          L(
            `${r.p.padEnd(6)} ${(r.p === 'udp' ? 'UNCONN' : 'LISTEN').padEnd(8)} 0      128    ${(r.addr + ':' + r.port).padEnd(22)} 0.0.0.0:*`,
          ),
        ),
      )
      break
    }
    case 'lsof': {
      const port = Number((a.join(' ').match(/:(\d+)/) || [])[1])
      const hit = listeners().filter((r) => r.port === port)
      res = hit.length
        ? [
            L('COMMAND  PID USER   TYPE NODE NAME'),
            ...hit.map((r) =>
              L(
                `${r.unit.padEnd(8)} ${pidOf(r.unit)} root   IPv4 ${r.p.toUpperCase()}  *:${r.port} (LISTEN)`,
              ),
            ),
          ]
        : [L(`Nothing is listening on port ${port || '?'}.`, 'warn')]
      break
    }
    case 'journalctl': {
      const u = alias[a[a.indexOf('-u') + 1]] || a[a.indexOf('-u') + 1]
      if (!byUnit[u]) {
        res = [L('Usage: journalctl -u UNIT', 'warn')]
        break
      }
      res = logs[u]
        .slice(-6)
        .map((t) =>
          L(
            `${new Date().toLocaleTimeString()} linux-lab ${u}[${pidOf(u)}]: ${t}`,
            /fail|bind|Address/.test(t) ? 'err' : 'mut',
          ),
        )
      break
    }
    case 'curl': {
      const web = state.nginx ? 'nginx' : state.apache2 ? 'apache2' : null
      res = !web
        ? [L('curl: (7) Failed to connect to localhost port 80: Connection refused', 'err')]
        : [
            L('HTTP/1.1 200 OK', 'ok'),
            L(`Server: ${web}`),
            L('Content-Type: text/html'),
            L('<h1>It works!</h1>'),
          ]
      break
    }
    case 'ping': {
      const h = a.filter((x) => !x.startsWith('-') && isNaN(x)).pop() || 'localhost'
      res = [
        L(`PING ${h} 56(84) bytes of data.`),
        ...[1, 2, 3].map((n) =>
          L(`64 bytes from ${h}: icmp_seq=${n} ttl=117 time=${(11 + n * 1.3).toFixed(1)} ms`),
        ),
        L('3 packets transmitted, 3 received, 0% packet loss', 'ok'),
      ]
      break
    }
    case 'cat':
      res =
        a[0] === '/etc/ssh/sshd_config'
          ? [
              L('Port 22'),
              L('PermitRootLogin prohibit-password'),
              L('PasswordAuthentication no'),
              L('PubkeyAuthentication yes'),
            ]
          : [L(`cat: ${a[0] || ''}: No such file in this lab`, 'err')]
      break
    case 'clear':
      lines.value = []
      return null
    default:
      res = [L(`${bin}: command not found. Type "help".`, 'err')]
  }
  for (const p of pipes) {
    const inv = /\s-v\b/.test(' ' + p)
    const pat = p
      .trim()
      .replace(/^grep\s+(-\w+\s+)*/, '')
      .replace(/^['"]|['"]$/g, '')
    try {
      const re = new RegExp(pat)
      res = res.filter((l) => re.test(l.t) !== inv)
    } catch {
      res = [L('grep: invalid pattern', 'err')]
    }
  }
  return res
}

function exec(raw) {
  let cmd = raw.trim().replace(/^sudo\s+/, '')
  lines.value.push(L(`${PROMPT} ${raw.trim()}`, 'cmd'))
  if (!cmd) return
  hist.unshift(raw.trim())
  hi = -1
  const res = run(cmd)
  if (res) lines.value.push(...res)
  nextTick(() => {
    if (body.value) body.value.scrollTop = body.value.scrollHeight
  })
}
function submit() {
  const c = cmdText.value
  cmdText.value = ''
  exec(c)
}
function histNav(d) {
  hi = Math.max(-1, Math.min(hist.length - 1, hi + d))
  cmdText.value = hi === -1 ? '' : hist[hi]
}
function focusInput() {
  inp.value && inp.value.focus()
}
function goLab() {
  document.getElementById('lab')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
async function typeAndRun(cmd) {
  if (busy.value) return
  goLab()
  busy.value = true
  cmdText.value = ''
  await sleep(450)
  for (const ch of cmd) {
    cmdText.value += ch
    await sleep(24)
  }
  await sleep(250)
  busy.value = false
  submit()
  nextTick(focusInput)
}

/* ---------- COPY ---------- */
const copied = ref('')
async function copy(c) {
  try {
    await navigator.clipboard.writeText(c)
    copied.value = c
    setTimeout(() => (copied.value = ''), 1400)
  } catch {
    /* ignore */
  }
}

onMounted(() => {
  countUp()
  heroLoop()
})
onBeforeUnmount(() => {
  alive = false
  cancelAnimationFrame(raf)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap');

.lx {
  --ink: #08141c;
  --panel: #0e1f2b;
  --panel2: #12293a;
  --line: #1f3647;
  --txt: #dbe7ee;
  --mut: #85a0b0;
  --amb: #ffb52e;
  --ice: #5fd4f4;
  --ok: #4ade80;
  --err: #ff6b6b;
  --sans: 'Chakra Petch', system-ui, sans-serif;
  --mono: 'Fira Code', Consolas, monospace;
  padding: 24px clamp(14px, 3vw, 44px) 64px;
  background:
    linear-gradient(rgba(95, 212, 244, 0.035) 1px, transparent 1px) 0 0 / 36px 36px,
    linear-gradient(90deg, rgba(95, 212, 244, 0.035) 1px, transparent 1px) 0 0 / 36px 36px,
    var(--ink);
  color: var(--txt);
  font-family: var(--sans);
  font-size: 15px;
  overflow-x: hidden;
}
.lx code {
  font-family: var(--mono);
  font-size: 0.82em;
  color: var(--amb);
  background: rgba(255, 181, 46, 0.09);
  padding: 1px 6px;
  border-radius: 4px;
}
.lx h1,
.lx h2,
.lx h3,
.lx h4 {
  font-family: var(--sans);
  margin: 0;
}

/* hero */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  gap: 36px;
  align-items: center;
  padding: clamp(10px, 3vw, 34px) 0 34px;
}
.live {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--ok);
  font-size: 0.88rem;
  font-weight: 500;
}
.pulse {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--ok);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.6);
  }
  70% {
    box-shadow: 0 0 0 9px rgba(74, 222, 128, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(74, 222, 128, 0);
  }
}
.hero h1 {
  margin: 14px 0 16px;
  font-size: clamp(2.1rem, 4.6vw, 3.6rem);
  line-height: 1.04;
  font-weight: 700;
  letter-spacing: -0.01em;
}
.lead {
  max-width: 560px;
  margin: 0;
  color: var(--mut);
  font-size: 1.05rem;
  line-height: 1.7;
}
.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 34px;
  margin: 26px 0;
}
.stats strong {
  display: block;
  font-size: 1.9rem;
  color: var(--amb);
  line-height: 1;
  font-weight: 700;
}
.stats span {
  font-size: 0.82rem;
  color: var(--mut);
}
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}
.btn-main {
  background: var(--amb);
  color: #1c1200;
  border-radius: 6px;
  font-weight: 600;
  min-height: 42px;
  padding: 0 18px;
  transition:
    transform 0.15s,
    box-shadow 0.2s;
}
.btn-main:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255, 181, 46, 0.3);
}
.btn-ghost {
  color: var(--txt);
  border: 1px solid var(--line);
  border-radius: 6px;
  min-height: 42px;
}
.btn-ghost:hover {
  background: var(--panel2);
}

/* terminals */
.term {
  background: #050d13;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 181, 46, 0.06);
  font-family: var(--mono);
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 9px 14px;
  background: var(--panel);
  border-bottom: 1px solid var(--line);
}
.dots {
  display: flex;
  gap: 6px;
}
.dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3a4f5e;
}
.dots i:nth-child(1) {
  background: #ff5f56;
}
.dots i:nth-child(2) {
  background: #ffbd2e;
}
.dots i:nth-child(3) {
  background: #27c93f;
}
.term-title {
  font-size: 0.74rem;
  color: var(--mut);
  flex: 1;
}
.clear {
  background: none;
  border: 1px solid var(--line);
  color: var(--mut);
  border-radius: 4px;
  font: 0.7rem var(--mono);
  padding: 2px 9px;
  cursor: pointer;
}
.clear:hover {
  color: var(--amb);
  border-color: var(--amb);
}
.term-body {
  position: relative;
  padding: 16px 18px;
  min-height: 250px;
  font-size: 0.8rem;
  line-height: 1.7;
  color: #b9ccd8;
}
.term-body::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.018) 0 1px,
    transparent 1px 3px
  );
}
.term-body.big {
  height: 430px;
  overflow-y: auto;
}
.hero-term .term-body {
  min-height: 300px;
}
.ln {
  white-space: pre-wrap;
  word-break: break-word;
}
.ps {
  color: var(--amb);
  font-weight: 600;
  margin-right: 6px;
}
.ln.cmd {
  color: #fff;
}
.ln.ok {
  color: var(--ok);
}
.ln.err {
  color: var(--err);
}
.ln.warn {
  color: var(--amb);
}
.ln.mut {
  color: var(--mut);
}
.caret {
  display: inline-block;
  width: 8px;
  height: 15px;
  background: var(--amb);
  vertical-align: middle;
  animation: blink 1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.input-row {
  display: flex;
  align-items: center;
}
.input-row input {
  flex: 1;
  min-width: 0;
  background: none;
  border: 0;
  outline: 0;
  color: #fff;
  font: inherit;
  caret-color: var(--amb);
}

/* ticker */
.ticker {
  overflow: hidden;
  border-block: 1px solid var(--line);
  background: rgba(14, 31, 43, 0.7);
  padding: 11px 0;
}
.ticker-track {
  display: flex;
  width: max-content;
  gap: 38px;
  animation: marquee 34s linear infinite;
}
.ticker:hover .ticker-track {
  animation-play-state: paused;
}
.tick {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--mut);
  white-space: nowrap;
}
.tick .q-icon {
  color: var(--ice);
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

/* blocks */
.block {
  padding-top: 64px;
}
.block h2 {
  font-size: clamp(1.5rem, 2.8vw, 2.1rem);
  font-weight: 700;
  letter-spacing: -0.01em;
}
.sub {
  max-width: 680px;
  margin: 10px 0 26px;
  color: var(--mut);
  line-height: 1.7;
}
.head-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  flex-wrap: wrap;
}
.why {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.why-card {
  padding: 22px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  border-top: 2px solid var(--amb);
}
.why-ic {
  font-size: 26px;
  color: var(--amb);
  margin-bottom: 10px;
}
.why-card h3 {
  font-size: 1.1rem;
  margin-bottom: 6px;
}
.why-card p {
  margin: 0;
  color: var(--mut);
  line-height: 1.65;
  font-size: 0.92rem;
}

/* journey */
.journey {
  display: flex;
  align-items: stretch;
  padding: 22px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow-x: auto;
}
.node {
  flex: 0 0 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  padding: 14px 8px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--panel2);
}
.node .q-icon {
  font-size: 28px;
  color: var(--ice);
}
.node span {
  font-size: 0.78rem;
  color: var(--mut);
}
.wire {
  flex: 1 0 56px;
  position: relative;
  align-self: center;
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--line) 0 6px, transparent 6px 12px);
}
.wire i {
  position: absolute;
  top: -4px;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--amb);
  box-shadow: 0 0 12px var(--amb);
  animation: packet 2.2s ease-in-out infinite;
}
.wire:nth-of-type(2n) i {
  animation-delay: 0.5s;
}
.wire:nth-of-type(3n) i {
  animation-delay: 1s;
}
@keyframes packet {
  0% {
    left: 0;
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  100% {
    left: calc(100% - 10px);
    opacity: 0;
  }
}

/* filter + cards */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}
.chips button {
  background: var(--panel);
  border: 1px solid var(--line);
  color: var(--mut);
  padding: 7px 16px;
  border-radius: 20px;
  font: 500 0.85rem var(--sans);
  cursor: pointer;
  transition: all 0.2s;
}
.chips button:hover {
  color: var(--txt);
  border-color: var(--mut);
}
.chips button.on {
  background: var(--amb);
  border-color: var(--amb);
  color: #1c1200;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  align-items: start;
  animation: swap 0.35s ease;
}
@keyframes swap {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
  transition: border-color 0.25s;
}
.card:hover,
.card.open {
  border-color: rgba(255, 181, 46, 0.55);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ic {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  font-size: 22px;
}
.t-ice {
  color: var(--ice);
  background: rgba(95, 212, 244, 0.12);
}
.t-ok {
  color: var(--ok);
  background: rgba(74, 222, 128, 0.12);
}
.t-vio {
  color: #b69bff;
  background: rgba(182, 155, 255, 0.12);
}
.t-amb {
  color: var(--amb);
  background: rgba(255, 181, 46, 0.12);
}
.t-pink {
  color: #ff8cc6;
  background: rgba(255, 140, 198, 0.12);
}
.state {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.74rem;
  color: var(--mut);
}
.state i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mut);
}
.state.up i {
  background: var(--ok);
  box-shadow: 0 0 8px var(--ok);
}
.state.up {
  color: var(--ok);
}
.card h3 {
  margin: 14px 0 6px;
  font-size: 1.15rem;
}
.desc {
  margin: 0 0 12px;
  color: var(--mut);
  line-height: 1.6;
  font-size: 0.9rem;
}
.pts {
  list-style: none;
  margin: 0 0 14px;
  padding: 0;
  display: grid;
  gap: 5px;
  font-size: 0.84rem;
  color: #b9ccd8;
}
.pts .q-icon {
  color: var(--ok);
  vertical-align: -2px;
}
.port {
  color: var(--mut);
  font-size: 0.84rem;
  display: flex;
  gap: 7px;
  align-items: center;
}
.port .q-icon {
  color: var(--amb);
}
.more {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--line);
}
.more dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 7px 14px;
  margin: 0 0 12px;
  font-size: 0.82rem;
}
.more dt {
  color: var(--mut);
}
.more dd {
  margin: 0;
  word-break: break-all;
}
.btn-try {
  background: rgba(255, 181, 46, 0.14);
  color: var(--amb);
  border-radius: 6px;
}
.toggle {
  margin-top: 14px;
  align-self: flex-start;
  background: none;
  border: 0;
  color: var(--ice);
  font: 500 0.84rem var(--sans);
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}
.toggle:hover {
  color: #fff;
}

/* lab */
.lab-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(250px, 0.7fr);
  gap: 16px;
  align-items: start;
}
.lab-term {
  cursor: text;
}
.side {
  display: grid;
  gap: 14px;
}
.panel {
  padding: 16px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
}
.panel h4 {
  font-size: 0.95rem;
  margin-bottom: 10px;
}
.svc-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 5px 0;
  font-size: 0.84rem;
}
.svc-row .nm {
  flex: 1;
}
.lamp {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #3a4f5e;
  transition: all 0.3s;
}
.lamp.up {
  background: var(--ok);
  box-shadow: 0 0 9px var(--ok);
}
.sugg {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.sugg button {
  background: var(--panel2);
  border: 1px solid var(--line);
  color: #b9ccd8;
  border-radius: 5px;
  padding: 4px 9px;
  font: 0.72rem var(--mono);
  cursor: pointer;
  transition: all 0.15s;
}
.sugg button:hover {
  color: var(--amb);
  border-color: var(--amb);
  transform: translateY(-1px);
}

/* cheat sheet */
.cmds {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
.cmd-card {
  background: #050d13;
  border: 1px solid var(--line);
  border-radius: 10px;
  overflow: hidden;
  font-family: var(--mono);
}
.cmd-head {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 16px;
  background: var(--panel);
  font: 600 0.88rem var(--sans);
}
.cmd-head .q-icon {
  color: var(--amb);
}
.cmd-line {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  background: none;
  border: 0;
  color: #c9d8e2;
  font: 0.78rem var(--mono);
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}
.cmd-line:hover {
  background: rgba(255, 181, 46, 0.07);
}
.cmd-line em {
  margin-left: auto;
  font-style: normal;
  color: var(--mut);
  font-size: 0.7rem;
  opacity: 0;
  transition: opacity 0.15s;
}
.cmd-line:hover em {
  opacity: 1;
}

/* lifecycle + table */
.two {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 34px;
  align-items: start;
}
.states {
  display: grid;
  gap: 10px;
}
.st {
  padding: 12px 14px;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 8px;
  display: grid;
  gap: 3px;
}
.st b {
  font: 600 0.84rem var(--mono);
}
.st span {
  color: var(--mut);
  font-size: 0.86rem;
}
.st .ok {
  color: var(--ok);
}
.st .mut {
  color: var(--mut);
}
.st .err {
  color: var(--err);
}
.st .amb {
  color: var(--amb);
}
.table-wrap {
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 10px;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
}
th {
  text-align: left;
  padding: 11px 14px;
  background: var(--panel);
  color: var(--mut);
  font-weight: 500;
}
td {
  padding: 10px 14px;
  border-top: 1px solid var(--line);
}
tbody tr:hover {
  background: rgba(95, 212, 244, 0.05);
}

/* troubleshooting */
.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
  counter-reset: s;
}
.steps li {
  counter-increment: s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  padding: 18px 20px 18px 64px;
  position: relative;
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 10px;
}
.steps li::before {
  content: counter(s);
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--amb);
  color: #1c1200;
  font-weight: 700;
}
.steps h3 {
  font-size: 1rem;
  margin-bottom: 3px;
}
.steps p {
  margin: 0;
  color: var(--mut);
  font-size: 0.88rem;
  max-width: 520px;
}
.run {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #050d13;
  border: 1px solid var(--line);
  color: var(--amb);
  border-radius: 6px;
  padding: 7px 12px;
  font: 0.78rem var(--mono);
  cursor: pointer;
  transition: all 0.15s;
}
.run:hover {
  border-color: var(--amb);
  transform: translateX(3px);
}

/* security */
.security {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 34px;
  align-items: center;
  margin-top: 64px;
  padding: 34px;
  background: linear-gradient(135deg, #0e2433, #0a1a25);
  border: 1px solid var(--line);
  border-radius: 14px;
}
.sec-list {
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.sec-list li {
  padding-left: 18px;
  position: relative;
  color: var(--mut);
  line-height: 1.55;
}
.sec-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 7px;
  height: 7px;
  background: var(--amb);
  transform: rotate(45deg);
}
.sec-list strong {
  color: var(--txt);
  font-weight: 600;
}
.mini .term-body {
  min-height: 0;
}

/* pdf */
.pdf-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--panel);
  margin-top: 18px;
}
.pdf {
  display: block;
  width: 100%;
  height: min(78vh, 900px);
  min-height: 520px;
  border: 0;
  background: #e9eef0;
}

/* responsive */
@media (max-width: 1100px) {
  .hero,
  .lab-grid,
  .two,
  .security {
    grid-template-columns: 1fr;
  }
  .grid,
  .why {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 680px) {
  .grid,
  .why,
  .cmds {
    grid-template-columns: 1fr;
  }
  .security {
    padding: 22px 16px;
  }
  .term-body.big {
    height: 360px;
  }
  .steps li {
    padding-left: 60px;
  }
  .pdf {
    height: 70vh;
    min-height: 400px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track,
  .wire i,
  .pulse,
  .caret,
  .grid {
    animation: none;
  }
}
</style>
