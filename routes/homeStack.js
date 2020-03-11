import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Welcome from '../screens/welcome';
import ResearcherLogIn from '../screens/researcher/ResearcherLogIn';
import ParticipantLogIn from '../screens/participant/ParticipantLogIn';
import ParticipantSignUp from '../screens/participant/ParticipantSignUp';
import ResearcherSignUp from '../screens/researcher/ResearcherSignUp';
import ParticipantHome from '../screens/participant/ParticipantHome';
import ResearcherHome from '../screens/researcher/ResearcherHome';
import ResearcherStudyDetails from '../screens/researcher/ResearcherStudyDetails';
import ParticipantStudyDetails from '../screens/participant/ParticipantStudyDetails';
import Instructions from '../screens/participant/Instructions';
import FlankerTask from '../screens/participant/FlankerTask';
import Questionnaire from '../screens/participant/Questionnaire';
import ThankYou from '../screens/participant/ThankYou';
import StudyResults from '../screens/researcher/StudyResults';




// // home stack navigator screens
// const HomeStack = createStackNavigator(screens);

const HomeStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  ResearcherLogIn: {
    screen: ResearcherLogIn,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  ParticipantLogIn:{
    screen: ParticipantLogIn,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  ResearcherSignUp: {
    screen: ResearcherSignUp,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  ParticipantSignUp:{
    screen: ParticipantSignUp,
    navigationOptions: () => ({
      headerShown: false
    })
  }
})

const ParticipantStack = createSwitchNavigator ({
  MyStudies: {
    screen: ParticipantHome,
    navigationOptions: () => ({
      title: 'Home',
      headerShown: true
    }),
  },
  StudyDetails: {
    screen: ParticipantStudyDetails,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  Instructions:{
    screen: Instructions,
    navigationOptions: ()=> ({
      headerShown: false
    })
  },
  FlankerTask: {
    screen: FlankerTask
  },
  Questionnaire:{
    screen: Questionnaire
  },
  ThankYou: {
    screen: ThankYou
  }
})

const ResearcherStack = createSwitchNavigator ({
  MyStudies: {
    screen: ResearcherHome,
    navigationOptions: () => ({
      headerShown: false
    }),
  },
  StudyDetails: {
    screen: ResearcherStudyDetails,
    navigationOptions: () => ({
      headerShown: true
    })
  },
  StudyResults: {
    screen: StudyResults,
  }
})

const AppStack = createStackNavigator({
  LoginFlow: {
    screen: HomeStack,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  ParticipantFlow: {
    screen: ParticipantStack,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  ResearcherFlow: {
    screen: ResearcherStack,
    navigationOptions: () => ({
      headerShown: false
    })
  }

})

export default createAppContainer(AppStack);
