const { apiFetch } = require("./apiBase");

const TABELA = "consulta";

// 🔍 READ (todos)
async function listarConsultas() {
  return await apiFetch(`${TABELA}?select=*`);
}

// 🔍 READ (por ID)
async function buscarConsultaPorId(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`);
}

// ➕ CREATE
async function criarConsulta(consulta) {
  return await apiFetch(TABELA, {
    method: "POST",
    body: JSON.stringify(consulta),
  });
}

// ✏️ UPDATE
async function atualizarConsulta(id, novosDados) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(novosDados),
  });
}

// ❌ DELETE
async function deletarConsulta(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "DELETE",
  });
}

module.exports = {
  listarConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  deletarConsulta,
};
