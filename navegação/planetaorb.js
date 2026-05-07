class Planeta {
  constructor(nome, raioOrbita, tamanho, angulo, velocidade, cor) {
    this.nome = nome;
    this.raioOrbita = raioOrbita;
    this.tamanho = tamanho;
    this.angulo = angulo;
    this.velocidade = velocidade;
    this.cor = cor;

    this.hover = false;
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

    // hover
    let d = dist(mouseX, mouseY, x, y);
    this.hover = d < this.tamanho * 2;

    // tamanho
    let tamanhoFinal = this.hover
      ? this.tamanho * 2.3
      : this.tamanho * 2;

    // órbita
    noFill();
    stroke(237, 224, 196, 40);
    strokeWeight(0.5);
    ellipse(cx, cy, this.raioOrbita * 2, this.raioOrbita * 0.6);

    // glow hover
    if (this.hover) {
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = this.cor;
    }

    // planeta
    tint(this.cor);
    imageMode(CENTER);

    image(
      imgPlanetasMap[this.nome],
      x,
      y,
      tamanhoFinal,
      tamanhoFinal
    );

    noTint();
    drawingContext.shadowBlur = 0;

    imageMode(CORNER);
  }
}