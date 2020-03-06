import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Tab } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';


export default function FlankerTask ({navigation}) {

    // const [currentTrial, setCurrentTrial] = useState()
    // var trialSequence = []
    // var currentTrial
    // var seconds = 0
    // var timer
    var action
    // const [seconds, setSeconds] = useState(0)

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
        // startTimer()
        // if (isActive){
        //     console.log('timer gets called!')
        //     setInterval( () => {
        //         seconds = seconds + 1
        //     },1000)
        // }
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

    
    // function controlTimer(){
    //     var seconds = 0
    //     if (timer){
    //         console.log('stopped!')
    //         clearInterval(timer)
    //         timer = null
    //         console.log('your reaction time is', seconds)
    //         // seconds = 0
    //     }
    //     else{
    //         timer = setInterval(function(){
    //             console.log('time is running!!', seconds)
    //             seconds = seconds + 1
    //         }, 1000)
    //     }
    // }



    // function startTimer(){
    //     // var timer = 0
    //     console.log('timer is called', timer)
    //     console.log(action, 'ACTION')
    //     if (action == true){
    //         var timer = setInterval(function(){
    //             // setSeconds(seconds + 1)
    //             console.log('starting the timer!!! ACTION IS', action)
    //             seconds = seconds + 1
    //             console.log(seconds, 'seconds!!')
    //         },1000)
    //         console.log(timer, 'this is what timer is')
    //     }
        
    //     else{
    //         console.log('stopping the timer!!!!', timer)
    //         clearInterval(timer)
    //         // timer = null
    //         console.log('reaction time', seconds)
    //     }
    
    // }

    // function startTimer(){
    //     console.log('timer starts!')
    //     theTimer = setInterval(function(){
    //         seconds = seconds + 1
    //         console.log(seconds, 'seconds')
    //     }, 1000)
    // }

    // function stopTimer(){
    //     console.log('timer is stopped!', theTimer, 'this is timer')
    //     clearInterval(theTimer)
    // }


    // function stopTimer(){
    //     //save the reaction times to the database
    //     console.log('stopping the timer!!!!')
    //     clearInterval(timer)
    //     alert('reaction time', seconds)     
    // }

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
            setArrows('ok thats it')
            // call the saveResults
            setIsActive(false)
            console.log('your total time is', totalTime.reduce((a, b) => a + b, 0))
            
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