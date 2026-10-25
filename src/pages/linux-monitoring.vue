<template>
  <q-page class="monitoring-page">
    <canvas ref="bgCanvas" class="bg-canvas" aria-hidden="true"></canvas>
    <div class="scan-overlay" aria-hidden="true"></div>
    <div class="progress-bar" :style="{ width: scrollProgress + '%' }"></div>

    <!-- FLOATING SECTION NAV -->
    <nav class="side-nav" aria-label="Section navigation">
      <a
        v-for="s in sections"
        :key="s.id"
        :href="'#' + s.id"
        :class="{ active: activeSection === s.id }"
        @click.prevent="scrollTo(s.id)"
      >
        <span class="dot"></span>
        <span class="label">{{ s.label }}</span>
      </a>
    </nav>

    <div class="page-container">
      <!-- ================= HERO ================= -->
      <section id="top" class="hero-section">
        <div class="hero-content">
          <div class="eyebrow reveal">
            <span class="live-dot"></span>
            <q-icon name="monitor_heart" />
            LINUX SERVER OPERATIONS CENTER
          </div>

          <h1 class="reveal d1">
            Linux Server
            <span class="gradient-text">Monitoring</span>
            <span class="typed-line">
              <span class="typed-prefix">// </span>{{ typedWord }}<span class="caret">|</span>
            </span>
          </h1>

          <p class="hero-description reveal d2">
            Learn how administrators watch server health, read system logs, inspect network
            connections, and detect suspicious activity using Linux command-line tools and security
            monitoring platforms. This page includes a live metrics dashboard, a log stream, and a
            working terminal simulator so you can practice safely.
          </p>

          <div class="hero-actions reveal d3">
            <q-btn
              unelevated
              no-caps
              class="btn-glow"
              icon="terminal"
              label="Open Practice Terminal"
              @click="scrollTo('lab')"
            />
            <q-btn
              outline
              no-caps
              class="btn-ghost"
              icon="dashboard"
              label="Live Dashboard"
              @click="scrollTo('dashboard')"
            />
            <q-btn
              flat
              no-caps
              class="btn-ghost-flat"
              icon="menu_book"
              label="Command Library"
              @click="scrollTo('commands')"
            />
          </div>

          <div class="hero-stats reveal d4">
            <div>
              <strong>{{ commands.length }}+</strong>
              <span>Commands</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Monitoring Areas</span>
            </div>
            <div>
              <strong class="mono">{{ uptimeText }}</strong>
              <span>Simulated Uptime</span>
            </div>
          </div>
        </div>

        <div class="terminal-card reveal d2">
          <div class="terminal-header">
            <div class="terminal-dots"><span></span><span></span><span></span></div>
            <span>tj@ubuntu-server: ~ (live demo)</span>
          </div>

          <div class="terminal-body" ref="demoBody">
            <p v-for="(line, i) in demoLines" :key="i" :class="line.cls">
              <span v-if="line.prompt" class="prompt">tj@ubuntu:~$ </span>{{ line.text }}
            </p>
            <p class="cursor-line">
              <span class="prompt">tj@ubuntu:~$ </span>{{ demoTyping
              }}<span class="block-cursor"></span>
            </p>
          </div>
        </div>
      </section>

      <!-- ================= OVERVIEW ================= -->
      <section id="overview" class="section">
        <div class="section-heading reveal">
          <span class="section-label">01 / OVERVIEW</span>
          <h2>Why Monitor a Linux Server?</h2>
          <p>
            Server monitoring helps administrators understand system performance, identify failures,
            investigate security events, and respond to problems before they cause major service
            interruptions. Monitoring answers four everyday questions: Is it fast? Is it up? Who is
            talking to it? What just happened?
          </p>
        </div>

        <div class="overview-grid">
          <article
            v-for="(item, i) in overview"
            :key="item.title"
            class="overview-card reveal"
            :style="{ transitionDelay: i * 90 + 'ms' }"
          >
            <div class="icon-box">
              <q-icon :name="item.icon" />
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="card-question">{{ item.question }}</span>
          </article>
        </div>

        <div class="pillars reveal">
          <div class="pillar-title">
            <q-icon name="account_tree" />
            The Three Pillars of Observability
          </div>
          <div class="pillar-grid">
            <div v-for="p in pillars" :key="p.name" class="pillar">
              <q-icon :name="p.icon" />
              <div>
                <strong>{{ p.name }}</strong>
                <span>{{ p.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= LIVE DASHBOARD ================= -->
      <section id="dashboard" class="section">
        <div class="section-heading reveal">
          <span class="section-label">02 / LIVE DASHBOARD</span>
          <h2>Server Health at a Glance</h2>
          <p>
            This simulated dashboard updates every second, much like a real monitoring panel. Watch
            how CPU, memory, disk, and network values move, and notice how the status color changes
            when a threshold is crossed. The data is generated for learning purposes only.
          </p>
        </div>

        <div class="dash-grid">
          <div v-for="g in gauges" :key="g.key" class="gauge-card reveal">
            <svg viewBox="0 0 120 120" class="gauge">
              <circle class="gauge-bg" cx="60" cy="60" r="52" />
              <circle
                class="gauge-fg"
                cx="60"
                cy="60"
                r="52"
                :stroke="statusColor(g.value)"
                :stroke-dasharray="CIRC"
                :stroke-dashoffset="CIRC * (1 - g.value / 100)"
              />
              <text x="60" y="58" class="gauge-value">{{ Math.round(g.value) }}%</text>
              <text x="60" y="76" class="gauge-label">{{ g.label }}</text>
            </svg>
            <div class="gauge-meta">
              <span
                class="badge"
                :style="{ color: statusColor(g.value), borderColor: statusColor(g.value) }"
              >
                {{ statusText(g.value) }}
              </span>
              <small>{{ g.note }}</small>
            </div>
          </div>
        </div>

        <div class="chart-row">
          <div class="chart-card reveal">
            <div class="chart-head">
              <div>
                <strong>CPU Utilization</strong>
                <span>Last {{ HISTORY }} seconds</span>
              </div>
              <span class="chart-now">{{ Math.round(cpu) }}%</span>
            </div>
            <svg viewBox="0 0 400 120" preserveAspectRatio="none" class="spark">
              <defs>
                <linearGradient id="gCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.45" />
                  <stop offset="100%" stop-color="#22d3ee" stop-opacity="0" />
                </linearGradient>
              </defs>
              <line
                v-for="n in 3"
                :key="n"
                x1="0"
                x2="400"
                :y1="n * 30"
                :y2="n * 30"
                class="grid-line"
              />
              <path :d="areaPath(cpuHistory)" fill="url(#gCpu)" />
              <path :d="linePath(cpuHistory)" class="spark-line cyan" />
            </svg>
          </div>

          <div class="chart-card reveal d1">
            <div class="chart-head">
              <div>
                <strong>Network Throughput</strong>
                <span>Receive vs. transmit</span>
              </div>
              <span class="chart-now small">
                <span class="rx">↓ {{ rx.toFixed(1) }}</span>
                <span class="tx">↑ {{ tx.toFixed(1) }}</span> Mb/s
              </span>
            </div>
            <svg viewBox="0 0 400 120" preserveAspectRatio="none" class="spark">
              <line
                v-for="n in 3"
                :key="n"
                x1="0"
                x2="400"
                :y1="n * 30"
                :y2="n * 30"
                class="grid-line"
              />
              <path :d="linePath(rxHistory)" class="spark-line green" />
              <path :d="linePath(txHistory)" class="spark-line violet" />
            </svg>
          </div>
        </div>

        <div class="mini-stats reveal">
          <div v-for="m in miniStats" :key="m.label">
            <q-icon :name="m.icon" />
            <div>
              <strong class="mono">{{ m.value }}</strong>
              <span>{{ m.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= MONITORING AREAS ================= -->
      <section id="areas" class="section">
        <div class="section-heading reveal">
          <span class="section-label">03 / MONITORING AREAS</span>
          <h2>What Should You Monitor?</h2>
          <p>
            Learn the four major areas that help administrators assess the health and security of a
            Linux server. Select a card to see the commands and warning signs for that area.
          </p>
        </div>

        <div class="monitoring-grid">
          <article
            v-for="(item, index) in monitoringAreas"
            :key="item.title"
            class="monitor-card reveal"
            :class="{ open: openArea === index }"
            @click="openArea = openArea === index ? -1 : index"
          >
            <div class="monitor-top">
              <span class="number">{{ String(index + 1).padStart(2, '0') }}</span>
              <q-icon :name="item.icon" />
            </div>

            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>

            <div class="monitor-details">
              <strong>What to check</strong>
              <ul>
                <li v-for="detail in item.checks" :key="detail">{{ detail }}</li>
              </ul>
            </div>

            <transition name="expand">
              <div v-if="openArea === index" class="monitor-extra">
                <div class="extra-block">
                  <strong><q-icon name="terminal" /> Key commands</strong>
                  <code v-for="c in item.cmds" :key="c">{{ c }}</code>
                </div>
                <div class="extra-block warn">
                  <strong><q-icon name="warning_amber" /> Warning signs</strong>
                  <ul>
                    <li v-for="w in item.warnings" :key="w">{{ w }}</li>
                  </ul>
                </div>
              </div>
            </transition>

            <div class="tag-list">
              <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
              <span class="more">{{
                openArea === index ? 'Click to collapse' : 'Click to expand'
              }}</span>
            </div>
          </article>
        </div>
      </section>

      <!-- ================= SECURITY TOOLS ================= -->
      <section id="tools" class="section">
        <div class="section-heading reveal">
          <span class="section-label">04 / SECURITY MONITORING TOOLS</span>
          <h2>Tools for Server Visibility</h2>
          <p>
            Security monitoring tools help collect events, inspect network activity, and investigate
            potential threats. These tools serve different purposes and are not interchangeable.
            Many real environments combine several of them.
          </p>
        </div>

        <div class="tools-grid">
          <article
            v-for="(tool, i) in securityTools"
            :key="tool.name"
            class="tool-card reveal"
            :style="{ transitionDelay: i * 100 + 'ms' }"
          >
            <div class="tool-icon" :class="tool.className">
              <q-icon :name="tool.icon" />
            </div>

            <div class="tool-heading">
              <span class="tool-type">{{ tool.type }}</span>
              <h3>{{ tool.name }}</h3>
            </div>

            <p>{{ tool.description }}</p>

            <ul class="tool-list">
              <li v-for="u in tool.uses" :key="u"><q-icon name="check_circle" /> {{ u }}</li>
            </ul>

            <div class="tool-feature">
              <q-icon name="bolt" />
              <span>{{ tool.feature }}</span>
            </div>

            <div class="tool-tags">
              <span v-for="tag in tool.tags" :key="tag">{{ tag }}</span>
            </div>
          </article>
        </div>

        <div class="compare-wrap reveal">
          <table class="compare-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Wazuh</th>
                <th>Security Onion</th>
                <th>Suricata</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in compareRows" :key="row.cap">
                <td>{{ row.cap }}</td>
                <td v-for="(v, i) in row.values" :key="i">
                  <q-icon
                    :name="
                      v === 'yes'
                        ? 'check_circle'
                        : v === 'partial'
                          ? 'adjust'
                          : 'remove_circle_outline'
                    "
                    :class="'cmp-' + v"
                  />
                  <span class="cmp-text">{{
                    v === 'yes' ? 'Yes' : v === 'partial' ? 'Partial' : 'No'
                  }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="info-banner reveal">
          <q-icon name="info" />
          <div>
            <strong>Choose the right monitoring tool</strong>
            <p>
              Wazuh focuses on security monitoring and endpoint detection. Security Onion is a
              platform for security monitoring and network security analysis. Suricata is a network
              threat detection engine that can perform IDS, IPS, and network security monitoring
              functions, depending on its configuration.
            </p>
          </div>
        </div>
      </section>

      <!-- ================= PRACTICE LAB ================= -->
      <section id="lab" class="section">
        <div class="section-heading reveal">
          <span class="section-label">05 / PRACTICE LAB</span>
          <h2>Working Terminal Simulator</h2>
          <p>
            Type a real Linux monitoring command and see realistic sample output. Nothing here
            touches a real server, so you can experiment freely. Type
            <code class="inline">help</code> to list supported commands, use the up and down arrows
            to browse history, and press Tab to auto-complete.
          </p>
        </div>

        <div class="lab-grid">
          <div class="terminal-card big reveal">
            <div class="terminal-header">
              <div class="terminal-dots"><span></span><span></span><span></span></div>
              <span>tj@ubuntu-server: ~ (simulator)</span>
              <q-btn
                flat
                dense
                round
                size="sm"
                icon="delete_sweep"
                class="clear-btn"
                aria-label="Clear terminal"
                @click="clearTerm"
              >
                <q-tooltip>Clear</q-tooltip>
              </q-btn>
            </div>

            <div ref="termBody" class="terminal-body tall" @click="focusInput">
              <p v-for="(l, i) in termLines" :key="i" :class="l.cls">
                <template v-if="l.type === 'cmd'">
                  <span class="prompt">tj@ubuntu:~$ </span>{{ l.text }}
                </template>
                <template v-else>{{ l.text }}</template>
              </p>

              <div class="input-line">
                <span class="prompt">tj@ubuntu:~$&nbsp;</span>
                <input
                  v-model="termInput"
                  type="text"
                  spellcheck="false"
                  autocomplete="off"
                  autocapitalize="off"
                  aria-label="Terminal input"
                  @keydown.enter.prevent="submitTerm"
                  @keydown.up.prevent="historyNav(-1)"
                  @keydown.down.prevent="historyNav(1)"
                  @keydown.tab.prevent="autoComplete"
                />
              </div>
            </div>
          </div>

          <aside class="lab-side reveal d1">
            <h3><q-icon name="rocket_launch" /> Quick Run</h3>
            <p>Click a command to run it in the simulator.</p>
            <div class="chip-list">
              <button v-for="c in quickCommands" :key="c" class="chip" @click="runInTerminal(c)">
                {{ c }}
              </button>
            </div>

            <h3 class="mt"><q-icon name="flag" /> Practice Missions</h3>
            <ol class="mission-list">
              <li v-for="m in missions" :key="m.text" :class="{ done: m.done }">
                <q-icon :name="m.done ? 'check_circle' : 'radio_button_unchecked'" />
                <span>{{ m.text }}</span>
              </li>
            </ol>
            <div class="mission-progress">
              <div :style="{ width: missionPercent + '%' }"></div>
            </div>
            <small>{{ missionsDone }} of {{ missions.length }} missions complete</small>
          </aside>
        </div>
      </section>

      <!-- ================= LOG STREAM ================= -->
      <section id="logs" class="section">
        <div class="section-heading reveal">
          <span class="section-label">06 / LOG ANALYSIS</span>
          <h2>Live Log Stream</h2>
          <p>
            Logs are the story of what happened on a server. Filter by severity to practice
            separating routine noise from events that deserve attention. Repeated failed logins from
            one address, for example, are worth investigating.
          </p>
        </div>

        <div class="log-panel reveal">
          <div class="log-toolbar">
            <div class="log-filters">
              <button
                v-for="lv in logLevels"
                :key="lv"
                class="filter-btn"
                :class="[{ active: logFilter === lv }, 'lv-' + lv.toLowerCase()]"
                @click="logFilter = lv"
              >
                {{ lv }}
                <span v-if="lv !== 'ALL'" class="count">{{ logCounts[lv] || 0 }}</span>
              </button>
            </div>
            <div class="log-actions">
              <q-btn
                flat
                no-caps
                dense
                :icon="logPaused ? 'play_arrow' : 'pause'"
                :label="logPaused ? 'Resume' : 'Pause'"
                class="btn-ghost-flat"
                @click="logPaused = !logPaused"
              />
              <q-btn
                flat
                no-caps
                dense
                icon="delete_outline"
                label="Clear"
                class="btn-ghost-flat"
                @click="logs = []"
              />
            </div>
          </div>

          <div class="log-body" ref="logBody">
            <transition-group name="log" tag="div">
              <div
                v-for="l in filteredLogs"
                :key="l.id"
                class="log-line"
                :class="'lv-' + l.level.toLowerCase()"
              >
                <span class="log-time">{{ l.time }}</span>
                <span class="log-level">{{ l.level }}</span>
                <span class="log-src">{{ l.source }}</span>
                <span class="log-msg">{{ l.message }}</span>
              </div>
            </transition-group>
            <div v-if="!filteredLogs.length" class="log-empty">Waiting for log events...</div>
          </div>
        </div>

        <div class="log-files reveal">
          <div class="subhead">
            <q-icon name="folder_open" />
            Where Linux keeps its logs
          </div>
          <div class="log-file-grid">
            <div v-for="f in logFiles" :key="f.path" class="log-file">
              <code>{{ f.path }}</code>
              <span>{{ f.desc }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= COMMANDS ================= -->
      <section id="commands" class="section">
        <div class="section-heading reveal">
          <span class="section-label">07 / PRACTICAL COMMANDS</span>
          <h2>Essential Monitoring Commands</h2>
          <p>
            Run these commands on your Ubuntu Server terminal to inspect system resources, services,
            network activity, and logs. Use the search box, filter by category, copy a command, or
            send it straight to the simulator above.
          </p>
        </div>

        <div class="command-tools reveal">
          <div class="command-filters">
            <q-btn
              v-for="category in commandCategories"
              :key="category"
              no-caps
              unelevated
              dense
              class="cat-btn"
              :class="{ active: activeCategory === category }"
              :label="category"
              @click="activeCategory = category"
            />
          </div>
          <q-input
            v-model="search"
            dense
            outlined
            dark
            clearable
            placeholder="Search commands..."
            class="cmd-search"
          >
            <template #prepend><q-icon name="search" /></template>
          </q-input>
        </div>

        <transition-group name="cmd" tag="div" class="command-list">
          <article v-for="item in filteredCommands" :key="item.command" class="command-card">
            <div class="command-content">
              <div class="command-title">
                <h3>{{ item.title }}</h3>
                <span>{{ item.category }}</span>
              </div>
              <p>{{ item.description }}</p>
              <code><span class="dollar">$</span> {{ item.command }}</code>
              <small v-if="item.tip" class="cmd-tip"
                ><q-icon name="lightbulb" /> {{ item.tip }}</small
              >
            </div>

            <div class="command-actions">
              <q-btn
                v-if="item.simulated"
                flat
                round
                color="cyan-4"
                icon="play_arrow"
                aria-label="Run in simulator"
                @click="runInTerminal(item.command)"
              >
                <q-tooltip>Run in simulator</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                color="positive"
                icon="content_copy"
                aria-label="Copy command"
                @click="copyCommand(item.command)"
              >
                <q-tooltip>Copy command</q-tooltip>
              </q-btn>
            </div>
          </article>
        </transition-group>

        <div v-if="!filteredCommands.length" class="log-empty">No commands match your search.</div>

        <div class="warning-banner reveal">
          <q-icon name="warning" />
          <div>
            <strong>Important</strong>
            <p>
              Some commands may require sudo privileges. Avoid running unfamiliar commands as root.
              Monitoring commands can reveal sensitive system information, so protect terminal
              output and logs appropriately. Only monitor systems you own or are explicitly
              authorized to administer.
            </p>
          </div>
        </div>
      </section>

      <!-- ================= WORKFLOW ================= -->
      <section id="workflow" class="section">
        <div class="section-heading reveal">
          <span class="section-label">08 / ADMINISTRATOR WORKFLOW</span>
          <h2>A Practical Monitoring Routine</h2>
          <p>
            Follow a repeatable workflow when checking the health of your Linux server. A consistent
            routine makes unusual behavior easier to notice because you know what normal looks like.
          </p>
        </div>

        <div class="workflow">
          <div class="workflow-line"></div>
          <article
            v-for="(step, index) in workflow"
            :key="step.title"
            class="workflow-step reveal"
            :style="{ transitionDelay: index * 80 + 'ms' }"
          >
            <div class="workflow-number">{{ index + 1 }}</div>
            <div class="workflow-body">
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
              <code>{{ step.command }}</code>
              <small class="expect"><q-icon name="visibility" /> Look for: {{ step.expect }}</small>
            </div>
          </article>
        </div>
      </section>

      <!-- ================= THRESHOLDS ================= -->
      <section id="thresholds" class="section">
        <div class="section-heading reveal">
          <span class="section-label">09 / ALERT THRESHOLDS</span>
          <h2>What Counts as "Too High"?</h2>
          <p>
            Thresholds depend on the workload, but these starting points are commonly used. Tune
            them after observing your own baseline so you avoid alert fatigue.
          </p>
        </div>

        <div class="threshold-grid">
          <div v-for="t in thresholds" :key="t.metric" class="threshold-card reveal">
            <div class="threshold-head">
              <q-icon :name="t.icon" />
              <strong>{{ t.metric }}</strong>
            </div>
            <div class="threshold-bar">
              <div class="zone ok" :style="{ width: t.ok + '%' }"></div>
              <div class="zone warn" :style="{ width: t.warn - t.ok + '%' }"></div>
              <div class="zone crit" :style="{ width: 100 - t.warn + '%' }"></div>
            </div>
            <div class="threshold-legend">
              <span class="ok">Normal &lt; {{ t.ok }}%</span>
              <span class="warn">Warning {{ t.ok }}-{{ t.warn }}%</span>
              <span class="crit">Critical &gt; {{ t.warn }}%</span>
            </div>
            <p>{{ t.note }}</p>
          </div>
        </div>
      </section>

      <!-- ================= TROUBLESHOOTING ================= -->
      <section id="troubleshooting" class="section">
        <div class="section-heading reveal">
          <span class="section-label">10 / TROUBLESHOOTING</span>
          <h2>Common Monitoring Findings</h2>
          <p>
            Use monitoring results as a starting point for investigation rather than assuming that
            one metric proves the cause of a problem. Open each case for a step-by-step approach.
          </p>
        </div>

        <div class="troubleshooting-list">
          <q-expansion-item
            v-for="item in troubleshooting"
            :key="item.problem"
            class="troubleshooting-card reveal"
            expand-icon-class="text-grey-5"
            dark
          >
            <template #header>
              <q-item-section avatar>
                <div class="problem-icon"><q-icon :name="item.icon" /></div>
              </q-item-section>
              <q-item-section>
                <div class="ts-title">{{ item.problem }}</div>
                <div class="ts-sub">{{ item.action }}</div>
              </q-item-section>
            </template>

            <div class="ts-body">
              <ol>
                <li v-for="s in item.steps" :key="s">{{ s }}</li>
              </ol>
              <code>{{ item.command }}</code>
            </div>
          </q-expansion-item>
        </div>
      </section>

      <!-- ================= BEST PRACTICES ================= -->
      <section id="practices" class="section">
        <div class="section-heading reveal">
          <span class="section-label">11 / BEST PRACTICES</span>
          <h2>Habits of Reliable Administrators</h2>
          <p>
            Tools only help when they are used consistently. These habits turn monitoring from an
            occasional check into a dependable safety net.
          </p>
        </div>

        <div class="practice-grid">
          <article
            v-for="(p, i) in practices"
            :key="p.title"
            class="practice-card reveal"
            :style="{ transitionDelay: (i % 3) * 90 + 'ms' }"
          >
            <q-icon :name="p.icon" />
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </article>
        </div>
      </section>

      <!-- ================= QUIZ ================= -->
      <section id="quiz" class="section">
        <div class="section-heading reveal">
          <span class="section-label">12 / KNOWLEDGE CHECK</span>
          <h2>Test What You Learned</h2>
          <p>Answer a few quick questions. You get instant feedback after each choice.</p>
        </div>

        <div class="quiz-card reveal">
          <template v-if="!quizDone">
            <div class="quiz-top">
              <span>Question {{ quizIndex + 1 }} / {{ quiz.length }}</span>
              <span>Score: {{ quizScore }}</span>
            </div>
            <h3>{{ quiz[quizIndex].q }}</h3>
            <div class="quiz-options">
              <button
                v-for="(opt, i) in quiz[quizIndex].options"
                :key="opt"
                class="quiz-opt"
                :class="{
                  correct: answered && i === quiz[quizIndex].answer,
                  wrong: answered && picked === i && i !== quiz[quizIndex].answer,
                }"
                :disabled="answered"
                @click="pick(i)"
              >
                <span class="letter">{{ 'ABCD'[i] }}</span
                >{{ opt }}
              </button>
            </div>
            <transition name="expand">
              <div v-if="answered" class="quiz-explain">
                <q-icon :name="picked === quiz[quizIndex].answer ? 'check_circle' : 'info'" />
                {{ quiz[quizIndex].explain }}
              </div>
            </transition>
            <q-btn
              v-if="answered"
              unelevated
              no-caps
              class="btn-glow"
              :label="quizIndex === quiz.length - 1 ? 'See Results' : 'Next Question'"
              icon-right="arrow_forward"
              @click="nextQuestion"
            />
          </template>

          <template v-else>
            <div class="quiz-result">
              <q-icon name="emoji_events" />
              <h3>You scored {{ quizScore }} / {{ quiz.length }}</h3>
              <p>{{ quizMessage }}</p>
              <q-btn
                unelevated
                no-caps
                class="btn-glow"
                icon="replay"
                label="Try Again"
                @click="resetQuiz"
              />
            </div>
          </template>
        </div>
      </section>

      <!-- ================= PDF ================= -->
      <section id="monitoring-pdf" class="section">
        <div class="section-heading reveal">
          <span class="section-label">13 / LEARNING RESOURCE</span>
          <h2>Linux Monitoring Tools Guide</h2>
          <p>Review the PDF learning material for Linux monitoring tools and related concepts.</p>
        </div>

        <div class="pdf-toolbar reveal">
          <div class="pdf-file-info">
            <q-icon name="picture_as_pdf" />
            <div>
              <strong>3_Linux_Monitoring_Tools.pdf</strong>
              <span>PDF learning material</span>
            </div>
          </div>

          <div class="pdf-actions">
            <q-btn
              outline
              no-caps
              class="btn-ghost"
              icon="open_in_new"
              label="Open PDF"
              :href="pdfUrl"
              target="_blank"
            />
            <q-btn
              unelevated
              no-caps
              class="btn-glow"
              icon="download"
              label="Download PDF"
              :href="pdfUrl"
              download
            />
          </div>
        </div>

        <div class="pdf-viewer reveal">
          <iframe :src="pdfUrl" title="Linux Monitoring Tools PDF" loading="lazy"></iframe>
        </div>

        <p class="pdf-fallback">
          If the PDF does not appear, use Open PDF or Download PDF to view the document separately.
        </p>
      </section>

      <!-- ================= FOOTER ================= -->
      <section class="closing-card reveal">
        <div class="closing-icon">
          <q-icon name="monitor_heart" />
        </div>

        <span class="section-label">LEARNING OBJECTIVE</span>

        <h2>Observe. Analyze. Respond.</h2>

        <p>
          Effective monitoring combines system metrics, logs, network visibility, and security
          alerts. Regularly review findings and investigate unusual behavior using evidence from
          multiple sources.
        </p>

        <q-btn
          unelevated
          no-caps
          class="btn-glow"
          icon="arrow_upward"
          label="Back to Top"
          @click="scrollToTop"
        />
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const pdfUrl = '/learning/3_Linux_Monitoring_Tools.pdf'

/* ------------------------------------------------------------------ */
/* Basic state                                                         */
/* ------------------------------------------------------------------ */
const activeCategory = ref('All')
const search = ref('')
const openArea = ref(-1)
const scrollProgress = ref(0)
const activeSection = ref('top')
const bgCanvas = ref(null)

const sections = [
  { id: 'top', label: 'Home' },
  { id: 'overview', label: 'Overview' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'areas', label: 'Areas' },
  { id: 'tools', label: 'Tools' },
  { id: 'lab', label: 'Practice Lab' },
  { id: 'logs', label: 'Logs' },
  { id: 'commands', label: 'Commands' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'thresholds', label: 'Thresholds' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'practices', label: 'Best Practices' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'monitoring-pdf', label: 'PDF Guide' },
]

/* ------------------------------------------------------------------ */
/* Static content                                                      */
/* ------------------------------------------------------------------ */
const overview = [
  {
    title: 'Performance',
    icon: 'speed',
    description: 'Observe CPU utilization, memory consumption, system load, and process activity.',
    question: 'Is it fast enough?',
  },
  {
    title: 'Availability',
    icon: 'dns',
    description: 'Check whether essential services are running and identify failed system units.',
    question: 'Is it up?',
  },
  {
    title: 'Network Visibility',
    icon: 'lan',
    description:
      'Inspect listening ports, established connections, and network interface statistics.',
    question: 'Who is talking to it?',
  },
  {
    title: 'Security Events',
    icon: 'shield',
    description:
      'Review authentication records, service logs, and alerts from security monitoring tools.',
    question: 'What just happened?',
  },
]

const pillars = [
  {
    name: 'Metrics',
    icon: 'show_chart',
    text: 'Numeric measurements over time, such as CPU percentage or free memory.',
  },
  {
    name: 'Logs',
    icon: 'article',
    text: 'Timestamped records describing events, errors, and user activity.',
  },
  {
    name: 'Alerts',
    icon: 'notifications_active',
    text: 'Automatic notifications when a metric or event crosses a defined rule.',
  },
]

const monitoringAreas = [
  {
    title: 'System Resource Monitoring',
    icon: 'memory',
    description: 'Evaluate whether the server has sufficient resources to operate reliably.',
    checks: [
      'CPU usage and system load',
      'Available and used memory',
      'Filesystem capacity',
      'Processes consuming resources',
    ],
    tags: ['CPU', 'RAM', 'Disk'],
    cmds: ['top', 'free -h', 'df -h', 'vmstat 1 5'],
    warnings: [
      'Load average stays above the number of CPU cores',
      'Available memory is very low and swap keeps growing',
      'A filesystem is above 85% full',
    ],
  },
  {
    title: 'Service and Availability Monitoring',
    icon: 'settings',
    description: 'Verify that critical services are active and investigate service failures.',
    checks: [
      'Failed systemd services',
      'Web and database service status',
      'System uptime',
      'Service restart history',
    ],
    tags: ['systemd', 'Uptime', 'Services'],
    cmds: ['systemctl --failed', 'systemctl status ssh', 'uptime'],
    warnings: [
      'A service restarts repeatedly in a short period',
      'A critical unit is listed as failed',
      'Unexpected reboots appear in the uptime history',
    ],
  },
  {
    title: 'Network Monitoring',
    icon: 'device_hub',
    description: 'Inspect network configuration, listening ports, and active connections.',
    checks: [
      'Network interfaces',
      'Listening TCP and UDP sockets',
      'Unexpected open ports',
      'Interface traffic statistics',
    ],
    tags: ['Sockets', 'Interfaces', 'Traffic'],
    cmds: ['sudo ss -tulpn', 'ip -brief address', 'ip -s link'],
    warnings: [
      'A port is listening that nobody can explain',
      'Packet errors or drops keep increasing',
      'Traffic spikes at unusual hours',
    ],
  },
  {
    title: 'Log and Security Monitoring',
    icon: 'manage_search',
    description: 'Review system events and investigate potentially suspicious activity.',
    checks: [
      'System journal messages',
      'SSH authentication events',
      'Failed login patterns',
      'Security tool alerts',
    ],
    tags: ['Logs', 'SSH', 'Alerts'],
    cmds: ['sudo journalctl -b -p err', 'sudo tail -n 50 /var/log/auth.log', 'last'],
    warnings: [
      'Many failed logins from a single address',
      'Successful logins from unfamiliar locations',
      'New user accounts or sudo usage nobody requested',
    ],
  },
]

const securityTools = [
  {
    name: 'Wazuh',
    type: 'SECURITY PLATFORM',
    icon: 'security',
    className: 'tool-green',
    description:
      'Collects and analyzes endpoint security events, file integrity changes, vulnerability information, and other security data.',
    uses: [
      'File integrity monitoring',
      'Vulnerability detection',
      'Log analysis and compliance checks',
    ],
    feature: 'Endpoint security monitoring and alerting',
    tags: ['SIEM', 'XDR', 'Endpoint'],
  },
  {
    name: 'Security Onion',
    type: 'SECURITY MONITORING',
    icon: 'hub',
    className: 'tool-blue',
    description:
      'A security monitoring distribution and platform designed for network visibility, event analysis, and threat hunting.',
    uses: [
      'Full packet capture and review',
      'Threat hunting dashboards',
      'Case management for investigations',
    ],
    feature: 'Centralized security investigation',
    tags: ['NSM', 'Hunting', 'Analysis'],
  },
  {
    name: 'Suricata',
    type: 'NETWORK DETECTION ENGINE',
    icon: 'radar',
    className: 'tool-purple',
    description:
      'Analyzes network traffic using signatures and protocol inspection to identify potentially malicious activity.',
    uses: [
      'Signature-based detection',
      'Protocol and file extraction logging',
      'Inline blocking when run in IPS mode',
    ],
    feature: 'Network IDS/IPS and traffic analysis',
    tags: ['IDS', 'IPS', 'NSM'],
  },
]

const compareRows = [
  { cap: 'Host / endpoint monitoring', values: ['yes', 'partial', 'no'] },
  { cap: 'File integrity monitoring', values: ['yes', 'partial', 'no'] },
  { cap: 'Network traffic inspection', values: ['partial', 'yes', 'yes'] },
  { cap: 'Signature-based detection', values: ['partial', 'yes', 'yes'] },
  { cap: 'Threat hunting interface', values: ['partial', 'yes', 'no'] },
  { cap: 'Inline prevention (IPS)', values: ['no', 'partial', 'yes'] },
]

const logFiles = [
  { path: '/var/log/syslog', desc: 'General system messages and service events.' },
  { path: '/var/log/auth.log', desc: 'Logins, sudo usage, and SSH authentication.' },
  { path: '/var/log/kern.log', desc: 'Kernel messages, hardware and driver events.' },
  { path: '/var/log/dpkg.log', desc: 'Package installs, upgrades, and removals.' },
  { path: '/var/log/ufw.log', desc: 'Firewall allow and block events (when logging is on).' },
  { path: '/var/log/nginx/', desc: 'Web server access and error logs, if installed.' },
  { path: 'journalctl', desc: 'Query the systemd journal by unit, priority, or time.' },
  { path: '/var/log/apt/', desc: 'APT history and terminal output from updates.' },
]

const commandCategories = ['All', 'System', 'Services', 'Network', 'Logs', 'Security']

const commands = [
  {
    title: 'System uptime and load',
    category: 'System',
    description: 'Display uptime and current system load averages.',
    command: 'uptime',
    tip: 'Three load numbers show the 1, 5, and 15 minute averages.',
    simulated: true,
  },
  {
    title: 'Interactive process monitor',
    category: 'System',
    description: 'Inspect running processes and resource consumption.',
    command: 'top',
    tip: 'Press q to quit, and press M to sort by memory.',
    simulated: true,
  },
  {
    title: 'Memory usage',
    category: 'System',
    description: 'Display memory and swap usage in human-readable units.',
    command: 'free -h',
    tip: 'Focus on the "available" column rather than "free".',
    simulated: true,
  },
  {
    title: 'Disk space',
    category: 'System',
    description: 'Check filesystem capacity and available disk space.',
    command: 'df -h',
    tip: 'Run df -i as well to check inode exhaustion.',
    simulated: true,
  },
  {
    title: 'Directory size',
    category: 'System',
    description: 'Inspect the size of a particular directory.',
    command: 'du -sh /var/log',
    simulated: true,
  },
  {
    title: 'Top CPU consumers',
    category: 'System',
    description: 'List the processes using the most CPU right now.',
    command: 'ps aux --sort=-%cpu | head -5',
    simulated: true,
  },
  {
    title: 'Virtual memory statistics',
    category: 'System',
    description: 'Sample CPU, memory, swap, and I/O activity over time.',
    command: 'vmstat 1 5',
    tip: 'High values in the "wa" column suggest disk wait.',
    simulated: true,
  },
  {
    title: 'CPU core count',
    category: 'System',
    description: 'Show how many processing units are available.',
    command: 'nproc',
    tip: 'Compare this number with your load average.',
    simulated: true,
  },
  {
    title: 'Kernel and OS information',
    category: 'System',
    description: 'Print the kernel name, version, and architecture.',
    command: 'uname -a',
    simulated: true,
  },
  {
    title: 'Failed system services',
    category: 'Services',
    description: 'List systemd units that are currently in a failed state.',
    command: 'systemctl --failed',
    simulated: true,
  },
  {
    title: 'Check SSH service',
    category: 'Services',
    description: 'Inspect the current status of the SSH service.',
    command: 'systemctl status ssh',
    simulated: true,
  },
  {
    title: 'Running services',
    category: 'Services',
    description: 'List every service that is currently running.',
    command: 'systemctl list-units --type=service --state=running',
    simulated: false,
  },
  {
    title: 'Listening network sockets',
    category: 'Network',
    description: 'List listening TCP and UDP sockets with process information.',
    command: 'sudo ss -tulpn',
    tip: 'Every listening port should have a known reason to exist.',
    simulated: true,
  },
  {
    title: 'Network interfaces',
    category: 'Network',
    description: 'Show network interfaces and their IP addresses.',
    command: 'ip -brief address',
    simulated: true,
  },
  {
    title: 'Interface statistics',
    category: 'Network',
    description: 'Display network interface counters and packet statistics.',
    command: 'ip -s link',
    simulated: false,
  },
  {
    title: 'Socket summary',
    category: 'Network',
    description: 'Show a summary of TCP, UDP, and total sockets.',
    command: 'ss -s',
    simulated: false,
  },
  {
    title: 'Routing table',
    category: 'Network',
    description: 'Display the default gateway and network routes.',
    command: 'ip route',
    simulated: false,
  },
  {
    title: 'Recent system logs',
    category: 'Logs',
    description: 'Display recent messages from the system journal.',
    command: 'sudo journalctl -n 50',
    simulated: true,
  },
  {
    title: 'Current boot errors',
    category: 'Logs',
    description: 'Show error-priority journal entries from the current boot.',
    command: 'sudo journalctl -b -p err',
    simulated: true,
  },
  {
    title: 'Follow service logs',
    category: 'Logs',
    description: 'Follow new log entries from the SSH service.',
    command: 'sudo journalctl -u ssh -f',
    tip: 'Press Ctrl+C to stop following.',
    simulated: false,
  },
  {
    title: 'Logs since a time',
    category: 'Logs',
    description: 'Show journal entries from the last hour.',
    command: 'sudo journalctl --since "1 hour ago"',
    simulated: false,
  },
  {
    title: 'Kernel ring buffer',
    category: 'Logs',
    description: 'Show recent kernel messages with readable timestamps.',
    command: 'sudo dmesg -T | tail -n 20',
    simulated: false,
  },
  {
    title: 'Authentication log',
    category: 'Security',
    description: 'Review recent authentication events on Ubuntu systems that use this log.',
    command: 'sudo tail -n 50 /var/log/auth.log',
    simulated: false,
  },
  {
    title: 'Failed SSH logins',
    category: 'Security',
    description: 'Search the authentication log for failed password attempts.',
    command: 'sudo grep "Failed password" /var/log/auth.log',
    tip: 'Many attempts from one address may indicate brute-force activity.',
    simulated: true,
  },
  {
    title: 'Recent logins',
    category: 'Security',
    description: 'Show the history of successful user logins.',
    command: 'last',
    simulated: true,
  },
  {
    title: 'Logged-in users',
    category: 'Security',
    description: 'List who is logged in right now.',
    command: 'who',
    simulated: true,
  },
  {
    title: 'Firewall status',
    category: 'Security',
    description: 'Inspect the status and configured rules of UFW.',
    command: 'sudo ufw status verbose',
    simulated: true,
  },
  {
    title: 'AppArmor status',
    category: 'Security',
    description: 'Review loaded AppArmor profiles and enforcement status.',
    command: 'sudo aa-status',
    simulated: false,
  },
  {
    title: 'Pending security updates',
    category: 'Security',
    description: 'List packages that have newer versions available.',
    command: 'apt list --upgradable',
    simulated: false,
  },
]

const filteredCommands = computed(() => {
  const q = (search.value || '').toLowerCase().trim()
  return commands.filter((item) => {
    const catOk = activeCategory.value === 'All' || item.category === activeCategory.value
    const textOk =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.command.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    return catOk && textOk
  })
})

const workflow = [
  {
    title: 'Check system health',
    description: 'Start with uptime, load average, memory, and filesystem capacity.',
    command: 'uptime && free -h && df -h',
    expect: 'load below core count, healthy available memory, disks under 85%.',
  },
  {
    title: 'Review service status',
    description: 'Identify failed units and verify that critical services are running.',
    command: 'systemctl --failed',
    expect: '"0 loaded units listed" means nothing has failed.',
  },
  {
    title: 'Inspect network exposure',
    description: 'Review listening sockets and confirm that exposed ports are expected.',
    command: 'sudo ss -tulpn',
    expect: 'only the ports you intentionally opened, such as 22 or 443.',
  },
  {
    title: 'Review system events',
    description: 'Investigate recent errors and service-related events in the journal.',
    command: 'sudo journalctl -b -p err',
    expect: 'repeated errors from one service or device.',
  },
  {
    title: 'Investigate security alerts',
    description: 'Correlate authentication events and alerts from configured security tools.',
    command: 'sudo journalctl -u ssh -n 50',
    expect: 'bursts of failed logins, unusual users, or odd login times.',
  },
  {
    title: 'Document and follow up',
    description: 'Record what you found, what you changed, and anything that needs a later review.',
    command: 'history | tail -n 20',
    expect: 'a clear record that teammates can understand later.',
  },
]

const thresholds = [
  {
    metric: 'CPU utilization',
    icon: 'speed',
    ok: 70,
    warn: 90,
    note: 'Short spikes are normal. Investigate when usage stays high for several minutes.',
  },
  {
    metric: 'Memory in use',
    icon: 'memory',
    ok: 75,
    warn: 90,
    note: 'Linux caches files in memory, so check the "available" value before panicking.',
  },
  {
    metric: 'Disk usage',
    icon: 'storage',
    ok: 70,
    warn: 85,
    note: 'Full disks can crash databases and stop logging. Alert early.',
  },
  {
    metric: 'Swap usage',
    icon: 'swap_horiz',
    ok: 20,
    warn: 50,
    note: 'Heavy swapping makes a server feel slow because disk is far slower than RAM.',
  },
]

const troubleshooting = [
  {
    problem: 'Disk space is almost full',
    icon: 'storage',
    action: 'Identify large directories and review log retention before removing files.',
    steps: [
      'Confirm which filesystem is full with df -h.',
      'Find the biggest directories using du -sh /var/* and drill down.',
      'Check whether logs are rotating and whether old packages can be cleaned.',
      'Never delete files you cannot identify. Archive or rotate them instead.',
    ],
    command: 'df -h',
  },
  {
    problem: 'Memory usage appears unusually high',
    icon: 'memory',
    action: 'Inspect running processes and determine whether the workload is expected.',
    steps: [
      'Compare "used" and "available" memory in free -h.',
      'Sort processes by memory in top (press M) to find the largest consumers.',
      'Check whether a service has a memory leak by watching it over time.',
      'Restart or tune the offending service during a safe maintenance window.',
    ],
    command: 'free -h && top',
  },
  {
    problem: 'A service has failed',
    icon: 'error_outline',
    action: 'Inspect the service status and read its journal entries for the underlying error.',
    steps: [
      'List failed units with systemctl --failed.',
      'Read the status output for the exit code and last log lines.',
      'Open the full journal for that unit using journalctl -u <service>.',
      'Fix the cause (configuration, permissions, dependency) before restarting.',
    ],
    command: 'systemctl --failed',
  },
  {
    problem: 'Unexpected listening port',
    icon: 'lan',
    action: 'Identify the associated process and verify whether the service should be exposed.',
    steps: [
      'Run sudo ss -tulpn and note the process name and PID.',
      'Check how the program was installed and who started it.',
      'Decide whether it should be limited to localhost or blocked by the firewall.',
      'If it is unauthorized, escalate according to your incident process.',
    ],
    command: 'sudo ss -tulpn',
  },
  {
    problem: 'Suspicious authentication activity',
    icon: 'gpp_maybe',
    action: 'Review authentication logs and correlate the event with other available evidence.',
    steps: [
      'Look for patterns: same source address, many usernames, odd hours.',
      'Check last and who for successful sessions you do not recognize.',
      'Harden SSH with key-based login, disabled root login, and rate limiting.',
      'Consider a tool such as fail2ban and review firewall rules.',
    ],
    command: 'sudo journalctl -u ssh',
  },
  {
    problem: 'Server feels slow but CPU looks normal',
    icon: 'hourglass_bottom',
    action: 'Check disk wait, swap activity, and network latency before blaming the CPU.',
    steps: [
      'Run vmstat 1 5 and watch the "wa" (I/O wait) and "si/so" (swap) columns.',
      'Check whether the disk is near capacity or very busy.',
      'Look for slow DNS or an overloaded upstream service.',
      'Compare against a known-good baseline from earlier monitoring.',
    ],
    command: 'vmstat 1 5',
  },
]

const practices = [
  {
    title: 'Establish a baseline',
    icon: 'insights',
    text: 'Record what normal looks like for CPU, memory, traffic, and logins so anomalies are easier to spot.',
  },
  {
    title: 'Centralize your logs',
    icon: 'cloud_sync',
    text: 'Ship logs to a separate collector so an attacker or a crash cannot erase the evidence on the server itself.',
  },
  {
    title: 'Keep time synchronized',
    icon: 'schedule',
    text: 'Accurate clocks (NTP or chrony) make it possible to correlate events across multiple machines.',
  },
  {
    title: 'Apply least privilege',
    icon: 'admin_panel_settings',
    text: 'Use named accounts and sudo instead of sharing root. Review who has administrative access regularly.',
  },
  {
    title: 'Patch regularly',
    icon: 'system_update_alt',
    text: 'Many incidents involve known vulnerabilities. Schedule updates and review pending security patches.',
  },
  {
    title: 'Tune alerts carefully',
    icon: 'tune',
    text: 'Too many alerts cause fatigue and people start ignoring them. Alert on conditions that need action.',
  },
  {
    title: 'Rotate and retain logs',
    icon: 'autorenew',
    text: 'Use logrotate so disks do not fill, and keep logs long enough to support investigations.',
  },
  {
    title: 'Test your backups',
    icon: 'backup',
    text: 'Monitoring tells you something broke. A tested backup lets you recover from it.',
  },
  {
    title: 'Document everything',
    icon: 'edit_note',
    text: 'Write down changes and findings. Good notes shorten the next investigation dramatically.',
  },
]

/* ------------------------------------------------------------------ */
/* Typed headline                                                      */
/* ------------------------------------------------------------------ */
const words = [
  'track performance',
  'read system logs',
  'inspect open ports',
  'detect threats early',
  'respond with evidence',
]
const typedWord = ref('')
let typedTimer = null
function runTypedHeadline() {
  let w = 0
  let c = 0
  let deleting = false
  const tick = () => {
    const word = words[w]
    typedWord.value = word.slice(0, c)
    if (!deleting && c < word.length) {
      c++
      typedTimer = setTimeout(tick, 70)
    } else if (!deleting) {
      deleting = true
      typedTimer = setTimeout(tick, 1400)
    } else if (c > 0) {
      c--
      typedTimer = setTimeout(tick, 35)
    } else {
      deleting = false
      w = (w + 1) % words.length
      typedTimer = setTimeout(tick, 300)
    }
  }
  tick()
}

/* ------------------------------------------------------------------ */
/* Live demo terminal in the hero                                      */
/* ------------------------------------------------------------------ */
const demoLines = ref([])
const demoTyping = ref('')
const demoBody = ref(null)
let demoStopped = false

const demoScript = [
  { cmd: 'uptime', out: [' 17:45:02 up 14 days, 6:32, 2 users, load average: 0.42, 0.37, 0.31'] },
  {
    cmd: 'free -h',
    out: [
      '              total   used   free  available',
      'Mem:           7.7Gi  2.9Gi  1.8Gi      4.5Gi',
      'Swap:          2.0Gi  0.1Gi  1.9Gi',
    ],
  },
  {
    cmd: 'df -h /',
    out: ['Filesystem  Size  Used Avail Use% Mounted on', '/dev/sda2    58G   27G   28G  49% /'],
  },
  { cmd: 'systemctl --failed', out: ['0 loaded units listed.'], ok: 'All services healthy' },
  {
    cmd: 'sudo ss -tulpn | head -3',
    out: [
      'tcp LISTEN 0.0.0.0:22   sshd',
      'tcp LISTEN 0.0.0.0:443  nginx',
      'udp UNCONN 127.0.0.53:53 systemd-resolve',
    ],
  },
]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function runDemo() {
  while (!demoStopped) {
    for (const step of demoScript) {
      if (demoStopped) return
      demoTyping.value = ''
      for (const ch of step.cmd) {
        if (demoStopped) return
        demoTyping.value += ch
        await sleep(45 + Math.random() * 45)
      }
      await sleep(350)
      demoLines.value.push({ prompt: true, text: step.cmd, cls: '' })
      demoTyping.value = ''
      for (const o of step.out) {
        demoLines.value.push({ text: o, cls: 'output' })
      }
      if (step.ok) demoLines.value.push({ text: '✔ ' + step.ok, cls: 'success' })
      if (demoLines.value.length > 14) demoLines.value.splice(0, demoLines.value.length - 14)
      await nextTick()
      if (demoBody.value) demoBody.value.scrollTop = demoBody.value.scrollHeight
      await sleep(1700)
    }
    await sleep(900)
    demoLines.value = []
  }
}

/* ------------------------------------------------------------------ */
/* Live metrics dashboard                                              */
/* ------------------------------------------------------------------ */
const CIRC = 2 * Math.PI * 52
const HISTORY = 40
const cpu = ref(24)
const mem = ref(41)
const disk = ref(49)
const swap = ref(6)
const rx = ref(12)
const tx = ref(4)
const cpuHistory = ref(Array(HISTORY).fill(24))
const rxHistory = ref(Array(HISTORY).fill(12))
const txHistory = ref(Array(HISTORY).fill(4))
const connections = ref(128)
const processes = ref(214)
const loadAvg = ref(0.42)
const uptimeSeconds = ref(14 * 86400 + 6 * 3600 + 32 * 60)

const gauges = computed(() => [
  { key: 'cpu', label: 'CPU', value: cpu.value, note: 'Processor load' },
  { key: 'mem', label: 'Memory', value: mem.value, note: 'RAM in use' },
  { key: 'disk', label: 'Disk /', value: disk.value, note: 'Root filesystem' },
  { key: 'swap', label: 'Swap', value: swap.value, note: 'Swap in use' },
])

const miniStats = computed(() => [
  { icon: 'timeline', label: 'Load average (1m)', value: loadAvg.value.toFixed(2) },
  { icon: 'lan', label: 'Active connections', value: connections.value },
  { icon: 'account_tree', label: 'Running processes', value: processes.value },
  { icon: 'schedule', label: 'Uptime', value: uptimeText.value },
])

const uptimeText = computed(() => {
  const s = uptimeSeconds.value
  const d = Math.floor(s / 86400)
  const h = String(Math.floor((s % 86400) / 3600)).padStart(2, '0')
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const sec = String(s % 60).padStart(2, '0')
  return `${d}d ${h}:${m}:${sec}`
})

function walk(value, step, min, max) {
  const next = value + (Math.random() - 0.5) * step
  return Math.min(max, Math.max(min, next))
}

function pushHistory(arr, value) {
  const copy = arr.slice(1)
  copy.push(value)
  return copy
}

let metricsTimer = null
function tickMetrics() {
  cpu.value = walk(cpu.value, 18, 4, 98)
  mem.value = walk(mem.value, 3, 30, 92)
  disk.value = walk(disk.value, 0.2, 45, 60)
  swap.value = walk(swap.value, 2, 1, 60)
  rx.value = walk(rx.value, 8, 1, 60)
  tx.value = walk(tx.value, 5, 0.5, 40)
  connections.value = Math.max(20, Math.round(connections.value + (Math.random() - 0.5) * 10))
  processes.value = Math.max(100, Math.round(processes.value + (Math.random() - 0.5) * 3))
  loadAvg.value = Math.max(0.05, +((cpu.value / 100) * 2.2).toFixed(2))
  cpuHistory.value = pushHistory(cpuHistory.value, cpu.value)
  rxHistory.value = pushHistory(rxHistory.value, Math.min(100, rx.value * 1.6))
  txHistory.value = pushHistory(txHistory.value, Math.min(100, tx.value * 2))
  uptimeSeconds.value++
}

function statusColor(v) {
  if (v >= 85) return '#fb7185'
  if (v >= 65) return '#fbbf24'
  return '#34d399'
}
function statusText(v) {
  if (v >= 85) return 'CRITICAL'
  if (v >= 65) return 'WARNING'
  return 'HEALTHY'
}

function linePath(arr) {
  const w = 400
  const h = 120
  const step = w / (arr.length - 1)
  return arr
    .map(
      (v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - (v / 100) * h).toFixed(1)}`,
    )
    .join(' ')
}
function areaPath(arr) {
  return `${linePath(arr)} L400,120 L0,120 Z`
}

/* ------------------------------------------------------------------ */
/* Interactive terminal simulator                                      */
/* ------------------------------------------------------------------ */
const termLines = ref([
  { type: 'out', text: 'Welcome to the Linux Monitoring Practice Terminal.', cls: 'success' },
  { type: 'out', text: 'Type "help" to see the supported commands.', cls: 'output' },
])
const termInput = ref('')
const termBody = ref(null)
const termHistory = ref([])
let histIdx = -1

const quickCommands = [
  'uptime',
  'free -h',
  'df -h',
  'top',
  'systemctl --failed',
  'sudo ss -tulpn',
  'ip -brief address',
  'sudo journalctl -b -p err',
  'sudo grep "Failed password" /var/log/auth.log',
  'sudo ufw status verbose',
  'last',
  'vmstat 1 5',
]

const missions = reactive([
  { text: 'Check how long the server has been running (uptime).', key: 'uptime', done: false },
  { text: 'Inspect memory usage in human-readable form (free -h).', key: 'free -h', done: false },
  {
    text: 'Find any failed services (systemctl --failed).',
    key: 'systemctl --failed',
    done: false,
  },
  { text: 'List listening ports (ss -tulpn).', key: 'ss -tulpn', done: false },
  {
    text: 'Look for failed SSH logins (grep "Failed password").',
    key: 'failed password',
    done: false,
  },
  { text: 'Review the firewall status (ufw status).', key: 'ufw status', done: false },
])
const missionsDone = computed(() => missions.filter((m) => m.done).length)
const missionPercent = computed(() => (missionsDone.value / missions.length) * 100)

const supportedList = [
  ['help', 'Show this list'],
  ['clear', 'Clear the screen'],
  ['uptime', 'Uptime and load average'],
  ['free -h', 'Memory and swap usage'],
  ['df -h', 'Filesystem usage'],
  ['du -sh /var/log', 'Size of the log directory'],
  ['top', 'Process snapshot'],
  ['ps aux --sort=-%cpu | head -5', 'Top CPU processes'],
  ['vmstat 1 5', 'Virtual memory statistics'],
  ['nproc', 'CPU core count'],
  ['uname -a', 'Kernel information'],
  ['whoami', 'Current user'],
  ['systemctl --failed', 'Failed services'],
  ['systemctl status ssh', 'SSH service status'],
  ['sudo ss -tulpn', 'Listening sockets'],
  ['ip -brief address', 'Network interfaces'],
  ['sudo journalctl -n 50', 'Recent journal entries'],
  ['sudo journalctl -b -p err', 'Errors since boot'],
  ['sudo grep "Failed password" /var/log/auth.log', 'Failed SSH logins'],
  ['last', 'Login history'],
  ['who', 'Logged-in users'],
  ['sudo ufw status verbose', 'Firewall rules'],
]

function liveNum(n, d = 1) {
  return Number(n).toFixed(d)
}

function simulate(raw) {
  let cmd = raw.trim().replace(/\s+/g, ' ')
  const lower = cmd.toLowerCase()
  const norm = lower.replace(/^sudo /, '')

  if (!cmd) return []

  if (norm === 'help') {
    return [
      { text: 'Supported commands:', cls: 'success' },
      ...supportedList.map(([c, d]) => ({ text: `  ${c.padEnd(46)} ${d}`, cls: 'output' })),
    ]
  }

  if (norm === 'uptime') {
    const l1 = loadAvg.value.toFixed(2)
    return [
      {
        text: ` 17:45:02 up ${uptimeText.value.split(' ')[0].replace('d', '')} days, 2 users,  load average: ${l1}, 0.37, 0.31`,
        cls: 'output',
      },
    ]
  }

  if (norm === 'free -h' || norm === 'free') {
    const total = 7.7
    const used = (total * mem.value) / 100
    const avail = total - used * 0.85
    const swapUsed = (2 * swap.value) / 100
    return [
      {
        text: '               total        used        free      shared  buff/cache   available',
        cls: 'output',
      },
      {
        text: `Mem:           ${total.toFixed(1)}Gi       ${liveNum(used)}Gi       ${liveNum(total - used - 1.1)}Gi       0.2Gi       1.1Gi       ${liveNum(avail)}Gi`,
        cls: 'output',
      },
      {
        text: `Swap:          2.0Gi       ${liveNum(swapUsed)}Gi       ${liveNum(2 - swapUsed)}Gi`,
        cls: 'output',
      },
    ]
  }

  if (norm === 'df -h' || norm === 'df') {
    return [
      { text: 'Filesystem      Size  Used Avail Use% Mounted on', cls: 'output' },
      {
        text: `/dev/sda2        58G   ${Math.round((58 * disk.value) / 100)}G   ${Math.round(58 - (58 * disk.value) / 100)}G  ${Math.round(disk.value)}% /`,
        cls: 'output',
      },
      { text: 'tmpfs           3.9G     0  3.9G   0% /dev/shm', cls: 'output' },
      { text: '/dev/sda1       511M  6.1M  505M   2% /boot/efi', cls: 'output' },
    ]
  }

  if (norm === 'du -sh /var/log') {
    return [{ text: '312M\t/var/log', cls: 'output' }]
  }

  if (norm === 'top') {
    return [
      {
        text: `top - 17:45:02 up ${uptimeText.value.split(' ')[0].replace('d', '')} days,  2 users,  load average: ${loadAvg.value.toFixed(2)}, 0.37, 0.31`,
        cls: 'output',
      },
      {
        text: `Tasks: ${processes.value} total,   1 running, ${processes.value - 2} sleeping,   0 stopped,   1 zombie`,
        cls: 'output',
      },
      {
        text: `%Cpu(s): ${liveNum(cpu.value * 0.7)} us, ${liveNum(cpu.value * 0.2)} sy,  0.0 ni, ${liveNum(100 - cpu.value)} id,  ${liveNum(cpu.value * 0.1)} wa`,
        cls: 'output',
      },
      {
        text: `MiB Mem :   7900.0 total,   2100.0 free,   ${Math.round(79 * mem.value)} used,   1100.0 buff/cache`,
        cls: 'output',
      },
      { text: '', cls: 'output' },
      { text: '    PID USER      %CPU  %MEM  COMMAND', cls: 'success' },
      {
        text: '   1204 www-data  ' + liveNum(cpu.value * 0.5).padStart(4) + '   3.1  nginx',
        cls: 'output',
      },
      {
        text: '   1873 mysql     ' + liveNum(cpu.value * 0.3).padStart(4) + '  11.4  mysqld',
        cls: 'output',
      },
      { text: '    982 root       0.7   0.6  sshd', cls: 'output' },
      { text: '      1 root       0.0   0.2  systemd', cls: 'output' },
    ]
  }

  if (norm.startsWith('ps aux')) {
    return [
      { text: 'USER       PID %CPU %MEM COMMAND', cls: 'success' },
      {
        text: `www-data  1204 ${liveNum(cpu.value * 0.5)}  3.1 nginx: worker process`,
        cls: 'output',
      },
      { text: `mysql     1873 ${liveNum(cpu.value * 0.3)} 11.4 /usr/sbin/mysqld`, cls: 'output' },
      { text: 'root       982  0.7  0.6 sshd: /usr/sbin/sshd -D', cls: 'output' },
      { text: 'root         1  0.0  0.2 /sbin/init', cls: 'output' },
    ]
  }

  if (norm.startsWith('vmstat')) {
    const rows = []
    for (let i = 0; i < 5; i++) {
      rows.push({
        text: ` ${Math.floor(Math.random() * 3)}  0      0 1843200  98120 1120440    0    0    ${Math.floor(Math.random() * 20)}    ${Math.floor(Math.random() * 40)}  ${300 + Math.floor(Math.random() * 200)}  ${500 + Math.floor(Math.random() * 300)}  ${Math.round(cpu.value * 0.7)}  ${Math.round(cpu.value * 0.2)} ${Math.round(100 - cpu.value)}  1  0`,
        cls: 'output',
      })
    }
    return [
      {
        text: 'procs -----memory---------- ---swap-- -----io---- -system-- ------cpu-----',
        cls: 'success',
      },
      {
        text: ' r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st',
        cls: 'success',
      },
      ...rows,
    ]
  }

  if (norm === 'nproc') return [{ text: '4', cls: 'output' }]
  if (norm === 'whoami') return [{ text: 'tj', cls: 'output' }]
  if (norm === 'uname -a') {
    return [
      {
        text: 'Linux ubuntu-server 6.8.0-45-generic #45-Ubuntu SMP x86_64 GNU/Linux',
        cls: 'output',
      },
    ]
  }

  if (norm === 'systemctl --failed') {
    return [
      { text: '0 loaded units listed.', cls: 'output' },
      { text: '✔ No failed services. Everything looks healthy.', cls: 'success' },
    ]
  }

  if (norm === 'systemctl status ssh') {
    return [
      { text: '● ssh.service - OpenBSD Secure Shell server', cls: 'success' },
      { text: '     Loaded: loaded (/lib/systemd/system/ssh.service; enabled)', cls: 'output' },
      {
        text: '     Active: active (running) since Sun 2026-10-11 11:13:40 PST; 2 weeks ago',
        cls: 'output',
      },
      { text: '   Main PID: 982 (sshd)', cls: 'output' },
      { text: '      Tasks: 1 (limit: 9301)', cls: 'output' },
    ]
  }

  if (norm === 'ss -tulpn') {
    return [
      { text: 'Netid State  Recv-Q Send-Q  Local Address:Port   Process', cls: 'success' },
      {
        text: 'udp   UNCONN 0      0       127.0.0.53%lo:53     users:(("systemd-resolve",pid=611))',
        cls: 'output',
      },
      {
        text: 'tcp   LISTEN 0      128     0.0.0.0:22           users:(("sshd",pid=982))',
        cls: 'output',
      },
      {
        text: 'tcp   LISTEN 0      511     0.0.0.0:80           users:(("nginx",pid=1190))',
        cls: 'output',
      },
      {
        text: 'tcp   LISTEN 0      511     0.0.0.0:443          users:(("nginx",pid=1190))',
        cls: 'output',
      },
      {
        text: 'tcp   LISTEN 0      80      127.0.0.1:3306       users:(("mysqld",pid=1873))',
        cls: 'output',
      },
      { text: '', cls: 'output' },
      {
        text: 'Tip: 3306 listens on 127.0.0.1 only, so the database is not exposed to the network.',
        cls: 'success',
      },
    ]
  }

  if (norm === 'ip -brief address' || norm === 'ip -br a' || norm === 'ip -br address') {
    return [
      { text: 'lo               UNKNOWN        127.0.0.1/8 ::1/128', cls: 'output' },
      {
        text: 'enp0s3           UP             192.168.1.25/24 fe80::a00:27ff:fe4e:66a1/64',
        cls: 'output',
      },
    ]
  }

  if (norm === 'journalctl -n 50' || norm.startsWith('journalctl -n')) {
    return [
      {
        text: 'Oct 25 17:44:12 ubuntu-server sshd[2210]: Accepted publickey for tj from 192.168.1.10',
        cls: 'output',
      },
      {
        text: 'Oct 25 17:44:12 ubuntu-server systemd-logind[701]: New session 41 of user tj.',
        cls: 'output',
      },
      {
        text: 'Oct 25 17:41:03 ubuntu-server CRON[2188]: (root) CMD (/usr/lib/php/sessionclean)',
        cls: 'output',
      },
      { text: 'Oct 25 17:30:01 ubuntu-server nginx[1190]: 200 GET /index.html', cls: 'output' },
      { text: '-- showing the most recent entries --', cls: 'success' },
    ]
  }

  if (norm === 'journalctl -b -p err') {
    return [
      {
        text: 'Oct 25 03:12:44 ubuntu-server kernel: ata1.00: failed command: READ FPDMA QUEUED',
        cls: 'err',
      },
      {
        text: 'Oct 25 09:02:19 ubuntu-server mysqld[1873]: Aborted connection 88 to db (Got timeout)',
        cls: 'err',
      },
      {
        text: '-- 2 error entries since boot. Investigate the repeated disk message. --',
        cls: 'success',
      },
    ]
  }

  if (norm.startsWith('grep "failed password"') || norm.includes('failed password')) {
    return [
      {
        text: 'Oct 25 02:11:09 sshd[1988]: Failed password for root from 203.0.113.45 port 52114 ssh2',
        cls: 'err',
      },
      {
        text: 'Oct 25 02:11:12 sshd[1990]: Failed password for root from 203.0.113.45 port 52130 ssh2',
        cls: 'err',
      },
      {
        text: 'Oct 25 02:11:15 sshd[1992]: Failed password for admin from 203.0.113.45 port 52141 ssh2',
        cls: 'err',
      },
      {
        text: 'Oct 25 02:11:19 sshd[1994]: Failed password for ubuntu from 203.0.113.45 port 52155 ssh2',
        cls: 'err',
      },
      {
        text: '⚠ 4 failures from one address in 10 seconds. This looks like a brute-force attempt.',
        cls: 'warn',
      },
      {
        text: '  Consider key-only SSH, disabling root login, and fail2ban or firewall rate limits.',
        cls: 'output',
      },
    ]
  }

  if (norm === 'last') {
    return [
      {
        text: 'tj       pts/0        192.168.1.10     Sun Oct 25 17:44   still logged in',
        cls: 'output',
      },
      {
        text: 'tj       pts/0        192.168.1.10     Sat Oct 24 21:03 - 22:18  (01:15)',
        cls: 'output',
      },
      {
        text: 'admin    pts/1        192.168.1.22     Fri Oct 23 09:40 - 10:02  (00:22)',
        cls: 'output',
      },
      {
        text: 'reboot   system boot  6.8.0-45-generic Sun Oct 11 11:13   still running',
        cls: 'output',
      },
    ]
  }

  if (norm === 'who') {
    return [
      { text: 'tj       pts/0        2026-10-25 17:44 (192.168.1.10)', cls: 'output' },
      { text: 'admin    pts/1        2026-10-25 16:02 (192.168.1.22)', cls: 'output' },
    ]
  }

  if (norm === 'ufw status verbose' || norm === 'ufw status') {
    return [
      { text: 'Status: active', cls: 'success' },
      { text: 'Logging: on (low)', cls: 'output' },
      { text: 'Default: deny (incoming), allow (outgoing), disabled (routed)', cls: 'output' },
      { text: '', cls: 'output' },
      { text: 'To                         Action      From', cls: 'success' },
      { text: '22/tcp                     ALLOW IN    Anywhere', cls: 'output' },
      { text: '80/tcp                     ALLOW IN    Anywhere', cls: 'output' },
      { text: '443/tcp                    ALLOW IN    Anywhere', cls: 'output' },
    ]
  }

  if (norm.startsWith('rm ') || norm.startsWith('shutdown') || norm.startsWith('reboot')) {
    return [
      {
        text: 'Simulator: destructive commands are disabled here. This is a safe practice area.',
        cls: 'warn',
      },
    ]
  }

  const first = cmd.split(' ')[0]
  return [
    {
      text: `${first}: command not supported in the simulator. Type "help" to see the list.`,
      cls: 'err',
    },
  ]
}

function markMissions(raw) {
  const n = raw.toLowerCase().replace(/^sudo /, '')
  missions.forEach((m) => {
    if (!m.done && n.includes(m.key)) m.done = true
  })
}

async function scrollTerm() {
  await nextTick()
  if (termBody.value) termBody.value.scrollTop = termBody.value.scrollHeight
}

function submitTerm() {
  const raw = termInput.value
  termInput.value = ''
  histIdx = -1
  if (!raw.trim()) {
    termLines.value.push({ type: 'cmd', text: '' })
    return scrollTerm()
  }
  termHistory.value.unshift(raw)
  if (raw.trim() === 'clear') return clearTerm()
  termLines.value.push({ type: 'cmd', text: raw })
  const out = simulate(raw)
  out.forEach((o) => termLines.value.push({ type: 'out', ...o }))
  markMissions(raw)
  if (termLines.value.length > 300) termLines.value.splice(0, 100)
  scrollTerm()
}

function clearTerm() {
  termLines.value = []
  termInput.value = ''
}

function historyNav(dir) {
  if (!termHistory.value.length) return
  histIdx = Math.min(termHistory.value.length - 1, Math.max(-1, histIdx - dir))
  termInput.value = histIdx === -1 ? '' : termHistory.value[histIdx]
}

function autoComplete() {
  const v = termInput.value.toLowerCase()
  if (!v) return
  const match = supportedList.map((x) => x[0]).find((c) => c.startsWith(v))
  if (match) termInput.value = match
}

function focusInput() {
  document.querySelector('.input-line input')?.focus()
}

async function runInTerminal(cmd) {
  scrollTo('lab')
  termInput.value = ''
  termLines.value.push({ type: 'cmd', text: cmd })
  simulate(cmd).forEach((o) => termLines.value.push({ type: 'out', ...o }))
  markMissions(cmd)
  scrollTerm()
}

/* ------------------------------------------------------------------ */
/* Live log stream                                                     */
/* ------------------------------------------------------------------ */
const logLevels = ['ALL', 'INFO', 'WARN', 'ERROR', 'ALERT']
const logFilter = ref('ALL')
const logPaused = ref(false)
const logs = ref([])
const logBody = ref(null)
let logId = 0
let logTimer = null

const logTemplates = [
  {
    level: 'INFO',
    source: 'sshd',
    message: 'Accepted publickey for tj from 192.168.1.10 port 51422',
  },
  { level: 'INFO', source: 'systemd', message: 'Started Daily apt download activities.' },
  { level: 'INFO', source: 'nginx', message: '200 GET /index.html 192.168.1.40' },
  { level: 'INFO', source: 'CRON', message: '(root) CMD (/usr/lib/php/sessionclean)' },
  { level: 'INFO', source: 'ufw', message: 'Rule updated: allow 443/tcp' },
  { level: 'WARN', source: 'kernel', message: 'Out of memory risk: available memory below 10%' },
  { level: 'WARN', source: 'nginx', message: '404 GET /wp-login.php from 198.51.100.23' },
  { level: 'WARN', source: 'systemd', message: 'Service mysql restarted 2 times in 5 minutes' },
  { level: 'WARN', source: 'df', message: 'Filesystem /var is at 86% capacity' },
  { level: 'ERROR', source: 'kernel', message: 'ata1.00: failed command: READ FPDMA QUEUED' },
  {
    level: 'ERROR',
    source: 'mysqld',
    message: 'Aborted connection 88 to db (Got timeout reading packet)',
  },
  { level: 'ERROR', source: 'systemd', message: 'backup.service: Failed with result exit-code' },
  {
    level: 'ALERT',
    source: 'sshd',
    message: 'Failed password for root from 203.0.113.45 port 52114 ssh2',
  },
  {
    level: 'ALERT',
    source: 'sshd',
    message: 'Failed password for admin from 203.0.113.45 port 52141 ssh2',
  },
  {
    level: 'ALERT',
    source: 'sudo',
    message: 'tj : user NOT in sudoers ; COMMAND=/bin/cat /etc/shadow',
  },
]

function pushLog() {
  if (logPaused.value) return
  const pool = Math.random() < 0.55 ? logTemplates.filter((l) => l.level === 'INFO') : logTemplates
  const t = pool[Math.floor(Math.random() * pool.length)]
  const now = new Date()
  logs.value.push({
    id: ++logId,
    level: t.level,
    source: t.source,
    message: t.message,
    time: now.toLocaleTimeString('en-GB'),
  })
  if (logs.value.length > 60) logs.value.shift()
  nextTick(() => {
    if (logBody.value) logBody.value.scrollTop = logBody.value.scrollHeight
  })
}

const filteredLogs = computed(() =>
  logFilter.value === 'ALL' ? logs.value : logs.value.filter((l) => l.level === logFilter.value),
)
const logCounts = computed(() => {
  const c = {}
  logs.value.forEach((l) => (c[l.level] = (c[l.level] || 0) + 1))
  return c
})

/* ------------------------------------------------------------------ */
/* Quiz                                                                */
/* ------------------------------------------------------------------ */
const quiz = [
  {
    q: 'Which command lists failed systemd services?',
    options: ['systemctl --failed', 'ps --failed', 'uptime --errors', 'df --failed'],
    answer: 0,
    explain: 'systemctl --failed shows every unit that systemd currently marks as failed.',
  },
  {
    q: 'Which column of free -h best shows memory that applications can still use?',
    options: ['free', 'shared', 'available', 'total'],
    answer: 2,
    explain:
      'The "available" column estimates how much memory can be used without swapping, including reclaimable cache.',
  },
  {
    q: 'What does sudo ss -tulpn help you inspect?',
    options: [
      'Disk health',
      'Listening TCP/UDP sockets and their processes',
      'Failed logins',
      'Installed packages',
    ],
    answer: 1,
    explain:
      'ss lists sockets. The flags request TCP, UDP, listening state, process names, and numeric ports.',
  },
  {
    q: 'Which tool is primarily a network IDS/IPS engine?',
    options: ['Wazuh', 'Suricata', 'top', 'logrotate'],
    answer: 1,
    explain: 'Suricata inspects network traffic with rules and can run as an IDS or IPS.',
  },
  {
    q: 'You see 40 failed SSH logins from one IP in a minute. What is the best first thought?',
    options: [
      'It is normal, ignore it',
      'Possible brute-force attempt, investigate and harden SSH',
      'The disk is full',
      'The CPU is overheating',
    ],
    answer: 1,
    explain:
      'A burst of failures from one source suggests password guessing. Review logs and tighten SSH and firewall settings.',
  },
]
const quizIndex = ref(0)
const quizScore = ref(0)
const answered = ref(false)
const picked = ref(-1)
const quizDone = ref(false)

function pick(i) {
  if (answered.value) return
  picked.value = i
  answered.value = true
  if (i === quiz[quizIndex.value].answer) quizScore.value++
}
function nextQuestion() {
  if (quizIndex.value === quiz.length - 1) {
    quizDone.value = true
    return
  }
  quizIndex.value++
  answered.value = false
  picked.value = -1
}
function resetQuiz() {
  quizIndex.value = 0
  quizScore.value = 0
  answered.value = false
  picked.value = -1
  quizDone.value = false
}
const quizMessage = computed(() => {
  const s = quizScore.value
  if (s === quiz.length) return 'Excellent! You have a solid grasp of Linux monitoring basics.'
  if (s >= 3) return 'Good job. Review the sections you missed and try the simulator again.'
  return 'Keep practicing. Try the missions in the practice lab and retake the quiz.'
})

/* ------------------------------------------------------------------ */
/* Scrolling, reveal, fonts, background canvas                         */
/* ------------------------------------------------------------------ */
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function copyCommand(command) {
  try {
    await navigator.clipboard.writeText(command)
    $q.notify({
      type: 'positive',
      message: 'Command copied to clipboard',
      position: 'top',
      timeout: 1500,
    })
  } catch {
    $q.notify({
      type: 'warning',
      message: 'Clipboard access unavailable. Copy the command manually.',
      position: 'top',
    })
  }
}

let observer = null
let sectionObserver = null
function onScroll() {
  const h = document.documentElement
  const max = h.scrollHeight - h.clientHeight
  scrollProgress.value = max > 0 ? (h.scrollTop / max) * 100 : 0
}

function injectFonts() {
  if (document.getElementById('lm-fonts')) return
  const link = document.createElement('link')
  link.id = 'lm-fonts'
  link.rel = 'stylesheet'
  link.href =
    'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap'
  document.head.appendChild(link)
}

let rafId = null
let resizeHandler = null
function startBackground() {
  const canvas = bgCanvas.value
  if (!canvas) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const ctx = canvas.getContext('2d')
  let w = 0
  let h = 0
  let nodes = []
  const resize = () => {
    w = canvas.width = window.innerWidth
    h = canvas.height = window.innerHeight
    const count = Math.min(70, Math.floor((w * h) / 22000))
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }))
  }
  resizeHandler = resize
  resize()
  window.addEventListener('resize', resize)

  const draw = () => {
    ctx.clearRect(0, 0, w, h)
    for (const n of nodes) {
      n.x += n.vx
      n.y += n.vy
      if (n.x < 0 || n.x > w) n.vx *= -1
      if (n.y < 0 || n.y > h) n.vy *= -1
      ctx.beginPath()
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(52,211,153,0.55)'
      ctx.fill()
    }
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 140) {
          ctx.strokeStyle = `rgba(34,211,238,${0.16 * (1 - d / 140)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.stroke()
        }
      }
    }
    rafId = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(async () => {
  injectFonts()
  runTypedHeadline()
  runDemo()
  startBackground()

  // seed some logs, then stream
  for (let i = 0; i < 6; i++) pushLog()
  logTimer = setInterval(pushLog, 1800)
  metricsTimer = setInterval(tickMetrics, 1000)

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  await nextTick()
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.setAttribute('data-in', '1')
          observer.unobserve(e.target)
        }
      })
    },
    { threshold: 0.12 },
  )
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activeSection.value = e.target.id
      })
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) sectionObserver.observe(el)
  })
})

