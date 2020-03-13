import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';

export default function ResearcherStudyDetails({navigation}){

    var currentStudyID = navigation.getParam('studyID')
    return (
    <View style={globalStyles.screen}>
        <View style={globalStyles.header}> 
            <Text style={globalStyles.headerText}>{navigation.getParam('title')}</Text>
        </View>
        <View style={globalStyles.insideContainer}>
            <View style={{flexDirection: 'row', maxWidth: 250, marginBottom: 8}}>
                <Text style={globalStyles.lightText}>Study ID: </Text>
                <Text style={globalStyles.darkText}> {currentStudyID}</Text>
            </View>
            <View style={{flexDirection: 'row', maxWidth: 250, justifyContent:'space-between', marginBottom: 8}}>
                <Text style={globalStyles.lightText}>Aims: </Text>
                <Text style={globalStyles.darkText}> {navigation.getParam('aims')}</Text>
            </View>
            <View  style={{flexDirection: 'row', maxWidth: 250, justifyContent:'space-between', marginBottom: 8}}>
                <Text style={globalStyles.lightText}>Description: </Text>
                <Text style={globalStyles.darkText}> {navigation.getParam('description')}</Text>
            </View>
            <View  style={{flexDirection: 'row', maxWidth: 250, justifyContent:'space-between', marginBottom: 8}}>
                <Text style={globalStyles.lightText}>Desired participant characteristics: </Text>
                <Text style={globalStyles.darkText}> {navigation.getParam('participant characteristics')}</Text>
            </View>
            <View style={styles.blueBubble}>
                <Text style={globalStyles.darkText}> Share the study ID with your participants so they can take the test.</Text>
                <Text style={globalStyles.darkText}> They need it to register with the study. </Text>
            </View>
            <Button style={globalStyles.button} onPress={()=> navigation.navigate('StudyResults', {currentStudyID:currentStudyID})}>
                <Text> View results </Text>
            </Button>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    properties: {
        flexDirection: 'column',
        margin: 30

    },
    blueBubble: {
        width: 300,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#b1d9e7',
        opacity: 0.87,
        padding: 20,
        borderRadius: 7,
        margin: 20
    },


})