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
        paddingTop: 20 + 10,
        backgroundColor: '#FDF3F2',
        color: "white",
        
        
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
        width: 370,
        marginBottom: 20,
         
    },
    containerPage:{
        width:"100%",
    },
    containerImageMercado:{
        alignItems: "center",
    },
    buttonsTop: {
        backgroundColor: "#A00000",
        alignItems: "center",
        padding: 10,
        borderRadius: 20,
        width: 180,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonsTop2: {
        backgroundColor: "#A00000",
        alignItems: "center",
        padding: 10,
        width: 370,
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
        width: 150,
        height: 80,
        resizeMode: "contain",
        marginBottom: 10,
    },
    produto: {
        width: "45%",
        backgroundColor: "#fff",
        margin: 5,
        borderRadius: 20,
        padding: 5
    },
    buttonAddCart: {
        backgroundColor: "#F50401",
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
        fontSize: 20,
        textAlign: "center",
        fontWeight:'bold',
        marginBottom: 10,
        marginTop: 10
    },
    total:
    {
        fontSize: 15,
       marginLeft:100,
        color: "white",
    },
    icons:{
        marginLeft:115,
        marginTop:-20,
       
    },
    qtd:{
        fontWeight:'bold',
        fontSize: 15
    }
});
