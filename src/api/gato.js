const { apiFetch } = require("./apiBase");

const TABELA = "gato";

// 🔍 READ (todos)
async function listarGatos() {
  return await apiFetch(`${TABELA}?select=*`);
}

// 🔍 READ (por ID)
async function buscarGatoPorId(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`);
}

// ➕ CREATE
async function criarGato(gato) {
  return await apiFetch(TABELA, {
    method: "POST",
    body: JSON.stringify(gato),
  });
}

// ✏️ UPDATE
async function atualizarGato(id, novosDados) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(novosDados),
  });
}

// ❌ DELETE
async function deletarGato(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "DELETE",
  });
}

module.exports = {
  listarGatos,
  buscarGatoPorId,
  criarGato,
  atualizarGato,
  deletarGato,
};
