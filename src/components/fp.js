import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Text,
  View,
  BackHandler
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Icon from 'react-native-vector-icons/Ionicons'
import { StackActions, NavigationActions } from 'react-navigation'

class fp extends Component {
 constructor(props) {
    super(props);
    
  }

  static navigationOptions = {
    header: null
  }

  state = {
    text: "Scan your finger",
    attemptCounter: 3
  }

  componentDidMount() {
    // FingerprintScanner
    // .isSensorAvailable()
    // .then(biometryType => console.log(biometryType))
    // .catch(error => console.warn(error.message));

    FingerprintScanner
    .authenticate({ onAttempt: this.handleAuthenticationAttempted })
    .then(() => {
      this.setState({
        text: "Match found."
      })
      // this.props.navigation.navigate('Test')
      //this.props.navigation.navigate('Dashboard')
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Dashboard'})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    })
    .catch((error) => {
      this.state.text = "Match not found. Try again!"
    });
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
  }

  componentWillUnmount() {
    //console.warn("FP UM")
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    FingerprintScanner.release();
  }

  onBackPressed() {
    Alert.alert(
    'Exit App',
    'Do you want to exit?',
    [
      {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
    ],
    { cancelable: false });
    return true;
  }

  handleAuthenticationAttempted = (error) => {
    alert("Match not found. Try again!")
    this.state.text = "Match not found. Try again!"
    this.setState({attemptCounter: this.state.attemptCounter-1})
    if(this.state.attemptCounter == 0) {
      //console.warn("err")
      BackHandler.exitApp()
    }
  };

  render() {
    return (
      <View style={{flex:1 ,alignItems: 'center', justifyContent: 'center', backgroundColor: '#003d5a'}}>
        <Icon name="md-finger-print" color='white' size={100} />
          <Text style={{fontSize:18, color:'white'}}>
            {this.state.text}
          </Text>
          <Text style={{fontSize:18, color:'white'}}>
            Remaining Attempt(s): {this.state.attemptCounter}
          </Text>
      </View>
    );
  }
}

export default fp;