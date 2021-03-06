import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../styles/global'
import { StyleSheet, View } from 'react-native';

export default function Welcome({navigation}) {

    return (
      <View style={globalStyles.screen}>
        <View style={styles.container}>
          <View style={globalStyles.header}> 
            <Text style={styles.headerText}> Welcome to the Flanker App! </Text>
            <Text style={styles.lightText}> What best describes you? </Text>
          </View>

            {/* <Button style={globalStyles.button}> 
              <Text style={globalStyles.buttonText} onPress={() => navigation.push('ResearcherLogIn')}>I am a researcher</Text> 
            </Button>
            <Button style={globalStyles.button}> 
              <Text style={globalStyles.buttonText} onPress={() => navigation.push('ParticipantLogIn')}> I am a participant</Text> 
            </Button> */}
            <Button style={globalStyles.button}> 
              <Text style={styles.buttonText} onPress={() => navigation.navigate('ResearcherLogIn')}>I am a researcher</Text> 
            </Button>
            <Button style={globalStyles.button}> 
              <Text style={styles.buttonText} onPress={() => navigation.navigate('ParticipantLogIn')}> I am a participant</Text> 
            </Button>
        </View>

      </View>

    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        flex: 1
        // padding: 100
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: "center",
      padding: 5
    },
    headerText:{
      fontSize: 20,
      color: '#17547d',
      textAlign: "center",
      width: 300,
      marginBottom: 5
    },
    buttonText: {
      fontFamily: "Arial",
      color: 'white',
      fontSize: 16,
      textAlign: 'center'
    },
    lightText: {
      color: '#17547d',
      marginBottom: 20
    }
})