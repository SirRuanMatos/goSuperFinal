import React from 'react';
import { Provider } from 'react-redux'
import store from './src/store';
import {YellowBox} from "react-native";
import 'react-native-gesture-handler';

import Routes from "./src/routes";

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);
YellowBox.ignoreWarnings(['Possible Unhandled Promise Rejection']);

export default function App() {
  return (
    <Provider store={store}>
      <Routes/>
    </Provider>
  );
}