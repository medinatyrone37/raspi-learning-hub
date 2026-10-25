<template>
  <q-page class="hx">
    <div class="scroll-progress" :style="{ width: scrollPct + '%' }"></div>

    <!-- ============ HERO ============ -->
    <header id="top" class="hero">
      <canvas ref="rainCanvas" class="rain" aria-hidden="true"></canvas>

      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="kicker"><q-icon name="shield" size="18px" /> Ubuntu Server security course</p>

          <h1>Harden an Ubuntu server, one command at a time.</h1>

          <p class="lead">
            Learn how to protect a Linux server: user and group policies, SSH keys, firewall,
            AppArmor, updates, and logging. Includes a real working terminal, simulators, checklist,
            and quiz so you don't just read â€” you try it out.
          </p>

          <div class="hero-actions">
            <q-btn
              unelevated
              no-caps
              class="btn-amber"
              icon="terminal"
              label="Open the lab"
              @click="scrollTo('lab')"
            />
            <q-btn
              outline
              no-caps
              class="btn-ghost"
              icon="menu_book"
              label="Browse modules"
              @click="scrollTo('topics')"
            />
            <q-btn
              flat
              no-caps
              class="btn-ghost-flat"
              icon="picture_as_pdf"
              label="Learning PDF"
              @click="scrollTo('pdf')"
            />
          </div>

          <dl class="glance">
            <div>
              <dt>{{ glance.modules }}</dt>
              <dd>modules</dd>
            </div>
            <div>
              <dt>{{ glance.commands }}</dt>
              <dd>commands</dd>
            </div>
            <div>
              <dt>{{ glance.labs }}</dt>
              <dd>hands-on tools</dd>
            </div>
            <div>
              <dt>{{ glance.checks }}</dt>
              <dd>checklist items</dd>
            </div>
          </dl>
        </div>

        <div class="term hero-term" aria-label="Animated terminal demo">
          <div class="term-bar">
            <span class="dots"><i></i><i></i><i></i></span>
            <span class="term-title">tj@ubuntu-server: ~</span>
            <span class="live"><b></b> live</span>
          </div>
          <div class="term-body">
            <div v-for="(l, i) in heroLines" :key="i" :class="['ln', l.t]">
              <template v-if="l.t === 'cmd'"
                ><span class="ps">tj@ubuntu:~$</span> {{ l.text }}</template
              >
              <template v-else>{{ l.text }}</template>
            </div>
            <div class="ln cmd">
              <span class="ps">tj@ubuntu:~$</span> {{ heroTyping }}<span class="caret"></span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- ============ JUMP NAV ============ -->
    <nav class="wrap jump" aria-label="Sections">
      <button v-for="s in sections" :key="s.id" @click="scrollTo(s.id)">
        <q-icon :name="s.icon" size="18px" /> {{ s.label }}
      </button>
    </nav>

    <!-- ============ OVERVIEW ============ -->
    <section id="overview" class="block">
      <div class="wrap">
        <div class="section-head">
          <h2>What is server hardening?</h2>
          <p>
            Hardening is reducing what can be attacked on a server: turn off what is not needed,
            tighten access, update the software, and put several overlapping protections in place so
            if one fails, another still holds.
          </p>
        </div>

        <div class="layers">
          <div class="layers-text">
            <h3>Defense in depth</h3>
            <p class="muted">
              Click each layer in the list or on the diagram. It rotates on its own when you are not
              interacting with it.
            </p>

            <ul class="layer-list">
              <li v-for="(l, i) in layers" :key="l.key">
                <button
                  :class="{ on: activeLayer === i }"
                  @click="pickLayer(i)"
                  @mouseenter="layerPaused = true"
                  @mouseleave="layerPaused = false"
                >
                  <q-icon :name="l.icon" size="22px" />
                  <span>{{ l.name }}</span>
                </button>
              </li>
            </ul>

            <div class="layer-detail" :key="activeLayer">
              <h4>{{ layers[activeLayer].headline }}</h4>
              <p>{{ layers[activeLayer].text }}</p>
              <div class="chips">
                <span v-for="t in layers[activeLayer].tools" :key="t">{{ t }}</span>
              </div>
            </div>
          </div>

          <svg class="rings" viewBox="0 0 320 320" role="img" aria-label="Security layers diagram">
            <g v-for="(l, i) in layers" :key="l.key" class="ring-g" @click="pickLayer(i)">
              <circle cx="160" cy="160" :r="l.r" :class="['ring', { on: activeLayer === i }]" />
              <circle v-if="activeLayer === i" cx="160" cy="160" :r="l.r" class="ring-run" />
              <text
                x="160"
                :y="160 - l.r + 15"
                text-anchor="middle"
                :class="['ring-label', { on: activeLayer === i }]"
              >
                {{ l.short }}
              </text>
            </g>
            <circle cx="160" cy="160" r="9" class="core" />
            <circle cx="160" cy="160" r="9" class="core-pulse" />
          </svg>
        </div>

        <div class="principles">
          <div v-for="p in principles" :key="p.title">
            <q-icon :name="p.icon" size="26px" />
            <h4>{{ p.title }}</h4>
            <p>{{ p.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ TOPICS ============ -->
    <section id="topics" class="block alt">
      <div class="wrap">
        <div class="section-head">
          <h2>Hardening modules</h2>
          <p>
            Twelve topics, ordered from foundations through monitoring. Click a card for the full
            discussion, commands, and common mistakes.
          </p>
        </div>

        <div class="filters" role="tablist">
          <button
            v-for="g in groups"
            :key="g"
            :class="{ on: topicFilter === g }"
            @click="topicFilter = g"
          >
            {{ g }}
          </button>
        </div>

        <div class="topic-grid">
          <article
            v-for="t in filteredTopics"
            :key="t.title"
            class="topic"
            tabindex="0"
            @mousemove="glow"
            @click="openTopic(t.idx)"
            @keydown.enter="openTopic(t.idx)"
          >
            <div class="topic-top">
              <span class="module-no">Module {{ t.idx + 1 }}</span>
              <q-icon :name="t.icon" size="26px" class="topic-ic" />
            </div>
            <h3>{{ t.title }}</h3>
            <p>{{ t.description }}</p>
            <div class="topic-foot">
              <span :class="['level', t.level.toLowerCase()]">{{ t.level }}</span>
              <span class="topic-tags"
                ><em v-for="g in t.tags" :key="g">{{ g }}</em></span
              >
              <q-icon name="arrow_forward" class="go" />
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ============ LAB ============ -->
    <section id="lab" class="block">
      <div class="wrap">
        <div class="section-head">
          <h2>Hardening lab: a terminal that responds</h2>
          <p>
            This is a simulated Ubuntu terminal with real state. When you run
            <code>ufw enable</code>, the firewall is active and the rules show up in
            <code>ufw status</code>. Try the missions on the right.
          </p>
        </div>

        <div class="lab-grid">
          <div
            class="term lab-term"
            @click="labInputEl && labInputEl.focus({ preventScroll: true })"
          >
            <div class="term-bar">
              <span class="dots"><i></i><i></i><i></i></span>
              <span class="term-title">hardening-lab: ubuntu 24.04</span>
              <button class="mini" @click.stop="resetLab">
                <q-icon name="replay" size="16px" /> Reset
              </button>
            </div>

            <div ref="labEl" class="term-body lab-body">
              <div v-for="(l, i) in labLines" :key="i" :class="['ln', l.t]">
                <template v-if="l.t === 'cmd'"
                  ><span class="ps">tj@ubuntu:~$</span> {{ l.text }}</template
                >
                <template v-else>{{ l.text || '\u00a0' }}</template>
              </div>
              <div class="ln cmd input-row">
                <span class="ps">tj@ubuntu:~$</span>
                <input
                  ref="labInputEl"
                  v-model="labInput"
                  :disabled="labBusy"
                  spellcheck="false"
                  autocomplete="off"
                  autocapitalize="off"
                  aria-label="Terminal input"
                  placeholder="type a command, or help"
                  @keydown.enter="runLab()"
                  @keydown="onLabKey"
                />
              </div>
            </div>

            <div class="quick">
              <button v-for="c in quickCmds" :key="c" :disabled="labBusy" @click.stop="runLab(c)">
                {{ c }}
              </button>
            </div>
          </div>

          <aside class="missions">
            <h3>Missions</h3>
            <p class="muted small">
              {{ missionsDone }} of {{ missions.length }} complete. Click the command to put it in
              the terminal.
            </p>
            <ul>
              <li v-for="m in missions" :key="m.id" :class="{ done: m.done }">
                <span class="tick"><q-icon :name="m.done ? 'check' : ''" size="16px" /></span>
                <div>
                  <strong>{{ m.text }}</strong>

                  <button class="hint" @click="selectHint(m.hint)">
                    {{ m.hint }}
                  </button>
                </div>
              </li>
            </ul>
            <div v-if="missionsDone === missions.length" class="all-done">
              <q-icon name="verified" size="22px" /> Lab complete. You are ready for the checklist
              below.
            </div>
          </aside>
        </div>
      </div>
    </section>

    <!-- ============ TOOLS ============ -->
    <section id="tools" class="block alt">
      <div class="wrap">
        <div class="section-head">
          <h2>Interactive workbench</h2>
          <p>
            Three small tools to see the effect of each setting right away: file permissions,
            firewall rules, and SSH configuration.
          </p>
        </div>

        <div class="tabs" role="tablist">
          <button
            v-for="t in toolTabs"
            :key="t.id"
            :class="{ on: tool === t.id }"
            role="tab"
            @click="tool = t.id"
          >
            <q-icon :name="t.icon" size="20px" /> {{ t.label }}
          </button>
        </div>

        <!-- chmod -->
        <div v-if="tool === 'chmod'" class="panel" :key="'chmod'">
          <div class="panel-left">
            <h3>Permission calculator</h3>
            <p class="muted">
              Toggle the bits and see the octal and symbolic form, including SUID, SGID, and the
              sticky bit.
            </p>

            <table class="perm-table">
              <thead>
                <tr>
                  <th></th>
                  <th>read</th>
                  <th>write</th>
                  <th>execute</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="c in permClasses" :key="c.k">
                  <th scope="row">{{ c.n }}</th>
                  <td v-for="b in permBits" :key="b">
                    <button
                      :class="['bit', { on: perms[c.k][b] }]"
                      :aria-pressed="perms[c.k][b]"
                      @click="perms[c.k][b] = !perms[c.k][b]"
                    >
                      {{ b }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="specials">
              <label v-for="s in specialDefs" :key="s.k" :class="{ on: special[s.k] }">
                <input v-model="special[s.k]" type="checkbox" /> {{ s.label }}
              </label>
            </div>

            <div class="presets">
              <span class="muted small">Presets:</span>
              <button v-for="p in permPresets" :key="p.v" @click="applyOctal(p.v)">
                {{ p.v }} <em>{{ p.l }}</em>
              </button>
            </div>
          </div>

          <div class="panel-right">
            <div class="readout">
              <div class="octal">{{ octal }}</div>
              <code class="sym">{{ symbolic }}</code>
              <code class="cmdline">chmod {{ octal }} filename</code>
              <q-btn
                flat
                dense
                no-caps
                size="sm"
                icon="content_copy"
                label="Copy"
                class="btn-ghost-flat"
                @click="copyText('chmod ' + octal + ' filename', 'chmod command copied')"
              />
            </div>
            <ul class="notes">
              <li v-for="(n, i) in permNotes" :key="i" :class="n.t">
                <q-icon :name="n.t === 'warn' ? 'warning_amber' : 'check_circle'" size="18px" />
                {{ n.text }}
              </li>
            </ul>
          </div>
        </div>

        <!-- ufw -->
        <div v-else-if="tool === 'ufw'" class="panel" :key="'ufw'">
          <div class="panel-left">
            <h3>Firewall simulator</h3>
            <p class="muted">
              Choose which services are allowed in. See what <code>ufw status</code> will look like.
            </p>

            <div class="switches">
              <label :class="{ on: simActive }"
                ><input v-model="simActive" type="checkbox" /> Firewall enabled</label
              >
              <label :class="{ on: simDefaultDeny }"
                ><input v-model="simDefaultDeny" type="checkbox" /> Default: deny incoming</label
              >
            </div>

            <ul class="services">
              <li v-for="s in simServices" :key="s.port">
                <label :class="{ on: simAllowed[s.port], risky: s.risk }">
                  <input v-model="simAllowed[s.port]" type="checkbox" />
                  <span class="svc">{{ s.name }}</span>
                  <code>{{ s.port }}</code>
                  <span v-if="s.risk" class="risk-tag">{{ s.risk }}</span>
                </label>
              </li>
            </ul>
          </div>

          <div class="panel-right">
            <div :class="['meter', simLevel.cls]">
              <q-icon :name="simLevel.icon" size="28px" />
              <div>
                <strong>{{ simLevel.label }}</strong>
                <span>{{ simLevel.text }}</span>
              </div>
            </div>
            <pre
              class="code"
            ><div v-for="(l, i) in simLines" :key="i" :class="l.c">{{ l.text || '\u00a0' }}</div></pre>
          </div>
        </div>

        <!-- ssh -->
        <div v-else class="panel" :key="'ssh'">
          <div class="panel-left">
            <h3>SSH config builder</h3>
            <p class="muted">
              Turn on each hardening option and watch <code>/etc/ssh/sshd_config</code> change.
            </p>

            <ul class="opts">
              <li v-for="o in sshOpts" :key="o.key">
                <label :class="{ on: sshOn[o.key] }">
                  <input v-model="sshOn[o.key]" type="checkbox" />
                  <span class="switch"></span>
                  <span>
                    <strong>{{ o.label }}</strong>
                    <small>{{ o.why }}</small>
                  </span>
                </label>
              </li>
            </ul>
          </div>

          <div class="panel-right">
            <div class="score-row">
              <div class="bar"><i :style="{ width: sshScore + '%' }"></i></div>
              <strong>{{ sshScore }}%</strong>
            </div>
            <pre
              class="code"
            ><div v-for="(l, i) in sshLines" :key="i" :class="l.c">{{ l.text }}</div></pre>
            <div class="row-actions">
              <q-btn
                unelevated
                dense
                no-caps
                size="sm"
                class="btn-amber"
                icon="content_copy"
                label="Copy config"
                @click="copyText(sshText, 'Config copied')"
              />
              <span class="muted small"
                >Always run <code>sudo sshd -t</code> before
                <code>systemctl reload ssh</code>.</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CHECKLIST ============ -->
    <section id="checklist" class="block">
      <div class="wrap check-grid">
        <div>
          <div class="section-head">
            <h2>Your hardening checklist</h2>
            <p>Track what you have already done on a real server. This is saved in your browser.</p>
          </div>

          <ul class="checks">
            <li v-for="c in checklist" :key="c.id" :class="{ done: checked[c.id] }">
              <label>
                <input type="checkbox" :checked="!!checked[c.id]" @change="toggleCheck(c.id)" />
                <span class="box"><q-icon name="check" size="16px" /></span>
                <span class="ctext">
                  <strong>{{ c.text }}</strong>
                  <code>{{ c.cmd }}</code>
                </span>
              </label>
            </li>
          </ul>
        </div>

        <div class="ring-card">
          <svg
            viewBox="0 0 140 140"
            class="progress-ring"
            role="img"
            :aria-label="Math.round(pct * 100) + ' percent complete'"
          >
            <circle cx="70" cy="70" r="54" class="track" />
            <circle cx="70" cy="70" r="54" class="fill" :style="{ strokeDashoffset: ringOffset }" />
            <text x="70" y="68" text-anchor="middle" class="pct">{{ Math.round(pct * 100) }}%</text>
            <text x="70" y="88" text-anchor="middle" class="pct-sub">
              {{ doneCount }} / {{ checklist.length }}
            </text>
          </svg>
          <h3>{{ grade.label }}</h3>
          <p class="muted">{{ grade.text }}</p>
          <q-btn
            flat
            dense
            no-caps
            size="sm"
            icon="restart_alt"
            label="Clear checklist"
            class="btn-ghost-flat"
            @click="clearChecks"
          />
        </div>
      </div>
    </section>

    <!-- ============ COMMANDS ============ -->
    <section id="commands" class="block alt">
      <div class="wrap">
        <div class="section-head">
          <h2>Essential Linux commands</h2>
          <p>Commands administrators use to inspect and manage security settings.</p>
        </div>

        <div class="filters">
          <button
            v-for="c in cmdCats"
            :key="c"
            :class="{ on: cmdFilter === c }"
            @click="cmdFilter = c"
          >
            {{ c }}
          </button>
        </div>

        <div class="cmd-list">
          <article v-for="c in filteredCommands" :key="c.command" class="cmd-row">
            <div class="cmd-info">
              <h3>{{ c.title }}</h3>
              <p>{{ c.description }}</p>
              <code><span class="ps">$</span> {{ c.command }}</code>
            </div>
            <div class="cmd-actions">
              <span class="cat">{{ c.cat }}</span>
              <q-btn
                flat
                round
                dense
                icon="play_arrow"
                class="icon-btn"
                aria-label="Run in lab"
                @click="tryInLab(c.command)"
              >
                <q-tooltip>Run in lab</q-tooltip>
              </q-btn>
              <q-btn
                flat
                round
                dense
                icon="content_copy"
                class="icon-btn"
                aria-label="Copy command"
                @click="copyText(c.command, 'Command copied to clipboard')"
              >
                <q-tooltip>Copy command</q-tooltip>
              </q-btn>
            </div>
          </article>
        </div>

        <div class="warning">
          <q-icon name="warning_amber" size="28px" />
          <div>
            <h3>Safety reminder</h3>
            <p>
              Understand every command before you run it. Changes to the firewall and SSH can cut
              off remote access. Try them first on a test machine, open a second SSH session before
              reloading the config, and always keep an alternate way in (console or recovery mode).
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ QUIZ ============ -->
    <section id="quiz" class="block">
      <div class="wrap quiz-wrap">
        <div class="section-head">
          <h2>Check what you learned</h2>
          <p>Four quick questions. No timer, with an explanation for every answer.</p>
        </div>

        <div class="quiz-card">
          <template v-if="!quizDone">
            <div class="quiz-meta">
              <span>Question {{ qi + 1 }} of {{ quiz.length }}</span>
              <div class="dotsline">
                <i v-for="(q, i) in quiz" :key="i" :class="{ on: i <= qi }"></i>
              </div>
            </div>
            <h3>{{ quiz[qi].q }}</h3>
            <div class="answers">
              <button
                v-for="(o, i) in quiz[qi].options"
                :key="i"
                :class="{
                  correct: picked !== null && i === quiz[qi].answer,
                  wrong: picked === i && i !== quiz[qi].answer,
                }"
                :disabled="picked !== null"
                @click="pickAnswer(i)"
              >
                {{ o }}
              </button>
            </div>
            <div
              v-if="picked !== null"
              class="explain"
              :class="picked === quiz[qi].answer ? 'good' : 'bad'"
            >
              <strong>{{ picked === quiz[qi].answer ? 'Correct.' : 'Not quite.' }}</strong>
              {{ quiz[qi].why }}
              <div class="row-actions">
                <q-btn
                  unelevated
                  dense
                  no-caps
                  class="btn-amber"
                  :label="qi + 1 === quiz.length ? 'See result' : 'Next question'"
                  @click="nextQuestion"
                />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="quiz-result">
              <q-icon :name="score >= 3 ? 'emoji_events' : 'school'" size="44px" />
              <h3>You scored {{ score }} out of {{ quiz.length }}</h3>
              <p class="muted">
                {{
                  score === quiz.length
                    ? 'Perfect. Try the checklist on a real server next.'
                    : 'Review the modules above, then try again.'
                }}
              </p>
              <q-btn
                unelevated
                no-caps
                class="btn-amber"
                icon="replay"
                label="Try again"
                @click="restartQuiz"
              />
            </div>
          </template>
        </div>
      </div>
    </section>

    <!-- ============ PDF ============ -->
    <section id="pdf" class="block alt">
      <div class="wrap">
        <div class="section-head">
          <h2>Linux Server Hardening guide</h2>
          <p>Open the provided PDF to read the full learning material in its original form.</p>
        </div>

        <div class="pdf-bar">
          <div class="pdf-file">
            <q-icon name="picture_as_pdf" size="34px" />
            <div>
              <strong>2_Linux_Server_Hardening.pdf</strong>
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
              class="btn-amber"
              icon="download"
              label="Download"
              :href="pdfUrl"
              download
            />
          </div>
        </div>

        <div class="pdf-viewer">
          <iframe :src="pdfUrl" title="Linux Server Hardening PDF" loading="lazy"></iframe>
        </div>

        <p class="muted small pdf-note">
          If the document does not appear, use Open PDF or Download. Make sure the file is in the
          public/learning folder.
        </p>
      </div>
    </section>

    <!-- ============ TOPIC DIALOG ============ -->
    <q-dialog v-model="dlg" transition-show="jump-up" transition-hide="jump-down">
      <q-card class="hx-dialog">
        <div class="dlg-head">
          <div class="dlg-ic"><q-icon :name="current.icon" size="28px" /></div>
          <div>
            <span class="muted small">Module {{ activeTopic + 1 }} of {{ topics.length }}</span>
            <h3>{{ current.title }}</h3>
          </div>
          <q-btn flat round dense icon="close" class="dlg-close" aria-label="Close" v-close-popup />
        </div>

        <div class="dlg-body">
          <p class="dlg-why">{{ current.why }}</p>

          <h4>Key ideas</h4>
          <ul class="dlg-points">
            <li v-for="p in current.points" :key="p">
              <q-icon name="chevron_right" size="18px" /> {{ p }}
            </li>
          </ul>

          <h4>Try these commands</h4>
          <div v-for="c in current.cmds" :key="c.c" class="dlg-cmd">
            <div>
              <code><span class="ps">$</span> {{ c.c }}</code>
              <small>{{ c.n }}</small>
            </div>
            <q-btn
              flat
              round
              dense
              icon="content_copy"
              class="icon-btn"
              aria-label="Copy"
              @click="copyText(c.c, 'Command copied')"
            />
          </div>

          <div class="dlg-tip">
            <q-icon name="lightbulb" size="22px" />
            <div>
              <strong>Common mistake</strong>
              <p>{{ current.mistake }}</p>
            </div>
          </div>
        </div>

        <div class="dlg-foot">
          <q-btn
            flat
            no-caps
            icon="arrow_back"
            label="Previous"
            class="btn-ghost-flat"
            :disable="activeTopic === 0"
            @click="stepTopic(-1)"
          />
          <q-btn
            flat
            no-caps
            icon-right="arrow_forward"
            label="Next"
            class="btn-ghost-flat"
            :disable="activeTopic === topics.length - 1"
            @click="stepTopic(1)"
          />
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const pdfUrl = '/learning/2_Linux_Server_Hardening.pdf'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const L = (t, text = '') => ({ t, text })
let alive = true

/* ------------------------------------------------------------------ */
/* Static content                                                      */
/* ------------------------------------------------------------------ */
const sections = [
  { id: 'overview', label: 'Overview', icon: 'layers' },
  { id: 'topics', label: 'Modules', icon: 'menu_book' },
  { id: 'lab', label: 'Terminal lab', icon: 'terminal' },
  { id: 'tools', label: 'Workbench', icon: 'tune' },
  { id: 'checklist', label: 'Checklist', icon: 'checklist' },
  { id: 'commands', label: 'Commands', icon: 'code' },
  { id: 'quiz', label: 'Quiz', icon: 'quiz' },
  { id: 'pdf', label: 'PDF', icon: 'picture_as_pdf' },
]

const principles = [
  {
    icon: 'lock',
    title: 'Restrict access',
    text: 'Least privilege, secure authentication, and controlled administrative access.',
  },
  {
    icon: 'system_update',
    title: 'Keep systems updated',
    text: 'Apply security patches and remove software and services that are not needed.',
  },
  {
    icon: 'visibility',
    title: 'Monitor and protect',
    text: 'Configure firewall rules, read the logs, and watch system activity.',
  },
]

const layers = [
  {
    key: 'net',
    name: 'Network perimeter',
    short: 'Network',
    icon: 'lan',
    r: 140,
    headline: 'Control what can reach the server',
    text: 'The firewall is the first door. Default deny on all incoming traffic, then open only the ports you really need, such as SSH and HTTPS.',
    tools: ['UFW', 'nftables', 'default deny'],
  },
  {
    key: 'access',
    name: 'Identity and access',
    short: 'Access',
    icon: 'vpn_key',
    r: 115,
    headline: 'Know who is logging in, and how',
    text: 'SSH keys instead of passwords, no direct root login, and limited sudo. Every account has only the privileges it needs.',
    tools: ['SSH keys', 'sshd_config', 'sudoers'],
  },
  {
    key: 'host',
    name: 'Host configuration',
    short: 'Host',
    icon: 'dns',
    r: 90,
    headline: 'Keep the operating system tight',
    text: 'Regular updates, correct file permissions, and reviewing SUID/SGID files so there are no old holes or excess privilege.',
    tools: ['apt upgrade', 'chmod', 'SUID audit'],
  },
  {
    key: 'app',
    name: 'Application confinement',
    short: 'Apps',
    icon: 'verified_user',
    r: 65,
    headline: 'Limit the damage of a compromised app',
    text: 'Even if a service is compromised, AppArmor stops it from acting beyond its assigned profile.',
    tools: ['AppArmor', 'enforce mode', 'profiles'],
  },
  {
    key: 'logs',
    name: 'Logging and monitoring',
    short: 'Logs',
    icon: 'manage_search',
    r: 40,
    headline: 'Notice trouble early',
    text: 'Logs are how you learn someone is trying to get in. Review auth.log and the journal regularly.',
    tools: ['journalctl', 'auth.log', 'fail2ban'],
  },
]

const topics = [
  {
    title: 'Security Principles and Threat Modeling',
    group: 'Foundations',
    level: 'Beginner',
    icon: 'policy',
    tags: ['Risk', 'Threats'],
    description:
      'Identify assets, possible threats, vulnerabilities, and the right security controls.',
    why: 'Before you touch any config file, first know what you are protecting and from whom. Threat modeling is a list of assets (data, services, credentials), possible attackers, and the paths they might take. Then you choose controls that close the most likely paths first.',
    points: [
      'Assets: what would hurt if lost or leaked?',
      'Threats: bots, insiders, or simple mistakes',
      'Vulnerabilities: weak passwords, open ports, old packages',
      'Controls: preventive, detective, and corrective',
      'CIA triad: confidentiality, integrity, availability',
    ],
    cmds: [
      { c: 'sudo ss -tulpn', n: 'List every listening service. This is your attack surface.' },
      {
        c: 'systemctl list-unit-files --state=enabled',
        n: 'See what starts automatically on every boot.',
      },
    ],
    mistake: 'Installing many security tools before knowing what actually needs to be protected.',
  },
  {
    title: 'Principle of Least Privilege',
    group: 'Access',
    level: 'Beginner',
    icon: 'admin_panel_settings',
    tags: ['Permissions', 'Access'],
    description: 'Give users and services only the permissions they need.',
    why: 'If every account and service holds only what it truly needs, damage is smaller when something is compromised. The web server should not run as root, and a developer does not always need full sudo.',
    points: [
      'Run services under their own system user',
      'Use sudo only for specific commands when possible',
      'Remove access for people who no longer need it',
      'Regularly review who has admin rights',
    ],
    cmds: [
      { c: 'sudo -l', n: 'Show which commands you can run with sudo.' },
      { c: 'id', n: 'Show the uid, gid, and groups of the current user.' },
      { c: 'sudo visudo', n: 'Safely edit the sudoers file, with a syntax check.' },
    ],
    mistake:
      'Using chmod 777 just to make a permission error go away, instead of fixing ownership or groups.',
  },
  {
    title: 'User and Group Security Policies',
    group: 'Access',
    level: 'Beginner',
    icon: 'groups',
    tags: ['Users', 'Groups'],
    description: 'Manage accounts, groups, passwords, and administrative privileges.',
    why: 'Every person and service should have its own account so it is clear who did what. Groups give access to a set of users without changing every file. Password policy and locking old accounts close forgotten doors.',
    points: [
      'No shared accounts',
      'Lock or remove accounts of people who have left',
      'Use groups for shared access',
      'Set password aging with chage',
    ],
    cmds: [
      { c: 'sudo adduser deploy', n: 'Create a new user with a home directory.' },
      {
        c: 'sudo usermod -aG sudo deploy',
        n: 'Add to the sudo group. The -a is important so other groups are not wiped.',
      },
      { c: 'sudo passwd -l olduser', n: 'Lock the account password.' },
      { c: 'sudo chage -l tj', n: 'View the password aging policy.' },
    ],
    mistake: 'Using usermod -G without -a, which removes the user from every other group.',
  },
  {
    title: 'SUID, SGID, and Sticky Bit Permissions',
    group: 'System',
    level: 'Intermediate',
    icon: 'folder_special',
    tags: ['File security', 'Linux'],
    description: 'Understand special permissions and their effect on security.',
    why: "SUID runs a file with the owner's privileges (for example, passwd running as root). SGID uses the file's group or inherits the group inside a directory. The sticky bit on a shared directory like /tmp prevents users from deleting each other's files. A bad SUID binary is an easy path to root.",
    points: [
      'SUID: s in the owner execute position (4xxx)',
      'SGID: s in the group execute position (2xxx)',
      'Sticky: t in the others execute position (1xxx)',
      'Regularly audit all SUID/SGID files',
      'Compare against a known list to spot anything odd',
    ],
    cmds: [
      { c: 'find / -perm -4000 -type f 2>/dev/null', n: 'Find all SUID files.' },
      { c: 'ls -ld /tmp', n: 'Should end with a t (drwxrwxrwt).' },
      { c: 'sudo chmod u-s /path/to/file', n: 'Remove the SUID bit.' },
    ],
    mistake: 'Putting SUID on a shell script or an editor, which gives root access to anyone.',
  },
  {
    title: 'SSH Key-Based Authentication',
    group: 'Access',
    level: 'Intermediate',
    icon: 'vpn_key',
    tags: ['SSH', 'Authentication'],
    description: 'Use public-key authentication instead of passwords alone for remote access.',
    why: 'An SSH key has two parts: a private key that stays with you and a public key placed on the server. It cannot be guessed like a password, and it cannot be broken by brute force. Protect the private key with a passphrase.',
    points: [
      'Create an ed25519 key',
      'Place the public key in ~/.ssh/authorized_keys',
      'Never share the private key',
      'Test key login before turning off password login',
    ],
    cmds: [
      { c: 'ssh-keygen -t ed25519 -C "tj@laptop"', n: 'Create a modern key pair.' },
      { c: 'ssh-copy-id tj@server', n: 'Place the public key on the server.' },
      { c: 'ssh -i ~/.ssh/id_ed25519 tj@server', n: 'Log in with a specific key.' },
    ],
    mistake:
      'Turning off password login before confirming the key works, locking yourself out of your own server.',
  },
  {
    title: 'SSH Server Configuration and Access Restrictions',
    group: 'Access',
    level: 'Intermediate',
    icon: 'terminal',
    tags: ['Remote access', 'sshd'],
    description: 'Review SSH settings and limit who can connect.',
    why: '/etc/ssh/sshd_config decides who can get in and how. Important settings are PermitRootLogin no, PasswordAuthentication no, AllowUsers for an allow-list, and MaxAuthTries to limit attempts.',
    points: [
      'PermitRootLogin no',
      'PasswordAuthentication no once keys are working',
      'AllowUsers for specific accounts',
      'MaxAuthTries 3 and ClientAliveInterval for idle sessions',
      'Changing the port only reduces noise, not real risk',
    ],
    cmds: [
      { c: 'sudo sshd -t', n: 'Check the config syntax before reloading.' },
      {
        c: 'sudo systemctl reload ssh',
        n: 'Apply the new config without cutting the current session.',
      },
      { c: 'sudo sshd -T | grep -i permitroot', n: 'See the actual effective value.' },
    ],
    mistake:
      'Reloading the SSH config without a second open session as a safety net if something goes wrong.',
  },
  {
    title: 'Host-Based Firewall Configuration',
    group: 'Network',
    level: 'Intermediate',
    icon: 'local_fire_department',
    tags: ['Firewall', 'Network'],
    description: 'Control incoming and outgoing network traffic with firewall policies.',
    why: 'A host firewall sits on the server itself, so it protects the host no matter what is on the surrounding network. The right approach is deny by default, allow only what is needed, and list every rule so it is easy to review.',
    points: [
      'Default deny incoming',
      'Allow only the services you actually run',
      'Limit the source IP when possible',
      'Review the rules whenever a new service is added',
    ],
    cmds: [
      { c: 'sudo ss -tulpn', n: 'Find which ports are actually open.' },
      { c: 'sudo ufw status verbose', n: 'See the current firewall policy and rules.' },
    ],
    mistake:
      'Opening a database port (3306, 5432) to the whole internet instead of only the application server.',
  },
  {
    title: 'UFW Rules and Default Policies',
    group: 'Network',
    level: 'Beginner',
    icon: 'security',
    tags: ['UFW', 'Rules'],
    description: 'Configure the Ubuntu Firewall and allow only the services you need.',
    why: 'UFW (Uncomplicated Firewall) is a simple front end to netfilter. Set the default policy first, add SSH, and only then enable it. The limit rule automatically blocks an IP that opens too many connections in a short time.',
    points: [
      'Default: deny incoming, allow outgoing',
      'Allow SSH before enabling',
      'ufw limit for brute-force protection',
      'ufw status numbered to delete rules easily',
    ],
    cmds: [
      { c: 'sudo ufw default deny incoming', n: 'Block all incoming traffic as a starting point.' },
      { c: 'sudo ufw allow 22/tcp', n: 'Allow SSH.' },
      { c: 'sudo ufw limit ssh', n: 'Allow SSH but with a rate limit.' },
      { c: 'sudo ufw enable', n: 'Turn the firewall on.' },
    ],
    mistake:
      'Enabling UFW on a remote server before allowing SSH, which cuts off your own connection.',
  },
  {
    title: 'Netfilter and nftables Fundamentals',
    group: 'Network',
    level: 'Advanced',
    icon: 'lan',
    tags: ['Netfilter', 'nftables'],
    description: 'Study the Linux packet-filtering framework and the basics of nftables.',
    why: 'Netfilter is the part of the kernel that filters packets. UFW and iptables are only front ends to it, and nftables is the modern replacement with a single syntax. Rules are organized into tables, chains, and rules, and a chain is attached to a hook such as input.',
    points: [
      'Table: container for chains (inet for IPv4 and IPv6)',
      'Chain: list of rules with a hook and default policy',
      'Rule: condition and action (accept, drop)',
      'Rules disappear on reboot if they are not saved',
    ],
    cmds: [
      { c: 'sudo nft list ruleset', n: 'Show the full active ruleset.' },
      { c: 'sudo nft add table inet filter', n: 'Create a table.' },
      {
        c: "sudo nft add chain inet filter input '{ type filter hook input priority 0; policy drop; }'",
        n: 'Create an input chain with default drop.',
      },
    ],
    mistake: 'Mixing UFW and direct nft rules without knowing which tool owns the ruleset.',
  },
  {
    title: 'AppArmor Profiles and Enforcement',
    group: 'System',
    level: 'Advanced',
    icon: 'verified_user',
    tags: ['AppArmor', 'MAC'],
    description: 'Mandatory access control to limit what an application can do.',
    why: 'Normal permissions are based on the user. AppArmor is based on the program: each profile lists which files, capabilities, and network access an app is allowed. Enforce mode blocks violations; complain mode only logs them, which is useful while building a profile.',
    points: [
      'Enforce: blocks and logs',
      'Complain: logs only, for testing',
      'Profiles live in /etc/apparmor.d/',
      'Enabled by default on Ubuntu',
    ],
    cmds: [
      { c: 'sudo aa-status', n: 'Show profiles and their modes.' },
      { c: 'sudo aa-complain /etc/apparmor.d/usr.sbin.nginx', n: 'Put into complain mode.' },
      { c: 'sudo aa-enforce /etc/apparmor.d/usr.sbin.nginx', n: 'Put back into enforce mode.' },
    ],
    mistake:
      'Disabling AppArmor instead of fixing the profile when a legitimate action is blocked.',
  },
  {
    title: 'Security Updates and Patch Management',
    group: 'System',
    level: 'Beginner',
    icon: 'system_update_alt',
    tags: ['Updates', 'Patching'],
    description: 'Keep packages up to date and apply security fixes responsibly.',
    why: 'Most successful attacks use known holes that already have a patch. Regular updates and unattended-upgrades for security fixes are one of the cheapest ways to lower risk.',
    points: [
      'apt update refreshes the list; apt upgrade installs',
      'Turn on unattended-upgrades for security',
      'Reboot when there is a new kernel',
      'Try large updates on staging first',
    ],
    cmds: [
      { c: 'sudo apt update && sudo apt upgrade', n: 'Refresh and install updates.' },
      { c: 'sudo apt install unattended-upgrades', n: 'Automatic security updates.' },
      { c: 'sudo dpkg-reconfigure --priority=low unattended-upgrades', n: 'Enable auto updates.' },
    ],
    mistake:
      'Running only apt update and thinking you are done, even though the upgrades are not installed yet.',
  },
  {
    title: 'Logging, Auditing, and Security Monitoring',
    group: 'System',
    level: 'Intermediate',
    icon: 'manage_search',
    tags: ['Logs', 'Monitoring'],
    description: 'Review logs and system activity to spot unusual events.',
    why: 'You cannot protect what you cannot see. journald and /var/log/auth.log record logins and sudo use. Repeated Failed password lines from one IP are a sign of brute force that fail2ban can block.',
    points: [
      'auth.log: logins, sudo, and SSH',
      'journalctl for all services',
      'last and lastb for login history',
      'fail2ban to automatically ban IPs',
      'Ship logs off the server when possible',
    ],
    cmds: [
      { c: 'sudo journalctl -u ssh -n 50', n: 'Last 50 lines from the SSH service.' },
      { c: 'sudo grep "Failed password" /var/log/auth.log', n: 'Find failed logins.' },
      { c: 'last -n 10', n: 'Last 10 successful logins.' },
    ],
    mistake: 'Never reading the logs until an incident has already happened.',
  },
].map((t, i) => ({ ...t, idx: i }))

const groups = ['All', 'Foundations', 'Access', 'Network', 'System']
const topicFilter = ref('All')
const filteredTopics = computed(() =>
  topicFilter.value === 'All' ? topics : topics.filter((t) => t.group === topicFilter.value),
)

const commands = [
  {
    cat: 'System',
    title: 'Check system information',
    description: 'Display the current Ubuntu and kernel information.',
    command: 'uname -a',
  },
  {
    cat: 'System',
    title: 'Check available package updates',
    description: 'Refresh the local package index.',
    command: 'sudo apt update',
  },
  {
    cat: 'System',
    title: 'List upgradable packages',
    description: 'See which installed packages have newer versions.',
    command: 'apt list --upgradable',
  },
  {
    cat: 'System',
    title: 'Find SUID binaries',
    description: 'Locate files that run with their owner\u2019s privileges.',
    command: 'find / -perm -4000 -type f 2>/dev/null',
  },
  {
    cat: 'System',
    title: 'Check AppArmor status',
    description: 'Review AppArmor profiles and their enforcement modes.',
    command: 'sudo aa-status',
  },
  {
    cat: 'Users',
    title: 'Review local user accounts',
    description: 'Display account entries from the local user database.',
    command: 'getent passwd',
  },
  {
    cat: 'Users',
    title: 'Check who is in the sudo group',
    description: 'List accounts with administrative rights.',
    command: 'getent group sudo',
  },
  {
    cat: 'Users',
    title: 'Show your identity',
    description: 'Print uid, gid, and group memberships.',
    command: 'id',
  },
  {
    cat: 'SSH',
    title: 'Check SSH service status',
    description: 'Inspect the status of the SSH service.',
    command: 'sudo systemctl status ssh',
  },
  {
    cat: 'SSH',
    title: 'Create an ed25519 key pair',
    description: 'Generate a modern SSH key for key-based login.',
    command: 'ssh-keygen -t ed25519',
  },
  {
    cat: 'SSH',
    title: 'Check root login setting',
    description: 'Confirm whether root can log in over SSH.',
    command: 'grep -i permitrootlogin /etc/ssh/sshd_config',
  },
  {
    cat: 'Firewall',
    title: 'Review firewall status',
    description: 'Check whether UFW is active and inspect its rules.',
    command: 'sudo ufw status verbose',
  },
  {
    cat: 'Firewall',
    title: 'Deny incoming by default',
    description: 'Start from a closed door and open only what you need.',
    command: 'sudo ufw default deny incoming',
  },
  {
    cat: 'Firewall',
    title: 'List listening ports',
    description: 'Show which services are listening on which addresses.',
    command: 'ss -tulpn',
  },
  {
    cat: 'Logs',
    title: 'Review recent system logs',
    description: 'Display recent system journal entries.',
    command: 'sudo journalctl -n 10',
  },
  {
    cat: 'Logs',
    title: 'Find failed SSH logins',
    description: 'Search the auth log for failed password attempts.',
    command: 'sudo grep "Failed password" /var/log/auth.log',
  },
  {
    cat: 'Logs',
    title: 'See recent logins',
    description: 'Show the latest successful logins on this machine.',
    command: 'last',
  },
]
const cmdCats = ['All', 'System', 'Users', 'SSH', 'Firewall', 'Logs']
const cmdFilter = ref('All')
const filteredCommands = computed(() =>
  cmdFilter.value === 'All' ? commands : commands.filter((c) => c.cat === cmdFilter.value),
)

/* ------------------------------------------------------------------ */
/* Page chrome: progress bar, scrolling, copy                          */
/* ------------------------------------------------------------------ */
const scrollPct = ref(0)
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight
  scrollPct.value = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0
}
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
async function copyText(text, msg = 'Copied') {
  try {
    await navigator.clipboard.writeText(text)
    $q.notify({ type: 'positive', message: msg, position: 'top', timeout: 1500 })
  } catch {
    $q.notify({
      type: 'warning',
      message: 'Clipboard access unavailable. Please copy it manually.',
      position: 'top',
    })
  }
}
function glow(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', e.clientX - r.left + 'px')
  el.style.setProperty('--my', e.clientY - r.top + 'px')
}

/* ------------------------------------------------------------------ */
/* Hero: matrix-style rain + self-typing terminal + counters           */
/* ------------------------------------------------------------------ */
const rainCanvas = ref(null)
let rainId = 0
let rainResize = null
function startRain() {
  const c = rainCanvas.value
  if (!c || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const ctx = c.getContext('2d')
  const size = 16
  const glyphs = '01{}[]<>/$#%&*=+-'.split('')
  let w = 0,
    h = 0,
    cols = 0,
    drops = []
  rainResize = () => {
    const r = c.parentElement.getBoundingClientRect()
    w = c.width = r.width
    h = c.height = r.height
    cols = Math.ceil(w / size)
    drops = Array.from({ length: cols }, () => Math.random() * (h / size))
  }
  rainResize()
  window.addEventListener('resize', rainResize)
  let last = 0
  const frame = (t) => {
    rainId = requestAnimationFrame(frame)
    if (t - last < 70) return
    last = t
    ctx.fillStyle = 'rgba(12, 26, 43, 0.17)'
    ctx.fillRect(0, 0, w, h)
    ctx.font = size + 'px "IBM Plex Mono", monospace'
    for (let i = 0; i < cols; i++) {
      ctx.fillStyle =
        Math.random() > 0.975 ? 'rgba(255, 179, 71, 0.95)' : 'rgba(111, 211, 255, 0.5)'
      ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], i * size, drops[i] * size)
      if (drops[i] * size > h && Math.random() > 0.975) drops[i] = 0
      drops[i] += 1
    }
  }
  rainId = requestAnimationFrame(frame)
}

