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
        <div class="lesson-counter">
          Lesson {{ currentIndex + 1 }} / {{ normalizedLessons.length }}
        </div>
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
      <aside class="sidebar" :class="{ open: sidebarOpen, collapsed: sidebarCollapsed }">
        <div class="sidebar-header">
          <div class="sidebar-label">COURSE CONTENT</div>
          <div class="sidebar-course">{{ courseTitle }}</div>

          <q-btn
            flat
            round
            dense
            :icon="sidebarCollapsed ? 'chevron_right' : 'chevron_left'"
            class="sidebar-collapse-btn gt-sm"
            :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            @click="sidebarCollapsed = !sidebarCollapsed"
          />
        </div>

        <div class="lesson-list">
          <button
            v-for="(lesson, index) in normalizedLessons"
            :key="lesson.id || index"
            class="lesson-item"
            :class="{ active: index === currentIndex }"
            @click="selectLesson(index)"
          >
            <div class="lesson-number">
              {{ String(index + 1).padStart(2, '0') }}
            </div>

            <div class="lesson-item-content">
              <div class="lesson-item-title">{{ lesson.title }}</div>
              <div class="lesson-item-category">{{ lesson.category }}</div>
            </div>

            <q-icon v-if="index === currentIndex" name="chevron_right" size="18px" />
          </button>
        </div>
      </aside>

      <div v-if="sidebarOpen" class="sidebar-overlay" @click="sidebarOpen = false" />

      <!-- MAIN -->
      <main class="presentation-area">
        <div class="presentation-frame">
          <section
            v-if="currentSlide"
            :key="`${currentLesson?.id}-${slideIndex}`"
            class="slide"
            :class="[
              `slide-${currentSlide.type}`,
              `template-${currentLesson?.template || 'default'}`,
              {
                'redblue-slide': topic === 'redblue',
              },
            ]"
          >
            <!-- ===================================================== -->
            <!-- HERO -->
            <!-- ===================================================== -->

            <template v-if="currentSlide.type === 'hero'">
              <div class="hero-slide">
                <div class="hero-glow glow-one" />
                <div class="hero-glow glow-two" />

                <div v-if="topic === 'redblue'" class="hero-visual redblue-hero-visual">
                  <div class="rb-hero-grid" />

                  <div class="rb-hero-split">
                    <div class="rb-hero-side rb-hero-red">
                      <span class="material-icons">bolt</span>
                      <strong>RED TEAM</strong>
                      <small>OFFENSE</small>
                    </div>

                    <div class="rb-hero-core">
                      <span class="material-icons">security</span>
                      <strong>VS</strong>
                    </div>

                    <div class="rb-hero-side rb-hero-blue">
                      <span class="material-icons">shield</span>
                      <strong>BLUE TEAM</strong>
                      <small>DEFENSE</small>
                    </div>
                  </div>

                  <div class="hero-visual-label">
                    <span>SECURITY OPERATIONS</span>
                    <strong>RED &amp; BLUE</strong>
                  </div>
                </div>

                <div v-else-if="topic === 'cyber'" class="hero-visual cyber-hero-visual">
                  <div class="hero-radar-grid">
                    <span class="radar-ring ring-1" />
                    <span class="radar-ring ring-2" />
                    <span class="radar-ring ring-3" />
                    <span class="radar-cross horizontal" />
                    <span class="radar-cross vertical" />
                    <span class="radar-sweep" />
                    <i class="radar-dot dot-a" />
                    <i class="radar-dot dot-b" />
                    <i class="radar-dot dot-c" />
                  </div>

                  <div class="hero-visual-label">
                    <span>LIVE SECURITY MONITOR</span>
                    <strong>PROTECTED</strong>
                  </div>
                </div>

                <div v-else class="hero-visual docker-hero-visual">
                  <div class="docker-whale">
                    <div class="whale-body">
                      <span v-for="n in 5" :key="n" />
                    </div>
                    <div class="whale-tail">-</div>
                    <div class="whale-base" />
                  </div>

                  <div class="docker-floating-card card-one">
                    <q-icon name="layers" />
                    IMAGE
                  </div>
                  <div class="docker-floating-card card-two">
                    <q-icon name="view_in_ar" />
                    CONTAINER
                  </div>
                </div>

                <div class="hero-content">
                  <div class="eyebrow">
                    {{ currentLesson?.category || 'LEARNING MODULE' }}
                  </div>

                  <div class="hero-icon">
                    <q-icon :name="resolveIcon(currentLesson?.icon)" size="42px" />
                  </div>

                  <h1>{{ currentSlide.title }}</h1>
                  <p>{{ currentSlide.subtitle }}</p>

                  <div class="hero-meta">
                    <span>LESSON {{ String(currentIndex + 1).padStart(2, '0') }}</span>
                    <span class="dot" />
                    <span>{{ slides.length }} SLIDES</span>
                  </div>
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- CONCEPT -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'concept'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="CONCEPT" />

                <div class="concept-layout">
                  <div class="concept-main">
                    <div class="concept-badge">
                      <q-icon :name="resolveIcon(currentLesson?.icon)" />
                      <span>CORE IDEA</span>
                    </div>

                    <p class="concept-text">
                      {{ currentSlide.content }}
                    </p>

                    <div v-if="currentSlide.points?.length" class="concept-points">
                      <div
                        v-for="(point, index) in currentSlide.points"
                        :key="index"
                        class="concept-point"
                      >
                        <span>{{ String(index + 1).padStart(2, '0') }}</span>
                        <strong>{{ point }}</strong>
                      </div>
                    </div>
                  </div>

                  <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" />
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- CARDS -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'cards'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="KEY CONCEPTS" />

                <div class="cards-layout">
                  <div class="cards-grid">
                    <div
                      v-for="(card, index) in currentSlide.cards || []"
                      :key="index"
                      class="info-card"
                    >
                      <div class="card-number">
                        {{ String(index + 1).padStart(2, '0') }}
                      </div>

                      <div class="card-icon">
                        <q-icon
                          :name="resolveIcon(card.icon || getFallbackIcon(card.title))"
                          size="25px"
                        />
                      </div>

                      <h3>{{ card.title }}</h3>

                      <p v-if="card.text">
                        {{ card.text }}
                      </p>
                    </div>
                  </div>

                  <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" compact />
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- COMPARISON -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'comparison'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="COMPARISON" />

                <div class="comparison-layout">
                  <div class="comparison-grid">
                    <div class="comparison-panel comparison-left">
                      <div class="comparison-label">A</div>
                      <div class="comparison-icon">
                        <q-icon :name="getFallbackIcon(currentSlide.left?.title)" size="30px" />
                      </div>

                      <h3>{{ currentSlide.left?.title }}</h3>

                      <ul>
                        <li v-for="(point, index) in currentSlide.left?.points || []" :key="index">
                          {{ point }}
                        </li>
                      </ul>
                    </div>

                    <div class="comparison-divider">
                      <div>VS</div>
                      <q-icon name="compare_arrows" size="28px" />
                    </div>

                    <div class="comparison-panel comparison-right">
                      <div class="comparison-label">B</div>
                      <div class="comparison-icon">
                        <q-icon :name="getFallbackIcon(currentSlide.right?.title)" size="30px" />
                      </div>

                      <h3>{{ currentSlide.right?.title }}</h3>

                      <ul>
                        <li v-for="(point, index) in currentSlide.right?.points || []" :key="index">
                          {{ point }}
                        </li>
                      </ul>
                    </div>
                  </div>

                  <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" compact />
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- PROCESS -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'process'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="PROCESS" />

                <div class="process-layout">
                  <div class="process-track">
                    <div
                      v-for="(step, index) in currentSlide.steps || []"
                      :key="index"
                      class="process-step"
                    >
                      <div class="step-number">
                        {{ step.number || String(index + 1).padStart(2, '0') }}
                      </div>

                      <div class="step-line" />

                      <div class="step-icon">
                        <q-icon :name="resolveIcon(step.icon || getFallbackIcon(step.title))" />
                      </div>

                      <div class="step-content">
                        <h3>{{ step.title }}</h3>
                        <p>{{ step.text }}</p>
                      </div>
                    </div>
                  </div>

                  <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" compact />
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- ARCHITECTURE -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'architecture'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="ARCHITECTURE" />

                <div class="architecture-layout">
                  <div class="architecture-stack">
                    <div
                      v-for="(layer, index) in currentSlide.layers || []"
                      :key="index"
                      class="architecture-layer"
                    >
                      <div class="architecture-index">
                        {{ String(index + 1).padStart(2, '0') }}
                      </div>

                      <div class="architecture-layer-icon">
                        <q-icon :name="resolveIcon(layer.icon || getFallbackIcon(layer.title))" />
                      </div>

                      <div class="architecture-content">
                        <h3>{{ layer.title }}</h3>
                        <p>{{ layer.text }}</p>
                      </div>

                      <q-icon
                        v-if="index < currentSlide.layers.length - 1"
                        name="south"
                        class="architecture-arrow"
                      />
                    </div>
                  </div>

                  <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" compact />
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- TECHNICAL -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'technical'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="TECHNICAL" />

                <div class="technical-layout">
                  <div class="technical-description">
                    <div class="technical-icon">
                      <q-icon name="terminal" size="30px" />
                    </div>

                    <p v-if="currentSlide.content">
                      {{ currentSlide.content }}
                    </p>

                    <div class="technical-mini-screen">
                      <span>&gt; SYSTEM</span>
                      <strong>READY</strong>
                      <span>&gt; ANALYSIS</span>
                      <strong>ACTIVE</strong>
                    </div>
                  </div>

                  <div class="technical-right">
                    <div class="technical-list">
                      <div
                        v-for="(point, index) in currentSlide.points || []"
                        :key="index"
                        class="technical-row"
                      >
                        <q-icon name="check_circle" size="20px" />
                        <span>{{ point }}</span>
                      </div>
                    </div>

                    <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" compact />
                  </div>
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- SCENARIO -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'scenario'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="REAL-WORLD SCENARIO" />

                <div class="scenario-layout">
                  <div class="scenario-grid">
                    <div class="scenario-box scenario">
                      <div class="scenario-tag">THREAT / PROBLEM</div>

                      <div class="scenario-icon">
                        <q-icon name="warning" size="32px" />
                      </div>

                      <p>{{ currentSlide.scenario }}</p>
                    </div>

                    <div class="scenario-arrow">
                      <div>PROTECT</div>
                      <q-icon name="arrow_forward" size="30px" />
                    </div>

                    <div class="scenario-box solution">
                      <div class="scenario-tag">SOLUTION / DEFENSE</div>

                      <div class="scenario-icon">
                        <q-icon name="verified" size="32px" />
                      </div>

                      <p>{{ currentSlide.solution }}</p>
                    </div>
                  </div>

                  <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" compact />
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- COMMAND -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'command'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="COMMAND" />

                <div class="command-layout">
                  <div class="terminal-window">
                    <div class="terminal-header">
                      <span />
                      <span />
                      <span />
                      <div class="terminal-title">raspi-server - terminal</div>
                    </div>

                    <div class="terminal-body">
                      <div class="terminal-user">tyrone@raspi-server:~$</div>

                      <div class="terminal-prompt">
                        {{ currentSlide.command }}
                      </div>

                      <div v-if="currentSlide.example" class="terminal-output">
                        {{ currentSlide.example }}
                      </div>

                      <div class="terminal-cursor">_</div>
                    </div>
                  </div>

                  <div class="command-bottom">
                    <div class="command-explanation">
                      <div class="command-label">WHAT IT DOES</div>
                      <p>{{ currentSlide.explanation }}</p>
                    </div>

                    <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" compact />
                  </div>
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- TRIAD -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'triad'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="SECURITY MODEL" />

                <div class="triad-layout">
                  <div class="triad-visual">
                    <div class="triad-orbit orbit-one" />
                    <div class="triad-orbit orbit-two" />
                    <div class="triad-orbit orbit-three" />

                    <div class="triad-circle">
                      <strong>CIA</strong>
                      <span>SECURITY</span>
                    </div>

                    <div class="triad-corner confidentiality">
                      <q-icon name="lock" />
                      <strong>CONFIDENTIALITY</strong>
                    </div>

                    <div class="triad-corner integrity">
                      <q-icon name="verified" />
                      <strong>INTEGRITY</strong>
                    </div>

                    <div class="triad-corner availability">
                      <q-icon name="bolt" />
                      <strong>AVAILABILITY</strong>
                    </div>
                  </div>

                  <div class="triad-items">
                    <div
                      v-for="(item, index) in currentSlide.items || []"
                      :key="index"
                      class="triad-item"
                    >
                      <div class="triad-item-number">
                        {{ String(index + 1).padStart(2, '0') }}
                      </div>

                      <div>
                        <strong>{{ item.title }}</strong>
                        <span>{{ item.text }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- THREAT GRID -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'threatGrid'">
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="THREATS" />

                <div class="threat-layout">
                  <div class="cards-grid threat-grid">
                    <div
                      v-for="(threat, index) in currentSlide.threats || currentSlide.cards || []"
                      :key="index"
                      class="info-card"
                    >
                      <div class="card-number">
                        {{ String(index + 1).padStart(2, '0') }}
                      </div>

                      <div class="card-icon">
                        <q-icon
                          :name="
                            resolveIcon(threat.icon || getFallbackIcon(threat.title || 'warning'))
                          "
                          size="25px"
                        />
                      </div>

                      <h3>{{ threat.title }}</h3>
                      <p>{{ threat.text || threat.description }}</p>
                    </div>
                  </div>

                  <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" compact />
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- SUMMARY -->
            <!-- ===================================================== -->
            <template v-else-if="currentSlide.type === 'summary'">
              <div class="summary-slide" :class="{ 'summary-redblue': topic === 'redblue' }">
                <div class="summary-visual">
                  <div class="summary-core">
                    <q-icon
                      :name="
                        topic === 'cyber'
                          ? 'security'
                          : topic === 'redblue'
                            ? 'compare_arrows'
                            : 'inventory_2'
                      "
                      size="38px"
                    />
                    <strong>{{ topic === 'redblue' ? 'SECURED' : 'COMPLETE' }}</strong>
                  </div>

                  <span v-for="n in 8" :key="n" class="summary-orbit" :class="`orbit-${n}`">
                    {{ String(n).padStart(2, '0') }}
                  </span>

                  <template v-if="topic === 'redblue'">
                    <div class="rb-summary-side rb-summary-side-red">
                      <q-icon name="bolt" />
                      <span>RED</span>
                      <small>OFFENSE</small>
                    </div>

                    <div class="rb-summary-side rb-summary-side-blue">
                      <q-icon name="shield" />
                      <span>BLUE</span>
                      <small>DEFENSE</small>
                    </div>
                  </template>
                </div>

                <div class="summary-inner">
                  <div class="eyebrow">
                    {{ topic === 'redblue' ? 'RED & BLUE // MISSION COMPLETE' : 'MODULE COMPLETE' }}
                  </div>

                  <h1>{{ currentSlide.title }}</h1>

                  <p class="summary-subtitle">
                    {{ currentLesson?.title }}
                  </p>

                  <div class="summary-list">
                    <div
                      v-for="(point, index) in currentSlide.points || []"
                      :key="index"
                      class="summary-row"
                    >
                      <div class="summary-check">
                        <q-icon name="check" size="18px" />
                      </div>
                      <span>{{ point }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <!-- ===================================================== -->
            <!-- FALLBACK -->
            <!-- ===================================================== -->
            <template v-else>
              <div class="content-slide">
                <SlideHeading :slide="currentSlide" label="LEARNING" />

                <div class="fallback-layout">
                  <div class="fallback-content">
                    <pre>{{ currentSlide }}</pre>
                  </div>

                  <VisualPanel :visual="getSlideVisual(currentSlide, currentLesson)" />
                </div>
              </div>
            </template>
          </section>
        </div>

        <!-- CONTROLS -->
        <div class="controls">
          <div class="controls-left">
            <q-btn
              flat
              round
              icon="keyboard_arrow_left"
              :disable="isFirst"
              @click="previousSlide"
            />
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
            <span class="control-label">
              {{ isLastSlideOfLesson ? 'Next Lesson' : 'Next' }}
            </span>

            <q-btn
              unelevated
              round
              icon="keyboard_arrow_right"
              :disable="isLastOverall"
              @click="nextSlide"
            />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineComponent,
  getCurrentInstance,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  resolveComponent,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  lessons: {
    type: Array,
    required: true,
  },
})

const route = useRoute()
const router = useRouter()

const currentIndex = ref(0)
const slideIndex = ref(0)
const sidebarOpen = ref(false)
const sidebarCollapsed = ref(false)
const isFullscreen = ref(false)

/* ============================================================
   COURSE
   ============================================================ */

const courseTitle = computed(() => {
  if (!props.lessons.length) return 'Learning Module'

  const firstCategory = props.lessons[0]?.category || ''
  const firstTitle = props.lessons[0]?.title || ''
  const joined = `${firstCategory} ${firstTitle}`.toLowerCase()

  if (joined.includes('docker')) {
    return 'Docker Fundamentals'
  }

  if (
    joined.includes('red team') ||
    joined.includes('blue team') ||
    joined.includes('purple team') ||
    joined.includes('red & blue') ||
    joined.includes('redblue')
  ) {
    return 'Red Team & Blue Team'
  }

  if (joined.includes('cyber')) {
    return 'Cybersecurity Fundamentals'
  }

  return firstCategory || 'Learning Module'
})

const topic = computed(() => {
  const title = courseTitle.value.toLowerCase()

  if (title.includes('docker')) return 'docker'

  if (
    title.includes('red team') ||
    title.includes('blue team') ||
    title.includes('purple team') ||
    title.includes('red & blue')
  ) {
    return 'redblue'
  }

  return 'cyber'
})

/* ============================================================
   LESSON NORMALIZATION
   ============================================================ */

function normalizeLesson(lesson) {
  if (!lesson) return null

  if (Array.isArray(lesson.slides)) {
    return {
      ...lesson,
      slides: lesson.slides.map((slide) => ({
        ...slide,
        visual: slide.visual || null,
      })),
    }
  }

  const generatedSlides = []

  generatedSlides.push({
    type: 'hero',
    title: lesson.title,
    subtitle:
      lesson.subtitle ||
      lesson.overview ||
      'Learn the key concepts and practical ideas behind this topic.',
  })

  if (lesson.overview) {
    generatedSlides.push({
      type: 'concept',
      title: 'Overview',
      content: lesson.overview,
      points: [],
      visual: lesson.visual || null,
    })
  }

  if (Array.isArray(lesson.sections)) {
    lesson.sections.forEach((section) => {
      if (section.bullets?.length) {
        generatedSlides.push({
          type: 'cards',
          title: section.title,
          cards: section.bullets.map((bullet, index) => ({
            title: typeof bullet === 'string' ? bullet : bullet.title || `Concept ${index + 1}`,
            icon:
              typeof bullet === 'object'
                ? bullet.icon
                : getFallbackIcon(typeof bullet === 'string' ? bullet : ''),
            text: typeof bullet === 'object' ? bullet.text || bullet.description || '' : '',
          })),
          visual: section.visual || lesson.visual || null,
        })
      } else if (section.content) {
        generatedSlides.push({
          type: 'concept',
          title: section.title,
          content: section.content,
          points: section.points || [],
          visual: section.visual || lesson.visual || null,
        })
      }
    })
  }

  if (lesson.code?.content) {
    generatedSlides.push({
      type: 'command',
      title: lesson.code.title || 'Example Command',
      command: lesson.code.content,
      example: lesson.code.example || '',
      explanation:
        lesson.code.explanation ||
        'This command can be used as part of the practical administration or security workflow for this topic.',
      visual: lesson.code.visual || null,
    })
  }

  if (lesson.example) {
    generatedSlides.push({
      type: 'scenario',
      title: lesson.example.title || 'Practical Example',
      scenario: lesson.example.content,
      solution:
        lesson.example.solution ||
        'Apply the concept carefully as part of the overall security and system-management process.',
      visual: lesson.example.visual || null,
    })
  }

  generatedSlides.push({
    type: 'summary',
    title: 'Key Takeaways',
    points: [
      lesson.title,
      lesson.overview || lesson.subtitle,
      ...(lesson.sections || [])
        .flatMap((section) => section.bullets || [])
        .map((item) => (typeof item === 'string' ? item : item.title))
        .slice(0, 4),
    ].filter(Boolean),
  })

  return {
    ...lesson,
    template: lesson.template || 'editorial',
    slides: generatedSlides,
  }
}

const normalizedLessons = computed(() => props.lessons.map(normalizeLesson).filter(Boolean))

const currentLesson = computed(() => normalizedLessons.value[currentIndex.value] || null)

const slides = computed(() => currentLesson.value?.slides || [])

const currentSlide = computed(() => slides.value[slideIndex.value] || null)

/* ============================================================
   AUTOMATIC VISUAL SYSTEM
   ============================================================ */

