// Module simple pour gérer les événements personnalisés (event emitter)
// Permet de découpler les composants en utilisant un système d'événements

// Type pour les callbacks
type Callback = (...args: unknown[]) => void

// Stocke les écouteurs d'events
const listeners: Record<string, Callback[]> = {}

// Enregistre un callback pour un événement spécifique
export function on(event: string, callback: Callback): void {
  listeners[event] = listeners[event] || []
  listeners[event].push(callback)
}

// Émet un événement et appelle tous les callbacks enregistrés
export function emit(event: string, ...args: unknown[]): void {
  (listeners[event] || []).forEach((callback) => callback(...args))
}
