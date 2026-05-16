let imgBg, imgStars, imgNave, imgPlaneta;
let fontIBM;

let somBass, somBateria, somSax, somSax2;

let cenaAtiva = 1;


let gravador, ficheiroGravacao;

function preload() {
    fontIBM = loadFont('../navegação/fontes/IBMPlexMono-Regular.ttf');

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
    // Procura a div que criámos no HTML para saber o tamanho exato disponível
    let container = document.querySelector('.canvas_container');
    
    // Cria o canvas com a largura e altura exatas dessa div
    let myCanvas = createCanvas(container.clientWidth, container.clientHeight);

    // Prende o canvas dentro da div correta (respeitando o layout Flexbox!)
    myCanvas.parent('canvas_container');
  
    // Apagámos o position(0, 0) e o z-index, pois o Flexbox já organiza tudo!

    let px = width * 0.05;
    let bw = 50;
    let bh = 50;
    let gap = 20;

    somBass.setVolume(0); // Garante que começa mudo até rodares o botão

    gravador = new p5.SoundRecorder();
}

function draw() {
    background(0);

    // Apaguei a linha vertical de divisão (stroke, line), pois 
    // já não há painel lateral a dividir o ecrã.
  
    if (cenaAtiva === 1) desenharCena1();
    else if (cenaAtiva === 2) desenharCena2();
    else if (cenaAtiva === 3) desenharCena3();
}

function desenharCena1() {
    // Mantemos a proporção 4:3
    let h = height * 0.9;
    let w = h * (4 / 3);
    let x = (width - w) / 2;   // ← ERA: width - w
    let y = (height - h) / 2;

    image(cena1bg, x, y, w, h);
    
    tint(255, 180);
    image(cena1bg2, x, y, w, h);
    image(cena1layer, x, y, w, h);
    
    image(cena1layer2, x, y, w, h);

    noTint();
}

function desenharCena2() {
    let h = height * 0.9;
    let w = h * (4 / 3);
    let x = (width - w) / 2;   // ← ERA: width - w
    let y = (height - h) / 2;

    image(cena2bg, x, y, w, h);

    tint(255, 180);
    image(cena2bg2, x, y, w, h);

    tint(255, 220);
    image(cena2layer1, x, y, w, h);

    tint(255, 150);
    image(cena2layer2, x, y, w, h);

    tint(255, 100);
    image(cena2layer3, x, y, w, h);

    noTint();
}

function desenharCena3() {
    let h = height * 0.9;
    let w = h * (4 / 3);
    let x = (width - w) / 2;   // ← ERA: width - w
    let y = (height - h) / 2;

    image(cena3bg, x, y, w, h);

    tint(255, 160);
    image(cena3bg2, x, y, w, h);

    tint(255, 230);
    image(cena3layer1, x, y, w, h);

    tint(255, 120);
    image(cena3layer2, x, y, w, h);

    noTint();
}


function windowResized() {
    let container = document.getElementById('canvas_container');
    resizeCanvas(container.clientWidth, container.clientHeight);
}

function mousePressed() {
    cenaAtiva = cenaAtiva === 3 ? 1 : cenaAtiva + 1;
}












let botoesAcao = document.querySelectorAll('.btn_action');


botoesAcao.forEach(botao => {

    let botaoClicado = false;

    if (botao.id === 'btn_rec') return;
    
    // Quando o rato passa por cima (Mouse Over)
    botao.addEventListener('mouseover', () => {
        botao.style.cursor = 'pointer'; 

            botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(230%)';;
            //botao.style.backgroundColor = '#d95a38';
        
    });


    botao.addEventListener('mouseout', () => {

        
            if(botaoClicado === false){
                //botao.style.backgroundColor = '#fa7f5d';
                botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(130%)';
            } else if(botaoClicado === true){
                //botao.style.backgroundColor = '#FF3131';
                botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(300%)';
            }
        
    });


    botao.addEventListener('click', () => {
        botaoClicado = !botaoClicado;

    
        if (botao.id === 'btn_bx'){
            if (somBass && somBass.isLoaded()) {
                if (botaoClicado === true){
                    somBass.loop();
                } else {
                    somBass.pause();
                }
            } 
        } 

        if (botao.id === 'btn_bs'){
            if (somBateria && somBateria.isLoaded()) {
                if (botaoClicado === true){
                    somBateria.loop();
                } else {
                    somBateria.pause();
                }
            } 
        } 

        if (botao.id === 'btn_bt'){
            if (somSax && somSax.isLoaded()) {
                if (botaoClicado === true){
                    somSax.loop();
                } else {
                    somSax.pause();
                }
            } 
        }
        
        if (botao.id === 'btn_ba'){
            if (somSax2 && somSax2.isLoaded()) {
                if (botaoClicado === true){
                    somSax2.loop();
                } else {
                    somSax2.pause();
                }
            } 
        }

       
       
            if(botaoClicado === true){
                //botao.style.backgroundColor = '#FF3131'; 
            } else {
                //botao.style.backgroundColor = '#d95a38'; 
            }
        
    });
});



