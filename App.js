import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTP.js'
import Register from './src/components/Register/Index'
import Dashboard from './src/components/Dashboard/Index.js'
import SplashScreen from './src/components/SplashScreen/index.js'
import Settings  from './src/components/Settings/General.js';
import Canvas from './src/components/Canvas/Index.js'
import DocumentDetails from './src/components/Documents/DocumentDetails.js'
<<<<<<< HEAD

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
=======
import Contacts from './src/components/Contacts/Index.js'
import Forgot_Pass from './src/components/Login/Forgot_Pass.js'
import Document_Upload from './src/components/Documents/DocumentUpload.js'
import Document_Preview from './src/components/Documents/DocumentPreview.js'
import fp from './src/components/fp.js'
import Document_PlaceHolder from './src/components/Documents/DocumentPlaceHolder.js'
>>>>>>> 682dc3acb11406a12004f8707a917cefa4324cb0

const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Register: {screen: Register},
  Dashboard: {screen: Dashboard},
  Settings: {screen: Settings},
  Canvas: {screen: Canvas},
  DocumentDetails: {screen: DocumentDetails},
<<<<<<< HEAD
>>>>>>> cf690bfb6acb69e5cc9e5e2d2d25f19989b6a4dc
=======
  Contacts: {screen:Contacts},
  Forgot_Pass: {screen:Forgot_Pass},
  Document_Upload: {screen:Document_Upload},
  Document_Preview: {screen:Document_Preview},
  fp: {screen:fp},
  Document_PlaceHolder: {screen:Document_PlaceHolder},
>>>>>>> 682dc3acb11406a12004f8707a917cefa4324cb0
});

const AppContainer = createAppContainer(AppNavigator);

<<<<<<< HEAD
export default AppContainer;
=======
export default AppContainer;
>>>>>>> cf690bfb6acb69e5cc9e5e2d2d25f19989b6a4dc
