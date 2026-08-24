import conexao from '#db/singleton-connection.js';
import test, { after, beforeEach, describe } from 'node:test';
import { LivrosService } from '#services/livros.service.js';
import { criarLivro } from '#factories/livro.factory.js';
import assert from 'node:assert';

describe('LivrosService', () => {
  const sut = new LivrosService(conexao);

  after(async () => {
    await conexao.destroy();
  });

  beforeEach(async () => {
    await conexao('livros').delete();
  });

  describe('listarLivros', () => {
    test('Retorna uma lista de livros.', async () => {
      const livro1 = await criarLivro({
        titulo: 'Livro Teste 1',
      });
      const livro2 = await criarLivro({
        titulo: 'Livro Teste 2',
      });

      const resultado = await sut.listarLivros();

      assert.deepStrictEqual(resultado, [livro1, livro2]);
    });
    test('Retorna uma lista vazia quando não há livros cadastrados.', async () => {
      const resultado = await sut.listarLivros();

      assert.deepStrictEqual(resultado, []);
    });
  });

  describe('buscarLivroPorId', () => {
    test('Retorna undefined quando o livro não existe.', async () => {
      const resultado = await sut.buscarLivroPorId(9999); // ID que não existe

      assert.strictEqual(resultado, undefined);
    });
    test('Retorna o livro correto quando ele existe.', async () => {
      const livro = await criarLivro({ titulo: 'Livro Teste 4' });

      const resultado = await sut.buscarLivroPorId(livro.id);

      assert.deepStrictEqual(resultado, livro);
    });
  });
});
