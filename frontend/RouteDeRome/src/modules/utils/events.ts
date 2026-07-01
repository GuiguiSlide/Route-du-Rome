type Callback = (...args: unknown[]) => void

const listeners: Record<string, Callback[]> = {}

export function on(event: string, callback: Callback): void {
  listeners[event] = listeners[event] || []
  listeners[event].push(callback)
}

export function emit(event: string, ...args: unknown[]): void {
  (listeners[event] || []).forEach((callback) => callback(...args))
}
