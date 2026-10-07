<template>
  <LearningViewer :lessons="lessons" />
</template>

<script setup>
import LearningViewer from '../components/learning/LearningViewer.vue'
import { redBlueLessons as lessons } from '../data/redblue.js'
</script>
