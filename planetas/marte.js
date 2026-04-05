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

  botoes.push(new Botao(px, height * 0.25, bw, bh, 'TR', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap), bw, bh, 'BA', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap) * 2, bw, bh, 'BX', corMarte, fontIBM));
  botoes.push(new Botao(px, height * 0.25 + (bh + gap) * 3, bw, bh, 'DR', corMarte, fontIBM));
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
    fill(100, 80, 70);
    textSize(16);
    text('voltar', width * 0.05, height * 0.06);
  // painel esquerdo
}

function desenharVisuais() {
  // área direita
  image(imgMarte, width * 0.3, 0, width * 0.7, height);
}
//da commit
function mousePressed() {
  for (let b of botoes) b.clicado();

  if (mouseX > width * 0.05 && mouseX < width * 0.15 && 
    mouseY > height * 0.04 && mouseY < height * 0.08) {
  window.location.href = '../navegação/index.html';
  }
}