const heroScript = [
  {
    cmd: 'sudo ufw status verbose',
    out: [
      L('ok', 'Status: active'),
      L('out', 'Default: deny (incoming), allow (outgoing)'),
      L('out', '22/tcp                     ALLOW IN    Anywhere'),
    ],
  },
  { cmd: 'grep -i permitroot /etc/ssh/sshd_config', out: [L('ok', 'PermitRootLogin no')] },
  {
    cmd: 'sudo aa-status | head -n 2',
    out: [L('out', 'apparmor module is loaded.'), L('ok', '38 profiles are in enforce mode.')],
  },
  {
    cmd: 'apt list --upgradable 2>/dev/null | wc -l',
    out: [L('warn', '4 packages can be upgraded')],
  },
  {
    cmd: 'sudo apt upgrade -y',
    out: [L('out', 'Unpacking openssh-server ...'), L('ok', 'Security updates installed.')],
  },
]
const heroLines = ref([])
const heroTyping = ref('')
async function heroLoop() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroLines.value = heroScript.flatMap((s) => [L('cmd', s.cmd), ...s.out])
    return
  }
  while (alive) {
    for (const step of heroScript) {
      for (const ch of step.cmd) {
        if (!alive) return
        heroTyping.value += ch
        await sleep(38 + Math.random() * 40)
      }
      await sleep(260)
      heroLines.value.push(L('cmd', step.cmd))
      heroTyping.value = ''
      for (const o of step.out) {
        await sleep(260)
        heroLines.value.push(o)
      }
      await sleep(1100)
      while (heroLines.value.length > 11) heroLines.value.shift()
    }
    await sleep(2200)
    heroLines.value = []
  }
}

