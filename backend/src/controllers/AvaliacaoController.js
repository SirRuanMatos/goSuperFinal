const AvaliacaoDao = require("../persistencia/AvaliacaoPersistencia");

module.exports = {
  async avaliationChecker(req, resp) {
    const id_usuario = req.params.id;

    const avaliations = await AvaliacaoDao.avaliationChecker(id_usuario);

    resp.status(200).send(avaliations.rows);


  },
  async vote(req, resp) {
    const avaliacao = req.body;

    const avaliations = await AvaliacaoDao.vote(avaliacao);

    resp.status(200).send(avaliations.rows);


  },
  async cancel(req, resp) {
    const id_pedido = req.body.cod_pedido;

    const avaliations = await AvaliacaoDao.avaliationDone(id_pedido);

    resp.status(200).send();


  }


};