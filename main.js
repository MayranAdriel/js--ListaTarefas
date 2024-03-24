let tarefasNaoConcluidas = [];
let tarefasConcluidas = [];
let divTarefas = document.querySelector("#listTasks");

// Variaveis que contém o estado da tarefa antes de ser impresso;
let tarefa = {
  estado : 'tarefaNaoConcluida',
  foiConcluida : false,
  pendencia : 'Concluir'
}


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
    tarefa.estado = 'tarefaConcluida';
    tarefa.foiConcluida = true;
    tarefa.pendencia = 'Desfazer';
  } else {
    tarefa.estado = 'tarefaNaoConcluida';
    tarefa.foiConcluida = false;
    tarefa.pendencia = 'Concluir';
  }
}

function concluirTarefa(indice, concluida) {
  if (concluida) {
    tarefasNaoConcluidas.push(tarefasConcluidas[indice]);
    tarefasConcluidas.splice(indice, 1);
    imprimirLista(tarefasConcluidas);
  } else {
    tarefasConcluidas.push(tarefasNaoConcluidas[indice]);
    tarefasNaoConcluidas.splice(indice, 1);
    imprimirLista(tarefasNaoConcluidas);
  }

}

function imprimirLista(lista = []) {
  divTarefas.innerHTML = '';
  verificaQualTarefaEh(lista);
  for (let i = 0; i < lista.length; i++) {
    divTarefas.innerHTML += `<div class="${tarefa.estado}">
            <h3>${lista[i]}</h3>
            <button onclick="concluirTarefa(${i}, ${tarefa.foiConcluida})">${tarefa.pendencia}</button>
            <button onclick="deletarTarefa(${i}, ${tarefa.foiConcluida})">Deletar</button>
          </div>`;
  }
}
