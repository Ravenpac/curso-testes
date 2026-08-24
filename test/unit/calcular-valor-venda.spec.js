import { calcularValorFinal } from '#domain/calcular-valor-venda.js';
import assert from 'node:assert';
import test, { describe } from 'node:test';

describe('calcularValorVenda', () => {
  const casosTeste = [
    {
      valor: 100,
      modoPagamento: 'CARTAO_CREDITO',
      valorFinalEsperado: 105,
    },
    {
      valor: 100,
      modoPagamento: 'CARTAO_DEBITO',
      valorFinalEsperado: 102,
    },
    {
      valor: 100,
      modoPagamento: 'BOLETO',
      valorFinalEsperado: 100,
    },
    {
      valor: 100,
      modoPagamento: 'DINHEIRO',
      valorFinalEsperado: 100,
    },
    {
      valor: 100,
      modoPagamento: 'PIX',
      valorFinalEsperado: 95,
    },
  ];

  casosTeste.forEach(({ valor, modoPagamento, valorFinalEsperado }) => {
    test(`Calcula o valor final corretamente para ${modoPagamento}.`, () => {
      // Act
      const valorFinal = calcularValorFinal(valor, modoPagamento);

      // Assert
      assert.strictEqual(valorFinal, valorFinalEsperado);
    });
  });

  test('Lança erro para modo de pagamento inválido.', () => {
    // Arrange
    const valor = 100;
    const modoPagamento = 'MODO_INVALIDO';

    // Act
    const callbackQueLancaErro = () => {
      calcularValorFinal(valor, modoPagamento);
    };

    // Act & Assert
    assert.throws(callbackQueLancaErro, {
      message: 'Modo de pagamento inválido: MODO_INVALIDO',
    });
  });
});
