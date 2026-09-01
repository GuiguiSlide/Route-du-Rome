// Module pour la popup d'information du héros
// Affiche les détails du héros dans une popup modale

import type { Character } from "../../data/personnages";

// Remplit la popup avec les données du héros
// Synchronise les deux zones qui présentent le héros : dialogue et popup de lancement.
export function fillHeroPopup(character: Character, portraitSrc: string): void {
  const dlgPortrait = document.getElementById("dlg-portrait") as HTMLImageElement | null;
  const popPortrait = document.getElementById("pop-portrait") as HTMLImageElement | null;
  if (dlgPortrait) dlgPortrait.src = portraitSrc;
  if (popPortrait) popPortrait.src = portraitSrc;

  setText("dlg-nname", character.name);
  setText("dlg-nrole", character.role);
  setText("pop-name", character.name);
  setText("pop-role", character.popRole ?? character.role);

  const bio = document.getElementById("pop-bio");
  if (bio) bio.innerHTML = character.bio ?? "";
}

// Affiche la popup du héros avec animation
export function showHeroPopup(): void {
  document.getElementById("hero-popup")?.classList.add("show");
  setTimeout(() => {
    document.getElementById("pop-xp")?.classList.add("go");
  }, 300);
}

// Ferme la popup du héros
// Ferme la popup et réinitialise l'animation pour une prochaine ouverture.
export function closeHeroPopup(): void {
  document.getElementById("hero-popup")?.classList.remove("show");
  document.getElementById("pop-xp")?.classList.remove("go");
}

// Affecte du texte à un élément DOM
function setText(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}