onBeforeUnmount(() => {
  demoStopped = true
  clearTimeout(typedTimer)
  clearInterval(metricsTimer)
  clearInterval(logTimer)
  cancelAnimationFrame(rafId)
  window.removeEventListener('scroll', onScroll)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  observer?.disconnect()
  sectionObserver?.disconnect()
})
</script>

<style scoped>
.monitoring-page {
  --bg: #060b14;
  --card: #0d1625;
  --card-2: #0a111d;
  --line: #1c2a3f;
  --text: #e6edf6;
  --muted: #8da0b8;
  --green: #34d399;
  --cyan: #22d3ee;
  --violet: #a78bfa;
  --amber: #fbbf24;
  --red: #fb7185;
  --mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
  --sans: 'Space Grotesk', 'Segoe UI', system-ui, sans-serif;

  position: relative;
  min-height: 100vh;
  padding: 36px 24px 90px;
  color: var(--text);
  font-family: var(--sans);
  background:
    radial-gradient(ellipse at 8% 0%, rgba(16, 185, 129, 0.12), transparent 38%),
    radial-gradient(ellipse at 95% 20%, rgba(34, 211, 238, 0.08), transparent 35%), var(--bg);
  overflow-x: hidden;
}

.monitoring-page h1,
.monitoring-page h2,
.monitoring-page h3 {
  font-family: var(--sans);
}

