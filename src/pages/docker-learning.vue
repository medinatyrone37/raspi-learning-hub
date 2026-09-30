<template>
  <LearningViewer :lessons="lessons" />
</template>

<script setup>
import LearningViewer from '../components/learning/LearningViewer.vue'
import { dockerLessons as lessons } from '../data/docker.js'
</script>
