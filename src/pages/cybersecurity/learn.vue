<template>
  <LearningViewer :lessons="lessons" />
</template>

<script setup>
import LearningViewer from '../../components/learning/LearningViewer.vue'
import { cybersecurityLessons as lessons } from '../../data/cybersecurity.js'
</script>
