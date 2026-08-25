import { getHeroById, type Character } from "../data/personnages";
import { playBackgroundAudio } from "../utils/media";
import { saveSelectedHero } from "../utils/storage";
import { fillHeroPopup, showHeroPopup } from "./composants/HeroPopup";
import { startDialogue, closeDialogue } from "./EcranDialogue";
export function bindHeroCards(): void {
  document.getElementById("card-elio")?.addEventListener("click", () => launchHero("elio"));
  document.getElementById("card-elia")?.addEventListener("click", () => launchHero("elia"));
}

function launchHero(id: string): void {
  const character = getHeroById(id);
  if (!character) {
    console.warn(`Personnage introuvable pour l'id "${id}"`);
    return;
  }

  playBackgroundAudio();
  saveSelectedHero(id);

  const portraitSrc = getPortraitSrc(character);

  fillHeroPopup(character, portraitSrc);
  transitionToGameScreen(character, portraitSrc);
}

function getPortraitSrc(character: Character): string {
  const imgEl = document.getElementById("img-" + character.id) as HTMLImageElement | null;
  if (imgEl && imgEl.complete && imgEl.naturalWidth > 0) {
    return imgEl.src;
  }
  return character.portrait;
}

function transitionToGameScreen(character: Character, portraitSrc: string): void {
  const flash = document.getElementById("flash");
  if (flash) flash.style.opacity = "1";

  setTimeout(() => {
    document.getElementById("screen-pick")?.classList.add("hidden");
    document.getElementById("screen-game")?.classList.add("visible");
    if (flash) flash.style.opacity = "0";
    startVideoSequence(character, portraitSrc);
  }, 300);
}

function startVideoSequence(character: Character, portraitSrc: string): void {
  const vid = document.getElementById("the-video") as HTMLVideoElement | null;
  const vw = document.getElementById("vid-wrap");
  const skipBtn = document.getElementById("skip-btn");

  if (!vid || !vw) return;

  if (!character.video) {
    // Pas de vidéo pour ce personnage : on passe directement au dialogue
    startDialogue(character.dialogues.intro, () => {
      closeDialogue();
      showHeroPopup();
    });
    return;
  }

  vid.src = character.video;
  vid.load();

  const reveal = () => {
    vid.play().catch(() => { });
    requestAnimationFrame(() => {
      vw.classList.add("show");
      skipBtn?.classList.add("show");
    });
    setTimeout(() => {
      startDialogue(character.dialogues.intro, () => showHeroPopup());
    }, 1200);
  };

  let revealed = false;
  const onCanPlay = () => {
    if (revealed) return;
    revealed = true;
    vid.removeEventListener("canplay", onCanPlay);
    reveal();
  };
  vid.addEventListener("canplay", onCanPlay);

  // Fallback si le "canplay" tarde (réseau lent)
  setTimeout(() => {
    if (!revealed) {
      revealed = true;
      reveal();
    }
  }, 800);
}

export function bindVideoControls(): void {
  document.getElementById("skip-btn-action")?.addEventListener("click", skipVideo);
}

function skipVideo(): void {
  const vid = document.getElementById("the-video") as HTMLVideoElement | null;
  if (vid && vid.duration) vid.currentTime = vid.duration - 0.1;
  document.getElementById("skip-btn")?.classList.remove("show");
}