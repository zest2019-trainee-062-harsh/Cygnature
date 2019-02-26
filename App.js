
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './src/components/Login/Index';
import Login_OTP from './src/components/Login/OTP';
import Register from './src/components/Register/Index';
import Dashboard from './src/components/Dashboard/Index'

import { createStore } from 'redux'
import { Provider } from 'react-redux'


const intialState = {
  fname: ""
}
const reducer = (state = intialState, action ,text) => {
  switch(action.type)
  {
    
    case 'Reg_FName':
      return { fname: text}
  }
  return state
}
const store = createStore(reducer)


export default class App extends Component {
  render() {
    return (
      <View>
        <Provider store={store}>
          <Register />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
