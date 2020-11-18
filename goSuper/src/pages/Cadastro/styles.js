import { StyleSheet } from 'react-native';
 


export default StyleSheet.create({
  main:{
    flex: 1,
    flexGrow:1,
    backgroundColor: '#A00000',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20 + 20,
    backgroundColor: '#A00000',
    color: "white",
    alignItems: "center"
  },
  logoImage: {
    width: "50%",
  },
  emailInput: {
    width: "100%",
    marginTop:20,
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
    elevation: 1
  },
  buttonContainer: {
    marginTop: 25,
    backgroundColor:'#008000',
    width: 150,
    borderRadius: 18,
    justifyContent: "center",
    height: 40
  },
  buttonText:{
    fontSize: 20,
    color: '#000000',
    textAlign:'center'
  },
text:{
  marginTop:10,
  fontSize:16,
  color:'#fff'
},
title:{
  marginTop: 7,
  fontSize:20,
  color:'#fff',

},
detailsBotton2:{ 
  marginTop:7,
  flexDirection: 'row',
 
  },
  detailsText:{
    color:'#fff',
    paddingHorizontal: 10,
    textDecorationLine:'underline',
    marginRight: 40

  },
  detailsText2:{
    color:'#fff',
    paddingHorizontal: 10,
    textDecorationLine:'underline',
    textAlign:'right'
   
  },
  details:{
    marginTop:5,
    color:'#fff',
    fontSize:10,
    textAlign:'center'
},

});
