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

  // órbita
  noFill();
  stroke(237, 224, 196, 40);
  strokeWeight(0.5);
  ellipse(cx, cy, this.raioOrbita * 2, this.raioOrbita * 0.6);

  // planeta com textura
  tint(this.cor);
  imageMode(CENTER);
  image(imgPlanetasMap[this.nome], x, y, this.tamanho * 2, this.tamanho * 2);
  noTint();
  imageMode(CORNER);
}
}