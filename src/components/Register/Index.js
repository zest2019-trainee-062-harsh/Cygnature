import React, {Component} from 'react'
import {
    StyleSheet, 
    View,
    Text,
    TextInput, 
    TouchableOpacity, 
    StatusBar,
    Image, 
    KeyboardAvoidingView,
    Dimensions,
    ScrollView,
    Alert
} from 'react-native'

import RNLocation from 'react-native-location';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Register extends Component {
    constructor(props) {
        super(props)
        this.getLoc()
    }

    static navigationOptions = {
        header: null
    }

    state = {
        register: null,
        message: '',
        enable: true,
        errorEmail: "Email already exists",
        errorFName: " ",
        errorLName: " ",   
        errorPass: " ",   
        errorCPass: " ",
        rFname: " ",
        rLname: " ",
        rEmail: " ", 
        rPassword: " ",
        rPhone: " ",
            
    }

    getLoc() {
        RNLocation.configure({
            distanceFilter: 100, // Meters
            desiredAccuracy: {
              ios: "best",
              android: "balancedPowerAccuracy"
            },
            // Android only
            androidProvider: "auto",
            maxWaitTime: 5000, // Milliseconds
            // iOS Only
            activityType: "other",
            allowsBackgroundLocationUpdates: false,
            headingFilter: 1, // Degrees
            headingOrientation: "portrait",
            pausesLocationUpdatesAutomatically: false,
            showsBackgroundLocationIndicator: false,
        })

        RNLocation.requestPermission({
            ios: "whenInUse",
            android: {
              detail: "coarse"
            }
          }).then(granted => {
              if (granted) {
                this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
                    // console.warn(locations[0]["longitude"])
                    // console.warn(locations[0]["latitude"])
                })
              }
            })
    }

    validations(text, value)
    {
        switch(value) {

            case "fname": {
                name= text
                let reg = /^([a-zA-z\s]{0,32})$/ ;
            
                if(reg.test(name) === false)
                {
                    // console.warn("error")
                    this.setState({errorFName: "Only alphabets allows"})
                }
                else {
                    this.setState({errorFName: " "})
                    this.setState({rFname: name})
                }
                break
            }
                

            case "lname": {
                name= text
                let reg = /^([a-zA-z\s]{0,32})$/ ;
            
                if(reg.test(name) === false)
                {
                    // console.warn("error")
                    this.setState({errorLName: "Only alphabets allows"})
                }
                else {
                    this.setState({errorLName: " "})
                    this.setState({rLname: name})
                }
            break
            }
            
            case "email":{
                email= text
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        
                if(reg.test(email) === false)
                {
                    //console.warn("error")
                    return false;
                } else {
                    this.setState({email:email})
                    return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/check-user-exists/'+(email), {
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
                            if(this.state.register === true) {
                                this.setState({enable: true})
                            } else {                                
                                this.setState({enable: false})
                                this.setState({rEmail: email})
                            }
                    })
                    .catch((error) => {
                        console.warn(error);
                    });
        }
                return
            }

            case "password":{
                password= text
                let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/	 ;
                
                if(reg.test(password) === false)
                    {
                        // console.warn("error")
                        this.setState({errorPass: "Password must be :- \nAtleast 8 character or longer\n1 UpperCase\n1 LowerCase\n1 Numeric\n1 Special character"})
                    }
                else {
                    this.setState({errorPass: " "})
                    this.setState({rPassword: password})
                }
            return
            }
            
            
            case "cpassword":{
                cpassword= text

                if((cpassword) === this.state.rPassword)
                {
                    //console.warn("match")
                    this.setState({errorCPass: " "})
                }
                else {
                    this.setState({errorCPass: "Confirm password not matched"})
                }
            return
            }
        }
    }
    
    register(){
        const { register } = this.state
        if (register == null) {

        } else {
            // console.warn(this.state.rFname)
            // console.warn(this.state.rLname)
            // console.warn(this.state.rEmail)
            // console.warn(this.state.rPassword)
            // console.warn(register)

            if(this.state.errorFName==" ")
            {
                console.warn("yes")
            }
        }
    }

    render(){
        var {navigate} = this.props.navigation
        const {state} = this.props.navigation;
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
                        barStyle="#414345" />
                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "First Name *"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => this.REGInput1.focus()}
                            onChangeText={text => this.validations(text, "fname")}
                            style= { styles.boxTI }>
                        </TextInput>

                        {this.state.errorFName==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorFName}</Text>
                        }

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Last Name *"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput1 = input}
                            onSubmitEditing={() => this.REGInput2.focus()}
                            onChangeText={text => this.validations(text, "lname")}
                            style= { styles.boxTI }>
                        </TextInput>
                        {this.state.errorLName==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorLName}</Text>
                        }

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Email *"
                            returnKeyType="next"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput2 = input}
                            onSubmitEditing={() => this.REGInput3.focus()}
                            onChangeText={text => this.validations(text, "email")}
                            style= { styles.boxTI }>
                        </TextInput>
                        
                        {this.state.register ?
                        <Text style = { styles.errorText }>{this.state.errorEmail}</Text> :
                        null
                        }

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Password *"
                            returnKeyType="go"
                            ref={(input) => this.REGInput3 = input}
                            onSubmitEditing={() => this.REGInput4.focus()}
                            onChangeText={text => this.setState({password: text})}
                            onChangeText={text => this.validations(text, "password")}
                            secureTextEntry
                            style= { styles.boxTI }>
                        </TextInput>
                        {this.state.errorPass==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorPass}</Text>
                        }

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Confirm Password *"
                            returnKeyType="go"
                            ref={(input) => this.REGInput4 = input}
                            onSubmitEditing={() => this.REGInput5.focus()}
                            onChangeText={text => this.setState({password: text})}
                            onChangeText={text => this.validations(text, "cpassword")}
                            secureTextEntry
                            style= { styles.boxTI }>
                        </TextInput>
                        {this.state.errorCPass==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorCPass}</Text>
                        }

                        {/*
                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Job Title"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput5 = input}
                            onSubmitEditing={() => this.REGInput6.focus()}
                            style= { styles.boxTI }>
                        </TextInput>

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Company Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput6 = input}
                            onSubmitEditing={() => this.REGInput7.focus()}
                            style= { styles.boxTI }>
                        </TextInput>
                        */}
                        <TextInput
                            placeholderTextColor='grey'
                            keyboardType="numeric"
                            placeholder = "Phone Input *"
                            returnKeyType="go"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={10}
                            //ref={(input) => this.REGInput7 = input
                            ref={(input) => this.REGInput5 = input
                            
                            }
                            style= { styles.boxTI }>
                        </TextInput>

                        {this.state.enable ? 
                        <TouchableOpacity disabled={this.state.enable} onPress={()=> this.register()} 
                        style = { [styles.buttonContainer, {opacity:0.5} ]}>
                            <Text style = { styles.buttonText }>Register</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity disabled={this.state.enable} onPress={()=> this.register()} 
                        style = { [styles.buttonContainer, {opacity:1} ]}>
                            <Text style = { styles.buttonText }>Register</Text>
                        </TouchableOpacity>
                        }
                    
                    </View>
                    </ScrollView>
                </View>
        </KeyboardAvoidingView>
        )
    }
}

export default Register

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
        backgroundColor: '#6eab52',
        paddingVertical: 10,
        marginLeft: "55%",
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    errorText: {
        color: '#ff0000',
        marginLeft:15,
        marginBottom:15,
        fontSize: 11,
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
    }
})