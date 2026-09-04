'use client'

import posthog from 'posthog-js'

export function captureEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    posthog.capture(eventName, properties)
  }
}

export { posthog }
