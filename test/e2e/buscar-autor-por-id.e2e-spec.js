import { describe, test, after } from 'node:test';
import request from 'supertest';
import conexao from '#db/singleton-connection.js';
import assert from 'node:assert';
import { criarAppTeste } from '#utils/create-test-app.js';

describe('Buscar Autor por ID', () => {
  const app = criarAppTeste();

  after(async () => {
    // Limpar o banco de dados após os testes
    await conexao.destroy();
  });

  test('Retorna os dados de um autor existente (200).', async () => {
    const autor = {
      nome: 'Autor Teste',
      nacionalidade: 'Brasileiro',
    };

    const respostaCadastro = await request(app).post('/autores').send(autor).expect(201);

    const idAutor = respostaCadastro.body.content.id;

    const respostaBusca = await request(app).get(`/autores/${idAutor}`).expect(200);

    assert.strictEqual(respostaBusca.body.id, idAutor);
    assert.strictEqual(respostaBusca.body.nome, autor.nome);
    assert.strictEqual(respostaBusca.body.nacionalidade, autor.nacionalidade);
  });

  test('Retorna os dados de um autor existente (200) (Usando Banco de Dados).', async () => {
    const resultado = await conexao('autores').insert(
      {
        nome: 'Autor Existente',
        nacionalidade: 'Brasileiro',
      },
      'id',
    );

    const idAutor = resultado[0].id;

    const respostaBusca = await request(app).get(`/autores/${idAutor}`).expect(200);

    assert.strictEqual(respostaBusca.body.id, idAutor);
    assert.strictEqual(respostaBusca.body.nome, 'Autor Existente');
    assert.strictEqual(respostaBusca.body.nacionalidade, 'Brasileiro');
  });

  test('Retorna um erro quando o autor não existe (404).', async () => {
    await request(app)
      .get('/autores/9999') // ID que não existe
      .expect(404)
      .expect((res) => {
        const codigoErro = res.body.type;

        assert.strictEqual(codigoErro, 'NOT_FOUND');
      });
  });
});
