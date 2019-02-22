import React, {Component} from 'react';
import {
  AppRegistry, Text, View, StyleSheet, StatusBar, Animated, Dimensions,
} from 'react-native';
import { italic } from 'ansi-colors';

var {height, width} = Dimensions.get('window')
export default class SplashScreen extends Component{

  state = {
    logoOpacity: new Animated.Value(0),
    titleMarginTop: new Animated.Value(height/2)
  }

  async componentDidMount(){
    //Add animations here
    Animated.sequence([
      //animations by sequence
      Animated.timing(this.state.logoOpacity, {
        toValue: 1,
        duration: 300
      }),
      //Animate Text
      Animated.timing(this.state.titleMarginTop, {
        toValue: 10,
        duration: 800
      })
    ]).start(() => {
      //End of animations
    })
  }
  render(){
    return(
      <View style={Styles.container}>
        <StatusBar backgroundColor="#4f6d7a"  barStyle= "light-content"/>
        <View style={Styles.container}>
          <Animated.Image
                source={require('../../../img/logo-white.png')}
                style={{opacity: this.state.logoOpacity}}
          />
          <View style={{marginLeft: 20}}>
            <Animated.Text style={{ color:"white", marginTop: this.state.titleMarginTop}}>
              <Text>• Authenticate &nbsp; &nbsp;</Text>
              <Text style={{fontStyle: "italic"}}>• Sign&nbsp; &nbsp;</Text>
              <Text>• Protect</Text>
            </Animated.Text>
          </View>
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
