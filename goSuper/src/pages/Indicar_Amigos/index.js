import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, Share, ScrollView, Clipboard, TouchableHighlight } from 'react-native';
import api from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from "../../components/header";

import * as carrinhoAction from '../../actions/carrinhoAction';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';


import compartilhe from '../../assets/compartilhar.png';

function Indicar_Amigos(props) {

    const navigation = useNavigation();
    const [cupom, setCupom] = useState("");

    useEffect(() => {
        if (!props.user)
            navigation.navigate('Login');

        async function getCoupon() {
            const respCoupom = await api.get("/promocao/" + props.user.id_usuario, {
                headers: {
                    authorization: "Bearer " + props.user.token
                }
            });
            if (respCoupom.status == 200) {
                if (respCoupom.data.length > 0) {
                    setCupom(respCoupom.data[0].cupom);
                }
            }
        }

        getCoupon();
    }, []);

    async function activateCupom() {
        const respCoupom = await api.post("/promocao/", {id_usuario: props.user.id_usuario},{
            headers: {
                authorization: "Bearer " + props.user.token
            }
        });
        if (respCoupom.status == 200) {
            if (respCoupom.data.length > 0) {
                setCupom(respCoupom.data[0].cupom);
            }
        }
    }
    async function compartilhar() {
        try {
            const result = await Share.share({
                message:
                    `Olá, utilize meu código no goSuper para ganhar 5% de descontos em suas compras! \n Código: ${cupom}`,
            });

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <View style={styles.main}>
            <ScrollView style={styles.main}>
                <View style={styles.container1}>
                    <Header style={styles.container} />
                    <Text style={styles.container1Text}>Indique amigos e ganhe descontos em suas compras</Text>
                    <Image source={compartilhe} />
                </View>
                <View>
                    <View style={{ ...styles.container2, display: cupom != "" ? "flex" : "none" }}>
                        <Text>Clique para copiar o código!</Text>
                        <TouchableOpacity style={styles.cupomText} onPress={() => { Clipboard.setString(cupom) }}>
                            <Text style={styles.cupomInnerText}>{cupom}</Text>
                        </TouchableOpacity>
                        <View style={styles.shareButton}>
                            <TouchableOpacity style={styles.buttonAddCart} onPress={() => compartilhar()}>
                                <MaterialIcons name="share" size={30} color={"#fff"} />
                                <Text style={styles.buttonAddCartText}>
                                    Compartilhar
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ ...styles.container2, display: cupom == "" ? "flex" : "none" }}>
                        <TouchableOpacity style={styles.activateCupom} onPress={() => activateCupom()}>
                            <Text style={styles.activateCupomText}>Clique para ativar seu cupom!</Text>
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
    carrinho: state.carrinho
});


const mapDispatchToProps = dispatch => bindActionCreators(carrinhoAction, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Indicar_Amigos);