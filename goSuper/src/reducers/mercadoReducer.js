export default function mercado(state = [], action) {
    switch (action.type) {
        case 'SET_MERCADO':
            return {mercado: action.mercado}
            break;
    
        default:
            return state;
            break;
    }
}