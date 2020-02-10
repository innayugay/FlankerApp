import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { subscribeToAuthChanges } from '../../api/auth';
import * as firebase from 'firebase';

export default class ResearcherLogIn extends React.Component {
  state = {
    email: '',
    password: ''
  }
  onAuthStateChanged = (user) => {
    if (user !== null) {
      console.log('correct user')
      // this.props.navigation.navigate
      this.props.navigation.navigate('ResearcherFlow')
    }
    else{
      console.log('something is wrong')
    }
  }

  handleLogin = () => {
    const {email, password} = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      subscribeToAuthChanges(this.onAuthStateChanged)
    )
    .catch()
  }

  render(){
    return (
      <View style={styles.form}>
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
          <Button onPress={this.handleLogin}> 
            <Text> Log In </Text>
          </Button>
          <TouchableOpacity
            onPress={()=> this.props.navigation.push('ResearcherSignUp')}>
              <Text> New to Flanker App? <Text style = {styles.link}> Sign Up </Text> </Text>
          </TouchableOpacity>
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
    backgroundColor: 'white',
    borderBottomColor: 'black',
    color: 'black',
    height: 40,
    fontSize: 15,
  },
  link: {
    fontWeight: 'bold'
  }
})