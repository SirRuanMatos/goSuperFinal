import { StyleSheet } from 'react-native';
 


export default StyleSheet.create({
    main: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#FDF3F2',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20 + 20,
        backgroundColor: '#FDF3F2',
        color: "white",

        alignItems: "center",

    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 1,
    },
    imageMercado: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        marginBottom: 10

    },
    containerHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: 340,
        marginBottom: 20
    },
    containerPage: {
        width: "100%",


    },
    containerImageMercado: {
        alignItems: "center",
        marginTop: -30


    },

    buttonsTop: {
        backgroundColor: "#A00000",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
        width: 150,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 20
    },
    containerProdutos: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    imageProduto: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        marginBottom: 5,
    },
    produto: {
        width: "45%",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#fff",
        margin: 5,
        borderRadius: 20,
        padding: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },
    buttonAddCart: {
        backgroundColor: "#A00000",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonAddCartText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 10
    },
    produtoPriceText: {
        fontSize: 30,
        marginBottom: 10,
        marginTop: 10
    },
    produtoBadge:{
        zIndex: 99,
        position: "absolute",
        top: 0,
        right: 0
    },
    containerPromotion:{
        width: "100%",
        justifyContent:"flex-end"
    },
    promotionText:{
        fontSize:16,
        position: "absolute",
        color: "#fff",
        zIndex: 100,
        top: 0,
        right: 0,
        marginRight:16,
        marginTop: 18,
        fontWeight: "bold",
    },
    promotionTextPrice:{
        fontSize:18,
        color: "#444",
        fontWeight: "bold",
        textDecorationLine: "line-through",
        textDecorationStyle: "solid",
        textDecorationColor: "#A00000"
    }
});
