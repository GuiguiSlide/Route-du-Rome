export function focusElement(selector: string): void {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) {
    element.focus()
  }
}

export function definirAriaRole(selector: string, role: string): void {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) {
    element.setAttribute('role', role)
  }
}
