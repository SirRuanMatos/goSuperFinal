import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        marginBottom: 15,
    },
    messageText:{
        
        paddingVertical:10,
        paddingLeft:10,
        paddingRight:20,
        borderRadius: 20,
        maxWidth: 220,
    },
    messageTime:{
        textAlign: "right",
        marginRight: 10,
        fontSize: 12,
        marginTop: 5
    },
    image:{
        resizeMode: "contain",
        width: 40,
        marginLeft: 10
    }
});
