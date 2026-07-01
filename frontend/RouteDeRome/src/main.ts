import './style.css'

type Hero = {
  name: string
  role: string
  popRole: string
  video: string
  bio: string
  lines: string[]
}

type IntroNpc = {
  lat: number
  lng: number
  icon: string
  name: string
  color: string
}

const HEROES: Record<string, Hero> = {
  elio: {
    name: 'Élio',
    role: 'Explorateur · France Travail 35',
    popRole: 'Explorateur France Travail · Niveau 1',
    video: '/assets/videos/Elio1.mp4',
    bio: "Élio est <strong>conseiller France Travail en herbe</strong> et grand aventurier. Il parcourt l'<strong>Ille-et-Vilaine</strong> à la rencontre des pros. Sa mission : <strong>découvrir les métiers du 35</strong>.",
    lines: [
      "Salut ! Moi c'est Élio — Explorateur France Travail et grand aventurier !",
      "Je parcours l'Ille-et-Vilaine à la rencontre des pros : marins, agricultrices, chefs cuisiniers, chaudronniers...",
      "Chaque rencontre est une quête. Chaque quête, une vidéo et une vraie réalité de terrain.",
      "Alors... tu m'accompagnes dans La Route du Rome ?"
    ]
  },
  elia: {
    name: 'Élia',
    role: 'Exploratrice · France Travail 35',
    popRole: 'Exploratrice France Travail · Niveau 1',
    video: '/assets/videos/Elia1.mp4',
    bio: "Élia est <strong>conseillère France Travail en herbe</strong> et grande aventurière. Elle parcourt l'<strong>Ille-et-Vilaine</strong> à la rencontre des pros. Sa mission : <strong>découvrir les métiers du 35</strong>.",
    lines: [
      "Salut ! Moi c'est Élia — Exploratrice France Travail et grande aventurière !",
      "Je parcours l'Ille-et-Vilaine à la rencontre des pros : marins, agricultrices, chefs cuisiniers, chaudronniers...",
      "Chaque rencontre est une quête. Chaque quête, une vidéo et une vraie réalité de terrain.",
      "Alors... tu m'accompagnes dans La Route du Rome ?"
    ]
  }
}

const INTRO_NPCS: IntroNpc[] = [
  { lat: 48.6490, lng: -2.0250, icon: '⚓', name: 'Morgane', color: '#406BDE' },
  { lat: 48.5540, lng: -1.7500, icon: '🌾', name: 'Sarah', color: '#8B5BB8' },
  { lat: 48.6720, lng: -1.8470, icon: '🍽️', name: 'Sophie', color: '#FFCC52' },
  { lat: 48.4550, lng: -2.0490, icon: '⚛️', name: 'Nathan', color: '#EB6366' },
  { lat: 48.6340, lng: -2.0670, icon: '🤝', name: 'Claire', color: '#D9C9E5' },
  { lat: 48.6340, lng: -2.1330, icon: '🥂', name: 'Manu', color: '#FFDE8C' },
  { lat: 48.4120, lng: -1.7480, icon: '🔧', name: 'Florian', color: '#B0BFF0' },
  { lat: 48.5900, lng: -1.8400, icon: '👶', name: 'Laetitia', color: '#F0C9DE' },
  { lat: 48.5610, lng: -1.8310, icon: '🔩', name: 'Jeanne', color: '#F5A39E' }
]

let heroKey: string | null = null
let dlgLines: string[] = []
let dlgIdx = 0
let dlgTimer: number | null = null
let introMap: any = null

const app = document.querySelector<HTMLDivElement>('#app')
if (!app) throw new Error('Root element #app not found')

