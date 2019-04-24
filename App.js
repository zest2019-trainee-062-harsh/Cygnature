import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTP.js'
import Register from './src/components/Register/Index'
import Dashboard from './src/components/Dashboard/Index.js'
import SplashScreen from './src/components/SplashScreen/index.js'
import Account  from './src/components/Account/Index.js';
import Profile  from './src/components/Account/Profile.js';
import Canvas from './src/components/Signature/Canvas.js'
import Image from './src/components/Signature/ImageP.js'
import DocumentDetails from './src/components/Documents/DocumentDetails.js'
import Contacts from './src/components/Contacts/Index.js'
import Forgot_Pass from './src/components/Login/Forgot_Pass.js'
import Document_Upload from './src/components/Documents/DocumentUpload.js'
import Document_Preview from './src/components/Documents/DocumentPreview.js'
import fp from './src/components/fp.js'
import Document_PlaceHolder from './src/components/Documents/DocumentPlaceHolder.js'
import DocumentVerify from './src/components/Verify/Index.js'
import DocumentList from './src/components/Verify/DocumentList.js'
import VerifyDetails from './src/components/Verify/VerifyDetails.js'

const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Register: {screen: Register},
  Dashboard: {screen: Dashboard},
  Account: {screen: Account},
  Profile: {screen: Profile},
  Canvas: {screen: Canvas},
  Image: {screen: Image},
  DocumentDetails: {screen: DocumentDetails},
  Contacts: {screen:Contacts},
  Forgot_Pass: {screen:Forgot_Pass},
  Document_Upload: {screen:Document_Upload},
  Document_Preview: {screen:Document_Preview},
  Document_PlaceHolder: {screen:Document_PlaceHolder},
  DocumentVerify:{screen:DocumentVerify},
  DocumentList : {screen: DocumentList},  
  VerifyDetails : {screen:VerifyDetails},
  fp: {screen:fp}
});


const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;