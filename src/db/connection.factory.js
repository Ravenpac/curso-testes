import knex from 'knex';

export function criaConexaoDB(config) {
  console.debug(`Criando conexão com o banco de dados ${config.connection}...`);

  return knex(config);
}
