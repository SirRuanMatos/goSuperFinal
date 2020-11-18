export function setCarrinho(carrinho) {
    return {
        type: 'SET_CARRINHO',
        carrinho
    }
}

export function addProduct(produtoCart) {
    return {
        type: 'ADD_PRODUTO',
        produtoCart
    }
}

export function limparCarrinho() {
    return {
        type: 'LIMPAR_CARRINHO'
    }
}

export function removerProduto(id_produto) {
    return {
        type: 'REMOVER_PRODUTO',
        id_produto
    }
}