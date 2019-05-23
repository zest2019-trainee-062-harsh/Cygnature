import React, {Component} from 'react'
import {View, StyleSheet, Text,TextInput, TouchableOpacity,AsyncStorage, ActivityIndicator, Keyboard} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import { NavigationEvents } from 'react-navigation';
import { ProgressDialog } from 'react-native-simple-dialogs';

var Spinner = require('react-native-spinkit');
export default class Index extends Component {
    constructor(props) {
        super(props)
    }
        
    state= {
        data : [],
        pdVisible1: false,
        pdVisible2: false,
        fileHash: null,
        transactionHash: null,
        auth: null,
        token:null,
        documentList: [],
        totalRows: [],  
    }

    didFocus= async() => {
        this.state.auth = await AsyncStorage.getItem('auth')
        this.setState({transactionHash:null, fileHash:null, pdVisible1:false, pdVisible2:false, fileName:null})
    } 

    search = () =>{    
        this.setState({pdVisible1:true})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/search-by-hash',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "fileHash": this.state.fileHash,
            "transactionHash": null,
            "currentPage": 0,
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            
        this.setState({pdVisible1:false})
            if(responseJson["message"]) {
                alert(responseJson["message"])
            }
            else {
                if(responseJson["data"][0]["totalRows"] > 1){
                    this.showData(responseJson["data"][0]["documentList"])
                }
                else{
                    
                    this.verifydetail(responseJson["data"][0]["documentList"][0]["Id"])          
                }
            }
            
        })
        .catch((error) => {
            console.warn(error.message);
        });
    }

    search2 = () =>{
        this.setState({pdVisible1:true})
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/search-by-hash',{
        method: 'POST',
        headers: {
            'Authorization':this.state.auth,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "fileHash": null,
            "transactionHash": this.state.transactionHash,
            "currentPage": 0,
        }),
        }).then((response) => response.json())
        .then((responseJson) => {
            //console.warn(responseJson)
            //console.warn(responseJson["data"][0])
            
            this.setState({pdVisible1:false})
            if(responseJson["message"]) {
                alert(responseJson["message"])
            }
            else this.props.navigation.navigate('VerifyDetails',{'data':responseJson["data"][0]})
            
        })
        .catch((error) => {
            console.warn(error.message);
        });
    }

    update=(value, text)=> {
        switch(value) {
            case "fileHash": {
                this.setState({fileHash: text})
                return
            }
            case "transactionHash": {
                this.setState({transactionHash: text})
                return
            }
        }
    }

    upload = async() => {

        let auth = await AsyncStorage.getItem("auth")

        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
                
                if(error) {
                    this.setState({fileName: 'No file selected'})
                }
                else {
                   
                    this.setState({pdVisible2: true, fileName: res.fileName})

                    const formData = new FormData()
                    formData.append('file',{
                        
                        uri: res.uri,
                        type: res.type,
                        name: res.fileName,
                    })
                            
                    return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/document-upload',{
                    method: 'POST',
                    headers: {
                        'Authorization':auth,
                    },
                    body: formData
                    }
                    ).then((response) => response.json())
                    .then((responseJson) => {
                        //console.warn(responseJson)
                        if(responseJson["message"]) {
                            this.setState({pdVisible2:false, fileName:null})
                            alert(responseJson["message"])
                        }
                        if(responseJson["data"][0]["totalRows"] > 1){
                            this.showData(responseJson["data"][0]["documentList"])
                        }
                        else{
                            this.verifydetail(responseJson["data"][0]["documentList"][0]["Id"])          
                        }
                    
                    })
                    .catch((error) => {
                        console.warn(error.message)
                    });      
                }
    
            });
    }

    showData = (data) => {
        if(data == null)
        {
            console.warn("no data")
        }else {
            
            this.props.navigation.navigate('DocumentList',{'data':data})
        }
    }
   


    verifydetail = (id) => {
        return fetch('http://cygnatureapipoc.stagingapplications.com/api/verify/document-detail/'+id,{
        method: 'GET',
        headers: {
            'Authorization': this.state.auth
        }}).then((response) => response.json())
        .then((responseJson) => {
           
             this.props.navigation.navigate('VerifyDetails',{'data':responseJson["data"][0]})
        })
        .catch((error) => {
            console.warn(error);
        });
    }
            
        
  render() {
    return (  
        <View style={styles.mainContainer}>
        
        <NavigationEvents
            onDidFocus={payload => this.didFocus()}/>
        
        <ProgressDialog
            visible={this.state.pdVisible1}
            title="Fetching Documents!"
            message="Please wait..."
            activityIndicatorColor="#003d5a"
            activityIndicatorSize="large"
            animationType="slide"
        />

            <View style={styles.box}>
                <Text style= {{fontWeight: "bold", fontSize: 20, color: "black"}}>Document Hash</Text>
                <TextInput
                    placeholderTextColor='grey'
                    placeholder = "Enter hashcode"
                    onChangeText = {text => this.update("fileHash",text)} 
                    value = {this.state.fileHash}     
                    returnKeyType="go"
                    style={styles.boxTI} 
                />
                <TouchableOpacity style={styles.btnSave} onPress={this.search}>
                    <Text style={styles.textSave}>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.box}>
                <Text style= {{fontWeight: "bold", fontSize: 20, color: "black"}}>Transaction Hash</Text>
                <TextInput
                    editable={true} 
                    selectTextOnFocus={true}
                    placeholderTextColor='grey'
                    placeholder = "Enter hashcode"
                    onChangeText = {text => this.update("transactionHash",text)}
                    value = {this.state.transactionHash}
                    returnKeyType="go"
                    style={styles.boxTI} 
                />
                <TouchableOpacity style={styles.btnSave} onPress={this.search2}>
                    <Text style={styles.textSave}>Search</Text>
                </TouchableOpacity>
            </View>

            <View style={{flex:0.4, justifyContent: "center", alignItems: "center", marginBottom:70}}>
                {this.state.pdVisible2 
                    ?
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Spinner size={100} type={'Bounce'} color={'#003d5a'}/>
                            <Text style={{fontSize: 18,  color: 'black', fontWeight:'bold', marginTop: 20}}>{this.state.fileName}</Text>
                        </View>
                    :
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Icon name="md-cloud-upload" color='#003d5a' size={100} s/>
                        <Text style={{fontSize: 22,  color: 'black'}}>Upload a document to verify</Text>
                        
                        <Text style={{fontSize: 20,  color: 'black' ,}}>{this.state.fileName}</Text>

                        <TouchableOpacity style={ styles.btnSave } onPress={this.upload}>
                                <Text style={styles.textSave}>Choose File</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            
           </View>
      
    
    )
  }
}
const styles = StyleSheet.create({
    mainContainer:{
        borderColor:'#003d5a',
        flex:1,
        backgroundColor: 'white',
        margin: 7, 
        borderWidth: 2,
        borderRadius:5,
        borderColor: "#003d5a",
        padding: 10
    },
    boxTI: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        marginTop:10,
        marginBottom: 15,
        borderWidth:1,
        fontFamily: 'Helvetica',
        fontSize:20,
    },
    search: {
        textAlign:'center',
        alignItems:'center',
        fontWeight:'bold',
    },
    btnSave: {
        backgroundColor: '#003d5a',
        marginLeft: "25%",
        marginRight: "25%",
        height:40,
        padding: 20,
        justifyContent: 'center',
        borderRadius: 5
    },
    textSave: {
        justifyContent: 'center',
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold',
    },
    box: { 
        margin: 5,
        flex:0.30,
    },
})