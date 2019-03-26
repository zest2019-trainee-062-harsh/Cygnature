import React, { Component } from 'react'
import { Text, View } from 'react-native'
import FontAwesome, {Icons ,IconTypes} from 'react-native-fontawesome';

export default class Fonts extends Component {
  render() {
    return (
      <View>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
            <FontAwesome type={IconTypes.FAR}>{Icons.chevronLeft}</FontAwesome>
            Text
        </Text>
      </View>
    )
  }
}
