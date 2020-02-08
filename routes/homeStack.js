import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { createAppContainer } from 'react-navigation';
import Welcome from '../screens/welcome';
import ResearcherLogIn from '../screens/researcher/ResearcherLogIn';
import ParticipantLogIn from '../screens/participant/ParticipantLogIn';
import ParticipantSignUp from '../screens/participant/ParticipantSignUp';
import ResearcherSignUp from '../screens/researcher/ResearcherSignUp';


const screens = {
  // Welcome: {
  //   screen: Welcome,
  // },
  // ResearcherLogIn: {
  //   screen: ResearcherLogIn,
  // },
  // ParticipantLogIn:{
  //   screen: ParticipantLogIn
  // }
  Welcome,
  ResearcherLogIn,
  ParticipantLogIn,
  ResearcherSignUp,
  ParticipantSignUp
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