app.innerHTML = `
<div id="flash"></div>

<audio id="bg-music" src="/assets/sounds/theme.mp3" loop preload="auto"></audio>
<audio id="waves" src="/assets/sounds/waves.mp3" loop preload="auto"></audio>
<audio id="seagull" src="/assets/sounds/mouettes.mp3" preload="auto"></audio>

<div id="screen-pick">
  <div class="ft-badge">France Travail · Ille-et-Vilaine</div>
  <div class="game-title">LA ROUTE<br><span>DU ROME</span></div>
  <div class="game-sub">Découvre les métiers du 35</div>
  <div class="cards-row">
    <div class="hero-card" data-hero="elio">
      <div class="card-photo"><img id="img-elio" src="/assets/img/ElioPP.png" alt="Élio" /></div>
      <div class="card-info">
        <div class="card-name">Élio</div>
        <div class="card-role">Explorateur · Niveau 1</div>
        <div class="card-tags">
          <span class="card-tag">⚡ Dynamique</span>
          <span class="card-tag">🗺️ Curieux</span>
          <span class="card-tag">💬 Bavard</span>
        </div>
      </div>
    </div>
    <div class="hero-card" data-hero="elia">
      <div class="card-photo"><img id="img-elia" src="/assets/img/EliaPP.png" alt="Élia" /></div>
      <div class="card-info">
        <div class="card-name">Élia</div>
        <div class="card-role">Exploratrice · Niveau 1</div>
        <div class="card-tags">
          <span class="card-tag">🌟 Déterminée</span>
          <span class="card-tag">🎯 Précise</span>
          <span class="card-tag">✨ Courageuse</span>
        </div>
      </div>
    </div>
  </div>
  <div class="pick-hint">👆 Clique sur ton personnage pour commencer</div>
</div>

<div id="screen-game">
  <div id="intro-map"></div>

  <div id="map-overlay">
    <div class="mo-title">Saint-Malo &amp; Alentours</div>
    <div class="mo-badge">France Travail · 35</div>
  </div>

  <div id="vid-wrap">
    <video id="the-video" playsinline loop></video>
    <div id="skip-btn"><button type="button">⏭ Passer</button></div>
  </div>

  <div id="dlg">
    <div class="dlg-head">
      <img class="dlg-portrait" id="dlg-portrait" src="/assets/img/ElioPP.png" alt="Portrait" />
      <div class="dlg-info">
        <div class="dlg-nname" id="dlg-nname">Élio</div>
        <div class="dlg-nrole" id="dlg-nrole">Explorateur · France Travail 35</div>
      </div>
      <div class="dlg-tag">🗺️ La Route du Rome</div>
      <div class="dlg-dots" id="dlg-dots"></div>
      <button class="dlg-x" type="button">✕</button>
    </div>
    <div class="dlg-body">
      <div id="dlg-txt"></div>
    </div>
    <div class="dlg-foot">
      <div class="dlg-hint"><span class="dkey">Espace</span>&nbsp;·&nbsp;<span class="dkey">Clic</span>&nbsp;pour continuer</div>
    </div>
  </div>

  <div id="hero-popup">
    <div class="pop-card">
      <div class="pop-head">
        <button class="pop-close" type="button">✕</button>
        <img class="pop-portrait" id="pop-portrait" src="/assets/img/ElioPP.png" alt="Portrait" />
        <div>
          <h2 id="pop-name">Élio</h2>
          <p id="pop-role">Explorateur France Travail · Niveau 1</p>
        </div>
      </div>
      <div class="pop-body">
        <div class="pills">
          <div class="pill pv">🗺️ Explorateur</div>
          <div class="pill py">⭐ Niveau 1</div>
          <div class="pill pb">💼 0 / 9 métiers</div>
        </div>
        <div class="pop-bio" id="pop-bio">Bienvenue dans La Route du Rome !</div>
        <div class="pop-xp-lbl">Expérience <span>0 / 200 XP</span></div>
        <div class="xp-track">
          <div class="xp-bar-inner" id="pop-xp"></div>
        </div>
        <div class="pop-btns">
          <button class="btn btn-g" type="button">Fermer</button>
          <button class="btn btn-v" id="start-game" type="button">🚀 Démarrer l'aventure !</button>
        </div>
      </div>
    </div>
  </div>
</div>
`

function getElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id)
  if (!element) throw new Error(`Missing element: ${id}`)
  return element as T
}

function startSeagulls(): void {
  const seagull = document.getElementById('seagull') as HTMLAudioElement | null
  if (!seagull) return

  let seagullTimer = 0

  const stopAndScheduleNext = (): void => {
    seagull.pause()
    seagull.onended = null
    clearTimeout(seagullTimer)
    const delay = 6000 + Math.random() * 12000
    seagullTimer = window.setTimeout(playNext, delay)
  }

  const playNext = (): void => {
    seagull.volume = 0.05 + Math.random() * 0.15
    seagull.playbackRate = 0.85 + Math.random() * 0.3
    seagull.currentTime = Math.random() * Math.max(0, seagull.duration || 180)
    seagull.play().catch(() => {
      /* ignore autoplay restrictions */
    })
    const duration = 2000 + Math.random() * 3000
    seagullTimer = window.setTimeout(stopAndScheduleNext, duration)
  }

  playNext()
}

