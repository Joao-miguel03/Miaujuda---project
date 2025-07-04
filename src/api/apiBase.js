const API_URL = "https://rrsydnlkyccvxpuookhj.supabase.co/rest/v1";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyc3lkbmxreWNjdnhwdW9va2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyNTg1NDgsImV4cCI6MjA2NTgzNDU0OH0.PjMvTh4X9_7PqXEoD6Af5rZHSP4zPKqbGzCeE30ry5o";

async function apiFetch(endpoint, options = {}) {
  const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
    ...options.headers,
  };

  const res = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  // ⚠️ Tenta ler como texto primeiro, pois o body pode vir vazio
  const text = await res.text();

  // Se houver corpo, tenta converter para JSON
  const data = text ? JSON.parse(text) : null;

  // Se a resposta não for OK, lança erro
  if (!res.ok) {
    throw new Error(data?.message || "Erro na requisição");
  }

  return data;
}

module.exports = { apiFetch };
