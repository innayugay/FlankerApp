import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, TextInput } from 'react-native';
import { withOrientation } from 'react-navigation';
import * as firebase from 'firebase';

export default class ParticipantSignUp extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleLogin = () => {
    const {email, password} = this.state
    firebase.auth().signInWithEmailAndPassword(email, password) 
  }

  render(){
    return (
      <View style={styles.header}>
          <Text>Participant Sign Up</Text>
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
    color: 'white',
    height: 40,
    fontSize: 15,
  },
  link: {
    fontWeight: 'bold'
  }
})