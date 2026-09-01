// Module de gestion du système de dialogue
// Gère l'affichage typé des lignes de dialogue avec avancemé au clic

// Type pour le callback de fin de dialogue
type OnDialogueEnd = () => void;

// État du dialogue
let dlgLines: string[] = [];
let dlgIdx = 0;
let dlgTimer: ReturnType<typeof setInterval> | null = null;
let onEndCallback: OnDialogueEnd | null = null;

// Commence un nouveau dialogue avec des lignes de texte
export function startDialogue(lines: string[], onEnd: OnDialogueEnd): void {
  dlgLines = lines;
  dlgIdx = 0;
  onEndCallback = onEnd;

  const dots = document.getElementById("dlg-dots");
  if (dots) {
    dots.innerHTML = "";
    lines.forEach((_, i) => {
      const d = document.createElement("div");
      d.className = "dd" + (i === 0 ? " on" : "");
      d.id = "idxd" + i;
      dots.appendChild(d);
    });
  }

  document.getElementById("dlg")?.classList.add("open");
  typeLine(dlgLines[0]);
}

// Avance le dialogue : termine l'animation de frappe ou passe à la ligne suivante
// Un clic termine d'abord l'animation de frappe, puis avance réellement la conversation.
export function advanceDialogue(): void {
  const el = document.getElementById("dlg-txt");
  if (!el) return;

  if (el.dataset.typing === "1") {
    if (dlgTimer) clearInterval(dlgTimer);
    el.textContent = dlgLines[dlgIdx];
    el.dataset.typing = "0";
    return;
  }

  dlgIdx++;
  if (dlgIdx >= dlgLines.length) {
    onEndCallback?.();
    return;
  }

  for (let i = 0; i < dlgLines.length; i++) {
    const dot = document.getElementById("idxd" + i);
    if (dot) {
      dot.className = "dd" + (i < dlgIdx ? " done" : i === dlgIdx ? " on" : "");
    }
  }
  typeLine(dlgLines[dlgIdx]);
}

// Anime le typé d'une ligne de texte caractère par caractère
// Le timer est conservé au niveau du module pour garantir une seule frappe active.
function typeLine(txt: string): void {
  if (dlgTimer) clearInterval(dlgTimer);
  const el = document.getElementById("dlg-txt");
  if (!el) return;

  el.textContent = "";
  el.dataset.typing = "1";
  el.dataset.full = txt;

  let i = 0;
  dlgTimer = setInterval(() => {
    if (i >= txt.length) {
      if (dlgTimer) clearInterval(dlgTimer);
      el.dataset.typing = "0";
      return;
    }
    el.textContent += txt[i++];
  }, 24);
}

// Ferme le dialogue et arrête l'animation de frappe
export function closeDialogue(): void {
  document.getElementById("dlg")?.classList.remove("open");
  if (dlgTimer) clearInterval(dlgTimer);
}