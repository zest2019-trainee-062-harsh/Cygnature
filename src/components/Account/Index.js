import React, {Component} from 'react'
import {
    View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Linking, Switch, AsyncStorage, ImageBackground
} from 'react-native'

import { ProgressDialog } from 'react-native-simple-dialogs';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
 
export default class Index extends Component {
    constructor (props) {
        super(props)
    }

    state= {
        switch1: false,
        switch2: false,
        userData: [],
        userDataPic: null,
        pdVisible: true
    }

    componentWillMount= async() => {
        let auth = await AsyncStorage.getItem('auth');
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            //console.warn(responseJson['data'][0]["profileByte"])
            this.setState({userDataPic: responseJson['data'][0]["profileByte"]}) 
            if(this.state.userDataPic == null || this.state.userDataPic == "") {
                console.warn("null")
            }
            this.setState({userData: responseJson['data'][0]}) 
            //console.warn(this.state.userData)
            this.setState({pdVisible:false})
        })
        .catch((error) => {
          console.error(error)
        });
    }

   
    logout = async() => {
        AsyncStorage.clear();
        this.props.navigation.navigate("Login")
    }

    toggleSwitch1 = () => {
        this.setState({ switch1: !this.state.switch1})
     }
     toggleSwitch2 = () => {
        this.setState({ switch2: !this.state.switch2})
        if(this.state.switch2 == true) {
            console.warn("y")
        }
     }

    render() {
        return(
            <View style={styles.mainContainer}>
            <ProgressDialog
                    visible={this.state.pdVisible}
                    title="Fetching Details !"
                    message="Please wait..."
                    activityIndicatorColor="#003d5a"
                    activityIndicatorSize="large"
                    animationType="slide"
                />

                <ScrollView>
                    
                <View style={[styles.DocumentsList, {justifyContent: "center", alignItems: "center" } ]}>
                    
                    <ImageBackground
                        style={{height:200, width:200, alignItems: 'center', justifyContent: 'center',}}
                        source={require('../../../img/profile.png')}>
                     {/* <Icon color='white' size={25} name="md-add" style={{
                            backgroundColor:'#003d5a',
                            width:30,
                            height: 30,
                            backgroundColor: '#003d5a',
                            borderRadius: 15,
                            position: 'absolute',
                            alignItems: 'center',
                            justifyContent: 'center',
                            left: 130,
                            right: 0,
                            top: 170,
                            bottom: 0
                        }} /> */}

                        <TouchableOpacity style={styles.floatButton} onPress={this.floatClicked}>
                            <Text style={styles.floatButtonText}>+</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                   
                <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Personal Details </Text>
                <View style={{borderColor: "#003d5a", borderWidth: 1, margin: 20}}></View>
                    
                <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.logout()}>
                        <Text style = { styles.buttonText }>Edit Profile</Text>
                </TouchableOpacity>

               <TouchableOpacity style = { [styles.buttonContainer]} onPress={() => this.logout()}>
                        <Text style = { styles.buttonText }>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style = { [styles.buttonContainer]} onPress={() => this.logout()}>
                        <Text style = { styles.buttonText }>Logout</Text>
                </TouchableOpacity>

                <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Security </Text>
                <View style={{borderColor: "#003d5a", borderWidth: 1, margin: 20}}></View>
                    <View style={styles.DocumentsList}>
                        <View style={styles.DocumentsList}>
                            <View style={{flexDirection: "row"}}>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Allow Screenshots
                                </Text>
                                <Switch
                                    onValueChange = {this.toggleSwitch1}
                                    value={this.state.switch1}
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    thumbColor = "#003d5a"
                                    trackColor = "#003d5a"
                                />
                            </View>
                            <View style={{flexDirection: "row"}}>
                                <Text style={[styles.DocumentsListFont, {fontSize: 17}]}>
                                    Allow FingerPrint
                                </Text>
                                <Switch onValueChange = {this.toggleSwitch2}
                                    value={this.state.switch2}
                                    style={ [styles.DocumentsListFont, {alignContent: "flex-end"}] }
                                    thumbColor = "#003d5a"
                                    trackColor = "#003d5a"
                                />
                            </View>
                        </View>
                    </View>

                    <Text style={{fontWeight: "bold", fontSize: 22, color: "black"}}> General </Text>
                    <View style={{borderColor: "#003d5a", borderWidth: 1, margin: 20}}></View>
                    <View style={styles.DocumentsList}>
                        
                        <View style={styles.DocumentsList}>
                            <Text
                                style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                onPress={() => Linking.openURL('https://account.cygnature.io/Terms-Condition')}
                            >
                                Terms & Conditions
                            </Text>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text
                                style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                onPress={() => Linking.openURL('https://account.cygnature.io/Privacy-Policy')}
                            >
                                Privacy Policy
                            </Text>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text
                                style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                onPress={() => Linking.openURL('https://www.cygnature.io')}
                            >
                                About us
                            </Text>
                        </View>
                    </View> 
                    
                </ScrollView>
            </View>
        )
    }
}


    
const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
        borderColor:'black',
        flex:1,
        backgroundColor: 'white',
        margin: 7, borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
    },
    DocumentsList:{
        backgroundColor: 'white',
        margin: 10
    },
    floatButton: {
        position: 'absolute',
        width:30,
        height: 30,
        backgroundColor: '#003d5a',
        borderRadius: 30,
        bottom: 3,
        right: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    floatButtonText: {
        color: 'white',
        fontSize: 25    
    },
    DocumentsListFont:{
        flex: 0.5,
        color: "black",
        fontSize: 12
    },
    buttonContainer: {
        backgroundColor: '#003d5a',
        paddingVertical: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})