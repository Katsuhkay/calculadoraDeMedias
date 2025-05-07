const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji Aprovado" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji Reprovado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt('Digite a nota mínima para aprovação: ').replace(',', '.')); // Trata vírgula

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade "${inputNomeAtividade.value}" já foi adicionada.`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value.replace(',', '.'))); // Trata vírgula
    
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${parseFloat(inputNotaAtividade.value) >= notaMinima ? imgAprovado : imgReprovado}</td>`; // Usa notaMinima
        linha += `</tr>`;
    
        linhas += linha;
    }

    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    const mediaFinal = calculaMediaFinal();
    document.getElementById('mediaFinalValor').innerHTML = mediaFinal.toFixed(2);
    document.querySelector('.mediaFinalResultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado; // Corrigido o seletor
}

function calculaMediaFinal() {
    if (notas.length === 0) return 0; // Evita divisão por zero
    let somaDasNotas = 0;
    for (let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }
    return somaDasNotas / notas.length;
}