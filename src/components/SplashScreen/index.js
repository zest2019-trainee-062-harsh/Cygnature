import React, {Component} from 'react';
import {
  AppRegistry, Text, View, StyleSheet, StatusBar, Animated, Dimensions
} from 'react-native';

//Getting device heigth and width
var {height} = Dimensions.get('window')

export default class SplashScreen extends Component{
  static navigationOptions = {
    header: null
  }

  //Initial Animation Values
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
        duration: 500
      }),
      //Animate Text
      Animated.timing(this.state.titleMarginTop, {
        toValue: 10,
        duration: 1000
      })
    ]).start(() => {
      //End of animations
      this.props.navigation.navigate('OTP')
    })
  }

  render(){
    return(
      <View style={Styles.container}>
      <StatusBar
                backgroundColor="#414345"
                    barStyle="light-content" />
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

//Styling
const Styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#414345',
  },
});

AppRegistry.registerComponent('SplashScreen', () => SplashScreen);