/* -------------------------------------------------------------------------- */
/*  Tiny fetch wrapper for the portfolio backend.                             */
/*                                                                            */
/*  - Prefixes requests with VITE_API_BASE_URL                                */
/*  - Always sends cookies (credentials: 'include') so the httpOnly session   */
/*    cookies flow to the API.                                                */
/*  - Injects the double-submit CSRF header from the readable csrf_token      */
/*    cookie on state-changing requests.                                      */
/*  - Transparently refreshes the access token once on 401, then retries.     */
/* -------------------------------------------------------------------------- */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '')

const readCookie = (name: string): string | null => {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : null
}

export type ApiResponse<T = any> = {
  data: T
  success: boolean
  message: string
  showPopUp?: boolean
  code?: number
}

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

async function rawRequest(path: string, options: RequestInit): Promise<Response> {
  const method = (options.method || 'GET').toUpperCase()
  const headers = new Headers(options.headers || {})

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (!SAFE_METHODS.has(method)) {
    const csrf = readCookie('csrf_token')
    if (csrf) headers.set('X-CSRF-Token', csrf)
  }

  return fetch(`${BASE_URL}${path}`, {
    ...options,
    method,
    headers,
    credentials: 'include',
  })
}

let refreshPromise: Promise<boolean> | null = null

async function tryRefresh(): Promise<boolean> {
  if (!refreshPromise) {
    refreshPromise = rawRequest('/api/auth/refresh', { method: 'POST' })
      .then((r) => r.ok)
      .catch(() => false)
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

export async function apiFetch<T = any>(
  path: string,
  options: RequestInit = {},
  retryOnAuthFail = true,
): Promise<ApiResponse<T>> {
  let res = await rawRequest(path, options)

  // On an expired access token, refresh once and replay the original request.
  if (res.status === 401 && retryOnAuthFail && !path.startsWith('/api/auth/refresh')) {
    const refreshed = await tryRefresh()
    if (refreshed) {
      res = await rawRequest(path, options)
    }
  }

  let json: ApiResponse<T>
  try {
    json = (await res.json()) as ApiResponse<T>
  } catch {
    throw new Error(`Request failed (${res.status})`)
  }
  if (!res.ok && json?.message == null) {
    throw new Error(`Request failed (${res.status})`)
  }
  return json
}

export const api = {
  get: <T = any>(path: string) => apiFetch<T>(path, { method: 'GET' }),
  post: <T = any>(path: string, body?: unknown) =>
    apiFetch<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
}
