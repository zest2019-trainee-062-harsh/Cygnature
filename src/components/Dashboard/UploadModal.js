import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, AsyncStorage, ActivityIndicator} from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/Ionicons'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height

class UploadModal extends Component {
    constructor(props) {
    super(props)
    }

    state= {
        pdVisible: false,
        fileName: "",
    }
    show = () => {
        
        this.refs.myModal.open()
    }
    upload = async() => {
        
        let auth = await AsyncStorage.getItem("auth")

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
              
                if(error) {
                    //console.warn("ERROR"+error)
                    this.setState({fileName: 'No file selected'})
                }
                else {
                    //console.warn("Response"+res)
                    this.setState({pdVisible: true, fileName: res.fileName})

                    const formData = new FormData()
                    formData.append('file',{
                        
                     uri: res.uri,
                     type: res.type,
                     name: res.fileName,
                    })
                    //console.warn(res.uri+res.type+res.fileName)
                    //console.warn(formData)
                    
                         
                 return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/upload',{
                 method: 'POST',
                 headers: {
                     'Authorization':auth,
                 },
                 body: formData
                 }
                 ).then((response) => response.json())
                 .then((responseJson) => {
                     
                     this.setState({pdVisible: false})
                     //console.warn(responseJson["data"][0])
                     this.refs.myModal.close()
                     this.props.parentFlatList.showData(responseJson["data"][0])
                 
                 })
                 .catch((error) => {
                     // this.refs.myModal.close();
                     // Alert(error.message);
                     console.warn(error.message)
                 });      
                }
             


   
          });
    }
    

   
     render() {
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
            <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            
             <Icon name="md-cloud-upload" color='black' size={100} />
             <Text style={{fontSize: 18,  color: 'red' ,}}>{this.state.fileName}</Text>
             <Text style={{fontSize: 18,  color: 'black', fontWeight:'bold'}}>Upload a File</Text>
             {this.state.pdVisible ? <ActivityIndicator color='#003d5a' size="large" /> : null}

             <TouchableOpacity style={ styles.btnSave } onPress={this.upload}>
                    <Text style={styles.textSave}>Upload</Text>
            </TouchableOpacity>

            </View>
            </Modal>
                )
         }
     }

export default UploadModal

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
    btnSave: {
        backgroundColor: '#003d5a',
        marginLeft: "25%",
        marginRight: "25%",
        height:40,
        marginTop: 20,
        padding: 20,
        justifyContent: 'center',
        borderRadius: 5
    },
    textSave: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})