import Login from '../Login/Index'
import { createStackNavigator, createAppContainer } from "react-navigation";
import SplashScreen from '../SplashScreen/Index';

const StackNavigator = createStackNavigator({
    //Screens
    Splash: {
        screen: SplashScreen
    },
    Login: {
        screen: Login
    }
}, {
    //settings
    initialRouteName: 'SplashScreen'
});

const App = createAppContainer(StackNavigator)
export default App