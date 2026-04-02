let estado = 'mapa';
let planetaAtual = null;

let planetas = [
  new Planeta('VENUS',    100, 10, 0,   0.008, '#4a7fc8'),
  new Planeta('TIJUANA',    160, 11, 1,   0.006, '#4a7fc8'),
  new Planeta('MARTE',    230, 10, 2,   0.004, '#c8a44a'),
  new Planeta('GANYMEDE', 310, 13, 3.5, 0.002, '#7a9cbf'),
];

let tempoCutscene = 0;
let imgMarte, imgNave, imgPortal;

function preload() {
  imgMarte = loadImage('assets/marte.png');
  imgNave = loadImage('assets/nave.png');
  imgPortal = loadImage('assets/portal.png');
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

  fill(237, 224, 196);
  noStroke();
  circle(cx, cy, 20);

  for (let p of planetas) {
    p.atualizar();
    p.desenhar(cx, cy);
  }
}
//mockup vai ser substituido por imagens
function desenharCutscene() {
  tempoCutscene++;

  let progresso = tempoCutscene / 360;
  let deslocamento = width * 0.08 * progresso;

  // aplicar tint com a cor do planeta
  tint(planetaAtual.cor);

  // planeta
  image(imgMarte, width * 0.35 + deslocamento*0.5, height * -0.2, height * 1.1, height * 1.1);

  // portal
  image(imgPortal, width * 0.1 + deslocamento*0.75, height * 0.25, 160, 160);

  // nave
  image(imgNave, width * 0.2 + deslocamento*1.2, height * 0.5, 400, 240);

  noTint();

  // texto
  fill(237, 224, 196, map(tempoCutscene, 0, 40, 0, 255));
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('A aproximar de ' + planetaAtual.nome + '...', 40, height - 40);

  if (tempoCutscene > 100) {
    let nomeArquivo = planetaAtual.nome.toLowerCase() + '.html';
    window.location.href = '../planetas/' + nomeArquivo;
  }
}
function mousePressed() {
  let cx = width / 2;
  let cy = height / 2;
  

  for (let p of planetas) {
    let pos = p.posicao(cx, cy);
    let d = dist(mouseX, mouseY, pos.x, pos.y);

    if (d < p.tamanho * 2) {
      planetaAtual = p;
      estado = 'cutscene';
      tempoCutscene = 0;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}