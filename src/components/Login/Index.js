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
    AsyncStorage
} from 'react-native'

import { CheckBox } from 'react-native-elements'

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Login extends Component {
    constructor(props) {
        super(props)
        this.checkConn()
        //console.warn(this.state.data)
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
    }

    checkConn() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(!isConnected)
            {
                Alert.alert(
                    'Internet Not Connected!',
                    'Please check your connection',
                    [
                        {text: 'OK', onPress: ()=> this.checkConn()},
                    ],
                    {cancelable: true},
                );
            }
        })
    }

    componentWillMount = async() => {
        let stored_email = await AsyncStorage.getItem('email');
        let stored_password = await AsyncStorage.getItem('stored_password');
        if(stored_email != null && stored_password !=null){
            this.state.email = stored_email;
            this.state.password = stored_password;
        }
        BackHandler.addEventListener('hardwareBackPress', this.onBackPressed);
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPressed);
    }

    onBackPressed() {
        Alert.alert(
        'Exit App',
        'Do you want to exit?',
        [
            {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        { cancelable: false });
        return true;
    }

    onChangeCheck() {
        this.setState({ checked: !this.state.checked})
    }

    validate = (text, value) => {
        switch(value) {
            case "email": {
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
                    this.setState({password:text, enable: false})
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
            case "Reg_First":
            this.props.navigation.navigate('Register')
            return

            case "Dashboard":
            this.checkCred()
            this.setState({anim:true})
            if(this.state.val) {
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
                //console.warn(responseJson.data)
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
                    this.state.resData=responseJson.data
                    this.state.data=this.state.resData[0]
                    //console.warn(this.state.data)
                    this.props.navigation.navigate('OTP',{"data":this.state.data});
                    this.state.auth = "Bearer "+this.state.data["token"];
                    
                    AsyncStorage.setItem('auth',this.state.auth);
                    AsyncStorage.setItem('token',this.state.data["token"]);
                    if(this.state.checked == true){
                        AsyncStorage.setItem('email',this.state.email)
                        AsyncStorage.setItem('stored_password',this.state.password)
                    }else{
                        AsyncStorage.setItem('email',null)
                        AsyncStorage.setItem('stored_password',null)
                    }
                }
            })
            .catch((error) => {
                console.warn(error);
            })
            return
        }
    }
    }

    showData = async()=> {
        let auth = await AsyncStorage.getItem('stored_password');
        alert(auth)
    }

    render(){
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
                    {/* <Text style = { styles.boxLabel }>Password</Text> */}
                    <TextInput
                        value={this.state.password}
                        placeholderTextColor='grey'
                        placeholder = "Password"
                        returnKeyType="done"
                        ref={(input) => this.passwordInput = input}
                        onChangeText={text => this.validate(text, "password")}
                        secureTextEntry
                        style= { styles.boxTI }>
                    </TextInput>               
                       
                        <CheckBox
                            title='Remember Me'
                            uncheckedColor="#414345"
                            checkedColor="#6eab52"
                            size={20}
                            checked={this.state.checked}
                            containerStyle={{backgroundColor:'rgba(255,255,255,0.7)'}}
                            onPress={() => this.onChangeCheck()}
                        />

                    {this.state.enable ? 
                        <TouchableOpacity
                        disabled={this.state.enable}
                        onPress={()=> this.call("Dashboard")}
                    // onPress = {() => this.showData()}
                        style = { [styles.buttonContainer, {opacity:0.5} ]}>
                            <Text style = { styles.buttonText }>Login</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity
                        disabled={this.state.enable}
                        onPress={()=> this.call("Dashboard")}
                    // onPress = {() => this.showData()}
                        style = { [styles.buttonContainer, {opacity:1} ]}>
                            <Text style = { styles.buttonText }>Login</Text>
                        </TouchableOpacity>
                    }

                   
                    {this.state.anim ? <ActivityIndicator color="white" size="large" /> : null}
                    <TouchableOpacity onPress={()=> this.call("Reg_First")} style = { styles.buttonContainer }>
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