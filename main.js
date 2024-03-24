let tarefasNaoConcluidas = [];
let tarefasConcluidas = [];
let divTarefas = document.querySelector("#listTasks");

let estadoTarefa = "tarefaNaoConcluida";
let tarefaFoiConcluida = false;

function verificaDuplicidadeInputVazio() {
  let valorInput = document.querySelector("#taskInput").value;
  if (
    tarefasNaoConcluidas.includes(valorInput) ||
    tarefasConcluidas.includes(valorInput)
  ) {
    alert("Tarefa já cadastrada!");
  } else if (valorInput === "") {
    alert("Digite uma tarefa!");
  } else {
    tarefasNaoConcluidas.push(valorInput);
    imprimirLista(tarefasNaoConcluidas);
  }
}

function deletarTarefa(indice, concluida) {
  if (concluida) {
    tarefasConcluidas.splice(indice, 1);
    imprimirLista(tarefasConcluidas);
  } else {
    tarefasNaoConcluidas.splice(indice, 1);
    imprimirLista(tarefasNaoConcluidas);
  }
}

function verificaQualTarefaEh (listaTarefa) {
  if (listaTarefa === tarefasConcluidas) {
    estadoTarefa = 'tarefaConcluida';
    tarefaFoiConcluida = true;
  } else {
    estadoTarefa = 'tarefaNaoConcluida';
    tarefaFoiConcluida = false;
  }
}

function concluirTarefa(indice) {
  tarefasConcluidas.push(tarefasNaoConcluidas[indice]);
  tarefasNaoConcluidas.splice(indice, 1);
    imprimirLista(tarefasNaoConcluidas);
}

function imprimirLista(lista = []) {
  divTarefas.innerHTML = '';
  verificaQualTarefaEh(lista);
  for (let i = 0; i < lista.length; i++) {
    divTarefas.innerHTML += `<div class="${estadoTarefa}">
            <h3>${lista[i]}</h3>
            <button onclick="concluirTarefa(${i})">Concluir</button>
            <button onclick="deletarTarefa(${i}, ${tarefaFoiConcluida})">Deletar</button>
          </div>`;
  }
}
