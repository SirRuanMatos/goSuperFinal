const PagamentoDao = require("../persistencia/PedidoPersistencia");
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
var x={};

module.exports = {
  async create(req, resp) {
    x = req.body;
    //Criar token do cartão
    const token = await stripe.tokens.create({
      card: {
        number: req.body.pagamento.number,
        exp_month: req.body.pagamento.exp_month,
        exp_year: req.body.pagamento.exp_year,
        cvc: req.body.pagamento.cvc,
      },
    }).catch(e=>{
       resp.status(e.raw.statusCode).send({error: e.raw.message});
       return
    });
    

    let amountTotal = 0;

    req.body.carrinho.map((prd)=>{
      amountTotal += (prd.quantidade * prd.produto.preco)
    });
/* 
    amountTotal += 10; //Valor do frete
    amountTotal += 2.75; //Valor de serviço

    if (req.body.coupon != "") {
      amountTotal -= (amountTotal*0.05); 
    }
     */

    const charge = await stripe.charges.create({
      amount: amountTotal*100,
      currency: 'brl',
      source: token.id,
    }).catch(e=>{
       resp.status(e.raw.statusCode).send({error: e.raw.message});
       return
    });
    
    let payload = {
      cod_mercado: req.body.carrinho[0].produto.cod_mercado,
      cod_usuario:req.body.usuario.id_usuario,
      data_pedido: new Date().toLocaleDateString("pt-br"),
      endereco: req.body.endereco,
      status: "Confirmado"
    }

    const pedido = await PagamentoDao.insert(payload);
    
    let values =[];
    let prods = req.body.carrinho;

    prods.map(prd=>{
      let row = [prd.produto.id_produto, pedido.rows[0].id_pedido, prd.quantidade]
      values.push(row);
    });

    const carrinho = await PagamentoDao.insertCart(values);

    resp.status(200).send(pedido);
    

  },
  async teste(req, resp){
    

    resp.status(200).send(values);
  }

};