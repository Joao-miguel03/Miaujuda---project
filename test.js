const {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  buscarUsuarioPorId,
} = require("./src/api/usuario");

// Teste básico: Listar todos os usuários
listarUsuarios()
  .then(data => {
    console.log("Usuários cadastrados:");
    console.log(data);
  })
  .catch(err => {
    console.error("Erro:", err.message);
  });

/*
const novoUser = {
    nome: "joao Miguel",
    telefone: "9 1234-1234",
    email: "ser.joaomiguel@gmail.com",
    senha: "senha123",
    is_cuidador: false,
    imagem_perfil:null
};

try{
    usuario = criarUsuario(novoUser);
    console.log("\n Usuarios atualizados: ");
    listarUsuarios().then(data=>{
        console.log(data);
    }).catch(err=>{
        console.error("Erro:",err.message);
    })
} catch(erro){
    console.error("Erro ao criar usuário:", erro.message)
}
*/