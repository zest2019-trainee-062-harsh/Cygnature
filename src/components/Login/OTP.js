import React, {Component} from 'react'
import {
    View, Text, StyleSheet, Image, TextInput, TouchableOpacity, StatusBar, ScrollView, KeyboardAvoidingView,
    AsyncStorage
} from 'react-native'
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
class OTP extends Component {
    constructor(props) {
        super(props)
        this.state.data  = this.props.navigation.getParam('data');
        this.state.mobileNumber = this.state.data["phoneNumber"]
        //console.warn(data)
    }

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        this.state.auth = auth;
        this.getCount()
    }

    static navigationOptions = {
        header: null
    }

    state = {
        mobileNumber: null,
        defaultotp: 12345,
        otp: "",
        data: { },
        token: null,
        auth: null,
        count: {
            awaitingMySign: null,
            awaitingOthers: null,
            completed: null,
            expireSoon: null,
        },
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
            
                //this.state.count = responseJson["data"]
                //console.warn(responseJson["data"][0]["awaitingMySign"])
                this.state.count["awaitingMySign"] = responseJson["data"][0]["awaitingMySign"]
                this.state.count["awaitingOthers"] = responseJson["data"][0]["awaitingOthers"]
                this.state.count["completed"] = responseJson["data"][0]["completed"]
                this.state.count["expireSoon"] = responseJson["data"][0]["expireSoon"]
                //console.warn(this.state.count)
            })
            .catch((error) => {
                console.warn(error);
            });
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
    checkOTP() {
        if(this.state.otp == this.state.defaultotp) {
            AsyncStorage.setItem('opt_check','done');
            this.props.navigation.navigate("Dashboard" ,{"data":this.state.data, "count": this.state.count, "auth": this.state.auth})
        }
        else {
            AsyncStorage.setItem('opt_check','not_present');
            console.warn("OTP does not Match")
        }
    }

    resendOTP() {
        console.warn("OTP Sent")
    }

     render() {
        var {navigate} = this.props.navigation;
         return (
            <KeyboardAvoidingView behavior="padding">
             <View style={styles.container}>
                <StatusBar
                    backgroundColor="#6eab52"
                    barStyle="light-content" 
                />
                <View  style={styles.logoContainer}>
                    <Image
                    source={require('../../../img/logo-white.png')}
                    />
                     <View style={{marginLeft: 20}}>
                    <Text style={{ color:"white"}}>
                        <Text>• Authenticate &nbsp; &nbsp;</Text>
                        <Text style={{fontStyle: "italic"}}>• Sign&nbsp; &nbsp;</Text>
                        <Text>• Protect</Text>
                    </Text>
                </View>
                </View>
                <View style={styles.box}>
                    <ScrollView>
                        <Text style={styles.boxTitle}>Verify OTP</Text>
                        <Text style={styles.boxSubTitle}>OTP has been sent to :{this.state.mobileNumber}</Text>
                        <Text style={styles.boxHeader}>Please enter OTP in the field below</Text>
                        <View style={styles.OTPContainer}>
                            <TextInput  
                                maxLength={1}
                                keyboardType="numeric"
                                returnKeyType="next"
                                onChangeText={text => this.handleNext(text,1)}
                                underlineColorAndroid='white'
                                placeholderTextColor='white'
                                style={styles.OTPTI} 
                                placeholder="-" 
                            /> 
                            <TextInput    
                                maxLength={1}
                                keyboardType="numeric"
                                returnKeyType="next"
                                onChangeText={text => this.handleNext(text,2)}
                                ref={(input) => this.OTPInput1 = input}
                                underlineColorAndroid='white'
                                placeholderTextColor='white'
                                style={styles.OTPTI} 
                                placeholder="-"
                            /> 
                            <TextInput
                                maxLength={1}
                                keyboardType="numeric"
                                returnKeyType="next"
                                onChangeText={text => this.handleNext(text,3)}  
                                ref={(input) => this.OTPInput2 = input}  
                                underlineColorAndroid='white'
                                placeholderTextColor='white'
                                style={styles.OTPTI} 
                                placeholder="-"
                            /> 
                            <TextInput
                                maxLength={1}
                                keyboardType="numeric"
                                returnKeyType="next"
                                onChangeText={text => this.handleNext(text,4)}  
                                ref={(input) => this.OTPInput3 = input}  
                                underlineColorAndroid='white'
                                placeholderTextColor='white'
                                style={styles.OTPTI} 
                                placeholder="-"
                            />
                            <TextInput
                                maxLength={1}
                                keyboardType="numeric"
                                returnKeyType="done"
                                onChangeText={text => this.handleNext(text,5)}  
                                ref={(input) => this.OTPInput4 = input}  
                                underlineColorAndroid='white'
                                placeholderTextColor='white'
                                style={styles.OTPTI} 
                                placeholder="-"
                            />
                        </View>
                        <View style={styles.footerContainer}>
                            <View style={{flex: 0.5, alignItems: "center"}}>
                                <TouchableOpacity onPress={_ =>this.checkOTP()} style = { styles.buttonContainer }>
                                    <Text style = { styles.buttonText }>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex: 0.5, alignItems: "center"}}>
                                <TouchableOpacity onPress={_ =>this.resendOTP()} style = { styles.buttonContainer }>
                                    <Text style = { styles.buttonText }>Resend OTP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
             </View>
             </KeyboardAvoidingView>
                )
         }
     }

export default OTP


const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "#414345",
        fontFamily: "Helvetica"
    },
    logoContainer: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: height*0.2
    },
    box: {
        margin: 20,
        borderColor: 'white',
        borderWidth:1,
    },
    boxTitle: {
        margin: 15,
        fontSize: 22,
        color: 'white',
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
        color: 'white',
    },
    boxHeader: {
        marginTop: 20,
        fontSize: 16,
        color: 'white',
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
        color:'white', 
    },
    footerContainer: {
        marginTop: 40,
        marginBottom: 60,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonContainer: {
        backgroundColor: '#6eab52',
        borderRadius: 5,
        paddingVertical: 10,
        padding: 10,
        width: 100,
        marginBottom: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },

})