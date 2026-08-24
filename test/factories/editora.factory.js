import conexao from '#db/singleton-connection.js';

export async function criarEditora(dadosParciais = {}) {
  const [editora] = await conexao('editoras')
    .insert({
      nome: 'Editora Teste',
      cidade: 'Cidade Teste',
      email: 'email@teste.com',
      ...dadosParciais,
    })
    .returning('*');

  return editora;
}
