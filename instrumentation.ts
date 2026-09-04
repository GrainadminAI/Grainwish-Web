import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { LoggerProvider, SimpleLogRecordProcessor } from '@opentelemetry/sdk-logs'

export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const exporter = new OTLPLogExporter({
      url: 'https://us.i.posthog.com/otlp/v1/logs',
      headers: {
        Authorization: 'Bearer phc_BvzNwBSVehczv2ufsrMvEJMEMGVUoiBELXpGr5cFJ4P2',
      },
    })

    const processor = new SimpleLogRecordProcessor(exporter as any)

    const loggerProvider = new LoggerProvider({
      resource: resourceFromAttributes({
        'service.name': 'my-nextjs-app',
      }),
      processors: [processor],
    } as any)

    if (typeof (loggerProvider as any).addLogRecordProcessor === 'function') {
      ;(loggerProvider as any).addLogRecordProcessor(processor)
    }

    // make the logger available globally
    ;(globalThis as any).__posthogLogger = loggerProvider.getLogger('my-nextjs-app')
  }
}
