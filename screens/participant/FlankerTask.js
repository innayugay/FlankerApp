import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Tab } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';


export default function FlankerTask ({navigation}) {

    // const [currentTrial, setCurrentTrial] = useState()
    var trialSequence = []
    var currentTrial= ''
    const [incongruentRT, setIncongruentRT] = useState()
    const [congruentRT, setCongruentRT] = useState()
    const [arrows, setArrows] = useState('first')

    useEffect(()=>{
        trialSequence = navigation.getParam('arrs')
    },[])


    function renderArrows (){
        // for (var i=0; i<navigation.getParam('arrs').length; i++){
            
        // }
        // trialSequence = navigation.getParam('arrs')
        if (trialSequence.length > 0){
            currentTrial = trialSequence[0]
            console.log(currentTrial, 'heyheyhey')
            if (currentTrial.type === 'congruentRight'){
                // setCurrentTrial('congruentRight')
                // currentTrialType='congruentRight'
                console.log('corrent answer is', currentTrial.correctAnswer)
                setArrows('→   →   →   →   → ')
                // return render = <Text> →   →   →   →   →  </Text>
            }
            else if( currentTrial.type === 'incongruentRight'){
                // setCurrentTrial('incongruentRight')
                // currentTrialType='incongruentRight'
                console.log('corrent answer is', currentTrial.correctAnswer)
                setArrows(' ←   ←   →   ←   ←')
                // return render = <Text> ←    ←    →    ←    ← </Text>
            }
        }
        else{
            setArrows('ok thats it')
        }
        
    }

    function checkResponse(response) {
        if (response === currentTrial.correctAnswer){

            // stop the timer, add it to the total time
            console.log(response + 'you are correct')
            trialSequence.splice(0,1)
            renderArrows()
        }
        else{
            //stop the timer, discard the value
            trialSequence.splice(0,1)
            renderArrows()
            console.log('boooo')

        }
    }

    return(

        <View style={styles.container}>
            <Text style={styles.arrows}>{arrows}</Text>
            {/* <Text> →   →   →   →   →  </Text> */}

            <View style={styles.containerRow}>
                <Button style={styles.button} onPress={()=>checkResponse('left')}> 
                    <Text> L </Text>
                </Button>
                <Button style={styles.button} onPress={()=>checkResponse('right')}>
                    <Text> R </Text>
                </Button>
            </View>
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
    containerRow:{
        // display:'flex',
        // marginTop: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        // height: 10
    },
    button: {
        borderRadius: 150,
        margin: 50
    },
    arrows: {
        color: '#00253e',
        fontSize: 28
    }
})