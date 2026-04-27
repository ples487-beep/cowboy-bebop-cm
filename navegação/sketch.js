let estado = 'mapa';
let planetaAtual = null;

let planetas = [
  new Planeta('VENUS',    120, 8,  0,   0.005,  '#ffae00'),
  new Planeta('MARTE',    200, 8, 2,   0.003,  '#ffd500'),
  new Planeta('TIJUANA',  290, 6,  1,   0.0003, '#ffb700'),
  new Planeta('GANYMEDE', 380, 6, 3.5, 0.001,  '#ff9a0c'),
];

let tempoCutscene = 0;
let imgNave, imgPortal, imgBg, imgEstrelas;
let imgPlanetas = {};
let titulo=('UNIVERSE OF COWBOY BEBOP');
let font ;


let imgPlanetasMap = {};

let zoomAtual = 1;
let zoomAlvo = 1;
let offsetX = 0;
let offsetY = 0;
let aDragging = false;
let dragStartX, dragStartY;

function preload() {
  font = loadFont('fontes/bookman1.ttf');
  font2 = loadFont('fontes/IBMPlexMono-Regular.ttf');

  imgPlanetas['VENUS'] = loadImage('assets/venus.png');
  imgPlanetas['TIJUANA'] = loadImage('assets/tijuana.png');
  imgPlanetas['MARTE'] = loadImage('assets/marte.png');
  imgPlanetas['GANYMEDE'] = loadImage('assets/ganymede.png');

  imgPlanetasMap['VENUS']    = loadImage('assets/venus_map.png');
  imgPlanetasMap['MARTE']    = loadImage('assets/marte_map.png');
  imgPlanetasMap['TIJUANA']  = loadImage('assets/tijuana_map.png');
  imgPlanetasMap['GANYMEDE'] = loadImage('assets/ganymede_map.png');

  imgNave = loadImage('assets/nave.png');
  imgPortal = loadImage('assets/portal.png');
  imgBg = loadImage('assets/bg.png');
  imgEstrelas = loadImage('assets/estrelas.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
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
  desenharCinturao(cx, cy);
  fill(237, 224, 196);
  tint(100);
  image(imgEstrelas,0,0, width, height,);
  noTint();
  noStroke();
  circle(cx, cy, 20);

  for (let p of planetas) {
    p.atualizar();
    p.desenhar(cx, cy);
    
    // Nome do planeta em pequeno
    let pos = p.posicao(cx, cy);
    fill(237, 224, 196);
    textAlign(CENTER, TOP);
    textSize(10);
    noStroke();
    textFont(font2);
    text(p.nome, pos.x, pos.y + p.tamanho + 5);
  }

  // Titulo do jogo
  fill('#ede0c4');         
  textAlign(CENTER, TOP);  
  textFont(font2);         
  textSize(32);            
  text(titulo, width / 2, 30); 

}
function desenharCinturao(cx, cy) {
  randomSeed(42);
  noStroke();
  for (let i = 0; i < 60; i++) {
    let a = random(TWO_PI);
    let r = 290 + random(-20, 20);
    let x = cx + cos(a) * r;
    let y = cy + sin(a) * r * 0.3;
    fill(200, 170, 80, random(60, 150));
    circle(x, y, random(1, 2.5));
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
    window.location.href = '../planetas/' + planetaAtual.nome.toLowerCase() + '.html';
  }
}
function mousePressed() {
  // para o planeta
  let cx = width / 2; 
  let cy = height / 2; 


  //textFont(font); // Make sure the computer measures using your exact font
  //textSize(32);   // Make sure it uses the exact size
  //para o titulo
  let tituloX= width/2; 
  let tituloY= 30; 
  let tituloLargura= textWidth(titulo); 
  let tituloAltura= 32; 

  
  
  //para o planeta
  for (let p of planetas) { 
    let pos = p.posicao(cx, cy); 
    let d = dist(mouseX, mouseY, pos.x, pos.y);

    if (d < p.tamanho * 2) {
      planetaAtual = p; 
      estado = 'cutscene'; 
      tempoCutscene = 0; 
    }
  }

  //para o titulo
  if(
    mouseX<(tituloX+tituloLargura/2) &&
    mouseX>(tituloX-tituloLargura/2) &&
    mouseY>(tituloY) &&
    mouseY<(tituloY+tituloAltura)
  )
  {
    fill('#7b68ee');
    console.log("CLICASTE NO TÍTULO!");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}