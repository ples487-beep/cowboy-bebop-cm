let estado = 'mapa';
let planetaAtual = null;

let planetas = [
  new Planeta('VENUS',    180, 24, 0,   0.001,  '#ffae00'),
  new Planeta('MARTE',    280, 24, 2,   0.0009,  'rgb(252, 68, 62)'),
  new Planeta('TIJUANA',  400, 20,  1,   0.0003, '#6bebc2'),
  new Planeta('GANYMEDE', 520, 24, 3.5,  0.0001,  '#4117ff'),
];

let tempoCutscene = 0;
let imgNave, imgPortal, imgBg, imgEstrelas;
let imgPlanetas = {};
let imgPlanetasMap = {};
let font ;

let zoomAtual = 1;
let zoomAlvo = 1;
let offsetX = 0;
let offsetY = 0;
let aDragging = false;
let dragStartX, dragStartY;

let gravacoes = [];
let videoElements = [];
const MAX_GRAVACOES = 5; // limite máximo de gravações guardadas

let popupAberto = false;

function preload() {
  font = loadFont('navegacao/fontes/bookman1.ttf');
  font2 = loadFont('navegacao/fontes/IBMPlexMono-Regular.ttf');

  imgPlanetas['VENUS'] = loadImage('navegacao/assets/venus.png');
  imgPlanetas['TIJUANA'] = loadImage('navegacao/assets/tijuana.png');
  imgPlanetas['MARTE'] = loadImage('navegacao/assets/marte.png');
  
  imgPlanetas['GANYMEDE'] = loadImage('navegacao/assets/ganymede.png');

  imgPlanetasMap['VENUS']    = loadImage('navegacao/assets/venus_map.png');
  imgPlanetasMap['MARTE']    = loadImage('navegacao/assets/marte_map.png');
  imgPlanetasMap['TIJUANA']  = loadImage('navegacao/assets/tijuana_map.png');
  imgPlanetasMap['GANYMEDE'] = loadImage('navegacao/assets/ganymede_map.png');

  imgNave = loadImage('navegacao/assets/nave.png');
  imgPortal = loadImage('navegacao/assets/portal.png');
  imgBg = loadImage('navegacao/assets/bg.png');
  imgEstrelas = loadImage('navegacao/assets/estrelas.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //GRAVAÇOES
  carregarGravacoes();
  
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

// fundo
tint(65, 23, 255,80);
image(imgBg, 0, 0, width, height);
noTint();
// estrelas 
tint(65, 23, 255,200);
let estrelasX = map(mouseX, 0, width, -20, 20);
let estrelasY = map(mouseY, 0, height, -10, 10);
image(imgEstrelas,estrelasX * 0.5,estrelasY * 0.5,width,height);
tint(65, 23, 255, 80);
image(imgEstrelas,100+estrelasX,50+estrelasY,width,height);
noTint();
// centro
fill(237, 224, 196);
noStroke();
circle(cx, cy, 30);

//cinturão
desenharCinturao(cx, cy);

//desenhar planetas loop

 for (let p of planetas) {
    p.atualizar();
    p.desenhar(cx, cy);
    
    let pos = p.posicao(cx, cy);
    
    // nome pequeno por cima do planeta
    fill(237, 224, 196);
    textAlign(CENTER, TOP);
    textSize(12);
    noStroke();
    textFont(font2);
    text(p.nome, pos.x, pos.y + p.tamanho + 5);

    // hover em baixo
    let d = dist(mouseX, mouseY, pos.x, pos.y);
    if (d < p.tamanho * 3) {
      fill(p.cor);
      textFont(font);
      textSize(48);
      textAlign(LEFT, BOTTOM);
      noStroke();
      text(p.nome, 40, height - 60);
      
      fill(237, 224, 196, 150);
      textFont(font2);
      textSize(11);
      text('// clica para visitar', 40, height - 35);
    }
  }

  //desenhar cartões de gravação (fora do loop para não sobrepor)
  desenharCartoes();

  //hud
  fill(255, 220);
  textFont(font2);
  textSize(12);
  letterSpacing = 1;
  textAlign(LEFT, TOP);
  noStroke();
  text('THE UNIVERSE OF COWBOY BEBOP', 30, 30);
  
  // desenhar popup se aberto
  if (popupAberto) {
    desenharPopup();
  }

  
}
function desenharCinturao(cx, cy) {
  randomSeed(42);
  noStroke();
  for (let i = 0; i < 80; i++) {
    let a = random(TWO_PI);
    let r = 450 + random(-25, 25);
    let x = cx + cos(a) * r;
    let y = cy + sin(a) * r * 0.3;
    fill(65, 23, 255,random(60, 150));
    circle(x, y, random(1, 3));
  }
}
function desenharCartoes() {
  if (gravacoes.length === 0) return;
  
  let cardW = 216;
  let cardH = 60;
  let spacing = 12;
  let startX = width - (gravacoes.length * (cardW + spacing)) - 30; // direita para esquerda
  let startY = height - cardH - 45;

  for (let i = 0; i < gravacoes.length; i++) {
    let x = startX + i * (cardW + spacing);
    let g = gravacoes[i];

    // fundo
    fill('#06011e');
    stroke('#4117ff');
    strokeWeight(1);
    rect(x, startY, cardW, cardH);

    // texto
    fill(237, 224, 196);
    noStroke();
    textFont(font2);
    textSize(10);
    textAlign(LEFT, TOP);
    text(g.planeta, x + 12, startY + 10);
    text(g.data, x + 12, startY + 24);
    
    fill('#4117ff');
    textSize(9);
    textAlign(LEFT, TOP);
    text('VER', x + 12, startY + 39);
    textAlign(RIGHT, TOP);
    text('DOWNLOAD', x + cardW - 12, startY + 39);
  }
}
function desenharCutscene() {
  tempoCutscene++;

  let progresso = tempoCutscene / 180;
  let scroll = width * 0.03 * progresso;
  let offset = width * 0.08 * progresso;
  
  //image(imgBg, -width * 0.05 - scroll, -height * 0.05, width * 1.1, height * 1.1);
  
  
  //desenha o respetivo planeta 
  tint(planetaAtual.cor);
  image(imgEstrelas, -width * 0.05 - scroll, -height * 0.05, width * 1.1, height * 1.1);
  noTint();

  image(imgPlanetas[planetaAtual.nome], width * 0.35 + offset * 0.5, height * -0.2, height * 1.1, height * 1.1);
  
  tint(planetaAtual.cor);
  image(imgPortal, width * 0.1 + offset * 0.2, height * 0.45 - 20, 100, 100);
  image(imgPortal, width * 0.1 + offset * 0.45, height * 0.45 - 10, 130, 130);
  image(imgPortal, width * 0.1 + offset * 0.75, height * 0.45, 160, 160);
  image(imgNave, width * 0.2 + offset * 1.2, height * 0.5, 500, 400);
  noTint();

  fill(237, 224, 196, map(tempoCutscene, 0, 40, 0, 255));
  noStroke();
  textAlign(LEFT, CENTER);
  textFont(font);
  textSize(18);
  text('A APROXIMAR DE ' + planetaAtual.nome + '...', 40, height - 40);

  if (tempoCutscene > 100) {
    window.location.href = 'planetas/' + planetaAtual.nome.toLowerCase() + '.html';
    //window.location.href = './planetas/' + planetaAtual.nome.toLowerCase() + '.html';
  }
}

//Nova funcao de gravacao
function downloadGravacao(index) {
    let g    = gravacoes[index];
    let link = document.createElement('a');
    link.href     = videoElements[index].src;
    link.download = `${g.planeta}_${g.data}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function desenharPopup() {
  let popupW = 400;
  let popupH = 250;
  let popupX = (width - popupW) / 2;
  let popupY = (height - popupH) / 2;
  let closeBoxSize = 25;
  
  fill(0, 0, 0, 200);
  noStroke();
  rect(0, 0, width, height);
  
 
  fill('#06011e');
  stroke('#4117ff');
  strokeWeight(2);
  rect(popupX, popupY, popupW, popupH);
  

  fill('#ffffff');
  noStroke();
  textFont(font2);
  textSize(20);
  textAlign(CENTER, CENTER);
  text('x', popupX + popupW - closeBoxSize/2 - 10, popupY + closeBoxSize/2 + 15);
  
  // texto da descrição
  fill(237, 224, 196);
  textFont(font2);
  textSize(11);
  textAlign(LEFT, TOP);
  let descricao = "THE UNIVERSE OF COWBOY BEBOP é uma experiência interativa baseada na série de animação 'Cowboy Bebop'. Explora quatro localizações da série e cria as tuas próprias composições. Grava as tuas músicas e volta a ouvi-las no sistema solar.  ";
  let creditos = "Este projeto foi realizado no âmbito da unidade curricular de Comunicação Multimédia,LDM,FCTUC 25/26";
  text(descricao, popupX + 20, popupY + 40, popupW - 40, popupH - 80);
  text(creditos, popupX + 20, popupY + 180, popupW - 40, popupH - 80);
}
function mousePressed() {
  if (popupAberto) {
    let popupW = 400;
    let popupH = 250;
    let popupX = (width - popupW) / 2;
    let popupY = (height - popupH) / 2;
    let closeBoxSize = 25;
    let closeX = popupX + popupW - closeBoxSize/2 - 5;
    let closeY = popupY + closeBoxSize/2 - 5;
    if (dist(mouseX, mouseY, closeX, closeY) < closeBoxSize) {
      popupAberto = false;
      return;
    }
    if (mouseX < popupX || mouseX > popupX + popupW || mouseY < popupY || mouseY > popupY + popupH) {
      popupAberto = false;
      return;
    }
  }
  
  if (mouseX > 30 && mouseX < 280 && mouseY > 30 && mouseY < 50) {
    popupAberto = true;
    return;
  }

  let cx = width / 2;
  let cy = height / 2;

  // clicar nos planetas
  for (let p of planetas) {
    let pos = p.posicao(cx, cy);
    let d = dist(mouseX, mouseY, pos.x, pos.y);

    if (d < p.tamanho * 2) {
      planetaAtual = p;
      estado = 'cutscene';
      tempoCutscene = 0;
    }
  }

  // clicar nos cartões de gravação
  let cardW = 216;
  let cardH = 60;
  let spacing = 12;
  let startX = width - (gravacoes.length * (cardW + spacing)) - 30;
  let startY = height - cardH - 20;

  for (let i = 0; i < gravacoes.length; i++) {
    let x = startX + i * (cardW + spacing);
    
    if (mouseX > x && mouseX < x + cardW && mouseY > startY && mouseY < startY + cardH) {
      // tocar
      if (mouseX < x + (cardW / 2)) {
        abrirModalVideo(i);
      }
      // download
      else {
        downloadGravacao(i);
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//para o vídeo
function abrirDB() {
    return new Promise((resolve, reject) => {
        let req = indexedDB.open('GravacoesPlanetas', 1);
        req.onupgradeneeded = e => {
            e.target.result.createObjectStore('gravacoes', { keyPath: 'id', autoIncrement: true });
        };
        req.onsuccess = e => resolve(e.target.result);
        req.onerror   = e => reject(e.target.error);
    });
}

async function carregarGravacoes() {
    let db  = await abrirDB();
    let tx  = db.transaction('gravacoes', 'readonly');
    let req = tx.objectStore('gravacoes').getAll();
    req.onsuccess = () => {
        gravacoes = req.result;
        videoElements = gravacoes.map(g => {
            let v = document.createElement('video');
            v.src = URL.createObjectURL(g.video);
            v.style.display = 'none';
            document.body.appendChild(v);
            return v;
        });
    };
}

function abrirModalVideo(index) {
    let g      = gravacoes[index];
    let modal  = document.getElementById('modal_video');
    let player = document.getElementById('modal_video_player');
    let label  = document.getElementById('modal_label');

    label.innerText  = g.planeta + ' — ' + g.data;
    player.src       = videoElements[index].src;
    modal.style.display = 'flex';
    player.play();
}