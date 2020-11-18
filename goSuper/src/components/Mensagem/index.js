import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, Modal, TouchableHighlight } from 'react-native';


import entregador_icone from '../../assets/entregador_icone.png';

function Mensagem(props) {

    return (
        <View style={{...styles.container, justifyContent: props.typeMessage === "recebido"?"flex-end":"flex-start"}}>
            <View style={styles.message}>
                <Text style={{...styles.messageText, backgroundColor: props.typeMessage === "recebido"?"#FDACAB":"#75fff4"}}>{props.mensagem}</Text>
                <Text style={styles.messageTime}>{props.time}</Text>
            </View>
            {props.typeMessage === "recebido"&&<Image source={entregador_icone} style={styles.image} />}
            
        </View>

    );
}


export default Mensagem;