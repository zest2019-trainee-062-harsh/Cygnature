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

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Register extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        register: null,
        message: '',
        enable: true
    }

    checkuser(text) {
        ema= text

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        
        if(reg.test(ema) === false)
        {
            this.setState({enable: false})
            return false;

        }
        else {
            this.setState({email:ema})
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/account/check-user-exists/'+(ema), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            }).then((response) => response.json())
            .then((responseJson) => {
            
                bva=responseJson["data"]
                message=responseJson["message"]
                this.setState({register: bva[0], message: message})
                console.warn(this.state.register)
                if(this.state.register === true){
                    this.setState({enable: true})
                }
            })
            .catch((error) => {
                console.warn(error);
            });
        }
    }

    next(){
        const { register } = this.state
        console.warn("REDIRECT - UI 2")
        if (register == null) {
            Alert("Enter the details correctly.")
        } else {
            console.warn(register)
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
                            placeholder = "First Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onSubmitEditing={() => this.REGInput1.focus()}
                            style= { styles.boxTI }>
                        </TextInput>

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Last Name"
                            returnKeyType="next"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput1 = input}
                            onSubmitEditing={() => this.REGInput2.focus()}
                            style= { styles.boxTI }>
                        </TextInput>

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Email"
                            returnKeyType="next"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput2 = input}
                            onSubmitEditing={() => this.REGInput3.focus()}
                            onChangeText={text => this.checkuser(text)}
                            style= { styles.boxTI }>
                        </TextInput>

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Password"
                            returnKeyType="go"
                            ref={(input) => this.REGInput3 = input}
                            onSubmitEditing={() => this.REGInput4.focus()}
                            onChangeText={text => this.setState({password: text})}
                            secureTextEntry
                            style= { styles.boxTI }>
                        </TextInput>

                        <TextInput
                            placeholderTextColor='grey'
                            placeholder = "Confirm Password"
                            returnKeyType="go"
                            ref={(input) => this.REGInput4 = input}
                            onSubmitEditing={() => this.REGInput5.focus()}
                            onChangeText={text => this.setState({password: text})}
                            secureTextEntry
                            style= { styles.boxTI }>
                        </TextInput>

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

                        <TextInput
                            placeholderTextColor='grey'
                            keyboardType="numeric"
                            placeholder = "Phone Input"
                            returnKeyType="go"
                            autoCapitalize="none"
                            autoCorrect={false}
                            ref={(input) => this.REGInput7 = input}
                            style= { styles.boxTI }>
                        </TextInput>

                        <TouchableOpacity disabled={this.state.enable} onPress={_=> this.next()} style = { [styles.buttonContainer, {opacity: 0.5} ]}>
                            <Text style = { styles.buttonText }>Next</Text>
                        </TouchableOpacity>
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