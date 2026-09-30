<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="drawerOpen = !drawerOpen" />

        <q-toolbar-title>
          <div class="text-weight-bold">Raspi Learning Hub</div>

          <div class="text-caption">IT Learning & Server Platform</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>

          <q-item-section> Dashboard </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header> Learning Modules </q-item-label>

        <q-item clickable v-ripple to="/cybersecurity">
          <q-item-section avatar>
            <q-icon name="security" />
          </q-item-section>

          <q-item-section> Cybersecurity </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/docker">
          <q-item-section avatar>
            <q-icon name="deployed_code" />
          </q-item-section>

          <q-item-section> Docker Commands </q-item-section>
        </q-item>

        <q-separator class="q-my-md" />

        <q-item-label header> Server </q-item-label>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="dns" />
          </q-item-section>

          <q-item-section> Raspberry Pi Server </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const drawerOpen = ref(true)
</script>
