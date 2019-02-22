// import {AppRegistry} from 'react-native'
// import AppNavigator from './src/components/StackNavigator/StackNavigator.js'
// import {name as appName} from './app.json'

// AppRegistry.registerComponent('Cygnature', () => AppNavigator)

/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Login from './src/components/Login/Index'
import {Router, Scene, Stack} from 'react-native-router-flux'
import SplashScreen from './src/components/SplashScreen/index';

class Main extends Component{
    render(){
        return(
            <Router>
                <Stack key="root" >
                <Scene key="splash" component={SplashScreen} />
                {/* <Scene key="login" title="Login" component={Login} />
                <Scene key="register" title="Register" component={Register} /> */}
                </Stack>
            </Router>
        );
    }
}

AppRegistry.registerComponent('Cygnature', () => Main);