import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Template from "./components/template"

import Login from './pages/Login/Login';
import Home from './pages/Home';
import Produtos from './pages/Produtos';
import Pedidos from './pages/Pedidos';
import Pedidos_Entregadores from './pages/Pedidos_Entregadores';
import Chat_Entregadores from './pages/Chat_Entregadores';
import Chat_Assistant from './pages/Chat_Assistant';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/home" exact render={() => (<Template componente={<Home />} />)} />
                <Route path="/produtos" exact render={() => (<Template componente={<Produtos />} />)} />
                <Route path="/pedidos" exact render={() => (<Template componente={<Pedidos />} />)} />
                <Route path="/pedidos/entregadores" exact render={() => (<Template componente={<Pedidos_Entregadores />} />)} />
                <Route path="/chat/entregadores" exact render={() => (<Template componente={<Chat_Entregadores />} />)} />
                <Route path="/chat/assistant" exact render={() => (<Template componente={<Chat_Assistant />} />)} />
            </Switch>
        </BrowserRouter>
    );
}