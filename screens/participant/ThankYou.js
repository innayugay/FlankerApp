import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';


export default function ThankYou ({navigation}){


    return(
        
        <View style={globalStyles.screen}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.headerText}> Thank you for taking the test! </Text>
            </View>
            <View style={globalStyles.insideContainer}>
                <View style={styles.card}>
                    <Text style={{color: '#00253e', fontSize: 20, marginBottom:20}}> Your results are: </Text>
                    <Text style={styles.line}> Global response time: {navigation.getParam('globalRT')} ms</Text>
                    <Text style={styles.line}> Congruent trials average response time: {navigation.getParam('congruentRT')} ms</Text>
                    <Text style={styles.line}> Incongruent trials average response time: {navigation.getParam('incongruentRT')} ms</Text>
                    <Button style={globalStyles.button} onPress={()=>{navigation.navigate('MyStudies')}}>
                        <Text>
                            Back to the main page
                        </Text>
                    </Button>
                </View>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        width: 300,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(177,217,231, 0.6)',
        opacity: 0.87,
        padding: 20,
        borderRadius: 7,
        margin: 20
    },
    line:{
        margin: 10,
        color: '#00253e'
    }

})