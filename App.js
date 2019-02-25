
import React from 'react';
import { Text,View} from 'react-native';
// import Login from './src/components/Login/Index';
// import Login_OTP from './src/components/Login/OTP';
// import Register from './src/components/Register/Index';
// import Routes from './src/Routes.js';
import { createAppContainer,createStackNavigator } from 'react-navigation'
import Screen1 from './src/components/Register/Screen1.js'
import Screen2 from './src/components/Register/Screen2.js'

const AppNavigator = createStackNavigator({
  First: {screen: Screen1},
  Second: {screen: Screen2},
  
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
