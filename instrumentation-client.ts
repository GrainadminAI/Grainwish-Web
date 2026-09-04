import posthog from 'posthog-js'

if (typeof window !== 'undefined') {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || 'phc_BvzNwBSVehczv2ufsrMvEJMEMGVUoiBELXpGr5cFJ4P2'
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

  if (token) {
    posthog.init(token, {
      api_host: host,
      defaults: '2026-05-30',
    })
  }
}