const glance = reactive({ modules: 0, commands: 0, labs: 0, checks: 0 })
function countUp() {
  const targets = {
    modules: topics.length,
    commands: commands.length,
    labs: 3,
    checks: checklist.length,
  }
  const t0 = performance.now()
  const step = (now) => {
    const p = Math.min(1, (now - t0) / 1400)
    const e = 1 - Math.pow(1 - p, 3)
    for (const k in targets) glance[k] = Math.round(targets[k] * e)
    if (p < 1 && alive) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/* ------------------------------------------------------------------ */
/* Defense in depth                                                    */
/* ------------------------------------------------------------------ */
const activeLayer = ref(0)
const layerPaused = ref(false)
let layerTimer = 0
function pickLayer(i) {
  activeLayer.value = i
}

/* ------------------------------------------------------------------ */
/* Topic dialog                                                        */
/* ------------------------------------------------------------------ */
const dlg = ref(false)
const activeTopic = ref(0)
const current = computed(() => topics[activeTopic.value])
function openTopic(i) {
  activeTopic.value = i
  dlg.value = true
}
function stepTopic(d) {
  activeTopic.value = Math.min(topics.length - 1, Math.max(0, activeTopic.value + d))
}

/* ------------------------------------------------------------------ */
/* Terminal lab                                                        */
/* ------------------------------------------------------------------ */
const fw = reactive({ active: false, defIn: 'allow', defOut: 'allow', rules: [] })
const ran = reactive({ suid: false, authlog: false, keygen: false })
const labLines = ref([])
const labInput = ref('')
const labBusy = ref(false)
const labEl = ref(null)
const labInputEl = ref(null)
const cmdHistory = []
let hIdx = 0

const quickCmds = [
  'help',
  'whoami',
  'ss -tulpn',
  'sudo ufw status',
  'ls -l /usr/bin/passwd',
  'sudo aa-status',
  'last',
  'clear',
]
const knownCmds = [
  'help',
  'clear',
  'whoami',
  'id',
  'hostname',
  'uname -a',
  'lsb_release -a',
  'umask',
  'history',
  'ss -tulpn',
  'last',
  'getent passwd',
  'getent group sudo',
  'ls -l /usr/bin/passwd',
  'ls -l /etc/shadow',
  'ls -ld /tmp',
  'find / -perm -4000 -type f 2>/dev/null',
  'sudo aa-status',
  'sudo journalctl -n 10',
  'sudo grep "Failed password" /var/log/auth.log',
  'grep -i permitrootlogin /etc/ssh/sshd_config',
  'ssh-keygen -t ed25519',
  'sudo systemctl status ssh',
  'sudo apt update',
  'apt list --upgradable',
  'sudo apt upgrade',
  'sudo ufw status',
  'sudo ufw status verbose',
  'sudo ufw enable',
  'sudo ufw disable',
  'sudo ufw reset',
  'sudo ufw default deny incoming',
  'sudo ufw default allow outgoing',
  'sudo ufw allow 22/tcp',
  'sudo ufw allow ssh',
  'sudo ufw allow 443/tcp',
  'sudo ufw limit ssh',
  'sudo ufw deny 23/tcp',
]

function resetLab() {
  fw.active = false
  fw.defIn = 'allow'
  fw.defOut = 'allow'
  fw.rules = []
  ran.suid = ran.authlog = ran.keygen = false
  cmdHistory.length = 0
  hIdx = 0
  labLines.value = [
    L('dim', 'Ubuntu 24.04 LTS (simulated). Firewall is OFF and defaults are permissive.'),
    L('dim', 'Type "help" to list commands. Tab completes, arrow keys browse history.'),
    L('out', ''),
  ]
}

function normPort(x) {
  if (!x) return null
  const map = {
    ssh: '22/tcp',
    http: '80/tcp',
    https: '443/tcp',
    ftp: '21/tcp',
    telnet: '23/tcp',
    mysql: '3306/tcp',
    postgresql: '5432/tcp',
  }
  if (map[x]) return map[x]
  if (/^\d{1,5}$/.test(x)) return x
  if (/^\d{1,5}\/(tcp|udp)$/.test(x)) return x
  return null
}

function ufwStatus(verbose) {
  if (!fw.active) return [L('out', 'Status: inactive')]
  const out = [L('ok', 'Status: active')]
  if (verbose) {
    out.push(L('out', 'Logging: on (low)'))
    out.push(
      L('out', `Default: ${fw.defIn} (incoming), ${fw.defOut} (outgoing), disabled (routed)`),
    )
    out.push(L('out', 'New profiles: skip'))
  }
  out.push(
    L('out', ''),
    L('dim', 'To                         Action      From'),
    L('dim', '--                         ------      ----'),
  )
  fw.rules.forEach((r) => {
    const act = r.action.toUpperCase() + (verbose ? ' IN' : '')
    out.push(L('out', r.port.padEnd(27) + act.padEnd(12) + 'Anywhere'))
  })
  if (!fw.rules.length) out.push(L('dim', '(no rules yet)'))
  return out
}

function ufw(a) {
  const p = a.split(' ').filter(Boolean)
  const sub = p[0]
  if (sub === 'status') return ufwStatus(p[1] === 'verbose' || p[1] === 'numbered')
  if (sub === 'enable') {
    const out = []
    if (!fw.rules.some((r) => r.port === '22/tcp' && r.action !== 'deny')) {
      out.push(
        L('warn', 'Warning: no rule allows SSH (22/tcp). A remote session could be cut off.'),
      )
    }
    fw.active = true
    out.push(L('ok', 'Firewall is active and enabled on system startup'))
    return out
  }
  if (sub === 'disable') {
    fw.active = false
    return [L('warn', 'Firewall stopped and disabled on system startup')]
  }
  if (sub === 'reset') {
    fw.active = false
    fw.defIn = 'allow'
    fw.defOut = 'allow'
    fw.rules = []
    return [L('out', 'Resetting all rules to installed defaults.')]
  }
  if (sub === 'default') {
    const act = p[1]
    const dir = p[2]
    if (!['allow', 'deny', 'reject'].includes(act) || !['incoming', 'outgoing'].includes(dir)) {
      return [L('err', 'ERROR: usage: ufw default allow|deny|reject incoming|outgoing')]
    }
    if (dir === 'incoming') fw.defIn = act
    else fw.defOut = act
    return [
      L('ok', `Default ${dir} policy changed to '${act}'`),
      L('dim', '(be sure to update your rules accordingly)'),
    ]
  }
  if (['allow', 'deny', 'limit'].includes(sub)) {
    const port = normPort(p[1])
    if (!port) return [L('err', 'ERROR: Bad port. Try: 22/tcp, 443, ssh, https')]
    fw.rules = fw.rules.filter((r) => r.port !== port)
    fw.rules.push({ port, action: sub })
    return [L('ok', 'Rules updated')]
  }
  if (sub === 'delete') {
    const port = normPort(p[2])
    const before = fw.rules.length
    fw.rules = fw.rules.filter((r) => !(r.port === port && r.action === p[1]))
    return before === fw.rules.length
      ? [L('warn', 'Could not delete non-existent rule')]
      : [L('ok', 'Rule deleted')]
  }
  return [
    L(
      'err',
      'ERROR: Invalid syntax. Try: status, enable, disable, default, allow, deny, limit, delete, reset',
    ),
  ]
}

function exec(raw) {
  const c = raw.replace(/\s+/g, ' ').trim()
  const bare = c.replace(/^sudo /, '')

  if (bare === 'help') {
    return [
      L('ok', 'Available commands'),
      L('out', '  whoami, id, hostname, uname -a, lsb_release -a, umask, history'),
      L('out', '  ss -tulpn                 list listening ports'),
      L('out', '  ufw status|enable|disable|reset|default|allow|deny|limit|delete'),
      L('out', '  systemctl status ssh      check the SSH service'),
      L('out', '  apt update | apt list --upgradable | apt upgrade'),
      L('out', '  getent passwd | getent group sudo'),
      L('out', '  ls -l /usr/bin/passwd     see a SUID binary'),
      L('out', '  find / -perm -4000 ...    audit SUID files'),
      L('out', '  aa-status                 AppArmor profiles'),
      L('out', '  journalctl -n 10 | last   recent activity'),
      L('out', '  grep "Failed password" /var/log/auth.log'),
      L('out', '  ssh-keygen -t ed25519     generate a key pair'),
      L('out', '  clear'),
    ]
  }
  if (bare === 'whoami') return [L('out', 'tj')]
  if (bare === 'id')
    return [L('out', 'uid=1000(tj) gid=1000(tj) groups=1000(tj),27(sudo),100(users)')]
  if (bare === 'hostname') return [L('out', 'ubuntu-server')]
  if (bare === 'umask')
    return [L('out', '0022'), L('dim', 'New files get 644, new directories 755.')]
  if (bare === 'uname -a')
    return [L('out', 'Linux ubuntu-server 6.8.0-45-generic #45-Ubuntu SMP x86_64 GNU/Linux')]
  if (bare === 'lsb_release -a')
    return [
      L('out', 'Distributor ID:\tUbuntu'),
      L('out', 'Description:\tUbuntu 24.04 LTS'),
      L('out', 'Release:\t24.04'),
      L('out', 'Codename:\tnoble'),
    ]
  if (bare === 'history')
    return cmdHistory.length
      ? cmdHistory.map((h, i) => L('out', `${String(i + 1).padStart(4)}  ${h}`))
      : [L('dim', '(empty)')]

  if (bare === 'ss -tulpn') {
    return [
      L('dim', 'Netid State  Local Address:Port   Process'),
      L('out', 'tcp   LISTEN 0.0.0.0:22          users:(("sshd"))'),
      L('out', 'tcp   LISTEN 0.0.0.0:80          users:(("nginx"))'),
      L('warn', 'tcp   LISTEN 0.0.0.0:3306        users:(("mysqld"))'),
      L(
        'dim',
        'Note: MySQL listens on every interface. Bind it to 127.0.0.1 or block 3306 in the firewall.',
      ),
    ]
  }
  if (bare.startsWith('ufw')) return ufw(bare.slice(3).trim())

  if (bare === 'systemctl status ssh') {
    return [
      L('ok', '\u25cf ssh.service - OpenBSD Secure Shell server'),
      L('out', '     Loaded: loaded (/usr/lib/systemd/system/ssh.service; enabled)'),
      L('ok', '     Active: active (running) since Sun 2026-10-25 08:12:41 PST'),
      L('out', '   Main PID: 842 (sshd)'),
    ]
  }
  if (bare === 'apt update') {
    return [
      L('out', 'Hit:1 http://archive.ubuntu.com/ubuntu noble InRelease'),
      L('out', 'Get:2 http://security.ubuntu.com/ubuntu noble-security InRelease [126 kB]'),
      L('out', 'Fetched 126 kB in 1s'),
      L('warn', "4 packages can be upgraded. Run 'apt list --upgradable' to see them."),
    ]
  }
  if (bare === 'apt list --upgradable') {
    return [
      L('dim', 'Listing... Done'),
      L('out', 'openssh-server/noble-security 1:9.6p1-3ubuntu13.5'),
      L('out', 'libssl3t64/noble-security 3.0.13-0ubuntu3.4'),
      L('out', 'linux-image-generic/noble-security 6.8.0.48'),
      L('out', 'sudo/noble-security 1.9.15p5-3ubuntu5.1'),
    ]
  }
  if (bare === 'apt upgrade' || bare === 'apt upgrade -y') {
    return [
      L('out', 'Reading package lists... Done'),
      L('out', 'The following packages will be upgraded: 4'),
      L('out', 'Unpacking openssh-server ...'),
      L('out', 'Setting up sudo ...'),
      L('ok', '4 upgraded, 0 newly installed, 0 to remove.'),
      L('dim', 'A reboot is needed to use the new kernel.'),
    ]
  }

  if (bare === 'getent passwd') {
    return [
      L('out', 'root:x:0:0:root:/root:/bin/bash'),
      L('out', 'www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin'),
      L('out', 'sshd:x:107:65534::/run/sshd:/usr/sbin/nologin'),
      L('out', 'tj:x:1000:1000:TJ:/home/tj:/bin/bash'),
      L('out', 'deploy:x:1001:1001::/home/deploy:/bin/bash'),
      L('dim', 'Service accounts use /usr/sbin/nologin so nobody can log in as them.'),
    ]
  }
  if (bare === 'getent group sudo') return [L('out', 'sudo:x:27:tj,deploy')]

  if (bare === 'ls -l /usr/bin/passwd') {
    return [
      L('out', '-rwsr-xr-x 1 root root 59976 Nov 24  2022 /usr/bin/passwd'),
      L(
        'ok',
        'The "s" in the owner field is the SUID bit: passwd runs as root so you can change your own password.',
      ),
    ]
  }
  if (bare === 'ls -l /etc/shadow')
    return [
      L('out', '-rw-r----- 1 root shadow 1342 Oct 20 09:41 /etc/shadow'),
      L('ok', 'Password hashes: readable by root and the shadow group only.'),
    ]
  if (bare === 'ls -ld /tmp')
    return [
      L('out', 'drwxrwxrwt 14 root root 4096 Oct 25 10:02 /tmp'),
      L('ok', 'The trailing "t" is the sticky bit: users can only delete their own files here.'),
    ]

  if (bare.startsWith('find / -perm -4000')) {
    ran.suid = true
    return [
      L('out', '/usr/bin/passwd'),
      L('out', '/usr/bin/sudo'),
      L('out', '/usr/bin/chsh'),
      L('out', '/usr/bin/gpasswd'),
      L('out', '/usr/bin/mount'),
      L('warn', '/usr/local/bin/backup-helper'),
      L('dim', 'The last one is not part of a normal Ubuntu install. Investigate it.'),
    ]
  }
  if (bare === 'aa-status') {
    return [
      L('out', 'apparmor module is loaded.'),
      L('ok', '38 profiles are loaded.'),
      L('ok', '38 profiles are in enforce mode.'),
      L('out', '   /usr/sbin/mysqld'),
      L('out', '   /usr/sbin/nginx'),
      L('out', '0 profiles are in complain mode.'),
    ]
  }
  if (bare === 'journalctl -n 10') {
    return [
      L('out', 'Oct 25 09:58:12 ubuntu-server sshd[2210]: Accepted publickey for tj'),
      L('out', 'Oct 25 09:58:12 ubuntu-server systemd-logind[701]: New session 14 of user tj.'),
      L('out', 'Oct 25 10:01:03 ubuntu-server sudo[2255]: tj : COMMAND=/usr/bin/apt update'),
      L(
        'warn',
        'Oct 25 10:04:47 ubuntu-server sshd[2301]: Failed password for root from 203.0.113.50',
      ),
    ]
  }
  if (bare === 'last') {
    return [
      L('out', 'tj       pts/0   192.168.1.20   Sun Oct 25 09:58   still logged in'),
      L('out', 'tj       pts/0   192.168.1.20   Sat Oct 24 21:14 - 22:40  (01:26)'),
      L('out', 'deploy   pts/1   192.168.1.31   Fri Oct 23 15:02 - 15:19  (00:17)'),
      L('dim', 'wtmp begins Thu Oct  1 08:00:11 2026'),
    ]
  }
  if (bare.startsWith('grep') && bare.includes('Failed password')) {
    ran.authlog = true
    return [
      L(
        'warn',
        'Oct 25 10:04:47 sshd[2301]: Failed password for root from 203.0.113.50 port 51822',
      ),
      L(
        'warn',
        'Oct 25 10:04:49 sshd[2303]: Failed password for root from 203.0.113.50 port 51840',
      ),
      L(
        'warn',
        'Oct 25 10:04:52 sshd[2305]: Failed password for admin from 203.0.113.50 port 51866',
      ),
      L(
        'dim',
        'Same IP, many users, seconds apart: that is brute force. Block it, or install fail2ban.',
      ),
    ]
  }
  if (bare.startsWith('grep -i permitroot')) return [L('ok', 'PermitRootLogin no')]
  if (bare.startsWith('ssh-keygen')) {
    ran.keygen = true
    return [
      L('out', 'Generating public/private ed25519 key pair.'),
      L('out', 'Enter file in which to save the key (/home/tj/.ssh/id_ed25519):'),
      L('out', 'Enter passphrase (empty for no passphrase): ********'),
      L('ok', 'Your identification has been saved in /home/tj/.ssh/id_ed25519'),
      L('out', 'SHA256:q4r1Yk0vN2xC7mZs8dTn1Hc3bQe5JwUaF9oPLgXtRkA tj@ubuntu-server'),
      L('dim', 'Next: ssh-copy-id tj@server'),
    ]
  }
  return [
    L('err', `${c.split(' ')[0]}: command not found or not available in this lab. Try "help".`),
  ]
}

async function tickScroll() {
  await nextTick()
  if (labEl.value) labEl.value.scrollTop = labEl.value.scrollHeight
}

async function runLab(raw) {
  if (labBusy.value) return
  const cmd = (raw ?? labInput.value).trim()
  labInput.value = ''
  if (!cmd) return
  cmdHistory.push(cmd)
  hIdx = cmdHistory.length
  labLines.value.push(L('cmd', cmd))
  if (cmd === 'clear') {
    labLines.value = []
    return
  }
  labBusy.value = true
  for (const l of exec(cmd)) {
    labLines.value.push(l)
    await tickScroll()
    await sleep(34)
  }
  labBusy.value = false
  await tickScroll()
  labInputEl.value?.focus({ preventScroll: true })
}

function onLabKey(e) {
  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (hIdx > 0) labInput.value = cmdHistory[--hIdx]
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (hIdx < cmdHistory.length - 1) labInput.value = cmdHistory[++hIdx]
    else {
      hIdx = cmdHistory.length
      labInput.value = ''
    }
  } else if (e.key === 'Tab') {
    e.preventDefault()
    const hit = knownCmds.find(
      (k) => labInput.value && k.startsWith(labInput.value) && k !== labInput.value,
    )
    if (hit) labInput.value = hit
  }
}

function tryInLab(cmd) {
  scrollTo('lab')
  setTimeout(() => {
    labInput.value = cmd
    labInputEl.value?.focus({ preventScroll: true })
  }, 500)
}

const missions = computed(() => [
  {
    id: 1,
    text: 'Set default incoming policy to deny',
    hint: 'sudo ufw default deny incoming',
    done: fw.defIn === 'deny',
  },
  {
    id: 2,
    text: 'Allow SSH before enabling the firewall',
    hint: 'sudo ufw allow 22/tcp',
    done: fw.rules.some((r) => r.port === '22/tcp' && r.action !== 'deny'),
  },
  { id: 3, text: 'Turn the firewall on', hint: 'sudo ufw enable', done: fw.active },
  {
    id: 4,
    text: 'Audit SUID binaries and spot the odd one',
    hint: 'find / -perm -4000 -type f 2>/dev/null',
    done: ran.suid,
  },
  {
    id: 5,
    text: 'Look for failed SSH logins',
    hint: 'sudo grep "Failed password" /var/log/auth.log',
    done: ran.authlog,
  },
  { id: 6, text: 'Generate an ed25519 key pair', hint: 'ssh-keygen -t ed25519', done: ran.keygen },
])
const missionsDone = computed(() => missions.value.filter((m) => m.done).length)

/* ------------------------------------------------------------------ */
/* Workbench                                                           */
/* ------------------------------------------------------------------ */
const toolTabs = [
  { id: 'chmod', label: 'Permissions', icon: 'folder_special' },
  { id: 'ufw', label: 'Firewall', icon: 'local_fire_department' },
  { id: 'ssh', label: 'SSH config', icon: 'vpn_key' },
]
const tool = ref('chmod')

// chmod
const permClasses = [
  { k: 'u', n: 'Owner' },
  { k: 'g', n: 'Group' },
  { k: 'o', n: 'Others' },
]
const permBits = ['r', 'w', 'x']
const perms = reactive({
  u: { r: true, w: true, x: false },
  g: { r: true, w: false, x: false },
  o: { r: true, w: false, x: false },
})
const special = reactive({ suid: false, sgid: false, sticky: false })
const specialDefs = [
  { k: 'suid', label: 'SUID (4)' },
  { k: 'sgid', label: 'SGID (2)' },
  { k: 'sticky', label: 'Sticky (1)' },
]
const permPresets = [
  { v: '644', l: 'file' },
  { v: '600', l: 'private' },
  { v: '755', l: 'script' },
  { v: '700', l: 'home' },
  { v: '4755', l: 'SUID' },
  { v: '1777', l: '/tmp' },
  { v: '777', l: 'unsafe' },
]
const digit = (c) => (perms[c].r ? 4 : 0) + (perms[c].w ? 2 : 0) + (perms[c].x ? 1 : 0)
const octal = computed(() => {
  const sp = (special.suid ? 4 : 0) + (special.sgid ? 2 : 0) + (special.sticky ? 1 : 0)
  return (sp ? String(sp) : '') + digit('u') + digit('g') + digit('o')
})
const symbolic = computed(() => {
  const tri = (c, flag, lo, up) => {
    const p = perms[c]
    return (p.r ? 'r' : '-') + (p.w ? 'w' : '-') + (flag ? (p.x ? lo : up) : p.x ? 'x' : '-')
  }
  return (
    '-' +
    tri('u', special.suid, 's', 'S') +
    tri('g', special.sgid, 's', 'S') +
    tri('o', special.sticky, 't', 'T')
  )
})
function applyOctal(str) {
  const d = str.padStart(4, '0').split('').map(Number)
  special.suid = !!(d[0] & 4)
  special.sgid = !!(d[0] & 2)
  special.sticky = !!(d[0] & 1)
  ;['u', 'g', 'o'].forEach((c, i) => {
    perms[c].r = !!(d[i + 1] & 4)
    perms[c].w = !!(d[i + 1] & 2)
    perms[c].x = !!(d[i + 1] & 1)
  })
}
const permNotes = computed(() => {
  const n = []
  if (perms.o.w)
    n.push({
      t: 'warn',
      text: 'Anyone on the system can modify this file. Avoid world-writable files unless the sticky bit protects a shared directory.',
    })
  if (special.suid)
    n.push({
      t: 'warn',
      text: 'SUID: the file runs with its owner\u2019s privileges. If root owns it, a bug in it can become a root exploit.',
    })
  if (special.sgid)
    n.push({
      t: 'warn',
      text: 'SGID: runs with the file\u2019s group, or on a directory, new files inherit the group.',
    })
  if (special.sticky)
    n.push({
      t: 'ok',
      text: 'Sticky bit: only the file owner (or root) can delete files inside this directory.',
    })
  if (perms.u.x && perms.g.x && perms.o.x && perms.o.w)
    n.push({ t: 'warn', text: 'This is effectively chmod 777. Fix ownership or groups instead.' })
  if (!perms.g.r && !perms.g.w && !perms.o.r && !perms.o.w && perms.u.r)
    n.push({ t: 'ok', text: 'Only the owner has access. Good for private keys and secrets (600).' })
  if (!n.length)
    n.push({
      t: 'ok',
      text: 'Reasonable permissions: others cannot write, and no special bits are set.',
    })
  return n
})

// firewall simulator
const simServices = [
  { name: 'SSH', port: '22/tcp' },
  { name: 'HTTP', port: '80/tcp' },
  { name: 'HTTPS', port: '443/tcp' },
  { name: 'FTP', port: '21/tcp', risk: 'plaintext' },
  { name: 'Telnet', port: '23/tcp', risk: 'plaintext' },
  { name: 'MySQL', port: '3306/tcp', risk: 'database' },
  { name: 'PostgreSQL', port: '5432/tcp', risk: 'database' },
]
const simAllowed = reactive({
  '22/tcp': true,
  '80/tcp': false,
  '443/tcp': true,
  '21/tcp': false,
  '23/tcp': false,
  '3306/tcp': false,
  '5432/tcp': false,
})
const simActive = ref(true)
const simDefaultDeny = ref(true)
const simLevel = computed(() => {
  const risky = simServices.filter((s) => s.risk && simAllowed[s.port]).length
  if (!simActive.value)
    return {
      cls: 'bad',
      icon: 'gpp_bad',
      label: 'Exposed',
      text: 'Firewall is off. Every listening service is reachable.',
    }
  if (!simDefaultDeny.value)
    return {
      cls: 'bad',
      icon: 'gpp_bad',
      label: 'Exposed',
      text: 'Default allow means your rules do not restrict anything.',
    }
  if (risky)
    return {
      cls: 'warn',
      icon: 'gpp_maybe',
      label: 'Risky',
      text: `${risky} risky service${risky > 1 ? 's are' : ' is'} open. Restrict by source IP or close ${risky > 1 ? 'them' : 'it'}.`,
    }
  return {
    cls: 'good',
    icon: 'gpp_good',
    label: 'Hardened',
    text: 'Default deny with only the services you need.',
  }
})
const simLines = computed(() => {
  if (!simActive.value)
    return [
      { c: 'dim', text: '$ sudo ufw status' },
      { c: 'bad', text: 'Status: inactive' },
    ]
  const out = [
    { c: 'dim', text: '$ sudo ufw status verbose' },
    { c: 'good', text: 'Status: active' },
    {
      c: 'out',
      text: `Default: ${simDefaultDeny.value ? 'deny' : 'allow'} (incoming), allow (outgoing)`,
    },
    { c: 'out', text: '' },
    { c: 'dim', text: 'To                         Action      From' },
    { c: 'dim', text: '--                         ------      ----' },
  ]
  simServices
    .filter((s) => simAllowed[s.port])
    .forEach((s) => {
      out.push({
        c: s.risk ? 'warn' : 'out',
        text:
          s.port.padEnd(27) +
          'ALLOW IN'.padEnd(12) +
          'Anywhere' +
          (s.risk ? '   <- ' + s.risk : ''),
      })
    })
  if (!simServices.some((s) => simAllowed[s.port]))
    out.push({ c: 'dim', text: '(no allow rules: everything is blocked)' })
  return out
})

// ssh builder
const sshOpts = [
  {
    key: 'root',
    label: 'Disable root login',
    off: 'PermitRootLogin yes',
    on: 'PermitRootLogin no',
    why: 'Root is the first target for bots. Use a normal user and sudo.',
  },
  {
    key: 'pass',
    label: 'Disable password login',
    off: 'PasswordAuthentication yes',
    on: 'PasswordAuthentication no',
    why: 'Only keys will be accepted. Test key login first.',
  },
  {
    key: 'empty',
    label: 'Reject empty passwords',
    off: 'PermitEmptyPasswords yes',
    on: 'PermitEmptyPasswords no',
    why: 'No account should be able to log in with an empty password.',
  },
  {
    key: 'tries',
    label: 'Limit authentication attempts',
    off: 'MaxAuthTries 6',
    on: 'MaxAuthTries 3',
    why: 'Fewer attempts before the connection is cut.',
  },
  {
    key: 'x11',
    label: 'Turn off X11 forwarding',
    off: 'X11Forwarding yes',
    on: 'X11Forwarding no',
    why: 'Turn off unused features on the server.',
  },
  {
    key: 'allow',
    label: 'Allow only listed users',
    off: '# AllowUsers (not set: any valid user may try)',
    on: 'AllowUsers tj deploy',
    why: 'Whitelist of accounts that are allowed to SSH.',
  },
  {
    key: 'idle',
    label: 'Disconnect idle sessions',
    off: 'ClientAliveInterval 0',
    on: 'ClientAliveInterval 300',
    why: 'Disconnects sessions left open idle.',
  },
  {
    key: 'port',
    label: 'Change the default port',
    off: 'Port 22',
    on: 'Port 2222',
    why: 'Reduces noise in the logs, but is not real protection. Do not forget to update the firewall.',
  },
]
const sshOn = reactive(Object.fromEntries(sshOpts.map((o) => [o.key, false])))
const sshLines = computed(() => [
  { c: 'dim', text: '# /etc/ssh/sshd_config' },
  ...sshOpts.map((o) => ({ c: sshOn[o.key] ? 'good' : 'bad', text: sshOn[o.key] ? o.on : o.off })),
])
const sshText = computed(() => sshLines.value.map((l) => l.text).join('\n'))
const sshScore = computed(() =>
  Math.round((sshOpts.filter((o) => sshOn[o.key]).length / sshOpts.length) * 100),
)

/* ------------------------------------------------------------------ */
/* Checklist                                                           */
/* ------------------------------------------------------------------ */
const checklist = [
  { id: 'upd', text: 'Apply all pending updates', cmd: 'sudo apt update && sudo apt upgrade' },
  {
    id: 'auto',
    text: 'Enable automatic security updates',
    cmd: 'sudo apt install unattended-upgrades',
  },
  {
    id: 'user',
    text: 'Create a non-root admin user',
    cmd: 'sudo adduser deploy && sudo usermod -aG sudo deploy',
  },
  {
    id: 'key',
    text: 'Set up SSH key login',
    cmd: 'ssh-keygen -t ed25519 && ssh-copy-id deploy@server',
  },
  { id: 'root', text: 'Disable root login over SSH', cmd: 'PermitRootLogin no' },
  { id: 'pw', text: 'Disable SSH password authentication', cmd: 'PasswordAuthentication no' },
  {
    id: 'ufw',
    text: 'Enable UFW with default deny incoming',
    cmd: 'sudo ufw default deny incoming && sudo ufw enable',
  },
  { id: 'ports', text: 'Open only the ports you need', cmd: 'sudo ss -tulpn' },
  { id: 'aa', text: 'Confirm AppArmor is enforcing', cmd: 'sudo aa-status' },
  { id: 'suid', text: 'Audit SUID and SGID files', cmd: 'find / -perm -4000 -type f 2>/dev/null' },
  { id: 'logs', text: 'Review auth logs and add fail2ban', cmd: 'sudo apt install fail2ban' },
]
const checked = reactive({})
const RING_C = 2 * Math.PI * 54
function toggleCheck(id) {
  checked[id] = !checked[id]
  try {
    localStorage.setItem('hardening-checks', JSON.stringify(checked))
  } catch {
    /* ignore */
  }
}
function clearChecks() {
  checklist.forEach((c) => {
    checked[c.id] = false
  })
  try {
    localStorage.removeItem('hardening-checks')
  } catch {
    /* ignore */
  }
}
const doneCount = computed(() => checklist.filter((c) => checked[c.id]).length)
const pct = computed(() => doneCount.value / checklist.length)
const ringOffset = computed(() => RING_C * (1 - pct.value))
const grade = computed(() => {
  const p = pct.value
  if (p === 1)
    return {
      label: 'Hardened',
      text: 'Basic hardening is complete. Keep up regular updates and log reviews.',
    }
  if (p >= 0.6)
    return { label: 'Solid foundation', text: 'Almost there. Finish the remaining steps.' }
  if (p >= 0.3)
    return { label: 'Getting there', text: 'Good start. Prioritize SSH and the firewall.' }
  return { label: 'Wide open', text: 'Start with updates, SSH keys, and the firewall.' }
})

/* ------------------------------------------------------------------ */
/* Quiz                                                                */
/* ------------------------------------------------------------------ */
const quiz = [
  {
    q: 'You are about to enable UFW on a remote server. What should you do first?',
    options: [
      'Reboot the server',
      'Allow SSH (22/tcp)',
      'Delete all existing rules',
      'Disable AppArmor',
    ],
    answer: 1,
    why: 'If you do not allow SSH before enabling UFW, you cut off your own connection and cannot get back in remotely.',
  },
  {
    q: 'What does an "s" in the owner execute position (-rwsr-xr-x) mean?',
    options: [
      'The file is a symbolic link',
      'The file is encrypted',
      'The SUID bit is set',
      'The file is shared with everyone',
    ],
    answer: 2,
    why: "SUID runs the file with the owner's privileges. That is why SUID files should be audited regularly.",
  },
  {
    q: 'Which SSH setting stops attackers from logging in directly as the administrator account?',
    options: ['Port 2222', 'X11Forwarding no', 'PermitRootLogin no', 'MaxAuthTries 6'],
    answer: 2,
    why: 'PermitRootLogin no stops direct root login. Changing the port only reduces noise, not real risk.',
  },
  {
    q: 'Repeated "Failed password" lines from one IP in seconds most likely indicateâ€¦',
    options: [
      'A normal user forgot their password',
      'A brute-force attempt',
      'A disk failure',
      'An AppArmor update',
    ],
    answer: 1,
    why: 'Rapid attempts from a single IP are brute force. fail2ban and SSH keys are the usual defenses.',
  },
]
const qi = ref(0)
const picked = ref(null)
const score = ref(0)
const quizDone = ref(false)
function pickAnswer(i) {
  if (picked.value !== null) return
  picked.value = i
  if (i === quiz[qi.value].answer) score.value++
}
function nextQuestion() {
  if (qi.value + 1 === quiz.length) quizDone.value = true
  else {
    qi.value++
    picked.value = null
  }
}
function restartQuiz() {
  qi.value = 0
  picked.value = null
  score.value = 0
  quizDone.value = false
}

/* ------------------------------------------------------------------ */
/* Lifecycle                                                           */
/* ------------------------------------------------------------------ */
onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  try {
    Object.assign(checked, JSON.parse(localStorage.getItem('hardening-checks') || '{}'))
  } catch {
    /* ignore */
  }
  resetLab()
  startRain()
  heroLoop()
  countUp()
  layerTimer = window.setInterval(() => {
    if (!layerPaused.value) activeLayer.value = (activeLayer.value + 1) % layers.length
  }, 4200)
})

