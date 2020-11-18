const db = require("../configs/database");

/* const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

// Configurar o wrapper de serviço do Assistente.
const service = new AssistantV2({
  version: '2019-02-28',
  authenticator: new IamAuthenticator({
    apikey: 'PcZOcu8qRcL69B12dCaPpGsUYfRNGRuDVOpdwtap3vig', // replace with API key
  })
});

const assistantId = 'f6e35f97-ab93-456c-bce1-3f2c632ccbd7'; // replace with assistant ID let sessionId;

// Create session.
service
  .createSession({
    assistantId,
  })
  .then(res => {
    sessionId = res.result.session_id;
    console.log(sessionId);
    sendMessage({
      messageType: 'text',
      text: 'Olá', // start conversation with empty message
    });
  })
  .catch(err => {
    console.log(err); // something went wrong 
  });

// Send message to assistant.
function sendMessage(messageInput) {
  service
    .message({
      assistantId,
      sessionId,
      input: messageInput
    })
    .then(res => {
      processResponse(res.result);
    })
    .catch(err => {
      console.log(err); // something went wrong 
    });
}

// Processe a resposta.
function processResponse(response) {
  // Display the output from assistant, if any. Supports only a single // text response.
  if (response.output.generic) {
    if (response.output.generic.length > 0) {
      if (response.output.generic[0].response_type === 'text') {
        console.log(response.output.generic[0].text);
        console.log(JSON.stringify(response));
      }
    }
  }


  // We're done, so we close the session.
  service
    .deleteSession({
      assistantId,
      sessionId,
    })
    .catch(err => {
      console.log(err); // something went wrong 
    });
}
 */

module.exports = {
  async index(req, resp) {
    const response = await db.query('SELECT * FROM teste');
    resp.status(200).send(response.rows);

  },
};