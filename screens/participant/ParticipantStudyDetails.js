import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';



export default function ResearcherStudyDetails({navigation}){


    const addEntry = () => {
        var db = firebase.firestore()
        var uid = firebase.auth().currentUser.uid
        
        // db.collection('participants').doc(uid).collection('entries').set({
        //     studyID: navigation.getParam('studyID'),
        //     numberCorrect: 0,
        //     answers: [],
        // })
        // .then( 
        //     navigation.navigate('Instructions')
        // )

        db.collection('participants').doc(uid).collection('entries').add({
            studyID: navigation.getParam('studyID')
        })
        .then(
            navigation.navigate('Instructions')
        )

        
    }
            // .then( function(subcollection) {
            // if(subcollection.docs.length > 0){
            //     console.log('the participant has some entries')
            //     setStudiesToShow(false)

                
            //     for (var i=0; i < subcollection.docs.length; i++){
            //         console.log('=-=-=-=', subcollection.docs[i].data().studyID, '=-=-=-=-=')
            //         db.collection('studies').doc(subcollection.docs[i].studyID).get()
            //         .then(function(newDoc){
            //             setStudies(studies => [...studies, newDoc.data()])
            //         })
            //     }
    console.log('navigation get param', navigation)
    return (
    <View style={globalStyles.containerTop}>
        <View style={globalStyles.header}> 
            <Text style={globalStyles.headerText}>{navigation.getParam('title')}</Text>
        </View>
        <View style={styles.properties}>
            <View style={{flexDirection: 'row'}}>
                <Text style={globalStyles.lightText}> Study ID: </Text>
                <Text style={globalStyles.darkText}> {navigation.getParam('studyID')}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={globalStyles.lightText}> Aims: </Text>
                <Text style={globalStyles.darkText}> {navigation.getParam('aims')}</Text>
            </View>
            <View  style={{flexDirection: 'row'}}>
                <Text style={globalStyles.lightText}> Description: </Text>
                <Text style={globalStyles.darkText}> {navigation.getParam('description')}</Text>
            </View>
            <View  style={{flexDirection: 'row'}}>
                <Text style={globalStyles.lightText}> Desired participant characteristics: </Text>
                <Text style={globalStyles.darkText}> {navigation.getParam('participant characteristics')}</Text>
            </View>
            <View style={styles.blueBubble}>
                <Text style={globalStyles.darkText}> If everything looks right, you can take the task when you are ready.</Text>
                <Text style={globalStyles.darkText}>Note: you can only take the test once. </Text>
            </View>
        </View>
        <Button style={globalStyles.button} onPress={addEntry}>
            <Text style={globalStyles.buttonText}> Start the test </Text>
        </Button>
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
        margin: 20
    }

})