function launch(key: string): void {
  const music = getElement<HTMLAudioElement>('bg-music')
  if (music.paused) {
    music.volume = 0.5
    music.play().catch(() => {
      /* ignore autoplay restrictions */
    })
    const waves = document.getElementById('waves') as HTMLAudioElement | null
    if (waves) {
      waves.volume = 0.3
      waves.play().catch(() => {
        /* ignore autoplay restrictions */
      })
    }
    startSeagulls()
  }

  heroKey = key
  const hero = HEROES[key]
  try {
    localStorage.setItem('rdr_hero', key)
  } catch {
    /* ignore storage failures */
  }

  const imgEl = document.getElementById('img-' + key) as HTMLImageElement | null
  const portraitSrc = imgEl && imgEl.complete && imgEl.naturalWidth > 0
    ? imgEl.src
    : key === 'elio'
      ? '/assets/img/ElioPP.png'
      : '/assets/img/EliaPP.png'

  getElement<HTMLImageElement>('dlg-portrait').src = portraitSrc
  getElement<HTMLImageElement>('pop-portrait').src = portraitSrc
  getElement<HTMLDivElement>('dlg-nname').textContent = hero.name
  getElement<HTMLDivElement>('dlg-nrole').textContent = hero.role
  getElement<HTMLHeadingElement>('pop-name').textContent = hero.name
  getElement<HTMLParagraphElement>('pop-role').textContent = hero.popRole
  getElement<HTMLDivElement>('pop-bio').innerHTML = hero.bio

  const flash = getElement<HTMLDivElement>('flash')
  flash.style.opacity = '1'
  window.setTimeout(() => {
    getElement<HTMLDivElement>('screen-pick').classList.add('hidden')
    getElement<HTMLDivElement>('screen-game').classList.add('visible')
    flash.style.opacity = '0'
    initIntroMap()
    startSequence(hero)
  }, 300)
}

declare const L: any

function initIntroMap(): void {
  if (introMap || typeof window === 'undefined') return
  if (typeof L === 'undefined') return

  introMap = L.map('intro-map', {
    center: [48.580, -1.960],
    zoom: 11,
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false
  })

  L.tileLayer(
    'https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=f502ddf6-6ffb-4c59-8011-fabcd3118f0c',
    { maxZoom: 18, attribution: '' }
  ).addTo(introMap)

  INTRO_NPCS.forEach((npc, index) => {
    const icon = L.divIcon({
      className: '',
      html:
        `<div style="display:flex;flex-direction:column;align-items:center;animation:npcFloat ${2 + index * 0.2}s ease-in-out infinite;">
          <div style="width:44px;height:44px;border-radius:50%;border:3px solid ${npc.color};background:rgba(18,14,36,0.9);display:flex;align-items:center;justify-content:center;font-size:20px;box-shadow:0 0 12px rgba(0,0,0,0.5);">${npc.icon}</div>
          <div style="background:rgba(18,14,36,0.9);border:1px solid ${npc.color};color:#fff;font-size:9px;font-weight:800;padding:2px 7px;border-radius:8px;margin-top:3px;white-space:nowrap;font-family:Nunito,sans-serif;">${npc.name}</div>
        </div>`,
      iconSize: [60, 65],
      iconAnchor: [30, 62]
    })
    L.marker([npc.lat, npc.lng], { icon }).addTo(introMap)
  })
}

function startSequence(hero: Hero): void {
  const video = getElement<HTMLVideoElement>('the-video')
  const wrap = getElement<HTMLDivElement>('vid-wrap')
  const skipButton = getElement<HTMLDivElement>('skip-btn')

  video.src = hero.video
  video.load()

  const onCanPlay = (): void => {
    video.removeEventListener('canplay', onCanPlay)
    video.play().catch(() => {
      /* ignore */
    })
    requestAnimationFrame(() => {
      wrap.classList.add('show')
      skipButton.classList.add('show')
    })
    window.setTimeout(() => startDlg(hero.lines), 1200)
  }

  video.addEventListener('canplay', onCanPlay)
  window.setTimeout(() => {
    if (!wrap.classList.contains('show')) {
      video.play().catch(() => {
        /* ignore */
      })
      wrap.classList.add('show')
      skipButton.classList.add('show')
      window.setTimeout(() => startDlg(hero.lines), 1200)
    }
  }, 800)
}

