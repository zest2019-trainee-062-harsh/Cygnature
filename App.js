import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTPN.js'
import Index from './src/components/Register/Index'
import Dashboard from './src/components/Dashboard/Index.js'
import SplashScreen from './src/components/SplashScreen/Index.js'

import  { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Reg_First: {screen: Index},
  Dashboard: {screen: Dashboard},
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;