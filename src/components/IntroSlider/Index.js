import React from 'react';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Text, StatusBar, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
 
const slides = [
  {
    key: 'Screen 1',
    title: 'Signing Documents',
    text: 'Sign with Electronic Signature\nSign with Digital Signature\nGuest Signing',
    icon: 'md-tablet-portrait',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'Screen 2',
    title: 'Sending Documents for Signing',
    text: 'Extensive document file type support\nDocument Tracking\nAdvanced Document Options',
    icon: 'md-send',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'Screen 3',
    title: 'Security',
    text: 'Security and Blockchain\nCertificate of Completion\nTwo-factor OTP Authentication\nTwo step Verification',
    icon: 'md-lock',
    colors: ['#29ABE2', '#4F00BC'],
  },
];
 
export default class Index extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
    
        show_Login: false
    
      };
    }

    static navigationOptions = {
        header: null
    }

  _renderItem = props => (
    <LinearGradient
      style={[styles.mainContent, {
        paddingTop: props.topSpacer,
        paddingBottom: props.bottomSpacer,
        width: props.width,
        height: props.height,
      }]}
      colors={props.colors}
      start={{x: 0, y: .1}} end={{x: .1, y: 1}}
    >
     <StatusBar backgroundColor='#003d5a' barStyle="light-content" />
      <Ionicons style={{ backgroundColor: 'transparent' }} name={props.icon} size={200} color="white" />
      <View>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </LinearGradient>
  );

  _renderNextButton = () => {
    return (
       <View style={styles.buttonCircle}>
        <Icons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  on_Done_all_slides = () => {
    this.setState({ show_Login: true });
    AsyncStorage.setItem('isIntroDisable','TRUE');
  };

  on_Skip_slides = () => {
    this.setState({ show_Login: true });
    AsyncStorage.setItem('isIntroDisable','TRUE');
  };
  
  render() {
    if (this.state.show_Login) {
        return (
          <View >
   
            {this.props.navigation.navigate('Login')}
     
          </View>
        );
      } else {
        return ( 
          <AppIntroSlider
            slides={slides}
            renderItem={this._renderItem}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
            onDone={this.on_Done_all_slides}
            showSkipButton={true}
            onSkip={this.on_Skip_slides}
          />  
      );
  }
}
}