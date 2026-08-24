class Venda {
  static db;

  static configurarDB(db) {
    this.db = db;
  }

  constructor({ id, livro_id, valor, tipo_pagamento, created_at, updated_at }) {
    this.id = id;
    this.livro_id = livro_id;
    this.valor = valor;
    this.tipo_pagamento = tipo_pagamento;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  async criar() {
    const resultado = await Venda.db('vendas').insert(this, '*');
    return resultado[0];
  }

  async salvar() {
    const resultado = await this.criar();
    return resultado;
  }
}

export default Venda;
