import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Text, Button, Form, Item, Picker, Icon} from 'native-base';
import { globalStyles } from '../../styles/global';
import * as firebase from 'firebase';
import SelectMultiple from 'react-native-select-multiple';

const languages = ['English', 'Russian', 'French', 'German', 'Spanish', 'Polish', 'Chinese', 'Korean', 'Greek']

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
        this.setState({ selectedLanguages })
      }


    render(){

        return (
            <View>
                <View style={globalStyles.header}>
                    <Text style={globalStyles.headerText}> As the final step, please fill out this short questionnaire: </Text>
                </View>
                <View style={styles.infoBox}>
                    <Text style={styles.infoBoxText}>The information asked is crucial for the research, however all the data you provide will be fully anonymised</Text>
                </View>
                <View style={styles.form}>
                    {/* <Form> */}
                        <Item picker>
                            {/* <View> */}
                                <Text>Your gender:</Text>
                                <Picker
                                    mode="dropdown"
                                    iosIcon= {<Icon name="arrow-down" />}
                                    // style={{ width: undefined }}
                                    placeholder="Gender"
                                    placeholderStyle={{ color: "#bfc6ea" }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.gender}
                                    onValueChange={gender=> this.setState({gender})}
                                >
                                    <Picker.Item label="Male" value="key0" />
                                    <Picker.Item label="Female" value="key1" />
                                    <Picker.Item label="Prefer not to say" value="key2" />
                                </Picker>
                            {/* </View> */}
                        </Item>
                        <Item>    
                            <Text> Your age:</Text>
                            <TextInput
                                style= {styles.input}
                                onChangeText = {email => this.setState({email})}
                                value={this.state.email}
                            >
                            </TextInput>
                        </Item>
                        <Item>
                                <Text>Languages spoken:</Text>
                                <SelectMultiple
                                    style={styles.selector}
                                    items={languages}
                                    selectedItems={this.state.selectedLanguages}
                                    onSelectionsChange={this.onSelectionsChange}
                                />
                        </Item>
                    {/* </Form> */}
                </View>
                <Button>
                    <Text> Submit </Text>
                </Button>
                {/* <Text>{this.props.navigation.getParam('congruentRT')} is congruent RT</Text>
                <Text>{this.props.navigation.getParam('incongruentRT')} is incongruent RT</Text> */}
            </View>
        )

    }
}


const styles = StyleSheet.create({
    infoBox: {
        margin: 20,
        padding: 30,
        width: 350,
        backgroundColor: '#9fa7cc',
        borderRadius: 4,

    },
    infoBoxText: {
        color: 'white',
        fontSize: 14,
        textAlign: "center"
    },
    input: {
        backgroundColor: 'white',
        borderBottomColor: 'black',
        color: 'black',
        height: 40,
        fontSize: 15,
        width: 150
    },
    form: {
        display: "flex",
        flexDirection: "column"
    },
    selector:{
        width: 200,
        maxHeight: 100
    }
})