.mono,
code,
.terminal-body,
.log-body,
.prompt {
  font-family: var(--mono);
}

/* ---------- background layers ---------- */
.bg-canvas {
  position: fixed;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.55;
}

.scan-overlay {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 3px,
    rgba(255, 255, 255, 0.012) 3px,
    rgba(255, 255, 255, 0.012) 4px
  );
}

.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;
  height: 3px;
  background: linear-gradient(90deg, var(--green), var(--cyan), var(--violet));
  box-shadow: 0 0 12px rgba(34, 211, 238, 0.7);
  transition: width 0.1s linear;
}

.page-container {
  position: relative;
  z-index: 1;
  max-width: 1240px;
  margin: 0 auto;
}

/* ---------- side nav ---------- */
.side-nav {
  position: fixed;
  top: 50%;
  right: 16px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translateY(-50%);
}

.side-nav a {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  color: var(--muted);
  font-size: 0.72rem;
  text-decoration: none;
}

.side-nav .dot {
  width: 8px;
  height: 8px;
  border: 1px solid #3a4c66;
  border-radius: 50%;
  background: var(--bg);
  transition: all 0.25s ease;
}

.side-nav .label {
  padding: 3px 8px;
  border-radius: 5px;
  background: rgba(13, 22, 37, 0.92);
  border: 1px solid var(--line);
  opacity: 0;
  transform: translateX(6px);
  transition: all 0.25s ease;
  white-space: nowrap;
}

