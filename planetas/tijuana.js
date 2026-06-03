let fontIBM;

let somNoise, somOboe, somSax, somSynth;

let ampNoise, ampOboe, ampSax, ampSynth;

let ampLevelNoise = 0;
let ampLevelOboe = 0;
let ampLevelSax = 0;
let ampLevelSynth = 0;

let gravador, ficheiroGravacao;

let cenaAtiva = 1;

// Cena 1
let cena1bg, cena1bg2, cena1layer1, cena1layer2, cena1layer3;
// Cena 2
let cena2bg, cena2bg2, cena2layer1, cena2layer2;
// Cena 3
let cena3bg, cena3bg2, cena3layer1, cena3layer2, cena3layer3;

// video
let canvasStream;
let gravadorVideo = null;
let chunkesVideo = [];

function preload() {
    fontIBM = loadFont('../navegacao/fontes/IBMPlexMono-Regular.ttf');

    cena1bg = loadImage('../elementos/tijuana/cena1/bg.png');
    cena1bg2 = loadImage('../elementos/tijuana/cena1/bg2.png');
    cena1layer1 = loadImage('../elementos/tijuana/cena1/layer1.png');
    cena1layer2 = loadImage('../elementos/tijuana/cena1/layer2.png');
    cena1layer3 = loadImage('../elementos/tijuana/cena1/layer3.png');

    cena2bg = loadImage('../elementos/tijuana/cena2/bg.png');
    cena2bg2 = loadImage('../elementos/tijuana/cena2/bg2.png');
    cena2layer1 = loadImage('../elementos/tijuana/cena2/layer1.gif');
    cena2layer2 = loadImage('../elementos/tijuana/cena2/layer2.gif');

    cena3bg = loadImage('../elementos/tijuana/cena3/bg1.png');
    cena3bg2 = loadImage('../elementos/tijuana/cena3/bg2.png');
    cena3layer1 = loadImage('../elementos/tijuana/cena3/layer1.png');
    cena3layer2 = loadImage('../elementos/tijuana/cena3/layer2.png');
    cena3layer3 = loadImage('../elementos/tijuana/cena3/layer3.png');

    somNoise = loadSound('../elementos/sounds/tijuana_noise.mp3');
    somOboe = loadSound('../elementos/sounds/tijuana_oboe.mp3');
    somSax = loadSound('../elementos/sounds/tijuana_sax.mp3');
    somSynth = loadSound('../elementos/sounds/tijuana_synth.mp3');
}

function setup() {
    let container = document.querySelector('.canvas_container');
    let myCanvas = createCanvas(container.clientWidth, container.clientHeight);
    myCanvas.parent('canvas_container');
    myCanvas.mousePressed(() => {
        cenaAtiva = cenaAtiva === 3 ? 1 : cenaAtiva + 1;
    });

    somNoise.setVolume(0);
    somNoise.loop();
    somOboe.setVolume(0);
    somOboe.loop();
    somSax.setVolume(0);
    somSax.loop();
    somSynth.setVolume(0);
    somSynth.loop();

    gravador = new p5.SoundRecorder();

    setTimeout(() => {
        let rawCanvas = document.querySelector('#canvas_container canvas');
        canvasStream = rawCanvas.captureStream(30);
    }, 500);

    ampNoise = new p5.Amplitude();
    ampOboe = new p5.Amplitude();
    ampSax = new p5.Amplitude();
    ampSynth = new p5.Amplitude();

    ampNoise.setInput(somNoise);
    ampOboe.setInput(somOboe);
    ampSax.setInput(somSax);
    ampSynth.setInput(somSynth);
}

function draw() {
    background(0);

    ampLevelNoise = ampNoise.getLevel();
    ampLevelOboe = ampOboe.getLevel();
    ampLevelSax = ampSax.getLevel();
    ampLevelSynth = ampSynth.getLevel();

    if (cenaAtiva === 1) desenharCena1();
    else if (cenaAtiva === 2) desenharCena2();
    else if (cenaAtiva === 3) desenharCena3();
}

