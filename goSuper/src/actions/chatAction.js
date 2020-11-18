export function addMessage(msg) {
    return {
        type: 'ADD_MESSAGE',
        msg
    }
}

export function openChat(id_pedido) {
    return {
        type: 'OPEN_CHAT',
        id_pedido
    }
}
