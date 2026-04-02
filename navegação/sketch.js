let estado = 'mapa';
let planetaAtual = null;

let planetas = [
  new Planeta('VÉNUS',    100, 10, 0,   0.008, '#4a7fc8'),
  new Planeta('TIJUANA',    160, 11, 1,   0.006, '#4a7fc8'),
  new Planeta('MARTE',    230, 10, 2,   0.004, '#c8a44a'),
  new Planeta('GANYMEDE', 310, 13, 3.5, 0.002, '#7a9cbf'),
];

let tempoCutscene = 0;
let estrelas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 200; i++) {
    estrelas.push({
      x: random(width),
      y: random(height),
      tamanho: random(1, 3),
      velocidade: random(2, 8),
    });
  }
}

function draw() {
  background(8, 6, 4);

  if (estado === 'mapa') {
    desenharMapa();
  } else if (estado === 'cutscene') {
    desenharCutscene();
  } else if (estado === 'planeta') {
    desenharPlaneta();
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

  let progresso = tempoCutscene / 180;
  let deslocamento = width * 0.25 * progresso;

  // planeta
  fill(50, 35, 10);
  noStroke();
  circle(width * 0.85 - deslocamento, height * -0.1, height * 1.2);

  // nave
  fill(200, 150, 50);
  noStroke();
  circle(width * 0.35 - deslocamento, height * 0.72, 18);

  // texto
  fill(237, 224, 196, map(tempoCutscene, 0, 60, 0, 255));
  textAlign(LEFT, CENTER);
  textSize(11);
  text('A aproximar de ' + planetaAtual.nome + '...', 40, height - 40);

  if (tempoCutscene > 180) {
    tempoCutscene = 0;
    estado = 'planeta';
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
    }
  }
}