class Botao {
  constructor(x, y, w, h, label, cor = null, fonte = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.ativo = false;
    this.cor = cor;
    this.fonte = fonte;
  }

  desenhar() {
    let hover = this.estaHover();
    let aceso = this.ativo || hover;

    // Cor do botão (fill e stroke)
    if (this.cor) {
      if (aceso) {
        fill(this.cor);
        stroke(this.cor);
      } else {
        fill(100, 30, 30);
        stroke(150, 50, 50);
      }
    } else {
      fill(aceso ? 200 : 20, aceso ? 150 : 15, aceso ? 50 : 10);
      stroke(aceso ? 230 : 80, aceso ? 180 : 60, aceso ? 80 : 30);
    }
    
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h);

    // Texto (números em vermelho com contraste)
    if (aceso) {
      fill(10, 10, 10);
    } else {
      fill(220, 100, 100);
    }
    
    if (this.fonte) textFont(this.fonte);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(this.label, this.x + this.w / 2, this.y + this.h / 2);
  }

  estaHover() {
    return mouseX > this.x && mouseX < this.x + this.w &&
           mouseY > this.y && mouseY < this.y + this.h;
  }

  clicado() {
    if (this.estaHover()) {
      this.ativo = !this.ativo;
      return true;
    }
    return false;
  }
}
