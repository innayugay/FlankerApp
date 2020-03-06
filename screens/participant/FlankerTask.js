import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Tab } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';


export default function FlankerTask ({navigation}) {

    const [isActive, setIsActive] = useState(false)
    const [trialSequence, setTrialSequence] = useState(navigation.getParam('arrs'))

    const [arrows, setArrows] = useState(' ')
    const [seconds, setSeconds] = useState(0)
    const [isCorrect, setIsCorrect] = useState(true)
    const [totalTime, setTotalTime] = useState([])

    // const countSeconds = () =>{
    //     seconds
    // }

    useEffect(()=>{
        //initiate timer here?
        // setCurrentTrial(trialSequence[0])
        // currentTrial = trialSequence[0]
        console.log('=-=-=-=-=-=-=-=-=-=-=-=')
        renderArrows()

        var timer
        var seconds = 0
        console.log('in useeffect is active???? is', isActive)
        if(isActive){
            timer = setInterval(function(){
                // setSeconds(seconds => seconds + 1)
                seconds = seconds + 1
                console.log(seconds, 'seconds')
            }, 1000)
        }
        // else if (!isActive){
        //     clearInterval(timer)
        //     console.log(timer, 'timer')
        // }
        return ()=> {
            clearInterval(timer)
            console.log(seconds, 'is your seconds')
            setTotalTime(totalTime=>[...totalTime, seconds])
            console.log(totalTime, 'is your total time 0o0o0o0o0o0o0o0o0o0o0o')
            // renderArrows()
        }

    },[isActive, isCorrect])


    function renderArrows (){
        setIsActive(true)
        console.log('in render arrows is active is', isActive)

        console.log(trialSequence.length, 'trials left')
        if (trialSequence.length > 0){
            // currentTrial = trialSequence[0]

            // setCurrentTrial(trialSequence[0])
            console.log('heyheyhey')
            // controlTimer()
            // action = true
            // startTimer()
            // setIsActive(true)
            if (trialSequence[0].type === 'congruentRight'){
                // setCurrentTrial('congruentRight')
                // currentTrialType='congruentRight'
                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('→   →   →   →   → ')
                // setIsActive(true)
                
                // startTimer()
                // initiate timer here?
            }
            else if (trialSequence[0].type === 'congruentLeft'){
                // setCurrentTrial('congruentRight')
                // currentTrialType='congruentRight'
                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('←   ←    ←    ←    ←')
                // setIsActive(true)
                // action = true
                // startTimer()

                // initiate timer here?
            }
            else if( trialSequence[0].type === 'incongruentRight'){

                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows(' ←   ←   →   ←   ←')
                // setIsActive(true)
                // action = true
                // startTimer()

                // return render = <Text> ←    ←    →    ←    ← </Text>
            }
            else if( trialSequence[0].type === 'incongruentLeft'){

                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('  →    →    ←    →   → ')
                // setIsActive(true)
                // action = true
                // startTimer()

                // return render = <Text> ←    ←    →    ←    ← </Text>
            }
            
        }
        else{
            setArrows('Thank you! You have reached the end of the test')
            // call the saveResults
            setIsActive(false)
            var sumOfTotalTime = totalTime.reduce((a, b) => a + b, 0)
            console.log('your total time is', sumOfTotalTime)
            navigation.navigate('Questionnaire', {sumOfTotalTime: sumOfTotalTime})
            
        }
        
    }



    function checkResponseRight() {
        console.log('your answer is RIGHT')
        // action = false
        // startTimer()
        // controlTimer()
        // currentTrial = trialSequence[0]
        // setIsActive(false)

        if (trialSequence[0].correctAnswer === 'right'){

            // stop the timer, add it to the total time
            trialSequence.splice(0,1)
            console.log('you are correct and have' + trialSequence.length, 'trials left')
            // renderArrows()
            setIsActive(false)


        }
        else if (trialSequence[0].correctAnswer === 'left') {
            //stop the timer, discard the value 
            // trialSequence.splice(0,1)
            // renderArrows()
            console.log('wrong it was left!!!!!')
            setIsCorrect(false)


        }
    }

    function checkResponseLeft() {
        console.log('your answer is LEFT')
        // action = false
        // console.log('timer is', timer)
        // startTimer()
        // controlTimer()
        // setIsActive(false)
        if (trialSequence[0].correctAnswer === 'left'){

            // stop the timer, add it to the total time
            trialSequence.splice(0,1)

            console.log('you are correct and have' + trialSequence.length, 'trials left')
            setIsActive(false)
            // renderArrows()
        }
        else if (trialSequence[0].correctAnswer === 'right') {
            //stop the timer, discard the value 
            // trialSequence.splice(0,1)
            // renderArrows()
            console.log('wrong it was right!!!!!')
            setIsCorrect(false)

        }
    }

    return(

        <View style={styles.container}>
            <Text style={styles.arrows}>{arrows}</Text>
            {/* <Text> →   →   →   →   →  </Text> */}

            <View style={styles.containerRow}>
                <Button style={styles.button} onPress={()=>checkResponseLeft()}> 
                    <Text>L</Text>
                </Button>
                <Button style={styles.button} onPress={()=>checkResponseRight()}>
                    <Text>R</Text>
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
        flex: 1,
        marginTop: 80,
        // padding: 100
    },
    containerRow:{
        // display:'flex',
        paddingTop: 100,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 120
        // height: 10
    },
    button: {
        borderRadius: 150,
        margin: 60,
        width: 70,
        height: 70,
        backgroundColor: '#b1d9e7',
        justifyContent: "center"
    },

    arrows: {
        color: '#00253e',
        fontSize: 28
    }
})