function desenharCena1() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    // mapear amplitudes
    let opacity1 = map(ampLevelNoise, 0, 0.3, 150, 255);
    let opacity2 = map(ampLevelOboe, 0, 0.3, 150, 255);
    let opacity3 = map(ampLevelSax, 0, 0.15, 100, 255);
    let opacityBg2 = map(ampLevelSynth, 0, 0.15, 100, 255);

    image(cena1bg, x, y, w, h);
    tint(255, opacity1);
    image(cena1bg2, x, y, w, h);
    noTint();
    tint(255, opacity2);
    image(cena1layer1, x, y, w, h);
    tint(255, opacity2);
    image(cena1layer2, x, y, w, h);
    tint(255, opacity3);
    image(cena1layer3, x, y, w, h);
    noTint();
}

function desenharCena2() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    // mapear amplitudes
    let opacityBg2 = map(ampLevelSynth, 0, 0.3, 100, 255);
    let opacity1 = map(ampLevelNoise, 0, 0.3, 150, 255);
    let opacity2 = map(ampLevelOboe, 0, 0.3, 150, 255);
    let opacity3 = map(ampLevelSax, 0, 0.2, 75, 255);

    image(cena2bg, x, y, w, h);
    tint(255, opacity1);
    image(cena2bg2, x, y, w, h);
    tint(255, opacity3);
    image(cena2layer1, x, y, w, h);
    tint(255, opacity3);
    image(cena2layer2, x, y, w, h);
    noTint();
}

function desenharCena3() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    // mapear amplitudes
    let opacityBg2 = map(ampLevelSynth, 0, 0.2, 100, 255);
    let opacity1 = map(ampLevelNoise, 0, 0.2, 30, 255);
    let opacity2 = map(ampLevelOboe, 0, 0.2, 150, 255);
    let opacity3 = map(ampLevelSax, 0, 0.2, 75, 255);

    image(cena3bg, x, y, w, h);
    tint(255, opacity1);
    image(cena3bg2, x, y, w, h);
    tint(255, opacityBg2);
    image(cena3layer1, x, y, w, h);
    tint(255, opacity3);
    image(cena3layer2, x, y, w, h);
    tint(255, opacity3);
    image(cena3layer3, x, y, w, h);
    noTint();
}

function windowResized() {
    let container = document.getElementById('canvas_container');
    resizeCanvas(container.clientWidth, container.clientHeight);
}




// botoes som

let botoesAcao = document.querySelectorAll('.btn_action');

botoesAcao.forEach(botao => {
    let botaoClicado = false;
    if (botao.id === 'btn_rec') return;

    botao.addEventListener('mouseover', () => {
        botao.style.cursor = 'pointer';
        botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(230%)';
    });

    botao.addEventListener('mouseout', () => {
        if (botaoClicado === false) {
            botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(130%)';
        } else {
            botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(300%)';
        }
    });

    botao.addEventListener('click', () => {
        botaoClicado = !botaoClicado;

        if (botao.id === 'btn_bx') {
            if (somNoise && somNoise.isLoaded()) {
                somNoise.setVolume(botaoClicado ? parseFloat(document.getElementById('vol_bx').value) : 0);
            }
        }
        if (botao.id === 'btn_bs') {
            if (somOboe && somOboe.isLoaded()) {
                somOboe.setVolume(botaoClicado ? parseFloat(document.getElementById('vol_bs').value) : 0);
            }
        }
        if (botao.id === 'btn_bt') {
            if (somSax && somSax.isLoaded()) {
                somSax.setVolume(botaoClicado ? parseFloat(document.getElementById('vol_bt').value) : 0);
            }
        }
        if (botao.id === 'btn_ba') {
            if (somSynth && somSynth.isLoaded()) {
                somSynth.setVolume(botaoClicado ? parseFloat(document.getElementById('vol_ba').value) : 0);
            }
        }
    });
});
// voltar
let btnVoltar = document.getElementById('btn_vl');

if (btnVoltar) {
    btnVoltar.addEventListener('mouseover', () => {
        btnVoltar.style.fontSize = '20px';
        btnVoltar.style.cursor = 'pointer';
    });
    btnVoltar.addEventListener('mouseout', () => {
        btnVoltar.style.fontSize = '16px';
    });
    btnVoltar.addEventListener('click', () => {
        window.location.href = '../index.html';
    });
}


