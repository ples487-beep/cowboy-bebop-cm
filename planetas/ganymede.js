let corGanymede = '#88d9f0';
let cenaAtiva = 1; // 1, 2 ou 3

// Cena 1
let cena1Bg, cena1Bg2, cena1Layer1, cena1Layer2;

// Cena 2
let cena2Bg, cena2Bg2, cena2Layer1, cena2Layer2;

// Cena 3
let cena3Bg1, cena3Bg2, cena3Layer1;

let fontIBM;

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
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
