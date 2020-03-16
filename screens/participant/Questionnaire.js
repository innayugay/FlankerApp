import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Text, Button, Form, Item, Picker, Icon} from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';
import SelectMultiple from 'react-native-select-multiple';

const languages = ['English', 'Afrikaans', 'Albanian', 'Amharic', 'Armenian', 'Basque',
                'Bengali', 'Byelorussian', 'Burmese','Bulgarian', 'Catalan', 'Czech',
                'Chinese','Croatian', 'Danish','Dari','Dzongkha','Dutch', 'Esperanto',
                'Estonian', 'Faroese','Farsi','Finnish','French', 'Gaelic','Galician',
                'German','Greek', 'Hebrew','Hindi','Hungarian', 'Icelandic','Indonesian',
                'Inuktitut (Eskimo)','Italian', 'Japanese', 'Kazakh','Khmer','Korean','Kurdish',
                'Laotian', 'Latvian', 'Lappish', 'Lithuanian', 'Latvian','Lappish','Lithuanian',
                'Macedonian','Malay','Maltese', 'Nepali','Norwegian', 'Pashto','Polish','Portuguese',
                'Romanian', 'Russian', 'Scots','Serbian','Slovak','Slovenian','Somali','Spanish', 
                'Swedish','Swahili', 'Polish', 'Tagalog-Filipino','Tajik','Tamil','Thai','Tibetan',
                'Tigrinya','Tongan','Turkish','Turkmen', 'Ukrainian', 'Urdu',
                'Uzbek', 'Vietnamese', 'Welsh']

export default class Questionnaire extends React.Component {

    // function addParticipantData(){
    //     var db= firebase.firestore()
    //     db.collection('')
    // }
    state = {
        gender: '',
        age: 0,
        selectedLanguages:[]
    }

    onSelectionsChange = (selectedLanguages) => {
        // selectedFruits is array of { label, value }
        // var selections = []
        // for(var i =0; i < selectedLanguages.length; i++){
        //     console.log(selectedLanguages[i].value, 'selected language!!!!!')

            
        // }
        this.setState({ selectedLanguages })
        console.log(selectedLanguages, 'selected languages in state!!!')
      }

    submitData = () => {
        var db = firebase.firestore()
        var uid = firebase.auth().currentUser.uid
        var entryID = this.props.navigation.getParam('entryID').id
        var theLanguages = []
        for(var i =0; i < this.state.selectedLanguages.length; i++){
            theLanguages.push(this.state.selectedLanguages[i].value)
        }
        console.log('languages that will be submitted', theLanguages)
        console.log('congruentRT', this.props.navigation.getParam('congruentRT'), 'incongruentRT', this.props.navigation.getParam('incongruentRT'), 'globalRT', this.props.navigation.getParam('globalRT'))
        console.log(this.props.navigation.getParam('entryID').id)
        
        var congruentRT = this.props.navigation.getParam('congruentRT')
        var incongruentRT = this.props.navigation.getParam('incongruentRT')
        var globalRT = this.props.navigation.getParam('globalRT')

        db.collection('participants').doc(uid).collection('entries').doc(entryID).update({
            gender: this.state.gender,
            age: this.state.age,
            languages: theLanguages,
            congruentRT: congruentRT,
            incongruentRT: incongruentRT,
            globalRT: globalRT
        })
        this.props.navigation.navigate('ThankYou', {globalRT:globalRT, congruentRT:congruentRT, incongruentRT:incongruentRT})
    }

    render(){

        return (
            <View style={globalStyles.screen}>
                <View style={globalStyles.header}>
                    <Text style={globalStyles.headerText}> As the final step, please fill out this short questionnaire: </Text>
                </View>
                <View style={globalStyles.container}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoBoxText}>The information asked is crucial for the research, however all the data you provide will be fully anonymised</Text>
                    </View>
                    <View style={styles.form}>
                        <Item picker style={styles.item}>
                            <Text style={styles.labels}>Your gender:</Text>
                            <Picker
                                mode="dropdown"
                                iosIcon= {<Icon name="arrow-down" />}
                                // style={{ width: undefined }}
                                placeholder="Gender"
                                placeholderStyle={{ color: "#aeafb0" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.gender}
                                onValueChange={gender=> this.setState({gender})}
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Prefer not to say" value="Prefer not to say" />
                            </Picker>
                                {/* </View> */}
                        </Item>
                        <Item style={styles.item}>    
                            <Text style={styles.labels}> Your age:</Text>
                            <TextInput
                                style= {styles.input}
                                onChangeText = {age => this.setState({age})}
                                value={this.state.age}
                            >
                            </TextInput>
                        </Item>
                        <Item style={styles.item}>
                            <Text style={styles.labels}>Languages spoken fluently:</Text>
                            <SelectMultiple
                                style={styles.selector}
                                items={languages}
                                selectedItems={this.state.selectedLanguages}
                                onSelectionsChange={this.onSelectionsChange}
                            />
                        </Item>
                    </View>
                    <Button style={globalStyles.button} onPress={this.submitData}>
                        <Text> Submit </Text>
                    </Button>
                    {/* <Text>{this.props.navigation.getParam('congruentRT')} is congruent RT</Text>
                    <Text>{this.props.navigation.getParam('incongruentRT')} is incongruent RT</Text> */}
                </View>

                </View>
        )

    }
}


const styles = StyleSheet.create({
    infoBox: {
        marginBottom: 20,
        padding: 30,
        width: 350,
        backgroundColor: '#9fa7cc',
        borderRadius: 4,

    },
    infoBoxText: {
        color: 'white',
        fontSize: 14,
        textAlign: "center",
    },
    input: {
        backgroundColor: '#e4e6eb',
        color: 'black',
        height: 40,
        fontSize: 15,
        width: 150,
        padding: 10
    },
    form: {
        marginBottom: 30
    },
    selector:{
        padding: 10,
        backgroundColor: 'white',
        width: 200,
        maxHeight: 140
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 100,
        paddingVertical: 20
    },
    labels:{
        margin: 10,
        maxWidth: 100
    }
})