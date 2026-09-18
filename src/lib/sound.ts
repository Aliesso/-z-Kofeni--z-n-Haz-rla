let audioCtx: AudioContext | null = null;
let enabled = true;

try {
  const stored = localStorage.getItem('coffee-sound-enabled');
  if (stored !== null) enabled = stored === 'true';
} catch {
  // localStorage unavailable (private mode, etc.) — keep default
}

function getContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return null;
  if (!audioCtx) {
    audioCtx = new AudioCtor();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled() {
  return enabled;
}

export function setSoundEnabled(value: boolean) {
  enabled = value;
  try {
    localStorage.setItem('coffee-sound-enabled', String(value));
  } catch {
    // ignore persistence failure
  }
  if (value) {
    getContext();
  }
}

interface ToneOptions {
  freq: number;
  start: number;
  duration: number;
  type?: OscillatorType;
  peakGain?: number;
}

function scheduleTone(ctx: AudioContext, master: GainNode, { freq, start, duration, type = 'sine', peakGain = 0.2 }: ToneOptions) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

  const t0 = ctx.currentTime + start;
  gain.gain.setValueAtTime(0, t0);
  gain.gain.linearRampToValueAtTime(peakGain, t0 + Math.min(0.015, duration * 0.3));
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);

  osc.connect(gain);
  gain.connect(master);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function play(build: (ctx: AudioContext, master: GainNode) => void) {
  if (!enabled) return;
  const ctx = getContext();
  if (!ctx) return;
  const master = ctx.createGain();
  master.gain.value = 1;
  master.connect(ctx.destination);
  build(ctx, master);
}

export function playAddSound() {
  play((ctx, master) => {
    scheduleTone(ctx, master, { freq: 640, start: 0, duration: 0.09, type: 'triangle', peakGain: 0.14 });
    scheduleTone(ctx, master, { freq: 880, start: 0.06, duration: 0.11, type: 'triangle', peakGain: 0.12 });
  });
}

export function playRemoveSound() {
  play((ctx, master) => {
    scheduleTone(ctx, master, { freq: 420, start: 0, duration: 0.1, type: 'sine', peakGain: 0.12 });
    scheduleTone(ctx, master, { freq: 280, start: 0.05, duration: 0.12, type: 'sine', peakGain: 0.1 });
  });
}

export function playMaxSound() {
  play((ctx, master) => {
    scheduleTone(ctx, master, { freq: 220, start: 0, duration: 0.09, type: 'square', peakGain: 0.08 });
  });
}

export function playSendSound() {
  play((ctx, master) => {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      scheduleTone(ctx, master, { freq, start: i * 0.09, duration: 0.28, type: 'sine', peakGain: 0.16 });
    });
    scheduleTone(ctx, master, { freq: 1567.98, start: 0.32, duration: 0.55, type: 'sine', peakGain: 0.1 });
  });
}
