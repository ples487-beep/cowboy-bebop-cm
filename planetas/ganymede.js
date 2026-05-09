let corGanymede = '#88d9f0';
let cenaAtiva = 1; // 1, 2 ou 3

// Cena 1
let cena1Bg, cena1Bg2, cena1Layer1, cena1Layer2;

// Cena 2
let cena2Bg, cena2Bg2, cena2Layer1, cena2Layer2;

// Cena 3
let cena3Bg1, cena3Bg2, cena3Layer1;

let somDrone, somBateria, somSax;

let fontIBM;

let gravador, ficheiroGravacao

function preload() {
  fontIBM = loadFont('../navegação/fontes/IBMPlexMono-Regular.ttf');
  
  // Cena 1
  cena1Bg = loadImage('../elementos/ganymede/cena1/bg.png');
  cena1Bg2 = loadImage('../elementos/ganymede/cena1/bg2.png');
  cena1Layer1 = loadImage('../elementos/ganymede/cena1/layer1.png');
  cena1Layer2 = loadImage('../elementos/ganymede/cena1/layer2.png');
  
  // Cena 2
  cena2Bg = loadImage('../elementos/ganymede/cena2/bg.png');
  cena2Bg2 = loadImage('../elementos/ganymede/cena2/bg2.png');
  cena2Layer1 = loadImage('../elementos/ganymede/cena2/layer1.png');
  cena2Layer2 = loadImage('../elementos/ganymede/cena2/layer2.png');
  
  // Cena 3
  cena3Bg1 = loadImage('../elementos/ganymede/cena3/bg1.png');
  cena3Bg2 = loadImage('../elementos/ganymede/cena3/bg2.png');
  cena3Layer1 = loadImage('../elementos/ganymede/cena3/layer1.png');

  somDrone = loadSound('../elementos/sounds/ganymede_drone.mp3'); 
  somBateria = loadSound('../elementos/sounds/ganymede_drum.mp3'); 
  somSax = loadSound('../elementos/sounds/ganymede_sax.mp3'); 
}

function setup() {
      // Procura a div que criámos no HTML para saber o tamanho exato disponível
    let container = document.getElementById('canvas-container');
    
    // Cria o canvas com a largura e altura exatas dessa div
    let myCanvas = createCanvas(container.clientWidth, container.clientHeight);

    // Prende o canvas dentro da div correta (respeitando o layout Flexbox!)
    myCanvas.parent('canvas-container');
  
    // Apagámos o position(0, 0) e o z-index, pois o Flexbox já organiza tudo!

    let px = width * 0.05;
    let bw = 50;
    let bh = 50;
    let gap = 20;

    somBass.setVolume(0); // Garante que começa mudo até rodares o botão

    gravador = new p5.SoundRecorder();
}

function draw() {
  background(10, 8, 6);
  
  // Desenha a cena ativa
  if (cenaAtiva === 1) desenharCena1();
  else if (cenaAtiva === 2) desenharCena2();
  else if (cenaAtiva === 3) desenharCena3();
  
  // Espaço reservado para painel de música (em baixo)
  fill(30, 25, 20);
  rect(0, height * 0.85, width, height * 0.15);
}

function desenharCena1() {
  // Respeita aspect ratio 4:3
  let maxW = width * 0.7;
  let maxH = height * 0.75;
  let h = min(maxH, maxW * 3 / 4);
  let w = h * 4 / 3;
  let x = (width - w) / 2;
  let y = height * 0.1 + (maxH - h) / 2;
  
  image(cena1Bg, x, y, w, h);
  image(cena1Bg2, x, y, w, h);
  image(cena1Layer1, x, y, w, h);
  image(cena1Layer2, x, y, w, h);
}

function desenharCena2() {
  // Respeita aspect ratio 4:3
  let maxW = width * 0.7;
  let maxH = height * 0.75;
  let h = min(maxH, maxW * 3 / 4);
  let w = h * 4 / 3;
  let x = (width - w) / 2;
  let y = height * 0.1 + (maxH - h) / 2;
  
  image(cena2Bg, x, y, w, h);
  image(cena2Bg2, x, y, w, h);
  image(cena2Layer1, x, y, w, h);
  image(cena2Layer2, x, y, w, h);
}

function desenharCena3() {
  // Respeita aspect ratio 4:3
  let maxW = width * 0.7;
  let maxH = height * 0.75;
  let h = min(maxH, maxW * 3 / 4);
  let w = h * 4 / 3;
  let x = (width - w) / 2;
  let y = height * 0.1 + (maxH - h) / 2;
  
  image(cena3Bg1, x, y, w, h);
  image(cena3Bg2, x, y, w, h);
  image(cena3Layer1, x, y, w, h);
}

function mousePressed() {
  // Alternar cenas com clique na área de preview
  if (mouseY < height * 0.85) {
    cenaAtiva = cenaAtiva === 3 ? 1 : cenaAtiva + 1;
  }
  
  if (mouseX > width * 0.05 && mouseX < width * 0.15 && 
    mouseY > height * 0.04 && mouseY < height * 0.08) {
    window.location.href = '../navegação/index.html';
  }
}


// Seleciona todos os botões que têm a classe 'btn_action'
let botoesAcao = document.querySelectorAll('.btn_action');

// Passa por cada botão e adiciona os eventos
botoesAcao.forEach(botao => {

    let botaoClicado = false;

    if (botao.id === 'btn_rec') return;
    
    // Quando o rato passa por cima (Mouse Over)
    botao.addEventListener('mouseover', () => {
        botao.style.cursor = 'pointer'; 

            botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(230%)';;
            //botao.style.backgroundColor = '#d95a38';
        
    });

    // Quando o rato sai de cima (Mouse Out)
    botao.addEventListener('mouseout', () => {
        // Só muda a cor se NÃO for o btn_dr
        
            if(botaoClicado === false){
                //botao.style.backgroundColor = '#fa7f5d';
                botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(130%)';
            } else if(botaoClicado === true){
                //botao.style.backgroundColor = '#FF3131';
                botao.style.filter = 'sepia(100%) saturate(250%) hue-rotate(320deg) brightness(300%)';
            }
        
    });

    // Quando o rato clica no botão
    botao.addEventListener('click', () => {
        botaoClicado = !botaoClicado;

        // A lógica do som para o BX continua a funcionar normalmente!
        if (botao.id === 'btn_bx'){
            if (somDrone && somDrone.isLoaded()) {
                if (botaoClicado === true){
                    somDrone.loop();
                } else {
                    somDrone.pause();
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

        // Muda a cor do clique, ignorando apenas o btn_dr
       
            if(botaoClicado === true){
                //botao.style.backgroundColor = '#FF3131'; 
            } else {
                //botao.style.backgroundColor = '#d95a38'; 
            }
        
    });
});


// ==========================================
// 4. LÓGICA DO BOTÃO VOLTAR
// ==========================================
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
        window.location.href = '../navegação/index.html'; 
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
        // Se o gravador não existir (erro do p5), tentamos criar um
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
            btnRec.style.setProperty('--pelicula', corHover);
            btnRec.classList.remove('gravando');
        }
    });
}


// ==========================================
// 5. LÓGICA DOS SLIDERS DE VOLUME
// ==========================================


// --- Controlo de Volume do BX (Bass / BS) ---
let sliderBx = document.getElementById('vol_bx');
if (sliderBx) {
    sliderBx.addEventListener('input', () => {
        if (somDrone && somDrone.isLoaded()) {
            somDrone.setVolume(parseFloat(sliderBx.value)); 
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


