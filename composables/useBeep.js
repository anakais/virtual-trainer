let audioContext = null;
let unlocked = false;

function createContextIfNeeded() {
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioContext = new Ctx();
  }
  return audioContext;
}

export function useBeep() {
  function unlock() {
    try {
      const ctx = createContextIfNeeded();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume?.();
      }
      unlocked = true;
    } catch (_) {}
  }

  function playTone(
    frequency = 880,
    durationMs = 150,
    gainStart = 0.0001,
    gainPeak = 0.3,
  ) {
    try {
      const ctx = createContextIfNeeded();
      if (!ctx || !unlocked) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = frequency;
      gain.gain.value = gainStart;
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      // simple attack/decay envelope
      gain.gain.linearRampToValueAtTime(gainPeak, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationMs / 1000);

      osc.start(now);
      osc.stop(now + durationMs / 1000 + 0.01);
    } catch (_) {}
  }

  async function playBeepPattern() {
    // iOS-like short double beep
    playTone(880, 140);
    await new Promise((r) => setTimeout(r, 120));
    playTone(660, 180);
  }

  function playLegacyBeep() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      const oscillator = ctx.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.value = 432;
      oscillator.connect(ctx.destination);
      oscillator.start();
      setTimeout(() => {
        oscillator.stop();
        ctx.close();
      }, 300);
    } catch (_) {}
  }

  function isUnlocked() {
    return !!unlocked;
  }

  return { unlock, playBeepPattern, playLegacyBeep, isUnlocked };
}
