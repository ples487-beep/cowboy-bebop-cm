let fontIBM;

let somBass, somBateria, somSax, somSax2;

// Analisadores de amplitude
let ampBass, ampBateria, ampSax, ampSax2;

// Variáveis globais para amplitudes em tempo real
let ampLevelBass = 0;
let ampLevelBateria = 0;
let ampLevelSax = 0;
let ampLevelSax2 = 0;

let gravador, ficheiroGravacao;

let cenaAtiva = 1;

// Cena 1
let cena1bg, cena1bg2, cena1layer1, cena1layer2, cena1layer3;
// Cena 2
let cena2bg, cena2bg2, cena2layer1, cena2layer2;
// Cena 3
let cena3bg, cena3bg2, cena3layer1, cena3layer2, cena3layer3;

function preload() {
    fontIBM = loadFont('../navegacao/fontes/IBMPlexMono-Regular.ttf');

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
    gravador = new p5.SoundRecorder();

    // Criar analisadores de amplitude
    ampBass = new p5.Amplitude();
    ampBateria = new p5.Amplitude();
    ampSax = new p5.Amplitude();
    ampSax2 = new p5.Amplitude();

    // Conectar cada áudio ao seu analisador
    ampBass.setInput(somBass);
    ampBateria.setInput(somBateria);
    ampSax.setInput(somSax);
    ampSax2.setInput(somSax2);
}

function draw() {
    background(0);
    
    // Calcular amplitudes uma vez por frame
    ampLevelBass = ampBass.getLevel();
    ampLevelBateria = ampBateria.getLevel();
    ampLevelSax = ampSax.getLevel();
    ampLevelSax2 = ampSax2.getLevel();
    
    if (cenaAtiva === 1) desenharCena1();
    else if (cenaAtiva === 2) desenharCena2();
    else if (cenaAtiva === 3) desenharCena3();
}

function desenharCena1() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    // Mapear amplitudes para opacidade - range grande para pulsar forte
    let op1 = map(ampLevelBass, 0, 0.3, 150, 255);
    let op2 = map(ampLevelBateria, 0, 0.3, 150, 255);
    let op3 = map(ampLevelSax, 0, 0.3, 150, 255);


    image(cena1bg, x, y, w, h);
    image(cena1bg2, x, y, w, h);
    tint(255, op1);
    image(cena1layer1, x, y, w, h);
    tint(255, op2);
    image(cena1layer2, x, y, w, h);
    tint(255, op3);
    image(cena1layer3, x, y, w, h);
    noTint();
}

function desenharCena2() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    // Mapear amplitudes para opacidade - range grande para pulsar forte
    let op1 = map(ampLevelBass, 0, 0.15, 150, 255);
    let op2 = map(ampLevelBateria, 0, 0.15, 0, 255);
    let op3 = map(ampLevelSax, 0, 0.15, 90, 255);

    image(cena2bg, x, y, w, h);
    tint(255, op2);
    image(cena2bg2, x, y, w, h);
    tint(255, op1);
    image(cena2layer1, x, y, w, h);
    tint(255, op3);
    image(cena2layer2, x, y, w, h);
    noTint();
}

function desenharCena3() {
    let h = height;
    let w = h * (4 / 3);
    let x = (width - w) / 2;
    let y = (height - h) / 2;

    // Mapear amplitudes para opacidade - range grande para pulsar forte
    let op1 = map(ampLevelBass, 0, 0.15, 100, 255);
    let op2 = map(ampLevelBateria, 0, 0.15, 100, 255);
    let op3 = map(ampLevelSax, 0, 0.15, 100, 255);


    image(cena3bg, x, y, w, h);
    tint(255, op2);
    image(cena3bg2, x, y, w, h);
    tint(255, op1);
    image(cena3layer1, x, y, w, h);
    tint(255, op3);
    image(cena3layer2, x, y, w, h);
    noTint();
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
        window.location.href = '../index.html';
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
                    // limitar a 5 gravações máximas
                    if (gravacoes.length > 5) {
                        gravacoes.shift(); // remove a mais antiga
                    }
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