function getSlideVisual(slide, lesson) {
  const lessonId = Number(lesson?.id || 0)
  const slideTitle = String(slide?.title || '').toLowerCase()
  const slideContent = String(
    [
      slide?.title,
      slide?.content,
      slide?.subtitle,
      ...(Array.isArray(slide?.points) ? slide.points : []),
      ...(Array.isArray(slide?.cards)
        ? slide.cards.flatMap((card) => [
            typeof card === 'string' ? card : card?.title,
            typeof card === 'string' ? '' : card?.text,
          ])
        : []),
    ]
      .filter(Boolean)
      .join(' '),
  ).toLowerCase()

  const text = [
    slideTitle,
    slideContent,
    String(lesson?.title || '').toLowerCase(),
    String(lesson?.category || '').toLowerCase(),
  ]
    .filter(Boolean)
    .join(' ')

  /*
   * RED / BLUE TEAM
   *
   * This branch intentionally runs before slide.visual.
   * normalizeLesson() may inherit the lesson-level visual onto
   * every generated slide. For Red/Blue lessons, we want the
   * visualization to follow the actual slide concept instead.
   */
  if (topic.value === 'redblue') {
    const has = (...words) => words.some((word) => text.includes(word))

    /*
     * LESSON 1 â€” RED TEAM / BLUE TEAM INTRODUCTION
     */
    if (lessonId === 1) {
      if (has('blue team', 'defender', 'defense', 'defensive')) {
        return {
          type: 'blue-team',
          title: 'BLUE TEAM DEFENSE',
        }
      }

      if (has('purple team', 'collaboration', 'improvement')) {
        return {
          type: 'purple-team',
          title: 'PURPLE TEAM COLLABORATION',
        }
      }

      if (has('red team', 'offense', 'attacker', 'attack')) {
        return {
          type: 'redblue-overview',
          title: 'RED TEAM â†” BLUE TEAM',
        }
      }

      return {
        type: 'redblue-overview',
        title: 'RED / BLUE SECURITY MODEL',
      }
    }

    /*
     * LESSON 2 â€” RED TEAM
     */
    if (lessonId === 2) {
      if (has('recon', 'reconnaissance', 'discover', 'target', 'asset')) {
        return {
          type: 'recon',
          title: 'RED TEAM RECONNAISSANCE',
        }
      }

      if (has('vulnerability', 'weakness', 'assessment', 'scan')) {
        return {
          type: 'vulnerability',
          title: 'ATTACK SURFACE ASSESSMENT',
        }
      }

      if (has('simulation', 'simulate', 'attack path', 'exploit')) {
        return {
          type: 'attack-simulation',
          title: 'CONTROLLED ATTACK SIMULATION',
        }
      }

      return {
        type: 'red-team',
        title: 'RED TEAM OPERATIONS',
      }
    }

    /*
     * LESSON 3 â€” ROLES
     */
    if (lessonId === 3) {
      if (has('blue team', 'defender', 'defensive', 'soc', 'analyst')) {
        return {
          type: 'blue-team',
          title: 'BLUE TEAM ROLES',
        }
      }

      if (has('purple team', 'coordinator', 'collaboration')) {
        return {
          type: 'purple-team',
          title: 'PURPLE TEAM COORDINATION',
        }
      }

      if (has('red team', 'operator', 'offensive', 'attacker')) {
        return {
          type: 'red-team',
          title: 'RED TEAM ROLES',
        }
      }

      return {
        type: 'redblue-overview',
        title: 'SECURITY TEAM STRUCTURE',
      }
    }

    /*
     * LESSON 4 â€” RECONNAISSANCE
     */
    if (lessonId === 4) {
      if (has('asset', 'inventory', 'system', 'host', 'service')) {
        return {
          type: 'recon',
          title: 'TARGET ASSET DISCOVERY',
        }
      }

      if (has('enumeration', 'discovery', 'information gathering', 'collect')) {
        return {
          type: 'recon',
          title: 'RECONNAISSANCE DISCOVERY FLOW',
        }
      }

      return {
        type: 'recon',
        title: 'RECONNAISSANCE MAP',
      }
    }

    /*
     * LESSON 5 â€” VULNERABILITY ASSESSMENT
     */
    if (lessonId === 5) {
      if (has('priority', 'prioritize', 'risk', 'critical', 'high', 'medium', 'low')) {
        return {
          type: 'vulnerability',
          title: 'RISK PRIORITIZATION',
        }
      }

      if (has('finding', 'findings', 'weakness', 'result')) {
        return {
          type: 'vulnerability',
          title: 'VULNERABILITY FINDINGS',
        }
      }

      return {
        type: 'vulnerability',
        title: 'SCAN â†’ FIND â†’ PRIORITIZE',
      }
    }

    /*
     * LESSON 6 â€” ATTACK SIMULATION
     */
    if (lessonId === 6) {
      if (has('detect', 'detection', 'alert', 'monitor')) {
        return {
          type: 'attack-detection-response',
          title: 'ATTACK â†’ DETECTION',
        }
      }

      if (has('target', 'attack path', 'simulation', 'controlled')) {
        return {
          type: 'attack-simulation',
          title: 'CONTROLLED ATTACK PATH',
        }
      }

      return {
        type: 'attack-simulation',
        title: 'ATTACK SIMULATION',
      }
    }

    /*
     * LESSON 7 â€” RULES OF ENGAGEMENT
     */
    if (lessonId === 7) {
      if (has('scope', 'boundary', 'target')) {
        return {
          type: 'roe',
          title: 'AUTHORIZED TESTING SCOPE',
        }
      }

      if (has('authorization', 'approval', 'permission')) {
        return {
          type: 'roe',
          title: 'TEST AUTHORIZATION',
        }
      }

      if (has('rule', 'rules', 'safety', 'stop condition')) {
        return {
          type: 'roe',
          title: 'RULES OF ENGAGEMENT',
        }
      }

      return {
        type: 'roe',
        title: 'ROE CONTROL BOARD',
      }
    }

    /*
     * LESSON 8 â€” RED TEAM WORKFLOW
     */
    if (lessonId === 8) {
      if (has('recon', 'reconnaissance', 'discover')) {
        return {
          type: 'recon',
          title: '1 â€” RECONNAISSANCE',
        }
      }

      if (has('assess', 'assessment', 'vulnerability')) {
        return {
          type: 'vulnerability',
          title: '2 â€” ASSESSMENT',
        }
      }

      if (has('simulate', 'simulation', 'attack')) {
        return {
          type: 'attack-simulation',
          title: '3 â€” SIMULATION',
        }
      }

      if (has('report', 'reporting', 'document', 'communicate')) {
        return {
          type: 'red-workflow',
          title: '4 â€” REPORT & COMMUNICATE',
        }
      }

      return {
        type: 'red-workflow',
        title: 'RED TEAM END-TO-END WORKFLOW',
      }
    }

    /*
     * LESSON 9 â€” BLUE TEAM
     */
    if (lessonId === 9) {
      if (has('detect', 'detection', 'alert', 'monitor')) {
        return {
          type: 'detection',
          title: 'BLUE TEAM DETECTION',
        }
      }

      if (has('soc', 'security operations', 'analyst')) {
        return {
          type: 'monitoring',
          title: 'BLUE TEAM SOC',
        }
      }

      return {
        type: 'blue-team',
        title: 'BLUE TEAM DEFENSIVE ARCHITECTURE',
      }
    }

    /*
     * LESSON 10 â€” MONITORING
     */
    if (lessonId === 10) {
      if (has('log', 'logs', 'telemetry', 'event')) {
        return {
          type: 'log-analysis',
          title: 'SECURITY TELEMETRY',
        }
      }

      if (has('alert', 'detection', 'signal')) {
        return {
          type: 'detection',
          title: 'MONITOR â†’ DETECT â†’ ALERT',
        }
      }

      return {
        type: 'monitoring',
        title: 'SOC MONITORING DASHBOARD',
      }
    }

    /*
     * LESSON 11 â€” DETECTION
     */
    if (lessonId === 11) {
      if (has('event', 'log', 'telemetry')) {
        return {
          type: 'log-analysis',
          title: 'SECURITY EVENT INPUT',
        }
      }

      if (has('rule', 'rules', 'pattern', 'signature')) {
        return {
          type: 'detection',
          title: 'DETECTION RULE',
        }
      }

      if (has('alert', 'triage', 'analyst')) {
        return {
          type: 'monitoring',
          title: 'ALERT TRIAGE',
        }
      }

      return {
        type: 'detection',
        title: 'EVENT â†’ RULE â†’ ALERT',
      }
    }

    /*
     * LESSON 12 â€” INCIDENT RESPONSE
     */
    if (lessonId === 12) {
      if (has('detect', 'detection', 'alert')) {
        return {
          type: 'attack-detection-response',
          title: '1 â€” DETECT',
        }
      }

      if (has('analyze', 'analysis', 'investigate', 'evidence', 'timeline')) {
        return {
          type: 'detection',
          title: '2 â€” ANALYZE',
        }
      }

      if (has('contain', 'containment', 'isolate', 'block')) {
        return {
          type: 'attack-detection-response',
          title: '3 â€” CONTAIN',
        }
      }

      if (has('recover', 'recovery', 'restore', 'return')) {
        return {
          type: 'purple-team',
          title: '4 â€” RECOVER & IMPROVE',
        }
      }

      return {
        type: 'attack-detection-response',
        title: 'INCIDENT RESPONSE LIFECYCLE',
      }
    }

    /*
     * LESSON 13 â€” THREAT HUNTING
     */
    if (lessonId === 13) {
      if (has('hypothesis', 'question', 'assumption')) {
        return {
          type: 'threat-hunting',
          title: 'HUNT HYPOTHESIS',
        }
      }

      if (has('telemetry', 'data', 'logs', 'endpoint', 'network')) {
        return {
          type: 'log-analysis',
          title: 'HUNTING TELEMETRY',
        }
      }

      if (has('investigate', 'investigation', 'search', 'correlate')) {
        return {
          type: 'threat-hunting',
          title: 'INVESTIGATION PATH',
        }
      }

      return {
        type: 'threat-hunting',
        title: 'THREAT HUNTING WORKFLOW',
      }
    }

    /*
     * LESSON 14 â€” LOG ANALYSIS
     */
    if (lessonId === 14) {
      if (has('suspicious', 'anomaly', 'indicator', 'event')) {
        return {
          type: 'detection',
          title: 'SUSPICIOUS EVENT',
        }
      }

      if (has('correlate', 'correlation', 'timeline', 'sequence')) {
        return {
          type: 'log-analysis',
          title: 'EVENT CORRELATION',
        }
      }

      return {
        type: 'log-analysis',
        title: 'LOG â†’ CORRELATE â†’ INVESTIGATE',
      }
    }

    /*
     * LESSON 15 â€” BLUE TEAM TOOLS
     */
    if (lessonId === 15) {
      if (has('siem', 'security information', 'central')) {
        return {
          type: 'monitoring',
          title: 'SIEM OPERATIONS',
        }
      }

      if (has('ids', 'intrusion detection', 'network detection')) {
        return {
          type: 'detection',
          title: 'IDS / NETWORK DETECTION',
        }
      }

      if (has('edr', 'endpoint', 'host')) {
        return {
          type: 'blue-team',
          title: 'ENDPOINT DEFENSE',
        }
      }

      if (has('firewall', 'network', 'traffic')) {
        return {
          type: 'network-firewall',
          title: 'NETWORK DEFENSE',
        }
      }

      return {
        type: 'blue-team',
        title: 'BLUE TEAM TOOLCHAIN',
      }
    }

    /*
     * LESSON 16 â€” RED VS BLUE
     */
    if (lessonId === 16) {
      if (has('red team', 'offense', 'attack', 'attacker')) {
        return {
          type: 'red-team',
          title: 'RED TEAM â€” OFFENSE',
        }
      }

      if (has('blue team', 'defense', 'defender', 'detection')) {
        return {
          type: 'blue-team',
          title: 'BLUE TEAM â€” DEFENSE',
        }
      }

      return {
        type: 'red-vs-blue',
        title: 'RED VS BLUE',
      }
    }

    /*
     * LESSON 17 â€” PURPLE TEAM
     */
    if (lessonId === 17) {
      if (has('red finding', 'red team', 'attack')) {
        return {
          type: 'red-team',
          title: 'RED FINDING',
        }
      }

      if (has('blue detection', 'blue team', 'detect')) {
        return {
          type: 'detection',
          title: 'BLUE DETECTION',
        }
      }

      if (has('improve', 'improvement', 'feedback', 'collaborate')) {
        return {
          type: 'purple-team',
          title: 'PURPLE FEEDBACK LOOP',
        }
      }

      return {
        type: 'purple-team',
        title: 'PURPLE TEAM COLLABORATION',
      }
    }

    /*
     * LESSON 18 â€” SECURITY CYCLE
     */
    if (lessonId === 18) {
      if (has('attack', 'red team', 'simulate')) {
        return {
          type: 'red-team',
          title: 'OFFENSIVE TESTING',
        }
      }

      if (has('detect', 'blue team', 'monitor')) {
        return {
          type: 'detection',
          title: 'DEFENSIVE DETECTION',
        }
      }

      if (has('improve', 'improvement', 'feedback', 'continuous')) {
        return {
          type: 'purple-team',
          title: 'CONTINUOUS IMPROVEMENT',
        }
      }

      return {
        type: 'attack-detection-response',
        title: 'CONTINUOUS SECURITY CYCLE',
      }
    }

    /*
     * LESSON 19 â€” COMPLETE SCENARIO
     */
    if (lessonId === 19) {
      if (has('recon', 'discover', 'target')) {
        return {
          type: 'recon',
          title: 'SCENARIO â€” RECON',
        }
      }

      if (has('attack', 'simulate', 'red team')) {
        return {
          type: 'attack-simulation',
          title: 'SCENARIO â€” ATTACK',
        }
      }

      if (has('detect', 'alert', 'blue team')) {
        return {
          type: 'detection',
          title: 'SCENARIO â€” DETECTION',
        }
      }

      if (has('respond', 'response', 'contain', 'recover')) {
        return {
          type: 'attack-detection-response',
          title: 'SCENARIO â€” RESPONSE',
        }
      }

      return {
        type: 'redblue-scenario',
        title: 'RED / BLUE INCIDENT SCENARIO',
      }
    }

    /*
     * LESSON 20 â€” SUMMARY
     */
    if (lessonId === 20) {
      if (has('red team', 'offense', 'attack')) {
        return {
          type: 'red-team',
          title: 'RED TEAM',
        }
      }

      if (has('blue team', 'defense', 'detection')) {
        return {
          type: 'blue-team',
          title: 'BLUE TEAM',
        }
      }

      if (has('purple team', 'improve', 'collaboration')) {
        return {
          type: 'purple-team',
          title: 'PURPLE TEAM',
        }
      }

      return {
        type: 'redblue-summary',
        title: 'RED / BLUE / PURPLE ECOSYSTEM',
      }
    }

    /*
     * Unknown Red/Blue lesson:
     * keep any genuinely explicit slide visual, otherwise use
     * the general Red/Blue overview.
     */
    if (slide?.visual) return slide.visual

    return {
      type: 'redblue-overview',
      title: lesson?.title || 'RED / BLUE SECURITY MODEL',
    }
  }

  /*
   * Non-Red/Blue modules retain the existing behavior.
   */
  if (slide?.visual) return slide.visual

  if (topic.value === 'docker') {
    if (text.includes('network') || text.includes('port')) {
      return {
        type: 'docker-network',
        title: 'CONTAINER NETWORK',
      }
    }

    if (text.includes('image') || text.includes('layer')) {
      return {
        type: 'docker-image',
        title: 'IMAGE LAYERS',
      }
    }

    if (text.includes('volume') || text.includes('data')) {
      return {
        type: 'docker-volume',
        title: 'PERSISTENT DATA',
      }
    }

    if (text.includes('compose') || text.includes('service')) {
      return {
        type: 'docker-compose',
        title: 'DOCKER COMPOSE',
      }
    }

    if (text.includes('dockerfile') || text.includes('build')) {
      return {
        type: 'docker-build',
        title: 'BUILD PIPELINE',
      }
    }

    if (text.includes('security') || text.includes('secure')) {
      return {
        type: 'docker-security',
        title: 'CONTAINER SECURITY',
      }
    }

    if (text.includes('raspberry') || text.includes('production') || text.includes('server')) {
      return {
        type: 'raspberry-pi',
        title: 'RASPBERRY PI SERVER',
      }
    }

    return {
      type: 'docker-container',
      title: 'CONTAINER CONCEPT',
    }
  }

  if (
    text.includes('cia') ||
    text.includes('confidentiality') ||
    text.includes('integrity') ||
    text.includes('availability')
  ) {
    return {
      type: 'cia-triad',
      title: 'CIA SECURITY MODEL',
    }
  }

  if (
    text.includes('threat') ||
    text.includes('malware') ||
    text.includes('phishing') ||
    text.includes('attack') ||
    text.includes('vulnerability')
  ) {
    return {
      type: 'threats',
      title: 'THREAT LANDSCAPE',
    }
  }

  if (
    text.includes('firewall') ||
    text.includes('network') ||
    text.includes('port') ||
    text.includes('http') ||
    text.includes('ssh')
  ) {
    return {
      type: 'network-firewall',
      title: 'NETWORK SECURITY',
    }
  }

  if (
    text.includes('mfa') ||
    text.includes('multi-factor') ||
    text.includes('authentication') ||
    text.includes('password')
  ) {
    return {
      type: 'authentication',
      title: 'IDENTITY & ACCESS',
    }
  }

  if (text.includes('raspberry') || text.includes('django') || text.includes('mysql')) {
    return {
      type: 'raspberry-pi',
      title: 'RASPBERRY PI ARCHITECTURE',
    }
  }

  if (
    text.includes('linux') ||
    text.includes('server') ||
    text.includes('permission') ||
    text.includes('hardening')
  ) {
    return {
      type: 'linux-server',
      title: 'LINUX SERVER',
    }
  }

  if (text.includes('monitor') || text.includes('logging') || text.includes('incident')) {
    return {
      type: 'monitoring',
      title: 'SECURITY OPERATIONS',
    }
  }

  return {
    type: 'security',
    title: lesson?.title || 'SECURITY CONCEPT',
  }
}
function getFallbackIcon(value = '') {
  const text = String(value).toLowerCase()

  if (text.includes('network')) return 'lan'
  if (text.includes('server')) return 'dns'
  if (text.includes('database')) return 'storage'
  if (text.includes('security')) return 'security'
  if (text.includes('threat')) return 'warning'
  if (text.includes('attack')) return 'dangerous'
  if (text.includes('password')) return 'password'
  if (text.includes('authentication')) return 'verified_user'
  if (text.includes('permission')) return 'admin_panel_settings'
  if (text.includes('firewall')) return 'security'
  if (text.includes('container')) return 'view_in_ar'
  if (text.includes('image')) return 'layers'
  if (text.includes('volume')) return 'storage'
  if (text.includes('compose')) return 'hub'
  if (text.includes('docker')) return 'inventory_2'
  if (text.includes('linux')) return 'terminal'
  if (text.includes('monitor')) return 'monitor_heart'
  if (text.includes('backup')) return 'backup'
  if (text.includes('user')) return 'person'
  if (text.includes('data')) return 'database'
  if (text.includes('cloud')) return 'cloud'
  if (text.includes('code')) return 'code'
  if (text.includes('install')) return 'download'
  if (text.includes('process')) return 'account_tree'

  return topic.value === 'docker'
    ? 'inventory_2'
    : topic.value === 'redblue'
      ? 'flash_on'
      : 'security'
}

/* ============================================================
   PROGRESS
   ============================================================ */

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

/* ============================================================
   NAVIGATION
   ============================================================ */

const isFirst = computed(() => currentIndex.value === 0 && slideIndex.value === 0)

const isLastSlideOfLesson = computed(
  () => slideIndex.value === slides.value.length - 1 && slides.value.length > 0,
)

const isLastOverall = computed(
  () => currentIndex.value === normalizedLessons.value.length - 1 && isLastSlideOfLesson.value,
)

function selectLesson(index) {
  if (index < 0 || index >= normalizedLessons.value.length) {
    return
  }

  currentIndex.value = index
  slideIndex.value = 0
  sidebarOpen.value = false

  syncUrl()
}

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

/* ============================================================
   URL
   ============================================================ */

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
  if (!normalizedLessons.value.length) return

  const requestedLesson = Number(route.query.lesson)
  const requestedSlide = Number(route.query.slide)

  const lessonIndex =
    Number.isFinite(requestedLesson) && requestedLesson > 0 ? requestedLesson - 1 : 0

  currentIndex.value = Math.min(
    Math.max(lessonIndex, 0),
    Math.max(normalizedLessons.value.length - 1, 0),
  )

  const lessonSlides = normalizedLessons.value[currentIndex.value]?.slides || []

  const slideNumber = Number.isFinite(requestedSlide) && requestedSlide > 0 ? requestedSlide - 1 : 0

  slideIndex.value = Math.min(Math.max(slideNumber, 0), Math.max(lessonSlides.length - 1, 0))
}

watch(
  () => route.query,
  () => loadFromUrl(),
)

watch(
  () => props.lessons,
  () => loadFromUrl(),
  {
    immediate: true,
  },
)

/* ============================================================
   KEYBOARD
   ============================================================ */

function handleKeyboard(event) {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
    return
  }

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

      slideIndex.value = Math.max(
        (normalizedLessons.value[currentIndex.value]?.slides?.length || 1) - 1,
        0,
      )

      syncUrl()
      break

    case 'Escape':
      if (isFullscreen.value) {
        exitFullscreen()
      }
      break

    default:
      break
  }
}

/* ============================================================
   FULLSCREEN
   ============================================================ */

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

/* ============================================================
   BACK
   ============================================================ */

function goBack() {
  const title = courseTitle.value.toLowerCase()

  if (title.includes('docker')) {
    router.push('/docker')
    return
  }

  if (title.includes('red team') || title.includes('blue team') || title.includes('red & blue')) {
    router.push('/redblue')
    return
  }

  router.push('/cybersecurity')
}

/* ============================================================
   ICONS
   ============================================================ */

function resolveIcon(icon) {
  if (!icon || typeof icon !== 'string') {
    return 'article'
  }

  if (icon.includes('fa-')) {
    return 'code'
  }

  return icon
}

/* ============================================================
   LIFECYCLE
   ============================================================ */

onMounted(() => {
  window.addEventListener('keydown', handleKeyboard)

  document.addEventListener('fullscreenchange', handleFullscreenChange)

  loadFromUrl()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyboard)

  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})

/* ============================================================
   VISUAL PANEL
   ============================================================ */

const baseH = h

