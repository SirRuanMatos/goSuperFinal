import { StyleSheet } from 'react-native';
 


export default StyleSheet.create({
    main: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
        height: "100%"
    },
    container2: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20 + 20,
        backgroundColor: '#fff',
        color: "white",
        alignItems: "center",
        height: "100%"
    },
    container1: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20 + 20,
        backgroundColor: '#A00000',
        color: "white",
        alignItems: "center",
        height: 370,
        justifyContent: "space-between"

    },
    container1Text: {
        fontSize: 30,
        textAlign: "center",
        color: "#fff",
        fontWeight: "bold"
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
        fontSize: 25
    },
    shareButton: {
        justifyContent: "space-between",
        width: "80%"
    },
    cupomText: {
        width: "80%",
        backgroundColor: "#7d7879",
        margin: 20,
        padding: 20,
        borderRadius: 30,
        textAlign: "center"
    },
    cupomInnerText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: 20 + 20,
        backgroundColor: '#A00000',
        color: "white",
        alignItems: "center",
    },
    activateCupom:{
        backgroundColor: "#f7ebeb",
        padding: 30,
        borderColor: '#A00000',
        borderWidth: 2,
        borderRadius: 20
    },
    activateCupomText:{
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
    }

});
