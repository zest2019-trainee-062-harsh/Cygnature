import Login from '.Login/Login'
import SplashScreen from './SplashScreen/SplashScreen';
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