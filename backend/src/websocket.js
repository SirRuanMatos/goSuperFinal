const socketio = require('socket.io');
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

// Configurar o wrapper de serviço do Assistente.
const service = new AssistantV2({
  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: 'PcZOcu8qRcL69B12dCaPpGsUYfRNGRuDVOpdwtap3vig', // replace with API key
  })
});

const assistantId = 'f6e35f97-ab93-456c-bce1-3f2c632ccbd7'; // replace with assistant ID let sessionId;

var connections = []
var io;

exports.setupWebSocket = (server) => {
  io = socketio(server);

  io.on('connection', socket => {
    const { id_usuario, id_entregador } = socket.handshake.query;
    console.log(socket.handshake.query);
    service
      .createSession({
        assistantId,
      })
      .then(res => {
        let sessionId = res.result.session_id;
        connections.push(
          {
            id: socket.id,
            id_usuario: id_usuario,
            id_entregador: id_entregador,
            assistant: sessionId
          }
        );
        /* connections = [{
          id: socket.id,
          id_usuario: id_usuario,
          id_entregador: id_entregador,
          assistant: sessionId
        }]; */
      })
      .catch(err => {
        connections.push(
          {
            id: socket.id,
            id_usuario: id_usuario,
            id_entregador: id_entregador
          }
        );
        console.log(err); // something went wrong 
      });


    socket.on('new-message-customer', (msg) => {
      let jsonMsg = JSON.parse(msg);
      let sendTo = this.findConnections(jsonMsg.id_entregador, 'entregador')
      this.sendMessage(sendTo, msg);
    });
    socket.on('new-message-deliver', (msg) => {
      let jsonMsg = JSON.parse(msg);
      let sendTo = this.findConnections(jsonMsg.id_usuario, 'usuario')

      this.sendMessage(sendTo, msg);
    });
    socket.on('new-message-assistant', (msg) => {
      let jsonMsg = JSON.parse(msg);
      let sendTo = this.findConnections(jsonMsg.id_usuario, 'usuario')
      let msgAssistantFormat = {
        messageType: 'text',
        text: jsonMsg.mensagem,
      }
      this.sendMessageToAssistant(msgAssistantFormat, sendTo);
    });

  });


}

exports.findConnections = (id, type) => {
  return connections.filter(connection => {
    if (type === 'entregador') {
      return connection.id_entregador == id;
    } else {
      return connection.id_usuario == id;
    }

  })
}

exports.sendMessage = (to, message) => {
  to.forEach(connection => {
    io.to(connection.id).emit("new-message", message);
  })
}

exports.sendMessageToAssistant = (messageInput, returnIds) => {
  service
    .message({
      assistantId,
      sessionId: returnIds[0].assistant,
      input: messageInput
    })
    .then(res => {
      let message = this.processResponseAssistant(res.result);
      return message;
    }).then(message => {
      returnIds.forEach(connection => {
        io.to(connection.id).emit("new-message-from-assistant", message);
      });
    })
    .catch(err => {
      console.log(err); // something went wrong
      returnIds.forEach(connection => {
        service
          .createSession({
            assistantId,
          })
          .then(res => {
            let sessionId = res.result.session_id;
            connection.assistant = sessionId;
            this.sendMessageToAssistant(messageInput, returnIds);
          });
      });
    });
}

exports.processResponseAssistant = (response) => {
  // Display the output from assistant, if any. Supports only a single // text response.
  if (response.output.generic) {
    if (response.output.generic.length > 0) {
      if (response.output.generic[0].response_type === 'text') {
        return response.output.generic[0].text;
      }
      return response.output.generic[0];
    }
  }
}