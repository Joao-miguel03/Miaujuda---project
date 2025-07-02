const { apiFetch } = require("./apiBase");

const TABELA = "noticia";

// 🔍 READ (todos)
async function listarNoticias() {
  return await apiFetch(`${TABELA}?select=*`);
}

// 🔍 READ (por ID)
async function buscarNoticiaPorId(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`);
}

// ➕ CREATE
async function criarNoticia(noticia) {
  return await apiFetch(TABELA, {
    method: "POST",
    body: JSON.stringify(noticia),
  });
}

// ✏️ UPDATE
async function atualizarNoticia(id, novosDados) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "PATCH",
    body: JSON.stringify(novosDados),
  });
}

// ❌ DELETE
async function deletarNoticia(id) {
  return await apiFetch(`${TABELA}?id=eq.${id}`, {
    method: "DELETE",
  });
}

module.exports = {
  listarNoticias,
  buscarNoticiaPorId,
  criarNoticia,
  atualizarNoticia,
  deletarNoticia,
};
