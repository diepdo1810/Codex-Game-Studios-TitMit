/** Sound parameters are authored alongside gameplay tuning. */
export interface AudioTuning {
  volume: number;
  waterGain: number;
  waterDuration: number;
  waterCutoff: number;
  rewardGain: number;
  rewardDuration: number;
  rewardSpacing: number;
  rewardNotes: readonly number[];
}
/** Event sounds share one output and support existing mute control. */
export interface Soundscape {
  water(): void;
  reward(): void;
  mute(value: boolean): void;
}

/** Creates gentle water noise and a soft reward arpeggio on an injected real audio context. */
export function createSoundscape(context: BaseAudioContext, tuning: AudioTuning): Soundscape {
  const output = context.createGain();
  output.gain.value = tuning.volume;
  output.connect(context.destination);
  return {
    water: () => water(context, output, tuning),
    reward: () => reward(context, output, tuning),
    mute: value => { output.gain.value = value ? 0 : tuning.volume; },
  };
}

function envelope(context: BaseAudioContext, output: GainNode, at: number, duration: number, volume: number): GainNode {
  const gain = context.createGain();
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(volume, at + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
  gain.connect(output);
  return gain;
}

function water(context: BaseAudioContext, output: GainNode, tuning: AudioTuning): void {
  const buffer = context.createBuffer(1, Math.ceil(context.sampleRate * tuning.waterDuration), context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const noise = Math.sin(i * 12.9898) * 43758.5453;
    data[i] = (noise - Math.floor(noise)) * 2 - 1;
  }
  const source = context.createBufferSource(), filter = context.createBiquadFilter();
  const at = context.currentTime;
  source.buffer = buffer;
  filter.type = 'lowpass';
  filter.frequency.value = tuning.waterCutoff;
  const gain = envelope(context, output, at, tuning.waterDuration, tuning.waterGain);
  source.connect(filter).connect(gain);
  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  source.start(at);
  source.stop(at + tuning.waterDuration);
}

function reward(context: BaseAudioContext, output: GainNode, tuning: AudioTuning): void {
  for (const [index, frequency] of tuning.rewardNotes.entries()) {
    const tone = context.createOscillator();
    const at = context.currentTime + index * tuning.rewardSpacing;
    tone.type = 'sine';
    tone.frequency.value = frequency;
    const gain = envelope(context, output, at, tuning.rewardDuration, tuning.rewardGain);
    tone.connect(gain);
    tone.onended = () => { tone.disconnect(); gain.disconnect(); };
    tone.start(at);
    tone.stop(at + tuning.rewardDuration);
  }
}
