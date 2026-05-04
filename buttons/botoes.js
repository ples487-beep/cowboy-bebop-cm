// Seleciona todos os botões que têm a classe 'btn_action'
let botoesAcao = document.querySelectorAll('.btn_action');

// Define as cores
let corOriginal = '#fa7f5d'; 
//let corNova = '#d95a38'; // Um tom mais escuro de laranja (podes alterar)


// Passa por cada botão e adiciona os eventos
botoesAcao.forEach(botao => {

    let botaoClicado = false;
    
    // Quando o rato passa por cima (Mouse Over)
    botao.addEventListener('mouseover', () => {
        corOriginal = '#d95a38';
        botao.style.backgroundColor = corOriginal;
        botao.style.cursor = 'pointer'; // Muda a setinha para a mão de clicar
    });

    // Quando o rato sai de cima (Mouse Out)
    botao.addEventListener('mouseout', () => {
        //corOriginal = '#fa7f5d';
        //botao.style.backgroundColor = corOriginal;
        if(botaoClicado === false){
            corOriginal = '#fa7f5d';
            botao.style.backgroundColor = corOriginal;
        }

        else if(botaoClicado === true){
            corOriginal = '#FF3131';
            botao.style.backgroundColor = corOriginal;
        }
    });

    //Quando o rato clica no botão
    botao.addEventListener('click', () => {
        botaoClicado = !botaoClicado;
        //corOriginal = '#fa7f5d';
        //botao.style.backgroundColor = corOriginal;
    });
});