.side-nav a:hover .label,
.side-nav a.active .label {
  opacity: 1;
  transform: none;
}

.side-nav a.active .dot {
  background: var(--green);
  border-color: var(--green);
  box-shadow: 0 0 10px var(--green);
  transform: scale(1.4);
}

@media (max-width: 1100px) {
  .side-nav {
    display: none;
  }
}

/* ---------- reveal animation ---------- */
.reveal {
  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 0.7s ease,
    transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.reveal[data-in] {
  opacity: 1;
  transform: none;
}
.d1 {
  transition-delay: 0.1s;
}
.d2 {
  transition-delay: 0.2s;
}
.d3 {
  transition-delay: 0.3s;
}
.d4 {
  transition-delay: 0.4s;
}

/* ---------- buttons ---------- */
.btn-glow {
  color: #042019 !important;
  font-weight: 700;
  background: linear-gradient(90deg, #34d399, #22d3ee) !important;
  box-shadow: 0 0 22px rgba(52, 211, 153, 0.35);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}
.btn-glow:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 34px rgba(34, 211, 238, 0.55);
}
.btn-ghost {
  color: var(--text) !important;
  border: 1px solid #2c3d57;
}
.btn-ghost:hover {
  border-color: var(--green);
  background: rgba(52, 211, 153, 0.08);
}
.btn-ghost-flat {
  color: var(--muted) !important;
}
.btn-ghost-flat:hover {
  color: var(--green) !important;
}

/* ---------- hero ---------- */
.hero-section {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
  min-height: 82vh;
  padding: 46px 0 70px;
}

.eyebrow,
.section-label {
  color: var(--green);
  font-family: var(--mono);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border: 1px solid rgba(52, 211, 153, 0.28);
  border-radius: 8px;
  background: rgba(16, 185, 129, 0.08);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  animation: pulse 1.6s ease-out infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
  }
  100% {
    box-shadow: 0 0 0 12px rgba(52, 211, 153, 0);
  }
}

