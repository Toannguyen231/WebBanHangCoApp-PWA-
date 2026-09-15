// Utility to play subtle micro-interaction sounds
let tapAudio = null
let chimeAudio = null

export function playWoodTap() {
  try {
    if (!tapAudio) {
      tapAudio = new Audio('/assets/audio/wood-tap.wav')
      tapAudio.volume = 0.25
    } else {
      tapAudio.currentTime = 0
    }
    tapAudio.play().catch(() => {})
  } catch {
    // Ignore audio autoplay restrictions
  }
}

export function playSuccessChime() {
  try {
    if (!chimeAudio) {
      chimeAudio = new Audio('/assets/audio/success-chime.wav')
      chimeAudio.volume = 0.35
    } else {
      chimeAudio.currentTime = 0
    }
    chimeAudio.play().catch(() => {})
  } catch {
    // Ignore
  }
}