function startDlg(lines: string[]): void {
  dlgLines = lines
  dlgIdx = 0

  const dots = getElement<HTMLDivElement>('dlg-dots')
  dots.innerHTML = ''
  lines.forEach((_, i) => {
    const dot = document.createElement('div')
    dot.className = 'dd' + (i === 0 ? ' on' : '')
    dot.id = 'idxd' + i
    dots.appendChild(dot)
  })

  getElement<HTMLDivElement>('dlg').classList.add('open')
  typeIt(lines[0])
}

function advDlg(): void {
  const txt = getElement<HTMLDivElement>('dlg-txt')
  if (txt.dataset.typing === '1') {
    if (dlgTimer !== null) {
      window.clearInterval(dlgTimer)
      dlgTimer = null
    }
    txt.textContent = dlgLines[dlgIdx]
    txt.dataset.typing = '0'
    return
  }

  dlgIdx += 1
  if (dlgIdx >= dlgLines.length) {
    closeDlg()
    showPopup()
    return
  }

  dlgLines.forEach((_, index) => {
    const dot = document.getElementById('idxd' + index)
    if (dot) {
      dot.className = 'dd' + (index < dlgIdx ? ' done' : index === dlgIdx ? ' on' : '')
    }
  })

  typeIt(dlgLines[dlgIdx])
}

function typeIt(text: string): void {
  if (dlgTimer !== null) {
    window.clearInterval(dlgTimer)
  }

  const txt = getElement<HTMLDivElement>('dlg-txt')
  txt.textContent = ''
  txt.dataset.typing = '1'
  txt.dataset.full = text

  let i = 0
  dlgTimer = window.setInterval(() => {
    if (i >= text.length) {
      if (dlgTimer !== null) {
        window.clearInterval(dlgTimer)
        dlgTimer = null
      }
      txt.dataset.typing = '0'
      return
    }
    txt.textContent += text[i++]
  }, 24)
}

function closeDlg(): void {
  getElement<HTMLDivElement>('dlg').classList.remove('open')
  if (dlgTimer !== null) {
    window.clearInterval(dlgTimer)
    dlgTimer = null
  }
}

function skipVideo(): void {
  const video = document.getElementById('the-video') as HTMLVideoElement | null
  const skip = document.getElementById('skip-btn')
  if (video && video.duration) {
    video.currentTime = Math.max(0, video.duration - 0.1)
  }
  skip?.classList.remove('show')
}

function showPopup(): void {
  getElement<HTMLDivElement>('hero-popup').classList.add('show')
  window.setTimeout(() => {
    getElement<HTMLDivElement>('pop-xp').classList.add('go')
  }, 300)
}

function closePopup(): void {
  getElement<HTMLDivElement>('hero-popup').classList.remove('show')
  getElement<HTMLDivElement>('pop-xp').classList.remove('go')
}

function goToGame(): void {
  if (!heroKey) return
  const flash = getElement<HTMLDivElement>('flash')
  flash.style.opacity = '1'
  window.setTimeout(() => {
    window.location.href = `/jeu.html?hero=${heroKey}`
  }, 300)
}

function attachEvents(): void {
  document.querySelectorAll<HTMLDivElement>('.hero-card').forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.dataset.hero
      if (key) launch(key)
    })
  })

  getElement<HTMLButtonElement>('start-game').addEventListener('click', goToGame)
  getElement<HTMLButtonElement>('pop-close').addEventListener('click', closePopup)
  getElement<HTMLDivElement>('skip-btn').querySelector('button')?.addEventListener('click', skipVideo)

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' || event.code === 'Enter') {
      event.preventDefault()
      if (getElement<HTMLDivElement>('dlg').classList.contains('open')) {
        advDlg()
      }
    }
  })

  getElement<HTMLDivElement>('dlg').addEventListener('click', (event) => {
    if (!(event.target as HTMLElement).closest('.dlg-x')) {
      advDlg()
    }
  })
}

attachEvents()