const VisualPanel = defineComponent({
  name: 'VisualPanel',

  props: {
    visual: {
      type: Object,
      required: true,
    },

    compact: {
      type: Boolean,
      default: false,
    },
  },

  setup(panelProps) {
    // Ipasa ang scope id ng parent sa lahat ng elements ng visual
    // para ma-apply ang scoped styles, at i-resolve ang q-icon.
    const scopeId = getCurrentInstance()?.parent?.type?.__scopeId
    const QIcon = resolveComponent('q-icon')

    const h = (tag, props, children) =>
      baseH(
        tag === 'q-icon' ? QIcon : tag,
        scopeId ? { ...(props || {}), [scopeId]: '' } : props,
        children,
      )

    const icon = (name, fallback = 'security') => name || fallback

    const itemIcon = (item, fallback) => {
      if (typeof item === 'string') {
        return fallback
      }

      return item?.icon || fallback
    }

    const itemTitle = (item, fallback) => {
      if (typeof item === 'string') {
        return item
      }

      return item?.title || item?.label || fallback
    }

    const itemText = (item) => {
      if (typeof item === 'string') return ''
      return item?.text || item?.description || ''
    }

    return () => {
      const visual = panelProps.visual || {}
      const type = visual.type || 'security'
      const compact = panelProps.compact

      /* ======================================================
         CIA
         ====================================================== */

      if (type === 'cia-triad') {
        const items = visual.items || [
          {
            title: 'Confidentiality',
            text: 'Authorized access only.',
            icon: 'lock',
          },
          {
            title: 'Integrity',
            text: 'Information remains accurate.',
            icon: 'verified',
          },
          {
            title: 'Availability',
            text: 'Systems remain accessible.',
            icon: 'bolt',
          },
        ]

        return h(
          'div',
          {
            class: ['visual-panel', 'cia-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'CIA TRIAD'),

            h('div', { class: 'big-cia' }, [
              h('div', { class: 'big-cia-center' }, [
                h('strong', null, 'CIA'),
                h('span', null, 'SECURITY MODEL'),
              ]),

              ...items.slice(0, 3).map((item, index) =>
                h(
                  'div',
                  {
                    class: ['big-cia-node', `node-${index + 1}`],
                    key: index,
                  },
                  [
                    h('div', { class: 'visual-icon' }, [
                      h(
                        'span',
                        {
                          class: 'material-icons',
                        },
                        icon(item.icon, 'security'),
                      ),
                    ]),

                    h('strong', null, item.title),

                    h('span', null, item.text),
                  ],
                ),
              ),
            ]),
          ],
        )
      }

      /* ======================================================
         SECURITY
         ====================================================== */

      if (type === 'security') {
        const items = visual.items || [
          {
            title: 'Identity',
            icon: 'person',
          },
          {
            title: 'Protection',
            icon: 'security',
          },
          {
            title: 'Data',
            icon: 'lock',
          },
          {
            title: 'Availability',
            icon: 'cloud_done',
          },
        ]

        return h(
          'div',
          {
            class: ['visual-panel', 'security-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'PROTECTION ECOSYSTEM'),

            h('div', { class: 'security-map' }, [
              h('div', { class: 'security-core' }, [
                h(
                  'span',
                  {
                    class: 'material-icons',
                  },
                  icon(visual.icon, 'security'),
                ),
                h('strong', null, 'SECURE'),
                h('small', null, 'SYSTEM'),
              ]),

              ...items.slice(0, 6).map((item, index) =>
                h(
                  'div',
                  {
                    class: ['security-node', `security-node-${index + 1}`],
                    key: index,
                  },
                  [
                    h(
                      'span',
                      {
                        class: 'material-icons',
                      },
                      itemIcon(item, 'check_circle'),
                    ),
                    h('strong', null, itemTitle(item, `Control ${index + 1}`)),
                  ],
                ),
              ),
            ]),

            visual.caption
              ? h(
                  'p',
                  {
                    class: 'visual-note',
                  },
                  visual.caption,
                )
              : null,
          ],
        )
      }

      /* ======================================================
         THREATS
         ====================================================== */

      if (type === 'threats') {
        const items = visual.items || [
          {
            title: 'Threat',
            icon: 'warning',
          },
          {
            title: 'Vulnerability',
            icon: 'bug_report',
          },
          {
            title: 'Risk',
            icon: 'priority_high',
          },
          {
            title: 'Impact',
            icon: 'report_problem',
          },
          {
            title: 'Control',
            icon: 'security',
          },
        ]

        return h(
          'div',
          {
            class: ['visual-panel', 'threat-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'THREAT - RISK - DEFENSE'),

            h('div', { class: 'threat-map' }, [
              ...items.slice(0, 5).map((item, index) =>
                h(
                  'div',
                  {
                    class: ['threat-map-node', index === items.length - 1 ? 'defense-node' : ''],
                    key: index,
                  },
                  [
                    h(
                      'div',
                      {
                        class: 'threat-map-icon',
                      },
                      [
                        h(
                          'span',
                          {
                            class: 'material-icons',
                          },
                          itemIcon(item, 'warning'),
                        ),
                      ],
                    ),

                    h('strong', null, itemTitle(item, `Stage ${index + 1}`)),

                    itemText(item) ? h('span', null, itemText(item)) : null,

                    index < items.length - 1
                      ? h(
                          'div',
                          {
                            class: 'threat-map-arrow',
                          },
                          '->',
                        )
                      : null,
                  ],
                ),
              ),
            ]),
          ],
        )
      }

      /* ======================================================
         NETWORK FIREWALL
         ====================================================== */

      if (type === 'network-firewall') {
        return h(
          'div',
          {
            class: ['visual-panel', 'network-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'NETWORK SECURITY'),

            h('div', { class: 'network-diagram' }, [
              h(
                'div',
                {
                  class: 'network-device internet',
                },
                [
                  h(
                    'span',
                    {
                      class: 'material-icons',
                    },
                    'language',
                  ),
                  h('strong', null, 'INTERNET'),
                  h('small', null, 'UNTRUSTED'),
                ],
              ),

              h(
                'div',
                {
                  class: 'network-connection',
                },
                '->',
              ),

              h(
                'div',
                {
                  class: 'network-firewall-box',
                },
                [
                  h(
                    'span',
                    {
                      class: 'material-icons',
                    },
                    'security',
                  ),
                  h('strong', null, 'FIREWALL'),
                  h('small', null, 'FILTER'),
                ],
              ),

              h(
                'div',
                {
                  class: 'network-connection',
                },
                '->',
              ),

              h(
                'div',
                {
                  class: 'network-device server',
                },
                [
                  h(
                    'span',
                    {
                      class: 'material-icons',
                    },
                    'dns',
                  ),
                  h('strong', null, 'SERVER'),
                  h('small', null, 'TRUSTED'),
                ],
              ),
            ]),

            h(
              'div',
              { class: 'port-strip large' },
              (visual.ports || ['22 SSH', '80 HTTP', '443 HTTPS']).map((port) =>
                h('span', { key: port }, port),
              ),
            ),
          ],
        )
      }

      /* ======================================================
         AUTH / MFA
         ====================================================== */

      if (type === 'authentication' || type === 'mfa') {
        const items =
          visual.items ||
          (type === 'mfa'
            ? [
                {
                  title: 'Something you know',
                  icon: 'password',
                },
                {
                  title: 'Something you have',
                  icon: 'smartphone',
                },
                {
                  title: 'Something you are',
                  icon: 'fingerprint',
                },
              ]
            : [
                {
                  title: 'Identity',
                  icon: 'person',
                },
                {
                  title: 'Authentication',
                  icon: 'verified_user',
                },
                {
                  title: 'Authorization',
                  icon: 'admin_panel_settings',
                },
                {
                  title: 'Resource',
                  icon: 'dns',
                },
              ])

        return h(
          'div',
          {
            class: ['visual-panel', 'auth-visual', { compact }],
          },
          [
            h(
              'div',
              { class: 'visual-caption' },
              visual.title || (type === 'mfa' ? 'MULTI-FACTOR AUTHENTICATION' : 'ACCESS CONTROL'),
            ),

            h('div', { class: 'auth-diagram' }, [
              h(
                'div',
                {
                  class: 'auth-security-ring',
                },
                [
                  h('q-icon', {
                    name: 'lock',
                  }),
                ],
              ),

              ...items.slice(0, 4).map((item, index) =>
                h(
                  'div',
                  {
                    class: ['auth-diagram-step', `auth-step-${index + 1}`],
                    key: index,
                  },
                  [
                    h(
                      'div',
                      {
                        class: 'auth-diagram-number',
                      },
                      String(index + 1).padStart(2, '0'),
                    ),

                    h(
                      'div',
                      {
                        class: 'visual-icon large',
                      },
                      [
                        h(
                          'span',
                          {
                            class: 'material-icons',
                          },
                          itemIcon(item, 'verified'),
                        ),
                      ],
                    ),

                    h('strong', null, itemTitle(item, 'Factor')),
                  ],
                ),
              ),
            ]),
          ],
        )
      }

      /* ======================================================
         RASPBERRY PI
         ====================================================== */

      if (type === 'raspberry-pi') {
        const services = visual.items || [
          {
            title: 'Ubuntu Server',
            icon: 'terminal',
          },
          {
            title: 'Django API',
            icon: 'api',
          },
          {
            title: 'MySQL',
            icon: 'storage',
          },
          {
            title: 'Network',
            icon: 'lan',
          },
        ]

        return h(
          'div',
          {
            class: ['visual-panel', 'pi-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'RASPBERRY PI SERVER'),

            h('div', { class: 'pi-architecture' }, [
              h('div', { class: 'pi-board-large' }, [
                h(
                  'div',
                  {
                    class: 'pi-board-cpu',
                  },
                  'CPU',
                ),
                h(
                  'div',
                  {
                    class: 'pi-board-memory',
                  },
                  'RAM',
                ),
                h('strong', null, 'RASPBERRY PI'),
              ]),

              h(
                'div',
                {
                  class: 'pi-service-stack',
                },
                services.slice(0, 5).map((item, index) =>
                  h(
                    'div',
                    {
                      class: 'pi-service',
                      key: index,
                    },
                    [
                      h(
                        'span',
                        {
                          class: 'material-icons',
                        },
                        itemIcon(item, 'settings'),
                      ),
                      h('strong', null, itemTitle(item, `Service ${index + 1}`)),
                    ],
                  ),
                ),
              ),
            ]),

            visual.caption
              ? h(
                  'p',
                  {
                    class: 'visual-note',
                  },
                  visual.caption,
                )
              : null,
          ],
        )
      }

      /* ======================================================
         LINUX / SERVER
         ====================================================== */

      if (type === 'linux-server') {
        const items = visual.items || [
          {
            title: 'Users',
            icon: 'people',
          },
          {
            title: 'Processes',
            icon: 'memory',
          },
          {
            title: 'Permissions',
            icon: 'admin_panel_settings',
          },
          {
            title: 'Services',
            icon: 'settings',
          },
          {
            title: 'Logs',
            icon: 'description',
          },
        ]

        return h(
          'div',
          {
            class: ['visual-panel', 'linux-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'LINUX SERVER'),

            h('div', { class: 'linux-terminal' }, [
              h(
                'div',
                {
                  class: 'linux-terminal-top',
                },
                [h('span', null, '*'), h('span', null, '*'), h('span', null, '*')],
              ),

              h(
                'div',
                {
                  class: 'linux-terminal-body',
                },
                [
                  h('div', null, '$ whoami'),
                  h('strong', null, 'administrator'),
                  h('div', null, '$ systemctl status'),
                  h('strong', null, '* ACTIVE'),
                ],
              ),
            ]),
            h(
              'div',
              { class: 'linux-controls' },
              items.slice(0, 5).map((item, index) =>
                h(
                  'div',
                  {
                    class: 'linux-control',
                    key: index,
                  },
                  [
                    h(
                      'span',
                      {
                        class: 'material-icons',
                      },
                      itemIcon(item, 'check_circle'),
                    ),
                    h('strong', null, itemTitle(item, `Control ${index + 1}`)),
                  ],
                ),
              ),
            ),
          ],
        )
      }

      /* ======================================================
         MONITORING
         ====================================================== */

      if (type === 'monitoring') {
        return h(
          'div',
          {
            class: ['visual-panel', 'monitoring-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'SECURITY OPERATIONS'),

            h(
              'div',
              {
                class: 'monitor-dashboard',
              },
              [
                h(
                  'div',
                  {
                    class: 'monitor-status',
                  },
                  [h('span', null, 'SYSTEM STATUS'), h('strong', null, '* OPERATIONAL')],
                ),

                h(
                  'div',
                  {
                    class: 'monitor-bars',
                  },
                  Array.from(
                    {
                      length: 12,
                    },
                    (_, index) =>
                      h('span', {
                        key: index,
                        style: {
                          height: `${35 + ((index * 17) % 60)}%`,
                        },
                      }),
                  ),
                ),

                h(
                  'div',
                  {
                    class: 'monitor-events',
                  },
                  ['LOGIN EVENT', 'NETWORK EVENT', 'SECURITY LOG', 'ALERT CHECK'].map((event) =>
                    h(
                      'span',
                      {
                        key: event,
                      },
                      event,
                    ),
                  ),
                ),
              ],
            ),
          ],
        )
      }
      /* ======================================================
         DOCKER CONTAINER
         ====================================================== */

      if (type === 'docker-container') {
        return h(
          'div',
          {
            class: ['visual-panel', 'docker-container-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'CONTAINER CONCEPT'),

            h(
              'div',
              {
                class: 'docker-container-diagram',
              },
              [
                h(
                  'div',
                  {
                    class: 'docker-container-box',
                  },
                  [
                    h(
                      'div',
                      {
                        class: 'container-top',
                      },
                      'CONTAINER',
                    ),
                    h(
                      'div',
                      {
                        class: 'container-engine',
                      },
                      [
                        h('q-icon', {
                          name: 'settings',
                          size: '28px',
                        }),
                        h('strong', null, 'APP'),
                      ],
                    ),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'docker-base-layer',
                  },
                  'DOCKER ENGINE',
                ),

                h(
                  'div',
                  {
                    class: 'docker-host-layer',
                  },
                  'HOST OPERATING SYSTEM',
                ),
              ],
            ),
          ],
        )
      }

      /* ======================================================
         DOCKER IMAGE
         ====================================================== */

      if (type === 'docker-image') {
        const layers = ['Application', 'Dependencies', 'Runtime', 'Base Image']

        return h(
          'div',
          {
            class: ['visual-panel', 'docker-image-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'IMAGE LAYERS'),

            h(
              'div',
              {
                class: 'docker-layers',
              },
              layers.map((layer, index) =>
                h(
                  'div',
                  {
                    class: ['docker-layer', `layer-${index + 1}`],
                    key: layer,
                  },
                  [h('span', null, `LAYER ${layers.length - index}`), h('strong', null, layer)],
                ),
              ),
            ),

            h(
              'div',
              {
                class: 'image-to-container',
              },
              [
                h('span', null, 'docker run'),
                h('q-icon', {
                  name: 'arrow_forward',
                }),
                h('strong', null, 'CONTAINER'),
              ],
            ),
          ],
        )
      }

      /* ======================================================
         DOCKER NETWORK
         ====================================================== */

      if (type === 'docker-network') {
        return h(
          'div',
          {
            class: ['visual-panel', 'docker-network-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'CONTAINER NETWORK'),

            h(
              'div',
              {
                class: 'docker-network-map',
              },
              [
                h(
                  'div',
                  {
                    class: 'docker-network-client',
                  },
                  [
                    h('q-icon', {
                      name: 'public',
                    }),
                    h('strong', null, 'CLIENT'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'docker-network-line',
                  },
                  '->',
                ),

                h(
                  'div',
                  {
                    class: 'docker-network-hub',
                  },
                  [
                    h('q-icon', {
                      name: 'hub',
                    }),
                    h('strong', null, 'DOCKER NETWORK'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'docker-network-branch',
                  },
                  [h('span', null, 'WEB'), h('span', null, 'API'), h('span', null, 'DB')],
                ),
              ],
            ),
          ],
        )
      }

      /* ======================================================
         DOCKER VOLUME
         ====================================================== */

      if (type === 'docker-volume') {
        return h(
          'div',
          {
            class: ['visual-panel', 'docker-volume-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'PERSISTENT DATA'),

            h(
              'div',
              {
                class: 'volume-diagram',
              },
              [
                h(
                  'div',
                  {
                    class: 'volume-container',
                  },
                  [
                    h('q-icon', {
                      name: 'view_in_ar',
                      size: '34px',
                    }),
                    h('strong', null, 'CONTAINER'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'volume-arrow',
                  },
                  '•',
                ),

                h(
                  'div',
                  {
                    class: 'volume-storage',
                  },
                  [
                    h('q-icon', {
                      name: 'storage',
                      size: '34px',
                    }),
                    h('strong', null, 'VOLUME'),
                    h('small', null, 'PERSISTENT'),
                  ],
                ),
              ],
            ),
          ],
        )
      }

      /* ======================================================
         DOCKER COMPOSE
         ====================================================== */

      if (type === 'docker-compose') {
        return h(
          'div',
          {
            class: ['visual-panel', 'docker-compose-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'DOCKER COMPOSE'),

            h(
              'div',
              {
                class: 'compose-file',
              },
              [
                h(
                  'div',
                  {
                    class: 'compose-header',
                  },
                  'docker-compose.yml',
                ),

                h(
                  'div',
                  {
                    class: 'compose-code',
                  },
                  ['services:', '  frontend:', '  backend:', '  database:'].map((line) =>
                    h(
                      'div',
                      {
                        key: line,
                      },
                      line,
                    ),
                  ),
                ),
              ],
            ),

            h(
              'div',
              {
                class: 'compose-services',
              },
              [
                ['frontend', 'web'],
                ['backend', 'api'],
                ['database', 'storage'],
              ].map(([title, iconName]) =>
                h(
                  'div',
                  {
                    class: 'compose-service',
                    key: title,
                  },
                  [
                    h('q-icon', {
                      name: iconName === 'web' ? 'web' : iconName === 'api' ? 'api' : 'storage',
                    }),
                    h('strong', null, title),
                  ],
                ),
              ),
            ),
          ],
        )
      }

      /* ======================================================
         DOCKER BUILD
         ====================================================== */

      if (type === 'docker-build') {
        return h(
          'div',
          {
            class: ['visual-panel', 'docker-build-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'BUILD PIPELINE'),

            h(
              'div',
              {
                class: 'docker-build-flow',
              },
              [
                ['Dockerfile', 'description'],
                ['docker build', 'build'],
                ['Image', 'layers'],
                ['Container', 'play_arrow'],
              ].map(([title, iconName], index) =>
                h(
                  'div',
                  {
                    class: 'build-step',
                    key: title,
                  },
                  [
                    h(
                      'div',
                      {
                        class: 'build-step-icon',
                      },
                      [
                        h(
                          'span',
                          {
                            class: 'material-icons',
                          },
                          iconName,
                        ),
                      ],
                    ),
                    h('strong', null, title),
                    index < 3
                      ? h(
                          'span',
                          {
                            class: 'build-arrow',
                          },
                          '->',
                        )
                      : null,
                  ],
                ),
              ),
            ),
          ],
        )
      }

      /* ======================================================
         DOCKER SECURITY
         ====================================================== */

      if (type === 'docker-security') {
        const controls = [
          ['Least Privilege', 'admin_panel_settings'],
          ['Trusted Image', 'verified'],
          ['Updates', 'update'],
          ['Secrets', 'key'],
        ]

        return h(
          'div',
          {
            class: ['visual-panel', 'docker-security-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'CONTAINER SECURITY'),

            h(
              'div',
              {
                class: 'docker-security-shield',
              },
              [
                h('q-icon', {
                  name: 'security',
                  size: '46px',
                }),
                h('strong', null, 'HARDENED'),
              ],
            ),

            h(
              'div',
              {
                class: 'docker-security-controls',
              },
              controls.map(([title, iconName]) =>
                h(
                  'div',
                  {
                    class: 'docker-security-control',
                    key: title,
                  },
                  [
                    h('q-icon', {
                      name: iconName,
                    }),
                    h('span', null, title),
                  ],
                ),
              ),
            ),
          ],
        )
      }

      /* ======================================================
         RED TEAM / BLUE TEAM
         ====================================================== */

      if (
        [
          'redblue-overview',
          'red-team',
          'recon',
          'vulnerability',
          'attack-simulation',
          'roe',
          'red-workflow',
          'blue-team',
          'soc',
          'detection',
          'incident-response',
          'threat-hunting',
          'log-analysis',
          'blue-tools',
          'red-vs-blue',
          'purple-team',
          'attack-detection-response',
          'redblue-scenario',
          'redblue-summary',
        ].includes(type)
      ) {
        const items =
          Array.isArray(visual.items) && visual.items.length
            ? visual.items
            : Array.isArray(visual.nodes) && visual.nodes.length
              ? visual.nodes
              : []

        const title = visual.title || 'RED TEAM - BLUE TEAM'

        const getItems = (fallbackItems) => {
          if (items.length) return items.slice(0, 8)

          return fallbackItems
        }

        /* ------------------------------------------------------
           OVERVIEW
           ------------------------------------------------------ */

        if (type === 'redblue-overview') {
          const overviewItems = getItems([
            {
              title: 'RECON',
              text: 'Understand the target environment.',
              icon: 'radar',
            },
            {
              title: 'ATTACK',
              text: 'Simulate authorized threats.',
              icon: 'track_changes',
            },
            {
              title: 'DETECT',
              text: 'Identify suspicious activity.',
              icon: 'visibility',
            },
            {
              title: 'RESPOND',
              text: 'Contain and recover.',
              icon: 'shield',
            },
          ])

          return h(
            'div',
            {
              class: ['visual-panel', 'redblue-visual', 'redblue-overview-visual', { compact }],
            },
            [
              h('div', { class: 'visual-caption' }, title),

              h('div', { class: 'rb-overview-stage' }, [
                h(
                  'div',
                  {
                    class: 'rb-team-card rb-red-card',
                  },
                  [
                    h('div', { class: 'rb-team-badge' }, [
                      h('span', { class: 'material-icons' }, 'flash_on'),
                    ]),
                    h('span', { class: 'rb-team-label' }, 'RED TEAM'),
                    h('strong', null, 'OFFENSE'),
                    h('small', null, 'SIMULATE ATTACKS'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'rb-center-core',
                  },
                  [
                    h('span', { class: 'material-icons' }, 'security'),
                    h('strong', null, 'SECURITY'),
                    h('small', null, 'OPERATIONS'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'rb-team-card rb-blue-card',
                  },
                  [
                    h('div', { class: 'rb-team-badge' }, [
                      h('span', { class: 'material-icons' }, 'shield'),
                    ]),
                    h('span', { class: 'rb-team-label' }, 'BLUE TEAM'),
                    h('strong', null, 'DEFENSE'),
                    h('small', null, 'DETECT & RESPOND'),
                  ],
                ),
              ]),

              h(
                'div',
                {
                  class: 'rb-overview-points',
                },
                overviewItems.slice(0, 4).map((item, index) =>
                  h(
                    'div',
                    {
                      class: [
                        'rb-overview-point',
                        index % 2 === 0 ? 'rb-point-red' : 'rb-point-blue',
                      ],
                      key: index,
                    },
                    [
                      h('span', { class: 'material-icons' }, itemIcon(item, 'security')),
                      h('div', null, [
                        h('strong', null, itemTitle(item, `SECURITY STEP ${index + 1}`)),
                        itemText(item) ? h('small', null, itemText(item)) : null,
                      ]),
                    ],
                  ),
                ),
              ),
            ],
          )
        }

        /* ------------------------------------------------------
        /* ------------------------------------------------------
           RED TEAM
           ------------------------------------------------------ */

        if (
          [
            'red-team',
            'recon',
            'vulnerability',
            'attack-simulation',
            'roe',
            'red-workflow',
          ].includes(type)
        ) {
          const redItems = getItems([
            {
              title: 'RECONNAISSANCE',
              text: 'Map the authorized target environment.',
              icon: 'radar',
            },
            {
              title: 'DISCOVERY',
              text: 'Identify exposed assets and weaknesses.',
              icon: 'travel_explore',
            },
            {
              title: 'VALIDATION',
              text: 'Safely validate security assumptions.',
              icon: 'fact_check',
            },
            {
              title: 'REPORTING',
              text: 'Document findings and evidence.',
              icon: 'description',
            },
          ])

          const redTitle =
            type === 'recon'
              ? 'RECONNAISSANCE'
              : type === 'vulnerability'
                ? 'VULNERABILITY ASSESSMENT'
                : type === 'attack-simulation'
                  ? 'CONTROLLED ATTACK SIMULATION'
                  : type === 'roe'
                    ? 'RULES OF ENGAGEMENT'
                    : type === 'red-workflow'
                      ? 'RED TEAM WORKFLOW'
                      : 'RED TEAM OPERATIONS'

          /* --------------------------------------------------
             RECONNAISSANCE - TARGET DISCOVERY MAP
             -------------------------------------------------- */

          if (type === 'recon') {
            const targets = [
              ['PUBLIC WEB', 'language', 'EXPOSED'],
              ['WEB APP', 'language', 'SURFACE'],
              ['API', 'api', 'ENDPOINT'],
              ['SERVER', 'dns', 'HOST'],
              ['DATABASE', 'storage', 'DATA'],
            ]

            return h(
              'div',
              {
                class: ['visual-panel', 'redblue-visual', 'rb-red-visual', { compact }],
              },
              [
                h('div', { class: 'visual-caption' }, visual.title || redTitle),

                h('div', { class: 'rb-recon-map' }, [
                  h('div', { class: 'rb-recon-grid' }),

                  h('div', { class: 'rb-recon-core' }, [
                    h('span', { class: 'material-icons' }, 'radar'),
                    h('strong', null, 'TARGET'),
                    h('small', null, 'AUTHORIZED SCOPE'),
                  ]),

                  ...targets.map(([label, iconName, status], index) =>
                    h(
                      'div',
                      {
                        class: ['rb-recon-node', `rb-recon-node-${index + 1}`],
                        key: label,
                      },
                      [
                        h('span', { class: 'material-icons' }, iconName),
                        h('strong', null, label),
                        h('small', null, status),
                      ],
                    ),
                  ),

                  ...targets.map((_, index) =>
                    h('div', {
                      class: ['rb-recon-connector', `rb-recon-connector-${index + 1}`],
                      key: `connector-${index}`,
                    }),
                  ),
                ]),

                h('div', { class: 'rb-recon-legend' }, [
                  h('div', null, [
                    h('span', { class: 'material-icons' }, 'search'),
                    h('strong', null, 'DISCOVER'),
                    h('small', null, 'Map known assets'),
                  ]),
                  h('div', null, [
                    h('span', { class: 'material-icons' }, 'visibility'),
                    h('strong', null, 'OBSERVE'),
                    h('small', null, 'Understand exposure'),
                  ]),
                  h('div', null, [
                    h('span', { class: 'material-icons' }, 'fact_check'),
                    h('strong', null, 'VALIDATE'),
                    h('small', null, 'Confirm safely'),
                  ]),
                ]),
              ],
            )
          }

          /* --------------------------------------------------
             VULNERABILITY - SCAN -> FINDING -> PRIORITY
             -------------------------------------------------- */

          if (type === 'vulnerability') {
            const stages = [
              {
                number: '01',
                title: 'SCAN',
                text: 'Review authorized systems.',
                icon: 'radar',
              },
              {
                number: '02',
                title: 'FIND',
                text: 'Identify weaknesses.',
                icon: 'search',
              },
              {
                number: '03',
                title: 'ASSESS',
                text: 'Evaluate impact and likelihood.',
                icon: 'analytics',
              },
              {
                number: '04',
                title: 'PRIORITIZE',
                text: 'Focus on important risks.',
                icon: 'priority_high',
              },
            ]

            return h(
              'div',
              {
                class: ['visual-panel', 'redblue-visual', 'rb-red-visual', { compact }],
              },
              [
                h('div', { class: 'visual-caption' }, visual.title || redTitle),

                h('div', { class: 'rb-vuln-flow' }, [
                  ...stages.map((stage, index) =>
                    h(
                      'div',
                      {
                        class: ['rb-vuln-stage', `rb-vuln-${index + 1}`],
                        key: stage.number,
                      },
                      [
                        h('span', { class: 'rb-vuln-number' }, stage.number),
                        h('div', { class: 'rb-vuln-icon' }, [
                          h('span', { class: 'material-icons' }, stage.icon),
                        ]),
                        h('strong', null, stage.title),
                        h('small', null, stage.text),
                        index < stages.length - 1
                          ? h('span', { class: 'rb-vuln-arrow' }, '->')
                          : null,
                      ],
                    ),
                  ),
                ]),

                h('div', { class: 'rb-risk-board' }, [
                  h('div', { class: 'rb-risk-title' }, [
                    h('span', { class: 'material-icons' }, 'assessment'),
                    h('strong', null, 'RISK PRIORITIZATION'),
                  ]),
                  h('div', { class: 'rb-risk-bars' }, [
                    h('div', { class: 'rb-risk-row' }, [
                      h('span', null, 'LOW'),
                      h('i', { class: 'rb-risk-low' }),
                      h('small', null, 'Monitor'),
                    ]),
                    h('div', { class: 'rb-risk-row' }, [
                      h('span', null, 'MEDIUM'),
                      h('i', { class: 'rb-risk-medium' }),
                      h('small', null, 'Review'),
                    ]),
                    h('div', { class: 'rb-risk-row' }, [
                      h('span', null, 'HIGH'),
                      h('i', { class: 'rb-risk-high' }),
                      h('small', null, 'Prioritize'),
                    ]),
                  ]),
                ]),
              ],
            )
          }

          /* --------------------------------------------------
             ATTACK SIMULATION - CONTROLLED ATTACK PATH
             -------------------------------------------------- */

          if (type === 'attack-simulation') {
            const attackStages = [
              ['SCOPE', 'verified_user', 'Authorized target'],
              ['SIMULATE', 'bolt', 'Controlled action'],
              ['OBSERVE', 'visibility', 'Monitor behavior'],
              ['REPORT', 'description', 'Record evidence'],
            ]

            return h(
              'div',
              {
                class: ['visual-panel', 'redblue-visual', 'rb-red-visual', { compact }],
              },
              [
                h('div', { class: 'visual-caption' }, visual.title || redTitle),

                h('div', { class: 'rb-attack-stage' }, [
                  h('div', { class: 'rb-attack-lane rb-attack-red-lane' }, [
                    h('span', { class: 'material-icons' }, 'flash_on'),
                    h('strong', null, 'RED TEAM'),
                    h('small', null, 'CONTROLLED ACTION'),
                  ]),

                  h('div', { class: 'rb-attack-path' }, [
                    ...attackStages.map(([title, iconName, text], index) =>
                      h(
                        'div',
                        {
                          class: ['rb-attack-node', `rb-attack-node-${index + 1}`],
                          key: title,
                        },
                        [
                          h('span', { class: 'rb-attack-index' }, `0${index + 1}`),
                          h('span', { class: 'material-icons' }, iconName),
                          h('strong', null, title),
                          h('small', null, text),
                          index < attackStages.length - 1
                            ? h('span', { class: 'rb-attack-arrow' }, '->')
                            : null,
                        ],
                      ),
                    ),
                  ]),

                  h('div', { class: 'rb-attack-target' }, [
                    h('span', { class: 'material-icons' }, 'dns'),
                    h('strong', null, 'TARGET SYSTEM'),
                    h('small', null, 'MONITORED'),
                  ]),
                ]),
              ],
            )
          }

          /* --------------------------------------------------
             RULES OF ENGAGEMENT - AUTHORIZATION / SCOPE
             -------------------------------------------------- */

          if (type === 'roe') {
            const rules = [
              ['SCOPE', 'select_all', 'What systems are included?'],
              ['AUTHORIZATION', 'verified_user', 'Who approved the test?'],
              ['LIMITS', 'block', 'What actions are prohibited?'],
              ['CONTACT', 'support_agent', 'Who handles emergencies?'],
            ]

            return h(
              'div',
              {
                class: ['visual-panel', 'redblue-visual', 'rb-red-visual', { compact }],
              },
              [
                h('div', { class: 'visual-caption' }, visual.title || redTitle),

                h('div', { class: 'rb-roe-board' }, [
                  h('div', { class: 'rb-roe-shield' }, [
                    h('span', { class: 'material-icons' }, 'gavel'),
                    h('strong', null, 'AUTHORIZED'),
                    h('small', null, 'SECURITY TEST'),
                  ]),

                  h('div', { class: 'rb-roe-rules' }, [
                    ...rules.map(([title, iconName, text], index) =>
                      h(
                        'div',
                        {
                          class: 'rb-roe-rule',
                          key: title,
                        },
                        [
                          h('span', { class: 'rb-roe-check' }, [
                            h('span', { class: 'material-icons' }, 'check'),
                          ]),
                          h('span', { class: 'material-icons' }, iconName),
                          h('div', null, [
                            h('strong', null, `${String(index + 1).padStart(2, '0')}  ${title}`),
                            h('small', null, text),
                          ]),
                        ],
                      ),
                    ),
                  ]),
                ]),
              ],
            )
          }

          /* --------------------------------------------------
             RED WORKFLOW - END-TO-END PROCESS
             -------------------------------------------------- */

          if (type === 'red-workflow') {
            const workflow = [
              ['01', 'RECON', 'radar', 'Understand the environment'],
              ['02', 'ASSESS', 'analytics', 'Identify security gaps'],
              ['03', 'SIMULATE', 'bolt', 'Test authorized scenarios'],
              ['04', 'REPORT', 'description', 'Document evidence'],
            ]

            return h(
              'div',
              {
                class: ['visual-panel', 'redblue-visual', 'rb-red-visual', { compact }],
              },
              [
                h('div', { class: 'visual-caption' }, visual.title || redTitle),

                h('div', { class: 'rb-workflow-board' }, [
                  h('div', { class: 'rb-workflow-line' }),

                  ...workflow.map(([number, title, iconName, text], index) =>
                    h(
                      'div',
                      {
                        class: ['rb-workflow-node', `rb-workflow-node-${index + 1}`],
                        key: number,
                      },
                      [
                        h('span', { class: 'rb-workflow-number' }, number),
                        h('div', { class: 'rb-workflow-icon' }, [
                          h('span', { class: 'material-icons' }, iconName),
                        ]),
                        h('strong', null, title),
                        h('small', null, text),
                      ],
                    ),
                  ),
                ]),

                h('div', { class: 'rb-workflow-footer' }, [
                  h('span', { class: 'material-icons' }, 'security'),
                  h('strong', null, 'AUTHORIZED SECURITY TESTING'),
                  h('small', null, 'Find -> validate -> improve'),
                ]),
              ],
            )
          }

          /* --------------------------------------------------
             GENERAL RED TEAM - ATTACK SURFACE
             -------------------------------------------------- */

          const surfaceItems = [
            ['PEOPLE', 'person', 'Users and roles'],
            ['APPLICATIONS', 'apps', 'Web and app services'],
            ['NETWORK', 'lan', 'Routes and exposed services'],
            ['DATA', 'storage', 'Protected information'],
          ]

          return h(
            'div',
            {
              class: ['visual-panel', 'redblue-visual', 'rb-red-visual', { compact }],
            },
            [
              h('div', { class: 'visual-caption' }, visual.title || redTitle),

              h('div', { class: 'rb-surface-board' }, [
                h('div', { class: 'rb-surface-core' }, [
                  h('span', { class: 'material-icons' }, 'flash_on'),
                  h('strong', null, 'RED TEAM'),
                  h('small', null, 'ATTACK SURFACE'),
                ]),

                ...surfaceItems.map(([title, iconName, text], index) =>
                  h(
                    'div',
                    {
                      class: ['rb-surface-node', `rb-surface-${index + 1}`],
                      key: title,
                    },
                    [
                      h('span', { class: 'material-icons' }, iconName),
                      h('strong', null, title),
                      h('small', null, text),
                    ],
                  ),
                ),
              ]),

              h(
                'div',
                {
                  class: 'rb-operation-strip',
                },
                redItems.slice(0, 4).map((item, index) =>
                  h(
                    'div',
                    {
                      class: 'rb-operation-step',
                      key: index,
                    },
                    [
                      h('span', { class: 'rb-step-number' }, `0${index + 1}`),
                      h('span', { class: 'material-icons' }, itemIcon(item, 'security')),
                      h('div', null, [
                        h('strong', null, itemTitle(item, `OPERATION ${index + 1}`)),
                        itemText(item) ? h('small', null, itemText(item)) : null,
                      ]),
                    ],
                  ),
                ),
              ),
            ],
          )
        }

        /* ------------------------------------------------------
           BLUE TEAM / SOC
           ------------------------------------------------------ */

        if (
          [
            'blue-team',
            'soc',
            'detection',
            'incident-response',
            'threat-hunting',
            'log-analysis',
            'blue-tools',
          ].includes(type)
        ) {
          const blueItems = getItems([
            {
              title: 'MONITOR',
              text: 'Observe systems and security events.',
              icon: 'monitor',
            },
            {
              title: 'DETECT',
              text: 'Identify suspicious behavior.',
              icon: 'notification_important',
            },
            {
              title: 'INVESTIGATE',
              text: 'Analyze evidence and logs.',
              icon: 'search',
            },
            {
              title: 'RESPOND',
              text: 'Contain and recover from incidents.',
              icon: 'shield',
            },
          ])

          const blueTitle =
            type === 'soc'
              ? 'SECURITY OPERATIONS CENTER'
              : type === 'detection'
                ? 'THREAT DETECTION'
                : type === 'incident-response'
                  ? 'INCIDENT RESPONSE'
                  : type === 'threat-hunting'
                    ? 'THREAT HUNTING'
                    : type === 'log-analysis'
                      ? 'LOG ANALYSIS'
                      : type === 'blue-tools'
                        ? 'BLUE TEAM TOOLSET'
                        : 'BLUE TEAM OPERATIONS'

          return h(
            'div',
            {
              class: ['visual-panel', 'redblue-visual', 'rb-blue-visual', { compact }],
            },
            [
              h('div', { class: 'visual-caption' }, visual.title || blueTitle),

              h('div', { class: 'rb-soc-dashboard' }, [
                h(
                  'div',
                  {
                    class: 'rb-soc-header',
                  },
                  [
                    h('div', null, [
                      h('span', { class: 'rb-status-live' }),
                      h('strong', null, 'SOC MONITOR'),
                    ]),
                    h('span', null, 'LIVE ANALYSIS'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'rb-soc-metrics',
                  },
                  [
                    ['EVENTS', '1,284', 'monitor'],
                    ['ALERTS', '24', 'warning'],
                    ['THREATS', '07', 'priority_high'],
                    ['STATUS', 'ACTIVE', 'shield'],
                  ].map(([label, value, iconName]) =>
                    h(
                      'div',
                      {
                        class: 'rb-soc-metric',
                        key: label,
                      },
                      [
                        h('span', { class: 'material-icons' }, iconName),
                        h('small', null, label),
                        h('strong', null, value),
                      ],
                    ),
                  ),
                ),

                h(
                  'div',
                  {
                    class: 'rb-log-stream',
                  },
                  [
                    'AUTH EVENT  10:42:17  ACCEPTED',
                    'NETWORK EVENT  10:42:19  MONITORED',
                    'ALERT EVENT  10:42:21  INVESTIGATING',
                    'SYSTEM EVENT  10:42:23  PROTECTED',
                  ].map((line, index) =>
                    h(
                      'div',
                      {
                        class: ['rb-log-line', index === 2 ? 'rb-log-alert' : ''],
                        key: line,
                      },
                      [h('span', null, `0${index + 1}`), h('code', null, line)],
                    ),
                  ),
                ),
              ]),

              h(
                'div',
                {
                  class: 'rb-defense-pipeline',
                },
                blueItems.slice(0, 4).map((item, index) =>
                  h(
                    'div',
                    {
                      class: 'rb-defense-step',
                      key: index,
                    },
                    [
                      h('span', { class: 'material-icons' }, itemIcon(item, 'shield')),
                      h('strong', null, itemTitle(item, `DEFENSE ${index + 1}`)),
                      itemText(item) ? h('small', null, itemText(item)) : null,
                      index < 3 ? h('span', { class: 'rb-pipeline-arrow' }, '->') : null,
                    ],
                  ),
                ),
              ),
            ],
          )
        }

        /* ------------------------------------------------------
           RED VS BLUE
           ------------------------------------------------------ */

        if (type === 'red-vs-blue') {
          return h(
            'div',
            {
              class: ['visual-panel', 'redblue-visual', 'rb-versus-visual', { compact }],
            },
            [
              h('div', { class: 'visual-caption' }, visual.title || 'RED TEAM VS BLUE TEAM'),

              h('div', { class: 'rb-versus-stage' }, [
                h(
                  'div',
                  {
                    class: 'rb-versus-side rb-versus-red',
                  },
                  [
                    h('div', { class: 'rb-versus-icon' }, [
                      h('span', { class: 'material-icons' }, 'flash_on'),
                    ]),
                    h('span', null, 'RED TEAM'),
                    h('strong', null, 'OFFENSE'),
                    h('small', null, 'SIMULATE - TEST - REPORT'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'rb-versus-center',
                  },
                  [
                    h('div', { class: 'rb-versus-line rb-line-red' }),
                    h(
                      'div',
                      {
                        class: 'rb-versus-emblem',
                      },
                      'VS',
                    ),
                    h('div', { class: 'rb-versus-line rb-line-blue' }),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'rb-versus-side rb-versus-blue',
                  },
                  [
                    h('div', { class: 'rb-versus-icon' }, [
                      h('span', { class: 'material-icons' }, 'shield'),
                    ]),
                    h('span', null, 'BLUE TEAM'),
                    h('strong', null, 'DEFENSE'),
                    h('small', null, 'MONITOR - DETECT - RESPOND'),
                  ],
                ),
              ]),

              h(
                'div',
                {
                  class: 'rb-versus-footer',
                },
                [
                  h('span', null, 'AUTHORIZED SECURITY TESTING'),
                  h('span', null, 'CONTINUOUS DEFENSE'),
                ],
              ),
            ],
          )
        }

        /* ------------------------------------------------------
           PURPLE TEAM
           ------------------------------------------------------ */

        if (type === 'purple-team') {
          return h(
            'div',
            {
              class: ['visual-panel', 'redblue-visual', 'rb-purple-visual', { compact }],
            },
            [
              h('div', { class: 'visual-caption' }, visual.title || 'PURPLE TEAM COLLABORATION'),

              h('div', { class: 'rb-purple-stage' }, [
                h(
                  'div',
                  {
                    class: 'rb-purple-team rb-purple-red',
                  },
                  [
                    h('span', { class: 'material-icons' }, 'flash_on'),
                    h('strong', null, 'RED TEAM'),
                    h('small', null, 'FIND'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'rb-feedback-loop',
                  },
                  [
                    h('div', { class: 'rb-loop-arrow rb-loop-forward' }, '->'),
                    h('div', { class: 'rb-loop-core' }, [
                      h('span', { class: 'material-icons' }, 'sync'),
                      h('strong', null, 'SHARE'),
                      h('small', null, 'IMPROVE'),
                    ]),
                    h('div', { class: 'rb-loop-arrow rb-loop-back' }, 'â†©'),
                  ],
                ),
                h(
                  'div',
                  {
                    class: 'rb-purple-team rb-purple-blue',
                  },
                  [
                    h('span', { class: 'material-icons' }, 'shield'),
                    h('strong', null, 'BLUE TEAM'),
                    h('small', null, 'DEFEND'),
                  ],
                ),
              ]),

              h(
                'div',
                {
                  class: 'rb-purple-message',
                },
                visual.caption ||
                  'Red Team findings improve Blue Team detection and response capabilities.',
              ),
            ],
          )
        }

        /* ------------------------------------------------------
           ATTACK -> DETECTION -> RESPONSE
           ------------------------------------------------------ */

        if (type === 'attack-detection-response') {
          const flowItems = getItems([
            {
              title: 'ATTACK',
              text: 'Authorized attack simulation',
              icon: 'flash_on',
            },
            {
              title: 'DETECTION',
              text: 'Security monitoring identifies activity',
              icon: 'visibility',
            },
            {
              title: 'RESPONSE',
              text: 'Incident handling and containment',
              icon: 'shield',
            },
          ])

          return h(
            'div',
            {
              class: ['visual-panel', 'redblue-visual', 'rb-flow-visual', { compact }],
            },
            [
              h(
                'div',
                { class: 'visual-caption' },
                visual.title || 'ATTACK -> DETECTION -> RESPONSE',
              ),

              h(
                'div',
                {
                  class: 'rb-flow-stage',
                },
                flowItems.slice(0, 3).map((item, index) =>
                  h(
                    'div',
                    {
                      class: ['rb-flow-card', `rb-flow-${index + 1}`],
                      key: index,
                    },
                    [
                      h('div', { class: 'rb-flow-number' }, `0${index + 1}`),
                      h('div', { class: 'rb-flow-icon' }, [
                        h('span', { class: 'material-icons' }, itemIcon(item, 'security')),
                      ]),
                      h(
                        'strong',
                        null,
                        itemTitle(item, ['ATTACK', 'DETECTION', 'RESPONSE'][index]),
                      ),
                      itemText(item) ? h('small', null, itemText(item)) : null,
                      index < 2 ? h('div', { class: 'rb-flow-arrow' }, '->') : null,
                    ],
                  ),
                ),
              ),
            ],
          )
        }

        /* ------------------------------------------------------
           RED/BLUE SCENARIO
           ------------------------------------------------------ */

        if (type === 'redblue-scenario') {
          return h(
            'div',
            {
              class: ['visual-panel', 'redblue-visual', 'rb-scenario-visual', { compact }],
            },
            [
              h('div', { class: 'visual-caption' }, visual.title || 'SECURITY SCENARIO'),

              h('div', { class: 'rb-scenario-stage' }, [
                h(
                  'div',
                  {
                    class: 'rb-scenario-column rb-scenario-red',
                  },
                  [
                    h('div', { class: 'rb-scenario-heading' }, [
                      h('span', { class: 'material-icons' }, 'flash_on'),
                      h('strong', null, 'RED TEAM'),
                    ]),
                    h('div', { class: 'rb-scenario-event' }, [
                      h('span', null, 'AUTHORIZED SIMULATION'),
                      h('strong', null, visual.redAction || 'ATTEMPTED ACCESS'),
                    ]),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'rb-scenario-middle',
                  },
                  [
                    h('span', { class: 'rb-scenario-arrow' }, '->'),
                    h('div', { class: 'rb-scenario-alert' }, [
                      h('span', { class: 'material-icons' }, 'warning'),
                      h('strong', null, 'ALERT'),
                    ]),
                    h('span', { class: 'rb-scenario-arrow' }, '->'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'rb-scenario-column rb-scenario-blue',
                  },
                  [
                    h('div', { class: 'rb-scenario-heading' }, [
                      h('span', { class: 'material-icons' }, 'shield'),
                      h('strong', null, 'BLUE TEAM'),
                    ]),
                    h('div', { class: 'rb-scenario-event' }, [
                      h('span', null, 'DEFENSIVE RESPONSE'),
                      h('strong', null, visual.blueAction || 'INVESTIGATE & RESPOND'),
                    ]),
                  ],
                ),
              ]),
            ],
          )
        }

        /* ------------------------------------------------------
           RED/BLUE SUMMARY
           ------------------------------------------------------ */

        if (type === 'redblue-summary') {
          return h(
            'div',
            {
              class: ['visual-panel', 'redblue-visual', 'rb-summary-visual', { compact }],
            },
            [
              h('div', { class: 'visual-caption' }, visual.title || 'RED - BLUE SECURITY CYCLE'),

              h('div', { class: 'rb-summary-cycle' }, [
                h('div', { class: 'rb-summary-node rb-summary-red' }, [
                  h('span', { class: 'material-icons' }, 'flash_on'),
                  h('strong', null, 'RED'),
                  h('small', null, 'FIND'),
                ]),

                h('div', { class: 'rb-summary-connector' }, '->'),

                h('div', { class: 'rb-summary-node rb-summary-purple' }, [
                  h('span', { class: 'material-icons' }, 'sync'),
                  h('strong', null, 'PURPLE'),
                  h('small', null, 'SHARE'),
                ]),

                h('div', { class: 'rb-summary-connector' }, '->'),

                h('div', { class: 'rb-summary-node rb-summary-blue' }, [
                  h('span', { class: 'material-icons' }, 'shield'),
                  h('strong', null, 'BLUE'),
                  h('small', null, 'DEFEND'),
                ]),

                h('div', { class: 'rb-summary-connector rb-summary-return' }, '>>'),
              ]),

              h(
                'div',
                {
                  class: 'rb-summary-message',
                },
                visual.caption || 'Test -> Detect -> Respond -> Improve',
              ),
            ],
          )
        }
      }

      /* ======================================================
         GENERIC DATA VISUAL
         ====================================================== */

      const items =
        Array.isArray(visual.items) && visual.items.length
          ? visual.items
          : Array.isArray(visual.nodes) && visual.nodes.length
            ? visual.nodes
            : []

      if (items.length) {
        return h(
          'div',
          {
            class: ['visual-panel', 'data-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'KEY SYSTEM VISUAL'),

            h(
              'div',
              {
                class: 'data-visual-map',
              },
              [
                h(
                  'div',
                  {
                    class: 'data-visual-core',
                  },
                  [
                    h(
                      'span',
                      {
                        class: 'material-icons',
                      },
                      icon(visual.icon, 'account_tree'),
                    ),
                    h('strong', null, visual.center || visual.title || 'SYSTEM'),
                  ],
                ),

                h(
                  'div',
                  {
                    class: 'data-visual-items',
                  },
                  items.slice(0, 8).map((item, index) =>
                    h(
                      'div',
                      {
                        class: 'data-visual-item',
                        key: index,
                      },
                      [
                        h(
                          'div',
                          {
                            class: 'visual-icon',
                          },
                          [
                            h(
                              'span',
                              {
                                class: 'material-icons',
                              },
                              itemIcon(item, 'check_circle'),
                            ),
                          ],
                        ),

                        h('div', null, [
                          h('strong', null, itemTitle(item, `Concept ${index + 1}`)),

                          itemText(item) ? h('span', null, itemText(item)) : null,
                        ]),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ],
        )
      }

      /* ======================================================
         DOCKER FLOW (center + surrounding items)
         ====================================================== */

      if (type === 'docker-flow') {
        const items = visual.items || []
        const centerTitle = visual.center || visual.title || 'DOCKER'
        const centerIcon = visual.icon || 'inventory_2'

        return h(
          'div',
          {
            class: ['visual-panel', 'docker-flow-visual', { compact }],
          },
          [
            h('div', { class: 'visual-caption' }, visual.title || 'DOCKER FLOW'),

            h('div', { class: 'docker-flow-stage' }, [
              h('div', { class: 'docker-flow-center' }, [
                h('span', { class: 'material-icons' }, centerIcon),
                h('strong', null, centerTitle),
              ]),

              ...items.slice(0, 6).map((item, index) =>
                h(
                  'div',
                  {
                    class: ['docker-flow-node', `docker-flow-node-${index + 1}`],
                    key: index,
                  },
                  [
                    h('span', { class: 'material-icons' }, itemIcon(item, 'circle')),
                    h('strong', null, itemTitle(item, `Step ${index + 1}`)),
                    itemText(item) ? h('small', null, itemText(item)) : null,
                  ],
                ),
              ),
            ]),
          ],
        )
      }

      /* ======================================================
         GENERIC FALLBACK
         ====================================================== */

      return h(
        'div',
        {
          class: ['visual-panel', 'generic-visual-panel', { compact }],
        },
        [
          h('div', { class: 'visual-caption' }, visual.title || 'LEARNING VISUAL'),

          h(
            'div',
            {
              class: 'generic-visual-large',
            },
            [
              h(
                'div',
                {
                  class: 'generic-visual-ring',
                },
                [
                  h(
                    'span',
                    {
                      class: 'material-icons',
                    },
                    icon(
                      visual.icon,
                      topic.value === 'docker'
                        ? 'inventory_2'
                        : topic.value === 'redblue'
                          ? 'flash_on'
                          : 'security',
                    ),
                  ),
                ],
              ),

              h('strong', null, visual.title || 'Protected System'),

              visual.caption ? h('p', null, visual.caption) : null,
            ],
          ),
        ],
      )
    }
  },
})

/* ============================================================
   SLIDE HEADING
   ============================================================ */

const SlideHeading = defineComponent({
  name: 'SlideHeading',

  props: {
    slide: {
      type: Object,
      required: true,
    },

    label: {
      type: String,
      default: 'LEARNING',
    },
  },

  setup(componentProps) {
    return () =>
      h('div', { class: 'slide-heading' }, [
        h(
          'div',
          {
            class: 'slide-label',
          },
          componentProps.label,
        ),

        h('h2', null, componentProps.slide.title),
      ])
  },
})
</script>

<style scoped>
/* ============================================================
   BASE
   ============================================================ */

.learning-viewer {
  --green: #10b981;
  --green-light: #34d399;
  --green-soft: rgba(16, 185, 129, 0.12);
  --bg: #07110e;
  --panel: #0b1915;
  --panel-light: #10231d;
  --border: rgba(255, 255, 255, 0.09);
  --text: #f8fafc;
  --muted: #94a3b8;

  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--bg);
  color: var(--text);
}

/* ============================================================
   TOPBAR
   ============================================================ */

.topbar {
  height: 68px;
  min-height: 68px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 18px;
  border-bottom: 1px solid var(--border);
  background: rgba(7, 17, 14, 0.96);
  backdrop-filter: blur(16px);
  z-index: 20;
}

.topbar-left,
.topbar-right {
  display: flex;
  align-items: center;
}

.topbar-right {
  justify-content: flex-end;
  gap: 4px;
}

.course-info {
  margin-left: 12px;
}

.course-title {
  font-size: 14px;
  font-weight: 700;
}

.course-subtitle {
  margin-top: 2px;
  color: var(--muted);
  font-size: 11px;
}

.topbar-center {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lesson-counter,
.slide-counter {
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 11px;
  color: var(--muted);
}

.slide-counter {
  color: var(--green-light);
  background: var(--green-soft);
  border-color: rgba(16, 185, 129, 0.18);
}

/* ============================================================
   BODY
   ============================================================ */

.viewer-body {
  flex: 1;
  min-height: 0;
  min-width: 0;
  display: grid;
  grid-template-columns: 300px minmax(0, 1fr);
  overflow: hidden;
  transition: grid-template-columns 0.25s ease;
}

.viewer-body:has(.sidebar.collapsed) {
  grid-template-columns: 72px minmax(0, 1fr);
}

/* ============================================================
   SIDEBAR
   ============================================================ */

.sidebar {
  width: 300px;
  min-width: 300px;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border);
  background: #08130f;
  overflow: hidden;
  z-index: 15;
  position: relative;
  transition:
    width 0.25s ease,
    min-width 0.25s ease;
}

.sidebar.collapsed {
  width: 72px;
  min-width: 72px;
}

.sidebar-header {
  padding: 24px 20px 18px;
  border-bottom: 1px solid var(--border);
}

.sidebar-label {
  color: var(--green);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.14em;
}

.sidebar-course {
  margin-top: 8px;
  font-size: 18px;
  font-weight: 800;
}

.sidebar-collapse-btn {
  position: absolute;
  top: 16px;
  right: 10px;
  color: var(--muted);
}

.sidebar.collapsed .sidebar-header {
  padding: 14px 8px;
  text-align: center;
}

.sidebar.collapsed .sidebar-label,
.sidebar.collapsed .sidebar-course,
.sidebar.collapsed .lesson-item-content,
.sidebar.collapsed .lesson-item > .q-icon {
  display: none;
}

.sidebar.collapsed .sidebar-collapse-btn {
  display: flex;
  position: static;
  margin: 0 auto;
  color: var(--muted);
}

.sidebar.collapsed .lesson-list {
  padding: 10px 8px;
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.sidebar.collapsed .lesson-item {
  justify-content: center;
  padding: 8px 4px;
}

.sidebar.collapsed .lesson-number {
  width: 42px;
  height: 42px;
}

.sidebar.collapsed .lesson-item {
  width: 100%;
  min-height: 52px;
  margin-bottom: 6px;
  padding: 5px;
  justify-content: center;
  border-radius: 14px;
}

.sidebar.collapsed .lesson-number {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  font-size: 11px;
  flex-shrink: 0;
}

.sidebar.collapsed .lesson-item.active {
  background: rgba(16, 185, 129, 0.12);
  border-color: rgba(16, 185, 129, 0.35);
}

.sidebar.collapsed .lesson-item:hover {
  background: rgba(255, 255, 255, 0.07);
}

.sidebar.collapsed .lesson-list {
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar.collapsed .lesson-list::-webkit-scrollbar {
  width: 4px;
}

.sidebar.collapsed .lesson-list::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.25);
  border-radius: 999px;
}

.lesson-list {
  flex: 1;
  min-height: 0;
  min-width: 0;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  box-sizing: border-box;
}

.lesson-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-bottom: 5px;
  border: 1px solid transparent;
  border-radius: 12px;
  background: transparent;
  color: var(--text);
  text-align: left;
  cursor: pointer;
  transition: 0.2s ease;
}

.lesson-item:hover {
  background: rgba(255, 255, 255, 0.035);
}

.lesson-item.active {
  background: var(--green-soft);
  border-color: rgba(16, 185, 129, 0.25);
}

.lesson-number {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--muted);
  font-size: 10px;
  font-weight: 800;
}

.lesson-item.active .lesson-number {
  background: var(--green);
  color: #042218;
}

.lesson-item-content {
  min-width: 0;
  flex: 1;
}

.lesson-item-title {
  font-size: 12px;
  font-weight: 700;
  line-height: 1.35;
}

.lesson-item-category {
  margin-top: 3px;
  color: var(--muted);
  font-size: 9px;
}

/* ============================================================
   PRESENTATION
   ============================================================ */

.presentation-area {
  width: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 18px;
  overflow: hidden;
  box-sizing: border-box;
}

.presentation-frame {
  flex: 1;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-sizing: border-box;
}

.slide {
  width: min(1280px, 100%);
  max-width: 100%;
  height: auto;
  max-height: 100%;
  aspect-ratio: 16 / 9;
  min-width: 0;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 18px;
  background:
    radial-gradient(circle at 90% 10%, rgba(16, 185, 129, 0.08), transparent 28%), #0b1713;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.35);
}

/* ============================================================
   CONTENT
   ============================================================ */

.content-slide {
  width: 100%;
  height: 100%;
  padding: 6% 7%;
  display: flex;
  flex-direction: column;
}

.slide-heading {
  margin-bottom: 3.5%;
}

.learning-viewer :deep(.slide-label) {
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 800;
}

.learning-viewer :deep(.slide-heading h2) {
  margin: 0;
  font-size: clamp(26px, 3vw, 46px);
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.02em;
  color: var(--text);
}

/* ============================================================
   HERO
   ============================================================ */

.hero-slide {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 8%;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 4;
  max-width: 720px;
}

.hero-content h1 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(42px, 6vw, 82px);
  line-height: 0.98;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.hero-content p {
  max-width: 700px;
  margin: 24px 0 0;
  color: var(--muted);
  font-size: clamp(15px, 1.4vw, 20px);
  line-height: 1.6;
}

.eyebrow {
  color: var(--green-light);
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.18em;
}

.hero-icon {
  width: 68px;
  height: 68px;
  display: grid;
  place-items: center;
  margin: 24px 0;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 18px;
  background: var(--green-soft);
  color: var(--green-light);
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  color: var(--muted);
  font-size: 11px;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--green);
}

.hero-glow {
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  filter: blur(100px);
  background: rgba(16, 185, 129, 0.09);
}

.glow-one {
  top: -180px;
  right: -80px;
}

.glow-two {
  bottom: -220px;
  left: 20%;
}

/* ============================================================
   HERO VISUAL
   ============================================================ */

.hero-visual {
  position: absolute;
  right: 5%;
  top: 50%;
  width: 42%;
  height: 78%;
  transform: translateY(-50%);
  z-index: 2;
  pointer-events: none;
}

/* CYBER RADAR */

.hero-radar-grid {
  position: absolute;
  right: 0;
  top: 50%;
  width: min(390px, 100%);
  aspect-ratio: 1;
  transform: translateY(-50%);
  border: 1px solid rgba(25, 242, 139, 0.4);
  border-radius: 50%;
  overflow: hidden;
  background: radial-gradient(circle, rgba(25, 242, 139, 0.12), transparent 65%);
  box-shadow:
    0 0 70px rgba(25, 242, 139, 0.08),
    inset 0 0 60px rgba(25, 242, 139, 0.06);
}

.radar-ring {
  position: absolute;
  inset: 15%;
  border: 1px solid rgba(25, 242, 139, 0.22);
  border-radius: 50%;
}

.ring-2 {
  inset: 30%;
}

.ring-3 {
  inset: 45%;
}

.radar-cross {
  position: absolute;
  background: rgba(25, 242, 139, 0.18);
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
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, rgba(25, 242, 139, 0.45), transparent 25%);
  animation: radar-sweep 5s linear infinite;
}

.radar-dot {
  position: absolute;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ff4d5e;
  box-shadow: 0 0 14px #ff4d5e;
  z-index: 2;
}

.dot-a {
  top: 25%;
  left: 62%;
}

.dot-b {
  top: 68%;
  left: 31%;
  background: var(--green);
  box-shadow: 0 0 14px var(--green);
}

.dot-c {
  top: 44%;
  left: 73%;
}

.hero-visual-label {
  position: absolute;
  right: 5%;
  bottom: 4%;
  padding: 10px 14px;
  border: 1px solid rgba(25, 242, 139, 0.25);
  background: rgba(4, 8, 7, 0.85);
  font-family: monospace;
}

.hero-visual-label span,
.hero-visual-label strong {
  display: block;
}

.hero-visual-label span {
  color: var(--muted);
  font-size: 8px;
}

.hero-visual-label strong {
  margin-top: 3px;
  color: var(--green-light);
  font-size: 11px;
}

/* DOCKER HERO */

.docker-whale {
  position: absolute;
  right: 0;
  bottom: 10%;
  width: 90%;
  height: 70%;
}

.whale-body {
  position: absolute;
  right: 0;
  bottom: 25%;
  width: 80%;
  height: 55%;
  padding: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 5px;
  border-radius: 50% 45% 20% 20%;
  background: linear-gradient(180deg, #2496ed, #0b6fc2);
  box-shadow: 0 25px 45px rgba(36, 150, 237, 0.22);
}

.whale-body span {
  width: 17%;
  height: 48%;
  border-radius: 3px 3px 0 0;
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.25) 0 2px, transparent 2px 8px), #0b3a75;
}

.whale-tail {
  position: absolute;
  right: 0;
  bottom: 50%;
  color: #2496ed;
  font-size: 50px;
  transform: rotate(45deg);
}

.whale-base {
  position: absolute;
  left: 10%;
  right: 5%;
  bottom: 17%;
  height: 20px;
  border-radius: 50%;
  background: #0b6fc2;
}

.docker-floating-card {
  position: absolute;
  padding: 10px 13px;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid rgba(36, 150, 237, 0.25);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.92);
  color: #0b214a;
  font-size: 8px;
  font-weight: 900;
  box-shadow: 0 12px 25px rgba(11, 33, 74, 0.12);
}

.card-one {
  right: 12%;
  top: 15%;
}

.card-two {
  left: 0;
  bottom: 8%;
}

/* ============================================================
   CONCEPT
   ============================================================ */

.concept-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(360px, 1.1fr);
  gap: 4%;
  align-items: stretch;
}

.concept-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}

.concept-badge {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  margin-bottom: 18px;
  border: 1px solid rgba(16, 185, 129, 0.22);
  border-radius: 8px;
  background: var(--green-soft);
  color: var(--green-light);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

.concept-text {
  margin: 0;
  color: #dce8e3;
  font-size: clamp(18px, 1.8vw, 27px);
  line-height: 1.55;
}

.concept-points {
  display: grid;
  gap: 8px;
  margin-top: 24px;
}

.concept-point {
  display: flex;
  gap: 12px;
  padding: 9px 11px;
  border-left: 2px solid var(--green);
  background: rgba(255, 255, 255, 0.025);
}

.concept-point span {
  color: var(--green);
  font-family: monospace;
  font-size: 9px;
}

.concept-point strong {
  font-size: 10px;
  line-height: 1.4;
}

/* ============================================================
   VISUAL PANEL
   ============================================================ */

.visual-panel {
  min-width: 0;
  min-height: 250px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.025);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.visual-panel.compact {
  min-height: 0;
  padding: 16px;
}

.visual-caption {
  margin-bottom: 14px;
  color: var(--green);
  font-size: 9px;
  font-weight: 900;
  letter-spacing: 0.16em;
}

.visual-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: var(--green-soft);
  color: var(--green-light);
  flex-shrink: 0;
}

.visual-icon.large {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  font-size: 22px;
}

.visual-note {
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.5;
}

/* ============================================================
   SECURITY MAP
   ============================================================ */

.security-map {
  position: relative;
  flex: 1;
  min-height: 250px;
  display: grid;
  place-items: center;
}

.security-core {
  width: 120px;
  height: 120px;
  display: grid;
  place-items: center;
  align-content: center;
  border: 2px solid var(--green);
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green-light);
  box-shadow: 0 0 50px rgba(16, 185, 129, 0.1);
  z-index: 2;
}

.security-core .material-icons {
  font-size: 28px;
}

.security-core strong {
  margin-top: 5px;
  font-size: 14px;
}

.security-core small {
  color: var(--muted);
  font-size: 7px;
  letter-spacing: 0.14em;
}

.security-node {
  position: absolute;
  width: 110px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.035);
}

.security-node .material-icons {
  color: var(--green-light);
  font-size: 18px;
}

.security-node strong {
  font-size: 8px;
  line-height: 1.2;
}

.security-node-1 {
  top: 4%;
  left: 50%;
  transform: translateX(-50%);
}

.security-node-2 {
  top: 30%;
  left: 3%;
}

.security-node-3 {
  top: 30%;
  right: 3%;
}

.security-node-4 {
  bottom: 4%;
  left: 50%;
  transform: translateX(-50%);
}

.security-node-5 {
  bottom: 10%;
  left: 8%;
}

.security-node-6 {
  bottom: 10%;
  right: 8%;
}

/* ============================================================
   CIA
   ============================================================ */

.big-cia {
  position: relative;
  flex: 1;
  min-height: 260px;
  display: grid;
  place-items: center;
}

.big-cia-center {
  width: 125px;
  height: 125px;
  display: grid;
  place-items: center;
  align-content: center;
  border: 2px solid var(--green);
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green-light);
  z-index: 2;
}

.big-cia-center strong {
  font-size: 35px;
}

.big-cia-center span {
  color: var(--muted);
  font-size: 7px;
  letter-spacing: 0.12em;
}

.big-cia-node {
  position: absolute;
  width: 125px;
  padding: 9px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 7px;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
}

.big-cia-node strong {
  font-size: 9px;
}

.big-cia-node > span:last-child {
  grid-column: 1 / -1;
  color: var(--muted);
  font-size: 8px;
  line-height: 1.3;
}

.big-cia-node.node-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.big-cia-node.node-2 {
  bottom: 0;
  left: 0;
}

.big-cia-node.node-3 {
  bottom: 0;
  right: 0;
}

/* ============================================================
   THREATS
   ============================================================ */

.threat-map {
  flex: 1;
  min-height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.threat-map-node {
  position: relative;
  flex: 1;
  min-width: 0;
  min-height: 105px;
  padding: 12px 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px solid rgba(255, 77, 94, 0.25);
  background: rgba(255, 77, 94, 0.05);
}

.threat-map-node.defense-node {
  border-color: rgba(25, 242, 139, 0.35);
  background: rgba(25, 242, 139, 0.06);
}

.threat-map-icon {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(255, 77, 94, 0.13);
  color: #ff6b78;
}

.defense-node .threat-map-icon {
  background: var(--green-soft);
  color: var(--green-light);
}

.threat-map-node strong {
  margin-top: 7px;
  font-size: 9px;
}

.threat-map-node > span:not(.material-icons) {
  margin-top: 4px;
  color: var(--muted);
  font-size: 7px;
}

.threat-map-arrow {
  position: absolute;
  right: -14px;
  color: var(--green);
  font-size: 18px;
  z-index: 3;
}

/* ============================================================
   NETWORK
   ============================================================ */

.network-diagram {
  flex: 1;
  min-height: 230px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.network-device,
.network-firewall-box {
  width: 105px;
  min-height: 100px;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-align: center;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
}

.network-device .material-icons,
.network-firewall-box .material-icons {
  font-size: 31px;
}

.network-device strong,
.network-firewall-box strong {
  font-size: 10px;
}

.network-device small,
.network-firewall-box small {
  color: var(--muted);
  font-size: 7px;
}

.network-firewall-box {
  border: 2px solid var(--green);
  background: var(--green-soft);
  color: var(--green-light);
}

.network-connection {
  color: var(--green);
  font-size: 22px;
  font-weight: 900;
}

.port-strip {
  display: flex;
  justify-content: center;
  gap: 6px;
  flex-wrap: wrap;
}

.port-strip.large span {
  padding: 7px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--muted);
  font-family: monospace;
  font-size: 8px;
}

/* ============================================================
   AUTH
   ============================================================ */

.auth-diagram {
  position: relative;
  flex: 1;
  min-height: 240px;
  display: grid;
  place-items: center;
}

.auth-security-ring {
  width: 105px;
  height: 105px;
  display: grid;
  place-items: center;
  border: 2px solid var(--green);
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green-light);
  box-shadow: 0 0 40px rgba(16, 185, 129, 0.12);
}

.auth-diagram-step {
  position: absolute;
  width: 115px;
  padding: 8px;
  display: grid;
  justify-items: center;
  gap: 5px;
  text-align: center;
}

.auth-diagram-number {
  color: var(--green);
  font-family: monospace;
  font-size: 8px;
}

.auth-diagram-step strong {
  font-size: 8px;
  line-height: 1.3;
}

.auth-step-1 {
  top: 0;
  left: 0;
}

.auth-step-2 {
  top: 0;
  right: 0;
}

.auth-step-3 {
  bottom: 0;
  left: 0;
}

.auth-step-4 {
  bottom: 0;
  right: 0;
}

/* ============================================================
   PI
   ============================================================ */

.pi-architecture {
  flex: 1;
  min-height: 230px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  align-items: center;
}

.pi-board-large {
  min-height: 170px;
  padding: 20px;
  position: relative;
  display: grid;
  place-items: center;
  border: 2px solid var(--green);
  border-radius: 14px;
  background: #123d2c;
  box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.2);
}

.pi-board-large strong {
  color: #c8f8df;
  font-size: 13px;
  letter-spacing: 0.08em;
}

.pi-board-cpu,
.pi-board-memory {
  position: absolute;
  padding: 7px 10px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 5px;
  background: #07110e;
  color: var(--green-light);
  font-family: monospace;
  font-size: 8px;
}

.pi-board-cpu {
  top: 22%;
  left: 20%;
}

.pi-board-memory {
  top: 22%;
  right: 20%;
}

.pi-service-stack {
  display: grid;
  gap: 7px;
}

.pi-service {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px;
  border-left: 3px solid var(--green);
  background: rgba(255, 255, 255, 0.035);
}

.pi-service .material-icons {
  color: var(--green-light);
  font-size: 17px;
}

.pi-service strong {
  font-size: 9px;
}

/* ============================================================
   LINUX
   ============================================================ */

.linux-terminal {
  border: 1px solid rgba(25, 242, 139, 0.3);
  border-radius: 8px;
  overflow: hidden;
  background: #050b09;
}

.linux-terminal-top {
  display: flex;
  gap: 5px;
  padding: 8px 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.linux-terminal-top span {
  color: #33443d;
  font-size: 8px;
}

.linux-terminal-body {
  padding: 15px;
  color: #8ba99b;
  font-family: monospace;
  font-size: 9px;
  line-height: 1.8;
}

.linux-terminal-body strong {
  display: block;
  color: var(--green-light);
}

.linux-controls {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  margin-top: 12px;
}

.linux-control {
  min-height: 62px;
  padding: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  text-align: center;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.025);
}

.linux-control .material-icons {
  color: var(--green-light);
  font-size: 18px;
}

.linux-control strong {
  font-size: 7px;
}

/* ============================================================
   MONITORING
   ============================================================ */

.monitor-dashboard {
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
}

.monitor-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
  font-family: monospace;
  font-size: 8px;
}

.monitor-status strong {
  color: var(--green-light);
}

.monitor-bars {
  height: 125px;
  display: flex;
  align-items: flex-end;
  gap: 6px;
  padding: 14px 5px;
}

.monitor-bars span {
  flex: 1;
  min-height: 15%;
  border-radius: 3px 3px 0 0;
  background: linear-gradient(180deg, var(--green-light), var(--green));
}

.monitor-events {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
}

.monitor-events span {
  padding: 6px;
  text-align: center;
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 6px;
}

/* ============================================================
   DOCKER CONTAINER VISUAL
   ============================================================ */

.docker-container-diagram {
  flex: 1;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.docker-container-box {
  width: 70%;
  min-height: 110px;
  border: 3px solid #2496ed;
  border-radius: 12px 12px 5px 5px;
  background: #fff;
  box-shadow: 0 15px 35px rgba(36, 150, 237, 0.15);
}

.container-top {
  padding: 7px;
  background: #2496ed;
  color: #fff;
  text-align: center;
  font-size: 8px;
  font-weight: 900;
}

.container-engine {
  height: 75px;
  display: grid;
  place-items: center;
  align-content: center;
  color: #0b6fc2;
  gap: 5px;
}

.container-engine strong {
  font-size: 12px;
}

.docker-base-layer,
.docker-host-layer {
  width: 78%;
  padding: 10px;
  text-align: center;
  font-size: 8px;
  font-weight: 900;
}

.docker-base-layer {
  background: #0b6fc2;
  color: #fff;
}

.docker-host-layer {
  background: #0b214a;
  color: #fff;
}

/* ============================================================
   DOCKER IMAGE
   ============================================================ */

.docker-layers {
  flex: 1;
  min-height: 210px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.docker-layer {
  width: 75%;
  padding: 11px 15px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  color: #fff;
  box-shadow: 0 5px 10px rgba(11, 33, 74, 0.1);
}

.docker-layer span {
  font-size: 7px;
  opacity: 0.75;
}

.docker-layer strong {
  font-size: 9px;
}

.layer-1 {
  background: #0b3a75;
}

.layer-2 {
  width: 80%;
  background: #13579c;
}

.layer-3 {
  width: 85%;
  background: #1769b8;
}

.layer-4 {
  width: 90%;
  background: #2496ed;
}

.image-to-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 9px;
  border-radius: 8px;
  background: rgba(36, 150, 237, 0.08);
  color: #0b6fc2;
  font-size: 9px;
}

/* ============================================================
   DOCKER NETWORK
   ============================================================ */

.docker-network-map {
  flex: 1;
  min-height: 230px;
  display: grid;
  grid-template-columns: 1fr auto 1.4fr;
  align-items: center;
  gap: 10px;
}

.docker-network-client,
.docker-network-hub {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 12px;
  text-align: center;
}

.docker-network-client {
  border: 1px solid #c6d8e8;
  background: #fff;
  color: #0b214a;
}

.docker-network-hub {
  border: 2px solid #2496ed;
  background: rgba(36, 150, 237, 0.08);
  color: #0b6fc2;
}

.docker-network-client .q-icon,
.docker-network-hub .q-icon {
  font-size: 30px;
}

.docker-network-client strong,
.docker-network-hub strong {
  font-size: 9px;
}

.docker-network-line {
  color: #2496ed;
  font-size: 22px;
}

.docker-network-branch {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 7px;
}

.docker-network-branch span {
  padding: 7px 12px;
  border-radius: 6px;
  background: #0b214a;
  color: #fff;
  font-size: 8px;
  font-weight: 800;
}

/* ============================================================
   DOCKER VOLUME
   ============================================================ */

.volume-diagram {
  flex: 1;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.volume-container,
.volume-storage {
  width: 130px;
  min-height: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border-radius: 12px;
  text-align: center;
}

.volume-container {
  border: 2px solid #2496ed;
  background: #fff;
  color: #0b6fc2;
}

.volume-storage {
  border: 2px solid #f5a623;
  background: rgba(245, 166, 35, 0.08);
  color: #a96700;
}

.volume-container strong,
.volume-storage strong {
  font-size: 10px;
}

.volume-storage small {
  font-size: 7px;
}

.volume-arrow {
  color: #2496ed;
  font-size: 25px;
}

/* ============================================================
   DOCKER COMPOSE
   ============================================================ */

.compose-file {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  border: 1px solid #c9d9e8;
  border-radius: 9px;
  overflow: hidden;
  background: #fff;
}

.compose-header {
  padding: 12px;
  background: #0b214a;
  color: #fff;
  font-family: monospace;
  font-size: 8px;
}

.compose-code {
  padding: 12px;
  color: #4d6480;
  font-family: monospace;
  font-size: 8px;
  line-height: 1.8;
}

.compose-services {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  margin-top: 10px;
}

.compose-service {
  padding: 11px 5px;
  display: grid;
  justify-items: center;
  gap: 5px;
  border: 1px solid #d2dfeb;
  border-radius: 8px;
  background: #fff;
  color: #0b214a;
}

.compose-service .q-icon {
  color: #2496ed;
}

.compose-service strong {
  font-size: 8px;
}

/* ============================================================
   DOCKER BUILD
   ============================================================ */

.docker-build-flow {
  flex: 1;
  min-height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.build-step {
  position: relative;
  width: 100px;
  display: grid;
  justify-items: center;
  gap: 7px;
  text-align: center;
}

.build-step-icon {
  width: 65px;
  height: 65px;
  display: grid;
  place-items: center;
  border: 2px solid #2496ed;
  border-radius: 12px;
  background: #fff;
  color: #2496ed;
}

.build-step strong {
  font-size: 8px;
  color: #0b214a;
}

.build-arrow {
  position: absolute;
  right: -18px;
  top: 25px;
  color: #2496ed;
  font-size: 18px;
}

/* ============================================================
   DOCKER SECURITY
   ============================================================ */

.docker-security-shield {
  width: 125px;
  height: 145px;
  margin: auto;
  display: grid;
  place-items: center;
  align-content: center;
  clip-path: polygon(50% 0, 90% 15%, 84% 65%, 50% 100%, 16% 65%, 10% 15%);
  background: linear-gradient(145deg, #2496ed, #0b3a75);
  color: #fff;
}

.docker-security-shield strong {
  font-size: 10px;
}

.docker-security-controls {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-top: 12px;
}

.docker-security-control {
  min-height: 55px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 4px;
  border: 1px solid #cddce9;
  border-radius: 7px;
  background: #fff;
  text-align: center;
}

.docker-security-control .q-icon {
  color: #2496ed;
  font-size: 18px;
}

.docker-security-control span {
  color: #4d6480;
  font-size: 6px;
}

/* ============================================================
   CARDS
   ============================================================ */

.cards-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.6fr);
  gap: 15px;
}

.cards-grid {
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.info-card {
  position: relative;
  padding: 19px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.025);
  overflow: hidden;
}

.card-number {
  position: absolute;
  top: 13px;
  right: 16px;
  color: rgba(255, 255, 255, 0.12);
  font-size: 26px;
  font-weight: 900;
}

.card-icon {
  width: 43px;
  height: 43px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  border-radius: 11px;
  background: var(--green-soft);
  color: var(--green-light);
}

.info-card h3 {
  margin: 0 0 7px;
  font-size: 15px;
}

.info-card p {
  margin: 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.5;
}

/* ============================================================
   COMPARISON
   ============================================================ */

.comparison-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) 150px;
  gap: 12px;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  min-height: 0;
}

.comparison-panel {
  min-height: 0;
  padding: 22px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.025);
  overflow: hidden;
}

.comparison-label {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  border-radius: 8px;
  background: var(--green);
  color: #042218;
  font-size: 11px;
  font-weight: 900;
}

.comparison-icon {
  margin-bottom: 8px;
  color: var(--green-light);
}

.comparison-panel h3 {
  margin: 0 0 13px;
  font-size: 20px;
}

.comparison-panel ul {
  padding-left: 18px;
  margin: 0;
}

.comparison-panel li {
  margin-bottom: 8px;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.4;
}

.comparison-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--green);
}

.comparison-divider div {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid var(--green);
  border-radius: 50%;
  background: var(--green-soft);
  font-size: 9px;
  font-weight: 900;
}

/* ============================================================
   PROCESS
   ============================================================ */

.process-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 15px;
}

.process-track {
  min-height: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 10px;
}

.process-step {
  position: relative;
  min-width: 0;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
}

.step-number {
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  margin-bottom: 10px;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 10px;
  background: var(--green-soft);
  color: var(--green-light);
  font-size: 11px;
  font-weight: 900;
}

.step-icon {
  color: var(--green-light);
  margin-bottom: 8px;
}

.step-line {
  position: absolute;
  top: 34px;
  right: -12px;
  width: 14px;
  border-top: 1px dashed var(--green);
}

.process-step:last-child .step-line {
  display: none;
}

.step-content h3 {
  margin: 0 0 5px;
  font-size: 13px;
}

.step-content p {
  margin: 0;
  color: var(--muted);
  font-size: 9px;
  line-height: 1.45;
}

/* ============================================================
   ARCHITECTURE
   ============================================================ */

.architecture-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 15px;
}

.architecture-stack {
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
}

.architecture-layer {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border: 1px solid var(--border);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.025);
}

.architecture-index {
  color: var(--green);
  font-size: 9px;
  font-weight: 900;
}

.architecture-layer-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: var(--green-soft);
  color: var(--green-light);
}

.architecture-content {
  flex: 1;
}

.architecture-content h3 {
  margin: 0 0 3px;
  font-size: 12px;
}

.architecture-content p {
  margin: 0;
  color: var(--muted);
  font-size: 9px;
}

.architecture-arrow {
  position: absolute;
  bottom: -15px;
  left: 50%;
  z-index: 2;
  color: var(--green);
}

/* ============================================================
   TECHNICAL
   ============================================================ */

.technical-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 18px;
}

.technical-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.technical-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin-bottom: 15px;
  border: 1px solid var(--green);
  border-radius: 12px;
  background: var(--green-soft);
  color: var(--green-light);
}

.technical-description p {
  margin: 0;
  color: #dce8e3;
  font-size: 18px;
  line-height: 1.5;
}

.technical-mini-screen {
  margin-top: 20px;
  padding: 13px;
  display: grid;
  gap: 4px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: #050b09;
  color: #789589;
  font-family: monospace;
  font-size: 8px;
}

.technical-mini-screen strong {
  color: var(--green-light);
}

.technical-right {
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) 160px;
  gap: 10px;
}

.technical-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.technical-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.025);
  color: var(--muted);
  font-size: 10px;
  line-height: 1.4;
}

.technical-row .q-icon {
  flex-shrink: 0;
  color: var(--green);
}

/* ============================================================
   SCENARIO
   ============================================================ */

.scenario-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) 150px;
  gap: 12px;
}

.scenario-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 18px;
  align-items: center;
}

.scenario-box {
  padding: 22px;
  min-height: 170px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.025);
}

