import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';


export default function ThankYou ({navigation}){


    return(
        
        <View style={globalStyles.screen}>
            <View style={globalStyles.header}>
                <Text style={globalStyles.headerText}> Thank you for taking the test! </Text>
            </View>
            <View style={globalStyles.container}>
                <View style={styles.card}>
                    <Text style={{color: '#00253e', fontSize: 20, marginBottom:20}}> Your results are: </Text>
                    <Image style={{width:90, height:90}} source={require('../../assets/images/best.png')}/>
                    <Text style={styles.line}>Global response time:</Text>
                    <Text style={styles.result}>{navigation.getParam('globalRT')} ms</Text>
                    <Text style={styles.line}>Congruent trials average response time:</Text>
                    <Text style={styles.result}>{navigation.getParam('congruentRT')} ms</Text>
                    <Text style={styles.line}>Incongruent trials average response time:</Text>
                    <Text style={styles.result}>{navigation.getParam('incongruentRT')} ms</Text>
                    
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
        color: '#00253e',
        textAlign:'center'
    },
    result:{
        fontWeight: '500',
        color: '#1a689c'
    }

})