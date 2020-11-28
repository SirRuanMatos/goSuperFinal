import socketio from 'socket.io-client';

const socket = socketio('http://192.168.15.11:3333', {
    autoConnect: false,
});

function arriveMessage(subcribeFunction) {
    socket.on('new-message', subcribeFunction);
}
function arriveMessageAssistant(subcribeFunction) {
    socket.on('new-message-from-assistant', subcribeFunction);
}

function sendMessage(message) {
    socket.emit('new-message-deliver', message);
}

function sendMessageAssistant(message) {
    socket.emit('new-message-assistant', message);
}

function connectWebSocket(id_entregador, id_usuario) {
    socket.io.opts.query = {
        id_entregador,
        id_usuario
    };

    socket.connect();
}

function disconnectWebSocket() {
    if (socket.connected) {
        socket.disconnect();
    }
}

export {
    connectWebSocket,
    disconnectWebSocket,
    arriveMessage,
    sendMessage, 
    sendMessageAssistant,
    arriveMessageAssistant
};