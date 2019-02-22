
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './src/components/Login/Index';
import Register from './src/components/Register/Index';

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
