import React, {Component} from 'react';
import {
  AppRegistry, Text, View, StyleSheet, StatusBar, Image
} from 'react-native';

export default class SplashScreen extends Component{
  constructor(props){
    super(props)
    this.state = { timer: 0}
    setInterval(() => {
      this.setState({timer: this.state.timer + 1})
    }, 1000)
  }
  render(){
    return(
      <View style={Styles.container}>
        <StatusBar backgroundColor="#4f6d7a"  barStyle= "light-content"/>
        <View style={Styles.container}>
          <Image
                source={require('../../../img/logo-white.png')}
          />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#414345',
  },
});

AppRegistry.registerComponent('SplashScreen', () => SplashScreen);