.hero-content h1 {
  margin: 22px 0;
  font-size: clamp(2.7rem, 5.4vw, 4.8rem);
  font-weight: 700;
  letter-spacing: -0.045em;
  line-height: 1.04;
}

.gradient-text {
  display: block;
  background: linear-gradient(90deg, #34d399, #22d3ee, #a78bfa, #34d399);
  background-size: 250% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 6s linear infinite;
}

@keyframes shimmer {
  to {
    background-position: 250% center;
  }
}

.typed-line {
  display: block;
  min-height: 1.4em;
  margin-top: 10px;
  color: var(--muted);
  font-family: var(--mono);
  font-size: clamp(0.95rem, 1.6vw, 1.25rem);
  font-weight: 500;
  letter-spacing: 0;
}
.typed-prefix {
  color: #4a5d78;
}
.caret {
  margin-left: 2px;
  color: var(--green);
  animation: blink 0.9s step-end infinite;
}

.hero-description,
.section-heading > p {
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.85;
}
.hero-description {
  max-width: 620px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
}

.hero-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 38px;
  margin-top: 42px;
}
.hero-stats div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.hero-stats strong {
  color: #f8fafc;
  font-size: 1.4rem;
}
.hero-stats span {
  color: #5f738d;
  font-size: 0.78rem;
}

