import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { arriveMessageAssistant } from '../src/services/socket';
import { assistantRepeatCommand } from '../src/services/assistant';


import * as assistantAction from './actions/assistantAction';

const AppStack = createStackNavigator();

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Mercado from './pages/Mercado';
import Produto from './pages/Produto';
import Termos from './pages/Termos';
import Politica from './pages/Politica';
import Carrinho from './pages/Carrinho';
import Finalizar_Pedido from './pages/Finalizar Pedido';
import Pedido_Final from './pages/Pedido Final';
import Meus_Pedidos from './pages/Meus_Pedidos';
import Indicar_Amigos from './pages/Indicar_Amigos';

function Routes(props) {
    useEffect(() => {
        async function resAssistant(msg) {
            try {
                let respLog = JSON.parse(msg)
                props.setAssistantAction(respLog);
                if (respLog == null) {
                    assistantRepeatCommand();
                }
            } catch (error) {
                assistantRepeatCommand();
            }
        }
        arriveMessageAssistant(resAssistant)

    }, []);
    return (
        <NavigationContainer >
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Cadastro" component={Cadastro} />
                <AppStack.Screen name="Mercado" component={Mercado} />
                <AppStack.Screen name="Produto" component={Produto} />
                <AppStack.Screen name="Termos" component={Termos} />
                <AppStack.Screen name="Politica" component={Politica} />
                <AppStack.Screen name="Carrinho" component={Carrinho} />
                <AppStack.Screen name="Finalizar_Pedido" component={Finalizar_Pedido} />
                <AppStack.Screen name="Pedido_Final" component={Pedido_Final} />
                <AppStack.Screen name="Meus_Pedidos" component={Meus_Pedidos} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Indicar_Amigos" component={Indicar_Amigos} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}

const mapStateToProps = state => ({
    assistant: state.assistant.assistant
});
const mapDispatchToProps = dispatch => bindActionCreators(assistantAction, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Routes)