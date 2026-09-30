<template>
  <div class="learning-viewer" :class="[`theme-${topic}`, { 'is-fullscreen': isFullscreen }]">
    <!-- TOP BAR -->
    <header class="topbar">
      <div class="topbar-left">
        <q-btn flat round dense icon="arrow_back" @click="goBack" />
        <div class="course-info">
          <div class="course-title">{{ courseTitle }}</div>
          <div class="course-subtitle">{{ currentLesson?.category || 'Learning Module' }}</div>
        </div>
      </div>

      <div class="topbar-center">
        <div class="lesson-counter">Lesson {{ currentIndex + 1 }} / {{ lessons.length }}</div>
        <div class="slide-counter">Slide {{ slideIndex + 1 }} / {{ slides.length }}</div>
      </div>

      <div class="topbar-right">
        <q-btn flat round dense icon="fullscreen" @click="toggleFullscreen" />
        <q-btn flat round dense icon="menu" class="lt-md" @click="sidebarOpen = !sidebarOpen" />
      </div>
    </header>

    <!-- BODY -->
    <div class="viewer-body">
      <!-- SIDEBAR -->
      <aside class="sidebar" :class="{ open: sidebarOpen }">
        <div class="sidebar-header">
          <div class="sidebar-label">COURSE CONTENT</div>
          <div class="sidebar-course">{{ courseTitle }}</div>
        </div>

        <div class="lesson-list">
          <button
            v-for="(lesson, index) in lessons"
            :key="lesson.id || index"
            class="lesson-item"
            :class="{ active: index === currentIndex }"
            @click="selectLesson(index)"
          >
            <div class="lesson-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="lesson-item-content">
              <div class="lesson-item-title">{{ lesson.title }}</div>
              <div class="lesson-item-category">{{ lesson.category }}</div>
            </div>
            <q-icon v-if="index === currentIndex" name="chevron_right" size="18px" />
          </button>
        </div>
      </aside>

      <!-- OVERLAY MOBILE -->
      <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />

      <!-- MAIN -->
      <main class="presentation-area">
        <!-- PRESENTATION -->
        <div class="presentation-frame">
          <section
            v-if="currentSlide"
            :key="`${currentLesson?.id}-${slideIndex}`"
            class="slide"
            :class="[`slide-${currentSlide.type}`, `template-${currentLesson?.template || 'default'}`]"
          >
            <!-- HERO -->
            <template v-if="currentSlide.type === 'hero'">
              <div class="hero-slide">
                <div class="hero-glow glow-one" />
                <div class="hero-glow glow-two" />

                <!-- topic-specific hero artwork -->
                <div v-if="topic === 'cyber'" class="radar"><span /></div>
                <div v-else class="container-stack"><span v-for="n in 9" :key="n" /></div>

                <div class="hero-content">
                  <div class="eyebrow">{{ currentLesson?.category || 'LEARNING MODULE' }}</div>

                  <div class="hero-icon">
                    <q-icon :name="resolveIcon(currentLesson?.icon)" size="42px" />
                  </div>

                  <h1>{{ currentSlide.title }}</h1>
                  <p>{{ currentSlide.subtitle }}</p>

                  <div class="hero-meta">
                    <span>Lesson {{ currentIndex + 1 }}</span>
                    <span class="dot" />
                    <span>{{ slides.length }} slides</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- CONCEPT -->
            <template v-else-if="currentSlide.type === 'concept'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="CONCEPT" />

                <div class="concept-layout">
                  <div class="concept-main">
                    <div class="large-icon"><q-icon name="lightbulb" /></div>
                    <p class="concept-text">{{ currentSlide.content }}</p>
                  </div>

                  <div v-if="currentSlide.points?.length" class="points-panel">
                    <div v-for="(point, index) in currentSlide.points" :key="index" class="point-row">
                      <div class="point-number">{{ String(index + 1).padStart(2, '0') }}</div>
                      <div>{{ point }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- CARDS -->
            <template v-else-if="currentSlide.type === 'cards'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="KEY CONCEPTS" />

                <div class="cards-grid">
                  <div v-for="(card, index) in currentSlide.cards" :key="index" class="info-card">
                    <div class="card-number">{{ String(index + 1).padStart(2, '0') }}</div>
                    <div class="card-icon"><q-icon :name="resolveIcon(card.icon)" size="25px" /></div>
                    <h3>{{ card.title }}</h3>
                    <p>{{ card.text }}</p>
                  </div>
                </div>
              </div>
            </template>

            <!-- COMPARISON -->
            <template v-else-if="currentSlide.type === 'comparison'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="COMPARISON" />

                <div class="comparison-grid">
                  <div class="comparison-panel">
                    <div class="comparison-label">A</div>
                    <h3>{{ currentSlide.left?.title }}</h3>
                    <ul>
                      <li v-for="(point, index) in currentSlide.left?.points || []" :key="index">{{ point }}</li>
                    </ul>
                  </div>

                  <div class="comparison-divider"><q-icon name="compare_arrows" size="28px" /></div>

                  <div class="comparison-panel">
                    <div class="comparison-label">B</div>
                    <h3>{{ currentSlide.right?.title }}</h3>
                    <ul>
                      <li v-for="(point, index) in currentSlide.right?.points || []" :key="index">{{ point }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </template>

            <!-- PROCESS -->
            <template v-else-if="currentSlide.type === 'process'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="PROCESS" />

                <div class="process-track">
                  <div v-for="(step, index) in currentSlide.steps" :key="index" class="process-step">
                    <div class="step-number">{{ step.number || String(index + 1).padStart(2, '0') }}</div>
                    <div class="step-line" />
                    <div class="step-content">
                      <h3>{{ step.title }}</h3>
                      <p>{{ step.text }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- ARCHITECTURE -->
            <template v-else-if="currentSlide.type === 'architecture'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="ARCHITECTURE" />

                <div class="architecture-stack">
                  <div v-for="(layer, index) in currentSlide.layers" :key="index" class="architecture-layer">
                    <div class="architecture-index">{{ String(index + 1).padStart(2, '0') }}</div>
                    <div class="architecture-content">
                      <h3>{{ layer.title }}</h3>
                      <p>{{ layer.text }}</p>
                    </div>
                    <q-icon v-if="index < currentSlide.layers.length - 1" name="south" class="architecture-arrow" />
                  </div>
                </div>
              </div>
            </template>

            <!-- TECHNICAL -->
            <template v-else-if="currentSlide.type === 'technical'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="TECHNICAL" />

                <div class="technical-layout">
                  <div v-if="currentSlide.content" class="technical-description">{{ currentSlide.content }}</div>

                  <div class="technical-list">
                    <div v-for="(point, index) in currentSlide.points || []" :key="index" class="technical-row">
                      <q-icon name="check_circle" size="20px" />
                      <span>{{ point }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- SCENARIO -->
            <template v-else-if="currentSlide.type === 'scenario'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="REAL-WORLD SCENARIO" />

                <div class="scenario-grid">
                  <div class="scenario-box scenario">
                    <div class="scenario-tag">SCENARIO</div>
                    <div class="scenario-icon"><q-icon name="public" size="30px" /></div>
                    <p>{{ currentSlide.scenario }}</p>
                  </div>

                  <div class="scenario-arrow"><q-icon name="arrow_forward" size="30px" /></div>

                  <div class="scenario-box solution">
                    <div class="scenario-tag">SOLUTION</div>
                    <div class="scenario-icon"><q-icon name="verified" size="30px" /></div>
                    <p>{{ currentSlide.solution }}</p>
                  </div>
                </div>
              </div>
            </template>

            <!-- COMMAND -->
            <template v-else-if="currentSlide.type === 'command'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="COMMAND" />

                <div class="command-layout">
                  <div class="terminal-window">
                    <div class="terminal-header">
                      <span /><span /><span />
                      <div class="terminal-title">terminal</div>
                    </div>

                    <div class="terminal-body">
                      <div class="terminal-prompt"><span>$</span> {{ currentSlide.command }}</div>
                      <div v-if="currentSlide.example" class="terminal-output">{{ currentSlide.example }}</div>
                    </div>
                  </div>

                  <div class="command-explanation">
                    <div class="command-label">WHAT IT DOES</div>
                    <p>{{ currentSlide.explanation }}</p>
                  </div>
                </div>
              </div>
            </template>

            <!-- TRIAD -->
            <template v-else-if="currentSlide.type === 'triad'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="SECURITY MODEL" />

                <div class="triad-placeholder">
                  <div class="triad-circle">CIA</div>

                  <div class="triad-items">
                    <div v-for="(item, index) in currentSlide.items || []" :key="index" class="triad-item">
                      <strong>{{ item.title }}</strong>
                      <span>{{ item.text }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- THREAT GRID -->
            <template v-else-if="currentSlide.type === 'threatGrid'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="THREATS" />

                <div class="cards-grid threat-grid">
                  <div
                    v-for="(threat, index) in currentSlide.threats || currentSlide.cards || []"
                    :key="index"
                    class="info-card"
                  >
                    <div class="card-number">{{ String(index + 1).padStart(2, '0') }}</div>
                    <div class="card-icon"><q-icon :name="resolveIcon(threat.icon || 'warning')" size="25px" /></div>
                    <h3>{{ threat.title }}</h3>
                    <p>{{ threat.text || threat.description }}</p>
                  </div>
                </div>
              </div>
            </template>

            <!-- SUMMARY -->
            <template v-else-if="currentSlide.type === 'summary'">
              <div class="summary-slide">
                <div class="summary-inner">
                  <div class="eyebrow">MODULE COMPLETE</div>
                  <h1>{{ currentSlide.title }}</h1>
                  <p class="summary-subtitle">{{ currentLesson?.title }}</p>

                  <div class="summary-list">
                    <div v-for="(point, index) in currentSlide.points || []" :key="index" class="summary-row">
                      <div class="summary-check"><q-icon name="check" size="18px" /></div>
                      <span>{{ point }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- FALLBACK -->
            <template v-else>
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="LEARNING" />
                <div class="fallback-content"><pre>{{ currentSlide }}</pre></div>
              </div>
            </template>
          </section>
        </div>

        <!-- BOTTOM CONTROLS -->
        <div class="controls">
          <div class="controls-left">
            <q-btn flat round icon="keyboard_arrow_left" :disable="isFirst" @click="previousSlide" />
            <span class="control-label">Previous</span>
          </div>

          <div class="progress-container">
            <div class="progress-text">
              <span>{{ currentLesson?.title }}</span>
              <span>{{ Math.round(progress) }}%</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: `${progress}%` }" />
            </div>
          </div>

          <div class="controls-right">
            <span class="control-label">{{ isLastSlideOfLesson ? 'Next Lesson' : 'Next' }}</span>
            <q-btn unelevated round icon="keyboard_arrow_right" :disable="isLastOverall" @click="nextSlide" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  lessons: { type: Array, required: true },
})

const route = useRoute()
const router = useRouter()

const currentIndex = ref(0)
const slideIndex = ref(0)
const sidebarOpen = ref(false)
const isFullscreen = ref(false)

/* ---------- Course ---------- */

const courseTitle = computed(() => {
  if (!props.lessons.length) return 'Learning Module'

  const firstCategory = props.lessons[0]?.category || ''

  if (firstCategory.toLowerCase().includes('docker')) return 'Docker Fundamentals'

  if (
    firstCategory.toLowerCase().includes('cyber') ||
    props.lessons[0]?.title?.toLowerCase().includes('cyber')
  ) {
    return 'Cybersecurity Fundamentals'
  }

  return firstCategory || 'Learning Module'
})

/* Visual theme: 'docker' or 'cyber' (add more topics here later) */
const topic = computed(() =>
  courseTitle.value.toLowerCase().includes('docker') ? 'docker' : 'cyber',
)

/* ---------- Current lesson ---------- */

const currentLesson = computed(() => props.lessons[currentIndex.value] || null)

/* ---------- Convert old Cybersecurity structure to slides ---------- */

function normalizeLesson(lesson) {
  if (!lesson) return null
  if (Array.isArray(lesson.slides)) return lesson

  const generatedSlides = []

  generatedSlides.push({ type: 'hero', title: lesson.title, subtitle: lesson.subtitle })

  if (lesson.overview) {
    generatedSlides.push({ type: 'concept', title: 'Overview', content: lesson.overview, points: [] })
  }

  if (Array.isArray(lesson.sections)) {
    lesson.sections.forEach((section) => {
      if (section.bullets?.length) {
        generatedSlides.push({
          type: 'cards',
          title: section.title,
          cards: section.bullets.map((bullet) => ({
            title: bullet,
            icon: 'check_circle',
            text: 'Important concept to remember from this topic.',
          })),
        })
      } else if (section.content) {
        generatedSlides.push({ type: 'concept', title: section.title, content: section.content, points: [] })
      }
    })
  }

  if (lesson.code?.content) {
    generatedSlides.push({
      type: 'command',
      title: lesson.code.title || 'Example Command',
      command: lesson.code.content,
      explanation:
        'This command can be used as part of the practical administration or security workflow for this topic.',
    })
  }

  if (lesson.example) {
    generatedSlides.push({
      type: 'scenario',
      title: lesson.example.title || 'Practical Example',
      scenario: lesson.example.content,
      solution: 'Apply the concept carefully as part of the overall security and system-management process.',
    })
  }

  generatedSlides.push({
    type: 'summary',
    title: 'Key Takeaways',
    points: [
      lesson.title,
      lesson.overview || lesson.subtitle,
      ...(lesson.sections || []).flatMap((section) => section.bullets || []).slice(0, 4),
    ].filter(Boolean),
  })

  return { ...lesson, template: lesson.template || 'editorial', slides: generatedSlides }
}

const normalizedLessons = computed(() => props.lessons.map(normalizeLesson).filter(Boolean))
const slides = computed(() => normalizedLessons.value[currentIndex.value]?.slides || [])
const currentSlide = computed(() => slides.value[slideIndex.value] || null)

/* ---------- Progress ---------- */

const totalSlides = computed(() =>
  normalizedLessons.value.reduce((total, lesson) => total + (lesson.slides?.length || 0), 0),
)

const completedSlidesBeforeCurrent = computed(() =>
  normalizedLessons.value
    .slice(0, currentIndex.value)
    .reduce((total, lesson) => total + (lesson.slides?.length || 0), 0),
)

const progress = computed(() => {
  if (!totalSlides.value) return 0
  const completed = completedSlidesBeforeCurrent.value + slideIndex.value + 1
  return Math.min((completed / totalSlides.value) * 100, 100)
})

/* ---------- Navigation state ---------- */

const isFirst = computed(() => currentIndex.value === 0 && slideIndex.value === 0)

const isLastSlideOfLesson = computed(
  () => slideIndex.value === slides.value.length - 1 && slides.value.length > 0,
)

const isLastOverall = computed(
  () => currentIndex.value === normalizedLessons.value.length - 1 && isLastSlideOfLesson.value,
)

/* ---------- Lesson selection ---------- */

function selectLesson(index) {
  if (index < 0 || index >= normalizedLessons.value.length) return
  currentIndex.value = index
  slideIndex.value = 0
  sidebarOpen.value = false
  syncUrl()
}

/* ---------- Slide navigation ---------- */

function nextSlide() {
  if (!slides.value.length) return

  if (slideIndex.value < slides.value.length - 1) {
    slideIndex.value += 1
    syncUrl()
    return
  }

  if (currentIndex.value < normalizedLessons.value.length - 1) {
    currentIndex.value += 1
    slideIndex.value = 0
    syncUrl()
  }
}

function previousSlide() {
  if (slideIndex.value > 0) {
    slideIndex.value -= 1
    syncUrl()
    return
  }

  if (currentIndex.value > 0) {
    currentIndex.value -= 1
    const previousSlides = normalizedLessons.value[currentIndex.value]?.slides || []
    slideIndex.value = Math.max(previousSlides.length - 1, 0)
    syncUrl()
  }
}

/* ---------- URL synchronization ---------- */

function syncUrl() {
  router.replace({
    query: {
      ...route.query,
      lesson: String(currentIndex.value + 1),
      slide: String(slideIndex.value + 1),
    },
  })
}

function loadFromUrl() {
  const requestedLesson = Number(route.query.lesson)
  const requestedSlide = Number(route.query.slide)

  const lessonIndex = Number.isFinite(requestedLesson) && requestedLesson > 0 ? requestedLesson - 1 : 0

  currentIndex.value = Math.min(Math.max(lessonIndex, 0), Math.max(normalizedLessons.value.length - 1, 0))

  const lessonSlides = normalizedLessons.value[currentIndex.value]?.slides || []

  const slideNumber = Number.isFinite(requestedSlide) && requestedSlide > 0 ? requestedSlide - 1 : 0

  slideIndex.value = Math.min(Math.max(slideNumber, 0), Math.max(lessonSlides.length - 1, 0))
}

watch(() => route.query, () => loadFromUrl())
watch(() => props.lessons, () => loadFromUrl(), { immediate: true })

/* ---------- Keyboard controls ---------- */

function handleKeyboard(event) {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return

  switch (event.key) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
      event.preventDefault()
      nextSlide()
      break

    case 'ArrowLeft':
    case 'PageUp':
      event.preventDefault()
      previousSlide()
      break

    case 'Home':
      event.preventDefault()
      currentIndex.value = 0
      slideIndex.value = 0
      syncUrl()
      break

    case 'End':
      event.preventDefault()
      currentIndex.value = normalizedLessons.value.length - 1
      slideIndex.value = Math.max((normalizedLessons.value[currentIndex.value]?.slides?.length || 1) - 1, 0)
      syncUrl()
      break

    case 'Escape':
      if (isFullscreen.value) exitFullscreen()
      break
  }
}

/* ---------- Fullscreen ---------- */

async function toggleFullscreen() {
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
      isFullscreen.value = true
    } else {
      await document.exitFullscreen()
      isFullscreen.value = false
    }
  } catch {
    isFullscreen.value = !isFullscreen.value
  }
}

function exitFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => {})
  }
  isFullscreen.value = false
}

function handleFullscreenChange() {
  isFullscreen.value = Boolean(document.fullscreenElement)
}

/* ---------- Back ---------- */

function goBack() {
  if (courseTitle.value.toLowerCase().includes('docker')) {
    router.push('/docker')
    return
  }
  router.push('/cybersecurity')
}

/* ---------- Icons ---------- */

function resolveIcon(icon) {
  if (!icon || typeof icon !== 'string') return 'article'
  if (icon.includes('fa-')) return 'code'
  return icon
}

/* ---------- Lifecycle ---------- */

onMounted(() => {
  window.addEventListener('keydown', handleKeyboard)
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  loadFromUrl()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboard)
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

/* ---------- Small reusable heading component ---------- */

const SlideHeading = defineComponent({
  name: 'SlideHeading',
  props: {
    slide: { type: Object, required: true },
    label: { type: String, default: 'LEARNING' },
  },
  setup(props) {
    return () =>
      h('div', { class: 'slide-heading' }, [
        h('div', { class: 'slide-label' }, props.label),
        h('h2', null, props.slide.title),
      ])
  },
})
</script>

<style scoped>
/* =====================================================================
   BASE (shared layout). Theme looks are at the bottom of this block.
   ===================================================================== */
.learning-viewer {
  --green: #10b981; --green-light: #34d399; --green-soft: rgba(16, 185, 129, 0.12);
  --bg: #07110e; --panel: #0b1915; --panel-light: #10231d;
  --border: rgba(255, 255, 255, 0.09); --text: #f8fafc; --muted: #94a3b8;
  position: fixed; inset: 0; display: flex; flex-direction: column; overflow: hidden;
  background: var(--bg); color: var(--text);
}

/* TOPBAR */
.topbar {
  height: 68px; min-height: 68px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
  padding: 0 18px; border-bottom: 1px solid var(--border); background: rgba(7, 17, 14, 0.96);
  backdrop-filter: blur(16px); z-index: 20;
}
.topbar-left, .topbar-right { display: flex; align-items: center; }
.topbar-right { justify-content: flex-end; gap: 4px; }
.course-info { margin-left: 12px; }
.course-title { font-size: 14px; font-weight: 700; }
.course-subtitle { margin-top: 2px; color: var(--muted); font-size: 11px; }
.topbar-center { display: flex; align-items: center; gap: 10px; }
.lesson-counter, .slide-counter { padding: 6px 10px; border: 1px solid var(--border); border-radius: 999px; font-size: 11px; color: var(--muted); }
.slide-counter { color: var(--green-light); background: var(--green-soft); border-color: rgba(16, 185, 129, 0.18); }

/* BODY */
.viewer-body { flex: 1; min-height: 0; display: flex; }

/* SIDEBAR */
.sidebar { width: 285px; min-width: 285px; border-right: 1px solid var(--border); background: #08130f; overflow-y: auto; z-index: 15; }
.sidebar-header { padding: 24px 20px 18px; border-bottom: 1px solid var(--border); }
.sidebar-label { color: var(--green); font-size: 10px; font-weight: 800; letter-spacing: 0.14em; }
.sidebar-course { margin-top: 8px; font-size: 18px; font-weight: 800; }
.lesson-list { padding: 10px; }
.lesson-item {
  width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px; margin-bottom: 5px;
  border: 1px solid transparent; border-radius: 12px; background: transparent; color: var(--text);
  text-align: left; cursor: pointer; transition: 0.2s ease;
}
.lesson-item:hover { background: rgba(255, 255, 255, 0.035); }
.lesson-item.active { background: var(--green-soft); border-color: rgba(16, 185, 129, 0.25); }
.lesson-number {
  width: 32px; height: 32px; display: grid; place-items: center; flex-shrink: 0; border-radius: 9px;
  background: rgba(255, 255, 255, 0.05); color: var(--muted); font-size: 10px; font-weight: 800;
}
.lesson-item.active .lesson-number { background: var(--green); color: #042218; }
.lesson-item-content { min-width: 0; flex: 1; }
.lesson-item-title { font-size: 12px; font-weight: 700; line-height: 1.35; }
.lesson-item-category { margin-top: 3px; color: var(--muted); font-size: 9px; }

/* MAIN */
.presentation-area { flex: 1; min-width: 0; display: flex; flex-direction: column; padding: 18px; overflow: hidden; }
.presentation-frame { flex: 1; min-height: 0; display: flex; justify-content: center; align-items: center; }
.slide {
  width: min(1280px, 100%); aspect-ratio: 16 / 9; max-height: 100%; position: relative; overflow: hidden;
  border: 1px solid var(--border); border-radius: 18px;
  background: radial-gradient(circle at 90% 10%, rgba(16, 185, 129, 0.08), transparent 28%), #0b1713;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

/* CONTENT */
.content-slide { width: 100%; height: 100%; padding: 7% 8%; display: flex; flex-direction: column; }
.slide-heading { margin-bottom: 5%; }

/* HERO + SUMMARY */
.hero-slide, .summary-slide { width: 100%; height: 100%; position: relative; display: flex; align-items: center; padding: 8%; overflow: hidden; }
.hero-content, .summary-inner { position: relative; z-index: 2; max-width: 850px; }
.eyebrow { color: var(--green-light); font-size: 11px; font-weight: 800; letter-spacing: 0.18em; }
.hero-icon {
  width: 68px; height: 68px; display: grid; place-items: center; margin: 24px 0;
  border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 18px; background: var(--green-soft); color: var(--green-light);
}
.hero-content h1, .summary-inner h1 { margin: 0; max-width: 900px; font-size: clamp(42px, 6vw, 82px); line-height: 0.98; font-weight: 900; letter-spacing: -0.04em; }
.hero-content p { max-width: 760px; margin: 24px 0 0; color: var(--muted); font-size: clamp(15px, 1.4vw, 20px); line-height: 1.6; }
.hero-meta { display: flex; align-items: center; gap: 10px; margin-top: 30px; color: var(--muted); font-size: 11px; }
.dot { width: 4px; height: 4px; border-radius: 50%; background: var(--green); }
.hero-glow { position: absolute; width: 420px; height: 420px; border-radius: 50%; filter: blur(100px); background: rgba(16, 185, 129, 0.09); }
.glow-one { top: -180px; right: -80px; }
.glow-two { bottom: -220px; left: 20%; }

/* CONCEPT */
.concept-layout { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 6%; align-items: center; }
.concept-main { padding-right: 5%; }
.large-icon { width: 62px; height: 62px; display: grid; place-items: center; margin-bottom: 20px; border-radius: 16px; background: var(--green-soft); color: var(--green-light); font-size: 28px; }
.concept-text { margin: 0; color: #dce8e3; font-size: clamp(18px, 1.8vw, 27px); line-height: 1.55; }
.points-panel { display: flex; flex-direction: column; gap: 10px; }
.point-row { display: flex; gap: 15px; align-items: flex-start; padding: 15px; border: 1px solid var(--border); border-radius: 12px; background: rgba(255, 255, 255, 0.025); font-size: 13px; line-height: 1.45; }
.point-number { color: var(--green); font-size: 10px; font-weight: 900; }

/* CARDS */
.cards-grid { flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; min-height: 0; }
.info-card { position: relative; padding: 22px; border: 1px solid var(--border); border-radius: 15px; background: rgba(255, 255, 255, 0.025); overflow: hidden; }
.card-number { position: absolute; top: 15px; right: 18px; color: rgba(255, 255, 255, 0.12); font-size: 28px; font-weight: 900; }
.card-icon { width: 44px; height: 44px; display: grid; place-items: center; margin-bottom: 14px; border-radius: 11px; background: var(--green-soft); color: var(--green-light); }
.info-card h3 { margin: 0 0 7px; font-size: 16px; }
.info-card p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.55; }

/* COMPARISON */
.comparison-grid { flex: 1; display: grid; grid-template-columns: 1fr auto 1fr; gap: 25px; align-items: center; }
.comparison-panel { height: 100%; padding: 30px; border: 1px solid var(--border); border-radius: 17px; background: rgba(255, 255, 255, 0.025); }
.comparison-label { width: 32px; height: 32px; display: grid; place-items: center; margin-bottom: 20px; border-radius: 9px; background: var(--green); color: #042218; font-size: 11px; font-weight: 900; }
.comparison-panel h3 { margin: 0 0 18px; font-size: 22px; }
.comparison-panel ul { padding-left: 18px; margin: 0; }
.comparison-panel li { margin-bottom: 11px; color: var(--muted); font-size: 13px; line-height: 1.45; }
.comparison-divider { color: var(--green); }

/* PROCESS */
.process-track { flex: 1; display: grid; grid-template-columns: repeat(4, 1fr); align-items: center; gap: 12px; }
.process-step { position: relative; min-width: 0; }
.step-number { width: 52px; height: 52px; display: grid; place-items: center; margin-bottom: 18px; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 14px; background: var(--green-soft); color: var(--green-light); font-size: 12px; font-weight: 900; }
.step-line { position: absolute; top: 26px; left: 52px; right: -12px; height: 1px; background: rgba(16, 185, 129, 0.2); }
.process-step:last-child .step-line { display: none; }
.step-content { padding-right: 18px; }
.step-content h3 { margin: 0 0 7px; font-size: 16px; }
.step-content p { margin: 0; color: var(--muted); font-size: 12px; line-height: 1.5; }

/* ARCHITECTURE */
.architecture-stack { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 9px; }
.architecture-layer { position: relative; display: flex; align-items: center; gap: 20px; padding: 16px 20px; border: 1px solid var(--border); border-radius: 13px; background: rgba(255, 255, 255, 0.025); }
.architecture-index { color: var(--green); font-size: 11px; font-weight: 900; }
.architecture-content { flex: 1; }
.architecture-content h3 { margin: 0 0 4px; font-size: 15px; }
.architecture-content p { margin: 0; color: var(--muted); font-size: 11px; }
.architecture-arrow { position: absolute; bottom: -18px; left: 50%; z-index: 2; color: var(--green); }

/* TECHNICAL */
.technical-layout { flex: 1; display: grid; grid-template-columns: 0.9fr 1.1fr; gap: 6%; align-items: center; }
.technical-description { color: #dce8e3; font-size: 20px; line-height: 1.55; }
.technical-list { display: flex; flex-direction: column; gap: 11px; }
.technical-row { display: flex; align-items: flex-start; gap: 12px; padding: 12px 14px; border-radius: 10px; background: rgba(255, 255, 255, 0.025); color: var(--muted); font-size: 12px; line-height: 1.45; }
.technical-row .q-icon { flex-shrink: 0; color: var(--green); }

/* SCENARIO */
.scenario-grid { flex: 1; display: grid; grid-template-columns: 1fr auto 1fr; gap: 24px; align-items: center; }
.scenario-box { padding: 30px; min-height: 210px; border: 1px solid var(--border); border-radius: 18px; background: rgba(255, 255, 255, 0.025); }
.scenario-tag { margin-bottom: 16px; color: var(--green); font-size: 9px; font-weight: 900; letter-spacing: 0.15em; }
.scenario-icon { margin-bottom: 15px; color: var(--green-light); }
.scenario-box p { margin: 0; color: #dce8e3; font-size: 14px; line-height: 1.6; }
.scenario-arrow { color: var(--green); }

/* COMMAND */
.command-layout { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 25px; }
.terminal-window { border: 1px solid rgba(16, 185, 129, 0.22); border-radius: 15px; overflow: hidden; background: #050b09; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25); }
.terminal-header { position: relative; display: flex; align-items: center; gap: 6px; padding: 11px 14px; border-bottom: 1px solid rgba(255, 255, 255, 0.06); background: #0b1511; }
.terminal-header > span { width: 8px; height: 8px; border-radius: 50%; background: #33443d; }
.terminal-title { position: absolute; left: 50%; transform: translateX(-50%); color: var(--muted); font-size: 9px; }
.terminal-body { padding: 28px; }
.terminal-prompt { color: var(--green-light); font-family: monospace; font-size: clamp(16px, 1.6vw, 23px); font-weight: 700; }
.terminal-prompt span { margin-right: 10px; color: var(--green); }
.terminal-output { margin-top: 20px; padding-top: 17px; border-top: 1px solid rgba(255, 255, 255, 0.07); color: #7f968d; font-family: monospace; font-size: 11px; white-space: pre-wrap; }
.command-explanation { padding: 18px 20px; border: 1px solid var(--border); border-radius: 13px; background: rgba(255, 255, 255, 0.025); }
.command-label { margin-bottom: 8px; color: var(--green); font-size: 9px; font-weight: 900; letter-spacing: 0.15em; }
.command-explanation p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.5; }

/* TRIAD */
.triad-placeholder { flex: 1; display: flex; align-items: center; justify-content: center; gap: 70px; }
.triad-circle { width: 190px; height: 190px; display: grid; place-items: center; border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 50%; background: var(--green-soft); color: var(--green-light); font-size: 42px; font-weight: 900; }
.triad-items { width: 50%; display: flex; flex-direction: column; gap: 12px; }
.triad-item { display: flex; flex-direction: column; gap: 5px; padding: 15px; border: 1px solid var(--border); border-radius: 12px; background: rgba(255, 255, 255, 0.025); }
.triad-item strong { font-size: 14px; }
.triad-item span { color: var(--muted); font-size: 11px; }

/* SUMMARY */
.summary-slide { background: radial-gradient(circle at 75% 35%, rgba(16, 185, 129, 0.12), transparent 35%), #0b1713; }
.summary-subtitle { margin: 12px 0 30px; color: var(--muted); }
.summary-list { max-width: 800px; display: flex; flex-direction: column; gap: 8px; }
.summary-row { display: flex; align-items: flex-start; gap: 12px; padding: 10px 13px; border-radius: 10px; background: rgba(255, 255, 255, 0.025); color: #dce8e3; font-size: 12px; line-height: 1.45; }
.summary-check { width: 23px; height: 23px; display: grid; place-items: center; flex-shrink: 0; border-radius: 7px; background: var(--green); color: #042218; }

/* FALLBACK */
.fallback-content { flex: 1; overflow: auto; padding: 20px; border-radius: 15px; background: rgba(255, 255, 255, 0.025); }
.fallback-content pre { white-space: pre-wrap; color: var(--muted); }

/* CONTROLS */
.controls { height: 68px; min-height: 68px; display: grid; grid-template-columns: 150px 1fr 150px; align-items: center; gap: 20px; }
.controls-left, .controls-right { display: flex; align-items: center; gap: 7px; }
.controls-right { justify-content: flex-end; }
.control-label { color: var(--muted); font-size: 10px; }
.progress-container { min-width: 0; }
.progress-text { display: flex; justify-content: space-between; gap: 15px; margin-bottom: 6px; color: var(--muted); font-size: 9px; }
.progress-track { height: 4px; overflow: hidden; border-radius: 999px; background: rgba(255, 255, 255, 0.08); }
.progress-fill { height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--green), var(--green-light)); transition: width 0.25s ease; }

/* MOBILE */
.sidebar-overlay { display: none; }

@media (max-width: 900px) {
  .topbar { grid-template-columns: 1fr auto; }
  .topbar-center { display: none; }
  .sidebar { position: fixed; top: 68px; bottom: 0; left: 0; transform: translateX(-100%); transition: transform 0.25s ease; }
  .sidebar.open { transform: translateX(0); }
  .sidebar-overlay { display: block; position: fixed; inset: 68px 0 0; background: rgba(0, 0, 0, 0.55); z-index: 10; }
  .presentation-area { padding: 10px; }
  .slide { border-radius: 13px; }
  .controls { grid-template-columns: 100px 1fr 100px; gap: 8px; }
  .control-label { display: none; }
  .concept-layout, .technical-layout { grid-template-columns: 1fr; gap: 20px; }
  .comparison-grid, .scenario-grid { grid-template-columns: 1fr; gap: 10px; overflow-y: auto; }
  .comparison-divider, .scenario-arrow { display: none; }
  .process-track { grid-template-columns: 1fr 1fr; overflow-y: auto; }
  .step-line { display: none; }
  .triad-placeholder { gap: 25px; }
  .triad-circle { width: 120px; height: 120px; font-size: 28px; }
}

@media (max-width: 600px) {
  .course-info { display: none; }
  .content-slide { padding: 7%; }
  .cards-grid { grid-template-columns: 1fr; overflow-y: auto; }
  .hero-content h1, .summary-inner h1 { font-size: 38px; }
  .hero-content p { font-size: 14px; }
  .process-track { grid-template-columns: 1fr; }
  .triad-placeholder { flex-direction: column; overflow-y: auto; }
  .triad-items { width: 100%; }
}

/* =====================================================================
   THEMES (Cybersecurity vs Docker) — appended below
   ===================================================================== */
/* =====================================================================
   viewer-themes.css  
   Two completely different looks, switched by .theme-cyber / .theme-docker
   ===================================================================== */

/* ---- Shared fix: SlideHeading is a render-function child, so its inner
        elements never got the scoped attribute. :deep() targets them. ---- */
.learning-viewer :deep(.slide-label) { margin-bottom: 10px; font-size: 11px; font-weight: 800; }
.learning-viewer :deep(.slide-heading h2) {
  margin: 0; font-size: clamp(26px, 3vw, 46px); line-height: 1.1;
  font-weight: 850; letter-spacing: -0.02em; color: var(--text);
}

/* =====================================================================
   CYBERSECURITY  ·  dark SOC console, phosphor green, alerts in red
   ===================================================================== */
.learning-viewer.theme-cyber {
  --green: #19f28b; --green-light: #6dffb8; --green-soft: rgba(25, 242, 139, 0.1);
  --alert: #ff4d5e; --amber: #ffb020;
  --bg: #040807; --panel: #08110e; --border: rgba(25, 242, 139, 0.16);
  --text: #e2fff0; --muted: #80a494;
  --mono: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
}
.theme-cyber .topbar { background: rgba(4, 8, 7, 0.96); border-bottom-color: rgba(25, 242, 139, 0.25); }
.theme-cyber .sidebar { background: #060d0a; }
.theme-cyber .lesson-counter, .theme-cyber .slide-counter, .theme-cyber .lesson-number,
.theme-cyber .eyebrow, .theme-cyber .control-label, .theme-cyber .progress-text,
.theme-cyber .card-number, .theme-cyber .point-number, .theme-cyber .terminal-title,
.theme-cyber .scenario-tag, .theme-cyber .command-label, .theme-cyber .hero-meta,
.theme-cyber .sidebar-label { font-family: var(--mono); }
.theme-cyber .lesson-item, .theme-cyber .lesson-number { border-radius: 4px; }

/* slide: grid + corner brackets + faint scanlines */
.theme-cyber .slide {
  border-radius: 6px; border-color: rgba(25, 242, 139, 0.3);
  background:
    linear-gradient(rgba(25, 242, 139, 0.045) 1px, transparent 1px) 0 0 / 40px 40px,
    linear-gradient(90deg, rgba(25, 242, 139, 0.045) 1px, transparent 1px) 0 0 / 40px 40px,
    radial-gradient(circle at 85% 0%, rgba(25, 242, 139, 0.12), transparent 40%),
    #050c09;
  box-shadow: 0 0 0 1px rgba(25, 242, 139, 0.06), 0 0 70px rgba(25, 242, 139, 0.09);
}
.theme-cyber .slide::before {
  content: ''; position: absolute; inset: 12px; z-index: 3; pointer-events: none;
  background:
    linear-gradient(var(--green), var(--green)) top left / 24px 2px no-repeat,
    linear-gradient(var(--green), var(--green)) top left / 2px 24px no-repeat,
    linear-gradient(var(--green), var(--green)) top right / 24px 2px no-repeat,
    linear-gradient(var(--green), var(--green)) top right / 2px 24px no-repeat,
    linear-gradient(var(--green), var(--green)) bottom left / 24px 2px no-repeat,
    linear-gradient(var(--green), var(--green)) bottom left / 2px 24px no-repeat,
    linear-gradient(var(--green), var(--green)) bottom right / 24px 2px no-repeat,
    linear-gradient(var(--green), var(--green)) bottom right / 2px 24px no-repeat;
}
.theme-cyber .slide::after {
  content: ''; position: absolute; inset: 0; z-index: 3; pointer-events: none; opacity: 0.5;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0 1px, transparent 1px 3px);
}
.theme-cyber :deep(.slide-label) { color: var(--amber); font-family: var(--mono); letter-spacing: 0.18em; }
.theme-cyber :deep(.slide-label)::before { content: '// '; }
.theme-cyber :deep(.slide-heading h2) { text-transform: none; text-shadow: 0 0 24px rgba(25, 242, 139, 0.25); }

/* hero: radar */
.theme-cyber .radar {
  position: absolute; right: 7%; top: 50%; width: min(36%, 400px); aspect-ratio: 1;
  transform: translateY(-50%); border-radius: 50%; z-index: 1;
  border: 1px solid rgba(25, 242, 139, 0.45);
  background:
    linear-gradient(rgba(25, 242, 139, 0.3), rgba(25, 242, 139, 0.3)) center / 1px 100% no-repeat,
    linear-gradient(rgba(25, 242, 139, 0.3), rgba(25, 242, 139, 0.3)) center / 100% 1px no-repeat,
    repeating-radial-gradient(circle, transparent 0 15%, rgba(25, 242, 139, 0.22) 15% calc(15% + 1px));
}
.theme-cyber .radar::after {
  content: ''; position: absolute; inset: 0; border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(25, 242, 139, 0.4), transparent 22%);
  animation: radar-sweep 5s linear infinite;
}
.theme-cyber .radar span {
  position: absolute; width: 9px; height: 9px; border-radius: 50%; background: var(--alert);
  box-shadow: 0 0 12px var(--alert); top: 28%; left: 62%;
}
@keyframes radar-sweep { to { transform: rotate(360deg); } }
.theme-cyber .hero-icon { border-radius: 4px; }
.theme-cyber .hero-content h1 { text-shadow: 0 0 40px rgba(25, 242, 139, 0.3); }

/* cards: cut-corner panels, threats in red */
.theme-cyber .info-card {
  border-radius: 0; border-left: 3px solid var(--green);
  background: linear-gradient(135deg, rgba(25, 242, 139, 0.07), transparent 60%);
  clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%);
}
.theme-cyber .card-icon { border-radius: 4px; }
.theme-cyber .threat-grid .info-card { border-left-color: var(--alert); background: linear-gradient(135deg, rgba(255, 77, 94, 0.1), transparent 60%); }
.theme-cyber .threat-grid .card-icon { background: rgba(255, 77, 94, 0.14); color: var(--alert); }
.theme-cyber .point-row, .theme-cyber .technical-row, .theme-cyber .triad-item,
.theme-cyber .command-explanation, .theme-cyber .comparison-panel { border-radius: 2px; border-left: 2px solid var(--green); }

/* process: vertical execution log */
.theme-cyber .process-track { grid-template-columns: 1fr; align-content: center; gap: 10px; }
.theme-cyber .process-step {
  display: flex; align-items: center; gap: 18px; padding: 12px 16px;
  border: 1px solid var(--border); border-left: 3px solid var(--green); background: rgba(25, 242, 139, 0.04);
}
.theme-cyber .step-number { margin: 0; width: 44px; height: 44px; border-radius: 3px; flex-shrink: 0; font-family: var(--mono); }
.theme-cyber .step-line { display: none; }
.theme-cyber .step-content { display: flex; gap: 16px; align-items: baseline; padding: 0; }
.theme-cyber .step-content h3 { margin: 0; min-width: 170px; }

/* architecture: defense-in-depth funnel */
.theme-cyber .architecture-layer { border-radius: 0; border-left: 3px solid var(--green); }
.theme-cyber .architecture-layer:nth-child(2) { margin-inline: 3%; }
.theme-cyber .architecture-layer:nth-child(3) { margin-inline: 6%; }
.theme-cyber .architecture-layer:nth-child(4) { margin-inline: 9%; }
.theme-cyber .architecture-layer:nth-child(5) { margin-inline: 12%; }
.theme-cyber .architecture-layer:nth-child(n + 6) { margin-inline: 15%; }

/* scenario: attack (red) vs defense (green) */
.theme-cyber .scenario-box { border-radius: 2px; }
.theme-cyber .scenario-box.scenario { border-color: rgba(255, 77, 94, 0.45); background: rgba(255, 77, 94, 0.05); }
.theme-cyber .scenario-box.scenario .scenario-tag, .theme-cyber .scenario-box.scenario .scenario-icon { color: var(--alert); }

/* terminal */
.theme-cyber .terminal-window { border-radius: 4px; border-color: rgba(25, 242, 139, 0.45); box-shadow: 0 0 34px rgba(25, 242, 139, 0.14); }
.theme-cyber .terminal-header > span:nth-child(1) { background: var(--alert); }
.theme-cyber .terminal-header > span:nth-child(2) { background: var(--amber); }
.theme-cyber .terminal-header > span:nth-child(3) { background: var(--green); }
.theme-cyber .terminal-prompt { font-family: var(--mono); text-shadow: 0 0 12px rgba(25, 242, 139, 0.5); }
.theme-cyber .terminal-prompt span { font-size: 0; }
.theme-cyber .terminal-prompt span::before { content: 'root@raspi:~#'; font-size: clamp(11px, 1.1vw, 15px); color: var(--alert); }

/* summary */
.theme-cyber .summary-row { border-radius: 0; border-left: 2px solid var(--green); font-family: var(--mono); }
.theme-cyber .summary-check { border-radius: 2px; }

/* =====================================================================
   DOCKER  ·  light blueprint, shipping containers, layered images
   ===================================================================== */
.learning-viewer.theme-docker {
  --green: #2496ed; --green-light: #0b6fc2; --green-soft: rgba(36, 150, 237, 0.12);
  --ship: #f5a623; --navy: #0b214a;
  --bg: #e9f2fb; --panel: #ffffff; --border: rgba(11, 33, 74, 0.13);
  --text: #0b214a; --muted: #4d6480;
  font-family: 'Nunito', 'Trebuchet MS', 'Segoe UI', system-ui, sans-serif;
}
.theme-docker .topbar { background: rgba(255, 255, 255, 0.95); }
.theme-docker .sidebar { background: #ffffff; }
.theme-docker .lesson-item:hover { background: rgba(36, 150, 237, 0.07); }
.theme-docker .lesson-number { background: rgba(11, 33, 74, 0.06); }
.theme-docker .lesson-item.active .lesson-number,
.theme-docker .comparison-label, .theme-docker .summary-check { color: #fff; }
.theme-docker .progress-track { background: rgba(11, 33, 74, 0.1); }
.theme-docker .slide-counter { color: var(--green-light); border-color: rgba(36, 150, 237, 0.25); }

.theme-docker .slide {
  border-radius: 22px; border: 2px solid rgba(36, 150, 237, 0.25);
  background:
    linear-gradient(rgba(36, 150, 237, 0.08) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(36, 150, 237, 0.08) 1px, transparent 1px) 0 0 / 32px 32px,
    #fbfdff;
  box-shadow: 0 24px 60px rgba(11, 33, 74, 0.14);
}
.theme-docker :deep(.slide-label) {
  display: inline-block; padding: 4px 11px; border-radius: 6px;
  background: var(--green); color: #fff; letter-spacing: 0.08em;
}
.theme-docker :deep(.slide-heading h2) { font-weight: 900; }

/* hero: stacked containers on the water */
.theme-docker .hero-glow { display: none; }
.theme-docker .hero-icon { border: 0; border-radius: 16px; background: var(--green); color: #fff; box-shadow: 0 10px 24px rgba(36, 150, 237, 0.35); }
.theme-docker .hero-content h1 { letter-spacing: -0.03em; color: var(--navy); }
.theme-docker .eyebrow { color: var(--green-light); }
.theme-docker .container-stack {
  position: absolute; right: 6%; bottom: 14%; z-index: 1;
  display: grid; grid-template-columns: repeat(3, clamp(64px, 9vw, 116px)); gap: 6px;
  padding-bottom: 26px;
}
.theme-docker .container-stack span {
  height: clamp(28px, 4vw, 48px); border-radius: 4px;
  background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0 2px, transparent 2px 9px), var(--c, #2496ed);
  box-shadow: inset 0 -3px 0 rgba(0, 0, 0, 0.14);
}
.theme-docker .container-stack span:nth-child(1) { --c: #0b3a75; }
.theme-docker .container-stack span:nth-child(2) { --c: #f5a623; }
.theme-docker .container-stack span:nth-child(3) { --c: #2496ed; }
.theme-docker .container-stack span:nth-child(4) { --c: #1b7fd6; }
.theme-docker .container-stack span:nth-child(5) { --c: #0b3a75; }
.theme-docker .container-stack span:nth-child(6) { --c: #e8505b; }
.theme-docker .container-stack span:nth-child(7) { --c: #2496ed; }
.theme-docker .container-stack span:nth-child(8) { --c: #f5a623; }
.theme-docker .container-stack span:nth-child(9) { --c: #1b7fd6; }
.theme-docker .container-stack span:nth-child(n + 4):nth-child(-n + 6) { transform: translateX(calc(clamp(64px, 9vw, 116px) / 2)); }
.theme-docker .container-stack::after {
  content: ''; position: absolute; left: -30px; right: -30px; bottom: 0; height: 16px;
  background: radial-gradient(circle at 12px -3px, transparent 11px, #2496ed 12px) 0 0 / 24px 16px repeat-x;
}

/* cards: shipping containers with corrugated lid */
.theme-docker .cards-grid { grid-template-columns: repeat(3, 1fr); }
.theme-docker .info-card {
  padding-top: 34px; border: 2px solid var(--green); border-radius: 10px; background: #fff;
}
.theme-docker .info-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 14px;
  background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.35) 0 2px, transparent 2px 8px), var(--green);
}
.theme-docker .threat-grid .info-card { border-color: var(--ship); }
.theme-docker .threat-grid .info-card::before { background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.35) 0 2px, transparent 2px 8px), var(--ship); }
.theme-docker .card-number { top: 24px; color: rgba(36, 150, 237, 0.22); }
.theme-docker .card-icon { border-radius: 8px; }
.theme-docker .info-card p, .theme-docker .point-row, .theme-docker .technical-row { color: var(--muted); }

.theme-docker .concept-text, .theme-docker .technical-description,
.theme-docker .scenario-box p, .theme-docker .summary-row { color: var(--text); }
.theme-docker .point-row, .theme-docker .technical-row, .theme-docker .comparison-panel,
.theme-docker .command-explanation, .theme-docker .triad-item, .theme-docker .summary-row {
  background: #fff; border: 1px solid var(--border); border-left: 6px solid var(--green); border-radius: 10px;
}
.theme-docker .comparison-panel { border-left-width: 1px; border-top: 6px solid var(--green); }
.theme-docker .comparison-panel:last-child { border-top-color: var(--ship); }

/* process: build pipeline with arrows */
.theme-docker .step-number { border: 0; border-radius: 10px; background: var(--green); color: #fff; }
.theme-docker .step-line {
  height: 0; border-top: 2px dashed rgba(36, 150, 237, 0.55); left: 60px; right: -6px;
}
.theme-docker .step-line::after {
  content: ''; position: absolute; right: -2px; top: -6px;
  border-left: 8px solid rgba(36, 150, 237, 0.75); border-top: 5px solid transparent; border-bottom: 5px solid transparent;
}

/* architecture: image layers stacked, top layer = writable */
.theme-docker .architecture-stack { gap: 0; }
.theme-docker .architecture-layer { border: 0; border-radius: 0; color: #fff; padding: 18px 24px; }
.theme-docker .architecture-layer:first-child { border-radius: 12px 12px 0 0; }
.theme-docker .architecture-layer:last-child { border-radius: 0 0 12px 12px; }
.theme-docker .architecture-layer:nth-child(1) { background: #1b7fd6; }
.theme-docker .architecture-layer:nth-child(2) { background: #1769b8; }
.theme-docker .architecture-layer:nth-child(3) { background: #13579c; }
.theme-docker .architecture-layer:nth-child(4) { background: #0f4682; }
.theme-docker .architecture-layer:nth-child(n + 5) { background: #0b3a75; }
.theme-docker .architecture-content p { color: rgba(255, 255, 255, 0.82); }
.theme-docker .architecture-index { color: #bfe3ff; }
.theme-docker .architecture-arrow { display: none; }

/* scenario: problem (dashed amber) → container solution (solid blue) */
.theme-docker .scenario-box { border-radius: 14px; background: #fff; }
.theme-docker .scenario-box.scenario { border: 2px dashed var(--ship); }
.theme-docker .scenario-box.solution { border: 2px solid var(--green); }
.theme-docker .scenario-box.scenario .scenario-tag, .theme-docker .scenario-box.scenario .scenario-icon { color: #c47f0a; }

/* terminal */
.theme-docker .terminal-window { border-color: transparent; border-radius: 14px; background: #0a1e3f; box-shadow: 0 16px 40px rgba(11, 33, 74, 0.3); }
.theme-docker .terminal-header { background: #12305f; }
.theme-docker .terminal-prompt { color: #9fd4ff; }
.theme-docker .terminal-prompt span { color: var(--ship); }
.theme-docker .terminal-output { color: #8fb3d9; }
.theme-docker .command-label, .theme-docker .scenario-tag { color: var(--green-light); }

/* summary */
.theme-docker .summary-slide {
  background: linear-gradient(135deg, rgba(36, 150, 237, 0.14), transparent 55%);
}
.theme-docker .summary-inner h1 { color: var(--navy); }

@media (prefers-reduced-motion: reduce) {
  .theme-cyber .radar::after { animation: none; }
}
@media (max-width: 600px) {
  .theme-docker .cards-grid { grid-template-columns: 1fr; }
  .theme-cyber .radar, .theme-docker .container-stack { display: none; }
}
</style>