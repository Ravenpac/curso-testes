import { criaConexaoDB } from '#db/connection.factory.js';
import { databaseConfig } from '#config/database.config.js';

export async function limparBanco() {
  const conexao = criaConexaoDB(databaseConfig);

  try {
    console.debug('Limpando o banco de dados...');

    await conexao.raw('TRUNCATE TABLE autores RESTART IDENTITY CASCADE');
    await conexao.raw('TRUNCATE TABLE editoras RESTART IDENTITY CASCADE');
    await conexao.raw('TRUNCATE TABLE livros RESTART IDENTITY CASCADE');

    console.debug('Banco de dados limpo com sucesso!');
  } finally {
    await conexao.destroy();
  }
}
