import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Tab } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';


export default function FlankerTask ({navigation}) {

    // const [currentTrial, setCurrentTrial] = useState()
    // var trialSequence = []
    var currentTrial
    var seconds = 0

    const [isActive, setIsActive] = useState(false)
    const [trialSequence, setTrialSequence] = useState(navigation.getParam('arrs'))
    // const [currentTrial, setCurrentTrial] = useState()
    const [incongruentRT, setIncongruentRT] = useState()
    const [arrows, setArrows] = useState(' ')
    // var trialSequence = navigation.getParam('arrs')

    useEffect(()=>{
        //initiate timer here?
        // setCurrentTrial(trialSequence[0])
        // currentTrial = trialSequence[0]
        renderArrows()
        console.log(trialSequence, '=-=-=-=-=-=-=-=')
        if (isActive){
            console.log('timer gets called!')
            setInterval( () => {
                seconds = seconds + 1
            },1000)
        }
    },[])


    function saveResults(){
        //save the reaction times to the database
    }

    function renderArrows (){

        console.log(trialSequence.length, 'trials left')
        if (trialSequence.length > 0){
            // currentTrial = trialSequence[0]

            // setCurrentTrial(trialSequence[0])
            console.log(currentTrial, 'heyheyhey')
            if (trialSequence[0].type === 'congruentRight'){
                // setCurrentTrial('congruentRight')
                // currentTrialType='congruentRight'
                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('→   →   →   →   → ')
                setIsActive(true)
                // initiate timer here?
            }
            else if (trialSequence[0].type === 'congruentLeft'){
                // setCurrentTrial('congruentRight')
                // currentTrialType='congruentRight'
                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('←   ←    ←    ←    ←')
                setIsActive(true)
                // initiate timer here?
            }
            else if( trialSequence[0].type === 'incongruentRight'){

                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows(' ←   ←   →   ←   ←')
                setIsActive(true)
                // return render = <Text> ←    ←    →    ←    ← </Text>
            }
            else if( trialSequence[0].type === 'incongruentLeft'){

                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('  →    →    ←    →   → ')
                setIsActive(true)
                // return render = <Text> ←    ←    →    ←    ← </Text>
            }
            
        }
        else{
            setArrows('ok thats it')
            // call the saveResults
        }
        
    }

    // function checkResponse(response) {
    //     console.log('your answer is', response)
    //     if (response == currentTrial.correctAnswer){

    //         // stop the timer, add it to the total time
    //         trialSequence.splice(0,1)
    //         console.log(response + 'you are correct and have' + trialSequence.length, 'trials left')
    //         renderArrows()
    //     }
    //     else if (response != currentTrial.correctAnswer) {
    //         //stop the timer, discard the value 
    //         // trialSequence.splice(0,1)
    //         renderArrows()
    //         console.log('wrong!!!!!')

    //     }
    // }

    function checkResponseRight() {
        console.log('your answer is RIGHT')
        // currentTrial = trialSequence[0]

        if (trialSequence[0].correctAnswer === 'right'){

            // stop the timer, add it to the total time
            trialSequence.splice(0,1)
            console.log('you are correct and have' + trialSequence.length, 'trials left')
            renderArrows()
        }
        else if (trialSequence[0].correctAnswer === 'left') {
            //stop the timer, discard the value 
            // trialSequence.splice(0,1)
            renderArrows()
            console.log('wrong it was left!!!!!')

        }
    }

    function checkResponseLeft() {
        console.log('your answer is LEFT')
        if (trialSequence[0].correctAnswer === 'left'){

            // stop the timer, add it to the total time
            trialSequence.splice(0,1)
            console.log('you are correct and have' + trialSequence.length, 'trials left')
            renderArrows()
        }
        else if (trialSequence[0].correctAnswer === 'right') {
            //stop the timer, discard the value 
            // trialSequence.splice(0,1)
            renderArrows()
            console.log('wrong it was right!!!!!')

        }
    }

    return(

        <View style={styles.container}>
            <Text style={styles.arrows}>{arrows}</Text>
            {/* <Text> →   →   →   →   →  </Text> */}

            <View style={styles.containerRow}>
                <Button style={styles.button} onPress={()=>checkResponseLeft()}> 
                    <Text> L </Text>
                </Button>
                <Button style={styles.button} onPress={()=>checkResponseRight()}>
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
        paddingTop: 100,
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