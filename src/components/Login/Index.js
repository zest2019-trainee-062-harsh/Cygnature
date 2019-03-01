import React, {Component} from 'react'
import {StyleSheet, 
    View,
    Text,
    TextInput, 
    TouchableOpacity, 
    StatusBar,
    Alert, 
    Image, 
    KeyboardAvoidingView,
    Dimensions,
    ScrollView
} from 'react-native'

import { CheckBox } from 'react-native-elements'

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
        val: false,
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
        if(reg.test(text) === false){
        //console.warn("Email is Not Correct");
        //this.setState({email:text})
            return false;
        }
        else{
          this.setState({email:text})
          //console.warn("Email is Correct");
        }
    }

    checkCred(){
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
        var {email, password} = this.state;
        function call(text) {
            switch(text){
                case "Reg_First":
                navigate('Reg_First', {name: ' '})
                return

                case "Dashboard":
                return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/login',{
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
                    //console.warn(responseJson.data)
                    if(responseJson.data == null) {
                        Alert.alert(
                            'Login Failed!',
                            'Please Check Email/Password',
                            [
                            {text: 'OK'},
                            ],
                            {cancelable: false},
                        );
                    }
                    else {
                        console.warn("Redirecting")
                        navigate('Dashboard')
                    }
                    
                })
                .catch((error) => {
                    console.warn(error);
                })
                return
            }
        }
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.maincontainer}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../../img/logo-white.png')}
                />
                <View style={{marginLeft: 20}}>
                    <Text style={{ color:"white", marginTop: this.state.titleMarginTop}}>
                        <Text>• Authenticate &nbsp; &nbsp;</Text>
                        <Text style={{fontStyle: "italic"}}>• Sign&nbsp; &nbsp;</Text>
                        <Text>• Protect</Text>
                    </Text>
                </View>
            </View>

            <View style={ styles.formContainer }>

            <ScrollView>
            <View style = { styles.container }>
                <StatusBar
                    barStyle="light-content" />
                    {/* <Text style = { styles.boxLabel }>E-Mail</Text> */}
                    <TextInput
                        placeholderTextColor='grey'
                        placeholder = "Email"
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={text => this.validate(text)}
                        style= { styles.boxTI }>
                    </TextInput>
                    {/* <Text style = { styles.boxLabel }>Password</Text> */}
                    <TextInput
                        placeholderTextColor='grey'
                        placeholder = "Password"
                        returnKeyType="go"
                        ref={(input) => this.passwordInput = input}
                        onChangeText={text => this.setState({password: text})}
                        secureTextEntry
                        style= { styles.boxTI }>
                    </TextInput>

                    {/* 
                        Remember ME
                        <CheckBox
                            title='Remember Me'
                            uncheckedColor='green'
                            checked={this.state.checked}
                            containerStyle={{backgroundColor:'rgba(255,255,255,0.7)'}}
                            onPress={() => this.onChangeCheck()}
                        />
                    */}

                    <TouchableOpacity onPress={()=> call("Dashboard")} style = { styles.buttonContainer }>
                        <Text style = { styles.buttonText }>Login</Text>
                    </TouchableOpacity>
                    <Text style = { styles.boxLabel }>New Here?</Text>
                    <TouchableOpacity onPress={()=> call("Reg_First")} style = { styles.buttonContainerNew }>
                        <Text style = { styles.buttonText }>Create an account</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
        padding:30,
        marginBottom: 70
    },
    boxLabel: {
        fontSize: 18,
        fontStyle: 'italic',
        color: 'white',
        textAlign: 'center'
    },
    boxTI: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        marginBottom: 15,
        fontSize: 12,
        borderRadius: 30,
        fontFamily: 'Helvetica'
    },
    buttonContainer: {
        backgroundColor: 'green',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5
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
    maincontainer: {
        backgroundColor: '#414345',
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
    buttonContainerNew: {
        backgroundColor: 'forestgreen',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5
    }
})