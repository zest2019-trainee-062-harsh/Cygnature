import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTP.js'
import Register from './src/components/Register/Index'
import Dashboard from './src/components/Dashboard/Index.js'
import SplashScreen from './src/components/SplashScreen/index.js'
import  Settings  from './src/components/Settings/General.js';
import Canvas from './src/components/Canvas/Index.js'
import DocumentDetails from './src/components/Documents/DocumentDetails.js'

<<<<<<< HEAD
import React from 'react';
import {Text,View} from 'react-native';
import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Loginscreen.js'
import Screen1 from './src/components/Register/Screen1.js'
import Screen2 from './src/components/Register/Screen2.js'
import Dash from './src/components/Dashboard/Dash.js'

const AppNavigator = createStackNavigator({
  Login: {screen: Loginscreen},
  First: {screen: Screen1},
  Second: {screen: Screen2},
  Dashboard: {screen: Dash},  
=======

const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Register: {screen: Register},
  Dashboard: {screen: Dashboard},
  Settings: {screen: Settings},
  Canvas: {screen: Canvas},
  DocumentDetails: {screen: DocumentDetails},
>>>>>>> cf690bfb6acb69e5cc9e5e2d2d25f19989b6a4dc
});

const AppContainer = createAppContainer(AppNavigator);

<<<<<<< HEAD
export default AppContainer;
=======
export default AppContainer;
>>>>>>> cf690bfb6acb69e5cc9e5e2d2d25f19989b6a4dc
