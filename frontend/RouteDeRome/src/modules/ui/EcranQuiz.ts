// Module de gestion du système de quiz
// Gère l'affichage des questions et le suivi des réponses choisies

import type { Quiz } from "../game/Quiz";
import { closeDialogue } from "./EcranDialogue";

// Types pour les callbacks
type OnQuestionVue = (questionId: string) => void;
type OnQuizEnd = () => void;

// État du quiz
let quizCourant: Quiz | null = null;
let onQuestionVueCallback: OnQuestionVue | null = null;
let onEndCallback: OnQuizEnd | null = null;

// Commence un quiz avec des callbacks pour les événements
// Ces callbacks relient l'interface aux objets métier sans faire entrer le DOM dans le domaine.
export function startQuiz(quiz: Quiz, onQuestionVue: OnQuestionVue, onEnd: OnQuizEnd): void {
  quizCourant = quiz;
  onQuestionVueCallback = onQuestionVue;
  onEndCallback = onEnd;

  document.getElementById("dlg-hint")?.style.setProperty("display", "none");
  const continueBtn = document.getElementById("dlg-quiz-continue");
  if (continueBtn) {
    continueBtn.style.display = "inline-block";
    (continueBtn as HTMLButtonElement).disabled = true;
  }

  const replyEl = document.getElementById("dlg-quiz-reply");
  if (replyEl) {
    replyEl.textContent = "";
    replyEl.classList.remove("show");
  }

  renderChoices();
  document.getElementById("dlg-quiz-choices")?.classList.add("show");
}

// Affiche les choix de questions disponibles
// Les boutons sont reconstruits à chaque quiz pour éviter de conserver ceux d'une ancienne rencontre.
function renderChoices(): void {
  if (!quizCourant) return;
  const container = document.getElementById("dlg-quiz-choices");
  if (!container) return;

  container.innerHTML = "";
  quizCourant.questions.forEach((question) => {
    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "dlg-quiz-choice";
    bouton.textContent = question.texte;
    bouton.addEventListener("click", () => choisirQuestion(question.id, question.reponse, bouton));
    container.appendChild(bouton);
  });
}

// Gère le choix d'une question et affiche sa réponse
// Une réponse remplace le texte du dialogue; la question est ensuite mémorisée dans le Quiz.
function choisirQuestion(questionId: string, reponse: string, bouton: HTMLButtonElement): void {
  document.querySelectorAll<HTMLButtonElement>(".dlg-quiz-choice").forEach((btn) => {
    btn.classList.remove("selected");
  });
  bouton.classList.add("selected");

  const dialogueText = document.getElementById("dlg-txt");
  if (dialogueText) dialogueText.textContent = reponse;

  const replyEl = document.getElementById("dlg-quiz-reply");
  if (replyEl) {
    replyEl.textContent = "";
    replyEl.classList.remove("show");
  }

  onQuestionVueCallback?.(questionId);

  if (quizCourant?.estComplet()) {
    const continueBtn = document.getElementById("dlg-quiz-continue") as HTMLButtonElement | null;
    if (continueBtn) continueBtn.disabled = false;
  }
}

// Valide et termine le quiz
// La validation est refusée tant que le Quiz ne connaît pas les trois questions consultées.
function terminerQuiz(): void {
  if (!quizCourant?.estComplet()) return;

  document.getElementById("dlg-quiz-choices")?.classList.remove("show");
  document.getElementById("dlg-hint")?.style.setProperty("display", "flex");
  const continueBtn = document.getElementById("dlg-quiz-continue");
  if (continueBtn) continueBtn.style.display = "none";

  closeDialogue();

  const callback = onEndCallback;
  quizCourant = null;
  onQuestionVueCallback = null;
  onEndCallback = null;
  callback?.();
}

// Configure les écouteurs pour les controles du quiz
export function bindQuizControls(): void {
  document.getElementById("dlg-quiz-continue")?.addEventListener("click", (event) => {
    event.stopPropagation();
    terminerQuiz();
  });
}