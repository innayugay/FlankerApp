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
    // var noStudiesToShow = false

    function addStudy(values) {
        var uid = firebase.auth().currentUser.uid
        // console.log(values)
        var db = firebase.firestore()
        db.collection('studies').add({
            researcher: uid,
            title: values.title,
            aims: values.aims,
            description: values.description
        })
        .then ( function(docRef) {
            // console.log(docRef.id)
                db.collection('researchers').doc(uid).update({
                studies: firebase.firestore.FieldValue.arrayUnion(docRef.id)
            })
        })
    }


    useEffect(() => {
        var db = firebase.firestore()
        db.collection('researchers').doc(firebase.auth().currentUser.uid).get()
        .then( function(doc) {
            if(doc.data().studies){
                console.log('this user has studies', doc.data().studies)
                
                setStudiesToShow(false)
                for (var i=0; i < doc.data().studies.length; i++){
                    // console.log(doc.data().studies[0])
                    db.collection('studies').doc(doc.data().studies[i]).get()
                    .then(function(newDoc){
                        // console.log(newDoc.data())
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
    },[])
    
    console.log(noStudiesToShow, '???')
    const noStudies = 
    <Text style={globalStyles.lightText}> You don't have any studies yet. </Text>
    const displayStudies = 
            <FlatList data={studies} renderItem={({ item }) => (
                <Card style={styles.containerRow}>
                    <CardItem>
                        <Text style={globalStyles.titleText}>{ item.title }</Text>
                    </CardItem>
                    <TouchableOpacity onPress={ ()=> navigation.navigate('StudyDetails', item)}>
                        <Text>View details</Text>
                    </TouchableOpacity>
                </Card>
              )} />
    
    
    return (
        <View>
            <View style={styles.header}> 
                <Text style={globalStyles.headerText}> My Studies </Text>
            </View>

            {/* popup window */}
            <View style={styles.container}>
                <Modal visible={modalOpen} animationType='slide' transparent={true}>
                    <View style={styles.modal}>
                        <Text style={globalStyles.darkText}> Add a new study here (researcher)</Text>
                        <Formik
                            initialValues={{title:'', aims:'', description:''}}
                            onSubmit={(values) => {
                                addStudy(values)
                            }}
                        >
                        {(formikProps)=>(
                            <View>
                                <TextInput 
                                    style= {styles.input}
                                    placeholder='Title'
                                    onChangeText={formikProps.handleChange('title')}
                                    value={formikProps.values.title}
                                ></TextInput>
                                <TextInput 
                                    style= {styles.input}
                                    placeholder='Aims'
                                    onChangeText={formikProps.handleChange('aims')}
                                    value={formikProps.values.aims}
                                ></TextInput>
                                <TextInput 
                                    style= {styles.input}
                                    placeholder='Description'
                                    onChangeText={formikProps.handleChange('description')}
                                    value={formikProps.values.description}
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
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        flex: 1,
    },
    containerRow:{
        // display:'flex',
        // marginTop: 20,
        flexDirection: 'row',
        justifyContent:'space-between',
        // height: 10
    },
    header: {
      marginTop: 80,
    //   display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    //   justifyContent: 'flex-start',
      padding: 5
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