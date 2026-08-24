import conexao from '#db/singleton-connection.js';

export async function criarLivro(dadosParciais = {}) {
  const [autor] = await conexao('autores')
    .insert({
      nome: 'Autor Teste',
      nacionalidade: 'Nacionalidade Teste',
    })
    .returning('*');

  const [editora] = await conexao('editoras')
    .insert({
      nome: 'Editora Teste',
      cidade: 'Cidade Teste',
      email: 'email@teste.com',
    })
    .returning('*');

  const dadosLivro = {
    titulo: 'Livro Teste',
    paginas: 100,
    autor_id: autor.id,
    editora_id: editora.id,
    ...dadosParciais,
  };

  const [livro] = await conexao('livros').insert(dadosLivro).returning('*');

  return livro;
}
