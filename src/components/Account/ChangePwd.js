import React, {Component} from 'react'
import { StyleSheet,Text, View ,TextInput,TouchableOpacity, AsyncStorage, Dimensions} from 'react-native'
 
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modalbox'

import { StackActions, NavigationActions } from 'react-navigation'
import { ProgressDialog } from 'react-native-simple-dialogs'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width

class ChangePwd extends Component {
    constructor(props) {
        super(props);
    }
    
    state = {
        auth:null,
        isChanging: false,
        rmes: "",
        confirmPassword: "",
        errorPass: " ", 
        errorNPass: " ",    
        errorCPass: " ",
        currentPassword:null,
        newPassword:null,
        TIEditable:false,
        buttonDisabled: true,
        buttonOpacity: 0.5,
    }

    componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        let password = await AsyncStorage.getItem('password');
        this.state.currentPassword = password;
        this.state.auth = auth;
       
    }
    show = () => {
        
        this.refs.myModal.open()
    }
    close = () => {
        
        this.refs.myModal.close()
    }

    changePass = async() => {
        this.setState({pdVisible:true})

        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/change-password',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentPassword:this.state.currentPassword,
            newPassword:this.state.newPassword,
            confirmPassword:this.state.newPassword
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({pdVisible:false})

            if(responseJson["message"]== null) {
                alert("Failed")
                this.close()
            } else {
                this.state.rMes=responseJson["message"]
                alert(this.state.rMes)
                
                this.props.parentFlatList.redirect()
                                            
            }
        })
        .catch((error) => {
            console.warn(error.message);
        });
    }

    validations(text, value) {
        switch(value) {

            case "currentPassword":{
                currentPassword = this.state.currentPassword
                if(text == currentPassword) {
                    this.setState({errorPass: " ", TIEditable:true})
                    this.setState({currentPassword: currentPassword})
                }
                else {
                    this.setState({errorPass: "Invalid Password", TIEditable:false})
                }
            return
            }
            
            case "newPassword":{
                password = text
                let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/	 ;
                
                if(reg.test(password) === false)
                    {
                        // console.warn("error")
                        this.setState({errorNPass: "Password must be :- \nAtleast 8 character or longer\n1 UpperCase\n1 LowerCase\n1 Numeric\n1 Special character"})
                    }
                else {
                    this.setState({errorNPass: " "})
                    this.setState({newPassword: password})
                }
            return
            }
                        
            case "confirmPassword":{
                confirmPassword = this.state.newPassword
                if(text == confirmPassword)
                {
                    this.setState({errorCPass: " ", buttonDisabled: false, buttonOpacity: 1.0})
                }
                else {
                    this.setState({errorCPass: "Confirm password not matched"})
                }
            return
            }

        }
    }




     render() {
         return (
            
            <Modal 
                ref={"myModal"}
                style={ styles.modal }
                position= 'center'
                backdrop={true}
                backdropPressToClose={false}
                swipeToClose={false}
            >
            <ProgressDialog
                visible={this.state.pdVisible}
                title="Updating Password!"
                message="Please wait..."
                activityIndicatorColor="#003d5a"
                activityIndicatorSize="large"
                animationType="slide"
            /> 
        <View style={{ margin:10, flex:1, flexDirection: 'row'}}>
            <View style={{flex:0.5,}}>
                <Text style={{marginLeft:4, fontSize: 18,  color: 'black', fontWeight:'bold'}}>Change Password</Text>
            </View>
            <View style={{flex:0.5,alignItems:'flex-end'}}>
                <Icon name="md-close" color='black' size={30} onPress={()=>this.close()} />
            </View>
        </View>
            <TextInput
                style={ styles.textIn }
                placeholder="Enter Current Password *"
                placeholderTextColor='grey'
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => this.validations(text, "currentPassword")}
                secureTextEntry
            />
            {this.state.errorPass==null || this.state.errorPass==" " ?
                null:
                <Text style = { styles.errorText }>{this.state.errorPass}</Text>
            }

            <TextInput
                editable={this.state.TIEditable}
                style={ styles.textIn }
                placeholder="Enter New Password *"
                placeholderTextColor='grey'
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => this.ref1.focus()}
                onChangeText={text => this.validations(text, "newPassword")}
                secureTextEntry
            />
            {this.state.errorNPass==null || this.state.errorNPass==" " ?
                null:
                <Text style = { styles.errorText }>{this.state.errorNPass}</Text>
            }

            <TextInput
                editable={this.state.TIEditable}
                style={ styles.textIn }
                placeholder="Confirm New Password *"
                placeholderTextColor='grey'
                returnKeyType="go"
                autoCapitalize="none"
                autoCorrect={false}
                ref={(input) => this.ref1 = input}
                onChangeText={text => this.validations(text, "confirmPassword")}
                secureTextEntry
            />
            {this.state.errorCPass==null || this.state.errorCPass==" " ?
                null:
                <Text style = { styles.errorText }>{this.state.errorCPass}</Text>
            }

            <TouchableOpacity 
                disabled={this.state.buttonDisabled} 
                style={ [styles.btnSave, {opacity: this.state.buttonOpacity}] } 
                onPress={this.changePass}>
                    <Text style={styles.textSave}>Change Password</Text>
            </TouchableOpacity>

            </Modal>
                )
         }
     }

export default ChangePwd

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'center',
        shadowRadius:20,
        width:'auto',
        height:'auto',
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5
    },
    textIn: {
        height: 40,
        borderBottomColor: '#003d5a',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        borderBottomWidth: 1,
    },
    btnSave: {
        backgroundColor: '#003d5a',
        marginLeft: "33%",
        marginRight: "33%",
        height:40,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
    },
    textSave: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    errorText: {
        color: '#ff0000',
        marginLeft:15,
        marginBottom:15,
        fontSize: 11,
        marginLeft: 30,
    },
})