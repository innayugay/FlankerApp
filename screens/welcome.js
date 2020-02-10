import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../styles/global'
import { StyleSheet, View } from 'react-native';

export default function Welcome({navigation}) {

    return (
      <View style={styles.container}>
        <View style={styles.header}> 
          <Text style={globalStyles.headerText}> Welcome to the Flanker App! </Text>
          <Text style={globalStyles.lightText}> What best describes you? </Text>
        </View>

          {/* <Button style={globalStyles.button}> 
            <Text style={globalStyles.buttonText} onPress={() => navigation.push('ResearcherLogIn')}>I am a researcher</Text> 
          </Button>
          <Button style={globalStyles.button}> 
            <Text style={globalStyles.buttonText} onPress={() => navigation.push('ParticipantLogIn')}> I am a participant</Text> 
          </Button> */}
          <Button style={globalStyles.button}> 
            <Text style={globalStyles.buttonText} onPress={() => navigation.navigate('ResearcherLogIn')}>I am a researcher</Text> 
          </Button>
          <Button style={globalStyles.button}> 
            <Text style={globalStyles.buttonText} onPress={() => navigation.navigate('ParticipantLogIn')}> I am a participant</Text> 
          </Button>
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
    }
})