/* ---------- terminal ---------- */
.terminal-card {
  overflow: hidden;
  border: 1px solid #243249;
  border-radius: 14px;
  background: rgba(8, 14, 25, 0.92);
  box-shadow:
    0 28px 80px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(52, 211, 153, 0.05),
    0 0 60px rgba(52, 211, 153, 0.07);
  backdrop-filter: blur(6px);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 13px 18px;
  border-bottom: 1px solid #243249;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.76rem;
}
.clear-btn {
  margin-left: auto;
  color: var(--muted) !important;
}

.terminal-dots {
  display: flex;
  gap: 6px;
}
.terminal-dots span {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.terminal-dots span:nth-child(1) {
  background: #fb7185;
}
.terminal-dots span:nth-child(2) {
  background: #fbbf24;
}
.terminal-dots span:nth-child(3) {
  background: #34d399;
}

.terminal-body {
  height: 360px;
  padding: 20px 20px 24px;
  overflow-y: auto;
  overflow-wrap: anywhere;
  font-size: 0.78rem;
  line-height: 1.6;
  scrollbar-width: thin;
  scrollbar-color: #243249 transparent;
}
.terminal-body.tall {
  height: 470px;
  cursor: text;
}
.terminal-body p {
  margin: 0;
  white-space: pre-wrap;
}

.prompt,
.success {
  color: var(--green);
}
.output {
  color: var(--muted);
  padding-left: 4px;
}
.err {
  color: var(--red);
}
.warn {
  color: var(--amber);
}

.block-cursor {
  display: inline-block;
  width: 8px;
  height: 14px;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--green);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.input-line {
  display: flex;
  align-items: center;
}
.input-line input {
  flex: 1;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  caret-color: var(--green);
  color: var(--text);
  font-family: var(--mono);
  font-size: 0.78rem;
}

/* ---------- sections ---------- */
.section {
  padding-top: 52px;
  margin-top: 28px;
  scroll-margin-top: 20px;
}

.section-heading {
  max-width: 780px;
  margin-bottom: 32px;
}
.section-heading h2 {
  margin: 12px 0;
  color: #f8fafc;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
  letter-spacing: -0.035em;
}
.section-heading > p {
  margin-bottom: 0;
}
.inline {
  padding: 2px 7px;
  border: 1px solid #263548;
  border-radius: 5px;
  background: #070c14;
  color: #6ee7b7;
  font-size: 0.85rem;
}

/* ---------- overview ---------- */
.overview-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.overview-card,
.monitor-card,
.tool-card,
.command-card,
.threshold-card,
.practice-card,
.gauge-card,
.chart-card {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: linear-gradient(145deg, #0f1a2b, #0a111d);
}

.overview-card {
  padding: 24px;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.overview-card:hover {
  transform: translateY(-5px);
  border-color: rgba(52, 211, 153, 0.5);
  box-shadow: 0 14px 40px rgba(16, 185, 129, 0.12);
}

.icon-box {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 1px solid rgba(52, 211, 153, 0.22);
  border-radius: 12px;
  background: rgba(16, 185, 129, 0.1);
  color: var(--green);
  font-size: 1.45rem;
  transition: transform 0.4s ease;
}
.overview-card:hover .icon-box {
  transform: rotate(-8deg) scale(1.1);
}

.overview-card h3,
.monitor-card h3,
.tool-card h3,
.command-title h3,
.practice-card h3 {
  color: #e8eef7;
  font-size: 1.05rem;
  font-weight: 600;
}
.overview-card h3 {
  margin: 18px 0 8px;
}

.overview-card p,
.monitor-card > p,
.tool-card > p,
.command-content > p,
.practice-card p,
.threshold-card p {
  margin-bottom: 0;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.75;
}

.card-question {
  display: inline-block;
  margin-top: 16px;
  padding: 4px 9px;
  border-radius: 6px;
  background: rgba(34, 211, 238, 0.08);
  color: var(--cyan);
  font-family: var(--mono);
  font-size: 0.72rem;
}

.pillars {
  margin-top: 22px;
  padding: 22px;
  border: 1px dashed #2a3c57;
  border-radius: 14px;
  background: rgba(10, 17, 29, 0.6);
}
.pillar-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: #cfdaea;
  font-weight: 600;
}
.pillar-title .q-icon {
  color: var(--cyan);
}
.pillar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.pillar {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.pillar > .q-icon {
  padding: 8px;
  border-radius: 9px;
  background: rgba(167, 139, 250, 0.1);
  color: var(--violet);
  font-size: 1.3rem;
}
.pillar strong {
  display: block;
  color: #e2e8f0;
  margin-bottom: 3px;
}
.pillar span {
  color: var(--muted);
  font-size: 0.83rem;
  line-height: 1.6;
}

/* ---------- dashboard ---------- */
.dash-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}
.gauge-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
}
.gauge {
  width: 150px;
  height: 150px;
  transform: rotate(-90deg);
}
.gauge text {
  transform: rotate(90deg);
  transform-origin: 60px 60px;
  text-anchor: middle;
  fill: #f1f5f9;
}
.gauge-bg {
  fill: none;
  stroke: #17243a;
  stroke-width: 9;
}
.gauge-fg {
  fill: none;
  stroke-width: 9;
  stroke-linecap: round;
  transition:
    stroke-dashoffset 0.9s ease,
    stroke 0.4s ease;
  filter: drop-shadow(0 0 5px currentColor);
}
.gauge-value {
  font-family: var(--mono);
  font-size: 20px;
  font-weight: 700;
}
.gauge-label {
  fill: #8da0b8 !important;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.gauge-meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
}
.gauge-meta small {
  color: #5f738d;
  font-size: 0.75rem;
}
.badge {
  padding: 3px 9px;
  border: 1px solid;
  border-radius: 20px;
  font-family: var(--mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  transition: all 0.4s ease;
}

.chart-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}
.chart-card {
  padding: 20px;
}
.chart-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}
.chart-head strong {
  display: block;
  color: #e2e8f0;
}
.chart-head span {
  color: #5f738d;
  font-size: 0.78rem;
}
.chart-now {
  color: var(--cyan) !important;
  font-family: var(--mono);
  font-size: 1.5rem !important;
  font-weight: 700;
}
.chart-now.small {
  font-size: 0.85rem !important;
  display: flex;
  gap: 10px;
}
.rx {
  color: var(--green);
}
.tx {
  color: var(--violet);
}
.spark {
  width: 100%;
  height: 130px;
}
.grid-line {
  stroke: #17243a;
  stroke-dasharray: 3 4;
}
.spark-line {
  fill: none;
  stroke-width: 2;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}
