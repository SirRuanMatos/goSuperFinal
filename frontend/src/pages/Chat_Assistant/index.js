import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import { sendMessageAssistant, arriveMessageAssistant } from '../../services/socket';

import Chat from "../../components/Chat"


import { connectWebSocket, disconnectWebSocket } from '../../services/socket';

import Button from '@material-ui/core/Button';


import api from "../../services/api";

export default function Chat_Assistant() {
    const [chat, setChat] = useState([])
    const id_usuario = localStorage.getItem('id_usuario');


    useEffect(() => {

        connectWebSocket(null, id_usuario);

    }, []);

    useEffect(() => {
        function addMsg(msg) {
            console.log(msg);
            let today = new Date();
            let h = today.getHours();
            let m = today.getMinutes();
            let jsonMsg = {
                mensagem: msg,
                time: h + ":" + m,
            };
            setChat([...chat, { ...jsonMsg, typeMessage: "recebido" }])
        }
        arriveMessageAssistant(addMsg);
    }, [chat]);

    async function enviarMensagem(e) {
        e.preventDefault();
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let payload = {
            mensagem: document.getElementById('m').value,
            time: h + ":" + m,
            id_usuario
        };

        let stringedPayload = JSON.stringify(payload);
        sendMessageAssistant(stringedPayload);
        setChat([...chat, payload]);
        document.getElementById('m').value = "";

    }



    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Pedidos para entregadores
      		</Typography>
            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Typography variant="h4" gutterBottom>
                    Pedidos do
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Chat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Assistant</TableCell>
                            <TableCell>
                                <div className='container' >
                                    <ul id="messages">
                                        {chat.map((msg, i) => (<li key={"msg" + i}>{msg.typeMessage === "recebido" && <b>Cliente:</b>}{msg.mensagem} - {msg.time}</li>))}
                                    </ul>
                                    <form onSubmit={enviarMensagem}>
                                        <input id={"m"} autoComplete="off" /><button>Send</button>
                                    </form>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </Grid>


        </React.Fragment>
    );
}