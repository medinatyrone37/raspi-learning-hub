<template>
  <q-page class="login-page">
    <div class="login-shell">
      <!-- LEFT: brand + terminal -->
      <section class="brand-panel" aria-hidden="true">
        <div class="brand">
          <div class="brand-icon"><q-icon name="school" size="24px" /></div>
          <div class="brand-name">Linux Cybersecurity Learning Hub</div>
        </div>

        <div class="brand-content">
          <h1>Pick up where you left off.</h1>
          <p>Your cybersecurity, Docker and Raspberry Pi lessons are waiting on the server.</p>

          <div class="terminal">
            <div class="terminal-bar">
              <i></i><i></i><i></i>
              <span>pi@learning-hub</span>
            </div>
            <div class="terminal-body">
              <div class="line"><b>$</b> ssh pi@learning-hub.local</div>
              <div class="line dim">pi@learning-hub's password: â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢</div>
              <div class="line ok">Welcome back to the Learning Hub.</div>
              <div class="line"><b>$</b> <span class="cursor"></span></div>
            </div>
          </div>
        </div>

        <div class="panel-footer">
          <span class="status-dot"></span>
          Learning Hub server is online
        </div>
      </section>

      <!-- RIGHT: form -->
      <section class="form-panel">
        <div class="form-container">
          <div class="mobile-brand">
            <div class="brand-icon"><q-icon name="school" size="22px" /></div>
            <div class="brand-name">Linux Cybersecurity Learning Hub</div>
          </div>

          <header class="form-header">
            <h2>Sign in</h2>
            <p>Welcome back. Enter your details to continue learning.</p>
          </header>

          <q-form class="login-form" greedy @submit.prevent="handleLogin">
            <q-input
              v-model.trim="username"
              outlined
              label="Username"
              autocomplete="username"
              :disable="loading"
              lazy-rules
              :rules="[(v) => !!v || 'Enter your username']"
            >
              <template #prepend><q-icon name="person_outline" /></template>
            </q-input>

            <q-input
              v-model="password"
              outlined
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              :disable="loading"
              lazy-rules
              :rules="[(v) => !!v || 'Enter your password']"
            >
              <template #prepend><q-icon name="lock_outline" /></template>
              <template #append>
                <q-btn
                  flat
                  round
                  dense
                  :icon="showPassword ? 'visibility_off' : 'visibility'"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  :disable="loading"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>

            <div v-if="errorMessage" class="error-box" role="alert">
              <q-icon name="error_outline" size="20px" />
              <span>{{ errorMessage }}</span>
            </div>

            <q-btn
              class="login-button"
              type="submit"
              unelevated
              no-caps
              :loading="loading"
              label="Sign in"
            />

            <div class="register-link">
              <span>New to the Learning Hub?</span>
              <button type="button" :disabled="loading" @click="goToRegister">
                Create an account
              </button>
            </div>
          </q-form>

          <div class="form-footer">
            <q-icon name="verified_user" size="16px" />
            Accounts are securely managed by Django.
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { login } from '../services/auth'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true

  try {
    await login(username.value, password.value)

    const redirect = route.query.redirect

    if (redirect && typeof redirect === 'string') {
      await router.push(redirect)
    } else {
      await router.push('/')
    }
  } catch (error) {
    errorMessage.value = error.message || 'Unable to sign in.'
  } finally {
    loading.value = false
  }
}

function goToRegister() {
  router.push('/register')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.login-page {
  --ink: #0f1a17;
  --board: #123d30;
  --board-deep: #0a2a21;
  --mint: #7ee0b5;
  --berry: #b8123f;
  --berry-dark: #960e33;
  --paper: #f5f7f4;
  --muted: #55645f;
  --line: #d5ddd9;

  --q-primary: var(--berry);
  min-height: 100vh;
  background: var(--paper);
  font-family:
    'Instrument Sans',
    system-ui,
    -apple-system,
    'Segoe UI',
    sans-serif;
  color: var(--ink);
}

.login-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
}

/* ---------- Left panel ---------- */

.brand-panel {
  display: flex;
  flex-direction: column;
  padding: 40px clamp(32px, 6vw, 88px);
  color: #eef5f1;
  background:
    linear-gradient(rgba(126, 224, 181, 0.05) 1px, transparent 1px) 0 0 / 100% 32px,
    linear-gradient(90deg, rgba(126, 224, 181, 0.05) 1px, transparent 1px) 0 0 / 32px 100%,
    var(--board-deep);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: var(--board-deep);
  background: var(--mint);
}

