import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../styles/global'


export default function ResearcherStudyDetails({navigation}){


    return (
    <View style={globalStyles.container}>
        <Text> Here are the study details</Text>
        <Text>{navigation.getParam('title')}</Text>
    </View>
    )
}