let planetas = [
  new Planeta('VÉNUS',    100, 10, 0,   0.008, '#4a7fc8'),
  new Planeta('TERRA',    160, 11, 1,   0.006, '#4a7fc8'),
  new Planeta('MARTE',    230, 10, 2,   0.004, '#c8a44a'),
  new Planeta('GANYMEDE', 310, 13, 3.5, 0.002, '#7a9cbf'),
];

function setup() {
  createCanvas(windowWidth, windowHeight)
  //crt = createFilterShader(fip.crt)
}

function draw() {
  //crt.setUniform('time', millis() * 0.001);
  //filter(crt);
  background(8, 6, 4);
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

function mousePressed() {
  let cx = width / 2;
  let cy = height / 2;

  for (let p of planetas) {
    let pos = p.posicao(cx, cy);
    let d = dist(mouseX, mouseY, pos.x, pos.y);

    if (d < p.tamanho*2 && p.nome === 'MARTE') {
      window.location.href = 'planetas/marte.html';
    }
  }
}