onBeforeUnmount(() => {
  alive = false
  window.removeEventListener('scroll', onScroll)
  if (rainResize) window.removeEventListener('resize', rainResize)
  cancelAnimationFrame(rainId)
  clearInterval(layerTimer)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500;600&family=Instrument+Sans:wght@400;500;600&display=swap');
</style>

<style scoped>
.hx,
.hx-dialog {
  --bg: #0c1a2b;
  --bg-alt: #0f2136;
  --surface: #13283f;
  --surface-2: #17304b;
  --line: #27476a;
  --text: #e8eef5;
  --muted: #8fa8c0;
  --ice: #6fd3ff;
  --amber: #ffb347;
  --ok: #7be0a5;
  --bad: #ff7b7b;
  --f-display: 'Bricolage Grotesque', 'Segoe UI', sans-serif;
  --f-body: 'Instrument Sans', 'Segoe UI', sans-serif;
  --f-mono: 'IBM Plex Mono', Consolas, monospace;
  font-family: var(--f-body);
  color: var(--text);
}

.hx {
  background: var(--bg);
  min-height: 100vh;
  overflow-x: clip;
}

.hx h1,
.hx h2,
.hx h3,
.hx h4,
.hx-dialog h3,
.hx-dialog h4 {
  font-family: var(--f-display);
  margin: 0;
  letter-spacing: -0.02em;
}

.hx code,
.hx-dialog code {
  font-family: var(--f-mono);
  font-size: 0.86em;
  color: var(--ice);
}

.hx button {
  font-family: inherit;
  cursor: pointer;
}

.hx :focus-visible,
.hx-dialog :focus-visible {
  outline: 2px solid var(--amber);
  outline-offset: 2px;
}

.wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.muted {
  color: var(--muted);
}
.small {
  font-size: 0.85rem;
}

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--ice), var(--amber));
  z-index: 3000;
  transition: width 0.1s linear;
}

