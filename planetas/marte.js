let botoes = [];
let corMarte = '#fa7f5d';
let imgBg, imgStars, imgNave, imgPlaneta;
let cenaAtiva = 1; // 1, 2 ou 3

// Cena 1
let cena1Bg, cena1Bg2, cena1Layer2, cena1Layer3;

// Cena 2
let cena2Bg, cena2Bg2, cena2Layer1, cena2Layer2, cena2Layer3;

// Cena 3
let cena3Bg, cena3Stars, cena3Nave, cena3Planeta;

let fontIBM;
let somBass, somBateria, somSax;
let bassAmp, bateriaAmp, saxAmp;
let somAtivo = false;

function preload() {
  fontIBM = loadFont('../navegação/fontes/IBMPlexMono-Regular.ttf');
  
  // Cena 1
  cena1Bg = loadImage('../elementos/marte/cena1/bg.png');
  cena1Bg2 = loadImage('../elementos/marte/cena1/bg2.png');
  cena1Layer2 = loadImage('../elementos/marte/cena1/layer2.png');
  cena1Layer3 = loadImage('../elementos/marte/cena1/layer3.png');
  
  // Cena 2
  cena2Bg = loadImage('../elementos/marte/cena2/bg.png');
  cena2Bg2 = loadImage('../elementos/marte/cena2/bg2.png');
  cena2Layer1 = loadImage('../elementos/marte/cena2/layer1.png');
  cena2Layer2 = loadImage('../elementos/marte/cena2/layer2.png');
  cena2Layer3 = loadImage('../elementos/marte/cena2/layer3.png');
  
  // Cena 3
  cena3Bg = loadImage('../elementos/marte/cena3/bg.png');
  cena3Stars = loadImage('../elementos/marte/cena3/bg2.png');
  cena3Nave = loadImage('../elementos/marte/cena3/layer1.png');
  cena3Planeta = loadImage('../elementos/marte/cena3/layer2.png');
  
  somBass = loadSound('../elementos/sounds/double_bass.wav');
  somBateria = loadSound('../elementos/sounds/jazz-drumming_170bpm.wav');
  somSax = loadSound('../elementos/sounds/sax-phrase-honey-moon-pt-8_90bpm_D_minor.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  bassAmp = new p5.Amplitude();
  bateriaAmp = new p5.Amplitude();
  saxAmp = new p5.Amplitude();
  
  bassAmp.setInput(somBass);
  bateriaAmp.setInput(somBateria);
  saxAmp.setInput(somSax);
  
  somBass.loop();
  somBateria.loop();
  somSax.loop();
  somBass.setVolume(0);
  somBateria.setVolume(0);
  somSax.setVolume(0);
   let px = width * 0.05;
  let bw = 50;
  let bh = 50;
  let gap = 20;

  botoes.push(new Botao(px, height * 0.25, bw, bh, 'BX', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap), bw, bh, 'BA', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap) * 2, bw, bh, 'SX', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap) * 3, bw, bh, 'DR', corMarte, fontIBM));
}

function draw() {
  background(8, 6, 4);

  // divide
  stroke(42, 31, 20);
  strokeWeight(1);
  line(width * 0.3, 0, width * 0.3, height);
  
  desenharMixer();
  
  // Desenha a cena ativa
  if (cenaAtiva === 1) desenharCena1();
  else if (cenaAtiva === 2) desenharCena2();
  else if (cenaAtiva === 3) desenharCena3();
}

function desenharMixer() {
    for (let b of botoes) b.desenhar();
    fill(100, 80, 70);
    textSize(16);
    text('voltar', width * 0.05, height * 0.06);
  // painel esquerdo
}

function desenharCena1() {
  let x = width * 0.3;
  let y = 0;
  let w = width * 0.7;
  let h = height;
  
  image(cena1Bg, x, y, w, h);
  image(cena1Bg2, x, y, w, h);
  image(cena1Layer2, x, y, w, h);
  image(cena1Layer3, x, y, w, h);
}

function desenharCena2() {
  let x = width * 0.3;
  let y = 0;
  let w = width * 0.7;
  let h = height;
  
  image(cena2Bg, x, y, w, h);
  image(cena2Bg2, x, y, w, h);
  image(cena2Layer1, x, y, w, h);
  image(cena2Layer2, x, y, w, h);
  image(cena2Layer3, x, y, w, h);
}

function desenharCena3() {
  let x = width * 0.3;
  let y = 0;
  let w = width * 0.7;
  let h = height;
  
  image(cena3Bg, x, y, w, h);
  image(cena3Stars, x, y, w, h);
  image(cena3Nave, x, y, w, h);
  image(cena3Planeta, x, y, w, h);
}


function mousePressed() {
  for (let i = 0; i < botoes.length; i++) {
    if (botoes[i].clicado()) {
      if (i === 0) somBass.setVolume(somBass.getVolume() > 0 ? 0 : 1);
      if (i === 1) somBateria.setVolume(somBateria.getVolume() > 0 ? 0 : 1);
      if (i === 2) somSax.setVolume(somSax.getVolume() > 0 ? 0 : 1);
    }
  }

  // Alternar cenas com clique na área de preview
  if (mouseX > width * 0.3 && mouseX < width) {
    cenaAtiva = cenaAtiva === 3 ? 1 : cenaAtiva + 1;
  }

  if (mouseX > width * 0.05 && mouseX < width * 0.15 && 
    mouseY > height * 0.04 && mouseY < height * 0.08) {
    window.location.href = '../navegação/index.html';
  }
}