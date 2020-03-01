import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper';


export default function Instructions ({navigation}){


    return(

        // <View style={styles.container}>
        //     <Text> Hi!</Text>
        //     <Text> You are about to take a mobile version of the Flanker task </Text>
        // </View>
        <Swiper showsButtons={true}>
            <View style={styles.container}>
                <Text style={styles.text}> Hi!</Text>
                <Text style={styles.text}> You are about to take a mobile version of the Flanker task </Text>
            </View>
            <View  style={styles.container}>
                <Text style={styles.text}> The test you are going to take will measure your cognitive skills. To ensure your best performance, please take it in a quiet place</Text>
            </View>
            <View  style={styles.container}>
                <Text style={styles.text}> The rules are simple: you will be presented with five arrows. However, you are only interested in the one at the centre of the screen:</Text>
            </View>
            <View  style={styles.container}>
                <Text style={styles.text}> There will be 2 buttons at the bottom of your screen looking like this: </Text>
                {/*  */}
                <Text style={styles.text}> Hold your phone with both hands and press either left or right button in response to the direction of your target arrow </Text>
            </View>
            <View  style={styles.container}>
                <Text style={styles.text}> Your goal is to do it as quickly and accurately as you can! Now, press START when you are ready.</Text>
                <Button style={globalStyles.button}> 
                    <Text> START </Text>
                </Button>
            </View>
        </Swiper>
    )    
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        flex: 1
        // padding: 100
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
      padding: 5
    },
   text: {
       textAlign: 'center',
       maxWidth: 200
   }
})