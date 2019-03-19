import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTP.js'
import Register from './src/components/Register/Index'
import Dashboard from './src/components/Dashboard/Index.js'
import SplashScreen from './src/components/SplashScreen/index.js'
import  Settings  from './src/components/Settings/General.js';
import Canvas from './src/components/Canvas/Index.js'
import DocumentDetails from './src/components/Documents/DocumentDetails.js'
import Phone from './src/components/Phone/Index.js'
import signature from './src/components/signature/Index.js'


const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Register: {screen: Register},
  Dashboard: {screen: Dashboard},
  Settings: {screen: Settings},
  Canvas: {screen: Canvas},
   //Phone: {screen: Phone}
   DocumentDetails: {screen: DocumentDetails},
 // signature : {screen: signature},
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;