const { apiFetch } = require("./apiBase");

const TABELA = "usuario";

// 🔍 READ (todos)
async function listarUsuarios() {
  return await apiFetch(`${TABELA}?select=*`);
}

// 🔍 READ (por ID)
async function buscarUsuarioPorId(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`);
}

// ➕ CREATE
async function criarUsuario(usuario) {
  return await apiFetch(TABELA, {
    method: "POST",
    body: JSON.stringify(usuario),
  });
}

// ✏️ UPDATE
async function atualizarUsuario(id, novosDados) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(novosDados),
  });
}

// ❌ DELETE
async function deletarUsuario(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "DELETE",
  });
}

module.exports = {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
};
