import { SeverityNumber } from '@opentelemetry/api-logs'

export function getPostHogLogger() {
  return (globalThis as any).__posthogLogger
}

export function logToPostHog(
  body: string,
  attributes: Record<string, any> = {},
  severityNumber: SeverityNumber = SeverityNumber.INFO,
  severityText: string = 'INFO'
) {
  const logger = getPostHogLogger()
  if (logger) {
    logger.emit({
      severityNumber,
      severityText,
      body,
      attributes,
    })
    return true
  }
  return false
}
