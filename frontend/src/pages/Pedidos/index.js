import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Checkbox from '@material-ui/core/Checkbox';

import IconButton from '@material-ui/core/IconButton';


import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';


import api from "../../services/api";

export default function Pedidos() {

    const [cod_mercado, setCod_mercado] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [pedidosConfigs, setPedidosConfigs] = useState([]);

    const [open, setOpen] = React.useState(false);

    const [mercados, setMercados] = useState([]);
    var tempArray = [];

    useEffect(() => {
        loadMarkets();
    }, [])

    async function loadMarkets() {

        const userToken = localStorage.getItem('userToken');
        const response = await api.get("/mercado", {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            setMercados(response.data);
            setCod_mercado(response.data[0].id_mercado);
            await loadPedidos();
        }

    }

    async function loadPedidos() {
        let tempCod_mercado = document.getElementById("demo-simple-select").value;

        const userToken = localStorage.getItem('userToken');
        const response = await api.get("/pedido/mercado/" + tempCod_mercado, {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            let configs = [];
            response.data.map(r => {
                configs.push({ id_pedido: r.id_pedido, expanded: false, produtos: [] })
            });
            await setPedidosConfigs(configs);
            await setPedidos(response.data);
            tempArray = configs;
            response.data.map(async p => {
                console.log("Entrei");
                await loadOrder(p);
            });
        }


    }

    async function changeSelect(event) {
        setCod_mercado(event.target.value)
        loadPedidos();
    }

    async function loadOrder(pedido) {
        const userToken = localStorage.getItem('userToken');
        const response = await api.get("/pedido/produtos/" + pedido.id_pedido, {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            for (var i = 0; i < tempArray.length; i++) {
                if (tempArray[i].id_pedido === pedido.id_pedido) {
                    tempArray[i].expanded = !tempArray[i].expanded;
                    tempArray[i].produtos = response.data;
                }

            }
            setPedidosConfigs(tempArray);
            setTimeout(() => {
                setOpen(!open)
            }, 1000);
        }
    }

    async function movimentarPedido(pedido) {
        const userToken = localStorage.getItem('userToken');
        const response = await api.put("/pedido/change-status/" + pedido.id_pedido,{status: "Pronto para entrega"}, {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            loadPedidos();
        }
    }


    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Pedidos
      		</Typography>
            <Typography variant="h6" gutterBottom>
                Mercado:
                <select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cod_mercado}
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
                    {mercados.map(mercado => (
                        <option key={mercado.id_mercado} value={mercado.id_mercado}>{mercado.id_mercado} {mercado.nome}</option>
                    ))}
                </select >
            </Typography>

            <Grid container spacing={3} md={12} style={{ marginTop: 20 }}>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Pedido</TableCell>
                            <TableCell>Alterar Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pedidos.map((pedido, index) => (
                            <>
                                <TableRow >
                                    <TableCell>Pedido N°{pedido.id_pedido}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            type="submit"
                                            onClick={movimentarPedido.bind(this, pedido)}
                                        >
                                            Pronto para entrega
									</Button>
                                    </TableCell>
                                    <TableCell>
                                        Ver pedido
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={3}>
                                        <Collapse in={true} timeout="auto" unmountOnExit>
                                            <Box margin={1}>
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Pedido
                                                </Typography>
                                                <Table size="small" aria-label="purchases">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell> - </TableCell>
                                                            <TableCell>Quantidade</TableCell>
                                                            <TableCell>Produto</TableCell>
                                                            <TableCell align="right">Valor</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {pedidosConfigs[index]?.produtos?.map(p => (
                                                            <TableRow role="checkbox" key={p.cod_produto}>
                                                                <TableCell component="th" scope="row">
                                                                    <Checkbox />
                                                                </TableCell>
                                                                <TableCell>{p.quantidade}x</TableCell>
                                                                <TableCell>{p.nome}</TableCell>
                                                                <TableCell align="right">
                                                                    R$ {p.quantidade * p.preco}
                                                                </TableCell>
                                                            </TableRow>

                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>

            </Grid>
        </React.Fragment>
    );
}