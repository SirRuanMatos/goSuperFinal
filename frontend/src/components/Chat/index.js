import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import { sendMessage, arriveMessage } from '../../services/socket';
 
export default function Chat(props) {
    const [chat, setChat] = useState([])
    useEffect(() => {
    }, [])

    useEffect(() => {
        function addMsg(msg) {
            if (JSON.parse(msg).id_pedido !== props.pedido.id_pedido) {
                return;
            }
            setChat([...chat, {...JSON.parse(msg), typeMessage: "recebido"}])
        }
        arriveMessage(addMsg);
    }, [chat]);

    async function enviarMensagem(e) {
        e.preventDefault();
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let payload = {
            mensagem: document.getElementById('m' + props.pedido.id_pedido).value,
            id_pedido: props.pedido.id_pedido,
            id_entregador: props.pedido.cod_entregador,
            id_usuario: props.pedido.cod_usuario,
            time: h + ":" + m
        };

        let stringedPayload = JSON.stringify(payload);
        sendMessage(stringedPayload);
        setChat([...chat, payload]);
        document.getElementById('m' + props.pedido.id_pedido).value = "";

    }

    return (
        <div className='container' >
            <ul id="messages">
                {chat.map((msg,i) => (<li key={"pedido"+msg.id_pedido+i}>{msg.typeMessage === "recebido" && <b>Cliente:</b>}{msg.mensagem} - {msg.time}</li>))}
            </ul>
            <form onSubmit={enviarMensagem}>
                <input id={"m" + props.pedido.id_pedido} autoComplete="off" /><button>Send</button>
            </form>
        </div>
    );
}