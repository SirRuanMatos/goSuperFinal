import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 20
    },
    menuContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        flexGrow: 1,
    },
    menuButtons: {
        width: 50,
        height: 50,
        borderRadius: 105,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5
    },
    menuContainerMain: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,.3)"
    },
    menuContainerBox: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        width: "70%",
        height: "100%",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    menuItem:{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#555",
        borderBottomWidth: 5,
        paddingBottom: 8,
        paddingTop: 8,
        borderRadius: 8
    },
    menuItemText:{
        fontSize: 26,
        marginLeft: 10,
        
    },
    menuItemAssistant:{
        fontSize: 26,
        marginLeft: 10,
        flexDirection: "column",
        alignItems:"center",
        justifyContent: "center"
    },
    assistantOptionContainer:{
      justifyContent: "center",
      alignContent: "center",
      display:"flex"
    },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor:"rgba(0,0,0,.3)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "85%",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalViewHeader:{
    backgroundColor: "#A00000",
    flexDirection: "row",
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding:10,
    paddingLeft: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  modalViewHeaderText:{
    color: "#fff",
    fontSize: 20
  },
  modalViewBody:{
    width: "100%",
    padding: 20
  },
  modalViewBodyScrollView:{
    maxHeight: 200,
    minHeight: 200,
    width: "100%",
  },
  modalViewFooter:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingRight: 20
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#eee",
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
});
