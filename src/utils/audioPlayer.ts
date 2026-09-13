/**
 * Romantic acoustic wedding music synthesizer for the Habesha Wedding Invitation.
 * Generates an ethereal, soothing acoustic harp/piano progression.
 */

class RomanticAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;

  // Gentle pentatonic/romantic notes in Hz: D major / Ethiopian Tizita minor/major hybrid warm progression
  // D4, F#4, A4, B4, C#5, D5, E5, F#5
  private melodyNotes: number[] = [
    293.66, 369.99, 440.0, 493.88, 554.37, 587.33, 659.25, 739.99,
    587.33, 493.88, 440.0, 369.99, 293.66, 329.63, 369.99, 440.0
  ];
  private step: number = 0;

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number, isBass = false) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm, bell/harp-like soft sine + triangle blend
    osc.type = isBass ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Filter for warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 400 : 1800, now);

    const initialGain = isBass ? 0.25 : 0.18;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(initialGain, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  /**
   * Plays a magical, warm harp glissando when the wax seal breaks and the envelope opens.
   */
  public playUnsealGlissando() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    const harpNotes = [293.66, 369.99, 440.0, 587.33, 739.99, 880.0, 1174.66]; // D4, F#4, A4, D5, F#5, A5, D6
    harpNotes.forEach((note, index) => {
      window.setTimeout(() => {
        this.playTone(note, 2.2);
      }, index * 65);
    });
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.scheduleNextNote();
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying) return;

    const note = this.melodyNotes[this.step % this.melodyNotes.length];
    this.playTone(note, 1.8);

    // Warm root bass note every 4 steps
    if (this.step % 4 === 0) {
      const bassRoots = [146.83, 110.0, 123.47, 98.0]; // D3, A2, B2, G2
      const root = bassRoots[Math.floor(this.step / 4) % bassRoots.length];
      this.playTone(root, 3.2, true);
    }

    this.step++;
    // Tempo: ~750ms between notes for serene, tranquil pacing
    this.timerId = window.setTimeout(this.scheduleNextNote, 720);
  };

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }
}

export const soundManager = new RomanticAudioSynthesizer();
