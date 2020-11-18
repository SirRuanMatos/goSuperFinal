import React, { useState } from 'react';
import styles from "./styles";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { mask } from 'remask';
import { useNavigation } from '@react-navigation/native';
import api from "../../services/api";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userAction from '../../actions/userAction';
 
//comentario
function Cadastro(props) {

    const navigation = useNavigation();
    const [errorLabel, setErrorLabel] = useState('');

    async function handleSubmit(form) {
        const response = await api.post("/cadastro", form);

        if (response.status == 201) {
            props.setUser(response.data);
            navigation.navigate('Home');
        } else {
            setErrorLabel(response.data.error);
        }

    }

    return (
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Bem vindo ao goSuper</Text>
                    <Text style={styles.title}>Informe os dados abaixo</Text>
                    <Formik
                        initialValues={{ nome: '', sobrenome: '', celular: '', email: '', senha: '' }}
                        onSubmit={values => handleSubmit(values)}
                        validationSchema={yup.object().shape({
                            nome: yup
                                .string()
                                .required("Nome é obrigatório"),
                            sobrenome: yup
                                .string()
                                .required("Sobrenome é obrigatório"),
                            celular: yup
                                .string()
                                .required("Celular é obrigatório")
                                .test('test-celular', "Celular inválido", (value) => {
                                    if (value) {
                                        var RegExPattern = /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/;

                                        if (!value.match(RegExPattern)) {
                                            return false;
                                        }
                                        else
                                            return true
                                    }
                                }),
                            email: yup
                                .string()
                                .email()
                                .required("Email é obrigatório"),
                            senha: yup
                                .string()
                                .min(8, "A senha deve conter no mínimo 8 caracteres")
                                .required("Senha é obrigatório"),
                        })}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, setFieldTouched, touched, isValid, values }) => (
                            <>
                                <Text>{errorLabel}</Text>
                                <TextInput
                                    style={styles.emailInput}
                                    placeholder="Nome*"
                                    placeholderTextColor="#999"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    onChangeText={handleChange('nome')}
                                    onBlur={() => setFieldTouched('nome')}
                                />
                                {touched.nome && errors.nome &&
                                    <Text style={{ fontSize: 10, color: 'white' }}>{errors.nome}</Text>
                                }
                                <TextInput
                                    style={styles.emailInput}
                                    placeholder="Sobrenome*"
                                    placeholderTextColor="#999"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    onChangeText={handleChange('sobrenome')}
                                    onBlur={() => setFieldTouched('sobrenome')}
                                />
                                {touched.sobrenome && errors.sobrenome &&
                                    <Text style={{ fontSize: 10, color: 'white' }}>{errors.sobrenome}</Text>
                                }
                                <TextInput
                                    style={styles.emailInput}
                                    placeholder="Celular"
                                    placeholderTextColor="#999"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    onChangeText={handleChange('celular')}
                                    keyboardType="numeric"
                                    value={mask(values.celular, ['(99) 9999-9999', '(99) 99999-9999'])}
                                    onBlur={() => setFieldTouched('celular')}
                                />
                                {touched.celular && errors.celular &&
                                    <Text style={{ fontSize: 10, color: 'white' }}>{errors.celular}</Text>
                                }
                                <TextInput
                                    style={styles.emailInput}
                                    placeholder="Email*"
                                    placeholderTextColor="#999"
                                    autoCapitalize="words"
                                    autoCorrect={true}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                />
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 10, color: 'white' }}>{errors.email}</Text>
                                }
                                <TextInput
                                    style={styles.emailInput}
                                    placeholder="Senha*"
                                    placeholderTextColor="#999"
                                    autoCapitalize="words"
                                    autoCorrect={false}
                                    onChangeText={handleChange('senha')}
                                    secureTextEntry={true}
                                    onBlur={() => setFieldTouched('senha')}
                                />
                                {touched.senha && errors.senha &&
                                    <Text style={{ fontSize: 10, color: 'white' }}>{errors.senha}</Text>
                                }
                                <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Cadastrar-se</Text>
                                </TouchableOpacity>
                            </>

                        )}
                    </Formik>

                    <Text style={styles.text}>* Campos Obrigatórios</Text>
                    <TouchableOpacity onPress={()=> {}} style={styles.detailsBotton2}>
                            <Text style={[styles.detailsText,{marginTop:18}]}>Termos de uso</Text>
                            <Text style={[styles.detailsText2,{marginTop:18}]}>Política de Privacidade</Text>
                        </TouchableOpacity>
                    <TouchableOpacity style={styles.details}>
                        <Text style={styles.details}>2020 GoSuper| Versão 1.0</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}


const mapDispatchToProps = dispatch => bindActionCreators(userAction, dispatch);
export default connect(null, mapDispatchToProps)(Cadastro);