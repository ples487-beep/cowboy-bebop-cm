let planetas = [
  { nome: 'VÉNUS',    raioOrbita: 100, tamanho: 10, angulo: 0,   velocidade: 0.008 },
  { nome: 'TERRA',    raioOrbita: 160, tamanho: 11, angulo: 1,   velocidade: 0.006 },
  { nome: 'MARTE',    raioOrbita: 230, tamanho: 10, angulo: 2,   velocidade: 0.004 },
  { nome: 'TIJUANA', raioOrbita: 310, tamanho: 13, angulo: 3.5, velocidade: 0.002 },
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(8, 6, 4);

  let cx = width / 2;
  let cy = height / 2;

  // sol
  fill(237, 224, 196);
  noStroke();
  circle(cx, cy, 20);

  // planetas
  for (let p of planetas) {
    p.angulo += p.velocidade;

    let x = cx + cos(p.angulo) * p.raioOrbita;
    let y = cy + sin(p.angulo) * p.raioOrbita;

    // orbita
    noFill();
    stroke(42, 31, 20);
    strokeWeight(0.5);
    ellipse(cx, cy, p.raioOrbita * 2, p.raioOrbita * 2);

    // planeta
    fill(237, 224, 196);
    noStroke();
    circle(x, y, p.tamanho);
  }
}