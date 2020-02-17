import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
    },
    headerText:{
        fontSize: 20,
        color: '#17547d'
    },

    lightText: {
        color: '#17547d'
    },

    darkText: {
        color: '#00253e'
    },

    button: {
        backgroundColor:'#27bbd9',
        margin: 7
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    }

})