let tarefasNaoConcluidas = [];
let tarefasConcluidas = [];
let divTarefas = document.querySelector("#listTasks");
let divInput = document.querySelector("#taskInput");

// Variaveis que contém o estado da tarefa antes de ser impresso;
let tarefa = {
  estado: "tarefaNaoConcluida",
  foiConcluida: false,
  pendencia: "✔️",
};

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
  document.querySelector("#taskInput").value = "";
}

function deletarTarefa(indice, concluida) {
  if (concluida) {
    tarefasConcluidas.splice(indice, 1);
    localStorage.setItem(
      "tarefasConcluidas",
      JSON.stringify(tarefasConcluidas),
    );
    imprimirLista(tarefasConcluidas);
  } else {
    tarefasNaoConcluidas.splice(indice, 1);
    localStorage.setItem(
      "tarefasNaoConcluidas",
      JSON.stringify(tarefasNaoConcluidas),
    );
    imprimirLista(tarefasNaoConcluidas);
  }
}
function verificaQualTarefaEh(listaTarefa) {
  if (listaTarefa === tarefasConcluidas) {
    tarefa.estado = "tarefaConcluida";
    tarefa.foiConcluida = true;
    tarefa.pendencia = "assets/imgs/x.png";
    localStorage.setItem(
      "tarefasConcluidas",
      JSON.stringify(tarefasConcluidas),
    );
  } else if (listaTarefa === tarefasNaoConcluidas) {
    tarefa.estado = "tarefaNaoConcluida";
    tarefa.foiConcluida = false;
    tarefa.pendencia = "assets/imgs/check.png";
    localStorage.setItem(
      "tarefasNaoConcluidas",
      JSON.stringify(tarefasNaoConcluidas),
    );
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
  localStorage.setItem("tarefasConcluidas", JSON.stringify(tarefasConcluidas));
  localStorage.setItem(
    "tarefasNaoConcluidas",
    JSON.stringify(tarefasNaoConcluidas),
  );
}

function imprimirLista(lista = []) {
  if (lista.length === 0) {
    divTarefas.innerHTML = `<h3>Nenhuma tarefa encontrada...</h3>`;
  } else {
    verificaQualTarefaEh(lista);
    divTarefas.innerHTML = "";
    for (let i = 0; i < lista.length; i++) {
      divTarefas.innerHTML += `
      <div class="${tarefa.estado}">
      <div class="taskContent" ondblclick="atualizarTarefa(${i}, ${tarefa.foiConcluida})"><h3>${lista[i]}</h3></div>
        <div class="buttonsPosition">
          <img src="${tarefa.pendencia}" alt="Pendência" onclick="concluirTarefa(${i}, ${tarefa.foiConcluida})">
          <img src="assets/imgs/lixeira.png" alt="Deletar" onclick="deletarTarefa(${i}, ${tarefa.foiConcluida})">
        </div>
       
      </div>
    `;
    }
  }
}

function procuraTarefasNoLocalStorage() {
  if (localStorage.getItem("tarefasNaoConcluidas")) {
    tarefasNaoConcluidas = JSON.parse(
      localStorage.getItem("tarefasNaoConcluidas"),
    );
  }
  if (localStorage.getItem("tarefasConcluidas")) {
    tarefasConcluidas = JSON.parse(localStorage.getItem("tarefasConcluidas"));
  }
  imprimirLista(tarefasNaoConcluidas);
}

divInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    verificaDuplicidadeInputVazio();
  }
});

function atualizarTarefa(indice, concluida) {
  document.querySelector(".boxList").style.display = "none";
  document.querySelector(".taskUpdate").style.display = "block";
  let inputValue = document.querySelector("#taskInputUpdate");
  inputValue.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      if (inputValue.value) {
        if (concluida) {
          tarefasConcluidas[indice] = inputValue.value;
          localStorage.setItem(
            "tarefasConcluidas",
            JSON.stringify(tarefasConcluidas),
          );
          imprimirLista(tarefasConcluidas);
        } else {
          tarefasNaoConcluidas[indice] = inputValue.value;
          localStorage.setItem(
            "tarefasNaoConcluidas",
            JSON.stringify(tarefasNaoConcluidas),
          );
          imprimirLista(tarefasNaoConcluidas);
        }
        document.querySelector("#taskInputUpdate").value = "";
        document.querySelector(".boxList").style.display = "block";
        document.querySelector(".taskUpdate").style.display = "none";
      }
    }
  });
}

window.onload = procuraTarefasNoLocalStorage();
