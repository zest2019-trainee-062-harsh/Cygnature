import React, {Component} from 'react';
import {
  AppRegistry, Text, View, StyleSheet, StatusBar, Animated, Dimensions, AsyncStorage, Alert
} from 'react-native';

var {height} = Dimensions.get('window')

export default class SplashScreen extends Component{
  static navigationOptions = {
    header: null
  }

  //Initial Animation Values
  state = {
    logoOpacity: new Animated.Value(0),
    titleMarginTop: new Animated.Value(height/2),
    count: {
        awaitingMySign: null,
        awaitingOthers: null,
        completed: null,
        expireSoon: null,
    },
    auth: null,
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
      //this.props.navigation.navigate('Login')
      this.authCheck()
    })
  }

  authCheck = async() =>{
    let auth = await AsyncStorage.getItem('auth');
    let otp = await AsyncStorage.getItem('otp_check');
    if(otp == 'not_present' || otp == null){
        this.props.navigation.navigate('Login')
    }else{
      if(auth == 'not_present' || auth == null){
        this.props.navigation.navigate('Login')
      }else{
        this.state.auth = auth;
        this.getCount();
      }
    }
  }

  getCount() {
    return fetch('http://cygnatureapipoc.stagingapplications.com/api/dashboard/document-counts/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            this.state.count["awaitingMySign"] = responseJson["data"][0]["awaitingMySign"]
            this.state.count["awaitingOthers"] = responseJson["data"][0]["awaitingOthers"]
            this.state.count["completed"] = responseJson["data"][0]["completed"]
            this.state.count["expireSoon"] = responseJson["data"][0]["expireSoon"]
            //this.props.navigation.navigate("Dashboard" ,{"count": this.state.count})
            this.props.navigation.navigate("Canvas")
        })
        .catch((error) => {
          Alert.alert(
            'Session Expired !',
            'Please Re-Login',
            [
                {
                    text: 'Re-Login', onPress: ()=>  this.props.navigation.navigate('Login')
                },
            ],
            {cancelable: true},
        );
         
        });
}

  render(){
    return(
      <View style={Styles.container}>
      <StatusBar backgroundColor="#414345" barStyle="light-content" />
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