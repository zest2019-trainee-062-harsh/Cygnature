import React, {Component} from 'react'
import {View, Image, StyleSheet, TouchableOpacity, Text, AsyncStorage, PermissionsAndroid} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { ProgressDialog } from 'react-native-simple-dialogs';

import { StackActions, NavigationActions } from 'react-navigation'
class ImageP extends Component {
    constructor(props) {
        super(props)
        this.requestCameraPermission()
        this.state.isSignature  = this.props.navigation.getParam('isSignature')
        this.state.flow  = this.props.navigation.getParam('flow')
    }
    state = {
        img : [],
        imageP : false,
        auth: null,
        signature: null,
        pdVisible: false,
        flow: null
    }
    static navigationOptions = {
        title: "Image"
    }

    requestCameraPermission = async() => {
        try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
            Alert.alert(
                'Allow Permission? ',
                "By denying permission you won't able to capture ",
                [
                    {
                        text: 'Yes', onPress: ()=> this.requestCameraPermission()
                    },
                    {
                        text: 'NO', onPress: () => this.setState({downloadButtonDisable:true, downloadButtonOpacity: 0.5})
                    },
                ],
                {cancelable: true},
            )
          }
        } catch (err) {
          console.warn(err);
        }
      }
    openCameraPicker() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
          }).then(image => {
            this.setState({img: image, imageP: true, signature:image["data"] })
            setTimeout( () => { this.setState({ imageP: true }); }, 500);
          });
    }

    openGalleryPicker() {
        //console.warn("yes")
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
          }).then(image => {
              this.setState({img: image, imageP: true, signature:image["data"]  })
              setTimeout( () => { this.setState({ imageP: true }); }, 500);
            //   console.warn(this.state.img);
            // console.warn(this.state.img["data"]);
          });
    }

    enrollSign = async() => {

        this.setState({pdVisible: true})
        let auth = await AsyncStorage.getItem("auth")
        this.setState({auth: auth})

        if(this.state.isSignature) {
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/update-signature',{
            method: 'POST',
            headers: {
                'Authorization':this.state.auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "signatureType": 2,
                "ImageBytes": this.state.signature
            }),
            }).then((response) => response.json())
            .then((responseJson) => {
                
                this.setState({pdVisible: false})
                if(responseJson['message'] == null) {
                    alert("Update failed\nPlease select/capture image again")
                } else {
                    //console.warn(responseJson)
                    //this.props.navigation.navigate('Account')
                    alert("Updated")
                    if(this.state.flow == 1) {
                        const popAction = StackActions.pop({
                          n: 1,
                        });
                        this.props.navigation.dispatch(popAction)
                      } else {
                        const popAction = StackActions.pop({
                          n: 2,
                        });
                        this.props.navigation.dispatch(popAction) 
                      }
                    }
            })
            .catch((error) => {
                console.warn(error);
            })
        } else {
            return fetch('http://cygnatureapipoc.stagingapplications.com/api/user/enroll-signature',{
                method: 'POST',
                headers: {
                    'Authorization':this.state.auth,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "signatureType": 2,
                    "ImageBytes": this.state.signature
                }),
                }).then((response) => response.json())
                .then((responseJson) => {
                    
                    this.setState({pdVisible: false})
                    if(responseJson['message'] == null) {
                        alert("Update failed\nPlease select/capture image again")
                    } else {
                        //console.warn(responseJson)
                        //this.props.navigation.navigate('Account')
                        alert("Enrolled")
                        if(this.state.flow == 1) {
                            const popAction = StackActions.pop({
                              n: 1,
                            });
                            this.props.navigation.dispatch(popAction)
                          } else {
                            const popAction = StackActions.pop({
                              n: 2,
                            });
                            this.props.navigation.dispatch(popAction) 
                          }
                        }
                })
                .catch((error) => {
                    console.warn(error);
                })
        }
          
    }

     render() {
         return (
             <View style={styles.mainContainer}>
                <ProgressDialog
                visible={this.state.pdVisible}
                title="Enrolling !"
                message="Please wait..."
                activityIndicatorColor="#003d5a"
                activityIndicatorSize="large"
                animationType="slide"
            />
                {this.state.imageP?
                <Image 
                    style={styles.signContainer} 
                    source={{uri: `data:${this.state.img["mime"]};base64,${this.state.signature}`}} />
                :null}
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity 
                    onPress={this.openCameraPicker.bind(this)}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Capture</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={this.openGalleryPicker.bind(this)}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Select</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={()=> this.enrollSign()}
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>Enroll</Text>
                </TouchableOpacity>
             </View>
                )
         }
     }

export default ImageP

const styles = StyleSheet.create({
    mainContainer:{
        borderWidth:1,
        flex:1,
        backgroundColor: 'white',
        margin: 7, 
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    signContainer: {
        width:300,
        height:300,
        borderWidth:1,
        borderRadius:5,
        borderColor: "#003d5a",
    },
    buttonContainer:{
        backgroundColor: '#003d5a',
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})