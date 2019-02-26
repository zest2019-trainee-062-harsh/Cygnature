import React, {Component} from 'react'
import {StyleSheet, 
    View,
    Text,
    TextInput, 
    TouchableOpacity, 
    StatusBar,
    Alert, 
    Image, 
    KeyboardAvoidingView} from 'react-native'

import { CheckBox } from 'react-native-elements'
import { Dimensions } from "react-native";

const util = require('util');
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Login extends Component {
    static navigationOptions = {
        header: null
    }

    state = {
        checked: false,
        email: ' ',
        password: ' ',
        val: false
    }
    onChangeCheck() {
        this.setState({ checked: !this.state.checked})
    }

       

    openReg() {
        console.warn("reg")
    }
    validate = (text) => {
        //console.warn(text);
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(text) === false)
        {
        //console.warn("Email is Not Correct");
        //this.setState({email:text})
        return false;
        }
        else {
          this.setState({email:text})
          //console.warn("Email is Correct");
        }
        }
    checkCred() {
        const { email, password, val } = this.state
        console.warn(email,password)

        if(email == null || email == " ") {
            Alert.alert(
                'Error!',
                'Please Enter E-Mail',
                [
                  {text: 'OK', onPress: () => console.warn('OK Pressed')},
                ],
                {cancelable: false},
              );
        }
        else if(password == null || password == " ") {
            Alert.alert(
                'Error!',
                'Please Enter Password',
                [
                  {text: 'OK', onPress: () => console.warn('OK Pressed')},
                ],
                {cancelable: false},
              );
              
        }
    }

        render(){

    var {navigate} = this.props.navigation;
         return (
            
            <KeyboardAvoidingView behavior="padding" style={styles.container}> 
            
            <View style={styles.logoContainer}>
                <Image
                source={require('../../../img/logo.png')}
                />
                <Text style = { styles.boxTitle }>Login to your account</Text>
                  
                
            </View>
            <View style={ styles.formContainer }>
            <View style = { styles.container }>
             <StatusBar
                barStyle="light-content" />
                    <Text style = { styles.boxLabel }>E-Mail</Text>
                    <TextInput 
                    underlineColorAndroid='black'
                    placeholderTextColor='black'
                    placeholder = "Enter your e-mail"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={text => this.validate(text)}
                    style= { styles.boxTI }>
                    </TextInput>
                    <Text style = { styles.boxLabel }>Password</Text>
                    <TextInput 
                    underlineColorAndroid='black'
                    placeholderTextColor='black'
                    placeholder = "Enter your password"
                    returnKeyType="go"
                    ref={(input) => this.passwordInput = input}
                    onChangeText={text => this.setState({password: text})}
                    secureTextEntry={this.state.checked}
                    style= { styles.boxTI }>
                    </TextInput>
                    <CheckBox
                    title='Remeber ME'
                    uncheckedColor='green'
                    checked={this.state.checked}
                    containerStyle={{backgroundColor:'rgba(255,255,255,0.7)'}}
                    onPress={() => this.onChangeCheck()} />
                    <TouchableOpacity onPress={()=> navigate("Dashboard")} style = { styles.buttonContainer }>
                        <Text style = { styles.buttonText }>LOGIN</Text></TouchableOpacity>
                    <TouchableOpacity onPress={()=> navigate("First")} style = { styles.buttonContainer }>
                        <Text style = { styles.buttonText }>New User</Text>
                    </TouchableOpacity>
                    
                   
             </View>
            </View>  
                    
        </KeyboardAvoidingView>
            
                )
            }
        }
        

export default Login

const styles = StyleSheet.create({
    container: {
        padding:40,
        marginBottom: 80
    },
    boxLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    boxTI: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 18
    },
    buttonContainer: {
        backgroundColor: '#718093',
        paddingVertical: 10,
        margin: 5
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    bkImg: {
        width: width,
        height: height,
        resizeMode: 'cover'
    },
    container: {
        backgroundColor: '#7f8fa6',
        width: width,
        height: height
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    boxTitle: {
        margin: 10,
        fontSize: 22,
        color: '#003d5a'
    },

})