
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './src/components/Login/Index';
import Login_OTP from './src/components/Login/OTP';
import Register from './src/components/Register/Index';
import Dashboard from './src/components/Dashboard/Index'

export default class App extends Component {
  render() {
    return (
      <View>
        <Dashboard />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
