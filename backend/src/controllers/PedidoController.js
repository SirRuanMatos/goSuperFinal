const PagamentoDao = require("../persistencia/PedidoPersistencia");

module.exports = {
  async selectFromMarket(req, resp) {
    const id = req.params.id;

    const pedidos = await PagamentoDao.selectFromMarket(id);

    resp.status(200).send(pedidos.rows);


  },
  async selectForDelivers(req, resp) {

    const pedidos = await PagamentoDao.selectForDelivers();

    resp.status(200).send(pedidos.rows);


  },
  async selectForDeliverCurrents(req, resp) {
    const id = req.params.id;

    const pedidos = await PagamentoDao.selectForDeliverCurrents(id);

    resp.status(200).send(pedidos.rows);


  },
  async selectClientOrders(req, resp) {
    const id = req.params.id;

    const pedidos = await PagamentoDao.selectClientOrders(id);

    resp.status(200).send(pedidos.rows);


  },
  async selectProductsOrder(req, resp) {
    const id = req.params.id;

    const produtos = await PagamentoDao.selectProductsOrder(id);

    resp.status(200).send(produtos.rows);


  },
  async changeStatus(req, resp) {
    const id = req.params.id;
    const status = req.body.status;

    const update = await PagamentoDao.updateStatus(id, status);

    resp.status(200).send();


  },
  async refazer(req, resp) {
    const id = req.body.id_pedido;

    const get_carrinho = await PagamentoDao.selectCart(id);

    let cart = [];
    get_carrinho.rows.forEach(produto=>{
      let prodCart = {
        produto: {
          "id_produto": produto.id_produto,
          "nome": produto.nome,
          "descricao": produto.descricao,
          "url_img": produto.url_img,
          "estoque": produto.estoque,
          "cod_mercado": produto.cod_mercado,
          "preco": produto.preco,
        },
        quantidade: produto.quantidade
      }
      cart.push(prodCart);
    });

    resp.status(200).send(cart);


  },
  async updateStatusByDeliver(req, resp) {
    const status = req.body.status;
    const id_entregador = req.body.id_entregador;
    const id_pedido = req.body.id_pedido;

    const update = await PagamentoDao.updateStatusByDeliver(id_pedido, id_entregador, status);

    resp.status(200).send();


  }


};