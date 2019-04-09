import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Text,
  View,
  BackHandler
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Icon from 'react-native-vector-icons/Ionicons'

class fp extends Component {
 constructor(props) {
    super(props);
    this.state.count = this.props.navigation.getParam('count')
  }

  static navigationOptions = {
    header: null
  }

  state = {
    text: "Scan your finger",
    count: null,
  }

  componentDidMount() {
    FingerprintScanner
    .authenticate({ onAttempt: this.handleAuthenticationAttempted })
    .then(() => {
      this.setState({
        text: "Match found."
      })
      // this.props.navigation.navigate('Test')
      this.props.navigation.navigate('Dashboard', {'count': this.state.count})
    })
    .catch((error) => {
      this.state.text = "Match not found. Try again!"
    });
    BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
  }

  componentWillUnmount() {
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
  };

  render() {
    return (
      <View style={{flex:1 ,alignItems: 'center', justifyContent: 'center', backgroundColor: '#414345'}}>
        <Icon name="md-finger-print" color='white' size={100} />
          <Text style={{fontSize:18, color:'white'}}>
            {this.state.text}
          </Text>
      </View>
    );
  }
}

export default fp;