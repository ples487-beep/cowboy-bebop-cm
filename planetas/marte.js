
let imgBg, imgStars, imgNave, imgPlaneta;
let fontIBM;

let somBass, somBateria, somSax;


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
  let myCanvas = createCanvas(windowWidth, windowHeight);

  // Posiciona o canvas à força no canto superior esquerdo (0,0)
  myCanvas.position(0, 0);
  
  // Envia o canvas para trás do painel lateral
  myCanvas.style('z-index', '-1');
  
  //bassAmp = new p5.Amplitude();
  //bateriaAmp = new p5.Amplitude();
  //saxAmp = new p5.Amplitude();
  
  //bassAmp.setInput(somBass);
  //bateriaAmp.setInput(somBateria);
  //saxAmp.setInput(somSax);
  
  //somBass.loop();
  //somBateria.loop();
  //somSax.loop();
  //somBass.setVolume(0);
  //somBateria.setVolume(0);
  //somSax.setVolume(0);
  let px = width * 0.05;
  let bw = 50;
  let bh = 50;
  let gap = 20;
}

function draw() {
  background(8, 6, 4);

  // divide
  stroke(42, 31, 20);
  strokeWeight(1);
  line(width * 0.3, 0, width * 0.3, height);
  
  desenharVisuais();
}

function desenharVisuais() {
  let x = width * 0.3;
  let y = 0;
  let w = width * 0.7;
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