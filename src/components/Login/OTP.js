import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native'
 
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
class OTP extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        mobileNumber: 977,
        defaultotp: 12345,
        otp: ""
    }

    handleNext(text,value) {
        this.state.otp = this.state.otp + text
        
        switch(value) {
            case 1:
                this.OTPInput1.focus()
                break;
            case 2:
                this.OTPInput2.focus()
                break;
            case 3:
                this.OTPInput3.focus()
                break;
            case 4:
                this.OTPInput4.focus()
                break;                
        }
    }
   
    resendOTP() {
        console.warn("OTP SENDED")
    }

     render() {
         
    var {navigate} = this.props.navigation;
        function checkOTP() {
            if(this.state.otp == this.state.defaultotp) {
                //console.warn("REDIRECT")
                navigate("Reg_First")
            }
            else {
                console.warn("OTP not Match")
            }
        }
    
         return (
             <View style={styles.container}>
                <View  style={styles.logoContainer}>
                    <Image
                    source={require('../../../img/logo.png')}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.boxTitle}>Verify OTP</Text>
                    <Text style={styles.boxSubTitle}>OTP has been sent to :</Text>
                    <Text style={styles.boxNumber}>Mobile Number: {this.state.mobileNumber}</Text>
                    <Text style={styles.boxHeader}>Please enter OTP in the field below</Text>
                    <View style={styles.OTPContainer}>
                        <TextInput  
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType="next"
                        onChangeText={text => this.handleNext(text,1)}
                        underlineColorAndroid='black'
                        placeholderTextColor='black'
                        style={styles.OTPTI} 
                        placeholder="-" 
                        /> 
                        <TextInput    
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType="next"
                        onChangeText={text => this.handleNext(text,2)}
                        ref={(input) => this.OTPInput1 = input}
                        underlineColorAndroid='black'
                        placeholderTextColor='black'
                        style={styles.OTPTI} 
                        placeholder="-" /> 
                        <TextInput
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType="next"
                        onChangeText={text => this.handleNext(text,3)}  
                        ref={(input) => this.OTPInput2 = input}  
                        underlineColorAndroid='black'
                        placeholderTextColor='black'
                        style={styles.OTPTI} 
                        placeholder="-" /> 
                        <TextInput
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType="next"
                        onChangeText={text => this.handleNext(text,4)}  
                        ref={(input) => this.OTPInput3 = input}  
                        underlineColorAndroid='black'
                        placeholderTextColor='black'
                        style={styles.OTPTI} 
                        placeholder="-" /> 
                        <TextInput
                        maxLength={1}
                        keyboardType="numeric"
                        returnKeyType="done"
                        onChangeText={text => this.handleNext(text,5)}  
                        ref={(input) => this.OTPInput4 = input}  
                        underlineColorAndroid='black'
                        placeholderTextColor='black'
                        style={styles.OTPTI} 
                        placeholder="-" /> 
                    </View>
                    <View style={styles.footerContainer}>
                        <TouchableOpacity onPress={_ =>this.checkOTP()} style = { styles.buttonContainer }>
                            <Text style = { styles.buttonText }>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={_ =>this.resendOTP()} style = { styles.buttonContainer }>
                            <Text style = { styles.buttonText }>Resend OTP</Text>
                        </TouchableOpacity>
                    </View>
                </View>
             </View>
                )
         }
     }

export default OTP


const styles = StyleSheet.create({
    container: {
        marginTop:100,
        width: width,
        height: height
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    box: {
        marginTop: 80,
        margin: 20,
        borderColor: 'black',
        borderWidth:1,
    },
    boxTitle: {
        margin: 15,
        fontSize: 22,
        color: '#003d5a',
        fontWeight: 'bold'
    },
    boxSubTitle: {
        marginLeft:15,
        margin: 10,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    boxNumber: {
        marginLeft:20,
        margin: 10,
        fontSize: 16,
        color: 'grey',
    },
    boxHeader: {
        marginTop: 20,
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    OTPContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    OTPTI: {
        textAlign: 'center',
        width: 50,
        margin: 8,  
    },
    footerContainer: {
        flexDirection: 'row',
        marginTop: 40,
        marginBottom: 60,
    },
    buttonContainer: {
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        marginLeft: 20,
        width: 150
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },

})