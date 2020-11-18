import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Chat from "../../components/Chat"


import { connectWebSocket, disconnectWebSocket } from '../../services/socket';

import Button from '@material-ui/core/Button';


import api from "../../services/api";

export default function Chat_Entregadores() {

    const [idEntregador, setIdEntregador] = useState('');
    const [pedidosDisponiveis, setPedidosDisponiveis] = useState([]);
    const [pedidosEntregador, setPedidosEntregador] = useState([]);

    const [entregadores, setEntregadores] = useState([]);

    useEffect(() => {
        async function onLoad() {
            await loadDelivers();
        }
        onLoad();

    }, [])

    async function loadDelivers() {

        const userToken = localStorage.getItem('userToken');
        const response = await api.get("/entregador", {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            setEntregadores(response.data);
        }

    }

    async function changeSelect(event) {
        setIdEntregador(event.target.value)
        loadPedidosEntregador();
        disconnectWebSocket();
        let id_entregador = document.getElementById("demo-simple-select").value;
        connectWebSocket(id_entregador);
    }

    async function loadPedidosEntregador() {
        let tempCod_Entregador = document.getElementById("demo-simple-select").value;

        const userToken = localStorage.getItem('userToken');
        const response = await api.get("/pedido/entregador/" + tempCod_Entregador, {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            await setPedidosEntregador(response.data);
        }


    }


    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Pedidos para entregadores
      		</Typography>
            <Typography variant="h6" gutterBottom>
                Entregador:
                <select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={idEntregador}
                    onChange={changeSelect}
                    style={{
                        display: "inline-block",
                        width: "100%",
                        height: "calc(1.5em + .75rem + 2px)",
                        padding: ".375rem 1.75rem .375rem .75rem",
                        fontSize: "1rem",
                        fontWeight: 400,
                        lineHeight: "1.5",
                        color: "#495057",
                        verticalAlign: "middle",
                        border: "1px solid #A00000 ",
                        borderRadius: ".25rem",
                        appearance: "none",
                    }}
                >
                    <option value="" selected disabled hidden>Escolha o entregador...</option>
                    {entregadores.map(entregador => (
                        <option key={entregador.id_entregador} value={entregador.id_entregador}>{entregador.id_entregador} {entregador.nome}</option>
                    ))}
                </select >
            </Typography>

            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Typography variant="h4" gutterBottom>
                    Pedidos do {document.getElementById("demo-simple-select")?.options[document.getElementById("demo-simple-select").selectedIndex].text}
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Chat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pedidosEntregador.map((pedido, index) => (
                            <TableRow key={pedido.id_pedido}>
                                <TableCell>Pedido N°{pedido.id_pedido}</TableCell>
                                <TableCell>
                                    <Chat pedido={pedido}/>
                                </TableCell>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>

            </Grid>


        </React.Fragment>
    );
}