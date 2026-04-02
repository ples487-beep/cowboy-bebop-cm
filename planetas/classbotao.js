class Botao {
  constructor(x, y, w, h, label) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.ativo = false;
  }

  desenhar() {
    let hover = this.estaHover();
    let aceso = this.ativo || hover;

    fill(aceso ? 200 : 20, aceso ? 150 : 15, aceso ? 50 : 10);
    stroke(aceso ? 230 : 80, aceso ? 180 : 60, aceso ? 80 : 30);
    strokeWeight(1);
    rect(this.x, this.y, this.w, this.h);

    fill(aceso ? 10 : 180, aceso ? 8 : 140, aceso ? 5 : 80);
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