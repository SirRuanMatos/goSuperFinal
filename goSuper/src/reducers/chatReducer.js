
export default function chat(state = [], action) {
    switch (action.type) {
        case 'ADD_MESSAGE':
            state = [...state, action.msg]
            return state;
            break;

        case 'OPEN_CHAT':
            let tempArray = state.filter(msg => {
                return msg.id_pedido == action.id_pedido;
            });
            return tempArray;
            break;
        default:
            return state;
            break;
    }
}