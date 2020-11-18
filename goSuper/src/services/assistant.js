import { toggleAssistant } from "../actions/controlAssistantAction";
import {speak, setAssistandOn} from "./speak";
import texts from "./texts";

var marketsLoaded;
var productsLoaded;
var singleProduct;
var cart;
var orders;
var pedidoChat;

function welcome() {
    speak(texts.welcome);
}
function assistantMarketFound() {
    speak(texts.marketFound);
}

function toggleAssistantVoice(bool){
    setAssistandOn(bool);
}

function assistantMarketsLoaded(numMarkets, markets) {
    marketsLoaded = markets;
    speak(numMarkets + texts.marketsLoaded);
}

function assistantProductsSearch(numProducts, products) {
    productsLoaded = products;
    speak(numProducts + "produtos encontrados.");
}
function assistantPromocoesView(numProducts, products) {
    productsLoaded = products;
    speak("Mostrando " + numProducts + "produtos em promoções.");
}
function assistantRegularView(products) {
    productsLoaded = products;
}

function assistantReadMarkets(numMarkets) {
    let string = "";
    if (numMarkets && (numMarkets != 0)) {
        for (let index = 0; numMarkets > index; index++) {
            let element = marketsLoaded[index];
            string += " Mercado " + element.nome + ". ";
        }
    } else {
        for (let index = 0; index < marketsLoaded.length; index++) {
            let element = marketsLoaded[index];
            string += " Mercado " + element.nome + ". ";
        }
    }
    speak(string);

}

function assistantReadProducts(numProducts) {
    let string = "";
    if (numProducts) {
        for (let index = 0; numProducts > index; index++) {
            let element = productsLoaded[index];
            string += " Produto " + element.nome + ", " + numberToReal(element.preco) + ".";
        }
    } else {
        for (let index = 0; index < productsLoaded.length; index++) {
            let element = productsLoaded[index];
            string += " Produto " + element.nome + ", R$" + numberToReal(element.preco) + ".";
        }
    }
    speak(string);

}

function assistantMarketOpened(marketName, numProducts, products) {
    productsLoaded = products;
    speak("O mercado " + marketName + "foi aberto. E está mostrando " + numProducts + " produtos.");
}

function assistantProductOpen(product) {
    singleProduct = product;
    speak("O produto " + product.nome + " por R$" + numberToReal(product.preco) + " foi aberto.")
}

function assistantReadProductDescription() {
    speak(singleProduct.descricao)
}

function assistantProductAdded(productObj) {
    speak(productObj.quantidade + productObj.produto.nome + " foi adicionado ao carrinho")
}

function assistantProductEdited(productObj) {
    speak(productObj.quantidade + productObj.produto.nome + " foi alterado de seu carrinho")
}

function assistantCartOpen(numProducts, totalValue, cartRef) {
    cart = cartRef;
    speak("O seu carrinho foi aberto com " + numProducts + "produtos totalizando um valor de R$" + numberToReal(totalValue) + ".")
}

function assistantProductRemoved(numProducts, totalValue, cartRef) {
    cart = cartRef;
    speak("Produto excluído com sucesso. Ainda há " + numProducts + "produtos totalizando um valor de R$" + numberToReal(totalValue) + ".")
}

function assistantReadCart(numProducts) {

    let string = "";
    if (numProducts) {
        for (let index = 0; numProducts > index; index++) {
            let element = cart[index];
            string += element.quantidade + " " + element.produto.nome + ", R$" + numberToReal((element.produto.preco * element.quantidade)) + ".";
        }
    } else {
        for (let index = 0; index < cart.length; index++) {
            let element = cart[index];
            string += element.quantidade + " " + element.produto.nome + ", R$" + numberToReal((element.produto.preco * element.quantidade)) + ".";
        }
    }
    speak(string);
}

function assistantFinalizarPedidoOpened() {
    speak(texts.finalizarPedido);
}

function assistantCepLoaded(endereco) {
    speak("Seu sepi foi encontrado. O seu endereço é: Rua " + endereco.logradouro + ", bairro " + endereco.bairro + ", cidade " + endereco.localidade + ", estado " + endereco.uf + ".");
}


function assistantRepeatCommand() {
    speak("Não consegui entender o seu comando, poderia repetir?");
}

function assistantResumoCompraView(cartRef, subtotal, frete, servico, desconto) {
    let string = "Mostrando resumo da compra";
    for (let index = 0; index < cartRef.length; index++) {
        let element = cartRef[index];
        string += element.quantidade + " " + element.produto.nome + ", R$" + numberToReal((element.produto.preco * element.quantidade)) + ". ";
    }
    string += "Subtotal: R$" + numberToReal(subtotal) + ". Frete: R$" + numberToReal(frete) + "Serviço: R$" + numberToReal(servico) + ". ";
    if (desconto == 0) {
        string += "Você não possui desconto."
    } else {
        string += "Desconto: R$" + numberToReal(desconto) + ". ";
    }
    string += "Valor total do pedido: R$" + ((subtotal + servico + frete) - desconto) + ". "
    string += "Você está de acordo?"
    speak(string)
}

function assistantCupomAdded(total) {
    speak("O cupom foi adicionado com sucesso. Valor do desconto: R$" + numberToReal(total) + ".");
}

function assistantCupomInvalid() {
    speak(texts.cupomInvalid);
}

