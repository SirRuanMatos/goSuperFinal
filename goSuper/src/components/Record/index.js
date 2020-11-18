import React, { useState, useEffect, useRef } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, Modal, TouchableHighlight } from 'react-native';
import Voice from '@react-native-community/voice';

import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { assistantCepRepeat, assistantActivated, assistantCardNumberRepeat, assistantCvvRepeat, getPedidoAberto, toggleAssistantVoice } from "../../services/assistant";

import * as controlAssistantAction from '../../actions/controlAssistantAction';
import { bindActionCreators, createStore } from 'redux';
import { connect } from 'react-redux';
import * as chatAction from '../../actions/chatAction';

import chatReducer from "../../reducers/chatReducer";
import { useStore } from 'react-redux'

/* import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system'; */

import { sendMessageAssistant, sendMessage } from '../../services/socket';

import axios from 'axios'
//import { Audio, Permissions, FileSystem } from 'expo';


function Record(props) {

  const navigation = useNavigation();
  const store = useStore()
  const [control, setControl] = useState(false);
  const [modalAssistant, setModalAssistant] = useState(true);
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler.bind(this);
    Voice.onSpeechRecognized = onSpeechRecognized;
    /* 
        setInterval(() => {
          checkRecognition()
        }, 1000); */
  }, []);

  useEffect(() => {

    if (props.assistant && props.assistant.action === "openChat") {
      setModalAssistant(false);
      setTimeout(() => {
        setModalAssistant(true);
      }, 100);
    }
    if (props.assistant && props.assistant.action === "desactivateAssistant") {
      props.toggleAssistant(false);
    }

  }, [props.assistant]);
  useEffect(() => {

    setModalAssistant(props.controlAssistant);
    toggleAssistantVoice(props.controlAssistant);
   
  }, [props.controlAssistant]);

  function onSpeechRecognized(params) {
    //console.log("Entrei onSpeechStart:", params);
  }
  function onSpeechStartHandler(params) {
    //console.log("Entrei onSpeechStart:", params);
  }
  async function onSpeechEndHandler(params) {
    //console.log("Entrei onSpeechEndHandler:", params);
    /* 
        setTimeout(() => {
          onStartButtonPress()
        }, 1000); */
  }
  async function onSpeechResultsHandler(params, e) {
    console.log("Entrei onSpeechResultsHandler:", params);
    var msg = params.value[0];
    var assistant = store.getState().assistant.assistant;
    if (assistant) {
      if (assistant.action == 'closeOrder') {

        let num = msg.replace(/[^0-9]/g, '');
        let num2 = 0;
        let num3 = 0;
        if (params.value.length > 1) {
          num2 = params.value[1].replace(/[^0-9]/g, '');
        }
        if (params.value.length > 2) {
          num3 = params.value[2].replace(/[^0-9]/g, '');
        }

        if (num.toString().length == 8) {
          console.log("num1", num.toString());
          enviarMensagem(num.toString())
          return
        }
        else if (num2.toString().length == 8) {
          console.log("num2", num2.toString());
          enviarMensagem(num2.toString())
        }
        else if (num3.toString().length == 8) {
          console.log("num3", num3.toString());
          enviarMensagem(num3.toString())
        }
        else {
          console.log("Repeat");
          assistantCepRepeat();
        }
      } else if (assistant.action == 'informCardNumber') {
        let num = msg.replace(/[^0-9]/g, '');
        let num2 = params.value[1].replace(/[^0-9]/g, '');
        if (num.toString().length == 16) {
          enviarMensagem(num)
        }
        else if (num2.toString().length == 16) {
          enviarMensagem(num2)
        }
        else {
          console.log("Repeat");
          assistantCardNumberRepeat();
        }
      } else if (assistant.action == 'informCvv') {
        let num = msg.replace(/[^0-9]/g, '');
        let num2 = params.value[1].replace(/[^0-9]/g, '');
        if (num.toString().length == 3) {
          enviarMensagem(num)
        }
        else if (num2.toString().length == 3) {
          enviarMensagem(num2)
        }
        else {
          console.log("Repeat");
          assistantCvvRepeat();
          //assistantCepRepeat();
        }
      }
      else {
        console.log("Else close order");
        enviarMensagem(msg)
      }
    } else {
      enviarMensagem(msg)

    }
    //onStartButtonPress()
    /* setTimeout(() => {
      onStartButtonPress()
    }, 1000); */
  }

  async function onStartButtonPress(e) {
    await Voice.start('pt-BR', {
      RECOGNIZER_ENGINE: 'GOOGLE', EXTRA_PARTIAL_RESULTS: true,
      EXTRA_SPEECH_INPUT_POSSIBLY_COMPLETE_SILENCE_LENGTH_MILLIS: 30000,
      EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 30000,
      EXTRA_SPEECH_INPUT_COMPLETE_SILENCE_LENGTH_MILLIS: 30000
    });
  }

  async function onStopButtonPress(e) {
    Voice.stop();
  }

  async function checkRecognition() {
    await Voice.isRecognizing().then(result => {
      if (result != 1) {
        console.log(result);
        onStartButtonPress();
      } else {
        return true
      }
    })
  }

  async function enviarMensagem(msg) {

    if (msg.toLowerCase().includes("enviar mensagem")) {
      let realMesage = msg.toLowerCase().split("enviar mensagem")[1];
      let pedido = getPedidoAberto();

      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let payload = {
        mensagem: realMesage,
        id_pedido: pedido.id_pedido,
        id_entregador: pedido.id_entregador,
        id_usuario: props.user.id_usuario,
        time: h + ":" + m
      };
      let stringedPayload = JSON.stringify(payload);
      sendMessage(stringedPayload);
      props.addMessage(payload);

    } else {
      let today = new Date();
      let h = today.getHours();
      let m = today.getMinutes();
      let payload = {
        mensagem: msg,
        id_usuario: props.user.id_usuario,
        time: h + ":" + m
      };
      console.log(msg);
      let stringedPayload = JSON.stringify(payload);
      sendMessageAssistant(stringedPayload);
    }


  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <Modal animationType="slide"
            transparent={true}
            visible={modalAssistant}
            style={styles.modalContainer}>
            <TouchableOpacity onPress={() => { onStartButtonPress() }} style={styles.modalView}>
              <View >
                <TouchableOpacity  style={{justifyContent: "center", alignContent:"center",textAlign: "center", display:"flex"}} onPress={() => { onStartButtonPress() }} >
                  <MaterialIcons style={{justifyContent: "center", alignContent:"center",textAlign: "center", display:"flex"}} name="mic" size={70} color={"#fff"} />
                  <Text style={{
                    color: "#fff", fontWeight: "bold", fontSize: 15, textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: { width: -1, height: 1 },
                    textShadowRadius: 10
                  }}>Pressione a tela e fale algum comando! </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </>
  );
}

const mapStateToProps = state => ({
  assistant: state.assistant.assistant,
  user: state.user.user,
  controlAssistant: state.controlAssistant.controlAssistant
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...chatAction, ...controlAssistantAction }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Record);