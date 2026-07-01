export function chargerVideo(selector: string, src: string): HTMLVideoElement | null {
  const element = document.querySelector<HTMLVideoElement>(selector)
  if (element) {
    element.src = src
  }
  return element
}

export function jouerAudio(selector: string): HTMLAudioElement | null {
  const element = document.querySelector<HTMLAudioElement>(selector)
  element?.play()
  return element
}
