import React, {Component} from 'react'
import {TouchableOpacity, View, Text, Dimensions, TextInput,PixelRatio,
    Image,StyleSheet } from 'react-native'

import Modal from 'react-native-modalbox'
import ImagePicker from 'react-native-image-picker';



var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full width`

class AddModal extends Component {
   static navigationOptions = {
        header: null
    }
      
    state={
        ImageSource: null 
    }

    show = () => {
        this.refs.myModal.open()
    }
    
   

    selectPhotoTapped(response) {
  
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true,
          },
        };
      
      
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response.fileName);
      
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
           else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
  
          else {
            let source = { uri: response  };
      
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
            this.uploadImage(response)
          }
        });
      }
      uploadImage(source){

        const data = new FormData();
        data.append('name', 'testName'); // you can append anyone.
        data.append('photo', {
            uri: source.uri,
            type: 'image/jpeg', // or photo.type
            name: 'testPhotoName'
        });

        fetch('http://cygnatureapipoc.stagingapplications.com/api/user/enroll-signature', {
            method: 'POST',
            headers: {
              'Authorization':auth,
            },
            body: data,
        }).then((response) => response.json())
            .then((responseJson) => {

               console.log(responseJson);

            }).catch((error) => {
            //
        });
    }
    
     render() {
      console.log(this.props);
         return (
            <Modal
            ref={"myModal"}
            style={ styles.modal }
            position= 'center'
            backdrop={true}
            onClosed={() =>{
                //console.warn("modal closed")
            }}
            >

            <Text style={styles.basic}>Set Signature</Text>

            <TouchableOpacity style={styles.selectoption} onPress={() => this.props.parentFlatList.sendtoCanvas()}>
                <Text>Draw</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.selectoption} onPress={this.selectPhotoTapped.bind(this)}>

              <View>

              { this.state.ImageSource === null ? <Text>Upload image</Text> :
                <Image style={styles.ImageContainer} source={this.state.ImageSource}>
                {this.state.file}</Image>
              }

              </View>

            </TouchableOpacity>  

             <TouchableOpacity style={styles.selectoption} onPress={() => this.sendtoCanvas()}>
                <Text>Type</Text>
            </TouchableOpacity> 

            </Modal>
                )
         }
     }

export default AddModal

const styles = StyleSheet.create({
    modal:{
        justifyContent: 'center',
        shadowRadius:20,
        width:width-80,
        height:height*.5,
        borderColor:'#003d5a',
        borderWidth: 1,
        borderRadius:5,
    },
    basic:{
        paddingLeft:90,
        color:'white',
        borderWidth:1,
        marginTop:-30,
        //marginBottom:20,
        fontSize:18,
        backgroundColor: '#003d5a',

    },
    selectoption:{
        borderRadius: 5,
        marginLeft:25,
        width:230,
        height:70,
        borderWidth:1,
        borderColor:'black',
        color:'black',
        fontSize:10,
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      },
      ImageContainer: {
        //borderRadius: 10,
        width: 400,
        height: 800,
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',
        
      },
})