/* ---------- buttons ---------- */
.btn-amber {
  background: var(--amber) !important;
  color: #1b1405 !important;
  font-weight: 600;
  border-radius: 6px;
}
.btn-ghost {
  color: var(--text) !important;
  border: 1px solid var(--line);
  border-radius: 6px;
}
.btn-ghost-flat {
  color: var(--muted) !important;
}
.icon-btn {
  color: var(--ice) !important;
}

/* ---------- hero ---------- */
.hero {
  position: relative;
  padding: 72px 0 56px;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
}
.rain {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.26;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(180deg, #000 20%, transparent 95%);
  mask-image: linear-gradient(180deg, #000 20%, transparent 95%);
}
.hero-grid {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
}
.kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(19, 40, 63, 0.7);
  color: var(--ice);
  font-size: 0.85rem;
}
.hero h1 {
  font-size: clamp(2.5rem, 5.2vw, 4.2rem);
  font-weight: 800;
  line-height: 1.04;
}
.lead {
  max-width: 560px;
  margin: 22px 0 0;
  color: var(--muted);
  font-size: 1.05rem;
  line-height: 1.7;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}
.glance {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin: 36px 0 0;
  padding-top: 22px;
  border-top: 1px solid var(--line);
}
.glance div {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.glance dt {
  font-family: var(--f-mono);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--amber);
  min-width: 2ch;
}
.glance dd {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}

/* ---------- terminal (shared) ---------- */
.term {
  border: 1px solid var(--line);
  border-radius: 10px;
  background: #091422;
  overflow: hidden;
  box-shadow: 0 30px 70px rgba(2, 8, 16, 0.5);
}
.term-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 16px;
  border-bottom: 1px solid var(--line);
  background: #0e2036;
  color: var(--muted);
  font-family: var(--f-mono);
  font-size: 0.78rem;
}
.dots {
  display: flex;
  gap: 6px;
}
.dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #4a6684;
}
.dots i:nth-child(1) {
  background: #ff7b7b;
}
.dots i:nth-child(2) {
  background: #ffb347;
}
.dots i:nth-child(3) {
  background: #7be0a5;
}
.term-title {
  flex: 1;
}
.live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--ok);
}
.live b {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ok);
  animation: pulse 1.6s ease-in-out infinite;
}
.mini {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 9px;
  border: 1px solid var(--line);
  border-radius: 5px;
  background: transparent;
  color: var(--muted);
  font-size: 0.75rem;
}
.mini:hover {
  color: var(--text);
  border-color: var(--ice);
}
.term-body {
  padding: 18px 20px;
  font-family: var(--f-mono);
  font-size: 0.82rem;
  line-height: 1.65;
  color: #9fb6cc;
}
.hero-term .term-body {
  min-height: 330px;
}
.ln {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
.ln.cmd {
  color: var(--text);
}
.ln.ok {
  color: var(--ok);
}
.ln.warn {
  color: var(--amber);
}
.ln.err {
  color: var(--bad);
}
.ln.dim {
  color: #5f7d99;
}
.ps {
  color: var(--amber);
  margin-right: 4px;
}
.caret {
  display: inline-block;
  width: 8px;
  height: 1.05em;
  margin-left: 2px;
  vertical-align: text-bottom;
  background: var(--amber);
  animation: blink 1s step-end infinite;
}

/* ---------- jump nav ---------- */
.jump {
  display: flex;
  gap: 8px;
  padding-top: 22px;
  padding-bottom: 22px;
  overflow-x: auto;
  scrollbar-width: none;
}
.jump button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex: none;
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 0.88rem;
  transition:
    color 0.2s,
    border-color 0.2s,
    background 0.2s;
}
.jump button:hover {
  color: var(--text);
  border-color: var(--ice);
  background: rgba(111, 211, 255, 0.07);
}

