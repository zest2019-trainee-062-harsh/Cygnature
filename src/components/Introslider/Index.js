import React, {Component}from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Dimensions, AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


var height = Dimensions.get('window').height; //full height

const slides = [
    {
      key: 'somethun',
      title: 'LIVE Cygnature as if signing in-person ',
      //text: '',
      image: require('../../../img/live.png'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'somethun-dos',
      title: 'Title 2',
      text: 'Other cool stuff',
     // image: require('./assets/2.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 'somethun1',
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
     // image: require('./assets/3.jpg'),
      backgroundColor: '#22bcb5',
    }
  ];
 
export default class Introsilder extends Component {

constructor(props) {
  super(props);
  this.state = {

    show_Login: false

  };
}
  static navigationOptions = {
    header:null
}
  _renderNextButton = () => {
    
      <View style={styles.buttonCircle}>
        <Icons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    
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
        <View style={styles.MainContainer}>
 
          {this.props.navigation.navigate('Login')}
   
        </View>
      );
    } else {
      return ( 
        <AppIntroSlider
          slides={slides}
          onDone={this.on_Done_all_slides}
          renderNextButton={this._renderNextButton}
          showSkipButton={true}
          onSkip={this.on_Skip_slides}
        />  
    );
  }
  }
}
const styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain'
    }
  });