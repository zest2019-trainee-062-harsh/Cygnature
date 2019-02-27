
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import Login from './src/components/Login/Index';
import SplashScreen from './src/components/SplashScreen/Index'
export default class App extends Component {
  render() {
    return (
      <View>
        <Login />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