/* ---------- sections ---------- */
.block {
  padding: 76px 0;
}
.block.alt {
  background: var(--bg-alt);
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}
.section-head {
  max-width: 720px;
  margin-bottom: 36px;
}
.section-head h2 {
  font-size: clamp(1.8rem, 3.2vw, 2.5rem);
  font-weight: 800;
}
.section-head p {
  margin: 12px 0 0;
  color: var(--muted);
  line-height: 1.75;
}

/* ---------- layers ---------- */
.layers {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 48px;
  align-items: center;
}
.layers-text h3 {
  font-size: 1.4rem;
  margin-bottom: 6px;
}
.layer-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 20px 0;
}
.layer-list button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  color: var(--muted);
  font-size: 0.9rem;
  transition: all 0.2s;
}
.layer-list button.on {
  color: #1b1405;
  background: var(--amber);
  border-color: var(--amber);
  font-weight: 600;
}
.layer-detail {
  padding: 22px;
  border-left: 3px solid var(--amber);
  background: var(--surface);
  border-radius: 0 8px 8px 0;
  animation: swap 0.45s ease;
}
.layer-detail h4 {
  font-size: 1.15rem;
  margin-bottom: 8px;
}
.layer-detail p {
  margin: 0 0 14px;
  color: #b4c6d8;
  line-height: 1.75;
}
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chips span {
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(111, 211, 255, 0.1);
  color: var(--ice);
  font-family: var(--f-mono);
  font-size: 0.75rem;
}

