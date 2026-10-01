const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcMp3 = path.join(__dirname, '..', 'public', 'assets', 'kiss-voice-note.mp3');
const tempDir = path.join(__dirname, '..', 'temp_kisses');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// 1. Convert to WAV and trim silence to get the exact core human kiss
const trimmedKissWav = path.join(tempDir, 'kiss_single.wav');
execSync(`ffmpeg -y -i "${srcMp3}" -af "silenceremove=start_periods=1:start_duration=0.01:start_threshold=-38dB,areverse,silenceremove=start_periods=1:start_duration=0.05:start_threshold=-38dB,areverse" -ar 44100 -ac 1 "${trimmedKissWav}"`);

// 2. Create 11 variations with natural sweet pitch/speed/volume variations
// (like a real person kissing someone repeatedly with affection: mwah, mwah, mwah...)
const kissList = [];
const kissFiles = [];

// Slight pitch & tempo adjustments for 11 distinct kisses
const variations = [
  { tempo: 1.05, pitch: 1.00, pad: 0.15 }, // 1
  { tempo: 1.10, pitch: 1.03, pad: 0.12 }, // 2
  { tempo: 1.08, pitch: 0.98, pad: 0.14 }, // 3
  { tempo: 1.15, pitch: 1.02, pad: 0.10 }, // 4
  { tempo: 1.12, pitch: 1.05, pad: 0.10 }, // 5
  { tempo: 1.18, pitch: 0.99, pad: 0.10 }, // 6
  { tempo: 1.14, pitch: 1.03, pad: 0.12 }, // 7
  { tempo: 1.10, pitch: 0.97, pad: 0.15 }, // 8
  { tempo: 1.15, pitch: 1.01, pad: 0.12 }, // 9
  { tempo: 1.12, pitch: 1.04, pad: 0.18 }, // 10
  { tempo: 0.95, pitch: 1.00, pad: 0.40 }, // 11 (big, loving finale kiss)
];

variations.forEach((v, index) => {
  const kissPath = path.join(tempDir, `kiss_${index + 1}.wav`);
  // atempo and rubberband/asetrate for pitch
  const sampleRate = Math.round(44100 * v.pitch);
  execSync(`ffmpeg -y -i "${trimmedKissWav}" -af "asetrate=${sampleRate},aresample=44100,atempo=${v.tempo},apad=pad_dur=${v.pad}" "${kissPath}"`);
  kissFiles.push(kissPath);
  kissList.push(`file '${kissPath}'`);
});

const concatListFile = path.join(tempDir, 'list.txt');
fs.writeFileSync(concatListFile, kissList.join('\n'));

// 3. Concatenate all 11 kisses into final MP3
const finalMp3 = path.join(__dirname, '..', 'public', 'assets', 'kiss-voice-note.mp3');
execSync(`ffmpeg -y -f concat -safe 0 -i "${concatListFile}" -c:a libmp3lame -q:a 2 "${finalMp3}"`);

// 4. Update base64 in kissAudioData.ts
const b64 = fs.readFileSync(finalMp3).toString('base64');
const tsCode = `export const HUMAN_KISS_AUDIO_BASE64 = "data:audio/mp3;base64,${b64}";\n`;
fs.writeFileSync(path.join(__dirname, '..', 'src', 'config', 'kissAudioData.ts'), tsCode);

// Get final duration
const duration = execSync(`ffprobe -i "${finalMp3}" -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
console.log(`Generated 11 real human kisses successfully! Total Duration: ${duration}s`);

// Clean up tempDir
fs.rmSync(tempDir, { recursive: true, force: true });
