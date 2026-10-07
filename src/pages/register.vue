<template>
  <q-page class="register-page">
    <div class="register-shell">
      <!-- LEFT: brand + terminal -->
      <section class="brand-panel" aria-hidden="true">
        <div class="brand">
          <div class="brand-icon"><q-icon name="school" size="24px" /></div>
          <div class="brand-name">Raspi Learning Hub</div>
        </div>

        <div class="brand-content">
          <h1>Learn by running real things.</h1>
          <p>
            Hands-on lessons in cybersecurity, Docker and Raspberry Pi, on a server you can actually
            log in to.
          </p>

          <div class="terminal">
            <div class="terminal-bar">
              <i></i><i></i><i></i>
              <span>pi@learning-hub</span>
            </div>
            <div class="terminal-body">
              <div class="line"><b>$</b> ls -l tracks/</div>
              <div class="track">
                <q-icon name="security" size="18px" />
                <span class="track-name">cybersecurity/</span>
                <span class="track-desc">security fundamentals</span>
              </div>
              <div class="track">
                <q-icon name="deployed_code" size="18px" />
                <span class="track-name">docker/</span>
                <span class="track-desc">containers and deployment</span>
              </div>
              <div class="track">
                <q-icon name="memory" size="18px" />
                <span class="track-name">raspberry-pi/</span>
                <span class="track-desc">run your own web server</span>
              </div>
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
            <div class="brand-name">Raspi Learning Hub</div>
          </div>

          <header class="form-header">
            <h2>Create your account</h2>
            <p>Free access to every lesson in the Learning Hub.</p>
          </header>

          <q-form class="register-form" greedy @submit.prevent="handleRegister">
            <q-input
              v-model.trim="username"
              outlined
              label="Username"
              autocomplete="username"
              :disable="loading"
              lazy-rules
              :rules="usernameRules"
            >
              <template #prepend><q-icon name="person_outline" /></template>
            </q-input>

            <q-input
              v-model.trim="email"
              outlined
              type="email"
              label="Email address"
              autocomplete="email"
              :disable="loading"
              lazy-rules
              :rules="emailRules"
            >
              <template #prepend><q-icon name="mail_outline" /></template>
            </q-input>

            <div>
              <q-input
                v-model="password"
                outlined
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                autocomplete="new-password"
                :disable="loading"
                lazy-rules
                :rules="passwordRules"
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

              <div v-if="password" class="strength" :data-level="strength.score">
                <div class="strength-bars">
                  <span v-for="n in 4" :key="n" :class="{ on: n <= strength.score }"></span>
                </div>
                <small>{{ strength.label }}</small>
              </div>
            </div>

            <q-input
              v-model="passwordConfirm"
              outlined
              :type="showPasswordConfirm ? 'text' : 'password'"
              label="Confirm password"
              autocomplete="new-password"
              :disable="loading"
              lazy-rules
              :rules="confirmRules"
            >
              <template #prepend><q-icon name="lock_reset" /></template>
              <template #append>
                <q-btn
                  flat
                  round
                  dense
                  :icon="showPasswordConfirm ? 'visibility_off' : 'visibility'"
                  :aria-label="showPasswordConfirm ? 'Hide password' : 'Show password'"
                  :disable="loading"
                  @click="showPasswordConfirm = !showPasswordConfirm"
                />
              </template>
            </q-input>

            <div v-if="errorMessage" class="error-box" role="alert">
              <q-icon name="error_outline" size="20px" />
              <span>{{ errorMessage }}</span>
            </div>

            <q-btn
              class="register-button"
              type="submit"
              unelevated
              no-caps
              :loading="loading"
              label="Create account"
            />

            <div class="login-link">
              <span>Already have an account?</span>
              <button type="button" :disabled="loading" @click="goToLogin">Sign in</button>
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/auth'

const router = useRouter()

const username = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const loading = ref(false)
const errorMessage = ref('')

const usernameRules = [
  (v) => !!v || 'Enter a username',
  (v) => v.length >= 3 || 'Username must be at least 3 characters',
]
const emailRules = [
  (v) => !!v || 'Enter your email address',
  (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address',
]
const passwordRules = [
  (v) => !!v || 'Enter a password',
  (v) => v.length >= 8 || 'Password must be at least 8 characters',
]
const confirmRules = [
  (v) => !!v || 'Confirm your password',
  (v) => v === password.value || 'Passwords do not match',
]

const strength = computed(() => {
  const p = password.value
  let score = 0
  if (p.length >= 8) score++
  if (p.length >= 12) score++
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) score++
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) score++
  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong']
  return { score, label: labels[score] }
})

async function handleRegister() {
  errorMessage.value = ''
  loading.value = true

  try {
    await register(username.value, email.value, password.value, passwordConfirm.value)
    await router.push('/')
  } catch (error) {
    errorMessage.value =
      error.message || 'We couldn’t create your account. Check your details and try again.'
  } finally {
    loading.value = false
  }
}

function goToLogin() {
  router.push('/login')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.register-page {
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

.register-shell {
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

/* Terminal: the one memorable element */
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

.track {
  display: grid;
  grid-template-columns: 22px 150px 1fr;
  align-items: center;
  gap: 8px;
  color: var(--mint);
}

.track-name {
  font-weight: 500;
}

.track-desc {
  color: rgba(238, 245, 241, 0.6);
  font-family: 'Instrument Sans', system-ui, sans-serif;
  font-size: 13px;
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

.register-form {
  display: grid;
  gap: 18px;
}

.register-form :deep(.q-field__control) {
  min-height: 54px;
  border-radius: 10px;
  background: #fff;
}

.register-form :deep(.q-field--outlined .q-field__control:before) {
  border-color: var(--line);
}

.register-form :deep(.q-field--outlined .q-field__control:hover:before) {
  border-color: #9fb3ab;
}

.register-form :deep(.q-field--focused .q-field__control:after) {
  border-width: 2px;
  border-color: var(--berry);
}

.register-form :deep(.q-field__label),
.register-form :deep(.q-field__prepend),
.register-form :deep(.q-field__append),
.register-form :deep(.q-field__bottom) {
  color: var(--muted);
}

.register-form :deep(.q-field--error .q-field__bottom) {
  color: #b42318;
}

/* Password strength */
.strength {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.strength-bars {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}

.strength-bars span {
  height: 4px;
  border-radius: 99px;
  background: var(--line);
  transition: background 0.2s ease;
}

.strength[data-level='1'] .strength-bars .on {
  background: #d92d20;
}
.strength[data-level='2'] .strength-bars .on {
  background: #e08a00;
}
.strength[data-level='3'] .strength-bars .on {
  background: #3d9b6e;
}
.strength[data-level='4'] .strength-bars .on {
  background: #12805c;
}

.strength small {
  min-width: 56px;
  text-align: right;
  color: var(--muted);
  font-size: 12px;
}

.register-button {
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

.register-button:hover {
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

.login-link {
  display: flex;
  justify-content: center;
  gap: 6px;
  color: var(--muted);
  font-size: 14px;
}

.login-link button {
  padding: 0;
  border: 0;
  border-radius: 4px;
  color: var(--berry);
  background: transparent;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.login-link button:hover {
  text-decoration: underline;
}

.login-link button:focus-visible,
.register-button:focus-visible {
  outline: 2px solid var(--berry);
  outline-offset: 3px;
}

.login-link button:disabled {
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
  .register-shell {
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

  .strength-bars span,
  .register-button {
    transition: none;
  }
}
</style>
