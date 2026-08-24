import { describe, test, after, beforeEach } from 'node:test';
import request from 'supertest';
import conexao from '#db/singleton-connection.js';
import { criarLivro } from '#factories/livro.factory.js';
import assert from 'node:assert';
import { criarAppTeste } from '#utils/create-test-app.js';

describe('Listar Livros', () => {
  const app = criarAppTeste();

  after(async () => {
    // Limpar o banco de dados após os testes
    await conexao.destroy();
  });

  beforeEach(async () => {
    // Limpar a tabela de livros antes de cada teste
    await conexao('livros').delete();
  });

  test('Retorna uma lista contendo os dados dos livros quando existe ao menos um livro cadastrado (200).', async () => {
    const livroTeste1 = await criarLivro({
      titulo: 'Livro Teste 1',
    });
    const livroTeste2 = await criarLivro({
      titulo: 'Livro Teste 2',
    });

    await request(app)
      .get('/livros')
      .expect(200)
      .expect((res) => {
        assert.strictEqual(res.body.length, 2);
        const livro1 = res.body[0];
        const livro2 = res.body[1];
        assert.deepStrictEqual(livro1.id, livroTeste1.id);
        assert.deepStrictEqual(livro2.id, livroTeste2.id);
        assert.deepStrictEqual(livro1.titulo, livroTeste1.titulo);
        assert.deepStrictEqual(livro2.titulo, livroTeste2.titulo);
      });
  });

  test('Retorna uma lista vazia quando não existem livros cadastrados (200).', async () => {
    await request(app).get('/livros').expect(200).expect([]);
  });
});
