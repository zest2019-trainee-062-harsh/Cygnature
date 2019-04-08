import React, {Component} from './node_modules/reacte_modules/react'
import {View, Image, StyleSheet, TouchableOpacity, Text, AsyncStorage} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import { ProgressDialog } from './node_modules/react-native-simple-dialogs-simple-dialogs';

class ImageP extends Component {
    constructor(props) {
        super(props)
        
    }
    state = {
        img : [],
        imageP : false,
        auth: null,
        signature: null,
        pdVisible: false,
    }
    static navigationOptions = {
        title: "Image"
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
                  alert("Enroll failed\nPlease select/capture image again")
                } else {
                  //console.warn(responseJson)
                  this.props.navigation.navigate('Settings')
                }
            })
            .catch((error) => {
                console.warn(error);
            });
          
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