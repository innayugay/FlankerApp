import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Tab } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';
import { move } from 'formik';


export default function FlankerTask ({navigation}) {

    const entryID = navigation.getParam('entryID')
    const [isActive, setIsActive] = useState(false)
    const [trialSequence, setTrialSequence] = useState(navigation.getParam('arrs'))

    // const [reRender, setReRender] = useState(false)
    const [arrows, setArrows] = useState(' ')
    const [currentCount, setCurrentCount] = useState(0)
    const [isCorrect, setIsCorrect] = useState(true)
    // const [totalTime, setTotalTime] = useState([])
    const [congruentTime, setCongruentTime] = useState([])
    const [incongruentTime, setIncongruentTime] = useState([])
    const [moveNext, setMoveNext] = useState(false)
    const [congruentCorrect, setCongruentCorrect] = useState(0)
    const [incongruentCorrect, setIncongruentCorrect] = useState(0)

    // const countSeconds = () =>{
    //     seconds
    // }

    useEffect(()=>{
        //initiate timer here?
        // setCurrentTrial(trialSequence[0])
        // currentTrial = trialSequence[0]
        // console.log(trialSequence, '=-=-=-=-=-=-=-=-=-=-=-=')
        renderArrows()

        var timer
        var count = 0
        console.log('in useeffect is active???? is', isActive)
        console.log('in useeffect is correct is????', isCorrect)
        if(isActive){
            clearInterval(timer)
            timer = setInterval(function(){
                // setSeconds(seconds => seconds + 1)
                count = count + 1
                // console.log(seconds, 'seconds')
            },10)
        }
        // else if (!isActive){
        //     renderArrows()

        // }
        return ()=> {
            clearInterval(timer)
            console.log(count, 'is your count')
            setCurrentCount(count)
            // if (isCorrect){
            //     if(trialSequence.length > 0){
            //         if (trialSequence[0].type === 'congruentLeft' || trialSequence[0].type === 'congruentRight'){
            //             trialSequence.splice(0,1)
            //             console.log('!!!!!!!!!!!!!the trial sequence is now', trialSequence)
            //             setCongruentTime(congruentTime=>[...congruentTime, count])
            //             console.log('this trial is congruent', congruentTime)
                        
            //             // setTrialSequence(trialSequence.splice(0,1))
        
            //         }
            //         else if (trialSequence[0].type === 'incongruentLeft' || trialSequence[0].type === 'incongruentRight'){
            //             trialSequence.splice(0,1)
            //             setIncongruentTime(incongruentTime=>[...incongruentTime, count])
            //             console.log('this trial is incongruent', incongruentTime)
            //             // trialSequence.splice(0,1)
            //             // setTrialSequence(trialSequence.splice(0,1))
            //         }
            //     }
            // }
            // else{
            //     console.log('/////////////// incorrect answers dont get recorded //////////////////')
            // }
            // setTotalTime(totalTime=>[...totalTime, seconds])
            // console.log(totalTime, 'is your total time 0o0o0o0o0o0o0o0o0o0o0o')
            // renderArrows()
        }

    },[isCorrect, moveNext, isActive])

    function processResponse(){
        console.log('process response is called. Here the currect count is', currentCount)
        if (isCorrect){
            if(trialSequence.length > 0){
                if (trialSequence[0].type === 'congruentLeft' || trialSequence[0].type === 'congruentRight'){
                    trialSequence.splice(0,1)
                    console.log('!!!!!!!!!!!!!the trial sequence is now', trialSequence)
                    setCongruentTime(congruentTime=>[...congruentTime, currentCount])
                    console.log('this trial is congruent', congruentTime)
                    
                    // setTrialSequence(trialSequence.splice(0,1))
    
                }
                else if (trialSequence[0].type === 'incongruentLeft' || trialSequence[0].type === 'incongruentRight'){
                    trialSequence.splice(0,1)
                    setIncongruentTime(incongruentTime=>[...incongruentTime, currentCount])
                    console.log('this trial is incongruent', incongruentTime)
                    // trialSequence.splice(0,1)
                    // setTrialSequence(trialSequence.splice(0,1))
                }
            }
        }
        else{
            console.log('/////////////// incorrect answers dont get recorded //////////////////')
        }
    }

    function renderArrows (){
        setIsActive(true)
        
        // setRerender(true)
        console.log('in render arrows is active is', isActive)

        console.log(trialSequence.length, 'trials left')
        if (trialSequence.length > 0){

            console.log('heyheyhey')
            if (trialSequence[0].type === 'congruentRight'){
                // setIsActive(true)
                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('→   →   →   →   → ')

            }
            else if (trialSequence[0].type === 'congruentLeft'){
                // setIsActive(true)
                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('←   ←    ←    ←    ←')
            }
            else if( trialSequence[0].type === 'incongruentRight'){
                // setIsActive(true)

                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows(' ←   ←   →   ←   ←')
            }
            else if( trialSequence[0].type === 'incongruentLeft'){
                // setIsActive(true)

                console.log('corrent answer is', trialSequence[0].correctAnswer)
                setArrows('  →    →    ←    →   → ')
            }
            
        }
        else{
            setArrows('Thank you! You have reached the end of the test')
            // call the saveResults
            setIsActive(false)
            var congruentRT = Math.round(((congruentTime.reduce((a, b) => a + b, 0) * 10)/congruentCorrect *100) / 100)

            var incongruentRT = Math.round(((incongruentTime.reduce((a, b) => a + b, 0) * 10)/incongruentCorrect*100)/100)

            var globalRT = congruentRT + incongruentRT
            // var sumOfTotalTime = totalTime.reduce((a, b) => a + b, 0)
            console.log('your total time is', globalRT)
            navigation.navigate('Questionnaire', {globalRT: globalRT, incongruentRT: incongruentRT, congruentRT: congruentRT, entryID: entryID})
            
        }
        
    }



    function checkResponseRight() {
        console.log('your answer is RIGHT')

        if (trialSequence[0].correctAnswer === 'right'){

            // stop the timer, add it to the total time
            // trialSequence.splice(0,1)
            console.log('you are correct and have' + trialSequence.length, 'trials left')
            if (trialSequence[0].type === 'incongruentRight'){
                setIncongruentCorrect(incongruentCorrect + 1)
                console.log(incongruentCorrect, 'of incongruent trials were correct')
            }
            else if(trialSequence[0].type === 'congruentRight'){
                setCongruentCorrect(congruentCorrect + 1)
                console.log(congruentCorrect, 'of congruent trials were correct')
            }
            setMoveNext(!moveNext)
            setIsCorrect(true)
            // renderArrows()
            // setIsActive(false)
            processResponse()


        }
        else if (trialSequence[0].correctAnswer === 'left') {
            //stop the timer, discard the value 
            // trialSequence.splice(0,1)
            // renderArrows()
            console.log('wrong it was left!!!!!')
            // trialSequence.splice(0,1)
            // setMoveNext(true)


            setIsCorrect(false)
            processResponse()
            


        }
    }

    function checkResponseLeft() {
        console.log('your answer is LEFT')
        if (trialSequence[0].correctAnswer === 'left'){

            // stop the timer, add it to the total time
            // trialSequence.splice(0,1)

            console.log('you are correct and have' + trialSequence.length, 'trials left')
            if (trialSequence[0].type === 'incongruentLeft'){
                setIncongruentCorrect(incongruentCorrect + 1)
                console.log(incongruentCorrect, 'of incongruent trials were correct')

            }
            else if(trialSequence[0].type === 'congruentLeft'){
                setCongruentCorrect(congruentCorrect + 1)
                console.log(congruentCorrect, 'of congruent trials were correct')
            }
            setMoveNext(!moveNext)
            setIsCorrect(true)
            // setIsActive(false)
            // renderArrows()
            processResponse()

        }
        else if (trialSequence[0].correctAnswer === 'right') {
            //stop the timer, discard the value 
            // trialSequence.splice(0,1)
            // renderArrows()
            console.log('wrong it was right!!!!!')
            // trialSequence.splice(0,1)
            // setMoveNext(true)
            setIsCorrect(false)
            processResponse()


        }
    }

    return(
        <View style={globalStyles.screen}>
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