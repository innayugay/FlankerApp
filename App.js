import React, { useState } from 'react';
import * as Font from 'expo-font';
import Welcome from './screens/welcome';
import { AppLoading } from 'expo';
import Navigator from './routes/homeStack'
// import { Firebase } from './components'

import { StyleSheet, Text, View } from 'react-native';

const getFonts = () => {
  return Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
  })
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

