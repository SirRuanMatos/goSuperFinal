import React, { useState, useEffect, useCallback } from 'react';
import styles from "./styles";
import { ScrollView, View, Image, Text, TouchableOpacity, TextInput, BackHandler } from 'react-native';
import api from "../../services/api";
import Header from "../../components/header";
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/carrinho.png';
import { useFocusEffect } from '@react-navigation/native';

import { connect, useSelector } from 'react-redux';
import { assistantOrderFinal } from '../../services/assistant';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function Pedido_Final(props) {
    const navigation = useNavigation();


    const [screen, setScreen] = useState(true);

    useEffect(() => {
        if (!props.user)
            navigation.navigate('Login');

        assistantOrderFinal(props.user.nome);

    }, []);

  



    return (
        <ScrollView >
            <View style={styles.container}>
                <Header style={styles.container} btBgCollors="#A00000" btIcCollors="#fff" size={30} />
                <View style={styles.title}>

                    <MaterialIcons name="check" size={30} color={"#008000"} />
                    <Text style={styles.title}>Pedido Enviado</Text>
                </View>
                <View style={styles.containerImage}>
                    <Image style={styles.Image} source={logoImg} />
                    <Text style={styles.name}>{props.user.nome},</Text>
                    <Text style={styles.text}>Seu pedido foi enviado ao Supermercado, agora é só relaxar e aguardar!</Text>


                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => { navigation.navigate('Meus_Pedidos'); }}>
                    <Text style={styles.buttonText}>Acompanhar Pedido</Text>
                </TouchableOpacity>



            </View>

        </ScrollView >

    );

}

const mapStateToProps = state => ({
    user: state.user.user
});


export default connect(mapStateToProps)(Pedido_Final);