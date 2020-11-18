
export default function carrinho(state = [], action) {
    switch (action.type) {
        case 'SET_CARRINHO':
            
            return action.carrinho;
            break;

        case 'ADD_PRODUTO':
            let flag = true;
            let index;
            let elemento;
            state.map((e) => {
                if (e.produto.id_produto == action.produtoCart.produto.id_produto) {
                    e.quantidade = action.produtoCart.quantidade;
                    flag = false;
                    index = state.indexOf(e);
                    elemento = e;
                }
            });
            if (flag) {
                return [...state, {
                    produto: action.produtoCart.produto,
                    quantidade: action.produtoCart.quantidade
                }];
            } else {
                state.splice(index, 1);
                state.push(elemento);
                //state = array;
                return state;
            }
            break;

        case 'LIMPAR_CARRINHO':
            return [];
            break;

        case 'REMOVER_PRODUTO':
            
            state.map((e,i)=>{
                if(e.produto.id_produto == action.id_produto){
                    state.splice(i,1);
                }
            });
            return state;
            break;
        default:
            return state;
            break;
    }
}