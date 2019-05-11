import React, {Component} from 'react'
import {
    View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity,  Switch, AsyncStorage, Alert
} from 'react-native'
import { Avatar } from 'react-native-elements';
import { ProgressDialog } from 'react-native-simple-dialogs';
import ImagePicker from 'react-native-image-crop-picker';
import RNRestart from 'react-native-restart';
import { NavigationEvents } from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation'
import FingerprintScanner from 'react-native-fingerprint-scanner'
import ChangePwd from './ChangePwd.js'
import WebViewModal from './WebViewModal'
 
export default class Index extends Component {
    constructor (props) {
        super(props)
       
    }

    state= {
        switch1: false,
        switch2: false,
        userData: [],
        userDataPic: null,
        pdVisible: true,
        img : null,
        auth: null,
        pdTitle: "Fetching Details !"
    }

    didFocus= async() => {
        let fingerprint = await AsyncStorage.getItem('fingerprint')
        if(fingerprint == 'enabled') {
            this.state.switch2 = true
        }
        if(fingerprint == 'disabled') {
            this.state.switch2 = false
        }
        
        let auth = await AsyncStorage.getItem('auth');
        this.setState({auth:auth})
        this.view()
    }

    view () {
        this.setState({pdVisible:true, pdTitle: "Fetching Details!"})

        return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': this.state.auth,
        },
        }).then((response) => response.json())
        .then((responseJson) => {
            //console.warn(responseJson['data'][0]["profileByte"])
            this.setState({userDataPic: responseJson['data'][0]["profileByte"]}) 
            this.setState({userData: responseJson['data'][0]}) 
            //console.warn(this.state.userData)
            this.setState({pdVisible:false})
        })
        .catch((error) => {
          console.error(error.message)
        });
    }

   
    redirect = () => {
        //console.warn("Y")
        AsyncStorage.clear();
        this.props.navigation.navigate("Login")
    }
    
    logout = async() => {
        //this.props.navigation.navigate("Login")
        Alert.alert(
            'Are you Sure?',
            'Clicking yes will redirect you to Login',
            [
                
                {
                    text: 'No'
                },
                {
                    text: 'Yes', onPress: ()=>{
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [
                              NavigationActions.navigate({ routeName: 'Login'})
                            ]
                          })
                        this.props.navigation.dispatch(resetAction)
                        //AsyncStorage.clear();
                        let keys = ['auth', 'otp_check', 'token', 'userId'];
                        AsyncStorage.multiRemove(keys, (err) => {
                        // keys k1 & k2 removed, if they existed
                        // callback to do some action after removal of item
                        });
                    }
                },
            ],
            {cancelable: true},
        );

        
    }

    toggleSwitch1 = () => {
        this.setState({ switch1: !this.state.switch1})
     }
    
     toggleSwitch2 = (value) => {
        //console.warn(value)
        if(value == true) {
            this.checkSensor()
            //AsyncStorage.setItem('fingerprint', 'enabled')
            //console.warn("y")
            //RNRestart.Restart();
        }
        if(value == false) {
            this.setState({ switch2: value})
            AsyncStorage.setItem('fingerprint', 'disabled')
            //console.warn("n")
            RNRestart.Restart();
        }
     }

     checkSensor () {
        //console.warn("y")
        FingerprintScanner
        .isSensorAvailable()
        .then(biometryType => {
            this.setState({ switch2: true})
            AsyncStorage.setItem('fingerprint', 'enabled')
            RNRestart.Restart();
        })
        .catch(error => alert(error.message));
    
     }

     floatClicked = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
          }).then(image => {
            this.setState({img: image, imageP: true, userDataPic:image["data"]  });
            setTimeout( () => { this.setState({ imageP: true }); }, 500);
            this.setState({pdVisible:true,  pdTitle: "Updating Profile Pic!"})
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile/'+this.state.userData["userId"], {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.auth,
            },
            body: JSON.stringify({
                "userId": this.state.userData["userId"],
                "email": this.state.userData["email"],
                "firstName": this.state.userData["firstName"],
                "lastName": this.state.userData["lastName"],
                "gender": this.state.userData["gender"],
                "phoneNumber": this.state.userData["phoneNumber"],
                "birthDate": this.state.userData["birthDate"],
                "isProfileImage": true,
                "profileByte": this.state.userDataPic,
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                //console.warn(responseJson)
                let message = responseJson["message"];
                return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.auth,
                },
                }).then((response) => response.json())
                .then((responseJson) => {
                    this.setState({userData: responseJson['data'][0]})
                    this.setState({pdVisible:false})
                    alert(message);
                })
                .catch((error) => {
                console.error(error.message)
                });
            })
            .catch((error) => {
                console.error(error.message)
            });
          });
    }

    changePwd = () =>{
        this.refs.ChangePwd.show()
    }

    webview = (value) =>{
        this.refs.WebViewModal.show(value)
    }
    render() {
        return(
            <View style={styles.mainContainer}>
            <ProgressDialog
                    visible={this.state.pdVisible}
                    title={this.state.pdTitle}
                    message="Please wait..."
                    activityIndicatorColor="#003d5a"
                    activityIndicatorSize="large"
                    animationType="slide"
                />
                <NavigationEvents
                onDidFocus={payload => this.didFocus()}/>
                <ScrollView>
                    
                <View style={[styles.DocumentsList, {justifyContent: "center", alignItems: "center" } ]}>
                    {this.state.userDataPic == "" || this.state.userDataPic == null ?
                        <Avatar
                            style={{height:180,width:180}}
                            source={require('../../../img/profile.png')}
                            rounded
                            showEditButton
                            onEditPress={this.floatClicked}
                            editButton={{size:32}}
                            imageProps={{borderRadius:100}}
                            overlayContainerStyle={{backgroundColor:'white'}}
                        />:
                        <Avatar
                            style={{height:200,width:200}}
                            source={{uri: `data:image/png;base64,${this.state.userDataPic}`}}
                            rounded
                            showEditButton
                            onEditPress={this.floatClicked}
                            editButton={{size:32}}
                            imageProps={{borderRadius:100}}
                            overlayContainerStyle={{backgroundColor:'white'}}
                        />
                    }
                </View>
                   
                <Text style={{fontWeight: "bold", fontSize: 25, color: "black"}}> Personal Details </Text>
                <View style={{borderColor: "#003d5a", borderWidth: 1, margin: 20}}></View>
                    
                <TouchableOpacity style = { styles.buttonContainer} onPress={() => this.props.navigation.navigate('Profile', {"userData": this.state.userData })}>
                        <Text style = { styles.buttonText }>Edit Profile</Text>
                </TouchableOpacity>

               <TouchableOpacity style = { [styles.buttonContainer]} onPress={() => this.changePwd()}>
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
                                <Switch onValueChange = {(text)  => this.toggleSwitch2(text)}
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
                                onPress={() => this.webview('https://account.cygnature.io/Terms-Condition')}
                            >
                                Terms & Conditions
                            </Text>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text
                                style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                onPress={() => this.webview('https://account.cygnature.io/Privacy-Policy')}
                            >
                                Privacy Policy
                            </Text>
                        </View>
                        <View style={styles.DocumentsList}>
                            <Text
                                style={[styles.DocumentsListFont, {fontSize: 17, color: "#003d5a", textDecorationLine: "underline"}]}
                                onPress={() => this.webview('https://www.cygnet-infotech.com/cygnature')}
                            >
                                About us
                            </Text>
                        </View>
                    </View> 
                 
                    
                    
                </ScrollView>
                
                <ChangePwd ref={'ChangePwd'} parentFlatList={this} />
                <WebViewModal ref={'WebViewModal'} parentFlatList={this} />
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
    imageContainer: {
        height:200, 
        width:200, 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:200/2,
    }
})