let fontIBM;

let somBass, somDrone, somBateria, somSax;

let ampBass, ampDrone, ampBateria, ampSax;

let ampLevelBass = 0;
let ampLevelDrone = 0;
let ampLevelBateria = 0;
let ampLevelSax = 0;

let gravador, ficheiroGravacao;

let cenaAtiva = 1;

// Cena 1
let cena1bg, cena1bg2, cena1layer1, cena1layer2;
// Cena 2
let cena2bg, cena2bg2, cena2layer1, cena2layer2;
// Cena 3
let cena3bg, cena3bg2, cena3layer1;


let canvasStream;
let gravadorVideo = null;
let chunkesVideo = [];

function preload() {
    fontIBM = loadFont('../navegacao/fontes/IBMPlexMono-Regular.ttf');

    cena1bg = loadImage('../elementos/ganymede/cena1/bg.png');
    cena1bg2 = loadImage('../elementos/ganymede/cena1/bg2.png');
    cena1layer1 = loadImage('../elementos/ganymede/cena1/layer1.png');
    cena1layer2 = loadImage('../elementos/ganymede/cena1/layer2.png');

    cena2bg = loadImage('../elementos/ganymede/cena2/bg.png');
    cena2bg2 = loadImage('../elementos/ganymede/cena2/bg2.png');
    cena2layer1 = loadImage('../elementos/ganymede/cena2/layer1.png');
    cena2layer2 = loadImage('../elementos/ganymede/cena2/layer2.png');

    cena3bg = loadImage('../elementos/ganymede/cena3/bg1.png');
    cena3bg2 = loadImage('../elementos/ganymede/cena3/bg2.png');
    cena3layer1 = loadImage('../elementos/ganymede/cena3/layer1.png');

    somBass = loadSound('../elementos/sounds/ganymede_bass.mp3');
    somDrone = loadSound('../elementos/sounds/ganymede_drone.mp3');
    somBateria = loadSound('../elementos/sounds/ganymede_drum.mp3');
    somSax = loadSound('../elementos/sounds/ganymede_sax.mp3');
}

function setup() {
    let container = document.querySelector('.canvas_container');
    let myCanvas = createCanvas(container.clientWidth, container.clientHeight);
    myCanvas.parent('canvas_container');

    myCanvas.mousePressed(() => {
        cenaAtiva = cenaAtiva === 3 ? 1 : cenaAtiva + 1;
    });

    somBass.setVolume(0);
    somBass.loop();
    somDrone.setVolume(0);
    somDrone.loop();
    somBateria.setVolume(0);
    somBateria.loop();
    somSax.setVolume(0);
    somSax.loop();

    gravador = new p5.SoundRecorder();

    setTimeout(() => {
        let rawCanvas = document.querySelector('#canvas_container canvas');
        canvasStream = rawCanvas.captureStream(30);
    }, 500);

    ampBass = new p5.Amplitude();
    ampDrone = new p5.Amplitude();
    ampBateria = new p5.Amplitude();
    ampSax = new p5.Amplitude();


    ampBass.setInput(somBass);
    ampDrone.setInput(somDrone);
    ampBateria.setInput(somBateria);
    ampSax.setInput(somSax);
}

function draw() {
    background(0);

    ampLevelBass = ampBass.getLevel();
    ampLevelDrone = ampDrone.getLevel();
    ampLevelBateria = ampBateria.getLevel();
    ampLevelSax = ampSax.getLevel();

    if (cenaAtiva === 1) desenharCena1();
    else if (cenaAtiva === 2) desenharCena2();
    else if (cenaAtiva === 3) desenharCena3();
}

function desenharCena1() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    //mapear amplitudes
    let op1 = map(ampLevelBass, 0, 0.15, 100, 255);
    let op2 = map(ampLevelDrone, 0, 0.15, 100, 255);
    let op3 = map(ampLevelBateria, 0, 0.15, 80, 255);
    let op4 = map(ampLevelSax, 0, 0.15, 80, 255);

    image(cena1bg, x, y, w, h);
    tint(255, op1);
    image(cena1bg2, x, y, w, h);
    tint(255, op3);
    image(cena1layer2, x, y, w, h);
    tint(255, op2);
    image(cena1layer1, x, y, w, h);
    noTint();
}

function desenharCena2() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    //mapear amplitudes
    let op1 = map(ampLevelBass, 0, 0.15, 100, 255);
    let op2 = map(ampLevelDrone, 0, 0.15, 100, 255);
    let op3 = map(ampLevelBateria, 0, 0.15, 80, 255);
    let op4 = map(ampLevelSax, 0, 0.15, 80, 255);

    image(cena2bg, x, y, w, h);
    tint(255, op1);
    image(cena2bg2, x, y, w, h);
    tint(255, op2);
    image(cena2layer1, x, y, w, h);
    noTint();
    image(cena2layer2, x, y, w, h);

}

function desenharCena3() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    //mapear amplitudes
    let op1 = map(ampLevelBass, 0, 0.15, 40, 255);
    let op2 = map(ampLevelDrone, 0, 0.15, 80, 255);
    let op3 = map(ampLevelBateria, 0, 0.15, 80, 255);

    image(cena3bg, x, y, w, h);
    tint(255, op1);
    image(cena3bg2, x, y, w, h);
    tint(255, op2);
    image(cena3layer1, x, y, w, h);
    noTint();
}

function windowResized() {
    let container = document.getElementById('canvas_container');
    resizeCanvas(container.clientWidth, container.clientHeight);
}
// botoes de som
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
            if (somBass && somBass.isLoaded()) {
                somBass.setVolume(botaoClicado ? parseFloat(document.getElementById('vol_bx').value) : 0);
            }
        }
        if (botao.id === 'btn_bs') {
            if (somBateria && somBateria.isLoaded()) {
                somBateria.setVolume(botaoClicado ? parseFloat(document.getElementById('vol_bs').value) : 0);
            }
        }
        if (botao.id === 'btn_bt') {
            if (somDrone && somDrone.isLoaded()) {
                somDrone.setVolume(botaoClicado ? parseFloat(document.getElementById('vol_bt').value) : 0);
            }
        }
        if (botao.id === 'btn_ba') {
            if (somSax && somSax.isLoaded()) {
                somSax.setVolume(botaoClicado ? parseFloat(document.getElementById('vol_ba').value) : 0);
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

            [somBass, somDrone, somBateria, somSax].forEach(som => {
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

// volume

let sliderBx = document.getElementById('vol_bx');
if (sliderBx) sliderBx.addEventListener('input', () => {
    if (somBass && somBass.isLoaded()) somBass.setVolume(parseFloat(sliderBx.value));
});

let sliderBs = document.getElementById('vol_bs');
if (sliderBs) sliderBs.addEventListener('input', () => {
    if (somBateria && somBateria.isLoaded()) somBateria.setVolume(parseFloat(sliderBs.value));
});

let sliderBt = document.getElementById('vol_bt');
if (sliderBt) sliderBt.addEventListener('input', () => {
    if (somDrone && somDrone.isLoaded()) somDrone.setVolume(parseFloat(sliderBt.value));
});

let sliderBa = document.getElementById('vol_ba');
if (sliderBa) sliderBa.addEventListener('input', () => {
    if (somSax && somSax.isLoaded()) somSax.setVolume(parseFloat(sliderBa.value));
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
        planeta: 'GANYMEDE',
        data: new Date().toLocaleDateString(),
        video: blob
    });
    tx.oncomplete = () => {
        btnRec.innerText = "SAVED";
        setTimeout(() => btnRec.innerText = "REC", 1500);
    };
}