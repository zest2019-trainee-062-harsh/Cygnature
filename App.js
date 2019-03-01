import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTP.js'
import Screen1 from './src/components/Register/Screen1.js'
import Screen2 from './src/components/Register/Screen2.js'
import Dashboard from './src/components/Dashboard/Dashboard.js'
import SplashScreen from './src/components/SplashScreen/Index.js'

const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Reg_First: {screen: Screen1},
  Reg_Second: {screen: Screen2},
  Dashboard: {screen: Dashboard},
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;