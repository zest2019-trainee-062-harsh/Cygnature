import React, {Component} from 'react'
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, AsyncStorage, Alert} from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/Ionicons'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'

var width = Dimensions.get('window').width
var height = Dimensions.get('window').height
var Spinner = require('react-native-spinkit');

class UploadModal extends Component {
    constructor(props) {
        super(props)
    }

    state= {
        pdVisible: false,
        fileName: "",
        fileSize: null,
    }
    show = () => {
        this.refs.myModal.open()
    }
    
    close = () => {
        this.refs.myModal.close()
    }
    upload = async() => {
        let auth = await AsyncStorage.getItem("auth")

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
              
                if(error) {
                    Alert.alert(
                        'No File Selected !',
                        'Do you wanna retry ?',
                        [
                            {
                                text: 'No', onPress: ()=> this.close()
                            },
                            {
                                text: 'Yes', onPress: ()=> this.upload()
                            },
                        ],
                        {cancelable: false},
                    )
                }
                else {
                    this.setState({pdVisible: true, fileName: res.fileName, fileSize: res.fileSize})
                   
                    const formData = new FormData()
                    formData.append('file',{
                        uri: res.uri,
                        type: res.type,
                        name: res.fileName,
                    })
                         
                    return fetch('http://cygnatureapipoc.stagingapplications.com/api/document/upload',{
                    method: 'POST',
                    headers: {
                        'Authorization':auth,
                    },
                    body: formData
                    }
                    ).then((response) => response.json())
                    .then((responseJson) => {
                        //console.warn(responseJson)
                        this.setState({pdVisible: false})

                        if(responseJson["data"] == null) {
                            if(responseJson["errors"] == null ) {
                                alert(responseJson["error"])
                            } else alert(responseJson["errors"]["Document"])
                        } else {
                            this.props.parentFlatList.showData(responseJson["data"][0])
                        }

                        this.refs.myModal.close()
                    
                    })
                    .catch((error) => {
                        this.refs.myModal.close();
                        alert(error.message)
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
                backdropPressToClose={false}
                swipeToClose={false}
            >
                <View style={{alignItems:'flex-end', margin:10}}><Icon name="md-close" color='black' size={30} onPress={()=>this.close()} /></View>
                <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            
                {this.state.pdVisible 
                    ?
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Spinner size={100} type={'9CubeGrid'} color={'#003d5a'}/>
                            <Text style={{fontSize: 18,  color: 'black', fontWeight:'bold', marginTop: 20}}>{this.state.fileName}</Text>
                        </View>
                    :
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Icon name="md-cloud-upload" color='#003d5a' size={100} />
                            <Text style={{fontSize: 18,  color: 'black', fontWeight:'bold', marginTop: 20}}>{this.state.fileName}</Text>
                            <Text style={{fontSize: 18,  color: 'black', fontWeight:'bold'}}>Upload a File</Text>
                            <TouchableOpacity style={ styles.btnSave } onPress={this.upload}>
                                <Text style={styles.textSave}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                }

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