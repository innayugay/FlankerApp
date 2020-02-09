import React, { useState } from 'react';
import * as Font from 'expo-font';
import Welcome from './screens/welcome';
import { AppLoading } from 'expo';
import Navigator from './routes/homeStack'
// import { Firebase } from './components/Firebase'
import * as firebase from 'firebase';
import { StyleSheet, Text, View } from 'react-native';

const getFonts = () => {
  return Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
  })
}
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  var firebaseConfig = {
    apiKey: "AIzaSyBCpJLgiv65YgY88uGYu8vkeOzhu-x_ufY",
    authDomain: "flanker-app.firebaseapp.com",
    databaseURL: "https://flanker-app.firebaseio.com",
    projectId: "flanker-app",
    storageBucket: "flanker-app.appspot.com",
    messagingSenderId: "293095063595",
    appId: "1:293095063595:web:ab70ce97e36d632b48aa6e",
    measurementId: "G-KZSTC17J17"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  




  if(fontsLoaded){
    return (
      <Navigator/>
      // <Welcome/>
    );
  } 
  else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=> setFontsLoaded(true)}
      />
    )
  }
  
}

