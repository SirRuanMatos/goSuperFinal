import React from 'react';
import styles from "./styles";
import {ScrollView,View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import api from "../../services/api";

import { connect } from 'react-redux';

function Termos(props) {
  

    return (
        <ScrollView >  
        <View style={styles.container}>
            <Text style={styles.title}>Termos de uso</Text>
                <Text style={styles.subtitle}>1. Serviços Oferecidos</Text>
                <Text style={styles.text}> <Text style={styles.number}>1.1</Text> Este TERMO se aplica para regular o uso do serviço oferecido pelo GoSuper aos USUÁRIOS, 
                qual seja, possibilitar a escolha, pelos USUÁRIOS, de Supermecados cadastrados e,
                 via on-line, efetivar solicitações para aquisição (e entrega em domicílio) de gêneros alimentícios fornecidos pelos SUPERMERCADOS, de acordo com o catálogo
                 disponibilizado, sendo possível, igualmente, aos USUÁRIOS, a efetivação do pagamento do preço dos produtos via on-line.</Text>
            
                <Text style={styles.text}><Text style={styles.number}>1.2</Text> O serviço do GoSuper consiste, portanto, em aproximar, através do nosso aplicativo, os USUÁRIOS e os SUPERMERCADOS cadastrados, 
                     possibilitando que os USUÁRIOS encaminhem, aos SUPERMERCADOS, pedidos de entrega, bem como, 
                     sendo essa a opção dos USUÁRIOS, receber on-line pagamento do preço dos produtos entregues aos USUÁRIOS pelos SUPERMERCADOS.</Text>
            <Text style={styles.subtitle}>2. Cadastro</Text>
            
                <Text style={styles.text}><Text style={styles.number}>2.1</Text> O USUÁRIO, para utilizar os serviços acima descritos, deverá ter capacidade jurídica para atos civis e deverá, 
                                necessariamente, prestar as informações exigidas no CADASTRO, assumindo integralmente a responsabilidade 
                                (inclusive cível e criminal) pela exatidão e veracidade das informações fornecidas no CADASTRO, que poderá ser verificado, a qualquer momento, pelo GoSuper .</Text>
            
                <Text style={styles.text}><Text style={styles.number}>2.2</Text> Efetuado, com sucesso, o CADASTRO, o USUÁRIO terá acesso aos serviços por meio de login e senha, dados esses que se compromete a não divulgar a terceiros, 
                                    ficando sob sua exclusiva responsabilidade qualquer solicitação de serviço que seja feita com o uso de login e senha de sua titularidade.</Text>
            <Text style={styles.subtitle}>3. Obrigações do Usuário</Text>
            
                <Text style={styles.text}><Text style={styles.number}>3.1</Text> Efetuado com sucesso o CADASTRO do USUÁRIO, este se obriga a não divulgar a terceiros login e senha de acesso, nem permitir o uso de tais informações por terceiros, responsabilizando-se pelas consequências do uso de login e senha de sua titularidade. </Text>
           
                <Text style={styles.text}><Text style={styles.number}>3.2</Text> É obrigação do USUÁRIO fornecer informações cadastrais totalmente verídicas e exatas, responsabilizando-se exclusiva e integralmente (em todas as searas jurídicas) por todo o conteúdo por si informado no item CADASTRO, mantendo atualizado e confirmado o endereço para entrega dos produtos encomendados.</Text>
            
                <Text style={styles.text}><Text style={styles.number}>3.3</Text> O USUÁRIO que seja menor de 18 anos de idade está ciente de que não poderá encomendar e adquirir, em qualquer hipótese, produtos alcoólicos, responsabilizando-se pela correta informação de sua idade no item CADASTRO.</Text>
           
                <Text style={styles.text}><Text style={styles.number}>3.4</Text> O USUÁRIO concorda com o uso das informações de avaliações e feedbacks do serviços dos RESTAURANTES e do GoSuper, conforme descrito nos TERMOS DE PRIVACIDADE do iFood.</Text>
            <Text style={styles.subtitle}>4. Obrigações do GoSuper</Text>  
           
                <Text style={styles.text}> <Text style={styles.number}>4.1</Text> Disponibilizar no aplicativo GoSUper espaço virtual que permita ao USUÁRIO devidamente
                     cadastrado efetivar pedidos de compra por meio de voz de produtos anunciados e comercializados
                      pelos SUPERMERCADOS e, também, disponibilizar ao USUÁRIO meios de pagamento do preço dos produtos on-line.</Text>
                     
                <Text><Text style={styles.number}>4.2</Text> Proteger, por meio de armazenamento em servidores ou quaisquer outros meios magnéticos de alta segurança, a confidencialidade de todas as informações e cadastros relativos aos USUÁRIOS, assim como valores atinentes às operações financeiras advindas da operacionalização dos serviços previstos no presente TERMO. Contudo, não responderá pela reparação de prejuízos que possam ser derivados de apreensão e cooptação de dados por parte de terceiros que, rompendo os sistemas de segurança, consigam acessar essas informações.</Text> 
            <Text style={styles.subtitle}>5. Foro de Eleição</Text>
                <Text style={styles.text}><Text style={styles.number}>5.1</Text> As partes elegem como competente para dirimir eventuais controvérsias que venham a surgir da interpretação e do cumprimento do presente TERMO o foro da Comarca do São Paulo - SP.</Text>
        </View>
     </ScrollView >

    );
}



export default(Termos);