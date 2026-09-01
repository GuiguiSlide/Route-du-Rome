// Module pour les fonctions d'accessibilité
// Fournit des utilitaires pour améliorer l'accès au DOM et l'accessibilité

// Donne le focus à un élément du DOM via un sélecteur CSS
export function focusElement(selector: string): void {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) {
    element.focus()
  }
}

// Définit le rôle ARIA d'un élément pour améliorer l'accessibilité aux lecteurs d'écran
export function definirAriaRole(selector: string, role: string): void {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) {
    element.setAttribute('role', role)
  }
}
