import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: 20,
        position: "relative",
        left: "50%",
        top:"3%",
        zIndex: 9999,
        elevation: 999
    },
    menuContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        position: "absolute",
        zIndex: 9999,
        elevation: 999
    },
    modalContainer: {
        zIndex: 9999,
        elevation: 999
    },
    menuButtons: {
        width: 250,
        height: 250,
        borderRadius: 105,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        marginLeft: 5
    },
    menuContainerMain: {
        flex: 1,
        position: "absolute",
        backgroundColor: "rgba(0,0,0,.3)",
        elevation: 1
        
    },
    modalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor:"rgba(0,0,0,.3)"
    }
});
