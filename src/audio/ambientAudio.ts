/**
 * Web Audio API Ambient Room Tone for THPT A Trần Hưng Đạo Virtual Lobby
 * Produces a warm, dignified, low-frequency atmospheric hum with soft harmonic overtones.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // Audio not supported
    }
  }

  public async start(): Promise<boolean> {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isRunning) return true;

    const now = this.ctx.currentTime;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.045, now + 3); // Very soft volume

    // Low-pass filter for warm, museum-like acoustic damping
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);
    filter.Q.setValueAtTime(1.2, now);

    this.masterGain.connect(filter);
    filter.connect(this.ctx.destination);

    // Fundamental warm drone at 108Hz (A2 harmonic) and 216Hz
    const freqs = [108, 162, 216, 270];
    this.oscillators = [];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      // Subtle detune for natural spatial warmth
      osc.detune.setValueAtTime((idx - 1.5) * 2.5, now);

      const amp = 0.25 / (idx + 1);
      oscGain.gain.setValueAtTime(amp, now);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain!);
      osc.start(now);
      this.oscillators.push(osc);
    });

    this.isRunning = true;
    return true;
  }

  public stop() {
    if (!this.ctx || !this.isRunning || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2);
    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch { /* ignore */ }
      });
      this.oscillators = [];
      this.isRunning = false;
    }, 1300);
  }

  public playGentleChime() {
    if (!this.ctx || this.ctx.state === 'suspended') return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(864, now);
    filter.Q.setValueAtTime(3.0, now);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(432, now + 1.5);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  public getStatus(): boolean {
    return this.isRunning;
  }
}

export const ambientSound = new AmbientSoundEngine();
