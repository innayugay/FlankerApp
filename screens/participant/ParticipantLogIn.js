import React, {useState} from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, TextInput } from 'react-native';
import { withOrientation } from 'react-navigation';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { subscribeToAuthChanges } from '../../api/auth';
// import participantStack from '../../routes/participantStack';

  export default class ParticipantLogIn extends React.Component {

  // [email, setEmail] = useState('')
  // [password, setPassword] = useState('')
    state={
      email: '',
      password: ''
    }

  onAuthStateChanged = (user) => {
    if (user !== null) {
      console.log('correct user')
      this.props.navigation.navigate('ParticipantFlow')
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
      <View style={globalStyles.screen}>
        <View style={globalStyles.container}>
          <View style={globalStyles.header}>
            <Text style={globalStyles.headerText}> Participant Log In </Text>
            <View style={globalStyles.dividerLine}/>
          </View>
          <View style={globalStyles.insideContainer}>
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
              <View style={styles.centerContainer}>
                  <Button onPress={this.handleLogin} style={globalStyles.button}> 
                    <Text style={globalStyles.buttonText}> Log In </Text>
                  </Button>
                  <TouchableOpacity
                    onPress = {()=> this.props.navigation.push('ParticipantSignUp')}>
                    <View style={styles.centerContainer}>
                      <Text style={styles.link}> New to Flanker App? </Text>
                      <Text style = {{textDecorationLine: 'underline'}}> Sign Up </Text> 
                    </View>
                  </TouchableOpacity>
              </View>

              
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    alignItems: 'center'
  },
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
  link: {
    fontFamily: 'Arial',
    textAlign: 'center',
    color: 'grey',
    marginTop: 30
  },
})


