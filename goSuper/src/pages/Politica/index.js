import React from 'react';
import styles from "./styles";
import { Feather, ScrollView,View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import api from "../../services/api";

import { connect } from 'react-redux';

function Politica(props) {
  

    return (
        <ScrollView >  
        <View style={styles.container}>
            <Text style={styles.title}>Política de Privacidade</Text>
            <Text style={styles.text}> Nós utilizamos os seus dados como parte da nossa missão de proporcionar um 
                serviço cada vez melhor. Essa política descreve como obtemos, armazenamos,
                 utilizamos e compartilhamos as suas informações.</Text>
                 <Text style={styles.text}>A proteção dos seus dados e da 
                 sua privacidade são muito importantes para o GoSuper. Portanto, recomendamos que você
                 conheça melhor as nossas práticas e, em caso de dúvidas, entre em contato conosco.
                 Você consente, de forma livre e expressa, que seus dados e informações sejam coletados,
                 armazenados, tratados e compartilhados, conforme as regras dispostas nesta Política de Privacidade.</Text>
                 <Text style={styles.text}>Ao se cadastrar no GoSuper, o Usuário garante de forma expressa que é plenamente capaz, 
                 nos termos da legislação vigente, para exercer e gozar de todos os Serviços. Ademais, 
                 os Usuários menores de 18 anos deverão obter o consentimento expresso de seus pais, 
                 tutores ou representantes legais para utilizar os Serviços, conforme as disposições 
                 dos Termos e da Política de Privacidade do GoSuper. Os pais, tutores ou representantes 
                 legais serão plenamente responsáveis também no caso de acesso ao GoSuper por parte de
                  crianças e adolescentes, sem a devida obtenção de autorização prévia. Cabe a eles a 
                  integral responsabilidade pela fiscalização das atividades e conduta dos respectivos 
                  menores sob sua tutela, bem como ciência da integralidade dos presentes Termos.</Text>
    
    <Text style={styles.subtitle}>Informações que você nos fornece</Text>
<Text style={styles.text}> Quando você se inscrever para ser um usuário registrado do GoSuper, poderemos obter uma série de 
    informações sobre você, tais como: seu nome, data de nascimento, CPF, endereço eletrônico, 
    endereço de correspondência, senha, número de telefone e preferências de contato.
    Ao fazer o seu pedido pelo iFood, é possível que, a depender do Estabelecimento escolhido, você possa fazer o pagamento diretamente no nosso aplicativo.
    Ao escolher fazer o pagamento direto no nosso Aplicativo, você poderá nos 
    fornecer os seus dados de pagamento, tais como aqueles de cartão de crédito e de meios de pagamento parceiros
    <Text style={styles.text}></Text>Nós usamos esses dados para poder confirmar a sua ordem de pagamento e garantir que não ocorram fraudes por meio dos nossos Serviços.
    Para poder realizar a entrega do seu pedido, nós precisamos que você também nos informe a sua localização ou a localização do local em que gostaria que entregássemos o seu pedido.</Text>

    <Text style={styles.text}>Essa localização pode ser fornecida pelo endereço que você inserir manualmente no aplicativo, ou 
    através da localização obtida do seu dispositivo via GPS e redes móveis (torres de celular, Wi-Fi e outras modalidades de localização) e confirmada por você.

    <Text style={styles.text}></Text>Para fins da lei n° 12.965 de 2014 (Marco Civil da Internet), ou qualquer lei que venha substituí-la, a localização fornecida será considerada como dado cadastral. </Text>
        </View>
     </ScrollView >

    );
}



export default(Politica);