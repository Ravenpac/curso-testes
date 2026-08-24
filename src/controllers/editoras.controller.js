import Editora from '#models/editora.js';

export class EditorasController {
  constructor(databaseConnection) {
    Editora.configurarDB(databaseConnection);
  }

  async listarEditoras(req, res) {
    try {
      const resulado = await Editora.pegarEditoras();
      res.status(200).send(resulado);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async buscarEditoraPorId(req, res) {
    const { id } = req.params;
    try {
      const resultado = await Editora.pegarPeloId(id);
      if (!resultado) {
        return res.status(404).json({ message: 'Editora não encontrada' });
      }
      res.status(200).send(resultado);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  async cadastrarEditora(req, res) {
    const { body } = req;
    const editora = new Editora(body);
    try {
      const resposta = await editora.salvar(editora);
      return res.status(201).json({ message: 'editora criada', content: resposta });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  }
}
