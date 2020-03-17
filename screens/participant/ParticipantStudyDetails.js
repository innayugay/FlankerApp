import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';



export default function ParticipantStudyDetails({navigation}){


    const [alreadyTaken, setAlreadyTaken] = useState(false)

    useEffect(()=>{

        var db = firebase.firestore()
        var uid = firebase.auth().currentUser.uid
        var studyID = navigation.getParam('studyID')
        db.collection('participants').doc(uid).collection('entries').where('studyID', '==', studyID).get()
        .then( (theEntry)=>{
            theEntry.forEach(doc=>{
                console.log(doc.data(), '!!!!!!!')
                setAlreadyTaken(true)
            })

            // console.log(theEntry, 'yyyyyyyyyyyy')
            // if (theEntry.data().exists){
            //     console.log('oh youve already taken the test!!!')
            // }
            // else{
            //     console.log('the user hasnt taken the test yet')
            // }
        })
    

    },[])


    var currentStudyID = navigation.getParam('studyID')
    // console.log('navigation get param', navigation)

    const button = 
        <Button style={globalStyles.button} onPress={ ()=> {navigation.navigate('Instructions', {studyID: currentStudyID}) } }>
            <Text style={globalStyles.buttonText}> Start the test </Text>
        </Button>

    const testTaken = 
        <Text style={styles.testTaken}> You have already taken the test for this study. Thank you! </Text>
    return (
    <View style={globalStyles.screen}>
        <View style={globalStyles.header}> 
            <Text style={globalStyles.headerText}>{navigation.getParam('title')}</Text>
        </View>
        <View style={globalStyles.insideContainer}>
            <View>
                <View style={{flexDirection: 'row', maxWidth: 250,  marginBottom: 8}}>
                    <Text style={globalStyles.lightText}>Study ID: </Text>
                    <Text style={globalStyles.darkText}> {currentStudyID}</Text>
                </View>
                <View style={{flexDirection: 'row', maxWidth: 250,  marginBottom: 8}}>
                    <Text style={globalStyles.lightText}>Aims: </Text>
                    <Text style={globalStyles.darkText}> {navigation.getParam('aims')}</Text>
                </View>
                <View  style={{flexDirection: 'row', maxWidth: 250, marginBottom: 8}}>
                    <Text style={globalStyles.lightText}>Description: </Text>
                    <Text style={globalStyles.darkText}> {navigation.getParam('description')}</Text>
                </View>
                <View  style={{flexDirection: 'row', maxWidth: 250, marginBottom: 8}}>
                    <Text style={globalStyles.lightText}>Desired participant characteristics: </Text>
                    <Text style={globalStyles.darkText}> {navigation.getParam('participant characteristics')}</Text>
                </View>
            </View>
            <View style={styles.blueBubble}>
                <Text style={styles.blueboxText}> If everything looks right, you can take the task when you are ready.</Text>
                <Text style={styles.blueboxText}>Note: you can only take the test once. </Text>
            </View>
            <View style={{width: 145, marginTop:40}}>
                {alreadyTaken? testTaken : button}
            </View>
        </View>

    </View>
    )
}


const styles = StyleSheet.create({
    properties: {
        flexDirection: 'column',
        margin: 30
    },
    blueBubble: {
        width: 300,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b1d9e7',
        opacity: 0.87,
        padding: 20,
        borderRadius: 7,
        marginTop: 20
    },

    testTaken:{
        // width: 200,
        textAlign: "center",
        backgroundColor: '#27bbd9',
        color: 'white',
        padding: 20,
        borderRadius: 10
    },
    blueboxText:{
        color: '#17547d',
        textAlign: 'center',
        margin: 5
    }

})