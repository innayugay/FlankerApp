import React, { useState } from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, Modal } from 'react-native';

export default function ParticipantHome ({navigation}) {

    const [modalOpen, setModalOpen] = useState(false)

    return (
        <View style={styles.container}>
            <Modal visible={modalOpen} animationType='' presentationStyle='formSheet'>
                <View style={styles.modal}>
                    <Text style={globalStyles.darkText}> This is a modal</Text>
                    <Text style={globalStyles.darkText}> This is a modal</Text>
                    <Text style={globalStyles.darkText}> This is a modal</Text>
                    <Text style={globalStyles.darkText}> This is a modal</Text>
                    <Button style={styles.roundButton} onPress={()=> setModalOpen(false)}>
                        <Text> x </Text>
                    </Button>
                </View>
            </Modal>
            <View style={styles.header}> 
                <Text style={globalStyles.headerText}> My Studies </Text>
            </View>
            <View style={styles.body}>
                <Text style={globalStyles.lightText}> You are not registered in any study yet. </Text>
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
        alignItems: 'center'
        // // justifyContent: "center",
        // flex: 1,
        // margin: 100
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
        width: 300
    },
    roundButton: {
        width: 45,
        borderRadius: 30
    }
})