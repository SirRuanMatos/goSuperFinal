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
  buttonText: {
    fontSize: 20,
    color: '#A00000',
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
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonsModal:{
    flexDirection: "row"
  },
  openButton: {
    backgroundColor: "#A00000",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10
  },
  textStyle:{
    color: "#fff",
    fontSize: 13
  },
  viewStars:{
    flexDirection: "row"
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

  },
  mercadoTextProperty: {
    fontWeight: "bold",


  },
  mercadoTextProperty2: {
    fontWeight: "bold",
    marginLeft: 20

  },
  star: {
    flexDirection: "row",
  },
  favorite: {
    flexDirection: "row",
  }


});
