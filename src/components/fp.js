import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import Icon from 'react-native-vector-icons/Ionicons'


class fp extends Component {
 constructor(props) {
    super(props);
  }
  state = {
    text: "Scan your finger",
  }

  componentDidMount() {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(() => {
        this.setState({ text: "Fingerprint Authentication" });

      })
      .catch((error) => {
        this.setState({ text: error.message });
      });
  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = (error) => {
    this.setState({ text: error.message });
    
  };

  render() {

    return (
      <View style={{flex:1 ,alignItems: 'center', justifyContent: 'center'}}>

        <Icon name="md-finger-print" color='black' size={100} />
        
          <Text style={{fontSize:18, color: 'black', fontWeight: 'bold'}}>
            {this.state.text}
          </Text>
  
      </View>
    );
  }
}


export default fp;