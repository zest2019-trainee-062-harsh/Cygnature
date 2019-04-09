import React, { Component } from 'react'
import { StyleSheet,Text, View ,TextInput,TouchableOpacity,KeyboardAvoidingView,AsyncStorage} from 'react-native'

export default class ChangePassword extends Component { 

    constructor(props) {
        super(props);
    
        this.state = {
            auth:null,
          newPassword: "",
          currentPassword: "",
          isChanging: false,
          confirmPassword: "",
          errorPass: " ",   
          errorCPass: " ",
          password:null,
        };
      }
      componentWillMount = async() =>{
        let auth = await AsyncStorage.getItem('auth');
        let password = await AsyncStorage.getItem('password');
        this.state.password = password;
        this.state.auth = auth;
       
    }
      validations(text, value) {
        switch(value) {

            case "currentPassword":{
                oldpassword= text
                let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/	 ;
                
                if(reg.test(oldpassword) === false && this.state.password !== oldpassword)
                    {
                        // console.warn("error")
                        this.setState({errorPass: "Password must be :- \nAtleast 8 character or longer\n1 UpperCase\n1 LowerCase\n1 Numeric\n1 Special character"})
                    }
            
                else {
                    this.setState({errorPass: " "})
                    this.setState({currentPassword: oldpassword})
                }
            return
            }
            
            case "newPassword":{
                password= text
                let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/	 ;
                
                if(reg.test(password) === false)
                    {
                        // console.warn("error")
                        this.setState({errorPass: "Password must be :- \nAtleast 8 character or longer\n1 UpperCase\n1 LowerCase\n1 Numeric\n1 Special character"})
                    }
                else {
                    this.setState({errorPass: " "})
                    this.setState({newPassword: password})
                }
            return
            }
            
            
            case "confirmpassword":{
                confirmpassword= text

                if((confirmpassword) === this.state.newPassword)
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
      
   

    update() {
    console.warn(this.state.currentPassword)
    console.warn(this.state.newPassword)

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
        this.state.rMes=responseJson["message"]
        this.props.navigation.navigate('Login',{"message":this.state.rMes})
        console.warn(responseJson)
    })
    .catch((error) => {
      console.warn(error);
    });
    }    

    render() {
     
    return (
    
    <View style={styles.Container}>
      <View style={{flex:0.15, flexDirection:'row'}}>
        <View style={{flex:0.5}}>
            <Text style={styles.text}>Current Password :</Text>
        </View>
        <View style={{flex:0.5}}>
            <TextInput
            style={styles.Blanks}
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.REGInput1.focus()}
            onChangeText={text => this.validations(text, "currentPassword")}
            underlineColorAndroid = "#003d5a"
            secureTextEntry
            /> 
        </View>
      </View>

      <KeyboardAvoidingView style={{flex:0.15,flexDirection:'row'}}>
        <View style={{flex:0.5}}>
            <Text style={styles.text}>New Password :</Text>
        </View>
        <View style= {{flex:0.5}}>
            <TextInput
            style={styles.Blanks}
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.REGInput1.focus()}
            onChangeText={text => this.validations(text, "newPassword")}
            underlineColorAndroid = "#003d5a"
            secureTextEntry
            /> 
        </View>
      </KeyboardAvoidingView>

      <View style={{flex:0.15,flexDirection:'row'}}>
        <View style={{flex:0.5}}>
            <Text style={styles.text}>Confirm Password :</Text>
        </View>
        <View style={{flex:0.5}}>
            <TextInput
            style={styles.Blanks}
            returnKeyType="next"
            keyboardType="default"
            autoCapitalize="none"
            autoCorrect={false}
            onSubmitEditing={() => this.REGInput1.focus()}
            onChangeText={text => this.validations(text, "confirmPassword")}
            underlineColorAndroid = "#003d5a"
            secureTextEntry={true}
            /> 
        </View>
      </View>
      <View>
         <TouchableOpacity style={styles.update} onPress={() => this.update()}>
             <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Update</Text>
         </TouchableOpacity> 
      </View>
    </View>
    
    )
}
}

 const styles = StyleSheet.create({
    Container:{
        flex:1,
        padding: 10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    text:{
        fontSize: 17,
        color:'#003d5a',
        fontWeight:'bold'
    },
    Blanks:{
        width:170,
        marginTop:-22,
    },
    update:{
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5,
        width:150,
    },
})
