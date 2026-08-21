let seagullTimer: ReturnType<typeof setTimeout> | null = null;

export function playBackgroundAudio(): void {
  const music = document.getElementById("bg-music") as HTMLAudioElement | null;
  const waves = document.getElementById("waves") as HTMLAudioElement | null;

  if (music && music.paused) {
    music.volume = 0.5;
    music.play().catch(() => {});
    if (waves) {
      waves.volume = 0.3;
      waves.play().catch(() => {});
    }
    startSeagulls();
  }
}

export function startSeagulls(): void {
  const seagull = document.getElementById("seagull") as HTMLAudioElement | null;
  if (!seagull) return;

  function stopAndScheduleNext(): void {
    seagull!.pause();
    seagull!.onended = null;
    if (seagullTimer) clearTimeout(seagullTimer);
    const delay = 6000 + Math.random() * 12000;
    seagullTimer = setTimeout(playNext, delay);
  }

  function playNext(): void {
    seagull!.volume = 0.05 + Math.random() * 0.15;
    seagull!.playbackRate = 0.85 + Math.random() * 0.3;
    // Démarre à un moment aléatoire dans le fichier pour varier le cri
    seagull!.currentTime = Math.random() * 180;
    seagull!.play().catch(() => {});
    // Stoppe après 2 à 5 secondes pour simuler un bref cri
    const duration = 2000 + Math.random() * 3000;
    seagullTimer = setTimeout(stopAndScheduleNext, duration);
  }

  playNext();
}