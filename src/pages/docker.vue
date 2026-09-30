<template>
  <q-page class="docker-page">
    <div class="docker-container">
      <!-- HERO -->
      <section class="docker-hero">
        <div class="hero-badge">
          <q-icon name="fa-brands fa-docker" />
          DOCKER LEARNING MODULE
        </div>

        <h1>
          Build.
          <span>Deploy.</span>
          Manage.
        </h1>

        <p>
          Explore Docker through interactive lessons covering containers, images, networking,
          storage, commands, and deployment.
        </p>

        <div class="hero-stats">
          <div class="stat-card">
            <strong>{{ lessons.length }}</strong>
            <span>Topics</span>
          </div>

          <div class="stat-card">
            <strong>{{ totalSlides }}</strong>
            <span>Slides</span>
          </div>

          <div class="stat-card">
            <strong>Docker</strong>
            <span>Technology</span>
          </div>
        </div>
      </section>

      <!-- TOPICS -->
      <section class="topics-section">
        <div class="section-heading">
          <div>
            <div class="section-label">LEARNING TOPICS</div>

            <h2>Docker Fundamentals</h2>

            <p>Select a topic to open its presentation.</p>
          </div>
        </div>

        <div class="topic-grid">
          <q-card
            v-for="lesson in lessons"
            :key="lesson.id"
            class="topic-card"
            flat
            @click="openLesson(lesson.id)"
          >
            <q-card-section class="topic-card-top">
              <div class="topic-number">
                {{ String(lesson.id).padStart(2, '0') }}
              </div>

              <div class="topic-icon">
                <q-icon :name="lesson.icon || 'fa-brands fa-docker'" size="28px" />
              </div>
            </q-card-section>

            <q-card-section>
              <div class="topic-category">
                {{ lesson.category }}
              </div>

              <div class="topic-title">
                {{ lesson.title }}
              </div>

              <div class="topic-description">
                {{ lesson.subtitle }}
              </div>
            </q-card-section>

            <q-card-section class="topic-footer">
              <div class="slide-count">
                <q-icon name="slideshow" />
                {{ lesson.slides?.length || 0 }} slides
              </div>

              <q-btn
                flat
                round
                icon="arrow_forward"
                class="open-btn"
                @click.stop="openLesson(lesson.id)"
              />
            </q-card-section>
          </q-card>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { dockerLessons as lessons } from '../data/docker.js'

const router = useRouter()

const totalSlides = computed(() =>
  lessons.reduce((total, lesson) => {
    return total + (lesson.slides?.length || 0)
  }, 0),
)

function openLesson(lessonId) {
  router.push({
    path: '/docker-learning',
    query: {
      lesson: String(lessonId),
    },
  })
}
</script>

<style scoped>
.docker-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.12), transparent 30%),
    radial-gradient(circle at 90% 20%, rgba(52, 211, 153, 0.08), transparent 30%), #07110f;
  color: #f8fafc;
}

.docker-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 28px 80px;
}

/* HERO */

.docker-hero {
  position: relative;
  overflow: hidden;
  padding: 56px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(15, 23, 42, 0.88));
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
}

.docker-hero::after {
  content: '🐳';
  position: absolute;
  right: 70px;
  bottom: -25px;
  font-size: 180px;
  opacity: 0.06;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 8px 14px;
  border: 1px solid rgba(52, 211, 153, 0.25);
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.1);
  color: #34d399;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.docker-hero h1 {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 22px 0 12px;
  font-size: clamp(48px, 7vw, 86px);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: -4px;
}

.docker-hero h1 span {
  color: #34d399;
}

.docker-hero p {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0;
  color: #a7b8b3;
  font-size: 18px;
  line-height: 1.7;
}

/* STATS */

.hero-stats {
  display: flex;
  gap: 14px;
  margin-top: 38px;
}

.stat-card {
  min-width: 130px;
  padding: 15px 18px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
}

.stat-card strong {
  display: block;
  color: #f8fafc;
  font-size: 20px;
}

.stat-card span {
  display: block;
  margin-top: 3px;
  color: #84938f;
  font-size: 12px;
}

/* TOPICS */

.topics-section {
  padding-top: 70px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 28px;
}

.section-label {
  margin-bottom: 8px;
  color: #34d399;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.5px;
}

.section-heading h2 {
  margin: 0;
  color: #f8fafc;
  font-size: 34px;
  font-weight: 800;
}

.section-heading p {
  margin: 7px 0 0;
  color: #84938f;
}

/* GRID */

.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

/* CARD */

.topic-card {
  min-height: 285px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018));
  color: #f8fafc;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.topic-card:hover {
  transform: translateY(-7px);
  border-color: rgba(52, 211, 153, 0.4);
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25);
}

.topic-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0;
}

.topic-number {
  color: rgba(255, 255, 255, 0.25);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 1px;
}

.topic-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: rgba(16, 185, 129, 0.12);
  color: #34d399;
}

.topic-category {
  margin-bottom: 9px;
  color: #34d399;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.topic-title {
  margin-bottom: 10px;
  font-size: 23px;
  font-weight: 800;
  line-height: 1.15;
}

.topic-description {
  min-height: 54px;
  color: #94a3a0;
  font-size: 14px;
  line-height: 1.6;
}

.topic-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.slide-count {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #7d8b87;
  font-size: 12px;
}

.open-btn {
  color: #34d399;
  background: rgba(16, 185, 129, 0.08);
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .topic-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 700px) {
  .docker-container {
    padding: 20px 16px 50px;
  }

  .docker-hero {
    padding: 32px 24px;
  }

  .docker-hero h1 {
    font-size: 52px;
    letter-spacing: -2px;
  }

  .hero-stats {
    flex-wrap: wrap;
  }

  .topic-grid {
    grid-template-columns: 1fr;
  }
}
</style>
