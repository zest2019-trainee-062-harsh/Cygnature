
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './src/components/Login/Index';
import Login_OTP from './src/components/Login/OTP';
import Register from './src/components/Register/Index';

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
  
});
