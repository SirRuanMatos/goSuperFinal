import { combineReducers } from 'redux';
import user from './userReducer';
import mercado from './mercadoReducer';
import produto from './produtoReducer';
import carrinho from './carrinhoReducer';
import chat from './chatReducer';
import assistant from './assistantReducer';
import controlAssistant from './controlAssistantReducer';

export default combineReducers({ user, mercado, produto, carrinho, chat, assistant, controlAssistant });