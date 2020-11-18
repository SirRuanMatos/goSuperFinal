import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import api from "../../services/api";
import Header from "../../components/header";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as produtoAction from '../../actions/produtoAction';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { assistantMarketOpened, assistantReadProducts, assistantProductsSearch, assistantRegularView, assistantPromocoesView } from "../../services/assistant";

import promotionBadge from '../../assets/promotion-badge.png';


function Mercado(props) {

    const navigation = useNavigation();
    const [pesquisa, setPesquisa] = useState("");
    const [searchView, setSearchView] = useState(true);
    const [produtos, setProdutos] = useState([]);
    const [produtosPromocoes, setProdutosPromocoes] = useState([]);
    const [promocoesView, setPromocoesView] = useState(false);

    var pesqInputRef;


    useEffect(() => {
        navigation.addListener('focus', () => {
            onLoad()
        });
    }, []);

    useEffect(() => {
        console.log("Mercado: ",props.assistant);
        if (props.assistant && props.assistant.action === "searchProduct") {
            searchProduct(props.assistant.variables.produto)
        }
        if (props.assistant && props.assistant.action === "readProducts") {
            assistantReadProducts(props.assistant.variables.quantitiy)
        }
        if (props.assistant && props.assistant.action === "openProduct") {
            openProductAssistant(props.assistant.variables.product)
        }
        

    }, [props.assistant]);

    

    async function onLoad() {
        if (!props.user)
            navigation.navigate('Login');

        async function loadProdutos() {
            const respProdutos = await api.get("/produto/mercado/" + props.mercado.id_mercado, {
                headers: {
                    authorization: "Bearer " + props.user.token
                }
            });
            if (respProdutos.status == 200) {
                setProdutos(respProdutos.data);
                let x = respProdutos.data.filter(produto => {
                    return produto.preco_lista != 0;
                });
                setProdutosPromocoes(x);
                assistantMarketOpened(props.mercado.nome, respProdutos.data.length, respProdutos.data);
            }
        }

        loadProdutos();
    }
    async function searchProduct(nomeProduto) {
        setPesquisa(nomeProduto);
        pesquisar(nomeProduto);
    }

    async function openProductAssistant(nomeProduto) {
        var produto = produtos.filter(e => {
            return e.nome.toUpperCase().includes(nomeProduto.toUpperCase());
        });

        if (produto.length > 0) {
            seeProduct(produto[0]);
        }
    }

    function seeProduct(produto) {
        props.setProduto(produto);
        navigation.navigate('Produto');
    }

    function numberToReal(numero) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }

    function calculatePromotion(listPrice, salePrice) {
        let valor = (((salePrice * 100) / listPrice) - 100) * -1
        return parseInt(valor)
    }

    async function pesquisar(fromAssistant) {
        if (pesquisa != "" || typeof (fromAssistant) == "string") {
            var respProdutos;

            if (typeof (fromAssistant) == "string") {
                respProdutos = await api.get("/produto/pesquisar?search=" + fromAssistant + "&id_mercado=" + props.mercado.id_mercado, {
                    headers: {
                        authorization: "Bearer " + props.user.token
                    }
                });
                if (respProdutos.status == 200) {
                    setProdutos(respProdutos.data);
                    let x = respProdutos.data.filter(produto => {
                        return produto.preco_lista != 0;
                    });
                    setProdutosPromocoes(x);
                    assistantProductsSearch(respProdutos.data.length, respProdutos.data);
                }
            }
            else {
                respProdutos = await api.get("/produto/pesquisar?search=" + pesquisa + "&id_mercado=" + props.mercado.id_mercado, {
                    headers: {
                        authorization: "Bearer " + props.user.token
                    }
                });
                if (respProdutos.status == 200) {
                    setProdutos(respProdutos.data);
                    let x = respProdutos.data.filter(produto => {
                        return produto.preco_lista != 0;
                    });
                    setProdutosPromocoes(x);
                    assistantProductsSearch(respProdutos.data.length, respProdutos.data);
                }
            }
        } else {
            const respProdutos = await api.get("/produto/mercado/" + props.mercado.id_mercado, {
                headers: {
                    authorization: "Bearer " + props.user.token
                }
            });
            if (respProdutos.status == 200) {
                setProdutos(respProdutos.data);
                let x = respProdutos.data.filter(produto => {
                    return produto.preco_lista != 0;
                });
                setProdutosPromocoes(x);
                assistantProductsSearch(respProdutos.data.length, respProdutos.data);
            }
        }
        setSearchView(!searchView);
    }

    async function filtraPromocoes() {
        setPromocoesView(!promocoesView);
        if (!promocoesView) {
            assistantPromocoesView(produtosPromocoes.length, produtosPromocoes);

        }
        else {
            assistantRegularView(produtos);
        }
    }

    return (
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                    <Header style={styles.container} btBgCollors="#A00000" btIcCollors="#fff" />
                    <View style={styles.containerPage}>
                        <View style={styles.containerImageMercado}>
                            <Image style={styles.imageMercado} source={{
                                uri: props.mercado.url_imagem,
                            }} />
                        </View>
                        {searchView ?
                            <View style={styles.containerHeader}>
                                <TouchableOpacity style={styles.buttonsTop} onPress={() => { setSearchView(!searchView) }}>
                                    <MaterialIcons name="search" size={25} color={"#fff"} />
                                    <Text style={styles.buttonText}>
                                        Pesquisar
                                </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonsTop} onPress={() => { filtraPromocoes() }}>
                                    <MaterialIcons name="money-off" size={25} color={"#fff"} />
                                    <Text style={styles.buttonText}>
                                        {!promocoesView ? "Promoções" : "Produtos"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            :
                            <TextInput
                                style={styles.input}
                                placeholder="Pesquisar..."
                                placeholderTextColor="#999"
                                autoCapitalize="words"
                                autoCorrect={true}
                                inlineImageLeft='ic_menu_black_24dp'
                                value={pesquisa}
                                onChangeText={setPesquisa}
                                returnKeyType="search"
                                onBlur={pesquisar}
                                autoFocus={true}
                            />
                        }



                        <View style={styles.containerProdutos}>
                            {!promocoesView && produtos.map(produto => (

                                <View style={styles.produto} key={produto.id_produto}>

                                    {produto.preco_lista != 0 &&
                                        <View style={styles.containerPromotion}>
                                            <Text style={styles.promotionText}>{calculatePromotion(produto.preco_lista, produto.preco)}%</Text>
                                            <Image source={promotionBadge} style={styles.produtoBadge} />
                                        </View>
                                    }
                                    <Image style={styles.imageProduto} source={{
                                        uri: produto.url_img,
                                    }} />
                                    <Text style={styles.produtoTitleText}>{produto.nome}</Text>
                                    {produto.preco_lista != 0 &&
                                        <Text style={styles.promotionTextPrice}>{numberToReal(produto.preco_lista)}</Text>
                                    }
                                    <Text style={styles.produtoPriceText}>{numberToReal(produto.preco)}</Text>
                                    <TouchableOpacity style={styles.buttonAddCart} onPress={() => seeProduct(produto)}>
                                        <MaterialIcons name="shopping-cart" size={20} color={"#fff"} />
                                        
                                        <Text style={styles.buttonAddCartText}>
                                            Adicionar ao carrinho
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                            {promocoesView && produtosPromocoes.map(produto => (

                                <View style={styles.produto} key={produto.id_produto}>

                                    {produto.preco_lista != 0 &&
                                        <View style={styles.containerPromotion}>
                                            <Text style={styles.promotionText}>{calculatePromotion(produto.preco_lista, produto.preco)}%</Text>
                                            <Image source={promotionBadge} style={styles.produtoBadge} />
                                        </View>
                                    }
                                    <Image style={styles.imageProduto} source={{
                                        uri: produto.url_img,
                                    }} />
                                    <Text style={styles.produtoTitleText}>{produto.nome}</Text>
                                    {produto.preco_lista != 0 &&
                                        <Text style={styles.promotionTextPrice}>{numberToReal(produto.preco_lista)}</Text>
                                    }
                                    <Text style={styles.produtoPriceText}>{numberToReal(produto.preco)}</Text>
                                    <TouchableOpacity style={styles.buttonAddCart} onPress={() => seeProduct(produto)}>
                                        <MaterialIcons name="shopping-cart" size={20} color={"#fff"} />
                                        <Text style={styles.buttonAddCartText}>
                                            Adicionar ao carrinho
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const mapStateToProps = state => ({
    user: state.user.user,
    mercado: state.mercado.mercado,
    assistant: state.assistant.assistant
});


const mapDispatchToProps = dispatch => bindActionCreators(produtoAction, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Mercado);