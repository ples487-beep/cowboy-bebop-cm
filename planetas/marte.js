let imgBg, imgStars, imgNave, imgPlaneta;
let fontIBM;

let somBass, somBateria, somSax;


let gravador, ficheiroGravacao;

function preload() {
    fontIBM = loadFont('../navegação/fontes/IBMPlexMono-Regular.ttf');
    imgBg = loadImage('../elementos/marte/bg.png');
    imgStars = loadImage('../elementos/marte/marte estrelas.png');
    imgNave = loadImage('../elementos/marte/marte nave.png');
    imgPlaneta = loadImage('../elementos/marte/marte planeta.png');

    somBass = loadSound('../elementos/sounds/marte_bass.mp3');
    somBateria = loadSound('../elementos/sounds/marte_drum.mp3');
    somSax = loadSound('../elementos/sounds/marte_sax1.mp3');
    somSax2 = loadSound('../elementos/sounds/marte_sax2.mp3');
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
    background(8, 6, 4);

    // Apaguei a linha vertical de divisão (stroke, line), pois 
    // já não há painel lateral a dividir o ecrã.
  
    desenharVisuais();
}

function desenharVisuais() {
    // Como o Canvas agora tem o tamanho perfeito da área livre, 
    // começamos a desenhar no canto superior esquerdo (0,0)
    let x = 0;
    let y = 0;
    
    // E ocupamos 100% da largura (width) e 100% da altura (height)
    let w = width;
    let h = height;
  
    image(imgBg, x, y, w, h);
  
    // Transparência das estrelas mapeia para saxophone
    //let alphaStar = map(saxAmp.getLevel(), 0, 0.3, 50, 255);
    //tint(255, alphaStar);
    image(imgStars, x, y, w, h);
  
    // Transparência do planeta mapeia para bateria
    //let alphaPlaneta = map(bateriaAmp.getLevel(), 0, 0.3, 50, 255);
    //tint(255, alphaPlaneta);
    image(imgPlaneta, x, y, w, h);
  
    // Pulso na nave baseado no baixo
    //let alphaNave = map(bassAmp.getLevel(), 0, 0.3, 100, 255);
    //tint(255, alphaNave);
    image(imgNave, x, y, w, h);
}

// NOVA FUNÇÃO: Garante que se redimensionares a janela do browser,
// o canvas adapta-se ao novo espaço perfeitamente.
function windowResized() {
    let container = document.getElementById('canvas-container');
    resizeCanvas(container.clientWidth, container.clientHeight);
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