const { Router } = require("express");
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, 'src/upload/')
    },
    filename: (req,file, cb)=>{
        cb(null, Date.now()+'-'+file.originalname)
    }
});
const upload = multer({storage})

const TesteController = require("./controllers/TesteController");
const LoginController = require("./controllers/LoginController");
const EntregadorController = require("./controllers/EntregadorController");
const MercadoController = require("./controllers/MercadoController");
const ProdutoController = require("./controllers/ProdutoController");
const PagamentoController = require("./controllers/PagamentoController");
const PedidoController = require("./controllers/PedidoController");
const AvaliacaoController = require("./controllers/AvaliacaoController");
const PromocaoController = require("./controllers/PromocaoController");
const SpeechController = require("./controllers/SpeechController");
const authMiddleware = require("./middleware/auth");

const routes = Router();

routes.post("/cadastro", LoginController.insert);
routes.post("/login", LoginController.login);
routes.post("/speech",upload.single('file'), SpeechController.home);
routes.use(authMiddleware);
routes.get("/teste", PagamentoController.teste);

routes.delete("/cadastro/:id", LoginController.delete);

routes.post("/entregador", EntregadorController.insert);
routes.get("/entregador", EntregadorController.selectAll);
routes.get("/entregador/:id", EntregadorController.select);
routes.put("/entregador/:id", EntregadorController.edit);
routes.delete("/entregador/:id", EntregadorController.delete);

routes.post("/mercado", MercadoController.insert);
routes.get("/mercado", MercadoController.selectAll);
routes.get("/mercado/pesquisar", MercadoController.searchMarket);
routes.get("/mercado/:id", MercadoController.select);
routes.put("/mercado/:id", MercadoController.edit);
routes.delete("/mercado/:id", MercadoController.delete);

routes.post("/produto", ProdutoController.insert);
routes.get("/produto", ProdutoController.selectAll);
routes.get("/produto/pesquisar", ProdutoController.searchProductFromMarket);
routes.get("/produto/mercado/:id", ProdutoController.selectAllFromMarket);
routes.get("/produto/:id", ProdutoController.select);
routes.put("/produto/:id", ProdutoController.edit);
routes.delete("/produto/:id", ProdutoController.delete);

routes.post("/pagamento", PagamentoController.create);
routes.post("/pedido/refazer", PedidoController.refazer);
routes.put("/pedido/change-status/:id", PedidoController.changeStatus);
routes.put("/pedido/selected-for-deliver", PedidoController.updateStatusByDeliver);
routes.get("/pedido/entregador", PedidoController.selectForDelivers);
routes.get("/pedido/entregador/:id", PedidoController.selectForDeliverCurrents);
routes.get("/pedido/cliente/:id", PedidoController.selectClientOrders);
routes.get("/pedido/mercado/:id", PedidoController.selectFromMarket);
routes.get("/pedido/produtos/:id", PedidoController.selectProductsOrder);

routes.get("/avaliacao/checker/:id", AvaliacaoController.avaliationChecker);
routes.post("/avaliacao/cancel", AvaliacaoController.cancel);
routes.post("/avaliacao/vote", AvaliacaoController.vote);


routes.post("/promocao", PromocaoController.createPromotion);
routes.post("/promocao/verificar", PromocaoController.checkPromotion);
routes.get("/promocao/:id_usuario", PromocaoController.searchPromotion);

module.exports = routes;