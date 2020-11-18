import { StyleSheet, Dimensions } from 'react-native';
 


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
    minHeight:"100%",
    alignItems:'center'
  },
  logoImage: {
    width: "50%",
  },
  emailInput: {
    width: "100%",
    marginTop: 10,
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

  login: {
    fontSize: 20,
    color: '#fff',
    marginRight:250,
    marginTop:15
    
  },
  buttonContainer: {
    marginTop: 35,
    backgroundColor:'#fff',
    width: 100,
    borderRadius: 18,
    justifyContent: "center",
    height: 40,
   
  
    
  },
  buttonText:{
    fontSize: 20,
    color: '#A00000',
    textAlign:'center',
    fontWeight:'bold'
  },
   title:{
     marginTop:30,
    color:'#fff',
    fontSize: 50,
    textAlign:'center'
  
    },
    detailsBotton:{
    marginTop:16,
    flexDirection: 'row',
   
    },
    detailsText:{
      color:'#fff',
      paddingHorizontal: 10,
      textDecorationLine:'underline',
      marginRight: 60
  
    },
    detailsBotton2:{ 
      marginTop:20,
      flexDirection: 'row',
     
      },
   
      detailsText2:{
        color:'#fff',
        paddingHorizontal: 10,
        textDecorationLine:'underline',
        textAlign:'right'
       
      },
  details:{
      marginTop:15,
      color:'#fff',
      fontSize:10,
      textAlign:'center'
  },
  
  });
  


