import type { Quiz } from "../game/Quiz";
import type { Question } from "../game/Question";

type VerifierReponse = (questionId: string, reponseId: string) => boolean;
type OnQuizEnd = () => void;

const DELAI_FEEDBACK_MS = 1400;

let quizCourant: Quiz | null = null;
let questionIdx = 0;
let verifierReponseCallback: VerifierReponse | null = null;
let onEndCallback: OnQuizEnd | null = null;
let enAttente = false;

export function startQuiz(quiz: Quiz, verifierReponse: VerifierReponse, onEnd: OnQuizEnd): void {
  quizCourant = quiz;
  questionIdx = 0;
  verifierReponseCallback = verifierReponse;
  onEndCallback = onEnd;
  enAttente = false;

  renderProgress();
  document.getElementById("quiz")?.classList.add("open");
  afficherQuestion();
}

function afficherQuestion(): void {
  if (!quizCourant) return;
  const question = quizCourant.questions[questionIdx];
  if (!question) return;

  const questionEl = document.getElementById("quiz-question");
  if (questionEl) questionEl.textContent = question.texte;

  const feedbackEl = document.getElementById("quiz-feedback");
  if (feedbackEl) {
    feedbackEl.textContent = "";
    feedbackEl.className = "quiz-feedback";
  }

  renderReponses(question);
  renderProgress();
}

function renderReponses(question: Question): void {
  const container = document.getElementById("quiz-reponses");
  if (!container) return;

  container.innerHTML = "";
  question.reponses.forEach((reponse) => {
    const bouton = document.createElement("button");
    bouton.className = "quiz-reponse";
    bouton.textContent = reponse.texte;
    bouton.addEventListener("click", () => choisirReponse(question.id, reponse.id, bouton));
    container.appendChild(bouton);
  });
}

function choisirReponse(questionId: string, reponseId: string, bouton: HTMLButtonElement): void {
  if (enAttente || !verifierReponseCallback) return;
  enAttente = true;

  const correcte = verifierReponseCallback(questionId, reponseId);

  document.querySelectorAll<HTMLButtonElement>(".quiz-reponse").forEach((btn) => {
    btn.disabled = true;
  });
  bouton.classList.add(correcte ? "correcte" : "incorrecte");

  const feedbackEl = document.getElementById("quiz-feedback");
  if (feedbackEl) {
    feedbackEl.textContent = correcte ? "Bonne réponse !" : "Ce n'est pas ça.";
    feedbackEl.className = "quiz-feedback " + (correcte ? "correcte" : "incorrecte");
  }

  setTimeout(() => {
    enAttente = false;
    avancer();
  }, DELAI_FEEDBACK_MS);
}

function avancer(): void {
  if (!quizCourant) return;
  questionIdx++;

  if (questionIdx >= quizCourant.questions.length) {
    terminerQuiz();
    return;
  }

  afficherQuestion();
}

function terminerQuiz(): void {
  document.getElementById("quiz")?.classList.remove("open");
  const callback = onEndCallback;
  quizCourant = null;
  onEndCallback = null;
  verifierReponseCallback = null;
  callback?.();
}

function renderProgress(): void {
  if (!quizCourant) return;
  const progress = document.getElementById("quiz-progress");
  if (!progress) return;
  progress.textContent = `${questionIdx + 1} / ${quizCourant.questions.length}`;
}

export function bindQuizControls(): void {
  document.getElementById("quiz-close")?.addEventListener("click", () => {
    document.getElementById("quiz")?.classList.remove("open");
    quizCourant = null;
    onEndCallback = null;
    verifierReponseCallback = null;
  });
}