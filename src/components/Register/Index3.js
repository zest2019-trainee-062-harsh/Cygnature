import React, {Component} from 'react'
import {StyleSheet,View, Text,TextInput, Button,Image,TouchableHighlight} from 'react-native'
import { Dimensions } from "react-native";
// import ModalPicker from 'react-native-modal-picker';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Register extends Component {

    reg() {
        firstname = "Harsh"
        lastname = "Bhatia"
        email = "yjyjessoss-3179@yopmail.com"
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


            return fetch('http://cygnatureapipoc.stagingapplications.com/api//account/register', {
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

     render() {
         return (
            <View style={styles.container}>
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
                     returnKeyType="next"
                     placeholder="Confirm Password"
                     secureTextEntry={true}
                     placeholderTextColor="gray"
                     underlineColorAndroid='transparent'
                     autoCapitalize="none"
                     autoCorrect={false}
                />
                </View>
                <View style={styles.buttonContainer}>
                    <Button style={styles.signUpText} title="Next" onPress={_ =>this.reg()}/>
                </View>
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
        marginTop:10,
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
        margin: 5,
        fontSize: 22,
        color: '#003d5a'
    },
    buttonContainer: {
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:170, 
        width:1000,
        borderRadius:30,
        backgroundColor: "#718093",
      },
      signUpText: {
        color: '#ffffff',
        textAlign: 'right',
        
      }
})
