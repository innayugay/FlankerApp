import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';



export default function Questionnaire ({navigation}) {




    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.headerText}> As the final step, please fill out this short questionnaire: </Text>
            <View style={styles.infoBox}>
                <Text style={styles.infoBoxText}>The information asked is crucial for the research, however all your data will be fully anonymised</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    infoBox: {
        margin: 20,
        padding: 30,
        width: 350,
        backgroundColor: '#9fa7cc',
        borderRadius: 4,

    },
    infoBoxText: {
        color: 'white',
        fontSize: 14,
        textAlign: "center"
    }
})