function assistantInformCep() {
    speak(texts.informarCep);
}
function assistantInformNumber() {
    speak(texts.informarNumero);
}
function assistantInformDeliveryMethod() {
    speak(texts.informarEntrega);
}
function assistantActivated() {
    speak("Assistente de voz ativado. Pressione a tela e fale algum comando.");
}
function assistantChatInformations(pedido, mensagens) {
    pedidoChat = pedido;
    speak("O chat foi aberto. Você está conversando com " + pedido.nome + " " + pedido.sobrenome + ". O chat está com " + mensagens.length + " mensagens.");
}

function getPedidoAberto() {
    return pedidoChat;
}

/* ,
,
 */
function assistantInformCardNumber() {
    speak(texts.informarNumeroCartao);
}
function assistantInformExpireDate() {
    speak(texts.informarDataExpiracao);
}
function assistantInformCVV() {
    speak(texts.informarCVV);
}

function assistantPaymentView() {
    speak("Forma de pagamento. Por favor nos informe o tipo de pagamento: crédito ou débito, o número de seu cartão, o mês de vencimento, o ano de vencimento e o ceveve.")
}

function assistantOrderFinal(nome) {
    speak(nome + ", seu pedido foi enviado ao Supermercado, agora é só relaxar e aguardar! Acompanhe seu pedido através da página 'meus pedidos'")
}

function assistantMyOrdersOpen(ordersRef) {
    orders = ordersRef;
    speak("A tela dos meus pedidos foi aberta. Está mostrando " + orders.length + " pedidos. ");
}

function assistantReadOrder(id) {
    let string = "";

    for (let index = 0; index < orders.length; index++) {
        let element = orders[index];
        if (id == element.id_pedido) {
            string += "Pedido número " + element.id_pedido + ". Está com o estatus" + element.status + ". Data: " + new Date(element.data_pedido).toLocaleDateString('pt-BR') + ". Seu fornecedor é " + element.mercadonome + ".";
            if (element.status == "Confirmado") {
                string += "Você pode cancelá lo.";
            }
            else {
                if (element.status == "Pronto para entrega" || element.status == "Entrega em andamento") {
                    string += "Você pode conversar com entregador";
                }
                else {
                    string += "Você pode refazer o pedido";
                }
            }
        }
    }
    speak(string);
}

function assistantReadOrders(numOfOrder) {
    let string = "";
    if (numOfOrder) {
        for (let index = 0; numOfOrder > index; index++) {
            let element = orders[index];
            string += "Pedido número " + element.id_pedido + ". Está com o estatus" + element.status + ". Data: " + new Date(element.data_pedido).toLocaleDateString('pt-BR') + ". Seu fornecedor é " + element.mercadonome + ".";

        }
    } else {
        for (let index = 0; index < orders.length; index++) {
            let element = orders[index];
            string += "Pedido número " + element.id_pedido + ". Está com o estatus" + element.status + ". Data: " + new Date(element.data_pedido).toLocaleDateString('pt-BR') + ". Seu fornecedor é " + element.mercadonome + ".";
        }
    }
    speak(string);
}

function assistantCepRepeat() {
    speak(texts.repeatCep);
}
function assistantCvvRepeat() {
    speak(texts.repeatCvv);
}
function assistantCardNumberRepeat() {
    speak(texts.repeatCardNumber);
}
function assistantErrorCloseOrder() {
    speak(texts.errorCloseOrder);
}

function numberToReal(numero) {
    var numero = numero.toFixed(2).split('.');
    numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
    return numero.join(',');
}
function assistantReadMessages(mensagens, qtd) {
    let string = "";
    if (qtd > 0 && qtd < mensagens.length) {
        for (let index = 0; qtd > index; index++) {
            let element = mensagens[index];
            if (element.typeMessage) {
                string += "Entregador: " + element.mensagem + ". ";

            } else {
                string += "Você: " + element.mensagem + ". ";
            }
        }
    } else {
        for (let index = 0; index < mensagens.length; index++) {
            let element = mensagens[index];
            if (element.typeMessage) {
                string += "Entregador: " + element.mensagem + ". ";

            } else {
                string += "Você: " + element.mensagem + ". ";
            }
        }
    }
    console.log(string);
    speak(string);
}




export {
    welcome,
    assistantMarketFound,
    assistantMarketsLoaded,
    assistantReadMarkets,
    assistantMarketOpened,
    assistantReadProducts,
    assistantProductsSearch,
    assistantPromocoesView,
    assistantRegularView,
    assistantProductOpen,
    assistantReadProductDescription,
    assistantProductAdded,
    assistantProductEdited,
    assistantCartOpen,
    assistantProductRemoved,
    assistantReadCart,
    assistantFinalizarPedidoOpened,
    assistantCepLoaded,
    assistantResumoCompraView,
    assistantCupomAdded,
    assistantCupomInvalid,
    assistantPaymentView,
    assistantOrderFinal,
    assistantMyOrdersOpen,
    assistantReadOrder,
    assistantReadOrders,
    assistantInformCep,
    assistantInformNumber,
    assistantInformDeliveryMethod,
    assistantInformCardNumber,
    assistantInformExpireDate,
    assistantInformCVV,
    assistantCepRepeat,
    assistantCvvRepeat,
    assistantCardNumberRepeat,
    assistantRepeatCommand,
    assistantChatInformations,
    assistantErrorCloseOrder,
    assistantReadMessages,
    getPedidoAberto,
    toggleAssistantVoice,
    assistantActivated
}