import { describe, test, after } from 'node:test';
import request from 'supertest';
import conexao from '#db/singleton-connection.js';
import assert from 'node:assert';
import { criarLivro } from '#factories/livro.factory.js';
import { criarAppTeste } from '#utils/create-test-app.js';

describe('Buscar Livro por ID', () => {
  const app = criarAppTeste();

  after(async () => {
    // Limpar o banco de dados após os testes
    await conexao.destroy();
  });

  test('Retorna os dados de um livro existente (200).', async () => {
    const livro = await criarLivro();

    await request(app)
      .get(`/livros/${livro.id}`)
      .expect(200)
      .expect((res) => {
        const dadosResposta = res.body;
        assert.strictEqual(dadosResposta.id, livro.id);
        assert.strictEqual(dadosResposta.titulo, livro.titulo);
        assert.strictEqual(dadosResposta.paginas, livro.paginas);
      });
  });

  test('Retorna um erro quando o livro não existe (404).', async () => {
    await request(app)
      .get('/livros/9999') // ID que não existe
      .expect(404)
      .expect((res) => {
        const codigoErro = res.body.type;

        assert.strictEqual(codigoErro, 'NOT_FOUND');
      });
  });
});
