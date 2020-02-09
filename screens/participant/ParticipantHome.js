import React from 'react';
import { Text, Button } from 'native-base';
import { globalStyles } from '../styles/global'
import { StyleSheet, View } from 'react-native';

export default class Welcome {

    render(){
        return (
          <View style={styles.container}>
            <View style={styles.header}> 
              <Text style={globalStyles.headerText}> My Studies </Text>
            </View>
          </View>
    
        );
    }
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
    //   alignItems: 'center',
    //   justifyContent: "center",
      padding: 5
    }
})