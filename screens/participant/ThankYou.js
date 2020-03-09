import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';


export default function ThankYou ({navigation}){




    return(
        <View style={globalStyles.container}>
            <View>
                <Text> Thank you for taking the test! </Text>
                <Text> Your results are: </Text>
                <Text> Global response time: {navigation.getParam('globalRT')} ms</Text>
                <Text> Congruent trials average response time: {navigation.getParam('congruentRT')} ms</Text>
                <Text> Incongruent trials average response time: {navigation.getParam('incongruentRT')} ms</Text>
                <Button style={globalStyles.button} onPress={()=>{navigation.navigate('MyStudies')}}>
                    <Text>
                        Back to the main page
                    </Text>
                </Button>
            </View>
            
        </View>
    )
}