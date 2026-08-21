type OnDialogueEnd = () => void;

let dlgLines: string[] = [];
let dlgIdx = 0;
let dlgTimer: ReturnType<typeof setInterval> | null = null;
let onEndCallback: OnDialogueEnd | null = null;

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

export function advanceDialogue(): void {
  const el = document.getElementById("dlg-txt");
  if (!el) return;

  // Si le texte est en cours de frappe, on l'affiche en entier au lieu d'avancer
  if (el.dataset.typing === "1") {
    if (dlgTimer) clearInterval(dlgTimer);
    el.textContent = dlgLines[dlgIdx];
    el.dataset.typing = "0";
    return;
  }

  dlgIdx++;
  if (dlgIdx >= dlgLines.length) {
    closeDialogue();
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

export function closeDialogue(): void {
  document.getElementById("dlg")?.classList.remove("open");
  if (dlgTimer) clearInterval(dlgTimer);
}