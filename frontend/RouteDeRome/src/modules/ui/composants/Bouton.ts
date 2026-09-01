// Interface pour les propriétés d'un bouton
export interface BoutonProps {
  id: string;
  label: string;
}

// Fonction de rendu pour créer un bouton HTML
export function Bouton(props: BoutonProps): string {
  return `<button id="${props.id}">${props.label}</button>`
}
