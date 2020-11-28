import React, { useState, useEffect, useRef } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, RefreshControl, Modal } from 'react-native';
import api from "../../services/api";
import Header from "../../components/header";
import Mensagem from "../../components/Mensagem";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as chatAction from '../../actions/chatAction';

import * as carrinhoAction from '../../actions/carrinhoAction';

import { useNavigation } from '@react-navigation/native';

import { bindActionCreators, createStore } from 'redux';

import chatReducer from "../../reducers/chatReducer";

import { connect } from 'react-redux';


import { sendMessage, arriveMessage } from '../../services/socket';
import { assistantMyOrdersOpen, assistantReadOrders, assistantReadOrder, assistantChatOpened, assistantChatInformations, assistantReadMessages } from '../../services/assistant';

function Home(props) {
    const navigation = useNavigation();
    const [pedidos, setPedidos] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [pedidoChat, setPedidoChat] = useState({});
    const [mensagem, setMensagem] = useState("");
    const [mensagensChat, setMensagensChat] = useState([]);
    const scrollViewRef = useRef();
    const store = createStore(chatReducer)

    const wait = (timeout) => {
        return new Promise(resolve => {
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        loadPedidos();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    useEffect(() => {
        navigation.addListener('focus', () => {
            onLoad()
        });
        navigation.addListener('blur', () => {
            setModalVisible(false)
        });
    }, []);

    useEffect(() => {
        console.log("Meus pedidos: ", props.assistant);
        if (props.assistant && props.assistant.action === "remakeOrder") {
            refazerPedido(props.assistant.variables.id_pedido)
        }
        if (props.assistant && props.assistant.action === "readOrders") {
            assistantReadOrders(props.assistant.variables.quantitiy)
        }
        if (props.assistant && props.assistant.action === "readOrder") {
            assistantReadOrder(props.assistant.variables.id_pedido)
        }
        if (props.assistant && props.assistant.action === "openChat") {
            openChatAssistant(props.assistant.variables.id_pedido)
        }
        if (props.assistant && props.assistant.action === "readMesages") {
            readMessages(props.assistant.variables.quantitiy)
        }

    }, [props.assistant]);

    useEffect(() => {
        let x = pedidoChat && props.chat.filter(msg => {
            return msg.id_pedido == pedidoChat.id_pedido;
        });
        setMensagensChat(x);
    }, [props.chat]);


    async function onLoad() {
        if (!props.user)
            navigation.navigate('Login');
        loadPedidos();

    }
    async function loadPedidos() {
        const respPedidos = await api.get("/pedido/cliente/" + props.user.id_usuario, {
            headers: {
                authorization: "Bearer " + props.user.token
            }
        });
        if (respPedidos.status == 200) {
            setPedidos(respPedidos.data);
            assistantMyOrdersOpen(respPedidos.data);
        }
    }

    async function openChatAssistant(id_pedido) {
        var pedido = pedidos.filter(e => {
            return e.id_pedido == id_pedido;
        });

        if (pedido.length > 0) {
            openChat(pedido[0]);
        }

    }

    async function handleButton(pedido) {
        if (pedido.status == "Entregue") {
            refazerPedido(pedido.id_pedido);
        }
        if (pedido.status == "Entrega em andamento") {
            openChat(pedido);
        }
    }

    async function refazerPedido(idPedido) {
        await props.limparCarrinho();

        const getCart = await api.post("/pedido/refazer/", { "id_pedido": idPedido }, {
            headers: {
                authorization: "Bearer " + props.user.token
            }
        });
        if (getCart.status == 200) {
            await props.setCarrinho(getCart.data);
            navigation.navigate('Finalizar_Pedido');
        }

    }

    async function readMessages(qtd) {
    
        assistantReadMessages(mensagensChat, qtd);
    }
    async function openChat(pedido) {
        
        setModalVisible(!modalVisible);
        setPedidoChat(pedido);
        let x = props.chat.filter(msg => {
            return msg.id_pedido == pedido.id_pedido;
        });
        setMensagensChat(x);
        assistantChatInformations(pedido, x);
    }

    async function enviarMensagem() {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let payload = {
            mensagem: mensagem,
            id_pedido: pedidoChat.id_pedido,
            id_entregador: pedidoChat.id_entregador,
            id_usuario: props.user.id_usuario,
            time: h + ":" + m
        };

        let stringedPayload = JSON.stringify(payload);
        sendMessage(stringedPayload);
        props.addMessage(payload);
        setMensagem("");
    }

    return (
        <View style={styles.main}>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                <View style={styles.container}>
                <Header style={styles.container} />
                <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.modalViewHeader}>
                                    <Text style={styles.modalViewHeaderText}>{pedidoChat?.nome + " " + pedidoChat?.sobrenome}</Text>
                                    <TouchableOpacity onPress={() => { setModalVisible(!modalVisible) }} >
                                        <MaterialIcons name="clear" size={25} color={"#fff"} />

                                    </TouchableOpacity>
                                </View>
                                <View style={styles.modalViewBody}>
                                    <ScrollView style={styles.modalViewBodyScrollView} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                                        {mensagensChat?.map((msg, i) => (
                                            <Mensagem key={"pedido" + msg.id_pedido + i} mensagem={msg.mensagem} time={msg.time} typeMessage={msg.typeMessage} />

                                        ))}
                                    </ScrollView>
                                </View>
                                <View style={styles.modalViewFooter}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mensagem..."
                                        placeholderTextColor="#999"
                                        autoCapitalize="words"
                                        autoCorrect={true}
                                        inlineImageLeft='ic_menu_black_24dp'
                                        value={mensagem}
                                        onChangeText={setMensagem}
                                        returnKeyType="send"
                                        onSubmitEditing={() => { enviarMensagem() }}
                                    />
                                    <TouchableOpacity onPress={() => { enviarMensagem() }} >
                                        <MaterialIcons name="send" size={35} color={"#555"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    
                   
                    {pedidos.map(pedido => (
                        <View style={styles.containerMercado} key={pedido.id_pedido}>
                            <View style={styles.containerMercadoTextos}>
                                <Text style={styles.mercadoTitulo}>Pedido N°{pedido.id_pedido}</Text>
                                <View style={styles.mercadoRow}>
                                    <View style={styles.mercadoCol}>
                                        <View style={styles.mercadoText}>
                                            <Text style={styles.mercadoTextProperty}>Data: </Text>
                                            <Text> {new Date(pedido.data_pedido).toLocaleDateString('pt-BR')}</Text>
                                        </View>
                                        <View style={styles.mercadoText}>
                                            <Text style={styles.mercadoTextProperty}>Fornecedor: </Text>
                                            <Text>{pedido.mercadonome}</Text>
                                        </View>

                                    </View>
                                    <View style={styles.mercadoCol}>
                                        <View style={styles.mercadoText}>
                                            <Text style={styles.mercadoTextProperty2}>Status: </Text>
                                            <Text style={styles.mercadoTextProperty3}>{pedido.status}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.mercadoRow}>
                                    <View style={styles.mercadoCol}>
                                        <View style={styles.mercadoText}>
                                            <TouchableOpacity onPress={handleButton.bind(this, pedido)} style={{ ...styles.buttonsTop, backgroundColor: pedido.status == "Confirmado" ? "#fff" : pedido.status == "Pronto para entrega" || pedido.status == "Entrega em andamento" ? "#00003C" : "#002E00" }}>
                                                <MaterialIcons name={pedido.status == "Confirmado" ? "label-important" : pedido.status == "Pronto para entrega" || pedido.status == "Entrega em andamento" ? "chat" : "autorenew"} size={25} color={pedido.status == "Confirmado" ? "#000" : "#fff"} />
                                                <Text style={{ ...styles.buttonText, color: pedido.status == "Confirmado" ? "#000" : "#fff" }}>
                                                    {pedido.status == "Confirmado" ? " Aguardando confirmação do supermercado" : pedido.status == "Pronto para entrega" || pedido.status == "Entrega em andamento" ? "Conversar com o entregador" : "Refazer pedido"}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>
                    ))}
                </View>
            </ScrollView>

        </View>
    );
}


const mapStateToProps = state => ({
    user: state.user.user,
    mercado: state.mercado,
    carrinho: state.carrinho,
    chat: state.chat,
    assistant: state.assistant.assistant
});

const mapDispatchToProps = dispatch => bindActionCreators({...chatAction,...carrinhoAction}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);