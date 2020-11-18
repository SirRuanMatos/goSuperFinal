import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Button from '@material-ui/core/Button';


import api from "../../services/api";

export default function Home() {

    const [cod_mercado, setCod_mercado] = useState('');
    const [id_produto, setId_produto] = useState('');
    const [nome, setNome] = useState('');
    const [url_img, setUrl_img] = useState('');
    const [descricao, setDescricao] = useState('');
    const [estoque, setEstoque] = useState('');
    const [preco, setPreco] = useState('');
    const [preco_lista, setPreco_lista] = useState('');

    const [mercados, setMercados] = useState([]);
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        loadMarkets();
    }, [])

    async function handleSubmit(e) {
        e.preventDefault();

        const userToken = localStorage.getItem('userToken');
        let tempCod_mercado = document.getElementById("demo-simple-select").value;

        let form = { id_produto, nome, url_img, "cod_mercado": tempCod_mercado, descricao, estoque, preco, preco_lista }

        var response;
        if (id_produto !== "") {
            response = await api.put("/produto/" + id_produto, form, {
                headers: {
                    authorization: "Bearer " + userToken
                }
            });
        }
        else {
            response = await api.post("/produto", form, {
                headers: {
                    authorization: "Bearer " + userToken
                }
            });
        }

        if (response.status === 200) {
            limparFormulario();
            loadProducts();
        }
    }

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
            await loadProducts();
        }

    }

    async function loadProducts() {
        let tempCod_mercado = document.getElementById("demo-simple-select").value;

        const userToken = localStorage.getItem('userToken');
        const response = await api.get("/produto/mercado/" + tempCod_mercado, {
            headers: {
                authorization: "Bearer " + userToken
            }
        });
        if (response.status === 200) {
            setProdutos(response.data);
        }


    }

    function limparFormulario() {
        setId_produto("");
        setNome("");
        setUrl_img("");
        setDescricao("");
        setEstoque("");
        setPreco("");
        setPreco_lista("");
    }

    function editarProduto(i) {
        setCod_mercado(produtos[i].cod_mercado);
        setId_produto(produtos[i].id_produto);
        setNome(produtos[i].nome);
        setUrl_img(produtos[i].url_img);
        setDescricao(produtos[i].descricao);
        setEstoque(produtos[i].estoque);
        setPreco(produtos[i].preco);
        setPreco_lista(produtos[i].preco_lista);
    }

    async function excluirProduto(i) {
        const userToken = localStorage.getItem('userToken');

        const response = await api.delete("/produto/" + produtos[i].id_produto, {
            headers: {
                authorization: "Bearer " + userToken
            }
        });

        if (response.status === 204) {
            loadProducts();
        }
    }
    async function changeSelect(event) {
        setCod_mercado(event.target.value)
        loadProducts();
    }


    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Produtos
      		</Typography>
            <Typography variant="h6" gutterBottom>
                Mercado:
                <select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={cod_mercado}
                    onChange={changeSelect}
                >
                    {mercados.map(mercado => (
                        <option  key={mercado.id_mercado} value={mercado.id_mercado}>{mercado.id_mercado} {mercado.nome}</option>
                    ))}
                </select >
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="nome"
                            name="nome"
                            label="Nome"
                            fullWidth
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="url_img"
                            name="url_img"
                            label="URL da imagem do produto"
                            fullWidth
                            value={url_img}
                            onChange={e => setUrl_img(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="estoque"
                            name="estoque"
                            label="Estoque"
                            fullWidth
                            autoComplete="shipping address-line1"
                            value={estoque}
                            onChange={e => setEstoque(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="descricao"
                            name="descricao"
                            label="Descrição"
                            fullWidth
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="preco_lista"
                            name="preco_lista"
                            label="Preço de lista"
                            fullWidth
                            value={preco_lista}
                            onChange={e => setPreco_lista(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="preco"
                            name="preco"
                            label="Preço"
                            fullWidth
                            autoComplete="shipping address-line2"
                            value={preco}
                            onChange={e => setPreco(e.target.value)}
                        />
                    </Grid>
                    <React.Fragment>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                {'Cadastrar'}
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => { limparFormulario() }}
                                style={{ marginLeft: 50 }}
                            >
                                Cancelar
							</Button>
                        </div>
                    </React.Fragment>
                </Grid>
            </form>

            <Grid container spacing={3} md={12} style={{ marginTop: 20 }}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Editar</TableCell>
                            <TableCell>Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {produtos.map((produto, index) => (
                            <TableRow key={produto.id_produto}>
                                <TableCell>{produto.id_produto}</TableCell>
                                <TableCell>{produto.nome}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        type="submit"
                                        onClick={(a) => { editarProduto(index) }}
                                    >
                                        Editar
									</Button>
                                </TableCell>
                                <TableCell><Button
                                    variant="contained"
                                    color="secondary"
                                    type="submit"
                                    onClick={(a) => { excluirProduto(index) }}
                                >
                                    Excluir
									</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </Grid>
        </React.Fragment>
    );
}