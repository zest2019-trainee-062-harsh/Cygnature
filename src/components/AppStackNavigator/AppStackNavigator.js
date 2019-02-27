import Login from '../Login/Index'
import SplashScreen from '../SplashScreen/Index';
import { createStackNavigator, createAppContainer } from 'react-navigation';
const AppNavigator = createStackNavigator({
    //Screens
    Splash: {
        screen: SplashScreen,
    },
    Login: {
        screen: Login
    }
}, {
    //settings
    initialRouteName: 'Splash'
})

export default createAppContainer(AppNavigator)