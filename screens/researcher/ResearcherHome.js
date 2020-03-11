import React, { useState, useEffect } from 'react';
import { Text, Button, Container, Card, CardItem } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { TextInput, FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Formik } from 'formik';

export default function ResearcherHome ({navigation}) {


    const [modalOpen, setModalOpen] = useState(false)
    const [noStudiesToShow, setStudiesToShow] = useState(true)
    const [studies, setStudies] = useState([])
    const [toggleRender, setToggleRender] = useState(false)
    // var noStudiesToShow = false

    function addStudy(values) {
        var uid = firebase.auth().currentUser.uid
        // console.log(values)
        var db = firebase.firestore()
        db.collection('studies').add({
            researcher: '',
            title: '',
            aims: '',
            description: '',
            studyID:''
        })
        .then ( function(docRef) {
            console.log(docRef.id, 'this is docref id!!!')
            db.collection('researchers').doc(uid).update({
                studies: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            })
            db.collection('studies').doc(docRef.id).set({
                researcher: uid,
                title: values.title,
                aims: values.aims,
                description: values.description,
                studyID: docRef.id
            })
        })
        // .then(
        setToggleRender(!toggleRender)
        // )

    }


    useEffect(() => {
        setStudies([])
        var db = firebase.firestore()
        db.collection('researchers').doc(firebase.auth().currentUser.uid).get()
        .then( function(theDoc) {
            console.log('looking into the researchers profile...', theDoc.data())
            if(theDoc.data().studies){
                console.log('this user has studies', theDoc.data().studies)
                
                setStudiesToShow(false)
                for (var i=0; i < theDoc.data().studies.length; i++){
                    // console.log(doc.data().studies[0])
                    db.collection('studies').doc(theDoc.data().studies[i]).get()
                    .then(function(newDoc){
                        console.log(studies, 'studiessss')
                        if(studies.indexOf(newDoc.data()) === -1){
                            setStudies(studies =>[...studies, newDoc.data()])
                        }
                        else{
                            console.log('oops duplicating!')
                        }
                    })
                }
            }
            else{
                console.log('this user doenst have studies')
            }
        }
        )
        // console.log(noStudiesToShow)
        // console.log('studies are', studies)
    },[toggleRender])
    
    console.log(noStudiesToShow, '???')
    const noStudies = 
        <Text style={globalStyles.lightText}> You don't have any studies yet. </Text>

    const displayStudies = 
        <View style={{marginTop: 20, padding: 8}}>
            <Text style={globalStyles.regularText}> All studies ({studies.length})</Text>
            <FlatList data={studies} style={{marginTop:20}} renderItem={({ item }) => (
                <View style={styles.containerList}>
                    {/* <Card style={styles.card}> */}
                        <CardItem style={styles.card}>
                            <Text style={globalStyles.regularText}>{ item.title }</Text>
                        </CardItem>
                    {/* </Card> */}
                    <Button onPress={ ()=> navigation.navigate('StudyDetails', item)} style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>View </Text>
                    </Button>
                </View>
            )} />
        </View>
    
    
    return (
        <View style={globalStyles.screen}>
            <View style={globalStyles.header}> 
                <Text style={globalStyles.headerText}> My Studies </Text>
                <View style={globalStyles.dividerLine}/>
            </View>

            {/* popup window */}
            <View>
                <Modal visible={modalOpen} animationType='slide' transparent={true}>
                    <View style={styles.modal}>
                        <View style={styles.containerList}>
                            <Text style={globalStyles.darkText}> Create a new study</Text>
                            <Button onPress={()=> setModalOpen(false)} style={{backgroundColor:'rgba(0,0,0,0)', position:'absolute', bottom: 10, left: 170}}>
                                <Text style={{color:'grey', fontSize:25}}> x </Text>
                            </Button>
                        </View>
                        <Formik
                            initialValues={{title:'', aims:'', description:''}}
                            onSubmit={(values) => {
                                addStudy(values)
                            }}
                        >
                        {(formikProps)=>(
                            <View style={{width:200, marginTop:20}}>
                                <Text style={globalStyles.darkText}> Title </Text>
                                <TextInput 
                                    style= {globalStyles.input}
                                    onChangeText={formikProps.handleChange('title')}
                                    value={formikProps.values.title}
                                ></TextInput>
                                <Text style={globalStyles.darkText}> Aims </Text>
                                <TextInput 
                                    style= {globalStyles.input}                                    onChangeText={formikProps.handleChange('aims')}
                                    value={formikProps.values.aims}
                                ></TextInput>
                                <Text style={globalStyles.darkText}> Description </Text>
                                <TextInput 
                                    style= {globalStyles.input}
                                    onChangeText={formikProps.handleChange('description')}
                                    value={formikProps.values.description}
                                ></TextInput>
                                <Button style={globalStyles.button} title='Submit' onPress={formikProps.handleSubmit}>
                                    <Text> Submit </Text>
                                </Button>
                            </View>
                        )}
                        </Formik>
                    </View>
                </Modal>
            </View>
            {/* popup window */}

            <View>
                {noStudiesToShow? noStudies: displayStudies}
            
                {/* <Text style={globalStyles.lightText}> You don't have any studies yet. </Text> */}
                <Button style={globalStyles.roundButton} onPress={()=> setModalOpen(true)}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginRight: 4}}>+ </Text>
                </Button>
            </View>
        </View>

    );

    
}

const styles = StyleSheet.create({
    containerList:{
        // display:'flex',
        // marginTop: 20,
        flexDirection: 'row',
        justifyContent:'space-around',
        // height: 10
    },
    centered:{
        justifyContent: "center"
    },
    modal: {
        backgroundColor: '#d6eaf2',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
    sheet: {
        height: 200
    },
    body: {
        padding: 10
    },
    card: {
        width: 320,
        backgroundColor: 'rgba(177,217,231, 0.4)',
        borderRadius: 4,
        margin: 7
    }
})