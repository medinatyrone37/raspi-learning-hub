const API_URL = '/api'

const ACCESS_TOKEN_KEY = 'raspi_access_token'
const REFRESH_TOKEN_KEY = 'raspi_refresh_token'
const USER_KEY = 'raspi_user'

export async function login(username, password) {
  const response = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.detail || data.non_field_errors?.[0] || 'Login failed.')
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
  localStorage.setItem(USER_KEY, JSON.stringify(data.user))

  return data
}

export async function register(username, email, password, passwordConfirm) {
  const response = await fetch(`${API_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
      password_confirm: passwordConfirm,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    const firstError = Object.values(data)?.[0]?.[0]

    throw new Error(firstError || 'Registration failed.')
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, data.access)
  localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh)
  localStorage.setItem(USER_KEY, JSON.stringify(data.user))

  return data
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function getUser() {
  const user = localStorage.getItem(USER_KEY)

  if (!user) {
    return null
  }

  try {
    return JSON.parse(user)
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return Boolean(getAccessToken())
}

