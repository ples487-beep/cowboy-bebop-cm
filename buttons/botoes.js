// Seleciona todos os botões que têm a classe 'btn_action'
let botoesAcao = document.querySelectorAll('.btn_action');

// Define as cores
let corOriginal = '#fa7f5d'; 

let somBass;
let somBateria;
let somSax;

function preload(){
    somBass = loadSound('../elementos/sounds/double_bass.wav');
    somBateria = loadSound('../elementos/sounds/jazz-drumming_170bpm.wav');
    somSax = loadSound('../elementos/sounds/sax-phrase-honey-moon-pt-8_90bpm_D_minor.wav');
}

function setup(){
    //console.log("p5.js carregado e pronto a funcionar!");
}

// Passa por cada botão e adiciona os eventos
botoesAcao.forEach(botao => {

    let botaoClicado = false;
    
    // Quando o rato passa por cima (Mouse Over)
    botao.addEventListener('mouseover', () => {
        botao.style.backgroundColor = '#d95a38';
        botao.style.cursor = 'pointer'; 
    });

    // Quando o rato sai de cima (Mouse Out)
    botao.addEventListener('mouseout', () => {
        if(botaoClicado === false){
            botao.style.backgroundColor = '#fa7f5d';
        } else if(botaoClicado === true){
            botao.style.backgroundColor = '#FF3131';
        }
    });

    //Quando o rato clica no botão
    botao.addEventListener('click', () => {
        botaoClicado = !botaoClicado;

        if (botao.id === 'btn_bx'){
            
            // CINTO DE SEGURANÇA: Verifica se o som existe e já carregou
            if (somBass && somBass.isLoaded()) {
                if (botaoClicado === true){
                    somBass.play();
                } else {
                    somBass.pause();
                }
            } else {
                // Se o som ainda não existir, avisa na consola e anula o clique
                //console.log("Calma! O som BX ainda está a carregar ou o caminho está errado.");
                botaoClicado = !botaoClicado; // Reverte o estado do botão
            }
        }
    });
});