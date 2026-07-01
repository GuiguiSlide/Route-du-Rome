export interface BoutonProps {
  id: string;
  label: string;
}

export function Bouton(props: BoutonProps): string {
  return `<button id="${props.id}">${props.label}</button>`
}
