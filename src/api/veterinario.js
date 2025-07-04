const { apiFetch } = require("./apiBase");

const TABELA = "veterinario";

// 🔍 READ (todos)
async function listarVeterinarios() {
  return await apiFetch(`${TABELA}?select=*`);
}

// 🔍 READ (por ID)
async function buscarVeterinarioPorId(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`);
}

// ➕ CREATE
async function criarVeterinario(veterinario) {
  return await apiFetch(TABELA, {
    method: "POST",
    body: JSON.stringify(veterinario),
  });
}

// ✏️ UPDATE
async function atualizarVeterinario(id, novosDados) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(novosDados),
  });
}

// ❌ DELETE
async function deletarVeterinario(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "DELETE",
  });
}

module.exports = {
  listarVeterinarios,
  buscarVeterinarioPorId,
  criarVeterinario,
  atualizarVeterinario,
  deletarVeterinario,
};