.scenario-tag {
  margin-bottom: 12px;
  color: var(--green);
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.15em;
}

.scenario-icon {
  margin-bottom: 12px;
  color: var(--green-light);
}

.scenario-box p {
  margin: 0;
  color: #dce8e3;
  font-size: 12px;
  line-height: 1.55;
}

.scenario-box.scenario {
  border-color: rgba(255, 77, 94, 0.4);
  background: rgba(255, 77, 94, 0.05);
}

.scenario-box.scenario .scenario-tag,
.scenario-box.scenario .scenario-icon {
  color: #ff6b78;
}

.scenario-arrow {
  display: grid;
  justify-items: center;
  gap: 5px;
  color: var(--green);
}

.scenario-arrow div {
  font-size: 7px;
  font-weight: 900;
  letter-spacing: 0.1em;
}

/* ============================================================
   COMMAND
   ============================================================ */

.command-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-rows: minmax(0, 1fr) 155px;
  gap: 12px;
}

.terminal-window {
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(16, 185, 129, 0.22);
  border-radius: 13px;
  overflow: hidden;
  background: #050b09;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
}

.terminal-header {
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: #0b1511;
}

.terminal-header > span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #33443d;
}

.terminal-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: var(--muted);
  font-size: 8px;
}

.terminal-body {
  position: relative;
  flex: 1;
  min-height: 0;
  padding: 22px 28px;
  overflow: auto;
  font-family: monospace;
}

