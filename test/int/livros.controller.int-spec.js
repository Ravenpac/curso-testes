import { LivrosController } from '#controllers/livros.controller.js';
import test, { after, describe, mock } from 'node:test';
import conexao from '#db/singleton-connection.js';
import { criarLivro } from '#factories/livro.factory.js';
import { assertMock } from '#utils/mock.assertions.js';

describe('LivrosController', () => {
  const sut = new LivrosController(conexao);

  after(async () => {
    await conexao.destroy();
  });

  describe('listarLivros', () => {
    test('Retorna uma lista de livros.', async () => {
      // Arrange
      const livro = await criarLivro({
        titulo: 'Livro Teste',
      });
      const reqDummy = {};
      const resSpy = {
        status: mock.fn(() => resSpy),
        json: mock.fn(() => resSpy),
        send: mock.fn(() => resSpy),
      };

      // Act
      await sut.listarLivros(reqDummy, resSpy);

      // Assert
      assertMock(resSpy.status).wasCalledWith(200);

      assertMock(resSpy.json).wasCalledWith([livro]);
    });
  });

  describe('buscarLivroPorId', () => {});
  describe('cadastrarLivro', () => {});
});
