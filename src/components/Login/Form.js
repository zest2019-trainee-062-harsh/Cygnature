import React, {Component} from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, StatusBar, Button} from 'react-native'
import { CheckBox } from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

 
class Form extends Component {
 
    state = {
        email: ' ',
        password: ' '
    }

    openReg() {
        console.warn("reg")
    }

    checkCred() {
        const { email, password } = this.state
        console.warn(email,password)

        
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
        });
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
                    onChangeText={text => this.setState({email: text})}
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
                    secureTextEntry
                    style= { styles.boxTI }>
                    </TextInput>
                    <TouchableOpacity onPress={_ =>this.checkCred()} style = { styles.buttonContainer }>
                        <Text style = { styles.buttonText }>LOGIN</Text>
                    </TouchableOpacity>
                    <CheckBox
                    title="Remember ME"/>
                     <TouchableOpacity onPress={Actions.register} style = { styles.buttonContainer }>
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
        marginBottom: 50
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
        paddingVertical: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})