.brand-name {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.brand-content {
  margin: auto 0;
  padding: 56px 0;
  max-width: 560px;
}

.brand-content h1 {
  margin: 0 0 16px;
  font-size: clamp(36px, 4.2vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.035em;
  font-weight: 700;
}

.brand-content > p {
  margin: 0 0 36px;
  max-width: 46ch;
  color: rgba(238, 245, 241, 0.72);
  font-size: 16px;
  line-height: 1.65;
}

.terminal {
  border: 1px solid rgba(126, 224, 181, 0.2);
  border-radius: 14px;
  overflow: hidden;
  background: rgba(5, 20, 15, 0.7);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  font-family: 'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace;
}

.terminal-bar {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px;
  border-bottom: 1px solid rgba(126, 224, 181, 0.12);
  background: rgba(255, 255, 255, 0.03);
}

.terminal-bar i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(238, 245, 241, 0.2);
}

.terminal-bar span {
  margin-left: 8px;
  color: rgba(238, 245, 241, 0.5);
  font-size: 12px;
}

.terminal-body {
  display: grid;
  gap: 12px;
  padding: 18px 20px 20px;
  font-size: 13.5px;
}

.line b {
  margin-right: 8px;
  color: var(--mint);
  font-weight: 500;
}

.line.dim {
  color: rgba(238, 245, 241, 0.55);
}

.line.ok {
  color: var(--mint);
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 15px;
  vertical-align: text-bottom;
  background: var(--mint);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.panel-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(238, 245, 241, 0.6);
  font-size: 13px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--mint);
  box-shadow: 0 0 0 4px rgba(126, 224, 181, 0.15);
}

/* ---------- Right panel ---------- */

.form-panel {
  display: grid;
  place-items: center;
  padding: 48px clamp(24px, 6vw, 88px);
}

.form-container {
  width: min(100%, 420px);
}

.form-header {
  margin-bottom: 30px;
}

.form-header h2 {
  margin: 0 0 8px;
  font-size: 34px;
  line-height: 1.1;
  letter-spacing: -0.03em;
  font-weight: 700;
}

.form-header p {
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.5;
}

.login-form {
  display: grid;
  gap: 18px;
}

.login-form :deep(.q-field__control) {
  min-height: 54px;
  border-radius: 10px;
  background: #fff;
}

.login-form :deep(.q-field--outlined .q-field__control:before) {
  border-color: var(--line);
}

.login-form :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: #9fb3ab;
}

.login-form :deep(.q-field--focused .q-field__control:after) {
  border-width: 2px;
  border-color: var(--berry);
}

.login-form :deep(.q-field__label),
.login-form :deep(.q-field__prepend),
.login-form :deep(.q-field__append),
.login-form :deep(.q-field__bottom) {
  color: var(--muted);
}

.login-form :deep(.q-field--error .q-field__bottom) {
  color: #b42318;
}

.login-button {
  width: 100%;
  min-height: 52px;
  margin-top: 2px;
  border-radius: 10px;
  color: #fff;
  background: var(--berry);
  font-size: 15px;
  font-weight: 600;
  transition: background 0.2s ease;
}

.login-button:hover {
  background: var(--berry-dark);
}

.error-box {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid #f4b8b0;
  border-radius: 10px;
  color: #912018;
  background: #fff4f2;
  font-size: 14px;
  line-height: 1.45;
}

.register-link {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  color: var(--muted);
  font-size: 14px;
}

.register-link button {
  padding: 0;
  border: 0;
  border-radius: 4px;
  color: var(--berry);
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.register-link button:hover {
  text-decoration: underline;
}

.register-link button:focus-visible,
.login-button:focus-visible {
  outline: 2px solid var(--berry);
  outline-offset: 3px;
}

.register-link button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.form-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 32px;
  color: var(--muted);
  font-size: 12.5px;
}

.mobile-brand {
  display: none;
}

/* ---------- Responsive ---------- */

@media (max-width: 950px) {
  .login-shell {
    grid-template-columns: 1fr;
  }

  .brand-panel {
    display: none;
  }

  .form-panel {
    place-items: start center;
    padding: 28px 22px 40px;
  }

  .mobile-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 40px;
  }

  .mobile-brand .brand-icon {
    color: #fff;
    background: var(--board);
  }
}

@media (max-width: 480px) {
  .form-panel {
    padding: 22px 18px 32px;
  }

  .form-header h2 {
    font-size: 29px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cursor {
    animation: none;
  }

  .login-button {
    transition: none;
  }
}
</style>
