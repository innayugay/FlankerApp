import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View, TextInput } from 'react-native';
import { withOrientation } from 'react-navigation';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { subscribeToAuthChanges } from '../../api/auth';
// import participantStack from '../../routes/participantStack';

  export default function ParticipantLogIn() {

  [email, setEmail] = useState('')
  [password, setPassword] = useState('')
  // [noStudiesToShow, setStudiesToShow] = useState(true)

  onAuthStateChanged = (user) => {
    if (user !== null) {
      console.log('correct user')
      // check if the user has studies and pass them to the next screen
        // firebase.firestore().collection('researchers').doc(firebase.auth().currentUser.uid).get()
        // .then( function(doc) {
        //     if(doc.data().studies){
        //         console.log('this user has studies', doc.data().studies)
        //         setStudiesToShow(false)

        //         // setStudies(doc.data().studies)
        //         // studies.push(doc.data().studies)
        //         console.log(studies)
        //     }
        //     else{
        //         console.log('this user doenst have studies')
        //     }
        // }
        // )
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


 
    
    return (
      <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: "center",
    flex: 1,
    padding: 100
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


