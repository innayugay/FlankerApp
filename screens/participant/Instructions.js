import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';
import Swiper from 'react-native-swiper';
console.disableYellowBox = true;


export default function Instructions ({navigation}){
    const [arrs, setArrows] = useState([])
    
    useEffect(()=> {
        var arrowsArr = []
        var db = firebase.firestore()
        db.collection('arrows').get()
        .then(function(theArrows){
            theArrows.forEach((oneSet)=>{
                // arrowsArr.push(oneSet.data())
                setArrows(arrs => [...arrs, oneSet.data()])
                // console.log(arrs, '=-=-=-=-')
            })
        })
    },[])

    const addEntry = () => {
       console.log(navigation.getParam('studyID'))
        var db = firebase.firestore()
        var uid = firebase.auth().currentUser.uid
        var studyID = navigation.getParam('studyID')
    
        db.collection('participants').doc(uid).collection('entries').add({
            studyID: studyID
        })
        .then( function(entryID){
            db.collection('studies').doc(studyID).update({
                entries: firebase.firestore.FieldValue.arrayUnion(entryID.id)
            })
            .then(
                navigation.navigate('FlankerTask', {arrs:arrs, entryID: entryID})
            )
        }
        )

        
    }

    return(

        <View style={globalStyles.screen}>
            <Swiper showsButtons={true}>
                <View style={styles.container}>
                    <Text> Hi!</Text>
                    <Text style={styles.text}> You are about to take a mobile version of the Flanker task. </Text>
                </View>
                <View  style={styles.container}>
                    <Text style={styles.text}> The test you are going to take will measure your cognitive skills. To ensure your best performance, please take it in a quiet place.</Text>
                </View>
                <View  style={styles.container}>
                    <Text style={styles.text}> The rules are simple: you will be presented with five arrows. However, you are only interested in the one at the centre of the screen:</Text>
                    <Image style={{width:210, height:80}} source={require('../../assets/images/arrows.png')}/>
                </View>
                <View  style={styles.container}>
                    <Text style={styles.text}> There will be 2 buttons at the bottom of your screen looking like this: </Text>
                    <Image style={{width:450, height:80}} source={require('../../assets/images/buttons.png')}/>
                    <Text style={styles.text}> Hold your phone with both hands and press either left or right button in response to the direction of your target arrow. </Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.text}> Your goal is to do it as quickly and accurately as you can! Now, press START when you are ready.</Text>
                    <Button style={globalStyles.button} onPress={addEntry}> 
                        <Text> START </Text>
                    </Button>
                </View>
            </Swiper>

        </View>
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
       maxWidth: 220,
       marginVertical:10
   }
})