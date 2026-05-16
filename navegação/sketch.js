let estado = 'mapa';
let planetaAtual = null;

let planetas = [
  new Planeta('VENUS',    180, 16, 0,   0.001,  '#ffae00'),
  new Planeta('MARTE',    280, 16, 2,   0.0009,  'rgb(252, 68, 62)'),
  new Planeta('TIJUANA',  400, 14,  1,   0.0003, '#6bebc2'),
  new Planeta('GANYMEDE', 520, 14, 3.5,  0.0001,  '#4117ff'),
];

let tempoCutscene = 0;
let imgNave, imgPortal, imgBg, imgEstrelas;
let imgPlanetas = {};
let imgPlanetasMap = {};
let font ;

let zoomAtual = 1;
let zoomAlvo = 1;
let offsetX = 0;
let offsetY = 0;
let aDragging = false;
let dragStartX, dragStartY;

let gravacoes = [];
let audioElements = [];

function preload() {
  font = loadFont('navegação/fontes/bookman1.ttf');
  font2 = loadFont('navegação/fontes/IBMPlexMono-Regular.ttf');

  imgPlanetas['VENUS'] = loadImage('navegação/assets/venus.png');
  imgPlanetas['TIJUANA'] = loadImage('navegação/assets/tijuana.png');
  imgPlanetas['MARTE'] = loadImage('navegação/assets/marte.png');
  // CORRIGIDO: Adicionada a pasta 'navegação/' que faltava aqui em baixo
  imgPlanetas['GANYMEDE'] = loadImage('navegação/assets/ganymede.png');

  imgPlanetasMap['VENUS']    = loadImage('navegação/assets/venus_map.png');
  imgPlanetasMap['MARTE']    = loadImage('navegação/assets/marte_map.png');
  imgPlanetasMap['TIJUANA']  = loadImage('navegação/assets/tijuana_map.png');
  imgPlanetasMap['GANYMEDE'] = loadImage('navegação/assets/ganymede_map.png');

  imgNave = loadImage('navegação/assets/nave.png');
  imgPortal = loadImage('navegação/assets/portal.png');
  imgBg = loadImage('navegação/assets/bg.png');
  imgEstrelas = loadImage('navegação/assets/estrelas.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //GRAVAÇOES
  gravacoes = JSON.parse(localStorage.getItem('gravacoes') || '[]');

  audioElements = gravacoes.map(g => {
  let a = document.createElement('audio');
  a.src = g.audio;
  document.body.appendChild(a);
  return a;
});
  
}

function draw() {
  background(8, 6, 4);

  if (estado === 'mapa') {
    desenharMapa();
  } else if (estado === 'cutscene') {
    desenharCutscene();
  } 
}

function desenharMapa() {
  let cx = width / 2;
let cy = height / 2;

// fundo
tint(65, 23, 255,80);
image(imgBg, 0, 0, width, height);
noTint();
// estrelas 
tint(65, 23, 255,200);
let estrelasX = map(mouseX, 0, width, -20, 20);
let estrelasY = map(mouseY, 0, height, -10, 10);
image(imgEstrelas,estrelasX * 0.5,estrelasY * 0.5,width,height);
tint(65, 23, 255, 80);
image(imgEstrelas,100+estrelasX,50+estrelasY,width,height);
noTint();
// centro
fill(237, 224, 196);
noStroke();
circle(cx, cy, 20);

//cinturão
desenharCinturao(cx, cy);

//desenhar planetas loop

 for (let p of planetas) {
    p.atualizar();
    p.desenhar(cx, cy);
    
    let pos = p.posicao(cx, cy);
    
    // nome pequeno por cima do planeta
    fill(237, 224, 196);
    textAlign(CENTER, TOP);
    textSize(1);
    noStroke();
    textFont(font2);
    text(p.nome, pos.x, pos.y + p.tamanho + 5);

    // hover em baixo
    let d = dist(mouseX, mouseY, pos.x, pos.y);
    if (d < p.tamanho * 3) {
      fill(p.cor);
      textFont(font);
      textSize(48);
      textAlign(LEFT, BOTTOM);
      noStroke();
      text(p.nome, 40, height - 60);
      
      fill(237, 224, 196, 150);
      textFont(font2);
      textSize(11);
      text('// clica para visitar', 40, height - 35);
    }
    desenharCartoes();
  }

  //hud
  fill(255, 220);
  textFont(font2);
  textSize(12);
  letterSpacing = 1;
  textAlign(LEFT, TOP);
  noStroke();
  text('THE UNIVERSE OF COWBOY BEBOP', 30, 30);

  
}
function desenharCinturao(cx, cy) {
  randomSeed(42);
  noStroke();
  for (let i = 0; i < 80; i++) {
    let a = random(TWO_PI);
    let r = 450 + random(-25, 25);
    let x = cx + cos(a) * r;
    let y = cy + sin(a) * r * 0.3;
    fill(65, 23, 255,random(60, 150));
    circle(x, y, random(1, 3));
  }
}
function desenharCartoes() {
  if (gravacoes.length === 0) return;
  
  let cardW = 200;
  let cardH = 60;
  let startX = width - (gravacoes.length * (cardW + 10)) - 30;
  let startY = height - cardH - 60;

  for (let i = 0; i < gravacoes.length; i++) {
    let x = startX + i * (cardW + 10);
    let g = gravacoes[i];

    // fundo
    fill('#06011e');
    stroke('#4117ff');
    strokeWeight(1);
    rect(x, startY, cardW, cardH);

    // texto
    fill(237, 224, 196);
    noStroke();
    textFont(font2);
    textSize(10);
    textAlign(LEFT, TOP);
    text(g.planeta, x + 10, startY + 10);
    text(g.data, x + 10, startY + 25);
    
    fill('#4117ff');
    text('TOCAR', x + 10, startY + 42);
  }
}
function desenharCutscene() {
  tempoCutscene++;

  let progresso = tempoCutscene / 180;
  let scroll = width * 0.03 * progresso;
  let offset = width * 0.08 * progresso;
  
  //image(imgBg, -width * 0.05 - scroll, -height * 0.05, width * 1.1, height * 1.1);
  
  
  //desenha o respetivo planeta 
  tint(planetaAtual.cor);
  image(imgEstrelas, -width * 0.05 - scroll, -height * 0.05, width * 1.1, height * 1.1);
  noTint();

  image(imgPlanetas[planetaAtual.nome], width * 0.35 + offset * 0.5, height * -0.2, height * 1.1, height * 1.1);
  
  tint(planetaAtual.cor);
  image(imgPortal, width * 0.1 + offset * 0.2, height * 0.45 - 20, 100, 100);
  image(imgPortal, width * 0.1 + offset * 0.45, height * 0.45 - 10, 130, 130);
  image(imgPortal, width * 0.1 + offset * 0.75, height * 0.45, 160, 160);
  image(imgNave, width * 0.2 + offset * 1.2, height * 0.5, 500, 400);
  noTint();

  fill(237, 224, 196, map(tempoCutscene, 0, 40, 0, 255));
  noStroke();
  textAlign(LEFT, CENTER);
  textFont(font);
  textSize(18);
  text('A APROXIMAR DE ' + planetaAtual.nome + '...', 40, height - 40);

  if (tempoCutscene > 100) {
    window.location.href = './planetas/' + planetaAtual.nome.toLowerCase() + '.html';
  }
}
function mousePressed() {
  let cx = width / 2;
  let cy = height / 2;

  // clicar nos planetas
  for (let p of planetas) {
    let pos = p.posicao(cx, cy);
    let d = dist(mouseX, mouseY, pos.x, pos.y);

    if (d < p.tamanho * 2) {
      planetaAtual = p;
      estado = 'cutscene';
      tempoCutscene = 0;
    }
  }

  // clicar nos cartões de gravação
  let cardW = 200;
  let cardH = 60;
  let startY = height - cardH - 20;

  for (let i = 0; i < gravacoes.length; i++) {
    let x = width - (gravacoes.length * (cardW + 10)) - 30 + i * (cardW + 10);
    
    if (mouseX > x && mouseX < x + cardW && mouseY > startY && mouseY < startY + cardH) {
      audioElements[i].play();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}