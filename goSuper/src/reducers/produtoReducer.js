export default function produto(state = [], action) {
    switch (action.type) {
        case 'SET_PRODUTO':
            return {produto: action.produto}
            break;
    
        default:
            return state;
            break;
    }
}