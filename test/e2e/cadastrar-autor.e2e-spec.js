import { describe, test, after } from 'node:test';
import request from 'supertest';
import conexao from '#db/singleton-connection.js';
import assert from 'node:assert';
import { criarAppTeste } from '#utils/create-test-app.js';

describe('Cadastrar Autor', () => {
  const app = criarAppTeste();

  after(async () => {
    // Limpar o banco de dados após os testes
    await conexao.destroy();
  });

  test('Retorna os dados do autor cadastrado quando os dados são válidos (201).', async () => {
    // Enviar uma request para (POST) /autores
    // Verficiar se o status code da resposta é 201
    // Verficar se o corpo da resposta contém os dados do autor cadastrado
    await request(app)
      .post('/autores')
      .send({
        nome: 'H.P. Lovecraft Novo',
        nacionalidade: 'Ingles',
      })
      .expect(201)
      .then(async (res) => {
        const dadosResposta = res.body.content;

        assert.strictEqual(typeof dadosResposta.id, 'number');
        assert.strictEqual(dadosResposta.nome, 'H.P. Lovecraft Novo');
        assert.strictEqual(dadosResposta.nacionalidade, 'Ingles');

        const autorNoBanco = await conexao('autores').where({ id: dadosResposta.id }).first();

        assert.ok(autorNoBanco);
        assert.strictEqual(autorNoBanco.nome, 'H.P. Lovecraft Novo');
        assert.strictEqual(autorNoBanco.nacionalidade, 'Ingles');
      });
  });

  test('Retorna erro quando os dados do autor são inválidos (400).', async () => {
    await request(app)
      .post('/autores')
      .send({
        nome: '',
        nacionalidade: '',
      })
      .expect(400)
      .expect((res) => {
        const codigoErro = res.body.type;
        assert.strictEqual(codigoErro, 'INVALID_DATA');
      });
  });
});
