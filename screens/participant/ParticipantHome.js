import React, { useState, useEffect } from 'react';
import { Text, Button, Container, Card, CardItem } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Formik } from 'formik';

export default function ParticipantHome ({navigation}) {


    const [modalOpen, setModalOpen] = useState(false)
    const [noStudiesToShow, setStudiesToShow] = useState(true)
    const [studies, setStudies] = useState([])
    const [toggleRender, setToggleRender] = useState(false)
    // var noStudiesToShow = false

    function addStudy(values) {
        var uid = firebase.auth().currentUser.uid
        console.log(values)
        var db = firebase.firestore()
        db.collection('participants').doc(uid).update({
            studies: firebase.firestore.FieldValue.arrayUnion(values.studyID)
        })
        .then(
            db.collection('studies').doc(values.studyID).update({
                participants: firebase.firestore.FieldValue.arrayUnion(uid)
            })
        )
        .then(
            setToggleRender(!toggleRender)
        )
    }


    useEffect(() => {
        setStudies([])
        var db = firebase.firestore()
        db.collection('participants').doc(firebase.auth().currentUser.uid).get()
        .then(function (theDoc){
            if (theDoc.data().studies){
                console.log('this user has studies', theDoc.data().studies)    
                setStudiesToShow(false)
                for (var i=0; i < theDoc.data().studies.length; i++){
                    // console.log(theDoc.data().studies[0])
                    db.collection('studies').doc(theDoc.data().studies[i]).get()
                    .then(function(newDoc){
                        // console.log(newDoc.data())
                        if(studies.indexOf(newDoc.data()) === -1){
                            setStudies(studies =>[...studies, newDoc.data()])
                            .then(console.log('studies are', studies))
                        }
                        else{
                            console.log('oops duplicating!')
                        }
                    })
                }

            }
        })

        // console.log(noStudiesToShow)
        // console.log('studies are', studies)
    },[toggleRender])
    
    console.log(noStudiesToShow, '???')
    const noStudies = 
    <Text style={globalStyles.lightText}> You are not participating in any study yet. </Text>
    const displayStudies = 
            <FlatList data={studies} renderItem={({ item }) => (
                <Card style={styles.containerRow}>
                    <CardItem>
                        <Text style={globalStyles.titleText}></Text>
                        <Text style={globalStyles.titleText}>{ item.title }</Text>
                    </CardItem>
                    <TouchableOpacity onPress={ ()=> navigation.navigate('StudyDetails', item)}>
                        <Text styles={globalStyles.buttonText}>View details</Text>
                    </TouchableOpacity>
                </Card>
            )}/>
    
    
    return (
        <View>
            <View style={globalStyles.header}> 
                <Text style={globalStyles.headerText}> My Studies </Text>
            </View>

            {/* popup window */}
            <View style={globalStyles.container}>
                <Modal visible={modalOpen} animationType='slide' transparent={true}>
                    <View style={styles.modal}>
                        <Text style={globalStyles.darkText}> Add a new study here (participant)</Text>
                        <Formik
                            initialValues={{studyID:''}}
                            onSubmit={(values) => {
                                addStudy(values)
                            }}
                        >
                        {(formikProps)=>(
                            <View>
                                <TextInput 
                                    style= {styles.input}
                                    placeholder='Study ID'
                                    onChangeText={formikProps.handleChange('studyID')}
                                    value={formikProps.values.studyID}
                                ></TextInput>
                                <Button style={globalStyles.button} title='Submit' onPress={formikProps.handleSubmit}>
                                    <Text> Add Study</Text>
                                </Button>
                            </View>
                        )}
                        </Formik>
                        <Button onPress={()=> setModalOpen(false)}>
                            <Text> X </Text>
                        </Button>
                    </View>
                </Modal>
            </View>
            {/* popup window */}

            <View style={styles.padding}>
                {noStudiesToShow? noStudies: displayStudies}
            
                {/* <Text style={globalStyles.lightText}> You don't have any studies yet. </Text> */}
                <Button style={styles.roundButton} onPress={()=> setModalOpen(true)}>
                    <Text> + </Text>
                </Button>
            </View>
        </View>

    );

    
}

const styles = StyleSheet.create({
    containerRow:{
        // display:'flex',
        // marginTop: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        // height: 10
    },
    modal: {
        backgroundColor: '#b1d9e7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 300,
        height: 450,
        padding: 30,
        borderRadius: 10,
        marginTop: 100,
        marginLeft: 60
    },
    input: {
        backgroundColor: 'white',
        borderBottomColor: 'black',
        color: 'black',
        height: 40,
        fontSize: 15,
        margin: 10
    },
    roundButton: {
        width: 45,
        borderRadius: 30
    },
    sheet: {
        height: 200
    },
    body: {
        padding: 10
    }
})