.terminal-user {
  color: #ffb020;
  font-size: 11px;
  margin-bottom: 8px;
}

.terminal-prompt {
  color: var(--green-light);
  font-size: clamp(15px, 1.5vw, 22px);
  font-weight: 700;
  white-space: pre-wrap;
  word-break: break-word;
}

.terminal-output {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  color: #9bb5aa;
  font-size: clamp(10px, 0.95vw, 13px);
  line-height: 1.55;
  white-space: pre;
  overflow-x: auto;
}

.terminal-output::before {
  content: '# OUTPUT';
  display: block;
  margin-bottom: 6px;
  color: var(--green);
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.15em;
}

.terminal-cursor {
  margin-top: 12px;
  color: var(--green);
  animation: blink 1s steps(2, start) infinite;
}

.command-bottom {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 10px;
}

.command-explanation {
  padding: 16px 18px;
  border: 1px solid var(--border);
  border-radius: 11px;
  background: rgba(255, 255, 255, 0.025);
  overflow-y: auto;
}

.command-label {
  margin-bottom: 7px;
  color: var(--green);
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.15em;
}

.command-explanation p {
  margin: 0;
  color: var(--muted);
  font-size: 11px;
  line-height: 1.5;
}

/* ============================================================
   TRIAD
   ============================================================ */

.triad-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 25px;
  align-items: center;
}

.triad-visual {
  position: relative;
  height: 100%;
  min-height: 270px;
  display: grid;
  place-items: center;
}

.triad-circle {
  width: 150px;
  height: 150px;
  display: grid;
  place-items: center;
  align-content: center;
  border: 2px solid var(--green);
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green-light);
  z-index: 2;
}

.triad-circle strong {
  font-size: 38px;
}

.triad-circle span {
  color: var(--muted);
  font-size: 7px;
  letter-spacing: 0.13em;
}

.triad-orbit {
  position: absolute;
  width: 220px;
  height: 220px;
  border: 1px dashed rgba(16, 185, 129, 0.2);
  border-radius: 50%;
}

.orbit-two {
  width: 280px;
  height: 280px;
  transform: rotate(60deg);
}

.orbit-three {
  width: 340px;
  height: 340px;
  transform: rotate(120deg);
}

.triad-corner {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
  border: 1px solid var(--border);
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.04);
}

.triad-corner .q-icon {
  color: var(--green-light);
}

.triad-corner strong {
  font-size: 7px;
}

.confidentiality {
  top: 3%;
  left: 5%;
}

.integrity {
  top: 3%;
  right: 5%;
}

.availability {
  bottom: 4%;
  left: 50%;
  transform: translateX(-50%);
}

.triad-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.triad-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.025);
}

.triad-item-number {
  color: var(--green);
  font-family: monospace;
  font-size: 9px;
}

.triad-item strong,
.triad-item span {
  display: block;
}

.triad-item strong {
  font-size: 10px;
}

.triad-item span {
  margin-top: 4px;
  color: var(--muted);
  font-size: 8px;
  line-height: 1.35;
}

/* ============================================================
   THREAT GRID
   ============================================================ */

.threat-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(300px, 0.6fr);
  gap: 15px;
}

.threat-grid {
  grid-template-columns: repeat(2, 1fr);
}

.threat-grid .info-card {
  border-left: 3px solid #ff4d5e;
  background: linear-gradient(135deg, rgba(255, 77, 94, 0.08), transparent 60%);
}

/* ============================================================
   SUMMARY
   ============================================================ */

.summary-slide {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  padding: 8%;
  overflow: hidden;
  background:
    radial-gradient(circle at 75% 35%, rgba(16, 185, 129, 0.12), transparent 35%), #0b1713;
}

.summary-inner {
  position: relative;
  z-index: 3;
  max-width: 760px;
}

.summary-inner h1 {
  margin: 0;
  font-size: clamp(42px, 5vw, 72px);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.summary-subtitle {
  margin: 12px 0 22px;
  color: var(--muted);
}

.summary-list {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.summary-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 9px 11px;
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.025);
  color: #dce8e3;
  font-size: 10px;
  line-height: 1.4;
}

.summary-check {
  width: 23px;
  height: 23px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 7px;
  background: var(--green);
  color: #042218;
}

.summary-visual {
  position: absolute;
  right: 5%;
  top: 50%;
  width: 330px;
  height: 330px;
  transform: translateY(-50%);
  z-index: 1;
  border: 1px solid rgba(16, 185, 129, 0.15);
  border-radius: 50%;
}

.summary-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 125px;
  height: 125px;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  align-content: center;
  border: 2px solid var(--green);
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green-light);
}

.summary-core strong {
  margin-top: 5px;
  font-size: 10px;
  letter-spacing: 0.1em;
}

.summary-orbit {
  position: absolute;
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.08);
  color: var(--green-light);
  font-family: monospace;
  font-size: 7px;
}

.orbit-1 {
  top: 0;
  left: 50%;
}

.orbit-2 {
  top: 12%;
  right: 18%;
}

.orbit-3 {
  top: 50%;
  right: 0;
}

.orbit-4 {
  bottom: 12%;
  right: 18%;
}

.orbit-5 {
  bottom: 0;
  left: 50%;
}

.orbit-6 {
  bottom: 12%;
  left: 18%;
}

.orbit-7 {
  top: 50%;
  left: 0;
}

.orbit-8 {
  top: 12%;
  left: 18%;
}

/* ============================================================
   FALLBACK
   ============================================================ */

.fallback-layout {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 15px;
}

.fallback-content {
  min-height: 0;
  overflow: auto;
  padding: 20px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.025);
}

.fallback-content pre {
  white-space: pre-wrap;
  color: var(--muted);
  font-family: monospace;
  font-size: 10px;
}

/* ============================================================
   RED TEAM & BLUE TEAM
   ADDITIVE STYLES - DO NOT REMOVE EXISTING CSS
   ============================================================ */

/* ---------- HERO ---------- */

.redblue-hero-visual {
  position: relative;
  flex: 1;
  min-height: 250px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background:
    radial-gradient(circle at 18% 50%, rgba(239, 68, 68, 0.18), transparent 32%),
    radial-gradient(circle at 82% 50%, rgba(59, 130, 246, 0.18), transparent 32%),
    linear-gradient(135deg, rgba(239, 68, 68, 0.035), rgba(59, 130, 246, 0.035)),
    rgba(255, 255, 255, 0.018);
}

.rb-hero-grid {
  position: absolute;
  inset: 0;
  opacity: 0.28;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent);
}

.rb-hero-split {
  position: absolute;
  inset: 50% 28px auto;
  transform: translateY(-50%);
  display: grid;
  grid-template-columns: 1fr 90px 1fr;
  align-items: center;
  gap: 18px;
  z-index: 2;
}

.rb-hero-side {
  min-height: 125px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(8, 12, 18, 0.72);
  backdrop-filter: blur(8px);
}

.rb-hero-side .material-icons {
  font-size: 30px;
}

.rb-hero-side strong {
  font-size: 13px;
  letter-spacing: 0.12em;
}

.rb-hero-side small {
  font-size: 8px;
  letter-spacing: 0.2em;
  opacity: 0.6;
}

.rb-hero-red {
  border-color: rgba(239, 68, 68, 0.42);
  box-shadow: inset 0 0 28px rgba(239, 68, 68, 0.06);
}

.rb-hero-red .material-icons,
.rb-hero-red strong {
  color: #ef4444;
}

.rb-hero-blue {
  border-color: rgba(59, 130, 246, 0.42);
  box-shadow: inset 0 0 28px rgba(59, 130, 246, 0.06);
}

.rb-hero-blue .material-icons,
.rb-hero-blue strong {
  color: #3b82f6;
}

.rb-hero-core {
  width: 76px;
  height: 76px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 1px solid rgba(16, 185, 129, 0.55);
  border-radius: 50%;
  background: rgba(7, 12, 17, 0.9);
  box-shadow:
    0 0 28px rgba(16, 185, 129, 0.12),
    inset 0 0 20px rgba(16, 185, 129, 0.05);
  z-index: 3;
}

.rb-hero-core .material-icons {
  color: #10b981;
  font-size: 20px;
}

.rb-hero-core strong {
  color: #f8fafc;
  font-size: 12px;
  letter-spacing: 0.12em;
}

.redblue-hero-visual .hero-visual-label {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 16px;
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  background: rgba(5, 9, 14, 0.72);
  backdrop-filter: blur(8px);
}

.redblue-hero-visual .hero-visual-label span {
  color: rgba(248, 250, 252, 0.5);
  font-family: monospace;
  font-size: 8px;
  letter-spacing: 0.16em;
}

.redblue-hero-visual .hero-visual-label strong {
  color: #10b981;
  font-family: monospace;
  font-size: 9px;
  letter-spacing: 0.12em;
}

@media (max-width: 700px) {
  .rb-hero-split {
    inset-inline: 14px;
    grid-template-columns: 1fr 58px 1fr;
    gap: 8px;
  }

  .rb-hero-side {
    min-height: 105px;
  }

  .rb-hero-side .material-icons {
    font-size: 24px;
  }

  .rb-hero-side strong {
    font-size: 10px;
  }

  .rb-hero-core {
    width: 58px;
    height: 58px;
  }

  .redblue-hero-visual .hero-visual-label {
    left: 12px;
    right: 12px;
    bottom: 10px;
  }
}
/* ---------- BASE ---------- */

.redblue-visual {
  position: relative;
  flex: 1;
  min-height: 250px;
  overflow: hidden;
  border-radius: 14px;
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 59, 78, 0.08), transparent 35%),
    radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.08), transparent 35%),
    rgba(255, 255, 255, 0.018);
}

.redblue-visual.compact {
  min-height: 210px;
}

/* ---------- OVERVIEW ---------- */

.redblue-overview-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
}

.rb-overview-stage {
  width: 100%;
  max-width: 720px;
  display: grid;
  grid-template-columns: 1fr 120px 1fr;
  align-items: center;
  gap: 15px;
}

.rb-team-card {
  min-height: 175px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 14px;
  position: relative;
  overflow: hidden;
}

.rb-red-card {
  border: 1px solid rgba(255, 59, 78, 0.45);
  background:
    linear-gradient(135deg, rgba(255, 59, 78, 0.12), transparent), rgba(255, 59, 78, 0.035);
}

