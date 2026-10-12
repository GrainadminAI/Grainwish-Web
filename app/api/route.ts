import { PostHog } from 'posthog-node'
import { SeverityNumber } from '@opentelemetry/api-logs'

export async function GET(request: Request) {
  const logger = (globalThis as any).__posthogLogger
  logger?.emit({
    severityNumber: SeverityNumber.INFO,
    severityText: 'INFO',
    body: 'API route called',
    attributes: { route: '/api' },
  })

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || process.env.VITE_POSTHOG_KEY || ''
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || process.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com'

  const posthog = new PostHog(token, { host })
  posthog.capture({
    distinctId: 'server_api_user',
    event: 'api_route_accessed',
    properties: {
      route: '/api',
    },
  })
  await posthog.shutdown()

  return Response.json({ ok: true })
}
