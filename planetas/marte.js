let botoes = [];
let botoesNavegacao = [];
let corMarte = '#fa7f5d';
let imgBg, imgStars, imgNave, imgPlaneta;
let fontIBM;
let bassAmp, bateriaAmp, saxAmp;
let somAtivo = false;

function preload() {
  fontIBM = loadFont('../navegação/fontes/IBMPlexMono-Regular.ttf');
  imgBg = loadImage('../elementos/marte/bg.png');
  imgStars = loadImage('../elementos/marte/marte estrelas.png');
  imgNave = loadImage('../elementos/marte/marte nave.png');
  imgPlaneta = loadImage('../elementos/marte/marte planeta.png');
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
  botoesNavegacao.push(new Botao(px, height * 0.06, bw, bh, 'voltar',255, fontIBM));
}

function draw() {
  background(8, 6, 4);

  // divide
  stroke(42, 31, 20);
  strokeWeight(1);
  line(width * 0.3, 0, width * 0.3, height);
  

  desenharMixer();
  desenharVisuais();
}

// painel esquerdo
function desenharMixer() {
    for (let b of botoes) b.desenhar();
    for (let bN of botoesNavegacao) bN.desenhar();
}

function desenharVisuais() {
  let x = width * 0.3;
  let y = 0;
  let w = width * 0.7;
  let h = height;
  
  image(imgBg, x, y, w, h);
  
  // Transparência das estrelas mapeia para saxophone
  let alphaStar = map(saxAmp.getLevel(), 0, 0.3, 50, 255);
  tint(255, alphaStar);
  image(imgStars, x, y, w, h);
  noTint();
  
  // Transparência do planeta mapeia para bateria
  let alphaPlaneta = map(bateriaAmp.getLevel(), 0, 0.3, 50, 255);
  tint(255, alphaPlaneta);
  image(imgPlaneta, x, y, w, h);
  noTint();
  
  // Pulso na nave baseado no baixo
  let alphaNave = map(bassAmp.getLevel(), 0, 0.3, 100, 255);
  tint(255, alphaNave);
  image(imgNave, x, y, w, h);
  noTint();
}


//da commit
function mousePressed() {
  for (let i = 0; i < botoes.length; i++) {
    if (botoes[i].clicado()) {
      if (i === 0) somBass.setVolume(somBass.getVolume() > 0 ? 0 : 1);
      if (i === 1) somBateria.setVolume(somBateria.getVolume() > 0 ? 0 : 1);
      if (i === 2) somSax.setVolume(somSax.getVolume() > 0 ? 0 : 1);
    }
  }

  //if (mouseX > width * 0.05 - (width * 0.05)/2 && mouseX < (width * 0.05)*2 && 
    //mouseY > height * 0.04 && mouseY < height * 0.08) {
    //window.location.href = '../navegação/index.html';
  //}
}