.rb-blue-card {
  border: 1px solid rgba(59, 130, 246, 0.45);
  background:
    linear-gradient(135deg, rgba(59, 130, 246, 0.12), transparent), rgba(59, 130, 246, 0.035);
}

.rb-team-badge {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  margin-bottom: 12px;
  border-radius: 10px;
  color: #fff;
}

.rb-red-card .rb-team-badge {
  background: #ff3b4e;
}

.rb-blue-card .rb-team-badge {
  background: #3b82f6;
}

.rb-team-label {
  margin-bottom: 6px;
  font-family: monospace;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: 0.16em;
}

.rb-red-card .rb-team-label {
  color: #ff6877;
}

.rb-blue-card .rb-team-label {
  color: #60a5fa;
}

.rb-team-card strong {
  font-size: 20px;
}

.rb-team-card p {
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 9px;
  line-height: 1.45;
}

.rb-center-core {
  width: 105px;
  height: 105px;
  margin: auto;
  display: grid;
  place-items: center;
  align-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08), transparent 65%), #101817;
  color: #fff;
  box-shadow:
    0 0 35px rgba(255, 255, 255, 0.04),
    inset 0 0 25px rgba(255, 255, 255, 0.03);
  text-align: center;
}

.rb-center-core .material-icons {
  font-size: 26px;
}

.rb-center-core strong {
  margin-top: 5px;
  font-size: 8px;
  letter-spacing: 0.12em;
}

.rb-overview-points {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.rb-overview-point {
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.rb-point-red {
  background: #ff3b4e;
  box-shadow: 0 0 14px rgba(255, 59, 78, 0.7);
}

.rb-point-blue {
  background: #3b82f6;
  box-shadow: 0 0 14px rgba(59, 130, 246, 0.7);
}

.rb-overview-point:nth-child(1) {
  top: 18%;
  left: 12%;
}

.rb-overview-point:nth-child(2) {
  bottom: 20%;
  left: 25%;
}

.rb-overview-point:nth-child(3) {
  top: 22%;
  right: 14%;
}

.rb-overview-point:nth-child(4) {
  bottom: 18%;
  right: 24%;
}

/* ---------- RED TEAM ---------- */

.rb-red-visual {
  padding: 15px;
}

.rb-red-radar {
  position: relative;
  width: 210px;
  height: 210px;
  margin: 5px auto 15px;
  border: 1px solid rgba(255, 59, 78, 0.35);
  border-radius: 50%;
  background:
    linear-gradient(rgba(255, 59, 78, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 59, 78, 0.08) 1px, transparent 1px),
    radial-gradient(circle, rgba(255, 59, 78, 0.08), transparent 65%);
  background-size: 35px 35px;
}

.rb-radar-grid {
  position: absolute;
  inset: 15%;
  border: 1px dashed rgba(255, 59, 78, 0.22);
  border-radius: 50%;
}

.rb-radar-ring {
  position: absolute;
  inset: 30%;
  border: 1px dashed rgba(255, 59, 78, 0.25);
  border-radius: 50%;
}

.rb-ring-2 {
  inset: 20%;
}

.rb-ring-3 {
  inset: 10%;
}

.rb-radar-sweep {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 50%;
  height: 1px;
  transform-origin: left center;
  background: linear-gradient(90deg, rgba(255, 59, 78, 0.8), transparent);
  animation: rb-radar-sweep 3s linear infinite;
}

.rb-radar-center {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border: 1px solid #ff3b4e;
  border-radius: 50%;
  background: rgba(255, 59, 78, 0.14);
  color: #ff6877;
}

.rb-radar-target {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid #ff6877;
  border-radius: 50%;
  background: #ff3b4e;
  box-shadow: 0 0 14px rgba(255, 59, 78, 0.55);
}

.rb-target-1 {
  top: 25%;
  left: 62%;
}

.rb-target-2 {
  top: 55%;
  left: 20%;
}

.rb-target-3 {
  bottom: 22%;
  right: 23%;
}

.rb-target-4 {
  top: 16%;
  right: 25%;
}

.rb-operation-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
}

.rb-operation-step {
  padding: 9px 5px;
  text-align: center;
  border: 1px solid rgba(255, 59, 78, 0.2);
  border-radius: 8px;
  background: rgba(255, 59, 78, 0.045);
}

.rb-step-number {
  display: block;
  margin-bottom: 4px;
  color: #ff3b4e;
  font-family: monospace;
  font-size: 7px;
}

.rb-operation-step strong {
  font-size: 7px;
}

/* ---------- BLUE TEAM / SOC ---------- */

.rb-blue-visual {
  padding: 14px;
}

.rb-soc-dashboard {
  height: 100%;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 12px;
  overflow: hidden;
  background: #07101c;
}

.rb-soc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid rgba(59, 130, 246, 0.16);
  font-family: monospace;
  font-size: 8px;
}

.rb-status-live {
  color: #60a5fa;
}

.rb-status-live::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 5px;
  border-radius: 50%;
  background: #3b82f6;
  box-shadow: 0 0 9px rgba(59, 130, 246, 0.8);
  animation: rb-live-pulse 1.5s ease-in-out infinite;
}

.rb-soc-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
  padding: 9px;
}

.rb-soc-metric {
  padding: 9px 6px;
  border: 1px solid rgba(59, 130, 246, 0.18);
  border-radius: 7px;
  background: rgba(59, 130, 246, 0.045);
  text-align: center;
}

.rb-soc-metric strong {
  display: block;
  color: #60a5fa;
  font-size: 15px;
}

.rb-soc-metric span {
  color: #6f849e;
  font-size: 6px;
  text-transform: uppercase;
}

.rb-log-stream {
  flex: 1;
  padding: 7px 9px;
  overflow: hidden;
}

.rb-log-line {
  display: grid;
  grid-template-columns: 42px 1fr auto;
  gap: 6px;
  padding: 6px 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.035);
  color: #7d91a8;
  font-family: monospace;
  font-size: 7px;
}

.rb-log-line strong {
  color: #a9bdd2;
}

.rb-log-alert {
  border-left: 2px solid #3b82f6;
  background: rgba(59, 130, 246, 0.07);
}

.rb-log-alert strong {
  color: #60a5fa;
}

.rb-defense-pipeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  margin-top: 9px;
}

.rb-defense-step {
  position: relative;
  padding: 10px 6px;
  text-align: center;
  border: 1px solid rgba(59, 130, 246, 0.22);
  border-radius: 8px;
  background: rgba(59, 130, 246, 0.05);
}

.rb-defense-step .material-icons {
  color: #60a5fa;
  font-size: 20px;
}

.rb-defense-step strong {
  display: block;
  margin-top: 4px;
  font-size: 7px;
}

.rb-pipeline-arrow {
  position: absolute;
  top: 50%;
  right: -13px;
  transform: translateY(-50%);
  color: #3b82f6;
  font-size: 15px;
  z-index: 2;
}

/* ---------- RED VS BLUE ---------- */

.rb-versus-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.rb-versus-stage {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 90px 1fr;
  align-items: center;
  gap: 12px;
}

.rb-versus-side {
  min-height: 180px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
}

.rb-versus-red {
  border: 1px solid rgba(255, 59, 78, 0.4);
  background: linear-gradient(135deg, rgba(255, 59, 78, 0.1), transparent);
  text-align: right;
}

.rb-versus-blue {
  border: 1px solid rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent);
}

.rb-versus-side .material-icons {
  margin-bottom: 8px;
  font-size: 30px;
}

.rb-versus-red .material-icons {
  color: #ff6877;
}

.rb-versus-blue .material-icons {
  color: #60a5fa;
}

.rb-versus-side strong {
  font-size: 18px;
}

.rb-versus-side span {
  margin-top: 5px;
  color: var(--muted);
  font-size: 8px;
  line-height: 1.4;
}

.rb-versus-center {
  display: grid;
  justify-items: center;
  gap: 7px;
}

.rb-versus-emblem {
  width: 65px;
  height: 65px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  background: #111918;
  color: #fff;
  font-size: 20px;
}

.rb-versus-line {
  width: 100%;
  height: 2px;
}

.rb-line-red {
  background: linear-gradient(90deg, transparent, #ff3b4e);
}

.rb-line-blue {
  background: linear-gradient(90deg, #3b82f6, transparent);
}

.rb-versus-footer {
  grid-column: 1 / -1;
  padding: 9px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  color: var(--muted);
  font-size: 8px;
}

/* ---------- PURPLE TEAM ---------- */

.rb-purple-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: radial-gradient(circle at center, rgba(168, 85, 247, 0.09), transparent 55%);
}

.rb-purple-stage {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 150px 1fr;
  align-items: center;
  gap: 12px;
}

.rb-purple-team {
  min-height: 150px;
  padding: 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
}

.rb-purple-red {
  border: 1px solid rgba(255, 59, 78, 0.35);
  background: rgba(255, 59, 78, 0.06);
}

.rb-purple-blue {
  border: 1px solid rgba(59, 130, 246, 0.35);
  background: rgba(59, 130, 246, 0.06);
}

.rb-purple-team strong {
  font-size: 14px;
}

.rb-purple-team span {
  margin-top: 5px;
  color: var(--muted);
  font-size: 8px;
}

.rb-feedback-loop {
  position: relative;
  width: 140px;
  height: 140px;
  margin: auto;
  display: grid;
  place-items: center;
}

.rb-loop-arrow {
  position: absolute;
  inset: 8px;
  border: 2px dashed #a855f7;
  border-radius: 50%;
}

.rb-loop-forward {
  clip-path: polygon(0 0, 100% 0, 100% 30%, 88% 18%, 88% 0, 0 0);
}

.rb-loop-back {
  transform: rotate(180deg);
}

.rb-loop-core {
  width: 70px;
  height: 70px;
  display: grid;
  place-items: center;
  align-content: center;
  border: 1px solid #a855f7;
  border-radius: 50%;
  background: rgba(168, 85, 247, 0.12);
  color: #c084fc;
  text-align: center;
}

.rb-loop-core .material-icons {
  font-size: 22px;
}

.rb-loop-core strong {
  margin-top: 3px;
  font-size: 7px;
}

.rb-purple-message {
  grid-column: 1 / -1;
  text-align: center;
  color: #c084fc;
  font-family: monospace;
  font-size: 7px;
  letter-spacing: 0.1em;
}

/* ---------- ATTACK -> DETECTION -> RESPONSE ---------- */

.rb-flow-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
}

.rb-flow-stage {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 25px;
}

.rb-flow-card {
  position: relative;
  min-height: 145px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  text-align: center;
}

.rb-flow-1 {
  border: 1px solid rgba(255, 59, 78, 0.4);
  background: rgba(255, 59, 78, 0.07);
}

.rb-flow-2 {
  border: 1px solid rgba(245, 166, 35, 0.4);
  background: rgba(245, 166, 35, 0.06);
}

.rb-flow-3 {
  border: 1px solid rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.07);
}

.rb-flow-number {
  font-family: monospace;
  font-size: 7px;
  opacity: 0.7;
}

.rb-flow-icon {
  margin: 8px 0;
  font-size: 30px;
}

.rb-flow-1 .rb-flow-icon {
  color: #ff6877;
}

.rb-flow-2 .rb-flow-icon {
  color: #f5a623;
}

.rb-flow-3 .rb-flow-icon {
  color: #60a5fa;
}

.rb-flow-card strong {
  font-size: 11px;
}

.rb-flow-card span:last-child {
  margin-top: 5px;
  color: var(--muted);
  font-size: 7px;
  line-height: 1.35;
}

.rb-flow-arrow {
  position: absolute;
  top: 50%;
  right: -31px;
  transform: translateY(-50%);
  color: #a855f7;
  font-size: 22px;
}

/* ---------- SCENARIO ---------- */

.rb-scenario-visual {
  padding: 15px;
}

.rb-scenario-stage {
  height: 100%;
  min-height: 220px;
  display: grid;
  grid-template-columns: 1fr 70px 1fr;
  align-items: stretch;
  gap: 10px;
}

.rb-scenario-column {
  padding: 13px;
  border-radius: 10px;
}

.rb-scenario-red {
  border: 1px solid rgba(255, 59, 78, 0.3);
  background: rgba(255, 59, 78, 0.045);
}

.rb-scenario-blue {
  border: 1px solid rgba(59, 130, 246, 0.3);
  background: rgba(59, 130, 246, 0.045);
}

.rb-scenario-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  font-size: 8px;
  letter-spacing: 0.08em;
}

.rb-scenario-red .rb-scenario-heading {
  color: #ff6877;
}

.rb-scenario-blue .rb-scenario-heading {
  color: #60a5fa;
}

.rb-scenario-event {
  padding: 8px;
  margin-bottom: 6px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.035);
  color: var(--muted);
  font-size: 7px;
  line-height: 1.35;
}

.rb-scenario-middle {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rb-scenario-arrow {
  width: 55px;
  height: 55px;
  display: grid;
  place-items: center;
  border: 1px dashed #a855f7;
  border-radius: 50%;
  color: #c084fc;
}

.rb-scenario-alert {
  color: #f5a623;
}

/* ---------- SUMMARY ---------- */

.rb-summary-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
}

.rb-summary-cycle {
  position: relative;
  width: 250px;
  height: 250px;
  border: 1px dashed rgba(168, 85, 247, 0.35);
  border-radius: 50%;
}

.rb-summary-node {
  position: absolute;
  width: 72px;
  height: 72px;
  display: grid;
  place-items: center;
  align-content: center;
  border-radius: 50%;
  text-align: center;
}

.rb-summary-node .material-icons {
  font-size: 20px;
}

.rb-summary-node strong {
  margin-top: 3px;
  font-size: 7px;
}

.rb-summary-red {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid rgba(255, 59, 78, 0.4);
  background: rgba(255, 59, 78, 0.1);
  color: #ff6877;
}

.rb-summary-purple {
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: 1px solid rgba(168, 85, 247, 0.4);
  background: rgba(168, 85, 247, 0.1);
  color: #c084fc;
}

.rb-summary-blue {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid rgba(59, 130, 246, 0.4);
  background: rgba(59, 130, 246, 0.1);
  color: #60a5fa;
}

.rb-summary-connector {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 1px;
  transform: translate(-50%, -50%);
  background: linear-gradient(90deg, #ff3b4e, #a855f7, #3b82f6);
  opacity: 0.35;
}

.rb-summary-return {
  position: absolute;
  inset: 20%;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 50%;
}

.rb-summary-message {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  text-align: center;
  color: var(--muted);
  font-family: monospace;
  font-size: 7px;
  line-height: 1.4;
}

/* ---------- RED/BLUE ANIMATION ---------- */

@keyframes rb-radar-sweep {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes rb-live-pulse {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.85);
  }

  50% {
    opacity: 1;
    transform: scale(1);
  }
}

/* ============================================================
   RED/BLUE COMPONENT OVERRIDES
   Remove remaining Cybersecurity green accents
   ============================================================ */

.theme-redblue .summary-check {
  color: #3b82f6 !important;
}

.theme-redblue .summary-row {
  border-color: rgba(255, 255, 255, 0.08) !important;
  background: linear-gradient(
    90deg,
    rgba(239, 68, 68, 0.035),
    rgba(59, 130, 246, 0.035)
  ) !important;
}

