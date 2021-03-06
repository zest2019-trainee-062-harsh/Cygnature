import React, {Component} from 'react'
import {
    StyleSheet, 
    View,
    Text,
    TextInput, 
    TouchableOpacity, 
    StatusBar,
    Image, 
    Keyboard,
    Dimensions,
    ScrollView,
    Alert,
    Linking,
} from 'react-native'

import { ProgressDialog } from 'react-native-simple-dialogs';
import { Dropdown } from 'react-native-material-dropdown';
import RNLocation from 'react-native-location';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Register extends Component {
    constructor(props) {
        super(props)
        this.getLoc()
        this.getCode()
        this.keyboardWillShow = this.keyboardWillShow.bind(this)
        this.keyboardWillHide = this.keyboardWillHide.bind(this)
        
    }

    static navigationOptions = {
        header: null
    }

    state = {
        rMes: " ",
        pdVisible: false,
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
        rLat: " ",
        rLon: " ",
        isVisible: true,
        data: [],
        countryCode: [],
            
    }

    getCode() {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/setting/get/', {
            method: 'GET',
            }).then((response) => response.json())
            .then((responseJson) => {
        
                this.setState({data : responseJson["data"][0]["countries"]})
                //console.warn(this.state.data)
                this.state.data.map((y) => {
                    this.state.countryCode.push(y.countryCode)
                })
                
                //console.warn(this.state.countryCode)
            })
            .catch((error) => {
                console.warn(error);
            });
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
                        this.setState({rLon: locations[0]["longitude"], rLat: locations[0]["latitude"] })
                })
              }
              else this.setState({rLon: "-56.062161", rLat: "4.092356" })
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

            case "phone" : {
                this.setState({rPhone: text})
                //console.warn(this.state.rPhone)
                if(this.state.rPhone==" " || this.state.rPhone==null)
                {
                    //this.setState({rPhone: " "})
                } else {
                    this.setState({rPhone: text})
                }
                return
            }
        }
    }
    OTP() {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/send-register-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.rEmail,
                otpSentCount: "1",
                countryId: "91",
                phoneNumber: this.state.rPhone,
            
            }),
            }).then((responseJson) => {
                this.setState({pdVisible: false})
               if(responseJson.status == 200){
                this.verifyUser()
            }
            })
            .catch((error) => {
                console.warn(error.message);
            });
    }


    verifyUser() {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/verify-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.rEmail,
                countryId: "91",
                phoneNumber: this.state.rPhone,
                otp: "123456"
            
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({pdVisible: false})
                if(responseJson["message"] == null) {
                    Alert.alert(
                        'Registration Failed!',
                        'Try Again',
                        [
                        {text: 'OK'},
                        ],
                        {cancelable: true},
                    );
                }
                else {
                    this.state.rMes=responseJson["message"]
                    //console.warn(this.state.data)
                    this.props.navigation.navigate('Login',{"message":this.state.rMes})
                }

                console.warn(responseJson)
            })
            .catch((error) => {
                console.warn(error.message);
            });

    }
    
    register(){
        console.warn(this.state.countryCode
            )
        const { register } = this.state
        if (register == null) {

        } else {
            // console.warn(this.state.rFname)
            // console.warn(this.state.rLname)
            // console.warn(this.state.rEmail)
            // console.warn(this.state.rPassword)
            // console.warn(register)

                //API
                this.setState({pdVisible: true})
               
                return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: this.state.rFname,
                    lastname: this.state.rLname,
                    email: this.state.rEmail,
                    password: this.state.rPassword,
                    confirmPassword: this.state.rPassword,
                    countryId: this.state.countryCode,
                    phoneNumber: this.state.rPhone,
                    userLatitude: this.state.rLat,
                    userLongitude: this.state.rLon,
                
                }),
                }).then((responseJson) => {
                    if(responseJson.status == 200) {
                        //this.state.rMes=responseJson["message"]
                        this.OTP()
                        //console.warn(this.state.data)
                        //this.props.navigation.navigate('Login',{"message":this.state.rMes})
                    }

                    //console.warn(responseJson["message"])
                })
                .catch((error) => {
                    console.warn(error);
                });
            }
        }
    
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove()
    this.keyboardWillHideSub.remove()
  }

  keyboardWillShow = event => {
    this.setState({
      isVisible: false
    })
  }

  keyboardWillHide = event => {
    this.setState({
      isVisible: true
    })
  }
  onChangeHandler = (value) => {     
    // console.warn("Selected value = ", value);
    this.setState({countryCode: value.replace(/[^0-9]/g, '')})
    //console.warn(this.state.countryCode);   
}

    render(){
        return(
            <View behavior="padding" style={styles.maincontainer}>
             <View style={{flex:0.90, justifyContent:'center'}}>
            
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
            <ProgressDialog
                visible={this.state.pdVisible}
                title="Registering !"
                message="Please wait..."
                activityIndicatorColor="#6eab52"
                activityIndicatorSize="large"
                animationType="slide"
            />

            <ScrollView>
                <View style = { styles.container }>
                    <StatusBar
                        barStyle="#414345" />
                        <TextInput
                            placeholderTextColor='black'
                            placeholder = "First Name *"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => this.REGInput1.focus()}
                            onChangeText={text => this.validations(text, "fname")}
                            style= { styles.boxTI }>
                        </TextInput>

                        {this.state.errorFName==null || this.state.errorFName==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorFName}</Text>
                        }

                        <TextInput
                            placeholderTextColor='black'
                            placeholder = "Last Name *"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput1 = input}
                            onSubmitEditing={() => this.REGInput2.focus()}
                            onChangeText={text => this.validations(text, "lname")}
                            style= { styles.boxTI }>
                        </TextInput>
                        {this.state.errorLName==null || this.state.errorLName==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorLName}</Text>
                        }

                        <TextInput
                            placeholderTextColor='black'
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
                            placeholderTextColor='black'
                            placeholder = "Password *"
                            returnKeyType="go"
                            ref={(input) => this.REGInput3 = input}
                            onSubmitEditing={() => this.REGInput4.focus()}
                            onChangeText={text => this.setState({password: text})}
                            onChangeText={text => this.validations(text, "password")}
                            secureTextEntry
                            style= { styles.boxTI }>
                        </TextInput>
                        {this.state.errorPass==null || this.state.errorPass==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorPass}</Text>
                        }

                        <TextInput
                            placeholderTextColor='black'
                            placeholder = "Confirm Password *"
                            returnKeyType="go"
                            ref={(input) => this.REGInput4 = input}
                            onSubmitEditing={() => this.REGInput5.focus()}
                            onChangeText={text => this.setState({password: text})}
                            onChangeText={text => this.validations(text, "cpassword")}
                            secureTextEntry
                            style= { styles.boxTI }>
                        </TextInput>
                        {this.state.errorCPass==null || this.state.errorCPass==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorCPass}</Text>
                        }

                        {/*
                        <TextInput
                            placeholderTextColor='black'
                            placeholder = "Job Title"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput5 = input}
                            onSubmitEditing={() => this.REGInput6.focus()}
                            style= { styles.boxTI }>
                        </TextInput>

                        <TextInput
                            placeholderTextColor='black'
                            placeholder = "Company Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput6 = input}
                            onSubmitEditing={() => this.REGInput7.focus()}
                            style= { styles.boxTI }>
                        </TextInput>
                        */}
                        <View style={{flexDirection:'row'}}>

                        <Dropdown 
                            containerStyle={{
                                flex:0.2,
                                backgroundColor: 'rgba(255,255,255,0.7)',
                                paddingHorizontal: 10,
                                borderRadius: 30,
                                height:50,
                                borderBottomColor: 'rgba(255,255,255,0.7)',
                            }}
                            itemTextStyle={{
                                textAlign:'center'
                            }}
                            value={"+91"}
                            dropdownOffset={{top:15, left:0}}
                            data = {this.state.data}
                            fontSize = {14}
                            selectedItemColor = "black"
                            disabledItemColor = "grey"
                            valueExtractor = {({countryCode}) => countryCode}
                            onChangeText = {value => this.onChangeHandler(value)}
                        />
        
                        <TextInput
                            placeholderTextColor='black'
                            keyboardType="numeric"
                            placeholder = "Phone Number *"
                            returnKeyType="done"
                            autoCapitalize="none"
                            autoCorrect={false}
                            maxLength={10}
                            onChangeText={text => this.validations(text, "phone")}
                            //ref={(input) => this.REGInput7 = input
                            ref={(input) => this.REGInput5 = input
                            }
                            style= {[ styles.boxTI, {flex:0.8, marginLeft:10}] }>
                        </TextInput>
                        </View>

                        <Text style={ styles.boxDisc }>
                        By Clicking on 'Register' Button , You agree to the 
                        <Text style={{textDecorationLine: 'underline'}}
                        onPress={() => Linking.openURL('https://account.cygnature.io/Terms-Condition')}> Terms & Conditions </Text> 
                         and  
                        <Text style={{textDecorationLine: 'underline'}}
                        onPress={() => Linking.openURL('https://account.cygnature.io/Privacy-Policy')}> Privacy Policy </Text> .
                        </Text>
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
                </View>
                {this.state.isVisible?
                <View style={{flex:0.1, borderTopColor: 'white', borderTopWidth: 1}}>
                <TouchableOpacity 
                    onPress={()=> this.props.navigation.navigate('Login')} 
                    style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style = {{ color: 'white' }}>Already have account? Login</Text>
                </TouchableOpacity>
                </View>:null}
        </View>
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
        fontSize: 14,
        borderRadius: 30,
        fontFamily: 'Helvetica'
    },
    buttonContainer: {
        backgroundColor: '#6eab52',
        paddingVertical: 10,
        marginLeft: "50%",
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
        fontSize: 14,
    },
    bkImg: {
        width: width,
        height: height,
        resizeMode: 'cover'
    },
    maincontainer: {
        backgroundColor: '#003d5a',
        width: width,
        height: height,
        flex:1,
    },
    logoContainer: {
        marginTop:20,
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    boxTitle: {
        margin: 10,
        fontSize: 22,
        color: '#003d5a'
    },
    boxDisc: {
        color: 'white',
        fontSize: 14,
        margin: 5,
        marginLeft: 15,
    },
})