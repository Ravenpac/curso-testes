import Autor from '#models/autor.js';
import assert from 'node:assert';
import test, { describe } from 'node:test';

describe('Autor', () => {
  describe('constructor', () => {
    test('Cria uma instância de Autor com todos os campos.', () => {
      // Arrange
      const dadosAutor = {
        id: 1,
        nome: 'Autor Teste',
        nacionalidade: 'Brasileiro',
        created_at: '2026-01-01T00:00:00.000Z',
        updated_at: '2026-01-01T00:00:00.000Z',
      };
      // Act
      const autor = new Autor(dadosAutor);
      // Assert
      assert.strictEqual(autor.id, dadosAutor.id);
      assert.strictEqual(autor.nome, dadosAutor.nome);
      assert.strictEqual(autor.nacionalidade, dadosAutor.nacionalidade);
      assert.strictEqual(autor.created_at, dadosAutor.created_at);
      assert.strictEqual(autor.updated_at, dadosAutor.updated_at);
    });
    test('Cria uma instância de Autor com apenas os campos obrigatórios.', () => {
      // Arrange
      const dadosAutor = {
        id: 2,
        nome: 'Autor Teste',
        nacionalidade: 'Brasileiro',
      };
      // Act
      const autor = new Autor(dadosAutor);
      // Assert
      assert.strictEqual(autor.id, dadosAutor.id);
      assert.strictEqual(autor.nome, dadosAutor.nome);
      assert.strictEqual(autor.nacionalidade, dadosAutor.nacionalidade);
      assert(typeof autor.created_at === 'string');
      assert(typeof autor.updated_at === 'string');
    });
  });

  describe('pegarAutores', () => {
    test('Retorna uma lista de autores.', async () => {
      // Arrange
      const autoresEsperados = [
        {
          id: 1,
          nome: 'Autor Teste 1',
          nacionalidade: 'Brasileiro',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];
      // teste unitário da escola de Londres (usa somente mocks)
      const mockedDb = {
        select: () => {
          return {
            from: () => ({
              orderBy: () => Promise.resolve(autoresEsperados),
            }),
          };
        },
      };
      Autor.configurarDB(mockedDb);
      // Act
      const autoresDoBanco = await Autor.pegarAutores();
      // Assert
      assert.deepStrictEqual(autoresDoBanco, autoresEsperados);
    });
  });
});
