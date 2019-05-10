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
    ScrollView,
    ActivityIndicator,
    BackHandler,
    NetInfo,
    AsyncStorage,
    Keyboard,
    KeyboardAvoidingViewBase
} from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { CheckBox } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Login extends Component {
    constructor(props) {
        super(props)
        this.checkConn()
        this.keyboardWillShow = this.keyboardWillShow.bind(this)
        this.keyboardWillHide = this.keyboardWillHide.bind(this)
        
    }
    
    static navigationOptions = {
        header: null
    }

    state = {
        checked: false,
        email: null,
        password: null,
        val: false,
        anim: false,
        enable: true,
        resData: {  },
        data: {  },
        auth: [],
        opacity: 0.5,
        isVisible: true,
        passwordIconName: "toggle-on",
        passwordSecureTextEntry: true
    }

    checkConn() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(!isConnected)
            {
                Alert.alert(
                    'Internet Not Connected!',
                    'Please check your connection',
                    [
                        {
                            text: 'OK', onPress: ()=> this.checkConn()
                        },
                    ],
                    {cancelable: true},
                );
            }
        })
    }

    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    // }

    // componentWillUnmount(){
    //     BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    // }

    // onBackPressed() {
    //     Alert.alert(
    //     'Exit App',
    //     'Do you want to exit?',
    //     [
    //         {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //         {text: 'Yes', onPress: () => BackHandler.exitApp()},
    //     ],
    //     { cancelable: false });
    //     return true;
    // }

    onChangeCheck() {
        this.setState({ checked: !this.state.checked}) 
    }

    validate = (text, value) => {
        switch(value) {
            case "email": {
                this.setState({email:text})
                //console.warn(text);
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
                if(reg.test(text) === false){
                //console.warn("Email is Not Correct");
                //this.setState({email:text})
                  this.setState({enable: true})
                    return false;
                }else {
                    if(this.state.password==null || this.state.password.trim()=="" || this.state.password.length==0) {
                        //console.warn("no")
                        this.setState({enable: true})
                    }
                    
                        this.setState({email:text})
    
                  //console.warn("Email is Correct");
                }
                return
            }
            case "password": { 
                this.setState({password: text})
                if(this.state.password==" ") {
                    //console.warn("no")
                    this.setState({enable: true})
                }
                else {
                    this.setState({password:text, enable: false, opacity: 1})
                    //console.warn(this.state.password)
                }
                return
            }
        }
    }

    checkCred(){
        const { email, password, val } = this.state
//        console.warn(password)

        if(email == null || email == " ") {
            Alert.alert(
                'Error!',
                'Please Enter E-Mail',
                [
                  {text: 'OK', onPress: () => this.setState({anim:false})},
                ],
                {cancelable: true},
              );
        }
        else {
            this.setState({val: true})
        }
        if(password == null || password == " ") {
            Alert.alert(
                'Error!',
                'Please Enter Password',
                [
                    {text: 'OK', onPress: () => this.setState({anim:false})},
                ],
                {cancelable: true},
            );
        }
        else {
            this.setState({val: true})
        }
        
    }

    call(text) {
        switch(text){
            
            case "Register":
            this.props.navigation.navigate('Register')
            return

            case "Forgot_Pass": 
            this.props.navigation.navigate('Forgot_Pass')
            return

            case "Login":
            setTimeout( () => {
                if(this.state.checked) {
                    AsyncStorage.setItem('email',this.state.email);
                    AsyncStorage.setItem('password',this.state.password);
                } 
            }, 500);
            this.checkCred()
            this.setState({anim:true})
            if(this.state.val) {
                //this.setState({opacity: 1})
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                
                this.setState({anim:false})
                //console.warn(responseJson)
                //console.warn(responseJson["license"]["expired"])
               
                if(responseJson.data == null) {
                    Alert.alert(
                        'Login Failed!',
                        'Please Check Email/Password',
                        [
                        {text: 'OK'},
                        ],
                        {cancelable: true},
                    );
                }
                else {
                    if(responseJson["license"]["expired"]) {
                        AsyncStorage.setItem('isExpired','true')
                    } else  AsyncStorage.setItem('isExpired','false')
                    this.state.resData=responseJson.data
                    this.state.data=this.state.resData[0]
                    //console.warn(this.state.data)
                    this.state.auth = "Bearer "+this.state.data["token"];
                    AsyncStorage.setItem('auth',this.state.auth);
                    AsyncStorage.setItem('token',this.state.data["token"]);
                    AsyncStorage.setItem('userId',this.state.data["userId"]);
                    this.props.navigation.navigate('OTP',{"data":this.state.data});
                }
            })
            .catch((error) => {
                console.warn(error.message);
            })
            return
        }
    }
    }

  componentWillMount= async() => {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow)
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide)
    
    let email = await AsyncStorage.getItem('email');
    let password = await AsyncStorage.getItem('password');
    
    if(!(email == null || password == null)) {
        this.setState({enable:false, opacity: 1.0, email: email, password: password})
    }
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

    render(){
        return(
            
            <KeyboardAvoidingView behavior='padding'  style={styles.maincontainer}>
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

            <ScrollView>
            <View style = { styles.container }>
                <StatusBar backgroundColor="#6eab52" barStyle="light-content" />
                    {/* <Text style = { styles.boxLabel }>E-Mail</Text> */}

                    <TextInput
                        value={this.state.email}
                        placeholderTextColor='grey'
                        placeholder = "Email"
                        returnKeyType="next"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={text => this.validate(text, "email")}
                        style= { styles.boxTI }>
                    </TextInput>

                    <View style={[styles.boxTI, {justifyContent:'center', alignItems: 'center', flex:1, flexDirection: 'row'}]}>
                        <TextInput
                            value={this.state.password}
                            placeholderTextColor='grey'
                            placeholder = "Password"
                            returnKeyType="done"
                            ref={(input) => this.passwordInput = input}
                            onChangeText={text => this.validate(text, "password")}
                            secureTextEntry={this.state.passwordSecureTextEntry}
                            style={{flex:0.87}}
                        />
                        <Icon
                            style={{flex:0.13}}
                            name={this.state.passwordIconName}
                            size={30}
                            color='black'
                            onPress= {()=> {
                                    if(this.state.passwordSecureTextEntry){
                                        this.setState({passwordIconName:"toggle-off", passwordSecureTextEntry: false})
                                    } 
                                    else {
                                        this.setState({passwordIconName:"toggle-on", passwordSecureTextEntry: true})
                                    }
                            
                                }
                            }
                        />  
                    </View>

                    <View style={{flex:1, flexDirection: 'row'}}>
                        <CheckBox
                            title='Remember Me'
                            textStyle={{color: 'white'}}
                            uncheckedColor="white"
                            checkedColor="#6eab52"
                            size={20}
                            checked={this.state.checked}
                            containerStyle={{flex:1 , borderColor:'#414345' , backgroundColor:'rgba(255,255,255,0)'}}
                            onPress={() => this.onChangeCheck()}
                        />
                        <TouchableOpacity 
                            onPress={()=> this.call("Forgot_Pass")} 
                            style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style = { styles.buttonText }>Forgot Password?</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.anim ? <ActivityIndicator color="white" size="large" /> : null}

                    {this.state.enable ?
                    <TouchableOpacity
                        disabled={this.state.enable}
                        onPress={()=> this.call("Login")}
                        style = { [styles.buttonContainer, {opacity:this.state.opacity} ]}>
                            <Text style = { styles.buttonText }>Login</Text>
                        </TouchableOpacity> : 
                        <TouchableOpacity
                        disabled={this.state.enable}
                        onPress={()=> this.call("Login")}
                        style = { [styles.buttonContainer, {opacity:this.state.opacity} ]}>
                            <Text style = { styles.buttonText }>Login</Text>
                        </TouchableOpacity>
                    }

                   
                    
                    </View>
                    </ScrollView>
                    </View>
                    </View>
                    
                    {this.state.isVisible?
                    <View style={{flex:0.1, borderTopColor: 'white', borderTopWidth: 1}}>
                    
                   <TouchableOpacity 
                    onPress={()=> this.call("Register")}
                    style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style = {{ color: 'white' }}>Create an account</Text>
                    </TouchableOpacity>
                    </View>:null}
                
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
        fontSize: 14,
        borderRadius: 30,
        fontFamily: 'Helvetica'
    },
    buttonContainer: {
        backgroundColor: '#6eab52',
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
        height: height,
        flex:1 ,
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