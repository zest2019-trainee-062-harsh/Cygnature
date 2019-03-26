import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTP.js'
import Register from './src/components/Register/Index'
import Dashboard from './src/components/Dashboard/Index.js'
import SplashScreen from './src/components/SplashScreen/index.js'
import Settings  from './src/components/Settings/General.js';
import Canvas from './src/components/Canvas/Index.js'
import DocumentDetails from './src/components/Documents/DocumentDetails.js'
import Contacts from './src/components/Contacts/Index.js'
import Forgot_Pass from './src/components/Login/Forgot_Pass.js'
import Type from './src/components/Type/Fonts'

const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Register: {screen: Register},
  Dashboard: {screen: Dashboard},
  Settings: {screen: Settings},
  DocumentDetails: {screen: DocumentDetails},
  Contacts: {screen:Contacts},
  Forgot_Pass: {screen:Forgot_Pass},
  Canvas :{screen:Canvas},
   // Type : {screen: Type}
});


const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;