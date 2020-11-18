
const ProdutoDao = require("../persistencia/ProdutoPersistencia");


module.exports = {
  async insert(req, resp) {
    const form = req.body;

    try {
      const insert = await ProdutoDao.insert(form);

      const produtoInserido = await ProdutoDao.select(insert.rows[0].id_produto);
      resp.status(200).send(produtoInserido.rows[0]);
    } catch (error) {
      resp.status(400).send({ error });
    }
  },
  async select(req, resp) {
    const id = req.params.id;

    const response = await ProdutoDao.select(id);

    resp.status(200).send(response.rows[0]);

  },
  async selectAll(req, resp) {

    const response = await ProdutoDao.selectAll();

    resp.status(200).send(response.rows);

  },
  async edit(req, resp) {
    const id = req.params.id;
    const form = req.body;

    const response = await ProdutoDao.edit(id, form);

    resp.status(200).send(response);

  },
  async delete(req, resp) {
    const id = req.params.id;

    const response = await ProdutoDao.delete(id);

    resp.status(204).send();
  },
  async selectAllFromMarket(req, resp) {
    const id = req.params.id;

    const response = await ProdutoDao.selectFromMarket(id);

    resp.status(200).send(response.rows);
  },
  async searchProductFromMarket(req, resp) {
    const id = req.query.id_mercado;
    const search = "%"+req.query.search+"%"
    const response = await ProdutoDao.searchProductFromMarket(search, id);

    resp.status(200).send(response.rows);

  }


};