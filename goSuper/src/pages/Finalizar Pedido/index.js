import React, { useState, useEffect } from 'react';
import styles from "./styles";
import { View, Image, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Modal } from 'react-native';
import api from "../../services/api";
import {Picker} from '@react-native-community/picker';
import Header from "../../components/header";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as produtoAction from '../../actions/produtoAction';
import * as carrinhoAction from '../../actions/carrinhoAction';
import { bindActionCreators } from 'redux';

import { connect, useSelector } from 'react-redux';
import StepIndicator from 'react-native-step-indicator';

import { Formik } from 'formik';
import * as yup from 'yup';
import { mask } from 'remask';

import axios from "axios";

import Record from "../../components/Record";


import {
    assistantFinalizarPedidoOpened,
    assistantCepLoaded, 
    assistantResumoCompraView, 
    assistantCupomInvalid, 
    assistantCupomAdded, 
    assistantPaymentView, 
    assistantInformCep, 
    assistantInformNumber, 
    assistantInformDeliveryMethod,
    assistantInformCardNumber,
    assistantInformExpireDate,
    assistantInformCVV,
    assistantErrorCloseOrder
} from "../../services/assistant";

function Finalizar_Pedido(props) {

    const labels = ["Entrega", "Resumo da compra", "Forma de pagamento"];
    const navigation = useNavigation();
    const [currentPosition, setCurrentPosition] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [frete, setFrete] = useState(10);
    const [servico, setServico] = useState(2.45);
    const [endereco, setEndereco] = useState({ cep: "", rua: "", bairro: "", numero: "", complemento: "", cidade: "", estado: "" });

    const [desconto, setDesconto] = useState(0);
    const [cupomText, setCupomText] = useState("");
    const [cupomErro, setCupomErro] = useState("");
    const [cupomMessage, setCupomMessage] = useState("");
    const [cupomAdicionado, setCupomAdicionado] = useState("");

    const [pagamento, setPagamento] = useState({ number: "", exp_month: "", exp_year: "", cvc: "" });

    const [modalVisible, setModalVisible] = useState(false);
    const [errorLabel, setErrorLabel] = useState('');

    const stepsCustomization = {
        stepIndicatorSize: 50,
        currentStepIndicatorSize: 60,
        separatorStrokeWidth: 4,
        currentStepStrokeWidth: 6,
        stepStrokeCurrentColor: '#A00000',
        stepStrokeWidth: 6,
        stepStrokeFinishedColor: '#A00000',
        stepStrokeUnFinishedColor: '#aaaaaa',
        separatorFinishedColor: '#A00000',
        separatorUnFinishedColor: '#aaaaaa',
        stepIndicatorFinishedColor: '#A00000',
        stepIndicatorUnFinishedColor: '#ffffff',
        stepIndicatorCurrentColor: '#ffffff',
        stepIndicatorLabelFontSize: 26,
        currentStepIndicatorLabelFontSize: 26,
        stepIndicatorLabelCurrentColor: '#A00000',
        stepIndicatorLabelFinishedColor: '#ffffff',
        stepIndicatorLabelUnFinishedColor: '#aaaaaa',
        labelColor: '#999999',
        labelSize: 13,
        currentStepLabelColor: '#A00000',
    }

    useEffect(() => {
        if (!props.user)
            navigation.navigate('Login');

        setPagamento({ number: "", exp_month: "", exp_year: "", cvc: "" });
        setCurrentPosition(0);
        let value = 0;
        props.carrinho.map(produtoCart => {
            value += parseInt(produtoCart.quantidade) * produtoCart.produto.preco;
        });

        setValorTotal(value);
        assistantFinalizarPedidoOpened();

    }, []);

    useEffect(() => {
        console.log("Finalizar pedido: ",props.assistant);
        //, assistantInformNumber, assistantInformDeliveryMethod
        if (props.assistant && props.assistant.action === "nextTabResume") {
            if(props.assistant.variables){
                fillAddressAssistant(props.assistant.variables.cep, props.assistant.variables.numero)
            }
        }
        if (props.assistant && props.assistant.action === "informCep") {
            assistantInformCep()
        }
        if (props.assistant && props.assistant.action === "deliveryChoose") {
            assistantInformDeliveryMethod()
        }
        if (props.assistant && props.assistant.action === "informNumber") {
            assistantInformNumber()
        }
        if (props.assistant && props.assistant.action === "nextTabPayment") {
            setCurrentPosition(2);
            assistantPaymentView();
        }
        if (props.assistant && props.assistant.action === "informCardNumber") {
            assistantInformCardNumber();
        }
        if (props.assistant && props.assistant.action === "informExpireDate") {
            assistantInformExpireDate();
        }
        if (props.assistant && props.assistant.action === "informCvv") {
            assistantInformCVV();
        }
        if (props.assistant && props.assistant.action === "finishOrder") {
            let tempForm = {
                cvc: props.assistant.variables.cvv,
                exp_month: props.assistant.variables.dataCartao.split("-")[1],
                exp_year: props.assistant.variables.dataCartao.split("-")[0],
                number: props.assistant.variables.numeroCartao,
            }
            handlePagamento(tempForm);
        }


    }, [props.assistant]);

    function numberToReal(numero) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }

    function onStepPress(position) {
        setCurrentPosition(position);
    };

    function changeIcon(position) {
        /* if (position.stepStatus == "current") { */
        if (position.position == 0) {
            return <MaterialIcons name="local-shipping" size={30} color={position.stepStatus === "current" ? "#A00000" : "#aaaaaa"} />;

        }
        if (position.position == 1) {
            return <MaterialIcons name="list" size={30} color={position.stepStatus === "current" ? "#A00000" : "#aaaaaa"} />;
        }
        else {
            return <MaterialIcons name="payment" size={30} color={position.stepStatus === "current" ? "#A00000" : "#aaaaaa"} />;

        }
        /* } */

    }

    function handleEndereco(form) {
        setEndereco(form);
        setCurrentPosition(1);
        assistantResumoCompraView(props.carrinho, valorTotal, frete, servico, desconto);
    }

    async function handlePagamento(form) {
        setModalVisible(true);
        form.number = form.number.replace(/\s+/g, '');

        let payload = {
            pagamento: form,
            endereco: endereco,
            carrinho: props.carrinho,
            usuario: props.user,
            coupon: cupomAdicionado
        }

        
        const respPagamento = await api.post("/pagamento", payload, {
            headers: {
                authorization: "Bearer " + props.user.token
            }
        });
        if (respPagamento.status == 200) {
            setModalVisible(false)
            navigateToPedido();
        } else {
            console.log(respPagamento.data);
            setErrorLabel("Erro dados inválidos");
            assistantErrorCloseOrder();
            setModalVisible(false)
        }
    }
    async function fillAddressAssistant(cep, number) {

        setModalVisible(true)
        let url = "https://viacep.com.br/ws/" + cep.replace(/([^\d])+/gim, '') + "/json/";

        axios.get(url).then(function (response) {
            // use a resposta 
            let payload = response.data;
            var end = { cep: cep, rua: payload.logradouro, bairro: payload.bairro, numero: number, complemento: payload.complemento, cidade: payload.localidade, estado: payload.uf }
            assistantCepLoaded(response.data);
            handleEndereco(end);
        }).then(function (r) {
            setModalVisible(false)
        }).catch(function (e) {
            console.log(e);
            assistantErrorCloseOrder();
            setModalVisible(false)
        });
    }

    async function fillAddress(values, handleChange) {

        setModalVisible(true)
        let url = "https://viacep.com.br/ws/" + values.cep.replace(/([^\d])+/gim, '') + "/json/";

        axios.get(url).then(function (response) {
            // use a resposta 
            let payload = response.data;
            // { cep: "", rua: "", bairro: "", numero: "", complemento: "", cidade: "", estado: "" })
            values.rua = payload.logradouro;
            values.cidade = payload.localidade;
            values.bairro = payload.bairro;
            values.complemento = payload.complemento;
            values.estado = payload.uf;
            handleChange('rua');
            handleChange('cidade');
            handleChange('bairro');
            handleChange('complemento');
            handleChange('estado');
            assistantCepLoaded(response.data);
        }).then(function (r) {
            setModalVisible(false)
        }).catch(function (e) {
            console.log(e);
            setModalVisible(false)
        });



    }

    async function checkCoupon() {
        const respCupom = await api.post("/promocao/verificar", { coupon: cupomText }, {
            headers: {
                authorization: "Bearer " + props.user.token
            }
        });
        if (respCupom.status == 200) {
            setDesconto(0.05 * valorTotal);
            setCupomAdicionado(cupomText);
            setCupomText("");
            setCupomMessage("Cupom Adicionado com sucesso!");
            assistantCupomAdded((0.05 * valorTotal));
            setTimeout(() => {
                setCupomMessage("");
            }, 5000);
        } else {
            setCupomErro("Cupom inválido!");
            assistantCupomInvalid();
            setTimeout(() => {
                setCupomErro("");
            }, 5000);
        }
    }

    async function navigateToPedido() {
        await props.limparCarrinho();
        navigation.navigate('Pedido_Final');
    }

    return (
        <View style={styles.main}>
            <ScrollView>
                <View style={styles.container}>
                <Record/>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <ActivityIndicator size="large" color="#A00000" />
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.containerPage}>

                        <View style={styles.custom}>
                            <StepIndicator
                                customStyles={stepsCustomization}
                                currentPosition={currentPosition}
                                labels={labels}
                                onPress={onStepPress}
                                stepCount={3}
                                renderStepIndicator={changeIcon}
                            />
                        </View>
                        <View>

                            <View style={styles.custom2, { display: currentPosition == 0 ? "flex" : "none" }} >


                                <View style={styles.containerEntrega}>
                                    <MaterialIcons style={styles.entrega} name="event" size={110} color={"#fff"} />
                                    <MaterialIcons style={styles.entrega} name="local-shipping" size={110} color={"#fff"} />
                                </View>
                                <View style={styles.containerEntrega}>
                                    <Text style={styles.entregaTitle}>Entrega Agendada</Text>
                                    <Text style={styles.entregaTitle}>Entrega Imediata</Text>
                                </View>

                                <Text style={styles.title}>Entrega Em:</Text>
                                <Formik
                                    initialValues={{ cep: endereco.cep, rua: endereco.rua, bairro: endereco.bairro, numero: endereco.numero, complemento: endereco.complemento, cidade: endereco.cidade, estado: endereco.estado }}
                                    onSubmit={values => handleEndereco(values)}
                                    validationSchema={yup.object().shape({
                                        cep: yup
                                            .string()
                                            .required("CEP é obrigatório"),
                                        rua: yup
                                            .string()
                                            .required("Rua é obrigatório"),
                                        bairro: yup
                                            .string()
                                            .required("Bairro é obrigatório"),
                                        numero: yup
                                            .string()
                                            .required("Número é obrigatório"),
                                        estado: yup
                                            .string()
                                            .required("Estado é obrigatório"),

                                    })}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, errors, setFieldTouched, touched, isValid, values }) => (
                                        <>
                                            <Text>{errorLabel}</Text>
                                            <View style={styles.containerHeader}>
                                                <TextInput
                                                    style={styles.botons1}
                                                    placeholder="CEP"
                                                    placeholderTextColor="#999"
                                                    onChangeText={handleChange('cep')}
                                                    onBlur={() => { setFieldTouched('cep'); }}
                                                    value={mask(values.cep, ['99999-999'])}
                                                    keyboardType="numeric"
                                                    selectedValue={values.cep}
                                                    onEndEditing={() => fillAddress(values, handleChange)}
                                                />

                                                < View style={styles.state}>
                                                    <Picker

                                                        prompt={'Select language'}
                                                        selectedValue={values.estado}
                                                        onValueChange={(itemValue, itemIndex) => {
                                                            handleChange('estado')(itemValue);
                                                        }}
                                                        onBlur={() => setFieldTouched('estado')}
                                                    >

                                                        <Picker.Item value="AC" label="Acre" />
                                                        <Picker.Item value="AL" label="Alagoas" />
                                                        <Picker.Item value="AP" label="Amapá" />
                                                        <Picker.Item value="AM" label="Amazonas" />
                                                        <Picker.Item value="BA" label="Bahia" />
                                                        <Picker.Item value="CE" label="Ceará" />
                                                        <Picker.Item value="DF" label="Distrito Federal" />
                                                        <Picker.Item value="ES" label="Espírito" Santo />
                                                        <Picker.Item value="GO" label="Goiás" />
                                                        <Picker.Item value="MA" label="Maranhão" />
                                                        <Picker.Item value="MT" label="Mato Grosso" />
                                                        <Picker.Item value="MS" label="Mato Grosso do Sul" />
                                                        <Picker.Item value="MG" label="Minas Gerais" />
                                                        <Picker.Item value="PA" label="Pará" />
                                                        <Picker.Item value="PB" label="Paraíba" />
                                                        <Picker.Item value="PR" label="Paraná" />
                                                        <Picker.Item value="PE" label="Pernambuco" />
                                                        <Picker.Item value="PI" label="Piauí" />
                                                        <Picker.Item value="RJ" label="Rio de Janeiro" />
                                                        <Picker.Item value="RN" label="Rio Grande do Norte" />
                                                        <Picker.Item value="RS" label="Rio Grande do Sul" />
                                                        <Picker.Item value="RO" label="Rondônia" Rondônia />
                                                        <Picker.Item value="RR" label="Roraima" />
                                                        <Picker.Item value="SC" label="Santa Catarina" />
                                                        <Picker.Item value="SP" label="São Paulo" />
                                                        <Picker.Item value="SE" label="Sergipe" />
                                                        <Picker.Item value="TO" label="Tocantins" />

                                                    </Picker>
                                                </View>
                                            </View>
                                            {touched.cep && errors.cep &&
                                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.cep}</Text>
                                            }

                                            <TextInput
                                                style={styles.botonsRua}
                                                placeholder="Rua"
                                                placeholderTextColor="#999"
                                                autoCapitalize="words"
                                                autoCorrect={true}
                                                onChangeText={handleChange('rua')}
                                                onBlur={() => setFieldTouched('rua')}
                                                selectedValue={values.rua}
                                                value={values.rua}
                                            />
                                            {touched.rua && errors.rua &&
                                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.rua}</Text>
                                            }
                                            <View style={styles.containerHeader}>
                                                <TextInput
                                                    style={styles.buttonsNumb}
                                                    placeholder="N°"
                                                    placeholderTextColor="#999"
                                                    keyboardType="numeric"
                                                    onChangeText={handleChange('numero')}
                                                    onBlur={() => setFieldTouched('numero')}
                                                    selectedValue={values.numero}
                                                    value={values.numero}
                                                />

                                                <TextInput
                                                    style={styles.botons}
                                                    placeholder="Bairro"
                                                    placeholderTextColor="#999"
                                                    autoCapitalize="words"
                                                    autoCorrect={false}
                                                    onChangeText={handleChange('bairro')}
                                                    onBlur={() => setFieldTouched('bairro')}
                                                    selectedValue={values.bairro}
                                                    value={values.bairro}
                                                />
                                            </View>

                                            <View style={styles.error}>
                                                {touched.bairro && errors.bairro &&
                                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.bairro}</Text>
                                                }
                                                {touched.numero && errors.numero &&
                                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.numero}</Text>
                                                }
                                            </View>


                                            <View style={styles.containerHeader}>
                                                <TextInput
                                                    style={styles.city}
                                                    placeholder="Cidade"
                                                    placeholderTextColor="#999"
                                                    autoCapitalize="words"
                                                    autoCorrect={false}
                                                    onChangeText={handleChange('cidade')}
                                                    onBlur={() => setFieldTouched('cidade')}
                                                    selectedValue={values.cidade}
                                                    value={values.cidade}
                                                />


                                                <TextInput
                                                    style={styles.compl}
                                                    placeholder="Complemento"
                                                    placeholderTextColor="#999"
                                                    autoCapitalize="words"
                                                    onChangeText={handleChange('complemento')}
                                                    onBlur={() => setFieldTouched('complemento')}
                                                    selectedValue={values.complemento}
                                                    value={values.complemento}
                                                />
                                            </View>
                                            {touched.cidade && errors.cidade &&
                                                <Text style={{ fontSize: 10, color: 'red' }}>{errors.cidade}</Text>
                                            }



                                            <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
                                                <Text style={styles.buttonText}>Salvar</Text>
                                            </TouchableOpacity>
                                        </>

                                    )}
                                </Formik>
                            </View>
                            <View style={{ display: currentPosition == 1 ? "flex" : "none" }}>
                                <Text style={styles.resumo}>Resumo da Compra</Text>

                                <View >

                                    {props.carrinho.map(produto => (
                                        <View key={produto.produto.id_produto}>
                                            <Text style={styles.prod}>{produto.quantidade} X  - {produto.produto.nome} - {numberToReal(produto.produto.preco * produto.quantidade)}</Text>

                                        </View>
                                    ))}
                                    <Text style={{ fontWeight: "bold", marginTop: 30 }}>Tem cupom?</Text>
                                    <View style={styles.containerCupom}>
                                        <TextInput
                                            style={styles.cupomInput}
                                            placeholder="Adicionar Cupom"
                                            placeholderTextColor="#999"
                                            autoCapitalize="words"
                                            autoCorrect={true}
                                            inlineImageLeft='ic_menu_black_24dp'
                                            value={cupomText}
                                            onChangeText={setCupomText}
                                        />
                                        <TouchableOpacity onPress={() => { checkCoupon() }} style={styles.buttonContainerCoupom}>
                                            <Text style={styles.buttonText}>Adicionar cupom</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: "bold", color: "#ad283c", marginTop: 10 }}>{cupomErro}</Text>
                                        <Text style={{ fontWeight: "bold", color: "#32a852", marginTop: 10 }}>{cupomMessage}</Text>
                                    </View>
                                    <View style={styles.containerResume}>
                                        <Text style={styles.resume}><Text style={{ fontWeight: "bold" }}>Subtotal:</Text> {numberToReal(valorTotal)}</Text>
                                        <Text style={styles.resume}><Text style={{ fontWeight: "bold" }}>Serviço:</Text> {numberToReal(servico)}</Text>
                                        <Text style={styles.resume}><Text style={{ fontWeight: "bold" }}>Frete:</Text> {numberToReal(frete)}</Text>
                                        <Text style={styles.resume}><Text style={{ fontWeight: "bold" }}>Desconto:</Text> {numberToReal(desconto)}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.contTotal} onPress={() => { setCurrentPosition(2); assistantPaymentView() }}>
                                        <Text style={styles.totalTitle}> Total do Pedido {numberToReal((valorTotal + servico + frete) - desconto)}</Text>
                                        <MaterialIcons name="forward" size={20} color={"#fff"} />
                                    </TouchableOpacity>
                                </View>


                            </View>

                            <View style={{ ...styles.custom2, display: currentPosition == 2 ? "flex" : "none" }}>
                                <View style={styles.containerTotal}>

                                    <Text style={styles.titlePg} >Total do Pedido</Text>
                                    <Text style={styles.total}> {numberToReal((valorTotal + servico + frete) - desconto)}</Text>


                                    <Text style={styles.titlePg}>Forma de Pagamento</Text>



                                    <Picker
                                        style={styles.condPg}
                                        prompt={'Select language'}

                                        onValueChange={(itemValue, itemIndex) => {
                                            handleChange('pagamento');
                                        }}
                                        onBlur={() => setFieldTouched('pagamento')}>


                                        <Picker.Item value="CC" label="Crédito" />
                                        <Picker.Item value="CD" label="Débito" />
                                    </Picker>

                                </View>



                                <Formik
                                    initialValues={{ number: pagamento.number, exp_month: pagamento.exp_month, exp_year: pagamento.exp_year, cvc: pagamento.cvc }}
                                    onSubmit={values => handlePagamento(values)}
                                    validationSchema={yup.object().shape({
                                        number: yup
                                            .string()
                                            .required(" *Número do cartão obrigatório"),
                                        exp_month: yup
                                            .string()
                                            .required(" *Mês de expiração do cartão é obrigatório"),
                                        exp_year: yup
                                            .string()
                                            .required(" *Ano de expiração do cartão é obrigatório"),
                                        cvc: yup
                                            .string()
                                            .required(" *Código de segurança do cartão é obrigatório"),

                                    })}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, errors, setFieldTouched, touched, isValid, values }) => (
                                        <>
                                            <View style={styles.containerpg}>
                                                <Text>{errorLabel}</Text>
                                                <Text style={styles.titleCard}>Número do cartão:</Text>
                                                <TextInput

                                                    style={styles.emailInputCard}
                                                    placeholder=" Número do cartão"
                                                    placeholderTextColor="#999"
                                                    onChangeText={handleChange('number')}
                                                    onBlur={() => setFieldTouched('number')}
                                                    value={mask(values.number, ['9999 9999 9999 9999'])}
                                                    keyboardType="numeric"
                                                    selectedValue={values.number}
                                                />
                                                {touched.number && errors.number &&
                                                    <Text style={styles.errors}>{errors.number}</Text>
                                                }
                                                <View style={styles.titleCard2}>
                                                    <Text style={styles.titleCard2}>Vencimento:</Text>
                                                    <Text style={styles.titleCard2}>CVV:</Text>
                                                </View>
                                                <View style={styles.pg}>


                                                    <TextInput
                                                        style={styles.emailInput}
                                                        placeholder=" MM"
                                                        placeholderTextColor="#999"
                                                        onChangeText={handleChange('exp_month')}
                                                        onBlur={() => setFieldTouched('exp_month')}
                                                        value={mask(values.exp_month, ['99'])}
                                                        keyboardType="numeric"
                                                        selectedValue={values.exp_month}
                                                    />

                                                    <TextInput
                                                        style={styles.emailInputYear}
                                                        placeholder=" AAAA"
                                                        placeholderTextColor="#999"
                                                        onChangeText={handleChange('exp_year')}
                                                        onBlur={() => setFieldTouched('exp_year')}
                                                        value={mask(values.exp_year, ['9999'])}
                                                        keyboardType="numeric"
                                                        selectedValue={values.exp_year}
                                                    />

                                                    <TextInput
                                                        style={styles.emailInput}
                                                        placeholder=" CVV"
                                                        placeholderTextColor="#999"
                                                        onChangeText={handleChange('cvc')}
                                                        onBlur={() => setFieldTouched('cvc')}
                                                        value={mask(values.cvc, ['999'])}
                                                        keyboardType="numeric"
                                                        selectedValue={values.cvc}
                                                    />

                                                </View>
                                                {touched.exp_year && errors.exp_year &&
                                                    <Text style={styles.errors}>{errors.exp_year}</Text>
                                                }
                                                {touched.exp_month && errors.exp_month &&
                                                    <Text style={styles.errors}>{errors.exp_month}</Text>
                                                }
                                                {touched.cvc && errors.cvc &&
                                                    <Text style={styles.errors}>{errors.cvc}</Text>
                                                }

                                            </View>

                                            <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainerpg}>
                                                <Text style={styles.buttonText}>Confirmar Pagamento</Text>
                                            </TouchableOpacity>
                                        </>

                                    )}
                                </Formik>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View >
    );
}


const mapStateToProps = state => ({
    user: state.user.user,
    mercado: state.mercado.mercado,
    carrinho: state.carrinho,
    assistant: state.assistant.assistant
});


const mapDispatchToProps = dispatch => bindActionCreators({ ...produtoAction, ...carrinhoAction }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Finalizar_Pedido);