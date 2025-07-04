const { listarUsuarios, criarUsuario, atualizarUsuario, deletarUsuario, buscarUsuarioPorId, } = require("./src/api/usuario");
const bcrypt = require("react-native-bcrypt");

// Teste básico: Listar todos os usuários
listarUsuarios()
  .then(data => {
    console.log("Usuários cadastrados:");
    console.log(data);
  })
  .catch(err => {
    console.error("Erro:", err.message);
  });


async function criptografarSenhasAntigas() {
  try {
    const usuarios = await listarUsuarios();
    const usuariosData = usuarios.data || usuarios;

    for (const user of usuariosData) {
      const senha = user.senha;

      const pareceCriptografada = senha && senha.length > 20 && senha.startsWith('$2');

      if (!pareceCriptografada) {
        const novaSenhaCriptografada = bcrypt.hashSync(senha, 10);
        await atualizarUsuario(user.id, {senha:novaSenhaCriptografada });
        console.log(`Senha criptografada para o usuario ${user.nome} (${user.email})`);
      }
    }
    console.log("processo finalizado com sucesso");
  } catch (err) {
    console.error("Erro ao criptografar senhas: ", err.message);
  }
}

// criptografarSenhasAntigas();
