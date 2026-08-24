class Livro {
  static db;

  static configurarDB(db) {
    this.db = db;
  }

  constructor({ id, titulo, paginas, autor_id, editora_id, created_at, updated_at }) {
    this.id = id;
    this.titulo = titulo;
    this.paginas = paginas;
    this.autor_id = autor_id;
    this.editora_id = editora_id;
    this.created_at = created_at || new Date().toISOString();
    this.updated_at = updated_at || new Date().toISOString();
  }

  static async pegarLivros() {
    return this.db.select('*').from('livros');
  }

  static async pegarPeloId(id) {
    const resultado = await this.db.select('*').from('livros').where({ id });
    return resultado[0];
  }

  async criar() {
    const resultado = await Livro.db('livros').insert(this, '*');
    return resultado[0];
  }

  async atualizar(id) {
    // o update retorna a quantidade de rows atualizados e não o objeto do registro atualizado
    await Livro.db('livros')
      .where({ id })
      .update({ ...this, updated_at: new Date().toISOString() });

    return Livro.db.select('*').from('livros').where({ id });
  }

  static async excluir(id) {
    // o del retorna a quantidade de rows deletados
    await this.db('livros').where({ id }).del();
  }

  async salvar() {
    // verificar se o id existe no banco
    // se não existir é create
    // se existir é update
    if (this.id) {
      const resultado = await this.atualizar(this.id);
      return resultado;
    }
    const resultado = await this.criar();
    return resultado;
  }
}

export default Livro;
