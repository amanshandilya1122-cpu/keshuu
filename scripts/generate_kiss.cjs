const fs = require('fs');
const path = require('path');

// WAV header generator helper
function createWavBuffer(sampleRate, samples) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit PCM
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF identifier
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // "fmt " sub-chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size for PCM
  buffer.writeUInt16LE(1, 20); // AudioFormat 1 = PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bytesPerSample * 8, 34);

  // "data" sub-chunk
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write 16-bit PCM samples
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    const intVal = s < 0 ? s * 0x8000 : s * 0x7FFF;
    buffer.writeInt16LE(Math.round(intVal), 44 + i * 2);
  }

  return buffer;
}

// Generate realistic human kiss ("Mwahh") acoustic waveform
function generateHumanKiss() {
  const sampleRate = 44100;
  const totalDuration = 1.8; // seconds
  const totalSamples = Math.floor(sampleRate * totalDuration);
  const samples = new Float32Array(totalSamples);

  // Time milestones
  // 0.0s - 0.25s: Human soft breath & lips pressing together ("Mmm")
  // 0.25s - 0.32s: Wet lip suction & crisp smack release
  // 0.32s - 0.70s: Vocal release "wah" with human formants F1/F2/F3
  // 0.70s - 1.50s: Gentle warm human exhalation breath & soft whisper sigh

  // State variables for vocal tract formant filters (2-pole resonators)
  class Resonator {
    constructor(freq, bandwidth, gain = 1.0) {
      this.set(freq, bandwidth, gain);
      this.y1 = 0;
      this.y2 = 0;
    }
    set(freq, bandwidth, gain = 1.0) {
      this.gain = gain;
      const r = Math.exp(-Math.PI * bandwidth / sampleRate);
      const theta = 2 * Math.PI * freq / sampleRate;
      this.b1 = 2 * r * Math.cos(theta);
      this.b2 = -r * r;
      this.a0 = (1 - r) * Math.sin(theta);
    }
    process(input) {
      const y = this.a0 * input + this.b1 * this.y1 + this.b2 * this.y2;
      this.y2 = this.y1;
      this.y1 = y;
      return y * this.gain;
    }
  }

  // Male/warm human fundamental frequency (F0) around 130 Hz - 110 Hz
  let phase = 0;
  
  // Resonators for Formants:
  // F1 (300 -> 700 Hz)
  // F2 (900 -> 1350 Hz)
  // F3 (2500 Hz)
  // F4 (3500 Hz)
  const f1 = new Resonator(350, 80, 1.2);
  const f2 = new Resonator(1000, 110, 0.9);
  const f3 = new Resonator(2600, 150, 0.4);
  const fSmack = new Resonator(2200, 400, 1.8);
  const fHighSmack = new Resonator(4200, 600, 1.4);

  // Lip pop click buffer
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    let output = 0;

    // 1. "Mmm" Phase (t: 0.05 to 0.25)
    if (t >= 0.05 && t < 0.25) {
      const p = (t - 0.05) / 0.20;
      const env = Math.sin(p * Math.PI) * 0.15;
      const f0 = 135 - p * 10;
      phase += (2 * Math.PI * f0) / sampleRate;
      // Rich glottal pulse
      const glottal = Math.sin(phase) + 0.4 * Math.sin(phase * 2) + 0.15 * Math.sin(phase * 3);
      // Closed mouth resonance (muffled)
      const hum = f1.process(glottal) * 0.7;
      output += hum * env;
    }

    // 2. The Wet Lip Smack / Suction Release (t: 0.24 to 0.32)
    if (t >= 0.24 && t < 0.34) {
      const st = t - 0.24;
      // High-frequency transient burst of lip separation
      const noise = (Math.random() * 2 - 1);
      const smackEnv = Math.exp(-st / 0.018) * Math.sin(st * 45000);
      const wetNoise = noise * Math.exp(-st / 0.025);
      
      // Dual-resonance smack pop
      const p1 = fSmack.process(smackEnv * 2.2 + wetNoise * 0.8);
      const p2 = fHighSmack.process(wetNoise * 1.2);
      
      output += (p1 + p2 * 0.7) * 0.65;
    }

    // 3. "Wah" Vocalic Release (t: 0.27 to 0.75)
    if (t >= 0.27 && t < 0.75) {
      const vt = (t - 0.27) / 0.48;
      // Human pitch drops naturally at end of word
      const f0 = 130 - vt * 25;
      phase += (2 * Math.PI * f0) / sampleRate;

      // Dynamic formant movement for "W-A-H"
      const curF1 = 350 + vt * 350; // sweeps up to 700
      const curF2 = 900 + vt * 450; // sweeps up to 1350
      f1.set(curF1, 90, 1.2);
      f2.set(curF2, 120, 0.8);

      // Glottal excitation
      const glottal = Math.sin(phase) + 0.45 * Math.sin(phase * 2) + 0.2 * Math.sin(phase * 3);
      const formantFiltered = f1.process(glottal) + f2.process(glottal) + f3.process(glottal * 0.3);

      const vEnv = Math.pow(Math.sin(vt * Math.PI), 0.7) * 0.42;
      output += formantFiltered * vEnv;
    }

    // 4. Intimate Human Breath Exhalation / Sigh (t: 0.35 to 1.6)
    if (t >= 0.35 && t < 1.6) {
      const bt = (t - 0.35) / 1.25;
      const breathNoise = (Math.random() * 2 - 1);
      // Soft bandpass breath
      f3.set(2100 + Math.sin(bt * 4) * 200, 350, 0.5);
      const filteredBreath = f3.process(breathNoise);
      const breathEnv = Math.pow(1 - bt, 2) * 0.16;
      output += filteredBreath * breathEnv;
    }

    // Soft warm limiter / tape saturation
    samples[i] = Math.tanh(output * 1.8) * 0.85;
  }

  return createWavBuffer(sampleRate, samples);
}

// Generate the WAV file
const wavBuffer = generateHumanKiss();
const outputDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Write as kiss-voice-note.mp3 and kiss-voice-note.wav so both work
const wavPath = path.join(outputDir, 'kiss-voice-note.wav');
const mp3Path = path.join(outputDir, 'kiss-voice-note.mp3');

fs.writeFileSync(wavPath, wavBuffer);
fs.writeFileSync(mp3Path, wavBuffer); // Modern browsers play WAV even if named .mp3 or .wav

// Also generate base64 data uri for instant zero-latency embedding
const base64Wav = 'data:audio/wav;base64,' + wavBuffer.toString('base64');
const tsExport = `export const HUMAN_KISS_AUDIO_BASE64 = "${base64Wav}";\n`;
fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'kissAudioData.ts'), tsExport);

console.log('Human kiss audio successfully generated and saved!');
