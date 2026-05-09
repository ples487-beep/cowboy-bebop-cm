let fontIBM;

let somBass, somBateria, somSax, somSax2;

let gravador, ficheiroGravacao;

let cenaAtiva = 1;

// Cena 1
let cena1bg, cena1bg2, cena1layer1, cena1layer2, cena1layer3;
// Cena 2
let cena2bg, cena2bg2, cena2layer1, cena2layer2;
// Cena 3
let cena3bg, cena3bg2, cena3layer1, cena3layer2, cena3layer3;

function preload() {
    fontIBM = loadFont('../navegação/fontes/IBMPlexMono-Regular.ttf');

    // Cena 1
    cena1bg     = loadImage('../elementos/venus/cena1/bg.png');
    cena1bg2    = loadImage('../elementos/venus/cena1/bg2.png');
    cena1layer1 = loadImage('../elementos/venus/cena1/layer1.png');
    cena1layer2 = loadImage('../elementos/venus/cena1/layer2.png');
    cena1layer3 = loadImage('../elementos/venus/cena1/layer3.png');

    // Cena 2
    cena2bg     = loadImage('../elementos/venus/cena2/bg1.png');
    cena2bg2    = loadImage('../elementos/venus/cena2/bg2.png');
    cena2layer1 = loadImage('../elementos/venus/cena2/layer1.png');
    cena2layer2 = loadImage('../elementos/venus/cena2/layer2.png');

    // Cena 3
    cena3bg     = loadImage('../elementos/venus/cena3/bg1.png');
    cena3bg2    = loadImage('../elementos/venus/cena3/bg2.png');
    cena3layer1 = loadImage('../elementos/venus/cena3/layer1.png');
    cena3layer2 = loadImage('../elementos/venus/cena3/layer2.png');
    cena3layer3 = loadImage('../elementos/venus/cena3/layer3.png');

    somBateria = loadSound('../elementos/sounds/venus_drum.mp3');
    somBass    = loadSound('../elementos/sounds/venus_guitar.mp3');
    somSax     = loadSound('../elementos/sounds/venus_guitar_lead.mp3');
    somSax2    = loadSound('../elementos/sounds/venus_guitar_lead.mp3'); // só tens 3 sons, repete um ou deixa vazio
}

function setup() {
    let container = document.querySelector('.canvas_container');
    let myCanvas = createCanvas(container.clientWidth, container.clientHeight);
    myCanvas.parent('canvas_container');

    somBass.setVolume(0.5);
    gravador = new p5.SoundRecorder(); // ← confirma que está aqui
}

function draw() {
    background(0);
    desenharCena1();

    if (cenaAtiva === 1) desenharCena1();
    else if (cenaAtiva === 2) desenharCena2();
    else if (cenaAtiva === 3) desenharCena3();
}

function desenharCena1() {
    let h = height * 0.9;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    image(cena1bg, x, y, w, h);
    tint(255, 180);
    image(cena1bg2, x, y, w, h);
    tint(255, 220);
    image(cena1layer1, x, y, w, h);
    tint(255, 150);
    image(cena1layer2, x, y, w, h);
    tint(255, 120);
    image(cena1layer3, x, y, w, h);
    noTint();
}

function desenharCena2() {
    let h = height * 0.9;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    image(cena2bg, x, y, w, h);
    tint(255, 180);
    image(cena2bg2, x, y, w, h);
    tint(255, 220);
    image(cena2layer1, x, y, w, h);
    tint(255, 150);
    image(cena2layer2, x, y, w, h);
    noTint();
}

function desenharCena3() {
    let h = height * 0.9;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    image(cena3bg, x, y, w, h);
    tint(255, 160);
    image(cena3bg2, x, y, w, h);
    tint(255, 230);
    image(cena3layer1, x, y, w, h);
    tint(255, 150);
    image(cena3layer2, x, y, w, h);
    tint(255, 120);
    image(cena3layer3, x, y, w, h);
    noTint();
}

function windowResized() {
    let container = document.getElementById('canvas_container');
    resizeCanvas(container.clientWidth, container.clientHeight);
}

function mousePressed() {
    cenaAtiva = cenaAtiva === 3 ? 1 : cenaAtiva + 1;
}

// ==========================================
// BOTÕES DE SOM
// ==========================================
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
            if (somBass && somBass.isLoaded()) { botaoClicado ? somBass.loop() : somBass.pause(); }
        }
        if (botao.id === 'btn_bs') {
            if (somBateria && somBateria.isLoaded()) { botaoClicado ? somBateria.loop() : somBateria.pause(); }
        }
        if (botao.id === 'btn_bt') {
            if (somSax && somSax.isLoaded()) { botaoClicado ? somSax.loop() : somSax.pause(); }
        }
        if (botao.id === 'btn_ba') {
            if (somSax2 && somSax2.isLoaded()) { botaoClicado ? somSax2.loop() : somSax2.pause(); }
        }
    });
});


// ==========================================
// BOTÃO VOLTAR
// ==========================================
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
        window.location.href = '../navegação/index.html';
    });
}


// ==========================================
// BOTÃO REC
// ==========================================
let aGravar = false;
const corNormal = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))";
const corHover  = "linear-gradient(rgba(255, 50, 50, 0.4), rgba(255, 50, 50, 0.4))";
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
            aGravar = true;
            btnRec.innerText = "STOP";
            btnRec.style.setProperty('--pelicula', corGravar);
            btnRec.classList.add('gravando');
        } else {
            gravador.stop();
            aGravar = false;
            btnRec.innerText = "REC";
            btnRec.style.setProperty('--pelicula', corNormal);
            btnRec.classList.remove('gravando');

            setTimeout(() => {
                let blobAudio = ficheiroGravacao.getBlob();
                let reader = new FileReader();
                reader.readAsDataURL(blobAudio);
                reader.onloadend = () => {
                    let gravacoes = JSON.parse(localStorage.getItem('gravacoes') || '[]');
                    gravacoes.push({
                        planeta: 'VENUS',
                        data: new Date().toLocaleDateString(),
                        audio: reader.result
                    });
                    localStorage.setItem('gravacoes', JSON.stringify(gravacoes));
                    btnRec.innerText = "SAVED";
                    setTimeout(() => btnRec.innerText = "REC", 1500);
                };
            }, 100);
        }
    });
}


// ==========================================
// SLIDERS DE VOLUME
// ==========================================
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
    if (somSax && somSax.isLoaded()) somSax.setVolume(parseFloat(sliderBt.value));
});

let sliderBa = document.getElementById('vol_ba');
if (sliderBa) sliderBa.addEventListener('input', () => {
    if (somSax2 && somSax2.isLoaded()) somSax2.setVolume(parseFloat(sliderBa.value));
});