import "./style.css";
import { bindHeroCards, bindVideoControls } from "./modules/ui/EcranSelection";
import { advanceDialogue, closeDialogue } from "./modules/ui/EcranDialogue";
import { closeHeroPopup } from "./modules/ui/composants/HeroPopup";
import { EcranCarte } from "./modules/ui/EcranCarte";

function bindDialogueControls(): void {
  const dlg = document.getElementById("dlg");
  if (!dlg) return;

  dlg.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
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

function bindHeroPopupControls(): void {
  document.getElementById("pop-close")?.addEventListener("click", closeHeroPopup);
  document.getElementById("pop-btn-close")?.addEventListener("click", closeHeroPopup);

  document.getElementById("pop-btn-start")?.addEventListener("click", () => {
    closeHeroPopup();
    new EcranCarte().afficher();
  });
}

function init(): void {
  bindHeroCards();
  bindVideoControls();
  bindDialogueControls();
  bindHeroPopupControls();
}

init();