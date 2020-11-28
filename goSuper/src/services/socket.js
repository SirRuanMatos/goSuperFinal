import socketio from 'socket.io-client';

var socket = socketio('http://192.168.15.11:3333', {
    autoConnect: false,
    secure: true,
    transports: ['websocket'],
    jsonp: false,
});


function arriveMessage(subcribeFunction) {
    socket.on('new-message', subcribeFunction);
}

function sendMessage(message) {
    console.log("Entrei");
    socket.emit('new-message-customer', message);
}

function sendMessageAssistant(message, teste) {
    socket.emit('new-message-assistant', message);
}

function arriveMessageAssistant(subcribeFunction) {
    socket.on('new-message-from-assistant', subcribeFunction);
}

function connectWebSocket(id_usuario) {

    socket.io.opts.query = {
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