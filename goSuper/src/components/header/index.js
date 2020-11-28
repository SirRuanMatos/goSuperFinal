import React, { useState, useEffect, useRef } from 'react';
import styles from "./styles";
import { View, Switch, Image, Text, TouchableOpacity, TextInput, ScrollView, Modal, TouchableHighlight } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as controlAssistantAction from '../../actions/controlAssistantAction';

import Mensagem from "../Mensagem";

import { assistantReadMarkets, assistantReadProducts, assistantReadProductDescription, assistantReadCart, assistantReadOrders, assistantReadOrder, assistantActivated } from "../../services/assistant";

import { sendMessageAssistant } from '../../services/socket';

import Record from "../Record";

function Menu(props) {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [modalAssistantVisible, setModalAssistantVisible] = useState(false);
    const [mensagensChat, setMensagensChat] = useState([]);

    const scrollViewRef = useRef();
    const [mensagem, setMensagem] = useState("");

    function abrirCarrinho() {

        navigation.navigate('Carrinho');
    }
    function abrirMenu() {

        setModalVisible(!modalVisible)
    }
    function goTo(page) {

        navigation.navigate(page);
        setModalVisible(!modalVisible);
    }

    async function enviarMensagem() {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let payload = {
            mensagem: mensagem,
            id_usuario: props.user.id_usuario,
            time: h + ":" + m
        };

        let stringedPayload = JSON.stringify(payload);
        setMensagensChat([...mensagensChat, payload])
        //sendMessage(stringedPayload);
        //props.addMessage(payload);
        sendMessageAssistant(stringedPayload);
        //assistantActions();
        setMensagem("");
    }


    return (
        <>
            <View style={styles.container}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity onPress={abrirMenu} style={{ ...styles.menuButtons, backgroundColor: props.btBgCollors ? props.btBgCollors : "#fff" }}>
                        <MaterialIcons name="reorder" size={30} color={props.btIcCollors ? props.btIcCollors : "#A00000"} />
                    </TouchableOpacity>
                    <View style={styles.assistantOptionContainer}>
                        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 15 }}>Assistente de voz</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#8ff2a9" }}
                                    thumbColor={props.controlAssistant ? "#05f544" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => { props.toggleAssistant(true); }}
                                    value={props.controlAssistant}
                                    style={{ transform: [{ scaleX: 2.3 }, { scaleY: 2.3 }], marginTop: 15, left: -80 }} />
                    </View>
                    <TouchableOpacity onPress={abrirCarrinho} style={{ ...styles.menuButtons, backgroundColor: props.btBgCollors ? props.btBgCollors : "#fff" }}>
                        <MaterialIcons name="shopping-cart" size={30} color={props.btIcCollors ? props.btIcCollors : "#A00000"} />
                    </TouchableOpacity>
                </View>
            </View>
            <Record/>
            <Modal
                animationType="fade"
                transparent={true}
                statusBarTranslucent={true}
                visible={modalVisible}

            >
                <TouchableOpacity style={styles.menuContainerMain} onPressOut={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View style={styles.menuContainerBox}>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { goTo("Home") }}>
                            <MaterialIcons name="home" size={30} color="#555" />
                            <Text style={styles.menuItemText}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { goTo("Meus_Pedidos") }}>
                            <MaterialIcons name="receipt" size={30} color="#555" />
                            <Text style={styles.menuItemText}>Meus Pedidos</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.menuItem} onPress={() => { goTo("Indicar_Amigos") }}>
                            <MaterialIcons name="supervisor-account" size={30} color="#555" />
                            <Text style={styles.menuItemText}>Indicar Amigos</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity >
            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    user: state.user.user,
    mercado: state.mercado,
    controlAssistant: state.controlAssistant.controlAssistant
});
const mapDispatchToProps = dispatch => bindActionCreators(controlAssistantAction, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Menu);