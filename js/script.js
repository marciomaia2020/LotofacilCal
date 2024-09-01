/*SEM A REGRA DIRETA DO SITE

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
        ">Valor da Teimosinha</div>
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
*/

/*COM AS REGRAS RETIRADA DIRETO DO SITE

O Bolão das Loterias CAIXA é a forma que o apostador tem de realizar apostas em grupo. Basta preencher> o campo próprio no volante ou solicitar ao atendente da lotérica.

Na Lotofácil, os bolões têm preço mínimo de R$ 12,00, cada cota não pode ser inferior a R$ 4,00, sendo possível realizar um bolão com no mínimo 2 e no máximo 7 cotas (para apostas compostas por 15 números) ou mínimo de 2 e máximo de 25 (para apostas compostas por 16 números) ou mínimo de 2 e máximo de 30 (para apostas compostas por 17 números) ou mínimo de 2 e máximo de 35 (para apostas compostas por 18 números) ou mínimo de 2 e máximo de 70 (para apostas compostas por 19 números) ou mínimo de 2 e máximo de 100 (para apostas compostas por 20 números).

É permitida a realização de no máximo 10 jogos no recibo, em caso de bolões com 15, 16, 17, 18 ou 19 e no máximo 4 apostas por Bolão para bolões com 20 números. Em caso de Bolão com mais de uma aposta, todas elas deverão conter a mesma quantidade de números de prognósticos.

Outra forma de participar do Bolão da Lotofácil é comprando cotas de bolões organizados pelas lotéricas. Neste caso, poderá ser cobrada uma Tarifa de Serviço adicional de até 35% do valor da cota. As cotas também podem ser compradas no Portal www.loteriasonline.caixa.gov.br com tarifa de serviço adicional de 35% do valor da cota. O horário de venda dos bolões digitais encerra às 19h30 para os jogos com sorteios realizados no mesmo dia. O valor mínimo de compra de cota é de R$ 20,00.


*/

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
        15: 10,  // Máximo 10 jogos com 15 números
        16: 10,  // Máximo 10 jogos com 16 números
        17: 10,  // Máximo 10 jogos com 17 números
        18: 10,  // Máximo 10 jogos com 18 números
        19: 10,  // Máximo 10 jogos com 19 números
        20: 4    // Máximo 4 jogos com 20 números
    };

    if (quantidadeJogosInput > quantidadeJogosMaxima[dezenas]) {
        document.getElementById('error-quantidadeJogos').innerText = `A quantidade de jogos não pode exceder ${quantidadeJogosMaxima[dezenas]} para ${dezenas} dezenas.`;
        valid = false;
    }

    // Validação do número de cotas com base na quantidade de dezenas
    const cotasMinimasMaximas = {
        15: [2, 7],
        16: [2, 25],
        17: [2, 30],
        18: [2, 35],
        19: [2, 70],
        20: [2, 100]
    };

    const [cotasMinima, cotasMaxima] = cotasMinimasMaximas[dezenas];

    if (cotas < cotasMinima || cotas > cotasMaxima) {
        document.getElementById('error-cotas').innerText = `Para ${dezenas} dezenas, o número de cotas deve ser entre ${cotasMinima} e ${cotasMaxima}.`;
        valid = false;
    }

    if (!valid) {
        return; // Interrompe a execução se houver erros
    }

    // Preços das apostas baseados no valor da aposta simples
    const precoBase = {
        15: valorAposta,
        16: valorAposta * 16,
        17: valorAposta * 136,
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
            background-color: #f9f9f9; /* Fundo cinza claro */
            border: 1px solid #ddd; /* Borda cinza clara */
            border-radius: 8px; /* Bordas arredondadas */
            padding: 20px; /* Espaçamento interno */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve */
            max-width: 500px; /* Largura máxima */
            margin: 0 auto; /* Centraliza horizontalmente */
            text-align: center; /* Centraliza o texto */
            display: inline-block; /* Exibe em linha com o resultado da Teimosinha */
        ">
            <div style="
                font-size: 1.5em; /* Tamanho maior para o título */
                color: #333; /* Cor do texto escura */
                margin-bottom: 15px; /* Espaçamento inferior */
            ">Exibição do Resultado</div>
            <div style="
                font-size: 0.8em; /* Tamanho do texto */
                color: #555; /* Cor do texto em cinza médio */
                line-height: 1.5; /* Espaçamento entre linhas */
                margin-bottom: 10px; /* Espaçamento inferior */
                background-color: #eeddea; /* Cor de fundo */
                border-radius: 8px; /* Arredondamento da borda */
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
        background-color: #f9f9f9; /* Fundo cinza claro */
        border: 1px solid #ddd; /* Borda cinza clara */
        border-radius: 8px; /* Bordas arredondadas */
        padding: 20px; /* Espaçamento interno */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra leve */
        max-width: 500px; /* Largura máxima */
        margin: 0 auto; /* Centraliza horizontalmente */
        text-align: center; /* Centraliza o texto */
        display: inline-block; /* Exibe em linha com o resultado do custo */
    ">
        <div style="
            font-size: 1.5em; /* Tamanho maior para o título */
            color: #333; /* Cor do texto escura */
            margin-bottom: 15px; /* Espaçamento inferior */
        ">Valor da Teimosinha</div>
        <div style="
            font-size: 0.8em; /* Tamanho do texto */
            color: #555; /* Cor do texto em cinza médio */
            line-height: 1.5; /* Espaçamento entre linhas */
            margin-bottom: 10px; /* Espaçamento inferior */
            background-color: #eeddea; /* Cor de fundo */
            border-radius: 8px; /* Arredondamento da borda */
        ">
            Valor da Teimosinha (Custo Total x ${concursosConsecutivos} concursos): <strong>R$ ${valorTeimosinha.toFixed(2)}</strong>
        </div>
    </div>`;

    document.getElementById('resultadoTeimosinha').innerHTML = resultadoTeimosinha;
}
