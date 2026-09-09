<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <div class="text-h4 q-mb-md">
        Raspi Web Server
      </div>

      <q-spinner v-if="loading" size="40px" />

      <div v-else>
        <div class="text-h6">
          Status:
          <span :class="status === 'online' ? 'text-positive' : 'text-negative'">
            {{ status }}
          </span>
        </div>

        <div class="text-body1 q-mt-sm">
          {{ message }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const status = ref('')
const message = ref('')
const loading = ref(true)

const getServerStatus = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/status/')

    if (!response.ok) {
      throw new Error('API request failed')
    }

    const data = await response.json()

    status.value = data.status
    message.value = data.message
  } catch (error) {
    status.value = 'offline'
    message.value = 'Unable to connect to Django API.'
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getServerStatus()
})
</script>