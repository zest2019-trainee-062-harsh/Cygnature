import {AppRegistry} from 'react-native'

AppRegistry.registerComponent('Cygnature', () => AppStackNavigator)

// import React, {Component} from 'react';
// import {AppRegistry} from 'react-native';
// import {Router, Scene, Stack} from 'react-native-router-flux'
// import Login from './src/components/Login/Index'
// import Register from './src/components/Register/Index'
// import SplashScreen from './src/components/SplashScreen/Index';

// class Main extends Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             currentScreen: 'Splash'
//         };
//         setTimeout(() => {
//             console.log('Done some tasks about 3 seconds')
//             this.setState({ currentScreen: 'Login'})
//         }, 3000)
//     }

//     render(){
//         const { currentScreen } = this.state
//         let mainScreen = currentScreen === 'Splash' ? <SplashScreen /> : <Login />
//         return(
//             <Router>
//                 <Stack key="root" >
//                     <Scene key="splash" component={SplashScreen} />
//                     <Scene key="login" title="Login" component={Login} />
//                     <Scene key="register" title="Register" component={Register} />
//                 </Stack>
//             </Router>
//         );
//     }
// }

// AppRegistry.registerComponent('Cygnature', () => Main);