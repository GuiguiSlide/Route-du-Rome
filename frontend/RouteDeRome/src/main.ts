// Point d'entrée principal de l'application
// Initialise tous les événements et la logique de base du jeu

import "./style.css";
import { bindHeroCards, bindVideoControls } from "./modules/ui/EcranSelection";
import { advanceDialogue, closeDialogue } from "./modules/ui/EcranDialogue";
import { closeHeroPopup } from "./modules/ui/composants/HeroPopup";
import { EcranCarte } from "./modules/ui/EcranCarte";
import { bindQuizControls } from "./modules/ui/EcranQuiz";
import { bindCarnetControls } from "./modules/ui/EcranCarnet";

// Configure les écouteurs pour le système de dialogue
// Gère les clics et les touches clavier pour avancer le dialogue
function bindDialogueControls(): void {
  const dlg = document.getElementById("dlg");
  if (!dlg) return;

  dlg.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest("#dlg-quiz-choices, #dlg-quiz-continue")) return;
    if (target.closest(".dlg-x")) {
      closeDialogue();
      return;
    }
    advanceDialogue();
  });

  document.addEventListener("keydown", (event) => {
    if (event.code !== "Space" && event.code !== "Enter") return;
    if (!dlg.classList.contains("open")) return;
    event.preventDefault();
    advanceDialogue();
  });
}

// Configure les écouteurs pour la popup du héros
// La popup du héros est le pont entre la sélection et la création de la carte.
function bindHeroPopupControls(): void {
  document.getElementById("pop-close")?.addEventListener("click", closeHeroPopup);
  document.getElementById("pop-btn-close")?.addEventListener("click", closeHeroPopup);

  document.getElementById("pop-btn-start")?.addEventListener("click", () => {
    closeHeroPopup();
    new EcranCarte().afficher();
  });
}

// Initialise tous les écouteurs d'événements
// Tous les écouteurs sont enregistrés une seule fois au chargement du module.
function init(): void {
  bindHeroCards();
  bindVideoControls();
  bindDialogueControls();
  bindHeroPopupControls();
  bindQuizControls();
  bindCarnetControls();
}

init();