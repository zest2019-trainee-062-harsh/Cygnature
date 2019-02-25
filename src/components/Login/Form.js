import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar, Alert} from 'react-native'
import { CheckBox } from 'react-native-elements'
import { Actions } from 'react-native-router-flux'

 
class Form extends Component {
 
    state = {
        checked: false,
        email: ' ',
        password: ' ',
        val: false
    }
    onChangeCheck() {
        this.setState({ checked: !this.state.checked})
    }

    newuser(){
        Actions.login()
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
        /*
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            console.warn(responseJson.data)
            
        })
        .catch((error) => {
            console.warn(error);
        });*/
    }

    render() {
         return (
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
                    <TouchableOpacity onPress={_ =>this.checkCred()} style = { styles.buttonContainer }>
                        <Text style = { styles.buttonText }>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.newuser} onPress={_ =>this.openReg()} style = { styles.buttonContainer }>
                        <Text style = { styles.buttonText }>New User</Text>
                    </TouchableOpacity>  
             </View>
                )
         }
     }

export default Form


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
})