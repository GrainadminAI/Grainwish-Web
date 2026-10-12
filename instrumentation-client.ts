import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.VITE_POSTHOG_KEY || ''
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || process.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

  if (token) {
    posthog.init(token, {
      api_host: host,
      defaults: '2026-05-30',
    })
  }
}
