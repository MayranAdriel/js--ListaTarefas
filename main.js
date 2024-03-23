let vetor = [];

let divTarefas = document.querySelector("#listTasks");

function pegandoValor() {
    let elemento = document.querySelector("#taskInput").value;
    if (elemento === "") {
        alert("Digite uma tarefa!")
    } else {
        vetor.push(elemento);
        divTarefas.innerHTML = "";
        for (let i = 0; i < vetor.length; i++) {
            divTarefas.innerHTML += `<div class="tarefa">
            <h3>${vetor[i]}</h3>
            <div>
                <button onclick="marcarConcluido(${i})">Concluida</button>
                <button onclick="limparTarefa(${i})">Excluir</button>
            </div>
          </div>`;
        }
    }
}

function limparTarefa(indice) {
    vetor.splice(indice, 1);
}

function marcarConcluido(indice) {
    let tarefa = document.querySelectorAll(".teste")[indice];
    tarefa.classList.toggle("concluido");
}
