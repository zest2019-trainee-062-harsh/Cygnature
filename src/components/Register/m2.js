import React, { Component } from 'react'
import {StyleSheet, Text, View ,TextInput, Button,Image,TouchableHighlight} from 'react-native'
import { Dimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Register extends Component {

    constructor(){
        super();
        this.state = {
                pickerData:"",
                countryData:""
        };
    }

    // componentDidMount(){
    //     this.setState({
    //         pickerData: this.phone.getPickerData()
    //     })
    // }
     
    onPressFlag(){
        this.setState({
            pickerData: this.phone.getPickerData(),
            countryData:this.myCountryPicker.open()
        })
       
    }
     
    selectCountry(country){
        this.phone.selectCountry(country.iso2)
    }

  render() {
    return (
      <View style={styles.container}>
                <Text style = { styles.boxTitle }>Company Details</Text>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/2x/new-job.png'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="next"
                     keyboardType="email-address"
                     placeholder="Job Title"
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}
                />
                </View>

                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/2x/new-company.png'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="next"
                     keyboardType="email-address"
                     placeholder="Company Name"
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}
                />
                </View>

                <View style={styles.inputContainer}>
                {/* <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/2x/cell-phone.png'}}/> */}     
                <PhoneInput style= { styles.inputs }
                    ref={(ref) => { this.phone = ref; }}
                    onPressFlag={this.onPressFlag.bind(this)}
                    // ref={(ref) => { this.myCountryPicker = ref; }}
                    // data={this.state.pickerData}
                    // onChange={(country)=>{ this.selectCountry(country) }}
                    // cancelText='Cancel'
                    returnKeyType="next"
                    keyboardType="numeric"
                    placeholder="Phone no"
                    placeholderTextColor="gray"
                    underlineColorAndroid='transparent'
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                
                    
                </View>

                <View style={styles.buttonContainer}>
                    <Button style={styles.signUpText} title="Register" onPress={_ =>this.reg()}/>
                </View>
                {/* <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={}>
                <Text style={styles.signUpText}>Sign up</Text>
                </TouchableHighlight> */}
        
      </View>
    )
  }
}

export default Register

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#7f8fa6',
        width: width,
        height: height,
        resizeMode: 'cover',
        justifyContent:'center',
        alignItems:'center',
    },
    inputContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius:30,
        width:250,
        height:45,
        marginBottom:10,
        marginLeft:20,
        marginRight: 20,
        flexDirection: 'row',
        alignItems:'center',
    },
    inputs: {
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        fontSize: 15,
    },
    inputIcon:{
        width:25,
        height:25,
        marginLeft:15,
        justifyContent: 'center'
      },
    boxTitle:{
        margin: 10,
        fontSize: 22,
        color: '#003d5a'
    },
    buttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:320, 
        width:1000,
        borderRadius:30,
        backgroundColor: "#718093",
      },
      signUpText: {
        color: '#ffffff',
        textAlign: 'right',
        
      }
})