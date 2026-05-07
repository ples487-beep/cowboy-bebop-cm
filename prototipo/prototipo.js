const ativo = [false, false, false, false];
const loops = [];

const escala = ['D3','F3','G3','Ab3','A3','C4','D4','F4','G4','Ab4','A4','C5'];

function notaAleatoria() {
  return escala[Math.floor(Math.random() * escala.length)];
}

async function toggle(i) {
  await Tone.start(); // obrigatório — o browser bloqueia áudio até o utilizador interagir
  ativo[i] = !ativo[i];
  if (ativo[i]) {
    loops[i].start();
  } else {
    loops[i].stop();
  }
}

// PIANO
const piano = new Tone.Sampler({
  urls: {
    C3: "pianoC3.wav",
    B3: "pianoF3.wav",
    A3: "pianoA3.wav",
    C4: "pianoC4.wav",
  },
  baseUrl: "./piano/",
  onload: () => console.log("piano carregado!")
}).toDestination();

loops[0] = new Tone.Loop(time => {
  piano.triggerAttackRelease(notaAleatoria(), '8n', time);
}, '4n');

// TROMPETE
const trompete = new Tone.Synth({
  oscillator: { type: 'sawtooth' },
  envelope: { attack: 0.05, decay: 0.1, sustain: 0.6, release: 0.4 }
}).toDestination();
trompete.volume.value = -10;

loops[1] = new Tone.Loop(time => {
  if (Math.random() > 0.4) {
    trompete.triggerAttackRelease(notaAleatoria(), '8n', time);
  }
}, '8n');

// BAIXO
const baixo = new Tone.Synth({
  oscillator: { type: 'square' },
  envelope: { attack: 0.01, decay: 0.2, sustain: 0.8, release: 0.5 }
}).toDestination();
baixo.volume.value = -6;

const bassNotas = ['D2','A2','G2','F2'];
let bassIdx = 0;
loops[2] = new Tone.Loop(time => {
  baixo.triggerAttackRelease(bassNotas[bassIdx % bassNotas.length], '4n', time);
  bassIdx++;
}, '4n');

// BATERIA
const kick = new Tone.MembraneSynth().toDestination();
kick.volume.value = -6;
const snare = new Tone.NoiseSynth({
  noise: { type: 'white' },
  envelope: { attack: 0.001, decay: 0.15, sustain: 0, release: 0.1 }
}).toDestination();
snare.volume.value = -12;

const padrao = ['kick','','snare','','kick','kick','snare',''];
let batIdx = 0;
loops[3] = new Tone.Loop(time => {
  const beat = padrao[batIdx % padrao.length];
  if (beat === 'kick') kick.triggerAttackRelease('C1', '8n', time);
  if (beat === 'snare') snare.triggerAttackRelease('8n', time);
  batIdx++;
}, '8n');

Tone.Transport.bpm.value = 120;
Tone.Transport.start();