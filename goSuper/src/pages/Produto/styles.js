import { StyleSheet } from 'react-native';
 


export default StyleSheet.create({
    main: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20 + 20,
        backgroundColor: '#fff',
        color: "white",
        alignItems: "center",
    },
    input: {
        width: 70,
        height: 50,
        backgroundColor: "#eee",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginHorizontal: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 1,
        textAlign: "center"
    },
    produtoTitle: {
        fontSize: 30
    },
    produtoDescription: {
        marginTop: 20,
        marginBottom: 20,
    },
    imageProduto: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        marginBottom: 10
    },
    containerImageProduto: {
        alignItems: "center",
        width: "50%",
    },
    containerPrecoQuantidade: {
        alignItems: "center",
        width: "50%",
    },
    containerProdutoMeio: {
        flexDirection: "row",
        width: "100%"
    },
    containerQuantidade: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",

    },
    buttonsQuantity: {
        fontSize: 40
    },
    precoProduto: {
        fontSize: 28,
        marginVertical: 20
    },
    buttonAddCart: {
        backgroundColor: "#A00000",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "45%"
    },
    buttonAddCartText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 10
    },
    buttonCancel: {
        backgroundColor: "#333",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "45%"
    },
    buttonCancelText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 10
    },
    footerContainer:{
        marginTop: 20,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between"
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor:"rgba(0,0,0,.3)"
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        margin: 10
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      buttonsModal:{
        flexDirection: "row"
      }

});
