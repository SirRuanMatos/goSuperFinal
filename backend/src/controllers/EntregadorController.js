
const EntregadorDao = require("../persistencia/EntregadorPersistencia");


module.exports = {
  async insert(req, resp) {
    const form = req.body;

    const cpfExiste = await EntregadorDao.verficarCpf(form.cpf);

    if (!cpfExiste.rowCount == 1) {
      const insert = await EntregadorDao.cadastrarEntregador(form);

      resp.status(200).send(insert);
    }
    else {
      resp.status(412).send({
        error: "CPF já cadastrado"
      });
    }

  },
  async select(req, resp) {
    const id = req.params.id;

    const response = await EntregadorDao.select(id);

    resp.status(200).send(response.rows[0]);

  },
  async selectAll(req, resp) {
   
    const response = await EntregadorDao.selectAll();

    resp.status(200).send(response.rows);

  },
  async edit(req, resp) {
    const id = req.params.id;
    const form = req.body;

    const response = await EntregadorDao.edit(id,form);

    resp.status(200).send(response);

  },
  async delete(req, resp) {
    const id = req.params.id;

    const response = await EntregadorDao.delete(id);

    resp.status(204).send();
  }


};