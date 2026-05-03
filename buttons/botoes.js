// Seleciona todos os botões que têm a classe 'btn_action'
const botoesAcao = document.querySelectorAll('.btn_action');

// Define as cores
const corOriginal = '#fa7f5d'; 
const corNova = '#d95a38'; // Um tom mais escuro de laranja (podes alterar)

// Passa por cada botão e adiciona os eventos
botoesAcao.forEach(botao => {
    
    // Quando o rato passa por cima (Mouse Over)
    botao.addEventListener('mouseover', () => {
        botao.style.backgroundColor = corNova;
        botao.style.cursor = 'pointer'; // Muda a setinha para a mão de clicar
    });

    // Quando o rato sai de cima (Mouse Out)
    botao.addEventListener('mouseout', () => {
        botao.style.backgroundColor = corOriginal;
    });
});