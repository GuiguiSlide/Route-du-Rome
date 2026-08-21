import type { Character } from "../../data/personnages";

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

export function showHeroPopup(): void {
  document.getElementById("hero-popup")?.classList.add("show");
  setTimeout(() => {
    document.getElementById("pop-xp")?.classList.add("go");
  }, 300);
}

export function closeHeroPopup(): void {
  document.getElementById("hero-popup")?.classList.remove("show");
  document.getElementById("pop-xp")?.classList.remove("go");
}

function setText(id: string, value: string): void {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}