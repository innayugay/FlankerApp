import React, { useState } from 'react';
import { Text, Button, Container } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

export default function ResearcherHome ({navigation}) {

    const [modalOpen, setModalOpen] = useState(false)

    const addStudy = () => {
        var db = firebase.firestore()
        return db.collection('studies').doc().set({
            
        })

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}> 
                <Text style={globalStyles.headerText}> My Studies </Text>
            </View>
            <View style={styles.container}>
                <Modal visible={modalOpen} animationType='slide' transparent={true}>
                    <View style={styles.modal}>
                        <Text style={globalStyles.darkText}> Add a new study here</Text>
                        <Text style={styles.inputTitle}> Title </Text>
                        <TextInput 
                            style= {styles.input}
                            // onChangeText = {}
                            // value={}
                        ></TextInput>
                        <Text style={styles.inputTitle}> Aims </Text>
                        <TextInput 
                            style= {styles.input}
                            // onChangeText = {}
                            // value={}
                        ></TextInput>
                        <Text style={styles.inputTitle}> Desirable participant characteristics </Text>
                        <TextInput 
                            style= {styles.input}
                            // onChangeText = {}
                            // value={}
                        ></TextInput>
                        <Text style={styles.inputTitle}>Description</Text>
                        <TextInput 
                            style= {styles.input}
                            // onChangeText = {}
                            // value={}
                        ></TextInput>

                        <Button onPress={addStudy}>
                            <Text> Add Study </Text>
                        </Button>

                        <Button onPress={()=> setModalOpen(false)}>
                            <Text> X </Text>
                        </Button>
                    </View>
                </Modal>
            </View>
            <View>
                <Text style={globalStyles.lightText}> You don't have any studies yet. </Text>
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
        // flex: 1,
    },
    header: {
      marginTop: 80,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    //   justifyContent: 'flex-start',
      padding: 5
    },
    modal: {
        backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 300,
        height: 450,
        padding: 50,
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
    },
    roundButton: {
        width: 45,
        borderRadius: 30
    },
    sheet: {
        height: 200
    }
})