import React, { Component } from 'react'
import {StyleSheet, Text, View,TouchableOpacity,Image,PixelRatio,Dimensions} from 'react-native'
import ImagePicker from 'react-native-image-picker';

// const options = {
//     title: 'image upload',
//     takePhotoButtonTitle: 'Take photo with your camera',
//     chooseFromLibraryButtonTitle: 'choose photo from library',
//     storageOptions: {
//         cameraRoll: false, // Don't save photos to the camera roll
//         path: "/data/data/com.testapp/itemfiles",
//         skipBackup: true, // No need to backup to iClould
//     },
//     };


export default class Index extends Component {
   
        state={
            ImageSource: null 
        }
      
        
selectPhotoTapped() {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    }
  };


  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

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
      let source = { uri: response.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({

        ImageSource: source

      });
    }
  });
}
  render() {
    
    return (
      <View style={styles.container}>
 
      <TouchableOpacity style={styles.selectoption} onPress={this.selectPhotoTapped.bind(this)}>

        <View>

        { this.state.ImageSource === null ? <Text>Upload image</Text> :
          <Image style={styles.ImageContainer} source={this.state.ImageSource} />
        }

        </View>

      </TouchableOpacity>

    </View>
    )
  }
}
const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectoption:{
    borderRadius: 30,
    width:300,
    height:50,
    color:'white',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#66CDAA',
  },
  ImageContainer: {
    //borderRadius: 10,
    width: 300,
    height: 300,
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CDDC39',
    
  },

});
