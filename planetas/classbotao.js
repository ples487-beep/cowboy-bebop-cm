/*class Botao {
  //constructor(x, y, w, h, label, stroke = null, cor = null, corHover = null, fonte = null) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
    this.stroke = stroke;
    this.cor = cor;
    this.corHover = corHover;
    this.fonte = fonte;
    this.ativo = false;
  }

  desenhar() {

    let hover = this.estaHover();
    let aceso = this.ativo || hover;

    // Cor do botão (fill e stroke)
    if (this.corHover) {
      if (aceso) {
        fill(this.corHover);
        stroke(this.corHover);
      } else {
        //fill(100, 30, 30);
        fill(this.cor);
        stroke(this.stroke);
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
}*/

const estiloAcao = {
  corNormal : [200, 50, 50],
  corHover : [255, 100, 100],
  corClique : [150, 0, 0],
  corTexto : [255,255,255],
  espessuraBorda : 2
};

const estiloNavegacao = {
  corTexto : [255,255,255],
  corTextoHover : [255,0,0],
  espessuraBorda : 0
};


class Botao {
  constructor(x, y, w, h, label, estilo){

    //coordenadas / dimensões / texto
    this.X = x;
    this.Y = y;
    this.W = w;
    this.H = h;
    this.label = label;
    
    //para o estilo
    this.corNormal = corNormal;
    this.corHover = corHover;
    this.corClique = corClique;
    this.corTexto = corTexto;
    this.corTextoHover = corTextoHover;
    this.espessuraBorda = espessuraBorda;  
 
  }
}
