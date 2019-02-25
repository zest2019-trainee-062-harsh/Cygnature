import React, {Component} from 'react'
import {View, Text, TouchableOpacity,TextInput, StyleSheet, Image,} from 'react-native'
import { StackNavigator } from 'react-navigation'
const util = require('util');

import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height


class Screen1 extends Component {
    static navigationOptions = {
        header: null
    }

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

    next() {
        const { register } = this.state
        console.warn("REDIRECT - UI 2")
        if (register == null) {
            console.warn("Check user failed")
        } else {
            console.warn(register)
        }
    }

     render() {

        var {navigate} = this.props.navigation;
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
                     onChangeText={text => this.checkuser(text)}
                     autoCorrect={false}
                />
                </View>
                <View>
                {this.state.register ? <Text style={styles.boxTitle} title="ERROR"/> : null}
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
                <TouchableOpacity onPress={_ => this.next()} onPress={()=> navigate("Second")} style={{backgroundColor:'blue', margin: 10}}>
                <Text style={styles.signUpText}>Next</Text>
                </TouchableOpacity>
            </View>
            
            </View>
        </View>
                )
         }
     }

export default Screen1

const styles = StyleSheet.create({
    container: {
        marginTop: -110,
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
    error: {
        color: 'red'
    },
    inputs: {
    
        height:height,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
        fontSize: 20,
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
        backgroundColor: "#833471",
        
      },
      signUpText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize:25,
        width:110,
        height:50,
        textAlignVertical: 'center',
        
      }
})