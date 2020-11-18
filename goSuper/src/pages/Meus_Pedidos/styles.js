import { StyleSheet } from 'react-native';
 


export default StyleSheet.create({
  main: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#A00000',
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 20 + 20,
    backgroundColor: '#A00000',
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
  buttonContainer: {
    marginTop: 50,
    backgroundColor: '#fff',
    width: 100,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },
  buttonsTop: {
    backgroundColor: "#A00000",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft:10
  },
  imageMercado: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 10
  },
  containerMercado: {
    padding: 24,
    borderRadius: 30,
    backgroundColor: '#fff',
    marginTop: 20,
    width: "100%"
  },
  mercadoTitulo: {
    fontSize: 20
  },
  mercadoRow: {
    flexDirection: "row",

  },
  mercadoCol: {
    flex: 1,
    flexDirection: "column"

  },
  mercadoText: {
    flexDirection: "row",
    flexWrap: 'wrap',
    marginBottom: 10

  },
  mercadoTextProperty: {
    fontWeight: "bold",


  },
  mercadoTextProperty2: {
    fontWeight: "bold",
    marginLeft: 20

  },
  mercadoTextProperty3: {
    
  },
  star: {
    flexDirection: "row",
  },
  favorite: {
    flexDirection: "row",
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
    maxHeight: 400,
    minHeight: 400,
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
