import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, Modal, TouchableHighlight } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import * as carrinhoAction from '../../actions/carrinhoAction';

import { bindActionCreators } from 'redux';

import { assistantProductOpen, assistantProductAdded, assistantProductEdited } from "../../services/assistant";

import { connect } from 'react-redux';

import Record from '../../components/Record'


function Produto(props) {

    const navigation = useNavigation();
    const [quantidade, setQuantidade] = useState("1");
    const [precoTotal, setPrecoTotal] = useState(0);
    const [isFromCart, setIsFromCart] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (!props.user)
            navigation.navigate('Login');


        setIsFromCart(false);

        props.carrinho.map(produtoCart => {
            if (produtoCart.produto.id_produto == props.produto.id_produto) {
                setIsFromCart(true);
                setQuantidade(produtoCart.quantidade);
            }
        });

        assistantProductOpen(props.produto);

    }, []);
    useEffect(() => {
        let x = numberToReal((quantidade * props.produto.preco));
        setPrecoTotal(x);

    }, [quantidade]);

    useEffect(() => {
        console.log("Produto: ",props.assistant);
        if (props.assistant && props.assistant.action === "addProductToCart") {
            addProduct(props.assistant.variables.quantity);
        }
    }, [props.assistant]);

    function numberToReal(numero) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }

    function substractQuantity() {
        if (parseInt(quantidade) - 1 < 1) {
            return;
        }
        let qtd = (parseInt(quantidade) - 1) + "";
        setQuantidade(qtd);
    }

    function addQuantity() {
        if (parseInt(quantidade) + 1 > props.produto.estoque) {
            return;
        }
        let qtd = (parseInt(quantidade) + 1) + "";
        setQuantidade(qtd);
    }

    function handleCancel() {
        if (isFromCart) {
            navigation.navigate('Carrinho');

        } else {
            navigation.navigate('Mercado');
        }
    }

    function addProduct(qtd) {

        if ((props.carrinho.length > 0) && props.carrinho[0].produto.cod_mercado != props.produto.cod_mercado) {
            setModalVisible(true);
        }
        else {
            var prodCart = {
                produto: props.produto,
                quantidade
            }
            if (typeof(qtd) === "string") {
                prodCart = {
                    produto: props.produto,
                    quantidade: qtd
                } 
            }
            props.addProduct(prodCart);
            setModalVisible(false);
            
            if (isFromCart) {
                assistantProductEdited(prodCart);
                navigation.navigate('Carrinho');
            } else {
                assistantProductAdded(prodCart);
                navigation.navigate('Mercado');
            }
        }
    }

    async function resetCart() {
        await props.limparCarrinho();
        addProduct();
        
    }

    return (
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                    <Record/>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Ooops! Parece que você tem itens de outros supermercados em seu carrinho!</Text>
                                <Text style={styles.modalText}>Deseja removelos?</Text>
                                <View style={styles.buttonsModal}>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "red" }}
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Cancelar</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                        onPress={() => {
                                            resetCart();
                                            setTimeout(() => {
                                                resetCart();
                                            }, 500);
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Esvaziar carrinho e adicionar item</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Text style={styles.produtoTitle}>{props.produto.nome}</Text>
                    <Text style={styles.produtoDescription}>
                        {props.produto.descricao}
                    </Text>
                    <View style={styles.containerProdutoMeio}>
                        <View style={styles.containerImageProduto}>
                            <Image style={styles.imageProduto} source={{
                                uri: props.produto.url_img,
                            }} />
                        </View>
                        <View style={styles.containerPrecoQuantidade}>
                            <View style={styles.containerQuantidade}>
                                <TouchableOpacity style={styles.buttonsQuantity} onPress={() => substractQuantity()}>
                                    <MaterialIcons name="remove" size={40} color={"#333"} />
                                    
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor="#999"
                                    autoCapitalize="words"
                                    value={quantidade}
                                    onChangeText={setQuantidade}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity style={styles.buttonsQuantity} onPress={() => addQuantity()}>
                                    <MaterialIcons name="add" size={40} color={"#333"} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.precoProduto}>
                                    {precoTotal}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.footerContainer}>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => handleCancel()}>
                            <MaterialIcons name="clear" size={20} color={"#fff"} />
                            <Text style={styles.buttonCancelText}>
                                Cancelar
                           </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAddCart} onPress={() => addProduct()}>
                            <MaterialIcons name="shopping-cart" size={20} color={"#fff"} />
                            <Text style={styles.buttonAddCartText}>

                                {isFromCart ? "Atualizar Carrinho" : "Adicionar ao carrinho"}

                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const mapStateToProps = state => ({
    user: state.user.user,
    mercado: state.mercado.mercado,
    produto: state.produto.produto,
    carrinho: state.carrinho,
    assistant: state.assistant.assistant
});


const mapDispatchToProps = dispatch => bindActionCreators(carrinhoAction, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Produto);