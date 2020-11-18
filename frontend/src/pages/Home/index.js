import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';


import api from "../../services/api";

export default function Home() {

	const [id_mercado, setId_mercado] = useState('');
	const [nome, setNome] = useState('');
	const [url_imagem, setUrl_imagem] = useState('');
	const [cep, setCep] = useState('');
	const [rua, setRua] = useState('');
	const [numero, setNumero] = useState('');
	const [complemento, setComplemento] = useState('');
	const [bairro, setBairro] = useState('');
	const [estado, setEstado] = useState('');
	const [pais, setPais] = useState('');
	const [cidade, setCidade] = useState('');

	const [mercados, setMercados] = useState([]);

	useEffect(() => {
		loadMarkets()
	}, [])

	async function handleSubmit(e) {
		e.preventDefault();

		const userToken = localStorage.getItem('userToken');

		let form = { nome, url_imagem, cep, rua, numero, complemento, bairro, estado, pais, cidade, id_mercado }

		var response;
		if (id_mercado !== "") {
			response = await api.put("/mercado/"+id_mercado, form, {
				headers: {
					authorization: "Bearer " + userToken
				}
			});
		}
		else {
			response = await api.post("/mercado", form, {
				headers: {
					authorization: "Bearer " + userToken
				}
			});
		}

		if (response.status === 200) {
			limparFormulario();
			loadMarkets();
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
		}
	}

	function limparFormulario() {
		setId_mercado("");
		setCidade("");
		setPais("");
		setEstado("");
		setBairro("");
		setComplemento("");
		setNumero("");
		setRua("");
		setCep("");
		setUrl_imagem("");
		setNome("");
	}

	function editarMercado(i) {
		setId_mercado(mercados[i].id_mercado);
		setCidade(mercados[i].cidade);
		setPais(mercados[i].pais);
		setEstado(mercados[i].estado);
		setBairro(mercados[i].bairro);
		setComplemento(mercados[i].complemento);
		setNumero(mercados[i].numero);
		setRua(mercados[i].rua);
		setCep(mercados[i].cep);
		setUrl_imagem(mercados[i].url_imagem);
		setNome(mercados[i].nome);
	}

	async function excluirMercado(i) {
		const userToken = localStorage.getItem('userToken');

		const response = await api.delete("/mercado/" + mercados[i].id_mercado, {
			headers: {
				authorization: "Bearer " + userToken
			}
		});

		if (response.status === 204) {
			loadMarkets();
		}
	}

	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Mercados
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
							id="url_imagem"
							name="url_imagem"
							label="URL da logo"
							fullWidth
							value={url_imagem}
							onChange={e => setUrl_imagem(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="rua"
							name="rua"
							label="rua"
							fullWidth
							autoComplete="shipping address-line1"
							value={rua}
							onChange={e => setRua(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id="complemento"
							name="complemento"
							label="Complemento"
							fullWidth
							autoComplete="shipping address-line2"
							value={complemento}
							onChange={e => setComplemento(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id="numero"
							name="numero"
							label="Número"
							fullWidth
							value={numero}
							onChange={e => setNumero(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id="bairro"
							name="bairro"
							label="Bairro"
							fullWidth
							value={bairro}
							onChange={e => setBairro(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="cidade"
							name="cidade"
							label="cidade"
							fullWidth
							autoComplete="shipping address-level2"
							value={cidade}
							onChange={e => setCidade(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField id="estado" name="estado" label="Estado" value={estado}
							onChange={e => setEstado(e.target.value)} fullWidth />
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="cep"
							name="cep"
							label="CEP"
							fullWidth
							autoComplete="shipping postal-code"
							value={cep}
							onChange={e => setCep(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="pais"
							name="pais"
							label="País"
							fullWidth
							autoComplete="shipping country"
							value={pais}
							onChange={e => setPais(e.target.value)}
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
								color="red"
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
						{mercados.map((mercado, index) => (
							<TableRow key={mercado.id_mercado}>
								<TableCell>{mercado.id_mercado}</TableCell>
								<TableCell>{mercado.nome}</TableCell>
								<TableCell>
									<Button
										variant="contained"
										color="secondary"
										type="submit"
										onClick={(a) => { editarMercado(index) }}
									>
										Editar
									</Button>
								</TableCell>
								<TableCell><Button
									variant="contained"
									color="secondary"
									type="submit"
									onClick={(a) => { excluirMercado(index) }}
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