.spark-line.cyan {
  stroke: #22d3ee;
}
.spark-line.green {
  stroke: #34d399;
}
.spark-line.violet {
  stroke: #a78bfa;
}

.mini-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
  padding: 18px 22px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #0a111d;
}
.mini-stats > div {
  display: flex;
  align-items: center;
  gap: 12px;
}
.mini-stats .q-icon {
  color: var(--green);
  font-size: 1.5rem;
}
.mini-stats strong {
  display: block;
  color: #f1f5f9;
  font-size: 1.05rem;
}
.mini-stats span {
  color: #5f738d;
  font-size: 0.74rem;
}

/* ---------- monitoring areas ---------- */
.monitoring-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  align-items: start;
}
.monitor-card {
  padding: 26px;
  cursor: pointer;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}
.monitor-card:hover,
.monitor-card.open,
.tool-card:hover {
  transform: translateY(-4px);
  border-color: rgba(52, 211, 153, 0.5);
  box-shadow: 0 14px 40px rgba(16, 185, 129, 0.1);
}
.monitor-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.monitor-top .number {
  color: #5f738d;
  font-family: var(--mono);
  font-size: 0.8rem;
}
.monitor-top .q-icon {
  color: var(--green);
  font-size: 1.7rem;
}
.monitor-card h3 {
  margin: 0 0 10px;
  font-size: 1.22rem;
}

.monitor-details {
  margin-top: 21px;
  padding: 16px;
  border: 1px solid var(--line);
  border-radius: 9px;
  background: var(--card-2);
}
.monitor-details strong {
  color: #cbd5e1;
  font-size: 0.82rem;
}
.monitor-details ul {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 19px;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.5;
}

.monitor-extra {
  display: grid;
  gap: 12px;
  margin-top: 14px;
  overflow: hidden;
}
.extra-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border: 1px solid #1f3a3a;
  border-radius: 9px;
  background: rgba(16, 185, 129, 0.05);
}
.extra-block.warn {
  border-color: rgba(251, 191, 36, 0.25);
  background: rgba(245, 158, 11, 0.05);
}
.extra-block strong {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #dbe5f1;
  font-size: 0.82rem;
}
.extra-block ul {
  margin: 0;
  padding-left: 18px;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.6;
}
.extra-block code {
  align-self: flex-start;
  padding: 5px 9px;
  border: 1px solid #263548;
  border-radius: 6px;
  background: #070c14;
  color: #6ee7b7;
  font-size: 0.78rem;
}

.tag-list,
.tool-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 18px;
}
.tag-list span,
.tool-tags span {
  padding: 5px 9px;
  border: 1px solid #273649;
  border-radius: 6px;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.68rem;
}
.tag-list .more {
  margin-left: auto;
  border-color: transparent;
  color: var(--cyan);
}

/* expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.35s ease;
  max-height: 600px;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}

/* ---------- tools ---------- */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 17px;
}
.tool-card {
  padding: 25px;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    opacity 0.7s ease;
}
.tool-icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 13px;
  font-size: 1.6rem;
  animation: floaty 4s ease-in-out infinite;
}
@keyframes floaty {
  50% {
    transform: translateY(-4px);
  }
}
.tool-green {
  color: #34d399;
  border-color: rgba(52, 211, 153, 0.28);
  background: rgba(16, 185, 129, 0.1);
}
.tool-blue {
  color: #60a5fa;
  border-color: rgba(96, 165, 250, 0.28);
  background: rgba(59, 130, 246, 0.1);
}
.tool-purple {
  color: #c084fc;
  border-color: rgba(192, 132, 252, 0.28);
  background: rgba(168, 85, 247, 0.1);
}

.tool-type {
  color: #5f738d;
  font-family: var(--mono);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}
.tool-heading h3 {
  margin: 7px 0 12px;
  font-size: 1.35rem;
}

.tool-list {
  display: grid;
  gap: 7px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
  color: var(--muted);
  font-size: 0.83rem;
}
.tool-list li {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}
.tool-list .q-icon {
  margin-top: 2px;
  color: var(--green);
}

.tool-feature {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid var(--line);
  color: #6ee7b7;
  font-size: 0.82rem;
  line-height: 1.6;
}
.tool-feature .q-icon {
  flex-shrink: 0;
  color: var(--amber);
}

.compare-wrap {
  margin-top: 20px;
  overflow-x: auto;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #0a111d;
}
.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.86rem;
}
.compare-table th,
.compare-table td {
  padding: 14px 18px;
  text-align: left;
  border-bottom: 1px solid var(--line);
}
.compare-table th {
  color: #cbd5e1;
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.06em;
  background: #0d1625;
}
.compare-table td {
  color: var(--muted);
}
.compare-table tr:last-child td {
  border-bottom: 0;
}
.compare-table tbody tr:hover {
  background: rgba(52, 211, 153, 0.04);
}
.compare-table td:not(:first-child) {
  white-space: nowrap;
}
.cmp-text {
  margin-left: 6px;
  font-size: 0.78rem;
}
.cmp-yes {
  color: var(--green);
}
.cmp-partial {
  color: var(--amber);
}
.cmp-no {
  color: #4a5d78;
}

.info-banner,
.warning-banner {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid rgba(96, 165, 250, 0.28);
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.06);
}
.info-banner > .q-icon {
  color: #60a5fa;
  font-size: 1.5rem;
}
.info-banner strong,
.warning-banner strong {
  color: #e2e8f0;
}
.info-banner p,
.warning-banner p {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 0.87rem;
  line-height: 1.75;
}
.warning-banner {
  border-color: rgba(251, 191, 36, 0.28);
  background: rgba(245, 158, 11, 0.06);
}
.warning-banner > .q-icon {
  color: var(--amber);
  font-size: 1.5rem;
}

/* ---------- lab ---------- */
.lab-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 0.9fr);
  gap: 18px;
  align-items: start;
}
.lab-side {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: linear-gradient(145deg, #0f1a2b, #0a111d);
}
.lab-side h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 6px;
  color: #e8eef7;
  font-size: 1rem;
}
.lab-side h3 .q-icon {
  color: var(--cyan);
}
.lab-side h3.mt {
  margin-top: 26px;
}
.lab-side > p {
  margin: 0 0 14px;
  color: var(--muted);
  font-size: 0.84rem;
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  max-width: 100%;
  padding: 7px 11px;
  overflow: hidden;
  border: 1px solid #263548;
  border-radius: 7px;
  background: #070c14;
  color: #6ee7b7;
  font-family: var(--mono);
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
}
.chip:hover {
  border-color: var(--green);
  background: rgba(52, 211, 153, 0.1);
  transform: translateY(-2px);
}

.mission-list {
  display: grid;
  gap: 10px;
  margin: 12px 0 14px;
  padding: 0;
  list-style: none;
}
.mission-list li {
  display: flex;
  gap: 9px;
  align-items: flex-start;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.5;
  transition: color 0.3s ease;
}
.mission-list .q-icon {
  margin-top: 1px;
  font-size: 1.1rem;
}
.mission-list li.done {
  color: var(--green);
}
.mission-list li.done span {
  text-decoration: line-through;
  opacity: 0.8;
}
.mission-progress {
  height: 6px;
  overflow: hidden;
  border-radius: 4px;
  background: #17243a;
}
.mission-progress div {
  height: 100%;
  background: linear-gradient(90deg, var(--green), var(--cyan));
  transition: width 0.5s ease;
}
.lab-side small {
  display: block;
  margin-top: 8px;
  color: #5f738d;
}

