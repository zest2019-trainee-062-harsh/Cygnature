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
import SplashScreen from './src/components/SplashScreen/Index';

class Main extends Component{
    render(){
        return(
            <View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Cygnature', () => Main);