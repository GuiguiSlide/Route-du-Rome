// Module pour l'affichage de l'écran final du jeu
// Montre les statistiques finales du joueur quand toutes les quêtes sont terminées

import type { Joueur } from "../game/Joueur";

export class EcranFin {
  // Lit le joueur final et affiche l'overlay quand Jeu confirme la fin des quêtes.
  public afficher(joueur: Joueur): void {
    const overlay = document.getElementById("end-overlay");
    if (!overlay) return;

    document.getElementById("end-xp")!.textContent = String(joueur.getXp());
    document.getElementById("end-level")!.textContent = String(joueur.getNiveau());
    document.getElementById("end-jobs")!.textContent = String(joueur.getCarnetDeBord().getMetiersDecouverts().length);
    overlay.classList.add("show");
  }
}
