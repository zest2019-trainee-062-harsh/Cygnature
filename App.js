import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTP.js'
import Register from './src/components/Register/Index'
import Dashboard from './src/components/Dashboard/Index.js'
import SplashScreen from './src/components/SplashScreen/Index'
import  Settings  from './src/components/Settings/General.js';
import Canvas from './src/components/Canvas/Index.js'
import DocumentDetails from './src/components/Documents/DocumentDetails.js'


const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Register: {screen: Register},
  Dashboard: {screen: Dashboard},
  Settings: {screen: Settings},
  Canvas: {screen: Canvas},
  DocumentDetails: {screen: DocumentDetails},
  
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;