/* ---------- logs ---------- */
.log-panel {
  overflow: hidden;
  border: 1px solid #243249;
  border-radius: 14px;
  background: rgba(8, 14, 25, 0.92);
}
.log-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid #243249;
  background: #0b1424;
}
.log-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 6px 12px;
  border: 1px solid #263548;
  border-radius: 7px;
  background: transparent;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.72rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.filter-btn:hover {
  border-color: #3d5273;
  color: #e2e8f0;
}
.filter-btn.active {
  background: rgba(52, 211, 153, 0.12);
  border-color: var(--green);
  color: var(--green);
}
.filter-btn.lv-warn.active {
  background: rgba(251, 191, 36, 0.12);
  border-color: var(--amber);
  color: var(--amber);
}
.filter-btn.lv-error.active,
.filter-btn.lv-alert.active {
  background: rgba(251, 113, 133, 0.12);
  border-color: var(--red);
  color: var(--red);
}
.count {
  padding: 1px 6px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.65rem;
}

.log-body {
  height: 340px;
  padding: 10px 6px;
  overflow-y: auto;
  font-size: 0.76rem;
  scrollbar-width: thin;
  scrollbar-color: #243249 transparent;
}
.log-line {
  display: grid;
  grid-template-columns: 76px 62px 76px 1fr;
  gap: 12px;
  align-items: baseline;
  padding: 5px 12px;
  border-left: 3px solid transparent;
  line-height: 1.5;
}
.log-line:hover {
  background: rgba(255, 255, 255, 0.025);
}
.log-time {
  color: #4a5d78;
}
.log-src {
  color: #7b8fa8;
}
.log-msg {
  color: #b8c5d8;
  overflow-wrap: anywhere;
}
.log-level {
  font-weight: 700;
}
.log-line.lv-info {
  border-left-color: #2b6f5a;
}
.log-line.lv-info .log-level {
  color: var(--green);
}
.log-line.lv-warn {
  border-left-color: var(--amber);
}
.log-line.lv-warn .log-level {
  color: var(--amber);
}
.log-line.lv-error {
  border-left-color: var(--red);
}
.log-line.lv-error .log-level {
  color: var(--red);
}
.log-line.lv-alert {
  border-left-color: #f43f5e;
  background: rgba(244, 63, 94, 0.07);
}
.log-line.lv-alert .log-level {
  color: #f43f5e;
}
.log-empty {
  padding: 40px;
  color: #5f738d;
  font-family: var(--mono);
  font-size: 0.85rem;
  text-align: center;
}
.log-enter-active {
  transition: all 0.4s ease;
}
.log-enter-from {
  opacity: 0;
  transform: translateX(-14px);
}

.log-files {
  margin-top: 22px;
}
.subhead {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
  color: #cfdaea;
  font-weight: 600;
}
.subhead .q-icon {
  color: var(--amber);
}
.log-file-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.log-file {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #0a111d;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}
.log-file:hover {
  border-color: rgba(52, 211, 153, 0.4);
  transform: translateY(-3px);
}
.log-file code {
  color: #6ee7b7;
  font-size: 0.78rem;
  overflow-wrap: anywhere;
}
.log-file span {
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.5;
}

/* ---------- commands ---------- */
.command-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 20px;
}
.command-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.cat-btn {
  padding: 4px 14px !important;
  border: 1px solid #263548;
  color: var(--muted) !important;
  background: transparent !important;
}
.cat-btn.active {
  border-color: var(--green);
  background: rgba(52, 211, 153, 0.12) !important;
  color: var(--green) !important;
}
.cmd-search {
  min-width: 260px;
}

.command-list {
  display: grid;
  gap: 12px;
}
.command-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 19px 22px;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
}
.command-card:hover {
  border-color: rgba(52, 211, 153, 0.4);
  transform: translateX(4px);
}
.command-content {
  min-width: 0;
}
.command-title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.command-title h3 {
  margin: 0;
}
.command-title span {
  padding: 3px 8px;
  border: 1px solid #273649;
  border-radius: 5px;
  color: #6ee7b7;
  font-family: var(--mono);
  font-size: 0.66rem;
}
.command-content > p {
  margin-top: 7px;
  margin-bottom: 12px;
}
.command-content code,
.workflow-step code,
.ts-body code {
  display: inline-block;
  max-width: 100%;
  padding: 8px 12px;
  overflow-wrap: anywhere;
  border: 1px solid #263548;
  border-radius: 7px;
  background: #070c14;
  color: #6ee7b7;
  font-size: 0.8rem;
}
.dollar {
  color: #4a5d78;
  margin-right: 4px;
}
.cmd-tip {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  color: var(--amber);
  font-size: 0.78rem;
}
.command-actions {
  display: flex;
  flex-shrink: 0;
}

.cmd-enter-active,
.cmd-leave-active {
  transition: all 0.3s ease;
}
.cmd-enter-from,
.cmd-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* ---------- workflow ---------- */
.workflow {
  position: relative;
  display: grid;
  gap: 16px;
  padding-left: 0;
}
.workflow-line {
  position: absolute;
  top: 24px;
  bottom: 24px;
  left: 41px;
  width: 2px;
  background: linear-gradient(to bottom, var(--green), var(--cyan), var(--violet));
  opacity: 0.35;
}
.workflow-step {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: #0d1522;
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
}
.workflow-step:hover {
  border-color: rgba(52, 211, 153, 0.4);
  transform: translateX(4px);
}
.workflow-number {
  position: relative;
  z-index: 1;
  display: grid;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid rgba(52, 211, 153, 0.35);
  border-radius: 10px;
  background: #0a1a1a;
  color: var(--green);
  font-family: var(--mono);
  font-weight: 700;
  box-shadow: 0 0 14px rgba(52, 211, 153, 0.2);
}
.workflow-step h3 {
  margin: 0 0 7px;
  color: #e2e8f0;
  font-size: 1.05rem;
  font-weight: 600;
}
.workflow-step p {
  margin: 0;
  color: var(--muted);
  font-size: 0.88rem;
  line-height: 1.75;
}
.workflow-step code {
  margin-top: 13px;
}
.expect {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  color: var(--cyan);
  font-size: 0.78rem;
}

/* ---------- thresholds ---------- */
.threshold-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.threshold-card {
  padding: 22px;
}
.threshold-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  color: #e2e8f0;
}
.threshold-head .q-icon {
  color: var(--green);
  font-size: 1.4rem;
}
.threshold-bar {
  display: flex;
  height: 12px;
  overflow: hidden;
  border-radius: 7px;
}
.zone {
  transition: width 1s ease;
}
.zone.ok {
  background: linear-gradient(90deg, #059669, #34d399);
}
.zone.warn {
  background: linear-gradient(90deg, #d97706, #fbbf24);
}
.zone.crit {
  background: linear-gradient(90deg, #e11d48, #fb7185);
}
.threshold-legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  margin: 10px 0 14px;
  font-family: var(--mono);
  font-size: 0.68rem;
}
.threshold-legend .ok {
  color: var(--green);
}
.threshold-legend .warn {
  color: var(--amber);
}
.threshold-legend .crit {
  color: var(--red);
}

/* ---------- troubleshooting ---------- */
.troubleshooting-list {
  display: grid;
  gap: 12px;
}
.troubleshooting-card {
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: linear-gradient(145deg, #0f1a2b, #0a111d);
  transition: border-color 0.25s ease;
}
.troubleshooting-card:hover {
  border-color: rgba(251, 191, 36, 0.35);
}
.problem-icon {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border: 1px solid rgba(251, 191, 36, 0.22);
  border-radius: 10px;
  background: rgba(245, 158, 11, 0.07);
  color: var(--amber);
  font-size: 1.3rem;
}
.ts-title {
  color: #e2e8f0;
  font-size: 1.02rem;
  font-weight: 600;
}
.ts-sub {
  margin-top: 3px;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.6;
}
.ts-body {
  padding: 4px 24px 22px 80px;
}
.ts-body ol {
  display: grid;
  gap: 8px;
  margin: 0 0 14px;
  padding-left: 20px;
  color: #b3c0d3;
  font-size: 0.86rem;
  line-height: 1.65;
}

/* ---------- practices ---------- */
.practice-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.practice-card {
  padding: 22px;
  transition:
    transform 0.3s ease,
    border-color 0.3s ease,
    opacity 0.7s ease;
}
.practice-card:hover {
  transform: translateY(-5px);
  border-color: rgba(34, 211, 238, 0.45);
}
.practice-card > .q-icon {
  padding: 10px;
  border-radius: 10px;
  background: rgba(34, 211, 238, 0.09);
  color: var(--cyan);
  font-size: 1.5rem;
}
.practice-card h3 {
  margin: 16px 0 8px;
}

/* ---------- quiz ---------- */
.quiz-card {
  max-width: 820px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: linear-gradient(145deg, #0f1a2b, #0a111d);
}
.quiz-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
  color: #5f738d;
  font-family: var(--mono);
  font-size: 0.76rem;
}
.quiz-card h3 {
  margin: 0 0 20px;
  color: #f1f5f9;
  font-size: 1.3rem;
  line-height: 1.4;
}
.quiz-options {
  display: grid;
  gap: 10px;
}
.quiz-opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border: 1px solid #263548;
  border-radius: 10px;
  background: #0a111d;
  color: #cbd5e1;
  font-family: var(--sans);
  font-size: 0.92rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}
.quiz-opt:hover:not(:disabled) {
  border-color: var(--cyan);
  transform: translateX(4px);
}
.quiz-opt:disabled {
  cursor: default;
}
.quiz-opt .letter {
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 7px;
  background: #162338;
  color: var(--muted);
  font-family: var(--mono);
  font-size: 0.75rem;
}
.quiz-opt.correct {
  border-color: var(--green);
  background: rgba(52, 211, 153, 0.1);
  color: #d1fae5;
}
.quiz-opt.correct .letter {
  background: var(--green);
  color: #022c22;
}
.quiz-opt.wrong {
  border-color: var(--red);
  background: rgba(251, 113, 133, 0.1);
  animation: shake 0.4s;
}
.quiz-opt.wrong .letter {
  background: var(--red);
  color: #4c0519;
}
@keyframes shake {
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
.quiz-explain {
  display: flex;
  gap: 10px;
  margin: 16px 0;
  padding: 14px;
  border-radius: 10px;
  background: rgba(34, 211, 238, 0.07);
  color: #b9e8f2;
  font-size: 0.86rem;
  line-height: 1.65;
}
.quiz-explain .q-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--cyan);
}
.quiz-result {
  text-align: center;
  padding: 20px 0;
}
.quiz-result > .q-icon {
  color: var(--amber);
  font-size: 3.4rem;
  animation: floaty 2.5s ease-in-out infinite;
}
.quiz-result p {
  color: var(--muted);
  margin-bottom: 20px;
}

/* ---------- pdf ---------- */
.pdf-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 18px;
  padding: 20px;
  border: 1px solid var(--line);
  border-radius: 14px 14px 0 0;
  background: #0f1a2b;
}
.pdf-file-info {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
}
.pdf-file-info > .q-icon {
  flex-shrink: 0;
  color: var(--green);
  font-size: 2rem;
}
.pdf-file-info div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}
.pdf-file-info strong {
  overflow-wrap: anywhere;
  color: #e2e8f0;
  font-size: 0.9rem;
}
.pdf-file-info span {
  color: var(--muted);
  font-size: 0.8rem;
}
.pdf-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.pdf-viewer {
  height: 720px;
  overflow: hidden;
  border: 1px solid var(--line);
  border-top: 0;
  border-radius: 0 0 14px 14px;
  background: #0b1220;
}
.pdf-viewer iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
}
.pdf-fallback {
  margin: 12px 0 0;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.7;
}

/* ---------- closing ---------- */
.closing-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  padding: 56px 28px;
  border: 1px solid rgba(52, 211, 153, 0.22);
  border-radius: 18px;
  background:
    radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15), transparent 65%),
    rgba(11, 18, 32, 0.92);
  text-align: center;
}
.closing-icon {
  display: grid;
  width: 62px;
  height: 62px;
  place-items: center;
  margin-bottom: 20px;
  border: 1px solid rgba(52, 211, 153, 0.35);
  border-radius: 16px;
  background: rgba(16, 185, 129, 0.1);
  color: var(--green);
  font-size: 2rem;
  animation: heartbeat 2s ease-in-out infinite;
}
@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.4);
  }
  15% {
    transform: scale(1.12);
    box-shadow: 0 0 0 10px rgba(52, 211, 153, 0);
  }
  30% {
    transform: scale(1);
  }
}
.closing-card h2 {
  margin: 13px 0;
  color: #f8fafc;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700;
}
.closing-card > p {
  max-width: 650px;
  margin: 0 0 25px;
  color: var(--muted);
  line-height: 1.8;
}

/* ---------- responsive ---------- */
@media (max-width: 1050px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 32px;
    min-height: auto;
  }
  .overview-grid,
  .dash-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .tools-grid,
  .practice-grid {
    grid-template-columns: 1fr 1fr;
  }
  .lab-grid {
    grid-template-columns: 1fr;
  }
  .log-file-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .mini-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .chart-row,
  .threshold-grid {
    grid-template-columns: 1fr;
  }
  .pillar-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .monitoring-page {
    padding: 22px 14px 60px;
  }
  .hero-section {
    padding-top: 25px;
  }
  .overview-grid,
  .dash-grid,
  .monitoring-grid,
  .tools-grid,
  .practice-grid,
  .log-file-grid {
    grid-template-columns: 1fr;
  }
  .hero-stats {
    gap: 22px;
  }
  .command-card {
    align-items: flex-start;
    padding: 16px;
    flex-direction: column;
  }
  .workflow-line {
    display: none;
  }
  .workflow-step {
    padding: 17px;
  }
  .ts-body {
    padding: 4px 18px 20px;
  }
  .closing-card {
    padding: 36px 20px;
  }
  .log-line {
    grid-template-columns: 1fr;
    gap: 2px;
  }
  .cmd-search {
    min-width: 100%;
  }
  .terminal-body.tall {
    height: 380px;
  }
  .pdf-toolbar {
    align-items: flex-start;
    padding: 16px;
  }
  .pdf-actions {
    width: 100%;
  }
  .pdf-actions .q-btn {
    flex: 1;
  }
  .pdf-viewer {
    height: 520px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
  .reveal {
    opacity: 1;
    transform: none;
  }
}
</style>
