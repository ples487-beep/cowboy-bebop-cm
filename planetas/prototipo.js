let bass, drums, sax;
let bassLoop, drumsLoop, saxLoop;

let bassOn = false;
let drumsOn = false;
let saxOn = false;

// ===== START AUDIO =====
async function startAudio() {
  await Tone.start();

  Tone.Transport.bpm.value = 110;

  // ===== BASS =====
  bass = new Tone.MonoSynth({
    oscillator: { type: "square" },
    envelope: { attack: 0.05, decay: 0.2, sustain: 0.4, release: 0.8 }
  }).toDestination();

  bassLoop = new Tone.Loop((time) => {
    bass.triggerAttackRelease("C2", "8n", time);
  }, "4n");

  // ===== DRUMS =====
  drums = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.1, sustain: 0 }
  }).toDestination();

  drumsLoop = new Tone.Loop((time) => {
    drums.triggerAttackRelease("16n", time);
  }, "8n");

  // ===== SAX =====
  sax = new Tone.Synth({
    oscillator: { type: "sawtooth" },
    envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 0.5 }
  }).toDestination();

  let scale = ["C4", "Eb4", "F4", "G4", "Bb4"];

  saxLoop = new Tone.Loop((time) => {
    let note = scale[Math.floor(Math.random() * scale.length)];
    sax.triggerAttackRelease(note, "8n", time);
  }, "4n");

  Tone.Transport.start();
}

// ===== TOGGLES =====
function toggleBass() {
  if (!bassLoop) return;
  bassOn = !bassOn;
  bassOn ? bassLoop.start(0) : bassLoop.stop();
  document.getElementById("bass").innerText = bassOn ? "BASS ON" : "BASS";
}

function toggleDrums() {
  if (!drumsLoop) return;
  drumsOn = !drumsOn;
  drumsOn ? drumsLoop.start(0) : drumsLoop.stop();
  document.getElementById("drums").innerText = drumsOn ? "DRUMS ON" : "DRUMS";
}

function toggleSax() {
  if (!saxLoop) return;
  saxOn = !saxOn;
  saxOn ? saxLoop.start(0) : saxLoop.stop();
  document.getElementById("sax").innerText = saxOn ? "SAX ON" : "SAX";
}

// ===== BOTÕES (FORA!) =====
document.getElementById("start").onclick = async () => {
  await startAudio();
};

document.getElementById("bass").onclick = () => {
  toggleBass();
};

document.getElementById("drums").onclick = () => {
  toggleDrums();
};

document.getElementById("sax").onclick = () => {
  toggleSax();
};