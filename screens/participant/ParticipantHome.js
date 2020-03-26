import React, { useState, useEffect } from 'react';
import { Text, Button, Container, Card, CardItem } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { TextInput, FlatList } from 'react-native-gesture-handler';
import * as firebase from 'firebase';
import { Formik } from 'formik';
console.disableYellowBox = true;

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
            setModalOpen(false),
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
    <Text style={styles.noStudiesText}> You are not participating in any study yet. </Text>
    const displayStudies = 
            <View style={{marginTop: 20, padding: 8, maxHeight: 450}}>
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
                <Modal isVisible={modalOpen}>
                    <View style={styles.modal}>
                        <Text style={styles.modalHeader}> Create a new study</Text>
                        <View style={styles.container}>
                            <Button onPress={()=> setModalOpen(false)} style={{backgroundColor:'rgba(0,0,0,0)', position:'absolute', bottom: 50, left: 100}}>
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
                                <Text style={globalStyles.darkText}> Study ID </Text>
                                <TextInput 
                                    style= {globalStyles.input}
                                    onChangeText={formikProps.handleChange('studyID')}
                                    value={formikProps.values.studyID}
                                ></TextInput>
                                <Button style={globalStyles.button} title='Submit' onPress={formikProps.handleSubmit}>
                                    <Text> Add Study</Text>
                                </Button>
                            </View>
                        )}
                       </Formik>
                    </View>
                </Modal>
            </View>
            {/* popup window */}

            <View style={globalStyles.container}>
                {noStudiesToShow? noStudies: displayStudies}
            
                {/* <Text style={globalStyles.lightText}> You don't have any studies yet. </Text> */}
                <Button style={globalStyles.roundButton} onPress={()=> setModalOpen(true)}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>+ </Text>
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
        // display: 'flex',
        // flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 350,
        padding: 30,
        borderRadius: 10,
        // marginTop: 200,
        marginLeft: 20,
        borderColor: '#9fa7cc',
        borderWidth: 2
    },
    sheet: {
        height: 200
    },
    body: {
        padding: 10
    },
    card: {
        width: 280,
        backgroundColor: 'rgba(177,217,231, 0.4)',
        borderRadius: 4,
        margin: 7
    },
    modalHeader: {
        color: '#00253e',
        fontSize: 20,
        marginBottom: 50
        
    },
    noStudiesText: {
        color: '#17547d',
        margin: 50
    }
})