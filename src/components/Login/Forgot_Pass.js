import React, {Component} from 'react'
import {View,Keyboard,Text,StyleSheet,Dimensions,TouchableOpacity,TextInput} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { ProgressDialog } from 'react-native-simple-dialogs';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
class Forgot_Pass extends Component {
    constructor(props) {
        super(props)
        
        this.keyboardWillShow = this.keyboardWillShow.bind(this)
        this.keyboardWillHide = this.keyboardWillHide.bind(this)
    }
    static navigationOptions = {
        header: null
    }

    state = {
        email: null,
        errorB: false,
        errorName: "Enter correct email format",
        pdVisible: false,
        isVisible: true,

    }
    
    validate = (text, value) => {
        switch(value) {
            case "email": {
                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
                if(reg.test(text) === false){
                    //console.warn("Email is Not Correct")
                    this.setState({errorB: true})
                    return false;
                }else {
                        this.setState({email:text, errorB: false})
                        //console.warn("Email is Correct");
                }
                return
            }
        }
    }
    
    reset(){
        //console.warn("yes")
        //API

            this.setState({pdVisible: true})

           return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/forgot-password',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                //console.warn(responseJson)
                if(responseJson["message"] == null )
                {
                    this.setState({ pdVisible:false, errorName: responseJson["errors"]["Account"][0], errorB: true })
                }
                else{
                    this.setState({ pdVisible:false })
                    console.warn(responseJson["message"])
                }
            })
            .catch((error) => {
                console.warn(error);
            });
        
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

     render() {
         return (
            <View behavior="padding" style={styles.maincontainer}>

            <ProgressDialog
                visible={this.state.pdVisible}
                title="Helping you !"
                message="Please wait..."
                activityIndicatorColor="#6eab52"
                activityIndicatorSize="large"
                animationType="slide"
            />

            <View style={{flex:0.90, justifyContent:'center'}}>
                <View style={{alignItems: 'center'}}> 
                    <View style={{alignItems: 'center', justifyContent: 'center', borderColor: '#6eab52', width:130, height:130, borderWidth: 3, borderRadius: 130/2}}>
                    <Icon name="md-lock" color='white' size={80} /></View>
                    <Text style={[styles.text, {color: '#6eab52'}]}> Forgot Password </Text>
                    <Text style={[styles.text, {fontWeight: '100', fontSize: 16}]}>
                    Enter your email and we will send you password reset link
                    </Text>

                </View>

                <TextInput
                        placeholderTextColor='grey'
                        placeholder = "Enter Email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                        onChangeText={text => this.validate(text, "email")}
                        style= { styles.boxTI }>
                </TextInput>
                {this.state.errorB==null || this.state.errorB==" " ?
                         null:
                         <Text style = { styles.errorText }>{this.state.errorName}</Text>
                }
                <TouchableOpacity
                        onPress={()=> this.reset()} 
                        style = { styles.buttonContainer}>
                            <Text style = { styles.buttonText }>Reset Password</Text>
                        </TouchableOpacity>
                

            </View>
            {this.state.isVisible?
             <View style={{flex:0.1, borderTopColor: 'white', borderTopWidth: 1}}>
             <TouchableOpacity 
                    onPress={()=> this.props.navigation.navigate('Login')} 
                    style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style = {{ color: 'white' }}>Back to Login</Text>
            </TouchableOpacity>
             </View>:null}

             </View>
                )
         }
     }

export default Forgot_Pass

const styles = StyleSheet.create({
    maincontainer: {
        backgroundColor: '#414345',
        width: width,
        height: height,
        flex: 1,
    },
    text: {
        margin:10,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
    },
    boxTI: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 20,
        margin: 20,
        fontSize: 12,
        borderRadius: 30,
        fontFamily: 'Helvetica'
    },
    buttonContainer: {
        backgroundColor: '#6eab52',
        paddingVertical: 10,
        marginLeft: 120,
        marginRight: 120,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    errorText: {
        color: '#ff0000',
        marginLeft:20,
        marginBottom:15,
        fontSize: 11,
    },
})