// JS para operações CRUD com Fetch API
const APIURL = "http://localhost:3000/alunos";
const lista = document.getElementById("lista");
const form = document.getElementById("formAluno");
const idInput = document.getElementById("alunoId");

async function carregarAlunos() {
    const res = await fetch(APIURL);
    const alunos = await res.json();

    lista.innerHTML = "";
    alunos.forEach(aluno => {
        const div = document.createElement("div");
        div.innerHTML = `
      <strong>${aluno.nome} ${aluno.apelido}</strong> - ${aluno.curso} (${aluno.anoCurricular})
      <button onclick="editarAluno(${aluno.id})">Editar</button>
      <button onclick="apagarAluno(${aluno.id})">Apagar</button>
    `;
        lista.appendChild(div);
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const apelido = document.getElementById("apelido").value;
    const curso = document.getElementById("curso").value;
    const ano = Number(document.getElementById("ano").value);
    const id = idInput.value;

    const aluno = { nome, apelido, curso, anoCurricular: ano };

    if (id) {
        // Atualizar aluno
        await fetch(`${APIURL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });
    } else {
        // Criar novo aluno
        await fetch(APIURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno)
        });
    }

    form.reset();
    idInput.value = "";
    carregarAlunos();
});

async function editarAluno(id) {
    const res = await fetch(`${APIURL}/${id}`);
    const aluno = await res.json();

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("apelido").value = aluno.apelido;
    document.getElementById("curso").value = aluno.curso;
    document.getElementById("ano").value = aluno.anoCurricular;
    idInput.value = aluno.id;
}

async function apagarAluno(id) {
    await fetch(`${APIURL}/${id}`, { method: "DELETE" });
    carregarAlunos();
}

carregarAlunos();