let btnVoltar = document.getElementById('btn_vl');

if (btnVoltar) {
    btnVoltar.addEventListener('mouseover', () => {

        // Altera o tamanho (muda o "20px" para o tamanho que achares melhor)
        btnVoltar.style.fontSize = '20px'; 
        btnVoltar.style.cursor = 'pointer'; // Muda o cursor para a "mãozinha"

    });


    // 2. Quando o rato sai de cima (Volta ao normal)
    btnVoltar.addEventListener('mouseout', () => {
        // Volta a colocar o tamanho original que tens no teu CSS (ex: 16px)
        btnVoltar.style.fontSize = '16px'; 
    });

    btnVoltar.addEventListener('click', () => {
        // Redireciona para a página principal
        // NOTA: Se o teu index.html estiver uma pasta atrás (na pasta principal do projeto),
        // deves usar '../index.html'. Se estiver na mesma pasta, usa apenas 'index.html'.
        window.location.href = '../index.html'; 
    });
}


// ==========================================
// 3. LÓGICA DO BOTÃO REC (Cores no JS, Imagem no CSS)
// ==========================================
// Variáveis globais para o p5.js
let aGravar = false;

const corNormal = "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))";
const corHover = "linear-gradient(rgba(255, 50, 50, 0.4), rgba(255, 50, 50, 0.4))";
const corGravar = "linear-gradient(rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.8))";

let btnRec = document.getElementById('btn_rec');

if (btnRec) {
    // Forçamos o filtro para 'none' no REC para a --pelicula funcionar
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
            let urlAudio = URL.createObjectURL(blobAudio);

            let reader = new FileReader();
            reader.readAsDataURL(blobAudio);
            reader.onloadend = () => {
                let gravacoes = JSON.parse(localStorage.getItem('gravacoes') || '[]');
                gravacoes.push({
                    planeta: 'MARTE',
                    data: new Date().toLocaleDateString(),
                    audio: reader.result
                });
                localStorage.setItem('gravacoes', JSON.stringify(gravacoes));

                // feedback visual
                btnRec.innerText = "SAVED";
                setTimeout(() => btnRec.innerText = "REC", 1500);
            };
        }, 100);
    }
  } );
}

// ==========================================
// 5. LÓGICA DOS SLIDERS DE VOLUME
// ==========================================


// --- Controlo de Volume do BX (Bass / BS) ---
let sliderBx = document.getElementById('vol_bx');
if (sliderBx) {
    sliderBx.addEventListener('input', () => {
        if (somBass && somBass.isLoaded()) {
            somBass.setVolume(parseFloat(sliderBx.value)); 
        }
    });
}

// --- Controlo de Volume do BS (Bateria / DR) ---
let sliderBs = document.getElementById('vol_bs');
if (sliderBs) {
    sliderBs.addEventListener('input', () => {
        if (somBateria && somBateria.isLoaded()) {
            somBateria.setVolume(parseFloat(sliderBs.value));
        }
    });
}

// --- Controlo de Volume do BT (Sax 1 / SX1) ---
let sliderBt = document.getElementById('vol_bt');
if (sliderBt) {
    sliderBt.addEventListener('input', () => {
        if (somSax && somSax.isLoaded()) {
            somSax.setVolume(parseFloat(sliderBt.value));
        }
    });
}

// --- Controlo de Volume do BA (Sax 2 / SX2) ---
let sliderBa = document.getElementById('vol_ba');
if (sliderBa) {
    sliderBa.addEventListener('input', () => {
        if (somSax2 && somSax2.isLoaded()) {
            somSax2.setVolume(parseFloat(sliderBa.value));
        }
    });
}