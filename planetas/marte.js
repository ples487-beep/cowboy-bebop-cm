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

    somBass = loadSound('../elementos/sounds/double_bass.wav');
    somBateria = loadSound('../elementos/sounds/jazz-drumming_170bpm.wav');
    somSax = loadSound('../elementos/sounds/sax-phrase-honey-moon-pt-8_90bpm_D_minor.wav');
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