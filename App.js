
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
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
