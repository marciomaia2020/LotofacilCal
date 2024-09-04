let custoTotal = 0; // Variável global para armazenar o custo total

document.addEventListener('DOMContentLoaded', () => {
    // Inicialmente esconder o botão da Teimosinha
    document.getElementById('teimosinhaBtn').style.display = 'none';
});

function calcularCusto() {
    const valorAposta = parseFloat(document.getElementById('valorAposta').value);
    const dezenas = parseInt(document.getElementById('dezenas').value, 10);
    const quantidadeJogosInput = parseInt(document.getElementById('quantidadeJogos').value, 10);
    const cotas = parseInt(document.getElementById('cotas').value, 10);

    // Limpar mensagens de erro anteriores
    document.getElementById('error-valorAposta').innerText = '';
    document.getElementById('error-dezenas').innerText = '';
    document.getElementById('error-quantidadeJogos').innerText = '';
    document.getElementById('error-cotas').innerText = '';

    let valid = true;

    // Validação dos campos
    if (valorAposta <= 0) {
        document.getElementById('error-valorAposta').innerText = 'O valor da aposta deve ser maior que 0.';
        valid = false;
    }

    if (![15, 16, 17, 18, 19, 20].includes(dezenas)) {
        document.getElementById('error-dezenas').innerText = 'A quantidade de dezenas deve ser 15, 16, 17, 18, 19 ou 20.';
        valid = false;
    }

    // Quantidade de jogos máxima permitida para cada quantidade de dezenas
    const quantidadeJogosMaxima = {
        15: 1,
        16: 16,
        17: 136,
        18: 816,
        19: 3876,
        20: 15504
    };

    if (quantidadeJogosInput > quantidadeJogosMaxima[dezenas]) {
        document.getElementById('error-quantidadeJogos').innerText = `A quantidade de jogos não pode exceder ${quantidadeJogosMaxima[dezenas]} para ${dezenas} dezenas.`;
        valid = false;
    }

    if (cotas <= 0) {
        document.getElementById('error-cotas').innerText = 'O número de cotas deve ser maior que 0.';
        valid = false;
    }

    if (!valid) {
        return; // Interrompe a execução se houver erros
    }

    // Preços das apostas baseados no valor da aposta simples
    const precoBase = {
        15: valorAposta,
        16: valorAposta * 16,
        17: valorAposta * 160,
        18: valorAposta * 816,
        19: valorAposta * 3876,
        20: valorAposta * 15504
    };

    // Cálculo do custo total
    const precoPorJogo = precoBase[dezenas];
    custoTotal = precoPorJogo * quantidadeJogosInput; // Armazena o custo total na variável global
    const custoPorCota = custoTotal / cotas;

    // Exibição do resultado do custo
    const resultadoCusto = `
        <div style="
            background-color: #f9f9f9; /* Fundo cinza claro 
            border: 1px solid #ddd; /* Borda cinza clara 
            border-radius: 8px; /* Bordas arredondadas 
            padding: 20px; /* Espaçamento interno 
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve 
            max-width: 500px; /* Largura máxima 
            margin: 0 auto; /* Centraliza horizontalmente 
            text-align: center; /* Centraliza o texto 
            display: inline-block; /* Exibe em linha com o resultado da Teimosinha 
         ">
            <div style="
                font-size: 1.5em; /* Tamanho maior para o título 
                color: #333; /* Cor do texto escura 
                margin-bottom: 15px; /* Espaçamento inferior 
            ">Exibição do Resultado</div>
            <div style="
                font-size: 0.8em; /* Tamanho do texto 
                color: #555; /* Cor do texto em cinza médio 
                line-height: 1.5; /* Espaçamento entre linhas 
                margin-bottom: 10px; /* Espaçamento inferior 
                background-color: #eeddea; /* Cor de fundo 
                border-radius: 8px; /* Arredondamento da borda 
            ">
                <span style="color: rgb(38, 0, 254);">Quantidade de Jogos:</span> <strong>${quantidadeJogosInput}</strong><br>
                Custo Total: <strong>R$ ${custoTotal.toFixed(2)}</strong><br>
                Custo por Cota/Pessoa: <strong>R$ ${custoPorCota.toFixed(2)}</strong>
            </div>
        </div>
    `;

    document.getElementById('resultado').innerHTML = resultadoCusto;

    // Exibir o botão da Teimosinha
    document.getElementById('teimosinhaBtn').style.display = 'inline-block';
}

function calcularTeimosinha() {
    const concursosConsecutivos = parseInt(document.getElementById('concursosConsecutivos').value, 10);

    // Limpar mensagens de erro anteriores
    document.getElementById('error-concursosConsecutivos').innerText = '';

    let valid = true;

    if (![3, 6, 12, 18, 24].includes(concursosConsecutivos)) {
        document.getElementById('error-concursosConsecutivos').innerText = 'O número de concursos consecutivos deve ser 3, 6, 12, 18 ou 24.';
        valid = false;
    }

    if (custoTotal <= 0) {
        document.getElementById('error-valorAposta').innerText = 'O custo total deve ser maior que 0. Calcule o custo total primeiro.';
        valid = false;
    }

    if (!valid) return;

    const valorTeimosinha = custoTotal * concursosConsecutivos;

    // Atualiza o resultado com o valor da Teimosinha
    const resultadoTeimosinha = `<div style="
        background-color: #f9f9f9; /* Fundo cinza claro 
        border: 1px solid #ddd; /* Borda cinza clara 
        border-radius: 8px; /* Bordas arredondadas 
        padding: 20px; /* Espaçamento interno 
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve 
        max-width: 500px; /* Largura máxima 
        margin: 0 auto; /* Centraliza horizontalmente 
        text-align: center; /* Centraliza o texto 
        display: inline-block; /* Exibe em linha com o resultado do custo 
    ">
        <div style="
            font-size: 1.5em; /* Tamanho maior para o título 
            color: #333; /* Cor do texto escura 
            margin-bottom: 15px; /* Espaçamento inferior 
        ">Teimosinha</div>
        <div style="
            font-size: 0.8em; /* Tamanho do texto 
            color: #555; /* Cor do texto em cinza médio 
            line-height: 1.5; /* Espaçamento entre linhas 
            margin-bottom: 10px; /* Espaçamento inferior 
            background-color: #eeddea; /* Cor de fundo 
            border-radius: 8px; /* Arredondamento da borda 
        ">
            Valor Total da Teimosinha: <strong style="color: red;">R$ ${valorTeimosinha.toFixed(2)}</strong>
        </div>
    </div>`;

    document.getElementById('resultado').innerHTML = resultadoTeimosinha;
}
