import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, TextInput } from 'react-native';
import { withOrientation } from 'react-navigation';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { subscribeToAuthChanges } from '../../api/auth';
// import participantStack from '../../routes/participantStack';

  class ParticipantLogIn extends React.Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
  }

  onAuthStateChanged = (user) => {
    if (user !== null) {
      console.log('correct user')
      // this.props.navigation.navigate
      // this.props.navigation.push('ParticipantHome')
    }
  }

  handleLogin = () => {
    const {email, password} = this.state
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      subscribeToAuthChanges(this.onAuthStateChanged)
    )
    .catch(alert(''))
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
             onPress = {()=> this.props.navigation.push('ParticipantSignUp')}>
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


export default ParticipantLogIn;