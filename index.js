/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import Login from './src/components/Login/Index'
import SplashScreen from './src/components/SplashScreen/Index'
import {Router, Scene, Stack} from 'react-native-router-flux'
import Register from './src/components/Register/Index';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {currentScreen: 'Splash'};
        setTimeout(() => {
            console.log('Done some tasks about 3 seconds')
            this.setState({ currentScreen: 'Login'})
        }, 3000)
    }
    render(){
        return(
            <Router>
                <Stack key="root" >
                {/* <Scene key="splash" component={SplashScreen} /> */}
                <Scene key="login" title="Login" component={Login} />
                <Scene key="register" title="Register" component={Register} />
                </Stack>
            </Router>
        );
        // const { currentScreen } = this.state;
        // return mainScreen = currentScreen === 'Splash' ? <SplashScreen /> : <Login />
        // return mainScreen
    }
}

AppRegistry.registerComponent('Cygnature', () => Main);