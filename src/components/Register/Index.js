import React, {Component} from 'react'
import {View, Text, TouchableOpacity,TextInput, StyleSheet, Image,} from 'react-native'

import { Dimensions } from "react-native";
// import ModalPicker from 'react-native-modal-picker';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


class Register extends Component {

    state = {
        register: null,
        message: ''
    }

    checkuser(text) {
        ema= text

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        
        if(reg.test(ema) === false)
        {
        return false;
        }
        else {
            this.setState({email:ema})
         
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/check-user-exists/'+(ema), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
        .then((responseJson) => {
           
            bva=responseJson["data"]
            message=responseJson["message"]
            this.setState({register: bva[0], message: message})
            //console.warn(this.state.register)
            
        })
        .catch((error) => {
            console.warn(error);
        });
    }
    }
    reg() {
       

        if(this.state.register ==  true)
        {
            console.warn(this.state.message)
        }
        else
        {
            console.warn("REgistring")
            firstname = "Harsh"
        lastname = "Bhatia"
        email = this.state.email
        password = "Test@123"
        confirmPassword = "Test@123"
        jobTitle = "intern"
        companyName = "cygnet"
        countryId = "91"
        phoneNumber = "8905003200"
        userLatitude = "4.092356",
        userLongitude = "-56.062161",
        userAgent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0 Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0",
        userTimeZoneOffSet = "+05:30"

        console.warn(firstname,lastname,email,password,confirmPassword,jobTitle,countryId,
            phoneNumber,userLatitude,userLongitude,userAgent,userTimeZoneOffSet)


            return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                jobTitle: jobTitle,
                companyName: companyName,
                countryId: countryId,
                phoneNumber: phoneNumber,
                userLatitude: userLatitude,
                userLongitude: userLongitude,
                userAgent: userAgent,
                userTimeZoneOffSet: userTimeZoneOffSet
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.warn(responseJson["message"])
            
        })
        .catch((error) => {
            console.warn(error);
        });


        }
        

    }


     render() {
         return (
             


<View style={{flex: 1}}>
            <View style={{width: width, height: height - 90}}>
            
            <View style={styles.container}>
            
            <Image
                source={require('../../../img/logo.png')}
                />
            <Text style = { styles.boxTitle }>Personal Details</Text>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="next"
                     keyboardType="email-address"
                     placeholder="First Name"
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}

                />
                </View>
                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="next"
                     keyboardType="email-address"
                     placeholder="Last Name"
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}
                     
                />
                </View>

                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="next"
                     keyboardType="email-address"
                     placeholder="Email"
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}
                />
                </View>

                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="next"
                     placeholder="Password"
                     secureTextEntry={true}
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}
                />
                </View>

                <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/ultraviolet/2x/password.png'}}/>
                <TextInput style= { styles.inputs }
                     returnKeyType="done"
                     placeholder="Confirm Password"
                     secureTextEntry={true}
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}
                />
                </View>
            </View>
            </View>{/* Main container end */}


            <View style={{width: width, height: 200}}>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{backgroundColor:'blue'}}>
    <Text style={styles.signUpText}>Next</Text>
</TouchableOpacity>
                </View>
            
            </View>
        </View>
                )
         }
     }

export default Register

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A3CB38',
        width: width,
        height: height,
        resizeMode: 'cover',
        justifyContent:'center',
        alignItems:'center',
        flex: 1
    },
    inputContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius:40,
        width:width,
        height:45,
        marginBottom:10,
        marginTop:10,
        flexDirection: 'row',
        alignItems:'center',
    },
    inputs: {
        height:height,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width:width,
        backgroundColor: "#718093",
        
      },
      signUpText: {
        color: '#ffffff',
        textAlign: 'center',
        width:110,
        height:70,
        textAlignVertical: 'center'
        
      }
})