.rings {
  width: 100%;
  max-width: 440px;
  margin: 0 auto;
  overflow: visible;
}
.ring-g {
  cursor: pointer;
}
.ring {
  fill: none;
  stroke: var(--line);
  stroke-width: 1.5;
  transition:
    stroke 0.3s,
    stroke-width 0.3s;
}
.ring.on {
  stroke: var(--amber);
  stroke-width: 3;
}
.ring-run {
  fill: none;
  stroke: var(--ice);
  stroke-width: 3;
  stroke-dasharray: 26 520;
  stroke-linecap: round;
  transform-origin: 160px 160px;
  animation: orbit 3.4s linear infinite;
}
.ring-label {
  fill: var(--muted);
  font-family: var(--f-mono);
  font-size: 10px;
  transition: fill 0.3s;
}
.ring-label.on {
  fill: var(--amber);
  font-weight: 600;
}
.core {
  fill: var(--ice);
}
.core-pulse {
  fill: none;
  stroke: var(--ice);
  stroke-width: 2;
  transform-origin: 160px 160px;
  animation: ping 2.2s ease-out infinite;
}

.principles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 56px;
  border-top: 1px solid var(--line);
}
.principles > div {
  padding: 26px 28px 0 0;
}
.principles > div + div {
  padding-left: 28px;
  border-left: 1px solid var(--line);
}
.principles .q-icon {
  color: var(--amber);
}
.principles h4 {
  margin: 12px 0 6px;
  font-size: 1.1rem;
}
.principles p {
  margin: 0;
  color: var(--muted);
  line-height: 1.7;
  font-size: 0.92rem;
}

/* ---------- filters ---------- */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}
.filters button {
  padding: 7px 15px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 0.86rem;
  transition: all 0.2s;
}
.filters button:hover {
  color: var(--text);
}
.filters button.on {
  background: var(--ice);
  border-color: var(--ice);
  color: #06202e;
  font-weight: 600;
}

/* ---------- topics ---------- */
.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}
.topic {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;
}
.topic::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    260px circle at var(--mx, 50%) var(--my, 0%),
    rgba(111, 211, 255, 0.16),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.25s;
  pointer-events: none;
}
.topic:hover,
.topic:focus-visible {
  transform: translateY(-4px);
  border-color: var(--ice);
}
.topic:hover::before {
  opacity: 1;
}
.topic-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.module-no {
  color: var(--muted);
  font-family: var(--f-mono);
  font-size: 0.78rem;
}
.topic-ic {
  color: var(--amber);
}
.topic h3 {
  font-size: 1.08rem;
  line-height: 1.35;
  margin-bottom: 9px;
}
.topic p {
  flex: 1;
  margin: 0 0 18px;
  color: var(--muted);
  font-size: 0.9rem;
  line-height: 1.7;
}
.topic-foot {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}
.level {
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 0.72rem;
  font-weight: 600;
}
.level.beginner {
  background: rgba(123, 224, 165, 0.14);
  color: var(--ok);
}
.level.intermediate {
  background: rgba(111, 211, 255, 0.14);
  color: var(--ice);
}
.level.advanced {
  background: rgba(255, 179, 71, 0.15);
  color: var(--amber);
}
.topic-tags {
  display: flex;
  gap: 6px;
  flex: 1;
}
.topic-tags em {
  font-style: normal;
  color: #6f8aa5;
  font-size: 0.75rem;
}
.go {
  color: var(--ice);
  transition: transform 0.25s;
}
.topic:hover .go {
  transform: translateX(4px);
}

/* ---------- lab ---------- */
.lab-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 24px;
  align-items: start;
}
.lab-body {
  height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--line) transparent;
}
.input-row {
  display: flex;
  align-items: center;
}
.input-row input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--text);
  font: inherit;
  caret-color: var(--amber);
}
.input-row input::placeholder {
  color: #4a6684;
}
.quick {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px 16px;
  border-top: 1px solid var(--line);
  background: #0b1a2c;
}
.quick button {
  padding: 4px 10px;
  border: 1px solid var(--line);
  border-radius: 5px;
  background: transparent;
  color: var(--ice);
  font-family: var(--f-mono);
  font-size: 0.74rem;
  transition: background 0.2s;
}
.quick button:hover:not(:disabled) {
  background: rgba(111, 211, 255, 0.12);
}
.quick button:disabled {
  opacity: 0.4;
  cursor: wait;
}
.missions {
  padding: 22px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface);
}
.missions h3 {
  font-size: 1.25rem;
}
.missions ul {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: grid;
  gap: 14px;
}
.missions li {
  display: flex;
  gap: 12px;
}
.tick {
  display: grid;
  place-items: center;
  flex: none;
  width: 22px;
  height: 22px;
  margin-top: 2px;
  border: 1.5px solid var(--line);
  border-radius: 50%;
  color: #06202e;
  transition: all 0.3s;
}
.missions li.done .tick {
  background: var(--ok);
  border-color: var(--ok);
  animation: pop 0.4s ease;
}
.missions li strong {
  display: block;
  font-size: 0.92rem;
  font-weight: 600;
}
.missions li.done strong {
  color: var(--muted);
  text-decoration: line-through;
}
.hint {
  display: block;
  max-width: 100%;
  margin-top: 4px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--ice);
  font-family: var(--f-mono);
  font-size: 0.74rem;
  text-align: left;
  overflow-wrap: anywhere;
}
.hint:hover {
  text-decoration: underline;
}
.all-done {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
  padding: 12px 14px;
  border-radius: 8px;
  background: rgba(123, 224, 165, 0.12);
  color: var(--ok);
  font-size: 0.9rem;
  animation: swap 0.5s ease;
}

/* ---------- workbench ---------- */
.tabs {
  display: inline-flex;
  gap: 4px;
  margin-bottom: 20px;
  padding: 4px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--bg);
}
.tabs button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 16px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--muted);
  font-size: 0.92rem;
  transition: all 0.2s;
}
.tabs button.on {
  background: var(--surface-2);
  color: var(--amber);
}
.panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface);
  animation: swap 0.4s ease;
}
.panel h3 {
  font-size: 1.3rem;
  margin-bottom: 6px;
}
.perm-table {
  width: 100%;
  margin: 18px 0;
  border-collapse: collapse;
}
.perm-table th {
  padding: 6px 4px;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 500;
  text-align: center;
}
.perm-table tbody th {
  text-align: left;
  color: var(--text);
  font-size: 0.9rem;
}
.perm-table td {
  padding: 4px;
  text-align: center;
}
.bit {
  width: 54px;
  height: 38px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  font-family: var(--f-mono);
  font-weight: 600;
  transition: all 0.2s;
}
.bit.on {
  border-color: var(--ice);
  background: rgba(111, 211, 255, 0.16);
  color: var(--ice);
  transform: translateY(-1px);
}
.specials,
.switches {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}
.specials label,
.switches label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border: 1px solid var(--line);
  border-radius: 6px;
  color: var(--muted);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}
