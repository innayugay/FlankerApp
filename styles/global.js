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
        flex: 1,
        // backgroundColor:'white'
    },
    containerTop: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: "center",
        flex: 1,
    },
    header: {
        marginTop: 80,
      //   display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        // padding: 5
    },
    headerText:{
        fontSize: 20,
        color: '#17547d',
        textAlign: "center",
        width: 300
    },

    lightText: {
        color: '#17547d'
    },

    darkText: {
        color: '#00253e'
    },

    button: {
        backgroundColor:'#27bbd9',
        margin: 7,
        // maxWidth: 150
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }

})