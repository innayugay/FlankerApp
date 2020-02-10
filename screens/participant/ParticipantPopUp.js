import React from 'react';
import { Text, Button, Card } from 'native-base';
import { globalStyles } from '../../styles/global'
import { StyleSheet, View } from 'react-native';

export default class ParticipantPopUp extends React.Component{

    openPopUp = () => {
        
    }
    render(){
        return (
          <View style={styles.container}>
              <Card style={styles.card}>
                <Text> Add a new study </Text>
              </Card>
          </View>
    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // // justifyContent: "center",
        flex: 1,
        marginTop: 100
    },
    header: {
      marginTop: 80,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    //   justifyContent: 'flex-start',
      padding: 5
    },
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 100
    },
    roundButton: {
        borderRadius: 10
    }
})