import { StyleSheet } from 'react-native';
 


export default StyleSheet.create({
  main: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: '#FDF3F2',
  },
  container: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 20 + 20,
    backgroundColor: '#FDF3F2',
    color: "white",
    alignItems: "center",
  },
  title:{
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize:20,
    fontWeight: "bold",
    
  },
  
  Image:{
    marginLeft:50
  },
  name:{
   
    fontSize:25,
    fontWeight: "bold",
    marginTop:10,
    marginLeft:10

  },
  text:{
    
    fontSize:18,
    marginTop:10,
    marginLeft:10

  },
  buttonContainer:{
    backgroundColor: "#A00000",
        alignItems: "center",
        padding: 15,
        borderRadius: 20,
        width: 200,
        marginLeft:10,
        marginTop:70
  },
  buttonText:{
    color:"#fff",
    fontWeight: "bold",
  }
})