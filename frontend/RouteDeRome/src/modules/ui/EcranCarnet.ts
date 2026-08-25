import type { Joueur } from "../game/Joueur";

export function afficherCarnet(joueur: Joueur): void {
  const overlay = document.getElementById("carnet-overlay");
  const badges = document.getElementById("carnet-badges");
  const level = document.getElementById("carnet-level");
  const xp = document.getElementById("carnet-xp");
  const jobs = document.getElementById("carnet-jobs");

  if (!overlay || !badges || !level || !xp || !jobs) return;

  const collected = joueur.getCarnetDeBord().getMetiersDecouverts();
  level.textContent = `Niveau ${joueur.getNiveau()}`;
  xp.textContent = `${joueur.getXp()} XP`;
  jobs.textContent = `${collected.length} / 9 métiers`;
  badges.innerHTML = "";

  joueur.getBadges().forEach((badge) => {
    const item = document.createElement("div");
    item.className = "carnet-badge";
    item.textContent = `🏅 ${badge.nom}`;
    badges.appendChild(item);
  });

  overlay.classList.add("show");
}

// Le carnet est un overlay indépendant : le jeu reste vivant derrière lui.
export function fermerCarnet(): void {
  document.getElementById("carnet-overlay")?.classList.remove("show");
}

// Utilise un événement DOM pour que le bouton reste découplé de l'instance de Jeu.
export function bindCarnetControls(): void {
  document.getElementById("carnet-btn")?.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("ouvrir-carnet"));
  });
  document.getElementById("carnet-close")?.addEventListener("click", fermerCarnet);
}
