import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {Router,Stack,Scene} from 'react-native-router-flux'
import Index from './src/components/Login/Index'
// import Index from './src/components/Register/Index'

export default class Routes extends Component {
  render() {
    return (
      <Router>
          <Stack key="root">
            <Scene key="login" component={Index} title="Login"></Scene>
            <Scene key="register" component={Index} title="Register"></Scene>
          </Stack>
      </Router>
    )
  }
}
