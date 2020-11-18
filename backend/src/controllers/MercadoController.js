
const MercadoDao = require("../persistencia/MercadoPersistencia");


module.exports = {
  async insert(req, resp) {
    const form = req.body;

    try {
      const insert = await MercadoDao.insert(form);
      
      const mercadoInserido = await MercadoDao.select(insert.rows[0].id_mercado);
      resp.status(200).send(mercadoInserido.rows[0]);
    } catch (error) {
      resp.status(400).send({error});
    }
  },
  async select(req, resp) {
    const id = req.params.id;

    const response = await MercadoDao.select(id);

    resp.status(200).send(response.rows[0]);

  },
  async selectAll(req, resp) {
    
    const response = await MercadoDao.selectAll();

    resp.status(200).send(response.rows);

  },
  async searchMarket(req, resp) {
    const search = "%"+req.query.search+"%"
    const response = await MercadoDao.searchMarket(search);
    resp.status(200).send(response.rows);

  },
  async edit(req, resp) {
    const id = req.params.id;
    const form = req.body;

    const response = await MercadoDao.edit(id, form);

    resp.status(200).send(response);

  },
  async delete(req, resp) {
    const id = req.params.id;

    const response = await MercadoDao.delete(id);

    resp.status(204).send();
  }


};