// gravação
let aGravar = false;
const corNormal = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))";
const corHover = "linear-gradient(rgba(255, 50, 50, 0.4), rgba(255, 50, 50, 0.4))";
const corGravar = "linear-gradient(rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.8))";

let btnRec = document.getElementById('btn_rec');

if (btnRec) {
    btnRec.style.filter = "none";

    btnRec.addEventListener('mouseover', () => {
        if (!aGravar) btnRec.style.setProperty('--pelicula', corHover);
    });
    btnRec.addEventListener('mouseout', () => {
        if (!aGravar) btnRec.style.setProperty('--pelicula', corNormal);
    });

    btnRec.addEventListener('click', () => {
        if (typeof p5 !== 'undefined' && !gravador) gravador = new p5.SoundRecorder();
        if (!gravador) return;

        if (!aGravar) {
            ficheiroGravacao = new p5.SoundFile();
            gravador.record(ficheiroGravacao);

            chunkesVideo = [];
            let audioCtx = getAudioContext();
            let destination = audioCtx.createMediaStreamDestination();

            [somNoise, somOboe, somSax, somSynth].forEach(som => {
                if (som && som.isLoaded()) {
                    som.connect(destination);
                }
            });

            let tracksVideo = canvasStream.getVideoTracks();
            let tracksAudio = destination.stream.getAudioTracks();
            let streamCombinado = new MediaStream([...tracksVideo, ...tracksAudio]);

            gravadorVideo = new MediaRecorder(streamCombinado, { mimeType: 'video/webm;codecs=vp8,opus' });
            gravadorVideo.ondataavailable = e => { if (e.data.size > 0) chunkesVideo.push(e.data); };
            gravadorVideo.start(100);

            aGravar = true;
            btnRec.innerText = "STOP";
            btnRec.style.setProperty('--pelicula', corGravar);
            btnRec.classList.add('gravando');

        } else {
            gravador.stop();
            gravadorVideo.stop();

            gravadorVideo.onstop = () => {
                let blobFinal = new Blob(chunkesVideo, { type: 'video/webm' });
                guardarNaDB(blobFinal);
            };

            aGravar = false;
            btnRec.innerText = "REC";
            btnRec.style.setProperty('--pelicula', corNormal);
            btnRec.classList.remove('gravando');
        }
    });
}

// sliders
let sliderBx = document.getElementById('vol_bx');
if (sliderBx) sliderBx.addEventListener('input', () => {
    if (somNoise && somNoise.isLoaded()) somNoise.setVolume(parseFloat(sliderBx.value));
});

let sliderBs = document.getElementById('vol_bs');
if (sliderBs) sliderBs.addEventListener('input', () => {
    if (somOboe && somOboe.isLoaded()) somOboe.setVolume(parseFloat(sliderBs.value));
});

let sliderBt = document.getElementById('vol_bt');
if (sliderBt) sliderBt.addEventListener('input', () => {
    if (somSax && somSax.isLoaded()) somSax.setVolume(parseFloat(sliderBt.value));
});

let sliderBa = document.getElementById('vol_ba');
if (sliderBa) sliderBa.addEventListener('input', () => {
    if (somSynth && somSynth.isLoaded()) somSynth.setVolume(parseFloat(sliderBa.value));
});

//gravações video
function abrirDB() {
    return new Promise((resolve, reject) => {
        let req = indexedDB.open('GravacoesPlanetas', 1);
        req.onupgradeneeded = e => {
            e.target.result.createObjectStore('gravacoes', { keyPath: 'id', autoIncrement: true });
        };
        req.onsuccess = e => resolve(e.target.result);
        req.onerror = e => reject(e.target.error);
    });
}

async function guardarNaDB(blob) {
    let db = await abrirDB();
    let tx = db.transaction('gravacoes', 'readwrite');
    let store = tx.objectStore('gravacoes');

    let allRecordings = await new Promise((resolve, reject) => {
        let req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });

    if (allRecordings.length >= 5) {
        store.delete(allRecordings[0].id);
    }

    store.add({
        planeta: 'TIJUANA',
        data: new Date().toLocaleDateString(),
        video: blob
    });
    tx.oncomplete = () => {
        btnRec.innerText = "SAVED";
        setTimeout(() => btnRec.innerText = "REC", 1500);
    };
}