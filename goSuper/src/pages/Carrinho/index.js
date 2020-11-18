import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, BackHandler } from 'react-native';
import api from "../../services/api";
import Header from "../../components/header";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as produtoAction from '../../actions/produtoAction';
import * as carrinhoAction from '../../actions/carrinhoAction';

import { assistantCartOpen, assistantProductAdded, assistantReadCart,assistantProductRemoved, assistantReadProducts } from "../../services/assistant";

import { bindActionCreators } from 'redux';

import { connect, useSelector, shallowEqual } from 'react-redux';

function Carrinho(props) {

    const navigation = useNavigation();
    const [produtos, setProdutos] = useState([]);
    const [valorTotal, setValorTotal] = useState(0);

    useEffect(() => {
        navigation.addListener('focus', () => {
            onLoad()
        });
    }, []);

    useEffect(() => {
        console.log("Carrinho: ", props.assistant);
        if (props.assistant && props.assistant.action === "removeProductFromCart") {
            removeProductFromCart(props.assistant.variables.product)
        }
        if (props.assistant && props.assistant.action === "openProduct") {
            openProduct(props.assistant.variables.product)
        }
        if (props.assistant && props.assistant.action === "readProducts") {
            assistantReadCart()
        }
        if (props.assistant && props.assistant.action === "closeOrder") {
            navigation.navigate('Finalizar_Pedido');
        }

    }, [props.assistant]);

    async function onLoad() {
        if (!props.user)
            navigation.navigate('Login');

        setProdutos(props.carrinho);

        let value = 0;
        props.carrinho.map(produtoCart => {
            value += produtoCart.quantidade * produtoCart.produto.preco;
        });

        setValorTotal(value);

        assistantCartOpen(props.carrinho.length, value, props.carrinho);
    }
    async function openProduct(nomeProduto) {
        var produto = produtos.filter(e => {
            return e.nome.toUpperCase().includes(nomeProduto.toUpperCase());
        });

        if (produto.length > 0) {
            seeProduct(produto[0]);
        }
    }

    async function removeProductFromCart(nomeProduto) {
        var produto = produtos.filter(e => {
            return e.produto.nome.toUpperCase().includes(nomeProduto.toUpperCase());
        });

        if (produto.length > 0) {
            removerProduto(produto[0].produto.id_produto);
        }
    }

    function seeProduct(produto) {
        props.setProduto(produto);
        navigation.navigate('Produto');
    }

    function goToCheckout() {
        navigation.navigate('Finalizar_Pedido');
    }

    function numberToReal(numero) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }

    function removerProduto(id_produto) {
        props.removerProduto(id_produto);

        setProdutos(props.carrinho);

        let value = 0;
        produtos.map(produtoCart => {
            value += produtoCart.quantidade * produtoCart.produto.preco;
        });

        setValorTotal(value);

        assistantProductRemoved(props.carrinho.length, value, props.carrinho);
    }


    return (
        <View style={styles.main}>

            <ScrollView>
                <View style={styles.container}>
                    <Header style={styles.container} btBgCollors="#A00000" btIcCollors="#fff" size={30} />
                    <View style={styles.containerPage}>

                        <View style={styles.containerProdutos}>
                            {produtos.map(produto => (
                                <TouchableOpacity style={styles.produto} key={produto.produto.id_produto} onPress={() => seeProduct(produto.produto)}>
                                    <Text style={styles.qtd}>x{produto.quantidade}</Text>
                                    <TouchableOpacity style={styles.icons} onPress={() => removerProduto(produto.produto.id_produto)}>
                                        <Text >
                                            <MaterialIcons name="clear" size={30} color={"#A00000"} />
                                        </Text>
                                    </TouchableOpacity>
                                    <Image style={styles.imageProduto} source={{
                                        uri: produto.produto.url_img,
                                    }} />
                                    <Text style={styles.produtoTitleText}>{produto.produto.nome}</Text>
                                    <Text style={styles.produtoPriceText}>{numberToReal(produto.produto.preco * produto.quantidade)}</Text>
                                </TouchableOpacity>
                            ))}

                        </View>

                    </View>
                </View>
            </ScrollView>
            <View style={styles.containerHeader}>
                <TouchableOpacity style={styles.buttonsTop2} onPress={() => goToCheckout()}>
                    <Text style={styles.buttonText}>
                        Finalizar Compra
                                </Text>
                    <Text style={styles.total}> {numberToReal(valorTotal)}</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}


const mapStateToProps = state => ({
    user: state.user.user,
    mercado: state.mercado.mercado,
    carrinho: state.carrinho,
    assistant: state.assistant.assistant
});


const mapDispatchToProps = dispatch => bindActionCreators({ ...produtoAction, ...carrinhoAction }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Carrinho);