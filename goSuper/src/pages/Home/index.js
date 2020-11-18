import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, Modal, TouchableHighlight, ToastAndroid } from 'react-native';
import api from "../../services/api";
import Header from "../../components/header";
import * as mercadoAction from '../../actions/mercadoAction';
import * as chatAction from '../../actions/chatAction';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';

import { assistantMarketFound, welcome, assistantReadMarkets,assistantMarketsLoaded } from "../../services/assistant";

import { connectWebSocket, disconnectWebSocket, arriveMessage, arriveMessageAssistant } from '../../services/socket';
import { useFocusEffect } from '@react-navigation/native';


function Home(props) {
    const ctx = this;
    const navigation = useNavigation();
    const [pesquisa, setPesquisa] = useState("");
    const [mercados, setMercados] = useState([]);
    const [avaliationVote, setAvaliationVote] = useState(0);
    const [avaliationInfos, setAvaliationInfos] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => {
            onLoad()
        });
        function addMsg(msg) {
            props.addMessage({ ...JSON.parse(msg), typeMessage: "recebido" })
        }
        arriveMessage(addMsg)
        connectWebSocket(props.user.id_usuario);
    }, []);

    async function onLoad() {
        if (!props.user)
            navigation.navigate('Login');

        async function loadMercados() {
            const respMercados = await api.get("/mercado", {
                headers: {
                    authorization: "Bearer " + props.user.token
                }
            });
            if (respMercados.status == 200) {
                setMercados(respMercados.data);
                assistantMarketsLoaded(respMercados.data.length, respMercados.data);
            }
        }

        async function avaliationChecker() {
            const respAvaliations = await api.get("/avaliacao/checker/" + props.user.id_usuario, {
                headers: {
                    authorization: "Bearer " + props.user.token
                }
            });
            if (respAvaliations.status == 200) {
                if (respAvaliations.data.length > 0) {
                    setAvaliationInfos(respAvaliations.data[0]);
                    setModalVisible(!modalVisible);
                }
            }
        }

        avaliationChecker();
        loadMercados();
        

        

    }

    useEffect(() => {
        console.log("Home: ", props.assistant);
        if (props.assistant && props.assistant.action === "search&choose") {
            searchAndChoose(props.assistant.variables.mercado)
        }
        if (props.assistant && props.assistant.action === "openCart") {
            navigation.navigate('Carrinho');
        }
        if (props.assistant && props.assistant.action === "openMyOrders") {
            navigation.navigate('Meus_Pedidos');
        }
        if (props.assistant && props.assistant.action === "openHome") {
            navigation.navigate('Home');
        }
        if (props.assistant && props.assistant.action === "openMarket") {
            openMarket(props.assistant.variables.market)
        }
        if (props.assistant && props.assistant.action === "readMarkets") {
            assistantReadMarkets(props.assistant.variables.quantitiy);
        }
        if (props.assistant && props.assistant.action === "back") {
            navigation.goBack();

        }

    }, [props.assistant]);

    async function openMarket(nomeMercado) {
        var mercado = mercados.filter(e => {
            return e.nome.toUpperCase().includes(nomeMercado.toUpperCase());
        });

        if (mercado.length > 0) {
            goToMercado(mercado[0]);
        }

    }

    function goToMercado(mercado) {
        props.setMercado(mercado);
        navigation.navigate('Mercado');
    }

    function vote(vote) {
        setAvaliationVote(vote);
    }

    async function searchAndChoose(mercado) {
        setPesquisa(mercado);
        await pesquisar(mercado);
    }

    async function pesquisar(fromAssistant) {

        if (pesquisa != "" || typeof (fromAssistant) == "string") {
            var respMercados;
            if (typeof (fromAssistant) == "string") {
                respMercados = await api.get("/mercado/pesquisar?search=" + fromAssistant, {
                    headers: {
                        authorization: "Bearer " + props.user.token
                    }
                });
            }
            else {
                respMercados = await api.get("/mercado/pesquisar?search=" + pesquisa, {
                    headers: {
                        authorization: "Bearer " + props.user.token
                    }
                });

            }
            if (respMercados.status == 200) {
                setMercados(respMercados.data);
                if (fromAssistant) {
                    goToMercado(respMercados.data[0]);
                }
            }
        } else {
            const respMercados = await api.get("/mercado", {
                headers: {
                    authorization: "Bearer " + props.user.token
                }
            });
            if (respMercados.status == 200) {
                setMercados(respMercados.data);
                assistantMarketsLoaded(respMercados.data.length, respMercados.data);
            }
        }
    }


    async function fazerAvaliacao() {
        let body = {
            avaliacao: avaliationVote,
            cod_mercado: avaliationInfos.cod_mercado,
            cod_usuario: avaliationInfos.cod_usuario,
            cod_pedido: avaliationInfos.id_pedido
        }
        const respAvaliacao = await api.post("/avaliacao/vote", body, {
            headers: {
                authorization: "Bearer " + props.user.token
            }
        });
        setModalVisible(!modalVisible);
    }

    async function cancelarAvaliacao() {
        let body = {
            cod_pedido: avaliationInfos.id_pedido
        }
        const respAvaliacao = await api.post("/avaliacao/cancel", body, {
            headers: {
                authorization: "Bearer " + props.user.token
            }
        });
        setModalVisible(!modalVisible);
    }


    return (
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>{props.user.nome}, vimos que você recebeu sua entrega!</Text>
                                <Text style={styles.modalText}>Gostaria de avaliá-la?</Text>
                                <View style={styles.viewStars}>
                                    <TouchableOpacity onPress={() => vote(1)}>
                                        <MaterialIcons name={avaliationVote > 0 ? "star" : "star-border"} size={60} color={"#FFD700"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => vote(2)}>
                                        <MaterialIcons name={avaliationVote > 1 ? "star" : "star-border"} size={60} color={"#FFD700"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => vote(3)}>
                                        <MaterialIcons name={avaliationVote > 2 ? "star" : "star-border"} size={60} color={"#FFD700"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => vote(4)}>
                                        <MaterialIcons name={avaliationVote > 3 ? "star" : "star-border"} size={60} color={"#FFD700"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => vote(5)}>
                                        <MaterialIcons name={avaliationVote > 4 ? "star" : "star-border"} size={60} color={"#FFD700"} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonsModal}>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "#555" }}
                                        onPress={() => {
                                            cancelarAvaliacao();
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Cancelar</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton }}
                                        onPress={() => {
                                            fazerAvaliacao();
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Avaliar</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Header style={styles.container} />
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
                    />

                    {mercados.map(mercado => (
                        <TouchableOpacity style={styles.containerMercado} key={mercado.id_mercado} onPress={() => { goToMercado(mercado) }}>
                            <Image style={styles.imageMercado} source={{
                                uri: mercado.url_imagem,
                            }} />
                            <View style={styles.containerMercadoTextos}>
                                <Text style={styles.mercadoTitulo}>{mercado.nome}</Text>
                                <View style={styles.mercadoRow}>
                                    <View style={styles.mercadoCol}>
                                        <View style={styles.mercadoText}>
                                            <Text style={styles.mercadoTextProperty}>Bairro: </Text>
                                            <Text>{mercado.bairro}</Text>
                                        </View>

                                    </View>
                                    <View style={styles.mercadoCol}>
                                        <View style={styles.mercadoText}>
                                            <Text style={styles.mercadoTextProperty2}>Cidade: </Text>
                                            <Text>{mercado.cidade}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.mercadoRow}>
                                    <View style={styles.mercadoCol}>
                                        <View style={styles.mercadoText}>
                                            {mercado.avaliacao &&
                                                <>
                                                    <Text style={styles.mercadoTextProperty}>Avaliação:</Text>
                                                    <View style={styles.star}>
                                                        <MaterialIcons name={mercado.avaliacao > 1 ? "star" : mercado.avaliacao > 0.5 ? "star-half" : "star-border"} size={20} color={"#FFD700"} />
                                                        <MaterialIcons name={mercado.avaliacao > 2 ? "star" : mercado.avaliacao > 1.5 ? "star-half" : "star-border"} size={20} color={"#FFD700"} />
                                                        <MaterialIcons name={mercado.avaliacao > 3 ? "star" : mercado.avaliacao > 2.5 ? "star-half" : "star-border"} size={20} color={"#FFD700"} />
                                                        <MaterialIcons name={mercado.avaliacao > 4 ? "star" : mercado.avaliacao > 3.5 ? "star-half" : "star-border"} size={20} color={"#FFD700"} />
                                                        <MaterialIcons name={mercado.avaliacao >= 5 ? "star" : mercado.avaliacao > 4.5 ? "star-half" : "star-border"} size={20} color={"#FFD700"} />
                                                    </View>
                                                </>}
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}


const mapStateToProps = state => ({
    user: state.user.user,
    mercado: state.mercado,
    assistant: state.assistant.assistant
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...mercadoAction, ...chatAction }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Home);