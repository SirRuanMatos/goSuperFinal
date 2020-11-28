
import React, { useState,useEffect } from 'react';
import styles from "./styles";
import { ScrollView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup'
import api from "../../services/api";
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as userAction from '../../actions/userAction';
import * as controlAssistantAction from '../../actions/controlAssistantAction';

import logoImg from '../../assets/logo.png';

function Login(props) {
    const navigation = useNavigation();
    const [errorLabel, setErrorLabel] = useState('');

    useEffect(() => {
        props.toggleAssistant(false);
        
    }, []);


    async function handleSubmit(form) {
        const response = await api.post("/login", form);
        if (response.status == 401) {
            setErrorLabel(response.data.error);
        }
        if (response.status == 200) {
            props.setUser(response.data);
            navigation.navigate('Home');
        }

    }

    function navigateToRegister() {
        navigation.navigate('Cadastro');
    }
    function navigateToTermos() {
        navigation.navigate('Termos');
    }
    function navigateToPolitica() {
        navigation.navigate('Politica');
    }

    return (
        <View style={styles.main}>
            <ScrollView >
                <View style={styles.container}>
                    <Image source={logoImg} />
                    <Text style={styles.title}> GoSuper </Text>
                    <Formik
                        initialValues={{ email: '', senha: '' }}
                        onSubmit={(values) => handleSubmit(values)}
                        validationSchema={yup.object().shape({
                            email: yup
                                .string()
                                .email("Por favor insira um email válido!")
                                .required("O email é obrigatório"),
                            senha: yup
                                .string()
                                .min(8, "A senha deve ter no mínimo 8 caracteres")
                                .required("A senha é obrigatória"),
                        })}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, setFieldTouched, touched, isValid, values }) => (
                            <>
                                <Text>{errorLabel}</Text>
                                <Text style={styles.login}> Login</Text>
                                <TextInput
                                    style={styles.emailInput}
                                    placeholder="Email"
                                    placeholderTextColor="#999"
                                    autoCorrect={false}
                                    onChangeText={handleChange('email')}
                                    onBlur={() => setFieldTouched('email')}
                                    value={values.email}
                                    autoCompleteType="email"
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    autoCapitalize="none"
                                />
                                {touched.email && errors.email &&
                                    <Text style={{ fontSize: 10, color: 'white' }}>{errors.email}</Text>
                                }
                                 <Text style={styles.login}> Senha</Text>
                                <TextInput
                                    style={styles.emailInput}
                                    placeholder="Senha"
                                    placeholderTextColor="#999"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onChangeText={handleChange('senha')}
                                    onBlur={() => {setFieldTouched('senha');}}
                                    secureTextEntry={true}
                                    value={values.senha}
                                    returnKeyType ="send"
                                    onSubmitEditing={()=> handleSubmit()}
                                />
                                {touched.senha && errors.senha &&
                                    <Text style={{ fontSize: 10, color: 'white' }}>{errors.senha}</Text>
                                }
                                <TouchableOpacity style={styles.detailsBotton}>
                                    <Text onPress={navigateToRegister} style={styles.detailsText}>Esqueci minha senha!</Text>
                                    <Text onPress={navigateToRegister} style={styles.detailsText2}>Cadastre-se</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>Entrar</Text>
                                </TouchableOpacity>
                        
                            </>
                        )}
                    </Formik>
                    <TouchableOpacity style={styles.details}>
                        <Text style={styles.details}>2020 GoSuper| Versão 1.0</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const mapStateToProps = state => ({
    user: state.user.user,
    controlAssistant: state.controlAssistant.controlAssistant
});
const mapDispatchToProps = dispatch => bindActionCreators({...userAction, ...controlAssistantAction}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Login);