import { describe, test, after, beforeEach } from 'node:test';
import request from 'supertest';
import conexao from '#db/singleton-connection.js';
import { criarAppTeste } from '#utils/create-test-app.js';

describe('Listar Autores', () => {
  const app = criarAppTeste();

  after(async () => {
    // Limpar o banco de dados após os testes
    await conexao.destroy();
  });

  beforeEach(async () => {
    // Limpar a tabela de autores antes de cada teste
    await conexao('autores').delete();
  });

  test('Retorna uma lista contendo os dados dos autores quando existe ao menos um autor cadastrado (200).', async () => {
    const hpLovecraft = await request(app)
      .post('/autores')
      .send({
        nome: 'H. P. Lovecraft',
        nacionalidade: 'Americano',
      })
      .expect(201)
      .then((res) => res.body.content);

    const jorgeLuisBorges = await request(app)
      .post('/autores')
      .send({
        nome: 'Jorge Luis Borges',
        nacionalidade: 'Argentino',
      })
      .expect(201)
      .then((res) => res.body.content);

    await request(app).get('/autores').expect(200).expect([hpLovecraft, jorgeLuisBorges]);
  });

  test('Retorna uma lista vazia quando não existem autores cadastrados (200).', async () => {
    await request(app).get('/autores').expect(200).expect([]);
  });
});
