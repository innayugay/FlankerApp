import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    screen: {
        backgroundColor: 'white',
        flex:1,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        // flex: 1,
        backgroundColor:'white',
        margin: 15
    },
    insideContainer: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: "center",
        // flex: 1,
        margin: 40,
        width: 300
    },
    containerTop: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: "center",
        flex: 1,
    },
    header: {
        // marginTop: 70,
      //   display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        // padding: 5
    },


    // texts
    headerText:{
        marginTop: 70,
        fontSize: 24,
        color: '#17547d',
        textAlign: "center",
        width: 300
    },

    lightText: {
        color: '#17547d'
    },
    regularText:{
        color: '#17547d',
    },
    darkText: {
        color: '#00253e'
    },


    //buttons
    button: {
        backgroundColor:'#27bbd9',
        margin: 7,
        width: 'auto',
        fontFamily: 'Arial'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },
    roundButton: {
        backgroundColor:'#66bc6b',
        width: 45,
        borderRadius: 45,
        marginLeft: 180
    },



    dividerLine: {
        borderColor: '#9fa7cc',
        borderWidth: 4,
        width:1000,
        marginTop: 10
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#d4d7d9',
        borderRadius: 4,
        borderWidth: 1,
        color: 'black',
        height: 40,
        fontSize: 15,
        marginTop: 8,
        marginBottom: 20
    },
    inputTitle: {
        fontFamily: 'Arial',
        color: '#17547d',
        fontSize: 17,
    },


})