.specials label.on,
.switches label.on {
  border-color: var(--amber);
  color: var(--amber);
}
.specials input,
.switches input {
  accent-color: var(--amber);
}
.presets {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}
.presets button {
  padding: 4px 10px;
  border: 1px solid var(--line);
  border-radius: 5px;
  background: transparent;
  color: var(--ice);
  font-family: var(--f-mono);
  font-size: 0.76rem;
}
.presets button em {
  color: var(--muted);
  font-style: normal;
  margin-left: 4px;
}
.presets button:hover {
  background: rgba(111, 211, 255, 0.1);
}
.readout {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 18px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #0b1a2c;
}
.octal {
  font-family: var(--f-mono);
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  color: var(--amber);
  min-width: 4ch;
}
.sym {
  font-size: 1.1rem !important;
  color: var(--text) !important;
}
.cmdline {
  width: 100%;
}
.notes {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
  display: grid;
  gap: 10px;
}
.notes li {
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 0.88rem;
  line-height: 1.6;
}
.notes li.warn {
  background: rgba(255, 179, 71, 0.1);
  color: #ffd79a;
}
.notes li.ok {
  background: rgba(123, 224, 165, 0.1);
  color: #b6f0cf;
}
.notes .q-icon {
  flex: none;
  margin-top: 2px;
}

.services,
.opts {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}
.services label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid var(--line);
  border-radius: 7px;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s;
}
.services label.on {
  border-color: var(--ok);
  color: var(--text);
  background: rgba(123, 224, 165, 0.07);
}
.services label.on.risky {
  border-color: var(--amber);
  background: rgba(255, 179, 71, 0.08);
}
.services input {
  accent-color: var(--amber);
}
.svc {
  flex: 1;
  font-weight: 500;
}
.risk-tag {
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(255, 123, 123, 0.14);
  color: var(--bad);
  font-size: 0.7rem;
}
.meter {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
  padding: 14px 16px;
  border-radius: 8px;
  transition: all 0.3s;
}
.meter strong {
  display: block;
  font-family: var(--f-display);
  font-size: 1.15rem;
}
.meter span {
  font-size: 0.86rem;
}
.meter.good {
  background: rgba(123, 224, 165, 0.12);
  color: var(--ok);
}
.meter.warn {
  background: rgba(255, 179, 71, 0.12);
  color: var(--amber);
}
.meter.bad {
  background: rgba(255, 123, 123, 0.12);
  color: var(--bad);
}
.code {
  margin: 0;
  padding: 16px 18px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #091422;
  font-family: var(--f-mono);
  font-size: 0.8rem;
  line-height: 1.7;
  color: #9fb6cc;
  overflow-x: auto;
}
.code .good {
  color: var(--ok);
}
.code .warn {
  color: var(--amber);
}
.code .bad {
  color: var(--bad);
}
.code .dim {
  color: #5f7d99;
}
.opts label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid var(--line);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.opts label.on {
  border-color: var(--ok);
  background: rgba(123, 224, 165, 0.06);
}
.opts input {
  position: absolute;
  opacity: 0;
}
.opts input:focus-visible + .switch {
  outline: 2px solid var(--amber);
  outline-offset: 2px;
}
.switch {
  position: relative;
  flex: none;
  width: 36px;
  height: 20px;
  margin-top: 2px;
  border-radius: 999px;
  background: #2b4966;
  transition: background 0.25s;
}
.switch::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.25s;
}
.opts label.on .switch {
  background: var(--ok);
}
.opts label.on .switch::after {
  transform: translateX(16px);
}
.opts strong {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
}
.opts small {
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.5;
}
.score-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}
.score-row strong {
  font-family: var(--f-mono);
  color: var(--amber);
}
.bar {
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: #0b1a2c;
  overflow: hidden;
}
.bar i {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--ice), var(--ok));
  transition: width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.row-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 14px;
}

/* ---------- checklist ---------- */
.check-grid {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 48px;
  align-items: start;
}
.checks {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}
.checks label {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 13px 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  cursor: pointer;
  transition: all 0.25s;
}
.checks label:hover {
  border-color: var(--ice);
}
.checks input {
  position: absolute;
  opacity: 0;
}
.checks input:focus-visible + .box {
  outline: 2px solid var(--amber);
  outline-offset: 2px;
}
.box {
  display: grid;
  place-items: center;
  flex: none;
  width: 22px;
  height: 22px;
  margin-top: 1px;
  border: 1.5px solid var(--line);
  border-radius: 5px;
  color: transparent;
  transition: all 0.25s;
}
.checks li.done .box {
  background: var(--ok);
  border-color: var(--ok);
  color: #06202e;
  animation: pop 0.35s ease;
}
.ctext strong {
  display: block;
  font-size: 0.95rem;
  font-weight: 600;
}
.checks li.done .ctext strong {
  color: var(--muted);
}
.ctext code {
  display: block;
  margin-top: 4px;
  overflow-wrap: anywhere;
  font-size: 0.76rem;
}
.ring-card {
  position: sticky;
  top: 24px;
  padding: 28px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
  text-align: center;
}
.progress-ring {
  width: 180px;
  transform: rotate(-90deg);
}
.progress-ring text {
  transform: rotate(90deg);
  transform-origin: 70px 70px;
}
.track {
  fill: none;
  stroke: #0b1a2c;
  stroke-width: 10;
}
.fill {
  fill: none;
  stroke: var(--amber);
  stroke-width: 10;
  stroke-linecap: round;
  stroke-dasharray: 339.29;
  transition: stroke-dashoffset 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.pct {
  fill: var(--text);
  font-family: var(--f-mono);
  font-size: 26px;
  font-weight: 600;
  text-anchor: middle;
}
.pct-sub {
  fill: var(--muted);
  font-family: var(--f-mono);
  font-size: 10px;
}
.ring-card h3 {
  margin: 14px 0 6px;
  font-size: 1.3rem;
}
.ring-card p {
  margin: 0 0 12px;
  font-size: 0.9rem;
  line-height: 1.6;
}

/* ---------- commands ---------- */
.cmd-list {
  display: grid;
  gap: 10px;
}
.cmd-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 16px 20px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  transition: border-color 0.2s;
}
.cmd-row:hover {
  border-color: var(--ice);
}
.cmd-info {
  min-width: 0;
}
.cmd-info h3 {
  font-size: 1rem;
  margin-bottom: 3px;
}
.cmd-info p {
  margin: 0 0 10px;
  color: var(--muted);
  font-size: 0.86rem;
}
.cmd-info code {
  display: inline-block;
  max-width: 100%;
  padding: 7px 11px;
  border: 1px solid var(--line);
  border-radius: 6px;
  background: #091422;
  overflow-wrap: anywhere;
}
.cmd-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: none;
}
.cat {
  margin-right: 8px;
  color: #6f8aa5;
  font-size: 0.76rem;
}
.warning {
  display: flex;
  gap: 16px;
  margin-top: 24px;
  padding: 20px 22px;
  border: 1px solid rgba(255, 179, 71, 0.35);
  border-radius: 10px;
  background: rgba(255, 179, 71, 0.07);
  color: var(--amber);
}
.warning h3 {
  margin-bottom: 6px;
  color: #ffd79a;
  font-size: 1.05rem;
}
.warning p {
  margin: 0;
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.75;
}

/* ---------- quiz ---------- */
.quiz-wrap {
  max-width: 820px;
}
.quiz-card {
  padding: 30px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--surface);
}
.quiz-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  color: var(--muted);
  font-size: 0.85rem;
}
.dotsline {
  display: flex;
  gap: 6px;
}
.dotsline i {
  width: 28px;
  height: 4px;
  border-radius: 2px;
  background: var(--line);
  transition: background 0.3s;
}
.dotsline i.on {
  background: var(--amber);
}
.quiz-card h3 {
  margin-bottom: 20px;
  font-size: 1.35rem;
  line-height: 1.35;
}
.answers {
  display: grid;
  gap: 10px;
}
.answers button {
  padding: 13px 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: transparent;
  color: var(--text);
  font-size: 0.95rem;
  text-align: left;
  transition: all 0.2s;
}
.answers button:hover:not(:disabled) {
  border-color: var(--ice);
  background: rgba(111, 211, 255, 0.07);
}
.answers button:disabled {
  cursor: default;
}
.answers button.correct {
  border-color: var(--ok);
  background: rgba(123, 224, 165, 0.12);
  animation: pop 0.35s ease;
}
.answers button.wrong {
  border-color: var(--bad);
  background: rgba(255, 123, 123, 0.1);
  animation: shake 0.35s ease;
}
.explain {
  margin-top: 18px;
  padding: 16px 18px;
  border-radius: 8px;
  line-height: 1.7;
  font-size: 0.92rem;
  animation: swap 0.4s ease;
}
.explain.good {
  background: rgba(123, 224, 165, 0.1);
}
.explain.bad {
  background: rgba(255, 123, 123, 0.08);
}
.quiz-result {
  display: grid;
  justify-items: center;
  gap: 10px;
  padding: 18px 0;
  text-align: center;
  color: var(--amber);
}
.quiz-result h3 {
  margin: 0;
  color: var(--text);
}
.quiz-result p {
  margin: 0 0 8px;
}

/* ---------- pdf ---------- */
.pdf-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 18px;
  margin-bottom: 16px;
  padding: 16px 20px;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--surface);
}
.pdf-file {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--amber);
}
.pdf-file div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.pdf-file strong {
  color: var(--text);
  overflow-wrap: anywhere;
}
.pdf-file span {
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
  border-radius: 10px;
  background: #111827;
}
.pdf-viewer iframe {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
}
.pdf-note {
  margin-top: 12px;
}

/* ---------- dialog ---------- */
.hx-dialog {
  width: min(720px, 94vw);
  max-width: none !important;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: var(--bg-alt) !important;
  color: var(--text);
}
.dlg-head {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px 24px 18px;
  border-bottom: 1px solid var(--line);
}
.dlg-head h3 {
  font-size: 1.3rem;
  line-height: 1.25;
}
.dlg-head > div:nth-child(2) {
  flex: 1;
}
.dlg-ic {
  display: grid;
  place-items: center;
  flex: none;
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: rgba(255, 179, 71, 0.12);
  color: var(--amber);
}
.dlg-close {
  color: var(--muted) !important;
}
.dlg-body {
  flex: 1;
  overflow-y: auto;
  padding: 22px 24px;
}
.dlg-why {
  margin: 0 0 22px;
  color: #c3d3e2;
  line-height: 1.85;
}
.dlg-body h4 {
  margin: 20px 0 10px;
  font-size: 1rem;
  color: var(--amber);
}
.dlg-points {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 8px;
}
.dlg-points li {
  display: flex;
  gap: 6px;
  color: #b4c6d8;
  font-size: 0.92rem;
  line-height: 1.6;
}
.dlg-points .q-icon {
  flex: none;
  margin-top: 2px;
  color: var(--ice);
}
.dlg-cmd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
  padding: 11px 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #091422;
}
.dlg-cmd > div {
  min-width: 0;
}
.dlg-cmd code {
  display: block;
  overflow-wrap: anywhere;
}
.dlg-cmd small {
  display: block;
  margin-top: 3px;
  color: var(--muted);
  font-size: 0.8rem;
}
.dlg-tip {
  display: flex;
  gap: 12px;
  margin-top: 22px;
  padding: 14px 16px;
  border-radius: 8px;
  background: rgba(255, 179, 71, 0.08);
  color: var(--amber);
}
.dlg-tip strong {
  color: #ffd79a;
}
.dlg-tip p {
  margin: 3px 0 0;
  color: #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.65;
}
.dlg-foot {
  display: flex;
  justify-content: space-between;
  padding: 12px 18px;
  border-top: 1px solid var(--line);
}

/* ---------- keyframes ---------- */
@keyframes blink {
  50% {
    opacity: 0;
  }
}
@keyframes pulse {
  50% {
    opacity: 0.35;
    transform: scale(0.8);
  }
}
@keyframes orbit {
  to {
    transform: rotate(360deg);
  }
}
@keyframes ping {
  from {
    transform: scale(1);
    opacity: 0.9;
  }
  to {
    transform: scale(4.5);
    opacity: 0;
  }
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
@keyframes pop {
  50% {
    transform: scale(1.15);
  }
}
@keyframes shake {
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}

/* ---------- responsive ---------- */
@media (max-width: 1000px) {
  .hero-grid,
  .layers,
  .lab-grid,
  .panel,
  .check-grid {
    grid-template-columns: 1fr;
  }
  .hero-grid {
    gap: 36px;
  }
  .topic-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ring-card {
    position: static;
  }
}
@media (max-width: 680px) {
  .hero {
    padding: 44px 0 40px;
  }
  .block {
    padding: 54px 0;
  }
  .wrap {
    padding: 0 16px;
  }
  .topic-grid,
  .principles {
    grid-template-columns: 1fr;
  }
  .principles > div + div {
    padding-left: 0;
    border-left: 0;
    border-top: 1px solid var(--line);
    margin-top: 22px;
  }
  .panel {
    padding: 18px;
  }
  .tabs {
    display: flex;
    width: 100%;
    overflow-x: auto;
  }
  .cmd-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .cmd-actions {
    width: 100%;
    justify-content: flex-end;
  }
  .pdf-viewer {
    height: 520px;
  }
  .pdf-actions {
    width: 100%;
  }
  .pdf-actions .q-btn {
    flex: 1;
  }
  .lab-body {
    height: 340px;
  }
  .octal {
    font-size: 2.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hx *,
  .hx-dialog * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
