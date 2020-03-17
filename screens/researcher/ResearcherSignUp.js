import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, TextInput } from 'react-native';
import { withOrientation } from 'react-navigation';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ParticipantSignUp extends React.Component {
  state = {
    email: '',
    password: '',
    name: ''
  }

  handleSignUp = () => {
    var db = firebase.firestore()
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
          console.log('user created')
          db.collection('researchers').doc(userCredentials.user.uid).set({
              name: this.state.name,
              email: this.state.email,
              type: 'researcher'
          })
          this.props.navigation.navigate('ResearcherLogIn')
      })
  }

  render(){
    return (
      <View style={globalStyles.screen}>
        <View style={globalStyles.container}>
          <View style={globalStyles.header}>
            <Text style={globalStyles.headerText}>Participant Sign Up</Text>
            <View style={globalStyles.dividerLine}/>
          </View>
          <View style={globalStyles.insideContainer}>
            <View style={styles.form}>
                <Text style={globalStyles.inputTitle}>Full Name</Text>
                <TextInput 
                    style= {globalStyles.input}
                    onChangeText = {name => this.setState({name})}
                    value={this.state.name}
                ></TextInput>
                <Text style={globalStyles.inputTitle}> Email address</Text>
                <TextInput 
                    style= {globalStyles.input}
                    onChangeText = {email => this.setState({email})}
                    value={this.state.email}
                ></TextInput>
                <Text style={globalStyles.inputTitle}> Password </Text>
                <TextInput 
                    style= {globalStyles.input}
                    secureTextEntry
                    onChangeText={password => this.setState({password})}
                ></TextInput>
                <Button onPress={this.handleSignUp} style={globalStyles.button}> 
                    <Text style={globalStyles.buttonText}> Register </Text>
                </Button>
            </View>
          </View>
        </View>
    </View>

    )
  }
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    padding: 5
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    fontSize: 15
  },
  input: {
    borderBottomColor: 'black',
    backgroundColor: 'white',
    color: 'black',
    height: 40,
    fontSize: 15,
  },
  link: {
    fontWeight: 'bold'
  }
})