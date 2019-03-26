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
    }
    show = () => {
        
        this.refs.myModal.open()
    }
    upload = async() => {
        
        let auth = await AsyncStorage.getItem("auth")

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
              this.setState({pdVisible: true})
                
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
        //'Content-Type':'multipart/form-data'
        // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.N9w0jV/v+9PKjqTQVRpre2jTzBser7/a/Thzwn6/3UCGTehr+Gk9tZrbfUo0jndFhKFx2ywj3gA0kjDn9uf/mrfnjcwIru3WHKGL1lhTCxH/Uf7NYBtBbAd5M1f77b2aqFJHSXiQ0miSqKUB2cipfOf88VU+XiCO57FQtQzRFX0BtR5LZHaZQqSMMj8y47n6M86I6CKl/SntvdAyzVMh7uXFWsaYHY/nKmyIunJgewZM3q2ImLEx7ndLwRT1Kpus2er5pnvq19gX43RfAEkl80kK7axwGX2rPYYpoedDBXS35npshScOXwmZhiv36CmefEFHYLgFb83BWVafahApZ5huYSa1DHVNA6rCFJmrEdIZSVy/3U3prOcyiOsRM11DwsXwuJoOVYlwJgvluzUgDz32moOaTde6a1vkrdMaedYDyNNolAGSQ1Pu3+CKxRmp2tRpNY7GaajQVLaie574mFc2BGCwJdrueGAA8DuCPCgN2fpVlMYrufbYI7om3MnSjypSyoFuWg4O+4PG72+Qm5HvUfADtSbX4REh6XWBwyt89NRYf9f/qp/S3aLWZ8XsY5akfYKBECZQ6H6Z3rVRxAW7OgnqlPlAMBSw+DqAi3+28ActC0gqb3KOiDJFb3jIT4OoAMBRAA3hdAmblTr6EwpPmbxXqoCZ2CFL/PQqA/OTuKiBadJ1ZxkxCuFcb2Cl2J1fHnRKKWqv3CY4UMyBVkIFH2zGCh3g5IgaG3hH6IYaM2xrtMNJ2AZRByaG0ki5r99ydraBgmbN6OhEaKYlnG5RqR3tuIpNieQDbe6hFZEpvqk8iOk4pD2/nm2gBbymmt9bQcX1giYgYVUgsOUBytjTawP4g1BeJ0Rt0w0ev/jotRYNpxQaWs5aMGMYfdPW.ooqT_toFub_53Hn22ZdRhSAkcNnJrnwlDag93pWBvlA',
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
        console.warn(error.message);
    });      
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
             <Text style={{marginLeft:14, fontSize: 18,  color: 'black', fontWeight:'bold'}}>Upload a File</Text>
             {this.state.pdVisible ? <ActivityIndicator color="black" size="large" /> : null}

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
    },
    textSave: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
})