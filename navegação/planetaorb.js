class Planeta {
  constructor(nome, raioOrbita, tamanho, angulo, velocidade, cor) {
  this.nome = nome;
  this.raioOrbita = raioOrbita;
  this.tamanho = tamanho;
  this.angulo = angulo;
  this.velocidade = velocidade;
  this.cor = cor;
}

  atualizar() {
    this.angulo += this.velocidade;
  }

  posicao(cx, cy) {
  return {
    x: cx + cos(this.angulo) * this.raioOrbita,
    y: cy + sin(this.angulo) * this.raioOrbita * 0.3,
  };
}

desenhar(cx, cy) {
  let { x, y } = this.posicao(cx, cy);

  // orbita achatada
  noFill();
  stroke(60, 100, 180);
  strokeWeight(0.8);
  ellipse(cx, cy, this.raioOrbita * 2, this.raioOrbita * 0.6);

  // planeta
  fill(this.cor);
  noStroke();
  circle(x, y, this.tamanho);
}
}