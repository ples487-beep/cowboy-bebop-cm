let botoes = [];
let corMarte = '#fa7f5d';
let imgMarte;
let fontIBM;

function preload() {
  fontIBM = loadFont('../navegação/fontes/IBMPlexMono-Regular.ttf');
  imgMarte = loadImage('../navegação/assets/marte1.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
   let px = width * 0.05;
  let bw = 50;
  let bh = 50;
  let gap = 20;

  botoes.push(new Botao(px, height * 0.25, bw, bh, '1', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap), bw, bh, '2', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap) * 2, bw, bh, '3', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap) * 3, bw, bh, '4', corMarte, fontIBM));
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

function desenharMixer() {
    for (let b of botoes) b.desenhar();
  // painel esquerdo
}

function desenharVisuais() {
  // área direita
  image(imgMarte, width * 0.3, 0, width * 0.7, height);
}

function mousePressed() {
  for (let b of botoes) b.clicado();
}