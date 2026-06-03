let imgBg, imgStars, imgNave, imgPlaneta;
let fontIBM;

let somBass, somBateria, somSax, somSax2;

let ampBass, ampBateria, ampSax, ampSax2;

let ampLevelBass = 0;
let ampLevelBateria = 0;
let ampLevelSax = 0;
let ampLevelSax2 = 0;

let cenaAtiva = 1;

let gravador, ficheiroGravacao;

//para o vídeo
let canvasStream;
let gravadorVideo = null;
let chunkesVideo = [];

function preload() {
    fontIBM = loadFont('../navegacao/fontes/IBMPlexMono-Regular.ttf');

    //cena1 Marte 
    cena1bg = loadImage('../elementos/marte/cena1/bg.png');
    cena1bg2 = loadImage('../elementos/marte/cena1/bg2.png');
    cena1layer = loadImage('../elementos/marte/cena1/layer1.png');
    cena1layer2 = loadImage('../elementos/marte/cena1/layer2.png');

    //cena2 Marte
    cena2bg = loadImage('../elementos/marte/cena2/bg.png');
    cena2bg2 = loadImage('../elementos/marte/cena2/bg2.png');
    cena2layer1 = loadImage('../elementos/marte/cena2/layer1.png');
    cena2layer2 = loadImage('../elementos/marte/cena2/layer2.png');
    cena2layer3 = loadImage('../elementos/marte/cena2/layer3.png');
    //cena3 Marte
    cena3bg = loadImage('../elementos/marte/cena3/bg.png');
    cena3bg2 = loadImage('../elementos/marte/cena3/bg2.png');
    cena3layer1 = loadImage('../elementos/marte/cena3/layer1.png');
    cena3layer2 = loadImage('../elementos/marte/cena3/layer2.png');


    somBass = loadSound('../elementos/sounds/marte_bass.mp3');
    somBateria = loadSound('../elementos/sounds/marte_drum.mp3');
    somSax = loadSound('../elementos/sounds/marte_sax1.mp3');
    somSax2 = loadSound('../elementos/sounds/marte_sax2.mp3');
}

function setup() {
    let container = document.querySelector('.canvas_container');
    let myCanvas = createCanvas(container.clientWidth, container.clientHeight);
    myCanvas.parent('canvas_container');
    myCanvas.mousePressed(() => {
        cenaAtiva = cenaAtiva === 3 ? 1 : cenaAtiva + 1;
    });

    let px = width * 0.05;
    let bw = 50;
    let bh = 50;
    let gap = 20;

    somBass.setVolume(0);
    somBass.loop();
    somBateria.setVolume(0);
    somBateria.loop();
    somSax.setVolume(0);
    somSax.loop();
    somSax2.setVolume(0);
    somSax2.loop();

    gravador = new p5.SoundRecorder();

    setTimeout(() => {
        let rawCanvas = document.querySelector('#canvas_container canvas');
        canvasStream = rawCanvas.captureStream(30);
    }, 500);

    gravador = new p5.SoundRecorder();

    ampBass = new p5.Amplitude();
    ampBateria = new p5.Amplitude();
    ampSax = new p5.Amplitude();
    ampSax2 = new p5.Amplitude();

    ampBass.setInput(somBass);
    ampBateria.setInput(somBateria);
    ampSax.setInput(somSax);
    ampSax2.setInput(somSax2);
}

function draw() {
    background(0);

    ampLevelBass = ampBass.getLevel();
    ampLevelBateria = ampBateria.getLevel();
    ampLevelSax = ampSax.getLevel();
    ampLevelSax2 = ampSax2.getLevel();

    if (cenaAtiva === 1) desenharCena1();
    else if (cenaAtiva === 2) desenharCena2();
    else if (cenaAtiva === 3) desenharCena3();
}

function desenharCena1() { //elevador
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;
    // mapear amplitudes
    let op1 = map(ampLevelBass, 0, 0.4, 30, 255);
    let op2 = map(ampLevelBateria, 0, 0.4, 30, 255);
    let op3 = map(ampLevelSax, 0, 0.4, 20, 255);
    let op4 = map(ampLevelSax2, 0, 0.4, 20, 255);

    image(cena1bg, x, y, w, h);
    tint(255, op2);
    image(cena1bg2, x, y, w, h);
    tint(255, op4);
    image(cena1layer, x, y, w, h);
    tint(255, op1);
    image(cena1layer2, x, y, w, h);
    noTint();
}

function desenharCena2() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    // mapear amplitudes
    let op1 = map(ampLevelBass, 0, 0.2, 100, 255);
    let op2 = map(ampLevelBateria, 0, 0.2, 100, 255);
    let op3 = map(ampLevelSax, 0, 0.2, 150, 255);
    let op4 = map(ampLevelSax2, 0, 0.2, 150, 255);

    image(cena2bg, x, y, w, h);
    tint(255, op1);
    image(cena2bg2, x, y, w, h);
    tint(255, op2);
    image(cena2layer1, x, y, w, h);
    tint(255, op1);
    image(cena2layer2, x, y, w, h);
    tint(255, op4);
    image(cena2layer3, x, y, w, h);
    noTint();
}

