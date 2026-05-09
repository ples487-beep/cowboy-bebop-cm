// Seleciona todos os botões que têm a classe 'btn_action'
let botoesAcao = document.querySelectorAll('.btn_action');

// Passa por cada botão e adiciona os eventos
botoesAcao.forEach(botao => {

    let botaoClicado = false;
    
    // Quando o rato passa por cima (Mouse Over)
    botao.addEventListener('mouseover', () => {
        botao.style.cursor = 'pointer'; 
        
        // Só muda a cor se NÃO for o btn_dr
        if (botao.id !== 'btn_dr') {
            botao.style.filter = 'brightness(1.2)';
            //botao.style.backgroundColor = '#d95a38';
        }
    });

    // Quando o rato sai de cima (Mouse Out)
    botao.addEventListener('mouseout', () => {
        // Só muda a cor se NÃO for o btn_dr
        if (botao.id !== 'btn_dr') {
            if(botaoClicado === false){
                //botao.style.backgroundColor = '#fa7f5d';
                botao.style.filter = 'none';
            } else if(botaoClicado === true){
                //botao.style.backgroundColor = '#FF3131';
            }
        }
    });

    // Quando o rato clica no botão
    botao.addEventListener('click', () => {
        botaoClicado = !botaoClicado;

        // A lógica do som para o BX continua a funcionar normalmente!
        if (botao.id === 'btn_bx'){
            if (somBass && somBass.isLoaded()) {
                if (botaoClicado === true){
                    somBass.play();
                } else {
                    somBass.pause();
                }
            } 
        } 

        // Muda a cor do clique, ignorando apenas o btn_dr
        if (botao.id !== 'btn_dr') {
            if(botaoClicado === true){
                //botao.style.backgroundColor = '#FF3131'; 
            } else {
                //botao.style.backgroundColor = '#d95a38'; 
            }
        }
    });
});


// ==========================================
// 4. LÓGICA DO BOTÃO VOLTAR
// ==========================================
let btnVoltar = document.getElementById('btn_vl');

if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
        // Redireciona para a página principal
        // NOTA: Se o teu index.html estiver uma pasta atrás (na pasta principal do projeto),
        // deves usar '../index.html'. Se estiver na mesma pasta, usa apenas 'index.html'.
        window.location.href = '../navegação/index.html'; 
    });
}


// ==========================================
// 3. LÓGICA DO BOTÃO REC
// ==========================================
let btnRec = document.getElementById('btn_rec');
let aGravar = false;

if (btnRec) {
    btnRec.addEventListener('click', () => {
        
        // SE NÃO ESTIVER A GRAVAR -> COMEÇA A GRAVAR
        if (aGravar === false) {
            // Cria um ficheiro de som VAZIO para guardar esta sessão
            ficheiroGravacao = new p5.SoundFile();
            
            // Manda o gravador enviar o som para este ficheiro
            gravador.record(ficheiroGravacao);
            
            aGravar = true;
            btnRec.classList.add('gravando'); // Liga a luz vermelha a piscar
            btnRec.innerText = "STOP";
        } 
        
        // SE ESTIVER A GRAVAR -> PÁRA E GUARDA
        else {
            gravador.stop();
            aGravar = false;
            btnRec.classList.remove('gravando'); // Desliga a luz vermelha
            btnRec.innerText = "REC";

            // Aguarda um pequeno momento para o p5.js processar o áudio final
            setTimeout(() => {
                // 1. Extrai o áudio gravado (Blob = Binary Large Object)
                let blobAudio = ficheiroGravacao.getBlob();
                
                // 2. Cria um URL temporário no navegador para esse áudio
                let urlAudio = URL.createObjectURL(blobAudio);
                
                // 3. Cria o leitor de áudio no HTML
                let leitorAudio = document.createElement('audio');
                leitorAudio.controls = true; // Mostra os botões de play/pause/volume
                leitorAudio.src = urlAudio;
                leitorAudio.style.width = "250px"; // Tamanho do leitor
                
                // 4. Adiciona o leitor ao nosso Painel de Gravações
                document.getElementById('painel_gravacoes').appendChild(leitorAudio);
            }, 100); // 100 milissegundos de pausa por segurança
        }
    });
}



// ==========================================
// 2. LÓGICA DO BOTÃO ROTATIVO (KNOB - DR) - ATUALIZADO
// ==========================================
let btnRodar = document.getElementById('btn_dr');

if (btnRodar) {
    let isDragging = false;
    let startY = 0;          

    let visualImageOffset = 180; 
    let currentLogicalAngle = -135; // Começa no MÍNIMO (Volume 0)

    function updateKnob() {
        // 1. Rotação visual no CSS
        let totalTransformAngle = visualImageOffset + currentLogicalAngle;
        btnRodar.style.transform = `rotate(${totalTransformAngle}deg)`;

        // 2. Cálculo do Volume (de 0.0 a 1.0)
        let volumeCalculado = (currentLogicalAngle + 135) / 270;

        // 3. ATUALIZAR O VOLUME DOS SONS:
        
        // Opção A: Usar o Volume Master do p5.js (afeta TODOS os sons da página)
        if (typeof outputVolume === 'function') {
            outputVolume(volumeCalculado);
        }
        
        // Opção B: (Alternativa) Atualizar cada som individualmente 
        // (útil se depois quiseres que o botão afete SÓ o baixo, por exemplo)
        if (typeof somBass !== 'undefined' && somBass.isLoaded()) {
            somBass.setVolume(volumeCalculado);
        }
        if (typeof somBateria !== 'undefined' && somBateria.isLoaded()) {
            somBateria.setVolume(volumeCalculado);
        }
        if (typeof somSax !== 'undefined' && somSax.isLoaded()) {
            somSax.setVolume(volumeCalculado);
        }
    }

    // Inicializa o botão na posição de "Volume 0" e silencia tudo no início
    updateKnob();

    // A) Clicar
    btnRodar.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY; 
        btnRodar.style.cursor = 'ns-resize'; 
    });

    // B) Arrastar
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return; 

        let deltaY = startY - e.clientY;
        currentLogicalAngle += deltaY * 1.5; 

        if (currentLogicalAngle > 135) currentLogicalAngle = 135;
        if (currentLogicalAngle < -135) currentLogicalAngle = -135;

        updateKnob(); // Atualiza visual e som ao mesmo tempo
        startY = e.clientY;
    });

    // C) Largar
    document.addEventListener('mouseup', () => {
        isDragging = false;
        btnRodar.style.cursor = 'pointer';
    });
}