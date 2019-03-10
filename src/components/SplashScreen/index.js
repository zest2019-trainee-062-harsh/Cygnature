import React, {Component} from 'react';
import {
<<<<<<< HEAD
  AppRegistry, Text, View, StyleSheet, StatusBar, Animated, Dimensions,
} from 'react-native';
import { italic } from 'ansi-colors';

var {height, width} = Dimensions.get('window')
export default class SplashScreen extends Component{

=======
  AppRegistry, Text, View, StyleSheet, StatusBar, Animated, Dimensions
} from 'react-native';

//Getting device heigth and width
var {height} = Dimensions.get('window')

export default class SplashScreen extends Component{
  static navigationOptions = {
    header: null
  }

  //Initial Animation Values
>>>>>>> KrishalS
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
<<<<<<< HEAD
        duration: 300
=======
        duration: 500
>>>>>>> KrishalS
      }),
      //Animate Text
      Animated.timing(this.state.titleMarginTop, {
        toValue: 10,
<<<<<<< HEAD
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
=======
        duration: 1000
      })
    ]).start(() => {
      //End of animations
      this.props.navigation.navigate('Login')
    })
  }

  render(){
    return(
      <View style={Styles.container}>
      <StatusBar
                backgroundColor="#414345"
                    barStyle="light-content" />
>>>>>>> KrishalS
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

<<<<<<< HEAD
=======
//Styling
>>>>>>> KrishalS
const Styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#414345',
  },
});

<<<<<<< HEAD
AppRegistry.registerComponent('SplashScreen', () => SplashScreen);
=======
AppRegistry.registerComponent('SplashScreen', () => SplashScreen);
>>>>>>> KrishalS
