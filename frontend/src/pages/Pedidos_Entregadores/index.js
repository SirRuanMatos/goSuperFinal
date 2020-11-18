import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';


import api from "../../services/api";

export default function Pedidos_Entregadores() {

    const [idEntregador, setIdEntregador] = useState('');
    const [pedidosDisponiveis, setPedidosDisponiveis] = useState([]);
    const [pedidosEntregador, setPedidosEntregador] = useState([]);

    const [entregadores, setEntregadores] = useState([]);

    useEffect(() => {
        async function onLoad() {
            await loadDelivers();
            await loadOrdersForDeliverers();
            await loadPedidosEntregador();
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

    async function loadOrdersForDeliverers() {

        const userToken = localStorage.getItem('userToken');
        const response = await api.get("/pedido/entregador", {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            setPedidosDisponiveis(response.data);
        }

    }

    async function changeSelect(event) {
        setIdEntregador(event.target.value)
        loadPedidosEntregador();
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

    async function selecionarPedido(pedido) {

        let tempCod_Entregador = document.getElementById("demo-simple-select").value;
        let payload = {
            id_pedido: pedido.id_pedido,
            id_entregador: tempCod_Entregador,
            status: "Entrega em andamento",
        };
        const userToken = localStorage.getItem('userToken');
        const response = await api.put("/pedido/selected-for-deliver", payload, {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            //Chama carrega pedidos do entregador
            loadOrdersForDeliverers();
            loadPedidosEntregador();
        }
    }

    async function entregarPedido(pedido) {

        let payload = {
            status: "Entregue",
        };
        const userToken = localStorage.getItem('userToken');
        const response = await api.put("/pedido/change-status/" + pedido.id_pedido, payload, {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            //Chama carrega pedidos do entregador
            loadOrdersForDeliverers();
            loadPedidosEntregador();
        }
    }



    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Pedidos para entregadores
      		</Typography>
            <Typography variant="h6" gutterBottom>
                Mercado:
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
                    {entregadores.map(entregador => (
                        <option key={entregador.id_entregador} value={entregador.id_entregador}>{entregador.id_entregador} {entregador.nome}</option>
                    ))}
                </select >
            </Typography>

            <Grid container spacing={3} style={{ marginTop: 20 }}>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Pedido</TableCell>
                            <TableCell>Alterar Status</TableCell>
                            <TableCell>Endereço de coleta</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pedidosDisponiveis.map((pedido, index) => (
                            <TableRow key={pedido.id_pedido}>
                                <TableCell>{pedido.id_pedido}</TableCell>
                                <TableCell>Pedido N°{pedido.id_pedido}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={selecionarPedido.bind(this, pedido)}
                                    >
                                        Escolher pedido
									</Button>
                                </TableCell>
                                <TableCell>
                                    <b>Rua: </b> {pedido.rua}<br />
                                    <b>Numero: </b> {pedido.numero}<br />
                                    <b>Bairro: </b> {pedido.bairro}<br />
                                    <b>Complemento: </b> {pedido.complemento}<br />
                                    <b>CEP: </b> {pedido.cep}<br />
                                    <b>Cidade: </b> {pedido.cidade}<br />
                                </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>

            </Grid>

            <Grid container spacing={3} style={{ marginTop: 20 }}>
                <Typography variant="h4" gutterBottom>
                    Pedidos do {document.getElementById("demo-simple-select")?.innerText}
                </Typography>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Coletar</TableCell>
                            <TableCell>Endereço da entrega</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pedidosEntregador.map((pedido, index) => (
                            <TableRow key={pedido.id_pedido}>
                                <TableCell>Pedido N°{pedido.id_pedido}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={entregarPedido.bind(this, pedido)}
                                    >
                                        Pedido entregue
									</Button>
                                </TableCell>
                                <TableCell>
                                    <b>Rua: </b> {pedido.rua}<br />
                                    <b>Numero: </b> {pedido.numero}<br />
                                    <b>Bairro: </b> {pedido.bairro}<br />
                                    <b>Complemento: </b> {pedido.complemento}<br />
                                    <b>CEP: </b> {pedido.cep}<br />
                                    <b>Cidade: </b> {pedido.cidade}<br />
                                </TableCell>

                            </TableRow>

                        ))}
                    </TableBody>
                </Table>

            </Grid>


        </React.Fragment>
    );
}