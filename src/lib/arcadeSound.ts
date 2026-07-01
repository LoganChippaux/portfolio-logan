// Arcade sounds generated live (Web Audio API) — no dependency or file needed.
// Usage: sfx.click(), sfx.coin(), sfx.start(), sfx.hover(), sfx.powerup()
//        music.toggle()  // plays/stops the main theme

let ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = (window.AudioContext || (window as any).webkitAudioContext) as
      | typeof AudioContext
      | undefined;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

type Wave = OscillatorType;

function beep(
  freq: number,
  duration = 0.08,
  type: Wave = "square",
  gain = 0.08,
  slideTo?: number,
) {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  if (slideTo != null) osc.frequency.exponentialRampToValueAtTime(slideTo, t + duration);
  g.gain.setValueAtTime(gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(g).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration + 0.02);
}

function noiseBurst(duration = 0.15, gain = 0.06) {
  const ac = getCtx();
  if (!ac) return;
  const buf = ac.createBuffer(1, ac.sampleRate * duration, ac.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = ac.createBufferSource();
  const g = ac.createGain();
  g.gain.value = gain;
  src.buffer = buf;
  src.connect(g).connect(ac.destination);
  src.start();
}

export const sfx = {
  click: () => beep(880, 0.05, "square", 0.06),
  hover: () => beep(1320, 0.03, "triangle", 0.03),
  coin: () => {
    beep(988, 0.06, "square", 0.07);
    setTimeout(() => beep(1318, 0.1, "square", 0.07), 55);
  },
  start: () => {
    beep(523, 0.08, "square", 0.07);
    setTimeout(() => beep(659, 0.08, "square", 0.07), 90);
    setTimeout(() => beep(784, 0.08, "square", 0.07), 180);
    setTimeout(() => beep(1047, 0.18, "square", 0.08), 270);
  },
  powerup: () => {
    beep(440, 0.25, "square", 0.07, 1760);
  },
  gameover: () => {
    beep(440, 0.3, "sawtooth", 0.07, 110);
    setTimeout(() => noiseBurst(0.2, 0.05), 200);
  },
};

// ────────────────────────────────────────────────────────────────
// MAIN THEME — looping chiptune (melody + bass)
// ────────────────────────────────────────────────────────────────
// To CHANGE THE MELODY: replace the notes below.
// Each entry = frequency in Hz (0 = silence). Tempo in BPM.
const MELODY = [
  659, 0, 659, 0, 659, 0, 523, 659,
  784, 0, 0, 0, 392, 0, 0, 0,
  523, 0, 0, 392, 0, 0, 330, 0,
  440, 0, 494, 0, 466, 440, 0, 392,
];
const BASS = [
  131, 0, 131, 0, 131, 0, 131, 131,
  98, 0, 0, 0, 98, 0, 0, 0,
  131, 0, 0, 98, 0, 0, 82, 0,
  110, 0, 110, 0, 117, 110, 0, 98,
];
const BPM = 132;

class MainTheme {
  private timer: number | null = null;
  private step = 0;
  private playing = false;
  private masterGain = 0.05;

  start() {
    if (this.playing) return;
    this.playing = true;
    const stepDur = (60 / BPM / 2) * 1000; // 16th notes
    const tick = () => {
      const m = MELODY[this.step % MELODY.length];
      const b = BASS[this.step % BASS.length];
      if (m) beep(m, stepDur / 1000 * 0.9, "square", this.masterGain);
      if (b) beep(b, stepDur / 1000 * 0.95, "triangle", this.masterGain * 1.2);
      this.step++;
      this.timer = window.setTimeout(tick, stepDur);
    };
    tick();
  }

  stop() {
    this.playing = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  toggle() {
    if (this.playing) this.stop();
    else this.start();
    return this.playing;
  }

  get isPlaying() {
    return this.playing;
  }
}

export const music = new MainTheme();
