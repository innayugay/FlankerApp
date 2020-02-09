import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, TextInput } from 'react-native';
import { withOrientation } from 'react-navigation';
import * as firebase from 'firebase';
import 'firebase/firestore'

export default class ParticipantSignUp extends React.Component {
  state = {
    name:'',
    email: '',
    password: ''
  }
  
  handleSignUp = () => {
    var db = firebase.firestore()
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
          console.log('user created')
          return db.collection('participants').doc(userCredentials.user.uid).set({
              email: this.state.email
          })
      })
  }



  render(){
    return (
      <View>
          <Text style={styles.header}>Participant Sign Up</Text>
        <View style={styles.form}>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput 
                style= {styles.input}
                onChangeText = {name => this.setState({name})}
                value={this.state.name}
            ></TextInput>
            <Text style={styles.inputTitle}> Email address</Text>
            <TextInput 
                style= {styles.input}
                onChangeText = {email => this.setState({email})}
                value={this.state.email}
            ></TextInput>
            <Text style={styles.inputTitle}> Password </Text>
            <TextInput 
                style= {styles.input}
                secureTextEntry
                onChangeText={password => this.setState({password})}
            ></TextInput>
            <Button onPress={this.handleSignUp}> 
                <Text> Register </Text>
            </Button>
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