function desenharCena3() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    // mapear amplitudes
    let op1 = map(ampLevelBass, 0, 0.3, 80, 255);
    let op2 = map(ampLevelBateria, 0, 0.3, 80, 255);
    let op3 = map(ampLevelSax, 0, 0.3, 80, 255);

    image(cena3bg, x, y, w, h);
    tint(255, op2);
    image(cena3bg2, x, y, w, h);
    tint(255, op1);
    image(cena3layer1, x, y, w, h);
    tint(255, op3);
    image(cena3layer2, x, y, w, h);
    noTint();
}


function windowResized() {
    let container = document.getElementById('canvas_container');
    resizeCanvas(container.clientWidth, container.clientHeight);
}

let botoesAcao = document.querySelectorAll('.btn_action');


botoesAcao.forEach(botao => {

    let botaoClicado = false;

    if (botao.id === 'btn_rec') return;

    // hover
    botao.addEventListener('mouseover', () => {
        botao.style.cursor = 'pointer';

        botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(230%)';;
        //botao.style.backgroundColor = '#d95a38';

    });


    botao.addEventListener('mouseout', () => {


        if (botaoClicado === false) {
            //botao.style.backgroundColor = '#fa7f5d';
            botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(130%)';
        } else if (botaoClicado === true) {
            //botao.style.backgroundColor = '#FF3131';
            botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(300%)';
        }

    });


    botao.addEventListener('click', () => {
        botaoClicado = !botaoClicado;


        if (botao.id === 'btn_bx') {
            if (somBass && somBass.isLoaded()) {
                if (botaoClicado === true) {
                    somBass.setVolume(parseFloat(sliderBx.value));
                } else {
                    somBass.setVolume(0);
                }
            }
        }

        if (botao.id === 'btn_bs') {
            if (somBateria && somBateria.isLoaded()) {
                if (botaoClicado === true) {
                    somBateria.setVolume(parseFloat(sliderBt.value));
                } else {
                    somBateria.setVolume(0);
                }
            }
        }

        if (botao.id === 'btn_bt') {
            if (somSax && somSax.isLoaded()) {
                if (botaoClicado === true) {
                    somSax.setVolume(parseFloat(sliderSx.value));
                } else {
                    somSax.setVolume(0);
                }
            }
        }

        if (botao.id === 'btn_ba') {
            if (somSax2 && somSax2.isLoaded()) {
                if (botaoClicado === true) {
                    somSax2.setVolume(parseFloat(sliderSx2.value));
                } else {
                    somSax2.setVolume(0);
                }
            }
        }



        if (botaoClicado === true) {
            //botao.style.backgroundColor = '#FF3131'; 
        } else {
            //botao.style.backgroundColor = '#d95a38'; 
        }

    });
});


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
        if (typeof p5 !== 'undefined' && !gravador) {
            gravador = new p5.SoundRecorder();
        }
        if (!gravador) return;

        if (!aGravar) {

            ficheiroGravacao = new p5.SoundFile();
            gravador.record(ficheiroGravacao);


            chunkesVideo = [];
            let audioCtx = getAudioContext();
            let destination = audioCtx.createMediaStreamDestination();

            [somBass, somBateria, somSax, somSax2].forEach(som => {
                if (som && som.isLoaded()) {
                    //som.disconnect();
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
// volume bx
let sliderBx = document.getElementById('vol_bx');
if (sliderBx) {
    sliderBx.addEventListener('input', () => {
        if (somBass && somBass.isLoaded()) {
            somBass.setVolume(parseFloat(sliderBx.value));
        }
    });
}

// volume bs
let sliderBs = document.getElementById('vol_bs');
if (sliderBs) {
    sliderBs.addEventListener('input', () => {
        if (somBateria && somBateria.isLoaded()) {
            somBateria.setVolume(parseFloat(sliderBs.value));
        }
    });
}

// volume bt 
let sliderBt = document.getElementById('vol_bt');
if (sliderBt) {
    sliderBt.addEventListener('input', () => {
        if (somSax && somSax.isLoaded()) {
            somSax.setVolume(parseFloat(sliderBt.value));
        }
    });
}

// volume ba (
let sliderBa = document.getElementById('vol_ba');
if (sliderBa) {
    sliderBa.addEventListener('input', () => {
        if (somSax2 && somSax2.isLoaded()) {
            somSax2.setVolume(parseFloat(sliderBa.value));
        }
    });
}

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
        planeta: 'MARTE',
        data: new Date().toLocaleDateString(),
        video: blob
    });
    tx.oncomplete = () => {
        btnRec.innerText = "SAVED";
        setTimeout(() => btnRec.innerText = "REC", 1500);
    };
}