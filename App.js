import { createAppContainer,createStackNavigator } from 'react-navigation'
import Loginscreen from './src/components/Login/Index.js'
import OTP from './src/components/Login/OTP.js'
import Register from './src/components/Register/Index'
import Dashboard from './src/components/Dashboard/Index.js'
import SplashScreen from './src/components/SplashScreen/Index'
import  Settings  from './src/components/Settings/General.js';


<<<<<<< HEAD
export default class App extends Component {
  render() {
    return (
      <View>
        <Register />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
=======
const AppNavigator = createStackNavigator({
  SplashScreen: {screen: SplashScreen},
  Login: {screen: Loginscreen},
  OTP: {screen: OTP},
  Register: {screen: Register},
  Dashboard: {screen: Dashboard},
  Settings: {screen: Settings},
>>>>>>> 945c2b972489f1ab271be38bf525633ace59e8fb
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;