.theme-redblue .summary-row::before {
  background: linear-gradient(180deg, #ef4444, #a855f7, #3b82f6) !important;
}

.theme-redblue .summary-row strong,
.theme-redblue .summary-row h3 {
  color: #f8fafc !important;
}

.theme-redblue .summary-inner {
  color: #f8fafc;
}

.theme-redblue .summary-subtitle {
  color: rgba(248, 250, 252, 0.62);
}

/* Generic green accents inside Red/Blue slides */

.theme-redblue .concept-point,
.theme-redblue .concept-point span,
.theme-redblue .technical-row strong,
.theme-redblue .point-row strong {
  border-color: rgba(239, 68, 68, 0.28);
}

.theme-redblue .concept-point span,
.theme-redblue .point-row span {
  color: #ef4444 !important;
}

.theme-redblue .concept-point {
  border-left-color: #ef4444 !important;
}

.theme-redblue .technical-row::before {
  background: #3b82f6 !important;
}

.theme-redblue .command-explanation strong {
  color: #f87171 !important;
}

.theme-redblue .comparison-panel strong {
  color: #93c5fd !important;
}

/* Card icons */

.theme-redblue .info-card .material-icons,
.theme-redblue .point-row .material-icons,
.theme-redblue .technical-row .material-icons {
  color: #a855f7 !important;
}

/* Headings that inherited Cybersecurity green */

.theme-redblue .slide-heading .eyebrow,
.theme-redblue .section-kicker,
.theme-redblue .accent-text {
  color: #f87171 !important;
}

/* Links / highlighted text */

.theme-redblue .slide a {
  color: #60a5fa !important;
}

/* Progress / navigation indicators */

.theme-redblue .slide-indicator,
.theme-redblue .slide-dot.active {
  background: linear-gradient(90deg, #ef4444, #a855f7, #3b82f6) !important;
}

.theme-redblue .slide-dot {
  border-color: rgba(255, 255, 255, 0.2) !important;
}

/* Final takeaway emphasis */

.theme-redblue .summary-row:last-child {
  border-color: rgba(168, 85, 247, 0.24) !important;
}

.theme-redblue .summary-row:last-child .summary-check {
  color: #a855f7 !important;
}

/* Remove green glow from Red/Blue content */

.theme-redblue .slide [style*='10b981'],
.theme-redblue .slide [style*='16, 185, 129'],
.theme-redblue .slide [style*='green'] {
  color: #f87171 !important;
  border-color: rgba(239, 68, 68, 0.28) !important;
}

/* ============================================================
   END RED/BLUE OVERRIDES
   ============================================================ */

/* ============================================================
   RED/BLUE SUMMARY SLIDE
   ============================================================ */

.theme-redblue .summary-slide.summary-redblue {
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 50%, rgba(239, 68, 68, 0.13), transparent 30%),
    radial-gradient(circle at 88% 50%, rgba(59, 130, 246, 0.13), transparent 30%),
    linear-gradient(135deg, #090a0f 0%, #0d0d14 50%, #090b11 100%);
}

.theme-redblue .summary-redblue::before {
  background: linear-gradient(
    90deg,
    #ef4444 0%,
    #ef4444 36%,
    #a855f7 50%,
    #3b82f6 64%,
    #3b82f6 100%
  );
}

.theme-redblue .summary-redblue .summary-core {
  border-color: rgba(168, 85, 247, 0.65);
  background: radial-gradient(circle, rgba(168, 85, 247, 0.14), rgba(8, 10, 15, 0.96) 68%);
  box-shadow:
    0 0 35px rgba(168, 85, 247, 0.18),
    inset 0 0 24px rgba(168, 85, 247, 0.08);
}

.theme-redblue .summary-redblue .summary-core strong {
  color: #f8fafc;
}

.theme-redblue .summary-redblue .summary-core .q-icon {
  color: #a855f7 !important;
}

.theme-redblue .summary-redblue .summary-orbit {
  color: rgba(248, 250, 252, 0.28);
  border-color: rgba(255, 255, 255, 0.08);
}

.theme-redblue .summary-redblue .eyebrow {
  color: #c084fc !important;
}

.theme-redblue .summary-redblue .summary-subtitle {
  color: rgba(248, 250, 252, 0.58);
}

.theme-redblue .summary-redblue .summary-row {
  position: relative;
  border-color: rgba(255, 255, 255, 0.08) !important;
  background: rgba(255, 255, 255, 0.022) !important;
}

.theme-redblue .summary-redblue .summary-row:nth-child(odd) {
  border-left: 2px solid rgba(239, 68, 68, 0.55) !important;
}

.theme-redblue .summary-redblue .summary-row:nth-child(even) {
  border-left: 2px solid rgba(59, 130, 246, 0.55) !important;
}

.theme-redblue .summary-redblue .summary-check {
  color: #f8fafc !important;
  background: linear-gradient(135deg, #ef4444, #a855f7, #3b82f6);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.18);
}

.theme-redblue .summary-redblue .summary-row span {
  color: rgba(248, 250, 252, 0.82);
}

/* RED / BLUE SIDE BADGES */

.theme-redblue .rb-summary-side {
  position: absolute;
  top: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transform: translateY(-50%);
  padding: 12px 14px;
  border-radius: 10px;
  background: rgba(7, 9, 14, 0.82);
  backdrop-filter: blur(8px);
  z-index: 4;
}

.theme-redblue .rb-summary-side q-icon {
  font-size: 24px;
}

.theme-redblue .rb-summary-side span {
  font-family: monospace;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.theme-redblue .rb-summary-side small {
  font-family: monospace;
  font-size: 7px;
  letter-spacing: 0.14em;
  opacity: 0.55;
}

.theme-redblue .rb-summary-side-red {
  left: 18px;
  border: 1px solid rgba(239, 68, 68, 0.38);
}

.theme-redblue .rb-summary-side-red q-icon,
.theme-redblue .rb-summary-side-red span {
  color: #ef4444;
}

.theme-redblue .rb-summary-side-blue {
  right: 18px;
  border: 1px solid rgba(59, 130, 246, 0.38);
}

.theme-redblue .rb-summary-side-blue q-icon,
.theme-redblue .rb-summary-side-blue span {
  color: #3b82f6;
}

@media (max-width: 700px) {
  .theme-redblue .rb-summary-side {
    display: none;
  }
}

/* ---------- MOBILE ---------- */

@media (max-width: 850px) {
  .rb-overview-stage,
  .rb-versus-stage,
  .rb-purple-stage {
    grid-template-columns: 1fr;
  }

  .rb-center-core {
    width: 75px;
    height: 75px;
  }

  .rb-team-card,
  .rb-versus-side {
    min-height: 125px;
  }

  .rb-versus-red {
    text-align: left;
  }

  .rb-feedback-loop {
    width: 100px;
    height: 100px;
  }

  .rb-flow-stage {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .rb-flow-card {
    min-height: 105px;
  }

  .rb-flow-arrow {
    right: 50%;
    top: auto;
    bottom: -18px;
    transform: translateX(50%) rotate(90deg);
  }

  .rb-scenario-stage {
    grid-template-columns: 1fr;
  }

  .rb-scenario-middle {
    min-height: 45px;
  }

  .rb-operation-strip {
    grid-template-columns: repeat(2, 1fr);
  }

  .rb-summary-cycle {
    width: 200px;
    height: 200px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rb-radar-sweep,
  .rb-status-live::before {
    animation: none;
  }
}

/* ============================================================
   GENERIC VISUAL
   ============================================================ */

.generic-visual-large {
  flex: 1;
  display: grid;
  place-items: center;
  align-content: center;
  text-align: center;
}

.generic-visual-ring {
  width: 115px;
  height: 115px;
  display: grid;
  place-items: center;
  margin-bottom: 13px;
  border: 2px solid var(--green);
  border-radius: 50%;
  background: var(--green-soft);
  color: var(--green-light);
  font-size: 34px;
}

.generic-visual-large strong {
  font-size: 14px;
}

.generic-visual-large p {
  max-width: 240px;
  margin: 7px 0 0;
  color: var(--muted);
  font-size: 9px;
}

/* ============================================================
   DATA VISUAL
   ============================================================ */

.data-visual-map {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

.data-visual-core {
  align-self: center;
  min-width: 150px;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: 1px solid var(--green);
  border-radius: 12px;
  background: var(--green-soft);
  color: var(--green-light);
}

.data-visual-core .material-icons {
  font-size: 23px;
}

.data-visual-core strong {
  font-size: 10px;
}

.data-visual-items {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
}

.data-visual-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px;
  border: 1px solid var(--border);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.025);
}

.data-visual-item .visual-icon {
  width: 30px;
  height: 30px;
  border-radius: 7px;
}

.data-visual-item strong {
  display: block;
  font-size: 8px;
}

.data-visual-item span:not(.material-icons) {
  display: block;
  margin-top: 3px;
  color: var(--muted);
  font-size: 7px;
  line-height: 1.25;
}

/* ============================================================
   CONTROLS
   ============================================================ */

.controls {
  height: 68px;
  min-height: 68px;
  display: grid;
  grid-template-columns: 150px 1fr 150px;
  align-items: center;
  gap: 20px;
}

.controls-left,
.controls-right {
  display: flex;
  align-items: center;
  gap: 7px;
}

.controls-right {
  justify-content: flex-end;
}

.control-label {
  color: var(--muted);
  font-size: 10px;
}

.progress-container {
  min-width: 0;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 6px;
  color: var(--muted);
  font-size: 9px;
}

.progress-track {
  height: 4px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.progress-fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--green), var(--green-light));
  transition: width 0.25s ease;
}

/* ============================================================
   CYBER THEME
   ============================================================ */

.learning-viewer.theme-cyber {
  --green: #19f28b;
  --green-light: #6dffb8;
  --green-soft: rgba(25, 242, 139, 0.1);
  --alert: #ff4d5e;
  --amber: #ffb020;
  --bg: #040807;
  --panel: #08110e;
  --border: rgba(25, 242, 139, 0.16);
  --text: #e2fff0;
  --muted: #80a494;
  --mono: 'JetBrains Mono', 'Cascadia Code', Consolas, monospace;
}

.theme-cyber .topbar {
  background: rgba(4, 8, 7, 0.96);
  border-bottom-color: rgba(25, 242, 139, 0.25);
}

.theme-cyber .sidebar {
  background: #060d0a;
}

.theme-cyber .lesson-item,
.theme-cyber .lesson-number {
  border-radius: 4px;
}

.theme-cyber .slide {
  border-radius: 6px;
  border-color: rgba(25, 242, 139, 0.3);
  background:
    linear-gradient(rgba(25, 242, 139, 0.045) 1px, transparent 1px) 0 0 / 40px 40px,
    linear-gradient(90deg, rgba(25, 242, 139, 0.045) 1px, transparent 1px) 0 0 / 40px 40px,
    radial-gradient(circle at 85% 0%, rgba(25, 242, 139, 0.12), transparent 40%),
    #050c09;
  box-shadow:
    0 0 0 1px rgba(25, 242, 139, 0.06),
    0 0 70px rgba(25, 242, 139, 0.09);
}

.theme-cyber .slide::before {
  content: '';
  position: absolute;
  inset: 12px;
  z-index: 20;
  pointer-events: none;
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
  content: '';
  position: absolute;
  inset: 0;
  z-index: 19;
  pointer-events: none;
  opacity: 0.38;
  background: repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0 1px, transparent 1px 3px);
}

.theme-cyber :deep(.slide-label) {
  color: var(--amber);
  font-family: var(--mono);
  letter-spacing: 0.18em;
}

.theme-cyber :deep(.slide-label)::before {
  content: '// ';
}

.theme-cyber .hero-content h1 {
  text-shadow: 0 0 40px rgba(25, 242, 139, 0.3);
}

.theme-cyber .info-card {
  border-radius: 0;
  border-left: 3px solid var(--green);
  background: linear-gradient(135deg, rgba(25, 242, 139, 0.07), transparent 60%);
}

.theme-cyber .point-row,
.theme-cyber .technical-row,
.theme-cyber .triad-item,
.theme-cyber .command-explanation,
.theme-cyber .comparison-panel {
  border-radius: 2px;
  border-left: 2px solid var(--green);
}

.theme-cyber .scenario-box {
  border-radius: 2px;
}

.theme-cyber .terminal-window {
  border-radius: 4px;
  border-color: rgba(25, 242, 139, 0.45);
  box-shadow: 0 0 34px rgba(25, 242, 139, 0.14);
}

.theme-cyber .terminal-header > span:nth-child(1) {
  background: var(--alert);
}

.theme-cyber .terminal-header > span:nth-child(2) {
  background: var(--amber);
}

.theme-cyber .terminal-header > span:nth-child(3) {
  background: var(--green);
}

.theme-cyber .summary-row {
  border-radius: 0;
  border-left: 2px solid var(--green);
  font-family: var(--mono);
}

.theme-cyber .summary-check {
  border-radius: 2px;
}

/* ============================================================
   DOCKER THEME
   ============================================================ */

/* ============================================================
   RED TEAM & BLUE TEAM - FULL THEME
   Distinct visual identity from Cybersecurity
   ============================================================ */

.learning-viewer.theme-redblue {
  --green: #ef4444;
  --green-bright: #f87171;
  --green-soft: rgba(239, 68, 68, 0.14);
  --green-border: rgba(239, 68, 68, 0.32);

  background:
    radial-gradient(circle at 15% 15%, rgba(239, 68, 68, 0.075), transparent 28%),
    radial-gradient(circle at 85% 18%, rgba(59, 130, 246, 0.075), transparent 28%),
    linear-gradient(135deg, #08090d 0%, #0a0c12 50%, #080a10 100%);
}

/* ---------- TOPBAR ---------- */

.theme-redblue .topbar {
  border-bottom-color: rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    90deg,
    rgba(239, 68, 68, 0.055),
    rgba(8, 10, 15, 0.94) 42%,
    rgba(59, 130, 246, 0.055)
  );
}

.theme-redblue .topbar::after {
  background: linear-gradient(
    90deg,
    #ef4444 0%,
    #ef4444 35%,
    #a855f7 50%,
    #3b82f6 65%,
    #3b82f6 100%
  );
}

.theme-redblue .topbar-center {
  color: #f8fafc;
}

/* ---------- SIDEBAR ---------- */

.theme-redblue .sidebar {
  border-right-color: rgba(255, 255, 255, 0.07);
  background:
    linear-gradient(180deg, rgba(239, 68, 68, 0.025), transparent 42%, rgba(59, 130, 246, 0.025)),
    #090b10;
}

.theme-redblue .lesson-item {
  border-left-color: transparent;
}

.theme-redblue .lesson-item:hover {
  background: rgba(255, 255, 255, 0.035);
  border-left-color: rgba(255, 255, 255, 0.18);
}

.theme-redblue .lesson-item.active {
  background: linear-gradient(90deg, rgba(239, 68, 68, 0.1), rgba(59, 130, 246, 0.045));
  border-left-color: #ef4444;
}

.theme-redblue .lesson-number {
  color: rgba(248, 250, 252, 0.45);
}

.theme-redblue .lesson-item.active .lesson-number {
  color: #ef4444;
}

.theme-redblue .lesson-item.active .material-icons {
  color: #ef4444;
}

/* ---------- PROGRESS ---------- */

.theme-redblue .progress-track {
  background: linear-gradient(
    90deg,
    rgba(239, 68, 68, 0.12),
    rgba(255, 255, 255, 0.06),
    rgba(59, 130, 246, 0.12)
  );
}

.theme-redblue .progress-fill {
  background: linear-gradient(90deg, #ef4444 0%, #a855f7 50%, #3b82f6 100%);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.28);
}

.theme-redblue .progress-text span {
  color: #f8fafc;
}

/* ---------- SLIDES ---------- */

.theme-redblue .slide {
  border-color: rgba(255, 255, 255, 0.075);
  background:
    radial-gradient(circle at 12% 8%, rgba(239, 68, 68, 0.035), transparent 28%),
    radial-gradient(circle at 88% 8%, rgba(59, 130, 246, 0.035), transparent 28%),
    rgba(10, 12, 18, 0.94);
}

.theme-redblue .slide::before {
  background: linear-gradient(
    90deg,
    rgba(239, 68, 68, 0.8),
    rgba(168, 85, 247, 0.5),
    rgba(59, 130, 246, 0.8)
  );
}

.theme-redblue .slide::after {
  background:
    linear-gradient(rgba(239, 68, 68, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.025) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* ---------- TYPOGRAPHY ---------- */

.theme-redblue :deep(.slide-label) {
  color: #f87171;
}

.theme-redblue :deep(.slide-label)::before {
  background: linear-gradient(180deg, #ef4444, #3b82f6);
}

.theme-redblue :deep(.slide-heading h2) {
  color: #f8fafc;
}

.theme-redblue .hero-content h1 {
  background: linear-gradient(90deg, #f8fafc 0%, #fca5a5 35%, #bfdbfe 68%, #f8fafc 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* ---------- CONTENT CARDS ---------- */

.theme-redblue .info-card,
.theme-redblue .point-row,
.theme-redblue .technical-row,
.theme-redblue .triad-item,
.theme-redblue .command-explanation,
.theme-redblue .comparison-panel {
  border-color: rgba(255, 255, 255, 0.075);
  background: rgba(255, 255, 255, 0.018);
}

.theme-redblue .info-card:hover,
.theme-redblue .point-row:hover,
.theme-redblue .technical-row:hover,
.theme-redblue .triad-item:hover {
  border-color: rgba(168, 85, 247, 0.28);
  background: rgba(168, 85, 247, 0.035);
}

.theme-redblue .point-row::before {
  background: #ef4444;
}

/* ---------- SCENARIOS ---------- */

.theme-redblue .scenario-box {
  border-color: rgba(168, 85, 247, 0.3);
  background:
    linear-gradient(135deg, rgba(239, 68, 68, 0.045), rgba(59, 130, 246, 0.045)),
    rgba(255, 255, 255, 0.015);
}

/* ---------- TERMINAL ---------- */

.theme-redblue .terminal-window {
  border-color: rgba(255, 255, 255, 0.09);
  background: #07090d;
}

.theme-redblue .terminal-header {
  border-bottom-color: rgba(255, 255, 255, 0.07);
}

.theme-redblue .terminal-header > span:nth-child(1) {
  color: #ef4444;
}

.theme-redblue .terminal-header > span:nth-child(2) {
  color: #a855f7;
}

.theme-redblue .terminal-header > span:nth-child(3) {
  color: #3b82f6;
}

/* ---------- SUMMARY ---------- */

.theme-redblue .summary-row {
  border-color: rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.018);
}

.theme-redblue .summary-check {
  color: #10b981;
}

/* ---------- RED TEAM LESSON ACCENT ---------- */

.theme-redblue .slide:has(.rb-red-visual),
.theme-redblue .slide:has(.red-team-visual) {
  border-color: rgba(239, 68, 68, 0.16);
}

.theme-redblue .slide:has(.rb-red-visual)::before,
.theme-redblue .slide:has(.red-team-visual)::before {
  background: linear-gradient(90deg, #ef4444, rgba(239, 68, 68, 0.15));
}

/* ---------- BLUE TEAM LESSON ACCENT ---------- */

.theme-redblue .slide:has(.rb-blue-visual),
.theme-redblue .slide:has(.blue-team-visual) {
  border-color: rgba(59, 130, 246, 0.16);
}

.theme-redblue .slide:has(.rb-blue-visual)::before,
.theme-redblue .slide:has(.blue-team-visual)::before {
  background: linear-gradient(90deg, #3b82f6, rgba(59, 130, 246, 0.15));
}

/* ---------- PURPLE TEAM ---------- */

.theme-redblue .slide:has(.rb-purple-visual) {
  border-color: rgba(168, 85, 247, 0.2);
}

.theme-redblue .slide:has(.rb-purple-visual)::before {
  background: linear-gradient(90deg, #ef4444, #a855f7, #3b82f6);
}

/* ---------- RED VS BLUE ---------- */

.theme-redblue .slide:has(.rb-versus-visual) {
  border-color: rgba(168, 85, 247, 0.22);
}

/* ---------- BUTTONS ---------- */

.theme-redblue .q-btn {
  --q-primary: #ef4444;
}

.theme-redblue .q-btn.bg-primary {
  background: linear-gradient(135deg, #ef4444, #a855f7) !important;
}

.theme-redblue .q-btn.bg-primary:hover {
  box-shadow:
    0 0 20px rgba(239, 68, 68, 0.22),
    0 0 20px rgba(59, 130, 246, 0.12);
}

/* ---------- MOBILE ---------- */

@media (max-width: 700px) {
  .learning-viewer.theme-redblue {
    background:
      radial-gradient(circle at 10% 10%, rgba(239, 68, 68, 0.055), transparent 35%),
      radial-gradient(circle at 90% 10%, rgba(59, 130, 246, 0.055), transparent 35%), #080a0f;
  }
}

.learning-viewer.theme-docker {
  --green: #2496ed;
  --green-light: #0b6fc2;
  --green-soft: rgba(36, 150, 237, 0.12);
  --ship: #f5a623;
  --navy: #0b214a;
  --bg: #e9f2fb;
  --panel: #ffffff;
  --border: rgba(11, 33, 74, 0.13);
  --text: #0b214a;
  --muted: #4d6480;
  font-family: 'Nunito', 'Trebuchet MS', 'Segoe UI', system-ui, sans-serif;
}

.theme-docker .topbar {
  background: rgba(255, 255, 255, 0.95);
}

.theme-docker .sidebar {
  background: #ffffff;
}

.theme-docker .lesson-item:hover {
  background: rgba(36, 150, 237, 0.07);
}

.theme-docker .lesson-number {
  background: rgba(11, 33, 74, 0.06);
}

.theme-docker .slide-counter {
  color: var(--green-light);
  border-color: rgba(36, 150, 237, 0.25);
}

.theme-docker .slide {
  border-radius: 22px;
  border: 2px solid rgba(36, 150, 237, 0.25);
  background:
    linear-gradient(rgba(36, 150, 237, 0.08) 1px, transparent 1px) 0 0 / 32px 32px,
    linear-gradient(90deg, rgba(36, 150, 237, 0.08) 1px, transparent 1px) 0 0 / 32px 32px,
    #fbfdff;
  box-shadow: 0 24px 60px rgba(11, 33, 74, 0.14);
}

.theme-docker :deep(.slide-label) {
  display: inline-block;
  padding: 4px 11px;
  border-radius: 6px;
  background: var(--green);
  color: #fff;
  letter-spacing: 0.08em;
}

.theme-docker :deep(.slide-heading h2) {
  color: var(--navy);
  font-weight: 900;
}

.theme-docker .hero-icon {
  border: 0;
  border-radius: 16px;
  background: var(--green);
  color: #fff;
  box-shadow: 0 10px 24px rgba(36, 150, 237, 0.35);
}

.theme-docker .hero-content h1 {
  color: var(--navy);
}

.theme-docker .eyebrow {
  color: var(--green-light);
}

.theme-docker .concept-text,
.theme-docker .technical-description p,
.theme-docker .scenario-box p,
.theme-docker .summary-row {
  color: var(--text);
}

.theme-docker .info-card {
  border: 2px solid var(--green);
  border-radius: 10px;
  background: #fff;
}

.theme-docker .card-number {
  color: rgba(36, 150, 237, 0.22);
}

.theme-docker .point-row,
.theme-docker .technical-row,
.theme-docker .comparison-panel,
.theme-docker .command-explanation,
.theme-docker .triad-item,
.theme-docker .summary-row {
  background: #fff;
  border: 1px solid var(--border);
  border-left: 5px solid var(--green);
  border-radius: 10px;
}

.theme-docker .comparison-panel {
  border-left-width: 1px;
  border-top: 5px solid var(--green);
}

.theme-docker .comparison-right {
  border-top-color: var(--ship);
}

.theme-docker .terminal-window {
  border-color: transparent;
  border-radius: 14px;
  background: #0a1e3f;
  box-shadow: 0 16px 40px rgba(11, 33, 74, 0.3);
}

.theme-docker .terminal-header {
  background: #12305f;
}

.theme-docker .terminal-prompt {
  color: #9fd4ff;
}

.theme-docker .terminal-user {
  color: var(--ship);
}

.theme-docker .terminal-output {
  color: #b9d3ea;
}

.theme-docker .terminal-output::before {
  color: var(--ship);
}

.theme-docker .terminal-cursor {
  color: #9fd4ff;
}

/* Visual panels need a light background in the docker theme */
.theme-docker .visual-panel {
  background: #fff;
  border-color: rgba(36, 150, 237, 0.25);
}

.theme-docker .data-visual-item {
  background: #f4f9fe;
}

.theme-docker .data-visual-core {
  background: rgba(36, 150, 237, 0.1);
}

.theme-docker .pi-board-large {
  background: #123d2c;
}

.theme-docker .summary-slide {
  background: linear-gradient(135deg, rgba(36, 150, 237, 0.14), transparent 55%), #fbfdff;
}

.theme-docker .summary-inner h1 {
  color: var(--navy);
}

.theme-docker .summary-core {
  border-color: #2496ed;
  background: rgba(36, 150, 237, 0.1);
  color: #2496ed;
}

/* ============================================================
   MOBILE
   ============================================================ */

.sidebar-overlay {
  display: none;
}

@media (max-width: 1100px) {
  .concept-layout,
  .architecture-layout,
  .process-layout,
  .threat-layout {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .concept-layout {
    grid-template-columns: 1fr;
  }

  .process-layout,
  .architecture-layout,
  .threat-layout {
    gap: 10px;
  }

  .concept-layout .visual-panel,
  .process-layout .visual-panel,
  .architecture-layout .visual-panel,
  .threat-layout .visual-panel {
    min-height: 190px;
  }

  .comparison-layout,
  .scenario-layout {
    grid-template-rows: minmax(0, 1fr) 130px;
  }

  .technical-right {
    grid-template-rows: minmax(0, 1fr) 130px;
  }

  .command-bottom {
    grid-template-columns: 1fr 260px;
  }
}

@media (max-width: 900px) {
  .viewer-body {
    display: block;
    position: relative;
    overflow: hidden;
  }

  .sidebar {
    position: fixed;
    top: 68px;
    bottom: 0;
    left: 0;
    width: min(320px, 88vw);
    min-width: 0;
    height: calc(100vh - 68px);
    transform: translateX(-105%);
    transition: transform 0.25s ease;
    z-index: 30;
    box-shadow: 20px 0 50px rgba(0, 0, 0, 0.35);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar.collapsed {
    width: min(320px, 88vw);
    min-width: 0;
  }

  .sidebar.collapsed .sidebar-label,
  .sidebar.collapsed .sidebar-course,
  .sidebar.collapsed .sidebar-collapse-btn,
  .sidebar.collapsed .lesson-item-content,
  .sidebar.collapsed .lesson-item > .q-icon {
    display: block;
  }

  .sidebar.collapsed .sidebar-header {
    padding: 24px 20px 18px;
    text-align: left;
  }

  .sidebar.collapsed .lesson-list {
    padding: 10px;
  }

  .sidebar.collapsed .lesson-item {
    justify-content: flex-start;
    padding: 12px;
  }

  .sidebar.collapsed .lesson-number {
    width: 32px;
    height: 32px;
  }

  .sidebar-collapse-btn {
    display: none !important;
  }

  .topbar {
    grid-template-columns: 1fr auto;
  }

  .topbar-center {
    display: none;
  }

  .sidebar-overlay {
    display: block;
    position: fixed;
    inset: 68px 0 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 10;
  }

  .presentation-area {
    padding: 10px;
  }

  .slide {
    border-radius: 13px;
  }

  .controls {
    grid-template-columns: 100px 1fr 100px;
    gap: 8px;
  }

  .control-label {
    display: none;
  }

  .cards-layout,
  .comparison-layout,
  .scenario-layout,
  .command-layout {
    overflow-y: auto;
  }

  .cards-layout {
    grid-template-columns: 1fr;
  }

  .cards-layout .visual-panel {
    min-height: 180px;
  }

  .comparison-grid,
  .scenario-grid {
    grid-template-columns: 1fr;
    gap: 8px;
    overflow-y: auto;
  }

  .comparison-divider,
  .scenario-arrow {
    display: none;
  }

  .comparison-layout,
  .scenario-layout {
    grid-template-rows: 1fr;
  }

  .comparison-layout > .visual-panel,
  .scenario-layout > .visual-panel {
    min-height: 180px;
  }

  .process-track {
    grid-template-columns: 1fr 1fr;
    overflow-y: auto;
  }

  .step-line {
    display: none;
  }

  .triad-layout {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .triad-visual {
    min-height: 230px;
  }

  .summary-visual {
    opacity: 0.25;
    right: -90px;
  }

  .hero-visual {
    opacity: 0.35;
    width: 48%;
  }
}

@media (max-width: 600px) {
  .course-info {
    display: none;
  }

  .content-slide {
    padding: 7%;
  }

  .cards-grid,
  .threat-grid {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .hero-content h1,
  .summary-inner h1 {
    font-size: 38px;
  }

  .hero-content p {
    font-size: 14px;
  }

  .hero-visual {
    display: none;
  }

  .process-track {
    grid-template-columns: 1fr;
  }

  .technical-layout {
    grid-template-columns: 1fr;
    overflow-y: auto;
  }

  .technical-right {
    grid-template-rows: auto 150px;
  }

  .command-bottom {
    grid-template-columns: 1fr;
  }

  .command-bottom .visual-panel {
    min-height: 150px;
  }

  .pi-architecture {
    grid-template-columns: 1fr;
  }

  .pi-service-stack {
    grid-template-columns: repeat(2, 1fr);
  }

  .linux-controls {
    grid-template-columns: repeat(3, 1fr);
  }

  .docker-network-map {
    grid-template-columns: 1fr;
  }

  .docker-network-line {
    transform: rotate(90deg);
  }

  .docker-network-branch {
    grid-column: auto;
  }

  .volume-diagram {
    flex-direction: column;
  }

  .compose-file {
    grid-template-columns: 1fr;
  }

  .docker-build-flow {
    flex-wrap: wrap;
  }

  .build-step {
    width: 80px;
  }

  .build-arrow {
    display: none;
  }

  .docker-security-controls {
    grid-template-columns: repeat(2, 1fr);
  }

  .triad-visual {
    min-height: 200px;
  }

  .triad-orbit {
    transform: scale(0.7);
  }

  .triad-corner strong {
    font-size: 6px;
  }

  .summary-visual {
    display: none;
  }

  .summary-slide {
    padding: 7%;
  }
}

/* ============================================================
   MOTION
   ============================================================ */

@keyframes radar-sweep {
  to {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .radar-sweep,
  .terminal-cursor {
    animation: none;
  }
}

/* ============================================================
   RED / BLUE TEAM â€” PATCH 2B VISUAL SYSTEM
   Specialized visualization styling
   ============================================================ */

/* ------------------------------------------------------------
   SHARED DIAGRAM FOUNDATION
   ------------------------------------------------------------ */

.rb-recon-map,
.rb-vuln-flow,
.rb-attack-stage,
.rb-roe-board,
.rb-workflow-board,
.rb-surface-board {
  position: relative;
  width: 100%;
  min-height: 330px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 22px;
  background:
    radial-gradient(circle at 50% 45%, rgba(16, 185, 129, 0.08), transparent 42%),
    linear-gradient(145deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.98));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.04),
    0 20px 50px rgba(2, 6, 23, 0.25);
}

.rb-recon-map::before,
.rb-vuln-flow::before,
.rb-attack-stage::before,
.rb-roe-board::before,
.rb-workflow-board::before,
.rb-surface-board::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.045) 1px, transparent 1px);
  background-size: 32px 32px;
  mask-image: linear-gradient(to bottom, black, transparent 95%);
}

/* ------------------------------------------------------------
   RECONNAISSANCE MAP
   ------------------------------------------------------------ */

.rb-recon-grid {
  position: absolute;
  inset: 34px;
  border: 1px dashed rgba(52, 211, 153, 0.22);
  border-radius: 18px;
}

.rb-recon-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 104px;
  height: 104px;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  border: 2px solid rgba(52, 211, 153, 0.55);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(52, 211, 153, 0.18), rgba(15, 23, 42, 0.96) 68%);
  box-shadow:
    0 0 35px rgba(16, 185, 129, 0.18),
    inset 0 0 30px rgba(16, 185, 129, 0.08);
  z-index: 3;
}

.rb-recon-core .material-icons {
  font-size: 34px;
  color: #34d399;
}

.rb-recon-core strong {
  position: absolute;
  bottom: -30px;
  font-size: 10px;
  letter-spacing: 0.14em;
  color: #d1fae5;
  white-space: nowrap;
}

.rb-recon-node {
  position: absolute;
  z-index: 4;
  min-width: 105px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.94);
  box-shadow: 0 12px 25px rgba(2, 6, 23, 0.35);
}

.rb-recon-node .material-icons {
  font-size: 22px;
  color: #34d399;
}

.rb-recon-node strong {
  font-size: 11px;
  color: #f8fafc;
  letter-spacing: 0.04em;
}

.rb-recon-node small {
  color: #94a3b8;
  font-size: 9px;
}

.rb-recon-node:nth-child(1) {
  left: 7%;
  top: 18%;
}

.rb-recon-node:nth-child(2) {
  right: 7%;
  top: 18%;
}

.rb-recon-node:nth-child(3) {
  left: 7%;
  bottom: 15%;
}

.rb-recon-node:nth-child(4) {
  right: 7%;
  bottom: 15%;
}

.rb-recon-connector {
  position: absolute;
  z-index: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.55), transparent);
  transform-origin: left center;
}

.rb-recon-connector:nth-of-type(1) {
  width: 34%;
  left: 18%;
  top: 31%;
  transform: rotate(17deg);
}

.rb-recon-connector:nth-of-type(2) {
  width: 34%;
  left: 50%;
  top: 31%;
  transform: rotate(-17deg);
}

.rb-recon-connector:nth-of-type(3) {
  width: 34%;
  left: 18%;
  top: 68%;
  transform: rotate(-17deg);
}

.rb-recon-connector:nth-of-type(4) {
  width: 34%;
  left: 50%;
  top: 68%;
  transform: rotate(17deg);
}

.rb-recon-legend {
  position: absolute;
  left: 22px;
  bottom: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  border: 1px solid rgba(148, 163, 184, 0.12);
  border-radius: 999px;
  background: rgba(2, 6, 23, 0.72);
  color: #94a3b8;
  font-size: 9px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

/* ------------------------------------------------------------
   VULNERABILITY ASSESSMENT
   ------------------------------------------------------------ */

.rb-vuln-stage {
  position: absolute;
  inset: 55px 28px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 26px;
}

.rb-vuln-stage::before,
.rb-vuln-stage::after {
  content: 'â€º';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #34d399;
  font-size: 32px;
  font-weight: 300;
  opacity: 0.7;
}

.rb-vuln-stage::before {
  left: 31.5%;
}

.rb-vuln-stage::after {
  right: 31.5%;
}

.rb-vuln-card,
.rb-risk-card {
  position: relative;
  min-height: 180px;
  padding: 22px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  text-align: center;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.88);
  box-shadow: 0 15px 35px rgba(2, 6, 23, 0.32);
}

.rb-vuln-card .material-icons,
.rb-risk-card .material-icons {
  font-size: 34px;
  color: #34d399;
}

.rb-vuln-card strong,
.rb-risk-card strong {
  color: #f8fafc;
  font-size: 13px;
}

.rb-vuln-card small,
.rb-risk-card small {
  color: #94a3b8;
  font-size: 10px;
  line-height: 1.5;
}

.rb-risk-board {
  position: absolute;
  inset: 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  align-content: center;
}

.rb-risk-board::after {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px dashed rgba(52, 211, 153, 0.35);
  border-radius: 50%;
  pointer-events: none;
}

.rb-risk-card {
  min-height: 105px;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  padding: 14px 16px;
}

.rb-risk-card .material-icons {
  font-size: 26px;
}

.rb-risk-critical {
  border-color: rgba(248, 113, 113, 0.38);
}

.rb-risk-critical .material-icons {
  color: #fb7185;
}

.rb-risk-high {
  border-color: rgba(251, 146, 60, 0.35);
}

.rb-risk-high .material-icons {
  color: #fb923c;
}

.rb-risk-medium .material-icons {
  color: #facc15;
}

.rb-risk-low .material-icons {
  color: #60a5fa;
}

/* ------------------------------------------------------------
   ATTACK SIMULATION
   ------------------------------------------------------------ */

.rb-attack-stage {
  padding: 48px 30px;
}

.rb-attack-lane {
  position: relative;
  height: 230px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.rb-attack-lane::before {
  content: '';
  position: absolute;
  left: 6%;
  right: 6%;
  top: 50%;
  height: 2px;
  transform: translateY(-50%);
  background: linear-gradient(
    90deg,
    rgba(248, 113, 113, 0.15),
    rgba(248, 113, 113, 0.7),
    rgba(52, 211, 153, 0.7),
    rgba(52, 211, 153, 0.15)
  );
}

.rb-attack-path {
  position: absolute;
  left: 7%;
  right: 7%;
  top: 50%;
  height: 8px;
  transform: translateY(-50%);
  border-top: 1px dashed rgba(255, 255, 255, 0.22);
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
}

.rb-attack-node {
  position: relative;
  z-index: 3;
  width: 118px;
  min-height: 120px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  text-align: center;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.96);
  box-shadow: 0 15px 35px rgba(2, 6, 23, 0.42);
}

.rb-attack-node .material-icons {
  font-size: 30px;
  color: #fb7185;
}

.rb-attack-node strong {
  color: #f8fafc;
  font-size: 11px;
}

.rb-attack-node small {
  color: #94a3b8;
  font-size: 9px;
  line-height: 1.35;
}

.rb-attack-recon .material-icons {
  color: #a78bfa;
}

.rb-attack-assess .material-icons {
  color: #facc15;
}

.rb-attack-simulate .material-icons {
  color: #fb7185;
}

.rb-attack-detect .material-icons {
  color: #38bdf8;
}

.rb-attack-target .material-icons {
  color: #34d399;
}

.rb-attack-target {
  border-color: rgba(52, 211, 153, 0.4);
}

/* ------------------------------------------------------------
   RULES OF ENGAGEMENT
   ------------------------------------------------------------ */

.rb-roe-board {
  padding: 28px;
  display: grid;
  grid-template-columns: 180px 1fr;
  align-items: center;
  gap: 30px;
}

.rb-roe-shield {
  position: relative;
  width: 145px;
  height: 165px;
  margin: auto;
  display: grid;
  place-items: center;
  clip-path: polygon(50% 0, 92% 16%, 86% 66%, 50% 100%, 14% 66%, 8% 16%);
  background: linear-gradient(145deg, rgba(52, 211, 153, 0.26), rgba(15, 23, 42, 0.95));
  border: 1px solid rgba(52, 211, 153, 0.45);
}

.rb-roe-shield .material-icons {
  font-size: 48px;
  color: #34d399;
}

.rb-roe-rules {
  display: grid;
  gap: 10px;
}

.rb-roe-rule {
  min-height: 56px;
  padding: 11px 14px;
  display: grid;
  grid-template-columns: 34px 1fr 28px;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 13px;
  background: rgba(15, 23, 42, 0.78);
}

.rb-roe-rule .material-icons {
  color: #34d399;
  font-size: 20px;
}

.rb-roe-rule strong {
  color: #e2e8f0;
  font-size: 11px;
}

.rb-roe-rule small {
  display: block;
  color: #64748b;
  font-size: 9px;
  margin-top: 2px;
}

.rb-roe-check {
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(52, 211, 153, 0.12);
  color: #34d399;
  font-size: 14px;
}

/* ------------------------------------------------------------
   RED TEAM WORKFLOW
   ------------------------------------------------------------ */

.rb-workflow-board {
  padding: 38px 26px;
}

.rb-workflow-line {
  position: absolute;
  left: 11%;
  right: 11%;
  top: 50%;
  height: 2px;
  transform: translateY(-50%);
  background: linear-gradient(
    90deg,
    rgba(167, 139, 250, 0.15),
    rgba(167, 139, 250, 0.7),
    rgba(248, 113, 113, 0.7),
    rgba(52, 211, 153, 0.7)
  );
}

.rb-workflow-nodes {
  position: relative;
  z-index: 2;
  min-height: 245px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.rb-workflow-node {
  width: 145px;
  min-height: 145px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  border: 1px solid rgba(148, 163, 184, 0.17);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 15px 30px rgba(2, 6, 23, 0.4);
}

.rb-workflow-node .material-icons {
  font-size: 31px;
  color: #a78bfa;
}

.rb-workflow-node strong {
  color: #f8fafc;
  font-size: 11px;
}

.rb-workflow-node small {
  color: #94a3b8;
  font-size: 9px;
  line-height: 1.4;
}

.rb-workflow-1 .material-icons {
  color: #a78bfa;
}

.rb-workflow-2 .material-icons {
  color: #38bdf8;
}

.rb-workflow-3 .material-icons {
  color: #fb7185;
}

.rb-workflow-4 .material-icons {
  color: #34d399;
}

.rb-workflow-footer {
  position: absolute;
  left: 26px;
  right: 26px;
  bottom: 16px;
  display: flex;
  justify-content: center;
  color: #64748b;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* ------------------------------------------------------------
   ATTACK SURFACE
   ------------------------------------------------------------ */

.rb-surface-board {
  min-height: 350px;
}

.rb-surface-core {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 4;
  width: 118px;
  height: 118px;
  transform: translate(-50%, -50%);
  display: grid;
  place-items: center;
  border: 2px solid rgba(248, 113, 113, 0.48);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(248, 113, 113, 0.2), rgba(15, 23, 42, 0.96) 70%);
  box-shadow: 0 0 42px rgba(248, 113, 113, 0.13);
}

.rb-surface-core .material-icons {
  font-size: 34px;
  color: #fb7185;
}

.rb-surface-core strong {
  position: absolute;
  bottom: -30px;
  white-space: nowrap;
  color: #fecdd3;
  font-size: 10px;
  letter-spacing: 0.12em;
}

.rb-surface-node {
  position: absolute;
  z-index: 3;
  width: 122px;
  min-height: 84px;
  padding: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  text-align: center;
  border: 1px solid rgba(248, 113, 113, 0.2);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.92);
}

.rb-surface-node .material-icons {
  font-size: 23px;
  color: #fb7185;
}

.rb-surface-node strong {
  color: #f8fafc;
  font-size: 10px;
}

.rb-surface-node small {
  color: #94a3b8;
  font-size: 8px;
}

.rb-surface-node:nth-child(1) {
  left: 7%;
  top: 18%;
}

.rb-surface-node:nth-child(2) {
  left: 7%;
  bottom: 14%;
}

.rb-surface-node:nth-child(3) {
  right: 7%;
  top: 18%;
}

.rb-surface-node:nth-child(4) {
  right: 7%;
  bottom: 14%;
}

.rb-surface-link {
  position: absolute;
  left: 20%;
  right: 20%;
  top: 50%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(248, 113, 113, 0.5), transparent);
}

/* ------------------------------------------------------------
   HOVER / MOTION
   ------------------------------------------------------------ */

.rb-recon-node,
.rb-vuln-card,
.rb-risk-card,
.rb-attack-node,
.rb-roe-rule,
.rb-workflow-node,
.rb-surface-node {
  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.rb-recon-node:hover,
.rb-vuln-card:hover,
.rb-risk-card:hover,
.rb-attack-node:hover,
.rb-roe-rule:hover,
.rb-workflow-node:hover,
.rb-surface-node:hover {
  transform: translateY(-4px);
  border-color: rgba(52, 211, 153, 0.42);
  box-shadow:
    0 18px 38px rgba(2, 6, 23, 0.46),
    0 0 24px rgba(16, 185, 129, 0.08);
}

.rb-recon-core {
  animation: rb-core-pulse 3.2s ease-in-out infinite;
}

@keyframes rb-core-pulse {
  0%,
  100% {
    box-shadow:
      0 0 35px rgba(16, 185, 129, 0.18),
      inset 0 0 30px rgba(16, 185, 129, 0.08);
  }

  50% {
    box-shadow:
      0 0 55px rgba(16, 185, 129, 0.3),
      inset 0 0 36px rgba(16, 185, 129, 0.14);
  }
}

/* ------------------------------------------------------------
   RESPONSIVE
   ------------------------------------------------------------ */

@media (max-width: 900px) {
  .rb-recon-map,
  .rb-vuln-flow,
  .rb-attack-stage,
  .rb-roe-board,
  .rb-workflow-board,
  .rb-surface-board {
    min-height: 300px;
  }

  .rb-recon-node,
  .rb-surface-node {
    transform: scale(0.9);
  }

  .rb-vuln-stage {
    gap: 12px;
    inset-inline: 16px;
  }

  .rb-attack-lane {
    gap: 6px;
  }

  .rb-attack-node {
    width: 95px;
    min-height: 105px;
    padding: 10px 7px;
  }

  .rb-workflow-node {
    width: 115px;
    min-height: 125px;
  }
}

@media (max-width: 650px) {
  .rb-recon-map,
  .rb-vuln-flow,
  .rb-attack-stage,
  .rb-roe-board,
  .rb-workflow-board,
  .rb-surface-board {
    min-height: 430px;
  }

  .rb-recon-grid {
    inset: 24px 14px;
  }

  .rb-recon-node {
    min-width: 90px;
    padding: 8px;
  }

  .rb-recon-node:nth-child(1) {
    left: 3%;
    top: 12%;
  }

  .rb-recon-node:nth-child(2) {
    right: 3%;
    top: 12%;
  }

  .rb-recon-node:nth-child(3) {
    left: 3%;
    bottom: 11%;
  }

  .rb-recon-node:nth-child(4) {
    right: 3%;
    bottom: 11%;
  }

  .rb-vuln-stage {
    inset: 24px 16px;
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .rb-vuln-card {
    min-height: 105px;
  }

  .rb-vuln-stage::before,
  .rb-vuln-stage::after {
    display: none;
  }

  .rb-risk-board {
    inset: 20px;
  }

  .rb-risk-card {
    min-height: 95px;
  }

  .rb-attack-stage {
    padding: 24px 12px;
  }

  .rb-attack-lane {
    height: auto;
    min-height: 380px;
    flex-direction: column;
    justify-content: space-between;
  }

  .rb-attack-lane::before,
  .rb-attack-path {
    left: 50%;
    right: auto;
    top: 5%;
    bottom: 5%;
    width: 2px;
    height: auto;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      rgba(248, 113, 113, 0.2),
      rgba(248, 113, 113, 0.65),
      rgba(52, 211, 153, 0.65)
    );
  }

  .rb-attack-node {
    width: 150px;
    min-height: 72px;
    flex-direction: row;
  }

  .rb-roe-board {
    grid-template-columns: 1fr;
    padding: 22px 16px;
  }

  .rb-roe-shield {
    width: 100px;
    height: 112px;
  }

  .rb-roe-shield .material-icons {
    font-size: 35px;
  }

  .rb-workflow-board {
    padding: 24px 16px;
  }

  .rb-workflow-nodes {
    min-height: 380px;
    flex-direction: column;
  }

  .rb-workflow-line {
    left: 50%;
    right: auto;
    top: 8%;
    bottom: 8%;
    width: 2px;
    height: auto;
    transform: translateX(-50%);
  }

  .rb-workflow-node {
    width: 155px;
    min-height: 76px;
    flex-direction: row;
    padding: 10px 14px;
  }

  .rb-workflow-footer {
    display: none;
  }

  .rb-surface-node {
    width: 102px;
    min-height: 72px;
  }

  .rb-surface-core {
    width: 96px;
    height: 96px;
  }

  .rb-surface-core .material-icons {
    font-size: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rb-recon-core,
  .rb-recon-node,
  .rb-vuln-card,
  .rb-risk-card,
  .rb-attack-node,
  .rb-roe-rule,
  .rb-workflow-node,
  .rb-surface-node {
    animation: none !important;
    transition: none !important;
  }
}

/* ============================================================
   END RED / BLUE TEAM â€” PATCH 2B
   ============================================================ */

/* ==========================================================
   RED / BLUE VISUAL CLEANUP
   Presentation-first overrides
   ========================================================== */

.redblue-visual {
  width: 100%;
  min-height: 360px;
  padding: 24px;
  border-radius: 20px;
  overflow: hidden;
}

.redblue-visual .visual-caption {
  margin-bottom: 22px;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  line-height: 1.3;
  text-transform: uppercase;
}

.redblue-visual .material-icons {
  line-height: 1;
}

.rb-overview-stage,
.rb-versus-stage,
.rb-purple-stage {
  min-height: 230px;
  align-items: center;
}

.rb-team-card,
.rb-center-core {
  min-height: 150px;
  padding: 22px;
  border-radius: 18px;
}

.rb-team-label {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
}

.rb-team-card strong,
.rb-center-core strong {
  font-size: 1.05rem;
  letter-spacing: 0.06em;
}

.rb-team-card small,
.rb-center-core small {
  margin-top: 7px;
  line-height: 1.4;
}

.rb-overview-points {
  gap: 12px;
  margin-top: 20px;
}

.rb-overview-point {
  min-height: 74px;
  padding: 14px 16px;
  border-radius: 14px;
  gap: 13px;
}

.rb-overview-point strong {
  font-size: 0.82rem;
  letter-spacing: 0.06em;
}

.rb-overview-point small {
  margin-top: 4px;
  line-height: 1.35;
}

/* ----------------------------------------------------------
   RED TEAM MAPS
   ---------------------------------------------------------- */

.rb-recon-map,
.rb-vuln-flow,
.rb-attack-stage,
.rb-roe-board,
.rb-workflow-board {
  min-height: 280px;
  border-radius: 18px;
}

.rb-recon-node,
.rb-vuln-stage,
.rb-attack-node,
.rb-roe-rule,
.rb-workflow-node {
  border-radius: 14px;
}

.rb-recon-node strong,
.rb-vuln-stage strong,
.rb-attack-node strong,
.rb-roe-rule strong,
.rb-workflow-node strong {
  font-size: 0.78rem;
  letter-spacing: 0.06em;
}

.rb-recon-node small,
.rb-vuln-stage small,
.rb-attack-node small,
.rb-roe-rule small,
.rb-workflow-node small {
  line-height: 1.35;
}

/* Keep diagrams readable without making arrows dominant. */

.rb-vuln-arrow,
.rb-attack-arrow,
.rb-pipeline-arrow,
.rb-flow-arrow,
.rb-scenario-arrow {
  font-size: 0.9rem;
  font-weight: 700;
  opacity: 0.6;
}

/* ----------------------------------------------------------
   SOC / BLUE TEAM
   ---------------------------------------------------------- */

.rb-soc-dashboard {
  border-radius: 18px;
  overflow: hidden;
}

.rb-soc-header {
  min-height: 52px;
  padding: 12px 16px;
}

.rb-soc-metrics {
  gap: 10px;
  padding: 14px;
}

.rb-soc-metric {
  min-height: 82px;
  padding: 14px;
  border-radius: 14px;
}

.rb-soc-metric strong {
  font-size: 1.15rem;
}

.rb-soc-metric small {
  letter-spacing: 0.1em;
}

.rb-log-stream {
  padding: 14px;
  gap: 7px;
}

.rb-log-line {
  min-height: 34px;
  padding: 7px 10px;
  border-radius: 8px;
}

.rb-log-line code {
  font-size: 0.7rem;
}

.rb-defense-pipeline {
  gap: 10px;
  margin-top: 18px;
}

.rb-defense-step {
  min-height: 88px;
  padding: 14px;
  border-radius: 14px;
}

.rb-defense-step strong {
  font-size: 0.76rem;
  letter-spacing: 0.05em;
}

.rb-defense-step small {
  line-height: 1.35;
}

/* ----------------------------------------------------------
   RED VS BLUE
   ---------------------------------------------------------- */

.rb-versus-side {
  min-height: 180px;
  padding: 24px;
  border-radius: 18px;
}

.rb-versus-side > span:not(.material-icons) {
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.rb-versus-side strong {
  font-size: 1.15rem;
  letter-spacing: 0.06em;
}

.rb-versus-side small {
  margin-top: 7px;
  line-height: 1.4;
}

.rb-versus-emblem {
  width: 62px;
  height: 62px;
  font-size: 1rem;
  font-weight: 900;
}

/* ----------------------------------------------------------
   PURPLE TEAM
   ---------------------------------------------------------- */

.rb-purple-team {
  min-width: 150px;
  min-height: 130px;
  padding: 20px;
  border-radius: 18px;
}

.rb-purple-team strong {
  font-size: 0.9rem;
  letter-spacing: 0.07em;
}

.rb-purple-team small {
  margin-top: 6px;
}

.rb-loop-core {
  min-width: 120px;
  min-height: 120px;
  padding: 18px;
  border-radius: 50%;
}

.rb-loop-core strong {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}

/* ----------------------------------------------------------
   ATTACK / DETECTION / RESPONSE
   ---------------------------------------------------------- */

.rb-flow-card {
  min-height: 190px;
  padding: 22px;
  border-radius: 18px;
}

.rb-flow-card strong {
  font-size: 0.92rem;
  letter-spacing: 0.06em;
}

.rb-flow-card small {
  max-width: 180px;
  line-height: 1.45;
}

/* ----------------------------------------------------------
   SCENARIO
   ---------------------------------------------------------- */

.rb-scenario-column {
  min-height: 190px;
  padding: 22px;
  border-radius: 18px;
}

.rb-scenario-heading strong {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
}

.rb-scenario-event {
  margin-top: 18px;
}

.rb-scenario-event strong {
  font-size: 0.95rem;
  line-height: 1.35;
}

.rb-scenario-alert {
  width: 82px;
  height: 82px;
  border-radius: 50%;
}

/* ----------------------------------------------------------
   SUMMARY
   ---------------------------------------------------------- */

.rb-summary-cycle {
  min-height: 220px;
  align-items: center;
}

.rb-summary-node {
  min-width: 130px;
  min-height: 130px;
  padding: 20px;
  border-radius: 18px;
}

.rb-summary-node strong {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
}

.rb-summary-node small {
  margin-top: 6px;
}

.rb-summary-message {
  margin-top: 20px;
  line-height: 1.5;
}

/* ----------------------------------------------------------
   RESPONSIVE PRESENTATION MODE
   ---------------------------------------------------------- */

@media (max-width: 900px) {
  .redblue-visual {
    padding: 18px;
  }

  .rb-team-card,
  .rb-center-core,
  .rb-versus-side {
    min-height: 130px;
    padding: 17px;
  }

  .rb-overview-stage,
  .rb-versus-stage,
  .rb-purple-stage {
    gap: 14px;
  }

  .rb-flow-card,
  .rb-scenario-column {
    min-height: 160px;
    padding: 17px;
  }
}

@media (max-width: 640px) {
  .redblue-visual {
    padding: 14px;
    border-radius: 16px;
  }

  .redblue-visual .visual-caption {
    margin-bottom: 16px;
  }

  .rb-overview-point {
    min-height: 64px;
  }

  .rb-flow-card,
  .rb-scenario-column,
  .rb-versus-side {
    min-height: 140px;
  }
}

/* ==========================================================
   RED / BLUE VISUAL CONTAINMENT FIX
   Prevent visual elements from overflowing their containers
   ========================================================== */

.redblue-visual,
.redblue-visual *,
.rb-overview-stage,
.rb-recon-map,
.rb-vuln-flow,
.rb-attack-stage,
.rb-roe-board,
.rb-workflow-board,
.rb-soc-dashboard,
.rb-versus-stage,
.rb-purple-stage,
.rb-flow-stage,
.rb-scenario-stage,
.rb-summary-cycle {
  box-sizing: border-box;
}

.redblue-visual {
  max-width: 100%;
  overflow: hidden;
}

.redblue-visual img,
.redblue-visual svg,
.redblue-visual canvas,
.redblue-visual video {
  display: block;
  max-width: 100%;
  height: auto;
}

.rb-recon-map,
.rb-vuln-flow,
.rb-attack-stage,
.rb-roe-board,
.rb-workflow-board,
.rb-soc-dashboard,
.rb-versus-stage,
.rb-purple-stage,
.rb-flow-stage,
.rb-scenario-stage,
.rb-summary-cycle {
  width: 100%;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
}

.rb-overview-stage,
.rb-overview-points,
.rb-operation-strip,
.rb-defense-pipeline,
.rb-soc-metrics,
.rb-log-stream,
.rb-versus-stage,
.rb-purple-stage,
.rb-flow-stage,
.rb-scenario-stage,
.rb-summary-cycle {
  max-width: 100%;
  min-width: 0;
}

.rb-team-card,
.rb-center-core,
.rb-overview-point,
.rb-recon-node,
.rb-vuln-stage,
.rb-attack-node,
.rb-roe-rule,
.rb-workflow-node,
.rb-soc-metric,
.rb-log-line,
.rb-defense-step,
.rb-versus-side,
.rb-purple-team,
.rb-loop-core,
.rb-flow-card,
.rb-scenario-column,
.rb-summary-node {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}

.rb-team-card strong,
.rb-team-card small,
.rb-center-core strong,
.rb-center-core small,
.rb-overview-point strong,
.rb-overview-point small,
.rb-recon-node strong,
.rb-recon-node small,
.rb-vuln-stage strong,
.rb-vuln-stage small,
.rb-attack-node strong,
.rb-attack-node small,
.rb-roe-rule strong,
.rb-roe-rule small,
.rb-workflow-node strong,
.rb-workflow-node small,
.rb-defense-step strong,
.rb-defense-step small,
.rb-versus-side strong,
.rb-versus-side small,
.rb-purple-team strong,
.rb-purple-team small,
.rb-flow-card strong,
.rb-flow-card small,
.rb-scenario-event strong,
.rb-scenario-event span,
.rb-summary-node strong,
.rb-summary-node small {
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: normal;
}

.rb-recon-map > *,
.rb-vuln-flow > *,
.rb-attack-stage > *,
.rb-roe-board > *,
.rb-workflow-board > *,
.rb-soc-dashboard > *,
.rb-versus-stage > *,
.rb-purple-stage > *,
.rb-flow-stage > *,
.rb-scenario-stage > *,
.rb-summary-cycle > * {
  max-width: 100%;
  min-width: 0;
}

/* Keep decorative lines and connectors inside the visual area. */

.rb-recon-connector,
.rb-workflow-line,
.rb-versus-line,
.rb-loop-arrow,
.rb-vuln-arrow,
.rb-attack-arrow,
.rb-pipeline-arrow,
.rb-flow-arrow,
.rb-scenario-arrow,
.rb-summary-connector {
  max-width: 100%;
  overflow: hidden;
}

/* Smaller screens need containment more than fixed sizing. */

@media (max-width: 900px) {
  .redblue-visual {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  .rb-team-card,
  .rb-center-core,
  .rb-versus-side,
  .rb-purple-team,
  .rb-flow-card,
  .rb-scenario-column,
  .rb-summary-node {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .redblue-visual {
    padding-left: 12px;
    padding-right: 12px;
  }

  .rb-recon-map,
  .rb-vuln-flow,
  .rb-attack-stage,
  .rb-roe-board,
  .rb-workflow-board,
  .rb-soc-dashboard,
  .rb-versus-stage,
  .rb-purple-stage,
  .rb-flow-stage,
  .rb-scenario-stage,
  .rb-summary-cycle {
    overflow-x: hidden;
    overflow-y: visible;
  }
}

/* RED BLUE IMAGE AND SVG CONTAINMENT */

.redblue-visual img,
.redblue-visual svg,
.redblue-visual canvas,
.redblue-visual video {
  display: block;
  max-width: 100%;
  height: auto;
}

.redblue-visual {
  max-width: 100%;
  overflow: hidden;
}

.redblue-visual *,
.rb-recon-map,
.rb-vuln-flow,
.rb-attack-stage,
.rb-roe-board,
.rb-workflow-board,
.rb-soc-dashboard,
.rb-versus-stage,
.rb-purple-stage,
.rb-flow-stage,
.rb-scenario-stage,
.rb-summary-cycle {
  box-sizing: border-box;
}

.rb-recon-map,
.rb-vuln-flow,
.rb-attack-stage,
.rb-roe-board,
.rb-workflow-board,
.rb-soc-dashboard,
.rb-versus-stage,
.rb-purple-stage,
.rb-flow-stage,
.rb-scenario-stage,
.rb-summary-cycle {
  max-width: 100%;
  min-width: 0;
}

/* ============================================================
   RED / BLUE — FINAL VISUAL POLISH & FIT
   Cohesive design for all redblue diagrams
   ============================================================ */

.theme-redblue .visual-panel.redblue-visual {
  width: 100%;
  max-width: 100%;
  min-height: 320px;
  padding: 20px;
  border-radius: 18px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 40%, rgba(239, 68, 68, 0.07), transparent 42%),
    radial-gradient(circle at 82% 40%, rgba(59, 130, 246, 0.07), transparent 42%),
    rgba(8, 10, 16, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.07);
}

.theme-redblue .visual-panel.redblue-visual.compact {
  min-height: 240px;
  padding: 14px;
}

.theme-redblue .redblue-visual .visual-caption {
  margin-bottom: 16px;
  color: #94a3b8;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

/* Recon map */
.theme-redblue .rb-recon-map {
  position: relative;
  min-height: 280px;
  border-radius: 16px;
  overflow: hidden;
}

.theme-redblue .rb-recon-core {
  width: 96px;
  height: 96px;
}

.theme-redblue .rb-recon-node {
  min-width: 100px;
  max-width: 130px;
  padding: 10px 8px;
  border-radius: 12px;
}

.theme-redblue .rb-recon-legend {
  left: 16px;
  bottom: 12px;
  gap: 12px;
  flex-wrap: wrap;
  max-width: calc(100% - 32px);
}

/* Vulnerability flow */
.theme-redblue .rb-vuln-flow {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 8px;
  min-height: 160px;
  margin-bottom: 12px;
}

.theme-redblue .rb-vuln-stage {
  flex: 1;
  min-width: 0;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.88);
}

.theme-redblue .rb-vuln-number {
  font-family: monospace;
  font-size: 0.7rem;
  color: #f87171;
}

.theme-redblue .rb-vuln-icon .material-icons {
  font-size: 26px;
  color: #f87171;
}

.theme-redblue .rb-vuln-stage strong {
  font-size: 0.78rem;
  color: #f8fafc;
}

.theme-redblue .rb-vuln-stage small {
  font-size: 0.68rem;
  color: #94a3b8;
  line-height: 1.35;
}

.theme-redblue .rb-vuln-arrow {
  display: none;
}

.theme-redblue .rb-risk-board {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(148, 163, 184, 0.12);
}

.theme-redblue .rb-risk-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #e2e8f0;
  font-size: 0.75rem;
}

.theme-redblue .rb-risk-bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.theme-redblue .rb-risk-row {
  display: grid;
  grid-template-columns: 56px 1fr 48px;
  align-items: center;
  gap: 8px;
  font-size: 0.68rem;
  color: #94a3b8;
}

.theme-redblue .rb-risk-row i {
  height: 6px;
  border-radius: 999px;
  display: block;
}

.theme-redblue .rb-risk-low {
  background: #60a5fa;
  width: 35%;
}
.theme-redblue .rb-risk-medium {
  background: #facc15;
  width: 60%;
}
.theme-redblue .rb-risk-high {
  background: #fb7185;
  width: 90%;
}

/* Attack simulation */
.theme-redblue .rb-attack-stage {
  min-height: 200px;
  padding: 20px 12px;
}

.theme-redblue .rb-attack-lane {
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.theme-redblue .rb-attack-node {
  width: auto;
  flex: 1;
  min-width: 0;
  max-width: 120px;
  min-height: 100px;
  padding: 12px 8px;
}

/* ROE */
.theme-redblue .rb-roe-board {
  grid-template-columns: 120px 1fr;
  gap: 16px;
  padding: 16px;
  min-height: 220px;
}

.theme-redblue .rb-roe-shield {
  width: 110px;
  height: 125px;
}

/* Workflow */
.theme-redblue .rb-workflow-board {
  min-height: 220px;
  padding: 24px 16px;
}

.theme-redblue .rb-workflow-nodes {
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.theme-redblue .rb-workflow-node {
  flex: 1;
  min-width: 0;
  max-width: 140px;
  min-height: 120px;
  padding: 12px;
}

/* SOC / Blue */
.theme-redblue .rb-soc-dashboard {
  min-height: 240px;
  border-radius: 14px;
}

.theme-redblue .rb-soc-metrics {
  grid-template-columns: repeat(3, 1fr);
}

.theme-redblue .rb-defense-pipeline {
  grid-template-columns: repeat(3, 1fr);
}

/* Versus / Purple / Flow / Scenario / Summary */
.theme-redblue .rb-versus-stage,
.theme-redblue .rb-purple-stage,
.theme-redblue .rb-flow-stage,
.theme-redblue .rb-scenario-stage {
  min-height: 200px;
}

.theme-redblue .rb-summary-cycle {
  min-height: 200px;
}

/* Mobile */
@media (max-width: 900px) {
  .theme-redblue .rb-vuln-flow {
    flex-wrap: wrap;
  }
  .theme-redblue .rb-vuln-stage {
    min-width: calc(50% - 8px);
  }
  .theme-redblue .rb-roe-board {
    grid-template-columns: 1fr;
  }
  .theme-redblue .rb-attack-lane,
  .theme-redblue .rb-workflow-nodes {
    flex-wrap: wrap;
    justify-content: center;
  }
  .theme-redblue .rb-attack-node,
  .theme-redblue .rb-workflow-node {
    max-width: 140px;
  }
}

@media (max-width: 640px) {
  .theme-redblue .visual-panel.redblue-visual {
    min-height: 260px;
    padding: 12px;
  }
  .theme-redblue .rb-recon-map {
    min-height: 320px;
  }
  .theme-redblue .rb-vuln-stage {
    min-width: 100%;
  }
}

/* ============================================================
   DOCKER FLOW VISUAL
   ============================================================ */

.docker-flow-visual {
  display: flex;
  flex-direction: column;
  min-height: 240px;
}

.docker-flow-stage {
  position: relative;
  flex: 1;
  min-height: 210px;
  display: grid;
  place-items: center;
}

.docker-flow-center {
  z-index: 2;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: 2px solid #2496ed;
  border-radius: 50%;
  background: rgba(36, 150, 237, 0.12);
  color: #0b6fc2;
  text-align: center;
  box-shadow: 0 0 28px rgba(36, 150, 237, 0.18);
}

.docker-flow-center .material-icons {
  font-size: 28px;
}

.docker-flow-center strong {
  font-size: 9px;
  letter-spacing: 0.06em;
  max-width: 100px;
  line-height: 1.25;
}

.docker-flow-node {
  position: absolute;
  min-width: 100px;
  max-width: 130px;
  padding: 10px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
  border: 1px solid rgba(36, 150, 237, 0.28);
  border-radius: 12px;
  background: #fff;
  color: #0b214a;
  box-shadow: 0 8px 20px rgba(11, 33, 74, 0.08);
}

.docker-flow-node .material-icons {
  font-size: 20px;
  color: #2496ed;
}

.docker-flow-node strong {
  font-size: 9px;
}

.docker-flow-node small {
  font-size: 7px;
  color: #4d6480;
  line-height: 1.3;
}

.docker-flow-node-1 {
  top: 8%;
  left: 4%;
}
.docker-flow-node-2 {
  top: 8%;
  right: 4%;
}
.docker-flow-node-3 {
  bottom: 10%;
  left: 4%;
}
.docker-flow-node-4 {
  bottom: 10%;
  right: 4%;
}
.docker-flow-node-5 {
  top: 42%;
  left: 0;
}
.docker-flow-node-6 {
  top: 42%;
  right: 0;
}

.theme-docker .docker-flow-center {
  background: rgba(36, 150, 237, 0.14);
}

@media (max-width: 700px) {
  .docker-flow-stage {
    min-height: 260px;
  }
  .docker-flow-node {
    min-width: 88px;
    max-width: 110px;
    padding: 8px 6px;
  }
  .docker-flow-center {
    width: 96px;
    height: 96px;
  }
}
</style>
